import Link from "next/link";
import { roadmaps } from "@/lib/roadmaps";
import { ArrowRight, Clock, Compass, BookOpen } from "lucide-react";

export const metadata = {
  title: "Developer Roadmaps - CodeNivra",
  description: "Accelerate your path from intern to senior software engineer with structured learning pathways."
};

export default function RoadmapsPage() {
  const getBadgeColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-100",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-100",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Professional: "bg-pink-50 text-pink-700 border-pink-100",
      "Interview Prep": "bg-purple-50 text-purple-700 border-purple-100"
    }[level] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <div className="min-h-screen bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16 space-y-10 animate-fade-in">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
            Role-based pathways
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
            Learning Roadmaps
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Choose a structured path mapped to real engineering roles, then progress through lessons, tasks, and project labs in a clear sequence.
          </p>
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
                      <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${getBadgeColor(roadmap.level)}`}>
                        {roadmap.level}
                      </span>
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

                    <div className="space-y-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Skill preview</p>
                      <div className="flex flex-wrap gap-2">
                        {visibleSkills.map((skill) => (
                          <span key={skill} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {skill}
                          </span>
                        ))}
                        {extraSkillsCount > 0 && (
                          <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                            +{extraSkillsCount} more
                          </span>
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
