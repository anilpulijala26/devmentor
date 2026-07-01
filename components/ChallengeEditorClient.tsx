"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Code, CheckCircle, Save, Loader2, Sparkles, HelpCircle } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  difficulty: string;
  orderIndex: number;
}

interface ChallengeEditorClientProps {
  challenge: Challenge;
  prevSubmission: string | null;
  isSolved: boolean;
}

export function ChallengeEditorClient({
  challenge,
  prevSubmission,
  isSolved: initialSolved,
}: ChallengeEditorClientProps) {
  const router = useRouter();
  const [code, setCode] = useState(prevSubmission || challenge.starterCode);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(initialSolved);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setErrorMessage("Submitted code cannot be empty.");
      setLoading(false);
      return;
    }
    if (trimmedCode === challenge.starterCode.trim()) {
      setErrorMessage("You must write your own solution before submitting! The code cannot match the starter template.");
      setLoading(false);
      return;
    }

    // Extract expected function name from starter code
    const funcMatch = challenge.starterCode.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);
    const expectedFuncName = funcMatch ? funcMatch[1] : null;

    if (expectedFuncName && !trimmedCode.includes(expectedFuncName)) {
      setErrorMessage(`Your solution must define the function '${expectedFuncName}'.`);
      setLoading(false);
      return;
    }

    if (!trimmedCode.includes("return")) {
      setErrorMessage("Your solution must return a value (use the 'return' keyword).");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: challenge.id,
          submittedCode: code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit challenge.");
      }

      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      
      {/* Navigation Headers */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Challenges
        </Link>
        
        {success && (
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-3.5 py-1.5 rounded-full text-xs animate-fade-in">
            <CheckCircle className="w-3.5 h-3.5" /> Submitted for review
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Challenge Instructions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                Challenge #{challenge.orderIndex}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                challenge.difficulty === "Easy" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {challenge.difficulty}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {challenge.title}
            </h1>
            
            <div className="mt-5 border-t border-slate-100 pt-5">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-500" /> Instructions
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {challenge.description}
              </p>
            </div>
            
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-2">
              <p className="font-semibold text-slate-700">Guidelines:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Write or paste your JavaScript solution in the editor workspace.</li>
                <li>Ensure all variables and return statements are syntactically sound.</li>
                <li>Submit your solution for manual code review when complete.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Code Editor Area */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Editor Top Bar Controls */}
            <div className="bg-slate-950/80 px-6 py-3.5 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-400 font-mono">solution.js</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white transition-colors font-medium"
              >
                Reset Code
              </button>
            </div>

            {/* Code Textarea Workspace */}
            <div className="flex-1 relative flex">
              {/* Row Numbers Simulation */}
              <div className="bg-slate-950/40 select-none text-right px-4.5 py-5 border-r border-slate-850/60 font-mono text-xs text-slate-600 leading-6 hidden sm:block">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setSuccess(false);
                  setErrorMessage(null);
                }}
                className="flex-1 w-full bg-transparent text-slate-100 p-5 font-mono text-xs leading-6 resize-none focus:outline-none focus:ring-0 border-none placeholder-slate-700 select-text"
                placeholder="// Write or paste your Javascript solution here..."
                spellCheck="false"
              />
            </div>

            {/* Submission Status Alert Section */}
            {errorMessage && (
              <div className="mx-6 mb-4 p-4 rounded-2xl bg-red-950/40 border border-red-900/50 text-red-200 text-xs font-mono leading-relaxed flex items-start gap-2.5 animate-fade-in shadow-inner">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">❯ Error:</span>
                <span className="whitespace-pre-wrap">{errorMessage}</span>
              </div>
            )}

            {success && (
              <div className="mx-6 mb-4 p-4 rounded-xl bg-emerald-950/50 border border-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Your code has been submitted! Today's mission is checked off.</span>
              </div>
            )}

            {/* Editor Footer Panel */}
            <div className="bg-slate-950/80 px-6 py-4.5 border-t border-slate-850 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono font-medium">
                Line Count: {code.split("\n").length} lines
              </span>

              <button
                type="submit"
                disabled={loading || code.trim() === ""}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md hover:shadow-lg disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" /> Submit Solution
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Custom Reset Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-50 animate-scale-up">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100/50">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">Reset Code Template?</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed font-normal">
                  Are you sure you want to discard your changes and revert the editor back to the default starter template? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCode(challenge.starterCode);
                  setSuccess(false);
                  setErrorMessage(null);
                  setShowResetConfirm(false);
                }}
                className="px-4.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-sm font-bold text-white transition-colors cursor-pointer focus:outline-none"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
