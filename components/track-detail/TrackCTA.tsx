import Link from "next/link";

export function TrackCTA() {
  return (
    <section className="rounded-[24px] bg-slate-950 p-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">Keep the guided flow moving</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Finish the lesson, open the related practice task, then move into projects and interview explanation.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Open Projects
          </Link>
          <Link
            href="/interview"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Practice Interview
          </Link>
        </div>
      </div>
    </section>
  );
}
