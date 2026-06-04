import { getDeveloperTaskBySlug, developerTasks } from "@/lib/tasks";
import { notFound } from "next/navigation";
import { TaskDetailClient } from "@/components/TaskDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return developerTasks.map((t) => ({
    slug: t.slug,
  }));
}

export const metadata = {
  title: "Developer Task Solution - CodeNivra",
  description: "View daily developer tasks requirements, hints, checklists, and code solutions.",
};

export default async function TaskDetailPage({ params }: Props) {
  const { slug } = await params;
  const task = getDeveloperTaskBySlug(slug);

  if (!task) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <TaskDetailClient task={task} />
    </div>
  );
}
