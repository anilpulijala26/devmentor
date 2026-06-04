"use client";

import React, { useState } from "react";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle2 } from "lucide-react";

interface TaskCompleteButtonProps {
  taskSlug: string;
}

const TASK_DATES_STORAGE_KEY = "CodeNivra-progress-task-dates";

export function TaskCompleteButton({ taskSlug }: TaskCompleteButtonProps) {
  const { completedTasks, toggleTaskComplete } = useProgress();
  const isCompleted = completedTasks.includes(taskSlug);
  const [completedDate, setCompletedDate] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const raw = localStorage.getItem(TASK_DATES_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Record<string, string>;
      return parsed[taskSlug] || null;
    } catch {
      return null;
    }
  });

  const handleToggle = () => {
    toggleTaskComplete(taskSlug);

    try {
      const raw = localStorage.getItem(TASK_DATES_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Record<string, string>) : {};

      if (isCompleted) {
        delete parsed[taskSlug];
        setCompletedDate(null);
      } else {
        const dateLabel = new Date().toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        parsed[taskSlug] = dateLabel;
        setCompletedDate(dateLabel);
      }

      localStorage.setItem(TASK_DATES_STORAGE_KEY, JSON.stringify(parsed));
    } catch {
      setCompletedDate(isCompleted ? null : completedDate);
    }
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
      <span>{isCompleted ? (completedDate ? `Completed on ${completedDate}` : "Completed") : "Mark as Completed"}</span>
    </button>
  );
}
