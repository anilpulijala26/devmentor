"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface ProjectAccordionProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function ProjectAccordion({
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: ProjectAccordionProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div className="min-w-0">
          <p className="text-base font-bold text-slate-900">{title}</p>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen ? <div className="border-t border-slate-100 px-5 py-5">{children}</div> : null}
    </section>
  );
}
