'use client';

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  {
    title: "Build with Semantics",
    detail: "Use semantic HTML for accessibility, SEO, and maintainability.",
  },
  {
    title: "Master the Box Model",
    detail: "Layout issues vanish once you understand spacing and flow.",
  },
  {
    title: "Think in Components",
    detail: "Break UI into reusable pieces before adding state.",
  },
  {
    title: "Async is Everywhere",
    detail: "Promises + async/await are core to modern web apps.",
  },
  {
    title: "Type Safety Wins",
    detail: "TypeScript catches bugs early and speeds refactors.",
  },
];

export function DashboardHighlights() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-indigo-700">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Must-know concepts
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              {HIGHLIGHTS[activeIndex].title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {HIGHLIGHTS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show highlight ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === activeIndex ? "bg-indigo-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600 transition-all duration-300">
        {HIGHLIGHTS[activeIndex].detail}
      </p>
    </div>
  );
}
