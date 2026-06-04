import { CodeReviewClient } from "@/components/CodeReviewClient";

export const metadata = {
  title: "Senior Code Review & Audit Console - CodeNivra",
  description:
    "Use the CodeNivra review console after tasks or project labs to audit code against frontend, accessibility, performance, security, and deployment standards.",
  openGraph: {
    title: "Senior Code Review & Audit Console - CodeNivra",
    description: "Audit repositories like a senior engineer using interactive review checks and progress tracking.",
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
