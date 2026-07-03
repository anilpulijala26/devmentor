import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import {
  LEARNING_PATHS,
  getModuleStatus,
  parseLearningProfileCookie,
} from "@/lib/learningProfile";
import { ArrowRight, BookOpen, Lock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Learn - CodeNivra",
  description: "Follow your JavaScript learning path module by module and day by day.",
};

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  const profile = parseLearningProfileCookie(cookieStore.get("learning_profile")?.value);
  const path = LEARNING_PATHS[profile.pathKey];

  const completedLessonsRes = await dbQuery(
    "SELECT COUNT(*) as count FROM user_lesson_progress WHERE user_id = $1 AND is_completed = true",
    [decoded.userId],
  );
  const completedCount = parseInt(completedLessonsRes.rows[0].count, 10);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-[#4F46E5] mb-4 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5" /> Learning Path
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">{path.title}</h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
            Move through one active module at a time. Each module is broken into lessons, practice tasks, coding problems, interview questions, and project steps.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {path.modules.map((module) => {
            const status = getModuleStatus(profile, module.order, completedCount);
            const isActive = status === "Active";
            return (
              <article key={module.order} className={`rounded-[2rem] border p-6 shadow-sm ${isActive ? "border-[#4F46E5] bg-white" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Module {module.order}</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{module.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${status === "Active" ? "bg-indigo-50 text-[#4F46E5]" : status === "Completed" ? "bg-emerald-50 text-emerald-700" : status === "Upcoming" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                    {status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Lessons</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {module.lessonTopics.slice(0, 4).map((topic) => <li key={topic}>• {topic}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Day Flow</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Lesson</li>
                      <li>• Practice Task</li>
                      <li>• Coding Problem</li>
                      <li>• Interview Question</li>
                      <li>• Project Step</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Day 1 Preview</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">Learn: {module.dayPlans[0]?.lessonTitle}</p>
                  <p className="mt-1 text-sm text-slate-600">Practice: {module.dayPlans[0]?.practiceTitle}</p>
                  <p className="mt-1 text-sm text-slate-600">Build: {module.dayPlans[0]?.projectStepTitle}</p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                    {status === "Locked" ? <Lock className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                    {status === "Locked" ? "Unlock by finishing the earlier active module" : "Ready for guided daily learning"}
                  </div>
                  <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338CA]">
                    {isActive ? "Open Dashboard Plan" : "View Dashboard"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

