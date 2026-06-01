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
      Beginner: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-slate-800 dark:text-blue-400",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-slate-800 dark:text-violet-400",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-slate-800 dark:text-emerald-400"
    }[level] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const getEstimatedTime = (level: string) => {
    if (level === "Beginner") return "15 mins";
    if (level === "Intermediate") return "30 mins";
    return "45 mins";
  };

  const getTaskTags = (slug: string) => {
    const mapping: Record<string, string[]> = {
      "html-form-validation": ["HTML5", "Validation", "A11y"],
      "responsive-pricing-cards": ["CSS Grid", "Flexbox", "Responsive"],
      "js-array-transformation": ["JavaScript", "ES6", "FP"],
      "debounced-search": ["JavaScript", "Async", "Perf"],
      "api-fetch-retry": ["JavaScript", "API", "Resilience"],
      "react-controlled-form": ["React", "State", "Forms"],
      "react-custom-hook": ["React Hooks", "State", "Storage"],
      "nextjs-dynamic-route": ["Next.js", "Routing", "SEO"],
      "nextjs-loading-ui": ["Next.js", "Suspense", "UX"],
      "api-route-handler": ["Next.js", "API", "JSON"],
      "jwt-protected-route": ["Express", "JWT", "Security"],
      "postgres-crud-query": ["PostgreSQL", "SQL", "ACID"],
      "file-upload-validation": ["Node.js", "Multer", "Security"],
      "accessibility-audit": ["WCAG", "A11y", "Semantic"],
      "performance-audit": ["Performance", "DOM", "Lazy-Loading"]
    };
    return mapping[slug] || ["Web Dev"];
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in">
      {/* Header / Page Hero */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold dark:bg-slate-900 dark:border-slate-800 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Granular Code Challenges</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Daily Developer Tasks
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Practice makes permanent. Code minor UI blocks, state patterns, routing middleware, and error boundaries daily to solidify production concepts.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            Pick one task, build it, review it, and explain it like a real developer ticket.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 bg-white border border-slate-200 p-1.5 rounded-2xl shrink-0 self-start lg:self-end overflow-x-auto no-scrollbar max-w-full dark:bg-slate-900 dark:border-slate-800 shadow-sm">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800"
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
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="space-y-4">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getLevelColor(task.level)}`}>
                    {task.level}
                  </span>
                  {isCompleted ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase">DAILY CHALLENGE</span>
                  )}
                </div>

                {/* Middle */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors dark:text-slate-100 line-clamp-1">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 dark:text-slate-350 line-clamp-3">
                    {task.requirement}
                  </p>
                  
                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {getTaskTags(task.slug).map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md dark:bg-slate-800 dark:text-slate-300 border border-slate-200/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Type: Coding Task</span>
                  <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                    Est: {getEstimatedTime(task.level)}
                  </span>
                </div>

                <Link
                  href={`/tasks/${task.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white py-2.5 rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span>Start Task</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                
                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                  <span>View checklist</span>
                  {task.solutionCode && <span>Includes solution</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
