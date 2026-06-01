"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProgressContextType {
  completedLessons: string[];
  completedTasks: string[];
  completedProjects: string[];
  toggleLessonComplete: (slug: string) => void;
  toggleTaskComplete: (slug: string) => void;
  toggleProjectComplete: (slug: string) => void;
  getTrackProgress: (trackSlug: string, totalLessonsCount: number) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const timer = setTimeout(() => {
      try {
        const lessons = localStorage.getItem("CodeNivra-progress-lessons");
        const tasks = localStorage.getItem("CodeNivra-progress-tasks");
        const projects = localStorage.getItem("CodeNivra-progress-projects");

        if (lessons) setCompletedLessons(JSON.parse(lessons));
        if (tasks) setCompletedTasks(JSON.parse(tasks));
        if (projects) setCompletedProjects(JSON.parse(projects));
      } catch (e) {
        console.error("Error reading progress localStorage", e);
      }
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleLessonComplete = (slug: string) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem("CodeNivra-progress-lessons", JSON.stringify(next));
      return next;
    });
  };

  const toggleTaskComplete = (slug: string) => {
    setCompletedTasks((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem("CodeNivra-progress-tasks", JSON.stringify(next));
      return next;
    });
  };

  const toggleProjectComplete = (slug: string) => {
    setCompletedProjects((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem("CodeNivra-progress-projects", JSON.stringify(next));
      return next;
    });
  };

  if (!mounted) {
    // Return a shell context or wait to render children to prevent server-side hydration mismatches
    return (
      <ProgressContext.Provider
        value={{
          completedLessons: [],
          completedTasks: [],
          completedProjects: [],
          toggleLessonComplete: () => { },
          toggleTaskComplete: () => { },
          toggleProjectComplete: () => { },
          getTrackProgress: () => 0,
        }}
      >
        {children}
      </ProgressContext.Provider>
    );
  }

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        completedTasks,
        completedProjects,
        toggleLessonComplete,
        toggleTaskComplete,
        toggleProjectComplete,
        getTrackProgress: () => {
          return 0; // handled inline in pages to avoid coupling
        },
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
