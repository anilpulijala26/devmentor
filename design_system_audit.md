# Design System Audit & UI/UX Guidelines - CodeNivra

This document defines the unified UI/UX guidelines and design system specifications developed during the CodeNivra platform audit and polish. It outlines styling protocols, accessibility benchmarks, card layout structures, and fixes implemented to achieve a professional, MNC-grade user experience.

---

## 1. Typography Rules

A structured, professional typography scale has been established globally to ensure hierarchy, scanning clarity, and reading comfort.

*   **Page Hero Headings**: `text-4xl sm:text-5xl md:text-6xl font-black` (or `font-extrabold` for elegant style) with `tracking-tight` and custom gradient backgrounds. Used exclusively on main landing/overview headers.
*   **Section Headings**: `text-2xl sm:text-3xl font-extrabold text-slate-900` with `tracking-tight`.
*   **Card Titles**: `text-lg sm:text-xl font-bold text-slate-900`.
*   **Body Paragraphs**: `text-sm sm:text-base text-slate-655 dark:text-slate-300` with a line-height of `1.75` (`leading-relaxed`) to prevent crowding.
*   **Metadata / Captions**: `text-xs sm:text-sm font-semibold text-slate-500` or `text-[10px] font-extrabold uppercase tracking-widest`.
*   **Code Blocks**: Monospace font (`font-mono`) scaled at `text-xs sm:text-sm` with custom padding (`p-4`) and responsive horizontal scroll bounds (`overflow-x-auto`).

---

## 2. Spacing Rules

CodeNivra avoids crowded components and dead spaces by sticking to a standardized layout grid:

*   **Layout Containment**: All main route views reside in a standard container with `max-w-6xl mx-auto px-6`.
*   **Page Container Paddings**: Top padding defaults to `py-10` or `py-12`, with bottom padding of `pb-20` or `pb-24`.
*   **Card Padding System**: Dense list cards default to `p-5`, while detail/editorial containers use `p-6` or `p-8` to enforce generous breathing room.
*   **Grid Layout Gaps**: Grid elements use `gap-6` for tasks/blueprints lists and `gap-8` for track dashboard grids.
*   **Inner Card Margins**: Spacing between card title elements and descriptions defaults to `space-y-4` or `space-y-5`.
*   **Action Separation**: CTA buttons and navigation anchors default to `mt-6` or `mt-8` with custom top borders (`border-t border-slate-100`) to decouple controls from description text.

---

## 3. Card Rules

Cards represent the core container elements of the self-guided timeline. They conform to the following specifications:

*   **Borders & Radius**: `rounded-3xl` with a subtle slate border (`border border-slate-200`).
*   **Visual Shadows**: Very soft base shadow (`shadow-sm`) designed to feel premium.
*   **Hover Lift Interactions**: Small translate lift combined with slightly deeper shadow offsets and border definition:
*   `hover:shadow-md hover:-translate-y-0.5 hover:border-slate-350 transition-all duration-200 ease-out`
*   **Card Accessibility**: Cards containing internal focus points must support focus rings:
    *   `focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2`
*   **Content Consistency**: No content or CTA buttons may be hidden by default or depend entirely on hover triggers.

---

## 4. Button Rules

CodeNivra utilizes clear button shapes and highly legible contrasting text weights:

*   **Primary Button**: Standard solid buttons:
    *   `bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold py-2.5 px-5 rounded-2xl transition`
*   **Secondary Button**: Contrast outline buttons:
    *   `bg-slate-100 hover:bg-slate-200 text-slate-705 font-bold px-4 py-2.5 rounded-xl text-xs transition`
*   **Focus State Requirements**: All interactive button controls must implement a standard visible focus outline ring when navigated via keyboard loops:
    *   `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`
*   **Contrast Safeguards**: Pure white buttons on white cards must have a clear border (`border border-slate-200`) and a dark font color (`text-slate-700`) to guarantee contrast ratios of 4.5:1.

---

## 5. Motion Rules

All transitions use ease-out timings to feel fast and lightweight:

*   **Standard Hover Timing**: Durations default to `duration-205` or `duration-300` using `ease-out`.
*   **No Flashy Animation**: Standard scale adjustments default to a max increment of `1.01`, avoiding distracting layout shifts or bounces.
*   **Reduced Motion Support**: Layouts honor client preference overrides using standard Tailwind directives:
    *   `motion-safe:hover:scale-[1.01] motion-reduce:transform-none`

---

## 6. Accessibility (A11y) Rules

CodeNivra prioritizes accessibility to enable self-guided learning for users of assistive technologies:

*   **Keyboard Navigation**: Every primary control is reachable by `Tab` key routing, utilizing clear focus rings.
*   **Semantics & Landmarks**: Section panels use appropriate tags (`<main>`, `<nav>`, `<aside>`, `<section>`, `<article>`).
*   **ARIA attributes**: Tab structures implement proper `aria-pressed` or `aria-selected` toggles.
*   **Touch Targets**: Small button tags have minimum interactive areas of `44px` height and width.

---

## 7. Screenshot Issue Fixed

*   **The Issue**: Task cards on `/tasks` had invisible action borders and transparent buttons due to using non-standard Tailwind colors (`bg-indigo-650`, `text-indigo-650`, `border-blue-150`, `border-slate-205`, etc.). This caused buttons to appear as blank white pills on white cards, appearing only on hover because of secondary layout highlights.
*   **The Fix**: Cleaned up all non-standard color weights across 16 files, standardizing them to standard Tailwind weights (e.g. `bg-indigo-600`, `border-indigo-200`, `text-slate-600`).
*   **Task Card Restructuring**: Restructured the Daily Task card in `components/TasksClient.tsx` to follow a strict 3-tier layout:
    1.  **Top**: Difficulty Badge (e.g., "Intermediate") + "DAILY CHALLENGE" uppercase type label.
    2.  **Middle**: Task title + 3-line description with `line-clamp-3` + dynamic tech stack pills (e.g., `["React", "State", "Forms"]`).
    3.  **Bottom**: Metadata line showing estimated completion time + "Start Task" primary CTA button, always visible and keyboard focusable.

---

## 8. Remaining Recommendations

1.  **High-Contrast Theming**: Expand dark/light mode configurations to cover lesson pages and sidebar directory highlights.
2.  **Breadcrumb Trails**: Add consistent subpage breadcrumbs on deep route endpoints to assist navigation hierarchies.
3.  **Automated Web Vitals CI**: Integrate automated Lighthouse audits within the deployment pipeline to prevent performance regressions.
