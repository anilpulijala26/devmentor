/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLessonContent, getTrackBySlug, generateStaticParamsForLesson } from "@/lib/content";
import { extractLessonOutline, LessonOutlineItem } from "@/lib/lesson-outline";
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
  const contentOutline = extractLessonOutline(lesson.content || "");
  const supplementalOutline: LessonOutlineItem[] = [];

  if (objectives.length > 0) {
    supplementalOutline.push({
      id: "learning-objectives",
      title: "Learning Objectives",
      level: 2,
    });
  }

  if (sections.length > 0) {
    supplementalOutline.push({
      id: "lesson-outline",
      title: "Lesson Outline",
      level: 2,
    });
  }

  if (examples.length > 0) {
    supplementalOutline.push({
      id: "key-examples",
      title: "Key Examples",
      level: 2,
    });
  }

  if (exercises.length > 0) {
    supplementalOutline.push({
      id: "practice-exercises",
      title: "Practice Exercises",
      level: 2,
    });
  }

  if (resources.length > 0) {
    supplementalOutline.push({
      id: "additional-resources",
      title: "Additional Resources",
      level: 2,
    });
  }

  const outlineSections = [...supplementalOutline, ...contentOutline];
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
      outlineSections={outlineSections}
    >
      {/* Learning Objectives */}
      {objectives.length > 0 && (
        <section
          id="learning-objectives"
          data-lesson-section="true"
          className="scroll-mt-28 my-6 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-3">Learning Objectives</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            {objectives.map((obj: any, index: number) => (
              <li key={index} className="text-sm font-medium">
                {typeof obj === 'string' ? obj : obj.title || JSON.stringify(obj)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lesson Outline/Sections */}
      {sections.length > 0 && (
        <section
          id="lesson-outline"
          data-lesson-section="true"
          className="scroll-mt-28 my-6 rounded-2xl border border-slate-200/60 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/20"
        >
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
        </section>
      )}

      {/* Examples */}
      {examples.length > 0 && (
        <section
          id="key-examples"
          data-lesson-section="true"
          className="scroll-mt-28 my-6 rounded-2xl border border-blue-100 bg-blue-50/40 p-6 dark:border-slate-800 dark:bg-slate-900/50"
        >
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
        </section>
      )}

      {/* Exercises */}
      {exercises.length > 0 && (
        <section
          id="practice-exercises"
          data-lesson-section="true"
          className="scroll-mt-28 my-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 dark:border-slate-800 dark:bg-slate-900/50"
        >
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
        </section>
      )}

      {/* Resources */}
      {resources.length > 0 && (
        <section
          id="additional-resources"
          data-lesson-section="true"
          className="scroll-mt-28 my-6 rounded-2xl border border-purple-100 bg-purple-50/40 p-6 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <h3 className="text-lg font-bold text-purple-900 dark:text-purple-400 mb-3">Additional Resources</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            {resources.map((res: any, index: number) => (
              <li key={index} className="text-sm font-medium">
                {typeof res === 'string' ? res : res.title || JSON.stringify(res)}
              </li>
            ))}
          </ul>
        </section>
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
