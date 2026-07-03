import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery, dbTableExists } from "@/lib/db";
import { ensureDailyMissionsAssigned, updateUserStreak } from "@/lib/streaks";

async function readTaskProgress(userId: string) {
  const hasTaskProgressTable = await dbTableExists("user_task_progress");
  if (!hasTaskProgressTable) {
    return {
      completedTaskSlugs: [],
      taskCompletedDates: {},
    };
  }

  const res = await dbQuery(
    `SELECT task_slug, completed_at
     FROM user_task_progress
     WHERE user_id = $1 AND is_completed = TRUE`,
    [userId],
  );

  return {
    completedTaskSlugs: res.rows.map((row) => row.task_slug),
    taskCompletedDates: Object.fromEntries(
      res.rows
        .filter((row) => row.completed_at)
        .map((row) => [row.task_slug, new Date(row.completed_at).toISOString()]),
    ),
  };
}

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
    const taskSlug = String(body.taskSlug || "").trim();
    const isCompleted = !!body.completed;

    if (!taskSlug) {
      return NextResponse.json({ error: "Task slug is required." }, { status: 400 });
    }

    const hasTaskProgressTable = await dbTableExists("user_task_progress");
    if (!hasTaskProgressTable) {
      return NextResponse.json({ error: "Task progress storage is not ready yet. Apply the latest database migration first." }, { status: 503 });
    }

    await ensureDailyMissionsAssigned(decoded.userId);

    const progressId = crypto.randomUUID();
    const completedAt = isCompleted ? new Date() : null;

    await dbQuery(
      `INSERT INTO user_task_progress (id, user_id, task_slug, is_completed, completed_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id, task_slug)
       DO UPDATE SET is_completed = EXCLUDED.is_completed,
                     completed_at = EXCLUDED.completed_at,
                     updated_at = NOW()`,
      [progressId, decoded.userId, taskSlug, isCompleted, completedAt],
    );

    if (isCompleted) {
      await dbQuery(
        `UPDATE user_daily_mission_progress
         SET is_completed = TRUE, completed_at = NOW()
         WHERE user_id = $1
           AND assigned_date = CURRENT_DATE
           AND mission_id IN (SELECT id FROM daily_missions WHERE type = 'complete_task')
           AND is_completed = FALSE`,
        [decoded.userId],
      );

      await updateUserStreak(decoded.userId);
    }

    const payload = await readTaskProgress(decoded.userId);
    return NextResponse.json({ success: true, ...payload });
  } catch (error) {
    console.error("Task progress toggle error:", error);
    return NextResponse.json({ error: "Could not save task progress." }, { status: 500 });
  }
}
