import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteSpinner } from "@/components/RouteSpinner";
import { ProgressProvider } from "@/context/ProgressContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevMentor - Learn Web Development",
  description: "Learn to build production-ready web applications from a senior engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-800`}
      >
        {/* Header */}
        <header className="border-b border-slate-200/80 sticky top-0 bg-white/90 backdrop-blur z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-800">
              DevMentor
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto select-none no-scrollbar">
              <Link
                href="/roadmaps"
                className="text-slate-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                Roadmaps
              </Link>
              <Link
                href="/projects"
                className="text-slate-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                Project Labs
              </Link>
              <Link
                href="/tasks"
                className="text-slate-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                Daily Tasks
              </Link>
              <Link
                href="/code-review"
                className="text-slate-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                Code Review
              </Link>
              <Link
                href="/learn"
                className="text-slate-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                All Lessons
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </main>

        <RouteSpinner />

        <ScrollToTop />

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white mt-20">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-indigo-850 mb-4 text-base">DevMentor</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Learn real-time web development by building production-style applications from intern to senior level.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-850 mb-4 text-base">Learning Paths</h3>
                <ul className="space-y-2 text-sm font-medium">
                  <li>
                    <Link href="/roadmaps" className="text-slate-600 hover:text-indigo-700">
                      Role-based Roadmaps
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-slate-600 hover:text-indigo-700">
                      Project Labs
                    </Link>
                  </li>
                  <li>
                    <Link href="/tasks" className="text-slate-600 hover:text-indigo-700">
                      Daily Developer Tasks
                    </Link>
                  </li>
                  <li>
                    <Link href="/code-review" className="text-slate-600 hover:text-indigo-700">
                      Senior Code Review Checklist
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-indigo-850 mb-4 text-base font-semibold">Resources</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Industry-grade, static markdown guides and project templates stored inside this repository.
                </p>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-8 text-center text-slate-600 text-sm">
              <p>&copy; 2026 DevMentor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
