import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { getOrUpdateStreakInfo, ensureDailyMissionsAssigned } from "@/lib/streaks";
import { DashboardClient } from "@/components/DashboardClient";
import {
  getCurrentDayPlan,
  getCurrentPathModule,
  parseLearningProfileCookie,
} from "@/lib/learningProfile";

export const metadata = {
  title: "Dashboard - CodeNivra",
  description: "See what to learn today, what to practice, what to build, and how your streak is growing.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  try {
    const userResult = await dbQuery(
      "SELECT id, name, email, role, status FROM users WHERE id = $1",
      [decoded.userId],
    );

    if (userResult.rows.length === 0) {
      redirect("/login");
    }

    const user = userResult.rows[0];
    if (user.status !== "active") {
      redirect("/login");
    }

    await ensureDailyMissionsAssigned(decoded.userId);

    const missionsRes = await dbQuery(
      `SELECT p.id as progress_id, m.title, m.type, m.xp_reward, p.is_completed
       FROM user_daily_mission_progress p
       JOIN daily_missions m ON p.mission_id = m.id
       WHERE p.user_id = $1 AND p.assigned_date = CURRENT_DATE
       ORDER BY m.id ASC`,
      [decoded.userId],
    );

    const dailyMissions = missionsRes.rows.map((row) => ({
      id: row.progress_id,
      title: row.title,
      type: row.type,
      xpReward: row.xp_reward,
      isCompleted: row.is_completed,
    }));

    const streakInfo = await getOrUpdateStreakInfo(decoded.userId);
    const totalLessonsRes = await dbQuery("SELECT COUNT(*) as count FROM lessons");
    const totalCount = parseInt(totalLessonsRes.rows[0].count, 10);

    const completedLessonsRes = await dbQuery(
      "SELECT COUNT(*) as count FROM user_lesson_progress WHERE user_id = $1 AND is_completed = true",
      [decoded.userId],
    );
    const completedCount = parseInt(completedLessonsRes.rows[0].count, 10);

    const lastOpenedRes = await dbQuery(
      `SELECT p.lesson_id, p.is_completed, l.title, m.course_id
       FROM user_lesson_progress p
       JOIN lessons l ON p.lesson_id = l.id
       JOIN modules m ON l.module_id = m.id
       WHERE p.user_id = $1
       ORDER BY p.last_opened_at DESC
       LIMIT 1`,
      [decoded.userId],
    );

    let continueLesson = null;

    if (lastOpenedRes.rows.length > 0) {
      const lastOpened = lastOpenedRes.rows[0];
      if (!lastOpened.is_completed) {
        continueLesson = {
          id: lastOpened.lesson_id,
          title: lastOpened.title,
          courseId: lastOpened.course_id,
        };
      }
    }

    if (!continueLesson) {
      const firstIncompleteRes = await dbQuery(
        `SELECT l.id, l.title, m.course_id
         FROM lessons l
         JOIN modules m ON l.module_id = m.id
         LEFT JOIN user_lesson_progress p ON l.id = p.lesson_id AND p.user_id = $1
         WHERE COALESCE(p.is_completed, FALSE) = FALSE
         ORDER BY m.order_index ASC, l.order_index ASC
         LIMIT 1`,
        [decoded.userId],
      );

      if (firstIncompleteRes.rows.length > 0) {
        continueLesson = {
          id: firstIncompleteRes.rows[0].id,
          title: firstIncompleteRes.rows[0].title,
          courseId: firstIncompleteRes.rows[0].course_id,
        };
      }
    }

    const challengesCountRes = await dbQuery("SELECT COUNT(*) as count FROM coding_challenges");
    const totalChallengesCount = parseInt(challengesCountRes.rows[0].count, 10);

    let todayChallenge = null;
    if (totalChallengesCount > 0) {
      const todayChallengeIndexRes = await dbQuery(
        `SELECT ((CURRENT_DATE - '2026-07-01'::date) % $1) as offset_val`,
        [totalChallengesCount],
      );
      const todayChallengeOffset = Math.abs(parseInt(todayChallengeIndexRes.rows[0].offset_val || "0", 10));

      const challengeRes = await dbQuery(
        `SELECT c.id, c.title, c.difficulty,
                COALESCE(a.is_solved, FALSE) as is_solved
         FROM coding_challenges c
         LEFT JOIN user_challenge_attempts a ON c.id = a.challenge_id AND a.user_id = $1
         ORDER BY c.order_index ASC
         LIMIT 1 OFFSET $2`,
        [decoded.userId, todayChallengeOffset],
      );

      if (challengeRes.rows.length > 0) {
        todayChallenge = {
          id: challengeRes.rows[0].id,
          title: challengeRes.rows[0].title,
          difficulty: challengeRes.rows[0].difficulty,
          isSolved: challengeRes.rows[0].is_solved,
        };
      }
    }

    const learningProfileCookie = cookieStore.get("learning_profile")?.value;
    const learningProfile = parseLearningProfileCookie(learningProfileCookie);
    const currentModule = getCurrentPathModule(learningProfile, completedCount);
    const currentDayPlan = getCurrentDayPlan(learningProfile, completedCount);

    let projectSubmission = null;
    if (currentDayPlan.projectSlug) {
      try {
        const submissionRes = await dbQuery(
          `SELECT github_url, live_url, review_status, submitted_at
           FROM user_project_submissions
           WHERE user_id = $1 AND project_slug = $2`,
          [decoded.userId, currentDayPlan.projectSlug],
        );

        if (submissionRes.rows.length > 0) {
          projectSubmission = {
            githubUrl: submissionRes.rows[0].github_url,
            liveUrl: submissionRes.rows[0].live_url,
            reviewStatus: submissionRes.rows[0].review_status,
            submittedAt: submissionRes.rows[0].submitted_at,
          };
        }
      } catch (error) {
        console.error("Dashboard project submission lookup failed:", error);
      }
    }

    const showProfilePrompt = !learningProfileCookie;

    return (
      <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
        <DashboardClient
          user={user}
          totalCount={totalCount}
          completedCount={completedCount}
          continueLesson={continueLesson}
          dailyMissions={dailyMissions}
          streakInfo={streakInfo}
          todayChallenge={todayChallenge}
          learningProfile={learningProfile}
          currentModuleTitle={currentModule.title}
          currentDayPlan={currentDayPlan}
          projectSubmission={projectSubmission}
          showProfilePrompt={showProfilePrompt}
        />
      </div>
    );
  } catch (error) {
    console.error("Dashboard Server Load Error:", error);
    redirect("/login");
  }
}

