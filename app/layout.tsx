import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteSpinner } from "@/components/RouteSpinner";

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
            <nav className="flex items-center gap-8">
              <Link
                href="/learn"
                className="text-slate-600 hover:text-indigo-700 font-medium"
              >
                Learn
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        <RouteSpinner />

        <ScrollToTop />

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white mt-20">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-indigo-800 mb-4">DevMentor</h3>
                <p className="text-slate-600 text-sm">
                  Learn production-ready web development from a senior engineer.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-4">Learning</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/learn" className="text-slate-600 hover:text-indigo-700">
                      All Tracks
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-4">Resources</h3>
                <p className="text-slate-600 text-sm">
                  All lessons are fully static and stored in this repository.
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
