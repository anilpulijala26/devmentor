import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import {
  LEARNING_PATHS,
  getCurrentDayPlan,
  getCurrentPathModule,
  parseLearningProfileCookie,
} from "@/lib/learningProfile";
import { ArrowRight, MessageSquareQuote } from "lucide-react";

export const metadata = {
  title: "Interview - CodeNivra",
  description: "Read beginner-friendly interview questions and short expected answers after each lesson.",
};

export default async function InterviewPage() {
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
  const currentModule = getCurrentPathModule(profile, 0);
  const currentDay = getCurrentDayPlan(profile, 0);
  const allQuestions = path.modules.flatMap((module) =>
    module.dayPlans.map((day) => ({
      moduleTitle: module.title,
      day: day.day,
      lessonTitle: day.lessonTitle,
      question: day.interviewQuestion,
      answer: day.interviewAnswer,
    })),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <MessageSquareQuote className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Interview readiness</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Practice explaining what you learn</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                After each lesson or coding problem, read one short interview question and one expected answer. Keep it simple and say it in your own words.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Today&apos;s question</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{currentDay.interviewQuestion}</p>
            <p className="mt-2 text-sm text-slate-600">{currentDay.interviewAnswer}</p>
            <p className="mt-3 text-xs text-slate-500">Current module: {currentModule.title} • Day {currentDay.day}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {allQuestions.map((item) => (
            <article key={`${item.moduleTitle}-${item.day}-${item.question}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{item.moduleTitle} • Day {item.day}</p>
              <h2 className="mt-2 text-base font-bold text-slate-950">{item.lessonTitle}</h2>
              <p className="mt-4 text-sm font-semibold text-slate-900">Q: {item.question}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Expected answer: {item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Back to Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

