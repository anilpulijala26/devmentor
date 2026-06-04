import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { TagBadge } from "@/components/marketing-primitives";

export function ProjectLabCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <TagBadge
          label={project.level}
          tone={project.level === "Beginner" ? "blue" : project.level === "Intermediate" ? "violet" : "emerald"}
        />
        <span className="text-xs text-slate-500">{project.duration}</span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">{project.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.slice(0, 3).map((tech) => (
          <TagBadge key={tech} label={tech} />
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
      >
        View Project Lab
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
