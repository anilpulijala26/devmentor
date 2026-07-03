import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProjectCTA() {
  return (
    <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xs">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
        Ready to Submit Your Project?
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold">Share your GitHub link, live URL, and explain what you built.</p>
          <p className="max-w-xl text-sm text-slate-300">
            Use the code review workspace after you finish your project stages and before you submit your final build.
          </p>
        </div>
        <Link
          href="/code-review"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
        >
          Open Code Review
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}


