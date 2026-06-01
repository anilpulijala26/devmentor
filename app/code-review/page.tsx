import { CodeReviewClient } from "@/components/CodeReviewClient";

export const metadata = {
  title: "Senior Code Review Checklist - CodeNivra",
  description: "Check your codebase against 11 categories of guidelines compiled by senior developers. Improve folder structure, TypeScript safety, security, and performance.",
  openGraph: {
    title: "Senior Code Review Checklist - CodeNivra",
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
