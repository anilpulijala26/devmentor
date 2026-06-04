import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllTracks, getTrackBySlug } from "@/lib/content";
import { learningMap } from "@/lib/learning-map";
import { getDeveloperTaskBySlug } from "@/lib/tasks";
import { getProjectBySlug } from "@/lib/projects";
import { TrackHero } from "@/components/track-detail/TrackHero";
import { TrackInfoCards } from "@/components/track-detail/TrackInfoCards";
import { TrackTabs } from "@/components/track-detail/TrackTabs";

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
      const metadataMap: Record<string, { title: string; description: string }> = {
        "frontend-frameworks": {
          title: "Frontend Roadmap - CodeNivra",
          description:
            "Follow a frontend roadmap covering React, Next.js, UI architecture, and project-based practice.",
        },
        backend: {
          title: "Backend Roadmap - CodeNivra",
          description:
            "Learn Node.js, APIs, authentication, validation, and database design through a structured backend roadmap.",
        },
        fullstack: {
          title: "Full-Stack Projects - CodeNivra",
          description:
            "Build connected frontend and backend applications with guided full-stack lessons and production workflows.",
        },
        deployment: {
          title: "Deployment Learning Path - CodeNivra",
          description:
            "Learn CI/CD, Docker, cloud deployment, secrets management, and production release workflows.",
        },
      };

      return {
        title: metadataMap[trackSlug]?.title ?? `${track.title} Path - CodeNivra`,
        description: metadataMap[trackSlug]?.description ?? track.description,
      };
    }
  } catch {}

  return {
    title: "Track Roadmap - CodeNivra",
  };
}

type ThemeConfig = {
  badge: string;
  level: string;
  whoIsFor: string;
  prerequisites: string[];
  interviewReadiness: string[];
  completionOutcomes: string[];
  nextStep: { label: string; url: string };
};

const themeMap: Record<string, ThemeConfig> = {
  foundations: {
    badge: "Core Engineering",
    level: "Beginner Path",
    whoIsFor:
      "Beginners, interns, and self-taught learners building strong frontend fundamentals.",
    prerequisites: [
      "Basic computer literacy",
      "Comfort using a browser and editor",
      "No prior coding experience required",
    ],
    interviewReadiness: [
      "Explain semantic HTML and accessibility basics",
      "Describe the critical rendering path",
      "Talk through event loop fundamentals and page performance",
    ],
    completionOutcomes: [
      "Build semantic, responsive web pages with confidence",
      "Use HTML, CSS, and JavaScript fundamentals in real tasks",
      "Understand core accessibility and performance habits",
      "Ship a clean beginner-friendly portfolio project",
    ],
    nextStep: {
      label: "Proceed to Frontend Frameworks",
      url: "/learn/frontend-frameworks",
    },
  },
  "frontend-frameworks": {
    badge: "Advanced Web Apps",
    level: "Advanced Path",
    whoIsFor:
      "Frontend developers moving into React, Next.js, and scalable UI engineering.",
    prerequisites: [
      "Strong ES6 JavaScript fundamentals",
      "Comfort with HTML forms and layouts",
      "Basic understanding of async data fetching",
    ],
    interviewReadiness: [
      "Explain React reconciliation and render cycles",
      "Differentiate client and server components",
      "Talk through Next.js routing and caching decisions",
    ],
    completionOutcomes: [
      "Build reusable React and Next.js interfaces",
      "Manage state, forms, routing, and async UI cleanly",
      "Understand scalable component architecture",
      "Ship polished frontend portfolio projects",
    ],
    nextStep: {
      label: "Proceed to Full-Stack Applications",
      url: "/learn/fullstack",
    },
  },
  fullstack: {
    badge: "Production Systems",
    level: "Advanced Path",
    whoIsFor:
      "Developers building complete applications across UI, APIs, auth, and databases.",
    prerequisites: [
      "Comfort with React or Next.js basics",
      "Understanding of HTTP requests and APIs",
      "Familiarity with JavaScript project structure",
    ],
    interviewReadiness: [
      "Explain auth flows and HttpOnly cookie sessions",
      "Describe API service layers and validation strategy",
      "Walk through full-stack architecture decisions clearly",
    ],
    completionOutcomes: [
      "Connect frontend, backend, and database layers confidently",
      "Handle auth, validation, and production-ready app structure",
      "Build projects you can demo and explain in interviews",
      "Move from feature work into complete application delivery",
    ],
    nextStep: {
      label: "Review All Daily Developer Tasks",
      url: "/tasks",
    },
  },
  backend: {
    badge: "Backend Engineering",
    level: "Advanced Path",
    whoIsFor:
      "Developers focused on APIs, databases, security, and backend architecture.",
    prerequisites: [
      "Comfort with JavaScript or TypeScript syntax",
      "Understanding of request and response flow",
      "Basic terminal and database familiarity",
    ],
    interviewReadiness: [
      "Explain REST API design and middleware pipelines",
      "Discuss JWT auth and secure cookie handling",
      "Talk through validation, indexing, and database choices",
    ],
    completionOutcomes: [
      "Build secure backend services with clean structure",
      "Design and query relational schemas effectively",
      "Write tested APIs with validation and auth",
      "Understand practical backend production concerns",
    ],
    nextStep: {
      label: "Proceed to Full-Stack Applications",
      url: "/learn/fullstack",
    },
  },
  deployment: {
    badge: "Cloud & Deployment",
    level: "Professional Path",
    whoIsFor:
      "Developers moving from local builds to CI/CD, Docker, cloud hosting, and production workflows.",
    prerequisites: [
      "Familiarity with a full-stack project codebase",
      "Working knowledge of Git and GitHub",
      "Basic command line comfort",
    ],
    interviewReadiness: [
      "Explain build-time vs runtime configuration",
      "Discuss Docker, CI/CD, and deployment rollouts",
      "Talk through cloud security and release workflows",
    ],
    completionOutcomes: [
      "Containerize apps and automate builds confidently",
      "Deploy frontend and backend projects using production workflows",
      "Manage secrets, cloud infrastructure, and release quality",
      "Explain deployment choices in interviews and team settings",
    ],
    nextStep: {
      label: "Proceed to Interview Preparation",
      url: "/learn/interview",
    },
  },
  interview: {
    badge: "Interview Preparation",
    level: "Interview Path",
    whoIsFor:
      "Candidates preparing for technical interviews, project walkthroughs, and code reviews.",
    prerequisites: [
      "Completion of at least one technical track",
      "Familiarity with frontend, backend, or full-stack concepts",
      "Some project experience to talk through",
    ],
    interviewReadiness: [
      "Explain architecture and tradeoffs with clarity",
      "Structure technical answers under time pressure",
      "Review code and highlight improvements confidently",
    ],
    completionOutcomes: [
      "Present projects clearly in interviews",
      "Answer systems, frontend, and backend discussion prompts",
      "Show stronger confidence in technical explanation",
      "Move into job-ready interview practice",
    ],
    nextStep: {
      label: "Review All Career Pathways",
      url: "/roadmaps",
    },
  },
};

export default async function TrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);

  if (!track) {
    notFound();
  }

  const trackTopicMappings = learningMap.filter((topic) =>
    topic.relatedLessons.some((lesson) => lesson.track === trackSlug),
  );

  const recommendedTasks = Array.from(
    new Set(trackTopicMappings.flatMap((topic) => topic.relatedTasks)),
  )
    .map((slug) => getDeveloperTaskBySlug(slug))
    .filter((task): task is NonNullable<typeof task> => task !== undefined);

  const recommendedProjects = Array.from(
    new Set(trackTopicMappings.flatMap((topic) => topic.relatedProjects)),
  )
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => project !== undefined);

  const theme = themeMap[trackSlug] ?? {
    badge: "Specialized Track",
    level: "Intermediate Path",
    whoIsFor: "Developers looking to expand into a focused engineering area.",
    prerequisites: ["Basic coding literacy"],
    interviewReadiness: ["Be ready to discuss your project decisions clearly"],
    completionOutcomes: ["Build practical confidence in this track's core topics"],
    nextStep: { label: "Review Roadmaps", url: "/roadmaps" },
  };

  const totalLessons = track.modules.reduce(
    (count, module) => count + (module.lessons?.length ?? 0),
    0,
  );

  const heroBadges = [
    `${track.modules.length} Modules`,
    `${totalLessons} Lessons`,
    theme.level,
    "Project Based",
  ];

  const overview = `This track organizes ${track.modules.length} modules and ${totalLessons} lessons into a guided path with lessons, practice tasks, and project work.`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/40 pb-20">
      <div className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-200/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16 animate-fade-in">
        <div className="sticky top-16 z-40 mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition-colors hover:text-indigo-700 sm:text-sm"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
            Back to Learning Tracks
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {theme.badge}
          </span>
        </div>

        <div className="space-y-8">
          <TrackHero
            title={track.title}
            description={track.description}
            badges={heroBadges}
          />

          <TrackInfoCards
            overview={overview}
            whoIsFor={theme.whoIsFor}
            prerequisites={theme.prerequisites}
          />

          <TrackTabs
            modules={track.modules}
            trackSlug={track.slug}
            trackLevel={theme.level}
            practiceTasks={recommendedTasks}
            projects={recommendedProjects}
            interviewTopics={theme.interviewReadiness}
            outcomes={theme.completionOutcomes}
            nextStep={theme.nextStep}
          />
        </div>
      </div>
    </div>
  );
}
