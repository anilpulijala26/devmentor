"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Layers,
  Cpu,
  Database,
  Play,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Cloud
} from "lucide-react";
import { Track } from "@/lib/content";
import { DashboardHighlights } from "./DashboardHighlights";

interface LearnClientProps {
  tracks: Track[];
}

export function LearnClient({ tracks }: LearnClientProps) {
  const [openTracks, setOpenTracks] = useState<Record<string, boolean>>({});
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const toggleTrack = (slug: string) => {
    setOpenTracks((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const toggleModule = (moduleSlug: string) => {
    setOpenModules((prev) => ({ ...prev, [moduleSlug]: !prev[moduleSlug] }));
  };

  const roles = [
    {
      title: "Intern Developer",
      slug: "intern-developer",
      outcome: "Start with HTML, CSS, JavaScript, and version control.",
      duration: "4-6 Wks",
      level: "Beginner"
    },
    {
      title: "Junior Frontend",
      slug: "junior-frontend",
      outcome: "Move into components, state, and product UI systems.",
      duration: "8-10 Wks",
      level: "Intermediate"
    },
    {
      title: "Backend Developer",
      slug: "backend-developer",
      outcome: "Build APIs, data models, and service flows.",
      duration: "12-16 Wks",
      level: "Advanced"
    },
    {
      title: "Full-Stack Developer",
      slug: "full-stack-developer",
      outcome: "Connect frontend, backend, auth, and data layers.",
      duration: "16-20 Wks",
      level: "Professional"
    },
    {
      title: "DevOps Full-Stack",
      slug: "devops-ready-full-stack",
      outcome: "Ship through CI/CD, containers, and cloud deployment.",
      duration: "20-24 Wks",
      level: "Professional"
    }
  ];

  const visualTracks = [
    {
      slug: "frontend-frameworks",
      title: "Frontend Track",
      outcomeShort: "Master component architecture, rendering flow, and scalable Next.js UI patterns.",
      level: "Intermediate",
      duration: "10 Weeks",
      modulesCount: 3,
      lessonsCount: 22,
      skills: ["React Rendering", "Next.js App Router", "TypeScript"],
      href: "/learn/frontend-frameworks",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-100",
      icon: <Cpu className="w-4.5 h-4.5" />
    },
    {
      slug: "backend",
      title: "Backend Track",
      outcomeShort: "Design secure Node.js APIs, database flows, and reliable server-side patterns.",
      level: "Advanced",
      duration: "12 Weeks",
      modulesCount: 10,
      lessonsCount: 33,
      skills: ["Express APIs", "PostgreSQL", "JWT Auth"],
      href: "/learn/backend",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: <Database className="w-4.5 h-4.5" />
    },
    {
      slug: "fullstack",
      title: "Full-Stack Track",
      outcomeShort: "Connect client, server, authentication, and data in one production workflow.",
      level: "Professional",
      duration: "8 Weeks",
      modulesCount: 4,
      lessonsCount: 16,
      skills: ["Client-Server Sync", "Auth Cookies", "Monorepos"],
      href: "/learn/fullstack",
      badgeClass: "bg-violet-50 text-violet-700 border-violet-100",
      icon: <Layers className="w-4.5 h-4.5" />
    },
    {
      slug: "deployment",
      title: "Cloud & Deployment Track",
      outcomeShort: "Package, automate, and release applications with CI/CD and cloud infrastructure.",
      level: "Professional",
      duration: "8 Weeks",
      modulesCount: 10,
      lessonsCount: 20,
      skills: ["Docker", "GitHub Actions", "AWS / Azure"],
      href: "/learn/deployment",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
      icon: <Cloud className="w-4.5 h-4.5" />
    },
    {
      slug: "interview",
      title: "Interview Prep Track",
      outcomeShort: "Practice explanations, system design thinking, and code review readiness.",
      level: "Prep",
      duration: "4 Weeks",
      modulesCount: 1,
      lessonsCount: 7,
      skills: ["Interview Templates", "System Design", "Code Review"],
      href: "/learn/interview",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-100",
      icon: <Award className="w-4.5 h-4.5" />
    }
  ];

  const trackDetails: Record<
    string,
    {
      outcome: string;
      bestFor: string;
      project: { title: string; slug: string };
    }
  > = {
    "frontend-frameworks": {
      outcome: "Configure components, route states, and scalable layout systems.",
      bestFor: "Frontend developers moving into component-driven product engineering.",
      project: { title: "Resume Builder App", slug: "resume-builder" }
    },
    backend: {
      outcome: "Build secure APIs, robust data access layers, and reliable validation.",
      bestFor: "Developers who want stronger service architecture and backend fundamentals.",
      project: { title: "E-Commerce Backend API", slug: "ecommerce-backend-api" }
    },
    fullstack: {
      outcome: "Ship connected applications with auth, validation, and coordinated state.",
      bestFor: "Engineers building complete user-facing applications end to end.",
      project: { title: "Task Management App", slug: "task-manager" }
    },
    deployment: {
      outcome: "Package apps, automate releases, and manage cloud delivery steps.",
      bestFor: "Developers moving from local builds into production deployment workflows.",
      project: { title: "Cloud Deployment Project", slug: "cloud-deployment" }
    },
    interview: {
      outcome: "Explain technical decisions clearly and review systems with confidence.",
      bestFor: "Candidates preparing for frontend, backend, or full-stack interview loops.",
      project: { title: "Portfolio Website", slug: "personal-portfolio" }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16 space-y-14 animate-fade-in">
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
            Learning workspace
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
            Professional Learning Hub
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Move through structured tracks, role-based roadmaps, practice tasks, and project labs inside one guided developer workspace.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-base font-semibold text-slate-950">Learning Command Center</p>
                <p className="mt-1 text-sm text-slate-500">Plan your next track, open tasks, and move into project delivery.</p>
              </div>
              <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Active workspace
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-medium text-slate-500">Recommended next move</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">Choose a learning track</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-medium text-slate-500">Primary workflow</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">Learn, practice, build, review</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
              {["Roadmaps", "Tasks", "Projects", "Code Review", "Deployment"].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/roadmaps"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                <span>Open Roadmaps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <span>Explore Labs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <DashboardHighlights />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-600" />
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Recommended Path by Role</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {roles.map((role) => (
            <Link
              key={role.slug}
              href={`/roadmaps/${role.slug}`}
              className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-full flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      {role.level}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{role.duration}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-950">{role.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{role.outcome}</p>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                  Open roadmap <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Choose Your Learning Path</h2>
          <p className="mt-2 text-base text-slate-600">
            Review outcomes, inspect the syllabus structure, and move directly into the track that matches your next growth step.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visualTracks.map((visualTrack) => {
            const track = tracks.find((t) => t.slug === visualTrack.slug);
            const details = trackDetails[visualTrack.slug] || {
              outcome: "Gain core development competencies.",
              bestFor: "Developers looking to expand knowledge.",
              project: { title: "Portfolio Website", slug: "personal-portfolio" }
            };
            const isTrackOpen = !!openTracks[visualTrack.slug];

            return (
              <article
                key={visualTrack.slug}
                className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${visualTrack.badgeClass}`}>
                      {visualTrack.icon}
                      {visualTrack.level}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{visualTrack.duration}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-950">{visualTrack.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{visualTrack.outcomeShort}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Modules</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">{visualTrack.modulesCount}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Lessons</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">{visualTrack.lessonsCount}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {visualTrack.skills.map((skill) => (
                      <span key={skill} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t border-slate-200 pt-4">
                  <Link
                    href={visualTrack.href}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => toggleTrack(visualTrack.slug)}
                    aria-expanded={isTrackOpen}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <span>Preview Syllabus</span>
                    {isTrackOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isTrackOpen && (
                  <div className="mt-6 space-y-4 border-t border-slate-200 pt-5 animate-fade-in">
                    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Best for</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{details.bestFor}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Target project</p>
                          <Link href={`/projects/${details.project.slug}`} className="mt-1 inline-block text-sm font-semibold text-indigo-700 hover:text-indigo-800">
                            {details.project.title}
                          </Link>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Outcome</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{details.outcome}</p>
                        </div>
                      </div>
                    </div>

                    {track && track.modules && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Modules</p>
                        {track.modules.map((module) => {
                          const isModuleOpen = !!openModules[module.slug];
                          return (
                            <div key={module.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                              <button
                                onClick={() => toggleModule(module.slug)}
                                aria-expanded={isModuleOpen}
                                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                              >
                                <span className="truncate pr-2">{module.title}</span>
                                {isModuleOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                              </button>

                              {isModuleOpen && module.lessons && (
                                <div className="space-y-1 border-t border-slate-100 bg-slate-50/50 p-2">
                                  {module.lessons
                                    .sort((a, b) => a.order - b.order)
                                    .map((lesson) => (
                                      <Link
                                        key={lesson.slug}
                                        href={`/learn/${track.slug}/${lesson.slug}`}
                                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
                                      >
                                        <span className="truncate pr-2">{lesson.title}</span>
                                        <Play className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                                      </Link>
                                    ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
