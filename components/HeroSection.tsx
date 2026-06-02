import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white pt-10 pb-16 md:pt-16 md:pb-22 overflow-hidden border-b border-slate-100">
      {/* Soft background glow meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-purple-50/40 rounded-full blur-[140px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details Column */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-3.5 py-1.5 rounded-full text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">
                Production-ready developer learning platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-650 via-indigo-700 to-purple-600">Full-Stack Development</span> <br />
              Through Real-World Practice
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed max-w-2xl font-semibold">
              Learn frontend, backend, projects, code review, deployment, and interview explanation through one guided platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn"
                className="group inline-flex items-center justify-center gap-2 bg-indigo-650 hover:bg-indigo-700 text-white px-6 h-12 rounded-xl font-bold text-sm transition-all duration-205 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer shadow-sm hover:shadow-indigo-100"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/roadmaps"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:scale-98 border border-slate-200 text-slate-705 px-6 h-12 rounded-xl font-bold text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer shadow-3xs"
              >
                Explore Roadmaps
              </Link>
            </div>
            
            {/* Small Trust Line */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 flex-wrap">
                <span>Frontend</span>
                <span className="text-slate-300">•</span>
                <span>Backend</span>
                <span className="text-slate-300">•</span>
                <span>Projects</span>
                <span className="text-slate-300">•</span>
                <span>Code Review</span>
                <span className="text-slate-300">•</span>
                <span>Deployment</span>
              </p>
            </div>
          </div>

          {/* Right Column: Premium Dashboard Preview Mockup Card */}
          <div className="lg:col-span-5 relative animate-fade-in-delayed">
            {/* Glowing card border mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-10 pointer-events-none" />
            
            <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden group">
              {/* Top Window dots */}
              <div className="flex gap-1.5 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              </div>

              {/* Selector level tabs */}
              <div className="bg-slate-50 border border-slate-100 p-1 rounded-xl flex gap-1 mb-6">
                {["Beginner", "Mid-Level", "Senior"].map((lvl) => {
                  const isActive = lvl === "Mid-Level";
                  return (
                    <span
                      key={lvl}
                      className={`flex-1 text-center py-2 rounded-lg text-2xs font-extrabold transition-all duration-300 ${
                        isActive
                          ? "bg-white text-indigo-700 shadow-xs border border-indigo-100/50"
                          : "text-slate-400"
                      }`}
                    >
                      {lvl}
                    </span>
                  );
                })}
              </div>

              {/* Main Panel Content */}
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold text-indigo-500 uppercase tracking-widest">Active Path</span>
                    <h3 className="text-sm font-black text-slate-800">Full-Stack Developer</h3>
                  </div>
                  <span className="text-[10px] font-extrabold bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg">
                    Tier 2
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-2xs font-extrabold text-slate-500 uppercase tracking-wider">
                    <span>Next Recommended Action</span>
                    <span className="text-indigo-650 font-black">Build Project</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-black text-slate-800">
                      <span>Task Manager Kanban</span>
                      <span>42% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>

                {/* Steps List horizontal layout */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Workflow Timeline</span>
                  <div className="grid grid-cols-5 gap-1.5 relative">
                    {[
                      { name: "Learn", active: true },
                      { name: "Practice", active: true },
                      { name: "Build", active: true },
                      { name: "Review", active: false },
                      { name: "Deploy", active: false }
                    ].map((step, idx) => (
                      <div key={idx} className="text-center space-y-1.5">
                        <div className="flex justify-center">
                          {step.active ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                          ) : (
                            <span className="w-4.5 h-4.5 rounded-full border-2 border-slate-200 bg-white block shrink-0" />
                          )}
                        </div>
                        <span className={`block text-[9px] font-extrabold ${step.active ? "text-indigo-700" : "text-slate-400"}`}>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
