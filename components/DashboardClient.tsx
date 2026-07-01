"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, User } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import {
  LogOut,
  Flame,
  Award,
  BookOpen,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Trophy,
  Code2,
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

interface DashboardClientProps {
  user: User;
  totalCount: number;
  completedCount: number;
  continueLesson: { id: string; title: string; courseId: string } | null;
  dailyMissions: DailyMission[];
  streakInfo: StreakInfo;
  todayChallenge: TodayChallenge | null;
}

export function DashboardClient({
  user,
  totalCount,
  completedCount,
  continueLesson,
  dailyMissions,
  streakInfo,
  todayChallenge,
}: DashboardClientProps) {
  const { logout } = useAuth();
  const { completedTasks, completedProjects } = useProgress();
  const router = useRouter();

  const [missions, setMissions] = useState<DailyMission[]>(dailyMissions);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  useEffect(() => {
    setMissions(dailyMissions);
  }, [dailyMissions]);

  const totalTasks = 20;
  const totalProjects = 8;

  const lessonsPercent = totalCount > 0 ? Math.min(
    Math.round((completedCount / totalCount) * 100),
    100
  ) : 0;
  const tasksPercent = Math.min(
    Math.round((completedTasks.length / totalTasks) * 100),
    100
  );
  const projectsPercent = Math.min(
    Math.round((completedProjects.length / totalProjects) * 100),
    100
  );

  const completedMissionsCount = missions.filter((m) => m.isCompleted).length;
  const allMissionsCompleted = completedMissionsCount === missions.length;

  const handleToggleMission = async (progressId: string, currentCompleted: boolean) => {
    setToggleLoading(progressId);
    // Optimistic UI update
    setMissions((prev) =>
      prev.map((m) => (m.id === progressId ? { ...m, isCompleted: !currentCompleted } : m))
    );

    try {
      const res = await fetch("/api/missions/toggle-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progressId,
          completed: !currentCompleted,
        }),
      });

      if (!res.ok) {
        // Revert on error
        setMissions((prev) =>
          prev.map((m) => (m.id === progressId ? { ...m, isCompleted: currentCompleted } : m))
        );
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Error toggling mission:", err);
      // Revert on error
      setMissions((prev) =>
        prev.map((m) => (m.id === progressId ? { ...m, isCompleted: currentCompleted } : m))
      );
    } finally {
      setToggleLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(15,23,42,0.08)] mb-8 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute left-1/3 bottom-[-50px] w-60 h-60 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-200">
              <UserIcon className="w-8 h-8 text-indigo-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-full">
                  {user.role}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> PRO Student
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 font-sans">
                Welcome back, {user.name}!
              </h1>
              <p className="text-sm text-slate-300 mt-1.5 max-w-xl">
                Ready to level up? You have completed {completedCount} lessons and built{" "}
                {completedProjects.length} real-world projects so far.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Continue Learning Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {continueLesson ? "Continue Learning" : "Start Learning"}
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              {continueLesson
                ? "Pick up right where you left off on your roadmap. Keep advancing through backend systems, database engineering, and cloud deployment."
                : "Begin your learning roadmap. Walk step-by-step from building responsive interfaces to hosting live applications."}
            </p>
            <div className="bg-slate-50 rounded-xl p-3.5 mt-5 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-mono">CURRENT TOPIC</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5 truncate max-w-[170px]">
                  {continueLesson ? continueLesson.title : "Full Stack Web Development"}
                </p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded shrink-0">
                {continueLesson ? "Active" : "Not Started"}
              </span>
            </div>
          </div>
          <Link
            href={continueLesson ? `/lessons/${continueLesson.id}` : `/lessons/f47ac10b-58cc-4372-a567-0e02b2c3d490`}
            className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-sm font-semibold text-white transition-colors"
          >
            {continueLesson ? "Resume Learning" : "Start Learning"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Today's Mission Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Today's Mission</h3>
              <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {completedMissionsCount} / {missions.length} Done
              </span>
            </div>

            {/* List of daily tasks */}
            <div className="space-y-3.5 mt-2">
              {missions.map((mission) => {
                const isAutoTask = mission.type === "open_lesson" || mission.type === "complete_lesson";
                return (
                  <div
                    key={mission.id}
                    className={`flex items-start gap-3 rounded-xl p-3 border transition-colors ${
                      mission.isCompleted
                        ? "bg-slate-50/50 border-slate-100/80"
                        : "bg-white border-slate-150 hover:bg-slate-50/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={mission.isCompleted}
                      disabled={isAutoTask || toggleLoading === mission.id}
                      onChange={() => handleToggleMission(mission.id, mission.isCompleted)}
                      className={`mt-1.5 h-4 w-4 rounded border-slate-350 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          mission.isCompleted ? "text-slate-400 line-through" : "text-slate-700"
                        }`}
                      >
                        {mission.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-400 font-mono">+{mission.xpReward} XP</span>
                        {isAutoTask && (
                          <span className="text-[9px] font-bold text-slate-400 font-mono tracking-wide uppercase bg-slate-100 px-1 py-0.5 rounded">
                            Auto
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success message banner */}
            {allMissionsCompleted && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4.5 text-center mt-5 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 animate-fade-in shadow-sm shadow-emerald-500/5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Great work! Today’s mission completed.</span>
              </div>
            )}
          </div>
          <Link
            href="/courses"
            className="mt-6 inline-flex items-center justify-center gap-1.5 w-full rounded-xl border border-slate-200 hover:bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition-colors"
          >
            Go to Syllabus <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Streak Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Coding Streak</h3>
            <p className="text-sm text-slate-500 mt-2">
              Complete at least 1 mission task today to protect and extend your streak.
            </p>

            <div className="flex items-baseline gap-2 mt-6">
              <span className="text-5xl font-extrabold tracking-tight text-slate-950 font-mono animate-pulse">
                {streakInfo.currentStreak}
              </span>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Days Active 🔥
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 font-medium flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Longest streak: {streakInfo.longestStreak} days
            </p>
          </div>
          <div className="mt-6 bg-amber-50/50 rounded-xl p-3 border border-amber-100/50 flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-xs font-semibold text-amber-800">
              {streakInfo.currentStreak > 0
                ? "Active Streak Modifier: +10% Experience"
                : "Complete today's task to activate modifier"}
            </span>
          </div>
        </div>

        {/* Today's Coding Challenge Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Coding Challenge</h3>
              {todayChallenge && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  todayChallenge.difficulty === "Easy" ? "bg-emerald-55/60 text-emerald-700" : "bg-amber-55/60 text-amber-700"
                }`}>
                  {todayChallenge.difficulty}
                </span>
              )}
            </div>

            {todayChallenge ? (
              <div className="mt-3">
                <p className="text-sm text-slate-800 font-semibold truncate max-w-[220px]">
                  {todayChallenge.title}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {todayChallenge.isSolved ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-1 rounded-md">
                      <CheckCircle className="w-3.5 h-3.5" /> Solved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold px-2 py-1 rounded-md">
                      Pending Attempt
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 mt-2">
                No active coding challenge for today. Check back tomorrow!
              </p>
            )}
          </div>

          <Link
            href="/challenges/today"
            className={`mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold transition-all border ${
              todayChallenge?.isSolved
                ? "border-slate-200 hover:bg-slate-50 text-slate-700"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/10"
            }`}
          >
            {todayChallenge?.isSolved ? "Review Submission" : "Solve Challenge"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Progress Card (spanning full width or multi column if needed) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all p-6 md:col-span-2 lg:col-span-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Your Progress Metrics</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">Real-time completion summary from your learning profile</p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
            >
              Browse Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Lessons completed */}
            <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" /> Lessons
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${lessonsPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                {lessonsPercent}% completed
              </span>
            </div>

            {/* Tasks completed */}
            <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-500" /> Tasks
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {completedTasks.length} / {totalTasks}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${tasksPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                {tasksPercent}% completed
              </span>
            </div>

            {/* Projects completed */}
            <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-500" /> Projects
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {completedProjects.length} / {totalProjects}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${projectsPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                {projectsPercent}% completed
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
