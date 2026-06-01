import Link from "next/link";
import { getRoadmapBySlug, roadmaps } from "@/lib/roadmaps";
import { notFound } from "next/navigation";
import { ChevronLeft, Sparkles, BookOpen, Compass, ClipboardCheck, ArrowRight, Check, Terminal } from "lucide-react";
import { getAllDeveloperTasks } from "@/lib/tasks";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return roadmaps.map((r) => ({
    slug: r.slug,
  }));
}

export const metadata = {
  title: "Roadmap Timeline - CodeNivra",
  description: "Walk through step-by-step career timelines, concepts lessons, projects, and checklist questions.",
};

export default async function RoadmapDetailPage({ params }: Props) {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    notFound();
  }

  const getBadgeColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Professional: "bg-pink-50 text-pink-700 border-pink-200",
      "Interview Prep": "bg-purple-50 text-purple-700 border-purple-200",
    }[level] || "bg-slate-50 text-slate-700";
  };

  const allTasks = getAllDeveloperTasks();
  const getTasksForRoadmapLevel = (level: string) => {
    if (level === "Beginner") {
      return allTasks.filter(t => t.level === "Beginner");
    } else if (level === "Intermediate") {
      return allTasks.filter(t => t.level === "Intermediate");
    } else if (level === "Advanced") {
      return allTasks.filter(t => t.level === "Advanced");
    } else {
      return allTasks.filter(t => t.level === "Advanced" || t.level === "Intermediate");
    }
  };

  const tasksForThisPath = getTasksForRoadmapLevel(roadmap.level);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Navigation back bar */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Roadmaps
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {roadmap.level} PATHWAY
          </span>
        </div>

        {/* Roadmap Info Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(roadmap.level)}`}>
              {roadmap.level}
            </span>
            <span className="text-xs text-slate-500 font-semibold">{roadmap.duration} Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            {roadmap.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl font-medium">
            {roadmap.description}
          </p>
        </div>

        {/* Timeline Content Layout */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Main timeline module lists */}
          <div className="md:col-span-8 space-y-12">
            {/* Step 1: LEARN */}
            <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs relative">
              <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-indigo-600 text-white shadow-xs">
                Step 1 // Learn
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-2 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                Concept Lessons
              </h2>

              <div className="space-y-4">
                {roadmap.recommendedLessons.map((lesson, idx) => (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${lesson.track}/${lesson.slug}`}
                    className="group flex items-center justify-between p-4 border border-slate-200 rounded-2xl bg-white hover:border-indigo-300 hover:shadow-xs transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 rounded-full bg-indigo-50 text-indigo-750 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                          {lesson.title}
                        </h4>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                          Module: {lesson.track}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600 transition" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Step 2: PRACTICE */}
            {tasksForThisPath.length > 0 && (
              <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs relative">
                <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-emerald-600 text-white shadow-xs">
                  Step 2 // Practice
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mt-2 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Terminal className="w-5 h-5 text-emerald-500" />
                  Daily Developer Tasks
                </h2>

                <div className="space-y-4">
                  {tasksForThisPath.map((task) => (
                    <Link
                      key={task.slug}
                      href={`/tasks/${task.slug}`}
                      className="group flex items-center justify-between p-4 border border-slate-200 rounded-2xl bg-white hover:border-emerald-300 hover:shadow-xs transition duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                          P
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                            {task.title}
                          </h4>
                          <span className="inline-block px-1.5 py-0.2 rounded-md bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                            {task.level} Challenge
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: BUILD */}
            <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs relative">
              <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-violet-600 text-white shadow-xs">
                Step 3 // Build
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-2 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Compass className="w-5 h-5 text-violet-500" />
                Project Labs Blueprint
              </h2>

              <div className="space-y-4">
                {roadmap.projectTasks.map((project) => (
                  <div key={project.projectSlug} className="p-5 border border-slate-200 hover:border-violet-300 bg-slate-50/20 rounded-2xl transition duration-200">
                    <h3 className="text-sm font-extrabold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">{project.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">LAB // {project.projectSlug.replace("-", "_").toUpperCase()}</span>
                      <Link
                        href={`/projects/${project.projectSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                      >
                        Start Project Lab <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Self-Assessment Checklist */}
          <div className="md:col-span-4 space-y-6">
            <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-xs">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-indigo-600" />
                Senior Checklist
              </h3>

              <p className="text-2xs text-slate-500 leading-relaxed mb-4">
                Verify your progression. Can you confidently check off these expectations?
              </p>

              <div className="space-y-3.5">
                {roadmap.checklist.map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="h-5 w-5 bg-indigo-50 border border-indigo-200 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-indigo-600">
                      <Check className="w-3 h-3" />
                    </span>
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats box */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 rounded-3xl p-6 text-white space-y-4">
              <div className="inline-flex p-2.5 rounded-2xl bg-white/10 border border-white/20">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Graduation Goal</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Complete the exercises, build the requested projects, run senior audit checks, and review interview QA blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
