"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DeveloperTask } from "@/lib/tasks";
import type { Project } from "@/lib/projects";
import type { Module } from "@/lib/content";
import { ChecklistSection } from "./ChecklistSection";
import { ModuleAccordion } from "./ModuleAccordion";
import { PracticeCard } from "./PracticeCard";
import { ProjectLabCard } from "./ProjectLabCard";
import { TrackCTA } from "./TrackCTA";

type TrackTab = "lessons" | "practice" | "projects" | "interview" | "outcomes";

const tabs: { id: TrackTab; label: string }[] = [
  { id: "lessons", label: "Lessons" },
  { id: "practice", label: "Practice" },
  { id: "projects", label: "Projects" },
  { id: "interview", label: "Interview" },
  { id: "outcomes", label: "Outcomes" },
];

export function TrackTabs({
  modules,
  trackSlug,
  trackLevel,
  practiceTasks,
  projects,
  interviewTopics,
  outcomes,
  nextStep,
}: {
  modules: Module[];
  trackSlug: string;
  trackLevel: string;
  practiceTasks: DeveloperTask[];
  projects: Project[];
  interviewTopics: string[];
  outcomes: string[];
  nextStep: { label: string; url: string };
}) {
  const [activeTab, setActiveTab] = useState<TrackTab>("lessons");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(modules.map((module, index) => [module.slug, index === 0])),
  );

  const lessonCount = useMemo(
    () => modules.reduce((count, module) => count + (module.lessons?.length ?? 0), 0),
    [modules],
  );

  const toggleModule = (slug: string) => {
    setOpenModules((current) => ({ ...current, [slug]: !current[slug] }));
  };

  return (
    <section className="space-y-6">
      <div className="sticky top-16 z-30 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur-md">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex w-max min-w-full gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeTab === "lessons" ? (
        <div className="space-y-4">
          <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <p className="text-sm leading-6 text-slate-600">
              {modules.length} modules, {lessonCount} lessons. Open a module to see every lesson in sequence.
            </p>
          </div>
          {modules.map((module, index) => (
            <ModuleAccordion
              key={module.slug}
              index={index}
              title={module.title}
              lessonCount={module.lessons?.length ?? 0}
              difficulty={trackLevel}
              lessons={module.lessons ?? []}
              trackSlug={trackSlug}
              isOpen={!!openModules[module.slug]}
              onToggle={() => toggleModule(module.slug)}
            />
          ))}
        </div>
      ) : null}

      {activeTab === "practice" ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {practiceTasks.map((task) => (
              <PracticeCard key={task.slug} task={task} />
            ))}
          </div>
          <TrackCTA />
        </div>
      ) : null}

      {activeTab === "projects" ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectLabCard key={project.slug} project={project} />
            ))}
          </div>
          <TrackCTA />
        </div>
      ) : null}

      {activeTab === "interview" ? (
        <ChecklistSection title="Interview Readiness Topics" items={interviewTopics} />
      ) : null}

      {activeTab === "outcomes" ? (
        <div className="space-y-6">
          <ChecklistSection title="Milestone Completion Outcomes" items={outcomes} />
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Your Next Learning Step</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Once you complete this track, continue with the next recommended path.
            </p>
            <Link
              href={nextStep.url}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {nextStep.label}
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
