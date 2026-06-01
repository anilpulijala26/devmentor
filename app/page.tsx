import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Sparkles,
  Terminal,
  FileCheck2,
  Play
} from "lucide-react";
import { roadmaps } from "@/lib/roadmaps";
import { projects } from "@/lib/projects";
import { developerTasks } from "@/lib/tasks";
import { DashboardHighlights } from "@/components/DashboardHighlights";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Premium Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-950 py-20 lg:py-28 border-b border-slate-900">
        {/* Glow meshes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-pulse" />
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Details Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-xs font-bold tracking-wide text-indigo-300 uppercase">
                  Project-Based Learning Flow
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                Learn Real-Time <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Web Development
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Learn real-time web development by building production-style applications from intern to senior level. Master architecture, write clean TypeScript, and practice senior reviews.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/roadmaps"
                  className="inline-flex items-center gap-2.5 bg-indigo-600 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(79,70,229,0.3)]"
                >
                  Start Learning <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-3.5 rounded-2xl font-bold transition-all duration-300"
                >
                  Explore Projects
                </Link>
                
                <Link
                  href="/tasks"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold px-4 py-2 transition"
                >
                  Daily Tasks &rarr;
                </Link>
              </div>
            </div>

            {/* Visual Flow Indicator */}
            <div className="lg:col-span-5 relative">
              <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400 animate-ping" />
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">LEARNING PIPELINE</span>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-500" />
                </div>

                <div className="space-y-4">
                  {[
                    { step: "Learn", desc: "Master concepts through interactive MDX guides & senior notes.", color: "border-blue-500/30 text-blue-400 bg-blue-950/20" },
                    { step: "Practice", desc: "Test skills immediately with daily developer code challenges.", color: "border-amber-500/30 text-amber-400 bg-amber-950/20" },
                    { step: "Build", desc: "Build full-stack applications with database or auth layers.", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20" },
                    { step: "Review", desc: "Run your code through checklists modeled after senior logic.", color: "border-pink-500/30 text-pink-400 bg-pink-950/20" },
                    { step: "Explain", desc: "Practice explaining your choices with mock interview templates.", color: "border-purple-500/30 text-purple-400 bg-purple-950/20" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-xs font-black ${item.color}`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.step}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Developer Console Dashboard Section */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500" />
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Student Developer Console</h2>
                <p className="text-2xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Telemetry overview & quick starts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-extrabold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">ACTIVE SESSION</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Quick starts grids */}
            <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
              {/* Continue Learning */}
              <div className="border border-slate-100 bg-slate-50/50 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-250 transition-all">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">CONTINUE LEARNING</span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-3">Web Foundations: Introduction to HTML</h3>
                  <p className="text-xs text-slate-500 mt-1">Pick up where you left off. Learn Core HTML5 structures, semantics, and layouts.</p>
                </div>
                <Link
                  href="/learn/foundations/html-intro"
                  className="mt-4 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition w-fit"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Resume Guide
                </Link>
              </div>

              {/* Explore Roadmaps */}
              <div className="border border-slate-100 bg-slate-50/50 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-250 transition-all">
                <div>
                  <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded uppercase tracking-wider">ROLE ROADMAPS</span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-3">Junior Frontend Developer</h3>
                  <p className="text-xs text-slate-500 mt-1">Interactive roadmap tracing React lifecycle rules, TypeScript generics, and state contexts.</p>
                </div>
                <Link
                  href="/roadmaps/junior-frontend"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-650 hover:underline"
                >
                  View Pathway &rarr;
                </Link>
              </div>

              {/* Start Project Labs */}
              <div className="border border-slate-100 bg-slate-50/50 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-250 transition-all">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">PROJECT LABS</span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-3">Admin Dashboard Interface</h3>
                  <p className="text-xs text-slate-500 mt-1">Develop telemetry stats pages, sortable tables, and user edit side drawers.</p>
                </div>
                <Link
                  href="/projects/admin-dashboard"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-655 hover:underline"
                >
                  Start Project Lab &rarr;
                </Link>
              </div>

              {/* Try Daily Task */}
              <div className="border border-slate-100 bg-slate-50/50 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-250 transition-all">
                <div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">DAILY CODE</span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-3">Build a Reusable Button</h3>
                  <p className="text-xs text-slate-500 mt-1">Practice component configurations. Write size variants, loaders, and disabled flags.</p>
                </div>
                <Link
                  href="/tasks/reusable-button"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-655 hover:underline"
                >
                  Try Daily Task &rarr;
                </Link>
              </div>
            </div>

            {/* Right sidebar: Checklist telemetry & concept widgets */}
            <div className="md:col-span-4 space-y-4">
              {/* Code Review Checklist */}
              <div className="border border-slate-150 p-5 rounded-2xl bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-pink-650 uppercase tracking-wider">CODE REVIEW TOOL</span>
                  <span className="text-2xs font-extrabold bg-pink-50 text-pink-700 px-2 py-0.5 rounded">11 GUIDELINES</span>
                </div>
                <h4 className="font-bold text-sm text-slate-800">Senior Audit Checklist</h4>
                <p className="text-xs text-slate-500">Run your repository files through the 11-step audit guidelines before code reviews.</p>
                <Link
                  href="/code-review"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-650 hover:underline"
                >
                  Open Audit Console <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Dynamic highlights widget */}
              <DashboardHighlights />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Who This Is For */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Target Audiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Who is DevMentor for?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether starting your first internship or optimizing backend databases at scale, find curriculum structures built for your experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              role: "Interns / Juniors",
              focus: "Core Foundations",
              desc: "Transition past basic tutorials. Build real pages, learn semantic formatting, and deployment requirements to secure your first developer contract.",
              color: "border-blue-100 bg-blue-50/20 text-blue-600"
            },
            {
              role: "Mid-Level Developers",
              focus: "Full-Stack System Design",
              desc: "Model database schemas, implement secure HTTPOnly cookie authorization pipelines, construct modular architectures, and create solid API endpoints.",
              color: "border-purple-100 bg-purple-50/20 text-purple-600"
            },
            {
              role: "Seniors & Interview Candidates",
              focus: "Performance & Pitching",
              desc: "Master React Fiber reconcilers, server-side caching limits, multi-stage containers, and answer system design questions with high impact templates.",
              color: "border-emerald-100 bg-emerald-50/20 text-emerald-600"
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-200 bg-white rounded-3xl p-6 shadow-xs premium-card-hover">
              <span className={`inline-block px-2.5 py-1 text-2xs font-extrabold rounded-md uppercase tracking-wider mb-4 ${item.color}`}>
                {item.focus}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{item.role}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Roadmaps Preview */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                Structured Paths
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Role-Based Learning Paths
              </h2>
              <p className="text-slate-600 text-sm">
                Follow learning roadmaps constructed around actual developer titles. Each features recommended lessons, project lab targets, and completion milestones.
              </p>
            </div>
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl text-xs transition duration-200 whitespace-nowrap"
            >
              View All Roadmaps <ArrowRight className="w-4.5 h-4.5 text-indigo-650" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.slice(0, 3).map((path) => (
              <div key={path.slug} className="border border-slate-200 bg-slate-50/40 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {path.level}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{path.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{path.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{path.description}</p>
                  
                  <div className="pt-2">
                    <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Skills Covered</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skillsCovered.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <Link
                    href={`/roadmaps/${path.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    Start Roadmap
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Project Labs Preview */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Production Labs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Project Labs
            </h2>
            <p className="text-slate-600 text-sm">
              Tackle real-time projects built on realistic system architecture layouts. Includes design contracts, folder layouts, testing requirements, and deployment instructions.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl text-xs transition duration-200 whitespace-nowrap"
          >
            Explore Project Labs <ArrowRight className="w-4.5 h-4.5 text-emerald-600" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((proj) => (
            <div key={proj.slug} className="border border-slate-250 bg-white rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition premium-card-hover">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {proj.level}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{proj.duration}</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{proj.description}</p>
                </div>

                <div className="pt-2">
                  <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1 bg-indigo-650 hover:bg-indigo-755 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  Start Project <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Daily Developer Tasks Preview */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Daily Coding
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Daily Developer Tasks
              </h2>
              <p className="text-slate-400 text-sm">
                Commit to writing code every day. Build reusable UI nodes, fetch server datasets, code authorization routes, and handle error boundary states in typescript.
              </p>
            </div>
            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs transition duration-200 whitespace-nowrap"
            >
              Practice Daily Tasks <ArrowRight className="w-4.5 h-4.5 text-amber-400" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {developerTasks.slice(0, 3).map((task) => (
              <div key={task.slug} className="border border-slate-800 bg-slate-950/65 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {task.level}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{task.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{task.requirement}</p>
                </div>
                <Link
                  href={`/tasks/${task.slug}`}
                  className="mt-6 inline-flex items-center justify-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-bold pt-3 border-t border-slate-800/80 transition"
                >
                  Solve Challenge &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Why DevMentor is Different */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why DevMentor is Different
          </h2>
          <p className="text-slate-600 text-sm">
            We bridge the chasm between simple tutorials and complex enterprise codebases.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Learn (Interactive MDX)",
              desc: "Read explanations packed with senior advice callouts, production tips, and comparisons of common architectural errors.",
              icon: <BookOpen className="w-6 h-6" />,
              color: "bg-indigo-50 text-indigo-655"
            },
            {
              title: "Practice & Build",
              desc: "Solve granular code challenges, followed by building fully featured platforms like the Admin Dashboard or SaaS checkout engines.",
              icon: <Code2 className="w-6 h-6" />,
              color: "bg-emerald-50 text-emerald-655"
            },
            {
              title: "Review & Explain",
              desc: "Audit your files using senior review checklists and study Q&A templates designed to prepare you for system architecture interviews.",
              icon: <FileCheck2 className="w-6 h-6" />,
              color: "bg-pink-50 text-pink-655"
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-200/80 rounded-3xl p-8 bg-white shadow-xs hover:shadow-md transition">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sleek Bottom CTA Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 border-t border-slate-900 text-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full filter blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Build at Production Level?
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Select a role-based roadmap path, build real projects, practice daily UI tasks, and prepare for interviews.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2.5 bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl"
            >
              Explore Learning Roadmaps <ArrowRight className="w-5 h-5 text-indigo-650" />
            </Link>
            
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition duration-200"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}