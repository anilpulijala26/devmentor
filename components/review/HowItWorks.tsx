import { ClipboardCheck, ListChecks, Share2 } from "lucide-react";

const steps = [
  {
    title: "Select a review category",
    description: "Open one category and compare your finished code against the checks.",
    icon: ListChecks,
  },
  {
    title: "Complete the checklist items",
    description: "Mark each check only when your implementation meets the expected standard.",
    icon: ClipboardCheck,
  },
  {
    title: "Export your review summary",
    description: "Copy a progress summary before deployment, submission, or portfolio review.",
    icon: Share2,
  },
];

export function HowItWorks() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">How it works</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article key={step.title} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <Icon className="h-4 w-4 text-indigo-600" />
              </div>
              <p className="text-sm font-bold text-slate-900">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
