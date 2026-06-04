interface ReviewChecklistItemProps {
  checked: boolean;
  item: string;
  onToggle: () => void;
}

export function ReviewChecklistItem({
  checked,
  item,
  onToggle,
}: ReviewChecklistItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="checkbox"
      aria-checked={checked}
      className="flex w-full items-start gap-3 rounded-2xl border border-transparent px-3 py-3 text-left transition hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <span
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
          checked
            ? "border-indigo-700 bg-indigo-600 text-white"
            : "border-slate-300 bg-white"
        }`}
      >
        {checked ? <span className="text-[11px] font-black">✓</span> : null}
      </span>
      <span
        className={`text-sm leading-relaxed ${
          checked ? "text-slate-400 line-through" : "text-slate-700"
        }`}
      >
        {item}
      </span>
    </button>
  );
}
