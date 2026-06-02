"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, BookOpen, Compass, Terminal, ClipboardCheck, Sparkles } from "lucide-react";
import { Roadmap } from "@/lib/roadmaps";
import { DeveloperTask } from "@/lib/tasks";

interface RoadmapDetailClientProps {
  roadmap: Roadmap;
  tasksForThisPath: DeveloperTask[];
  plan: { week: string; topic: string; details: string }[] | undefined;
}

export function RoadmapDetailClient({
  roadmap,
  tasksForThisPath,
  plan
}: RoadmapDetailClientProps) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`codenivra-roadmap-${roadmap.slug}-completed`);
    let parsed: number[] = [];
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        parsed = [];
      }
    }
    setTimeout(() => {
      setIsMounted(true);
      setCompletedWeeks(parsed);
    }, 0);
  }, [roadmap.slug]);

  const toggleWeekCompleted = (idx: number) => {
    const updated = completedWeeks.includes(idx)
      ? completedWeeks.filter((week) => week !== idx)
      : [...completedWeeks, idx];

    setCompletedWeeks(updated);
    localStorage.setItem(`codenivra-roadmap-${roadmap.slug}-completed`, JSON.stringify(updated));
  };

  const totalModules = plan ? plan.length : 0;
  const completedCount = completedWeeks.length;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <div className="space-y-8">
      {isMounted && totalModules > 0 && (
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] animate-fade-in">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
                Progress
              </div>
              <h2 className="text-xl font-semibold text-slate-950">Roadmap Completion</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Track progress week by week as you move through lessons, tasks, and applied project work.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-3xl font-semibold text-slate-950">{progressPercent}%</p>
              <p className="text-sm text-slate-500">{completedCount} of {totalModules} weeks complete</p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </section>
      )}

      {plan && (
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
              Weekly plan
            </div>
            <h2 className="text-xl font-semibold text-slate-950">Structured Learning Plan</h2>
            <p className="text-sm leading-6 text-slate-600">
              Use this sequence to move through the roadmap with a consistent weekly operating rhythm.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {plan.map((weekItem, idx) => {
              const isWeekDone = completedWeeks.includes(idx);
              return (
                <details
                  key={idx}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isWeekDone ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50"
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition hover:bg-white/60">
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold ${
                          isWeekDone
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {isWeekDone ? <Check className="w-4 h-4" /> : idx + 1}
                      </span>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{weekItem.week}</p>
                        <h3 className="mt-1 text-base font-semibold text-slate-950">{weekItem.topic}</h3>
                      </div>
                    </div>
                    <span className="text-slate-400">
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-slate-200 bg-white px-5 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-6 text-slate-600">{weekItem.details}</p>
                      <button
                        type="button"
                        onClick={() => toggleWeekCompleted(idx)}
                        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                      >
                        {isWeekDone ? "Completed" : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      )}

      <div className="grid items-start gap-8 md:grid-cols-12">
        <div className="space-y-8 md:col-span-8">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-slate-950">Step 1: Learn</h2>
            </div>

            <div className="mt-5 space-y-3">
              {roadmap.recommendedLessons.map((lesson, idx) => (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.track}/${lesson.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-indigo-700 ring-1 ring-slate-200">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{lesson.title}</h4>
                      <span className="text-xs text-slate-500">Module: {lesson.track}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600" />
                </Link>
              ))}
            </div>
          </section>

          {tasksForThisPath.length > 0 && (
            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
                <Terminal className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-950">Step 2: Practice</h2>
              </div>

              <div className="mt-5 space-y-3">
                {tasksForThisPath.map((task) => (
                  <Link
                    key={task.slug}
                    href={`/tasks/${task.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-emerald-700 ring-1 ring-slate-200">
                        P
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{task.title}</h4>
                        <span className="text-xs text-slate-500">{task.level} challenge</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
              <Compass className="w-5 h-5 text-violet-600" />
              <h2 className="text-lg font-semibold text-slate-950">Step 3: Build</h2>
            </div>

            <div className="mt-5 space-y-4">
              {roadmap.projectTasks.map((project) => (
                <div key={project.projectSlug} className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                  <h3 className="text-base font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3.5">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Lab: {project.projectSlug.replace("-", " ")}
                    </span>
                    <Link
                      href={`/projects/${project.projectSlug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                    >
                      Start lab <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6 md:col-span-4">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              <ClipboardCheck className="w-4 h-4 text-indigo-600" />
              Review checklist
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use this checklist to confirm you can demonstrate the capabilities expected at the end of the roadmap.
            </p>

            <div className="mt-5 space-y-3">
              {roadmap.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <Check className="w-3 h-3" />
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <h4 className="mt-4 text-lg font-semibold">Graduation Goal</h4>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Complete the learning sequence, finish the applied work, and validate the output against professional review standards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
