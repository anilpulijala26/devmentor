interface CuratedFile {
  name: string;
  path: string;
  code: string;
  language: string;
}

interface CuratedStage {
  title: string;
  description: string;
}

const curatedStages: Record<string, CuratedStage[]> = {
  "task-manager": [
    { title: "Create the task layout", description: "Add the page shell, task form area, and task list area." },
    { title: "Add the task form", description: "Capture task title, priority, and due date inputs." },
    { title: "Render and update tasks", description: "Map tasks into list items and toggle completion state." },
    { title: "Add filters", description: "Filter by all, active, and completed tasks." },
    { title: "Persist tasks", description: "Store tasks in localStorage so reloads keep progress." },
    { title: "Deploy and submit", description: "Push the repo, deploy the app, and submit both links." },
    { title: "Prepare interview explanation", description: "Explain how state moves from form to list to filters." }
  ],
  "auth-system": [
    { title: "Build login and register screens", description: "Create the user-facing forms first." },
    { title: "Validate credentials", description: "Check email format and password strength before save." },
    { title: "Add hashing and auth routes", description: "Hash passwords and add register/login endpoints." },
    { title: "Protect the dashboard", description: "Block guests from reaching private pages." },
    { title: "Add logout flow", description: "Clear the auth session or token cleanly." },
    { title: "Deploy and submit", description: "Document demo credentials and auth setup." },
    { title: "Prepare interview explanation", description: "Explain authentication, hashing, and protected routes." }
  ],
  "saas-dashboard": [
    { title: "Create dashboard layout", description: "Build the sidebar, top bar, and content grid." },
    { title: "Add stat cards", description: "Show revenue, users, and growth metrics." },
    { title: "Add charts and activity", description: "Visualize trends and recent events." },
    { title: "Add filters", description: "Support date range or segment filters." },
    { title: "Make it responsive", description: "Collapse navigation and stack cards on mobile." },
    { title: "Deploy and submit", description: "Ship the dashboard with a clean live URL." },
    { title: "Prepare interview explanation", description: "Explain your data presentation choices." }
  ],
  "ai-generator": [
    { title: "Build the AI workspace", description: "Create prompt input and result sections." },
    { title: "Validate prompts", description: "Reject empty prompts and unsupported input." },
    { title: "Create generation routes", description: "Add secure server routes for text or image output." },
    { title: "Handle loading and errors", description: "Show generation states clearly." },
    { title: "Add history", description: "Store a short prompt history for retries." },
    { title: "Deploy and submit", description: "Keep provider keys on the server and document setup." },
    { title: "Prepare interview explanation", description: "Explain client-server responsibilities in the AI flow." }
  ],
  "file-uploader": [
    { title: "Create the upload UI", description: "Add the page shell, dropzone, and file list." },
    { title: "Add drag-and-drop", description: "Capture dropped files and standard file input." },
    { title: "Validate files", description: "Reject invalid size or MIME types." },
    { title: "Add upload route", description: "Send files to an API or signed storage flow." },
    { title: "Show progress and previews", description: "Render upload progress and final file states." },
    { title: "Deploy and submit", description: "Document storage setup and reviewer steps." },
    { title: "Prepare interview explanation", description: "Explain why validation happens on both client and server." }
  ],
};

const curatedFiles: Record<string, CuratedFile[]> = {
  "task-manager": [
    {
      name: "page.tsx",
      path: "app/page.tsx",
      language: "tsx",
      code: `import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-black">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}`
    },
    {
      name: "TaskForm.tsx",
      path: "components/TaskForm.tsx",
      language: "tsx",
      code: `"use client";

import { useState } from "react";

export function TaskForm() {
  const [title, setTitle] = useState("");
  return (
    <form className="mt-6 flex gap-3">
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a task" className="flex-1 rounded-xl border px-4 py-3" />
      <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-3 text-white">Add</button>
    </form>
  );
}`
    },
    {
      name: "taskStorage.ts",
      path: "lib/taskStorage.ts",
      language: "ts",
      code: `export const starterTasks = [
  { id: "1", title: "Create task form", completed: false },
  { id: "2", title: "Add filters", completed: true },
];`
    }
  ],
  "auth-system": [
    {
      name: "page.tsx",
      path: "app/login/page.tsx",
      language: "tsx",
      code: `import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return <LoginForm />;
}`
    },
    {
      name: "LoginForm.tsx",
      path: "components/LoginForm.tsx",
      language: "tsx",
      code: `export function LoginForm() {
  return (
    <form className="mx-auto mt-16 max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
      <input type="email" placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
      <input type="password" placeholder="Password" className="w-full rounded-xl border px-4 py-3" />
      <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-white">Login</button>
    </form>
  );
}`
    },
    {
      name: "route.ts",
      path: "app/api/auth/login/route.ts",
      language: "ts",
      code: `import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Logged in" });
}`
    }
  ],
  "saas-dashboard": [
    {
      name: "page.tsx",
      path: "app/dashboard/page.tsx",
      language: "tsx",
      code: `import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";

export default function DashboardPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[260px_minmax(0,1fr)]">
      <Sidebar />
      <main className="p-6">
        <h1 className="text-3xl font-black">SaaS Dashboard</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard label="MRR" value="$12,400" />
        </div>
      </main>
    </div>
  );
}`
    },
    {
      name: "Sidebar.tsx",
      path: "components/Sidebar.tsx",
      language: "tsx",
      code: `const links = ["Overview", "Billing", "Customers", "Settings"];

export function Sidebar() {
  return (
    <aside className="border-r border-slate-200 bg-white p-5">
      <p className="text-lg font-black">CodeNivra SaaS</p>
      <nav className="mt-6 space-y-2">
        {links.map((link) => <a key={link} href="#" className="block rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">{link}</a>)}
      </nav>
    </aside>
  );
}`
    },
    {
      name: "dashboardData.ts",
      path: "lib/dashboardData.ts",
      language: "ts",
      code: `export const metrics = [
  { label: "MRR", value: "$12,400" },
  { label: "Active Users", value: "1,284" },
];`
    }
  ],
  "ai-generator": [
    {
      name: "page.tsx",
      path: "app/page.tsx",
      language: "tsx",
      code: `import { PromptForm } from "@/components/PromptForm";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-black">AI Content Generator</h1>
      <PromptForm />
    </main>
  );
}`
    },
    {
      name: "PromptForm.tsx",
      path: "components/PromptForm.tsx",
      language: "tsx",
      code: `export function PromptForm() {
  return (
    <form className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
      <textarea placeholder="Write a prompt" className="min-h-40 w-full rounded-2xl border px-4 py-3" />
      <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-3 text-white">Generate</button>
    </form>
  );
}`
    },
    {
      name: "route.ts",
      path: "app/api/generate-text/route.ts",
      language: "ts",
      code: `import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ output: "Starter response for: " + body.prompt });
}`
    }
  ],
  "file-uploader": [
    {
      name: "page.tsx",
      path: "app/page.tsx",
      language: "tsx",
      code: `import { UploadDropzone } from "@/components/UploadDropzone";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-black">File Upload Manager</h1>
      <UploadDropzone />
    </main>
  );
}`
    },
    {
      name: "UploadDropzone.tsx",
      path: "components/UploadDropzone.tsx",
      language: "tsx",
      code: `export function UploadDropzone() {
  return (
    <label className="mt-8 flex min-h-56 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white text-center">
      <input type="file" className="hidden" multiple />
      <span className="max-w-sm text-sm text-slate-500">Drag files here or click to choose files.</span>
    </label>
  );
}`
    },
    {
      name: "route.ts",
      path: "app/api/upload/route.ts",
      language: "ts",
      code: `import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "File uploaded" }, { status: 201 });
}`
    }
  ],
  "analytics-dashboard": [
    {
      name: "page.tsx",
      path: "app/analytics/page.tsx",
      language: "tsx",
      code: `import { MetricCard } from "@/components/MetricCard";

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-black">Analytics Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard label="Visitors" value="125,432" />
      </div>
    </main>
  );
}`
    },
    {
      name: "MetricCard.tsx",
      path: "components/MetricCard.tsx",
      language: "tsx",
      code: `export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black text-slate-900">{value}</p>
    </article>
  );
}`
    },
    {
      name: "analyticsData.ts",
      path: "lib/analyticsData.ts",
      language: "ts",
      code: `export const analyticsSeries = [
  { label: "Mon", value: 1200 },
  { label: "Tue", value: 1320 },
];`
    }
  ],
  "express-postgres-api": [
    {
      name: "app.ts",
      path: "src/app.ts",
      language: "ts",
      code: `import express from "express";
import { tracksRouter } from "./routes/tracks";

const app = express();
app.use(express.json());
app.use("/api/tracks", tracksRouter);
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

export default app;`
    },
    {
      name: "tracks.ts",
      path: "src/routes/tracks.ts",
      language: "ts",
      code: `import { Router } from "express";

export const tracksRouter = Router();

tracksRouter.get("/", async (_req, res) => {
  res.json({ tracks: [] });
});`
    },
    {
      name: "db.ts",
      path: "src/db.ts",
      language: "ts",
      code: `import { Pool } from "pg";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });`
    }
  ],
  "rbac-dashboard": [
    {
      name: "page.tsx",
      path: "app/dashboard/page.tsx",
      language: "tsx",
      code: `import { PermissionGate } from "@/components/PermissionGate";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-black">RBAC Dashboard</h1>
      <PermissionGate allowedRoles={["admin"]}><p className="mt-6">Admin tools appear here.</p></PermissionGate>
    </main>
  );
}`
    },
    {
      name: "PermissionGate.tsx",
      path: "components/PermissionGate.tsx",
      language: "tsx",
      code: `export function PermissionGate({ allowedRoles, role = "user", children }: { allowedRoles: string[]; role?: string; children: React.ReactNode }) {
  if (!allowedRoles.includes(role)) {
    return null;
  }
  return <>{children}</>;
}`
    },
    {
      name: "route.ts",
      path: "app/api/roles/route.ts",
      language: "ts",
      code: `import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Role updated", role: body.role });
}`
    }
  ],
  "blog-cms-backend": [
    {
      name: "schema.prisma",
      path: "prisma/schema.prisma",
      language: "prisma",
      code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id      String @id @default(uuid())
  title   String
  slug    String @unique
  content String
}`
    },
    {
      name: "seed.ts",
      path: "prisma/seed.ts",
      language: "ts",
      code: `export async function seed() {
  console.log("Seed starter data here");
}`
    },
    {
      name: "posts.ts",
      path: "src/routes/posts.ts",
      language: "ts",
      code: `import { Router } from "express";

export const postsRouter = Router();
postsRouter.get("/", async (_req, res) => res.json({ posts: [] }));`
    }
  ],
  "ecommerce-backend-api": [
    {
      name: "route.ts",
      path: "app/api/products/route.ts",
      language: "ts",
      code: `import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ products: [] });
}`
    },
    {
      name: "route.ts",
      path: "app/api/cart/route.ts",
      language: "ts",
      code: `import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Added to cart", item: body }, { status: 201 });
}`
    },
    {
      name: "pricing.ts",
      path: "lib/pricing.ts",
      language: "ts",
      code: `export function calculateOrderTotal(items: Array<{ price: number; quantity: number }>) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}`
    }
  ],
  "notification-email-service": [
    {
      name: "emailQueue.ts",
      path: "src/queues/emailQueue.ts",
      language: "ts",
      code: `export const emailQueue = {
  async add(name: string, payload: unknown) {
    console.log("Queued", name, payload);
  },
};`
    },
    {
      name: "emailWorker.ts",
      path: "src/workers/emailWorker.ts",
      language: "ts",
      code: `export async function startEmailWorker() {
  console.log("Email worker started");
}`
    },
    {
      name: "notify.ts",
      path: "src/routes/notify.ts",
      language: "ts",
      code: `import { Router } from "express";

export const notifyRouter = Router();
notifyRouter.post("/", async (req, res) => {
  res.status(202).json({ queued: true, payload: req.body });
});`
    }
  ],
  "dockerized-fullstack": [
    {
      name: "Dockerfile",
      path: "client/Dockerfile",
      language: "dockerfile",
      code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build`
    },
    {
      name: "Dockerfile",
      path: "server/Dockerfile",
      language: "dockerfile",
      code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4000`
    },
    {
      name: "docker-compose.yml",
      path: "docker-compose.yml",
      language: "yaml",
      code: `services:
  client:
    build: ./client
    ports:
      - "3000:3000"
  server:
    build: ./server
    ports:
      - "4000:4000"
  db:
    image: postgres:16-alpine`
    }
  ],
  "cloud-deployment": [
    {
      name: "deploy.yml",
      path: ".github/workflows/deploy.yml",
      language: "yaml",
      code: `name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build`
    },
    {
      name: "provision-db.sh",
      path: "scripts/provision-db.sh",
      language: "bash",
      code: `#!/usr/bin/env bash
set -euo pipefail

echo "Provision database resources here"`
    },
    {
      name: "README.md",
      path: "README.md",
      language: "md",
      code: `# Cloud Deployment Project

Document the target architecture, secrets, rollback plan, and health checks here.`
    }
  ]
};

export function getCuratedBuildSteps(slug: string) {
  return curatedStages[slug] ?? null;
}

export function getCuratedCodeFiles(slug: string) {
  return curatedFiles[slug] ?? null;
}
