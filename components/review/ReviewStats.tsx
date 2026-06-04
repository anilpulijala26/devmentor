import { ClipboardCheck } from "lucide-react";
import { ReadinessBadge, getReadiness } from "./ReadinessBadge";

interface ReviewStatsProps {
  progress: number;
  totalChecked: number;
  totalItems: number;
  totalCategories: number;
}

const readinessMeaning = [
  "0-40%: Needs Work",
  "41-75%: Improving",
  "76-90%: Review Ready",
  "91-100%: Production Ready",
];

export function ReviewStats({
  progress,
  totalChecked,
  totalItems,
  totalCategories,
}: ReviewStatsProps) {
  const readiness = getReadiness(progress);

  return (
    <section className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Audit Progress</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{progress}%</p>
        </article>
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Review Checks Completed</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {totalChecked} / {totalItems}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Review Categories</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{totalCategories}</p>
        </article>
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Readiness Status</p>
          <div className="mt-3">
            <ReadinessBadge progress={progress} />
          </div>
        </article>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <ClipboardCheck className="h-4 w-4 text-indigo-600" />
            Console Progress
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-bold ${readiness.tone}`}>
            {readiness.label}
          </span>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {readinessMeaning.map((item) => (
            <div
              key={item}
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                item.startsWith(readiness.description)
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
