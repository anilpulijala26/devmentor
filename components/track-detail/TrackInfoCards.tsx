import { Compass, Layers3, ListChecks, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Icon className="h-4.5 w-4.5 text-indigo-600" />
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      </div>
      <div className="pt-3">{children}</div>
    </section>
  );
}

export function TrackInfoCards({
  overview,
  whoIsFor,
  prerequisites,
}: {
  overview: string;
  whoIsFor: string;
  prerequisites: string[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <InfoCard icon={Layers3} title="Track Overview">
        <p className="text-sm leading-6 text-slate-600">{overview}</p>
      </InfoCard>

      <InfoCard icon={Compass} title="Who This Is For">
        <p className="text-sm leading-6 text-slate-600">{whoIsFor}</p>
      </InfoCard>

      <InfoCard icon={ListChecks} title="Prerequisites">
        <ul className="space-y-2">
          {prerequisites.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}
