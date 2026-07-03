import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StepLink {
  label: string;
  title: string;
  href?: string;
}

interface LessonNextStepsProps {
  moduleTitle: string;
  day: number;
  practice: StepLink;
  challenge: StepLink;
  interview: StepLink;
  project: StepLink;
}

const fallbackHref = {
  practice: "/tasks",
  challenge: "/challenges/today",
  interview: "/interview",
  project: "/projects",
};

export function LessonNextSteps({
  moduleTitle,
  day,
  practice,
  challenge,
  interview,
  project,
}: LessonNextStepsProps) {
  const items = [
    { ...practice, href: practice.href || fallbackHref.practice },
    { ...challenge, href: challenge.href || fallbackHref.challenge },
    { ...interview, href: interview.href || fallbackHref.interview },
    { ...project, href: project.href || fallbackHref.project },
  ];

  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50/80 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Next in your daily flow</p>
      <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Finish the lesson, then keep moving</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        You are in {moduleTitle} on Day {day}. Keep the momentum simple: practice the idea, solve one coding problem, explain it, and ship one project step.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <Link
            key={`${item.label}-${item.title}`}
            href={item.href}
            className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:bg-indigo-50/20"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{index + 1}. {item.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.title}</p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}
