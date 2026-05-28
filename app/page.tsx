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
  ArrowUpRight,
  GitBranch,
  Terminal,
  Cpu,
  Workflow
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Premium Hero Section with Two-Column Grid & Glowing Backdrops */}
      <div className="relative w-full overflow-hidden bg-slate-950 py-20 lg:py-28 border-b border-slate-900">
        {/* Glow meshes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-pulse" />
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Details Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 px-4 py-2 rounded-full shadow-inner">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs md:text-sm font-semibold tracking-wide text-indigo-300">
                  Production-Ready Engineering Curriculum
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
                Bridge the Gap <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Between Code & Systems
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                For <strong className="text-indigo-400 font-semibold">Interns</strong>: Build and deploy full-stack production systems independently. <br />
                For <strong className="text-purple-400 font-semibold">Mid & Senior Developers</strong>: Master advanced system architecture, caching, and performance profiling.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2.5 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_4px_20px_0_rgba(79,70,229,0.3)]"
                >
                  Start Learning <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 border-2 border-slate-800 text-slate-300 px-8 py-4 rounded-2xl font-semibold hover:bg-white/5 hover:border-slate-700 transition-all duration-300"
                >
                  Browse Tracks
                </Link>
              </div>
            </div>

            {/* Interactive Pipeline Visualization (Right Column) */}
            <div className="lg:col-span-5 relative">
              {/* Glassmorphic Container Card */}
              <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                {/* Header tag */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-green-400 animate-ping" />
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">DevMentor-Pipeline // Active</span>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-500" />
                </div>

                {/* Trajectory pipeline stack */}
                <div className="space-y-6 relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-30" />

                  {/* Stage 1: Intern */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-900 group-hover:border-indigo-400 z-10">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">Intern / Junior</h4>
                        <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-500/20 px-2 py-0.5 rounded-full">Real-world Practice</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">
                        Ditch placeholder HTML/CSS. Build production environments with database pooling and rate limiting.
                      </p>
                    </div>
                  </div>

                  {/* Stage 2: Mid-Level */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-950 border border-purple-500/40 text-purple-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-900 group-hover:border-purple-400 z-10">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">Mid-Level Developer</h4>
                        <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/80 border border-purple-500/20 px-2 py-0.5 rounded-full">Modular Architecture</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">
                        Master React Fiber scheduling, parallel routes, and middleware security policies.
                      </p>
                    </div>
                  </div>

                  {/* Stage 3: Senior */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-950 border border-pink-500/40 text-pink-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-900 group-hover:border-pink-400 z-10">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">Senior Engineer</h4>
                        <span className="text-[10px] font-semibold text-pink-300 bg-pink-950/80 border border-pink-500/20 px-2 py-0.5 rounded-full">System Scaling</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">
                        Implement Nesting caching rules, multi-stage Docker builds, Sentry logging, and performance analysis.
                      </p>
                    </div>
                  </div>

                  {/* Stage 4: Staff/Lead */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-800 group-hover:border-emerald-400 z-10">
                      <GitBranch className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">System Architect</h4>
                        <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/20 px-2 py-0.5 rounded-full">Zero-Downtime</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">
                        Design expand-and-contract migrations, serverless pooling, and robust microservices boundaries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Glassmorphic accent background badge */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Interactive Curriculum Map</span>
                  <Link href="/learn" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    Explore Now <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Stats Banner with Elevated Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Learning Tracks</p>
                <p className="text-3xl font-black text-slate-900 mt-2">3 Dedicated</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">Active Modules</p>
                <p className="text-3xl font-black text-slate-900 mt-2">11 Core Areas</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-pink-600 uppercase tracking-widest">Interactive Lessons</p>
                <p className="text-3xl font-black text-slate-900 mt-2">25+ Deep Dives</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Concepts Sticky Banner */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-8 shadow-xl border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300/80">
                  Pre-requisites & Foundations
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Master the Fundamentals
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {["HTML5 & Accessibility", "Modern CSS Layouts", "Vanilla JavaScript ES6", "Strict TypeScript", "React Rendering"].map((item) => (
                <span
                  key={item}
                  className="rounded-xl bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-800/80 hover:bg-white/10 hover:border-slate-700/60 transition-all cursor-default"
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
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curriculum Core Pillars
          </h2>
          <p className="text-lg text-slate-600">
            A cohesive path engineered to transition developers from sandbox syntax to production deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Code2 className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                HTML Semantics & A11y
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Structure code with true accessibility (ARIA parameters) and layout shift mitigation strategies to satisfy modern SEO requirements.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Layers className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                CSS Grid & Custom Properties
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create responsive styling architectures with native nesting and containers, avoiding bulky Tailwind boilerplate for core grids.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all">
                <Boxes className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Event Loop & Memory
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Understand the Call Stack, microtasks vs macrotasks, and closures to prevent common rendering freezes and memory leak bottlenecks.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Strict Type-Safety
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Apply advanced generic bounds, discriminated unions, and mapped modifier properties to build reusable, resilient APIs.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                <Rocket className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                React Reconciliation & Fiber
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Learn the internal details of Fiber node trees, concurrent scheduling, state mutations, and optimization profiling metrics.
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Server Caching & Auth
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Implement Request Memoization, Data Caching layers, secure HTTPOnly JWT rotation, and Sentry pipeline error-reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Premium UI Mockups & Visual Micro-Animations */}
      <div className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Interactive Web Mechanics
            </h2>
            <p className="text-slate-400">
              Interactive diagrams used throughout the tracks help clarify complex, non-visual engine processes in single glance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Diagram Preview 1 */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-slate-700/80 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-200">HTML Layout Box Model</h3>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Structure</span>
              </div>
              <div className="h-32 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                  <rect x="8" y="8" width="124" height="64" rx="8" className="fill-slate-950 stroke-indigo-500/30" strokeWidth="1" />
                  <rect x="20" y="20" width="100" height="40" rx="6" className="fill-indigo-500/10 stroke-indigo-500/50" strokeWidth="1.5" />
                  <rect x="36" y="32" width="68" height="16" rx="4" className="fill-indigo-500/25 stroke-indigo-400" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="3" className="fill-indigo-400 animate-ping" />
                  <circle cx="120" cy="60" r="3" className="fill-pink-400 animate-ping" style={{ animationDelay: "1s" }} />
                </svg>
              </div>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                Visualizing content bounds, padding, border regions, and margins recursively to debug nested document layout problems.
              </p>
            </div>

            {/* Diagram Preview 2 */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-slate-700/80 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-200">Flexbox Alignment</h3>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">CSS Flex</span>
              </div>
              <div className="h-32 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                  <rect x="10" y="15" width="120" height="50" rx="8" className="fill-slate-950 stroke-purple-500/20" strokeWidth="1.5" />
                  <rect x="20" y="25" width="25" height="30" rx="4" className="fill-purple-500/10 stroke-purple-400" strokeWidth="1.5" />
                  <rect x="58" y="25" width="25" height="30" rx="4" className="fill-purple-500/20 stroke-purple-300" strokeWidth="1.5" />
                  <rect x="95" y="25" width="25" height="30" rx="4" className="fill-purple-500/10 stroke-purple-400" strokeWidth="1.5" />
                  <path d="M20 18h100" className="stroke-indigo-500/20" strokeDasharray="3 3" />
                  <path d="M20 62h100" className="stroke-indigo-500/20" strokeDasharray="3 3" />
                </svg>
              </div>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                Interactively testing distribution schemas (space-between, space-around) to layout interfaces with maximum alignment precision.
              </p>
            </div>

            {/* Diagram Preview 3 */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-slate-700/80 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-200">Asynchronous Loop</h3>
                <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Engine</span>
              </div>
              <div className="h-32 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                  <circle cx="70" cy="40" r="22" className="stroke-pink-500/30" strokeWidth="1.5" />
                  <circle cx="70" cy="40" r="14" className="stroke-pink-500/20" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="70" cy="18" r="4" className="fill-pink-500">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 70 40"
                      to="360 70 40"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="70" cy="26" r="3" className="fill-purple-400">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="360 70 40"
                      to="0 70 40"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                Illustrating event execution and frame-paint operations to diagnose stack frame bottlenecks and UI lags.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Material-based Value Propositions */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why DevMentor is Different
          </h2>
          <p className="text-lg text-slate-600">
            Engineered lessons written to simulate structural tasks faced by senior teams at technology firms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-slate-200/80 rounded-3xl p-8 bg-white shadow-xs hover:shadow-lg transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              No Sandbox Code
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We skip elementary tutorials. Every lesson builds on real architectural code, teaching rates, security structures, and zero-downtime deployment pipelines.
            </p>
          </div>

          <div className="border border-slate-200/80 rounded-3xl p-8 bg-white shadow-xs hover:shadow-lg transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Senior engineer Guidance
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Learn code design choices, file structures, Sentry log hooks, performance metrics, and caching layer boundaries directly from senior specialists.
            </p>
          </div>

          <div className="border border-slate-200/80 rounded-3xl p-8 bg-white shadow-xs hover:shadow-lg transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Full-Stack Coverage
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Move step-by-step from core HTML semantics and rendering properties up through TypeScript generic structures, Prisma migrations, and Docker configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Sleek CTA Section */}
      <div className="relative overflow-hidden bg-slate-950 py-24 border-t border-slate-900">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full filter blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Build at Production Level?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Select your learning track. Master vanilla foundations, front-end ecosystems, or high-performance back-ends.
          </p>

          <div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2.5 bg-white text-slate-950 px-8 py-4.5 rounded-2xl font-bold hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl"
            >
              Explore All Learning Tracks <ArrowRight className="w-5 h-5 text-indigo-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}