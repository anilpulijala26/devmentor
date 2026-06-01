import Link from "next/link";
import { getDeveloperTaskBySlug, developerTasks } from "@/lib/tasks";
import { notFound } from "next/navigation";
import { ChevronLeft, Key, Terminal, Code2, MessageSquare, XOctagon } from "lucide-react";
import { ProjectChecklist } from "@/components/mdx/ProjectChecklist";
import { Collapsible } from "@/components/Collapsible";
import { CodeBlock } from "@/components/CodeBlock";
import { TaskCompleteButton } from "@/components/TaskCompleteButton";

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

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Navigation back bar */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Daily Tasks
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
              DAILY CHALLENGE // {task.slug.toUpperCase()}
            </span>
            <TaskCompleteButton taskSlug={task.slug} />
          </div>
        </div>

        {/* Task Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(task.level)}`}>
              {task.level} Challenge
            </span>
            <span className="text-xs text-slate-500 font-semibold">Daily Developer Exercise</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            {task.title}
          </h1>
        </div>

        {/* Requirements */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Terminal className="w-5 h-5 text-indigo-500" />
            Requirements
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {task.requirement}
          </p>

          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Expected Output</p>
            <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              {task.expectedOutput}
            </p>
          </div>
        </section>

        {/* Hints */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Key className="w-5 h-5 text-indigo-500" />
            Hints & Tips
          </h2>
          <ul className="space-y-3.5">
            {task.hints.map((hint, idx) => (
              <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="h-5 w-5 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-indigo-700 shrink-0">
                  {idx + 1}
                </span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Checklist */}
        <ProjectChecklist
          title="Senior Code Review Checklist"
          storageKey={`task-checklist-${task.slug}`}
          items={task.checklist}
        />

        {/* Common Mistakes */}
        {task.commonMistakes && task.commonMistakes.length > 0 && (
          <section className="my-8 p-6 bg-red-50/20 border border-red-200 rounded-3xl shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-red-950 flex items-center gap-2 pb-3 border-b border-red-100">
              <XOctagon className="w-5 h-5 text-red-600" />
              Common Architectural Mistakes
            </h2>
            <ul className="space-y-3">
              {task.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="h-5 w-5 bg-red-100 border border-red-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-red-700 shrink-0">
                    {idx + 1}
                  </span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Solution Container (Collapsible) */}
        <section className="my-10 border border-indigo-200 bg-indigo-50/10 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-indigo-100 bg-indigo-50/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-9 w-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Code2 className="w-4.5 h-4.5" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Developer Solution</h3>
                <p className="text-2xs text-slate-500 mt-0.5">Click to toggle the recommended code solution</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <Collapsible title="Reveal Solution Details">
              <div className="space-y-4">
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p className="font-bold text-slate-800 mb-1">Architectural Explanation</p>
                  {task.solutionExplanation}
                </div>
                <div>
                  <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Code Snippet</p>
                  <div className="text-xs bg-slate-950 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-900 text-slate-200">
                    <CodeBlock language={task.solutionLanguage}>
                      {task.solutionCode}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </Collapsible>
          </div>
        </section>

        {/* Interview Explanation (Purple Collapsible) */}
        {task.interviewExplanation && (
          <section className="my-10 border border-purple-200 bg-purple-50/10 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-purple-100 bg-purple-50/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 bg-purple-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Explain in Interview</h3>
                  <p className="text-2xs text-slate-500 mt-0.5">How to pitch this solution during technical interviews</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <Collapsible title="View Interview Response Pitch">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {task.interviewExplanation}
                </p>
              </Collapsible>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
