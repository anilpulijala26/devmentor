"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Search } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import type { DeveloperTask } from "@/lib/tasks";
import {
  getEstimatedTime,
  getLevelTone,
  getTaskCategory,
  getVisibleTaskTags,
  TASK_FILTERS,
  type TaskFilter,
} from "./tasks/task-helpers";

interface TasksClientProps {
  initialTasks: DeveloperTask[];
}

export function TasksClient({ initialTasks }: TasksClientProps) {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const { completedTasks } = useProgress();

  const filtered = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return initialTasks.filter((task) => {
      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Beginner"
            ? task.level === "Beginner"
            : activeFilter === "Mid-Level"
              ? task.level === "Intermediate"
              : activeFilter === "Senior"
                ? task.level === "Advanced"
                : getTaskCategory(task.slug) === activeFilter;

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        task.title,
        task.requirement,
        task.expectedOutput,
        ...getVisibleTaskTags(task.slug),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [activeFilter, initialTasks, searchQuery]);

  const visibleTasks = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  const handleFilterChange = (filter: TaskFilter) => {
    setActiveFilter(filter);
    setVisibleCount(12);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(12);
  };

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-10 px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
            Practice workspace
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
            Practice Tasks
          </h1>
          <p className="max-w-[680px] text-base leading-7 text-slate-600 sm:text-lg">
            Practice implementation details, UI patterns, API handling, and production engineering habits through focused hands-on tasks.
          </p>
          <p className="text-sm font-medium text-slate-500">
            30+ Tasks {"\u00b7"} Frontend + Backend {"\u00b7"} 15-45 min challenges
          </p>
        </div>

        <div className="max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm no-scrollbar md:overflow-visible">
          <div className="flex w-max min-w-full flex-nowrap gap-2 md:min-w-0 md:w-auto md:flex-wrap">
            {TASK_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                aria-pressed={activeFilter === filter}
                className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  activeFilter === filter
                    ? "bg-[#4F46E5] text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <label htmlFor="task-search" className="sr-only">
            Search tasks
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#4F46E5] focus-within:ring-4 focus-within:ring-indigo-100">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              id="task-search"
              type="search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search tasks by React, API, JWT, SQL..."
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {visibleTasks.length === 0 ? (
        <div className="rounded-[22px] border border-slate-200 bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <p className="text-base font-medium text-slate-600">No tasks found for this filter.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.slug);

              return (
                <article
                  key={task.slug}
                  className="group flex h-full flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${getLevelTone(task.level)}`}>
                        {task.level}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                          Practice task
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-950">{task.title}</h3>
                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">{task.requirement}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {getVisibleTaskTags(task.slug).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span className="font-medium">Estimated time</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {getEstimatedTime(task.level)}
                      </span>
                    </div>

                    <Link
                      href={`/tasks/${task.slug}`}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] text-sm font-semibold text-white transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    >
                      <span>Open Practice Task</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {canLoadMore ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Load More
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}


