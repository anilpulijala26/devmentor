import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProjectCTA() {
  return (
    <section className="rounded-[2rem] bg-[#1E1B4B] p-6 text-white shadow-xs">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-200">
        Final Step
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold">Deploy your project, then submit your GitHub link and live URL.</p>
          <p className="max-w-xl text-sm text-slate-300">
            After you save the links, use the interview section to rehearse how you will explain the build and the tradeoffs you made.
          </p>
        </div>
        <Link
          href="#project-submission"
          className="inline-flex items-center gap-2 rounded-full bg-[#4F46E5] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4338CA]"
        >
          Open Submission
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
