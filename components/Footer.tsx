import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900">
              CodeNivra
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              A structured developer learning workspace for roadmaps, practice tasks, project labs, code review, and deployment readiness.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Workspace</h3>
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
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} CodeNivra. All rights reserved.</p>
          <p>Enterprise learning workspace</p>
        </div>
      </div>
    </footer>
  );
}
