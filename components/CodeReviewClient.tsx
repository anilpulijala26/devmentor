"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ClipboardCheck,
  Check,
  RefreshCw,
  ChevronDown,
  Share2,
  FolderOpen,
  Layers,
  Code2,
  Sliders,
  AlertTriangle,
  Loader,
  Eye,
  Zap,
  Lock,
  FileCode,
  Rocket
} from "lucide-react";
import { GuidePanel } from "./GuidePanel";

interface AuditCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

const CHECKLIST_CATEGORIES: AuditCategory[] = [
  {
    id: "folder-structure",
    title: "Folder Structure",
    description: "Verify project organization, shared folders, and asset placement.",
    items: [
      "Components are segregated logically (e.g. app routes, components/ui controls, features components).",
      "Constants, utilities, API clients reside in centralized folders (e.g. lib/, utils/).",
      "Assets and public files are located in public/."
    ]
  },
  {
    id: "component-reusability",
    title: "Component Reusability",
    description: "Check whether components are modular, reusable, and easy to maintain.",
    items: [
      "Presentation details (colors, sizing) are handled via props instead of hardcoding.",
      "Base elements (Buttons, Inputs) are reusable, extending native HTML attributes.",
      "Components are modular, focusing on a single responsibility."
    ]
  },
  {
    id: "typescript-usage",
    title: "TypeScript Usage",
    description: "Ensure strong typing, safe interfaces, and strict compiler-friendly code.",
    items: [
      "No fallback 'any' parameters. Strict compiler mode is satisfied.",
      "Custom functions, events, and API payloads are typed explicitly.",
      "Union types are preferred over custom arbitrary strings for variant checks."
    ]
  },
  {
    id: "props-state-handling",
    title: "Props & State Handling",
    description: "Review state ownership, defaults, and render performance.",
    items: [
      "State updates do not trigger unnecessary or expensive re-renders.",
      "Props have safe default values in cases of undefined variables.",
      "State is lifted to parents only when shared between sibling elements."
    ]
  },
  {
    id: "api-error-handling",
    title: "API Error Handling",
    description: "Validate request safety, error feedback, and cleanup logic.",
    items: [
      "All fetch requests are wrapped in try/catch bounds.",
      "Granular error prompts are displayed dynamically if HTTP calls crash.",
      "Clean-up triggers abort stale requests when components unmount."
    ]
  },
  {
    id: "loading-states",
    title: "Loading States",
    description: "Confirm smooth loading, disabled states, and layout stability.",
    items: [
      "Animated skeleton containers show visual progress during transit.",
      "Buttons and form controls disable interactions when submissions execute.",
      "Layout skeletons match targeted component heights to eliminate content shifts."
    ]
  },
  {
    id: "accessibility-a11y",
    title: "Accessibility",
    description: "Check semantic HTML, labels, keyboard support, and alt text.",
    items: [
      "Input tags are explicitly bound to labels using htmlFor parameters.",
      "Semantic HTML tags (header, nav, main, footer) structure the layout.",
      "Images feature alt parameters for visual descriptions."
    ]
  },
  {
    id: "performance",
    title: "Performance Optimizations",
    description: "Review lazy loading, memoization, and efficient list rendering.",
    items: [
      "Heavy visual elements (charts, complex panels) are loaded lazily.",
      "Arrays mapping lists use unique IDs instead of indexes for elements mapping keys.",
      "Expensive operations are memoized using useMemo or useCallback wrappers."
    ]
  },
  {
    id: "security-basics",
    title: "Security Basics",
    description: "Validate environment secrets, cookie safety, and input handling.",
    items: [
      "Secrets and private database keys are bound via environment variables.",
      "Auth cookies use HttpOnly, Secure, and SameSite parameters to block scripting access.",
      "Form inputs parse entries safely to prevent SQL injection or cross-site scripting."
    ]
  },
  {
    id: "clean-code",
    title: "Clean Code Standards",
    description: "Check naming, file size, dead code, and maintainability.",
    items: [
      "Code reads clean: no dead diagnostic console logs or commented mockup logs.",
      "Methods, interfaces, and variables have descriptive, readable names.",
      "Files are kept concise (ideally under 150 lines for UI nodes)."
    ]
  },
  {
    id: "deployment-readiness",
    title: "Deployment Readiness",
    description: "Confirm build health, metadata, SEO, and working routes.",
    items: [
      "Production builds successfully compile ('next build') without compiler warning halts.",
      "Metadata, SEO description blocks, and favicons are configured.",
      "Dynamic path links are fully verified to avoid dead links."
    ]
  }
];

export function CodeReviewClient() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  // Accordion state to control category visibility - all collapsed by default
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("CodeNivra-senior-codereview");
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleItem = (categoryId: string, itemIdx: number) => {
    const key = `${categoryId}-${itemIdx}`;
    const updated = { ...checkedState, [key]: !checkedState[key] };
    setCheckedState(updated);
    localStorage.setItem("CodeNivra-senior-codereview", JSON.stringify(updated));
  };

  const toggleCategoryComplete = (categoryId: string, itemsCount: number) => {
    const allChecked = Array.from({ length: itemsCount }).every(
      (_, idx) => checkedState[`${categoryId}-${idx}`]
    );
    const updated = { ...checkedState };
    for (let idx = 0; idx < itemsCount; idx++) {
      updated[`${categoryId}-${idx}`] = !allChecked;
    }
    setCheckedState(updated);
    localStorage.setItem("CodeNivra-senior-codereview", JSON.stringify(updated));
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all checklist categories?")) {
      setCheckedState({});
      localStorage.removeItem("CodeNivra-senior-codereview");
    }
  };

  const exportSummary = () => {
    const categoryLines = CHECKLIST_CATEGORIES.map((cat, catIdx) => {
      const checkedCount = cat.items.filter((_, idx) => checkedState[`${cat.id}-${idx}`]).length;
      const status = checkedCount === cat.items.length ? "Complete" : checkedCount > 0 ? "In Progress" : "Not Started";
      let lines = `### ${catIdx + 1}. ${cat.title} (${checkedCount}/${cat.items.length} Checked - ${status})\n`;
      cat.items.forEach((item, idx) => {
        const isChecked = !!checkedState[`${cat.id}-${idx}`];
        lines += `${isChecked ? "[x]" : "[ ]"} ${item}\n`;
      });
      return lines;
    }).join("\n");

    const text = `# CodeNivra Senior Code Audit Report\n\n` +
      `**Progress**: ${progressPercent}% Complete (${totalChecked}/${totalItems} Guidelines checked)\n` +
      `**Status**: ${getReviewStatus()}\n\n` +
      `## Category Details\n\n` +
      categoryLines;

    navigator.clipboard.writeText(text);
    alert("Full markdown code audit report successfully copied to clipboard!");
  };

  const totalItems = CHECKLIST_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const totalChecked = Object.keys(checkedState).filter((key) => checkedState[key]).length;
  const progressPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const getReviewStatus = () => {
    if (totalChecked === 0) return "Not Started";
    if (totalChecked === totalItems) return "Ready";
    return "In Progress";
  };

  const getStatusBadgeColor = (status: string) => {
    return {
      "Not Started": "bg-slate-50 border-slate-200 text-slate-500",
      "In Progress": "bg-amber-50 border-amber-200 text-amber-700",
      "Complete": "bg-emerald-50 border-emerald-200 text-emerald-700"
    }[status] || "bg-slate-50 text-slate-500 border-slate-200";
  };

  const getCategoryIcon = (id: string) => {
    const mapping: Record<string, React.ReactNode> = {
      "folder-structure": <FolderOpen className="w-4.5 h-4.5" />,
      "component-reusability": <Layers className="w-4.5 h-4.5" />,
      "typescript-usage": <Code2 className="w-4.5 h-4.5" />,
      "props-state-handling": <Sliders className="w-4.5 h-4.5" />,
      "api-error-handling": <AlertTriangle className="w-4.5 h-4.5" />,
      "loading-states": <Loader className="w-4.5 h-4.5" />,
      "accessibility-a11y": <Eye className="w-4.5 h-4.5" />,
      "performance": <Zap className="w-4.5 h-4.5" />,
      "security-basics": <Lock className="w-4.5 h-4.5" />,
      "clean-code": <FileCode className="w-4.5 h-4.5" />,
      "deployment-readiness": <Rocket className="w-4.5 h-4.5" />
    };
    return mapping[id] || <ClipboardCheck className="w-4.5 h-4.5" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-14 lg:py-20 relative animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Senior Code Review Console
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold tracking-tight text-slate-900">
            Senior Code Review Console
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            Audit your codebase against production-ready frontend, accessibility, performance, security, and deployment standards.
          </p>
          <div className="inline-block text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md">
            33 Guidelines &bull; 11 Categories
          </div>
        </div>

        {/* Console Actions Toolbar */}
        <div className="flex gap-2.5 shrink-0 self-start md:self-center">
          <button
            onClick={exportSummary}
            className="h-12 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-750 text-white font-semibold px-4 rounded-xl text-sm transition cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Share2 className="w-4 h-4" />
            Export Summary
          </button>
          <button
            onClick={resetAll}
            className="h-12 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-4 rounded-xl text-sm transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Console
          </button>
        </div>
      </div>

      {/* Guide Panel */}
      <GuidePanel
        title="Code Review Navigator"
        what="Self-assessment console for security, styling, and accessibility audits."
        who="Developers validating tasks and projects before deployment."
        first="Select a guideline category and review your local files."
        next="Correct lint warnings, run build audits, and deploy."
        outcome="MNC-grade code quality compliant with production standards."
        nextAction="Audit your project before deployment."
      />

      {/* 2. Audit Summary Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between min-h-[100px]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Progress</p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{progressPercent}%</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between min-h-[100px]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guidelines Checked</p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{totalChecked} / 33</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between min-h-[100px]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Review Categories</p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">11 Sections</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between min-h-[100px]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ready for Review</p>
          <div className="mt-2">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              getReviewStatus() === "Ready"
                ? "bg-emerald-50 border-emerald-250 text-emerald-700"
                : getReviewStatus() === "In Progress"
                ? "bg-amber-50 border-amber-250 text-amber-700"
                : "bg-slate-50 border-slate-250 text-slate-500"
            }`}>
              {getReviewStatus()}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Progress Visualization Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-2xs space-y-4">
        <div className="flex justify-between items-center text-slate-800">
          <span className="text-sm font-bold flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-indigo-600" /> Console Progress
          </span>
          <span className="text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100">
            {progressPercent}% Complete
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 font-semibold italic text-center sm:text-left">
          Complete all categories before submitting your PR.
        </p>
      </div>

      {/* 4. Categories Accordion Cards */}
      <div className="space-y-4">
        {CHECKLIST_CATEGORIES.map((cat, catIdx) => {
          const catChecked = cat.items.reduce((sum, item, idx) => {
            return sum + (checkedState[`${cat.id}-${idx}`] ? 1 : 0);
          }, 0);
          const isExpanded = !!expandedCategories[cat.id];

          const catStatus =
            catChecked === cat.items.length
              ? "Complete"
              : catChecked > 0
              ? "In Progress"
              : "Not Started";

          return (
            <div
              key={cat.id}
              className="border border-slate-100 bg-white rounded-3xl overflow-hidden shadow-2xs hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Category Header Button */}
              <button
                onClick={() => toggleCategory(cat.id)}
                aria-expanded={isExpanded}
                aria-controls={`panel-${cat.id}`}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition hover:bg-slate-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
              >
                <div className="flex items-start gap-4 pr-4">
                  {/* Category numeric indicator */}
                  <span className="text-xl sm:text-2xl font-black text-slate-300 tracking-wider font-mono pt-1">
                    {String(catIdx + 1).padStart(2, "0")}
                  </span>
                  
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        {getCategoryIcon(cat.id)}
                        {cat.title}
                      </h3>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border uppercase tracking-wider ${getStatusBadgeColor(catStatus)}`}>
                        {catStatus}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-block text-xs font-bold bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded">
                    {catChecked} / {cat.items.length} COMPLETED
                  </span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 transition-all duration-300 ${
                    isExpanded ? "transform rotate-180 bg-indigo-50 border-indigo-200 text-indigo-600" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {/* Accordion Items List Body */}
              <div
                id={`panel-${cat.id}`}
                role="region"
                className={`grid transition-all duration-300 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 border-t border-slate-50 space-y-4">
                    
                    {/* Checklist Guideline Rows */}
                    <div className="space-y-2">
                      {cat.items.map((item, idx) => {
                        const key = `${cat.id}-${idx}`;
                        const isChecked = !!checkedState[key];

                        return (
                          <button
                            key={idx}
                            onClick={() => toggleItem(cat.id, idx)}
                            role="checkbox"
                            aria-checked={isChecked}
                            className="w-full flex items-start gap-4 text-left p-3.5 rounded-2xl transition hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                          >
                            {isChecked ? (
                              <div className="w-5 h-5 rounded-md bg-indigo-600 border border-indigo-700 text-white flex items-center justify-center shrink-0 mt-0.5 transition-all">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-md border border-slate-300 hover:border-slate-400 bg-white shrink-0 mt-0.5 transition-all" />
                            )}
                            <span className={`text-sm font-semibold leading-relaxed transition-all ${
                              isChecked ? "text-slate-400 line-through" : "text-slate-700"
                            }`}>
                              {item}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Category Action Helper */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-2xs font-bold text-slate-400">
                        {catChecked} of {cat.items.length} requirements met
                      </span>
                      <button
                        onClick={() => toggleCategoryComplete(cat.id, cat.items.length)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded px-1.5 py-1 cursor-pointer"
                      >
                        {catChecked === cat.items.length ? "Reset Category Requirements" : "Mark Category as Complete"}
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
