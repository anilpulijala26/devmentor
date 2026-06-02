import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-16 sm:py-24 border-t border-slate-900 text-white">
      {/* Inner radial gradient grids and glow meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/10 rounded-full filter blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[9px] font-extrabold uppercase tracking-widest">
          Build Without Limits
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.25]">
          Ready to Learn, Build, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300">
            Review, and Deploy?
          </span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
          Start with a roadmap, practice daily tasks, build real projects, and prepare to explain your work confidently in interviews.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-extrabold hover:bg-slate-50 transition shadow-md hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transform hover:-translate-y-0.5 active:scale-98"
          >
            Start Learning <ArrowRight className="w-4.5 h-4.5 text-indigo-600" />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transform hover:-translate-y-0.5 active:scale-98"
          >
            View Project Labs
          </Link>
        </div>
      </div>
    </section>
  );
}
