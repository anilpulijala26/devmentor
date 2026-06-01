"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DeveloperTask } from "@/lib/tasks";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

interface TasksClientProps {
  initialTasks: DeveloperTask[];
}

export function TasksClient({ initialTasks }: TasksClientProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
  const { completedTasks } = useProgress();

  const filtered = activeFilter === "All"
    ? initialTasks
    : initialTasks.filter((t) => t.level === activeFilter);

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-150 dark:bg-slate-800 dark:text-blue-400",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-150 dark:bg-slate-800 dark:text-violet-400",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-150 dark:bg-slate-800 dark:text-emerald-400"
    }[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in">
      {/* Header */}
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            Granular Code Challenges
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Daily Developer Tasks
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Practice makes permanent. Code minor UI blocks, state patterns, routing middleware, and error boundaries daily to solidify production concepts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 bg-white border border-slate-200/60 p-1.5 rounded-2xl shrink-0 self-center md:self-end dark:bg-slate-900 dark:border-slate-800">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:bg-slate-850"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((task) => {
          const isCompleted = completedTasks.includes(task.slug);
          return (
            <div
              key={task.slug}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-350 hover:shadow-md dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelColor(task.level)}`}>
                    {task.level}
                  </span>
                  {isCompleted ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">DAILY CHALLENGE</span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors dark:text-slate-100">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 dark:text-slate-300 line-clamp-3">
                    {task.requirement}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-150/45 dark:border-slate-800">
                <Link
                  href={`/tasks/${task.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-650 hover:bg-indigo-700 text-white py-3 rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {isCompleted ? "Review Solution" : "Solve Challenge"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
