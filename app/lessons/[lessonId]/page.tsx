import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import crypto from "crypto";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { ensureDailyMissionsAssigned, updateUserStreak } from "@/lib/streaks";
import { LessonReaderClient } from "@/components/LessonReaderClient";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({ params }: Props) {
  try {
    const { lessonId } = await params;
    const res = await dbQuery("SELECT title FROM lessons WHERE id = $1", [lessonId]);
    if (res.rows.length > 0) {
      return {
        title: `${res.rows[0].title} - CodeNivra`,
      };
    }
  } catch {}
  return {
    title: "Lesson Guide - CodeNivra",
  };
}

export default async function LessonDetailPage({ params }: Props) {
  const { lessonId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  // Fetch lesson data, its module, and course details
  const lessonResult = await dbQuery(
    `SELECT l.id, l.title, l.content, l.module_id, 
            m.course_id, m.title as module_title, 
            c.title as course_title
     FROM lessons l
     JOIN modules m ON l.module_id = m.id
     JOIN courses c ON m.course_id = c.id
     WHERE l.id = $1`,
     [lessonId]
  );

  if (lessonResult.rows.length === 0) {
    notFound();
  }

  const lesson = lessonResult.rows[0];

  // Fetch user lesson completion progress
  const progressResult = await dbQuery(
    "SELECT is_completed FROM user_lesson_progress WHERE user_id = $1 AND lesson_id = $2",
    [decoded.userId, lessonId]
  );

  const isCompleted =
    progressResult.rows.length > 0 ? progressResult.rows[0].is_completed : false;

  // Ensure missions are assigned for today before tracking lesson open
  await ensureDailyMissionsAssigned(decoded.userId);

  // Track lesson as opened (upsert last_opened_at)
  const progressId = crypto.randomUUID();
  await dbQuery(
    `INSERT INTO user_lesson_progress (id, user_id, lesson_id, last_opened_at)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (user_id, lesson_id)
     DO UPDATE SET last_opened_at = NOW()`,
    [progressId, decoded.userId, lessonId]
  );

  // Auto-complete the corresponding "Open one lesson" daily mission if assigned for today
  await dbQuery(
    `UPDATE user_daily_mission_progress
     SET is_completed = TRUE, completed_at = NOW()
     WHERE user_id = $1
       AND assigned_date = CURRENT_DATE
       AND mission_id IN (SELECT id FROM daily_missions WHERE type = 'open_lesson')
       AND is_completed = FALSE`,
    [decoded.userId]
  );
  
  await updateUserStreak(decoded.userId);

  // Fetch all lessons in the course to calculate navigation links (previous / next)
  const syllabusLessonsResult = await dbQuery(
    `SELECT l.id, l.title
     FROM lessons l
     JOIN modules m ON l.module_id = m.id
     WHERE m.course_id = $1
     ORDER BY m.order_index ASC, l.order_index ASC`,
    [lesson.course_id]
  );

  const allLessons = syllabusLessonsResult.rows;
  const currentIndex = allLessons.findIndex((les) => les.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex !== -1 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <LessonReaderClient
        lesson={lesson}
        initialCompleted={isCompleted}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
      />
    </div>
  );
}
