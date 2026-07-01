"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, BookOpen, Map, Cpu, Database, Layers, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(pathname);

  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const closeMenus = () => {
    setIsLearnOpen(false);
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLearnOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const learnItems = [
    { name: "Learning Hub", href: "/learn", desc: "Structured paths, project practice, and learning flow", icon: <BookOpen className="w-4 h-4 text-indigo-500" /> },
    { name: "Roadmaps", href: "/roadmaps", desc: "Choose beginner, frontend, full-stack, or job-ready paths", icon: <Map className="w-4 h-4 text-violet-500" /> },
    { name: "Frontend Roadmap", href: "/learn/frontend-frameworks", desc: "React, Next.js, UI systems, and frontend projects", icon: <Cpu className="w-4 h-4 text-blue-500" /> },
    { name: "Backend Roadmap", href: "/learn/backend", desc: "Node.js, APIs, auth, and database engineering", icon: <Database className="w-4 h-4 text-emerald-500" /> },
    { name: "Full-Stack Projects", href: "/learn/fullstack", desc: "Connect frontend, backend, data, and production delivery", icon: <Layers className="w-4 h-4 text-purple-500" /> }
  ];

  const mainNavItems = user ? [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Courses", href: "/courses" },
    { name: "Challenges", href: "/challenges" },
    { name: "Practice", href: "/tasks" },
    { name: "Projects", href: "/projects" }
  ] : [];

  if (isAuthPage) {
    return null;
  }

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

        {user && (
          <nav className="hidden items-center gap-2 lg:gap-3 md:flex">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLearnOpen(!isLearnOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsLearnOpen(false);
                }}
                aria-haspopup="true"
                aria-expanded={isLearnOpen}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Learn <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLearnOpen ? "rotate-180" : ""}`} />
              </button>

              {isLearnOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xl animate-fade-in">
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
              let isActive = pathname === item.href;
              if (item.name === "Courses") {
                isActive = pathname.startsWith("/courses") || pathname.startsWith("/lessons");
              } else if (item.name === "Dashboard") {
                isActive = pathname === "/dashboard";
              } else if (item.name === "Deploy" && pathname.startsWith("/learn/deployment")) {
                isActive = true;
              }
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
        )}

        <div className="hidden items-center gap-4 md:flex">
          {!loading && (
            <>
              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white pl-2 pr-3 py-1.5 text-sm font-semibold text-slate-750 hover:bg-slate-50 hover:text-slate-950 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-650 flex items-center justify-center shrink-0 shadow-sm">
                      <User className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="max-w-[100px] truncate text-slate-800">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in z-50">
                      {/* User Info Header */}
                      <div className="px-2.5 py-2 border-b border-slate-100 mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Signed In As</p>
                        <p className="text-sm font-black text-slate-800 mt-1 truncate">{user.name}</p>
                        {user.email && (
                          <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                        )}
                      </div>

                      {/* Menu Links */}
                      <div className="space-y-0.5">
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/progress"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition"
                        >
                          My Progress
                        </Link>
                      </div>

                      {/* Logout Divider */}
                      <div className="border-t border-slate-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-bold text-red-650 hover:bg-red-50 hover:text-red-750 transition cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="text-sm font-medium text-slate-600 hover:text-slate-950 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenus}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    Register <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </>
          )}
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
          {user && (
            <>
              <div className="space-y-1.5">
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Start here
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
                  Build & review
                </p>
                {mainNavItems.map((item) => {
                  let isActive = pathname === item.href;
                  if (item.name === "Courses") {
                    isActive = pathname.startsWith("/courses") || pathname.startsWith("/lessons");
                  } else if (item.name === "Dashboard") {
                    isActive = pathname === "/dashboard";
                  } else if (item.name === "Deploy" && pathname.startsWith("/learn/deployment")) {
                    isActive = true;
                  }
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
            </>
          )}

          <div className="px-3 pt-2 border-t border-slate-100 mt-3">
            {!loading && (
              <div className="flex flex-col gap-2">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        closeMenus();
                        logout();
                      }}
                      className="flex w-full items-center justify-center rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMenus}
                      className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={closeMenus}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Register <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
