"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { LessonOutlineItem } from "@/lib/lesson-outline";

interface LessonOutlineNavProps {
  lessonTitle: string;
  progressText: string;
  sections: LessonOutlineItem[];
  onDesktopCollapsedChange?: (collapsed: boolean) => void;
}

export function LessonOutlineNav({
  lessonTitle,
  progressText,
  sections,
  onDesktopCollapsedChange,
}: LessonOutlineNavProps) {
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[0]?.id ?? "",
  );
  const navItemRefs = useRef(new Map<string, HTMLButtonElement>());
  const desktopNavScrollRef = useRef<HTMLDivElement>(null);
  const mobileNavScrollRef = useRef<HTMLDivElement>(null);
  const pendingSectionIdRef = useRef<string | null>(null);
  const pendingSectionTimerRef = useRef<number | null>(null);

  const sectionCountText = useMemo(() => {
    if (sections.length === 1) {
      return "1 section";
    }

    return `${sections.length} sections`;
  }, [sections.length]);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(
      "CodeNivra-lesson-outline-collapsed",
    );

    if (storedValue !== null) {
      window.requestAnimationFrame(() => {
        setDesktopCollapsed(storedValue === "true");
      });
    }
  }, []);

  useEffect(() => {
    onDesktopCollapsedChange?.(desktopCollapsed);
  }, [desktopCollapsed, onDesktopCollapsedChange]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (pendingSectionTimerRef.current !== null) {
        window.clearTimeout(pendingSectionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const pendingSectionId = pendingSectionIdRef.current;

        if (pendingSectionId) {
          const pendingTarget = document.getElementById(pendingSectionId);

          if (pendingTarget) {
            const distanceFromTop = Math.abs(
              pendingTarget.getBoundingClientRect().top - 112,
            );

            if (distanceFromTop <= 36) {
              pendingSectionIdRef.current = null;
            } else {
              return;
            }
          } else {
            pendingSectionIdRef.current = null;
          }
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              right.intersectionRatio - left.intersectionRatio ||
              left.boundingClientRect.top - right.boundingClientRect.top,
          );

        if (visibleEntries[0]?.target.id) {
          setActiveSectionId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!activeSectionId) {
      return;
    }

    const activeItem = navItemRefs.current.get(activeSectionId);

    if (!activeItem) {
      return;
    }

    const scrollContainers = [
      desktopNavScrollRef.current,
      mobileOpen ? mobileNavScrollRef.current : null,
    ].filter((container): container is HTMLDivElement => Boolean(container));

    scrollContainers.forEach((container) => {
      const itemTop = activeItem.offsetTop;
      const itemBottom = itemTop + activeItem.offsetHeight;
      const visibleTop = container.scrollTop;
      const visibleBottom = visibleTop + container.clientHeight;

      if (itemTop < visibleTop) {
        container.scrollTo({
          top: Math.max(itemTop - 12, 0),
          behavior: "smooth",
        });
        return;
      }

      if (itemBottom > visibleBottom) {
        container.scrollTo({
          top: itemBottom - container.clientHeight + 12,
          behavior: "smooth",
        });
      }
    });
  }, [activeSectionId, mobileOpen]);

  const toggleDesktopCollapsed = () => {
    setDesktopCollapsed((current) => {
      const nextValue = !current;
      window.localStorage.setItem(
        "CodeNivra-lesson-outline-collapsed",
        String(nextValue),
      );
      return nextValue;
    });
  };

  const getSectionTarget = useCallback((sectionId: string) => {
    return document.getElementById(sectionId);
  }, []);

  const scrollToSection = useCallback((
    sectionId: string,
    updateHash = true,
  ) => {
    const target = getSectionTarget(sectionId);

    if (!target) {
      return;
    }

    pendingSectionIdRef.current = sectionId;
    if (pendingSectionTimerRef.current !== null) {
      window.clearTimeout(pendingSectionTimerRef.current);
    }
    pendingSectionTimerRef.current = window.setTimeout(() => {
      pendingSectionIdRef.current = null;
      pendingSectionTimerRef.current = null;
    }, 1200);

    setActiveSectionId(sectionId);
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (updateHash) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }

    setMobileOpen(false);
  }, [getSectionTarget]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");

    if (!hash) {
      return;
    }

    const runScroll = () => {
      if (getSectionTarget(hash)) {
        scrollToSection(hash, false);
      }
    };

    const firstFrame = window.requestAnimationFrame(() => {
      runScroll();
      window.setTimeout(runScroll, 120);
    });

    return () => window.cancelAnimationFrame(firstFrame);
  }, [getSectionTarget, scrollToSection, sections]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");

      if (hash) {
        scrollToSection(hash, false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToSection, sections]);

  return (
    <>
      <div className="mb-4 sticky top-20 z-20 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-4 text-sm font-semibold text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Menu className="h-4 w-4" />
          <span>Lesson Menu</span>
        </button>
      </div>

      <aside
        className={`hidden lg:block lg:shrink-0 ${
          desktopCollapsed ? "lg:w-0" : "lg:w-80"
        }`}
      >
        <div
          className={`sticky top-24 ${
            desktopCollapsed
              ? "w-0 overflow-visible border-0 bg-transparent shadow-none"
              : "overflow-visible rounded-[24px] border border-slate-200/80 bg-white/95 shadow-[0_14px_36px_rgba(15,23,42,0.05)] backdrop-blur-sm"
          }`}
        >
          <div
            className={`${
              desktopCollapsed
                ? "absolute left-0 top-3 -translate-x-1/2 border-0 p-0"
                : "border-b border-slate-100 px-4 py-4"
            }`}
          >
            {desktopCollapsed ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={toggleDesktopCollapsed}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="Expand lesson outline"
                  aria-expanded={false}
                  title="Expand lesson outline"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Lesson Outline
                  </p>
                  <h2 className="mt-2 line-clamp-2 text-base font-semibold text-slate-950">
                    {lessonTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {progressText}
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    {sectionCountText}
                  </p>
                </div>

                <button
                  onClick={toggleDesktopCollapsed}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="Collapse lesson outline"
                  aria-expanded={true}
                  title="Collapse lesson outline"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div
            ref={desktopNavScrollRef}
            className={`${
              desktopCollapsed
                ? "hidden"
                : "pl-3 pr-2 py-3"
            }`}
          >
            <nav aria-label="Lesson outline" className="space-y-1">
              {desktopCollapsed
                ? null
                : sections.map((section, index) => {
                const isActive = activeSectionId === section.id;

                return (
                  <button
                    type="button"
                    key={section.id}
                    ref={(node) => {
                      if (node) {
                        navItemRefs.current.set(section.id, node);
                      } else {
                        navItemRefs.current.delete(section.id);
                      }
                    }}
                    onClick={() => scrollToSection(section.id)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isActive
                        ? "bg-slate-950 text-white shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-white/12 text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-800"
                      }`}
                    >
                      <span className="text-xs font-semibold leading-none">
                        {index + 1}
                      </span>
                    </span>
                    <span
                      className={`min-w-0 flex-1 ${
                        section.level === 3 ? "pl-3 text-sm" : "text-sm font-medium"
                      }`}
                    >
                      {section.title}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition ${
                        isActive ? "text-white" : "text-slate-300 group-hover:text-slate-500"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {mobileOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-[28px] border-t border-slate-200 bg-white shadow-[0_-20px_50px_rgba(15,23,42,0.14)] lg:hidden">
            <div className="mx-auto flex max-h-[82vh] max-w-3xl flex-col bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Lesson Menu
                  </p>
                  <h2 className="mt-2 text-base font-semibold text-slate-950">
                    {lessonTitle}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {progressText}
                  </p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="Close lesson menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={mobileNavScrollRef}
                className="min-h-0 flex-1 overflow-y-auto pr-1 pb-4"
              >
                <nav aria-label="Mobile lesson outline" className="space-y-1">
                  {sections.map((section, index) => {
                    const isActive = activeSectionId === section.id;

                    return (
                      <button
                        type="button"
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                          isActive
                            ? "bg-slate-950 text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            isActive
                              ? "bg-white/12 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span className="text-xs font-semibold leading-none">
                            {index + 1}
                          </span>
                        </span>
                        <span
                          className={`flex-1 ${
                            section.level === 3 ? "pl-3 text-sm" : "text-sm font-medium"
                          }`}
                        >
                          {section.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
