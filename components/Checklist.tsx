import { CheckCircle2 } from "lucide-react";

interface ChecklistItem {
  text: string;
}

interface ChecklistProps {
  items: ChecklistItem[] | string[];
  title?: string;
}

export function Checklist({ items = [], title = "Learning Checklist" }: ChecklistProps) {
  const normalizedItems = (items || []).map((item) =>
    typeof item === "string" ? { text: item } : item
  );

  return (
    <div className="my-6 border border-green-200 bg-green-50 p-6 rounded">
      <p className="font-semibold text-green-900 mb-4">{title}</p>
      <ul className="space-y-3">
        {normalizedItems.map((item, index) => (
          <li key={index} className="flex gap-3 text-green-900">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
