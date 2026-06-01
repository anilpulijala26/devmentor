/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLessonContent, getTrackBySlug, generateStaticParamsForLesson } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/MDXContent";
import { LessonReader } from "@/components/LessonReader";

interface Props {
  params: Promise<{ track: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props) {
  try {
    const { track: trackSlug, lesson: lessonSlug } = await params;
    const lesson = getLessonContent(trackSlug, lessonSlug);
    const track = getTrackBySlug(trackSlug);
    if (lesson && track) {
      return {
        title: `${lesson.frontmatter.title} | ${track.title} Track`,
        description: lesson.frontmatter.description || "CodeNivra Professional Developer Lesson",
      };
    }
  } catch { }
  return {
    title: "Lesson Guide - CodeNivra",
  };
}

export function generateStaticParams() {
  try {
    const params = generateStaticParamsForLesson();
    return params.filter((p) => {
      try {
        const track = getTrackBySlug(p.track);
        const lesson = getLessonContent(p.track, p.lesson);
        return !!(track && lesson);
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

export default async function LessonPage({ params }: Props) {
  const { track: trackSlug, lesson: lessonSlug } = await params;

  if (!trackSlug || !lessonSlug) {
    notFound();
  }

  const track = getTrackBySlug(trackSlug);
  if (!track) {
    notFound();
  }

  let lesson;
  try {
    lesson = getLessonContent(trackSlug, lessonSlug);
  } catch {
    notFound();
  }

  if (!lesson) {
    notFound();
  }

  const sections = lesson?.sections ?? [];
  const objectives = lesson?.objectives ?? [];
  const examples = lesson?.examples ?? [];
  const exercises = lesson?.exercises ?? [];
  const resources = lesson?.resources ?? [];

  // Find current lesson index and module for navigation
  let currentModule = null;

  const modules = track.modules ?? [];
  for (const mod of modules) {
    const lessons = mod.lessons ?? [];
    const idx = lessons.findIndex((l) => l.slug === lessonSlug);
    if (idx !== -1) {
      currentModule = mod;
      break;
    }
  }

  if (!currentModule) {
    notFound();
  }

  // Get next and previous lessons
  const allLessons = modules.flatMap((m) => m.lessons ?? []);
  const currentLessonIndex = allLessons.findIndex(
    (l) => l.slug === lessonSlug
  );
  const prevLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const lines = (lesson.content || "").split("\n");
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
    <LessonReader
      track={track}
      currentModule={currentModule}
      lesson={lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    >
      {/* Learning Objectives */}
      {objectives.length > 0 && (
        <div className="my-6 p-6 bg-indigo-50/40 dark:bg-slate-900/50 border border-indigo-100 dark:border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-3">Learning Objectives</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            {objectives.map((obj: any, index: number) => (
              <li key={index} className="text-sm font-medium">
                {typeof obj === 'string' ? obj : obj.title || JSON.stringify(obj)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lesson Outline/Sections */}
      {sections.length > 0 && (
        <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">Lesson Outline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map((section: any, index: number) => (
              <div key={index} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {typeof section === 'string' ? section : section.title || JSON.stringify(section)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      {examples.length > 0 && (
        <div className="my-6 p-6 bg-blue-50/40 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-3">Key Examples</h3>
          <div className="space-y-3">
            {examples.map((ex: any, index: number) => (
              <div key={index} className="p-3 bg-white dark:bg-slate-900 border border-blue-50 dark:border-slate-800 rounded-xl">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {typeof ex === 'string' ? ex : ex.title || JSON.stringify(ex)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercises */}
      {exercises.length > 0 && (
        <div className="my-6 p-6 bg-emerald-50/40 dark:bg-slate-900/50 border border-emerald-100 dark:border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-400 mb-3">Practice Exercises</h3>
          <div className="space-y-3">
            {exercises.map((exc: any, index: number) => (
              <div key={index} className="p-3 bg-white dark:bg-slate-900 border border-emerald-50 dark:border-slate-800 rounded-xl">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {typeof exc === 'string' ? exc : exc.title || JSON.stringify(exc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {resources.length > 0 && (
        <div className="my-6 p-6 bg-purple-50/40 dark:bg-slate-900/50 border border-purple-100 dark:border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-purple-900 dark:text-purple-400 mb-3">Additional Resources</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            {resources.map((res: any, index: number) => (
              <li key={index} className="text-sm font-medium">
                {typeof res === 'string' ? res : res.title || JSON.stringify(res)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {markerLineIndex === -1 ? (
        <MDXContent source={lesson.content} />
      ) : (
        <>
          <MDXContent source={contentBeforeMarker} />
          {lesson.frontmatter.youtubeId && null}
          <MDXContent source={contentAfterMarker} />
        </>
      )}
    </LessonReader>
  );
}
