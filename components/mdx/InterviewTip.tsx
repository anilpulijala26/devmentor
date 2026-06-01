import React from "react";
import { MessageSquareCode } from "lucide-react";

interface InterviewTipProps {
  question?: string;
  children: React.ReactNode;
}

export function InterviewTip({ question, children }: InterviewTipProps) {
  return (
    <div className="my-8 rounded-2xl border border-purple-100 bg-purple-50/30 p-6 shadow-xs animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-[0_2px_10px_0_rgba(147,51,234,0.2)]">
          <MessageSquareCode className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest dark:text-purple-400">
              Technical Interview Tip
            </span>
            {question && (
              <h5 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                Q: &ldquo;{question}&rdquo;
              </h5>
            )}
          </div>
          <div className="text-slate-700 leading-relaxed text-sm dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
