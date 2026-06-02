import Link from "next/link";
import {
  BookOpen,
  Layers,
  Cloud,
  Code2,
  ShieldCheck,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-805 antialiased font-sans pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Choose Your Starting Point */}
      <section className="py-20 sm:py-28 bg-slate-50/40 border-b border-slate-100/80 relative">
        {/* Soft background shape */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-3xs animate-pulse">
              Starting Point
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Choose Your Starting Point
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
              Launch a structured path tailored to your current experience and career goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Beginner / Fresher",
                desc: "Start learning from absolute scratch with core web structure, styles, and scripting fundamentals.",
                chips: ["HTML5 & CSS Grid", "JavaScript ES6+", "Git & GitHub"],
                href: "/roadmaps/intern-developer",
                btnText: "Start Beginner Path",
                cardClass: "border-t-4 border-t-blue-500 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)]",
                btnClass: "bg-blue-605 hover:bg-blue-700 shadow-blue-100",
                badge: "Tier 1"
              },
              {
                title: "Mid-Level Developer",
                desc: "Level up your application design by mastering state architectures, REST APIs, and databases.",
                chips: ["React & Next.js", "Node.js & Express", "SQL Databases"],
                href: "/roadmaps/mid-level-fullstack",
                btnText: "Start Mid-Level Path",
                cardClass: "border-t-4 border-t-violet-500 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(109,40,217,0.06)]",
                btnClass: "bg-violet-605 hover:bg-violet-700 shadow-violet-100",
                badge: "Tier 2"
              },
              {
                title: "Senior / Job-Ready",
                desc: "Master enterprise system scaling, automated packaging, Docker networks, and cloud architecture.",
                chips: ["Docker Containers", "CI/CD Actions", "AWS & Cloud Basics"],
                href: "/roadmaps/devops-ready-full-stack",
                btnText: "Start Senior Path",
                cardClass: "border-t-4 border-t-emerald-500 hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(5,150,105,0.06)]",
                btnClass: "bg-emerald-650 hover:bg-emerald-700 shadow-emerald-100",
                badge: "Tier 3"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500 ${card.cardClass}`}
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-slate-805 text-sm sm:text-base">{card.title}</h3>
                    <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-500 uppercase tracking-widest">
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    {card.desc}
                  </p>
                  
                  {/* Focus Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-slate-50 border border-slate-100/70 text-slate-505 px-2.5 py-1 rounded-lg text-[10px] font-extrabold"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={card.href}
                    className={`w-full inline-flex items-center justify-center gap-1.5 text-white text-xs font-extrabold py-3 px-4 rounded-xl transition duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500`}
                  >
                    <span className={`w-full text-center py-2.5 rounded-lg text-white font-extrabold text-xs transition duration-200 ${card.btnClass}`}>{card.btnText}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How CodeNivra Works */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100/85 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-3xs animate-pulse">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-905 tracking-tight">
              How CodeNivra Works
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
              A comprehensive structured loop built to transition your skills into production engineering.
            </p>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden lg:block relative py-6 max-w-6xl mx-auto">
            {/* Horizontal Line connector */}
            <div className="absolute top-[40px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100" />

            <div className="grid grid-cols-6 gap-4 relative z-10">
              {[
                { label: "Learn", desc: "Gain concepts through clear deep-dive modules.", icon: BookOpen },
                { label: "Practice", desc: "Solve bite-sized daily code challenges.", icon: Code2 },
                { label: "Build", desc: "Construct complete real-world workspaces.", icon: Layers },
                { label: "Review", desc: "Audit repositories via senior checklists.", icon: ShieldCheck },
                { label: "Deploy", desc: "Host apps live on cloud servers.", icon: Cloud },
                { label: "Explain", desc: "Answer architecture and system designs.", icon: MessageSquare }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="text-center space-y-4 group">
                    <div className="mx-auto w-14 h-14 rounded-full bg-white border-2 border-slate-205 flex items-center justify-center group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all duration-300 shadow-3xs group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                      <Icon className="w-5.5 h-5.5 text-slate-400 group-hover:text-white transition duration-300" aria-hidden="true" />
                    </div>
                    <div className="space-y-1 px-2">
                      <span className="block text-[8px] font-extrabold text-slate-400 tracking-wider">STAGE 0{idx + 1}</span>
                      <p className="text-sm font-black text-slate-805 group-hover:text-indigo-650 transition duration-205">{step.label}</p>
                      <p className="text-[11px] text-slate-400 font-semibold leading-normal">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical stepper */}
          <div className="lg:hidden relative pl-6 space-y-8 max-w-xs mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-[17px] top-2 bottom-6 w-0.5 bg-gradient-to-b from-indigo-100 to-indigo-200" />

            {[
              { label: "Learn", desc: "Gain concepts through clear deep-dive modules.", icon: BookOpen },
              { label: "Practice", desc: "Solve bite-sized daily code challenges.", icon: Code2 },
              { label: "Build", desc: "Construct complete real-world workspaces.", icon: Layers },
              { label: "Review", desc: "Audit repositories via senior checklists.", icon: ShieldCheck },
              { label: "Deploy", desc: "Host apps live on cloud servers.", icon: Cloud },
              { label: "Explain", desc: "Answer architecture and system designs.", icon: MessageSquare }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex gap-4 items-start relative z-10 group">
                  <div className="w-9 h-9 rounded-full bg-white border border-slate-205 flex items-center justify-center group-hover:border-transparent group-hover:bg-indigo-650 transition duration-300 shadow-3xs shrink-0 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition duration-300" aria-hidden="true" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Stage 0{idx + 1}</span>
                    <p className="text-xs font-black text-slate-805 group-hover:text-indigo-650 transition duration-200">{step.label}</p>
                    <p className="text-2xs text-slate-455 font-semibold leading-normal">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Tracks */}
      <section className="py-20 sm:py-28 bg-slate-50/40 border-b border-slate-100/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-3xs">
              Syllabus Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-905 tracking-tight">
              Featured Learning Tracks
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
              Unlock targeted modules from frontend components to cloud scale networks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Frontend Engineering",
                desc: "Master components layouts, React render cycles, and App Router parameters.",
                chips: ["React Hooks", "Next.js routing", "Tailwind CSS"],
                href: "/learn/frontend-frameworks",
                badgeColor: "bg-blue-50 border-blue-100 text-blue-700",
                hoverBorder: "hover:border-blue-300 hover:shadow-[0_15px_45px_rgba(37,99,235,0.04)]"
              },
              {
                title: "Backend Engineering",
                desc: "Architect secure Express REST APIs, transactional databases, and server networks.",
                chips: ["Node.js API", "PostgreSQL", "Prisma ORM"],
                href: "/learn/backend",
                badgeColor: "bg-emerald-50 border-emerald-100 text-emerald-700",
                hoverBorder: "hover:border-emerald-300 hover:shadow-[0_15px_45px_rgba(5,150,105,0.04)]"
              },
              {
                title: "Full-Stack Projects",
                desc: "Link modular React client layouts with database Express backend services.",
                chips: ["Cookie auth", "State sync", "Monorepo files"],
                href: "/learn/fullstack",
                badgeColor: "bg-purple-50 border-purple-100 text-purple-700",
                hoverBorder: "hover:border-purple-300 hover:shadow-[0_15px_45px_rgba(109,40,217,0.04)]"
              },
              {
                title: "CI/CD & Deployment",
                desc: "Containerize code inside Alpine Docker containers and configure GitHub actions.",
                chips: ["Docker Compose", "Actions CI/CD", "AWS hosting"],
                href: "/learn/deployment",
                badgeColor: "bg-indigo-50 border-indigo-100 text-indigo-700",
                hoverBorder: "hover:border-indigo-300 hover:shadow-[0_15px_45px_rgba(99,102,241,0.04)]"
              }
            ].map((track, idx) => (
              <div
                key={idx}
                className={`group bg-white border border-slate-205 rounded-[1.75rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500 ${track.hoverBorder}`}
              >
                <div className="space-y-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${track.badgeColor}`}>
                    Track
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-655 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                      {track.desc}
                    </p>
                  </div>
                  
                  {/* Chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {track.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md text-[9px] font-extrabold"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-end">
                  <Link
                    href={track.href}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:text-indigo-755 focus-visible:outline-none"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-605 hover:text-indigo-755 hover:underline"
            >
              <span>View all learning tracks in the Learning Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Production Practice Preview */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-3xs">
              Why CodeNivra
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-905 tracking-tight">
              Production Practice Preview
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
              We focus on building actual real-world skills, ensuring you can write enterprise code with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Full Project Code",
                desc: "Build complete projects, not snippets.",
                detail: "Every project lab guides you through constructing actual working applications from server networks to frontends.",
                icon: "💻",
                color: "bg-blue-50/50 text-blue-700 border-blue-105",
                hoverShadow: "hover:shadow-[0_20px_50px_rgba(37,99,235,0.04)] hover:border-blue-200"
              },
              {
                title: "Senior Code Review",
                desc: "Review code with production checklists.",
                detail: "Learn standard code review practices by auditing your workspaces against clean architectural structures.",
                icon: "🔍",
                color: "bg-violet-50/50 text-violet-755 border-violet-105",
                hoverShadow: "hover:shadow-[0_20px_50px_rgba(109,40,217,0.04)] hover:border-violet-200"
              },
              {
                title: "Deployment Ready",
                desc: "Deploy using real-world workflows.",
                detail: "Pack environments inside containers and configure automated workflows targeting staging or live servers.",
                icon: "🚀",
                color: "bg-emerald-50/50 text-emerald-700 border-emerald-105",
                hoverShadow: "hover:shadow-[0_20px_50px_rgba(5,150,105,0.04)] hover:border-emerald-200"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${card.hoverShadow}`}
              >
                <div className="space-y-4">
                  <span className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg ${card.color}`}>
                    {card.icon}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-slate-900">{card.title}</h3>
                    <p className="text-xs text-indigo-650 font-extrabold leading-normal">{card.desc}</p>
                    <p className="text-xs text-slate-450 leading-relaxed font-semibold pt-1">
                      {card.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sleek Final CTA Banner */}
      <CTASection />
    </div>
  );
}