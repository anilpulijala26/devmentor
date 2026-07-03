"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { Clock, ArrowRight } from "lucide-react";
import { ActionLink, StatusBadge, TagBadge } from "./marketing-primitives";

interface ProjectsClientProps {
  initialProjects: Project[];
}

const LEVEL_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const FUTURE_CATEGORY_FILTERS = ["Frontend", "Backend", "Fullstack", "AI", "Deployment"] as const;

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filtered =
    activeFilter === "All" ? initialProjects : initialProjects.filter((project) => project.level === activeFilter);

  void FUTURE_CATEGORY_FILTERS;

  const getProjectBadges = (project: Project) => {
    const badges: string[] = [project.level];

    if (project.slug.includes("portfolio") || project.slug.includes("resume")) {
      badges.push("Portfolio-ready");
    }

    if (project.slug.includes("dashboard") || project.slug.includes("auth") || project.slug.includes("ecommerce")) {
      badges.push("Interview-ready");
    }

    if (project.level === "Advanced") {
      badges.push("Production-style");
    }

    return badges;
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
            Build Projects
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Build production-style software with clear requirements, scoped deliverables, and implementation patterns that mirror real engineering work.
          </p>
          <p className="text-sm font-medium text-slate-500">
            7 Labs Â· 4 Skill Areas Â· Project-Based Learning
          </p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {LEVEL_FILTERS.map((filter) => (
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

      {filtered.length === 0 ? (
        <div className="rounded-[22px] border border-slate-200 bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-base font-medium text-slate-600">No build projects found for this level.</p>
        </div>
      ) : (
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {filtered.map((project) => {
            const visibleTech = project.techStack.slice(0, 4);
            const extraTechCount = project.techStack.length - 4;

            return (
              <article
                key={project.slug}
                className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-1 flex-col space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <StatusBadge label="Ready to Build" tone="emerald" />
                    <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {getProjectBadges(project).map((badge) => (
                      <TagBadge
                        key={badge}
                        label={badge}
                        tone={
                          badge === "Beginner"
                            ? "blue"
                            : badge === "Intermediate"
                              ? "violet"
                              : badge === "Advanced"
                                ? "emerald"
                                : "slate"
                        }
                      />
                    ))}
                  </div>

                  <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">What you will build</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{project.features[0]}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Difficulty</p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">{project.level}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Outcome</p>
                        <p className="mt-1 text-sm text-slate-600">
                          Build and explain a {project.level.toLowerCase()} project with real delivery patterns.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Tech stack</p>
                    <div className="flex flex-wrap gap-2">
                      {visibleTech.map((tech) => (
                        <TagBadge key={tech} label={tech} />
                      ))}
                      {extraTechCount > 0 && <TagBadge label={`+${extraTechCount} more`} tone="blue" />}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 border-t border-slate-200 pt-4">
                  <ActionLink href={`/projects/${project.slug}`} className="flex-1">
                    Start Build
                  </ActionLink>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}


