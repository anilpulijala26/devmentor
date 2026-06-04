import Link from "next/link";

export function TrackCTA() {
  return (
    <section className="rounded-[24px] bg-slate-950 p-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">Ready to Audit Your Code?</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Validate your task solutions and project outputs against senior coding standards.
          </p>
        </div>
        <Link
          href="/code-review"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          Open Code Review Console
        </Link>
      </div>
    </section>
  );
}
