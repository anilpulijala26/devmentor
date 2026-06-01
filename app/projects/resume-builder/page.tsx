import React from "react";
import Link from "next/link";
import { ChevronLeft, FolderTree, Layers, Server, Cpu, Info, Target, Wrench, ShieldAlert, Sparkles } from "lucide-react";
import { ProjectChecklist } from "@/components/mdx/ProjectChecklist";
import { InterviewExplanation } from "@/components/mdx/InterviewExplanation";

export const metadata = {
  title: "Resume Builder - Project Lab | CodeNivra",
  description: "Detailed system design, requirements, and templates for the Resume Builder App.",
};

export default function ResumeBuilderPage() {
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
            LAB // RESUME-BUILDER
          </span>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border bg-violet-50 text-violet-700 border-violet-200">
              Intermediate Lab
            </span>
            <span className="text-xs text-slate-500 font-semibold">2 - 3 Weeks Duration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Resume Builder App
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Build a client-side resume builder web application. You will structure multi-step form wizards, manage dynamic arrays for experiences, write live preview renders, and compile downloadable PDF layouts.
          </p>
        </div>

        {/* 1. Project Overview & 2. Who Should Build This */}
        <div className="grid sm:grid-cols-2 gap-6 my-8">
          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info className="w-4.5 h-4.5 text-indigo-500" />
              1. Project Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Design an interactive CV editor where developers input details, experience records, and education dynamically. The app renders a live side-by-side preview and compiles printable PDFs.
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Target className="w-4.5 h-4.5 text-indigo-500" />
              2. Who Should Build This?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Aspiring UI engineers who need to master complex form layouts, react state management of nested arrays, client document compilation pipelines, and print stylesheets.
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
                Building a resume requires a clean, step-by-step wizard. Users want to dynamically add/remove multiple job histories, custom tags, and education blocks. The form fields must validate dynamically (e.g. valid emails, start/end dates check). The layout builder must offer preset templates (Modern, Classic, Professional) and let users download standard-compliant PDFs directly from the browser.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Core Features List</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600">
                <li><strong className="text-slate-900">Multi-Step Form Wizard:</strong> Tabs separating Info, Experience, and Education.</li>
                <li><strong className="text-slate-900">Dynamic List Mutator:</strong> Add, edit, reorder, or delete experience cards.</li>
                <li><strong className="text-slate-900">Live Preview Canvas:</strong> Side-by-side rendering window reflecting edits.</li>
                <li><strong className="text-slate-900">PDF Print Engine:</strong> Export high-quality standard PDFs using web-print overrides.</li>
                <li><strong className="text-slate-900">Template Presets:</strong> Toggles for modern, traditional, or minimal styles.</li>
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
              <span className="font-bold text-slate-800">Core Stack</span>
              <p className="text-xs text-slate-500 mt-1">Next.js & React 19 & TypeScript</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">PDF Generator</span>
              <p className="text-xs text-slate-500 mt-1">@react-pdf/renderer or CSS @media print</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">Styling</span>
              <p className="text-xs text-slate-500 mt-1">TailwindCSS & Lucide icons</p>
            </div>
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
            {`resume-builder/
├── app/
│   ├── page.tsx               # Primary editing grid workspace
│   └── layout.tsx
├── components/
│   ├── FormWizard/
│   │   ├── StepPersonal.tsx    # Details inputs
│   │   ├── StepExperience.tsx  # Work lists
│   │   └── StepEducation.tsx   # Education inputs
│   ├── Preview/
│   │   ├── LivePreview.tsx     # Preview pane
│   │   ├── TemplateClassic.tsx # Classic preset styling
│   │   └── TemplateModern.tsx  # Modern layout styling
│   └── ui/
│       ├── WizardTabs.tsx      # Step triggers
│       └── InputGroup.tsx      # Reusable fields
├── lib/
│   ├── validation.ts          # Zod validation models
│   └── templates.ts           # Styles definitions
└── types/
    └── resume.ts              # Interface specifications`}
          </pre>
        </section>

        {/* 7. Component Breakdown */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <FolderTree className="w-5 h-5 text-indigo-500" />
            7. Component Breakdown
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div>
              <p className="font-bold text-slate-800 mb-1">`FormWizard` Component</p>
              <p className="leading-relaxed">A central state coordinator. Holds values for sub-steps, tracks validation flags, and handles multi-step flow navigations.</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">`StepExperience` Component</p>
              <p className="leading-relaxed">Manages an array of experience blocks. Lets users append new entries, remove indexes, and fill fields dynamically.</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">`LivePreview` Component</p>
              <p className="leading-relaxed">Renders a visual page representation side-by-side with inputs. Scales using CSS transforms to fit split-view panels.</p>
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
              <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">POST `/api/resumes` Contract</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                {`Request body payload:
{
  "title": "My Software Engineer Resume",
  "templateId": "modern-classic",
  "personalInfo": {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1 555-123-4567"
  },
  "experiences": [
    {
      "id": "exp-1",
      "company": "Tech Corp",
      "position": "Frontend Engineer",
      "startDate": "2024-01-01",
      "endDate": "Present",
      "highlights": "Led React Migration project"
    }
  ]
}

Response (201 Created):
{
  "success": true,
  "resumeId": "cv_77889"
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">PostgreSQL Database Schema</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                {`CREATE TABLE resumes (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  title VARCHAR(150) NOT NULL DEFAULT 'Untitled Resume',
  template_id VARCHAR(50) NOT NULL DEFAULT 'classic',
  personal_info JSONB NOT NULL DEFAULT '{}',
  experience JSONB NOT NULL DEFAULT '[]',
  education JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resumes_user ON resumes(user_id);`}
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
              { phase: "Phase 1: Forms Wizard & Layout Layouts", desc: "Build multi-step tab flows. Program basic input cards and next/back buttons." },
              { phase: "Phase 2: Dynamic List State Handling", desc: "Develop hooks to handle push/pop mutations on nesting array inputs (e.g. jobs, schools lists)." },
              { phase: "Phase 3: Live Preview Syncing", desc: "Connect form states directly to a graphic preview column. Implement CSS scaling filters to preview full pages." },
              { phase: "Phase 4: Stylesheet Themes Selection", desc: "Implement templates configuration. Create style bindings swapping layout components on the fly." },
              { phase: "Phase 5: Print Export & Download", desc: "Incorporate client PDF print engines or custom CSS media print setups to compile A4 documents cleanly." }
            ].map((p, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="h-6 w-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{p.phase}</h4>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{p.desc}</p>
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
              <span><strong>Using Array Indices as React Keys:</strong> Using array index offsets <code>{"key={idx}"}</code> on mutable lists. When jobs are deleted, inputs swap values, breaking input focus hooks. Use unique UUID hashes instead.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Compiling PDFs on Every Keystroke:</strong> Running PDF compiling engines on every single input key action, causing browser freeze. Debounce compiler updates.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Ignoring CSS Page-Break Constraints:</strong> Not setting `page-break-inside: avoid` elements, letting text split awkwardly across pages in prints.</span>
            </li>
          </ul>
        </section>

        {/* 14. Senior Developer Notes */}
        <section className="my-8 p-6 bg-indigo-50/20 border border-indigo-200 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2 pb-3 border-b border-indigo-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            14. Senior Developer Advice
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              💡 <strong>Unique ID Preservation:</strong> Always assign unique identifiers (`crypto.randomUUID()`) to dynamically-added experience items as soon as they are added. This guarantees robust mapping and prevents form key bugs.
            </p>
            <p>
              💡 <strong>Avoid Heavy Client Packages:</strong> Heavy libraries like pdfmake or react-pdf bloat loading bundles. Try styling with Tailwind, setting print classes (`print:hidden`, `print:block`), and triggering `window.print()` to let browsers leverage native print features.
            </p>
          </div>
        </section>

        {/* 11. Testing Checklist & 12. Deployment Checklist */}
        <ProjectChecklist
          title="11. Testing Checklist"
          storageKey="resume-builder-testing"
          items={[
            "Verify dynamic lists allow multiple work experiences to add, reorder, and delete.",
            "Verify validation schemas restrict start/end date logic values.",
            "Ensure that print output scales correctly to single/multi-page A4 sizes without text clipping.",
            "Verify inputs retain cursor focus during state updates."
          ]}
        />

        <ProjectChecklist
          title="12. Deployment Checklist"
          storageKey="resume-builder-deploy"
          items={[
            "Set cache boundaries on PDF templates elements.",
            "Test print media queries across chromium and webkit browser engines.",
            "Ensure build files are fully minified and tree-shaken."
          ]}
        />

        {/* 15. Interview Explanation */}
        <InterviewExplanation
          projectName="Resume Builder App"
          buildDesc="I built a client-side resume builder web application featuring dynamic form wizards, nested experience lists, and a live PDF compiler."
          approachDesc="I coupled React's form controls with structured validation models, and integrated browser print hooks to compile documents."
          challengesDesc="The primary challenge was managing complex state for dynamic, deeply nested forms. I solved this by treating array mutations as immutable actions, ensuring unique element keys."
          performanceDesc="I debounced preview renders to offload calculations, keeping inputs smooth."
          errorsDesc="I handled field errors through visual validation rings, and trapped print crashes using React error wrappers."
          structureDesc="The codebase is structured with page views in app, form controls in step components, and templates styling definitions in helper files."
          productionImprovements={[
            "Establish E2E integration test suites with Playwright.",
            "Integrate third-party API import utilities.",
            "Add automated grammar checks for resume descriptions."
          ]}
        />

        {/* 16. Future Enhancements */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            16. Future Enhancements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li>Integrate LLM API hooks to offer users resume description refinement suggestions.</li>
            <li>Incorporate support for LinkedIn XML profile imports.</li>
            <li>Configure hosting links to let users share public versions of their resumes online.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
