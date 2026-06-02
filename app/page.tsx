import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Compass,
  Server,
  Cloud,
  Activity,
  Award,
  ShieldCheck
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Choose Your Experience Level */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">
              Level Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-905 tracking-tight">
              Choose Your Experience Level
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Select your career stage to launch a custom curriculum timeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Beginner Card */}
            <div className="group bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500">
              <div className="space-y-5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                  <BookOpen className="w-5 h-5 text-indigo-650" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">Fresher / Beginner</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    Start learning from absolute scratch with core web structure, styles, and scripting fundamentals.
                  </p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-slate-50 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                    Semantic HTML & CSS variables
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                    JavaScript async programming
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                    Git & React components
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/roadmaps/intern-developer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Start Beginner Path
                </Link>
              </div>
            </div>

            {/* Mid-Level Card */}
            <div className="group bg-white border border-slate-155 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500">
              <div className="space-y-5">
                <div className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center border border-violet-100">
                  <Layers className="w-5 h-5 text-violet-650" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">Mid-Level Developer</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    Level up your application design by mastering state architectures, REST APIs, and databases.
                  </p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-slate-50 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                    React hooks & Advanced State
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                    Next.js routing & middleware
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                    Node.js, Express & SQL
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/roadmaps/mid-level-fullstack"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Start Mid-Level Path
                </Link>
              </div>
            </div>

            {/* Senior Card */}
            <div className="group bg-white border border-slate-155 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500">
              <div className="space-y-5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <Award className="w-5 h-5 text-emerald-650" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">Senior / Job-Ready Developer</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    Master enterprise system scaling, automated packaging, Docker networks, and cloud architecture.
                  </p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-slate-50 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    Docker containerization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    CI/CD release pipelines
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    AWS/Azure cloud basics
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/roadmaps/devops-ready-full-stack"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Start Senior Path
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. From Scratch to Deployment */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">
              Learning Path
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-905 tracking-tight">
              From Scratch to Deployment
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Accelerate your engineering skills through a complete production lifecycle.
            </p>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden lg:block relative py-6 max-w-5xl mx-auto">
            {/* Horizontal Line connector */}
            <div className="absolute top-[40px] left-[5%] right-[5%] h-0.5 bg-slate-100" />

            <div className="grid grid-cols-7 gap-4 relative z-10">
              {[
                { label: "Foundations", icon: BookOpen },
                { label: "Frontend", icon: Layers },
                { label: "Backend", icon: Server },
                { label: "Full-Stack", icon: Compass },
                { label: "CI/CD", icon: Activity },
                { label: "AWS/Azure", icon: Cloud },
                { label: "Interview Prep", icon: Award }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="text-center space-y-3 group">
                    <div className="mx-auto w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition duration-300" aria-hidden="true" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[8px] font-extrabold text-slate-400 tracking-wider">STEP 0{idx + 1}</span>
                      <p className="text-xs font-bold text-slate-805 group-hover:text-indigo-600 transition duration-200">{step.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical stepper */}
          <div className="lg:hidden relative pl-6 space-y-6 max-w-xs mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-[15px] top-2 bottom-6 w-0.5 bg-slate-100" />

            {[
              { label: "Foundations", icon: BookOpen },
              { label: "Frontend", icon: Layers },
              { label: "Backend", icon: Server },
              { label: "Full-Stack", icon: Compass },
              { label: "CI/CD", icon: Activity },
              { label: "AWS/Azure", icon: Cloud },
              { label: "Interview Prep", icon: Award }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex gap-4 items-center relative z-10 group">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition duration-300 shadow-3xs shrink-0">
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

      {/* 4. What You Can Do With CodeNivra */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-905 tracking-tight">
              What You Can Do With CodeNivra
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Explore targeted activities designed to move you from raw syntax to production releases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Follow Roadmaps",
                desc: "Choose a role-based path from beginner to full-stack.",
                icon: Compass,
                href: "/roadmaps",
                badge: "Roadmaps"
              },
              {
                title: "Practice Daily Tasks",
                desc: "Solve focused coding tasks to improve daily implementation confidence.",
                icon: Code2,
                href: "/tasks",
                badge: "Practice"
              },
              {
                title: "Build Real Projects",
                desc: "Create portfolio sites, auth layers, dashboards, and CMS applications.",
                icon: Layers,
                href: "/projects",
                badge: "Labs"
              },
              {
                title: "Review Code Like a Senior",
                desc: "Audit repositories using senior developer checklist items.",
                icon: ShieldCheck,
                href: "/code-review",
                badge: "Audits"
              },
              {
                title: "Deploy Production Apps",
                desc: "Host static sites and container networks on live servers.",
                icon: Cloud,
                href: "/learn",
                badge: "Deploy"
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="group p-6 bg-white border border-slate-150 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50/50 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 transition duration-300">
                        <Icon className="w-4.5 h-4.5 text-indigo-650 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                      </div>
                      <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {card.badge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition duration-205">
                        {card.title}
                      </h3>
                      <p className="text-slate-550 text-2xs sm:text-xs leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 text-[10px] font-extrabold text-indigo-605 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200 pt-2 border-t border-slate-50">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Learning Tracks */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">
              Core Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-905 tracking-tight">
              Featured Learning Tracks
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
              Unlock targeted expertise in fundamental frontend client modules, backend logic servers, and operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Frontend Engineering",
                outcome: "Master component-driven interfaces, React rendering lifecycles, and Next.js scale frameworks.",
                modules: 3,
                projects: 3,
                href: "/learn/frontend-frameworks",
                color: "bg-blue-50 border-blue-100 text-blue-700"
              },
              {
                title: "Backend Engineering",
                outcome: "Architect secure Node.js APIs, database transactional pipelines, and cloud file storage systems.",
                modules: 10,
                projects: 5,
                href: "/learn/backend",
                color: "bg-emerald-50 border-emerald-100 text-emerald-700"
              },
              {
                title: "Full-Stack Applications",
                outcome: "Link React frontends with Express server databases, managing cookies and monorepo files.",
                modules: 4,
                projects: 3,
                href: "/learn/fullstack",
                color: "bg-purple-50 border-purple-100 text-purple-700"
              },
              {
                title: "CI/CD & Deployment",
                outcome: "Containerize applications in Docker, write CI/CD Actions, and deploy to AWS & Azure.",
                modules: 10,
                projects: 2,
                href: "/learn/deployment",
                color: "bg-indigo-50 border-indigo-100 text-indigo-755"
              }
            ].map((track, idx) => (
              <div
                key={idx}
                className="group border border-slate-150 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.025)] hover:-translate-y-[3px] transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500"
              >
                <div className="space-y-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${track.color}`}>
                    Track
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-650 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-normal font-normal">
                      {track.outcome}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="text-[10px] font-semibold text-slate-450 space-x-2">
                    <span>{track.modules} modules</span>
                    <span>•</span>
                    <span>{track.projects} projects</span>
                  </div>
                  <Link
                    href={track.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-755 focus-visible:outline-none"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-sm font-bold text-indigo-650 hover:text-indigo-700 hover:underline"
            >
              <span>View all learning tracks in the Learning Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Sleek Final CTA Banner */}
      <CTASection />
    </div>
  );
}