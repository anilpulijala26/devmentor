import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/80">
      {/* Soft background glow meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] bg-gradient-to-tr from-indigo-100/30 to-violet-100/20 rounded-full blur-[140px] opacity-80" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-violet-100/20 to-indigo-100/10 rounded-full blur-[150px] opacity-70" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details Column */}
          <div className="lg:col-span-7 space-y-7 text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-[#4F46E5] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">
                Production-ready developer learning platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-black text-slate-900 tracking-tight leading-[1.1]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#4338CA] to-[#7C3AED]">Full-Stack Development</span> <br />
              Through Real-World Practice
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl font-semibold">
              Learn frontend, backend, projects, code review, deployment, and interview explanation through one guided platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn"
                className="group inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-7 h-12 rounded-xl font-bold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer shadow-md hover:shadow-indigo-100 transform active:scale-98 hover:-translate-y-0.5"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/roadmaps"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-7 h-12 rounded-xl font-bold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer shadow-sm hover:-translate-y-0.5 active:scale-98"
              >
                Explore Roadmaps
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Dashboard Preview Mockup Card */}
          <div className="lg:col-span-5 relative animate-fade-in-delayed">
            {/* Floating absolute badges for layered card depth */}
            <div className="absolute -top-6 -left-6 z-20 bg-white text-slate-800 border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 animate-bounce-slow max-w-[200px]">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
                🚀
              </span>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Deployment</p>
                <p className="text-xs font-black text-slate-800 truncate">Deploy to AWS Live</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 z-20 bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-md flex items-center gap-3 max-w-[190px]">
              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Code Audit</p>
                <p className="text-xs font-black text-slate-800">100% Passed</p>
              </div>
            </div>

            {/* Glowing card border mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[2.25rem] blur-2xl opacity-15 pointer-events-none" />
            
            {/* Layered border wrapping */}
            <div className="bg-gradient-to-br from-slate-200 via-slate-100 to-indigo-100/50 p-1 rounded-[2.25rem] shadow-xl">
              <div className="w-full bg-white rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group">
                
                {/* Top Window dots */}
                <div className="flex gap-1.5 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
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
                            ? "bg-white text-indigo-700 shadow-sm border border-indigo-100/50"
                            : "text-slate-400"
                        }`}
                      >
                        {lvl}
                      </span>
                    );
                  })}
                </div>

                {/* Main Panel Content */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-indigo-500 uppercase tracking-widest">Active Path</span>
                      <h3 className="text-sm font-black text-slate-800">Full-Stack Developer</h3>
                    </div>
                    <span className="text-[10px] font-extrabold bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-lg">
                      Tier 2
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3.5">
                    <div className="flex justify-between items-center text-2xs font-extrabold text-slate-500 uppercase tracking-wider">
                      <span>Next Recommended Action</span>
                      <span className="text-indigo-600 font-black">Build Project</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-black text-slate-850">
                        <span>Task Manager Kanban</span>
                        <span>42% Complete</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Steps List horizontal layout with connector lines */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Workflow Timeline</span>
                    <div className="flex items-center justify-between relative z-10 px-1">
                      {/* Connecting Line Connector */}
                      <div className="absolute top-[8px] left-4 right-4 h-0.5 bg-slate-100 -z-10" />
                      <div className="absolute top-[8px] left-4 w-[50%] h-0.5 bg-indigo-500 -z-10" />

                      {[
                        { name: "Learn", active: true },
                        { name: "Practice", active: true },
                        { name: "Build", active: true },
                        { name: "Review", active: false },
                        { name: "Deploy", active: false }
                      ].map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-1.5 bg-white px-1">
                          {step.active ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600 shrink-0 bg-white" />
                          ) : (
                            <span className="w-4.5 h-4.5 rounded-full border-2 border-slate-200 bg-white block shrink-0" />
                          )}
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
      </div>
    </section>
  );
}
