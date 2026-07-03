import { developerTasks } from "@/lib/tasks";
import { TasksClient } from "@/components/TasksClient";

export const metadata = {
  title: "Practice Tasks - CodeNivra",
  description: "Practice frontend and backend tasks one step at a time with fresher-friendly guidance.",
  openGraph: {
    title: "Practice Tasks - CodeNivra",
    description: "Write code daily to master production structures and react patterns.",
    type: "website",
  }
};

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 relative overflow-hidden">
      <TasksClient initialTasks={developerTasks} />
    </div>
  );
}


