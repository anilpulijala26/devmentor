import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Play,
  Layers,
  Compass,
  Database,
  Server,
  Cloud,
  Activity,
  Award
} from "lucide-react";
import { getAllTracks } from "@/lib/content";
import { DashboardHighlights } from "@/components/DashboardHighlights";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeader } from "@/components/SectionHeader";
import { LearningTrackCard } from "@/components/LearningTrackCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  const tracks = getAllTracks();

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. What You Can Do with CodeNivra */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What you can do with CodeNivra
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Explore dynamic learning avenues designed to take you from writing your first line of HTML to deploying production code.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Follow Roadmaps",
                text: "Choose a role-based path from beginner to full-stack.",
                icon: Compass,
                href: "/roadmaps",
                badge: "GUIDES"
              },
              {
                title: "Learn Frontend & Backend",
                text: "Master React, Next.js, Node.js, Express, APIs, and databases.",
                icon: BookOpen,
                href: "/learn",
                badge: "TRACKS"
              },
              {
                title: "Build Real Projects",
                text: "Create portfolio, auth systems, dashboards, CMS apps, and upload tools.",
                icon: Layers,
                href: "/projects",
                badge: "LABS"
              },
              {
                title: "Practice Daily Tasks",
                text: "Solve focused coding tasks to improve daily implementation confidence.",
                icon: Code2,
                href: "/tasks",
                badge: "PRACTICE"
              },
              {
                title: "Review Like a Senior",
                text: "Use production-ready checklists for accessibility, performance, security, and clean code.",
                icon: Database,
                href: "/code-review",
                badge: "REVIEWS"
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="group p-6 bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.025)] hover:-translate-y-1 hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50/50 flex items-center justify-center border border-indigo-100/50 group-hover:bg-indigo-600 transition duration-300">
                        <Icon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {card.badge}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition duration-200">
                        {card.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed font-normal">
                        {card.text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 text-[10px] font-extrabold text-indigo-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200 pt-2 border-t border-slate-50">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. From Scratch to Deployment Stepper */}
      <section className="py-16 bg-slate-50/40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Full-Stack Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              From Scratch to Deployment
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Accelerate your engineering competencies through a complete production lifecycle.
            </p>
          </div>

          {/* Desktop timeline row (hidden on mobile) */}
          <div className="hidden lg:block relative py-8">
            {/* Horizontal Line connector */}
            <div className="absolute top-[52px] left-[5%] right-[5%] h-0.5 bg-slate-200/60" />

            <div className="grid grid-cols-8 gap-4 relative z-10">
              {[
                { label: "Foundations", icon: BookOpen },
                { label: "Frontend", icon: Layers },
                { label: "Backend", icon: Server },
                { label: "Database", icon: Database },
                { label: "Full-Stack", icon: Compass },
                { label: "CI/CD", icon: Activity },
                { label: "AWS/Azure", icon: Cloud },
                { label: "Interview Prep", icon: Award }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="text-center space-y-4 group">
                    <div className="mx-auto w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition duration-300" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] font-extrabold text-slate-400 tracking-wider">STEP 0{idx + 1}</span>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition duration-200">{step.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical stepper (hidden on desktop) */}
          <div className="lg:hidden relative pl-6 space-y-6 max-w-md mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-[15px] top-2 bottom-6 w-0.5 bg-slate-200" />

            {[
              { label: "Foundations", icon: BookOpen },
              { label: "Frontend", icon: Layers },
              { label: "Backend", icon: Server },
              { label: "Database", icon: Database },
              { label: "Full-Stack", icon: Compass },
              { label: "CI/CD", icon: Activity },
              { label: "AWS/Azure", icon: Cloud },
              { label: "Interview Prep", icon: Award }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex gap-4 items-center relative z-10 group">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-55 transition duration-300 shadow-3xs shrink-0">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition duration-300" aria-hidden="true" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Step 0{idx + 1}</span>
                    <p className="text-xs font-bold text-slate-800">{step.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Backend & Cloud Visibility (Skill Chips) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Technology Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Tech Stack Coverage
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              We cover the full spectrum of frontend client architectures, server side endpoints, database structures, and DevOps pipelines.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Frontend Stack",
                desc: "Client layouts & component states",
                color: "indigo",
                skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"]
              },
              {
                title: "Backend Core",
                desc: "Routing, middleware & authentication",
                color: "emerald",
                skills: ["Node.js", "Express.js", "REST APIs", "Auth", "PostgreSQL", "ORMs"]
              },
              {
                title: "Full-Stack Sync",
                desc: "Unified client-server operations",
                color: "pink",
                skills: ["Frontend", "Backend", "Database", "Deployment", "Monorepos", "State Sync"]
              },
              {
                title: "DevOps & Cloud",
                desc: "Containers & CI/CD deployment",
                color: "violet",
                skills: ["GitHub Actions", "Docker", "Vercel", "Render", "AWS", "Azure"]
              }
            ].map((stack, idx) => {
              const badgeStyles = {
                indigo: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100/50",
                emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50",
                pink: "bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100/50",
                violet: "bg-violet-50 text-violet-700 border-violet-100 hover:bg-violet-100/50"
              }[stack.color];

              return (
                <div key={idx} className="border border-slate-100 bg-slate-50/20 rounded-3xl p-6 space-y-4 hover:shadow-2xs transition-all duration-300">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">{stack.title}</h3>
                    <p className="text-[11px] text-slate-400 font-normal leading-normal">{stack.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {stack.skills.map((skill, skillIdx) => (
                      <span key={skillIdx} className={`text-[10px] font-semibold border px-2.5 py-1 rounded-xl tracking-wide transition duration-150 ${badgeStyles}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Start Your Learning Journey Section */}
      <section className="py-16 bg-slate-50/40 border-y border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-100 pb-5 mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Start Your Learning Journey</h2>
            <p className="text-sm text-slate-500 mt-1 font-normal">Pick a track, open a roadmap, build a project, practice a task, or run a senior code review checklist.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Quick starts grids */}
            <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
              {/* Learning Hub / Continue Learning */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
                    LEARNING HUB
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">Guided Technology Tracks</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Master frontend framework lifecycles, backend server pipelines, databases, and DevOps deployments.</p>
                </div>
                <Link
                  href="/learn"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" aria-hidden="true" /> Open Learning Hub
                </Link>
              </div>

              {/* View Roadmaps */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100 uppercase tracking-wider">
                    ROLE ROADMAPS
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">Career Progression Timelines</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Explore interactive timelines tracing frontend, backend, full-stack, DevOps, and interview prep guides.</p>
                </div>
                <Link
                  href="/roadmaps"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>View Roadmaps</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              {/* Start Project Labs */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                    PROJECT LABS
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">Enterprise System Blueprints</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Build portfolio websites, authentication layers, dashboards, CMS apps, and Dockerized configurations.</p>
                </div>
                <Link
                  href="/projects"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              {/* Try Daily Task */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 uppercase tracking-wider">
                    DAILY CODE
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">Interactive Coding Challenges</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Refine TypeScript types, component hooks, API routing controllers, and validation schemas daily.</p>
                </div>
                <Link
                  href="/tasks"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>Try Daily Task</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right sidebar: Checklist telemetry & concept widgets */}
            <div className="lg:col-span-4 space-y-4 w-full">
              {/* Code Review Checklist */}
              <div className="group border border-slate-100 p-5 rounded-3xl bg-white space-y-3 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-pink-600 uppercase tracking-wider">CODE REVIEW TOOL</span>
                  <span className="text-2xs font-extrabold bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-100">11 CATEGORIES</span>
                </div>
                <h4 className="font-bold text-sm text-slate-950">Senior Audit Console</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">Audit code using check sheets modeled after senior logic to build code quality standards.</p>
                <Link
                  href="/code-review"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>Open Code Review</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Dynamic highlights widget */}
              <DashboardHighlights />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Tracks Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="01. Structured Learning Paths"
            title="Guided Learning Tracks"
            subtitle="Follow structured curricula constructed around industrial roles. Each features recommended lessons, project lab targets, and completion milestones."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <LearningTrackCard key={track.slug} track={track} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Master the Fundamentals Section */}
      <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="02. Core Web Basics"
            title="Master the Fundamentals"
            subtitle="Establish a bulletproof engineering foundation. Master the fundamental mechanics of the browser and scripting before moving to frameworks."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Semantic HTML5"
              desc="Practice with real-world frontend projects. Learn semantic tags, document outlines, accessibility guidelines (WCAG), and search engine optimization (SEO)."
              icon={<BookOpen className="w-6 h-6 text-indigo-600" />}
              badge="STRUCTURE"
            />
            <FeatureCard
              title="Modern CSS Layouts"
              desc="Build fluid, responsive UI containers. Master Flexbox alignment, CSS Grid tracks, custom properties (CSS variables), nesting, and custom media queries."
              icon={<Layers className="w-6 h-6 text-indigo-600" />}
              badge="STYLING"
              colorClass="bg-indigo-50 text-indigo-600"
            />
            <FeatureCard
              title="JavaScript ES6+ & Async"
              desc="Deconstruct advanced Javascript. Master event delegation, closures, prototype chains, browser event loop priorities, and memory profile management."
              icon={<Code2 className="w-6 h-6 text-indigo-600" />}
              badge="SCRIPTING"
              colorClass="bg-indigo-50 text-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* 5. Curriculum Core Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="03. Advanced Engineering"
            title="Curriculum Core Pillars"
            subtitle="Deep dive into modern framework lifecycles, backend server pipelines, and production database queries."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="React Lifecycle Rules"
              desc="Understand how React reconcile modules render state. Practice writing optimized custom hooks, performance profiling, and typing React events."
              icon={<Layers className="w-6 h-6 text-indigo-600" />}
              colorClass="bg-indigo-50"
              badge="FRONTEND"
            />
            <FeatureCard
              title="Next.js App Router"
              desc="Implement server-side rendering (SSR), React Server Components (RSC), request middleware, and cache headers to optimize response latency."
              icon={<Compass className="w-6 h-6 text-indigo-600" />}
              colorClass="bg-indigo-50"
              badge="ARCHITECTURE"
            />
            <FeatureCard
              title="PostgreSQL, APIs & ORMs"
              desc="Design relational schemas, set up Express servers with Zod validation, write middleware pipelines, and query using Prisma or Drizzle ORMs."
              icon={<Database className="w-6 h-6 text-indigo-600" />}
              colorClass="bg-indigo-50"
              badge="BACKEND"
            />
          </div>
        </div>
      </section>

      {/* 6. Interactive Web Mechanics Section */}
      <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="04. Practical Practice"
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
        </div>
      </section>

      {/* 7. Why CodeNivra is Different Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="05. Our Methodology"
            title="Why CodeNivra is Different"
            subtitle="CodeNivra bridges the gap between basic tutorials and complex enterprise codebases through a structured learning flow."
          />
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mt-12">
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
        </div>
      </section>

      {/* 8. Sleek Final CTA Banner */}
      <CTASection />
    </div>
  );
}