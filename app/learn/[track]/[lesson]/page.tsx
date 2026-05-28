import { getLessonContent, getTrackBySlug, generateStaticParamsForLesson } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/MDXContent";
import { LessonReader } from "@/components/LessonReader";

interface Props {
  params: Promise<{ track: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { track: trackSlug, lesson: lessonSlug } = await params;
  try {
    const lesson = getLessonContent(trackSlug, lessonSlug);
    const track = getTrackBySlug(trackSlug);
    if (lesson && track) {
      return {
        title: `${lesson.frontmatter.title} | ${track.title} Track`,
        description: lesson.frontmatter.description || "DevMentor Professional Developer Lesson",
      };
    }
  } catch {}
  return {
    title: "Lesson Guide - DevMentor",
  };
}

export function generateStaticParams() {
  return generateStaticParamsForLesson();
}

export default async function LessonPage({ params }: Props) {
  const { track: trackSlug, lesson: lessonSlug } = await params;
  let lesson;
  let track;

  try {
    lesson = getLessonContent(trackSlug, lessonSlug);
    track = getTrackBySlug(trackSlug);
  } catch {
    notFound();
  }

  if (!track || !lesson) {
    notFound();
  }

  // Find current lesson index and module for navigation
  let currentModule = null;

  for (const mod of track.modules) {
    const idx = mod.lessons.findIndex((l) => l.slug === lessonSlug);
    if (idx !== -1) {
      currentModule = mod;
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
    <LessonReader
      track={track}
      currentModule={currentModule}
      lesson={lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    >
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
