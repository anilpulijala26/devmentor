import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ChevronRight,
  Layers,
  Award,
  PlayCircle,
} from "lucide-react";

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  try {
    const { courseId } = await params;
    const res = await dbQuery("SELECT title FROM courses WHERE id = $1", [courseId]);
    if (res.rows.length > 0) {
      return {
        title: `${res.rows[0].title} Syllabus - CodeNivra`,
      };
    }
  } catch {}
  return {
    title: "Course Syllabus - CodeNivra",
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  // Fetch course metadata
  const courseResult = await dbQuery(
    "SELECT id, title, description FROM courses WHERE id = $1",
    [courseId]
  );

  if (courseResult.rows.length === 0) {
    notFound();
  }

  const course = courseResult.rows[0];

  // Fetch syllabus and user lesson progress details in a single clean query
  const syllabusResult = await dbQuery(
    `SELECT 
       m.id as module_id, m.title as module_title, m.order_index as module_order,
       l.id as lesson_id, l.title as lesson_title, l.order_index as lesson_order,
       COALESCE(p.is_completed, FALSE) as is_completed
     FROM modules m
     LEFT JOIN lessons l ON l.module_id = m.id
     LEFT JOIN user_lesson_progress p ON l.id = p.lesson_id AND p.user_id = $2
     WHERE m.course_id = $1
     ORDER BY m.order_index ASC, l.order_index ASC`,
    [courseId, decoded.userId]
  );

  // Group lessons by modules dynamically
  const modulesMap: Record<string, { id: string; title: string; order: number; lessons: any[] }> = {};
  let totalLessons = 0;
  let completedLessonsCount = 0;

  syllabusResult.rows.forEach((row) => {
    if (!modulesMap[row.module_id]) {
      modulesMap[row.module_id] = {
        id: row.module_id,
        title: row.module_title,
        order: row.module_order,
        lessons: [],
      };
    }
    if (row.lesson_id) {
      totalLessons++;
      if (row.is_completed) {
        completedLessonsCount++;
      }
      modulesMap[row.module_id].lessons.push({
        id: row.lesson_id,
        title: row.lesson_title,
        order: row.lesson_order,
        isCompleted: row.is_completed,
      });
    }
  });

  const modules = Object.values(modulesMap).sort((a, b) => a.order - b.order);
  const completionPercent =
    totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" /> Back to courses
        </Link>

        {/* Course Header card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-[0_4px_30px_rgba(15,23,42,0.01)] mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/50">
                Course Syllabus
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                {course.title}
              </h1>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Circular Progress Display */}
            <div className="shrink-0 flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-4.5">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center bg-white rounded-full shadow-sm">
                <svg className="absolute w-full h-full -rotate-95">
                  <circle
                    cx="28"
                    cy="28"
                    r="23"
                    className="stroke-slate-100 fill-none"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="23"
                    className="stroke-indigo-600 fill-none transition-all duration-500"
                    strokeWidth="3.5"
                    strokeDasharray={2 * Math.PI * 23}
                    strokeDashoffset={2 * Math.PI * 23 * (1 - completionPercent / 100)}
                  />
                </svg>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {completionPercent}%
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold tracking-wider font-mono">PROGRESS</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {completedLessonsCount} / {totalLessons} Lessons
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          {modules.map((mod, index) => (
            <div
              key={mod.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(15,23,42,0.01)] overflow-hidden"
            >
              {/* Module Bar */}
              <div className="bg-slate-50/50 px-6 py-4.5 border-b border-slate-200/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-mono text-xs font-bold border border-indigo-100/50">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{mod.title}</h3>
                  <p className="text-[10px] text-slate-400 font-mono font-semibold mt-0.5">
                    {mod.lessons.length} LESSONS
                  </p>
                </div>
              </div>

              {/* Lessons Table */}
              <div className="divide-y divide-slate-100">
                {mod.lessons.length === 0 ? (
                  <p className="p-4 text-xs text-slate-400 italic">No lessons in this module.</p>
                ) : (
                  mod.lessons.map((les) => (
                    <Link
                      key={les.id}
                      href={`/lessons/${les.id}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-4">
                        {les.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 shrink-0 transition-colors" />
                        )}
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 truncate transition-colors">
                          {les.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {les.isCompleted && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold font-mono">
                            COMPLETED
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
