"use client";

import { ChevronDown } from "lucide-react";
import type { ReviewCategory } from "./review-data";
import { ReviewChecklistItem } from "./ReviewChecklistItem";

interface ReviewCategoryAccordionProps {
  category: ReviewCategory;
  categoryNumber: number;
  completedCount: number;
  expanded: boolean;
  onToggle: () => void;
  onToggleItem: (itemIndex: number) => void;
  checkedState: Record<string, boolean>;
}

function getStatus(completedCount: number, itemCount: number) {
  if (completedCount === itemCount) {
    return {
      label: "Completed",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (completedCount > 0) {
    return {
      label: "In Progress",
      tone: "border-indigo-200 bg-indigo-50 text-indigo-700",
    };
  }

  return {
    label: "Not Started",
    tone: "border-slate-200 bg-slate-50 text-slate-600",
  };
}

function getPriorityTone(priority: ReviewCategory["priority"]) {
  return {
    Recommended: "border-slate-200 bg-slate-50 text-slate-600",
    Important: "border-amber-200 bg-amber-50 text-amber-700",
    Critical: "border-rose-200 bg-rose-50 text-rose-700",
  }[priority];
}

export function ReviewCategoryAccordion({
  category,
  categoryNumber,
  completedCount,
  expanded,
  onToggle,
  onToggleItem,
  checkedState,
}: ReviewCategoryAccordionProps) {
  const status = getStatus(completedCount, category.items.length);

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-xs">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div className="flex min-w-0 items-start gap-4">
          <span className="pt-1 text-lg font-black tracking-[0.14em] text-slate-300 sm:text-xl">
            {String(categoryNumber).padStart(2, "0")}
          </span>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{category.title}</h3>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${getPriorityTone(category.priority)}`}>
                {category.priority}
              </span>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${status.tone}`}>
                {status.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{category.description}</p>
            <p className="text-xs font-semibold text-slate-500">
              {completedCount} / {category.items.length} Completed
            </p>
          </div>
        </div>
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition ${
            expanded ? "rotate-180 border-indigo-200 bg-indigo-50 text-indigo-700" : ""
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      {expanded ? (
        <div className="border-t border-slate-100 px-5 py-4">
          <div className="space-y-1">
            {category.items.map((item, index) => {
              const key = `${category.id}-${index}`;
              return (
                <ReviewChecklistItem
                  key={key}
                  checked={!!checkedState[key]}
                  item={item}
                  onToggle={() => onToggleItem(index)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
