import Link from "next/link";
import { getTrackBySlug, getAllTracks } from "@/lib/content";
import { ChevronLeft, Clock, BookOpen, Award, Compass, Sparkles, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ track: string }>;
}

export const metadata = {
  title: "Track Roadmap - DevMentor",
  description: "Gain hands-on experience and real-time production concepts through structured module timelines.",
};

export function generateStaticParams() {
  const tracks = getAllTracks();
  return tracks.map((track) => ({
    track: track.slug,
  }));
}

export default async function TrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);

  if (!track) {
    notFound();
  }

  const totalLessons = track.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  // Dynamic theme config based on track slug
  const themeMap: Record<
    string,
    {
      badge: string;
      colorClass: string;
      bgClass: string;
      textClass: string;
      borderClass: string;
      hours: string;
      level: string;
    }
  > = {
    foundations: {
      badge: "Core Engineering",
      colorClass: "from-blue-600 to-indigo-600",
      bgClass: "bg-indigo-50",
      textClass: "text-indigo-700",
      borderClass: "border-indigo-100",
      hours: "12 Hours",
      level: "Intermediate"
    },
    "frontend-frameworks": {
      badge: "Advanced Web Apps",
      colorClass: "from-indigo-600 to-violet-600",
      bgClass: "bg-violet-50",
      textClass: "text-violet-700",
      borderClass: "border-violet-100",
      hours: "18 Hours",
      level: "Advanced"
    },
    fullstack: {
      badge: "Production Systems",
      colorClass: "from-violet-600 to-fuchsia-600",
      bgClass: "bg-fuchsia-50",
      textClass: "text-fuchsia-700",
      borderClass: "border-fuchsia-100",
      hours: "24 Hours",
      level: "Professional"
    }
  };

  const theme = themeMap[trackSlug] || {
    badge: "Specialized Track",
    colorClass: "from-indigo-600 to-violet-600",
    bgClass: "bg-indigo-50",
    textClass: "text-indigo-700",
    borderClass: "border-indigo-100",
    hours: "15 Hours",
    level: "Intermediate"
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Back Link */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-100 mb-8 flex items-center justify-between rounded-b-xl shadow-sm">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
            Back to Learning Tracks
          </Link>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {theme.badge}
          </span>
        </div>

        {/* Track Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${theme.colorClass} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
              {theme.badge}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              {theme.level}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            {track.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">{track.description}</p>
        </div>

        {/* Dashboard Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm premium-card-hover">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Compass className="w-4.5 h-4.5" />
              <p className="text-xs font-bold uppercase tracking-wider">Milestones</p>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {track.modules.length} Module{track.modules.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-slate-600 mt-1">Structured progression path</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm premium-card-hover">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <BookOpen className="w-4.5 h-4.5" />
              <p className="text-xs font-bold uppercase tracking-wider">Guides</p>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalLessons} Lesson{totalLessons !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-slate-600 mt-1">Hands-on case studies</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm premium-card-hover">
            <div className="flex items-center gap-2 text-violet-600 mb-2">
              <Clock className="w-4.5 h-4.5" />
              <p className="text-xs font-bold uppercase tracking-wider">Time Investment</p>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{theme.hours}</p>
            <p className="text-xs text-slate-600 mt-1">Estimated duration</p>
          </div>
        </div>

        {/* Modules Timeline */}
        <div className="space-y-12 relative pl-8">
          {/* Main vertical connector line */}
          <div className="absolute left-[15px] top-2 bottom-6 w-[2px] bg-slate-200 dark:bg-slate-800" />

          {track.modules.map((module, idx) => (
            <div key={module.slug} className="relative group/module">
              {/* Timeline Connector Dot (Module Level) */}
              <div className="absolute -left-[25px] top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-300 border-4 border-slate-50 dark:border-slate-900 group-hover/module:bg-indigo-600 group-hover/module:border-indigo-100 transition-all duration-300 z-10 animate-pulse-glow" />

              {/* Module Header Badge */}
              <div className="mb-4">
                <span className="text-[10px] font-extrabold text-indigo-600 tracking-widest uppercase">
                  PHASE {idx + 1}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight group-hover/module:text-indigo-900 transition-colors">
                  {module.title}
                </h2>
              </div>

              {/* Lessons Road */}
              <div className="space-y-3 mt-4">
                {module.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, lessonIdx) => (
                    <div key={lesson.slug} className="relative pl-6 group/lesson">
                      {/* Lesson connector dot centered on the vertical line */}
                      <div className="absolute left-[-21px] top-5.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300 dark:bg-slate-950 dark:border-slate-700 group-hover/lesson:bg-indigo-500 group-hover/lesson:border-indigo-200 transition-all duration-200 z-10" />

                      <Link
                        href={`/learn/${track.slug}/${lesson.slug}`}
                        className="block p-4 border border-slate-200 rounded-xl bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-300 transform hover:-translate-x-0.5 relative"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600 group-hover/lesson:bg-indigo-600 group-hover/lesson:text-white transition-colors">
                              {idx + 1}.{lessonIdx + 1}
                            </span>
                            <div>
                              <h3 className="font-bold text-slate-800 text-sm sm:text-base group-hover/lesson:text-indigo-600 transition-colors">
                                {lesson.title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-semibold text-indigo-500 opacity-0 group-hover/lesson:opacity-100 group-hover/lesson:translate-x-1 transition-all duration-300">
                            Start Guide
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Career Path Indicator */}
        <div className="mt-16 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/30 p-6 text-center">
          <div className="inline-flex p-3 rounded-full bg-indigo-50 text-indigo-600 mb-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Track Completion & Ready State</h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Completing all milestones in this track satisfies core production skills required for mid-level engineer positions. We recommend completing the must-know checklist and practice questions at the end of each module.
          </p>
        </div>
      </div>
    </div>
  );
}
