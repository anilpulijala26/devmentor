import React from "react";
import { cookies } from "next/headers";
import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery, dbTableExists } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (project) {
      return {
        title: `${project.title} - Project Lab | CodeNivra`,
        description: project.description,
      };
    }
  } catch {}
  return {
    title: "Project Lab Guide - CodeNivra",
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let submission = null;
  let isLoggedIn = false;

  if (token) {
    const decoded = verifyJWT(token);
    if (decoded) {
      isLoggedIn = true;
      try {
        const hasProjectSubmissionsTable = await dbTableExists("user_project_submissions", false);
        if (hasProjectSubmissionsTable) {
          const submissionRes = await dbQuery(
            `SELECT github_url, live_url, review_status, submitted_at
             FROM user_project_submissions
             WHERE user_id = $1 AND project_slug = $2`,
            [decoded.userId, slug],
          );

          if (submissionRes.rows.length > 0) {
            submission = {
              githubUrl: submissionRes.rows[0].github_url,
              liveUrl: submissionRes.rows[0].live_url,
              reviewStatus: submissionRes.rows[0].review_status,
              submittedAt: submissionRes.rows[0].submitted_at,
            };
          }
        }
      } catch (error) {
        console.error("Could not load project submission state:", error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <ProjectDetailClient project={project} submission={submission} isLoggedIn={isLoggedIn} />
    </div>
  );
}

