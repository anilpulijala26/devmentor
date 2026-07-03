import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { getOrUpdateStreakInfo } from "@/lib/streaks";
import { projects } from "@/lib/projects";
import { developerTasks } from "@/lib/tasks";
import { getCurrentDayPlan, getCurrentPathModule, parseLearningProfileCookie } from "@/lib/learningProfile";
import { ArrowLeft, BookOpen, Flame, Award, Target, Trophy, ArrowRight, CheckCircle2, CheckSquare } from "lucide-react";

export const metadata = {
  title: "My Progress - CodeNivra",
  description: "Track your completed lessons, daily goals, streaks, and course progress statistics.",
};

export default async function ProgressPage() {
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
    // --- STREAK INFO ---
    const streakInfo = await getOrUpdateStreakInfo(decoded.userId);

    // --- LESSON PROGRESS ---
    const totalLessonsRes = await dbQuery("SELECT COUNT(*) as count FROM lessons");
    const totalCount = parseInt(totalLessonsRes.rows[0].count, 10);

    const completedLessonsRes = await dbQuery(
      "SELECT COUNT(*) as count FROM user_lesson_progress WHERE user_id = $1 AND is_completed = true",
      [decoded.userId]
    );
    const completedCount = parseInt(completedLessonsRes.rows[0].count, 10);

    // --- TASKS COMPLETED ---
    let completedTasksCount = 0;
    const totalTasks = developerTasks.length;

    try {
      const completedTasksRes = await dbQuery(
        `SELECT COUNT(*) as count FROM user_task_progress WHERE user_id = $1 AND is_completed = TRUE`,
        [decoded.userId],
      );
      completedTasksCount = parseInt(completedTasksRes.rows[0].count, 10);
    } catch (error) {
      console.error("Progress task completion lookup failed:", error);
    }

    // --- PROJECTS COMPLETED / SUBMITTED ---
    let completedProjectsCount = 0;
    const totalProjects = projects.length;

    try {
      const completedProjectsRes = await dbQuery(
        `SELECT COUNT(*) as count FROM user_project_submissions WHERE user_id = $1 AND review_status <> 'not_submitted_yet'`,
        [decoded.userId],
      );
      completedProjectsCount = parseInt(completedProjectsRes.rows[0].count, 10);
    } catch (error) {
      console.error("Progress project submissions lookup failed:", error);
    }

    // --- CONTINUE LEARNING LESSON ---
    const lastOpenedRes = await dbQuery(
      `SELECT p.lesson_id, p.is_completed, l.title, m.course_id
       FROM user_lesson_progress p
       JOIN lessons l ON p.lesson_id = l.id
       JOIN modules m ON l.module_id = m.id
       WHERE p.user_id = $1
       ORDER BY p.last_opened_at DESC
       LIMIT 1`,
      [decoded.userId]
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
        [decoded.userId]
      );

      if (firstIncompleteRes.rows.length > 0) {
        continueLesson = {
          id: firstIncompleteRes.rows[0].id,
          title: firstIncompleteRes.rows[0].title,
          courseId: firstIncompleteRes.rows[0].course_id,
        };
      }
    }

    // --- DAILY MISSION PROGRESS ---
    const missionsRes = await dbQuery(
      `SELECT p.id as progress_id, m.title, m.type, m.xp_reward, p.is_completed
       FROM user_daily_mission_progress p
       JOIN daily_missions m ON p.mission_id = m.id
       WHERE p.user_id = $1 AND p.assigned_date = CURRENT_DATE
       ORDER BY m.id ASC`,
      [decoded.userId]
    );
    const dailyMissions = missionsRes.rows;
    const completedMissionsCount = dailyMissions.filter((m) => m.is_completed).length;

    const learningProfile = parseLearningProfileCookie(cookieStore.get("learning_profile")?.value);
    const currentModule = getCurrentPathModule(learningProfile, completedCount);
    const currentDayPlan = getCurrentDayPlan(learningProfile, completedCount);

    // Percent computations
    const lessonsPercent = totalCount > 0 ? Math.min(Math.round((completedCount / totalCount) * 100), 100) : 0;
    const tasksPercent = totalTasks > 0 ? Math.min(Math.round((completedTasksCount / totalTasks) * 100), 100) : 0;
    const projectsPercent = totalProjects > 0 ? Math.min(Math.round((completedProjectsCount / totalProjects) * 100), 100) : 0;

    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.1),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#ffffff_20%,#f8fafc_100%)] pb-20 relative overflow-hidden">
        {/* Background grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>

          <div className="space-y-8">
            
            {/* Header section */}
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-indigo-650 font-bold bg-indigo-50 px-3 py-1.5 rounded-full">
                Learning Performance
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4">
                My Learning Progress
              </h1>
              <p className="text-slate-500 text-sm mt-2 max-w-xl">
                Track your active streaks, check off daily objectives, and watch your developer syllabus completion statistics.
              </p>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              
              {/* Completed lessons metric card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Lessons Completion</span>
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">{completedCount}</span>
                  <span className="text-sm font-semibold text-slate-400">/ {totalCount}</span>
                </div>
                <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${lessonsPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block font-mono font-medium">
                  {lessonsPercent}% syllabus completed
                </span>
              </div>


              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Practice Completion</span>
                  <CheckSquare className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">{completedTasksCount}</span>
                  <span className="text-sm font-semibold text-slate-400">/ {totalTasks}</span>
                </div>
                <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${tasksPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block font-mono font-medium">
                  {tasksPercent}% practice tasks completed
                </span>
              </div>

              {/* Streak metric card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Coding Streak</span>
                  <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">{streakInfo.currentStreak}</span>
                  <span className="text-sm font-semibold text-amber-600">Days Active 🔥</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Longest streak: {streakInfo.longestStreak} days</span>
                </div>
              </div>

              {/* Projects built metric card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Projects Completed</span>
                  <Award className="w-5 h-5 text-purple-500" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">{completedProjectsCount}</span>
                  <span className="text-sm font-semibold text-slate-400">/ {totalProjects}</span>
                </div>
                <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${projectsPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block font-mono font-medium">
                  {projectsPercent}% projects finished
                </span>
              </div>

            </div>

            {/* Current Lesson card & Daily Mission grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Continue Learning */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650 shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Current Learning Step</h3>
                      <p className="text-xs text-slate-400 font-medium">Your active module, day, and next lesson</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CURRENT TOPIC</p>
                    <h4 className="text-base font-black text-slate-800 mt-1">
                      {continueLesson ? continueLesson.title : currentDayPlan.lessonTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {continueLesson 
                        ? `Module: ${currentModule.title} ? Day ${currentDayPlan.day}. Finish the lesson, then move into practice, challenge, interview, and project submission.`
                        : `Module: ${currentModule.title} ? Day ${currentDayPlan.day}. Start today's lesson and follow the guided daily plan.`}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center">
                    <Link
                      href={continueLesson ? `/lessons/${continueLesson.id}` : `/courses`}
                      className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm w-full sm:w-auto"
                    >
                      {continueLesson ? "Continue Learning" : "Start Today's Lesson"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Today's Mission progress */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-8">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900">Today's Missions</h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    Your assigned daily goals. Open lessons, solve algorithm challenges, and practice build steps to finish these tasks.
                  </p>

                  <div className="space-y-3">
                    {dailyMissions.length > 0 ? (
                      dailyMissions.map((mission) => (
                        <div key={mission.progress_id} className="flex items-start gap-2.5 p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                          <div className={`mt-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center border shrink-0 ${
                            mission.is_completed 
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                              : "border-slate-250 bg-white"
                          }`}>
                            {mission.is_completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-semibold truncate ${mission.is_completed ? "text-slate-400 line-through" : "text-slate-750"}`}>
                              {mission.title}
                            </p>
                            <span className="text-[9px] text-slate-400 font-mono font-medium">+{mission.xp_reward} XP</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic text-center py-4">No daily missions loaded for today.</p>
                    )}
                  </div>

                  {dailyMissions.length > 0 && completedMissionsCount === dailyMissions.length && (
                    <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-center text-xs font-bold text-emerald-800">
                      🎉 100% Completed Today!
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  } catch (error) {
    console.error("Progress Server Load Error:", error);
    redirect("/login");
  }
}
