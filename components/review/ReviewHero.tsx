export function ReviewHero() {
  return (
    <section className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
        <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
        Review workspace
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
          Senior Code Review & Audit Console
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Use this console after completing a practice task or project lab. Review your code against real-world frontend, accessibility, performance, security, and deployment standards.
        </p>
      </div>
      <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
        33 Review Checks • 11 Categories
      </div>
    </section>
  );
}
