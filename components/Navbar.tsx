"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(pathname);
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = user
    ? [
        { name: "Dashboard", href: "/dashboard", match: ["/dashboard"] },
        { name: "Learn", href: "/courses", match: ["/courses", "/lessons", "/learn"] },
        { name: "Practice", href: "/tasks", match: ["/tasks", "/challenges"] },
        { name: "Projects", href: "/projects", match: ["/projects"] },
        { name: "Interview", href: "/interview", match: ["/interview"] },
        { name: "Progress", href: "/progress", match: ["/progress"] },
      ]
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenus = () => {
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/92 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#1E1B4B] focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
        >
          Skip to content
        </a>

        <Link href="/" onClick={closeMenus} className="inline-flex items-center rounded-lg px-1 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
          <Image src="/logo.png" alt="CodeNivra" width={182} height={40} className="h-10 w-auto" priority />
        </Link>

        {user ? (
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = item.match.some((prefix) => pathname.startsWith(prefix));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenus}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                    isActive ? "bg-indigo-50 text-[#4F46E5]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        ) : null}

        <div className="hidden items-center gap-4 md:flex">
          {!loading && (
            <>
              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white pl-2 pr-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-slate-200 text-[#4F46E5] flex items-center justify-center shrink-0 shadow-sm">
                      <User className="w-4 h-4 text-[#4F46E5]" />
                    </div>
                    <span className="max-w-[100px] truncate text-slate-800">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isProfileOpen ? (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                      <div className="px-2.5 py-2 border-b border-slate-100 mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Signed In As</p>
                        <p className="text-sm font-black text-slate-800 mt-1 truncate">{user.name}</p>
                        {user.email ? <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p> : null}
                      </div>

                      <div className="space-y-0.5">
                        <Link href="/profile" onClick={closeMenus} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition">
                          Profile
                        </Link>
                        <Link href="/progress" onClick={closeMenus} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition">
                          Progress
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            closeMenus();
                            logout();
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-bold text-[#DC2626] hover:bg-red-50 transition cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenus} className="text-sm font-medium text-slate-600 hover:text-slate-950 transition">
                    Login
                  </Link>
                  <Link href="/register" onClick={closeMenus} className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                    Register <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {!loading && (
            user ? (
              <Link
                href="/profile"
                onClick={closeMenus}
                aria-label="Open account details"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] border border-slate-200 shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div className="min-w-0 text-left leading-tight">
                  <span className="block max-w-[84px] truncate text-slate-900">{user.name}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Account</span>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeMenus}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
              >
                Login
              </Link>
            )
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer md:hidden"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="space-y-4 border-b border-slate-200 bg-white/95 px-4 pt-2 pb-6 backdrop-blur-md md:hidden">
          {!loading && user ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Signed in</p>
              <p className="mt-1 text-sm font-bold text-slate-900 truncate">{user.name}</p>
              {user.email ? <p className="mt-1 text-xs text-slate-500 truncate">{user.email}</p> : null}
            </div>
          ) : null}

          {user ? (
            <>
              <div className="space-y-1.5">
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Learning Menu</p>
                {navItems.map((item) => {
                  const isActive = item.match.some((prefix) => pathname.startsWith(prefix));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenus}
                      className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive ? "bg-indigo-50 text-[#4F46E5]" : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Account</p>
                <Link href="/profile" onClick={closeMenus} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition">
                  Profile
                </Link>
                <Link href="/progress" onClick={closeMenus} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition">
                  View Progress
                </Link>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
              <p className="text-sm font-bold text-slate-900">New to CodeNivra?</p>
              <p className="mt-1 text-sm text-slate-600">Create your account to start the daily guided learning path, or sign in if you already joined.</p>
            </div>
          )}

          <div className="px-3 pt-2 border-t border-slate-100 mt-3">
            {!loading && (
              <div className="flex flex-col gap-2">
                {user ? (
                  <button
                    onClick={() => {
                      closeMenus();
                      logout();
                    }}
                    className="flex w-full items-center justify-center rounded-xl bg-red-50 py-3 text-sm font-semibold text-[#DC2626] transition hover:bg-red-100 cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/register" onClick={closeMenus} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#4F46E5] py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA]">
                      Register <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/login" onClick={closeMenus} className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
