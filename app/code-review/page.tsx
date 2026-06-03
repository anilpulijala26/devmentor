import { CodeReviewClient } from "@/components/CodeReviewClient";

export const metadata = {
  title: "Code Review Checklist - CodeNivra",
  description:
    "Review frontend, backend, and full-stack projects with a practical code review checklist covering structure, accessibility, security, and performance.",
  openGraph: {
    title: "Code Review Checklist - CodeNivra",
    description: "Audit repositories like a senior engineer using interactive checklists.",
    type: "website",
  }
};

export default function CodeReviewPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      <CodeReviewClient />
    </div>
  );
}
