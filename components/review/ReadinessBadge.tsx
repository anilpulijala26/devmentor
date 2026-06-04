interface ReadinessBadgeProps {
  progress: number;
}

export function getReadiness(progress: number) {
  if (progress <= 40) {
    return {
      label: "Needs Work",
      tone: "bg-slate-100 text-slate-700 border-slate-200",
      description: "0-40%",
    };
  }
  if (progress <= 75) {
    return {
      label: "Improving",
      tone: "bg-amber-50 text-amber-700 border-amber-200",
      description: "41-75%",
    };
  }
  if (progress <= 90) {
    return {
      label: "Review Ready",
      tone: "bg-indigo-50 text-indigo-700 border-indigo-200",
      description: "76-90%",
    };
  }
  return {
    label: "Production Ready",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "91-100%",
  };
}

export function ReadinessBadge({ progress }: ReadinessBadgeProps) {
  const readiness = getReadiness(progress);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${readiness.tone}`}
    >
      {readiness.label}
    </span>
  );
}
