"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ClipboardCheck,
  Code2,
  Copy,
  Lightbulb,
  MessageSquare,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import type { DeveloperTask } from "@/lib/tasks";
import { ProjectChecklist } from "./mdx/ProjectChecklist";
import { TaskCompleteButton } from "./TaskCompleteButton";
import {
  getEstimatedTime,
  getRequirementChecklist,
  getLevelTone,
  getNextRecommendedTask,
  getSuggestedImprovement,
  getTaskCategory,
  getTaskMetaLine,
  getTaskTags,
} from "./tasks/task-helpers";

interface TaskDetailClientProps {
  task: DeveloperTask;
}

export function TaskDetailClient({ task }: TaskDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "solution" | "review">("overview");
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const { completedTasks } = useProgress();

  const isCompleted = completedTasks.includes(task.slug);
  const nextRecommendedTask = getNextRecommendedTask(task.slug);
  const suggestedImprovement = getSuggestedImprovement(task);
  const requirementChecklist = getRequirementChecklist(task.requirement);
  const skillTags = getTaskTags(task.slug);

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMap((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedMap((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    });
  };

  return (
    <div className="relative mx-auto max-w-6xl animate-fade-in px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="sticky top-16 z-40 -mx-4 mb-8 flex items-center justify-between rounded-b-xl border-b border-slate-200/60 bg-slate-50/90 px-4 py-3 shadow-xs backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition-colors hover:text-indigo-700 sm:text-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Practice Tasks
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:inline">
            PRACTICE TASK // {task.slug.toUpperCase()}
          </span>
          <TaskCompleteButton taskSlug={task.slug} />
        </div>
      </div>

      <div className="mb-8 lg:mb-10">
        <div className="mb-3 flex items-center gap-2">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${getLevelTone(task.level)}`}>
            {task.level} Practice Task
          </span>
          <span className="text-xs font-semibold text-slate-500">Implementation-first practice</span>
        </div>
        <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-[2.8rem] lg:leading-tight">
          {task.title}
        </h1>
        <p className="text-sm font-medium text-slate-500">{getTaskMetaLine(task)}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(680px,760px)_minmax(260px,300px)] lg:items-start">
        <div className="min-w-0 space-y-6">
          <nav
            className="border-b border-slate-200"
            aria-label="Task Sections"
            role="tablist"
          >
            <div className="flex flex-wrap -mb-px gap-1 sm:gap-2">
              {[
                { id: "overview", label: "Overview" },
                { id: "solution", label: "Reference Solution" },
                { id: "review", label: "Review & Next Steps" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`task-panel-${tab.id}`}
                    id={`task-tab-${tab.id}`}
                    className={`rounded-t-lg border-b-2 px-4 py-2.5 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:text-sm ${
                      isActive
                        ? "border-indigo-650 bg-indigo-50/40 text-indigo-650"
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {activeTab === "overview" ? (
            <div
              id="task-panel-overview"
              role="tabpanel"
              aria-labelledby="task-tab-overview"
              className="space-y-6 animate-fade-in"
            >
              <section className="grid gap-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    What you will build
                  </p>
                  <p className="text-sm font-semibold leading-relaxed text-slate-650">
                    {task.expectedOutput}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Success criteria
                  </p>
                  <ul className="space-y-2">
                    {task.checklist.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-extrabold text-slate-900">
                  <ClipboardCheck className="h-5 w-5 text-indigo-500" />
                  Skills You Will Practice
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {task.scenario ? (
                <section className="space-y-3 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                  <h2 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-base font-extrabold text-slate-900">
                    <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
                    Real-world use case
                  </h2>
                  <p className="text-sm font-semibold leading-relaxed text-slate-650">
                    {task.scenario}
                  </p>
                </section>
              ) : null}

              <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-extrabold text-slate-900">
                  <Terminal className="h-5 w-5 text-indigo-500" />
                  Requirements checklist
                </h2>
                <ul className="space-y-3">
                  {requirementChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-650">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-450">
                    Expected output
                  </p>
                  <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold leading-relaxed text-slate-600">
                    {task.expectedOutput}
                  </p>
                </div>
              </section>

              <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-extrabold text-slate-900">
                  <Lightbulb className="h-5 w-5 text-indigo-500" />
                  Hints & Tips
                </h2>
                <ul className="space-y-3">
                  {task.hints.map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-[10px] font-bold text-indigo-700">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-650">{hint}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : null}

          {activeTab === "solution" ? (
            <div
              id="task-panel-solution"
              role="tabpanel"
              aria-labelledby="task-tab-solution"
              className="space-y-6 animate-fade-in"
            >
              <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-extrabold text-slate-900">
                  <Play className="h-5 w-5 text-indigo-500" />
                  Step-by-step approach
                </h2>
                <ol className="space-y-3">
                  {task.hints.map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-slate-650">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-[10px] font-bold text-indigo-700">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{hint}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {task.starterCode ? (
                <section className="space-y-3 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                      <Code2 className="h-4.5 w-4.5 text-indigo-500" />
                      Starter template
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleCopyCode("starter-code", task.starterCode || "")}
                      className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none"
                    >
                      {copiedMap["starter-code"] ? (
                        <Check className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {copiedMap["starter-code"] ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="max-h-64 overflow-auto rounded-xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-200">
                    {task.starterCode}
                  </pre>
                </section>
              ) : null}

              <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                      <Code2 className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-905">Code example</h3>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Production-style reference implementation
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode("solution-code", task.solutionCode)}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-[10px] font-bold text-white transition hover:bg-slate-700 focus-visible:outline-none"
                  >
                    {copiedMap["solution-code"] ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedMap["solution-code"] ? "Copied!" : "Copy Solution"}
                  </button>
                </div>

                <div className="space-y-5 p-6">
                  <div className="text-sm font-medium leading-relaxed text-slate-650">
                    <p className="mb-1.5 text-sm font-bold text-slate-850">Explanation</p>
                    <p>{task.solutionExplanation}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Code example
                    </p>
                    <pre className="max-h-[28rem] overflow-auto rounded-xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-200">
                      {task.solutionCode}
                    </pre>
                  </div>
                </div>
              </section>

              {task.commonMistakes.length > 0 ? (
                <section className="space-y-4 rounded-3xl border border-red-200/80 bg-red-50/20 p-6 shadow-xs">
                  <h2 className="flex items-center gap-2 border-b border-red-100 pb-3 text-lg font-extrabold text-red-950">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Common mistakes
                  </h2>
                  <ul className="space-y-3">
                    {task.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-slate-700">
                        <span className="shrink-0 font-bold text-red-505">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}

          {activeTab === "review" ? (
            <div
              id="task-panel-review"
              role="tabpanel"
              aria-labelledby="task-tab-review"
              className="space-y-6 animate-fade-in"
            >
              <ProjectChecklist
                title="Self-review Checklist"
                storageKey={`task-checklist-${task.slug}`}
                items={task.checklist}
              />

              <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-extrabold text-slate-900">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  Suggested improvement
                </h2>
                <p className="text-sm font-semibold leading-relaxed text-slate-650">
                  {suggestedImprovement}
                </p>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/60 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Explain in Interview</h3>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      How to pitch this solution during technical reviews
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold italic leading-relaxed text-slate-650">
                    &ldquo;{task.interviewExplanation}&rdquo;
                  </p>
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Code quality next step
                    </span>
                    <h3 className="mt-1 text-base font-extrabold text-slate-900">
                      Open the Code Review Console
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                      Audit this solution against frontend, accessibility, performance, security, and deployment review checks.
                    </p>
                  </div>
                  <Link
                    href="/code-review"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    Open Review Console
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>

                {nextRecommendedTask ? (
                  <section className="flex flex-col justify-between gap-4 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6 shadow-xs">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-indigo-500">
                        Next recommended task
                      </span>
                      <h3 className="mt-1 text-base font-extrabold text-slate-900">
                        {nextRecommendedTask.title}
                      </h3>
                      <p className="max-w-md text-sm font-medium leading-relaxed text-slate-600">
                        Continue with another implementation task to build momentum step by step in the practice workspace.
                      </p>
                    </div>
                    <Link
                      href={`/tasks/${nextRecommendedTask.slug}`}
                      className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-indigo-700 shadow-xs transition hover:bg-slate-50"
                    >
                      <span>Start Next Task</span>
                      <Play className="h-3 w-3 fill-indigo-700 text-indigo-700" />
                    </Link>
                  </section>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Practice Summary
            </p>
            <div className="mt-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Level</p>
                <p className="text-sm font-semibold text-slate-900">{task.level}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Duration</p>
                <p className="text-sm font-semibold text-slate-900">{getEstimatedTime(task.level)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Category</p>
                <p className="text-sm font-semibold text-slate-900">{getTaskCategory(task.slug)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Status</p>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    isCompleted
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {isCompleted ? "Completed" : "In Progress"}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
