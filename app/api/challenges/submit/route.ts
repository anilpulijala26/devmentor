import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import vm from "vm";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { ensureDailyMissionsAssigned, updateUserStreak } from "@/lib/streaks";
import { getChallengeContent } from "@/lib/challengeContent";

interface TestResult {
  passed: boolean;
  message: string;
}

function formatValue(value: unknown) {
  return JSON.stringify(value);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const body = await request.json();
    const { challengeId, submittedCode, mode = "submit" } = body;

    if (!challengeId || !submittedCode) {
      return NextResponse.json({ error: "Challenge ID and submitted code are required." }, { status: 400 });
    }

    const challengeCheck = await dbQuery("SELECT id, starter_code FROM coding_challenges WHERE id = $1", [challengeId]);
    if (challengeCheck.rows.length === 0) {
      return NextResponse.json({ error: "Coding problem not found." }, { status: 404 });
    }

    const challengeContent = getChallengeContent(challengeId, challengeCheck.rows[0].starter_code);
    if (!challengeContent) {
      return NextResponse.json({ error: "Test cases are not configured for this coding problem." }, { status: 500 });
    }

    const trimmedSubmitted = submittedCode.trim();
    const trimmedStarter = challengeContent.starterCode.trim();

    if (!trimmedSubmitted) {
      return NextResponse.json({ error: "Submitted code cannot be empty." }, { status: 400 });
    }

    if (trimmedSubmitted === trimmedStarter) {
      return NextResponse.json({ error: "Please update the starter code before running tests or submitting." }, { status: 400 });
    }

    const sandbox = {};
    const context = vm.createContext(sandbox);

    try {
      vm.runInNewContext(trimmedSubmitted, context, { timeout: 150 });
    } catch (error: unknown) {
      return NextResponse.json({ error: `Compilation or runtime error: ${getErrorMessage(error)}` }, { status: 400 });
    }

    const allCases = [...challengeContent.examples, ...challengeContent.hiddenCases];
    const results: TestResult[] = [];
    let allPassed = true;

    for (let index = 0; index < allCases.length; index += 1) {
      const testCase = allCases[index];
      try {
        const evalScript = `${challengeContent.funcName}(...${JSON.stringify(testCase.input)})`;
        const result = vm.runInNewContext(evalScript, context, { timeout: 80 });
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        allPassed = allPassed && passed;

        results.push({
          passed,
          message: passed
            ? `Test Case ${index + 1} Passed`
            : `Test Case ${index + 1} Failed: expected ${formatValue(testCase.expected)} but received ${formatValue(result)}. ${testCase.explanation || challengeContent.hint}`,
        });
      } catch (error: unknown) {
        allPassed = false;
        results.push({
          passed: false,
          message: `Test Case ${index + 1} Failed: ${getErrorMessage(error)}`,
        });
      }
    }

    if (mode === "run") {
      return NextResponse.json({ passed: allPassed, results }, { status: allPassed ? 200 : 400 });
    }

    if (!allPassed) {
      return NextResponse.json({ error: "Some test cases failed.", passed: false, results }, { status: 400 });
    }

    const attemptId = crypto.randomUUID();
    await dbQuery(
      `INSERT INTO user_challenge_attempts (id, user_id, challenge_id, submitted_code, is_solved, attempted_at, completed_at)
       VALUES ($1, $2, $3, $4, TRUE, NOW(), NOW())
       ON CONFLICT (user_id, challenge_id)
       DO UPDATE SET submitted_code = EXCLUDED.submitted_code, is_solved = TRUE, completed_at = NOW()`,
      [attemptId, decoded.userId, challengeId, submittedCode],
    );

    await ensureDailyMissionsAssigned(decoded.userId);
    await dbQuery(
      `UPDATE user_daily_mission_progress
       SET is_completed = TRUE, completed_at = NOW()
       WHERE user_id = $1
         AND assigned_date = CURRENT_DATE
         AND mission_id IN (SELECT id FROM daily_missions WHERE type = 'solve_challenge')
         AND is_completed = FALSE`,
      [decoded.userId],
    );

    await updateUserStreak(decoded.userId);

    return NextResponse.json({
      message: "Coding problem submitted successfully.",
      passed: true,
      results,
    });
  } catch (error) {
    console.error("Challenge Submit Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

