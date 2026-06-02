"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, BookOpen, Compass, Terminal, ClipboardCheck, Sparkles } from "lucide-react";
import { Roadmap } from "@/lib/roadmaps";
import { DeveloperTask } from "@/lib/tasks";
import { GuidePanel } from "@/components/GuidePanel";

interface RoadmapDetailClientProps {
  roadmap: Roadmap;
  tasksForThisPath: DeveloperTask[];
  plan: { week: string; topic: string; details: string }[] | undefined;
}

export function RoadmapDetailClient({
  roadmap,
  tasksForThisPath,
  plan,
}: RoadmapDetailClientProps) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load completed weeks on client mount
  useEffect(() => {
    const saved = localStorage.getItem(`codenivra-roadmap-${roadmap.slug}-completed`);
    let parsed: number[] = [];
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      setIsMounted(true);
      setCompletedWeeks(parsed);
    }, 0);
  }, [roadmap.slug]);

  const toggleWeekCompleted = (idx: number) => {
    let updated: number[];
    if (completedWeeks.includes(idx)) {
      updated = completedWeeks.filter((w) => w !== idx);
    } else {
      updated = [...completedWeeks, idx];
    }
    setCompletedWeeks(updated);
    localStorage.setItem(`codenivra-roadmap-${roadmap.slug}-completed`, JSON.stringify(updated));
  };

  const totalModules = plan ? plan.length : 0;
  const completedCount = completedWeeks.length;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* 1. Roadmap Progress Summary Tracker */}
      {isMounted && totalModules > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-650 bg-indigo-50 px-3 py-1 rounded-full">
                Progress Telemetry
              </span>
              <h2 className="text-base font-extrabold text-slate-900 mt-2">Roadmap Completion</h2>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Track your structured modules progress. Mark each week complete as you finish concept studies and daily challenges.
              </p>
            </div>
            <div className="flex items-baseline gap-1 text-slate-800 shrink-0">
              <span className="text-2xl font-black">{progressPercent}%</span>
              <span className="text-xs font-bold text-slate-400">({completedCount} of {totalModules} Weeks)</span>
            </div>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </section>
      )}

      {/* Guide Panel */}
      <GuidePanel
        title="Roadmap Path Navigator"
        what="Detailed timeline and specific technical checkpoints to complete your pathway."
        who="Developers progressing through the structured roadmap."
        first="Study the recommended concept modules first."
        next="Solve matching daily coding tasks and implement the project labs."
        outcome="Verified coding skills and deployed repository blueprints."
        nextAction="Start first module and complete matching daily task."
      />

      {/* 2. Weekly Learning Plan Section */}
      {plan && (
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-650 bg-indigo-50 px-3 py-1 rounded-full">
              6-Week Curriculum
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">Weekly Learning Plan</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal mt-1">
              Follow this structured 6-week roadmap to systematically build and validate your technical capabilities. Click each week to expand study targets.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {plan.map((weekItem, idx) => {
              const isWeekDone = completedWeeks.includes(idx);
              return (
                <details
                  key={idx}
                  className={`group border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all ${
                    isWeekDone ? "border-emerald-200 bg-emerald-50/5" : "border-slate-150 bg-slate-50/30"
                  }`}
                >
                  <summary className="w-full px-5 py-4 flex items-center justify-between text-left transition hover:bg-slate-50 cursor-pointer list-none select-none outline-none">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-bold transition duration-200 shrink-0 ${
                        isWeekDone
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-indigo-50 border-indigo-100 text-indigo-650 group-open:bg-indigo-600 group-open:text-white"
                      }`}>
                        {isWeekDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : `W${idx + 1}`}
                      </span>
                      <div>
                        <h4 className="text-[9px] font-bold text-slate-400 leading-none uppercase tracking-wider">{weekItem.week}</h4>
                        <h3 className={`text-sm font-extrabold mt-1 leading-tight transition ${isWeekDone ? "text-emerald-800" : "text-slate-800"}`}>{weekItem.topic}</h3>
                      </div>
                    </div>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0">
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-4 pt-1 bg-white border-t border-slate-100 text-xs text-slate-650 leading-relaxed font-normal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>{weekItem.details}</div>
                    <button
                      type="button"
                      onClick={() => toggleWeekCompleted(idx)}
                      className={`h-9 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
                    >
                      {isWeekDone ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-250 px-3 py-1.5 rounded-lg font-bold">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg font-semibold">
                          Mark Week Complete
                        </span>
                      )}
                    </button>
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      )}

      {/* Timeline Content Layout */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Main timeline module lists */}
        <div className="md:col-span-8 space-y-12">
          {/* Step 1: LEARN */}
          <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs relative">
            <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-indigo-600 text-white shadow-xs">
              Step 1 // Learn
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-2 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Concept Lessons
            </h2>

            <div className="space-y-4">
              {roadmap.recommendedLessons.map((lesson, idx) => (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.track}/${lesson.slug}`}
                  className="group flex items-center justify-between p-4 border border-slate-200 rounded-2xl bg-white hover:border-indigo-300 hover:shadow-xs transition duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full bg-indigo-50 text-indigo-750 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {lesson.title}
                      </h4>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                        Module: {lesson.track}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600 transition" />
                </Link>
              ))}
            </div>
          </div>

          {/* Step 2: PRACTICE */}
          {tasksForThisPath.length > 0 && (
            <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs relative">
              <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-emerald-600 text-white shadow-xs">
                Step 2 // Practice
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-2 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Terminal className="w-5 h-5 text-emerald-500" />
                Daily Developer Tasks
              </h2>

              <div className="space-y-4">
                {tasksForThisPath.map((task) => (
                  <Link
                    key={task.slug}
                    href={`/tasks/${task.slug}`}
                    className="group flex items-center justify-between p-4 border border-slate-200 rounded-2xl bg-white hover:border-emerald-300 hover:shadow-xs transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                        P
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                          {task.title}
                        </h4>
                        <span className="inline-block px-1.5 py-0.2 rounded-md bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                          {task.level} Challenge
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: BUILD */}
          <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs relative">
            <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-violet-600 text-white shadow-xs">
              Step 3 // Build
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-2 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Compass className="w-5 h-5 text-violet-500" />
              Project Labs Blueprint
            </h2>

            <div className="space-y-4">
              {roadmap.projectTasks.map((project) => (
                <div key={project.projectSlug} className="p-5 border border-slate-200 hover:border-violet-300 bg-slate-50/20 rounded-2xl transition duration-200">
                  <h3 className="text-sm font-extrabold text-slate-900">{project.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{project.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">LAB // {project.projectSlug.replace("-", "_").toUpperCase()}</span>
                    <Link
                      href={`/projects/${project.projectSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                      Start Project Lab <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Self-Assessment Checklist */}
        <div className="md:col-span-4 space-y-6">
          <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4 text-indigo-600" />
              Senior Checklist
            </h3>

            <p className="text-2xs text-slate-550 leading-relaxed mb-4">
              Verify your progression. Can you confidently check off these expectations?
            </p>

            <div className="space-y-3.5">
              {roadmap.checklist.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="h-5 w-5 bg-indigo-50 border border-indigo-200 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-indigo-600">
                    <Check className="w-3 h-3" />
                  </span>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats box */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 rounded-3xl p-6 text-white space-y-4">
            <div className="inline-flex p-2.5 rounded-2xl bg-white/10 border border-white/20">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Graduation Goal</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Complete the exercises, build the requested projects, run senior audit checks, and review interview QA blocks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
