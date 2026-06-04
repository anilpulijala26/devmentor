export interface ReviewCategory {
  id: string;
  title: string;
  description: string;
  priority: "Recommended" | "Important" | "Critical";
  items: string[];
}

export const REVIEW_CATEGORIES: ReviewCategory[] = [
  {
    id: "folder-structure",
    title: "Folder Structure",
    description: "Verify project organization, shared folders, and asset placement.",
    priority: "Recommended",
    items: [
      "Components are organized by feature or domain.",
      "Shared components are placed in a reusable common folder.",
      "Assets, constants, hooks, and utilities are separated clearly.",
    ],
  },
  {
    id: "component-reusability",
    title: "Component Reusability",
    description: "Check whether components are modular, reusable, and easy to maintain.",
    priority: "Important",
    items: [
      "Presentation details are controlled through props instead of hardcoded duplication.",
      "Base UI elements are reusable and extend native HTML attributes safely.",
      "Each component has a clear single responsibility.",
    ],
  },
  {
    id: "typescript-usage",
    title: "TypeScript Usage",
    description: "Ensure strong typing, safe interfaces, and compiler-friendly code.",
    priority: "Important",
    items: [
      "No unsafe any usage is left in core flows.",
      "Functions, events, and API payloads are typed explicitly.",
      "Union types or enums are used for controlled variants.",
    ],
  },
  {
    id: "props-state-handling",
    title: "Props and State Handling",
    description: "Review state ownership, defaults, and render efficiency.",
    priority: "Important",
    items: [
      "State updates do not cause unnecessary expensive re-renders.",
      "Props have safe defaults or fallback handling where needed.",
      "Shared state is lifted only when multiple parts of the UI truly need it.",
    ],
  },
  {
    id: "api-error-handling",
    title: "API Error Handling",
    description: "Validate request safety, error feedback, and cleanup logic.",
    priority: "Critical",
    items: [
      "Async requests are wrapped in error handling.",
      "Users receive clear feedback when requests fail.",
      "Stale requests are cancelled or ignored safely on unmount.",
    ],
  },
  {
    id: "loading-states",
    title: "Loading States",
    description: "Confirm smooth loading, disabled states, and layout stability.",
    priority: "Recommended",
    items: [
      "Loading placeholders or skeletons communicate progress clearly.",
      "Buttons and forms disable duplicate actions during submission.",
      "Loading states preserve layout height and reduce visual jumps.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "Check semantic HTML, labels, keyboard support, and aria text.",
    priority: "Critical",
    items: [
      "All form inputs have labels.",
      "Keyboard navigation works properly.",
      "Images and icons have accessible alt text or aria labels.",
    ],
  },
  {
    id: "performance",
    title: "Performance",
    description: "Review lazy loading, rendering keys, and expensive operations.",
    priority: "Important",
    items: [
      "Heavy UI sections or libraries are loaded lazily when appropriate.",
      "Lists use stable unique keys instead of array indexes.",
      "Expensive calculations are optimized when they affect responsiveness.",
    ],
  },
  {
    id: "security-basics",
    title: "Security Basics",
    description: "Validate secrets, auth handling, and input safety.",
    priority: "Critical",
    items: [
      "No secrets or API keys are exposed in frontend code.",
      "Form inputs are validated before submission.",
      "Auth tokens are handled safely.",
    ],
  },
  {
    id: "clean-code",
    title: "Clean Code Standards",
    description: "Check naming, dead code, file size, and maintainability.",
    priority: "Important",
    items: [
      "Debug logs and dead code are removed from production paths.",
      "Variables, functions, and files use clear descriptive names.",
      "Large files are split when readability or maintenance suffers.",
    ],
  },
  {
    id: "deployment-readiness",
    title: "Deployment Readiness",
    description: "Confirm build health, metadata, routing, and release confidence.",
    priority: "Critical",
    items: [
      "The production build succeeds without blocking issues.",
      "Metadata, favicons, and essential SEO basics are configured.",
      "Important routes and dynamic links have been verified.",
    ],
  },
];

export const TOTAL_REVIEW_CHECKS = REVIEW_CATEGORIES.reduce(
  (sum, category) => sum + category.items.length,
  0,
);
