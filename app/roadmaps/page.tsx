import Link from "next/link";
import { roadmaps } from "@/lib/roadmaps";
import { ArrowRight, Clock, Compass, BookOpen } from "lucide-react";
import { StatusBadge, TagBadge } from "@/components/marketing-primitives";

export const metadata = {
  title: "Career Paths - CodeNivra",
  description: "Explore optional career path overviews after you finish your guided daily learning plan."
};

export default function RoadmapsPage() {
  const getBadgeTone = (level: string) => {
    return {
      Beginner: "blue",
      Intermediate: "violet",
      Advanced: "emerald",
      Professional: "rose",
      "Interview Prep": "violet"
    }[level] as "blue" | "violet" | "emerald" | "rose" | undefined;
  };

  return (
    <div className="min-h-screen bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16 space-y-10 animate-fade-in">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
            Optional career exploration
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
            Career Path Explorer
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Browse role-based paths for motivation and direction. Your main daily guided flow still lives in Dashboard, Learn, Practice, Projects, Interview, and Progress.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/courses"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Return to Guided Learn Flow
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Dashboard
          </Link>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Select Your Role Pathway</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => {
              const visibleSkills = roadmap.skillsCovered.slice(0, 3);
              const extraSkillsCount = roadmap.skillsCovered.length - 3;

              return (
                <article
                  key={roadmap.slug}
                  className="group flex h-full flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge label="Available Now" tone="emerald" />
                      <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{roadmap.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-950">{roadmap.title}</h3>
                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">{roadmap.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <div className="flex items-start gap-3">
                        <BookOpen className="mt-0.5 h-4 w-4 text-indigo-500 shrink-0" />
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Modules</p>
                          <p className="mt-1 text-sm font-semibold text-slate-950">{roadmap.recommendedLessons.length}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Compass className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Projects</p>
                          <p className="mt-1 text-sm font-semibold text-slate-950">{roadmap.projectTasks.length}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Outcome</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {roadmap.projectTasks.length > 0
                          ? `Complete ${roadmap.projectTasks.length} guided project lab${roadmap.projectTasks.length > 1 ? "s" : ""} and demonstrate ${roadmap.level.toLowerCase()} delivery skills.`
                          : "Build confidence with a structured roadmap and practical checkpoints."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Skill preview</p>
                      <div className="flex flex-wrap gap-2">
                        {visibleSkills.map((skill) => (
                          <TagBadge key={skill} label={skill} tone={getBadgeTone(roadmap.level) ?? "slate"} />
                        ))}
                        {extraSkillsCount > 0 && (
                          <TagBadge label={`+${extraSkillsCount} more`} tone="blue" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-4">
                    <Link
                      href={`/roadmaps/${roadmap.slug}`}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    >
                      Start Learning Path
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href={`/roadmaps/${roadmap.slug}`}
                      className="inline-flex items-center justify-center text-sm font-medium text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1"
                    >
                      View details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
