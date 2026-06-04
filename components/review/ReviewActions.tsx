import { RefreshCw, Share2 } from "lucide-react";

interface ReviewActionsProps {
  onExport: () => void;
  onReset: () => void;
}

export function ReviewActions({ onExport, onReset }: ReviewActionsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={onExport}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        <Share2 className="h-4 w-4" />
        Export Summary
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <RefreshCw className="h-4 w-4" />
        Reset Console
      </button>
    </div>
  );
}
