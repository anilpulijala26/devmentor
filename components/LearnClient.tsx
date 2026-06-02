"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Cpu,
  Database,
  Play,
  Terminal,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Briefcase,
  HelpCircle,
  Cloud,
  UserCheck,
  Code2,
  Compass
} from "lucide-react";
import { Track } from "@/lib/content";
import { GuidePanel } from "./GuidePanel";
import { DashboardHighlights } from "./DashboardHighlights";
import { SectionHeader } from "./SectionHeader";
import { FeatureCard } from "./FeatureCard";

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

  const workflowSteps = [
    { step: "1", title: "Learn Concepts", desc: "Read senior developer logs.", icon: <BookOpen className="w-5 h-5" />, color: "border-blue-100 bg-blue-50 text-blue-700" },
    { step: "2", title: "Practice Tasks", desc: "Complete coding challenges.", icon: <Terminal className="w-5 h-5" />, color: "border-emerald-100 bg-emerald-50 text-emerald-700" },
    { step: "3", title: "Build Projects", desc: "Develop database schemas.", icon: <Layers className="w-5 h-5" />, color: "border-violet-100 bg-violet-50 text-violet-700" },
    { step: "4", title: "Review Code", desc: "Audit repos with checklists.", icon: <ShieldCheck className="w-5 h-5" />, color: "border-pink-100 bg-pink-50 text-pink-700" },
    { step: "5", title: "Explain in Interviews", desc: "Prepare mock system pitches.", icon: <Award className="w-5 h-5" />, color: "border-amber-100 bg-amber-50 text-amber-700" }
  ];
  const goals = [
    { label: "Build a Portfolio", target: "/projects/personal-portfolio", desc: "For beginners seeking jobs" },
    { label: "Master React & Next.js", target: "/learn/frontend-frameworks", desc: "For frontend jobs" },
    { label: "Write Node APIs", target: "/learn/backend", desc: "For backend operations" },
    { label: "Docker & CI/CD", target: "/learn/deployment", desc: "For deployment & operations" }
  ];

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
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
          Skip sandbox tutorials. Expand your knowledge through structured tracks, daily programming code tasks, and real-world system templates.
        </p>
      </div>

      {/* Guide Panel */}
      <GuidePanel
        title="Learning Hub Navigator"
        what="Master frontend client layouts, backend server routing pipelines, database queries, and automated deployment architectures."
        who="All experience levels (beginners starting out, mid-level developer transitions, and seniors target cloud-readiness)."
        first="Choose your experience level below or select a specific technology learning track."
        next="Follow the step-by-step roadmap lessons, write daily matching code tasks, and configure projects."
        outcome="Deployable full-stack systems and professional architectural coding templates."
        nextAction="Choose your experience level or roadmap."
      />

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

      {/* Choose Your Experience Level Grid */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-[22px] font-extrabold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-indigo-500" />
          Choose Your Experience Level
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Beginner Card */}
          <div className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50/50 flex items-center justify-center border border-indigo-100/50">
                <BookOpen className="w-5 h-5 text-indigo-650" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Fresher / Beginner</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  Start with HTML, CSS, JavaScript, Git, React basics, daily practice, portfolio project, and deployment.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 space-y-3">
              <Link
                href="/roadmaps/intern-developer"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition duration-205"
              >
                Start Beginner Path
              </Link>
              <p className="text-[10px] text-center text-slate-450 italic">
                &ldquo;New here? Start with Beginner Path.&rdquo;
              </p>
            </div>
          </div>

          {/* Mid-Level Card */}
          <div className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-violet-50/50 flex items-center justify-center border border-violet-100/50">
                <Layers className="w-5 h-5 text-violet-655" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Mid-Level Developer</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  Strengthen React, TypeScript, Next.js, Node.js, Express, APIs, databases, auth, and full-stack projects.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 space-y-3">
              <Link
                href="/roadmaps/mid-level-fullstack"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition duration-205"
              >
                Start Mid-Level Path
              </Link>
              <p className="text-[10px] text-center text-slate-450 italic">
                &ldquo;Already know basics? Start with Mid-Level Path.&rdquo;
              </p>
            </div>
          </div>

          {/* Senior Card */}
          <div className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50/50 flex items-center justify-center border border-emerald-100/50">
                <Award className="w-5 h-5 text-emerald-655" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Senior / Job-Ready Developer</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  Focus on architecture, performance, security, code review, CI/CD, AWS/Azure deployment, system design, and interview explanation.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 space-y-3">
              <Link
                href="/roadmaps/devops-ready-full-stack"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-650 hover:bg-indigo-755 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition duration-205"
              >
                Start Senior Path
              </Link>
              <p className="text-[10px] text-center text-slate-450 italic">
                &ldquo;Preparing for senior interviews? Start with Job-Ready Path.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Learning Flow Mapping */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-[22px] font-extrabold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          Targeted Learning Flows by Role
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Fresher Flow */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-905 text-sm">Fresher / Beginner Flow</h3>
              <p className="text-[11px] text-slate-400 font-normal">Learn foundational structures and build a single client showcase.</p>
            </div>
            <div className="space-y-2.5 pt-2">
              {[
                { label: "Roadmap", desc: "Start with Intern Developer path", color: "indigo" },
                { label: "Beginner Tasks", desc: "Solve HTML, CSS & JavaScript tasks", color: "indigo" },
                { label: "Portfolio Project", desc: "Build highly responsive portfolio website", color: "emerald" },
                { label: "Code Review", desc: "Run accessibility and HTML semantic checks", color: "pink" },
                { label: "Vercel Deployment", desc: "Host static portfolio live on Vercel", color: "violet" },
                { label: "Interview Explanation", desc: "Master pitch template for basic portfolio", color: "amber" }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-650 shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-normal">{step.label}</h4>
                    <p className="text-[10px] text-slate-450 leading-normal font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mid-Level Flow */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-905 text-sm">Mid-Level Developer Flow</h3>
              <p className="text-[11px] text-slate-400 font-normal">Strengthen full-stack capabilities and integrate server databases.</p>
            </div>
            <div className="space-y-2.5 pt-2">
              {[
                { label: "Frontend/Backend Roadmap", desc: "Follow Junior Frontend or Backend path", color: "indigo" },
                { label: "Advanced Tasks", desc: "Solve TS generics & API route tasks", color: "indigo" },
                { label: "Full-Stack Project", desc: "Build Leave Manager or Blog CMS app", color: "emerald" },
                { label: "Code Review", desc: "Verify API response codes & input validations", color: "pink" },
                { label: "CI/CD Deployment", desc: "Deploy automatically using GitHub Actions", color: "violet" },
                { label: "Resume & Project Pitch", desc: "Structure database schema choices clearly", color: "amber" }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-655 shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-normal">{step.label}</h4>
                    <p className="text-[10px] text-slate-455 leading-normal font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Senior Flow */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-905 text-sm">Senior / Job-Ready Flow</h3>
              <p className="text-[11px] text-slate-400 font-normal">Design robust architectures, cloud setups, and secure systems.</p>
            </div>
            <div className="space-y-2.5 pt-2">
              {[
                { label: "Senior UI/DevOps Roadmap", desc: "Follow DevOps or Senior UI paths", color: "indigo" },
                { label: "Architecture Tasks", desc: "Solve containerization & telemetry challenges", color: "indigo" },
                { label: "Advanced Project", desc: "Build SaaS Auth or AI Assistant system", color: "emerald" },
                { label: "Security & Performance Audit", desc: "Profile queries, check CORS, and rate limits", color: "pink" },
                { label: "AWS/Azure Cloud Deployment", desc: "Deploy containers in Docker compose network", color: "violet" },
                { label: "System Design Explanation", desc: "Explain scaling pipelines & caching mechanisms", color: "amber" }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-655 shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-normal">{step.label}</h4>
                    <p className="text-[10px] text-slate-455 leading-normal font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Stepper Strip */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-8">
          The CodeNivra Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 relative">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 relative group">
              {/* Line connector for large viewports */}
              {idx < 4 && (
                <div className="hidden sm:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-slate-100 z-0" />
              )}
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center relative z-10 shadow-2xs group-hover:scale-105 transition-all duration-200 ${step.color}`}>
                {step.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal px-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Choose by Goal Grid */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-[22px] font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          Choose by Goal
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {goals.map((goal, idx) => (
            <Link
              key={idx}
              href={goal.target}
              className="p-5 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:border-indigo-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between min-h-[90px] cursor-pointer"
            >
              <h3 className="text-sm font-bold text-slate-900">{goal.label}</h3>
              <p className="text-xs text-slate-400 mt-2 font-semibold">{goal.desc}</p>
            </Link>
          ))}
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

      {/* 4. Master the Fundamentals Section */}
      <section className="py-12 border-t border-slate-100">
        <SectionHeader
          badge="Core Web Basics"
          title="Master the Fundamentals"
          subtitle="Establish a bulletproof engineering foundation. Master the fundamental mechanics of the browser and scripting before moving to frameworks."
        />
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Semantic HTML5"
            desc="Practice with real-world frontend projects. Learn semantic tags, document outlines, accessibility guidelines (WCAG), and search engine optimization (SEO)."
            icon={<BookOpen className="w-6 h-6 text-indigo-650" />}
            badge="STRUCTURE"
          />
          <FeatureCard
            title="Modern CSS Layouts"
            desc="Build fluid, responsive UI containers. Master Flexbox alignment, CSS Grid tracks, custom properties (CSS variables), nesting, and custom media queries."
            icon={<Layers className="w-6 h-6 text-indigo-655" />}
            badge="STYLING"
            colorClass="bg-indigo-50 text-indigo-600"
          />
          <FeatureCard
            title="JavaScript ES6+ & Async"
            desc="Deconstruct advanced Javascript. Master event delegation, closures, prototype chains, browser event loop priorities, and memory profile management."
            icon={<Code2 className="w-6 h-6 text-indigo-655" />}
            badge="SCRIPTING"
            colorClass="bg-indigo-50 text-indigo-600"
          />
        </div>
      </section>

      {/* 5. Curriculum Core Pillars Section */}
      <section className="py-12 border-t border-slate-100">
        <SectionHeader
          badge="Advanced Engineering"
          title="Curriculum Core Pillars"
          subtitle="Deep dive into modern framework lifecycles, backend server pipelines, and production database queries."
        />
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="React Lifecycle Rules"
            desc="Understand how React reconcile modules render state. Practice writing optimized custom hooks, performance profiling, and typing React events."
            icon={<Layers className="w-6 h-6 text-indigo-655" />}
            colorClass="bg-indigo-50"
            badge="FRONTEND"
          />
          <FeatureCard
            title="Next.js App Router"
            desc="Implement server-side rendering (SSR), React Server Components (RSC), request middleware, and cache headers to optimize response latency."
            icon={<Compass className="w-6 h-6 text-indigo-655" />}
            colorClass="bg-indigo-50"
            badge="ARCHITECTURE"
          />
          <FeatureCard
            title="PostgreSQL, APIs & ORMs"
            desc="Design relational schemas, set up Express servers with Zod validation, write middleware pipelines, and query using Prisma or Drizzle ORMs."
            icon={<Database className="w-6 h-6 text-indigo-655" />}
            colorClass="bg-indigo-50"
            badge="BACKEND"
          />
        </div>
      </section>

      {/* 6. Interactive Web Mechanics Section */}
      <section className="py-12 border-t border-slate-100">
        <SectionHeader
          badge="Practical Practice"
          title="Interactive Web Mechanics"
          subtitle="Move past reading static books. Apply your skills with daily coding challenges, project labs, code reviews, and structured mock pitches."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group border border-slate-100 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-indigo-600">DAILY PRACTICE</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">Daily Coding Tasks</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal">Solve isolated code challenges, write reusable components, structure API routes, and validate schemas.</p>
            </div>
            <Link href="/tasks" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-755 cursor-pointer">
              <span>Solve Tasks</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <div className="group border border-slate-100 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600">SYSTEMS LAB</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">Project Labs</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal">Build realistic systems like Admin Dashboards and Resume Builders from comprehensive business blueprints.</p>
            </div>
            <Link href="/projects" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-755 cursor-pointer">
              <span>Explore Projects</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <div className="group border border-slate-100 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-pink-600">QUALITY AUDIT</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">Code Reviews</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal">Audit code using check sheets modeled after senior logic to build code quality standards.</p>
            </div>
            <Link href="/code-review" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-755 cursor-pointer">
              <span>Audit Guidelines</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <div className="group border border-slate-100 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-violet-600">INTERVIEW PITCH</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">Interview Explanations</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal">Practice pitching your architecture decisions using structured templates optimized for tech interviews.</p>
            </div>
            <Link href="/roadmaps" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-755 cursor-pointer">
              <span>View Templates</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Why CodeNivra is Different Section */}
      <section className="py-12 border-t border-slate-105">
        <SectionHeader
          badge="Our Methodology"
          title="Why CodeNivra is Different"
          subtitle="CodeNivra bridges the gap between basic tutorials and complex enterprise codebases through a structured learning flow."
        />
        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mt-6">
          {[
            { step: "1. Learn", desc: "Study dynamic lessons packed with senior callouts, performance warnings, and syntax comparisons.", colorClass: "border-blue-100 bg-blue-50/10 text-blue-700" },
            { step: "2. Practice", desc: "Commit to daily code challenges to refine TypeScript structures, components, and async states.", colorClass: "border-amber-100 bg-amber-50/10 text-amber-700" },
            { step: "3. Build", desc: "Construct full-stack applications with Relational Database schemas, APIs, and authorization layers.", colorClass: "border-emerald-100 bg-emerald-50/10 text-emerald-700" },
            { step: "4. Review", desc: "Audit your files using structural checklists modeled after senior engineer design reviews.", colorClass: "border-pink-100 bg-pink-50/10 text-pink-700" },
            { step: "5. Explain", desc: "Structure your architectural choices and present your work clearly during technical interviews.", colorClass: "border-purple-100 bg-purple-50/10 text-purple-700" }
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-100 bg-slate-50/30 rounded-3xl p-6 flex flex-col justify-between hover:shadow-sm hover:-translate-y-[3px] transition-all duration-300">
              <div className="space-y-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${item.colorClass}`}>
                  {item.step}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
