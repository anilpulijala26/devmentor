import Link from "next/link";
import { getTrackBySlug, getAllTracks } from "@/lib/content";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ track: string }>;
}

export const metadata = {
  title: "Track Overview",
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-4 bg-slate-50/95 backdrop-blur mb-4">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-700"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Tracks
          </Link>
        </div>

        {/* Track Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-700">
            {track.title}
          </h1>
          <p className="text-lg text-slate-600">{track.description}</p>
        </div>

        {/* Track Dashboard */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Modules</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{track.modules.length}</p>
            <p className="text-sm text-slate-600 mt-2">Clear progression</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Lessons</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalLessons}</p>
            <p className="text-sm text-slate-600 mt-2">Hands-on topics</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">Focus</p>
            <p className="text-base font-semibold text-slate-900 mt-2">Must-know concepts</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {track.modules.slice(0, 3).map((module) => (
                <span
                  key={module.slug}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {module.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          {track.modules.map((module, idx) => (
            <div key={module.slug}>
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                {idx + 1}. {module.title}
              </h2>

              <div className="space-y-2">
                {module.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/learn/${track.slug}/${lesson.slug}`}
                      className="block p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 hover:shadow-sm transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {lesson.title}
                          </h3>
                        </div>
                        <div className="text-indigo-500">→</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
