import { BookOpen } from "lucide-react";

interface SeniorNoteProps {
  children: React.ReactNode;
}

export function SeniorNote({ children }: SeniorNoteProps) {
  return (
    <div className="my-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
      <div className="flex gap-3">
        <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-blue-900">
          <p className="font-semibold mb-2">Senior&apos;s Note</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
