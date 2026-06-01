"use client";

import React, { useState, useEffect } from "react";
import { CheckSquare, Square } from "lucide-react";

interface ProjectChecklistProps {
  title: string;
  items: string[];
  storageKey?: string;
}

export function ProjectChecklist({ title, items, storageKey }: ProjectChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(`devmentor-checklist-${storageKey}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTimeout(() => {
            setCheckedItems(parsed);
          }, 0);
        } catch {
          // ignore
        }
      }
    }
  }, [storageKey]);

  const toggleCheck = (idx: number) => {
    const updated = { ...checkedItems, [idx]: !checkedItems[idx] };
    setCheckedItems(updated);
    if (storageKey) {
      localStorage.setItem(`devmentor-checklist-${storageKey}`, JSON.stringify(updated));
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs animate-fade-in dark:bg-slate-900 dark:border-slate-800">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 flex items-center justify-between">
        <h4 className="text-base font-extrabold text-slate-950 dark:text-slate-50">
          {title}
        </h4>
        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {Object.values(checkedItems).filter(Boolean).length} / {(items || []).length} Checked
        </span>
      </div>

      <div className="space-y-3">
        {(items || []).map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <button
              key={idx}
              onClick={() => toggleCheck(idx)}
              className="w-full flex items-start gap-3 text-left p-2.5 rounded-xl transition hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              )}
              <span className={`text-sm font-medium ${isChecked ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300"}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
