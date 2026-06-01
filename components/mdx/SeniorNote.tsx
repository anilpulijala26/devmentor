import React from "react";
import { Award } from "lucide-react";

interface SeniorNoteProps {
  children: React.ReactNode;
}

export function SeniorNote({ children }: SeniorNoteProps) {
  return (
    <div className="my-8 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 shadow-xs animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-[0_2px_10px_0_rgba(99,102,241,0.2)]">
          <Award className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold text-indigo-900 uppercase tracking-widest dark:text-indigo-400">
            Senior Developer Wisdom
          </p>
          <div className="text-slate-700 leading-relaxed text-sm dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
