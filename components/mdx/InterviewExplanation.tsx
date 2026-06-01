"use client";

import React, { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface InterviewQA {
  question: string;
  answer: React.ReactNode;
}

interface InterviewExplanationProps {
  projectName: string;
  qaList?: InterviewQA[]; // Optional: Override default QA lists if needed
  buildDesc?: string;
  approachDesc?: string;
  challengesDesc?: string;
  performanceDesc?: string;
  errorsDesc?: string;
  structureDesc?: string;
  productionImprovements?: string[];
}

export function InterviewExplanation({
  projectName,
  qaList,
  buildDesc,
  approachDesc,
  challengesDesc,
  performanceDesc,
  errorsDesc,
  structureDesc,
  productionImprovements
}: InterviewExplanationProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const defaultQAs: InterviewQA[] = [
    {
      question: "What did you build?",
      answer: buildDesc || `I built ${projectName}, a high-performance web application adhering to production-ready design principles, containing structured layout patterns and proper loading/error safety boundaries.`
    },
    {
      question: "Why did you choose this approach?",
      answer: approachDesc || `I chose Next.js and TailwindCSS for their support of server rendering architectures, rapid component styling, fast dynamic layouts, and static optimization options.`
    },
    {
      question: "What challenges did you face?",
      answer: challengesDesc || `The primary challenge was managing asynchronous race conditions and ensuring that routing operations gracefully render loading spinners without causing document layout shifts.`
    },
    {
      question: "How did you handle performance?",
      answer: performanceDesc || `Performance is optimized through memoization, lazy loading of charts, CSS containers layouts, and leveraging browser cache structures.`
    },
    {
      question: "How did you handle errors?",
      answer: errorsDesc || `Errors are trapped using high-order React Error Boundaries at page levels, coupled with specific catch blocks and retry interfaces at component levels.`
    },
    {
      question: "How did you structure the project?",
      answer: structureDesc || `The structure segregates code by features and layers: dynamic routes under app folders, reusable MDX components in mdx blocks, configurations in lib, and global themes in style files.`
    },
    {
      question: "How would you improve this in production?",
      answer: (
        <ul className="list-disc list-inside space-y-1">
          {productionImprovements ? (
            (productionImprovements || []).map((imp, idx) => <li key={idx}>{imp}</li>)
          ) : (
            <>
              <li>Integrate Sentry to monitor errors dynamically in real-time.</li>
              <li>Configure Redis caching for API query caching.</li>
              <li>Establish multi-stage Docker configurations for zero-downtime CI/CD.</li>
            </>
          )}
        </ul>
      )
    }
  ];

  const list = qaList || defaultQAs;

  return (
    <div className="my-8 rounded-3xl border border-purple-200 bg-purple-50/10 p-6 shadow-sm animate-fade-in dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-purple-100 dark:border-slate-800">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)]">
          <MessageSquare className="h-5.5 w-5.5" />
        </span>
        <div>
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest dark:text-purple-400">
            Explain in Interview Template
          </span>
          <h4 className="text-lg font-extrabold text-slate-950 dark:text-slate-50 mt-0.5">
            Pitching: {projectName}
          </h4>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
        Click on any question to view the recommended architectural response for technical interviews.
      </p>

      <div className="space-y-2">
        {(list || []).map((qa, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-2xl transition duration-200 ${
                isOpen
                  ? "border-purple-300 bg-white dark:bg-slate-900 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white/40 dark:bg-slate-900/20"
              }`}
            >
              <button
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {qa.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-purple-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed dark:text-slate-300 border-t border-purple-50 dark:border-slate-800/80">
                  {qa.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
