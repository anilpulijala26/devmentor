"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { type User } from "@/context/AuthContext";
import { developerTasks } from "@/lib/tasks";
import { projects } from "@/lib/projects";
import { LearningProfilePrompt } from "@/components/LearningProfilePrompt";
import type { DayPlan, LearningProfile } from "@/lib/learningProfile";
import {
  ArrowRight,
  Award,
  BookOpen,  CheckSquare,
  Code2,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  User as UserIcon,
} from "lucide-react";

interface DailyMission {
  id: string;
  title: string;
  type: string;
  xpReward: number;
  isCompleted: boolean;
}

interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
}

interface TodayChallenge {
  id: string;
  title: string;
  difficulty: string;
  isSolved: boolean;
}

interface ProjectSubmissionState {
  githubUrl: string | null;
  liveUrl: string | null;
  reviewStatus: string;
  submittedAt: string | null;
}

interface DashboardClientProps {
  user: User;
  totalCount: number;
  completedCount: number;
  continueLesson: { id: string; title: string; courseId: string } | null;
  dailyMissions: DailyMission[];
  streakInfo: StreakInfo;
  todayChallenge: TodayChallenge | null;
  learningProfile: LearningProfile;
  currentModuleTitle: string;
  currentDayPlan: DayPlan;
  projectSubmission: ProjectSubmissionState | null;
  showProfilePrompt: boolean;
}

export function DashboardClient({
  user,
  totalCount,
  completedCount,
  continueLesson,
  dailyMissions,
  streakInfo,
  todayChallenge,
  learningProfile,
  currentModuleTitle,
  currentDayPlan,
  projectSubmission,
  showProfilePrompt,
}: DashboardClientProps) {
  const { completedTasks, completedProjects } = useProgress();
  const router = useRouter();
  const [missions, setMissions] = useState<DailyMission[]>(dailyMissions);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  useEffect(() => {
    setMissions(dailyMissions);
  }, [dailyMissions]);

  const totalTasks = developerTasks.length;
  const totalProjects = projects.length;
  const lessonsPercent = totalCount > 0 ? Math.min(Math.round((completedCount / totalCount) * 100), 100) : 0;
  const tasksPercent = Math.min(Math.round((completedTasks.length / totalTasks) * 100), 100);
  const projectsPercent = Math.min(Math.round((completedProjects.length / totalProjects) * 100), 100);
  const completedMissionCount = missions.filter((mission) => mission.isCompleted).length;

  const lessonStatus = missions.find((mission) => mission.type === "open_lesson")?.isCompleted
    ? "Completed"
    : continueLesson
      ? "In Progress"
      : "Not Started";
  const practiceStatus = currentDayPlan.practiceSlug && completedTasks.includes(currentDayPlan.practiceSlug)
    ? "Completed"
    : "Not Started";
  const challengeStatus = todayChallenge?.isSolved ? "Completed" : "Not Started";
  const projectStatus = currentDayPlan.projectSlug && completedProjects.includes(currentDayPlan.projectSlug)
    ? "Completed"
    : "Not Started";
  const explainStatus = missions.find((mission) => mission.type === "read_interview")?.isCompleted
    ? "Completed"
    : "Not Started";
  const submitStatus = projectSubmission?.reviewStatus && projectSubmission.reviewStatus !== "not_submitted_yet"
    ? "Submitted"
    : "Not Started";

  const handleToggleMission = async (progressId: string, currentCompleted: boolean) => {
    setToggleLoading(progressId);
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === progressId ? { ...mission, isCompleted: !currentCompleted } : mission,
      ),
    );

    try {
      const res = await fetch("/api/missions/toggle-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progressId, completed: !currentCompleted }),
      });

      if (!res.ok) {
        setMissions((prev) =>
          prev.map((mission) =>
            mission.id === progressId ? { ...mission, isCompleted: currentCompleted } : mission,
          ),
        );
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling mission:", error);
      setMissions((prev) =>
        prev.map((mission) =>
          mission.id === progressId ? { ...mission, isCompleted: currentCompleted } : mission,
        ),
      );
    } finally {
      setToggleLoading(null);
    }
  };

  const learningPlanItems = [
    { label: "Learn", title: continueLesson?.title ?? currentDayPlan.lessonTitle, status: lessonStatus, href: continueLesson ? `/lessons/${continueLesson.id}` : "/courses" },
    { label: "Practice", title: currentDayPlan.practiceTitle, status: practiceStatus, href: currentDayPlan.practiceHref ?? "/tasks" },
    { label: "Solve", title: todayChallenge?.title ?? currentDayPlan.challengeTitle, status: challengeStatus, href: currentDayPlan.challengeHref ?? "/challenges/today" },
    { label: "Build", title: currentDayPlan.projectStepTitle, status: projectStatus, href: currentDayPlan.projectHref ?? "/projects" },
    { label: "Explain", title: currentDayPlan.interviewQuestion, status: explainStatus, href: currentDayPlan.interviewHref ?? "/interview" },
    { label: "Submit", title: projectSubmission?.githubUrl ? "Project links saved for review" : "Submit GitHub URL and live URL", status: submitStatus, href: currentDayPlan.projectHref ?? "/projects" },
  ];

  return (
    <>
      <LearningProfilePrompt isOpen={showProfilePrompt} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-6">
        <section className="rounded-[2rem] bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#0F172A] p-6 text-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-100">
                <UserIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-200">Daily guided learning</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Welcome back, {user.name}</h1>
                <div className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                  <p><span className="text-slate-400">Current Path:</span> {learningProfile.pathTitle}</p>
                  <p><span className="text-slate-400">Current Module:</span> {currentModuleTitle}</p>
                  <p><span className="text-slate-400">Current Day:</span> Day {currentDayPlan.day}</p>
                  <p><span className="text-slate-400">Current Level:</span> {learningProfile.currentLevel}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200">
              <p className="font-semibold">You have completed {completedCount} lessons so far.</p>
              <p className="mt-1 text-slate-300">Keep today simple: finish one lesson, one practice task, one coding problem, one project step, and then submit your links.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#4F46E5]">
                  <Target className="h-5 w-5" />
                  <h2 className="text-xl font-black text-slate-950">Today&apos;s Learning Plan</h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">{"Follow the flow: Learn -> Practice -> Solve -> Build -> Explain -> Submit"}</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-[#4F46E5]">
                {completedMissionCount}/{missions.length} checklist items done
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {learningPlanItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{index + 1}. {item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{item.title}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${item.status === "Completed" ? "bg-emerald-50 text-emerald-700" : item.status === "In Progress" ? "bg-amber-50 text-amber-700" : item.status === "Submitted" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                    {item.status}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#4F46E5]">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-black text-slate-950">Continue Today&apos;s Lesson</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {continueLesson
                ? `You are learning ${continueLesson.title} today. Finish this lesson, complete one task, and solve one coding problem.`
                : `Start with ${currentDayPlan.lessonTitle}. Once you finish it, move to practice and then solve today&apos;s coding problem.`}
            </p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Current lesson</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{continueLesson?.title ?? currentDayPlan.lessonTitle}</p>
              <p className="mt-2 text-xs text-slate-500">Module: {currentModuleTitle} • Day {currentDayPlan.day}</p>
            </div>
            <Link
              href={continueLesson ? `/lessons/${continueLesson.id}` : "/courses"}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] text-sm font-semibold text-white transition hover:bg-[#4338CA]"
            >
              Continue Today&apos;s Lesson <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#4F46E5]">
              <Code2 className="h-5 w-5" />
              <h2 className="text-lg font-black text-slate-950">Daily Coding Problem</h2>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{todayChallenge?.title ?? currentDayPlan.challengeTitle}</p>
            <p className="mt-2 text-sm text-slate-500">Practice one small JavaScript problem today and check your logic step by step.</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{todayChallenge?.difficulty ?? "Easy"}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${todayChallenge?.isSolved ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                {todayChallenge?.isSolved ? "Completed" : "Not Submitted Yet"}
              </span>
            </div>
            <Link href="/challenges/today" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] text-sm font-semibold text-white transition hover:bg-[#4338CA]">
              {todayChallenge?.isSolved ? "Review Solution" : "Solve Today's Problem"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#4F46E5]">
              <TrendingUp className="h-5 w-5" />
              <h2 className="text-lg font-black text-slate-950">Your Learning Progress</h2>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { label: "Lessons completed", value: `${completedCount}/${totalCount}`, width: lessonsPercent, icon: <BookOpen className="h-4 w-4 text-indigo-500" /> },
                { label: "Practice tasks completed", value: `${completedTasks.length}/${totalTasks}`, width: tasksPercent, icon: <CheckSquare className="h-4 w-4 text-emerald-500" /> },
                { label: "Challenges solved", value: todayChallenge?.isSolved ? "1 today" : "0 today", width: todayChallenge?.isSolved ? 100 : 20, icon: <Code2 className="h-4 w-4 text-emerald-600" /> },
                { label: "Projects completed", value: `${completedProjects.length}/${totalProjects}`, width: projectsPercent, icon: <Award className="h-4 w-4 text-emerald-600" /> },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm text-slate-700">
                    <span className="inline-flex items-center gap-2 font-semibold">{item.icon}{item.label}</span>
                    <span className="font-mono text-slate-900">{item.value}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-200/80">
                    <div className={`h-full rounded-full ${item.label === "Lessons completed" ? "bg-[#4F46E5]" : item.label === "Challenges solved" ? "bg-emerald-600" : "bg-emerald-600"}`} style={{ width: `${item.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-700">
              <Flame className="h-5 w-5" />
              <h2 className="text-lg font-black text-slate-950">Streak and XP</h2>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-5xl font-black tracking-tight text-slate-950">{streakInfo.currentStreak}</span>
              <span className="pb-1 text-sm font-semibold text-amber-700">day streak</span>
            </div>
            <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
              <Trophy className="h-4 w-4 text-amber-500" /> Longest streak: {streakInfo.longestStreak} days
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-indigo-600" />
                <p className="text-sm text-slate-600">Complete at least one guided task today to protect your streak and keep momentum strong.</p>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">Today&apos;s Checklist</h2>
              <p className="mt-1 text-sm text-slate-500">Mark simple daily actions as you finish them.</p>
            </div>
            <Link href="/progress" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]">Open full progress</Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {missions.map((mission) => {
              const isAutoTask = mission.type === "open_lesson" || mission.type === "complete_lesson";
              return (
                <div key={mission.id} className={`rounded-2xl border p-4 ${mission.isCompleted ? "border-emerald-100 bg-emerald-50/60" : "border-slate-200 bg-white"}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={mission.isCompleted}
                      disabled={isAutoTask || toggleLoading === mission.id}
                      onChange={() => handleToggleMission(mission.id, mission.isCompleted)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold ${mission.isCompleted ? "text-slate-500 line-through" : "text-slate-800"}`}>{mission.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                        <span>+{mission.xpReward} XP</span>
                        {isAutoTask ? <span className="rounded-full bg-slate-100 px-2 py-0.5 font-bold text-slate-500">Auto</span> : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}






