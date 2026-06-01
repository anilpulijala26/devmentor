import React from "react";
import { Terminal, CheckCircle2 } from "lucide-react";

interface TaskBoxProps {
  title?: string;
  duration?: string;
  requirements: string[];
  expectedOutput?: string;
  children?: React.ReactNode;
}

export function TaskBox({
  title = "Practice Task",
  duration,
  requirements,
  expectedOutput,
  children
}: TaskBoxProps) {
  return (
    <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50/20 p-6 shadow-xs animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-[0_2px_10px_0_rgba(245,158,11,0.2)]">
          <Terminal className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {title}
            </h4>
            {duration && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-slate-800 dark:text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {duration}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Hands-on micro-assignment</p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
        {children && <div className="leading-relaxed">{children}</div>}

        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Requirements</p>
          <ul className="space-y-2">
            {(requirements || []).map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {expectedOutput && (
          <div className="pt-3 border-t border-amber-200/40">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Expected Output</p>
            <p className="text-xs font-mono bg-slate-950 text-slate-200 p-3 rounded-lg border border-slate-900 overflow-x-auto leading-relaxed">
              {expectedOutput}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
