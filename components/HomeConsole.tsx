"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, BookOpen, Layers, Award, Cloud, Code2, 
  Clock, Cpu, Database
} from "lucide-react";

interface ConsoleTab {
  id: "beginner" | "mid" | "senior";
  title: string;
  badge: string;
  roadmapTitle: string;
  roadmapSlug: string;
  duration: string;
  outcome: string;
  skills: string[];
  colorClass: string;
  icon: React.ReactNode;
  tracks: {
    title: string;
    slug: string;
    modules: number;
    lessons: number;
    icon: React.ReactNode;
    color: string;
  }[];
  project: {
    title: string;
    slug: string;
    desc: string;
  };
  task: {
    title: string;
    slug: string;
    desc: string;
    time: string;
  };
}

const CONSOLE_TABS: ConsoleTab[] = [
  {
    id: "beginner",
    title: "Beginner / Fresher",
    badge: "Tier 1",
    roadmapTitle: "Intern Developer Roadmap",
    roadmapSlug: "intern-developer",
    duration: "4-6 Weeks",
    outcome: "Master semantic markup structures, responsive CSS layouts, modern ES6 functions, and static site hosting pipelines.",
    skills: ["Semantic HTML5", "CSS Grid & Flexbox", "JavaScript ES6+", "Git Version Control"],
    colorClass: "border-blue-200 bg-blue-50/20 text-blue-800 hover:border-blue-300",
    icon: <BookOpen className="w-5 h-5" />,
    tracks: [
      {
        title: "Web Foundations",
        slug: "foundations",
        modules: 1,
        lessons: 27,
        icon: <BookOpen className="w-4 h-4 text-blue-600" />,
        color: "bg-blue-50/40 border-blue-100/70 hover:border-blue-300"
      }
    ],
    project: {
      title: "Portfolio Website Lab",
      slug: "personal-portfolio",
      desc: "Build an accessible, high-performance portfolio featuring typing animations, theme toggles, and async forms."
    },
    task: {
      title: "Native HTML5 Validation",
      slug: "html-form-validation",
      desc: "Enforce pattern attributes and accessibility validations natively.",
      time: "15 mins"
    }
  },
  {
    id: "mid",
    title: "Mid-Level Developer",
    badge: "Tier 2",
    roadmapTitle: "Mid-Level Full-Stack Roadmap",
    roadmapSlug: "mid-level-fullstack",
    duration: "12-16 Weeks",
    outcome: "Build complex state-driven react applications, configure Next.js App Router parameters, and construct server Express APIs.",
    skills: ["React Rendering", "Next.js App Router", "Node.js & Express", "SQL Databases"],
    colorClass: "border-violet-200 bg-violet-50/20 text-violet-800 hover:border-violet-300",
    icon: <Layers className="w-5 h-5" />,
    tracks: [
      {
        title: "Frontend Engineering",
        slug: "frontend-frameworks",
        modules: 3,
        lessons: 22,
        icon: <Cpu className="w-4 h-4 text-violet-605" />,
        color: "bg-violet-50/40 border-violet-100/70 hover:border-violet-300"
      },
      {
        title: "Backend Engineering",
        slug: "backend",
        modules: 10,
        lessons: 33,
        icon: <Database className="w-4 h-4 text-emerald-650" />,
        color: "bg-emerald-50/40 border-emerald-100/70 hover:border-emerald-300"
      }
    ],
    project: {
      title: "Task Management Kanban",
      slug: "task-manager",
      desc: "Construct drag-and-drop task card grids persisting state updates dynamically inside LocalStorage."
    },
    task: {
      title: "Debounced Search Input",
      slug: "debounced-search",
      desc: "Throttle API calls by implementing custom React hooks and useEffect clear timers.",
      time: "30 mins"
    }
  },
  {
    id: "senior",
    title: "Senior / Job-Ready",
    badge: "Tier 3",
    roadmapTitle: "DevOps Full-Stack Roadmap",
    roadmapSlug: "devops-ready-full-stack",
    duration: "20-24 Weeks",
    outcome: "Containerize apps inside Docker Compose networks, script automated CI/CD Actions, and deploy clusters to AWS & Azure.",
    skills: ["Docker Containerization", "CI/CD Workflows", "AWS S3 / RDS", "Telemetry & Monitoring"],
    colorClass: "border-emerald-200 bg-emerald-50/20 text-emerald-800 hover:border-emerald-300",
    icon: <Award className="w-5 h-5" />,
    tracks: [
      {
        title: "Full-Stack Track",
        slug: "fullstack",
        modules: 4,
        lessons: 16,
        icon: <Layers className="w-4 h-4 text-purple-650" />,
        color: "bg-purple-50/40 border-purple-100/70 hover:border-purple-300"
      },
      {
        title: "Cloud & Deployment",
        slug: "deployment",
        modules: 10,
        lessons: 20,
        icon: <Cloud className="w-4 h-4 text-indigo-600" />,
        color: "bg-indigo-50/40 border-indigo-100/70 hover:border-indigo-300"
      }
    ],
    project: {
      title: "Dockerized Full-Stack App",
      slug: "dockerized-fullstack",
      desc: "Package React client layouts and Express database servers inside linked multi-stage container compose volumes."
    },
    task: {
      title: "Dockerize Express API",
      slug: "dockerize-node-api",
      desc: "Write multi-stage Alpine Docker images caching node_modules packages correctly.",
      time: "45 mins"
    }
  }
];

export function HomeConsole() {
  const [activeTab, setActiveTab] = useState<"beginner" | "mid" | "senior">("beginner");

  const activeData = CONSOLE_TABS.find(t => t.id === activeTab)!;

  const activeBtnColor = {
    beginner: "bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-sm hover:shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5",
    mid: "bg-gradient-to-r from-violet-650 to-purple-650 text-white shadow-sm hover:shadow-[0_4px_20px_rgba(109,40,217,0.25)] hover:-translate-y-0.5",
    senior: "bg-gradient-to-r from-emerald-650 to-teal-650 text-white shadow-sm hover:shadow-[0_4px_20px_rgba(5,150,105,0.25)] hover:-translate-y-0.5"
  }[activeTab];

  const activeCardStyle = {
    beginner: "border-blue-150 border-t-4 border-t-blue-500 shadow-[0_15px_40px_rgba(37,99,235,0.03)]",
    mid: "border-violet-150 border-t-4 border-t-violet-500 shadow-[0_15px_40px_rgba(109,40,217,0.03)]",
    senior: "border-emerald-150 border-t-4 border-t-emerald-500 shadow-[0_15px_40px_rgba(5,150,105,0.03)]"
  }[activeTab];

  const activeBadgeColor = {
    beginner: "bg-blue-50 border-blue-200 text-blue-700",
    mid: "bg-violet-50 border-violet-200 text-violet-705",
    senior: "bg-emerald-50 border-emerald-200 text-emerald-705"
  }[activeTab];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-50/15 via-slate-50/40 to-white border-b border-slate-200/70 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-3xs animate-pulse">
            Career Progression Console
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-905 tracking-tight">
            Choose Your Progression Workspace
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
            Select your level below to preview your target roadmap, recommended tracks, projects, and daily challenges.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm max-w-full overflow-x-auto">
            {CONSOLE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const activeStyles = {
                beginner: "bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-[0_4px_15px_rgba(79,70,229,0.25)] scale-102",
                mid: "bg-gradient-to-r from-violet-650 to-purple-650 text-white shadow-[0_4px_15px_rgba(109,40,217,0.25)] scale-102",
                senior: "bg-gradient-to-r from-emerald-650 to-teal-650 text-white shadow-[0_4px_15px_rgba(5,150,105,0.25)] scale-102"
              }[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? activeStyles
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>{tab.icon}</span>
                  {tab.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Console Workspace Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Side: Roadmap overview */}
          <div className={`lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform ${activeCardStyle}`}>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${activeBadgeColor}`}>
                  {activeData.badge}
                </span>
                <span className="text-xs font-extrabold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {activeData.duration}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {activeData.roadmapTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                  {activeData.outcome}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Key Skills Target</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-indigo-50/50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg text-2xs font-extrabold"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`/roadmaps/${activeData.roadmapSlug}`}
                className={`w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${activeBtnColor}`}
              >
                Launch Target Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: Visual preview grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            
            {/* Box 1: Recommended tracks */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col justify-between hover:shadow-sm transition-all duration-300 hover:border-slate-300">
              <div className="space-y-4">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Recommended Syllabus Tracks</p>
                <div className="space-y-3">
                  {activeData.tracks.map((tr) => (
                    <Link
                      key={tr.slug}
                      href={`/learn/${tr.slug}`}
                      className={`flex items-center justify-between p-3 rounded-2xl border hover:shadow-2xs transition group/track transform hover:-translate-x-0.5 ${tr.color}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-white border flex items-center justify-center shrink-0 shadow-3xs group-hover/track:scale-105 transition-transform duration-300">
                          {tr.icon}
                        </span>
                        <div>
                          <h4 className="text-xs font-black text-slate-805 group-hover/track:text-indigo-650 transition-colors">
                            {tr.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{tr.modules} modules &bull; {tr.lessons} lessons</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/track:translate-x-0.5 transition" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 mt-4">
                <Link href="/learn" className="text-xs font-bold text-indigo-605 hover:underline flex items-center gap-1 hover:text-indigo-700">
                  View Syllabus Hub <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Box 2: Recommended project lab */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col justify-between hover:shadow-sm transition-all duration-300 hover:border-slate-300 hover:-translate-y-0.5">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Featured Project Lab</p>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded font-extrabold">
                    LAB // BUILD
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-slate-905">{activeData.project.title}</h4>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold line-clamp-3">
                    {activeData.project.desc}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 mt-4 flex justify-end">
                <Link
                  href={`/projects/${activeData.project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-650 hover:underline hover:text-indigo-700"
                >
                  Start Project Lab <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 3: Daily Task Challenge */}
            <div className="sm:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between relative overflow-hidden group">
              {/* Colored light mesh overlay */}
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-500 ${
                activeTab === "beginner" ? "bg-blue-500" : activeTab === "mid" ? "bg-violet-500" : "bg-emerald-500"
              }`} />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Recommended Practice Task</span>
                    <span className="bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold text-slate-350 flex items-center gap-1">
                      ⏱ {activeData.task.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white">{activeData.task.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold max-w-xl">
                    {activeData.task.desc}
                  </p>
                </div>
                <Link
                  href={`/tasks/${activeData.task.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-transparent text-slate-900 h-10 px-5 rounded-xl text-xs font-extrabold transition-all duration-205 shrink-0 self-start sm:self-center cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transform active:scale-98"
                >
                  Start Practice Challenge
                  <Code2 className="w-4 h-4 text-indigo-600" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
