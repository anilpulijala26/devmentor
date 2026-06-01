import { projects } from "@/lib/projects";
import { ProjectsClient } from "@/components/ProjectsClient";

export const metadata = {
  title: "Project Labs - DevMentor",
  description: "Tackle real-time full-stack projects featuring system architecture designs, API contracts, folder layouts, and deployment details.",
  openGraph: {
    title: "Project Labs - DevMentor",
    description: "Learn to build production-style applications with structured contracts and DB models.",
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
