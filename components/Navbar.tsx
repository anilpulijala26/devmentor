"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, BookOpen, Map, Cpu, Database, Layers } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenus = () => {
    setIsLearnOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLearnOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const learnItems = [
    { name: "Learning Hub", href: "/learn", desc: "Structured core syllabus paths", icon: <BookOpen className="w-4 h-4 text-indigo-500" /> },
    { name: "Roadmaps", href: "/roadmaps", desc: "Role-based career pathways", icon: <Map className="w-4 h-4 text-violet-500" /> },
    { name: "Frontend Track", href: "/learn/frontend-frameworks", desc: "React, Next.js & UI design", icon: <Cpu className="w-4 h-4 text-blue-500" /> },
    { name: "Backend Track", href: "/learn/backend", desc: "Node.js, Express & SQL", icon: <Database className="w-4 h-4 text-emerald-500" /> },
    { name: "Full-Stack Track", href: "/learn/fullstack", desc: "End-to-end applications", icon: <Layers className="w-4 h-4 text-purple-500" /> }
  ];

  const mainNavItems = [
    { name: "Practice", href: "/tasks" },
    { name: "Projects", href: "/projects" },
    { name: "Review", href: "/code-review" },
    { name: "Deploy", href: "/learn/deployment" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/92 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-slate-900 focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Skip to content
        </a>

        <Link
          href="/"
          onClick={closeMenus}
          className="inline-flex items-center rounded-lg px-1 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Image
            src="/logo.png"
            alt="CodeNivra"
            width={182}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:gap-3 md:flex">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLearnOpen(!isLearnOpen)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsLearnOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={isLearnOpen}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                isLearnOpen || pathname === "/learn" || pathname.startsWith("/learn/") || pathname === "/roadmaps"
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span>Learn</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLearnOpen ? "rotate-180" : ""}`} />
            </button>

            {isLearnOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5 animate-fade-in focus:outline-none">
                <div className="space-y-1">
                  {learnItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenus}
                        className={`flex items-start gap-3 rounded-xl p-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                          isActive
                            ? "bg-slate-50 text-slate-950"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold leading-tight">{item.name}</p>
                          <p className="mt-1 text-xs leading-normal text-slate-500">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Deploy" && pathname.startsWith("/learn/deployment"));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenus}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/learn"
            onClick={closeMenus}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Start Learning <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer md:hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-4 border-b border-slate-200 bg-white/95 px-4 pt-2 pb-6 animate-fade-in backdrop-blur-md md:hidden">
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Learn curriculum
            </p>
            {learnItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenus}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                    isActive
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 border-t border-slate-100 pt-3">
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Practice & Review
            </p>
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (item.name === "Deploy" && pathname.startsWith("/learn/deployment"));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenus}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="px-3 pt-2">
            <Link
              href="/learn"
              onClick={closeMenus}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
