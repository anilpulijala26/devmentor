import { ProjectDetails, getDetailsForProject } from "./projectDetailsData";

export interface ProjectComponent {
  name: string;
  desc: string;
}

export interface ProjectPhase {
  phase: string;
  desc: string;
}

export interface ProjectInterview {
  projectName: string;
  buildDesc: string;
  approachDesc: string;
  challengesDesc: string;
  performanceDesc: string;
  errorsDesc: string;
  structureDesc: string;
  productionImprovements: string[];
}

export interface Project {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  skillsCovered: string[];
  techStack: string[];
  whoShouldBuild: string;
  businessRequirement: string;
  features: string[];
  folderStructure: string;
  componentBreakdown: ProjectComponent[];
  apiContract: string;
  databaseSchema?: string;
  implementationPhases: ProjectPhase[];
  testingChecklist: string[];
  deploymentChecklist: string[];
  commonMistakes: string[];
  seniorNotes: string[];
  interviewExplanation: ProjectInterview;
  futureEnhancements: string[];
  details?: ProjectDetails;
}


export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    title: "Portfolio Website",
    level: "Beginner",
    duration: "1 - 2 Weeks",
    description: "Build an accessible, high-performance professional developer portfolio to showcase your project work, experience, and contact forms using clean semantic HTML and modular CSS variables.",
    skillsCovered: ["Semantic HTML5", "CSS Grid & Flexbox", "Web Accessibility (A11y)", "SEO & Performance Optimization"],
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript"],
    whoShouldBuild: "Aspiring web developers who need to master the fundamental building blocks of web markup, responsive design coordinates, and hosting pipelines.",
    businessRequirement: "Self-marketing is essential for developers. The portfolio must load under 1 second, pass Google lighthouse SEO scores of 100, be navigable by keyboard keys, and render a contact form without reloading the page.",
    features: [
      "Responsive header navigation containing mobile sandwich drawers.",
      "Hero sections with dynamic text typing animations.",
      "Semantic filterable projects grid highlighting active works.",
      "An accessible contact form utilizing fetch requests.",
      "Light/Dark theme toggle persisting states in localStorage."
    ],
    folderStructure: `portfolio/
├── index.html            # Main markup root
├── css/
│   ├── main.css          # Core layouts
│   └── variables.css     # Design tokens
├── js/
│   ├── app.js            # General scripts
│   └── theme.js          # Dark mode persist
└── assets/
    └── images/           # Compressed thumbnails`,
    componentBreakdown: [
      { name: "Header Navigation", desc: "Houses semantic <nav> block, accessibility focus loops, and mobile drawer toggles." },
      { name: "Projects Grid", desc: "Arranges cards using CSS Grid columns, adjusting column margins dynamically." },
      { name: "Contact Form", desc: "Captures inputs, validates types natively, and runs async fetch submittals." }
    ],
    apiContract: `POST /api/contact
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Project collaboration request."
}

Response (200 OK):
{
  "success": true,
  "message": "Message received."
}`,
    implementationPhases: [
      { phase: "Phase 1: Semantic Markup Setup", desc: "Code the basic HTML skeletons containing headers, mains, sections, and footers without CSS." },
      { phase: "Phase 2: Mobile-First CSS Variables", desc: "Configure variable colors and spacing scales. Apply mobile-first styling and grid properties." },
      { phase: "Phase 3: JavaScript Theme & Filter Logic", desc: "Write theme persistent mechanics and project card filtration loops." },
      { phase: "Phase 4: Async Form Submissions", desc: "Intercept form submissions, prevent page reloading, and fetch mock server endpoints." }
    ],
    testingChecklist: [
      "Verify Google Lighthouse SEO and Accessibility scores exceed 95.",
      "Ensure all interactive sections are reachable using Tab keys.",
      "Verify forms validate emails and reject empty text blocks.",
      "Confirm dark mode persists correctly when reloading."
    ],
    deploymentChecklist: [
      "Deploy on Netlify or Vercel static environments.",
      "Configure custom domain settings with secure SSL setups.",
      "Compress asset images to WebP formats."
    ],
    commonMistakes: [
      "Using <div> instead of semantic HTML5 landmark tags.",
      "Removing default browser focus outline rings without alternatives.",
      "Hardcoding static px values, breaking responsiveness."
    ],
    seniorNotes: [
      "Keep JavaScript lean to maximize PageSpeed scores.",
      "Provide visually clean alt texts on images."
    ],
    interviewExplanation: {
      projectName: "Personal Portfolio",
      buildDesc: "I created an accessible, high-performance static developer portfolio showcasing my work and contact entries.",
      approachDesc: "I chose pure semantic HTML5 landmarks and mobile-first CSS grids to guarantee high accessibility ratings and SEO visibility.",
      challengesDesc: "The core challenge was providing dark mode swaps without layout flicker. I resolved this by placing theme logic scripts inside the head tag.",
      performanceDesc: "I optimized load speeds by using next-gen image extensions (WebP) and minimizing CSS structures.",
      errorsDesc: "Form errors are managed by native browser validation APIs, blocking requests before network transits.",
      structureDesc: "I structured files by role: HTML holds layouts, CSS contains variables, and JS triggers local actions.",
      productionImprovements: [
        "Incorporate automated axe-core accessibility tests.",
        "Set up dynamic page analytics trackers."
      ]
    },
    futureEnhancements: [
      "Incorporate micro-interactions on layout grids.",
      "Add MDX-driven blog sections."
    ]
  },
  {
    slug: "blog-cms",
    title: "Blog CMS App",
    level: "Intermediate",
    duration: "3 - 4 Weeks",
    description: "Build a complete content management publishing system where authors write blogs inside rich text editors, manage categories, and upload thumbnails.",
    skillsCovered: ["Relational Database Schemas", "Dynamic Route Parameters", "Rich-Text Custom Editors", "API Body Validations"],
    techStack: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL"],
    whoShouldBuild: "Developers looking to transition from static interfaces to relational database structures, API routes, and user admin dashboards.",
    businessRequirement: "Content creators require interfaces to schedule, write, and index articles. The public blog must load instantly using static rendering, and the database must handle tag-to-post references.",
    features: [
      "Public Reader frontend with fast server-side renderings.",
      "Dynamic Routing paths indexing articles per unique slug.",
      "Markdown editor canvas with visual write/preview panels.",
      "Secure image storage integrations.",
      "Filter sidebars by post tags and categories."
    ],
    folderStructure: `blog-cms/
├── app/
│   ├── (public)/
│   │   ├── posts/[slug]/page.tsx   # Static post rendering
│   │   └── page.tsx                # Public catalog listing
│   └── admin/
│       ├── page.tsx                # Author dashboard
│       └── write/page.tsx          # MDX editor canvas
├── components/
│   ├── Editor.tsx                  # Markdown input block
│   └── PostCard.tsx                # Listing card
├── prisma/
│   └── schema.prisma               # DB models mapping
└── lib/
    └── db.ts                       # Prisma Client export`,
    componentBreakdown: [
      { name: "Editor Canvas", desc: "Rich text markdown compiler updating preview panes dynamically." },
      { name: "Public Catalog", desc: "Grid fetching and display lists using Next.js caching methods." },
      { name: "Dashboard Triage", desc: "List grid showing post draft controls and delete flags." }
    ],
    apiContract: `POST /api/posts
Request:
{
  "title": "React 19 Hooks",
  "slug": "react-19-hooks",
  "content": "# Markdown content...",
  "category": "frontend",
  "tags": ["react", "javascript"]
}

Response (201 Created):
{
  "success": true,
  "postId": "post_1002"
}`,
    databaseSchema: `model Post {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tags      Tag[]
}

model Tag {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]
}`,
    implementationPhases: [
      { phase: "Phase 1: Relational Schema Modeling", desc: "Define database models in Prisma and run database migrations." },
      { phase: "Phase 2: Next.js Layouts & Reader View", desc: "Code the listing grids and dynamic pages utilizing server-side fetches." },
      { phase: "Phase 3: Markdown Composer UI", desc: "Create controlled inputs updating raw text states into HTML renders." },
      { phase: "Phase 4: API Routes & Admin Panel", desc: "Write database mutations and validation rules." }
    ],
    testingChecklist: [
      "Ensure dynamic paths trigger 404 responses on invalid slugs.",
      "Verify tags database references update without orphan entries.",
      "Confirm inputs validate constraints before triggering database actions.",
      "Verify images load correctly from asset folders."
    ],
    deploymentChecklist: [
      "Deploy code to Vercel.",
      "Host database on Neon or Supabase Serverless PG grids.",
      "Verify connection pool settings run securely."
    ],
    commonMistakes: [
      "Not creating index constraints on post slug fields.",
      "Relying on database cascading deletes that wipe tags records improperly.",
      "Forgetting to validate dynamic route slugs."
    ],
    seniorNotes: [
      "Generate dynamic metadata titles in reader pages.",
      "Use static generation methods to reduce server loads."
    ],
    interviewExplanation: {
      projectName: "Blog CMS App",
      buildDesc: "I created a blog content manager featuring markdown editing UI and static public article rendering.",
      approachDesc: "I utilized Next.js App Router for layouts, Prisma ORM for type-safe database checks, and PostgreSQL to hold relations.",
      challengesDesc: "The core challenge was keeping public article loads under 300ms. I resolved this by pre-compiling pages statically on updates.",
      performanceDesc: "I minimized database connections by using cached pooling clients, and indexed slug lookups.",
      errorsDesc: "I implemented Next.js route boundaries to catch page-load errors, returning retry controls.",
      structureDesc: "I structured page files inside app, model definitions in Prisma, and logic queries inside lib folders.",
      productionImprovements: [
        "Incorporate full-text searching configurations.",
        "Add automated draft backups to local storage."
      ]
    },
    futureEnhancements: [
      "Integrate rich block drag-and-drop editors.",
      "Support page scheduling features."
    ]
  },
  {
    slug: "task-manager",
    title: "Task Management App",
    level: "Intermediate",
    duration: "2 - 3 Weeks",
    description: "Design a collaborative task management application featuring drag-and-drop kanban boards, task lists, prioritization controls, and filtered sorting columns.",
    skillsCovered: ["Drag-and-Drop UX Layouts", "Local Storage Operations", "Complex React State", "Responsive Grid Columns"],
    techStack: ["React", "TypeScript", "TailwindCSS", "Lucide Icons"],
    whoShouldBuild: "Intermediate React developers looking to master local state handling, coordinate dragging operations, and write fluid list UI updates.",
    businessRequirement: "Project managers require boards to track priorities. The app must enable drag-and-drop transitions between status columns, filter tasks by label, and persist updates automatically.",
    features: [
      "Kanban board with status columns (To Do, In Progress, Done).",
      "Dynamic modal forms to add and edit task metadata.",
      "Drag-and-drop task card reordering.",
      "Filter controls sorting boards by priority levels.",
      "Workspace stats counters tracking completed cards."
    ],
    folderStructure: `task-manager/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.tsx       # Board container
│   │   ├── KanbanColumn.tsx      # Column wrappers
│   │   ├── TaskCard.tsx          # Card elements
│   │   └── TaskModal.tsx         # Edit dialog
│   ├── hooks/
│   │   └── useTasks.ts           # State provider
│   ├── types/
│   │   └── index.ts              # Task interface
│   └── App.tsx
└── tsconfig.json`,
    componentBreakdown: [
      { name: "Kanban Board", desc: "Main page grid housing task columns, coordinating dragging states." },
      { name: "Task Card", desc: "Displays title, priority tag, due date, and registers drag events." },
      { name: "Task Modal", desc: "Form editor containing input fields, dropdown priorities, and validation checks." }
    ],
    apiContract: `GET /api/tasks
Response (200 OK):
{
  "tasks": [
    {
      "id": "task_1",
      "title": "Database Schema Setup",
      "priority": "high",
      "status": "todo"
    }
  ]
}`,
    implementationPhases: [
      { phase: "Phase 1: Basic Kanban Columns Layout", desc: "Construct static column grids displaying lists of mock tasks." },
      { phase: "Phase 2: Form Modals & State Mutations", desc: "Build task modal forms and state modifiers to append, edit, and delete entries." },
      { phase: "Phase 3: Drag and Drop Handlers", desc: "Integrate drag-and-drop logic using native HTML5 drag APIs or lightweight libraries." },
      { phase: "Phase 4: Filters & LocalStorage", desc: "Apply filter triggers and write state synchronizers to persist changes." }
    ],
    testingChecklist: [
      "Verify task cards shift between columns correctly when dragged.",
      "Verify search filter changes update matching list sizes immediately.",
      "Confirm form inputs validate fields and restrict empty submissions.",
      "Ensure tab navigation targets modals and close buttons."
    ],
    deploymentChecklist: [
      "Deploy on static hosting providers like Netlify.",
      "Configure source control hooks for CI/CD.",
      "Validate CSS build bundles output clean styling rules."
    ],
    commonMistakes: [
      "Using task index arrays as React keys, causing layout rendering bugs during column shifts.",
      "Mutating task arrays directly instead of returning new state copies.",
      "Forgetting to persist state changes on drops."
    ],
    seniorNotes: [
      "Enforce unique UUID keys on created cards.",
      "Debounce local storage updates to optimize write performance."
    ],
    interviewExplanation: {
      projectName: "Task Management App",
      buildDesc: "I created an interactive task Kanban board with drag-and-drop column sorting features.",
      approachDesc: "I utilized React controlled states to structure tasks data, and Tailwind CSS grid columns for fluid layout views.",
      challengesDesc: "The primary challenge was managing smooth drag-and-drop animations without layout shifts. I solved this by adding dragging status tracking in React state.",
      performanceDesc: "I optimized rendering loops by memoizing card components, preventing re-renders in unaffected columns.",
      errorsDesc: "I validated modal input elements using react form controls before mutating main task state arrays.",
      structureDesc: "I structured components logically: column containers house card elements, and customized hooks distribute board states.",
      productionImprovements: [
        "Integrate collaborative multiplayer frameworks like WebSockets.",
        "Add keyboard shortcut operations for power users."
      ]
    },
    futureEnhancements: [
      "Add calendar and timeline views.",
      "Implement multi-board directories."
    ]
  },
  {
    slug: "auth-system",
    title: "Authentication System",
    level: "Intermediate",
    duration: "2 - 3 Weeks",
    description: "Develop a secure client-server authentication system featuring login, signup, password hashing, JWT creation, dynamic role checks, and refresh tokens.",
    skillsCovered: ["Security Middleware", "JWT Tokens Lifecycle", "Password Hashing (bcrypt)", "HTTP-Only Cookie Management"],
    techStack: ["Node.js", "Express", "TypeScript", "JSONWebTokens", "PostgreSQL"],
    whoShouldBuild: "Backend and full-stack developers eager to master security pipelines, token lifecycles, and role-based route protection.",
    businessRequirement: "User data security is non-negotiable. The system must verify identities, store passwords securely using bcrypt hashing, issue JWT tokens stored in HttpOnly cookies, and block unauthorized endpoint access.",
    features: [
      "User Sign Up page with regex strength validation.",
      "Login page issuing JWT access and refresh tokens.",
      "Express authentication middleware checking headers and cookies.",
      "Dynamic Role-Based Access Control protecting admin panels.",
      "Secure token rotation and logout routes."
    ],
    folderStructure: `auth-system/
├── src/
│   ├── middlewares/
│   │   ├── auth.ts               # Token checks
│   │   └── role.ts               # Role filters
│   ├── controllers/
│   │   └── authController.ts     # Login/Signup logic
│   ├── routes/
│   │   └── authRoutes.ts         # Endpoint paths
│   └── app.ts
└── package.json`,
    componentBreakdown: [
      { name: "Auth Controller", desc: "Handles registration, password hashing, and user credential validation." },
      { name: "Token Handler", desc: "Generates access/refresh tokens and runs token validations." },
      { name: "Security Wall", desc: "Middlewares verifying token existence and filtering role permissions." }
    ],
    apiContract: `POST /api/auth/login
Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response (200 OK):
Cookie: token=<JWT_VALUE>; HttpOnly; Secure
{
  "success": true,
  "user": { "id": "u1", "role": "admin" }
}`,
    databaseSchema: `CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    implementationPhases: [
      { phase: "Phase 1: DB & Password Hashing Setup", desc: "Build users tables and write bcrypt helper utilities." },
      { phase: "Phase 2: JWT Issuance & Login Route", desc: "Code the login/signup controllers and token helpers." },
      { phase: "Phase 3: Cookie Authorization Middleware", desc: "Write verification middlewares protecting private routes." },
      { phase: "Phase 4: Role RBAC & Refresh Tokens", desc: "Implement token rotations and role filter blocks." }
    ],
    testingChecklist: [
      "Verify passwords are never stored in plain text in the database.",
      "Ensure invalid JWT tokens return 401/403 status codes.",
      "Verify refresh token routes issue new access codes.",
      "Confirm logout routes clear cookies."
    ],
    deploymentChecklist: [
      "Configure JWT secrets in environment variables.",
      "Set secure flags on cookies in production settings.",
      "Enable CORS validation headers."
    ],
    commonMistakes: [
      "Storing JWT tokens in localStorage, exposing them to XSS attacks.",
      "Using weak hashing algorithms (like MD5) instead of bcrypt.",
      "Hardcoding secret token keys."
    ],
    seniorNotes: [
      "Set short expiry times (15 mins) on access tokens.",
      "Enforce password strength validations."
    ],
    interviewExplanation: {
      projectName: "Authentication System",
      buildDesc: "I built a secure login portal using Express, JWT tokens, and bcrypt hashing utilities.",
      approachDesc: "I chose bcrypt for password safety, JWT for stateless sessions, and HttpOnly cookies to block XSS token extractions.",
      challengesDesc: "The core challenge was preventing session hijacking. I resolved this by separating short-lived access tokens from long-lived refresh tokens.",
      performanceDesc: "I optimized requests by verify signatures locally without database lookups.",
      errorsDesc: "I handled exceptions by returning standardized error codes, preventing user credential enumeration leaks.",
      structureDesc: "The code segregates routing paths from controllers, database calls, and authentication middlewares.",
      productionImprovements: [
        "Integrate rate-limiting protection.",
        "Add multi-factor authentication (MFA) features."
      ]
    },
    futureEnhancements: [
      "Support OAuth integrations (Google/GitHub).",
      "Add email verification steps."
    ]
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    level: "Intermediate",
    duration: "3 - 4 Weeks",
    description: "Create an interactive dashboard showing operational analytics telemetry, billing telemetry, mock user management cards, and dynamic charts.",
    skillsCovered: ["Data Visualization Libraries", "Asynchronous States", "URL Parameters Syncing", "Grid Layout Layouts"],
    techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Recharts"],
    whoShouldBuild: "Frontend developers seeking to master data visualization, complex UI layouts, URL state syncing, and rendering optimizations.",
    businessRequirement: "Operations teams require a console to analyze telemetry metrics. The interface must display clean charts, adapt to mobile viewports, and sync filter parameters with browser URLs.",
    features: [
      "Telemetry cards displaying metrics with percentage growth highlights.",
      "Interactive graphs showing visual analytics data.",
      "Filter panels updating URL query strings dynamically.",
      "User status tables with pagination controls.",
      "Responsive sidebar navigation with sliding drawer controls."
    ],
    folderStructure: `saas-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx               # Analytics view
│   │   └── layout.tsx             # Grid layout shell
│   └── page.tsx
├── components/
│   ├── charts/
│   │   └── area-chart.tsx         # Recharts wrappers
│   └── ui/
│       ├── stats-card.tsx         # Metric cards
│       └── data-table.tsx         # Grid table
└── lib/
    └── telemetry.ts               # Analytics data`,
    componentBreakdown: [
      { name: "Telemetry Cards Grid", desc: "Grid cards listing values, growth indicators, and Lucide icons." },
      { name: "Analytics Chart", desc: "Responsive area charts displaying logs data." },
      { name: "Telemetry Table", desc: "Data grid featuring search inputs, page tags, and sort links." }
    ],
    apiContract: `GET /api/telemetry?range=30d
Response (200 OK):
{
  "totalRevenue": 45231.89,
  "chartData": [
    { "date": "2026-06-01", "value": 1200 }
  ]
}`,
    implementationPhases: [
      { phase: "Phase 1: Wireframe Grid Layout", desc: "Build sidebar layouts and dashboard shells." },
      { phase: "Phase 2: Telemetry Metrics Cards", desc: "Design grid cards detailing growth rates." },
      { phase: "Phase 3: Chart Integration", desc: "Integrate area graphs using Recharts library components." },
      { phase: "Phase 4: Syncing Filters with URLs", desc: "Connect filters state to Next.js query parameter hooks." }
    ],
    testingChecklist: [
      "Verify charts scale cleanly when resizing windows.",
      "Ensure URL params persist states during refresh operations.",
      "Confirm table records slice correctly when shifting page index.",
      "Check contrast ratios on growth rate values."
    ],
    deploymentChecklist: [
      "Deploy on Vercel.",
      "Optimize Recharts libraries using dynamic imports.",
      "Ensure build outputs compile without TypeScript warnings."
    ],
    commonMistakes: [
      "Using static dimensions on charts, breaking mobile responsiveness.",
      "Duplicating filter states in both URL query params and local React state.",
      "Failing to memoize expensive table filters."
    ],
    seniorNotes: [
      "Lazy-load heavy charting packages to reduce initial load size.",
      "Validate filter inputs before updating query strings."
    ],
    interviewExplanation: {
      projectName: "SaaS Dashboard",
      buildDesc: "I created an interactive SaaS telemetry dashboard displaying charts and data tables.",
      approachDesc: "I used Next.js App Router for layouts, Tailwind CSS for grids, and Recharts for responsive SVG graphs.",
      challengesDesc: "The core challenge was keeping inputs responsive. I solved this by debouncing query updates and syncing filters with URL params.",
      performanceDesc: "I lazy-loaded Recharts libraries using next/dynamic with SSR disabled, reducing initial loads.",
      errorsDesc: "I handled fetch failures with local state fallback retry buttons.",
      structureDesc: "The layout segregates page route views from UI components, charting models, and static mock configurations.",
      productionImprovements: [
        "Configure E2E layout tests with Playwright.",
        "Add export-to-CSV options."
      ]
    },
    futureEnhancements: [
      "Add custom drag-and-drop widget layouts.",
      "Integrate WebSockets for live data feeds."
    ]
  },
  {
    slug: "ai-generator",
    title: "AI Content Generator",
    level: "Advanced",
    duration: "3 - 4 Weeks",
    description: "Build an AI-powered text and image generation dashboard that interfaces with LLM APIs, streams text completions, and displays image grids.",
    skillsCovered: ["OpenAI API Integrations", "SSE streaming UI", "Form Submissions", "Loading Indicators"],
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI / Vercel AI SDK"],
    whoShouldBuild: "Advanced frontend and full-stack developers eager to master streaming response APIs, handle LLM integrations, and build clean loading states.",
    businessRequirement: "Marketers require an AI assistant to generate copy. The application must stream LLM text completions in real-time, generate images using diffusion models, and display loading skeletons.",
    features: [
      "AI Prompt editor interface with settings (temperature, length).",
      "Text stream canvas showing real-time word rendering.",
      "Image generator producing responsive grids.",
      "Prompt library sidebar saving favorite templates.",
      "Progressive loading states and error notifications."
    ],
    folderStructure: `ai-generator/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # LLM streaming endpoint
│   │   └── image/route.ts         # Image generator endpoint
│   ├── page.tsx                   # Workspace panel
│   └── layout.tsx
├── components/
│   ├── ChatWindow.tsx             # Stream wrapper
│   └── ImageGrid.tsx              # Output cards
└── lib/
    └── ai.ts                      # AI config tools`,
    componentBreakdown: [
      { name: "Chat Window", desc: "Displays chat histories and streams active LLM responses." },
      { name: "Image Grid", desc: "Maps generated image outputs, rendering download links." },
      { name: "Prompt Settings", desc: "Form controls managing temperature inputs and size options." }
    ],
    apiContract: `POST /api/chat
Request:
{
  "prompt": "Write a landing page copy"
}

Response (200 OK):
Stream: event-stream data (text chunks)`,
    implementationPhases: [
      { phase: "Phase 1: API Keys & Route Setup", desc: "Configure environment credentials and write basic LLM route handlers." },
      { phase: "Phase 2: Stream UI & Hook Setup", desc: "Implement client hooks reading chunked server-sent streams." },
      { phase: "Phase 3: Image Generator Form", desc: "Build image generation forms, card grids, and download actions." },
      { phase: "Phase 4: History & Settings Sidebar", desc: "Integrate sidebar panels to save prompts and persist histories." }
    ],
    testingChecklist: [
      "Verify chat streams cancel cleanly when clicking 'Stop'.",
      "Verify image grids fall back to placeholder cards if generation errors occur.",
      "Ensure API key parameters are hidden on the client.",
      "Check keyboard focus paths on form inputs."
    ],
    deploymentChecklist: [
      "Configure Vercel API execution timeouts to match streaming limits.",
      "Secure API credentials using env parameters.",
      "Confirm initial script sizes compile within performance budgets."
    ],
    commonMistakes: [
      "Exposing private API keys to the client instead of routing calls through server endpoints.",
      "Not handling stream connection failures, leaving cards in infinite loading states.",
      "Forgetting to limit user inputs, leading to API quota exhaustion."
    ],
    seniorNotes: [
      "Verify prompt limits before triggering backend requests.",
      "Use streaming formats to reduce perceived latency."
    ],
    interviewExplanation: {
      projectName: "AI Content Generator",
      buildDesc: "I created an AI generation portal streaming text completions and rendering dynamic image grids.",
      approachDesc: "I used Next.js API Routes, the Vercel AI SDK to stream text chunks, and Tailwind CSS for mobile-first views.",
      challengesDesc: "The core challenge was keeping text rendering smooth as chunks loaded. I resolved this by using requestAnimationFrame state updates.",
      performanceDesc: "I optimized load speeds by lazy loading heavy image items and caching configurations.",
      errorsDesc: "I caught stream exceptions by using server-side error boundaries and client-side notifications.",
      structureDesc: "The code is organized into app route views, components, and server-side utilities.",
      productionImprovements: [
        "Integrate analytics tools to monitor token consumption rates.",
        "Add full-text history search features."
      ]
    },
    futureEnhancements: [
      "Support PDF document content imports.",
      "Add voice-to-text input features."
    ]
  },
  {
    slug: "file-uploader",
    title: "File Upload Manager",
    level: "Advanced",
    duration: "2 - 3 Weeks",
    description: "Build an interactive file manager featuring drag-and-drop dropzones, file type validation grids, size verification limits, and upload progress bars.",
    skillsCovered: ["Drag-and-Drop Event Hooks", "MIME Verification", "Upload Progress Telemetry", "S3 API Storage"],
    techStack: ["Next.js", "TypeScript", "Multer", "AWS S3 / Supabase Storage"],
    whoShouldBuild: "Full-stack developers aiming to master file validation, stream uploads, storage integrations, and progress telemetries.",
    businessRequirement: "Applications require file upload managers. The system must accept drag-and-drop actions, reject files exceeding 5MB or invalid MIME formats, and display real-time upload progress bars.",
    features: [
      "Drag-and-Drop dropzone container with hover borders.",
      "Validation list rejecting invalid formats before uploads start.",
      "Upload progress bar showing percentages.",
      "Dashboard gallery displaying uploaded files with delete controls.",
      "Accessible inputs supporting file selections."
    ],
    folderStructure: `file-uploader/
├── app/
│   ├── api/
│   │   └── upload/route.ts        # Multipart handler
│   ├── page.tsx                   # Uploader layout
│   └── layout.tsx
├── components/
│   ├── Dropzone.tsx               # Drag event container
│   └── FileList.tsx               # Upload status list
└── lib/
    └── s3.ts                      # Storage configuration`,
    componentBreakdown: [
      { name: "Dropzone Panel", desc: "Handles dragging events, validations, and input references." },
      { name: "File Status Card", desc: "Displays progress sliders and cancel actions." },
      { name: "Dashboard Gallery", desc: "Grids listing uploaded documents and delete triggers." }
    ],
    apiContract: `POST /api/upload
Request:
Multipart Form-Data: { "file": <BINARY_DATA> }

Response (201 Created):
{
  "success": true,
  "fileUrl": "https://s3.amazonaws.com/uploads/doc.pdf"
}`,
    implementationPhases: [
      { phase: "Phase 1: Drag-and-Drop Zone UI", desc: "Code the dropzone container, binding dragging state variables." },
      { phase: "Phase 2: MIME & Size Validation", desc: "Write helper functions validating file properties." },
      { phase: "Phase 3: Progress State Hook", desc: "Implement axios upload progress tracking to update progress bars." },
      { phase: "Phase 4: S3 Backend Upload Flow", desc: "Configure S3 clients and write API route multipart parsers." }
    ],
    testingChecklist: [
      "Verify drag actions highlight border zones correctly.",
      "Verify upload progress percentages update in real-time.",
      "Ensure uploads exceeding 5MB or invalid formats are rejected.",
      "Verify files are removed from S3 when deleted."
    ],
    deploymentChecklist: [
      "Configure S3 bucket policy parameters.",
      "Secure credentials using environment variables.",
      "Set maximum request payload sizes in server setups."
    ],
    commonMistakes: [
      "Validating files only on the client, leaving the backend unprotected.",
      "Not cleaning up temporary local uploads, filling server disks.",
      "Forgetting to set secure access permissions on public folders."
    ],
    seniorNotes: [
      "Use pre-signed URLs to upload files directly from the client, bypassing intermediate server processes.",
      "Verify files exist before executing delete operations."
    ],
    interviewExplanation: {
      projectName: "File Upload Manager",
      buildDesc: "I built a drag-and-drop file manager validating sizes/MIME types and streaming uploads to S3.",
      approachDesc: "I utilized Next.js API Routes, Multer middleware on Express, and AWS S3 API integrations.",
      challengesDesc: "The core challenge was keeping the page responsive during large uploads. I resolved this by streaming uploads using S3 pre-signed URLs.",
      performanceDesc: "I bypassed server network bottlenecks by uploading files directly from client browsers to S3 buckets.",
      errorsDesc: "I caught upload errors with local state fallbacks, rendering retry options.",
      structureDesc: "The code segregates dropzone components from upload hooks and S3 server utilities.",
      productionImprovements: [
        "Add antivirus scanning checks on files.",
        "Implement automatic image compression rules."
      ]
    },
    futureEnhancements: [
      "Add folder organization directories.",
      "Support batch multi-file uploads."
    ]
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    level: "Advanced",
    duration: "4 - 5 Weeks",
    description: "Design an enterprise-grade analytics dashboard that displays complex telemetry metrics, visualizes data in graphs, and integrates with logging tools.",
    skillsCovered: ["Advanced Telemetry Visualization", "Dynamic Querying", "Logging Tool Integration", "Performance Profiling"],
    techStack: ["Next.js", "TypeScript", "Recharts", "Sentry", "TailwindCSS"],
    whoShouldBuild: "Advanced frontend and full-stack developers eager to master complex data dashboards, telemetry systems, and performance tuning.",
    businessRequirement: "Enterprise operations require analytics grids. The application must display real-time charts, validate custom date ranges, and integrate with error monitoring tools.",
    features: [
      "Analytics cards displaying core performance stats.",
      "Interactive graphs showing visual data logs.",
      "Date range filter panel updating browser query params.",
      "User activity table with sorting and pagination controls.",
      "Collapsible drawer navigation with responsive layouts."
    ],
    folderStructure: `analytics-dashboard/
├── app/
│   ├── analytics/
│   │   ├── page.tsx               # Analytics view
│   │   └── layout.tsx             # Grid layout shell
│   └── page.tsx
├── components/
│   ├── charts/
│   │   └── area-chart.tsx         # Recharts wrappers
│   └── ui/
│       ├── stats-card.tsx         # Metric cards
│       └── data-table.tsx         # Grid table
└── lib/
    └── analytics.ts               # Analytics data`,
    componentBreakdown: [
      { name: "Analytics Cards Grid", desc: "Grid cards listing values, growth metrics, and icons." },
      { name: "Telemetry Chart", desc: "Responsive area charts displaying logs data." },
      { name: "Data Table", desc: "Data grid featuring search inputs, page selectors, and sorting." }
    ],
    apiContract: `GET /api/analytics?range=30d
Response (200 OK):
{
  "totalVisitors": 125432,
  "chartData": [
    { "date": "2026-06-01", "value": 1500 }
  ]
}`,
    implementationPhases: [
      { phase: "Phase 1: Wireframe Grid Layout", desc: "Build sidebar layouts and dashboard page shells." },
      { phase: "Phase 2: Analytics Cards", desc: "Design cards detailing metrics and growth rates." },
      { phase: "Phase 3: Chart Integration", desc: "Integrate area graphs using Recharts library components." },
      { phase: "Phase 4: Syncing Filters with URLs", desc: "Connect filters state to Next.js query parameter hooks." }
    ],
    testingChecklist: [
      "Verify charts scale correctly when resizing windows.",
      "Ensure URL parameters persist states during refresh operations.",
      "Confirm table records slice correctly when shifting page indexes.",
      "Check contrast ratios on growth values."
    ],
    deploymentChecklist: [
      "Deploy on Vercel.",
      "Optimize Recharts libraries using dynamic imports.",
      "Ensure builds compile without TypeScript warnings."
    ],
    commonMistakes: [
      "Using static dimensions on charts, breaking responsiveness.",
      "Duplicating filter states in both URL query params and local React state.",
      "Failing to memoize table filters."
    ],
    seniorNotes: [
      "Lazy-load heavy charting packages to reduce initial load size.",
      "Validate filter inputs before updating query strings."
    ],
    interviewExplanation: {
      projectName: "Analytics Dashboard",
      buildDesc: "I created an interactive enterprise analytics dashboard displaying charts and tables.",
      approachDesc: "I used Next.js App Router for layouts, Tailwind CSS for grids, and Recharts for responsive SVG graphs.",
      challengesDesc: "The core challenge was keeping inputs responsive. I solved this by debouncing query updates and syncing filters with URL params.",
      performanceDesc: "I lazy-loaded Recharts libraries using next/dynamic with SSR disabled, reducing initial loads.",
      errorsDesc: "I handled fetch failures with local state fallback retry buttons.",
      structureDesc: "The layout segregates page views from components, charts, and static mock configurations.",
      productionImprovements: [
        "Configure E2E layout tests with Playwright.",
        "Add export-to-CSV options."
      ]
    },
    futureEnhancements: [
      "Add custom drag-and-drop widget layouts.",
      "Integrate WebSockets for live data feeds."
    ]
  },
  {
    slug: "express-postgres-api",
    title: "REST API with Express and PostgreSQL",
    level: "Intermediate",
    duration: "2 Weeks",
    description: "Develop a secure, high-performance REST API with Express, Node.js, and PostgreSQL database queries.",
    skillsCovered: ["Express Routing", "PostgreSQL Queries", "REST Principles", "Connection Pooling"],
    techStack: ["Node.js", "Express", "pg", "PostgreSQL"],
    whoShouldBuild: "Developers seeking to master direct database access, connection pools, and backend routing architectures.",
    businessRequirement: "Create a stable and scalable API endpoint that connects directly to a PostgreSQL database cluster and manages records safely.",
    features: [
      "Modular database connection pool configurations.",
      "RESTful CRUD controllers routing requests.",
      "Parameterized database queries protecting against SQL injections.",
      "Global error catching middlewares returning clean JSON error bodies."
    ],
    folderStructure: `express-postgres-api/
├── db/
│   └── pool.js           # DB connection configs
├── controllers/
│   └── trackController.js# CRUD logic
├── routes/
│   └── trackRoutes.js    # Routes endpoints
└── app.js                # Core app entry`,
    componentBreakdown: [
      { name: "Database Pool", desc: "Manages multiple client database connection requests securely." },
      { name: "CRUD Controller", desc: "Directly runs SQL query strings matching dynamic parameters." }
    ],
    apiContract: `GET /api/tracks
Response (200 OK):
[
  { "id": 1, "name": "Web Foundations" }
]`,
    implementationPhases: [
      { phase: "Phase 1: DB setup", desc: "Install pg, establish connections, and create tables." },
      { phase: "Phase 2: Routes config", desc: "Design Express routes and controllers." }
    ],
    testingChecklist: [
      "Verify connection pool closes properly.",
      "Confirm SQL query inputs are sanitized."
    ],
    deploymentChecklist: [
      "Load database URL strings from secure environment configurations."
    ],
    commonMistakes: [
      "Hardcoding database connection secrets.",
      "Opening fresh connections on each query, crashing the server."
    ],
    seniorNotes: [
      "Use pg-pool to reuse connection threads and minimize overhead."
    ],
    interviewExplanation: {
      projectName: "REST API with Express and PostgreSQL",
      buildDesc: "I built a REST API using Express and PostgreSQL to manage tracks.",
      approachDesc: "I chose direct SQL mapping via pg pools to maintain high database speed and keep dependencies light.",
      challengesDesc: "Connection drops was the main challenge. I resolved it by configuring reconnection retries on pools.",
      performanceDesc: "Optimized response times by indexing lookup columns.",
      errorsDesc: "Handled SQL errors with custom exceptions.",
      structureDesc: "Separated routes, controllers, and pool services.",
      productionImprovements: [
        "Migrate to Prisma ORM."
      ]
    },
    futureEnhancements: [
      "Add schema migrations workflows."
    ]
  },
  {
    slug: "rbac-dashboard",
    title: "Role-Based Access Control Dashboard",
    level: "Advanced",
    duration: "3 Weeks",
    description: "Build an administration panel showing users telemetry, allowing role changes (admin, editor, user) and enforcing route validations.",
    skillsCovered: ["RBAC Middleware", "React Context Auth", "API Guard Rails", "Secure Sessions"],
    techStack: ["Next.js", "Express", "JWT", "PostgreSQL"],
    whoShouldBuild: "Developers wanting to master permission boundaries and administrative interfaces.",
    businessRequirement: "Administrative panels require role guards. The application must enforce boundaries on both front and backends.",
    features: [
      "Login gates mapping users to specific roles.",
      "Dynamic sidebars showing options matching roles.",
      "Express middlewares validating role credentials on APIs.",
      "Audit log tracker recording dashboard actions."
    ],
    folderStructure: `rbac-dashboard/
├── middlewares/
│   └── checkRole.ts       # RBAC filter checks
├── components/
│   └── Sidebar.tsx        # Dynamic role menu
└── pages/
    └── admin.tsx          # Protected admin UI`,
    componentBreakdown: [
      { name: "RBAC Guard", desc: "Middleware checking user role scopes." },
      { name: "Sidebar Menu", desc: "React component filtering menu links by user role." }
    ],
    apiContract: `POST /api/users/role
Request: { "userId": "u1", "role": "admin" }
Response (200 OK): { "success": true }`,
    implementationPhases: [
      { phase: "Phase 1: Session guards", desc: "Configure JWT role decoders." },
      { phase: "Phase 2: UI filters", desc: "Filter React menu views." }
    ],
    testingChecklist: [
      "Rejects unauthorised users from accessing admin routes.",
      "Allows admins to modify user permissions."
    ],
    deploymentChecklist: [
      "Map permission variables in secure cookies."
    ],
    commonMistakes: [
      "Relying only on frontend UI hiding, leaving backend APIs open."
    ],
    seniorNotes: [
      "Always validate roles on every backend request, regardless of client UI state."
    ],
    interviewExplanation: {
      projectName: "Role-Based Access Control Dashboard",
      buildDesc: "I created an RBAC panel checking permissions dynamically.",
      approachDesc: "I wrote Express auth middlewares inspecting JWT payloads, and mapped roles on React Context providers.",
      challengesDesc: "Preventing token tampering. I solved this by signing roles inside encrypted JWT claims.",
      performanceDesc: "Used memory-cached token checks to reduce DB calls.",
      errorsDesc: "Returned 403 Forbidden for insufficient permissions.",
      structureDesc: "Divided components by auth layers and view cards.",
      productionImprovements: [
        "Support multi-factor auth (MFA)."
      ]
    },
    futureEnhancements: [
      "Integrate OAuth providers."
    ]
  },
  {
    slug: "blog-cms-backend",
    title: "Blog CMS Backend with Prisma",
    level: "Intermediate",
    duration: "2 Weeks",
    description: "Configure a content management API for blogs, handling posts, categories, and tags using Prisma ORM.",
    skillsCovered: ["Prisma Schema", "Relational Mapping", "Query Filtering", "Seeding Data"],
    techStack: ["Node.js", "Prisma", "PostgreSQL", "Express"],
    whoShouldBuild: "Developers wanting to master relational database design, ORMs, and query optimizations.",
    businessRequirement: "Create a blog API matching standard schemas: Category has many Posts, Posts have many Tags.",
    features: [
      "Prisma schema modeling models and relations.",
      "Prisma seed files to populate the database.",
      "Filtered query fetches loading posts by category or tag.",
      "Rich API endpoints managing posts, draft status, and categories."
    ],
    folderStructure: `blog-cms-backend/
├── prisma/
│   ├── schema.prisma      # Model boundaries
│   └── seed.ts            # Seeding scripts
├── controllers/
│   └── postController.ts  # Prisma queries
└── app.ts`,
    componentBreakdown: [
      { name: "Prisma client", desc: "Handles relational mapping queries and query builders." },
      { name: "Blog Controller", desc: "Routes client parameters to Prisma select queries." }
    ],
    apiContract: `GET /api/posts?category=tech
Response (200 OK):
[
  { "id": 1, "title": "Prisma Basics", "category": "tech" }
]`,
    implementationPhases: [
      { phase: "Phase 1: Prisma setup", desc: "Write schema models and run migrations." },
      { phase: "Phase 2: CRUD routes", desc: "Build Express routes using Prisma client queries." }
    ],
    testingChecklist: [
      "Confirm prisma seed commands load mock data.",
      "Verify query includes fetch relational models."
    ],
    deploymentChecklist: [
      "Run prisma migration deployments in build pipelines."
    ],
    commonMistakes: [
      "Fetching all records without includes, generating N+1 query patterns."
    ],
    seniorNotes: [
      "Always query selectively using select blocks instead of returning entire database rows."
    ],
    interviewExplanation: {
      projectName: "Blog CMS Backend with Prisma",
      buildDesc: "I built a blog API managing relational assets using Prisma ORM.",
      approachDesc: "I chose Prisma for its strong TypeScript safety and auto-generated migration client tools.",
      challengesDesc: "Mitigating N+1 queries. I resolved this by specifying select blocks and include options on prisma calls.",
      performanceDesc: "Added index rules on category lookups.",
      errorsDesc: "Caught Prisma exceptions returning clean validation messages.",
      structureDesc: "Separated schema definitions, seeds, and routing controllers.",
      productionImprovements: [
        "Integrate Redis caching."
      ]
    },
    futureEnhancements: [
      "Add post views analytics."
    ]
  },
  {
    slug: "ecommerce-backend-api",
    title: "E-Commerce Backend API",
    level: "Advanced",
    duration: "4 Weeks",
    description: "Build an e-commerce API managing products, shopping carts, and order checkout transactional pipelines.",
    skillsCovered: ["Transaction blocks", "Concurrency Management", "Payment Webhooks", "Schema Modelling"],
    techStack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Stripe"],
    whoShouldBuild: "Developers seeking experience with payment workflows and database transactions.",
    businessRequirement: "E-commerce orders require transaction safeguards. Order processing must deduct inventory safely and log invoice actions.",
    features: [
      "Prisma transaction blocks processing orders.",
      "Stripe payment session initialization endpoints.",
      "Webhook route handling payment status callbacks.",
      "Inventory deduction check routines preventing oversells."
    ],
    folderStructure: `ecommerce-api/
├── services/
│   └── stripe.ts          # Payment service
├── routes/
│   └── checkout.ts        # Transaction path
└── prisma/
    └── schema.prisma      # Models`,
    componentBreakdown: [
      { name: "Transaction Service", desc: "Wraps DB commands in transactional rollbacks." },
      { name: "Stripe Webhook", desc: "Receives payment event notifications." }
    ],
    apiContract: `POST /api/checkout
Request: { "cartId": 12, "token": "stripe_tok" }
Response (201 Created): { "orderId": 142, "paid": true }`,
    implementationPhases: [
      { phase: "Phase 1: Stripe logic", desc: "Create Stripe accounts and connect APIs." },
      { phase: "Phase 2: Transactions", desc: "Write database routines locking inventory." }
    ],
    testingChecklist: [
      "Verify failed database queries trigger rollbacks.",
      "Ensure webhooks process events securely."
    ],
    deploymentChecklist: [
      "Set Stripe API keys and webhook signing secrets."
    ],
    commonMistakes: [
      "Running database checks sequentially instead of inside transaction scopes, leading to oversells."
    ],
    seniorNotes: [
      "Use transaction locking or check constraints to block negative balances and inventory levels."
    ],
    interviewExplanation: {
      projectName: "E-Commerce Backend API",
      buildDesc: "I created an e-commerce checkout API integrating Stripe payments.",
      approachDesc: "I used Prisma transactional blocks to guarantee database consistency on inventory deducts.",
      challengesDesc: "Avoiding payment double-charges. I resolved this by enforcing idempotency keys on payment operations.",
      performanceDesc: "Indexed product SKU codes.",
      errorsDesc: "Handled Stripe failures returning transaction alerts.",
      structureDesc: "Separated checkout routes, database seeds, and payment wrappers.",
      productionImprovements: [
        "Add cache rules on product grids."
      ]
    },
    futureEnhancements: [
      "Support multiple currency listings."
    ]
  },
  {
    slug: "notification-email-service",
    title: "Notification and Email Service",
    level: "Intermediate",
    duration: "2 Weeks",
    description: "Build an email and notification service that queues notification alerts and dispatches emails using nodemailer and Redis queues.",
    skillsCovered: ["Redis Queues", "SMTP Transports", "Background Workers", "Rate Limiting"],
    techStack: ["Node.js", "Redis", "BullMQ", "Nodemailer"],
    whoShouldBuild: "Developers wanting to master async task queues, background workers, and Redis integration.",
    businessRequirement: "Heavy email dispatches block server resources. Asynchronously queue messages to keep web servers fast.",
    features: [
      "Redis task queue managing notification requests.",
      "Nodemailer workers processing and sending SMTP messages.",
      "Rate-limiter filters on email dispatches.",
      "Dynamic email templates parsing variables."
    ],
    folderStructure: `notification-service/
├── queues/
│   └── emailQueue.js     # Queue setup
├── workers/
│   └── emailWorker.js    # Worker code
└── templates/
    └── welcome.html      # HTML Mail template`,
    componentBreakdown: [
      { name: "Mail Queue", desc: "Pushes message parameters to Redis." },
      { name: "Email Worker", desc: "Pulls and dispatches emails via Nodemailer." }
    ],
    apiContract: `POST /api/notify
Request: { "email": "user@example.com", "type": "welcome" }
Response (202 Accepted): { "queued": true }`,
    implementationPhases: [
      { phase: "Phase 1: Redis setup", desc: "Connect Redis and initialize BullMQ." },
      { phase: "Phase 2: Workers config", desc: "Write Nodemailer SMTP dispatch handlers." }
    ],
    testingChecklist: [
      "Ensure workers process queued emails asynchronously.",
      "Verify failed emails retry automatically."
    ],
    deploymentChecklist: [
      "Configure Redis connection credentials."
    ],
    commonMistakes: [
      "Sending emails synchronously inside route handlers, slowing HTTP request speeds."
    ],
    seniorNotes: [
      "Use background worker queues to offload heavy tasks from server event loops."
    ],
    interviewExplanation: {
      projectName: "Notification and Email Service",
      buildDesc: "I built an async email notifier using Redis and BullMQ.",
      approachDesc: "I offloaded email dispatches to a Redis queue processed by isolated background workers, protecting HTTP thread pools.",
      challengesDesc: "Handling SMTP timeouts. I resolved this by setting up automated retries with exponential backoffs.",
      performanceDesc: "Workers scale dynamically to process spikes in queue sizes.",
      errorsDesc: "Caught worker errors, placing failed tasks in retry bins.",
      structureDesc: "Separated task queues from Nodemailer worker implementations.",
      productionImprovements: [
        "Integrate SendGrid or AWS SES."
      ]
    },
    futureEnhancements: [
      "Add push notification bindings."
    ]
  },
  {
    slug: "dockerized-fullstack",
    title: "Dockerized Full-Stack App",
    level: "Advanced",
    duration: "3 Weeks",
    description: "Containerize a React client application and Node.js backend server, linking them with a PostgreSQL database container using Docker Compose.",
    skillsCovered: ["Multi-stage Dockerfiles", "Docker Compose Orchestration", "Networking & Volumes", "Secrets Mapping"],
    techStack: ["Docker", "Docker Compose", "Next.js", "Express", "PostgreSQL"],
    whoShouldBuild: "Full-stack developers and DevOps engineers aiming to master containerized packaging, local development configurations, and deployment strategies.",
    businessRequirement: "Local environment differences cause deployment bugs. Containerize applications to run the exact same setup in development and staging/production.",
    features: [
      "Multi-stage Dockerfiles compiling build steps and outputting tiny packages.",
      "Docker Compose files launching React, Node, and PostgreSQL instances.",
      "Named data volumes maintaining persistent database records across container restarts.",
      "Container networks linking frontend and backend hosts securely."
    ],
    folderStructure: `dockerized-app/
├── client/
│   └── Dockerfile         # Multi-stage client
├── server/
│   └── Dockerfile         # Multi-stage backend
├── docker-compose.yml     # Container link orchestrator
└── .env                   # Environment variables`,
    componentBreakdown: [
      { name: "Client container", desc: "Serves static bundles using lightweight servers." },
      { name: "Server container", desc: "Runs production-ready Node.js Express APIs." },
      { name: "Database container", desc: "Launches persistent PostgreSQL databases." }
    ],
    apiContract: `N/A (Deployment Orchestration Project)`,
    implementationPhases: [
      { phase: "Phase 1: Write Dockerfiles", desc: "Write multi-stage Dockerfiles for client and server services." },
      { phase: "Phase 2: Docker Compose", desc: "Configure compose files with networks, ports, and databases." }
    ],
    testingChecklist: [
      "Ensure docker-compose up launches all containers cleanly.",
      "Verify data volumes persist database records after shutdowns."
    ],
    deploymentChecklist: [
      "Run container builds in staging pipelines."
    ],
    commonMistakes: [
      "Copying raw node_modules into Docker images, bloating size.",
      "Failing to use non-root user credentials in runtime containers."
    ],
    seniorNotes: [
      "Use alpine images and multi-stage builds to keep final container images under 100MB."
    ],
    interviewExplanation: {
      projectName: "Dockerized Full-Stack App",
      buildDesc: "I containerized a full-stack Next.js and Express app using Docker Compose.",
      approachDesc: "I chose multi-stage builds to compile static files in builder layers, copying only release code to final runner environments.",
      challengesDesc: "Establishing database startup order. I solved this by configuring health checks and wait scripts.",
      performanceDesc: "Reduced image sizes by over 75% using alpine bases.",
      errorsDesc: "Logged errors directly to stdout for container logs tracking.",
      structureDesc: "Separated workspace files, frontends, and compose configurations.",
      productionImprovements: [
        "Deploy to Kubernetes clusters."
      ]
    },
    futureEnhancements: [
      "Integrate local Redis caching."
    ]
  },
  {
    slug: "cloud-deployment",
    title: "AWS/Azure Deployment Project",
    level: "Advanced",
    duration: "3 Weeks",
    description: "Deploy a full-stack containerized application to AWS EC2/RDS or Azure App Services, utilizing environment vaults, domain mapping, and SSL checks.",
    skillsCovered: ["AWS RDS & EC2 Setup", "Azure Static Web Apps", "Build Pipelines", "Secret Vault Management"],
    techStack: ["AWS S3/EC2/RDS", "Azure Key Vault", "Git", "GitHub Actions"],
    whoShouldBuild: "Engineers wanting to master professional hosting environments, DevOps, and secrets management.",
    businessRequirement: "SaaS projects require scalable cloud architectures. Set up secure, monitored hosting instances with SSL mappings.",
    features: [
      "AWS RDS PostgreSQL instance setups.",
      "AWS EC2 virtual machines hosting backend services.",
      "Azure Static Web Apps hosting frontend clients.",
      "GitHub Actions workflows automating code transfers."
    ],
    folderStructure: `deployment-project/
├── .github/
│   └── workflows/
│       └── deploy.yml     # Actions pipeline
├── scripts/
│   └── provision-db.sh    # RDS Provisioning
└── readme.md              # Architectural outlines`,
    componentBreakdown: [
      { name: "Staging Pipeline", desc: "Automates linting, building, and deploying." },
      { name: "Cloud Server", desc: "Hosts backend and handles database pools." }
    ],
    apiContract: `N/A (Cloud Architecture Project)`,
    implementationPhases: [
      { phase: "Phase 1: Database hosting", desc: "Configure managed RDS PostgreSQL instances." },
      { phase: "Phase 2: Compute setup", desc: "Initialize EC2 containers and deploy Express services." }
    ],
    testingChecklist: [
      "Verify SSL certs map correctly to domains.",
      "Ensure EC2 cannot connect to RDS without authorization."
    ],
    deploymentChecklist: [
      "Add secrets to GitHub Action secrets configuration."
    ],
    commonMistakes: [
      "Opening RDS database ports to 0.0.0.0, exposing databases to the public internet.",
      "Placing secrets and keys in git repositories."
    ],
    seniorNotes: [
      "Always host databases in private VPC subnets, allowing connections only from EC2 security groups."
    ],
    interviewExplanation: {
      projectName: "AWS/Azure Deployment Project",
      buildDesc: "I deployed a full-stack app on AWS and Azure cloud architectures.",
      approachDesc: "I used AWS RDS for database hosting and EC2 for API hosting, configuring network security groups to protect database connections.",
      challengesDesc: "Syncing deployment secrets securely. I resolved this by mapping variables inside GitHub Secrets.",
      performanceDesc: "Utilized CloudFront CDN to serve static client files.",
      errorsDesc: "Mapped server diagnostics logs into CloudWatch.",
      structureDesc: "Separated deployment workflows, shells scripts, and documentation.",
      productionImprovements: [
        "Implement Infrastructure as Code (IaC) with Terraform."
      ]
    },
    futureEnhancements: [
      "Configure auto-scaling groups."
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  const base = projects.find((p) => p.slug === slug);
  if (!base) return undefined;
  return {
    ...base,
    details: getDetailsForProject(slug, base)
  };
}
export function getAllProjects(): Project[] {
  return projects;
}
export function getProjectsByLevel(level: "Beginner" | "Intermediate" | "Advanced"): Project[] {
  return projects.filter((p) => p.level === level);
}


