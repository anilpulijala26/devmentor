import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { updateUserStreak } from "@/lib/streaks";

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
    const { progressId, completed } = body;

    if (!progressId) {
      return NextResponse.json({ error: "Progress ID is required." }, { status: 400 });
    }

    // Query task type to verify that it is checkable (not auto-completed)
    const taskRes = await dbQuery(
      `SELECT p.id, p.user_id, p.is_completed, m.type 
       FROM user_daily_mission_progress p
       JOIN daily_missions m ON p.mission_id = m.id
       WHERE p.id = $1`,
      [progressId]
    );

    if (taskRes.rows.length === 0) {
      return NextResponse.json({ error: "Task progress not found." }, { status: 404 });
    }

    const task = taskRes.rows[0];

    // Security check: ensure this task belongs to the signed-in user
    if (task.user_id !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    // Rule: Auto-completed tasks cannot be toggled manually
    if (task.type === "open_lesson" || task.type === "complete_lesson") {
      return NextResponse.json(
        { error: "Auto-completed tasks cannot be toggled manually." },
        { status: 400 }
      );
    }

    const isCompleted = !!completed;
    const completedAt = isCompleted ? new Date() : null;

    // Update progress state
    await dbQuery(
      `UPDATE user_daily_mission_progress 
       SET is_completed = $1, completed_at = $2 
       WHERE id = $3`,
      [isCompleted, completedAt, progressId]
    );

    // Trigger streak recalculation
    await updateUserStreak(decoded.userId);

    return NextResponse.json({
      message: "Daily task updated successfully",
      isCompleted,
    });
  } catch (error) {
    console.error("Toggle Daily Task Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
