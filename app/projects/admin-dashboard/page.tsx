import React from "react";
import Link from "next/link";
import { ChevronLeft, FolderTree, Layers, Server, Cpu, Info, Target, Wrench, ShieldAlert, Sparkles } from "lucide-react";
import { ProjectChecklist } from "@/components/mdx/ProjectChecklist";
import { InterviewExplanation } from "@/components/mdx/InterviewExplanation";

export const metadata = {
  title: "Admin Dashboard - Project Lab | DevMentor",
  description: "Detailed system design, requirements, folders, and interview templates for the Admin Dashboard lab.",
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Top Back Navigation */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Project Labs
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            LAB // ADMIN-DASHBOARD
          </span>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border bg-violet-50 text-violet-750 border-violet-150">
              Intermediate Lab
            </span>
            <span className="text-xs text-slate-500 font-semibold">3 - 4 Weeks Duration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Admin Dashboard Interface
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Build a responsive, telemetry-driven administrator console. You will integrate complex data grids, charting APIs, sliding sidebar controls, and client router security guards.
          </p>
        </div>

        {/* 1. Project Overview & 2. Who Should Build This */}
        <div className="grid sm:grid-cols-2 gap-6 my-8">
          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info className="w-4.5 h-4.5 text-indigo-500" />
              1. Project Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              This lab guides you through constructing a high-fidelity SaaS administration panel. It focuses on rendering complex, real-time charts and data grids that stay synchronized with browser URLs.
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Target className="w-4.5 h-4.5 text-indigo-500" />
              2. Who Should Build This?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ideal for Intermediate frontend or junior full-stack developers eager to master charting libraries, dynamic search grids, deep route protection parameters, and responsive application layouts.
            </p>
          </section>
        </div>

        {/* 3. Real-Time Business Requirement & 4. Features List */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-5 h-5 text-indigo-500" />
            3. Business Requirement & Features
          </h2>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
              <p className="text-xs font-bold text-indigo-805 uppercase tracking-wider mb-1.5">Business Objective</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operations teams require a unified console to monitor subscription health, analyze financial telemetry, and edit user configurations. The UI must render charts efficiently under heavy loads, support keyboard navigation, persist table states, and enforce roles (Admin, Editor, Viewer).
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Core Features List</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-650">
                <li><strong className="text-slate-900">Telemetry Cards:</strong> Stats with percentage change markers.</li>
                <li><strong className="text-slate-900">Interactive Line Charts:</strong> Multi-axis charts displaying visual analytics.</li>
                <li><strong className="text-slate-900">Full-Featured User Table:</strong> Fuzzy matching search inputs, pagination, and sorting.</li>
                <li><strong className="text-slate-900">Slide-out Details Drawer:</strong> Edit forms sliding in from viewport edges.</li>
                <li><strong className="text-slate-900">Protected Workspace Middleware:</strong> Auth guards blocking guests.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Tech Stack & 6. Folder Structure */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Wrench className="w-5 h-5 text-indigo-500" />
            5. Tech Stack & 6. Folder Structure
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700 mb-4">
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">Framework</span>
              <p className="text-xs text-slate-500 mt-1">Next.js App Router (React 19)</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">Styling</span>
              <p className="text-xs text-slate-500 mt-1">TailwindCSS v4 & Lucide Icons</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">Charting</span>
              <p className="text-xs text-slate-500 mt-1">Recharts SVG Components</p>
            </div>
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
{`admin-dashboard/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx         # Secure login view
│   ├── dashboard/
│   │   ├── users/page.tsx         # User directory & drawers
│   │   ├── page.tsx               # Analytics telemetry
│   │   └── layout.tsx             # Sidebar layout shells
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx             # Reusable Button
│   │   ├── table.tsx              # Reusable Table grid
│   │   └── input.tsx              # Reusable Input box
│   └── charts/
│       └── area-chart.tsx         # Recharts integration
├── lib/
│   ├── auth.ts                    # Session state provider
│   └── api.ts                     # Fetch query client
└── tsconfig.json`}
          </pre>
        </section>

        {/* 7. Component Breakdown */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <FolderTree className="w-5 h-5 text-indigo-500" />
            7. Component Breakdown
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-650">
            <div>
              <p className="font-bold text-slate-800 mb-1">`Sidebar` Component</p>
              <p className="leading-relaxed">A collapsible sidebar containing dynamic links that filters views according to user roles (Admin, Editor, Viewer).</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">`UserTable` Component</p>
              <p className="leading-relaxed">Renders user rows and column headers. Emits sorting and paging triggers upward to server route queries.</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">`EditDrawer` Component</p>
              <p className="leading-relaxed">Uses React Portals to render floating action menus over the main dashboard. Manages edit states independently.</p>
            </div>
          </div>
        </section>

        {/* 8. API Contract & 9. Database Schema Idea */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Server className="w-5 h-5 text-indigo-500" />
            8. API Contract & 9. Database Schema
          </h2>

          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h3 className="font-bold text-slate-905 mb-2 text-xs uppercase tracking-wider">GET `/api/users` Contract</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
{`Request:
GET /api/users?page=1&limit=10&search=john&sortBy=name&sortOrder=asc

Response (200 OK):
{
  "users": [
    {
      "id": "usr_90210",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "status": "active"
    }
  ],
  "total": 125,
  "pages": 13
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-slate-905 mb-2 text-xs uppercase tracking-wider">PUT `/api/users/:id` Contract</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
{`Request:
PUT /api/users/usr_90210
Body: { "name": "John Updated", "role": "editor" }

Response (200 OK):
{
  "success": true,
  "user": {
    "id": "usr_90210",
    "name": "John Updated",
    "email": "john@example.com",
    "role": "editor"
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-slate-905 mb-2 text-xs uppercase tracking-wider">PostgreSQL Database Schema</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
{`CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role VARCHAR(20) CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  status VARCHAR(20) CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE system_logs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_logs_timestamp ON system_logs(timestamp);`}
              </pre>
            </div>
          </div>
        </section>

        {/* 10. Step-by-Step Implementation Phases */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-indigo-500" />
            10. Step-by-Step Phases
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            {[
              { phase: "Phase 1: Component Base & Layouts", desc: "Construct reusable primitive UI kits (Buttons, inputs). Set up Next.js layouts with fixed sidebars and fluid content viewports." },
              { phase: "Phase 2: Analytics & Charting Elements", desc: "Integrate area graphs using Recharts. Build lazy-loading hooks to optimize bundle size and prevent layout shifts." },
              { phase: "Phase 3: Data Grid & Search Bindings", desc: "Implement user management grids. Sync input elements and pages parameters directly to Next.js URL SearchParams." },
              { phase: "Phase 4: Slide-over Form Drawers", desc: "Build sidebars that mount via React Portals. Validate fields on the client before triggering backend state mutations." },
              { phase: "Phase 5: Authorization Context Wall", desc: "Enforce route validation. Create client-side session contexts that redirect unauthenticated traffic back to login portals." }
            ].map((p, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="h-6 w-6 rounded-full bg-indigo-50 text-indigo-650 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{p.phase}</h4>
                  <p className="text-slate-650 text-xs mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13. Common Mistakes (Architectural Pitfalls) */}
        <section className="my-8 p-6 bg-red-50/20 border border-red-200 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-red-950 flex items-center gap-2 pb-3 border-b border-red-100">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            13. Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Failing to Debounce Searches:</strong> Executing search requests on every keystroke, causing API route flooding and severe client lag.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Hardcoding Chart Dimensions:</strong> Using fixed width parameters on Recharts blocks, causing dashboards to warp or clip on mobile viewports.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Allowing Page Scrolling under Drawers:</strong> Leaving background body scrolls enabled when drawers slide out, creating a jarring UX.</span>
            </li>
          </ul>
        </section>

        {/* 14. Senior Developer Notes */}
        <section className="my-8 p-6 bg-indigo-50/20 border border-indigo-150 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2 pb-3 border-b border-indigo-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            14. Senior Developer Advice
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              💡 <strong>Use the URL as State:</strong> Never duplicate filter search parameters inside local state hooks. Relying on Next.js query parameter search filters is best: it makes it shareable and keeps browser back buttons functional out of the box.
            </p>
            <p>
              💡 <strong>Bundle Minimization:</strong> Recharts and other layout graphs are heavily sized. Always load them using dynamic imports (`next/dynamic`) with <code>{"{ ssr: false }"}</code> to keep initial load bundles small.
            </p>
          </div>
        </section>

        {/* 11. Testing Checklist & 12. Deployment Checklist */}
        <ProjectChecklist
          title="11. Testing Checklist"
          storageKey="admin-dashboard-testing-detailed"
          items={[
            "Verify table pagination indices adjust to page 1 upon new search inputs.",
            "Verify chart renders scale correctly without throwing window resize loops.",
            "Confirm focus indicators highlight dashboard inputs for keyboard tab keys.",
            "Ensure session routing middleware blocks sub-panels if authentication is empty."
          ]}
        />

        <ProjectChecklist
          title="12. Deployment Checklist"
          storageKey="admin-dashboard-deploy-detailed"
          items={[
            "Configure JWT keys or session cookies using env parameters (.env.production).",
            "Set Cache-Control headers on static JSON configuration files.",
            "Confirm bundle size outputs fall within performance budgets using next build."
          ]}
        />

        {/* 15. Interview Explanation */}
        <InterviewExplanation
          projectName="Admin Dashboard Interface"
          buildDesc="I built an interactive telemetry admin dashboard using Next.js and TypeScript, highlighting key operational data in graph panels, and allowing user administration inside tables."
          approachDesc="I used Next.js App Router for server-rendered page foundations, TailwindCSS for layouts without visual bloat, and Recharts for responsive SVG dashboard graphs."
          challengesDesc="The primary challenge was managing complex table filter syncs. I synced search and page values with browser query params so users can copy/share page states."
          performanceDesc="I lazy-loaded Recharts libraries because they are heavy, optimized tables by paging records on the server side, and memoized expensive row computations."
          errorsDesc="I caught API query errors with local state loaders, falling back to retry buttons, and wrapped nested routes inside a global Next.js error boundary."
          structureDesc="I structured the layout by features: page files are inside app, business configurations reside in lib, and reusable UI nodes live in components/ui."
          productionImprovements={[
            "Establish automated E2E tests using Playwright.",
            "Integrate Sentry to monitor errors dynamically in production.",
            "Implement server-side redis telemetry result caches."
          ]}
        />

        {/* 16. Future Enhancements */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            16. Future Enhancements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-650 leading-relaxed">
            <li>Integrate a drag-and-drop widget customizer using `@dnd-kit/core` to let admins arrange telemetry blocks.</li>
            <li>Add WebSockets support for live active user indicators and system event streams.</li>
            <li>Configure export utilities to download table records as CSV or PDF documents directly.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
