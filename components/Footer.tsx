import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">CodeNivra</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-normal">
              CodeNivra is a self-guided engineering learning platform for developers who want to build real-world skills through structured lessons, practical projects, and interview-ready preparation.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/learn" className="text-slate-600 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                  Learning Tracks
                </Link>
              </li>
              <li>
                <Link href="/roadmaps" className="text-slate-600 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                  Curriculum Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="text-slate-600 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                  Daily Tasks
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-base">Resources</h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/code-review" className="text-slate-600 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">
                  Code Review Guidelines
                </Link>
              </li>
              <li>
                <span className="text-slate-500 font-medium">Static Markdown Guides</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CodeNivra. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-xs">Self-Guided Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
