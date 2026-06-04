import { developerTasks } from "@/lib/tasks";
import { TasksClient } from "@/components/TasksClient";

export const metadata = {
  title: "Daily Developer Tasks - CodeNivra",
  description: "Improve your frontend and backend skills. Build reusable components, code dynamic filters, set auth guards, and handle rendering failures daily.",
  openGraph: {
    title: "Daily Developer Tasks - CodeNivra",
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
