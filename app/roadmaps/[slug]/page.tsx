import Link from "next/link";
import { getRoadmapBySlug, roadmaps } from "@/lib/roadmaps";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getAllDeveloperTasks } from "@/lib/tasks";
import { RoadmapDetailClient } from "@/components/RoadmapDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return roadmaps.map((r) => ({
    slug: r.slug,
  }));
}

export const metadata = {
  title: "Roadmap Timeline - CodeNivra",
  description: "Walk through step-by-step career timelines, concepts lessons, projects, and checklist questions.",
};

const weeklyPlans: Record<string, { week: string; topic: string; details: string }[]> = {
  "intern-developer": [
    { week: "Week 1", topic: "HTML, CSS, Git basics", details: "Learn semantic tagging, box model sizing, CSS selectors, git branching, commits, and remote repositories." },
    { week: "Week 2", topic: "JavaScript fundamentals", details: "Master primitive types, array functions (map, filter, reduce), closures, scopes, and basic DOM event handlers." },
    { week: "Week 3", topic: "React basics", details: "Learn component composition, JSX, properties, local state hooks, conditional rendering, and form bindings." },
    { week: "Week 4", topic: "Portfolio project", details: "Initiate your static repository. Build a beautiful personal portfolio from scratch using raw CSS variables." },
    { week: "Week 5", topic: "Daily tasks and code review", details: "Review daily beginner tasks, fix semantic issues, run WCAG color audits, and check outline hierarchies." },
    { week: "Week 6", topic: "Deployment and interview explanation", details: "Connect your repo to Vercel, setup custom domains, and prepare a 2-minute architectural pitch." }
  ],
  "junior-frontend": [
    { week: "Week 1", topic: "JavaScript refresher & TypeScript basics", details: "Deconstruct JS classes, promises, async/await, and configure typescript configurations." },
    { week: "Week 2", topic: "React component structures & states", details: "Understand clean functional structures, parent-child props passing, and hooks rules." },
    { week: "Week 3", topic: "React hooks & advanced state management", details: "Use useReducer, useContext, useRef, and manage complex dashboard structures." },
    { week: "Week 4", topic: "API fetching, loading & error states", details: "Fetch server data, configure skeleton loaders, and handle bad network conditions." },
    { week: "Week 5", topic: "CSS framework styling & layouts", details: "Build responsive grids, use Tailwind or vanilla styling systems, and check mobile break points." },
    { week: "Week 6", topic: "Deployment & resume prep", details: "Launch application preview pipelines, set environment tokens, and write down resume bullets." }
  ],
  "mid-level-fullstack": [
    { week: "Week 1", topic: "Frontend architecture", details: "Setup Next.js workspace folders, client routers, layout hierarchies, and basic route templates." },
    { week: "Week 2", topic: "Backend APIs", details: "Setup express server routing, REST endpoints, JSON bodies parse, and custom exception middleware." },
    { week: "Week 3", topic: "Database integration", details: "Setup PostgreSQL local and remote pools, write Prisma migrations, and script transactional inserts." },
    { week: "Week 4", topic: "Auth and role-based access", details: "Verify JWT signatures, crypt password storage, set secure cookies, and route permissions." },
    { week: "Week 5", topic: "Full-stack project", details: "Connect frontend client inputs to backend server endpoints. Handle validation errors across boundaries." },
    { week: "Week 6", topic: "Code review and deployment", details: "Configure environment flags, audit files with review tools, and deploy backend to hosting servers." }
  ],
  "backend-developer": [
    { week: "Week 1", topic: "Node.js and Express basics", details: "Deconstruct event loops, modules importing, and build simple route listening nodes." },
    { week: "Week 2", topic: "REST APIs and validation", details: "Define resource naming rules, write query routes, and validate input JSON with Zod schemas." },
    { week: "Week 3", topic: "PostgreSQL and Prisma", details: "Model database schemas, set foreign keys, map relational schemas, and query with Prisma client." },
    { week: "Week 4", topic: "Authentication and authorization", details: "Understand security headers, cookies, token expirations, and secure routes verification." },
    { week: "Week 5", topic: "Testing and file upload", details: "Write unit route checks, configure Multer file handlers, and write cloud upload endpoints." },
    { week: "Week 6", topic: "Deployment and production checklist", details: "Setup database pools, environment parameters, production migrations, and server monitors." }
  ],
  "full-stack-developer": [
    { week: "Week 1", topic: "Frontend architecture", details: "Setup Next.js workspace folders, client routers, layout hierarchies, and basic route templates." },
    { week: "Week 2", topic: "Backend APIs", details: "Setup express server routing, REST endpoints, JSON bodies parse, and custom exception middleware." },
    { week: "Week 3", topic: "Database integration", details: "Setup PostgreSQL local and remote pools, write Prisma migrations, and script transactional inserts." },
    { week: "Week 4", topic: "Auth and role-based access", details: "Verify JWT signatures, crypt password storage, set secure cookies, and route permissions." },
    { week: "Week 5", topic: "Full-stack project", details: "Connect frontend client inputs to backend server endpoints. Handle validation errors across boundaries." },
    { week: "Week 6", topic: "Code review and deployment", details: "Configure environment flags, audit files with review tools, and deploy backend to hosting servers." }
  ],
  "senior-ui-developer": [
    { week: "Week 1", topic: "Advanced TS generics & utility types", details: "Write strict interfaces, mapped generic keys, and validate dynamic parameters." },
    { week: "Week 2", topic: "React Fiber internal mechanics & reconciliation", details: "Deconstruct fiber nodes, rendering phases, triggers, and state commit priorities." },
    { week: "Week 3", topic: "Request memoization & Next.js caching", details: "Optimize client rendering, set server cache validation flags, and memoize parameters." },
    { week: "Week 4", topic: "Performance profiling & optimization", details: "Record render logs, check rerender leakages, configure dynamic imports, and optimize bundles." },
    { week: "Week 5", topic: "Multi-stage Docker packaging & compose", details: "Write cached dockerfiles, configure development compose services, and secure environment secrets." },
    { week: "Week 6", topic: "Security audit checklist & mock pitches", details: "Audit CORS policies, setup rate filters, run checks sheets, and rehearse design pitches." }
  ],
  "devops-ready-full-stack": [
    { week: "Week 1", topic: "Git and environment setup", details: "Define collaboration branching guidelines, structure mono workspaces, and test local env files." },
    { week: "Week 2", topic: "GitHub Actions", details: "Write pipeline yml files. Standardize building, lint audits, and automated static preview deploys." },
    { week: "Week 3", topic: "Docker", details: "Setup cached multi-stage Docker builds for client and backend. Orchestrate container services." },
    { week: "Week 4", topic: "Frontend and backend deployment", details: "Automate server launches, wire domain routing nodes, and check CORS settings." },
    { week: "Week 5", topic: "AWS/Azure basics", details: "Provision virtual containers (EC2/AppService), SQL clouds databases (RDS), and secure access vaults." },
    { week: "Week 6", topic: "Monitoring and production checklist", details: "Wire logging sinks, configure alarms parameters, check rates, and draft system designs pitches." }
  ],
  "interview-preparation": [
    { week: "Week 1", topic: "Core coding interview foundations", details: "Practice arrays, hashes, sliding windows, heaps, and tree traversals." },
    { week: "Week 2", topic: "Browser engines & Event loop behaviors", details: "Master task/microtask scheduling, DOM painting loops, and layout cycles." },
    { week: "Week 3", topic: "System design basics", details: "Understand CDNs, proxy nodes, database replication rules, caching, and rate limiting." },
    { week: "Week 4", topic: "Project review & explanation structures", details: "Outline your main portfolio applications and build 2-minute architectural pitches." },
    { week: "Week 5", topic: "Code review checklist self-assessments", details: "Run manual audits of your codebases to spot scaling bottlenecks." },
    { week: "Week 6", topic: "Mock interviews & technical pitches", details: "Rehearse answers on concurrency, caching validation flags, and ORM query plans." }
  ]
};

export default async function RoadmapDetailPage({ params }: Props) {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    notFound();
  }

  const getBadgeColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Professional: "bg-pink-50 text-pink-700 border-pink-200",
      "Interview Prep": "bg-purple-50 text-purple-700 border-purple-200",
    }[level] || "bg-slate-50 text-slate-700";
  };

  const allTasks = getAllDeveloperTasks();
  const getTasksForRoadmapLevel = (level: string) => {
    if (level === "Beginner") {
      return allTasks.filter(t => t.level === "Beginner");
    } else if (level === "Intermediate") {
      return allTasks.filter(t => t.level === "Intermediate");
    } else if (level === "Advanced") {
      return allTasks.filter(t => t.level === "Advanced");
    } else {
      return allTasks.filter(t => t.level === "Advanced" || t.level === "Intermediate");
    }
  };

  const tasksForThisPath = getTasksForRoadmapLevel(roadmap.level);
  const plan = weeklyPlans[slug];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Navigation back bar */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Roadmaps
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {roadmap.level} PATHWAY
          </span>
        </div>

        {/* Roadmap Info Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(roadmap.level)}`}>
              {roadmap.level}
            </span>
            <span className="text-xs text-slate-500 font-semibold">{roadmap.duration} Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            {roadmap.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-605 leading-relaxed max-w-3xl font-medium">
            {roadmap.description}
          </p>
        </div>

        {/* Client Side Interactive Component */}
        <RoadmapDetailClient
          roadmap={roadmap}
          tasksForThisPath={tasksForThisPath}
          plan={plan}
        />
      </div>
    </div>
  );
}
