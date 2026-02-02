import Link from "next/link";
import { getLessonContent, getTrackBySlug, generateStaticParamsForLesson } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/MDXContent";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ track: string; lesson: string }>;
}

export const metadata = {
  title: "Lesson",
};

export function generateStaticParams() {
  return generateStaticParamsForLesson();
}

export default async function LessonPage({ params }: Props) {
  try {
    const { track: trackSlug, lesson: lessonSlug } = await params;
    const lesson = getLessonContent(trackSlug, lessonSlug);
    const track = getTrackBySlug(trackSlug);

    if (!track) {
      notFound();
    }

    // Find current lesson index and module for navigation
    let currentModule = null;

    for (const module of track.modules) {
      const idx = module.lessons.findIndex((l) => l.slug === lessonSlug);
      if (idx !== -1) {
        currentModule = module;
        break;
      }
    }

    if (!currentModule) {
      notFound();
    }

    // Get next and previous lessons
    const allLessons = track.modules.flatMap((m) => m.lessons);
    const currentLessonIndex = allLessons.findIndex(
      (l) => l.slug === lessonSlug
    );
    const prevLesson =
      currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson =
      currentLessonIndex < allLessons.length - 1
        ? allLessons[currentLessonIndex + 1]
        : null;

    const lines = lesson.content.split("\n");
    const checklistIndex = lines.findIndex(
      (line) =>
        line.trim().startsWith("<Checklist") &&
        (line.includes('title="HTML Essentials"') ||
          line.includes("title='HTML Essentials'"))
    );
    const nextLessonIndex = lines.findIndex((line) =>
      line.trim().startsWith("In the next lesson")
    );

    const markerLineIndex = checklistIndex !== -1 ? checklistIndex : nextLessonIndex;
    const contentBeforeMarker =
      markerLineIndex !== -1
        ? lines.slice(0, markerLineIndex).join("\n").trimEnd()
        : lesson.content;
    const contentAfterMarker =
      markerLineIndex !== -1
        ? lines.slice(markerLineIndex).join("\n").trimStart()
        : "";

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Link - Sticky */}
          <div className="sticky top-16 z-40 -mx-4 px-4 py-4 bg-slate-50/95 backdrop-blur mb-4">
            <Link
              href={`/learn/${trackSlug}`}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to {track.title}
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 pb-8 border-b border-slate-200/80">

            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-2">
                {currentModule.title}
              </p>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-700 mb-4">
                {lesson.frontmatter.title}
              </h1>
                <p className="text-lg text-slate-600 mb-4">
                  {lesson.frontmatter.description}
                </p>

              <div className="flex flex-wrap gap-4 text-sm">
                {lesson.frontmatter.tags && lesson.frontmatter.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600">Tags:</span>
                    <div className="flex gap-2">
                      {lesson.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Content */}
          <article className="max-w-none text-slate-700">
            {markerLineIndex === -1 ? (
              <MDXContent source={lesson.content} />
            ) : (
              <>
                <MDXContent source={contentBeforeMarker} />
                {lesson.frontmatter.youtubeId && null}
                <MDXContent source={contentAfterMarker} />
              </>
            )}
          </article>

          {/* YouTube Video */}
          {markerLineIndex === -1 && lesson.frontmatter.youtubeId && null}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 flex justify-between gap-4">
            {prevLesson ? (
              <Link
                href={`/learn/${trackSlug}/${prevLesson.slug}`}
                className="flex-1 p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-2 text-slate-600 mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-semibold">Previous</span>
                </div>
                <p className="font-semibold text-slate-900">{prevLesson.title}</p>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/learn/${trackSlug}/${nextLesson.slug}`}
                className="flex-1 p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 hover:shadow-sm transition text-right"
              >
                <div className="flex items-center justify-end gap-2 text-slate-600 mb-2">
                  <span className="text-sm font-semibold">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="font-semibold text-slate-900">{nextLesson.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
