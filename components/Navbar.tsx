"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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

  // Close dropdown on outside click
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
    { name: "Full-Stack Track", href: "/learn/fullstack", desc: "End-to-end applications", icon: <Layers className="w-4 h-4 text-purple-500" /> },
  ];

  const mainNavItems = [
    { name: "Practice", href: "/tasks" },
    { name: "Projects", href: "/projects" },
    { name: "Review", href: "/code-review" },
    { name: "Deploy", href: "/learn/deployment" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/85 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Skip-to-content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Skip to content
        </a>

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="text-lg font-extrabold text-indigo-800 tracking-tight hover:opacity-90 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg px-2.5 py-1"
        >
          CodeNivra
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Learn Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLearnOpen(!isLearnOpen)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsLearnOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={isLearnOpen}
              className={`inline-flex items-center gap-1 text-xs font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg px-3 py-1.5 cursor-pointer ${
                isLearnOpen || pathname === "/learn" || pathname.startsWith("/learn/") || pathname === "/roadmaps"
                  ? "bg-indigo-50/70 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              <span>Learn</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLearnOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Panel */}
            {isLearnOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl ring-1 ring-slate-900/5 animate-fade-in focus:outline-none">
                <div className="space-y-1">
                  {learnItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenus}
                        className={`flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                          isActive
                            ? "bg-slate-50 text-indigo-700"
                            : "hover:bg-slate-50 text-slate-700 hover:text-indigo-600"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-xs font-bold leading-tight">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal mt-0.5 leading-normal">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Other links */}
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Deploy" && pathname.startsWith("/learn/deployment"));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenus}
                className={`text-xs font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg px-3 py-1.5 ${
                  isActive
                    ? "bg-indigo-50/70 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/learn"
            onClick={closeMenus}
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer shadow-xs"
          >
            Start Learning <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-4 animate-fade-in">
          {/* Learn Subgroup */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3">
              Learn curriculum
            </p>
            {learnItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenus}
                  className={`flex items-center gap-3 py-2 px-3 rounded-xl transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-655"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="text-xs font-bold">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Direct links */}
          <div className="space-y-1 border-t border-slate-50 pt-3">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-1.5">
              Practice & Review
            </p>
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenus}
                  className={`block text-xs font-bold py-2 px-3 rounded-xl transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-655"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 px-3">
            <Link
              href="/learn"
              onClick={closeMenus}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
