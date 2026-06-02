import Link from "next/link";
import { getTrackBySlug, getAllTracks } from "@/lib/content";
import { ChevronLeft, Compass, Sparkles, ArrowRight, Terminal, Award } from "lucide-react";
import { notFound } from "next/navigation";
import { learningMap } from "@/lib/learning-map";
import { getDeveloperTaskBySlug } from "@/lib/tasks";
import { getProjectBySlug } from "@/lib/projects";
import { GuidePanel } from "@/components/GuidePanel";

interface Props {
  params: Promise<{ track: string }>;
}

export function generateStaticParams() {
  const tracks = getAllTracks();
  return tracks.map((track) => ({
    track: track.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const { track: trackSlug } = await params;
    const track = getTrackBySlug(trackSlug);
    if (track) {
      return {
        title: `${track.title} Path - CodeNivra`,
        description: track.description,
      };
    }
  } catch { }
  return {
    title: "Track Roadmap - CodeNivra",
  };
}

export default async function TrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);

  if (!track) {
    notFound();
  }

  // Retrieve matching learning map topics for this track
  const trackTopicMappings = learningMap.filter((topic) =>
    topic.relatedLessons.some((l) => l.track === trackSlug)
  );

  // Load recommended task objects dynamically from lib/tasks
  const recommendedTasks = trackTopicMappings.flatMap((topic) =>
    topic.relatedTasks.map((tSlug) => getDeveloperTaskBySlug(tSlug))
  ).filter((t): t is NonNullable<typeof t> => t !== undefined);

  // Load recommended project objects dynamically from lib/projects
  const recommendedProjects = Array.from(
    new Set(trackTopicMappings.flatMap((topic) => topic.relatedProjects))
  ).map((pSlug) => getProjectBySlug(pSlug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  // Dynamic theme configurations
  const themeMap: Record<
    string,
    {
      badge: string;
      colorClass: string;
      bgClass: string;
      textClass: string;
      borderClass: string;
      hours: string;
      level: string;
      whoIsFor: string;
      prerequisites: string[];
      skillsGained: string[];
      interviewReadiness: string[];
      completionOutcomes: string[];
      nextStep: { label: string; url: string };
    }
  > = {
    foundations: {
      badge: "Core Engineering",
      colorClass: "from-blue-600 to-indigo-600",
      bgClass: "bg-indigo-50",
      textClass: "text-indigo-700",
      borderClass: "border-indigo-100",
      hours: "12 Hours",
      level: "Intermediate",
      whoIsFor: "Beginner developers, engineering interns, and self-taught coders looking to build a high-performance web development foundation.",
      prerequisites: ["Basic computer literacy", "Understanding how to open a web browser", "No prior coding experience required"],
      skillsGained: [
        "Write accessible HTML5 landmarks that comply with WCAG AA compliance.",
        "Design responsive web layouts using modern CSS Grid and Flexbox variables.",
        "Code dynamic client interactions, closures, and promises in ES6+ JavaScript.",
        "Setup clean static website hosting environments on Netlify or Vercel."
      ],
      interviewReadiness: [
        "How to explain the Critical Rendering Path (CRP) and paint cycles.",
        "How to explain the event loop priorities (microtasks vs macrotasks).",
        "How to explain semantic HTML landmarks and visual outline hidden options."
      ],
      completionOutcomes: [
        "I can write a valid HTML document using semantic tags without generic divs.",
        "I can build responsive grid card layouts without hardcoding static pixels.",
        "I understand lexical scopes, closures, and async-await code structures.",
        "I can host and deploy website repositories securely."
      ],
      nextStep: { label: "Proceed to Frontend Frameworks (React & Next.js)", url: "/learn/frontend-frameworks" }
    },
    "frontend-frameworks": {
      badge: "Advanced Web Apps",
      colorClass: "from-indigo-600 to-violet-600",
      bgClass: "bg-violet-50",
      textClass: "text-violet-700",
      borderClass: "border-violet-100",
      hours: "18 Hours",
      level: "Advanced",
      whoIsFor: "Frontend developers looking to transition to component-based state architectures, dynamic routing, and server-side rendering with Next.js.",
      prerequisites: ["Strong understanding of ES6 JavaScript", "Familiarity with HTML forms and variables", "Understanding of asynchronous fetch requests"],
      skillsGained: [
        "Manage React state using useState, useReducer, and Context APIs.",
        "Implement Next.js App Router folders, nested layouts, and server actions.",
        "Optimize React render loops using memo, useMemo, and useCallback hooks.",
        "Handle Next.js dynamic routing, route parameters, and caching pipelines."
      ],
      interviewReadiness: [
        "How to explain the React Fiber reconciliation updates.",
        "How to explain React Server Components (RSC) vs Client Components.",
        "How to explain Next.js caching tiers and revalidation triggers."
      ],
      completionOutcomes: [
        "I can create reusable and type-safe React components.",
        "I can utilize React hooks correctly without rendering loop leaks.",
        "I understand the routing directories of the App Router.",
        "I can serialize layouts filter criteria into URL query params."
      ],
      nextStep: { label: "Proceed to Full-Stack Applications (API & Databases)", url: "/learn/fullstack" }
    },
    fullstack: {
      badge: "Production Systems",
      colorClass: "from-violet-600 to-fuchsia-600",
      bgClass: "bg-fuchsia-50",
      textClass: "text-fuchsia-700",
      borderClass: "border-fuchsia-100",
      hours: "24 Hours",
      level: "Professional",
      whoIsFor: "Advanced developers seeking to expand into server-side architectures, write SQL database tables, and configure container deployments.",
      prerequisites: ["Understanding of JavaScript arrays and objects", "Familiarity with server APIs and dynamic routing concepts", "Experience with command-line terminals"],
      skillsGained: [
        "Develop Express server APIs with custom routing controllers.",
        "Define Zod validation middleware schemas to filter payloads.",
        "Model PostgreSQL databases with relations using Prisma or Drizzle ORMs.",
        "Setup containerized developer workflows using multi-stage Docker builds."
      ],
      interviewReadiness: [
        "How to design secure authentication flows using JWT and HttpOnly cookies.",
        "How to analyze database query execution speeds using EXPLAIN commands.",
        "How to configure container layers in multi-stage Dockerfiles."
      ],
      completionOutcomes: [
        "I can write Express routing controllers with error catching boundaries.",
        "I can write relational PostgreSQL tables and database indexing rules.",
        "I understand CORS headers and secure JWT rotation operations.",
        "I can write a multi-stage Docker configuration."
      ],
      nextStep: { label: "Review All Daily Developer Tasks", url: "/tasks" }
    },
    backend: {
      badge: "Backend Engineering",
      colorClass: "from-emerald-600 to-teal-600",
      bgClass: "bg-emerald-50",
      textClass: "text-emerald-700",
      borderClass: "border-emerald-100",
      hours: "30 Hours",
      level: "Advanced",
      whoIsFor: "Frontend or full-stack developers seeking deep mastery of server-side logic, database query design, REST API specifications, secure authentication mechanisms, and unit-integration testing pipelines.",
      prerequisites: ["Comfortable with asynchronous JavaScript or TypeScript syntax", "Understanding of HTTP request/response concepts", "Basic terminal and database concepts"],
      skillsGained: [
        "Design robust REST APIs with modular router controller structures in Express.js.",
        "Secure endpoints using JWT access/refresh token rotation patterns and HttpOnly cookies.",
        "Implement relational database tables, indexing, and transactional operations using Prisma and PostgreSQL.",
        "Construct comprehensive unit and integration tests with Jest, Supertest, and ORM mock engines."
      ],
      interviewReadiness: [
        "How to configure CORS permissions and secure HTTP headers via Helmet.",
        "How to handle race conditions and index query plans with EXPLAIN ANALYZE.",
        "How to structure custom error handling middlewares with async handler patterns."
      ],
      completionOutcomes: [
        "I can build and scale an Express server featuring custom error class captures.",
        "I can design normalized relational database tables and transaction blocks.",
        "I can write integration tests covering database mock and token authentication behaviors.",
        "I understand rate limiting, environment variable encryption, and payload sanitization."
      ],
      nextStep: { label: "Proceed to Full-Stack Applications Track", url: "/learn/fullstack" }
    },
    deployment: {
      badge: "Cloud & Deployment",
      colorClass: "from-indigo-600 to-cyan-600",
      bgClass: "bg-indigo-50",
      textClass: "text-indigo-700",
      borderClass: "border-indigo-100",
      hours: "20 Hours",
      level: "Professional",
      whoIsFor: "Advanced developers and DevOps enthusiasts seeking to automate pipelines, package applications using container networks, manage environment configs, and deploy scale platforms onto AWS and Azure infrastructure.",
      prerequisites: ["Familiarity with full-stack application code architectures", "Working knowledge of git commands and GitHub interface", "Basic comfort with the command line"],
      skillsGained: [
        "Establish GitHub Actions automated test, lint, and build staging-to-production workflows.",
        "Write slim, secure multi-stage Dockerfiles for node/web applications.",
        "Deploy scale services to PaaS (Render, Railway) and cloud servers (AWS EC2, Azure App Service).",
        "Configure cloud storage resources (AWS S3, Azure Blob Storage) with secure signed URL access."
      ],
      interviewReadiness: [
        "How to configure build-time variables versus runtime environment variables.",
        "How to manage zero-downtime deployment pipelines and rolling updates.",
        "How to structure secure network access policies inside IAM roles."
      ],
      completionOutcomes: [
        "I can dockerize any node/web application using secure multi-stage builds.",
        "I can write standard CI/CD workflow YAML specifications for GitHub Actions.",
        "I understand AWS IAM permissions, Route 53 domain mappings, and CDN caching.",
        "I can setup persistent database configurations with automated database migration runs."
      ],
      nextStep: { label: "Proceed to Interview Preparation Track", url: "/learn/interview" }
    },
    interview: {
      badge: "Interview Preparation",
      colorClass: "from-amber-600 to-orange-600",
      bgClass: "bg-amber-50",
      textClass: "text-amber-700",
      borderClass: "border-amber-100",
      hours: "10 Hours",
      level: "Prep",
      whoIsFor: "Developers seeking to review key system designs, practice visual architectural responses, and master code reviews to excel in technical assessments for tech organizations.",
      prerequisites: ["Completion of Frontend, Backend, or Full-Stack curriculum tracks", "Familiarity with standard software engineering practices"],
      skillsGained: [
        "Deconstruct complex structural questions into structured, phased architectural answers.",
        "Perform code reviews quickly on live repositories using dynamic console checklists.",
        "Explain rendering, event loop priorities, and caching strategies eloquently to senior interviewers."
      ],
      interviewReadiness: [
        "How to explain the React Fiber architecture and render loop updates.",
        "How to describe the event loop priorities (microtasks vs macrotasks).",
        "How to pitch full-stack database architectures and API contracts under pressure."
      ],
      completionOutcomes: [
        "I feel confident explaining React reconciliation, server components, and routing patterns.",
        "I can audit complex codebase security and accessibility gaps systematically.",
        "I can clearly map out API interfaces and relational schemas for mock interview boards.",
        "I am ready to successfully clear technical developer interview loops."
      ],
      nextStep: { label: "Review All Career Pathways", url: "/roadmaps" }
    }
  };

  const trackGuides: Record<string, { what: string; who: string; first: string; next: string; outcome: string; nextAction: string }> = {
    foundations: {
      what: "Establish a bulletproof engineering foundation. Master the mechanics of the browser and scripting.",
      who: "Beginner developers, engineering interns, and self-taught coders.",
      first: "Start the HTML fundamentals module and practice creating semantic outlines.",
      next: "Progress to CSS layouts and ES6 Javascript programming modules.",
      outcome: "Deep knowledge of critical rendering pathways and dynamic browser control.",
      nextAction: "Complete matching foundations tasks after modules."
    },
    "frontend-frameworks": {
      what: "Master component reconciliation lifecycles, states, and client route structures.",
      who: "Developers looking to build rich client-side Single Page Applications.",
      first: "Start with React lifecycle states and hook composition guides.",
      next: "Integrate TypeScript schemas and master Next.js App Router structures.",
      outcome: "Fast, type-safe frontend systems that fetch data cleanly.",
      nextAction: "Complete React components tasks after modules."
    },
    backend: {
      what: "Architect secure backend server configurations, database operations, and testing runs.",
      who: "Developers looking to construct server APIs and business endpoints.",
      first: "Deconstruct Node runtime event loops and routing mechanics.",
      next: "Configure PostgreSQL relationships using Prisma ORM selects.",
      outcome: "REST endpoints with validation filters and unit checks.",
      nextAction: "Configure database schemas and test Express servers."
    },
    fullstack: {
      what: "Merge frontend interfaces with backend services, auth cookies, and permissions.",
      who: "Engineers looking to build and deploy end-to-end product layers.",
      first: "Review client data fetch protocols and loading skeletons layouts.",
      next: "Secure session tokens inside secure cookie pipelines.",
      outcome: "Fully synced client-server workspaces organized inside monorepos.",
      nextAction: "Connect React inputs to Express DB endpoints."
    },
    deployment: {
      what: "Mastering git flows, Docker containers, and cloud environments.",
      who: "Developers looking to automate releases and launch servers.",
      first: "Deploy your reviewed project code to staging/production.",
      next: "Setup monitoring logs and prepare your interview explanation.",
      outcome: "Live public applications and container deployment skills.",
      nextAction: "Deploy your reviewed project and prepare interview explanation."
    },
    interview: {
      what: "Review mock system designs, visual graphs, and code review checklists under pressure.",
      who: "Candidates aiming to clear technical developer loops.",
      first: "Rehearse structured architectural responses and template pitches.",
      next: "Perform mock peer checks on existing repositories using checkpoints.",
      outcome: "Confidence to communicate trade-offs, cache flags, and query indices.",
      nextAction: "Prepare project explanation pitch templates."
    }
  };

  const guide = trackGuides[trackSlug] || {
    what: "Master targeted technical skills and architectural guidelines.",
    who: "Developers upgrading their technical competence.",
    first: "Read the first lesson module in the active track.",
    next: "Audit your outputs and practice matching tasks.",
    outcome: "Industrial-grade coding habits and portfolio blueprints.",
    nextAction: "Complete matching task daily challenge."
  };

  const theme = themeMap[trackSlug] || {
    badge: "Specialized Track",
    colorClass: "from-indigo-600 to-violet-600",
    bgClass: "bg-indigo-50",
    textClass: "text-indigo-700",
    borderClass: "border-indigo-100",
    hours: "15 Hours",
    level: "Intermediate",
    whoIsFor: "Developers seeking career upgrades.",
    prerequisites: ["Basic coding literacy"],
    skillsGained: ["Gain target competencies"],
    interviewReadiness: ["Answer project questions"],
    completionOutcomes: ["Master core topics"],
    nextStep: { label: "Review roadmaps", url: "/roadmaps" }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">

        {/* Navigation header bar */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-100 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
            Back to Learning Tracks
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {theme.badge}
          </span>
        </div>

        {/* Track Title Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${theme.colorClass} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
              {theme.badge}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              {theme.level} Path
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            {track.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {track.description}
          </p>
        </div>

        {/* Guide Panel */}
        <GuidePanel
          title={`${track.title} Navigator`}
          what={guide.what}
          who={guide.who}
          first={guide.first}
          next={guide.next}
          outcome={guide.outcome}
          nextAction={guide.nextAction}
        />

        {/* 1. Track Overview & 2. Who is this for */}
        <div className="grid sm:grid-cols-2 gap-6 my-8">
          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Compass className="w-4.5 h-4.5 text-indigo-500" />
              Track Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This track features {track.modules.length} modules outlining core production requirements. Follow the lessons to understand the conceptual architectures and complete the recommended tasks.
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Compass className="w-4.5 h-4.5 text-indigo-500" />
              Who This Is For
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {theme.whoIsFor}
            </p>
          </section>
        </div>

        {/* 3. Prerequisites & 4. Skills Learner Will Gain */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 mb-3 uppercase tracking-wider">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs text-slate-600 font-semibold">
              {theme.prerequisites.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-sm font-extrabold text-slate-900 mb-3 uppercase tracking-wider">Target Competencies You Will Gain</h2>
            <ul className="space-y-3">
              {theme.skillsGained.map((skill, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <span className="h-5 w-5 bg-indigo-50 border border-indigo-200 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-indigo-600 font-bold text-2xs">
                    {idx + 1}
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Lesson Modules Roadmap Timeline */}
        <h2 className="text-lg font-extrabold text-slate-900 mt-12 mb-6">Lesson Modules Timeline</h2>
        <div className="space-y-12 relative pl-8 mb-12">
          {/* Timeline Connector Line */}
          <div className="absolute left-[15px] top-2 bottom-6 w-[2px] bg-slate-200 dark:bg-slate-800" />

          {track.modules.map((module, idx) => (
            <div key={module.slug} className="relative group/module">
              {/* Connector Dot */}
              <div className="absolute -left-[25px] top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-300 border-4 border-slate-50 dark:border-slate-900 group-hover/module:bg-indigo-600 group-hover/module:border-indigo-100 transition-all duration-300 z-10" />

              <div className="mb-4">
                <span className="text-[10px] font-extrabold text-indigo-600 tracking-widest uppercase">
                  PHASE {idx + 1}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  {module.title}
                </h2>
              </div>

              {/* Module lessons block */}
              <div className="space-y-3 mt-4">
                {module.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, lessonIdx) => (
                    <div key={lesson.slug} className="relative pl-6 group/lesson">
                      <div className="absolute left-[-21px] top-5.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300 group-hover/lesson:bg-indigo-500 group-hover/lesson:border-indigo-200 transition z-10" />

                      <Link
                        href={`/learn/${track.slug}/${lesson.slug}`}
                        className="block p-4 border border-slate-200 rounded-xl bg-white hover:border-indigo-200 hover:shadow-xs transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600 group-hover/lesson:bg-indigo-600 group-hover/lesson:text-white transition">
                              {idx + 1}.{lessonIdx + 1}
                            </span>
                            <h3 className="font-bold text-slate-800 text-sm group-hover/lesson:text-indigo-600 transition">
                              {lesson.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 transition group-hover/lesson:translate-x-1">
                            Start Guide <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Daily Tasks Section */}
        {recommendedTasks.length > 0 && (
          <section className="my-10 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Terminal className="w-5 h-5 text-indigo-500" />
              Recommended Practice Tasks
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedTasks.slice(0, 4).map((task) => (
                <Link
                  key={task.slug}
                  href={`/tasks/${task.slug}`}
                  className="p-4 border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xs transition"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{task.level} Task</span>
                  <h3 className="text-xs font-black text-slate-800 mt-1">{task.title}</h3>
                  <p className="text-2xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-semibold">{task.requirement}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Project Labs Section */}
        {recommendedProjects.length > 0 && (
          <section className="my-10 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Compass className="w-5 h-5 text-indigo-500" />
              Recommended Project Labs
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="p-4 border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xs transition"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{project.level} Lab</span>
                  <h3 className="text-xs font-black text-slate-800 mt-1">{project.title}</h3>
                  <p className="text-2xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-semibold">{project.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Code Review Checklist CTA */}
        <section className="my-8 p-6 bg-indigo-600 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-extrabold">Ready to Audit Your Code?</h3>
            <p className="text-xs text-indigo-200 leading-relaxed font-medium">
              Validate your task solutions and project outputs against senior coding standards.
            </p>
          </div>
          <Link
            href="/code-review"
            className="bg-white text-indigo-700 px-6 py-2.5 rounded-2xl text-xs font-bold shadow-xs hover:bg-slate-50 transition whitespace-nowrap"
          >
            Open Code Review Console
          </Link>
        </section>

        {/* Interview Readiness Section */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Award className="w-5 h-5 text-indigo-500" />
            Interview Readiness Topics
          </h2>
          <ul className="space-y-3">
            {theme.interviewReadiness.map((topic, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="h-5 w-5 bg-purple-50 border border-purple-200 rounded-lg flex items-center justify-center shrink-0 text-purple-700">
                  ✔
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Completion Outcome Checklist */}
        <section className="my-8 p-6 bg-slate-900 border border-slate-950 rounded-3xl text-slate-100 space-y-4">
          <h2 className="text-base font-extrabold flex items-center gap-2 border-b border-slate-800 pb-2">
            <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
            Milestone Completion Outcomes
          </h2>
          <div className="space-y-3">
            {theme.completionOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-300 leading-relaxed">
                <span className="h-4.5 w-4.5 bg-indigo-950 border border-indigo-500/20 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                  ✓
                </span>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Next Step Recommendation */}
        <section className="my-8 p-6 border border-dashed border-indigo-200 bg-indigo-50/20 rounded-3xl text-center space-y-3">
          <h3 className="text-sm font-bold text-slate-800">Your Next Learning Step</h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto font-medium">
            Once you have completed the module lessons and practice tasks in this path, click below to proceed.
          </p>
          <Link
            href={theme.nextStep.url}
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition"
          >
            {theme.nextStep.label} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
