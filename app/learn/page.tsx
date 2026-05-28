import Link from "next/link";
import { getAllTracks } from "@/lib/content";
import { ArrowRight, BookOpen, Clock, Award, Layers, Sparkles, Layout, Code2, Server } from "lucide-react";

export const metadata = {
  title: "Learning Tracks - DevMentor",
  description: "Industry-grade, structured paths designed to take you from core engineering concepts to production-grade architecture.",
};

export default function LearnPage() {
  const tracks = getAllTracks();
  const totalTracks = tracks.length;
  const totalModules = tracks.reduce((sum, t) => sum + t.modules.length, 0);
  const totalLessons = tracks.reduce(
    (sum, t) => sum + t.modules.reduce((mSum, m) => mSum + m.lessons.length, 0),
    0
  );

  const trackHighlights: Record<string, string[]> = {
    foundations: [
      "Semantic HTML & WCAG A11y",
      "CSS Grid & Custom Properties",
      "JS Event Loop & Closures",
      "Advanced TS Generics",
      "Memory & Garbage Collection",
      "Foundations Interview Prep"
    ],
    "frontend-frameworks": [
      "React Fiber & Hooks",
      "Server Components (RSC)",
      "Next.js App Router & Caching",
      "useActionState & Optimistic UI",
      "Security Headers & Middleware",
      "React/Next.js Interview Prep"
    ],
    fullstack: [
      "JWT & HttpOnly Cookie Security",
      "Prisma vs Drizzle ORMs",
      "Zero-Downtime Migrations",
      "Multi-stage Docker Compose",
      "Query Performance (EXPLAIN)",
      "Full-Stack Interview Prep"
    ],
  };

  // Helper icons and styles based on track slug
  const trackMeta: Record<string, { badge: string; colorClass: string; icon: React.ReactNode; hours: string; level: string }> = {
    foundations: {
      badge: "Core Engineering",
      colorClass: "from-blue-600 to-indigo-600",
      icon: <Code2 className="w-5 h-5" />,
      hours: "12 Hours",
      level: "Intermediate"
    },
    "frontend-frameworks": {
      badge: "Advanced Web Apps",
      colorClass: "from-indigo-600 to-violet-600",
      icon: <Layout className="w-5 h-5" />,
      hours: "18 Hours",
      level: "Advanced"
    },
    fullstack: {
      badge: "Production Systems",
      colorClass: "from-violet-600 to-fuchsia-600",
      icon: <Server className="w-5 h-5" />,
      hours: "24 Hours",
      level: "Professional"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Tech Professionals & Interns
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Professional Learning Tracks
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Gain production-ready software engineering experience. Follow curated, bite-sized paths structured after modern development team standards.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          <div className="relative group overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm premium-card-hover">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Paths</span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalTracks}</p>
            <p className="text-sm text-slate-600 mt-1">Structured trajectories</p>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm premium-card-hover">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Structured Modules</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalModules}</p>
            <p className="text-sm text-slate-600 mt-1">Focused topic deep dives</p>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm premium-card-hover">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Lessons</span>
              <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalLessons}</p>
            <p className="text-sm text-slate-600 mt-1">Practical code challenges</p>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-16">
          {tracks.map((track) => {
            const meta = trackMeta[track.slug] || {
              badge: "General track",
              colorClass: "from-indigo-600 to-indigo-800",
              icon: <Code2 className="w-5 h-5" />,
              hours: "15 Hours",
              level: "Intermediate"
            };

            return (
              <div key={track.slug} className="group/track relative">
                {/* Track Heading Banner */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${meta.colorClass}`}>
                        {meta.icon}
                        {meta.badge}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                        {meta.level}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight group-hover/track:text-indigo-600 transition-colors">
                      {track.title}
                    </h2>
                    <p className="text-slate-600 mt-2 max-w-3xl leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {meta.hours}
                    </span>
                    <span className="text-slate-300">|</span>
                    <Link
                      href={`/learn/${track.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      View Roadmap Path
                      <ArrowRight className="w-4 h-4 group-hover/track:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {track.modules.map((module) => (
                    <div
                      key={module.slug}
                      className="group/module relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
                    >
                      {/* Module Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-indigo-600 tracking-widest uppercase">MODULE</span>
                          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mt-0.5 group-hover/module:text-indigo-700 transition-colors">
                            {module.title}
                          </h3>
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover/module:bg-indigo-50 group-hover/module:text-indigo-600 transition-all duration-300">
                          <BookOpen className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Lessons List inside Module */}
                      <div className="space-y-1.5 flex-1">
                        {module.lessons
                          .sort((a, b) => a.order - b.order)
                          .map((lesson) => (
                            <Link
                              key={lesson.slug}
                              href={`/learn/${track.slug}/${lesson.slug}`}
                              className="group/lesson flex items-center justify-between rounded-xl border border-slate-50/50 bg-slate-50/20 p-2.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50/80"
                            >
                              <span className="text-xs font-semibold text-slate-700 group-hover/lesson:text-slate-900 truncate pr-2">
                                {lesson.title}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover/lesson:translate-x-0.5 group-hover/lesson:text-indigo-600 transition-all" />
                            </Link>
                          ))}
                      </div>

                      {/* Footer Badge */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{module.lessons.length} practical guide{module.lessons.length !== 1 ? "s" : ""}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Track Highlights Focus */}
                {trackHighlights[track.slug] && (
                  <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      Key Production & Interview Focus topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trackHighlights[track.slug].map((item) => (
                        <span
                          key={item}
                          className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
