import Link from "next/link";
import { ArrowRight, BookOpen, Code2, FolderKanban, ChevronRight, Rocket, Brain, Sparkles } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/jwt";

export const metadata = {
  title: "CodeNivra - Guided Full-Stack Web Development Learning",
  description: "Master coding from scratch to deployment with structured frontend, backend, fullstack paths, daily challenges, and project practice.",
};

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let isLoggedIn = false;

  if (token) {
    const decoded = verifyJWT(token);
    isLoggedIn = !!decoded;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.15),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#ffffff_20%,#f8fafc_100%)] text-slate-900">
      
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 border-b border-slate-200/65">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Guided Web Development Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 max-w-4xl mx-auto leading-[1.08]">
            Master Full-Stack Engineering Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">Guided Daily Practice</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Build coding consistency, solve daily challenges, progress through structured roadmaps, and build deployable full-stack projects.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4.5 max-w-md mx-auto sm:max-w-none">
            <Link
              href={isLoggedIn ? "/dashboard" : "/register"}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-bold px-7.5 py-4.5 rounded-2xl shadow-lg hover:shadow-xl text-base w-full sm:w-auto shadow-indigo-600/10"
            >
              Start My Roadmap <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Promise */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Our Promise</p>
          <blockquote className="mt-4 text-lg md:text-xl font-medium text-slate-700 leading-relaxed italic">
            "CodeNivra bridges the gap between learning theoretical concepts and shipping real-world web applications by enforcing daily consistency, structured lesson loops, and hand-written portfolio project builds."
          </blockquote>
        </div>
      </section>

      {/* Benefit Cards Section */}
      <section className="py-16 md:py-24 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Structured Learning Ecosystem</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">Everything you need to advance from programming basics to production ready developer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5 border border-indigo-100/50">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Guided Roadmaps</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
                  Follow step-by-step curriculum modules. Learn HTML, CSS, JavaScript, React, Next.js, Node.js, databases, and secure web servers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-bold">
                <span>Start path</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 border border-emerald-100/50">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Daily Habit Loops</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
                  Build habits that stick. Set up daily streaks, complete 3 mission tasks today, and solve structured algorithm challenges.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-bold">
                <span>Form consistency</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-5 border border-violet-100/50">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Portfolio-Ready Labs</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
                  Write complete, clean code templates. Set up responsive interfaces, connect APIs, secure tables, and deploy active apps.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-violet-600 font-bold">
                <span>Build projects</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Learning Flow Preview */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your Path to Code Mastery</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">Follow our verified, production-aligned step flow to launch your developer roadmap.</p>
          </div>

          <div className="relative">
            {/* Timeline connector (desktop) */}
            <div className="absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-slate-200 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-950">Join a Path</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed max-w-[200px] mx-auto">
                  Create your profile and enroll in structured HTML, CSS, React, or Node paths.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-950">Form Habits</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed max-w-[200px] mx-auto">
                  Complete daily missions, read logs, and check off objectives to build your streak.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-950">Solve Challenges</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed max-w-[200px] mx-auto">
                  Solve daily JavaScript algorithm exercises, submit code, and test outputs.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 font-bold text-lg mx-auto mb-4">
                  4
                </div>
                <h3 className="text-base font-bold text-slate-950">Build & Deploy</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed max-w-[200px] mx-auto">
                  Construct full portfolio projects, pass reviews, and publish to production.
                </p>
              </div>

            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl text-center max-w-4xl mx-auto border border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Ready to build your developer portfolio?</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">Enroll today and gain immediate access to structured syllabus guides, code challenge tools, and project labs.</p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-bold px-6 py-4.5 rounded-2xl shadow-lg w-full sm:w-auto text-sm"
              >
                Build My First Project
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 transition-all text-white font-bold px-6 py-4.5 rounded-2xl w-full sm:w-auto text-sm border border-white/5"
              >
                Prepare for Developer Jobs
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
