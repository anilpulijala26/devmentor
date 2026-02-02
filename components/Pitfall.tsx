import { AlertCircle } from "lucide-react";

interface PitfallProps {
  children: React.ReactNode;
}

export function Pitfall({ children }: PitfallProps) {
  return (
    <div className="my-6 border-l-4 border-red-500 bg-red-50 p-4 rounded">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="text-red-900">
          <p className="font-semibold mb-2">Common Pitfall</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
