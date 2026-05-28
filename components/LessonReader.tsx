"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Settings,
  Type,
  AlignJustify,
  Sidebar,
  Undo2,
  Menu,
  X,
  Clock
} from "lucide-react";
import { Track, Module, Lesson } from "@/lib/content";

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
  // Client state
  const [theme, setTheme] = useState<"system" | "cream" | "sepia" | "slate">("system");
  const [textSize, setTextSize] = useState<"text-sm" | "text-base" | "text-lg" | "text-xl">("text-lg");
  const [lineSpacing, setLineSpacing] = useState<"normal" | "spacious">("normal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Keyboard accessibility & defaults
  useEffect(() => {
    // Read persisted reader preferences if any
    const savedTheme = localStorage.getItem("devmentor-reader-theme");
    const savedTextSize = localStorage.getItem("devmentor-reader-textsize");
    const savedSpacing = localStorage.getItem("devmentor-reader-spacing");

    if (savedTheme) setTheme(savedTheme as any);
    if (savedTextSize) setTextSize(savedTextSize as any);
    if (savedSpacing) setLineSpacing(savedSpacing as any);

    // Auto-collapse sidebar on smaller screens
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  const changeTheme = (newTheme: typeof theme) => {
    setTheme(newTheme);
    localStorage.setItem("devmentor-reader-theme", newTheme);
  };

  const changeTextSize = (newSize: typeof textSize) => {
    setTextSize(newSize);
    localStorage.setItem("devmentor-reader-textsize", newSize);
  };

  const changeSpacing = (newSpacing: typeof lineSpacing) => {
    setLineSpacing(newSpacing);
    localStorage.setItem("devmentor-reader-spacing", newSpacing);
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
      className={`min-h-screen transition-colors duration-300 flex flex-col ${
        theme !== "system" ? `reader-mode theme-${theme}` : "bg-slate-50 text-slate-800"
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
          className={`fixed top-14 bottom-0 left-0 z-30 w-80 border-r border-slate-200 bg-white transition-transform duration-300 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${theme === "slate" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white text-slate-800"}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">TRACK COURSE</span>
                <h2 className="text-base font-bold truncate max-w-[200px] mt-0.5">{track.title}</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
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
                              className={`block rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                                isActive
                                  ? "bg-indigo-500 text-white shadow-sm"
                                  : `hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                      theme === "slate" ? "text-slate-300" : "text-slate-600"
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

        {/* Right Content Space */}
        <main
          className={`flex-1 transition-all duration-300 px-4 md:px-8 py-8 ${
            sidebarOpen ? "lg:pl-[340px]" : "pl-4 md:pl-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 text-xs font-bold ${
                    sidebarOpen ? "bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600" : ""
                  }`}
                  title="Toggle course directory sidebar"
                >
                  <Sidebar className="w-4 h-4" />
                  <span className="hidden sm:inline">Index Sidebar</span>
                </button>

                <Link
                  href={`/learn/${track.slug}`}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Undo2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Roadmap</span>
                </Link>
              </div>

              {/* Reader Preferences Controls Panel */}
              <div className="relative">
                <button
                  onClick={() => setShowControls(!showControls)}
                  className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 text-xs font-bold ${
                    showControls ? "bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600" : ""
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
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                              theme === "system"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                            }`}
                          >
                            Default
                          </button>
                          <button
                            onClick={() => changeTheme("cream")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition bg-[#fbfbf8] text-[#2c2c2c] ${
                              theme === "cream" ? "border-indigo-600 ring-2 ring-indigo-100" : "border-slate-200"
                            }`}
                          >
                            Cream
                          </button>
                          <button
                            onClick={() => changeTheme("sepia")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition bg-[#f5edd6] text-[#433422] ${
                              theme === "sepia" ? "border-indigo-600 ring-2 ring-indigo-100" : "border-slate-200"
                            }`}
                          >
                            Sepia
                          </button>
                          <button
                            onClick={() => changeTheme("slate")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition bg-[#0f172a] text-[#e2e8f0] ${
                              theme === "slate" ? "border-indigo-600 ring-2 ring-indigo-900" : "border-slate-700"
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
                              className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition ${
                                textSize === sz
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
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                              lineSpacing === "normal"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800"
                            }`}
                          >
                            Compact/Normal
                          </button>
                          <button
                            onClick={() => changeSpacing("spacious")}
                            className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                              lineSpacing === "spacious"
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

            {/* MDX Content wrapper */}
            <div
              ref={contentRef}
              className={`max-w-3xl mx-auto ${textSize} ${
                lineSpacing === "spacious" ? "reader-spacious" : "reader-normal"
              }`}
            >
              {children}
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
