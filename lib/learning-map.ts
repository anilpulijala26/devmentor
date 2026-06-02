export interface TopicMapping {
  slug: string;
  title: string;
  order: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  estimatedTime: string;
  prerequisites: string[];
  relatedLessons: { track: string; slug: string; title: string }[];
  relatedTasks: string[]; // Task slugs
  relatedProjects: string[]; // Project slugs
  interviewOutcomes: string[];
  nextRecommendedTopic?: string; // Slug of next topic
}

export const learningMap: TopicMapping[] = [
  {
    slug: "web-fundamentals",
    title: "Web Fundamentals",
    order: 1,
    difficulty: "Beginner",
    estimatedTime: "8 Hours",
    prerequisites: [],
    relatedLessons: [
      { track: "foundations", slug: "html-intro", title: "Introduction to HTML" },
      { track: "foundations", slug: "html-seo-performance", title: "SEO, Meta Tags & Performance" },
      { track: "foundations", slug: "html-interview-cracking", title: "HTML Interview Cracking Guide" }
    ],
    relatedTasks: ["accessibility-audit", "performance-audit"],
    relatedProjects: ["personal-portfolio"],
    interviewOutcomes: [
      "Explain browser Critical Rendering Path (CRP)",
      "Explain HTTP status codes and headers in the request-response lifecycle",
      "Describe Core Web Vitals (LCP, FID, CLS) and optimization strategies"
    ],
    nextRecommendedTopic: "html-css"
  },
  {
    slug: "html-css",
    title: "HTML & CSS Mastery",
    order: 2,
    difficulty: "Beginner",
    estimatedTime: "12 Hours",
    prerequisites: ["web-fundamentals"],
    relatedLessons: [
      { track: "foundations", slug: "html-semantic", title: "Semantic HTML" },
      { track: "foundations", slug: "html-forms-a11y", title: "Form Validation & Accessibility" },
      { track: "foundations", slug: "css-intro", title: "CSS Fundamentals" },
      { track: "foundations", slug: "css-flexbox", title: "Flexbox Layout" },
      { track: "foundations", slug: "css-grid", title: "CSS Grid Layout" },
      { track: "foundations", slug: "css-variables-nesting", title: "CSS Custom Properties & Nesting" },
      { track: "foundations", slug: "css-interview-cracking", title: "CSS Interview Cracking Guide" }
    ],
    relatedTasks: ["reusable-button", "reusable-form-input", "responsive-navbar", "html-form-validation", "responsive-pricing-cards"],
    relatedProjects: ["personal-portfolio"],
    interviewOutcomes: [
      "Explain the CSS box model and content-box vs border-box sizing",
      "Draft clean forms with native browser validations and screen-reader accessibility",
      "Compare Flexbox vs CSS Grid layout structures and their rendering loops"
    ],
    nextRecommendedTopic: "javascript-mastery"
  },
  {
    slug: "javascript-mastery",
    title: "JavaScript Essentials",
    order: 3,
    difficulty: "Intermediate",
    estimatedTime: "15 Hours",
    prerequisites: ["html-css"],
    relatedLessons: [
      { track: "foundations", slug: "js-intro", title: "JavaScript Fundamentals" },
      { track: "foundations", slug: "js-async", title: "Async Programming" },
      { track: "foundations", slug: "js-event-loop-dom", title: "Event Loop & Event Delegation" },
      { track: "foundations", slug: "js-advanced-es6-memory", title: "Advanced JS & Memory Management" },
      { track: "foundations", slug: "js-interview-cracking", title: "JavaScript Interview Cracking Guide" }
    ],
    relatedTasks: ["api-data-fetching", "search-pagination-table", "js-array-transformation", "debounced-search", "api-fetch-retry"],
    relatedProjects: ["personal-portfolio", "task-manager"],
    interviewOutcomes: [
      "Explain event delegation and how DOM events bubble up the hierarchy",
      "Describe closure structures, lexical scope, and memory leak mitigation",
      "Detail event loop priorities (microtasks vs macrotasks)"
    ],
    nextRecommendedTopic: "typescript-real-projects"
  },
  {
    slug: "typescript-real-projects",
    title: "TypeScript for Real Projects",
    order: 4,
    difficulty: "Intermediate",
    estimatedTime: "10 Hours",
    prerequisites: ["javascript-mastery"],
    relatedLessons: [
      { track: "foundations", slug: "ts-intro", title: "TypeScript Fundamentals" },
      { track: "foundations", slug: "ts-advanced-generics", title: "Advanced Types & Generics" },
      { track: "foundations", slug: "ts-interview-cracking", title: "TypeScript Interview Cracking Guide" }
    ],
    relatedTasks: ["reusable-button", "reusable-form-input", "role-sidebar-menu"],
    relatedProjects: ["resume-builder", "task-manager"],
    interviewOutcomes: [
      "Compare TypeScript type aliases vs interfaces and compile limits",
      "Write safe generic functions and utility type mappings",
      "Implement typed React handlers and component props"
    ],
    nextRecommendedTopic: "react-development"
  },
  {
    slug: "react-development",
    title: "React Development",
    order: 5,
    difficulty: "Intermediate",
    estimatedTime: "18 Hours",
    prerequisites: ["typescript-real-projects"],
    relatedLessons: [
      { track: "frontend-frameworks", slug: "react-intro", title: "Introduction to React" },
      { track: "frontend-frameworks", slug: "react-components", title: "Building Components" },
      { track: "frontend-frameworks", slug: "react-hooks", title: "React Hooks" },
      { track: "frontend-frameworks", slug: "react-state-management", title: "Advanced State Management" },
      { track: "frontend-frameworks", slug: "react-performance-profiling", title: "Performance & Profiling" },
      { track: "frontend-frameworks", slug: "react-fiber-architecture", title: "Fiber & Under the Hood" },
      { track: "frontend-frameworks", slug: "react-server-components", title: "Server Components (RSC)" },
      { track: "frontend-frameworks", slug: "react-security-testing", title: "Testing & Security" },
      { track: "frontend-frameworks", slug: "react-interview-cracking", title: "React Interview Cracking Guide" }
    ],
    relatedTasks: ["reusable-button", "reusable-form-input", "responsive-navbar", "api-data-fetching", "search-pagination-table", "react-controlled-form", "react-custom-hook"],
    relatedProjects: ["ecommerce-listing", "resume-builder", "task-manager"],
    interviewOutcomes: [
      "Describe the React Fiber reconciler logic and update batches",
      "Outline useEffect synchronization rules and prevent memory leaks",
      "State optimization rules using memo, useMemo, and useCallback"
    ],
    nextRecommendedTopic: "nextjs-app-router"
  },
  {
    slug: "nextjs-app-router",
    title: "Next.js App Router",
    order: 6,
    difficulty: "Advanced",
    estimatedTime: "20 Hours",
    prerequisites: ["react-development"],
    relatedLessons: [
      { track: "frontend-frameworks", slug: "nextjs-intro", title: "Introduction to Next.js" },
      { track: "frontend-frameworks", slug: "nextjs-app-router", title: "App Router Fundamentals" },
      { track: "frontend-frameworks", slug: "nextjs-fullstack", title: "Building Full-Stack Applications" },
      { track: "frontend-frameworks", slug: "nextjs-caching-rendering", title: "Next.js Caching & Revalidation" },
      { track: "frontend-frameworks", slug: "nextjs-advanced-actions", title: "Advanced Server Actions & Forms" },
      { track: "frontend-frameworks", slug: "nextjs-routing-middleware", title: "Parallel & Intercepting Routes" },
      { track: "frontend-frameworks", slug: "nextjs-optimization-monitoring", title: "Performance Optimization & Scale" },
      { track: "frontend-frameworks", slug: "nextjs-interview-cracking", title: "Next.js Interview Cracking Guide" }
    ],
    relatedTasks: ["protected-route", "login-form-token", "role-sidebar-menu", "file-upload-ui", "dashboard-stats-cards", "nextjs-dynamic-route", "nextjs-loading-ui"],
    relatedProjects: ["resume-builder", "blog-cms", "analytics-dashboard", "file-upload-manager"],
    interviewOutcomes: [
      "Differentiate Server Components (RSC) vs Client Components rendering runtime",
      "Explain Server Actions data mutations, caching parameters, and revalidations",
      "Design secure routing middlewares managing session cookies on Next.js edge layers"
    ],
    nextRecommendedTopic: "fullstack-development"
  },
  {
    slug: "fullstack-development",
    title: "Full-Stack Development",
    order: 7,
    difficulty: "Advanced",
    estimatedTime: "24 Hours",
    prerequisites: ["nextjs-app-router"],
    relatedLessons: [
      { track: "fullstack", slug: "rn-p-intro", title: "Full-Stack Architecture" },
      { track: "fullstack", slug: "express-postgres-production", title: "Express + PostgreSQL in Production" },
      { track: "fullstack", slug: "nn-p-intro", title: "Full-Stack with Next.js" },
      { track: "fullstack", slug: "prisma-drizzle-postgres", title: "Postgres ORMs & Query Performance" }
    ],
    relatedTasks: ["login-form-token", "file-upload-ui", "api-route-handler", "jwt-protected-route", "postgres-crud-query", "file-upload-validation"],
    relatedProjects: ["blog-cms", "leave-manager", "saas-auth", "ai-assistant", "file-upload-manager"],
    interviewOutcomes: [
      "Detail secure database connection pool scaling structures",
      "Design safe relational tables, index checks, and execution optimizations",
      "Formulate custom API validations using Zod middleware layers"
    ],
    nextRecommendedTopic: "production-readiness"
  },
  {
    slug: "production-readiness",
    title: "Production Readiness",
    order: 8,
    difficulty: "Professional",
    estimatedTime: "16 Hours",
    prerequisites: ["fullstack-development"],
    relatedLessons: [
      { track: "fullstack", slug: "env-vars", title: "Environment Variables (.env)" },
      { track: "fullstack", slug: "docker-basics", title: "Docker Basics" },
      { track: "fullstack", slug: "docker-compose-production", title: "Production Docker & Compose" },
      { track: "fullstack", slug: "fullstack-interview-cracking", title: "Full-Stack Interview Cracking Guide" }
    ],
    relatedTasks: ["protected-route", "role-sidebar-menu", "accessibility-audit", "performance-audit"],
    relatedProjects: ["saas-auth", "ai-assistant", "analytics-dashboard"],
    interviewOutcomes: [
      "Delineate trunk-based development pipelines, branching scopes, and PR checklists",
      "Write multi-stage Docker builds reducing production footprint sizes",
      "Design enterprise monitoring, Winston logging setups, and error hooks"
    ],
    nextRecommendedTopic: "backend-core"
  },
  {
    slug: "backend-core",
    title: "Backend Core Engineering",
    order: 9,
    difficulty: "Intermediate",
    estimatedTime: "20 Hours",
    prerequisites: ["javascript-mastery"],
    relatedLessons: [
      { track: "backend", slug: "what-is-node", title: "What is Node.js Runtime" },
      { track: "backend", slug: "runtime-event-loop", title: "Event Loop & Non-Blocking I/O" },
      { track: "backend", slug: "node-modules", title: "Modules & NPM" },
      { track: "backend", slug: "node-async-errors", title: "Asynchronous Core & Error Basics" },
      { track: "backend", slug: "express-setup", title: "Express Routing Mechanics" },
      { track: "backend", slug: "controllers-middleware", title: "Controllers & Middleware Pipeline" }
    ],
    relatedTasks: ["create-express-server"],
    relatedProjects: ["express-postgres-api"],
    interviewOutcomes: [
      "Explain Node.js event loop phases and thread pools.",
      "Implement Express request pipelines with custom middlewares."
    ],
    nextRecommendedTopic: "backend-databases-security"
  },
  {
    slug: "backend-databases-security",
    title: "Databases & API Security",
    order: 10,
    difficulty: "Advanced",
    estimatedTime: "24 Hours",
    prerequisites: ["backend-core"],
    relatedLessons: [
      { track: "backend", slug: "rest-principles", title: "REST Architectural Principles" },
      { track: "backend", slug: "zod-validation", title: "Request Validation with Zod" },
      { track: "backend", slug: "jwt-tokens", title: "JWT Access Tokens, Expiry, and Cookies" },
      { track: "backend", slug: "prisma-drizzle-orm", title: "ORM Integration: Prisma & Drizzle" },
      { track: "backend", slug: "cors-security-headers", title: "CORS & Helmet Security Headers" },
      { track: "backend", slug: "multer-uploads", title: "File Upload with Multer" }
    ],
    relatedTasks: ["build-crud-api", "zod-validation", "auth-middleware", "bcrypt-hashing", "generate-jwt", "refresh-token-flow", "postgres-prisma", "multer-upload"],
    relatedProjects: ["auth-system", "rbac-dashboard", "blog-cms-backend", "ecommerce-backend-api", "file-uploader"],
    interviewOutcomes: [
      "Model relational database schemas, compound indexing, and key constraints.",
      "Design secure stateless session architectures using HttpOnly cookies.",
      "Explain Multer file parsing configurations and pre-signed S3 upload URLs."
    ],
    nextRecommendedTopic: "deployment-ops"
  },
  {
    slug: "deployment-ops",
    title: "CI/CD & Cloud Deployment",
    order: 11,
    difficulty: "Professional",
    estimatedTime: "30 Hours",
    prerequisites: ["backend-databases-security"],
    relatedLessons: [
      { track: "deployment", slug: "git-branching-prs", title: "Branching, Pull Requests & Code Reviews" },
      { track: "deployment", slug: "cicd-intro", title: "What is CI/CD & GitHub Actions Basics" },
      { track: "deployment", slug: "docker-basics", title: "Dockerfile & Multi-Stage Builds" },
      { track: "deployment", slug: "cloud-backend-deploy", title: "Deploying Backend to Render & Railway" },
      { track: "deployment", slug: "aws-iam-s3", title: "IAM, S3 Storage, and CloudFront Basics" },
      { track: "deployment", slug: "azure-appservice-static-blob", title: "Azure App Service, Blob Storage & Static Web Apps" },
      { track: "deployment", slug: "production-monitoring-logging", title: "Logging, Uptime, Error, & Performance Monitoring" }
    ],
    relatedTasks: ["dockerize-node-api", "deploy-backend-cloud"],
    relatedProjects: ["dockerized-fullstack", "cloud-deployment"],
    interviewOutcomes: [
      "Optimize multi-stage Docker builds reducing production footprint sizes.",
      "Orchestrate multi-container applications using compose volumes and networks.",
      "Configure cloud databases, VPC security groups, and key vault secrets."
    ]
  }
];

export function getTopicBySlug(slug: string): TopicMapping | undefined {
  return learningMap.find((t) => t.slug === slug);
}

export function getTopicForLesson(lessonSlug: string): TopicMapping | undefined {
  return learningMap.find((topic) =>
    topic.relatedLessons.some((l) => l.slug === lessonSlug)
  );
}
