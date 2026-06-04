"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ClipboardCheck,
  Clock3,
  Compass,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";
import { Roadmap } from "@/lib/roadmaps";
import { DeveloperTask } from "@/lib/tasks";

interface WeeklyPlanItem {
  week: string;
  topic: string;
  details: string;
}

interface RoadmapDetailLayoutProps {
  roadmap: Roadmap;
  tasksForThisPath: DeveloperTask[];
  plan?: WeeklyPlanItem[];
  progressPercent: number;
  completedLessonsCount: number;
  completedTasksCount: number;
  completedProjectsCount: number;
  hasProgress: boolean;
  nextLessonHref: string;
}

function getBadgeColor(level: Roadmap["level"]) {
  return {
    Beginner: "bg-blue-50 text-blue-700 border-blue-200",
    Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
    Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Professional: "bg-rose-50 text-rose-700 border-rose-200",
    "Interview Prep": "bg-purple-50 text-purple-700 border-purple-200",
  }[level];
}

function getGraduationGoal(roadmap: Roadmap) {
  return `Finish the core lessons, apply the concepts in practice, and ship the guided build work so you can explain ${roadmap.level.toLowerCase()} decisions with confidence.`;
}

export function RoadmapDetailLayout({
  roadmap,
  tasksForThisPath,
  plan,
  progressPercent,
  completedLessonsCount,
  completedTasksCount,
  completedProjectsCount,
  hasProgress,
  nextLessonHref,
}: RoadmapDetailLayoutProps) {
  const totalLessons = roadmap.recommendedLessons.length;
  const totalTasks = tasksForThisPath.length;
  const totalProjects = roadmap.projectTasks.length;
  const timelineCount = plan?.length ?? 0;

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <Link
          href="/roadmaps"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Roadmaps
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getBadgeColor(roadmap.level)}`}
            >
              {roadmap.level}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              <Clock3 className="h-3.5 w-3.5" />
              {roadmap.duration}
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3.15rem] lg:leading-[1.05]">
              {roadmap.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              {roadmap.description}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Next Best Action
            </p>
            <h2 className="text-xl font-semibold text-slate-950">
              {hasProgress ? "Continue where you left off" : "Start the roadmap from the beginning"}
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              {hasProgress
                ? "Jump into the next incomplete lesson and keep momentum going."
                : "Begin with the first lesson in the path and move through the sequence step by step."}
            </p>
          </div>

          <Link
            href={nextLessonHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            {hasProgress ? "Continue Learning" : "Start Learning"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step 1
                </p>
                <h2 className="text-lg font-semibold text-slate-950">Learn</h2>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm">
              <span className="font-medium text-slate-700">
                {completedLessonsCount} of {totalLessons} lessons completed
              </span>
              <span className="text-slate-500">
                Build the conceptual foundation first
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {roadmap.recommendedLessons.map((lesson, idx) => (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.track}/${lesson.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-indigo-700 ring-1 ring-slate-200">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{lesson.title}</h3>
                      <p className="text-xs text-slate-500">Track: {lesson.track}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600" />
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step 2
                </p>
                <h2 className="text-lg font-semibold text-slate-950">Practice</h2>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm">
              <span className="font-medium text-slate-700">
                {completedTasksCount} of {totalTasks} practice tasks completed
              </span>
              <span className="text-slate-500">
                Reinforce the concepts with applied exercises
              </span>
            </div>

            {tasksForThisPath.length > 0 ? (
              <div className="mt-5 space-y-3">
                {tasksForThisPath.map((task) => (
                  <Link
                    key={task.slug}
                    href={`/tasks/${task.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-emerald-700 ring-1 ring-slate-200">
                        P
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
                        <p className="text-xs text-slate-500">{task.level} challenge</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-slate-600">
                Practice tasks will appear here as this roadmap expands.
              </p>
            )}
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step 3
                </p>
                <h2 className="text-lg font-semibold text-slate-950">Build</h2>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm">
              <span className="font-medium text-slate-700">
                {completedProjectsCount} of {totalProjects} project labs completed
              </span>
              <span className="text-slate-500">
                Ship portfolio-ready work with real implementation depth
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {roadmap.projectTasks.map((project) => (
                <div key={project.projectSlug} className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                  <h3 className="text-base font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3.5">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Lab: {project.projectSlug.replace(/-/g, " ")}
                    </span>
                    <Link
                      href={`/projects/${project.projectSlug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 transition hover:text-indigo-800"
                    >
                      Start lab
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {plan && plan.length > 0 ? (
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="space-y-2 border-b border-slate-200 pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Suggested pacing
                </p>
                <h2 className="text-xl font-semibold text-slate-950">
                  Suggested Weekly Roadmap Timeline
                </h2>
                <p className="text-sm leading-6 text-slate-600">
                  Use this as guidance for pacing your work. It supports the learning path, but it is not the main task list.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {plan.map((weekItem, idx) => (
                  <div
                    key={`${weekItem.week}-${idx}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                          {weekItem.week}
                        </p>
                        <h3 className="text-base font-semibold text-slate-950">{weekItem.topic}</h3>
                        <p className="text-sm leading-6 text-slate-600">{weekItem.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              <ClipboardCheck className="h-4 w-4 text-indigo-600" />
              Review Checklist
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Confirm you can demonstrate these outcomes before you consider the roadmap complete.
            </p>

            <div className="mt-5 space-y-3">
              {roadmap.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <Check className="h-3 w-3" />
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Graduation Goal</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {getGraduationGoal(roadmap)}
            </p>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Target className="h-4 w-4 text-emerald-600" />
              Roadmap Progress
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Progress tracking supports the path. The main goal is moving through learn, practice, and build in order.
            </p>

            <div className="mt-5">
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold text-slate-950">{progressPercent}%</p>
                <p className="text-sm text-slate-500">
                  {completedLessonsCount + completedTasksCount + completedProjectsCount} completed
                </p>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                  <span className="text-slate-600">Learn</span>
                  <span className="font-semibold text-slate-900">
                    {completedLessonsCount}/{totalLessons}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                  <span className="text-slate-600">Practice</span>
                  <span className="font-semibold text-slate-900">
                    {completedTasksCount}/{totalTasks}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                  <span className="text-slate-600">Build</span>
                  <span className="font-semibold text-slate-900">
                    {completedProjectsCount}/{totalProjects}
                  </span>
                </div>
                {timelineCount > 0 ? (
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                    <span className="text-slate-600">Weekly timeline</span>
                    <span className="font-semibold text-slate-900">{timelineCount} weeks</span>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
