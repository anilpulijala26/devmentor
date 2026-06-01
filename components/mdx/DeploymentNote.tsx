import React from "react";
import { CloudLightning } from "lucide-react";

interface DeploymentNoteProps {
  title?: string;
  children: React.ReactNode;
}

export function DeploymentNote({ title = "Production Deployment Guide", children }: DeploymentNoteProps) {
  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg text-white animate-fade-in">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
          <CloudLightning className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-300">
            {title}
          </p>
          <div className="text-slate-300 leading-relaxed text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
