"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { Clock, ArrowRight } from "lucide-react";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filtered =
    activeFilter === "All" ? initialProjects : initialProjects.filter((project) => project.level === activeFilter);

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-100",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-100",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-100"
    }[level] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16 space-y-10 animate-fade-in">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
            Build workspace
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
            Project Labs
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Build production-style software with clear requirements, scoped deliverables, and implementation patterns that mirror real engineering work.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                activeFilter === filter
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => {
          const visibleTech = project.techStack.slice(0, 4);
          const extraTechCount = project.techStack.length - 4;

          return (
            <article
              key={project.slug}
              className="group flex h-full flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${getLevelColor(project.level)}`}>
                    {project.level}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600">{project.description}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Scope</p>
                  <ul className="mt-3 space-y-2">
                    {project.features.slice(0, 2).map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Tech stack</p>
                  <div className="flex flex-wrap gap-2">
                    {visibleTech.map((tech) => (
                      <span key={tech} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {tech}
                      </span>
                    ))}
                    {extraTechCount > 0 && (
                      <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        +{extraTechCount} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  Start Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
