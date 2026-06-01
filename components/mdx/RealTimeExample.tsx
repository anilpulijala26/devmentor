import React from "react";
import { Briefcase } from "lucide-react";

interface RealTimeExampleProps {
  title?: string;
  children: React.ReactNode;
}

export function RealTimeExample({ title = "Production Scenario", children }: RealTimeExampleProps) {
  return (
    <div className="my-8 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-6 shadow-xs animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-[0_2px_10px_0_rgba(16,185,129,0.2)]">
          <Briefcase className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold text-emerald-950 uppercase tracking-widest dark:text-emerald-400">
            {title}
          </p>
          <div className="text-slate-700 leading-relaxed text-sm dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
