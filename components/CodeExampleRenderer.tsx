import React from "react";
import { CodeBlock } from "./CodeBlock";

export interface FullCodeData {
  title?: string;
  description?: string;
  language?: string;
  code?: string;
}

interface CodeExampleRendererProps {
  lesson?: any;
  track?: any;
  currentModule?: any;
}

export function CodeExampleRenderer({ lesson, track, currentModule }: CodeExampleRendererProps) {
  const fullCode =
    lesson?.frontmatter?.fullCode ||
    lesson?.fullCode ||
    currentModule?.fullCode ||
    track?.fullCode;

  if (!fullCode || !fullCode.code || !fullCode.code.trim()) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center my-6">
        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
          Full code example for this lesson is coming soon.
        </p>
      </div>
    );
  }

  const language = fullCode.language || "javascript";

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-950">
          {fullCode.title || "Complete Runnable Code"}
        </h3>
        {fullCode.description && (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {fullCode.description}
          </p>
        )}
        <div className="mt-4">
          <CodeBlock language={language}>
            {fullCode.code.trim()}
          </CodeBlock>
        </div>
      </section>
    </div>
  );
}
