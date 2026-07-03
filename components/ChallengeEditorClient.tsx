"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Code,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Lightbulb,
  Loader2,
  Play,
  RotateCcw,
  Save,
  Lock,
  MessageSquareQuote,
} from "lucide-react";

interface ChallengeExample {
  input: unknown[];
  expected: unknown;
  explanation?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  difficulty: string;
  orderIndex: number;
  instruction: string;
  inputExplanation: string;
  outputExplanation: string;
  examples: ChallengeExample[];
  hint: string;
  interviewQuestion: string;
  interviewAnswer: string;
  referenceSolution?: string;
  solutionSteps?: string[];
  commonMistakes?: string[];
  interviewExplanation?: string;
}

interface ChallengeEditorClientProps {
  challenge: Challenge;
  prevSubmission: string | null;
  isSolved: boolean;
}

interface RunResult {
  passed: boolean;
  message: string;
}

export function ChallengeEditorClient({ challenge, prevSubmission, isSolved: initialSolved }: ChallengeEditorClientProps) {
  const router = useRouter();
  const [code, setCode] = useState(prevSubmission || challenge.starterCode);
  const [loading, setLoading] = useState<"run" | "submit" | null>(null);
  const [success, setSuccess] = useState(initialSolved);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<RunResult[]>([]);
  const hasUnlockedSolution = success || prevSubmission !== null || results.length > 0;

  const sendAttempt = async (mode: "run" | "submit") => {
    setLoading(mode);
    setErrorMessage(null);
    if (mode === "submit") {
      setSuccess(false);
    }

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setErrorMessage("Submitted code cannot be empty.");
      setLoading(null);
      return;
    }

    try {
      const res = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: challenge.id,
          submittedCode: code,
          mode,
        }),
      });

      const data = await res.json();
      setResults(data.results || []);

      if (!res.ok) {
        setErrorMessage(data.error || "The code did not pass yet.");
        return;
      }

      if (mode === "submit") {
        setSuccess(true);
        router.refresh();
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "An unexpected network error occurred.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/challenges" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Coding Problems
        </Link>

        {success ? (
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-3.5 py-1.5 rounded-full text-xs">
            <CheckCircle className="w-3.5 h-3.5" /> Submitted successfully
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold font-mono text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded uppercase">Problem #{challenge.orderIndex}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${challenge.difficulty === "Easy" ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-700"}`}>{challenge.difficulty}</span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 mt-4 tracking-tight">{challenge.title}</h1>

            <div className="mt-5 space-y-4 border-t border-slate-100 pt-5 text-sm text-slate-600">
              <div>
                <h2 className="font-bold text-slate-800 flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-[#4F46E5]" /> Clear instruction</h2>
                <p className="mt-2 leading-relaxed">{challenge.instruction}</p>
              </div>
              <div>
                <h2 className="font-bold text-slate-800">Input</h2>
                <p className="mt-1">{challenge.inputExplanation}</p>
              </div>
              <div>
                <h2 className="font-bold text-slate-800">Output</h2>
                <p className="mt-1">{challenge.outputExplanation}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Example input / output</h2>
              {challenge.examples.map((example, index) => (
                <div key={`${challenge.id}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-700">
                  <p className="font-bold text-slate-900">Example {index + 1}</p>
                  <p className="mt-2"><span className="font-semibold">Input:</span> {JSON.stringify(example.input.length === 1 ? example.input[0] : example.input)}</p>
                  <p className="mt-1"><span className="font-semibold">Output:</span> {JSON.stringify(example.expected)}</p>
                  {example.explanation ? <p className="mt-2 text-slate-500">{example.explanation}</p> : null}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <button type="button" onClick={() => setShowHint((prev) => !prev)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                <span className="inline-flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500" /> Show hint</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showHint ? "rotate-180" : ""}`} />
              </button>
              {showHint ? <p className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">{challenge.hint}</p> : null}
            </div>

            <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 text-sm">
              <p className="font-bold text-slate-900">Interview Question</p>
              <p className="mt-2 font-semibold text-slate-900">{challenge.interviewQuestion}</p>
              <p className="mt-2 text-slate-600">Expected answer: {challenge.interviewAnswer}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#111827] rounded-3xl border border-slate-700 shadow-xl overflow-hidden flex flex-col min-h-[520px]">
            <div className="bg-[#1E1B4B]/90 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-bold text-slate-400 font-mono">solution.js</span>
              </div>
              <button type="button" onClick={() => { setCode(challenge.starterCode); setErrorMessage(null); setSuccess(false); setResults([]); }} className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors font-medium">
                <RotateCcw className="w-3.5 h-3.5" /> Reset Code
              </button>
            </div>

            <div className="flex-1 relative flex min-h-[340px]">
              <div className="bg-slate-950/40 select-none text-right px-4.5 py-5 border-r border-slate-800/60 font-mono text-xs text-slate-600 leading-6 hidden sm:block">
                {Array.from({ length: Math.max(12, code.split("\n").length) }).map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>

              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setSuccess(false);
                  setErrorMessage(null);
                }}
                className="flex-1 w-full bg-transparent text-slate-100 p-5 font-mono text-xs leading-6 resize-none focus:outline-none focus:ring-0 border-none placeholder-slate-700 select-text"
                placeholder="// Write your JavaScript solution here..."
                spellCheck="false"
              />
            </div>

            <div className="bg-[#1E1B4B]/90 px-6 py-4.5 border-t border-slate-800 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-slate-500 font-mono font-medium">Line Count: {code.split("\n").length} lines</span>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={() => sendAttempt("run")} disabled={loading !== null || code.trim() === ""} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-xs font-bold text-slate-100 transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider">
                  {loading === "run" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Run Tests
                </button>
                <button type="button" onClick={() => sendAttempt("submit")} disabled={loading !== null || code.trim() === ""} className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-50 transition-colors text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md disabled:cursor-not-allowed uppercase tracking-wider">
                  {loading === "submit" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Submit Solution
                </button>
              </div>
            </div>
          </div>

          {errorMessage ? <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{errorMessage}</div> : null}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              {hasUnlockedSolution ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Lock className="h-4 w-4 text-slate-400" />}
              <h2 className="text-base font-black text-slate-950">Solution Review</h2>
            </div>

            {hasUnlockedSolution ? (
              <div className="mt-4 space-y-5">
                {challenge.referenceSolution ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Final code</p>
                    <pre className="mt-2 overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
                      {challenge.referenceSolution}
                    </pre>
                  </div>
                ) : null}

                {challenge.solutionSteps?.length ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Step-by-step explanation</p>
                    <ol className="mt-2 space-y-2 text-sm text-slate-600">
                      {challenge.solutionSteps.map((step, index) => (
                        <li key={step} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-[11px] font-bold text-white">{index + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                {challenge.commonMistakes?.length ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Common mistakes</p>
                    <div className="mt-2 space-y-2">
                      {challenge.commonMistakes.map((mistake) => (
                        <div key={mistake} className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                          {mistake}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {challenge.interviewExplanation ? (
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-900">
                      <MessageSquareQuote className="h-4 w-4 text-indigo-600" />
                      <p className="font-bold">Explain it in an interview</p>
                    </div>
                    <p className="mt-2 text-slate-600">{challenge.interviewExplanation}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600">
                Run the tests or submit a solution first. Once you attempt the problem, the final code and explanation will unlock here.
              </div>
            )}
          </div>

          {results.length > 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-black text-slate-950">Test Results</h2>
              <div className="mt-4 space-y-3">
                {results.map((result, index) => (
                  <div key={`${result.message}-${index}`} className={`rounded-2xl border p-4 text-sm ${result.passed ? "border-emerald-100 bg-emerald-50/60 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                    {result.message}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

