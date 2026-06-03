import { projects } from "@/lib/projects";
import { ProjectsClient } from "@/components/ProjectsClient";

export const metadata = {
  title: "Full-Stack Projects - CodeNivra",
  description:
    "Explore full-stack projects, portfolio labs, and production-style builds with clear outcomes, tech stacks, and implementation guidance.",
  openGraph: {
    title: "Full-Stack Projects - CodeNivra",
    description:
      "Explore full-stack projects, portfolio labs, and production-style builds with clear outcomes and implementation guidance.",
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
