'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteSpinner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    const startTimer = window.setTimeout(() => {
      setVisible(true);
    }, 0);

    timerRef.current = window.setTimeout(() => {
      setVisible(false);
      timerRef.current = null;
    }, 450);

    return () => {
      window.clearTimeout(startTimer);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Loading page content"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          aria-hidden="true"
          className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
        />
        <span className="sr-only">Loading page content</span>
      </div>
    </div>
  );
}
