"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Terminal, Code2, MessageSquare, Sparkles, 
  Lightbulb, AlertTriangle, Play, Check, Copy
} from "lucide-react";
import { ProjectChecklist } from "./mdx/ProjectChecklist";
import { TaskCompleteButton } from "./TaskCompleteButton";
import { DeveloperTask } from "@/lib/tasks";

interface TaskDetailClientProps {
  task: DeveloperTask;
}

export function TaskDetailClient({ task }: TaskDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "solution" | "review">("overview");
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMap(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedMap(prev => ({ ...prev, [id]: false }));
      }, 2000);
    });
  };

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
      {/* Navigation back bar */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Daily Tasks
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
            DAILY CHALLENGE // {task.slug.toUpperCase()}
          </span>
          <TaskCompleteButton taskSlug={task.slug} />
        </div>
      </div>

      {/* Task Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(task.level)}`}>
            {task.level} Challenge
          </span>
          <span className="text-xs text-slate-500 font-semibold">Daily Developer Exercise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
          {task.title}
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-slate-200 dark:border-slate-800">
        <nav className="flex flex-wrap -mb-px gap-1 sm:gap-2" aria-label="Task Sections">
          {[
            { id: "overview", label: "Overview" },
            { id: "solution", label: "Solution & Implementation" },
            { id: "review", label: "Review & Next Steps" }
          ].map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2.5 border-b-2 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-t-lg ${
                  isActive
                    ? "border-indigo-650 text-indigo-650 bg-indigo-50/40"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="space-y-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Real-World Scenario */}
            {task.scenario && (
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
                  Real-World Scenario
                </h2>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                  {task.scenario}
                </p>
              </section>
            )}

            {/* Task Requirement */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Terminal className="w-5 h-5 text-indigo-500" />
                Task Requirement
              </h2>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                {task.requirement}
              </p>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">Expected Output</p>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  {task.expectedOutput}
                </p>
              </div>
            </section>

            {/* Hints */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Lightbulb className="w-5 h-5 text-indigo-500" />
                Hints & Tips
              </h2>
              <ul className="space-y-3">
                {task.hints.map((hint, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <span className="h-5 w-5 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-indigo-700 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-650">{hint}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* SOLUTION & IMPLEMENTATION TAB */}
        {activeTab === "solution" && (
          <div className="space-y-6 animate-fade-in">
            {/* Starter Code */}
            {task.starterCode && (
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Code2 className="w-4.5 h-4.5 text-indigo-500" />
                    Starter Template
                  </h2>
                  <button
                    onClick={() => handleCopyCode("starter-code", task.starterCode || "")}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-2xs font-bold transition focus-visible:outline-none"
                  >
                    {copiedMap["starter-code"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedMap["starter-code"] ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-2xs overflow-x-auto leading-relaxed">
                  {task.starterCode}
                </pre>
              </section>
            )}

            {/* Full working solution */}
            <section className="border border-indigo-250 bg-indigo-50/5 rounded-3xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-indigo-100 bg-indigo-50/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-9 w-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Code2 className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-905">Full Working Solution</h3>
                    <p className="text-2xs text-slate-500 mt-0.5">Tested production-style code solution</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyCode("solution-code", task.solutionCode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-2xs font-bold transition focus-visible:outline-none"
                >
                  {copiedMap["solution-code"] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedMap["solution-code"] ? "Copied!" : "Copy Solution"}
                </button>
              </div>

              <div className="p-6 space-y-6 bg-white">
                <div className="text-xs sm:text-sm text-slate-750 leading-relaxed font-semibold">
                  <p className="font-bold text-slate-850 mb-1.5">Code Explanation</p>
                  <p className="leading-relaxed font-medium">
                    {task.solutionExplanation}
                  </p>
                </div>
                <div>
                  <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Solution Code</p>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-2xs overflow-x-auto leading-relaxed">
                    {task.solutionCode}
                  </pre>
                </div>
              </div>
            </section>

            {/* Edge Cases */}
            {task.edgeCases && task.edgeCases.length > 0 && (
              <section className="p-6 bg-yellow-50/15 border border-yellow-200 rounded-3xl shadow-xs space-y-3">
                <h3 className="text-sm font-extrabold text-yellow-800 uppercase tracking-wider">Edge Cases Covered</h3>
                <ul className="space-y-2">
                  {task.edgeCases.map((edge, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-650">
                      <span className="text-yellow-600 font-bold">⚠️</span>
                      <span className="font-semibold">{edge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* REVIEW & NEXT STEPS TAB */}
        {activeTab === "review" && (
          <div className="space-y-6 animate-fade-in">
            {/* Senior Code Review Checklist */}
            <ProjectChecklist
              title="Senior Code Review Checklist"
              storageKey={`task-checklist-${task.slug}`}
              items={task.checklist}
            />

            {/* Common Mistakes */}
            {task.commonMistakes && task.commonMistakes.length > 0 && (
              <section className="p-6 bg-red-50/20 border border-red-200 rounded-3xl shadow-xs space-y-4">
                <h2 className="text-lg font-extrabold text-red-950 flex items-center gap-2 pb-3 border-b border-red-100">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Common Mistakes to Avoid
                </h2>
                <ul className="space-y-3">
                  {task.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      <span className="text-red-505 font-bold shrink-0">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Explain in Interview */}
            <section className="border border-purple-250 bg-purple-50/5 rounded-3xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-purple-100 bg-purple-50/15 flex items-center gap-2.5">
                <span className="h-9 w-9 bg-purple-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Explain in Interview</h3>
                  <p className="text-2xs text-slate-500 mt-0.5">How to pitch this solution during technical reviews</p>
                </div>
              </div>

              <div className="p-6 bg-white">
                <p className="text-xs sm:text-sm text-slate-750 leading-relaxed font-semibold italic bg-slate-50 p-4 border rounded-2xl">
                  &ldquo;{task.interviewExplanation}&rdquo;
                </p>
              </div>
            </section>

            {/* Next Matching Project */}
            {task.nextProject && (
              <section className="p-6 bg-indigo-600 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">Suggested Next Action</span>
                  <h3 className="text-base font-extrabold mt-1">Practice in a Project Lab</h3>
                  <p className="text-xs text-indigo-150 leading-relaxed font-semibold max-w-md">
                    Apply this challenge concept inside a complete, runnable build-along project: <strong className="text-white">{task.nextProject.title}</strong>.
                  </p>
                </div>
                <Link
                  href={`/projects/${task.nextProject.slug}`}
                  className="bg-white text-indigo-700 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-xs hover:bg-slate-50 transition flex items-center gap-1.5 shrink-0"
                >
                  <span>Build Project</span>
                  <Play className="w-3 h-3 fill-indigo-700 text-indigo-700" />
                </Link>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
