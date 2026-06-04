"use client";

import type { Project } from "@/lib/projects";

function getLevelColor(level: Project["level"]) {
  return {
    Beginner: "bg-blue-50 text-blue-700 border-blue-200",
    Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
    Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200",
  }[level];
}

export function ProjectHero({ project }: { project: Project }) {
  const badges = [
    `${project.techStack.length} Technologies`,
    `${project.skillsCovered.length} Skills`,
    `${project.level} Lab`,
    project.duration,
  ];

  return (
    <section className="space-y-4 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-xs sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getLevelColor(
            project.level,
          )}`}
        >
          {project.level} Lab
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Project Based
        </span>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
