import React from "react";
import { Award, Target } from "lucide-react";

interface AssignmentBoxProps {
  title?: string;
  points?: string;
  rubric: string[];
  children: React.ReactNode;
}

export function AssignmentBox({
  title = "Milestone Assignment",
  points = "100 Points",
  rubric,
  children
}: AssignmentBoxProps) {
  return (
    <div className="my-8 rounded-2xl border border-pink-200 bg-pink-50/10 p-6 shadow-xs animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500 text-white shadow-[0_2px_10px_0_rgba(236,72,153,0.2)]">
          <Target className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {title}
            </h4>
            <span className="text-[10px] font-bold bg-pink-100 text-pink-800 dark:bg-slate-800 dark:text-pink-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {points}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Capstone implementation assignment</p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
        <div className="leading-relaxed">{children}</div>

        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Award className="w-4 h-4 text-pink-500" /> Grading Rubric
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {(rubric || []).map((item, idx) => (
              <li key={idx} className="p-2.5 bg-white border border-pink-50 rounded-xl flex items-center gap-2 dark:bg-slate-900 dark:border-slate-800/80 text-xs font-semibold">
                <span className="h-5 w-5 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold dark:bg-slate-800 dark:text-pink-400">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
