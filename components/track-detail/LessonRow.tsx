import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LessonRow({
  indexLabel,
  title,
  href,
}: {
  indexLabel: string;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-700">
          {indexLabel}
        </span>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
      </div>
      <span className="inline-flex items-center gap-1 pl-10 text-xs font-semibold text-indigo-700 sm:pl-0">
        Start Guide
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
