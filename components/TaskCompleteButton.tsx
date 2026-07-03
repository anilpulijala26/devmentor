"use client";

import React from "react";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle2 } from "lucide-react";

interface TaskCompleteButtonProps {
  taskSlug: string;
}

export function TaskCompleteButton({ taskSlug }: TaskCompleteButtonProps) {
  const { completedTasks, taskCompletedDates, toggleTaskComplete } = useProgress();
  const isCompleted = completedTasks.includes(taskSlug);
  const completedDate = taskCompletedDates[taskSlug] ?? null;

  const completedDateLabel = completedDate
    ? new Date(completedDate).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const handleToggle = async () => {
    await toggleTaskComplete(taskSlug);
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={isCompleted}
      className={`px-4 py-2 rounded-xl border transition text-xs font-bold flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        isCompleted
          ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600"
          : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700"
      }`}
    >
      <CheckCircle2 className="w-4 h-4" />
      <span>{isCompleted ? (completedDateLabel ? `Completed on ${completedDateLabel}` : "Completed") : "Mark as Completed"}</span>
    </button>
  );
}
