"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ProgressContextType {
  completedLessons: string[];
  completedTasks: string[];
  completedProjects: string[];
  taskCompletedDates: Record<string, string>;
  toggleLessonComplete: (slug: string) => void;
  toggleTaskComplete: (slug: string) => Promise<void>;
  toggleProjectComplete: (slug: string) => void;
  getTrackProgress: (trackSlug: string, totalLessonsCount: number) => number;
}

const LESSONS_STORAGE_KEY = "CodeNivra-progress-lessons";
const TASKS_STORAGE_KEY = "CodeNivra-progress-tasks";
const PROJECTS_STORAGE_KEY = "CodeNivra-progress-projects";
const TASK_DATES_STORAGE_KEY = "CodeNivra-progress-task-dates";

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error((data && data.error) || "Request failed");
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return data;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [taskCompletedDates, setTaskCompletedDates] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const lessons = localStorage.getItem(LESSONS_STORAGE_KEY);
        const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
        const projects = localStorage.getItem(PROJECTS_STORAGE_KEY);
        const taskDates = localStorage.getItem(TASK_DATES_STORAGE_KEY);

        if (lessons) setCompletedLessons(JSON.parse(lessons));
        if (tasks) setCompletedTasks(JSON.parse(tasks));
        if (projects) setCompletedProjects(JSON.parse(projects));
        if (taskDates) setTaskCompletedDates(JSON.parse(taskDates));
      } catch (error) {
        console.error("Error reading progress localStorage", error);
      }

      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    let cancelled = false;

    const loadServerProgress = async () => {
      try {
        const data = await fetchJson("/api/progress/summary", { cache: "no-store" });

        if (cancelled) {
          return;
        }

        const nextTasks = Array.isArray(data.completedTaskSlugs) ? data.completedTaskSlugs : [];
        const nextProjects = Array.isArray(data.completedProjectSlugs) ? data.completedProjectSlugs : [];
        const nextTaskDates = data.taskCompletedDates && typeof data.taskCompletedDates === "object" ? data.taskCompletedDates : {};

        setCompletedTasks(nextTasks);
        setCompletedProjects(nextProjects);
        setTaskCompletedDates(nextTaskDates);

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(nextTasks));
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(nextProjects));
        localStorage.setItem(TASK_DATES_STORAGE_KEY, JSON.stringify(nextTaskDates));
      } catch (error) {
        const status = (error as Error & { status?: number }).status;
        if (status && status !== 401) {
          console.error("Error loading persisted progress", error);
        }
      }
    };

    void loadServerProgress();

    return () => {
      cancelled = true;
    };
  }, [mounted]);

  const toggleLessonComplete = (slug: string) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleTaskComplete = async (slug: string) => {
    const isCompleted = completedTasks.includes(slug);
    const previousTasks = completedTasks;
    const previousDates = taskCompletedDates;
    const nextTasks = isCompleted ? completedTasks.filter((item) => item !== slug) : [...completedTasks, slug];
    const nextDates = { ...taskCompletedDates };

    if (isCompleted) {
      delete nextDates[slug];
    } else {
      nextDates[slug] = new Date().toISOString();
    }

    setCompletedTasks(nextTasks);
    setTaskCompletedDates(nextDates);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(nextTasks));
    localStorage.setItem(TASK_DATES_STORAGE_KEY, JSON.stringify(nextDates));

    try {
      const data = await fetchJson("/api/tasks/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskSlug: slug, completed: !isCompleted }),
      });

      const serverCompleted = Array.isArray(data.completedTaskSlugs) ? data.completedTaskSlugs : nextTasks;
      const serverDates = data.taskCompletedDates && typeof data.taskCompletedDates === "object" ? data.taskCompletedDates : nextDates;

      setCompletedTasks(serverCompleted);
      setTaskCompletedDates(serverDates);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(serverCompleted));
      localStorage.setItem(TASK_DATES_STORAGE_KEY, JSON.stringify(serverDates));
    } catch (error) {
      const status = (error as Error & { status?: number }).status;

      if (status === 401) {
        return;
      }

      if (status) {
        console.error("Error saving task progress", error);
      }

      setCompletedTasks(previousTasks);
      setTaskCompletedDates(previousDates);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(previousTasks));
      localStorage.setItem(TASK_DATES_STORAGE_KEY, JSON.stringify(previousDates));
    }
  };

  const toggleProjectComplete = (slug: string) => {
    setCompletedProjects((prev) => {
      const next = prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug];
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value: ProgressContextType = {
    completedLessons,
    completedTasks,
    completedProjects,
    taskCompletedDates,
    toggleLessonComplete,
    toggleTaskComplete,
    toggleProjectComplete,
    getTrackProgress: () => 0,
  };

  if (!mounted) {
    return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
