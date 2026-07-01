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
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Start Here</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/learn" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link href="/roadmaps" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Roadmaps
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Project Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Practice</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/tasks" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Daily Tasks
                  </Link>
                </li>
                <li>
                  <Link href="/code-review" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Code Review
                  </Link>
                </li>
                <li>
                  <Link href="/learn/deployment" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Deployment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Focus Areas</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/learn/frontend-frameworks" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Frontend Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="/learn/backend" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Backend Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="/code-review" className="text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                    Code Review Checklist
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
