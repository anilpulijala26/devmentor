import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { DeveloperTask } from "@/lib/tasks";
import { TagBadge } from "@/components/marketing-primitives";

export function PracticeCard({ task }: { task: DeveloperTask }) {
  return (
    <article className="flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <TagBadge
          label={task.level}
          tone={task.level === "Beginner" ? "blue" : task.level === "Intermediate" ? "violet" : "emerald"}
        />
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          {task.level === "Beginner" ? "15 mins" : task.level === "Intermediate" ? "30 mins" : "45 mins"}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">{task.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{task.requirement}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.hints.slice(0, 2).map((hint, index) => (
          <TagBadge key={`${task.slug}-${index}`} label={hint.split(" ").slice(0, 2).join(" ")} />
        ))}
      </div>

      <Link
        href={`/tasks/${task.slug}`}
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
      >
        Start Task
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
