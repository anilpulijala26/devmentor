import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  Code2,
  FolderKanban,
  GitBranch,
  GraduationCap,
  Layers3,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import {
  ActionLink,
  HighlightCard,
  SectionIntro,
  StatusBadge,
  TagBadge,
} from "@/components/marketing-primitives";

const pathCards = [
  {
    title: "Beginner",
    description: "Start with HTML, CSS, JavaScript, and Git through guided lessons and small wins.",
    duration: "6-8 weeks",
    outcome: "Build responsive websites and basic projects.",
    href: "/roadmaps/intern-developer",
    cta: "Start Beginner Path",
    status: "Available Now",
    tone: "blue" as const,
  },
  {
    title: "Frontend Developer",
    description: "Move into React, Next.js, UI systems, and portfolio-ready project practice.",
    duration: "8-10 weeks",
    outcome: "Build React and Next.js portfolio projects.",
    href: "/roadmaps/junior-frontend",
    cta: "Start Frontend Path",
    status: "Available Now",
    tone: "violet" as const,
  },
  {
    title: "Full-Stack Developer",
    description: "Learn Node.js, APIs, database design, auth, and production-style app delivery.",
    duration: "10-12 weeks",
    outcome: "Build complete apps with auth, database, and APIs.",
    href: "/roadmaps/mid-level-fullstack",
    cta: "Start Full-Stack Path",
    status: "Available Now",
    tone: "emerald" as const,
  },
  {
    title: "Job-Ready Developer",
    description: "Practice code review, deployment, project explanations, and interview readiness.",
    duration: "4-6 weeks",
    outcome: "Prepare for interviews with projects, code review, and deployment practice.",
    href: "/roadmaps/interview-preparation",
    cta: "Start Job-Ready Path",
    status: "In Progress",
    tone: "amber" as const,
  },
];

const howItWorks = [
  { title: "Choose your level", label: "Pick the right starting path", icon: Target },
  { title: "Follow roadmap", label: "Move through structured lessons", icon: BookOpen },
  { title: "Practice daily", label: "Build consistency with short reps", icon: Code2 },
  { title: "Build real projects", label: "Turn concepts into portfolio work", icon: FolderKanban },
  { title: "Review your code", label: "Check quality before shipping", icon: ShieldCheck },
  { title: "Deploy apps", label: "Practice real production delivery", icon: Rocket },
  { title: "Explain in interviews", label: "Speak clearly about decisions", icon: BriefcaseBusiness },
];

const learningAreas = [
  {
    title: "Frontend Roadmaps",
    description: "HTML, CSS, JavaScript, React, and Next.js with project-first practice.",
    href: "/learn/frontend-frameworks",
    status: "Available Now",
    icon: Layers3,
  },
  {
    title: "Backend Systems",
    description: "Node.js, APIs, validation, auth, databases, and secure service design.",
    href: "/learn/backend",
    status: "Available Now",
    icon: Code2,
  },
  {
    title: "Full-Stack Developer Path",
    description: "Connect UI, server logic, auth, and data into complete production workflows.",
    href: "/learn/fullstack",
    status: "Available Now",
    icon: GitBranch,
  },
  {
    title: "Interview + Production Path",
    description: "Deployment, code review, and interview explanation skills for job-ready delivery.",
    href: "/learn/deployment",
    status: "Available Now",
    icon: Cloud,
  },
];

const featuredLabs = [
  {
    title: "Portfolio Website",
    description: "Build a clean personal site with strong semantics, responsive layout, and performance basics.",
    stack: ["HTML", "CSS", "JavaScript"],
    difficulty: "Beginner",
    duration: "1-2 weeks",
    outcome: "Launch a portfolio-ready personal website.",
    href: "/projects/personal-portfolio",
    badges: ["Beginner", "Portfolio-ready"],
    status: "Available Now",
  },
  {
    title: "Admin Dashboard Interface",
    description: "Create a modern dashboard with data views, UI states, and polished component structure.",
    stack: ["React", "TypeScript", "Tailwind"],
    difficulty: "Intermediate",
    duration: "2-3 weeks",
    outcome: "Ship a polished frontend project for your portfolio.",
    href: "/projects/admin-dashboard",
    badges: ["Intermediate", "Portfolio-ready", "Interview-ready"],
    status: "Available Now",
  },
  {
    title: "E-commerce Product Listing App",
    description: "Build filtering, search, pagination, and shopping flows with product-focused UX.",
    stack: ["Next.js", "APIs", "State"],
    difficulty: "Advanced",
    duration: "3-4 weeks",
    outcome: "Practice production-style app architecture and user flows.",
    href: "/projects/ecommerce-listing",
    badges: ["Advanced", "Production-style", "Interview-ready"],
    status: "Available Now",
  },
];

const audience = [
  "Freshers who want to learn web development from scratch",
  "Frontend developers who want to become full-stack",
  "React developers who want project-based practice",
  "Job seekers preparing for developer interviews",
  "Developers who want to learn deployment and production workflows",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.25),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#ffffff_16%,#f8fafc_100%)] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="animate-fade-in" style={{ animationDelay: "40ms" }}>
              <StatusBadge label="Guided full-stack learning platform" tone="blue" />
            </div>
            <h1
              className="mt-6 max-w-3xl animate-fade-in text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]"
              style={{ animationDelay: "120ms" }}
            >
              Master Full-Stack Development Through Real-World Practice
            </h1>
            <p
              className="mt-5 max-w-2xl animate-fade-in text-base leading-8 text-slate-600 sm:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              Follow structured roadmaps, practice daily coding tasks, build portfolio-ready
              projects, review your code, deploy apps, and prepare for developer interviews.
            </p>

            <div
              className="mt-8 flex animate-fade-in flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "320ms" }}
            >
              <ActionLink href="/roadmaps">Start My Roadmap</ActionLink>
              <ActionLink href="/projects" variant="secondary">
                Build My First Project
              </ActionLink>
              <ActionLink href="/learn/interview" variant="ghost">
                Prepare for Developer Jobs
              </ActionLink>
            </div>

            <div
              className="mt-8 flex animate-fade-in flex-wrap gap-2"
              style={{ animationDelay: "420ms" }}
            >
              {["Roadmaps", "Daily practice", "Project labs", "Code review", "Deployment"].map(
                (item) => (
                  <TagBadge key={item} label={item} />
                ),
              )}
            </div>
          </div>

          <div
            className="relative self-start animate-fade-in lg:pl-6"
            style={{ animationDelay: "220ms" }}
          >
            <div className="relative h-auto overflow-hidden rounded-[30px] border border-white/70 bg-white/70 px-6 py-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-8 sm:py-7">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.10),transparent_36%)]"
              />
              <div className="relative">
                <StatusBadge label="Available Now" tone="emerald" />

                <div className="mt-4 border-b border-slate-200/80 pb-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Your Guided Path
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
                    From beginner steps to job-ready projects
                  </p>
                </div>

                <div className="relative mt-5 pl-2">
                  <div
                    aria-hidden="true"
                    className="animate-line-grow-y absolute left-[1.2rem] top-4 bottom-4 w-px bg-gradient-to-b from-blue-200 via-slate-200 to-violet-200"
                  />
                  <div className="space-y-6">
                    {howItWorks.slice(0, 4).map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="group relative flex items-start gap-4 animate-fade-in"
                          style={{ animationDelay: `${220 + index * 110}ms` }}
                        >
                          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/95 text-indigo-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
                            <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0 pt-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <p className="text-base font-semibold text-slate-950">{item.title}</p>
                            </div>
                            <p className="mt-1 text-sm leading-6 text-slate-500">{item.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-4">
                  <Link
                    href="/roadmaps"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  >
                    <span className="text-slate-500">Next action:</span>
                    Start Track
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Start Here"
            title="Choose Your Path"
            description="Pick the route that matches your current level, expected pace, and learning outcome."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {pathCards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50/70 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-sm">
                    <GraduationCap aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <StatusBadge label={card.status} tone={card.tone} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>

                <dl className="mt-5 space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">{card.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Outcome
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-600">{card.outcome}</dd>
                  </div>
                </dl>

                <div className="mt-auto pt-6">
                  <ActionLink href={card.href}>{card.cta}</ActionLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="How It Works"
            title="A Clear Workflow From Learning to Launch"
            description="CodeNivra helps users move through one practical sequence: choose a path, practice consistently, build projects, review quality, deploy, and explain decisions with confidence."
          />

          <div className="mt-10 lg:hidden">
            <div className="relative pl-2">
              <div
                aria-hidden="true"
                className="animate-line-grow-y absolute left-[1.42rem] top-4 bottom-4 w-px bg-gradient-to-b from-blue-200 via-slate-200 to-violet-200"
              />
              <div className="space-y-6">
                {howItWorks.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.title}
                      className="group relative flex items-start gap-4 animate-fade-in"
                      style={{ animationDelay: `${80 + index * 90}ms` }}
                    >
                      <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-indigo-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 pt-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-slate-950">{step.title}</h3>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative mt-12 hidden lg:block">
            <div
              aria-hidden="true"
              className="animate-line-grow absolute left-[7%] right-[7%] top-6 h-px bg-gradient-to-r from-blue-200 via-slate-200 to-violet-200"
            />
            <div className="relative grid gap-6 xl:grid-cols-7">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="group animate-fade-in text-center"
                    style={{ animationDelay: `${80 + index * 90}ms` }}
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-200 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
                      <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-slate-900">{step.title}</h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="What You Will Learn"
            title="The Core Learning Areas Inside CodeNivra"
            description="Each area has a different purpose, so users always know whether they should learn a concept, practice a task, build a project, or prepare for production."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {learningAreas.map((area) => (
              <HighlightCard
                key={area.title}
                icon={area.icon}
                title={area.title}
                description={area.description}
              >
                <div className="flex items-center justify-between gap-4">
                  <StatusBadge label={area.status} tone="emerald" />
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    Explore
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </HighlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Project Labs"
            title="Featured Project Labs"
            description="Each lab shows what you will build, the stack you will use, the expected difficulty, and the outcome you can speak about in interviews."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredLabs.map((lab) => (
              <article
                key={lab.title}
                className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge label={lab.status} tone="emerald" />
                  <span className="text-xs font-medium text-slate-500">{lab.duration}</span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-950">{lab.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{lab.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {lab.badges.map((badge) => (
                    <TagBadge
                      key={badge}
                      label={badge}
                      tone={
                        badge === "Beginner"
                          ? "blue"
                          : badge === "Intermediate"
                            ? "violet"
                            : badge === "Advanced"
                              ? "emerald"
                              : "slate"
                      }
                    />
                  ))}
                </div>

                <dl className="mt-5 grid gap-4 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Tech stack
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {lab.stack.map((item) => (
                        <TagBadge key={item} label={item} />
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Difficulty
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">{lab.difficulty}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Outcome
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-600">{lab.outcome}</dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-nowrap gap-3 pt-6">
                  <ActionLink href={lab.href}>Start Project</ActionLink>
                  <ActionLink href={lab.href} variant="secondary">
                    View Project
                  </ActionLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <HighlightCard
            icon={ShieldCheck}
            title="Code Review That Builds Real Confidence"
            description="Move beyond tutorials by checking accessibility, naming, structure, state handling, and production readiness before you call a project done."
          >
            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              {[
                "Review frontend, backend, and full-stack submissions with one checklist.",
                "Practice explaining tradeoffs, fixes, and architecture decisions clearly.",
                "Use review criteria that align with real project delivery expectations.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HighlightCard>

          <HighlightCard
            icon={Rocket}
            title="Deployment Skills That Make Projects Job-Ready"
            description="Learn how to take projects from local development to production with environment management, CI/CD, cloud hosting, and release checklists."
          >
            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              {[
                "Deploy frontend and backend projects with a guided production path.",
                "Practice Docker, GitHub Actions, cloud platforms, and secrets handling.",
                "Build the confidence to explain deployment workflows in interviews.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HighlightCard>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Who It Is For"
            title="Built for Learners Moving Toward Real Development Work"
            description="Whether you are starting from scratch or preparing for interviews, the platform is designed to help you build confidence through structured practice."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {audience.map((item) => (
              <article
                key={item}
                className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <Users aria-hidden="true" className="h-5 w-5 text-indigo-700" />
                <p className="mt-4 text-sm leading-6 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
              <StatusBadge label="Built by developers for developers" tone="slate" />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                Trust the process, not just another playlist
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                CodeNivra is designed to help learners move from tutorials to real project
                confidence using structured roadmaps, practical tasks, code review, and deployment
                workflows.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { label: "Founder / mentor profile", status: "Coming Soon", tone: "amber" as const },
                { label: "GitHub link", status: "Coming Soon", tone: "amber" as const },
                { label: "LinkedIn link", status: "Coming Soon", tone: "amber" as const },
                { label: "YouTube / tutorial link", status: "Coming Soon", tone: "amber" as const },
                { label: "Student testimonials", status: "Coming Soon", tone: "amber" as const },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-[22px] border border-slate-200 bg-slate-50/80 px-5 py-4"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <StatusBadge label={item.status} tone={item.tone} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-900 bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Final CTA
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to move from tutorials to real project confidence?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Choose your roadmap, practice daily, build real apps, review your code, and become
            interview-ready.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionLink href="/roadmaps">Start My Roadmap</ActionLink>
            <ActionLink href="/projects" variant="secondary">
              Explore Project Labs
            </ActionLink>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <ActionLink href="/roadmaps">Choose My Path</ActionLink>
          <ActionLink href="/learn" variant="secondary">
            Start Learning
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
