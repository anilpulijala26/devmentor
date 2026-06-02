"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles, ClipboardCheck, Check, RefreshCw, ChevronDown, Share2,
  FolderOpen, Layers, Code2, Sliders, AlertTriangle, Loader, Eye,
  Zap, Lock, FileCode, Rocket, Info, AlertCircle, HelpCircle, XCircle
} from "lucide-react";

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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});

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

  const toggleExample = (categoryId: string) => {
    setShowExamples(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all checklist categories?")) {
      setCheckedState({});
      localStorage.removeItem("CodeNivra-senior-codereview");
    }
  };

  // Upgraded progress metrics
  const totalItems = CHECKLIST_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const totalChecked = Object.keys(checkedState).filter((key) => checkedState[key]).length;
  const progressPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  // New readiness status limits
  const getReviewStatusInfo = () => {
    if (progressPercent <= 40) return { label: "Needs Work", color: "text-red-750 bg-red-50 border-red-200" };
    if (progressPercent <= 75) return { label: "In Progress", color: "text-amber-705 bg-amber-50 border-amber-200" };
    if (progressPercent <= 90) return { label: "Almost Ready", color: "text-indigo-705 bg-indigo-50 border-indigo-200" };
    return { label: "Production Ready", color: "text-emerald-705 bg-emerald-50 border-emerald-250 font-bold" };
  };

  // Severity Mappings
  const getSeverity = (id: string): { label: "Critical" | "Important" | "Recommended"; color: string } => {
    const mapping: Record<string, "Critical" | "Important" | "Recommended"> = {
      "accessibility-a11y": "Critical",
      "security-basics": "Critical",
      "api-error-handling": "Critical",
      "deployment-readiness": "Critical",
      "performance": "Important",
      "typescript-usage": "Important",
      "props-state-handling": "Important",
      "component-reusability": "Important",
      "clean-code": "Important",
      "folder-structure": "Recommended",
      "loading-states": "Recommended"
    };
    const label = mapping[id] || "Important";
    const color = {
      Critical: "bg-red-50 text-red-700 border-red-100",
      Important: "bg-amber-50 text-amber-700 border-amber-100",
      Recommended: "bg-blue-50 text-blue-700 border-blue-100"
    }[label];
    return { label, color };
  };

  // Why it matters text mappings
  const getWhyItMattersText = (id: string): string => {
    const mapping: Record<string, string> = {
      "folder-structure": "Consistent layout ensures fast developer onboarding and makes code maintainability and modular updates trivial.",
      "component-reusability": "Modularity eliminates double-maintenance code bugs and keeps client scripts slim.",
      "typescript-usage": "Strong typings identify bug traces at compile time, completely avoiding production runtime crash errors.",
      "props-state-handling": "Proper state scopes prevent wasteful parent rerenders and optimize overall paint response times.",
      "api-error-handling": "Graceful error catcher loops prevent blank white screens and provide helpful hints when connections fail.",
      "loading-states": "Visual skeletons tell users data is loading, preventing multiple click actions and layout shifts.",
      "accessibility-a11y": "Semantic HTML and label pairings ensure the application can be navigated by assistive technologies and screen readers.",
      "performance": "Memoization and dynamic imports minimize initial script sizes, keeping site speed load times under 1 second.",
      "security-basics": "Isolating secret keys in .env.local and blocking injection entries protects backend servers from exploit vectors.",
      "clean-code": "Descriptive variable naming and single-responsibility code blocks keep projects readable for peer engineering reviews.",
      "deployment-readiness": "Compiling build checks and validating dynamic router paths in advance prevents pipeline release failures."
    };
    return mapping[id] || "Enforces production engineering standards.";
  };

  // Good vs Bad code examples
  const getExamples = (id: string): { bad: string; good: string } => {
    const mapping: Record<string, { bad: string; good: string }> = {
      "folder-structure": {
        bad: "// Single giant file containing all state, styles and API methods\ncomponents/MainAppContainer.tsx",
        good: "// Segregated files by responsibility\ncomponents/ui/Button.tsx\ncomponents/features/KanbanBoard.tsx"
      },
      "component-reusability": {
        bad: "// Styled directly in-line everywhere\n<button className=\"px-4 py-2 bg-blue-600 rounded\">Click</button>",
        good: "// Configured once as a reusable base component\nexport function Button({ children, ...props }) {\n  return <button className=\"px-4 py-2 bg-indigo-650 text-white rounded-xl hover:bg-indigo-700\" {...props}>{children}</button>;\n}"
      },
      "typescript-usage": {
        bad: "// Bypassing typescript compiler checks\nfunction saveUser(user: any) { ... }",
        good: "// Strict typing mapping input fields\ninterface UserProfile { id: string; email: string; }\nfunction saveUser(user: UserProfile) { ... }"
      },
      "props-state-handling": {
        bad: "// Declared inside child elements independently\nconst [theme, setTheme] = useState('light');",
        good: "// Lifted to a shared Context Provider\nconst ThemeContext = React.createContext('light');"
      },
      "api-error-handling": {
        bad: "// Request made without exception catches\nfetch('/api/user').then(r => r.json());",
        good: "// Captured inside try-catch block bounds\ntry {\n  const res = await fetch('/api/user');\n} catch (err) {\n  setError(err.message);\n}"
      },
      "loading-states": {
        bad: "// Blank white screen while data fetch is running\nif (loading) return null;",
        good: "// Skeleton loading elements representing target heights\nif (loading) return <StatsCardSkeleton />;"
      },
      "accessibility-a11y": {
        bad: "// Unreachable by keyboard elements\n<div onClick={submit}>Submit Registration</div>",
        good: "// Semantic elements with aria attributes\n<button onClick={submit} aria-label=\"Submit Registration\">Submit</button>"
      },
      "performance": {
        bad: "// Giant uncompressed images\n<img src=\"large-asset.png\" />",
        good: "// Lazily loaded compressed next-gen extensions\n<Image src=\"/large.webp\" loading=\"lazy\" />"
      },
      "security-basics": {
        bad: "// Exposing private keys in repository commits\nconst API_SECRET = \"sk_live_12345\";",
        good: "// Stored in host environment secrets\nconst API_SECRET = process.env.API_SECRET;"
      },
      "clean-code": {
        bad: "// Vague arbitrary naming\nconst [x, setX] = useState(true);",
        good: "// Explicit descriptive variable tags\nconst [isModalOpen, setIsModalOpen] = useState(true);"
      },
      "deployment-readiness": {
        bad: "// Committing files containing compilation errors or print warnings\nconsole.log(\"Temporary check\");",
        good: "// Standard Next.js metadata configurations\nexport const metadata = { title: 'Dashboard' };"
      }
    };
    return mapping[id] || { bad: "// Hardcoded values", good: "// Clean configurations" };
  };

  // Upgraded Export Summary report
  const exportSummary = () => {
    const pendingCategories: string[] = [];
    const criticalPendingItems: string[] = [];

    CHECKLIST_CATEGORIES.forEach((cat) => {
      const isCritical = getSeverity(cat.id).label === "Critical";
      const catPending: string[] = [];

      cat.items.forEach((item, idx) => {
        const isChecked = !!checkedState[`${cat.id}-${idx}`];
        if (!isChecked) {
          catPending.push(item);
          if (isCritical) {
            criticalPendingItems.push(`[${cat.title}] ${item}`);
          }
        }
      });

      if (catPending.length > 0) {
        pendingCategories.push(`${cat.title} (${catPending.length} pending)`);
      }
    });

    const statusInfo = getReviewStatusInfo();
    const nextAction = criticalPendingItems.length > 0
      ? "Resolve critical pending checklist items (Accessibility, Security, API Error Handling, Deployment)."
      : "Excellent! Proceed with Vercel/Render production deployment steps.";

    const text = `# CodeNivra Senior Code Audit Report\n\n` +
      `**Progress**: ${progressPercent}% Complete (${totalChecked}/${totalItems} Guidelines checked)\n` +
      `**Status**: ${statusInfo.label}\n\n` +
      `## Audit Summary\n` +
      `- **Total Checked**: ${totalChecked} guidelines\n` +
      `- **Pending Categories**: ${pendingCategories.length > 0 ? pendingCategories.join(", ") : "None"}\n` +
      `- **Critical Pending Guidelines**: ${criticalPendingItems.length > 0 ? criticalPendingItems.length : "0"}\n\n` +
      (criticalPendingItems.length > 0 ? `### Critical Pending Items:\n` + criticalPendingItems.map(item => `- ${item}`).join("\n") + `\n\n` : "") +
      `## Suggested Next Action\n` +
      `> ${nextAction}\n\n` +
      `---\n` +
      `*Audited on CodeNivra Code Review Console.*`;

    navigator.clipboard.writeText(text);
    alert("Upgraded audit summary markdown report copied to clipboard!");
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

  const statusInfo = getReviewStatusInfo();

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
            className="h-12 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-755 text-white font-semibold px-4 rounded-xl text-sm transition cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
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

      {/* 1. Collapsible 'How to use this console' section */}
      <section className="bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden transition-all duration-300">
        <button
          onClick={() => setIsHowToOpen(!isHowToOpen)}
          aria-expanded={isHowToOpen}
          className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-100 transition cursor-pointer outline-none"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            How to use this console
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isHowToOpen ? "transform rotate-180" : ""}`} />
        </button>
        {isHowToOpen && (
          <div className="px-6 pb-5 pt-1 border-t border-slate-200/60 bg-white text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
            <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-1">
              <li>Open one checklist category by expanding the accordion panel below.</li>
              <li>Review your local project code against the specified engineering guidelines.</li>
              <li>Tick only completed items when your implementation meets the standard.</li>
              <li>Fix pending issues in your editor if any guidelines remain unchecked.</li>
              <li>Export summary to your clipboard before executing your production deployment.</li>
            </ol>
          </div>
        )}
      </section>

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
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusInfo.color}`}>
              {statusInfo.label}
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
          <span className="text-xs sm:text-sm font-bold text-indigo-705 bg-indigo-50/85 px-3 py-1 rounded-full border border-indigo-100">
            {progressPercent}% Complete
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-450 font-semibold italic text-center sm:text-left">
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
          const severity = getSeverity(cat.id);

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
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border uppercase tracking-wider ${severity.color}`}>
                        {severity.label}
                      </span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border uppercase tracking-wider ${statusInfo.color}`}>
                        {catStatus}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-555 font-semibold leading-relaxed">
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
                    
                    {/* Why it matters block */}
                    <div className="p-3 bg-indigo-50/20 border border-indigo-100 rounded-xl flex gap-2 items-start text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      <Info className="w-4 h-4 text-indigo-550 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800">Why it matters: </strong>
                        {getWhyItMattersText(cat.id)}
                      </div>
                    </div>

                    {/* Good vs Bad Examples Collapsed Accordion */}
                    <div className="border border-slate-150 rounded-2xl overflow-hidden bg-slate-50/30">
                      <button
                        onClick={() => toggleExample(cat.id)}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left font-bold text-2xs uppercase tracking-wider text-slate-500 hover:bg-slate-100 transition cursor-pointer outline-none"
                      >
                        <span>Code Reference: Good vs Bad Pattern</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showExamples[cat.id] ? "transform rotate-180" : ""}`} />
                      </button>
                      {showExamples[cat.id] && (
                        <div className="p-4 border-t border-slate-150 bg-white grid sm:grid-cols-2 gap-4 font-mono text-2xs leading-relaxed">
                          <div className="space-y-1.5">
                            <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> BAD PATTERN</span>
                            <pre className="bg-red-50/20 border border-red-100 p-3 rounded-xl overflow-x-auto text-slate-700">{getExamples(cat.id).bad}</pre>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> GOOD PATTERN</span>
                            <pre className="bg-emerald-50/20 border border-emerald-100 p-3 rounded-xl overflow-x-auto text-slate-700">{getExamples(cat.id).good}</pre>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Checklist Guideline Rows */}
                    <div className="space-y-1">
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
                              isChecked ? "text-slate-400 line-through font-normal" : "text-slate-700"
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
