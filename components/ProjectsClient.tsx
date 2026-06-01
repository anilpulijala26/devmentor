"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { Sparkles, Clock, ArrowRight } from "lucide-react";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filtered = activeFilter === "All"
    ? initialProjects
    : initialProjects.filter((p) => p.level === activeFilter);

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-150 dark:bg-slate-800 dark:text-blue-400",
      Intermediate: "bg-violet-50 text-violet-750 border-violet-150 dark:bg-slate-800 dark:text-violet-400",
      Advanced: "bg-emerald-50 text-emerald-750 border-emerald-150 dark:bg-slate-800 dark:text-emerald-400"
    }[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in">
      {/* Header */}
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-750 text-xs font-semibold mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            Real-World Applications
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Project Labs
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Ditch sandbox code. Build production-style software. Select a project below, audit the requirement templates, and compile clean architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white border border-slate-200/60 p-1.5 rounded-2xl shrink-0 self-center md:self-end dark:bg-slate-900 dark:border-slate-800">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-650 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Project cards grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((proj) => (
          <div
            key={proj.slug}
            className="group flex flex-col justify-between rounded-3xl border border-slate-205 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-350 hover:shadow-md dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="space-y-4">
              {/* Level & Duration Badge Row */}
              <div className="flex items-center justify-between">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelColor(proj.level)}`}>
                  {proj.level}
                </span>
                <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 animate-pulse" style={{ animationDuration: '4s' }} />
                  <span>{proj.duration}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors dark:text-slate-100">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 dark:text-slate-300">
                  {proj.description}
                </p>
              </div>

              {/* What you will build section */}
              <div className="py-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest">Scope / Deliverables</p>
                <ul className="space-y-1.5 pl-1.5">
                  {proj.features.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs font-medium text-slate-655 leading-relaxed dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="pt-2">
                <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-50 border border-slate-200/80 px-2.5 py-0.5 rounded-lg text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Project CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-150/45 dark:border-slate-800">
              <Link
                href={`/projects/${proj.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Start Project Labs Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
