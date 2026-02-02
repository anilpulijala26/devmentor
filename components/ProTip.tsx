import { Lightbulb } from "lucide-react";

interface ProTipProps {
  children: React.ReactNode;
}

export function ProTip({ children }: ProTipProps) {
  return (
    <div className="my-6 border-l-4 border-amber-500 bg-amber-50 p-4 rounded">
      <div className="flex gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-amber-900">
          <p className="font-semibold mb-2">Pro Tip</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
