"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlignJustify,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Settings,
  Type,
  Undo2,
} from "lucide-react";
import { Track, Module, Lesson } from "@/lib/content";
import { useProgress } from "@/context/ProgressContext";
import { productionBlueprints } from "@/lib/production-practice";
import { LessonOutlineNav } from "./LessonOutlineNav";
import { CodeBlock } from "./CodeBlock";
import { LessonOutlineItem } from "@/lib/lesson-outline";

interface LessonReaderProps {
  track: Track;
  currentModule: Module;
  lesson: any;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  outlineSections: LessonOutlineItem[];
  children: React.ReactNode;
}

const lessonTabs = [
  { id: "overview", label: "Overview" },
  { id: "build", label: "Build Steps" },
  { id: "code", label: "Full Code" },
  { id: "tests", label: "Tests" },
  { id: "deploy", label: "Deploy" },
  { id: "interview", label: "Interview" },
] as const;

type ReaderTheme = "system" | "cream" | "sepia" | "slate";
type ReaderTextSize = "text-sm" | "text-base" | "text-lg";
type ReaderSpacing = "normal" | "spacious";
type LessonTab = (typeof lessonTabs)[number]["id"];

function getStoredReaderPreference(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function LessonReader({
  track,
  currentModule,
  lesson,
  prevLesson,
  nextLesson,
  outlineSections,
  children,
}: LessonReaderProps) {
  const { completedLessons, toggleLessonComplete } = useProgress();
  const contentRef = useRef<HTMLDivElement>(null);
  const isLessonCompleted = completedLessons.includes(lesson.slug);
  const blueprint =
    productionBlueprints[track.slug] || productionBlueprints.foundations;

  const [theme, setTheme] = useState<ReaderTheme>(
    () =>
      (getStoredReaderPreference("CodeNivra-reader-theme") as ReaderTheme) ||
      "system",
  );
  const [textSize, setTextSize] = useState<ReaderTextSize>(
    () =>
      (getStoredReaderPreference(
        "CodeNivra-reader-textsize",
      ) as ReaderTextSize) || "text-base",
  );
  const [lineSpacing, setLineSpacing] = useState<ReaderSpacing>(
    () =>
      (getStoredReaderPreference(
        "CodeNivra-reader-spacing",
      ) as ReaderSpacing) || "normal",
  );
  const [showControls, setShowControls] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<LessonTab>("overview");
  const [desktopOutlineCollapsed, setDesktopOutlineCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeTheme = (newTheme: ReaderTheme) => {
    setTheme(newTheme);
    localStorage.setItem("CodeNivra-reader-theme", newTheme);
  };

  const changeTextSize = (newSize: ReaderTextSize) => {
    setTextSize(newSize);
    localStorage.setItem("CodeNivra-reader-textsize", newSize);
  };

  const changeSpacing = (newSpacing: ReaderSpacing) => {
    setLineSpacing(newSpacing);
    localStorage.setItem("CodeNivra-reader-spacing", newSpacing);
  };

  const sizePercentage = {
    "text-sm": "90%",
    "text-base": "100%",
    "text-lg": "112%",
  }[textSize];

  const allLessons = useMemo(
    () => (track.modules ?? []).flatMap((module) => module.lessons ?? []),
    [track.modules],
  );

  const currentLessonIndex = allLessons.findIndex(
    (trackLesson) => trackLesson.slug === lesson.slug,
  );

  const progressText =
    currentLessonIndex >= 0
      ? `Lesson ${currentLessonIndex + 1} of ${allLessons.length} · ${outlineSections.length} sections`
      : `${outlineSections.length} sections`;

  const readerShellClassName =
    theme !== "system"
      ? `reader-mode theme-${theme}`
      : "bg-slate-50 text-slate-900";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${readerShellClassName}`}
    >
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        className={`mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 lg:flex-row lg:items-start lg:px-8 ${
          desktopOutlineCollapsed ? "lg:gap-0" : "lg:gap-6"
        }`}
      >
        <LessonOutlineNav
          lessonTitle={lesson.frontmatter.title}
          progressText={progressText}
          sections={outlineSections}
          onDesktopCollapsedChange={setDesktopOutlineCollapsed}
        />

        <main className="min-w-0 flex-1">
          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href={`/learn/${track.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Undo2 className="h-4 w-4" />
                  <span>Back to Track</span>
                </Link>

                <button
                  onClick={() => toggleLessonComplete(lesson.slug)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
                    isLessonCompleted
                      ? "border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isLessonCompleted ? "Completed" : "Mark Complete"}</span>
                </button>
              </div>

              <div className="relative self-start lg:self-auto">
                <button
                  onClick={() => setShowControls((current) => !current)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    showControls
                      ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Reader Controls</span>
                </button>

                {showControls ? (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setShowControls(false)}
                    />
                    <div className="absolute right-0 z-40 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Reading Preferences
                      </h4>

                      <div className="mb-4">
                        <span className="mb-2 block text-xs font-semibold text-slate-700">
                          Background Tone
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { value: "system", label: "Default" },
                            { value: "cream", label: "Cream" },
                            { value: "sepia", label: "Sepia" },
                            { value: "slate", label: "Slate" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() =>
                                changeTheme(option.value as ReaderTheme)
                              }
                              className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition ${
                                theme === option.value
                                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                            <Type className="h-3.5 w-3.5" />
                            Text Scaling
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {sizePercentage}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(["text-sm", "text-base", "text-lg"] as const).map(
                            (size) => (
                              <button
                                key={size}
                                onClick={() => changeTextSize(size)}
                                className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition ${
                                  textSize === size
                                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                {size === "text-sm"
                                  ? "Small"
                                  : size === "text-base"
                                    ? "Default"
                                    : "Large"}
                              </button>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="mb-2 flex items-center gap-1 text-xs font-semibold text-slate-700">
                          <AlignJustify className="h-3.5 w-3.5" />
                          Line Spacing
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => changeSpacing("normal")}
                            className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition ${
                              lineSpacing === "normal"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            Default
                          </button>
                          <button
                            onClick={() => changeSpacing("spacious")}
                            className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition ${
                              lineSpacing === "spacious"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            Relaxed
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                {currentModule.title}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
                {lesson.frontmatter.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                {lesson.frontmatter.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                {lesson?.frontmatter?.tags?.length ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-400">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {lesson.frontmatter.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {lesson.frontmatter.estimatedTime ? (
                  <div className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{lesson.frontmatter.estimatedTime}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-6 border-b border-slate-200">
              <div className="overflow-x-auto no-scrollbar">
                <nav
                  className="inline-flex min-w-full gap-1"
                  aria-label="Lesson sections"
                >
                  {lessonTabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`shrink-0 rounded-t-xl border-b-2 px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? "border-slate-900 text-slate-950"
                            : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div
              ref={contentRef}
              className={`lesson-content min-w-0 overflow-x-hidden text-slate-700 ${
                desktopOutlineCollapsed ? "max-w-5xl" : "mx-auto max-w-3xl"
              } ${
                textSize
              } ${lineSpacing === "spacious" ? "reader-spacious" : "reader-normal"}`}
            >
              {activeTab === "overview" ? children : null}

              {activeTab === "build" ? (
                <div className="space-y-6 animate-fade-in">
                  <section className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Production Folder Structure
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      A typical enterprise-grade repository layout for this topic.
                    </p>
                    <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
                      {blueprint.folderStructure}
                    </pre>
                  </section>

                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Step-by-Step Implementation Phases
                    </h3>
                    <ol className="mt-4 space-y-4">
                      {blueprint.buildSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-4">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-xs font-semibold text-indigo-700">
                            {idx + 1}
                          </span>
                          <p className="pt-0.5 text-sm leading-7 text-slate-700">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Environment Setup & Dependencies
                    </h3>
                    <div className="mt-4 space-y-4 text-sm">
                      <div>
                        <p className="mb-2 font-semibold text-slate-900">
                          Required Package Installation
                        </p>
                        <pre className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
                          {blueprint.environmentSetup.installCommand}
                        </pre>
                      </div>
                      <div>
                        <p className="mb-2 font-semibold text-slate-900">
                          Environment Variables Configuration (`.env.example`)
                        </p>
                        <pre className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
                          {blueprint.environmentSetup.envExample}
                        </pre>
                      </div>
                      <div>
                        <p className="mb-2 font-semibold text-slate-900">
                          Local Development Server Commands
                        </p>
                        <pre className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
                          {blueprint.environmentSetup.localRunCommand}
                        </pre>
                      </div>
                    </div>
                  </section>
                </div>
              ) : null}

              {activeTab === "code" ? (
                <div className="space-y-6 animate-fade-in">
                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Complete Runnable Code
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      A production-style implementation mapped to this concept.
                    </p>
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 text-slate-200">
                      <CodeBlock language="typescript">
                        {blueprint.fullCode}
                      </CodeBlock>
                    </div>
                  </section>

                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Validation & Failure Handling
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {blueprint.validationDetails}
                    </p>
                  </section>
                </div>
              ) : null}

              {activeTab === "tests" ? (
                <div className="space-y-6 animate-fade-in">
                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Automated Testing Suite
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use these tests to verify behavior across edge cases.
                    </p>
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 text-slate-200">
                      <CodeBlock language="typescript">
                        {blueprint.testSuite}
                      </CodeBlock>
                    </div>
                  </section>
                </div>
              ) : null}

              {activeTab === "deploy" ? (
                <div className="space-y-6 animate-fade-in">
                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      Production Checklist
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Complete these checks before shipping your implementation.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {blueprint.productionChecklist.map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[24px] border border-rose-200 bg-rose-50/50 p-6">
                    <h3 className="text-lg font-semibold text-rose-900">
                      Common Pitfalls & Mistakes
                    </h3>
                    <div className="mt-4 space-y-3">
                      {blueprint.commonMistakes.map((mistake, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-rose-100 bg-white p-4 text-sm leading-6 text-slate-700"
                        >
                          {mistake}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ) : null}

              {activeTab === "interview" ? (
                <div className="space-y-6 animate-fade-in">
                  <section className="rounded-[24px] border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-950">
                      How to Pitch This in Interviews
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use this framing to explain the concept clearly and confidently.
                    </p>
                    <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-5">
                      <p className="text-sm font-medium leading-7 text-slate-700">
                        &ldquo;{blueprint.interviewExplanation}&rdquo;
                      </p>
                    </div>
                  </section>
                </div>
              ) : null}
            </div>

            <div className="mt-12 flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-base font-semibold text-slate-950">
                  Have you finished this guide?
                </h4>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Marking it complete updates your roadmap progress percentage.
                </p>
              </div>
              <button
                onClick={() => toggleLessonComplete(lesson.slug)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition ${
                  isLessonCompleted
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {isLessonCompleted
                    ? "Completed - Mark Incomplete"
                    : "Mark as Completed"}
                </span>
              </button>
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:justify-between">
              {prevLesson ? (
                <Link
                  href={`/learn/${track.slug}/${prevLesson.slug}`}
                  className="flex-1 rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {prevLesson.title}
                  </p>
                </Link>
              ) : (
                <div className="hidden flex-1 sm:block" />
              )}

              {nextLesson ? (
                <Link
                  href={`/learn/${track.slug}/${nextLesson.slug}`}
                  className="flex-1 rounded-[24px] border border-slate-200 bg-white p-5 text-right transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="mb-2 flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {nextLesson.title}
                  </p>
                </Link>
              ) : (
                <div className="hidden flex-1 sm:block" />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
