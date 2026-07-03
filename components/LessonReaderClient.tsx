"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  PlayCircle,
  RotateCcw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Lesson {
  id: string;
  title: string;
  content: string;
  module_id: string;
  course_id: string;
  module_title: string;
  course_title: string;
}

interface NavLesson {
  id: string;
  title: string;
}

interface InterviewBlock {
  question: string;
  answer: string;
  moduleTitle: string;
  pathTitle: string;
}

interface LessonReaderClientProps {
  lesson: Lesson;
  initialCompleted: boolean;
  prevLesson: NavLesson | null;
  nextLesson: NavLesson | null;
  interview: InterviewBlock;
}

type MarkdownCodeProps = React.ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

export function LessonReaderClient({ lesson, initialCompleted, prevLesson, nextLesson, interview }: LessonReaderClientProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/progress/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, completed: !completed }),
      });

      if (res.ok) {
        setCompleted(!completed);
        router.refresh();
      }
    } catch (err) {
      console.error("Error toggling progress:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 font-mono">
        <Link href="/courses" className="hover:text-slate-700 transition-colors">LEARN</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/courses/${lesson.course_id}`} className="hover:text-slate-700 transition-colors truncate max-w-[150px] sm:max-w-xs">
          {lesson.course_title.toUpperCase()}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-500 truncate max-w-[150px] sm:max-w-xs">{lesson.module_title.toUpperCase()}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-[0_4px_30px_rgba(15,23,42,0.01)]">
            <article className="prose prose-slate max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-8 mb-4 font-sans border-b border-slate-100 pb-2" {...props} />,
                  h2: ({ ...props }) => <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-7 mb-3.5 font-sans" {...props} />,
                  h3: ({ ...props }) => <h3 className="text-lg font-bold text-slate-850 mt-6 mb-3 font-sans" {...props} />,
                  h4: ({ ...props }) => <h4 className="text-base font-bold text-slate-800 mt-4 mb-2 font-sans" {...props} />,
                  p: ({ ...props }) => <p className="text-slate-750 text-sm sm:text-base leading-relaxed my-4" {...props} />,
                  ul: ({ ...props }) => <ul className="list-disc pl-6 my-4 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed" {...props} />,
                  li: ({ ...props }) => <li className="text-slate-700 text-sm sm:text-base" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                  code: ({ className, children, ...props }: MarkdownCodeProps) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match && !String(children).includes("\n");
                    if (isInline) {
                      return <code className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200/60 font-semibold" {...props}>{children}</code>;
                    }
                    return (
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-5 shadow-inner leading-relaxed border border-slate-800">
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </article>

            <div className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-black text-slate-950">Interview Question</h2>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">{interview.question}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Expected answer: {interview.answer}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {completed ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-800">
                    <PlayCircle className="w-4 h-4 text-indigo-600" /> In Progress
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                {completed ? (
                  <button onClick={handleToggleComplete} disabled={loading} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-all cursor-pointer disabled:opacity-55">
                    <RotateCcw className="w-3.5 h-3.5" /> Mark as Incomplete
                  </button>
                ) : (
                  <button onClick={handleToggleComplete} disabled={loading} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm shadow-emerald-500/10 cursor-pointer disabled:opacity-55">
                    {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Mark as Completed"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mt-6">
            {prevLesson ? (
              <Link href={`/lessons/${prevLesson.id}`} className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 px-4.5 py-3 text-sm font-semibold text-slate-700 transition-all shadow-sm">
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold font-mono">PREVIOUS</p>
                  <p className="truncate max-w-[120px] sm:max-w-[200px] mt-0.5">{prevLesson.title}</p>
                </div>
              </Link>
            ) : <div className="invisible" />}

            {nextLesson ? (
              <Link href={`/lessons/${nextLesson.id}`} className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 px-4.5 py-3 text-sm font-semibold text-slate-700 transition-all shadow-sm">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold font-mono">NEXT</p>
                  <p className="truncate max-w-[120px] sm:max-w-[200px] mt-0.5">{nextLesson.title}</p>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : <div className="invisible" />}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_15px_rgba(15,23,42,0.01)] sticky top-24">
            <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider mb-3">Learning Path Navigation</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">You are currently studying <strong>{lesson.course_title}</strong>.</p>
            <Link href={`/courses/${lesson.course_id}`} className="inline-flex items-center gap-1.5 w-full justify-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 transition-colors">
              <BookOpen className="w-4 h-4" /> View Learning Path
            </Link>
            <Link href="/interview" className="mt-3 inline-flex items-center gap-1.5 w-full justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 transition-colors">
              <MessageSquareQuote className="w-4 h-4" /> Practice Interview Answers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

