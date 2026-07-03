import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";

export async function GET() {
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

    let completedTaskSlugs: string[] = [];
    let taskCompletedDates: Record<string, string> = {};

    try {
      const taskRes = await dbQuery(
        `SELECT task_slug, completed_at
         FROM user_task_progress
         WHERE user_id = $1 AND is_completed = TRUE`,
        [decoded.userId],
      );

      completedTaskSlugs = taskRes.rows.map((row) => row.task_slug);
      taskCompletedDates = Object.fromEntries(
        taskRes.rows
          .filter((row) => row.completed_at)
          .map((row) => [row.task_slug, new Date(row.completed_at).toISOString()]),
      );
    } catch (error) {
      console.error("Task progress summary lookup failed:", error);
    }

    let completedProjectSlugs: string[] = [];

    try {
      const projectRes = await dbQuery(
        `SELECT project_slug
         FROM user_project_submissions
         WHERE user_id = $1 AND review_status <> 'not_submitted_yet'`,
        [decoded.userId],
      );

      completedProjectSlugs = projectRes.rows.map((row) => row.project_slug);
    } catch (error) {
      console.error("Project progress summary lookup failed:", error);
    }

    return NextResponse.json({
      completedTaskSlugs,
      taskCompletedDates,
      completedProjectSlugs,
    });
  } catch (error) {
    console.error("Progress summary error:", error);
    return NextResponse.json({ error: "Could not load progress summary." }, { status: 500 });
  }
}
