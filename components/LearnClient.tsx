"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Layers,
  Sparkles,
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
  // Local state to toggle track preview details
  const [openTracks, setOpenTracks] = useState<Record<string, boolean>>({});
  // Local state to toggle module accordions inside track preview
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const toggleTrack = (slug: string) => {
    setOpenTracks((prev) => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const toggleModule = (moduleSlug: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleSlug]: !prev[moduleSlug]
    }));
  };

  const roles = [
    {
      title: "Intern Developer",
      slug: "intern-developer",
      outcome: "Master core HTML, CSS, and Git.",
      duration: "4-6 Wks",
      level: "Beginner",
      color: "border-blue-100 bg-blue-50/20 text-blue-800 hover:border-blue-300"
    },
    {
      title: "Junior Frontend",
      slug: "junior-frontend",
      outcome: "Master component states & React.",
      duration: "8-10 Wks",
      level: "Intermediate",
      color: "border-violet-100 bg-violet-50/20 text-violet-800 hover:border-violet-300"
    },
    {
      title: "Backend Developer",
      slug: "backend-developer",
      outcome: "Architect Node APIs & SQL.",
      duration: "12-16 Wks",
      level: "Advanced",
      color: "border-emerald-100 bg-emerald-50/20 text-emerald-800 hover:border-emerald-300"
    },
    {
      title: "Full-Stack Developer",
      slug: "full-stack-developer",
      outcome: "Sync clients, servers & JWT.",
      duration: "16-20 Wks",
      level: "Professional",
      color: "border-pink-100 bg-pink-50/20 text-pink-800 hover:border-pink-300"
    },
    {
      title: "DevOps Full-Stack",
      slug: "devops-ready-full-stack",
      outcome: "Run Docker, Actions & AWS.",
      duration: "20-24 Wks",
      level: "Professional",
      color: "border-purple-100 bg-purple-50/20 text-purple-800 hover:border-purple-300"
    }
  ];

  const visualTracks = [
    {
      slug: "frontend-frameworks",
      title: "Frontend Track",
      outcomeShort: "Master component-driven interfaces, React rendering lifecycles, and Next.js scale frameworks.",
      level: "Intermediate",
      duration: "10 Weeks",
      modulesCount: 3,
      lessonsCount: 22,
      projectsCount: 3,
      skills: ["React Rendering", "Next.js App Router", "TypeScript Generics"],
      cta: "View Track",
      href: "/learn/frontend-frameworks",
      colorClass: "bg-blue-50 text-blue-700 border-blue-100",
      icon: <Cpu className="w-5 h-5" />
    },
    {
      slug: "backend",
      title: "Backend Track",
      outcomeShort: "Architect secure Node.js APIs, database transactional pipelines, and cloud file storage systems.",
      level: "Advanced",
      duration: "12 Weeks",
      modulesCount: 10,
      lessonsCount: 33,
      projectsCount: 5,
      skills: ["Express REST APIs", "PostgreSQL & Prisma", "JWT Auth & Security"],
      cta: "View Track",
      href: "/learn/backend",
      colorClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: <Database className="w-5 h-5" />
    },
    {
      slug: "fullstack",
      title: "Full-Stack Track",
      outcomeShort: "Link React frontends with Express server databases, managing cookies and monorepo files.",
      level: "Professional",
      duration: "8 Weeks",
      modulesCount: 4,
      lessonsCount: 16,
      projectsCount: 3,
      skills: ["Client-Server Sync", "HttpOnly Auth Cookies", "Monorepo Workspaces"],
      cta: "View Track",
      href: "/learn/fullstack",
      colorClass: "bg-purple-50 text-purple-700 border-purple-100",
      icon: <Layers className="w-5 h-5" />
    },
    {
      slug: "deployment",
      title: "Cloud & Deployment Track",
      outcomeShort: "Containerize applications in Docker, write CI/CD Actions, and deploy to AWS & Azure.",
      level: "Professional",
      duration: "8 Weeks",
      modulesCount: 10,
      lessonsCount: 20,
      projectsCount: 2,
      skills: ["Docker Containers", "CI/CD Actions", "AWS S3 / Azure SQL"],
      cta: "View Track",
      href: "/learn/deployment",
      colorClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
      icon: <Cloud className="w-5 h-5" />
    },
    {
      slug: "interview",
      title: "Interview Prep Track",
      outcomeShort: "Practice conceptual templates, system designs, and code reviews to crack top-tier interviews.",
      level: "Prep",
      duration: "4 Weeks",
      modulesCount: 1,
      lessonsCount: 7,
      projectsCount: 1,
      skills: ["Interview Templates", "System Design Scale", "Code Review Checklist"],
      cta: "View Track",
      href: "/learn/interview",
      colorClass: "bg-amber-50 text-amber-700 border-amber-100",
      icon: <Award className="w-5 h-5" />
    }
  ];

  const trackDetails: Record<string, {
    outcome: string;
    bestFor: string;
    project: { title: string; slug: string };
  }> = {
    "frontend-frameworks": {
      outcome: "Configure components, load route parameters, and optimize layout paint times.",
      bestFor: "Frontend developers transitioning to component state architectures and Next.js scale frameworks.",
      project: { title: "Resume Builder App", slug: "resume-builder" }
    },
    backend: {
      outcome: "Configure secure Express APIs, manage PostgreSQL ORMs, and run unit integrations tests.",
      bestFor: "Developers wanting to build robust, secure, and well-tested server-side architectures.",
      project: { title: "E-Commerce Backend API", slug: "ecommerce-backend-api" }
    },
    fullstack: {
      outcome: "Link clients to servers, handle validations globally, and organize code in monorepos.",
      bestFor: "Engineers looking to build end-to-end applications coupling react frontends with express.",
      project: { title: "Task Management App", slug: "task-manager" }
    },
    deployment: {
      outcome: "Package container instances, script actions workflows, and manage cloud assets.",
      bestFor: "Full-stack engineers looking to deploy and monitor systems on AWS/Azure.",
      project: { title: "Cloud Deployment Project", slug: "cloud-deployment" }
    },
    interview: {
      outcome: "Structure system pitches and verify logic files against senior templates.",
      bestFor: "Candidates preparing for technical frontend, backend, or full-stack interview reviews.",
      project: { title: "Portfolio Website", slug: "personal-portfolio" }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 lg:py-20 relative animate-fade-in space-y-16">
      
      {/* Page Header */}
      <div className="text-center md:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Choose Your Pathway
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold tracking-tight text-slate-900">
          Professional Learning Hub
        </h1>
        <p className="text-base sm:text-lg text-slate-650 max-w-3xl leading-relaxed font-normal">
          Skip sandbox tutorials. Expand your knowledge through structured tracks, daily programming code tasks, and real-world system templates.
        </p>
      </div>

      {/* Student Console Overview */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="flex-1 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden border border-slate-800">
            {/* Soft inner radial glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full filter blur-[100px]" />
            </div>
            
            <div className="relative z-10 space-y-2">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-805/40">
                Student Console
              </span>
              <h2 className="text-xl font-extrabold tracking-tight mt-2">Welcome to your Learning Space</h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xl">
                CodeNivra offers an interactive curriculum spanning frontend web basics, backend APIs, relational databases, Docker containers, and CI/CD pipelines. Explore structured roadmaps or direct modules below.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-800">
              <Link href="/roadmaps" className="text-xs font-bold text-white hover:text-indigo-300 flex items-center gap-1">
                View Roadmaps <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/projects" className="text-xs font-bold text-white hover:text-indigo-205 flex items-center gap-1">
                Explore Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/tasks" className="text-xs font-bold text-white hover:text-indigo-205 flex items-center gap-1">
                Daily Tasks <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:w-96 shrink-0">
            <DashboardHighlights />
          </div>
        </div>
      </section>

      {/* Recommended Paths by Role (Simplified Grid) */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-[22px] font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          Recommended Path by Role
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {roles.map((role) => (
            <Link
              key={role.slug}
              href={`/roadmaps/${role.slug}`}
              className={`p-5 border rounded-2xl flex flex-col justify-between transition-all duration-350 hover:-translate-y-1 hover:shadow-md cursor-pointer ${role.color}`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-white border uppercase tracking-wider text-slate-500">
                    {role.level}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {role.duration}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 pt-1">{role.title}</h3>
                <p className="text-xs text-slate-650 leading-normal font-semibold">{role.outcome}</p>
              </div>
              <div className="mt-6 inline-flex items-center justify-center gap-1 h-10 w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition">
                <span>Open Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Visual Tracks Section */}
      <section className="space-y-8">
        <div className="border-b border-slate-100 pb-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900">
            Choose Your Learning Path
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1 font-normal">
            Pick a track, review outcomes, and expand the syllabus preview to inspect module chapters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {visualTracks.map((visualTrack) => {
            const track = tracks.find((t) => t.slug === visualTrack.slug);
            const details = trackDetails[visualTrack.slug] || {
              outcome: "Gain core development competencies.",
              bestFor: "Developers looking to expand knowledge.",
              project: { title: "Portfolio Website", slug: "personal-portfolio" }
            };

            const isTrackOpen = !!openTracks[visualTrack.slug];

            return (
              <div
                key={visualTrack.slug}
                className="group bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between relative"
              >
                <div className="space-y-5 w-full">
                  {/* Top Stats & Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${visualTrack.colorClass}`}>
                      {visualTrack.icon}
                      {visualTrack.level}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {visualTrack.duration}
                    </span>
                  </div>

                  {/* Title & Short 1-2 line outcome */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-indigo-650 transition-colors">
                      {visualTrack.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {visualTrack.outcomeShort}
                    </p>
                  </div>

                  {/* Modules & Lessons count */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 text-slate-500">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Syllabus</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{visualTrack.modulesCount} Modules</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guides</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{visualTrack.lessonsCount} Lessons</p>
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skills covered</p>
                    <div className="flex flex-wrap gap-1.5">
                      {visualTrack.skills.map((sk) => (
                        <span key={sk} className="bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-600">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Toggles & CTA */}
                <div className="mt-8 pt-4 border-t border-slate-50 flex flex-col gap-2.5">
                  <Link
                    href={visualTrack.href}
                    className="w-full h-12 inline-flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => toggleTrack(visualTrack.slug)}
                    aria-expanded={isTrackOpen}
                    className="w-full h-11 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    <span>Preview Syllabus</span>
                    {isTrackOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Collapsible syllabus preview inside the grid card flow */}
                {isTrackOpen && (
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 animate-fade-in w-full text-left">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Best For</h4>
                      <p className="text-xs text-slate-600 font-semibold mt-0.5 leading-normal">{details.bestFor}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Project</h4>
                        <Link href={`/projects/${details.project.slug}`} className="text-xs font-bold text-indigo-650 hover:underline block mt-0.5 truncate">
                          {details.project.title}
                        </Link>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Goal Outcome</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5 truncate">{details.outcome}</p>
                      </div>
                    </div>

                    {/* Modules list (using the dynamically loaded track data) */}
                    {track && track.modules && (
                      <div className="border-t border-slate-100 pt-4 space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Modules Syllabus</h4>
                        
                        {track.modules.map((module) => {
                          const isModuleOpen = !!openModules[module.slug];
                          return (
                            <div key={module.slug} className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/20">
                              <button
                                onClick={() => toggleModule(module.slug)}
                                aria-expanded={isModuleOpen}
                                className="w-full px-3 py-2 flex items-center justify-between text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 text-xs font-extrabold text-slate-800 cursor-pointer"
                              >
                                <span className="truncate pr-2">{module.title}</span>
                                {isModuleOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                              </button>
                              
                              {isModuleOpen && module.lessons && (
                                <div className="p-2 bg-white border-t border-slate-100 space-y-1">
                                  {module.lessons
                                    .sort((a, b) => a.order - b.order)
                                    .map((lesson) => (
                                      <Link
                                        key={lesson.slug}
                                        href={`/learn/${track.slug}/${lesson.slug}`}
                                        className="flex items-center justify-between rounded-lg p-2 hover:bg-indigo-50/40 text-[11px] font-semibold text-slate-600 transition"
                                      >
                                        <span className="truncate pr-2">{lesson.title}</span>
                                        <Play className="w-3 h-3 text-indigo-500 shrink-0" />
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
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
