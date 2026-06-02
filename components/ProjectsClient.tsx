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
      Beginner: "bg-blue-50 text-blue-700 border-blue-100",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-100",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-100"
    }[level] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 lg:py-20 relative animate-fade-in space-y-12">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Real-World Applications
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold tracking-tight text-slate-900">
            Project Labs
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Ditch sandbox code. Build production-style software. Select a project below, audit the requirement templates, and compile clean architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white border border-slate-200/60 p-1.5 rounded-2xl shrink-0 self-start lg:self-end shadow-sm">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
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



      {/* Project cards grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((proj) => {
          const visibleTech = proj.techStack.slice(0, 4);
          const extraTechCount = proj.techStack.length - 4;

          return (
            <div
              key={proj.slug}
              className="group bg-white border border-slate-100/80 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div className="space-y-5">
                {/* Level & Duration Badge Row */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelColor(proj.level)}`}>
                    {proj.level}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proj.duration}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                {/* Scope / Deliverables */}
                <div className="py-3 border-t border-slate-100 space-y-2.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scope & Deliverables</p>
                  <ul className="space-y-1.5 pl-1.5">
                    {proj.features.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs font-semibold text-slate-600 leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-slate-50 border border-slate-200/80 px-2.5 py-0.5 rounded-lg text-2xs font-semibold text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {extraTechCount > 0 && (
                      <span className="bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg text-2xs font-semibold text-indigo-700">
                        +{extraTechCount} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Start Project CTA Button */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Start Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
