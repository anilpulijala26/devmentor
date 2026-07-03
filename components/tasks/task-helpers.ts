import { developerTasks, type DeveloperTask } from "@/lib/tasks";

export const TASK_FILTERS = [
  "All",
  "Beginner",
  "Mid-Level",
  "Senior",
  "Frontend",
  "Backend",
  "Full-Stack",
] as const;

export type TaskFilter = (typeof TASK_FILTERS)[number];
export type TaskCategory = "Frontend" | "Backend" | "Full-Stack" | "Deployment";

const frontendSlugs = [
  "html-form-validation",
  "responsive-pricing-cards",
  "js-array-transformation",
  "debounced-search",
  "react-controlled-form",
  "react-custom-hook",
  "nextjs-dynamic-route",
  "nextjs-loading-ui",
  "accessibility-audit",
  "performance-audit",
];

const fullstackSlugs = [
  "api-route-handler",
  "postgres-crud-query",
  "postgres-prisma",
  "api-tests-supertest",
];

const deploymentSlugs = ["dockerize-node-api", "deploy-backend-cloud"];

const taskTagsMap: Record<string, string[]> = {
  "html-form-validation": ["Semantic HTML", "Native validation", "Accessibility", "Form UX"],
  "responsive-pricing-cards": ["CSS Grid", "Flexbox", "Responsive", "UI Layouts"],
  "js-array-transformation": ["JavaScript", "ES6", "Data transforms", "Functional patterns"],
  "debounced-search": ["React", "Hooks", "Async UX", "Performance"],
  "api-fetch-retry": ["API handling", "Retry logic", "Resilience", "TypeScript"],
  "react-controlled-form": ["React", "State", "Forms", "Validation"],
  "react-custom-hook": ["React hooks", "LocalStorage", "State", "TypeScript"],
  "nextjs-dynamic-route": ["Next.js", "Routing", "Metadata", "SEO"],
  "nextjs-loading-ui": ["Next.js", "Loading UI", "Suspense", "UX"],
  "api-route-handler": ["Next.js API", "Validation", "JSON", "Backend"],
  "jwt-protected-route": ["Express", "JWT", "Security", "Auth"],
  "postgres-crud-query": ["PostgreSQL", "SQL", "CRUD", "Backend"],
  "file-upload-validation": ["Node.js", "Uploads", "Validation", "Security"],
  "accessibility-audit": ["WCAG", "A11y", "Keyboard UX", "Semantics"],
  "performance-audit": ["Performance", "Rendering", "Lazy loading", "Optimization"],
  "dockerize-node-api": ["Docker", "Node.js", "Deployment", "Containers"],
  "deploy-backend-cloud": ["CI/CD", "Cloud", "GitHub Actions", "Deployment"],
};

export function getTaskCategory(slug: string): TaskCategory {
  if (frontendSlugs.includes(slug)) return "Frontend";
  if (fullstackSlugs.includes(slug)) return "Full-Stack";
  if (deploymentSlugs.includes(slug)) return "Deployment";
  return "Backend";
}

export function getEstimatedTime(level: DeveloperTask["level"]) {
  if (level === "Beginner") return "15 mins";
  if (level === "Intermediate") return "30 mins";
  return "45 mins";
}

export function getTaskTags(slug: string) {
  return taskTagsMap[slug] || ["Web Dev"];
}

export function getVisibleTaskTags(slug: string) {
  return getTaskTags(slug).slice(0, 3);
}

export function getLevelTone(level: DeveloperTask["level"]) {
  return {
    Beginner: "bg-slate-100 text-slate-700 border-slate-200",
    Intermediate: "bg-indigo-50 text-[#4F46E5] border-indigo-100",
    Advanced: "bg-violet-50 text-[#7C3AED] border-violet-100",
  }[level];
}

export function getTaskMetaLine(task: DeveloperTask) {
  const levelLabel =
    task.level === "Intermediate" ? "Mid-Level" : task.level === "Advanced" ? "Senior" : "Beginner";
  const category = getTaskCategory(task.slug) === "Deployment" ? "Backend" : getTaskCategory(task.slug);
  return `${levelLabel} · ${getEstimatedTime(task.level)} · ${category}`;
}

export function getNextRecommendedTask(slug: string) {
  const currentCategory = getTaskCategory(slug);
  const currentIndex = developerTasks.findIndex((task) => task.slug === slug);

  const nextInCategory = developerTasks.find(
    (task, index) => index > currentIndex && getTaskCategory(task.slug) === currentCategory,
  );

  if (nextInCategory) return nextInCategory;

  return developerTasks.find((task) => task.slug !== slug);
}

export function getSuggestedImprovement(task: DeveloperTask) {
  if (task.edgeCases?.[0]) {
    return `Improve the solution by handling this edge case more explicitly: ${task.edgeCases[0]}`;
  }

  if (task.commonMistakes?.[0]) {
    return `Review this common pitfall before moving on: ${task.commonMistakes[0]}`;
  }

  return "Do one more pass for naming clarity, edge cases, and accessibility before marking the challenge complete.";
}

export function getRequirementChecklist(requirement: string) {
  return requirement
    .split(/(?<=[.!?])\s+/)
    .flatMap((part) =>
      part
        .replace(/^The\s+/i, "")
        .split(/;\s+|,\s+(?=(?:and\s+)?(?:the|a|an|three|two|all|show|stack|use|highlight|require))/i),
    )
    .map((part) => part.trim().replace(/[.]+$/, ""))
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
}
