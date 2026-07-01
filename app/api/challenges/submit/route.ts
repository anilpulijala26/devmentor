import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import vm from "vm";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { ensureDailyMissionsAssigned, updateUserStreak } from "@/lib/streaks";

interface TestCase {
  input: any[];
  expected: any;
}

const challengeTestCases: Record<string, { funcName: string; cases: TestCase[] }> = {
  "c17ac10b-58cc-4372-a567-0e02b2c3d401": { // Return the Sum of Two Numbers
    funcName: "addition",
    cases: [
      { input: [2, 3], expected: 5 },
      { input: [-3, -6], expected: -9 },
      { input: [7, 3], expected: 10 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d402": { // Convert Minutes into Seconds
    funcName: "convert",
    cases: [
      { input: [5], expected: 300 },
      { input: [3], expected: 180 },
      { input: [2], expected: 120 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d403": { // Return the Next Number
    funcName: "addition",
    cases: [
      { input: [0], expected: 1 },
      { input: [9], expected: 10 },
      { input: [-3], expected: -2 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d404": { // Area of a Triangle
    funcName: "triArea",
    cases: [
      { input: [3, 2], expected: 3 },
      { input: [7, 4], expected: 14 },
      { input: [10, 10], expected: 50 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d405": { // Find the Smallest Number in an Array
    funcName: "findSmallest",
    cases: [
      { input: [[34, 15, 88, 2]], expected: 2 },
      { input: [[34, -345, -1, 100]], expected: -345 },
      { input: [[7, 7, 7]], expected: 7 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d406": { // First Element in an Array
    funcName: "getFirstValue",
    cases: [
      { input: [[1, 2, 3]], expected: 1 },
      { input: [[80, 5, 100]], expected: 80 },
      { input: [[-500, 0, 50]], expected: -500 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d407": { // Power Calculator
    funcName: "circuitPower",
    cases: [
      { input: [230, 10], expected: 2300 },
      { input: [110, 3], expected: 330 },
      { input: [480, 20], expected: 9600 }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d408": { // Return Something to Me
    funcName: "giveMeSomething",
    cases: [
      { input: ["is better than nothing"], expected: "something is better than nothing" },
      { input: ["Bob Dylan"], expected: "something Bob Dylan" },
      { input: ["something"], expected: "something something" }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d409": { // Is the Number Less than or Equal to Zero?
    funcName: "lessThanOrEqualToZero",
    cases: [
      { input: [5], expected: false },
      { input: [0], expected: true },
      { input: [-2], expected: true }
    ]
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d410": { // Divides Evenly
    funcName: "dividesEvenly",
    cases: [
      { input: [98, 7], expected: true },
      { input: [85, 4], expected: false },
      { input: [10, 2], expected: true }
    ]
  }
};

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
    const { challengeId, submittedCode } = body;

    if (!challengeId || !submittedCode) {
      return NextResponse.json(
        { error: "Challenge ID and submitted code are required." },
        { status: 400 }
      );
    }

    // Verify challenge exists
    const challengeCheck = await dbQuery("SELECT id, starter_code FROM coding_challenges WHERE id = $1", [challengeId]);
    if (challengeCheck.rows.length === 0) {
      return NextResponse.json({ error: "Coding challenge not found." }, { status: 404 });
    }

    const starterCode = challengeCheck.rows[0].starter_code;
    const trimmedSubmitted = submittedCode.trim();
    const trimmedStarter = starterCode.trim();

    if (!trimmedSubmitted) {
      return NextResponse.json(
        { error: "Submitted code cannot be empty." },
        { status: 400 }
      );
    }

    if (trimmedSubmitted === trimmedStarter) {
      return NextResponse.json(
        { error: "You must write your own solution before submitting! The code cannot match the starter template." },
        { status: 400 }
      );
    }

    // Retrieve assertions mapping for the challenge
    const testSuite = challengeTestCases[challengeId];
    if (!testSuite) {
      return NextResponse.json(
        { error: "Test cases not configured for this challenge." },
        { status: 500 }
      );
    }

    const { funcName, cases } = testSuite;

    // Run submissions in an isolated Node vm context with timeouts
    try {
      const sandbox = {};
      const context = vm.createContext(sandbox);

      // Evaluate the user function definition
      vm.runInNewContext(trimmedSubmitted, context, { timeout: 150 });

      // Run each test assertion
      for (let i = 0; i < cases.length; i++) {
        const tc = cases[i];
        const evalScript = `${funcName}(...${JSON.stringify(tc.input)})`;
        const result = vm.runInNewContext(evalScript, context, { timeout: 80 });

        // Assert structural equality
        if (JSON.stringify(result) !== JSON.stringify(tc.expected)) {
          return NextResponse.json(
            {
              error: `Validation failed: Case ${i + 1} expected ${JSON.stringify(tc.expected)} but returned ${JSON.stringify(result)}.`
            },
            { status: 400 }
          );
        }
      }
    } catch (evalError: any) {
      return NextResponse.json(
        { error: `Compilation/Runtime Error: ${evalError.message || evalError}` },
        { status: 400 }
      );
    }

    const attemptId = crypto.randomUUID();

    // Save successful verified attempt in the DB
    await dbQuery(
      `INSERT INTO user_challenge_attempts (id, user_id, challenge_id, submitted_code, is_solved, attempted_at, completed_at)
       VALUES ($1, $2, $3, $4, TRUE, NOW(), NOW())
       ON CONFLICT (user_id, challenge_id)
       DO UPDATE SET submitted_code = EXCLUDED.submitted_code, is_solved = TRUE, completed_at = NOW()`,
      [attemptId, decoded.userId, challengeId, submittedCode]
    );

    // Guarantee daily missions are assigned
    await ensureDailyMissionsAssigned(decoded.userId);

    // Auto-complete corresponding "Solve one coding challenge" daily task for today if assigned
    await dbQuery(
      `UPDATE user_daily_mission_progress
       SET is_completed = TRUE, completed_at = NOW()
       WHERE user_id = $1
         AND assigned_date = CURRENT_DATE
         AND mission_id IN (SELECT id FROM daily_missions WHERE type = 'solve_challenge')
         AND is_completed = FALSE`,
      [decoded.userId]
    );

    // Trigger streak checks
    await updateUserStreak(decoded.userId);

    return NextResponse.json({
      message: "Coding challenge submitted successfully and passed all tests!",
    });
  } catch (error) {
    console.error("Challenge Submit Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
