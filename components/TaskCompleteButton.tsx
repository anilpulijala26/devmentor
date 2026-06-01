"use client";

import React from "react";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle2 } from "lucide-react";

interface TaskCompleteButtonProps {
  taskSlug: string;
}

export function TaskCompleteButton({ taskSlug }: TaskCompleteButtonProps) {
  const { completedTasks, toggleTaskComplete } = useProgress();
  const isCompleted = completedTasks.includes(taskSlug);

  return (
    <button
      onClick={() => toggleTaskComplete(taskSlug)}
      className={`px-4 py-2 rounded-xl border transition text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
        isCompleted
          ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600"
          : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700"
      }`}
    >
      <CheckCircle2 className="w-4 h-4" />
      <span>{isCompleted ? "Challenge Completed" : "Mark as Completed"}</span>
    </button>
  );
}
