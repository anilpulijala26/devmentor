import Link from "next/link";
import { roadmaps } from "@/lib/roadmaps";
import { ArrowRight, Sparkles, Clock, Compass, BookOpen } from "lucide-react";

export const metadata = {
  title: "Developer Roadmaps - CodeNivra",
  description: "Accelerate your path from intern to senior software engineer with structured learning pathways.",
};

export default function RoadmapsPage() {
  const getBadgeColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-slate-800 dark:text-blue-400",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-slate-800 dark:text-violet-400",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-slate-800 dark:text-emerald-400",
      Professional: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-slate-800 dark:text-pink-400",
      "Interview Prep": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-slate-800 dark:text-purple-400",
    }[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-750 text-xs font-semibold mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Career Timelines
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Role-Based Learning Roadmaps
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Ditch generic learning. Pick a dedicated roadmap mapped to industry roles. Master theory, complete practical tasks, and build real applications.
          </p>
        </div>

        {/* Path Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap.slug}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Level / Duration Badge Row */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeColor(roadmap.level)}`}>
                    {roadmap.level}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{roadmap.duration}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-750 transition-colors">
                    {roadmap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-3">
                    {roadmap.description}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                    <div>
                      <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Lessons</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">{roadmap.recommendedLessons.length} Modules</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Compass className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Labs</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">{roadmap.projectTasks.length} Projects</p>
                    </div>
                  </div>
                </div>

                {/* Skills covered */}
                <div>
                  <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Target Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {roadmap.skillsCovered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg text-2xs font-semibold text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-200/45">
                <Link
                  href={`/roadmaps/${roadmap.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl text-xs font-bold transition shadow-xs"
                >
                  Start Learning Path
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
