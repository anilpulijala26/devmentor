import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery, dbTableExists } from "@/lib/db";

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
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
    const projectSlug = String(body.projectSlug || "").trim();
    const githubUrl = String(body.githubUrl || "").trim();
    const liveUrl = String(body.liveUrl || "").trim();

    if (!projectSlug || !githubUrl || !liveUrl) {
      return NextResponse.json({ error: "Project slug, GitHub URL, and live URL are required." }, { status: 400 });
    }

    if (!isValidUrl(githubUrl) || !isValidUrl(liveUrl)) {
      return NextResponse.json({ error: "Please enter valid URLs for both GitHub and live project links." }, { status: 400 });
    }

    const hasProjectSubmissionsTable = await dbTableExists("user_project_submissions", false);
    if (!hasProjectSubmissionsTable) {
      return NextResponse.json(
        { error: "Project submissions storage is not ready yet. Apply the latest database migration first." },
        { status: 503 },
      );
    }

    const submissionId = crypto.randomUUID();
    const result = await dbQuery(
      `INSERT INTO user_project_submissions (id, user_id, project_slug, github_url, live_url, review_status, submitted_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'submitted_for_review', NOW(), NOW())
       ON CONFLICT (user_id, project_slug)
       DO UPDATE SET github_url = EXCLUDED.github_url,
                     live_url = EXCLUDED.live_url,
                     review_status = 'submitted_for_review',
                     submitted_at = NOW(),
                     updated_at = NOW()
       RETURNING github_url, live_url, review_status, submitted_at`,
      [submissionId, decoded.userId, projectSlug, githubUrl, liveUrl],
    );

    const submission = result.rows[0];
    return NextResponse.json({
      success: true,
      submission: {
        githubUrl: submission.github_url,
        liveUrl: submission.live_url,
        reviewStatus: submission.review_status,
        submittedAt: submission.submitted_at,
      },
    });
  } catch (error) {
    console.error("Project submission error:", error);
    return NextResponse.json({ error: "Could not save your project submission." }, { status: 500 });
  }
}

