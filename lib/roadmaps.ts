export interface RoadmapLesson {
  track: string;
  slug: string;
  title: string;
}

export interface RoadmapProjectTask {
  title: string;
  description: string;
  projectSlug: string;
}

export interface Roadmap {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional" | "Interview Prep";
  description: string;
  skillsCovered: string[];
  recommendedLessons: RoadmapLesson[];
  projectTasks: RoadmapProjectTask[];
  duration: string;
  checklist: string[];
}

export const roadmaps: Roadmap[] = [
  {
    slug: "intern-developer",
    title: "Intern Developer Roadmap",
    level: "Beginner",
    description: "Start your software engineering journey. Master web fundamentals, clean coding standards, semantic structures, and deployment basics.",
    skillsCovered: [
      "Semantic HTML5 & Accessibility",
      "CSS Layouts (Flexbox, Grid)",
      "JavaScript ES6+ Principles",
      "Git & Collaborative Development",
      "Static Site Hosting & Domain Setup"
    ],
    recommendedLessons: [
      { track: "foundations", slug: "html-intro", title: "Introduction to HTML" },
      { track: "foundations", slug: "html-semantic", title: "Semantic HTML" },
      { track: "foundations", slug: "html-forms-a11y", title: "Form Validation & Accessibility" },
      { track: "foundations", slug: "css-intro", title: "CSS Fundamentals" },
      { track: "foundations", slug: "css-flexbox", title: "Flexbox Layout" },
      { track: "foundations", slug: "js-intro", title: "JavaScript Fundamentals" }
    ],
    projectTasks: [
      {
        title: "Personal Portfolio Website",
        description: "Build a highly responsive personal portfolio from scratch using semantic HTML, custom CSS variables, and modern web typography.",
        projectSlug: "personal-portfolio"
      }
    ],
    duration: "4 - 6 Weeks",
    checklist: [
      "I can write valid HTML5 documents with proper headers and semantic hierarchy",
      "I understand CSS specificity, the box model, and layout flows",
      "I can use ES6 functions, arrays, objects, and basic DOM manipulation",
      "I know how to deploy a website on Vercel or Netlify"
    ]
  },
  {
    slug: "junior-frontend",
    title: "Junior Frontend Developer Roadmap",
    level: "Intermediate",
    description: "Transition from simple web pages to interactive dynamic web applications. Learn state-driven UI, TypeScript, and client-side styling.",
    skillsCovered: [
      "React Component Life Cycle",
      "TypeScript Typing & Interfaces",
      "State Management (useState, Context)",
      "API Fetching, Loading, & Error handling",
      "TailwindCSS or Styled System design"
    ],
    recommendedLessons: [
      { track: "foundations", slug: "ts-intro", title: "TypeScript Fundamentals" },
      { track: "frontend-frameworks", slug: "react-intro", title: "Introduction to React" },
      { track: "frontend-frameworks", slug: "react-components", title: "Building Components" },
      { track: "frontend-frameworks", slug: "react-hooks", title: "React Hooks" },
      { track: "frontend-frameworks", slug: "nextjs-intro", title: "Introduction to Next.js" }
    ],
    projectTasks: [
      {
        title: "Admin Dashboard Interface",
        description: "Create an interactive dashboard showing operational telemetry, mock user management, and dynamic charts.",
        projectSlug: "admin-dashboard"
      },
      {
        title: "Resume Builder App",
        description: "Create an app that generates downloadable PDF resumes based on interactive input forms.",
        projectSlug: "resume-builder"
      }
    ],
    duration: "8 - 10 Weeks",
    checklist: [
      "I can manage complex state and prevent unnecessary React re-renders",
      "I can convert a Javascript app into type-safe strict TypeScript",
      "I understand how components communicate via props and state sharing",
      "I can fetch data from external REST APIs and handle HTTP failures elegantly"
    ]
  },
  {
    slug: "mid-level-fullstack",
    title: "Mid-Level Full-Stack Developer",
    level: "Advanced",
    description: "Connect front-end architectures with robust back-end pipelines. Learn server-side logic, relational database schemas, and API design.",
    skillsCovered: [
      "Next.js App Router (RSC, Server Actions)",
      "Express Server & Node middleware pipelines",
      "Relational Databases (PostgreSQL) & ORMs",
      "User Authentication & Authorization (JWT)",
      "Database query analysis and indexing"
    ],
    recommendedLessons: [
      { track: "frontend-frameworks", slug: "nextjs-app-router", title: "App Router Fundamentals" },
      { track: "frontend-frameworks", slug: "nextjs-fullstack", title: "Building Full-Stack Applications" },
      { track: "fullstack", slug: "rn-p-intro", title: "Full-Stack Architecture" },
      { track: "fullstack", slug: "prisma-drizzle-postgres", title: "Postgres ORMs & Query Performance" },
      { track: "fullstack", slug: "env-vars", title: "Environment Variables (.env)" }
    ],
    projectTasks: [
      {
        title: "Blog CMS Web Application",
        description: "Build a full blog manager with rich-text editor, media uploads, categories, and database storage.",
        projectSlug: "blog-cms"
      },
      {
        title: "E-commerce Product Listing App",
        description: "Design a listing system with complex product filtering, search, pagination, and shopping cart logic.",
        projectSlug: "ecommerce-listing"
      },
      {
        title: "Leave Management System",
        description: "Design an internal workflow app where employees request leaves and managers approve/reject them.",
        projectSlug: "leave-manager"
      }
    ],
    duration: "12 - 16 Weeks",
    checklist: [
      "I understand the difference between client components and server components in Next.js",
      "I can model database schemas with relations (One-to-Many, Many-to-Many)",
      "I can implement secure JWT authorization stored in HTTP-Only cookies",
      "I understand CORS, CSRF, and API rate-limiting basics"
    ]
  },
  {
    slug: "senior-ui-developer",
    title: "Senior UI Developer Roadmap",
    level: "Professional",
    description: "Master React internal mechanics, rendering engines, caching policies, complex application components, and performance optimizations.",
    skillsCovered: [
      "React Fiber Architecture & Reconciliation",
      "Advanced TS Generics & Mapped Types",
      "Next.js Request Memoization & Client Cache",
      "Enterprise UI Libraries & Component Patterns",
      "Multi-stage Docker builds & Compose pipelines"
    ],
    recommendedLessons: [
      { track: "foundations", slug: "ts-advanced-generics", title: "Advanced Types & Generics" },
      { track: "frontend-frameworks", slug: "react-performance-profiling", title: "Performance & Profiling" },
      { track: "frontend-frameworks", slug: "react-fiber-architecture", title: "Fiber & Under the Hood" },
      { track: "frontend-frameworks", slug: "nextjs-caching-rendering", title: "Next.js Caching & Revalidation" },
      { track: "fullstack", slug: "docker-compose-production", title: "Production Docker & Compose" }
    ],
    projectTasks: [
      {
        title: "SaaS App with Authentication",
        description: "Create a subscription-ready multi-tenant app integrated with billing hooks, authentication, and user workspace directories.",
        projectSlug: "saas-auth"
      },
      {
        title: "AI-Powered Analysis Assistant",
        description: "Create an application that interfaces with Large Language Models to read, index, and analyze user documents.",
        projectSlug: "ai-assistant"
      }
    ],
    duration: "16 - 20 Weeks",
    checklist: [
      "I can write customizable generic components with React context providers",
      "I can profile React rendering loops to eliminate rerender leaks",
      "I understand Next.js server caching validation flags",
      "I can containerize node applications into tiny multi-stage Docker images"
    ]
  },
  {
    slug: "interview-preparation",
    title: "Technical Interview Preparation",
    level: "Interview Prep",
    description: "Accelerate your career. Practice engineering explanation templates, review mock interview questions, and crack technical design assessments.",
    skillsCovered: [
      "Structural 'Explain in Interview' templates",
      "System Design for Web Scale (Caching, CDN, DB)",
      "Interactive code-review standards",
      "Browser engine mechanics & Event loop questions",
      "Core coding interview challenges"
    ],
    recommendedLessons: [
      { track: "foundations", slug: "html-interview-cracking", title: "HTML Interview Guide" },
      { track: "foundations", slug: "css-interview-cracking", title: "CSS Interview Guide" },
      { track: "foundations", slug: "js-interview-cracking", title: "JavaScript Interview Guide" },
      { track: "foundations", slug: "ts-interview-cracking", title: "TypeScript Interview Guide" },
      { track: "frontend-frameworks", slug: "react-interview-cracking", title: "React Interview Guide" },
      { track: "frontend-frameworks", slug: "nextjs-interview-cracking", title: "Next.js Interview Guide" },
      { track: "fullstack", slug: "fullstack-interview-cracking", title: "Full-Stack Interview Guide" }
    ],
    projectTasks: [
      {
        title: "Admin Dashboard Production Interview",
        description: "Run through the system architecture, API contracts, folder layout, and performance scaling for the Admin Dashboard project.",
        projectSlug: "admin-dashboard"
      }
    ],
    duration: "4 Weeks",
    checklist: [
      "I can clearly explain the 7 crucial architectural components of my projects",
      "I know how to diagnose rendering bottlenecks under browser inspection",
      "I understand database performance analysis (EXPLAIN statements)",
      "I can answer conceptual questions on event-loops, fibers, and network lifecycles"
    ]
  }
];

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return roadmaps.find((r) => r.slug === slug);
}
