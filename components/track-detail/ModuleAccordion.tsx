"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { LessonRow } from "./LessonRow";

interface ModuleLesson {
  slug: string;
  title: string;
  order: number;
}

interface ModuleAccordionProps {
  index: number;
  title: string;
  lessonCount: number;
  difficulty?: string;
  lessons: ModuleLesson[];
  trackSlug: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function ModuleAccordion({
  index,
  title,
  lessonCount,
  difficulty,
  lessons,
  trackSlug,
  isOpen,
  onToggle,
}: ModuleAccordionProps) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
            Module {index + 1}
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
            <span>{lessonCount} lessons</span>
            {difficulty ? <span>{difficulty}</span> : null}
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-slate-500" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
        )}
      </button>

      {isOpen ? (
        <div className="space-y-3 border-t border-slate-100 bg-slate-50/60 p-4">
          {lessons
            .sort((a, b) => a.order - b.order)
            .map((lesson, lessonIndex) => (
              <LessonRow
                key={lesson.slug}
                indexLabel={`${index + 1}.${lessonIndex + 1}`}
                title={lesson.title}
                href={`/learn/${trackSlug}/${lesson.slug}`}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
}
