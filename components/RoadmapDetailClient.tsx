"use client";

import React, { useMemo } from "react";
import { Roadmap } from "@/lib/roadmaps";
import { DeveloperTask } from "@/lib/tasks";
import { useProgress } from "@/context/ProgressContext";
import { RoadmapDetailLayout } from "./RoadmapDetailLayout";

interface RoadmapDetailClientProps {
  roadmap: Roadmap;
  tasksForThisPath: DeveloperTask[];
  plan: { week: string; topic: string; details: string }[] | undefined;
}

export function RoadmapDetailClient({
  roadmap,
  tasksForThisPath,
  plan
}: RoadmapDetailClientProps) {
  const { completedLessons, completedTasks, completedProjects } = useProgress();

  const completedLessonsCount = useMemo(
    () =>
      roadmap.recommendedLessons.filter((lesson) =>
        completedLessons.includes(lesson.slug),
      ).length,
    [completedLessons, roadmap.recommendedLessons],
  );

  const completedTasksCount = useMemo(
    () =>
      tasksForThisPath.filter((task) => completedTasks.includes(task.slug)).length,
    [completedTasks, tasksForThisPath],
  );

  const completedProjectsCount = useMemo(
    () =>
      roadmap.projectTasks.filter((project) =>
        completedProjects.includes(project.projectSlug),
      ).length,
    [completedProjects, roadmap.projectTasks],
  );

  const totalItems =
    roadmap.recommendedLessons.length +
    tasksForThisPath.length +
    roadmap.projectTasks.length;

  const completedItemCount =
    completedLessonsCount + completedTasksCount + completedProjectsCount;

  const progressPercent =
    totalItems > 0 ? Math.round((completedItemCount / totalItems) * 100) : 0;

  const hasProgress = completedItemCount > 0;

  const nextLesson =
    roadmap.recommendedLessons.find(
      (lesson) => !completedLessons.includes(lesson.slug),
    ) ?? roadmap.recommendedLessons[0];

  const nextLessonHref = nextLesson
    ? `/learn/${nextLesson.track}/${nextLesson.slug}`
    : "/learn";

  return (
    <RoadmapDetailLayout
      roadmap={roadmap}
      tasksForThisPath={tasksForThisPath}
      plan={plan}
      progressPercent={progressPercent}
      completedLessonsCount={completedLessonsCount}
      completedTasksCount={completedTasksCount}
      completedProjectsCount={completedProjectsCount}
      hasProgress={hasProgress}
      nextLessonHref={nextLessonHref}
    />
  );
}
