"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import {
  LEARNING_LEVEL_OPTIONS,
  type LearningLevelKey,
} from "@/lib/learningProfile";

interface LearningProfilePromptProps {
  isOpen: boolean;
}

export function LearningProfilePrompt({ isOpen }: LearningProfilePromptProps) {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<LearningLevelKey>("new_to_coding");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/learning-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelKey: selectedLevel }),
      });

      if (res.ok) {
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-4 sm:items-center">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Choose your start point</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              What is your current level?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We will use this to show the right learning path, current module, and today&apos;s plan.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {LEARNING_LEVEL_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSelectedLevel(option.key)}
              className={`rounded-2xl border p-4 text-left transition ${
                selectedLevel === option.key
                  ? "border-indigo-500 bg-indigo-50/70"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-bold text-slate-900">{option.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                Starts from module {option.startingModuleIndex} in the {option.pathKey === "fresher" ? "fresher" : "upgrade"} path.
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={saveProfile}
            disabled={saving}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Save My Learning Path
          </button>
        </div>
      </div>
    </div>
  );
}
