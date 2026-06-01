import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { Track } from "@/lib/content";

interface LearningTrackCardProps {
  track: Track;
}

export function LearningTrackCard({ track }: LearningTrackCardProps) {
  const getTrackMeta = (slug: string) => {
    return {
      foundations: { level: "Beginner", time: "12 Hours" },
      "frontend-frameworks": { level: "Intermediate", time: "18 Hours" },
      fullstack: { level: "Advanced", time: "24 Hours" }
    }[slug] || { level: "Intermediate", time: "15 Hours" };
  };

  const { level } = getTrackMeta(track.slug);
  const lessonsCount = track.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

  const getLevelColor = (lvl: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }[lvl] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
      <div className="space-y-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getLevelColor(level)}`}>
            {level}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">LEARNING PATH</span>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900">
            {track.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
            {track.description}
          </p>
        </div>

        {/* Info Indicators */}
        <div className="grid grid-cols-2 gap-3 py-3.5 border-y border-slate-100 text-slate-500 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>{track.modules.length} Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>{lessonsCount} Lessons</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href={`/learn/${track.slug}`}
          className="group w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-semibold transition duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
        >
          <span>View Track</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
