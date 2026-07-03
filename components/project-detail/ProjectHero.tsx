"use client";

import type { Project } from "@/lib/projects";

function getLevelColor(level: Project["level"]) {
  return {
    Beginner: "bg-slate-100 text-slate-700 border-slate-200",
    Intermediate: "bg-indigo-50 text-[#4F46E5] border-indigo-100",
    Advanced: "bg-violet-50 text-[#7C3AED] border-violet-100",
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
