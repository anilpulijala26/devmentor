import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { ChevronRight, CheckCircle2, Code2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Coding Problems - CodeNivra",
  description: "Solve one beginner-friendly JavaScript coding problem each day.",
};

export default async function ChallengesCatalogPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  const challengesRes = await dbQuery(
    `SELECT c.id, c.title, c.description, c.difficulty, c.order_index,
            COALESCE(a.is_solved, FALSE) as is_solved
     FROM coding_challenges c
     LEFT JOIN user_challenge_attempts a ON c.id = a.challenge_id AND a.user_id = $1
     ORDER BY c.order_index ASC`,
    [decoded.userId],
  );

  const challenges = challengesRes.rows;
  const todayIndexRes = await dbQuery(`SELECT ((CURRENT_DATE - '2026-07-01'::date) % 10) as offset_val`);
  const todayOffset = Math.abs(parseInt(todayIndexRes.rows[0].offset_val || "0", 10));
  const todayChallenge = challenges[todayOffset] || challenges[0];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Link href="/dashboard" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-500">Practice</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Daily Coding Problems</h1>
          <p className="mt-2 text-slate-500 max-w-2xl">Solve one small JavaScript problem every day to build confidence and strengthen problem-solving habits.</p>
        </div>

        {todayChallenge ? (
          <div className="mb-12 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Today&apos;s Problem</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${todayChallenge.difficulty === "Easy" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{todayChallenge.difficulty}</span>
                  {todayChallenge.is_solved ? <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span> : null}
                </div>
                <h2 className="text-2xl font-bold mt-4 tracking-tight">{todayChallenge.title}</h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">{todayChallenge.description}</p>
              </div>
              <Link href="/challenges/today" className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-50 transition-colors font-bold px-6 py-3.5 rounded-2xl shadow-lg text-sm">
                {todayChallenge.is_solved ? "Review Solution" : "Solve Today&apos;s Problem"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : null}

        <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2"><Code2 className="w-5 h-5 text-indigo-500" /> Problem Archive</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => {
            const isToday = challenge.id === todayChallenge?.id;
            return (
              <div key={challenge.id} className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between ${isToday ? "border-indigo-500 shadow-md ring-1 ring-indigo-500/10" : "border-slate-200/80 hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:border-slate-300"}`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold font-mono">PROBLEM #{challenge.order_index}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${challenge.difficulty === "Easy" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{challenge.difficulty}</span>
                      {isToday ? <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Active</span> : null}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-3.5 tracking-tight">{challenge.title}</h3>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">{challenge.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {challenge.is_solved ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Completed</span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">Not Submitted Yet</span>
                  )}
                  {isToday ? <Link href="/challenges/today" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">Open Problem <ChevronRight className="w-3.5 h-3.5" /></Link> : <span className="text-xs text-slate-300 font-semibold">Unlock on cycle</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

