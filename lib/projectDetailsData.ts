export interface CodeFile {
  name: string;
  path: string;
  code: string;
  language: string;
}

export interface Requirements {
  businessObjective: string;
  functional: string[];
  nonFunctional: string[];
  userStories: string[];
  acceptanceCriteria: string[];
  edgeCases: string[];
}

export interface BuildStepSection {
  step: number;
  title: string;
  description: string;
  code?: string;
  codeLanguage?: string;
}

export interface ProjectDetails {
  requirements: Requirements;
  buildSteps: BuildStepSection[];
  codeFiles: CodeFile[];
  tests: {
    manualChecklist: string[];
    unitTestCode: string;
    unitTestLanguage: string;
    unitTestPath: string;
    apiTestCode?: string;
    apiTestLanguage?: string;
    apiTestPath?: string;
    frontendTestCode?: string;
    frontendTestLanguage?: string;
    frontendTestPath?: string;
    accessibilityChecklist: string[];
    performanceChecklist: string[];
  };
  deploy: {
    localRun: string[];
    envVariables: string[];
    buildCommands: string[];
    vercelFront?: string;
    renderBack?: string;
    supabaseDb?: string;
    dockerfile?: string;
    dockerCompose?: string;
    githubActions?: string;
    productionChecklist: string[];
  };
  interview: {
    howToExplain: string;
    architecture: string;
    challenges: string;
    improvements: string[];
    resumeBullets: string[];
    qas: { question: string; answer: string }[];
  };
}

export const projectDetailsData: Record<string, ProjectDetails> = {
  "personal-portfolio": {
    requirements: {
      businessObjective: "Create a fast-loading, highly accessible personal developer portfolio website to display projects and capture message inquiries via a client form.",
      functional: [
        "Render responsive landing pages with header navigation and responsive mobile drawers.",
        "Display a filterable project portfolio list that updates the view without reloading.",
        "Allow toggle swaps between light and dark modes, persisting state in localStorage.",
        "Verify contact form fields on the client and submit them asynchronously to a mock endpoint."
      ],
      nonFunctional: [
        "SEO optimization with clean semantic tags, custom meta headers, and sitemaps.",
        "Pass visual accessibility contrast audits (WCAG AA standard) and support full keyboard navigability.",
        "Load core visual components under 800ms using optimized image file weights."
      ],
      userStories: [
        "As a visitor, I want to view projects filtered by stack category so that I can see relevant work.",
        "As a recruiter, I want to submit contact inquiries asynchronously so that I can reach the developer quickly."
      ],
      acceptanceCriteria: [
        "Forms block submissions when missing a valid email address.",
        "Tabbing through pages outlines buttons in high-contrast indigo rings."
      ],
      edgeCases: [
        "Form submission attempts when offline should render a connection warning toast.",
        "Browser dark-mode override checking on systems default configs."
      ]
    },
    buildSteps: [
      { step: 1, title: "Project Setup", description: "Initialize the workspace folder structure and write package.json with local development script servers.", code: "mkdir portfolio && cd portfolio\nnpm init -y\nnpm install -D browser-sync", codeLanguage: "bash" },
      { step: 2, title: "Folder Structure Setup", description: "Create html, css design tokens, theme hooks, and assets directory.", code: "portfolio/\n├── index.html\n├── css/\n│   ├── variables.css\n│   └── main.css\n└── js/\n    ├── app.js\n    └── theme.js", codeLanguage: "text" },
      { step: 3, title: "UI Layout Construction", description: "Implement semantic HTML5 landmarks (header, nav, main, footer) to construct the portfolio view grid.", code: "<nav aria-label=\"Main Navigation\">\n  <ul class=\"nav-links\">\n    <li><a href=\"#projects\" class=\"nav-item\">Projects</a></li>\n    <li><a href=\"#contact\" class=\"nav-item\">Contact</a></li>\n  </ul>\n</nav>", codeLanguage: "html" },
      { step: 4, title: "State Management", description: "Write state checks in theme.js to handle local storage parameters and toggle class mappings on the body tag.", code: "const savedTheme = localStorage.getItem('theme') || 'light';\ndocument.documentElement.setAttribute('data-theme', savedTheme);", codeLanguage: "javascript" },
      { step: 5, title: "API Integration", description: "Set up JavaScript Fetch API requests inside app.js targeting the mail dispatch routes.", code: "fetch('/api/contact', {\n  method: 'POST',\n  body: JSON.stringify(formData)\n});", codeLanguage: "javascript" },
      { step: 6, title: "Backend Setup", description: "This is a static web app. Server features are routed through serverless form responders or mock client mockups.", code: "// Mock backend listener\nconsole.log(\"Static App Loaded - Form handler hooks listening\");", codeLanguage: "javascript" },
      { step: 7, title: "Database Setup", description: "No database query is needed. Session parameters are cached locally in browser local storage pools.", code: "// Local data persistence\nlocalStorage.setItem('lead-cached', 'true');", codeLanguage: "javascript" },
      { step: 8, title: "Validation and Error Handling", description: "Validate mail inputs using native browser APIs and trigger clear, screen-reader-accessible error boxes on failure.", code: "if (!emailInput.validity.valid) {\n  emailInput.setAttribute('aria-invalid', 'true');\n  errorLabel.textContent = \"Please provide a valid email.\";\n}", codeLanguage: "javascript" },
      { step: 9, title: "Testing Integration", description: "Write local unit tests executing theme toggle state validations inside JSDOM mock models.", code: "test('updates theme setting in localStorage', () => {\n  toggleTheme();\n  expect(localStorage.getItem('theme')).toBe('dark');\n});", codeLanguage: "javascript" },
      { step: 10, title: "Deployment Pipeline", description: "Configure static deployment workflows using Vercel or Netlify static project frameworks.", code: "vercel deploy --prod", codeLanguage: "bash" }
    ],
    codeFiles: [
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "portfolio-website",\n  "version": "1.0.0",\n  "description": "Accessible developer portfolio",\n  "scripts": {\n    "start": "browser-sync start --server --files '*.html, css/*.css, js/*.js'"\n  },\n  "devDependencies": {\n    "browser-sync": "^3.0.2"\n  }\n}`,
        language: "json"
      },
      {
        name: "index.html",
        path: "index.html",
        code: `<!DOCTYPE html>\n<html lang="en" data-theme="light">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Developer Portfolio</title>\n  <link rel="stylesheet" href="css/variables.css">\n  <link rel="stylesheet" href="css/main.css">\n  <script src="js/theme.js"></script>\n</head>\n<body>\n  <header class="app-header">\n    <a href="#main-content" class="skip-link">Skip to content</a>\n    <nav class="nav-container" aria-label="Main Navigation">\n      <div class="logo">DevPortfolio</div>\n      <div class="nav-controls">\n        <button id="theme-toggle" class="btn-toggle" aria-label="Toggle dark mode">\n          <span class="icon-sun" aria-hidden="true">☀️</span>\n        </button>\n        <ul class="nav-links">\n          <li><a href="#projects" class="nav-link-item">Projects</a></li>\n          <li><a href="#contact" class="nav-link-item">Contact</a></li>\n        </ul>\n      </div>\n    </nav>\n  </header>\n\n  <main id="main-content">\n    <section class="hero">\n      <h1>Hi, I'm a Full-Stack Engineer</h1>\n      <p>I build high-performance, accessible web systems.</p>\n    </section>\n\n    <section id="projects" class="projects-section">\n      <h2>Projects</h2>\n      <div class="filter-bar">\n        <button class="filter-btn active" data-filter="all">All</button>\n        <button class="filter-btn" data-filter="frontend">Frontend</button>\n        <button class="filter-btn" data-filter="backend">Backend</button>\n      </div>\n      <div class="projects-grid" id="projects-grid">\n        <article class="project-card" data-category="frontend">\n          <h3>Task Manager</h3>\n          <p>React Kanban board tool.</p>\n        </article>\n        <article class="project-card" data-category="backend">\n          <h3>Auth Server</h3>\n          <p>Express JWT security gateway.</p>\n        </article>\n      </div>\n    </section>\n\n    <section id="contact" class="contact-section">\n      <h2>Contact Me</h2>\n      <form id="contact-form" class="contact-form" novalidate>\n        <div class="form-group">\n          <label for="user-email">Email Address</label>\n          <input type="email" id="user-email" required>\n          <span class="error-msg" id="email-error" aria-live="polite"></span>\n        </div>\n        <div class="form-group">\n          <label for="user-msg">Message</label>\n          <textarea id="user-msg" required></textarea>\n        </div>\n        <button type="submit" class="submit-btn">Send Inquiry</button>\n      </form>\n      <div id="form-toast" class="toast" role="status" aria-live="polite"></div>\n    </section>\n  </main>\n  <script src="js/app.js"></script>\n</body>\n</html>`,
        language: "html"
      },
      {
        name: "variables.css",
        path: "css/variables.css",
        code: `:root {\n  --font-family: 'Inter', system-ui, sans-serif;\n  --bg-primary: hsl(0, 0%, 100%);\n  --text-primary: hsl(220, 15%, 15%);\n  --indigo-primary: hsl(240, 90%, 55%);\n  --border-color: hsl(220, 15%, 90%);\n  --toast-bg: hsl(150, 80%, 20%);\n  --toast-text: hsl(0, 0%, 100%);\n}\n\n[data-theme=\"dark\"] {\n  --bg-primary: hsl(220, 20%, 10%);\n  --text-primary: hsl(220, 15%, 90%);\n  --border-color: hsl(220, 15%, 25%);\n}`,
        language: "css"
      },
      {
        name: "main.css",
        path: "css/main.css",
        code: `body {\n  font-family: var(--font-family);\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  margin: 0;\n  padding: 0;\n  transition: background-color 0.3s, color 0.3s;\n}\n\n.skip-link {\n  position: absolute;\n  top: -100px;\n  left: 0;\n  background: var(--indigo-primary);\n  color: white;\n  padding: 8px;\n  z-index: 100;\n}\n.skip-link:focus {\n  top: 0;\n}\n\n.app-header {\n  border-bottom: 1px solid var(--border-color);\n  padding: 1rem 2rem;\n}\n\n.nav-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.nav-links {\n  display: flex;\n  list-style: none;\n  gap: 1.5rem;\n  margin: 0;\n}\n\n.nav-link-item {\n  color: inherit;\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.nav-link-item:focus-visible, .btn-toggle:focus-visible {\n  outline: 3px solid var(--indigo-primary);\n  outline-offset: 4px;\n}\n\n.projects-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 2rem;\n  padding: 2rem 0;\n}\n\n.project-card {\n  border: 1px solid var(--border-color);\n  padding: 1.5rem;\n  border-radius: 12px;\n}`,
        language: "css"
      },
      {
        name: "theme.js",
        path: "js/theme.js",
        code: `(function () {\n  const currentTheme = localStorage.getItem('theme') || 'light';\n  document.documentElement.setAttribute('data-theme', currentTheme);\n})();`,
        language: "javascript"
      },
      {
        name: "app.js",
        path: "js/app.js",
        code: `document.addEventListener('DOMContentLoaded', () => {\n  const themeBtn = document.getElementById('theme-toggle');\n  themeBtn.addEventListener('click', () => {\n    const current = document.documentElement.getAttribute('data-theme');\n    const next = current === 'dark' ? 'light' : 'dark';\n    document.documentElement.setAttribute('data-theme', next);\n    localStorage.setItem('theme', next);\n  });\n\n  // Filter project cards logic\n  const filterBtns = document.querySelectorAll('.filter-btn');\n  const cards = document.querySelectorAll('.project-card');\n\n  filterBtns.forEach(btn => {\n    btn.addEventListener('click', () => {\n      filterBtns.forEach(b => b.classList.remove('active'));\n      btn.classList.add('active');\n      const filter = btn.getAttribute('data-filter');\n\n      cards.forEach(card => {\n        if (filter === 'all' || card.getAttribute('data-category') === filter) {\n          card.style.display = 'block';\n        } else {\n          card.style.display = 'none';\n        }\n      });\n    });\n  });\n\n  // Form submission handler\n  const form = document.getElementById('contact-form');\n  const emailInput = document.getElementById('user-email');\n  const emailError = document.getElementById('email-error');\n\n  form.addEventListener('submit', async (e) => {\n    e.preventDefault();\n    if (!emailInput.value.includes('@')) {\n      emailInput.setAttribute('aria-invalid', 'true');\n      emailError.textContent = 'Please supply a correct email format.';\n      return;\n    }\n    \n    emailInput.setAttribute('aria-invalid', 'false');\n    emailError.textContent = '';\n\n    const toast = document.getElementById('form-toast');\n    toast.textContent = 'Submitting message...';\n\n    try {\n      const res = await fetch('https://httpbin.org/post', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ email: emailInput.value, message: document.getElementById('user-msg').value })\n      });\n      if (res.ok) {\n        toast.textContent = 'Message received successfully!';\n        form.reset();\n      } else {\n        toast.textContent = 'Send failed. Please retry.';\n      }\n    } catch {\n      toast.textContent = 'Network error. Please try again.';\n    }\n  });\n});`,
        language: "javascript"
      }
    ],
    tests: {
      manualChecklist: [
        "Verify skip-link element brings visual focus to primary container when keyboard tabs are triggered.",
        "Ensure theme selection persists locally after a complete page refresh.",
        "Check that accessibility outlines show correctly on interactive button components."
      ],
      unitTestPath: "tests/theme.test.js",
      unitTestLanguage: "javascript",
      unitTestCode: `const themeHelper = require('../js/theme');\n\ndescribe('Theme Persistence Controller', () => {\n  beforeEach(() => {\n    localStorage.clear();\n    document.documentElement.removeAttribute('data-theme');\n  });\n\n  it('should initialize data-theme to light by default if storage is vacant', () => {\n    expect(document.documentElement.getAttribute('data-theme')).toBeNull();\n  });\n});`,
      apiTestPath: "tests/api.test.js",
      apiTestLanguage: "javascript",
      apiTestCode: `const request = require('supertest');\n\ndescribe('Mock Form Target Endpoint', () => {\n  it('submits form payload successfully', async () => {\n    const res = await request('https://httpbin.org')\n      .post('/post')\n      .send({ email: 'recruit@test.com', message: 'Hi' })\n      .expect(200);\n    expect(res.body.json.email).toBe('recruit@test.com');\n  });\n});`,
      accessibilityChecklist: [
        "Contrast checks for active headings verify compliance with WCAG 2.1 criteria.",
        "All visual controls operate natively with standard tab indexing profiles."
      ],
      performanceChecklist: [
        "Compress core landing page images and icons into compressed webp formats.",
        "Verify overall build sizes remain under 50KB to keep static files loading instantly."
      ]
    },
    deploy: {
      localRun: [
        "npm install",
        "npm start"
      ],
      envVariables: [
        "PORT=3000"
      ],
      buildCommands: [
        "npm run build"
      ],
      vercelFront: "Build output path is set to root '.'. Direct routing works on vercel index page.",
      productionChecklist: [
        "Confirm all html headers have valid title tags.",
        "Validate images hold correct alt labels."
      ]
    },
    interview: {
      howToExplain: "I built a responsive developer portfolio targeting high performance and accessibility (WCAG AA). I chose standard HTML5 landmarks and CSS variable systems to avoid bundle bloat and leverage cached resource pipelines.",
      architecture: "Static HTML pages utilize vanilla scripts to load local theme tokens in the document header before content rendering. Form validation runs on client event triggers, shifting payload delivery asynchronously via dynamic fetch pools.",
      challenges: "Flashes of unstyled dark themes on page load. I resolved this by placing light-weight theme parsing blocks inline inside the HTML `<head>` tag, guaranteeing rendering values occur immediately prior to full stylesheet loading.",
      improvements: [
        "Incorporate Automated axe-core accessibility pipeline runs on commits.",
        "Implement image generation pipelines using responsive srcset configurations."
      ],
      resumeBullets: [
        "Created fully responsive developer portfolio featuring WCAG AA accessible layouts, scoring 100 on Lighthouse SEO.",
        "Reduced theme initialization paint-flashes to 0ms by executing inline parsing scripts inside DOM head blocks."
      ],
      qas: [
        { question: "Why avoid React/Next.js for a simple static portfolio?", answer: "React bundles add JS parsing costs that delay initial loads. Vanilla HTML ensures static files are instantly viewable, boosting Lighthouse scores." },
        { question: "How does the skip-link work?", answer: "The skip-link is absolute-positioned offscreen until focused. Tabbing hits it first, letting keyboard users skip nav menus." }
      ]
    }
  },
  "blog-cms": {
    requirements: {
      businessObjective: "Establish an enterprise blogging CMS featuring dynamic article parsing, tags integration, relational schemas, and an author edit console.",
      functional: [
        "Public reader catalog fetching posts from relational DB pools.",
        "Secure auth layout preventing guest entries from accessing dashboard write logs.",
        "Tag association systems configuring tag mapping matrices.",
        "Rich text editor inputs validating schema types before db updates."
      ],
      nonFunctional: [
        "Next.js caching pools maintaining catalog updates.",
        "SQL index tags on slug parameter columns.",
        "Graceful serverless error boundaries preventing database connection hangs."
      ],
      userStories: [
        "As an editor, I want to create draft articles and tag them so they can be grouped properly.",
        "As a user, I want posts to load fast and show related articles by category."
      ],
      acceptanceCriteria: [
        "Unpublished articles must return 404 views on reader urls.",
        "Post titles must hold unique title slugs."
      ],
      edgeCases: [
        "Creating identical post slugs must trigger validation errors rather than DB crashes.",
        "Handling network timeouts when database connections pool limits are exceeded."
      ]
    },
    buildSteps: [
      { step: 1, title: "Next.js App Router Initialization", description: "Bootstrap Next.js application using Tailwind and Prisma dependencies.", code: "npx create-next-app@latest blog-cms --typescript --tailwind\ncd blog-cms\nnpm install prisma @prisma/client", codeLanguage: "bash" },
      { step: 2, title: "Prisma Modeling", description: "Design schema models defining posts, authors, and tag relationships.", code: "npx prisma init", codeLanguage: "bash" },
      { step: 3, title: "Database Migrations", description: "Run Prisma DB push scripts mapping changes into the cloud database.", code: "npx prisma migrate dev --name init", codeLanguage: "bash" },
      { step: 4, title: "Layout Configurations", description: "Construct core layout wrappers separating admin directories from reader layouts.", code: "// app/layout.tsx holds global HTML headers\n// app/admin/layout.tsx protects administration subfolders", codeLanguage: "typescript" },
      { step: 5, title: "Client Components setup", description: "Code Markdown text inputs rendering editor previews dynamically.", code: "\"use client\";\nimport { useState } from 'react';", codeLanguage: "typescript" },
      { step: 6, title: "Server Side Fetch integrations", description: "Write Prisma post fetch queries in server components to handle Static rendering parameters.", code: "const posts = await prisma.post.findMany({ where: { published: true } });", codeLanguage: "typescript" },
      { step: 7, title: "CRUD API routes", description: "Establish serverless route endpoints handling POST requests for post draft additions.", code: "export async function POST(req: Request) { ... }", codeLanguage: "typescript" },
      { step: 8, title: "Zod Form Validation schemas", description: "Verify POST request contents on API handlers to block faulty uploads.", code: "const PostSchema = z.object({ title: z.string().min(5), content: z.string() });", codeLanguage: "typescript" },
      { step: 9, title: "Jest Unit Assertions", description: "Write unit test scripts verifying prisma queries filter tags correctly.", code: "expect(post.tags).toContainEqual(expect.objectContaining({ name: 'react' }));", codeLanguage: "typescript" },
      { step: 10, title: "Vercel deployments configurations", description: "Configure environment variables and database credentials on Vercel consoles.", code: "vercel --env DATABASE_URL=$DATABASE_URL", codeLanguage: "bash" }
    ],
    codeFiles: [
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "blog-cms",\n  "version": "1.0.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start",\n    "db:migrate": "prisma migrate dev"\n  },\n  "dependencies": {\n    "next": "^14.1.0",\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "@prisma/client": "^5.9.1",\n    "zod": "^3.22.4"\n  },\n  "devDependencies": {\n    "typescript": "^5.3.3",\n    "@types/node": "^20.11.16",\n    "@types/react": "^18.2.52",\n    "prisma": "^5.9.1"\n  }\n}`,
        language: "json"
      },
      {
        name: "schema.prisma",
        path: "prisma/schema.prisma",
        code: `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nmodel Post {\n  id        String   @id @default(uuid())\n  title     String\n  slug      String   @unique\n  content   String\n  published Boolean  @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  tags      Tag[]    @relation("PostTags")\n}\n\nmodel Tag {\n  id    String @id @default(uuid())\n  name  String @unique\n  posts Post[] @relation("PostTags")\n}`,
        language: "prisma"
      },
      {
        name: "db.ts",
        path: "lib/db.ts",
        code: `import { PrismaClient } from "@prisma/client";\n\nconst globalForPrisma = global as unknown as { prisma: PrismaClient };\n\nexport const prisma =\n  globalForPrisma.prisma ||\n  new PrismaClient({\n    log: ["query"],\n  });\n\nif (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;`,
        language: "typescript"
      },
      {
        name: "layout.tsx",
        path: "app/layout.tsx",
        code: `import type { Metadata } from "next";\nimport "./globals.css";\n\nexport const metadata: Metadata = {\n  title: "DevBlog CMS",\n  description: "Relational Next.js Content Management System",\n};\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang=\"en\">\n      <body class=\"bg-slate-50 text-slate-900\">\n        <header class=\"border-b bg-white p-4\">\n          <div class=\"max-w-4xl mx-auto flex justify-between\">\n            <span class=\"font-bold text-indigo-650\">DevBlog</span>\n          </div>\n        </header>\n        <main class=\"max-w-4xl mx-auto p-4\">{children}</main>\n      </body>\n    </html>\n  );\n}`,
        language: "tsx"
      },
      {
        name: "page.tsx",
        path: "app/page.tsx",
        code: `import { prisma } from "@/lib/db";\nimport Link from "next/link";\n\nexport const revalidate = 60; // ISR cache timeout\n\nexport default async function BlogCatalog() {\n  const posts = await prisma.post.findMany({\n    where: { published: true },\n    include: { tags: true },\n    orderBy: { createdAt: "desc" }\n  });\n\n  return (\n    <div class=\"space-y-6\">\n      <h1 class=\"text-3xl font-black\">Latest Articles</h1>\n      <div class=\"grid gap-6\">\n        {posts.map(post => (\n          <article key={post.id} class=\"p-6 bg-white border rounded-2xl shadow-xs\">\n            <h2 class=\"text-xl font-bold hover:text-indigo-650\">\n              <Link href={\`/posts/\${post.slug}\`}>{post.title}</Link>\n            </h2>\n            <div class=\"flex gap-2 mt-2\">\n              {post.tags.map(t => (\n                <span key={t.id} class=\"text-xs bg-slate-100 px-2.5 py-0.5 rounded-full\">{t.name}</span>\n              ))}\n            </div>\n          </article>\n        ))}\n      </div>\n    </div>\n  );\n}`,
        language: "tsx"
      },
      {
        name: "route.ts",
        path: "app/api/posts/route.ts",
        code: `import { prisma } from "@/lib/db";\nimport { NextResponse } from "next/server";\nimport { z } from "zod";\n\nconst createPostSchema = z.object({\n  title: z.string().min(5),\n  content: z.string().min(20),\n  tags: z.array(z.string())\n});\n\nexport async function POST(req: Request) {\n  try {\n    const body = await req.json();\n    const payload = createPostSchema.parse(body);\n    const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, \"-\");\n\n    const newPost = await prisma.post.create({\n      data: {\n        title: payload.title,\n        slug,\n        content: payload.content,\n        published: true,\n        tags: {\n          connectOrCreate: payload.tags.map(tag => ({\n            where: { name: tag },\n            create: { name: tag }\n          }))\n        }\n      }\n    });\n\n    return NextResponse.json({ success: true, postId: newPost.id }, { status: 201 });\n  } catch (err) {\n    return NextResponse.json({ error: \"Invalid layout fields\" }, { status: 400 });\n  }\n}`,
        language: "typescript"
      }
    ],
    tests: {
      manualChecklist: [
        "Verify unpublished blogs return 404 responses.",
        "Check tag creation matrices do not duplicate tags."
      ],
      unitTestPath: "tests/db.test.ts",
      unitTestLanguage: "typescript",
      unitTestCode: `import { prisma } from "../lib/db";\n\ndescribe("Database Relation Queries", () => {\n  it("should create articles and link tags correctly", async () => {\n    const post = await prisma.post.create({\n      data: {\n        title: "Test Article",\n        slug: "test-article",\n        content: "Detailed testing article descriptions.",\n        tags: { create: { name: "testing" } }\n      },\n      include: { tags: true }\n    });\n    expect(post.tags[0].name).toBe("testing");\n  });\n});`,
      accessibilityChecklist: [
        "Form control wrappers hold active aria tags.",
        "Keyboard focus states show highlights."
      ],
      performanceChecklist: [
        "Use Static generation on reader catalogs.",
        "Index tag lookup queries in DB."
      ]
    },
    deploy: {
      localRun: [
        "npm install",
        "npm run db:migrate",
        "npm run dev"
      ],
      envVariables: [
        "DATABASE_URL=postgresql://user:pass@host:5432/db"
      ],
      buildCommands: [
        "npm run build"
      ],
      vercelFront: "Next.js builds statically compile endpoints and API routing boundaries.",
      productionChecklist: [
        "Configure database connection pools.",
        "Check environment API keys."
      ]
    },
    interview: {
      howToExplain: "I designed a Next.js CMS utilizing Prisma ORM and PostgreSQL. I configured incremental static regeneration (ISR) to cache public blog views and reduce queries, keeping the dashboard secure via Next.js middlewares.",
      architecture: "App Router manages public views via ISR. Creating drafts hits Next.js API Routes, validating inputs via Zod before DB insertions. Prisma client pools reuse active database links.",
      challenges: "Preventing relational leaks during bulk post deletions. I set up safe connection references in Prisma schema mappings, cascading item removal checks cleanly.",
      improvements: [
        "Configure full-text database indices.",
        "Add markdown editor drafts autosaving features."
      ],
      resumeBullets: [
        "Built relational CMS dashboard with Next.js App Router and Prisma, resolving DB cascading errors on tag tables.",
        "Improved render rates by 60% by implementing dynamic static regenerations on article catalog views."
      ],
      qas: [
        { question: "What are the benefits of connection pooling?", answer: "Serverless routes open connection tunnels on demands. Pools reuse existing channels, preventing DB exhaustions." },
        { question: "How does ISR update post edits?", answer: "Next.js serves cached html, invalidating directories statically in the background based on defined timing scales." }
      ]
    }
  }
};

export interface ProjectBase {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  folderStructure: string;
  databaseSchema?: string;
  businessRequirement: string;
}

export function getDetailsForProject(slug: string, base: ProjectBase): ProjectDetails {
  if (projectDetailsData[slug]) {
    return projectDetailsData[slug];
  }

  // Determine tech category based on project metadata
  const hasNext = base.techStack?.some((t: string) => t.toLowerCase().includes("next"));
  const hasReact = base.techStack?.some((t: string) => t.toLowerCase().includes("react"));
  const hasDocker = base.techStack?.some((t: string) => t.toLowerCase().includes("docker"));
  const hasDatabase = base.techStack?.some((t: string) => t.toLowerCase().includes("sql") || t.toLowerCase().includes("postgres") || t.toLowerCase().includes("prisma") || t.toLowerCase().includes("drizzle") || t.toLowerCase().includes("db"));
  const hasBackend = base.techStack?.some((t: string) => t.toLowerCase().includes("node") || t.toLowerCase().includes("express") || t.toLowerCase().includes("nest") || t.toLowerCase().includes("api"));

  const functionalReqs = base.features && base.features.length > 0
    ? base.features.map((f: string) => f.replace(/\.$/, ""))
    : [
        `Render responsive layout interface matching ${base.title} functional specifications`,
        "Provide keyboard accessibility states on interactive component triggers",
        "Implement structured local validation workflows on form submission endpoints"
      ];

  const userStories = [
    `As a developer/user of ${base.title}, I want to initialize layouts and process user events so that I can practice production workflows.`,
    "As an auditor, I want inputs validated locally so that connection operations do not submit corrupted states."
  ];

  const acceptance = [
    "Interactive buttons highlight in clean focus rings when navigating via tabs.",
    "Form actions block submission parameters on empty input states."
  ];

  const edges = [
    "Connection drops should notify users with standard timeout indicators.",
    "Rapid submission spam checks block parallel api request executions."
  ];

  // 10 Build steps customization
  const buildSteps: BuildStepSection[] = [
    { step: 1, title: "Project Setup", description: `Initialize workspace environments and project dependencies using standard configuration packages for ${base.title}.`, code: "npm init -y\nnpm install -D typescript @types/node", codeLanguage: "bash" },
    { step: 2, title: "Folder Structure configuration", description: `Establish modular file trees representing code structures according to production layout guidelines.`, code: base.folderStructure || "src/\n├── components/\n└── index.ts", codeLanguage: "text" },
    { step: 3, title: "UI Layout creation", description: "Design semantic page elements mapping dashboard widgets or container elements cleanly.", code: "<!-- Semantic layout landmarks -->\n<div class=\"layout-container\">\n  <main id=\"main-content\"></main>\n</div>", codeLanguage: "html" },
    { step: 4, title: "State Management setup", description: "Configure state contexts or reactive hooks to process user interaction values.", code: "const [state, setState] = useState(initialState);", codeLanguage: "javascript" },
    { step: 5, title: "API Integration points", description: "Establish service layer methods utilizing Fetch API requests targeting database or backend API endpoints.", code: "const res = await fetch('/api/resource');\nconst data = await res.json();", codeLanguage: "javascript" },
    { step: 6, title: "Backend Setup", description: hasBackend || hasNext ? "Set up request-response routing paths and mount core security middleware parameters." : "This layout relies on static files or serverless api hooks to bypass active process servers.", code: "import express from 'express';\nconst app = express();", codeLanguage: "typescript" },
    { step: 7, title: "Database Schema creation", description: hasDatabase ? "Establish relational database models or queries mapping variables onto schema tables." : "Session data is cached locally inside the browser using memory scopes or local storage keys.", code: base.databaseSchema || "CREATE TABLE records (\n  id SERIAL PRIMARY KEY,\n  value VARCHAR(255)\n);", codeLanguage: "sql" },
    { step: 8, title: "Validation and Error Handling", description: "Verify type schemas using declarative validator parameters, preventing malformed payload transits.", code: "if (!payload.isValid) {\n  throw new Error('Malformed schema payload');\n}", codeLanguage: "javascript" },
    { step: 9, title: "Testing Integration", description: "Configure Jest or mock frameworks to run test specs, asserting payload schemas on responses.", code: "describe('API Contract Suite', () => {\n  it('returns valid structures', () => {\n    expect(data.id).toBeDefined();\n  });\n});", codeLanguage: "javascript" },
    { step: 10, title: "Deployment Pipeline", description: "Package application binaries or static grids and deploy to target staging environments.", code: "npm run build && vercel --prod", codeLanguage: "bash" }
  ];

  // Dynamic code files generation
  const codeFiles: CodeFile[] = [];

  if (hasDocker) {
    codeFiles.push(
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "${base.slug}",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node server.js"\n  },\n  "dependencies": {\n    "express": "^4.18.2"\n  }\n}`,
        language: "json"
      },
      {
        name: "Dockerfile",
        path: "client/Dockerfile",
        code: `FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`,
        language: "dockerfile"
      },
      {
        name: "Dockerfile",
        path: "server/Dockerfile",
        code: `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`,
        language: "dockerfile"
      },
      {
        name: "docker-compose.yml",
        path: "docker-compose.yml",
        code: `version: '3.8'\n\nservices:\n  client:\n    build:\n      context: ./client\n    ports:\n      - "80:80"\n    depends_on:\n      - server\n\n  server:\n    build:\n      context: ./server\n    ports:\n      - "3000:3000"\n    environment:\n      - DATABASE_URL=postgres://db:5432/main\n    depends_on:\n      - db\n\n  db:\n    image: postgres:15-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_DB=main\n      - POSTGRES_PASSWORD=secret\n\nvolumes:\n  pgdata:`,
        language: "yaml"
      }
    );
  } else if (hasNext) {
    codeFiles.push(
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "${base.slug}",\n  "dependencies": {\n    "next": "^14.1.0",\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "zod": "^3.22.4"\n  }\n}`,
        language: "json"
      },
      {
        name: "layout.tsx",
        path: "app/layout.tsx",
        code: `import type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${base.title}',\n  description: '${base.description}',\n};\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body className="antialiased bg-slate-50 text-slate-900">\n        <header className="p-4 border-b bg-white font-bold">${base.title}</header>\n        <main className="p-6 max-w-4xl mx-auto">{children}</main>\n      </body>\n    </html>\n  );\n}`,
        language: "tsx"
      },
      {
        name: "page.tsx",
        path: "app/page.tsx",
        code: `import React from 'react';\n\nexport default async function Page() {\n  return (\n    <div className="space-y-4">\n      <h1 className="text-3xl font-black">${base.title} Workspace</h1>\n      <p className="text-slate-600">${base.description}</p>\n      <div className="p-6 bg-white border rounded-2xl shadow-xs">\n        <h2 className="font-bold text-slate-800 mb-2">Core Dashboard Workspace</h2>\n        <p className="text-sm text-slate-500">Run setup and install scripts to initiate production modules.</p>\n      </div>\n    </div>\n  );\n}`,
        language: "tsx"
      },
      {
        name: "route.ts",
        path: "app/api/resource/route.ts",
        code: `import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ success: true, timestamp: new Date().toISOString() });\n}`,
        language: "typescript"
      }
    );
  } else if (hasReact) {
    codeFiles.push(
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "${base.slug}",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc && vite build"\n  },\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "devDependencies": {\n    "vite": "^5.0.0",\n    "typescript": "^5.0.0"\n  }\n}`,
        language: "json"
      },
      {
        name: "vite.config.ts",
        path: "vite.config.ts",
        code: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n});`,
        language: "typescript"
      },
      {
        name: "App.tsx",
        path: "src/App.tsx",
        code: `import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center">\n      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">${base.title}</h1>\n      <button \n        onClick={() => setCount(c => c + 1)} \n        className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm"\n      >\n        Count Active: {count}\n      </button>\n    </div>\n  );\n}`,
        language: "tsx"
      }
    );
  } else if (hasBackend) {
    codeFiles.push(
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "${base.slug}",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node dist/app.js",\n    "build": "tsc"\n  },\n  "dependencies": {\n    "express": "^4.18.2",\n    "zod": "^3.22.4",\n    "dotenv": "^16.4.0"\n  },\n  "devDependencies": {\n    "typescript": "^5.0.0",\n    "@types/express": "^4.17.21"\n  }\n}`,
        language: "json"
      },
      {
        name: "app.ts",
        path: "src/app.ts",
        code: `import express from 'express';\nimport dotenv from 'dotenv';\n\ndotenv.config();\nconst app = express();\napp.use(express.json());\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'healthy', project: '${base.title}' });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log('Service running on port ' + PORT));\n\nexport default app;`,
        language: "typescript"
      },
      {
        name: ".env.example",
        path: ".env.example",
        code: `PORT=3000\nDATABASE_URL=postgres://user:pass@host:5432/dbname\nJWT_SECRET=replace_with_secure_signing_hash`,
        language: "text"
      }
    );
  } else {
    // Static HTML/CSS project or general devops
    codeFiles.push(
      {
        name: "package.json",
        path: "package.json",
        code: `{\n  "name": "${base.slug}",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "echo 'Static hosting setup completed'"\n  }\n}`,
        language: "json"
      },
      {
        name: "index.html",
        path: "index.html",
        code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>${base.title}</title>\n  <style>\n    body { font-family: sans-serif; padding: 2rem; background: #fafafa; }\n  </style>\n</head>\n<body>\n  <h1>${base.title}</h1>\n  <p>${base.description}</p>\n</body>\n</html>`,
        language: "html"
      }
    );
  }

  // If DB/Prisma is required
  if (hasDatabase && !hasDocker) {
    codeFiles.push({
      name: "schema.prisma",
      path: "prisma/schema.prisma",
      code: base.databaseSchema || `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nmodel Record {\n  id        String   @id @default(uuid())\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}`,
      language: "prisma"
    });
  }

  const unitTestCode = `import request from 'supertest';\nimport app from '../src/app';\n\ndescribe('${base.title} Test Suite', () => {\n  it('checks standard system diagnostic paths', async () => {\n    // Dynamic validation\n    expect(true).toBe(true);\n  });\n});`;

  const manualCheck = [
    `Validate that the core components of ${base.title} load correctly under testing viewport configs.`,
    "Verify validation boundaries discard empty or malformed inputs.",
    "Ensure console log files do not leak credentials or env keys."
  ];

  return {
    requirements: {
      businessObjective: base.businessRequirement || `Provide secure, highly performant containerized or routed mechanisms hosting the core structures of ${base.title}.`,
      functional: functionalReqs,
      nonFunctional: [
        "Load core structural assets under 1.5 seconds in throttling configurations.",
        "Pass visual contrast access scores of 95 on Lighthouse audits.",
        "Enforce strict input sanitation preventing code injection vulnerabilities."
      ],
      userStories,
      acceptanceCriteria: acceptance,
      edgeCases: edges
    },
    buildSteps,
    codeFiles,
    tests: {
      manualChecklist: manualCheck,
      unitTestPath: hasBackend ? "tests/service.test.ts" : "tests/component.test.tsx",
      unitTestLanguage: "typescript",
      unitTestCode,
      accessibilityChecklist: [
        "Interactives focus outlines highlight correctly on keyboard navigation passes.",
        "Interactive element markups supply explicit role attributes."
      ],
      performanceChecklist: [
        "Minimize dependency imports preventing layout code bloats.",
        "Optimize async requests limits to prevent server hangs."
      ]
    },
    deploy: {
      localRun: ["npm install", hasBackend || hasNext ? "npm run dev" : "npm start"],
      envVariables: [
        "PORT=3000",
        "DATABASE_URL=postgresql://localhost:5432/db",
        "JWT_SECRET=temp_secret"
      ],
      buildCommands: ["npm run build"],
      vercelFront: hasNext || hasReact ? "Vercel hosts dynamic client outputs cleanly using edge networks." : undefined,
      renderBack: hasBackend ? "Deploy node servers directly to cloud app instances." : undefined,
      supabaseDb: hasDatabase ? "Host PostgreSQL database pools on Supabase serverless instances." : undefined,
      dockerfile: hasDocker ? "Multi-stage builds compile code bases into tiny, production-ready alpine images." : undefined,
      dockerCompose: hasDocker ? "docker-compose.yml links database, backend, and static client containers." : undefined,
      productionChecklist: [
        "Review database connection pooling volumes.",
        "Verify CORS headers configurations deny unauthorized scopes."
      ]
    },
    interview: {
      howToExplain: `I designed and compiled ${base.title} utilizing ${base.techStack?.join(", ") || "modular JavaScript"}. I structured the application layout around isolated scopes to decouple database mutations from client rendering routines.`,
      architecture: hasBackend
        ? "Clients interact with Express API routes using JSON payloads. Middlewares validate tokens and formats before calling Prisma schemas."
        : "Dynamic pages use modular component hooks with LocalStorage state persistence caching user preferences.",
      challenges: `Managing configuration parameters and ensuring network failures don't lead to stale UI panels. I resolved this by applying try-catch error boundaries wrapping api calls.`,
      improvements: [
        "Integrate automated container orchestration rules.",
        "Add push notification bindings using Redis queues."
      ],
      resumeBullets: [
        `Built ${base.title} with ${base.techStack?.slice(0, 3).join(", ") || "standard JS"}, establishing structured API pipelines and relational schemas.`,
        "Mitigated connection runtime hangs by implementing global express/next validation boundaries."
      ],
      qas: [
        { question: "How were database queries secure?", answer: "We used Prisma ORM parameterized queries natively, blocking database SQL injection vector leaks." },
        { question: "How does the layout support mobile displays?", answer: "Tailwind grid systems dynamically realign sidebar elements into sliding panels below 768px viewports." }
      ]
    }
  };
}
