import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white pt-8 pb-14 md:pt-12 md:pb-18 overflow-hidden border-b border-slate-100">
      {/* Soft background glow meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-50/30 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details Column */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-3.5 py-1 rounded-full text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Production-Ready Engineering Curriculum
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Master Frontend, Backend & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600">
                Full-Stack Development
              </span> <br />
              Through Real Projects
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed max-w-2xl font-normal">
              CodeNivra helps developers learn from fundamentals to production deployment with structured roadmaps, daily coding tasks, real-world project labs, code review checklists, and interview-ready explanations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn"
                className="group inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-755 text-white px-6 h-12 rounded-xl font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer shadow-xs"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/roadmaps"
                className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 px-6 h-12 rounded-xl font-medium text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer"
              >
                Explore Roadmaps
              </Link>
            </div>
          </div>

          {/* Right Column: Learning Journey Preview Card */}
          <div className="lg:col-span-5 relative animate-fade-in-delayed">
            <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.03)] relative">
              
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Your Learning Journey</h2>
                <p className="text-xs text-slate-400 mt-1 font-normal leading-relaxed">Follow a structured path from fundamentals to real-world projects.</p>
              </div>

              {/* Step list with vertical line */}
              <div className="relative space-y-6 pl-2">
                {/* Subtle vertical connector line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-100" />

                {[
                  {
                    step: 1,
                    title: "Learn Fundamentals",
                    desc: "HTML, CSS, JavaScript, Git"
                  },
                  {
                    step: 2,
                    title: "Build Frontend Skills",
                    desc: "React, TypeScript, Next.js"
                  },
                  {
                    step: 3,
                    title: "Develop Backend APIs",
                    desc: "Node.js, Express.js, PostgreSQL"
                  },
                  {
                    step: 4,
                    title: "Deploy & Get Job-Ready",
                    desc: "CI/CD, AWS/Azure, interview prep"
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start relative z-10 group">
                    <span className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center shrink-0 text-xs font-bold text-slate-700 transition duration-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-2xs">
                      {item.step}
                    </span>
                    <div className="space-y-0.5">
                      <h3 className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-indigo-600 transition duration-200">{item.title}</h3>
                      <p className="text-2xs sm:text-xs text-slate-450 font-normal leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom secondary summary row */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-around text-center text-slate-400 text-[9px] font-bold tracking-wider">
                <div>
                  <span className="block text-sm font-bold text-slate-800">5</span>
                  <span>TRACKS</span>
                </div>
                <div className="border-l border-slate-100 h-6 self-center" />
                <div>
                  <span className="block text-sm font-bold text-slate-800">25+</span>
                  <span>MODULES</span>
                </div>
                <div className="border-l border-slate-100 h-6 self-center" />
                <div>
                  <span className="block text-sm font-bold text-slate-800">15+</span>
                  <span>PROJECTS</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
