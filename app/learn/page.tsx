import Link from "next/link";
import { getAllTracks } from "@/lib/content";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Learning Tracks",
  description: "Choose a learning track and start building",
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
    foundations: ["HTML + CSS basics", "JavaScript fundamentals", "TypeScript intro"],
    "frontend-frameworks": ["React fundamentals", "Hooks & patterns", "Next.js app router"],
    fullstack: ["API + DB flows", "Production readiness", "Deployment mindset"],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-700">
            Learning Tracks
          </h1>
          <p className="text-lg text-slate-600">
            Choose a track and start learning at your pace
          </p>
        </div>

        {/* Dashboard Highlights */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Tracks</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalTracks}</p>
            <p className="text-sm text-slate-600 mt-2">Curated learning paths</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Modules</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalModules}</p>
            <p className="text-sm text-slate-600 mt-2">Focused, bite-sized topics</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Lessons</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalLessons}</p>
            <p className="text-sm text-slate-600 mt-2">Practical, real-world content</p>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="space-y-12">
          {tracks.map((track) => (
            <div key={track.slug}>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Learning Track
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                </div>
                <h2 className="text-3xl font-bold text-indigo-700 mb-2">
                  {track.title}
                </h2>
                <p className="text-slate-600 max-w-2xl">
                  {track.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {track.modules.map((module) => (
                  <div
                    key={module.slug}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                          {module.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {module.lessons.length} lesson
                          {module.lessons.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700 group-hover:text-white transition">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {module.lessons
                        .sort((a, b) => a.order - b.order)
                        .map((lesson) => (
                          <Link
                            key={lesson.slug}
                            href={`/learn/${track.slug}/${lesson.slug}`}
                            className="block rounded-lg border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-slate-700 hover:text-slate-900">
                                {lesson.title}
                              </span>
                              <ArrowRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {trackHighlights[track.slug] && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-slate-600 mb-3">Must-know points</p>
                  <div className="flex flex-wrap gap-2">
                    {trackHighlights[track.slug].map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
