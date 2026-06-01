"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ClipboardCheck, CheckSquare, Square, RefreshCw } from "lucide-react";

interface AuditCategory {
  id: string;
  title: string;
  items: string[];
}

const CHECKLIST_CATEGORIES: AuditCategory[] = [
  {
    id: "folder-structure",
    title: "1. Folder Structure",
    items: [
      "Components are segregated logically (e.g. app routes, components/ui controls, features components).",
      "Constants, utilities, API clients reside in centralized folders (e.g. lib/, utils/).",
      "Assets and public files are located in public/."
    ]
  },
  {
    id: "component-reusability",
    title: "2. Component Reusability",
    items: [
      "Presentation details (colors, sizing) are handled via props instead of hardcoding.",
      "Base elements (Buttons, Inputs) are reusable, extending native HTML attributes.",
      "Components are modular, focusing on a single responsibility."
    ]
  },
  {
    id: "typescript-usage",
    title: "3. TypeScript Usage",
    items: [
      "No fallback 'any' parameters. Strict compiler mode is satisfied.",
      "Custom functions, events, and API payloads are typed explicitly.",
      "Union types are preferred over custom arbitrary strings for variant checks."
    ]
  },
  {
    id: "props-state-handling",
    title: "4. Props & State Handling",
    items: [
      "State updates do not trigger unnecessary or expensive re-renders.",
      "Props have safe default values in cases of undefined variables.",
      "State is lifted to parents only when shared between sibling elements."
    ]
  },
  {
    id: "api-error-handling",
    title: "5. API Error Handling",
    items: [
      "All fetch requests are wrapped in try/catch bounds.",
      "Granular error prompts are displayed dynamically if HTTP calls crash.",
      "Clean-up triggers abort stale requests when components unmount."
    ]
  },
  {
    id: "loading-states",
    title: "6. Loading States",
    items: [
      "Animated skeleton containers show visual progress during transit.",
      "Buttons and form controls disable interactions when submissions execute.",
      "Layout skeletons match targeted component heights to eliminate content shifts."
    ]
  },
  {
    id: "accessibility-a11y",
    title: "7. Accessibility (A11y)",
    items: [
      "Input tags are explicitly bound to labels using htmlFor parameters.",
      "Semantic HTML tags (header, nav, main, footer) structure the layout.",
      "Images feature alt parameters for visual descriptions."
    ]
  },
  {
    id: "performance",
    title: "8. Performance Optimizations",
    items: [
      "Heavy visual elements (charts, complex panels) are loaded lazily.",
      "Arrays mapping lists use unique IDs instead of indexes for elements mapping keys.",
      "Expensive operations are memoized using useMemo or useCallback wrappers."
    ]
  },
  {
    id: "security-basics",
    title: "9. Security Basics",
    items: [
      "Secrets and private database keys are bound via environment variables.",
      "Auth cookies use HttpOnly, Secure, and SameSite parameters to block scripting access.",
      "Form inputs parse entries safely to prevent SQL injection or cross-site scripting."
    ]
  },
  {
    id: "clean-code",
    title: "10. Clean Code Standards",
    items: [
      "Code reads clean: no dead diagnostic console logs or commented mockup logs.",
      "Methods, interfaces, and variables have descriptive, readable names.",
      "Files are kept concise (ideally under 150 lines for UI nodes)."
    ]
  },
  {
    id: "deployment-readiness",
    title: "11. Deployment Readiness",
    items: [
      "Production builds successfully compile ('next build') without compiler warning halts.",
      "Metadata, SEO description blocks, and favicons are configured.",
      "Dynamic path links are fully verified to avoid dead links."
    ]
  }
];

export function CodeReviewClient() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("devmentor-senior-codereview");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setCheckedState(parsed);
        }, 0);
      } catch {
        // ignore
      }
    }
  }, []);

  const toggleItem = (categoryId: string, itemIdx: number) => {
    const key = `${categoryId}-${itemIdx}`;
    const updated = { ...checkedState, [key]: !checkedState[key] };
    setCheckedState(updated);
    localStorage.setItem("devmentor-senior-codereview", JSON.stringify(updated));
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all checklist categories?")) {
      setCheckedState({});
      localStorage.removeItem("devmentor-senior-codereview");
    }
  };

  const totalItems = CHECKLIST_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const totalChecked = Object.keys(checkedState).filter((key) => checkedState[key]).length;
  const progressPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50/15 border border-pink-100 text-pink-700 text-xs font-semibold mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-pink-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Auditing Like a Senior Developer
          </div>
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Senior Code Review Checklist
          </h1>
          <p className="text-sm sm:text-base text-slate-655 mt-2 max-w-2xl leading-relaxed">
            Before shipping to production or requesting team approvals, verify your code against this list of senior guidelines.
          </p>
        </div>

        {/* Reset button */}
        <button
          onClick={resetAll}
          className="self-start md:self-center inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Checklist
        </button>
      </div>

      {/* Global Progress Bar */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl mb-10 shadow-xs dark:bg-slate-900 dark:border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-2 dark:text-slate-150">
            <ClipboardCheck className="w-5 h-5 text-indigo-650" /> Audit Progress
          </span>
          <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full dark:bg-slate-800 dark:text-indigo-400">
            {progressPercent}% ({totalChecked} / {totalItems} Guidelines checked)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-6">
        {CHECKLIST_CATEGORIES.map((cat) => {
          const catChecked = cat.items.reduce((sum, item, idx) => {
            return sum + (checkedState[`${cat.id}-${idx}`] ? 1 : 0);
          }, 0);

          return (
            <div
              key={cat.id}
              className="border border-slate-200 bg-white rounded-3xl p-6 shadow-xs relative dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {cat.title}
                </h3>
                <span className="text-2xs font-extrabold bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                  {catChecked} / {cat.items.length} COMPLETED
                </span>
              </div>

              <div className="space-y-3">
                {cat.items.map((item, idx) => {
                  const key = `${cat.id}-${idx}`;
                  const isChecked = !!checkedState[key];

                  return (
                    <button
                      key={idx}
                      onClick={() => toggleItem(cat.id, idx)}
                      className="w-full flex items-start gap-3 text-left p-2.5 rounded-xl transition hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-indigo-650 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-350 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm font-medium ${isChecked ? "text-slate-400 line-through" : "text-slate-650 dark:text-slate-300"}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
