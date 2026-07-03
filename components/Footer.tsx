"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function Footer() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50/70">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${user ? "py-12 md:py-14" : "py-6"}`}>
        {user && (
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Daily Flow</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/dashboard" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/tasks" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Practice
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Build & Explain</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/projects" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/interview" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Interview
                  </Link>
                </li>
                <li>
                  <Link href="/progress" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Progress
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Optional Exploration</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/learn" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Track Library
                  </Link>
                </li>
                <li>
                  <Link href="/roadmaps" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Career Paths
                  </Link>
                </li>
                <li>
                  <Link href="/code-review" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Code Review
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className={`flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between ${user ? "mt-10 border-t border-slate-200 pt-6" : ""}`}>
          <p>&copy; {new Date().getFullYear()} CodeNivra. All rights reserved.</p>
          <p>Built for learners moving from tutorials to real project confidence.</p>
        </div>
      </div>
    </footer>
  );
}
