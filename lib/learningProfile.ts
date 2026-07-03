import { projects } from "./projects";

export type LearningLevelKey =
  | "new_to_coding"
  | "html_css"
  | "javascript_basics"
  | "react"
  | "working_frontend";

export interface LearningLevelOption {
  key: LearningLevelKey;
  label: string;
  pathKey: "fresher" | "upgrade";
  currentLevel: string;
  startingModuleIndex: number;
  startingDay: number;
}

export interface DayPlan {
  day: number;
  lessonTitle: string;
  practiceTitle: string;
  practiceSlug?: string;
  challengeTitle: string;
  interviewQuestion: string;
  interviewAnswer: string;
  projectStepTitle: string;
  projectSlug?: string;
}

export interface PathModule {
  order: number;
  title: string;
  description: string;
  lessonTopics: string[];
  practiceItems: string[];
  challengeItems: string[];
  projectTitle?: string;
  dayPlans: DayPlan[];
}

export interface LearningPathDefinition {
  key: "fresher" | "upgrade";
  title: string;
  audience: string;
  modules: PathModule[];
}

export interface LearningProfile {
  levelKey: LearningLevelKey;
  levelLabel: string;
  currentLevel: string;
  pathKey: "fresher" | "upgrade";
  pathTitle: string;
  startingModuleIndex: number;
  startingDay: number;
}

export const LEARNING_LEVEL_OPTIONS: LearningLevelOption[] = [
  {
    key: "new_to_coding",
    label: "I am new to coding",
    pathKey: "fresher",
    currentLevel: "Beginner",
    startingModuleIndex: 0,
    startingDay: 1,
  },
  {
    key: "html_css",
    label: "I know HTML/CSS",
    pathKey: "fresher",
    currentLevel: "HTML/CSS Ready",
    startingModuleIndex: 2,
    startingDay: 1,
  },
  {
    key: "javascript_basics",
    label: "I know JavaScript basics",
    pathKey: "fresher",
    currentLevel: "JavaScript Ready",
    startingModuleIndex: 4,
    startingDay: 1,
  },
  {
    key: "react",
    label: "I know React",
    pathKey: "upgrade",
    currentLevel: "React Developer",
    startingModuleIndex: 0,
    startingDay: 1,
  },
  {
    key: "working_frontend",
    label: "I am a working frontend developer",
    pathKey: "upgrade",
    currentLevel: "Frontend Professional",
    startingModuleIndex: 0,
    startingDay: 1,
  },
];

const findProjectSlug = (title: string) =>
  projects.find((project) => project.title.toLowerCase().includes(title.toLowerCase().split(" ")[0]))?.slug;

export const LEARNING_PATHS: Record<"fresher" | "upgrade", LearningPathDefinition> = {
  fresher: {
    key: "fresher",
    title: "JavaScript Full-Stack Fresher Path",
    audience: "Freshers, interns, degree students, and early frontend developers",
    modules: [
      {
        order: 0,
        title: "Setup and Coding Mindset",
        description: "Start from zero and get comfortable with how websites, tools, and daily coding work.",
        lessonTopics: [
          "What is frontend?",
          "What is backend?",
          "How websites work",
          "Install VS Code",
          "Install Node.js",
          "Create GitHub account",
          "Browser console basics",
        ],
        practiceItems: ["Check your browser console", "Create your first folder", "Install Node.js and verify version"],
        challengeItems: ["Print a message in the console", "Find your Node version", "Open DevTools successfully"],
        dayPlans: [
          {
            day: 1,
            lessonTitle: "What is frontend and backend?",
            practiceTitle: "Open the browser console and inspect a website",
            challengeTitle: "Print 'Hello CodeNivra' in the console",
            interviewQuestion: "What is the difference between frontend and backend?",
            interviewAnswer: "Frontend is what users see and interact with in the browser. Backend handles data, business logic, and server-side work.",
            projectStepTitle: "Create your learning workspace folder and screenshots folder",
          },
          {
            day: 2,
            lessonTitle: "How websites work from browser to server",
            practiceTitle: "Install VS Code and create your first HTML file",
            challengeTitle: "Save and reopen a file correctly",
            interviewQuestion: "What happens when you open a website in the browser?",
            interviewAnswer: "The browser sends a request, the server returns files or data, and the browser renders the page for the user.",
            projectStepTitle: "Create a simple notes file for your coding journey",
          },
        ],
      },
      {
        order: 1,
        title: "HTML, CSS, and Git",
        description: "Learn how to build and style pages, then share your code with GitHub.",
        lessonTopics: [
          "HTML structure",
          "Text, images, links",
          "Forms",
          "CSS basics",
          "Flexbox",
          "Responsive design",
          "Git basics",
          "GitHub push",
        ],
        practiceItems: ["Profile card", "Registration form", "Pricing card", "Simple landing page", "Push code to GitHub"],
        challengeItems: ["Center a card", "Create a responsive form", "Push your first repo"],
        projectTitle: "Personal portfolio website",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "HTML structure and semantic tags",
            practiceTitle: "Build a profile card",
            practiceSlug: "html-form-validation",
            challengeTitle: "Create a registration form",
            interviewQuestion: "What is semantic HTML?",
            interviewAnswer: "Semantic HTML uses meaningful tags like header, nav, main, and section so the structure is clear for developers, browsers, and assistive tools.",
            projectStepTitle: "Create the portfolio header and intro section",
            projectSlug: "personal-portfolio",
          },
          {
            day: 2,
            lessonTitle: "Flexbox and responsive design basics",
            practiceTitle: "Build a pricing card layout",
            practiceSlug: "responsive-pricing-cards",
            challengeTitle: "Make the layout stack on mobile",
            interviewQuestion: "Why is responsive design important?",
            interviewAnswer: "Responsive design helps the same website work well on phones, tablets, and desktops without breaking the layout.",
            projectStepTitle: "Add the about section and skills section",
            projectSlug: "personal-portfolio",
          },
        ],
      },
      {
        order: 2,
        title: "JavaScript Basics",
        description: "Learn the JavaScript fundamentals you need before React and backend work.",
        lessonTopics: ["Variables", "Data types", "Operators", "Functions", "Conditions", "Loops", "Arrays", "Objects", "DOM basics"],
        practiceItems: ["Write a simple function", "Loop through an array", "Change DOM text on click"],
        challengeItems: [
          "Convert minutes to seconds",
          "Check even or odd",
          "Find largest number",
          "Reverse string",
          "Count vowels",
          "Calculate total price",
        ],
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Functions in JavaScript",
            practiceTitle: "Write a simple function",
            practiceSlug: "js-array-transformation",
            challengeTitle: "Convert Minutes into Seconds",
            interviewQuestion: "What is a function return value?",
            interviewAnswer: "A return value is the result a function sends back after it finishes running.",
            projectStepTitle: "Add calculation logic to mini calculator",
          },
          {
            day: 2,
            lessonTitle: "Conditions and loops",
            practiceTitle: "Check even or odd in JavaScript",
            challengeTitle: "Find the largest number",
            interviewQuestion: "When would you use a loop in JavaScript?",
            interviewAnswer: "You use a loop when you need to repeat the same action for many values, such as items in an array.",
            projectStepTitle: "Show calculation history under the mini calculator",
          },
        ],
      },
      {
        order: 3,
        title: "JavaScript DOM and Mini Apps",
        description: "Make pages interactive with events, forms, local storage, and fetch.",
        lessonTopics: ["DOM selection", "Events", "Forms", "Validation", "Local storage", "Fetch basics"],
        practiceItems: ["Counter app", "Todo app", "Form validation", "Search filter", "Theme switcher"],
        challengeItems: ["Handle button click", "Store a task in local storage", "Validate a simple form"],
        projectTitle: "Student task tracker",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "DOM selection and events",
            practiceTitle: "Build a counter app",
            challengeTitle: "Increase and decrease a number",
            interviewQuestion: "What is the DOM?",
            interviewAnswer: "The DOM is the browser's object representation of the page, which JavaScript can read and update.",
            projectStepTitle: "Create the tracker layout and add the task list",
            projectSlug: "task-manager",
          },
        ],
      },
      {
        order: 4,
        title: "React Frontend",
        description: "Move from DOM scripting to reusable component-based frontend development.",
        lessonTopics: ["Components", "Props", "State", "Events", "Forms", "Lists", "useEffect", "API calls", "Routing", "Reusable components"],
        practiceItems: ["Counter component", "Todo with React", "Search filter", "Login form UI", "Course cards", "Dashboard cards"],
        challengeItems: ["Render a list", "Update state", "Fetch and show API data"],
        projectTitle: "Learning dashboard frontend",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "React components and props",
            practiceTitle: "Build course cards",
            practiceSlug: "react-controlled-form",
            challengeTitle: "Render a list of dashboard cards",
            interviewQuestion: "What is a React component?",
            interviewAnswer: "A React component is a reusable UI block that returns JSX and can receive data through props.",
            projectStepTitle: "Create dashboard cards and quick actions",
          },
        ],
      },
      {
        order: 5,
        title: "Backend with Node.js",
        description: "Learn how to build APIs, routes, and middleware with Express.",
        lessonTopics: ["Node.js basics", "Express server", "Routes", "Controllers", "Middleware", "REST API", "Error handling", "Validation"],
        practiceItems: ["Create GET API", "Create POST API", "Update API", "Delete API", "Login API", "Protected route"],
        challengeItems: ["Return JSON from an API", "Validate request body", "Protect a route"],
        projectTitle: "Course management backend",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Express server and routes",
            practiceTitle: "Create a GET API",
            challengeTitle: "Create a POST API",
            interviewQuestion: "What is middleware in Express?",
            interviewAnswer: "Middleware is a function that runs during the request-response cycle to inspect, change, or block a request.",
            projectStepTitle: "Add course routes and controller files",
            projectSlug: "auth-system",
          },
        ],
      },
      {
        order: 6,
        title: "PostgreSQL and Database",
        description: "Store and query real learning data with PostgreSQL.",
        lessonTopics: ["Tables", "Primary key", "Foreign key", "Insert/update/delete", "Joins", "Constraints", "Indexes basics", "Transactions"],
        practiceItems: ["Create users table", "Create courses table", "Create enrollments table", "Write join query", "Write progress query"],
        challengeItems: ["Write a SELECT query", "Join two tables", "Insert progress data"],
        projectTitle: "Learning platform database",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Tables, keys, and relationships",
            practiceTitle: "Create users and courses tables",
            challengeTitle: "Write a join query",
            interviewQuestion: "What is a primary key?",
            interviewAnswer: "A primary key is a unique value used to identify one row in a table.",
            projectStepTitle: "Create tables for users, modules, and progress",
          },
        ],
      },
      {
        order: 7,
        title: "Full-Stack Integration",
        description: "Connect React and Node together so users can log in, save progress, and submit work.",
        lessonTopics: ["Connect React to Node API", "JWT login", "Protected dashboard", "Save progress", "Submit challenge", "Fetch projects"],
        practiceItems: ["Login flow", "Register flow", "Progress update", "Challenge submission", "Project submission"],
        challengeItems: ["Save user progress", "Protect dashboard data", "Submit code to the API"],
        projectTitle: "Full-stack learning portal",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Connect React to a Node API",
            practiceTitle: "Build the login flow",
            challengeTitle: "Submit a coding problem to the backend",
            interviewQuestion: "Why do we protect dashboard routes?",
            interviewAnswer: "Protected routes stop anonymous users from seeing private data or changing another user's progress.",
            projectStepTitle: "Connect the dashboard to saved user progress",
          },
        ],
      },
      {
        order: 8,
        title: "Deployment and Job Readiness",
        description: "Ship your project, explain it clearly, and prepare for interviews.",
        lessonTopics: ["Deploy frontend", "Deploy backend", "Environment variables", "Database hosting", "GitHub README", "Resume project explanation", "Interview preparation"],
        practiceItems: ["Deploy frontend", "Deploy backend", "Write README", "Practice project explanation"],
        challengeItems: ["Set environment variables", "Write deployment steps", "Explain your project in 30 seconds"],
        projectTitle: "Deploy final full-stack project",
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Deploying your final full-stack app",
            practiceTitle: "Write the README and setup steps",
            challengeTitle: "Explain your project clearly",
            interviewQuestion: "What did you build and how does it work?",
            interviewAnswer: "I built a JavaScript full-stack learning app with lessons, practice, coding problems, and projects. The frontend calls backend APIs, and progress is stored in PostgreSQL.",
            projectStepTitle: "Submit GitHub repo and live URL",
          },
        ],
      },
    ],
  },
  upgrade: {
    key: "upgrade",
    title: "Frontend to Full-Stack Upgrade Path",
    audience: "React developers and working frontend engineers moving into backend and architecture",
    modules: [
      {
        order: 0,
        title: "Advanced React",
        description: "Deepen component architecture, performance, and state management.",
        lessonTopics: ["Advanced React", "TypeScript", "Performance patterns"],
        practiceItems: ["Refactor shared components", "Optimize render flow"],
        challengeItems: ["Explain a React architecture decision"],
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Advanced React architecture",
            practiceTitle: "Refactor dashboard cards into reusable sections",
            challengeTitle: "Explain prop drilling vs composition",
            interviewQuestion: "How do you scale a React codebase?",
            interviewAnswer: "You scale React by separating features, making components reusable, and keeping data flow predictable.",
            projectStepTitle: "Set up the advanced frontend foundation",
          },
        ],
      },
      {
        order: 1,
        title: "Node.js API Architecture",
        description: "Learn controller design, auth, validation, and backend service structure.",
        lessonTopics: ["Node.js API Architecture", "Authentication", "PostgreSQL Design", "Performance", "Docker", "Deployment", "AI Integration", "System Design Basics"],
        practiceItems: ["Build protected APIs", "Add validation layers"],
        challengeItems: ["Design a service boundary"],
        dayPlans: [
          {
            day: 1,
            lessonTitle: "Backend API architecture for frontend engineers",
            practiceTitle: "Create a protected route",
            challengeTitle: "Design the auth request flow",
            interviewQuestion: "How would you structure a Node.js API?",
            interviewAnswer: "I would separate routes, controllers, services, validations, and database access so each layer has a clear responsibility.",
            projectStepTitle: "Create service modules and auth flow",
          },
        ],
      },
    ],
  },
};

export function buildLearningProfile(levelKey: LearningLevelKey): LearningProfile {
  const option = LEARNING_LEVEL_OPTIONS.find((item) => item.key === levelKey) ?? LEARNING_LEVEL_OPTIONS[0];
  const path = LEARNING_PATHS[option.pathKey];

  return {
    levelKey: option.key,
    levelLabel: option.label,
    currentLevel: option.currentLevel,
    pathKey: option.pathKey,
    pathTitle: path.title,
    startingModuleIndex: option.startingModuleIndex,
    startingDay: option.startingDay,
  };
}

export function parseLearningProfileCookie(rawValue?: string | null): LearningProfile {
  if (!rawValue) {
    return buildLearningProfile("new_to_coding");
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    return buildLearningProfile(parsed.levelKey as LearningLevelKey);
  } catch {
    return buildLearningProfile("new_to_coding");
  }
}

export function serializeLearningProfileCookie(levelKey: LearningLevelKey) {
  return encodeURIComponent(JSON.stringify({ levelKey }));
}

export function getCurrentPathModule(profile: LearningProfile, completedLessonsCount = 0) {
  const path = LEARNING_PATHS[profile.pathKey];
  const startIndex = Math.max(profile.startingModuleIndex, 0);
  const progressOffset = Math.min(Math.floor(completedLessonsCount / 2), Math.max(path.modules.length - 1 - startIndex, 0));
  const moduleIndex = Math.min(startIndex + progressOffset, path.modules.length - 1);
  return path.modules[moduleIndex];
}

export function getCurrentDayPlan(profile: LearningProfile, completedLessonsCount = 0) {
  const currentPathModule = getCurrentPathModule(profile, completedLessonsCount);
  const dayIndex = Math.min(Math.floor(completedLessonsCount % Math.max(currentPathModule.dayPlans.length, 1)), currentPathModule.dayPlans.length - 1);
  return currentPathModule.dayPlans[Math.max(dayIndex, 0)];
}

export function getModuleStatus(
  profile: LearningProfile,
  moduleOrder: number,
  completedLessonsCount = 0,
): "Active" | "Completed" | "Locked" | "Upcoming" {
  const currentModule = getCurrentPathModule(profile, completedLessonsCount).order;

  if (moduleOrder < currentModule) return "Completed";
  if (moduleOrder === currentModule) return "Active";
  if (moduleOrder === currentModule + 1) return "Upcoming";
  return "Locked";
}

export function getInterviewQuestionForLesson(title: string) {
  for (const path of Object.values(LEARNING_PATHS)) {
    for (const moduleItem of path.modules) {
      for (const day of moduleItem.dayPlans) {
        if (day.lessonTitle.toLowerCase() === title.toLowerCase()) {
          return {
            question: day.interviewQuestion,
            answer: day.interviewAnswer,
            moduleTitle: moduleItem.title,
            pathTitle: path.title,
          };
        }
      }
    }
  }

  return {
    question: "What did you learn in this lesson?",
    answer: "Explain the main idea in simple words, describe when you would use it, and give one small example from your own code.",
    moduleTitle: "Interview Practice",
    pathTitle: "CodeNivra Learning Path",
  };
}

export function getSuggestedProjectSlug(projectStepTitle: string) {
  return findProjectSlug(projectStepTitle);
}


