"use client";

import { CheckCircle2, Info } from "lucide-react";

interface ReviewToastProps {
  message: string;
  tone?: "success" | "info";
}

export function ReviewToast({ message, tone = "info" }: ReviewToastProps) {
  const isSuccess = tone === "success";

  return (
    <div
      className={`fixed bottom-5 right-5 z-[70] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${
        isSuccess
          ? "border-emerald-200 bg-white text-slate-800"
          : "border-indigo-200 bg-white text-slate-800"
      }`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
        }`}
      >
        {isSuccess ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
}
