import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { ensureDailyMissionsAssigned, updateUserStreak } from "@/lib/streaks";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, completed } = body;

    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required." }, { status: 400 });
    }

    // Verify if lesson exists
    const lessonCheck = await dbQuery("SELECT id FROM lessons WHERE id = $1", [lessonId]);
    if (lessonCheck.rows.length === 0) {
      return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
    }

    // Allocate daily missions to ensure they are assigned
    await ensureDailyMissionsAssigned(decoded.userId);

    const progressId = require("crypto").randomUUID();
    const isCompleted = !!completed;
    const completedAt = isCompleted ? new Date() : null;

    // Upsert into user_lesson_progress
    await dbQuery(
      `INSERT INTO user_lesson_progress (id, user_id, lesson_id, is_completed, completed_at, last_opened_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id, lesson_id)
       DO UPDATE SET is_completed = EXCLUDED.is_completed, completed_at = EXCLUDED.completed_at, last_opened_at = NOW()`,
      [progressId, decoded.userId, lessonId, isCompleted, completedAt]
    );

    // If marked as completed, auto-complete the corresponding daily mission
    if (isCompleted) {
      await dbQuery(
        `UPDATE user_daily_mission_progress
         SET is_completed = TRUE, completed_at = NOW()
         WHERE user_id = $1
           AND assigned_date = CURRENT_DATE
           AND mission_id IN (SELECT id FROM daily_missions WHERE type = 'complete_lesson')
           AND is_completed = FALSE`,
        [decoded.userId]
      );
      
      await updateUserStreak(decoded.userId);
    }

    return NextResponse.json({
      message: "Progress updated successfully",
      isCompleted,
    });
  } catch (error) {
    console.error("Progress Toggle Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
