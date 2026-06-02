import React from "react";
import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

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
  } catch { }
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

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <ProjectDetailClient project={project} />
    </div>
  );
}
