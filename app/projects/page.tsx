import { projects } from "@/lib/projects";
import { ProjectsClient } from "@/components/ProjectsClient";

export const metadata = {
  title: "Build Projects - CodeNivra",
  description:
    "Explore build projects with clear stages, skills used, and implementation guidance.",
  openGraph: {
    title: "Build Projects - CodeNivra",
    description:
      "Explore build projects with clear stages and implementation guidance.",
    type: "website",
  }
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}


