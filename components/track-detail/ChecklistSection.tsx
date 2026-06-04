import { CheckCircle2 } from "lucide-react";

export function ChecklistSection({
  items,
  title,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.03)]"
          >
            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-indigo-600" />
            <p className="text-sm leading-6 text-slate-600">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
