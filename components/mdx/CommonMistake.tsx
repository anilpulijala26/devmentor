import React from "react";
import { XOctagon, CheckCircle } from "lucide-react";

interface CommonMistakeProps {
  title?: string;
  badDesc: string;
  badCode: string;
  goodDesc: string;
  goodCode: string;
  language?: string;
}

export function CommonMistake({
  title = "Common Architectural Pitfall",
  badDesc,
  badCode,
  goodDesc,
  goodCode
}: CommonMistakeProps) {
  return (
    <div className="my-8 rounded-2xl border border-red-200 bg-red-50/10 p-6 shadow-xs animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <h4 className="text-base font-extrabold text-red-900 dark:text-red-400 mb-6 flex items-center gap-2">
        <XOctagon className="w-5 h-5 text-red-500" />
        {title}
      </h4>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bad Practice Block */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400">
            <XOctagon className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">Bad Practice</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[36px]">
            {badDesc}
          </p>
          <div className="rounded-xl border border-red-200/60 overflow-hidden">
            <pre className="text-xs bg-red-50/30 dark:bg-slate-950 p-4 font-mono text-red-900 dark:text-red-200 overflow-x-auto leading-relaxed">
              <code>{badCode?.trim()}</code>
            </pre>
          </div>
        </div>

        {/* Good Practice Block */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">Good Practice</span>
          </div>
          <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed min-h-[36px]">
            {goodDesc}
          </p>
          <div className="rounded-xl border border-emerald-200/60 overflow-hidden">
            <pre className="text-xs bg-emerald-50/30 dark:bg-slate-950 p-4 font-mono text-emerald-900 dark:text-emerald-200 overflow-x-auto leading-relaxed">
              <code>{goodCode?.trim()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
