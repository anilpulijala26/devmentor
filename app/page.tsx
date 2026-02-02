import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Sparkles,
  ShieldCheck,
  Boxes,
  Rocket,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Full Width Colorful Banner */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Master Web Development from a Senior
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Learn to Build Production Web Applications
            </h1>

            <p className="text-xl text-indigo-100 mb-8 leading-relaxed max-w-2xl">
              Master modern web development from a senior engineer. Real-world
              guidance, practical examples, and production-ready patterns.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition shadow-lg hover:shadow-xl"
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/learn"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Browse Tracks
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Tracks</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">3</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Layers className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-600">Modules</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">11+</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Lessons</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">20+</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Concepts Banner */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                  Get Started with Core Concepts
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Know These Before You Code
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["HTML", "CSS", "JavaScript", "TypeScript", "React"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white border border-white/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Concepts Grid */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Core Concepts You Should Know
            </h2>
            <p className="text-lg text-slate-600">
              Master the foundations of modern web development
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 shadow-md transition hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
                <Code2 className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                HTML Semantics
              </h3>
            </div>
            <p className="text-slate-700">
              Structure your pages with meaning for accessibility and SEO.
            </p>
          </div>

          <div className="group rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 shadow-md transition hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                <Layers className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                CSS Layout Systems
              </h3>
            </div>
            <p className="text-slate-700">
              Master Flexbox and Grid to build responsive layouts fast.
            </p>
          </div>

          <div className="group rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100/50 p-6 shadow-md transition hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white">
                <Boxes className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                JavaScript Fundamentals
              </h3>
            </div>
            <p className="text-slate-700">
              Understand data, functions, and async to power interactivity.
            </p>
          </div>

          <div className="group rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100/50 p-6 shadow-md transition hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                TypeScript Safety
              </h3>
            </div>
            <p className="text-slate-700">
              Add types to reduce bugs and refactor with confidence.
            </p>
          </div>

          <div className="group rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 p-6 shadow-md transition hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                <Rocket className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                React Thinking
              </h3>
            </div>
            <p className="text-slate-700">
              Compose UIs with components, props, and state.
            </p>
          </div>

          <div className="group rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 shadow-md transition hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                Production Mindset
              </h3>
            </div>
            <p className="text-slate-700">
              Build maintainable apps with clean patterns and checks.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Visuals */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                HTML Structure
              </h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Beginner
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <rect
                  x="8"
                  y="8"
                  width="124"
                  height="16"
                  rx="6"
                  className="fill-indigo-100"
                />
                <rect
                  x="16"
                  y="32"
                  width="108"
                  height="16"
                  rx="6"
                  className="fill-slate-200"
                />
                <rect
                  x="24"
                  y="56"
                  width="92"
                  height="16"
                  rx="6"
                  className="fill-indigo-200"
                />
                <circle
                  cx="20"
                  cy="16"
                  r="3"
                  className="fill-indigo-500 animate-pulse"
                />
                <circle
                  cx="28"
                  cy="40"
                  r="3"
                  className="fill-indigo-500 animate-pulse"
                />
                <circle
                  cx="36"
                  cy="64"
                  r="3"
                  className="fill-indigo-500 animate-pulse"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Think of HTML as stacked blocks that define the page structure.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">CSS Layout</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Flexbox
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <rect
                  x="10"
                  y="18"
                  width="120"
                  height="44"
                  rx="10"
                  className="fill-slate-200"
                />
                <rect
                  x="22"
                  y="28"
                  width="26"
                  height="24"
                  rx="6"
                  className="fill-indigo-200"
                />
                <rect
                  x="57"
                  y="28"
                  width="26"
                  height="24"
                  rx="6"
                  className="fill-indigo-300"
                />
                <rect
                  x="92"
                  y="28"
                  width="26"
                  height="24"
                  rx="6"
                  className="fill-indigo-200"
                />
                <path
                  d="M22 20c10-8 24-8 34 0"
                  className="stroke-indigo-500"
                  strokeWidth="2"
                  fill="none"
                >
                  <animate
                    attributeName="d"
                    dur="2.2s"
                    repeatCount="indefinite"
                    values="M22 20c10-8 24-8 34 0; M22 20c10 8 24 8 34 0; M22 20c10-8 24-8 34 0"
                  />
                </path>
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Flexbox aligns items in rows or columns with predictable spacing.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                JavaScript Flow
              </h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Async
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <circle cx="24" cy="40" r="10" className="fill-indigo-200" />
                <circle cx="70" cy="40" r="10" className="fill-indigo-300" />
                <circle cx="116" cy="40" r="10" className="fill-indigo-200" />
                <path d="M34 40h26" className="stroke-indigo-500" strokeWidth="2" />
                <path d="M80 40h26" className="stroke-indigo-500" strokeWidth="2" />
                <circle cx="24" cy="40" r="4" className="fill-indigo-600">
                  <animate
                    attributeName="cx"
                    dur="2.4s"
                    repeatCount="indefinite"
                    values="24;70;116;24"
                  />
                </circle>
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Async tasks move through steps without blocking the UI.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Concept Visuals */}
      <div className="max-w-6xl mx-auto px-4 py-16 border-b border-slate-200/50">
        <h3 className="text-2xl font-bold mb-8 text-slate-900">
          How Web Apps Work
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* The DOM */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">The DOM</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Tree
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <circle cx="70" cy="10" r="7" className="fill-indigo-600" />
                <line x1="70" y1="17" x2="42" y2="32" className="stroke-indigo-300" strokeWidth="2" />
                <line x1="70" y1="17" x2="70" y2="32" className="stroke-indigo-300" strokeWidth="2" />
                <line x1="70" y1="17" x2="98" y2="32" className="stroke-indigo-300" strokeWidth="2" />
                <circle cx="42" cy="38" r="6" className="fill-indigo-400" />
                <circle cx="70" cy="38" r="6" className="fill-indigo-400" />
                <circle cx="98" cy="38" r="6" className="fill-indigo-400" />
                <line x1="42" y1="44" x2="28" y2="56" className="stroke-indigo-300" strokeWidth="1.5" />
                <line x1="42" y1="44" x2="56" y2="56" className="stroke-indigo-300" strokeWidth="1.5" />
                <circle cx="28" cy="60" r="4" className="fill-indigo-300" />
                <circle cx="56" cy="60" r="4" className="fill-indigo-300" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              The DOM is a tree of HTML elements that browsers render and JavaScript controls.
            </p>
          </div>

          {/* Events */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Events</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Listener
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <rect
                  x="20"
                  y="20"
                  width="100"
                  height="40"
                  rx="8"
                  className="fill-indigo-100 stroke-indigo-300"
                  strokeWidth="2"
                />
                {/* Note: plain SVG text; className won't apply tailwind typography here unless you style via CSS */}
                <text x="70" y="48" textAnchor="middle" fill="#4338CA" fontSize="12" fontWeight="700">
                  Click Me
                </text>
                <circle cx="70" cy="20" r="5" className="fill-indigo-500">
                  <animate attributeName="r" dur="1.2s" repeatCount="indefinite" values="5;8;5" />
                </circle>
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Events trigger code when users click, type, hover, or scroll.
            </p>
          </div>

          {/* Components */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Components</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                React
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <rect x="15" y="15" width="28" height="28" rx="4" className="fill-indigo-200" />
                <rect x="56" y="15" width="28" height="28" rx="4" className="fill-indigo-300" />
                <rect x="97" y="15" width="28" height="28" rx="4" className="fill-indigo-200" />
                <path d="M28 43L40 55" className="stroke-indigo-400" strokeWidth="2" />
                <path d="M70 43L70 55" className="stroke-indigo-400" strokeWidth="2" />
                <path d="M112 43L100 55" className="stroke-indigo-400" strokeWidth="2" />
                <circle cx="28" cy="62" r="5" className="fill-indigo-300" />
                <circle cx="70" cy="62" r="5" className="fill-indigo-400" />
                <circle cx="112" cy="62" r="5" className="fill-indigo-300" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Reusable UI pieces that manage their own state and logic.
            </p>
          </div>

          {/* State Management */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">State Management</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Data
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <rect x="30" y="25" width="80" height="30" rx="8" className="fill-indigo-100 stroke-indigo-300" strokeWidth="2" />
                <circle cx="50" cy="40" r="6" className="fill-indigo-500" />
                <circle cx="70" cy="40" r="6" className="fill-indigo-600" />
                <circle cx="90" cy="40" r="6" className="fill-indigo-500" />
                <path d="M50 32v4m20 0v4m20 0v4" className="stroke-indigo-600" strokeWidth="1" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Data that changes triggers re-renders to keep the UI in sync.
            </p>
          </div>

          {/* Request/Response */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Request/Response</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                HTTP
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <rect x="10" y="28" width="45" height="24" rx="6" className="fill-indigo-300" />
                <text x="32" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
                  Client
                </text>
                <rect x="85" y="28" width="45" height="24" rx="6" className="fill-indigo-600" />
                <text x="107" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
                  Server
                </text>
                <path d="M55 36L75 36" className="stroke-indigo-500 fill-none" strokeWidth="2" />
                <path d="M75 44L55 44" className="stroke-indigo-400 fill-none" strokeWidth="2" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Apps talk to servers to fetch and send data over the network.
            </p>
          </div>

          {/* TypeScript Safety */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">TypeScript Safety</h3>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                Types
              </span>
            </div>
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                <circle cx="35" cy="32" r="12" className="fill-slate-300" />
                <circle cx="105" cy="32" r="12" className="fill-indigo-400" />
                <text x="35" y="38" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="800">
                  ?
                </text>
                <text x="105" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">
                  ✓
                </text>
                <path d="M47 32L93 32" className="stroke-indigo-500 fill-none" strokeWidth="2" />
                <text x="70" y="65" textAnchor="middle" fill="#4F46E5" fontSize="12" fontWeight="600">
                  No more type errors
                </text>
              </svg>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Types prevent bugs and make refactoring safe and fast.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/50">
        <h2 className="text-3xl font-bold mb-12 text-slate-900">Why Learn Here?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-indigo-100 rounded-2xl p-8 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm transition hover:shadow-md">
            <BookOpen className="w-8 h-8 text-indigo-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Production-Ready Content
            </h3>
            <p className="text-slate-600">
              Not toy examples. Real patterns used in production applications by
              thousands of engineers.
            </p>
          </div>

          <div className="border border-indigo-100 rounded-2xl p-8 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm transition hover:shadow-md">
            <BookOpen className="w-8 h-8 text-indigo-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Senior Guidance
            </h3>
            <p className="text-slate-600">
              Learn from someone with 10+ years building products at scale.
              Avoid common pitfalls and mistakes.
            </p>
          </div>

          <div className="border border-indigo-100 rounded-2xl p-8 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm transition hover:shadow-md">
            <BookOpen className="w-8 h-8 text-indigo-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Full-Stack Coverage
            </h3>
            <p className="text-slate-600">
              From HTML fundamentals through TypeScript, React, Next.js, and
              full-stack applications.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-600">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Level Up?
            </h2>
            <p className="text-lg text-indigo-100 mb-8">
              Choose a learning track below and start mastering web development.
            </p>

            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition text-lg"
            >
              Explore All Tracks <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}