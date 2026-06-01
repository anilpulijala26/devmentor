import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 border-t border-slate-800 text-white">
      {/* Subtle inner radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full filter blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to Build at Production Level?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Select a role-based roadmap path, build real projects, practice daily tasks, and prepare for system architecture interviews.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            Explore Roadmaps <ArrowRight className="w-4.5 h-4.5 text-indigo-600" />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
