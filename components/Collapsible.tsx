"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Collapsible({ title, defaultOpen = false, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-4 border border-slate-200/80 rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300/80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left focus:outline-hidden focus:bg-indigo-50/30"
      >
        <span className="font-semibold text-slate-800 text-base md:text-lg pr-4">{title}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-xs text-slate-500 transition-all duration-300 ${
          isOpen ? "transform rotate-180 bg-indigo-50 border-indigo-200 text-indigo-600" : ""
        }`}>
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-5 text-slate-700 bg-white border-t border-slate-100 font-sans text-base leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
