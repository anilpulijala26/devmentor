import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { ChallengeEditorClient } from "@/components/ChallengeEditorClient";

export const metadata = {
  title: "Today's Coding Challenge - CodeNivra",
  description: "Improve your JavaScript problem solving with today's coding challenge.",
};

export default async function TodayChallengePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  // 1. Fetch total challenges count to be safe
  const countRes = await dbQuery("SELECT COUNT(*) as count FROM coding_challenges");
  const totalChallenges = parseInt(countRes.rows[0].count, 10);

  if (totalChallenges === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center max-w-sm">
          <p className="text-slate-500 text-sm">No coding challenges found in the database. Please contact support.</p>
        </div>
      </div>
    );
  }

  // 2. Fetch today's challenge offset
  const todayIndexRes = await dbQuery(
    `SELECT ((CURRENT_DATE - '2026-07-01'::date) % $1) as offset_val`,
    [totalChallenges]
  );
  const todayOffset = Math.abs(parseInt(todayIndexRes.rows[0].offset_val || "0", 10));

  // 3. Fetch challenge by offset
  const challengeRes = await dbQuery(
    `SELECT * FROM coding_challenges ORDER BY order_index ASC LIMIT 1 OFFSET $1`,
    [todayOffset]
  );

  if (challengeRes.rows.length === 0) {
    redirect("/challenges");
  }

  const challenge = challengeRes.rows[0];

  // 4. Fetch previous user attempt if exists
  const attemptRes = await dbQuery(
    `SELECT submitted_code, is_solved FROM user_challenge_attempts WHERE user_id = $1 AND challenge_id = $2`,
    [decoded.userId, challenge.id]
  );

  const prevAttempt = attemptRes.rows.length > 0 ? attemptRes.rows[0] : null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

      <ChallengeEditorClient
        challenge={{
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          starterCode: challenge.starter_code,
          difficulty: challenge.difficulty,
          orderIndex: challenge.order_index,
        }}
        prevSubmission={prevAttempt ? prevAttempt.submitted_code : null}
        isSolved={prevAttempt ? prevAttempt.is_solved : false}
      />
    </div>
  );
}
