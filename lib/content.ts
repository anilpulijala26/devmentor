import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Frontmatter {
  title: string;
  description: string;
  tags: string[];
  estimatedTime: string;
  youtubeId?: string;
  objectives?: string[];
  sections?: any[];
  examples?: any[];
  exercises?: any[];
  resources?: any[];
}

export interface LessonMeta {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  objectives?: string[];
  sections?: any[];
  examples?: any[];
  exercises?: any[];
  resources?: any[];
}

export interface LessonWithPath extends LessonMeta {
  path: string;
}

export function getLessonPath(track: string, slug: string): string {
  return path.join(CONTENT_DIR, track, `${slug}.mdx`);
}

export function getLessonContent(track: string, slug: string): LessonWithPath {
  const filePath = getLessonPath(track, slug);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Lesson not found: ${track}/${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
    path: filePath,
    objectives: data.objectives || [],
    sections: data.sections || [],
    examples: data.examples || [],
    exercises: data.exercises || [],
    resources: data.resources || [],
  };
}

export function getTracksData() {
  const tracksPath = path.join(CONTENT_DIR, "tracks.json");
  const data = fs.readFileSync(tracksPath, "utf-8");
  return JSON.parse(data);
}

export interface Track {
  slug: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface Module {
  slug: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  slug: string;
  title: string;
  order: number;
}

export function getAllTracks(): Track[] {
  const { tracks } = getTracksData();
  return tracks;
}

export function getTrackBySlug(slug: string): Track | null {
  const tracks = getAllTracks();
  return tracks.find((t) => t.slug === slug) || null;
}

export function getLessonsByTrack(trackSlug: string): Lesson[] {
  const track = getTrackBySlug(trackSlug);
  if (!track) return [];

  const lessons: Lesson[] = [];
  track.modules.forEach((module) => {
    lessons.push(...(module.lessons || []).map((lesson) => ({ ...lesson })));
  });
  return lessons;
}

export function generateStaticParamsForLesson() {
  const tracks = getAllTracks();
  const params: Array<{ track: string; lesson: string }> = [];

  tracks.forEach((track) => {
    (track.modules || []).forEach((module) => {
      (module.lessons || []).forEach((lesson) => {
        try {
          const filePath = getLessonPath(track.slug, lesson.slug);
          if (fs.existsSync(filePath)) {
            params.push({
              track: track.slug,
              lesson: lesson.slug,
            });
          }
        } catch {
          // ignore missing or unreadable files gracefully
        }
      });
    });
  });

  return params;
}
