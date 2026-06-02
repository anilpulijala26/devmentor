import Link from "next/link";
import { roadmaps } from "@/lib/roadmaps";
import { ArrowRight, Sparkles, Clock, Compass, BookOpen, ChevronRight, Check, Layers } from "lucide-react";
import { GuidePanel } from "@/components/GuidePanel";

export const metadata = {
  title: "Developer Roadmaps - CodeNivra",
  description: "Accelerate your path from intern to senior software engineer with structured learning pathways.",
};

export default function RoadmapsPage() {
  const getBadgeColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-100",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-100",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Professional: "bg-pink-50 text-pink-700 border-pink-100",
      "Interview Prep": "bg-purple-50 text-purple-700 border-purple-100",
    }[level] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  const timelineSteps = [
    { title: "Intern Web Dev", desc: "Foundations", label: "Beginner" },
    { title: "Junior Frontend", desc: "React & TS", label: "Intermediate" },
    { title: "Backend Dev", desc: "Express & SQL", label: "Advanced" },
    { title: "Full-Stack Dev", desc: "Next.js & API Sync", label: "Professional" },
    { title: "Senior UI Dev", desc: "Fibers & Caching", label: "Professional" },
    { title: "DevOps Full-Stack", desc: "Docker & AWS/Azure", label: "Professional" },
    { title: "Interview Prep", desc: "Pitches & Audits", label: "Interview Prep" }
  ];

  const comparisonCards = [
    { label: "Beginner Friendly", desc: "HTML, CSS, Git, and JS basics to kickstart coding." },
    { label: "Frontend Focused", desc: "TypeScript and React states for interactive UI development." },
    { label: "Full-Stack Path", desc: "Server APIs, relational schemas, and Docker containers." },
    { label: "Interview Preparation", desc: "System design pitches, guides, and checklist code reviews." }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden font-sans">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 lg:py-20 relative animate-fade-in space-y-16">
        
        {/* Header */}
        <div className="text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Career Timelines
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold tracking-tight text-slate-900">
            Role-Based Learning Roadmaps
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Ditch generic learning. Pick a dedicated roadmap mapped to industry roles. Master theory, complete practical tasks, and build real applications.
          </p>
        </div>

        {/* Guide Panel */}
        <GuidePanel
          title="Roadmaps Navigator"
          what="Visual career timelines mapped to production developer roles."
          who="Developers seeking step-by-step guidance from start to finish."
          first="Open the roadmap matching your career experience goals."
          next="Start the first module and complete its matching daily task."
          outcome="Clear career progression path and project implementation plan."
          nextAction="Start first module and complete matching daily task."
        />

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
                <h3 className="font-extrabold text-slate-900 text-sm">Fresher / Beginner Flow</h3>
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
                <h3 className="font-extrabold text-slate-900 text-sm">Mid-Level Developer Flow</h3>
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
                <h3 className="font-extrabold text-slate-900 text-sm">Senior / Job-Ready Flow</h3>
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

        {/* 1. Career Timeline Stepper */}
        <section className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] space-y-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
            Your Career Progression Path
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 relative">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 relative group">
                <div className="flex flex-col items-center md:items-start space-y-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                    Stage 0{idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">{step.title}</h3>
                  <p className="text-xs text-slate-400 font-medium">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:flex items-center justify-center text-slate-300 self-center pl-4 lg:pl-8">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 2. Comparison Summary Row */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparisonCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">{card.label}</h3>
                <p className="text-xs text-slate-500 leading-normal font-semibold">{card.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 3. Roadmaps Path Grid */}
        <section className="space-y-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-4 text-center md:text-left">
            Select Your Role Pathway
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => {
              const visibleSkills = roadmap.skillsCovered.slice(0, 3);
              const extraSkillsCount = roadmap.skillsCovered.length - 3;

              return (
                <div
                  key={roadmap.slug}
                  className="group bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-5">
                    {/* Level / Duration Badge Row */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeColor(roadmap.level)}`}>
                        {roadmap.level}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{roadmap.duration}</span>
                      </div>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">
                      {roadmap.title}
                    </h3>

                    {/* Outcome Description */}
                    <p className="text-sm text-slate-550 leading-relaxed line-clamp-2 font-normal">
                      {roadmap.description}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 text-slate-500">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Lessons</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{roadmap.recommendedLessons.length} Modules</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Labs</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{roadmap.projectTasks.length} Projects</p>
                        </div>
                      </div>
                    </div>

                    {/* Skill Preview */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill preview</p>
                      <div className="flex flex-wrap gap-1">
                        {visibleSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                        {extraSkillsCount > 0 && (
                          <span className="bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md text-[10px] font-bold text-indigo-700">
                            +{extraSkillsCount} more skills
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Area */}
                  <div className="mt-8 pt-4 border-t border-slate-50 flex flex-col gap-3">
                    <Link
                      href={`/roadmaps/${roadmap.slug}`}
                      className="w-full h-12 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      Start Learning Path
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href={`/roadmaps/${roadmap.slug}`}
                      className="text-xs font-semibold text-slate-500 hover:text-indigo-600 text-center transition underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 w-fit mx-auto"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
