import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Play,
  Layers,
  Compass,
  Database
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

      {/* 2. Student Developer Console (SaaS-style Padded Section - No Negative Overlaps) */}
      <section className="py-16 bg-slate-50/40 border-y border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-100 pb-5 mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Console</h2>
            <p className="text-sm text-slate-500 mt-1 font-normal">Access your learning paths, daily task challenges, and active project labs in one unified dashboard.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Quick starts grids */}
            <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
              {/* Continue Learning */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
                    CONTINUE LEARNING
                  </span>
                  <h3 className="font-bold text-slate-950 text-sm">Web Foundations: Introduction to HTML</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Pick up where you left off. Learn Core HTML5 structures, semantics, and layouts.</p>
                </div>
                <Link
                  href="/learn/foundations/html-intro"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" /> Resume Guide
                </Link>
              </div>

              {/* Explore Roadmaps */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100 uppercase tracking-wider">
                    ROLE ROADMAPS
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">Junior Frontend Developer</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Interactive roadmap tracing React lifecycle rules, TypeScript generics, and state contexts.</p>
                </div>
                <Link
                  href="/roadmaps/junior-frontend"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>View Pathway</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>

              {/* Start Project Labs */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                    PROJECT LABS
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">Admin Dashboard Interface</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Develop telemetry stats pages, sortable tables, and user edit side drawers.</p>
                </div>
                <Link
                  href="/projects/admin-dashboard"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>Start Project Lab</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>

              {/* Try Daily Task */}
              <div className="group border border-slate-100 bg-white p-5 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:border-slate-200/60 transition-all duration-300 min-h-[190px] focus-within:ring-2 focus-within:ring-indigo-500">
                <div className="space-y-2.5">
                  <span className="inline-block text-[9px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 uppercase tracking-wider">
                    DAILY CODE
                  </span>
                  <h3 className="font-bold text-slate-955 text-sm">React Controlled Forms</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">Practice component state. Build a login form with controlled components and dynamic error blur bindings.</p>
                </div>
                <Link
                  href="/tasks/react-controlled-form"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>Try Daily Task</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right sidebar: Checklist telemetry & concept widgets */}
            <div className="lg:col-span-4 space-y-4 w-full">
              {/* Code Review Checklist */}
              <div className="group border border-slate-100 p-5 rounded-3xl bg-white space-y-3 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-pink-600 uppercase tracking-wider">CODE REVIEW TOOL</span>
                  <span className="text-2xs font-extrabold bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-100">11 GUIDELINES</span>
                </div>
                <h4 className="font-bold text-sm text-slate-950">Senior Audit Checklist</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">Run your repository files through the 11-step audit guidelines before submitting PRs.</p>
                <Link
                  href="/code-review"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 cursor-pointer"
                >
                  <span>Open Audit Console</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
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