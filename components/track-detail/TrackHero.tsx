import { TagBadge } from "@/components/marketing-primitives";

export function TrackHero({
  title,
  description,
  badges,
}: {
  title: string;
  description: string;
  badges: string[];
}) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
        {title}
      </h1>
      <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <TagBadge key={badge} label={badge} tone="blue" />
        ))}
      </div>
    </section>
  );
}
