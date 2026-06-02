"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DeveloperTask } from "@/lib/tasks";
import { Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { GuidePanel } from "./GuidePanel";

interface TasksClientProps {
  initialTasks: DeveloperTask[];
}

export function TasksClient({ initialTasks }: TasksClientProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Mid-Level" | "Senior" | "Frontend" | "Backend" | "Full-Stack" | "Deployment">("All");
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
    const fullstackSlugs = [
      "api-route-handler",
      "postgres-crud-query",
      "postgres-prisma",
      "api-tests-supertest"
    ];
    const deploymentSlugs = [
      "dockerize-node-api",
      "deploy-backend-cloud"
    ];
    
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
    
    const category = getTaskCategory(task.slug);
    return category === activeFilter;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 lg:py-20 relative animate-fade-in space-y-12">
      
      {/* Header / Page Hero */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Granular Code Challenges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold tracking-tight text-slate-900">
            Daily Developer Tasks
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Practice makes permanent. Code minor UI blocks, state patterns, routing middleware, and error boundaries daily to solidify production concepts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 bg-white border border-slate-200/60 p-1.5 rounded-2xl shrink-0 self-start lg:self-end shadow-sm max-w-full">
          {(["All", "Beginner", "Mid-Level", "Senior", "Frontend", "Backend", "Full-Stack", "Deployment"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Panel */}
      <GuidePanel
        title="Daily Tasks Navigator"
        what="Focused coding tasks to refine daily implementation confidence."
        who="Developers practicing component hooks, routing, or schemas."
        first="Pick a task based on your current roadmap level."
        next="Review your solution against code review guidelines."
        outcome="Clean coding habits and component-level code mastery."
        nextAction="Pick a task based on your roadmap level."
      />

      {/* Tasks List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((task) => {
          const isCompleted = completedTasks.includes(task.slug);
          return (
            <div
              key={task.slug}
              className="group bg-white border border-slate-100/80 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelColor(task.level)}`}>
                    {task.level}
                  </span>
                  {isCompleted ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Daily Challenge
                    </span>
                  )}
                </div>

                {/* Middle */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-650 transition-colors line-clamp-1">
                    {task.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {task.requirement}
                  </p>
                  
                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {getTaskTags(task.slug).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg text-2xs font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Type: Coding Task</span>
                  <span className="bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {getEstimatedTime(task.level)}
                  </span>
                </div>

                <Link
                  href={`/tasks/${task.slug}`}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <span>Start Task</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 px-1">
                  <span>Checklist available</span>
                  {task.solutionCode && <span>Solution included</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
