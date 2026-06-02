"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Type,
  AlignJustify,
  PanelLeftClose,
  PanelLeftOpen,
  Undo2,
  X,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Track, Module, Lesson } from "@/lib/content";
import { useProgress } from "@/context/ProgressContext";
import { productionBlueprints } from "@/lib/production-practice";
import { CodeBlock } from "./CodeBlock";

interface LessonReaderProps {
  track: Track;
  currentModule: Module;
  lesson: any;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  children: React.ReactNode;
}

export function LessonReader({
  track,
  currentModule,
  lesson,
  prevLesson,
  nextLesson,
  children
}: LessonReaderProps) {
  const { completedLessons, toggleLessonComplete } = useProgress();
  const isLessonCompleted = completedLessons.includes(lesson.slug);
  const blueprint = productionBlueprints[track.slug] || productionBlueprints.foundations;

  // Client state
  const [theme, setTheme] = useState<"system" | "cream" | "sepia" | "slate">("system");
  const [textSize, setTextSize] = useState<"text-sm" | "text-base" | "text-lg" | "text-xl">("text-lg");
  const [lineSpacing, setLineSpacing] = useState<"normal" | "spacious">("normal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "build" | "code" | "tests" | "deploy" | "interview">("overview");

  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progression
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Read persisted reader preferences if any
    const savedTheme = localStorage.getItem("CodeNivra-reader-theme");
    const savedTextSize = localStorage.getItem("CodeNivra-reader-textsize");
    const savedSpacing = localStorage.getItem("CodeNivra-reader-spacing");

    setTimeout(() => {
      if (savedTheme) setTheme(savedTheme as "system" | "cream" | "sepia" | "slate");
      if (savedTextSize) setTextSize(savedTextSize as "text-sm" | "text-base" | "text-lg" | "text-xl");
      if (savedSpacing) setLineSpacing(savedSpacing as "normal" | "spacious");

      // Auto-collapse sidebar on smaller screens
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    }, 0);
  }, []);

  const changeTheme = (newTheme: typeof theme) => {
    setTheme(newTheme);
    localStorage.setItem("CodeNivra-reader-theme", newTheme);
  };

  const changeTextSize = (newSize: typeof textSize) => {
    setTextSize(newSize);
    localStorage.setItem("CodeNivra-reader-textsize", newSize);
  };

  const changeSpacing = (newSpacing: typeof lineSpacing) => {
    setLineSpacing(newSpacing);
    localStorage.setItem("CodeNivra-reader-spacing", newSpacing);
  };

  // Determine current display percentage helper
  const sizePercentage = {
    "text-sm": "85%",
    "text-base": "100%",
    "text-lg": "115%",
    "text-xl": "130%"
  }[textSize];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col ${theme !== "system" ? `reader-mode theme-${theme}` : "bg-slate-50 text-slate-800"
        }`}
    >
      {/* Sticky top scroll indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="flex flex-1 relative mt-14">
        {/* Course Directory Left Sidebar */}
        <aside
          className={`fixed top-14 bottom-0 left-0 z-30 w-80 border-r border-slate-200 bg-white transition-transform duration-300 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } ${theme === "slate" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white text-slate-800"}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-700 dark:bg-slate-800 dark:text-indigo-300">
                  <PanelLeftOpen className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">TRACK COURSE</span>
                  <h2 className="text-base font-bold truncate max-w-[180px] mt-0.5">{track.title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="hidden lg:inline-flex p-2 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  title="Collapse track index"
                  aria-label="Collapse track index"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close track index"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modules & Lessons tree list */}
            <div className="space-y-6">
              {(track.modules || []).map((mod, modIdx) => (
                <div key={mod?.slug || modIdx}>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 mb-2">
                    {modIdx + 1}. {mod?.title || "Module"}
                  </h3>
                  <ul className="space-y-1 pl-1">
                    {(mod?.lessons ? [...mod.lessons] : [])
                      .sort((a, b) => (a?.order || 0) - (b?.order || 0))
                      .map((l) => {
                        const isActive = pathname.endsWith(`/${l?.slug}`);
                        return (
                          <li key={l?.slug}>
                            <Link
                              href={`/learn/${track.slug}/${l?.slug}`}
                              className={`block rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${isActive
                                  ? "bg-indigo-500 text-white shadow-sm"
                                  : `hover:bg-slate-100 dark:hover:bg-slate-800 ${theme === "slate" ? "text-slate-300" : "text-slate-600"
                                  }`
                                }`}
                            >
                              {l?.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile menu drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-20 lg:hidden"
          />
        )}

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed left-4 top-24 z-20 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            title="Open track index"
            aria-label="Open track index"
          >
            <PanelLeftOpen className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Right Content Space */}
        <main
          className={`flex-1 transition-all duration-300 px-4 md:px-8 py-8 ${sidebarOpen ? "lg:pl-[340px]" : "pl-4 md:pl-8"
            }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Link
                  href={`/learn/${track.slug}`}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Undo2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Roadmap</span>
                </Link>

                <button
                  onClick={() => toggleLessonComplete(lesson.slug)}
                  className={`p-2 rounded-xl border transition text-xs font-bold flex items-center gap-1.5 ${isLessonCompleted
                      ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isLessonCompleted ? "Completed" : "Mark Complete"}</span>
                </button>
              </div>

              {/* Reader Preferences Controls Panel */}
              <div className="relative">
                <button
                  onClick={() => setShowControls(!showControls)}
                  className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 text-xs font-bold ${showControls ? "bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600" : ""
                    }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Reader Controls</span>
                </button>

                {showControls && (
                  <>
                    <div
                      onClick={() => setShowControls(false)}
                      className="fixed inset-0 z-30"
                    />
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-40 animate-fade-in text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100">
                      <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">
                        Reading Preferences
                      </h4>

                      {/* Theme Selection */}
                      <div className="mb-4">
                        <span className="text-xs font-semibold block mb-2">Background Tone</span>
                        <div className="grid grid-cols-4 gap-1.5">
                          <button
                            onClick={() => changeTheme("system")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition ${theme === "system"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                              }`}
                          >
                            Default
                          </button>
                          <button
                            onClick={() => changeTheme("cream")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition bg-[#fbfbf8] text-[#2c2c2c] ${theme === "cream" ? "border-indigo-600 ring-2 ring-indigo-100" : "border-slate-200"
                              }`}
                          >
                            Cream
                          </button>
                          <button
                            onClick={() => changeTheme("sepia")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition bg-[#f5edd6] text-[#433422] ${theme === "sepia" ? "border-indigo-600 ring-2 ring-indigo-100" : "border-slate-200"
                              }`}
                          >
                            Sepia
                          </button>
                          <button
                            onClick={() => changeTheme("slate")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition bg-[#0f172a] text-[#e2e8f0] ${theme === "slate" ? "border-indigo-600 ring-2 ring-indigo-900" : "border-slate-700"
                              }`}
                          >
                            Slate
                          </button>
                        </div>
                      </div>

                      {/* Text Sizing */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold flex items-center gap-1">
                            <Type className="w-3.5 h-3.5" />
                            Text Scaling
                          </span>
                          <span className="text-xs font-bold text-slate-500">{sizePercentage}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(["text-sm", "text-base", "text-lg", "text-xl"] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => changeTextSize(sz)}
                              className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition ${textSize === sz
                                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                                }`}
                            >
                              {sz === "text-sm" ? "A-" : sz === "text-xl" ? "A+" : sz === "text-base" ? "100%" : "115%"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Line Spacing */}
                      <div>
                        <span className="text-xs font-semibold flex items-center gap-1 mb-2">
                          <AlignJustify className="w-3.5 h-3.5" />
                          Line Spacing
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => changeSpacing("normal")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition ${lineSpacing === "normal"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800"
                              }`}
                          >
                            Compact/Normal
                          </button>
                          <button
                            onClick={() => changeSpacing("spacious")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition ${lineSpacing === "spacious"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800"
                              }`}
                          >
                            Spacious/Relaxed
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Title / Description */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-500 uppercase tracking-widest">
                <span>{currentModule.title}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                {lesson.frontmatter.title}
              </h1>
              <p className={`text-slate-500 dark:text-slate-400 leading-relaxed font-sans`}>
                {lesson.frontmatter.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs mt-4">
                {lesson?.frontmatter?.tags && lesson.frontmatter.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500">Tags:</span>
                    <div className="flex gap-1.5">
                      {(lesson.frontmatter.tags || []).map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-indigo-100/50 dark:border-slate-700 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lesson.frontmatter.estimatedTime && (
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.frontmatter.estimatedTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Elegant Production Practice Tab Bar */}
            <div className="mb-6 border-b border-slate-200 dark:border-slate-800">
              <nav className="flex flex-wrap -mb-px gap-1 sm:gap-2" aria-label="Lesson Sections">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "build", label: "Build Steps" },
                  { id: "code", label: "Full Code" },
                  { id: "tests", label: "Tests" },
                  { id: "deploy", label: "Deploy" },
                  { id: "interview", label: "Interview" }
                ].map((t) => {
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      aria-current={isActive ? "page" : undefined}
                      className={`px-4 py-2.5 border-b-2 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-t-lg ${
                        isActive
                          ? "border-indigo-650 text-indigo-650 bg-indigo-50/40 dark:bg-indigo-950/20"
                          : "border-transparent text-slate-500 hover:text-slate-805 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* MDX Content / Tab content wrapper */}
            <div
              ref={contentRef}
              className={`max-w-3xl mx-auto ${textSize} ${lineSpacing === "spacious" ? "reader-spacious" : "reader-normal"}`}
            >
              {activeTab === "overview" && children}

              {activeTab === "build" && (
                <div className="space-y-8 animate-fade-in text-slate-700 dark:text-slate-300">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100 flex items-center gap-2">
                      📁 Production Folder Structure
                    </h3>
                    <p className="text-xs text-slate-500">A typical enterprise-grade repository layout for this framework:</p>
                    <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                      {blueprint.folderStructure}
                    </pre>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      🛠️ Step-by-Step Implementation Phases
                    </h3>
                    <ol className="space-y-4">
                      {blueprint.buildSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-4">
                          <span className="h-6 w-6 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900">
                            {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm font-medium mt-0.5 leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      ⚡ Environment Setup & Dependencies
                    </h3>
                    <div className="space-y-4 text-xs sm:text-sm">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">Required Package Installation:</p>
                        <pre className="bg-slate-950 text-slate-200 p-3 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                          {blueprint.environmentSetup.installCommand}
                        </pre>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">Environment Variables Configuration (`.env.example`):</p>
                        <pre className="bg-slate-950 text-slate-200 p-3 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                          {blueprint.environmentSetup.envExample}
                        </pre>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">Local Development Server Commands:</p>
                        <pre className="bg-slate-950 text-slate-200 p-3 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                          {blueprint.environmentSetup.localRunCommand}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "code" && (
                <div className="space-y-8 animate-fade-in text-slate-700 dark:text-slate-300">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      📄 Complete Runnable Code
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Below is a fully functional component or file mapping this specific programming concept in production:
                    </p>
                    <div className="text-xs bg-slate-955 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-900 text-slate-200">
                      <CodeBlock language="typescript">
                        {blueprint.fullCode}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      🛡️ Validation & Failure Handling
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {blueprint.validationDetails}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "tests" && (
                <div className="space-y-8 animate-fade-in text-slate-700 dark:text-slate-300">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      🧪 Automated Testing Suite
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Run these test configurations (Unit or Integration tests) to verify code correctness under edge conditions:
                    </p>
                    <div className="text-xs bg-slate-955 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-900 text-slate-200">
                      <CodeBlock language="typescript">
                        {blueprint.testSuite}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "deploy" && (
                <div className="space-y-8 animate-fade-in text-slate-700 dark:text-slate-300">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      🚀 Production Checklist
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Complete these quality checks before deploying your changes:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {blueprint.productionChecklist.map((item, idx) => (
                        <div key={idx} className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-xl flex gap-2.5 items-start">
                          <span className="text-indigo-650 font-bold shrink-0">✓</span>
                          <span className="text-xs font-semibold leading-relaxed text-slate-750 dark:text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-red-955 flex items-center gap-2">
                      ⚠️ Common Pitfalls & Mistakes
                    </h3>
                    <div className="space-y-3.5">
                      {blueprint.commonMistakes.map((mistake, idx) => (
                        <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm leading-relaxed">
                          <span className="h-5 w-5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 text-red-650 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0">
                            ✕
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 mt-0.5">{mistake}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "interview" && (
                <div className="space-y-8 animate-fade-in text-slate-700 dark:text-slate-300">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-base font-extrabold text-slate-905 dark:text-slate-100">
                      🎤 How to Pitch This in Interviews
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Use this template answers to clearly explain your technical decisions:
                    </p>
                    <div className="p-4 bg-purple-50/30 border border-purple-100 dark:border-purple-950/50 rounded-2xl">
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                        &ldquo;{blueprint.interviewExplanation}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Completion Trigger */}
            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold">Have you finished this guide?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Marking it complete updates your roadmap progress percentage.</p>
              </div>
              <button
                onClick={() => toggleLessonComplete(lesson.slug)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${isLessonCompleted
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isLessonCompleted ? "Completed - Mark Incomplete" : "Mark as Completed"}
              </button>
            </div>

            {/* Navigation Bottom Controls */}
            <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/learn/${track.slug}/${prevLesson.slug}`}
                  className="flex-1 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-sm transition duration-200 group/nav"
                >
                  <div className="flex items-center gap-1 text-slate-400 mb-1">
                    <ChevronLeft className="w-4 h-4 group-hover/nav:-translate-x-0.5 transition-transform" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Previous</span>
                  </div>
                  <p className="font-bold text-sm line-clamp-1">{prevLesson.title}</p>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextLesson ? (
                <Link
                  href={`/learn/${track.slug}/${nextLesson.slug}`}
                  className="flex-1 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-sm transition duration-200 text-right group/nav"
                >
                  <div className="flex items-center justify-end gap-1 text-slate-400 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Next</span>
                    <ChevronRight className="w-4 h-4 group-hover/nav:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="font-bold text-sm line-clamp-1">{nextLesson.title}</p>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
