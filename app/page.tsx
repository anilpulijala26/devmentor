import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDashed,
  Cloud,
  Code2,
  FolderKanban,
  Layers3,
  ShieldCheck,
  Target
} from "lucide-react";

const workspaceCards = [
  {
    title: "Beginner Workspace",
    description: "Start with the core web stack and a guided build routine.",
    chips: ["HTML/CSS", "JavaScript", "Git"],
    href: "/roadmaps/intern-developer",
    cta: "Open Workspace"
  },
  {
    title: "Developer Workspace",
    description: "Move into full-stack implementation with projects, APIs, and reviews.",
    chips: ["React", "APIs", "Projects"],
    href: "/roadmaps/mid-level-fullstack",
    cta: "Explore Path"
  },
  {
    title: "Job-Ready Workspace",
    description: "Train like a production engineer with deployment and release workflows.",
    chips: ["CI/CD", "Docker", "Cloud"],
    href: "/roadmaps/devops-ready-full-stack",
    cta: "Launch Track"
  }
];

const pipelineSteps = ["Learn", "Practice", "Build", "Test", "Review", "Deploy", "Explain"];

const moduleCards = [
  {
    title: "Roadmaps",
    description: "Follow structured role-based plans.",
    href: "/roadmaps",
    cta: "Browse roadmaps",
    icon: Target
  },
  {
    title: "Daily Tasks",
    description: "Practice focused implementation problems.",
    href: "/tasks",
    cta: "View tasks",
    icon: Code2
  },
  {
    title: "Project Labs",
    description: "Build complete production-style projects.",
    href: "/projects",
    cta: "Open labs",
    icon: FolderKanban
  },
  {
    title: "Code Review",
    description: "Audit accessibility, security, performance, and clean code.",
    href: "/code-review",
    cta: "Run review",
    icon: ShieldCheck
  },
  {
    title: "Deployment",
    description: "Learn CI/CD, Docker, AWS, Azure, and production release steps.",
    href: "/learn/deployment",
    cta: "See deployment track",
    icon: Cloud
  }
];

const featuredTracks = [
  {
    title: "Frontend Engineering",
    description: "Ship responsive interfaces with modern component architecture.",
    chips: ["React", "Next.js", "Tailwind CSS"],
    href: "/learn/frontend-frameworks"
  },
  {
    title: "Backend Engineering",
    description: "Build secure APIs, data models, and service flows.",
    chips: ["Node.js", "PostgreSQL", "Auth"],
    href: "/learn/backend"
  },
  {
    title: "Full-Stack Applications",
    description: "Connect UI, APIs, database, and project delivery into one system.",
    chips: ["State", "Projects", "Integration"],
    href: "/learn/fullstack"
  },
  {
    title: "CI/CD & Cloud Deployment",
    description: "Release production apps with automation and cloud tooling.",
    chips: ["Docker", "GitHub Actions", "AWS"],
    href: "/learn/deployment"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <section className="relative border-b border-slate-200 bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-indigo-600" />
              <span>Production-ready engineering workspace</span>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
              Master Full-Stack Development Through Real-World Practice
            </h1>

            <p className="mt-4 max-w-[620px] text-base leading-7 text-slate-600 sm:text-lg">
              CodeNivra helps developers learn, practice, build, review, deploy, and explain production-ready projects through one structured workspace.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learn"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                <span>Start Learning</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/roadmaps"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                Explore Roadmaps
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Frontend • Backend • Projects • Code Review • Deployment
            </p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_30%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"
              />

              <div className="relative p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3.5">
                  <p className="text-base font-semibold text-slate-950">CodeNivra Workspace</p>
                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Active Preview
                  </div>
                </div>

                <div className="mt-4 rounded-[18px] border border-slate-200 bg-white/90 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-700">
                        Today&apos;s Focus
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                        Build production-ready project
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-500">Progress</p>
                      <p className="mt-1 text-lg font-semibold text-indigo-700">42%</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-indigo-600 to-violet-500" />
                  </div>
                </div>

                <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/80 p-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Workflow
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
                    {["Roadmap", "Task", "Project", "Review", "Deploy"].map((step, index) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                          {step}
                        </span>
                        {index < 4 ? <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" /> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Roadmap", icon: Layers3 },
                    { title: "Practice", icon: Code2 },
                    { title: "Project", icon: FolderKanban },
                    { title: "Review", icon: ShieldCheck }
                  ].map((tile) => {
                    const Icon = tile.icon;

                    return (
                      <div
                        key={tile.title}
                        className="rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-[0_6px_16px_rgba(15,23,42,0.03)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                            <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{tile.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/roadmaps"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  <span>Open Guided Path</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Choose Your Workspace
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Pick the workspace that matches your current stage and start from a clear operating path.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {workspaceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] motion-reduce:transition-none"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-indigo-700">
                      <BriefcaseBusiness aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{card.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={card.href}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Learning Pipeline
            </h2>
            <p className="mt-3 text-base text-slate-600">
              A compact workflow built for repeatable production learning.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {pipelineSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-5 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  {index < 4 ? (
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-indigo-600" />
                  ) : (
                    <CircleDashed aria-hidden="true" className="h-4 w-4" />
                  )}
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Workspace Modules
            </h2>
            <p className="mt-3 text-base text-slate-600">
              The core operating modules inside the learning workspace.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {moduleCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] motion-reduce:transition-none"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-indigo-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Featured Tracks
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Four focused routes for the highest-leverage engineering outcomes.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {featuredTracks.map((track) => (
              <article
                key={track.title}
                className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-slate-300 hover:bg-white hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] motion-reduce:transition-none"
              >
                <h3 className="text-lg font-semibold text-slate-950">{track.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{track.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {track.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <Link
                  href={track.href}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  <span>View track</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
            Workspace access
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to build like a production developer?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Start with a roadmap, practice daily tasks, build complete projects, review your code, and deploy confidently.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/learn"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
            >
              <span>Start Learning</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-indigo-700" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
            >
              View Project Labs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
