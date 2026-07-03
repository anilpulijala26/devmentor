"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";

export interface ProjectSubmission {
  githubUrl: string | null;
  liveUrl: string | null;
  reviewStatus: string;
  submittedAt: string | null;
}

interface ProjectSubmissionPanelProps {
  projectSlug: string;
  initialSubmission: ProjectSubmission | null;
  isLoggedIn: boolean;
}

function formatReviewStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ProjectSubmissionPanel({
  projectSlug,
  initialSubmission,
  isLoggedIn,
}: ProjectSubmissionPanelProps) {
  const [githubUrl, setGithubUrl] = useState(initialSubmission?.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(initialSubmission?.liveUrl ?? "");
  const [reviewStatus, setReviewStatus] = useState(initialSubmission?.reviewStatus ?? "not_submitted_yet");
  const [submittedAt, setSubmittedAt] = useState(initialSubmission?.submittedAt ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/projects/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectSlug, githubUrl, liveUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save your project submission.");
        return;
      }

      setReviewStatus(data.submission.reviewStatus);
      setSubmittedAt(data.submission.submittedAt);
      setGithubUrl(data.submission.githubUrl || "");
      setLiveUrl(data.submission.liveUrl || "");
      setMessage("Project links saved. Your submission is now ready for review.");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Could not save your project submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="project-submission" className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4F46E5]">Submit</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Share your build links</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Submit your GitHub repository and live URL after you finish the current project stage. Then practice how you will explain the build in the interview tab.
          </p>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${reviewStatus === "submitted_for_review" ? "bg-amber-50 text-amber-700" : reviewStatus === "reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          {formatReviewStatus(reviewStatus)}
        </span>
      </div>

      {!isLoggedIn ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600">
          Log in to save your GitHub URL, live URL, and review status for this project.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-800">
              <span>GitHub Repository URL</span>
              <input
                type="url"
                value={githubUrl}
                onChange={(event) => setGithubUrl(event.target.value)}
                placeholder="https://github.com/yourname/project"
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-normal text-slate-700 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-100"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-slate-800">
              <span>Live Project URL</span>
              <input
                type="url"
                value={liveUrl}
                onChange={(event) => setLiveUrl(event.target.value)}
                placeholder="https://your-project.vercel.app"
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-normal text-slate-700 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-100"
                required
              />
            </label>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Review status</p>
            <p className="mt-1">Your links are saved with a review status so the dashboard and progress pages can treat submission as the final step in the daily flow.</p>
            {submittedAt ? <p className="mt-2 text-xs text-slate-500">Last submitted: {new Date(submittedAt).toLocaleString()}</p> : null}
          </div>

          {message ? <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
          {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 text-sm font-semibold text-white transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            Submit Project Links
          </button>
        </form>
      )}
    </section>
  );
}
