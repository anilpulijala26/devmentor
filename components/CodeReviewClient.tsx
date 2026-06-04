"use client";

import { useEffect, useMemo, useState } from "react";
import { HowItWorks } from "./review/HowItWorks";
import { ReviewActions } from "./review/ReviewActions";
import { ReviewCategoryAccordion } from "./review/ReviewCategoryAccordion";
import { ReviewConfirmDialog } from "./review/ReviewConfirmDialog";
import { ReviewHero } from "./review/ReviewHero";
import { ReviewStats } from "./review/ReviewStats";
import { ReviewToast } from "./review/ReviewToast";
import { getReadiness } from "./review/ReadinessBadge";
import { REVIEW_CATEGORIES, TOTAL_REVIEW_CHECKS } from "./review/review-data";

const STORAGE_KEY = "CodeNivra-senior-code-review-audit";

export function CodeReviewClient() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {};
    }

    try {
      return JSON.parse(saved);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [REVIEW_CATEGORIES[0].id]: true,
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "info" } | null>(
    null,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedState));
  }, [checkedState]);

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const totalChecked = useMemo(
    () => Object.values(checkedState).filter(Boolean).length,
    [checkedState],
  );

  const progressPercent = TOTAL_REVIEW_CHECKS
    ? Math.round((totalChecked / TOTAL_REVIEW_CHECKS) * 100)
    : 0;

  const categoryProgress = useMemo(() => {
    return REVIEW_CATEGORIES.map((category) => {
      const completedCount = category.items.reduce((count, _item, index) => {
        return count + (checkedState[`${category.id}-${index}`] ? 1 : 0);
      }, 0);

      return {
        ...category,
        completedCount,
      };
    });
  }, [checkedState]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const key = `${categoryId}-${itemIndex}`;
    setCheckedState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetConsole = () => {
    setShowResetConfirm(true);
  };

  const confirmResetConsole = () => {
    setCheckedState({});
    localStorage.removeItem(STORAGE_KEY);
    setShowResetConfirm(false);
    setToast({ message: "Review console reset successfully.", tone: "info" });
  };

  const exportSummary = async () => {
    const pendingChecks: string[] = [];
    const categoriesNeedingWork: string[] = [];

    categoryProgress.forEach((category) => {
      if (category.completedCount < category.items.length) {
        categoriesNeedingWork.push(
          `${category.title} (${category.completedCount}/${category.items.length})`,
        );
      }

      category.items.forEach((item, index) => {
        if (!checkedState[`${category.id}-${index}`]) {
          pendingChecks.push(`[${category.title}] ${item}`);
        }
      });
    });

    const readiness = getReadiness(progressPercent);
    const summary = [
      "# CodeNivra Review Summary",
      "",
      `Overall progress: ${progressPercent}%`,
      `Completed checks: ${totalChecked}/${TOTAL_REVIEW_CHECKS}`,
      `Pending checks: ${TOTAL_REVIEW_CHECKS - totalChecked}`,
      `Readiness status: ${readiness.label}`,
      "",
      `Categories needing work: ${categoriesNeedingWork.length ? categoriesNeedingWork.join(", ") : "None"}`,
      "",
      "Pending checks:",
      ...(pendingChecks.length ? pendingChecks.map((item) => `- ${item}`) : ["- None"]),
    ].join("\n");

    await navigator.clipboard.writeText(summary);
    setToast({ message: "Review summary copied to clipboard.", tone: "success" });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <ReviewHero />
        <div className="shrink-0">
          <ReviewActions onExport={exportSummary} onReset={resetConsole} />
        </div>
      </div>

      <HowItWorks />

      <ReviewStats
        progress={progressPercent}
        totalChecked={totalChecked}
        totalItems={TOTAL_REVIEW_CHECKS}
        totalCategories={REVIEW_CATEGORIES.length}
      />

      <div className="space-y-4">
        {categoryProgress.map((category, index) => (
          <ReviewCategoryAccordion
            key={category.id}
            category={category}
            categoryNumber={index + 1}
            completedCount={category.completedCount}
            expanded={!!expandedCategories[category.id]}
            onToggle={() => toggleCategory(category.id)}
            onToggleItem={(itemIndex) => toggleItem(category.id, itemIndex)}
            checkedState={checkedState}
          />
        ))}
      </div>

      <ReviewConfirmDialog
        open={showResetConfirm}
        title="Reset review console?"
        description="This will clear all completed review checks and start the audit from scratch."
        confirmLabel="Reset Console"
        onConfirm={confirmResetConsole}
        onCancel={() => setShowResetConfirm(false)}
      />

      {toast ? <ReviewToast message={toast.message} tone={toast.tone} /> : null}
    </div>
  );
}
