import type { Project } from "@/lib/projects";

function shortList(items: string[], count = 3) {
  return items.slice(0, count);
}

export function ProjectInfoCards({ project }: { project: Project }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
          Project Overview
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          {project.businessRequirement || project.description}
        </p>
      </article>

      <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
          Who This Is For
        </p>
        <p className="text-sm leading-relaxed text-slate-600">{project.whoShouldBuild}</p>
      </article>

      <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
          Core Focus
        </p>
        <div className="flex flex-wrap gap-2">
          {shortList(project.skillsCovered, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {project.features.length} core deliverables and a production-style build path.
        </p>
      </article>
    </section>
  );
}
