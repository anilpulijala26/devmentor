"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DeveloperTask } from "@/lib/tasks";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

interface TasksClientProps {
  initialTasks: DeveloperTask[];
}

export function TasksClient({ initialTasks }: TasksClientProps) {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Beginner" | "Mid-Level" | "Senior" | "Frontend" | "Backend" | "Full-Stack" | "Deployment"
  >("All");
  const { completedTasks } = useProgress();

  const getTaskCategory = (slug: string): "Frontend" | "Backend" | "Full-Stack" | "Deployment" => {
    const frontendSlugs = [
      "html-form-validation",
      "responsive-pricing-cards",
      "js-array-transformation",
      "debounced-search",
      "react-controlled-form",
      "react-custom-hook",
      "nextjs-dynamic-route",
      "nextjs-loading-ui",
      "accessibility-audit",
      "performance-audit"
    ];
    const fullstackSlugs = ["api-route-handler", "postgres-crud-query", "postgres-prisma", "api-tests-supertest"];
    const deploymentSlugs = ["dockerize-node-api", "deploy-backend-cloud"];

    if (frontendSlugs.includes(slug)) return "Frontend";
    if (fullstackSlugs.includes(slug)) return "Full-Stack";
    if (deploymentSlugs.includes(slug)) return "Deployment";
    return "Backend";
  };

  const filtered = initialTasks.filter((task) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Beginner") return task.level === "Beginner";
    if (activeFilter === "Mid-Level") return task.level === "Intermediate";
    if (activeFilter === "Senior") return task.level === "Advanced";
    return getTaskCategory(task.slug) === activeFilter;
  });

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-100",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-100",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-100"
    }[level] || "bg-slate-50 text-slate-700 border-slate-100";
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
    return (mapping[slug] || ["Web Dev"]).slice(0, 3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16 space-y-10 animate-fade-in">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
            Daily practice workspace
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
            Daily Developer Tasks
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Practice implementation details, UI patterns, API handling, and production engineering habits through focused hands-on tasks.
          </p>
        </div>

        <div className="max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm no-scrollbar">
          <div className="flex w-max min-w-full flex-nowrap gap-2">
            {(["All", "Beginner", "Mid-Level", "Senior", "Frontend", "Backend", "Full-Stack", "Deployment"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((task) => {
          const isCompleted = completedTasks.includes(task.slug);
          return (
            <article
              key={task.slug}
              className="group flex h-full flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${getLevelColor(task.level)}`}>
                    {task.level}
                  </span>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Daily challenge</span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-950">{task.title}</h3>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600">{task.requirement}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getTaskTags(task.slug).map((tag) => (
                    <span key={tag} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="font-medium">Estimated time</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {getEstimatedTime(task.level)}
                  </span>
                </div>

                <Link
                  href={`/tasks/${task.slug}`}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <span>Start Task</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
