import React from "react";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ChevronLeft, FolderTree, Layers, Server, Cpu, Info, Target, Wrench, ShieldAlert, Sparkles } from "lucide-react";
import { ProjectChecklist } from "@/components/mdx/ProjectChecklist";
import { InterviewExplanation } from "@/components/mdx/InterviewExplanation";

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

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Top Back Navigation */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Project Labs
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            LAB // {project.slug.toUpperCase()}
          </span>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(project.level)}`}>
              {project.level} Lab
            </span>
            <span className="text-xs text-slate-500 font-semibold">{project.duration} Duration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 1. Project Overview & 2. Who Should Build This */}
        <div className="grid sm:grid-cols-2 gap-6 my-8">
          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info className="w-4.5 h-4.5 text-indigo-500" />
              1. Project Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Target className="w-4.5 h-4.5 text-indigo-500" />
              2. Who Should Build This?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.whoShouldBuild}
            </p>
          </section>
        </div>

        {/* 3. Real-Time Business Requirement & 4. Features List */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-5 h-5 text-indigo-500" />
            3. Business Requirement & Features
          </h2>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
              <p className="text-xs font-bold text-indigo-805 uppercase tracking-wider mb-1.5">Business Objective</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {project.businessRequirement}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Core Features List</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-600">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Tech Stack & 6. Folder Structure */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Wrench className="w-5 h-5 text-indigo-500" />
            5. Tech Stack & 6. Folder Structure
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-indigo-50/50 border border-indigo-100 text-indigo-750 px-3 py-1.5 rounded-xl text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
            {project.folderStructure}
          </pre>
        </section>

        {/* 7. Component Breakdown */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <FolderTree className="w-5 h-5 text-indigo-500" />
            7. Component Breakdown
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            {project.componentBreakdown.map((comp, idx) => (
              <div key={idx}>
                <p className="font-bold text-slate-800 mb-1">`{comp.name}` Component</p>
                <p className="leading-relaxed text-slate-600">{comp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. API Contract & 9. Database Schema Idea */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Server className="w-5 h-5 text-indigo-500" />
            8. API Contract {project.databaseSchema && "& 9. Database Schema"}
          </h2>

          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">REST API Interface Contract</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                {project.apiContract}
              </pre>
            </div>

            {project.databaseSchema && (
              <div>
                <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">PostgreSQL Database Schema</h3>
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                  {project.databaseSchema}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* 10. Step-by-Step Implementation Phases */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-indigo-500" />
            10. Step-by-Step Phases
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            {project.implementationPhases.map((phase, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="h-6 w-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{phase.phase}</h4>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13. Common Mistakes (Architectural Pitfalls) */}
        <section className="my-8 p-6 bg-red-50/20 border border-red-200 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-red-950 flex items-center gap-2 pb-3 border-b border-red-100">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            13. Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {project.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="text-red-600 font-bold shrink-0">✕</span>
                <span className="text-slate-700">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 14. Senior Developer Notes */}
        <section className="my-8 p-6 bg-indigo-50/20 border border-indigo-200 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2 pb-3 border-b border-indigo-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            14. Senior Developer Advice
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {project.seniorNotes.map((note, idx) => (
              <p key={idx}>
                💡 {note}
              </p>
            ))}
          </div>
        </section>

        {/* 11. Testing Checklist & 12. Deployment Checklist */}
        <ProjectChecklist
          title="11. Testing Checklist"
          storageKey={`project-testing-${project.slug}`}
          items={project.testingChecklist}
        />

        <ProjectChecklist
          title="12. Deployment Checklist"
          storageKey={`project-deploy-${project.slug}`}
          items={project.deploymentChecklist}
        />

        {/* 15. Interview Explanation */}
        <InterviewExplanation
          projectName={project.interviewExplanation.projectName}
          buildDesc={project.interviewExplanation.buildDesc}
          approachDesc={project.interviewExplanation.approachDesc}
          challengesDesc={project.interviewExplanation.challengesDesc}
          performanceDesc={project.interviewExplanation.performanceDesc}
          errorsDesc={project.interviewExplanation.errorsDesc}
          structureDesc={project.interviewExplanation.structureDesc}
          productionImprovements={project.interviewExplanation.productionImprovements}
        />

        {/* 16. Future Enhancements */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            16. Future Enhancements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {project.futureEnhancements.map((enh, idx) => (
              <li key={idx} className="text-slate-600">{enh}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
