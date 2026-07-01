import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { BookOpen, GraduationCap, ArrowRight, Layers, Layout, Target } from "lucide-react";

export const metadata = {
  title: "Courses - CodeNivra",
  description: "Explore our professional coding curriculum and structured learning tracks.",
};

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  // Fetch courses with their module and lesson counts from the database
  const coursesResult = await dbQuery(`
    SELECT c.id, c.title, c.description,
           COALESCE(m.module_count, 0) as module_count,
           COALESCE(l.lesson_count, 0) as lesson_count
    FROM courses c
    LEFT JOIN (
      SELECT course_id, COUNT(*) as module_count FROM modules GROUP BY course_id
    ) m ON c.id = m.course_id
    LEFT JOIN (
      SELECT m.course_id, COUNT(*) as lesson_count 
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      GROUP BY m.course_id
    ) l ON c.id = l.course_id
    ORDER BY c.order_index ASC
  `);

  const courses = coursesResult.rows;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 mb-4 border border-indigo-100">
            <GraduationCap className="w-3.5 h-3.5" /> Structured Learning
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            CodeNivra Learning Courses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Choose a developer roadmap to go from absolute scratch to deploying real production-grade applications.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No courses found</h3>
            <p className="text-sm text-slate-500 mt-2">Check back later or rerun your database seed script.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.01)] hover:shadow-[0_12px_35px_rgba(15,23,42,0.05)] hover:border-slate-300/90 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-105 transition-transform">
                    <Layout className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b border-slate-100 py-4.5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold font-mono">MODULES</p>
                        <p className="text-sm font-bold text-slate-800">{course.module_count}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold font-mono">LESSONS</p>
                        <p className="text-sm font-bold text-slate-800">{course.lesson_count}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-3 text-sm font-semibold text-white transition-all group-hover:bg-indigo-600"
                  >
                    View Syllabus <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
