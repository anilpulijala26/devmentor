"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  FileCode,
  FolderTree,
  Info,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";
import { ProjectChecklist } from "./mdx/ProjectChecklist";
import { ProjectAccordion } from "./project-detail/ProjectAccordion";
import { ProjectCTA } from "./project-detail/ProjectCTA";
import { ProjectCodeExplorer } from "./project-detail/ProjectCodeExplorer";
import { ProjectSubmissionPanel, type ProjectSubmission } from "./project-detail/ProjectSubmissionPanel";
import { ProjectHero } from "./project-detail/ProjectHero";
import { ProjectInfoCards } from "./project-detail/ProjectInfoCards";
import type { Project } from "@/lib/projects";

interface ProjectDetailClientProps {
  project: Project;
  submission: ProjectSubmission | null;
  isLoggedIn: boolean;
}

type ProjectTab = "overview" | "build" | "code" | "tests" | "deploy" | "interview";

const tabs: { id: ProjectTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "build", label: "Build" },
  { id: "code", label: "Code" },
  { id: "tests", label: "Tests" },
  { id: "deploy", label: "Deploy" },
  { id: "interview", label: "Interview" },
];

function CompactList({ items, icon = "check" }: { items: string[]; icon?: "check" | "dot" }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 text-sm text-slate-600"
        >
          {icon === "check" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CodeBlock({
  title,
  code,
  copyId,
  onCopy,
  copied,
}: {
  title: string;
  code: string;
  copyId: string;
  onCopy: (id: string, text: string) => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{title}</p>
        <button
          type="button"
          onClick={() => onCopy(copyId, code)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
        {code}
      </pre>
    </div>
  );
}

export function ProjectDetailClient({ project, submission, isLoggedIn }: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    requirements: true,
    buildSteps: true,
    folder: false,
    codeArchitecture: true,
    automatedTests: true,
    commands: true,
    interviewPrep: true,
    qas: true,
  });
  const [openQA, setOpenQA] = useState<Record<number, boolean>>({});

  const details = project.details;

  const copyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedMap((prev) => ({ ...prev, [id]: true }));
    window.setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleQA = (index: number) => {
    setOpenQA((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const overviewStats = useMemo(
    () => [
      { label: "Core Features", value: `${project.features.length}` },
      { label: "Tech Stack", value: `${project.techStack.length}` },
      { label: "Build Phases", value: `${details?.buildSteps.length ?? project.implementationPhases.length}` },
    ],
    [details?.buildSteps.length, project.features.length, project.implementationPhases.length, project.techStack.length],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="sticky top-16 z-40 -mx-4 mb-6 border-b border-slate-200/70 bg-slate-50/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Build Projects
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            Project / {project.slug.replaceAll("-", " ")}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <ProjectHero project={project} />
        <ProjectInfoCards project={project} />

        <div className="sticky top-[7.2rem] z-30 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 shadow-xs backdrop-blur">
          <nav
            aria-label="Project detail sections"
            className="no-scrollbar overflow-x-auto px-2 py-2"
          >
            <div className="flex w-max min-w-full gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {activeTab === "overview" ? (
          <div className="space-y-5">
            <section className="grid gap-4 sm:grid-cols-3">
              {overviewStats.map((item) => (
                <article key={item.label} className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{item.value}</p>
                </article>
              ))}
            </section>

            <ProjectAccordion
              title="Core Features"
              subtitle="What the finished lab should include."
              isOpen={openSections.features ?? true}
              onToggle={() => toggleSection("features")}
            >
              <CompactList items={project.features} />
            </ProjectAccordion>

            <ProjectAccordion
              title="Skills and Stack"
              subtitle="The main tools and engineering areas covered in this lab."
              isOpen={openSections.skills ?? true}
              onToggle={() => toggleSection("skills")}
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Skills Practiced</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ProjectAccordion>

            <ProjectAccordion
              title="Architecture Snapshot"
              subtitle="Components, flow, and future expansion ideas."
              isOpen={openSections.architecture ?? false}
              onToggle={() => toggleSection("architecture")}
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FolderTree className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm font-bold text-slate-900">Component Breakdown</p>
                  </div>
                  <div className="space-y-3">
                    {project.componentBreakdown.map((component) => (
                      <div key={component.name} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                        <p className="font-semibold text-slate-900">{component.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{component.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm font-bold text-slate-900">Future Enhancements</p>
                  </div>
                  <CompactList items={project.futureEnhancements} icon="dot" />
                </div>
              </div>
            </ProjectAccordion>
          </div>
        ) : null}

        {activeTab === "build" && details ? (
          <div className="space-y-5">
            <ProjectAccordion
              title="Requirements"
              subtitle="Business goals, user stories, and edge cases."
              isOpen={openSections.requirements}
              onToggle={() => toggleSection("requirements")}
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <article className="space-y-4 rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm font-bold text-slate-900">Business Objective</p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {details.requirements.businessObjective}
                  </p>
                </article>

                <article className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm font-bold text-slate-900">User Stories</p>
                  </div>
                  <CompactList items={details.requirements.userStories} icon="dot" />
                </article>

                <article className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-sm font-bold text-slate-900">Functional Requirements</p>
                  <CompactList items={details.requirements.functional} icon="dot" />
                </article>

                <article className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-sm font-bold text-slate-900">Non-Functional Requirements</p>
                  <CompactList items={details.requirements.nonFunctional} icon="dot" />
                </article>

                <article className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-sm font-bold text-slate-900">Acceptance Criteria</p>
                  <CompactList items={details.requirements.acceptanceCriteria} />
                </article>

                <article className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50/50 p-5">
                  <p className="text-sm font-bold text-slate-900">Edge Cases</p>
                  <CompactList items={details.requirements.edgeCases} icon="dot" />
                </article>
              </div>
            </ProjectAccordion>

            <ProjectAccordion
              title="Implementation Path"
              subtitle="A cleaner step-by-step plan instead of one long build section."
              isOpen={openSections.buildSteps}
              onToggle={() => toggleSection("buildSteps")}
            >
              <div className="space-y-3">
                {details.buildSteps.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-3xl border border-slate-200/80 bg-white p-4 transition hover:border-indigo-200 hover:bg-indigo-50/20"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                        {step.step}
                      </span>
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="text-base font-bold text-slate-900">{step.title}</p>
                        <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                        {step.code ? (
                          <details className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                            <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                              View supporting code
                            </summary>
                            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
                              {step.code}
                            </pre>
                          </details>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ProjectAccordion>

            <ProjectAccordion
              title="Folder Structure"
              subtitle="Reference blueprint for the lab workspace."
              isOpen={openSections.folder}
              onToggle={() => toggleSection("folder")}
            >
              <CodeBlock
                title="Project Folder Blueprint"
                code={project.folderStructure}
                copyId="folder-structure"
                onCopy={copyText}
                copied={!!copiedMap["folder-structure"]}
              />
            </ProjectAccordion>
          </div>
        ) : null}

        {activeTab === "code" && details ? (
          <div className="space-y-5">
            <ProjectCodeExplorer files={details.codeFiles} />

            <ProjectAccordion
              title="API and Database Reference"
              subtitle="Keep the full technical reference available without making the page feel heavy."
              isOpen={openSections.codeArchitecture}
              onToggle={() => toggleSection("codeArchitecture")}
            >
              <div className="grid gap-6">
                <CodeBlock
                  title="API Contract"
                  code={project.apiContract}
                  copyId="api-contract"
                  onCopy={copyText}
                  copied={!!copiedMap["api-contract"]}
                />
                {project.databaseSchema ? (
                  <CodeBlock
                    title="Database Schema"
                    code={project.databaseSchema}
                    copyId="database-schema"
                    onCopy={copyText}
                    copied={!!copiedMap["database-schema"]}
                  />
                ) : null}
              </div>
            </ProjectAccordion>
          </div>
        ) : null}

        {activeTab === "tests" && details ? (
          <div className="space-y-5">
            <ProjectChecklist
              title="Manual Testing Checklist"
              storageKey={`project-testing-${project.slug}`}
              items={details.tests.manualChecklist}
            />

            <ProjectAccordion
              title="Automated Test References"
              subtitle="Unit and optional API/frontend examples in one compact area."
              isOpen={openSections.automatedTests}
              onToggle={() => toggleSection("automatedTests")}
            >
              <div className="grid gap-6">
                <CodeBlock
                  title={details.tests.unitTestPath}
                  code={details.tests.unitTestCode}
                  copyId="unit-test"
                  onCopy={copyText}
                  copied={!!copiedMap["unit-test"]}
                />
                {details.tests.apiTestCode ? (
                  <CodeBlock
                    title={details.tests.apiTestPath || "API Test"}
                    code={details.tests.apiTestCode}
                    copyId="api-test"
                    onCopy={copyText}
                    copied={!!copiedMap["api-test"]}
                  />
                ) : null}
                {details.tests.frontendTestCode ? (
                  <CodeBlock
                    title={details.tests.frontendTestPath || "Frontend Test"}
                    code={details.tests.frontendTestCode}
                    copyId="frontend-test"
                    onCopy={copyText}
                    copied={!!copiedMap["frontend-test"]}
                  />
                ) : null}
              </div>
            </ProjectAccordion>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-indigo-600" />
                  <p className="text-sm font-bold text-slate-900">Accessibility Checks</p>
                </div>
                <CompactList items={details.tests.accessibilityChecklist} />
              </article>

              <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-indigo-600" />
                  <p className="text-sm font-bold text-slate-900">Performance Checks</p>
                </div>
                <CompactList items={details.tests.performanceChecklist} />
              </article>
            </div>

            <ProjectCTA />
          </div>
        ) : null}

        {activeTab === "deploy" && details ? (
          <div className="space-y-5">
            <ProjectChecklist
              title="Production Deployment Checklist"
              storageKey={`project-deploy-${project.slug}`}
              items={details.deploy.productionChecklist}
            />

            <ProjectAccordion
              title="Run Commands and Environment"
              subtitle="Startup flow, env variables, and build commands."
              isOpen={openSections.commands}
              onToggle={() => toggleSection("commands")}
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <CodeBlock
                  title="Local Run"
                  code={details.deploy.localRun.join("\n")}
                  copyId="local-run"
                  onCopy={copyText}
                  copied={!!copiedMap["local-run"]}
                />
                <CodeBlock
                  title="Environment Variables"
                  code={details.deploy.envVariables.join("\n")}
                  copyId="env-vars"
                  onCopy={copyText}
                  copied={!!copiedMap["env-vars"]}
                />
                <CodeBlock
                  title="Build Commands"
                  code={details.deploy.buildCommands.join("\n")}
                  copyId="build-commands"
                  onCopy={copyText}
                  copied={!!copiedMap["build-commands"]}
                />
              </div>
            </ProjectAccordion>

            {(details.deploy.dockerfile || details.deploy.dockerCompose || details.deploy.githubActions) ? (
              <ProjectAccordion
                title="Deployment Config Files"
                subtitle="Optional infrastructure files used by this lab."
                isOpen={openSections.configs ?? false}
                onToggle={() => toggleSection("configs")}
              >
                <div className="grid gap-6">
                  {details.deploy.dockerfile ? (
                    <CodeBlock
                      title="Dockerfile"
                      code={details.deploy.dockerfile}
                      copyId="dockerfile"
                      onCopy={copyText}
                      copied={!!copiedMap["dockerfile"]}
                    />
                  ) : null}
                  {details.deploy.dockerCompose ? (
                    <CodeBlock
                      title="docker-compose.yml"
                      code={details.deploy.dockerCompose}
                      copyId="docker-compose"
                      onCopy={copyText}
                      copied={!!copiedMap["docker-compose"]}
                    />
                  ) : null}
                  {details.deploy.githubActions ? (
                    <CodeBlock
                      title="GitHub Actions"
                      code={details.deploy.githubActions}
                      copyId="github-actions"
                      onCopy={copyText}
                      copied={!!copiedMap["github-actions"]}
                    />
                  ) : null}
                </div>
              </ProjectAccordion>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-3xl border border-rose-200 bg-rose-50/50 p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4 text-rose-600" />
                  <p className="text-sm font-bold text-slate-900">Common Mistakes</p>
                </div>
                <CompactList items={project.commonMistakes} icon="dot" />
              </article>

              <article className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <p className="text-sm font-bold text-slate-900">Senior Notes</p>
                </div>
                <CompactList items={project.seniorNotes} icon="dot" />
              </article>
            </div>

            <ProjectCTA />
            <ProjectSubmissionPanel
              projectSlug={project.slug}
              initialSubmission={submission}
              isLoggedIn={isLoggedIn}
            />
          </div>
        ) : null}

        {activeTab === "interview" && details ? (
          <div className="space-y-5">
            <ProjectAccordion
              title="Project Pitch and Architecture"
              subtitle="How to explain the lab clearly in interviews."
              isOpen={openSections.interviewPrep}
              onToggle={() => toggleSection("interviewPrep")}
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <article className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">30-Second Pitch</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{details.interview.howToExplain}</p>
                </article>
                <article className="rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Architecture</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{details.interview.architecture}</p>
                </article>
                <article className="rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Key Challenge Solved</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{details.interview.challenges}</p>
                </article>
                <article className="rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Improvements</p>
                  <CompactList items={details.interview.improvements} />
                </article>
              </div>
            </ProjectAccordion>

            <ProjectAccordion
              title="Resume Bullets"
              subtitle="Ready-to-practice talking points for your portfolio or resume."
              isOpen={openSections.resume ?? true}
              onToggle={() => toggleSection("resume")}
            >
              <CompactList items={details.interview.resumeBullets} />
            </ProjectAccordion>

            <ProjectAccordion
              title="Interview Q and A"
              subtitle="Expandable answers so the page stays compact by default."
              isOpen={openSections.qas}
              onToggle={() => toggleSection("qas")}
            >
              <div className="space-y-3">
                {details.interview.qas.map((qa, index) => {
                  const isOpen = openQA[index] === true;
                  return (
                    <div key={qa.question} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60">
                      <button
                        type="button"
                        onClick={() => toggleQA(index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        <span className="text-sm font-semibold text-slate-800">{qa.question}</span>
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                        )}
                      </button>
                      {isOpen ? (
                        <div className="border-t border-slate-200/70 bg-white px-4 py-4 text-sm leading-relaxed text-slate-600">
                          {qa.answer}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </ProjectAccordion>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Next Step</p>
                  <p className="mt-2 text-lg font-bold text-slate-950">Practice your explanation, then review the code quality.</p>
                </div>
                <Link
                  href="/code-review"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Start Review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {!details ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-indigo-600" />
              <p className="font-semibold text-slate-900">Detailed lab content is not available for this project yet.</p>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              The summary above still reflects the project scope, stack, and expected outcomes.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}


