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
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Choose Your Starting Point */}
      <section className="py-16 sm:py-24 bg-slate-50/40 border-b border-slate-100 relative">
        {/* Soft background shape */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
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
                title: "Beginner",
                desc: "Start learning from absolute scratch with HTML, CSS, JavaScript, and version control basics.",
                chips: ["HTML5 & CSS Grid", "JavaScript ES6+", "Git & GitHub"],
                href: "/roadmaps/intern-developer",
                btnText: "Start Beginner Path",
                cardClass: "border-t-4 border-t-blue-500 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)]",
                btnClass: "bg-blue-600 hover:bg-blue-700 shadow-blue-100/50",
                badge: "Tier 1"
              },
              {
                title: "Mid-Level Developer",
                desc: "Level up your skills by building dynamic web applications with React, Next.js, and backend APIs.",
                chips: ["React & Next.js", "Node.js & Express", "SQL Databases"],
                href: "/roadmaps/mid-level-fullstack",
                btnText: "Start Mid-Level Path",
                cardClass: "border-t-4 border-t-violet-500 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(109,40,217,0.06)]",
                btnClass: "bg-violet-600 hover:bg-violet-700 shadow-violet-100/50",
                badge: "Tier 2"
              },
              {
                title: "Senior / Job-Ready",
                desc: "Master advanced topics like containers, automated testing, cloud deployments, and system architecture.",
                chips: ["Docker Containers", "CI/CD Actions", "AWS & Cloud Basics"],
                href: "/roadmaps/devops-ready-full-stack",
                btnText: "Start Senior Path",
                cardClass: "border-t-4 border-t-emerald-500 hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(5,150,105,0.06)]",
                btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100/50",
                badge: "Tier 3"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500 ${card.cardClass}`}
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-slate-800 text-sm sm:text-base">{card.title}</h3>
                    <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-550 uppercase tracking-widest">
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
                        className="bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-lg text-[10px] font-extrabold"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={card.href}
                    className={`w-full inline-flex items-center justify-center text-center text-white text-xs font-extrabold h-11 px-4 rounded-xl transition duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${card.btnClass}`}
                  >
                    {card.btnText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How CodeNivra Works */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How CodeNivra Works
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
              A structured, step-by-step loop to guide you from basic learning to deploying live apps.
            </p>
          </div>

          {/* Unified Responsive Stepper */}
          <div className="relative py-2 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {[
                { label: "Learn", desc: "Learn key concepts through clear, step-by-step guides.", icon: BookOpen },
                { label: "Practice", desc: "Solve quick daily challenges to build muscle memory.", icon: Code2 },
                { label: "Build", desc: "Create complete real-world projects from scratch.", icon: Layers },
                { label: "Review", desc: "Get your code reviewed using professional checklists.", icon: ShieldCheck },
                { label: "Deploy", desc: "Deploy your applications live to the cloud.", icon: Cloud },
                { label: "Explain", desc: "Prepare to explain your choices for tech interviews.", icon: MessageSquare }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-slate-50/50 border border-slate-200/60 rounded-3xl p-5 text-center flex flex-col items-center space-y-4 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_15px_45px_rgba(99,102,241,0.03)] transition duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="space-y-1 px-1">
                      <span className="block text-[8px] font-extrabold text-slate-400 tracking-wider">STAGE 0{idx + 1}</span>
                      <h3 className="text-xs font-black text-slate-805">{step.label}</h3>
                      <p className="text-[11px] text-slate-400 font-semibold leading-normal mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Tracks */}
      <section className="py-16 sm:py-24 bg-slate-50/40 border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              Syllabus Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
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
                desc: "Build responsive interfaces with React, Next.js, reusable components, and modern UI patterns.",
                chips: ["React Hooks", "Next.js routing", "Tailwind CSS"],
                href: "/learn/frontend-frameworks",
                badgeColor: "bg-blue-50 border-blue-100 text-blue-700",
                hoverBorder: "hover:border-blue-300 hover:shadow-[0_15px_45px_rgba(37,99,235,0.04)]"
              },
              {
                title: "Backend Engineering",
                desc: "Create secure APIs with Node.js, Express, authentication, databases, and validation.",
                chips: ["Node.js API", "PostgreSQL", "Prisma ORM"],
                href: "/learn/backend",
                badgeColor: "bg-emerald-50 border-emerald-100 text-emerald-700",
                hoverBorder: "hover:border-emerald-300 hover:shadow-[0_15px_45px_rgba(5,150,105,0.04)]"
              },
              {
                title: "Full-Stack Projects",
                desc: "Connect frontend, backend, database, auth, and deployment in real project workflows.",
                chips: ["Cookie auth", "State sync", "Monorepo files"],
                href: "/learn/fullstack",
                badgeColor: "bg-purple-50 border-purple-100 text-purple-700",
                hoverBorder: "hover:border-purple-300 hover:shadow-[0_15px_45px_rgba(109,40,217,0.04)]"
              },
              {
                title: "CI/CD & Deployment",
                desc: "Learn Docker, GitHub Actions, cloud hosting, and production deployment basics.",
                chips: ["Docker Compose", "Actions CI/CD", "AWS hosting"],
                href: "/learn/deployment",
                badgeColor: "bg-indigo-50 border-indigo-100 text-indigo-700",
                hoverBorder: "hover:border-indigo-300 hover:shadow-[0_15px_45px_rgba(99,102,241,0.04)]"
              }
            ].map((track, idx) => (
              <div
                key={idx}
                className={`group bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-indigo-500 ${track.hoverBorder}`}
              >
                <div className="space-y-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${track.badgeColor}`}>
                    Track
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
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

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Syllabus</span>
                  <Link
                    href={track.href}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none rounded px-1"
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
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              <span>View all learning tracks in the Learning Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Production Practice Preview */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              Why CodeNivra
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
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
                desc: "Build complete projects with real folder structures, code files, tests, and deployment steps.",
                icon: "💻",
                color: "bg-blue-50/60 text-blue-700 border-blue-100",
                hoverShadow: "hover:shadow-[0_20px_50px_rgba(37,99,235,0.04)] hover:border-blue-200"
              },
              {
                title: "Senior Code Review",
                desc: "Audit your work using production checklists for accessibility, performance, security, and clean code.",
                icon: "🔍",
                color: "bg-violet-50/60 text-violet-700 border-violet-100",
                hoverShadow: "hover:shadow-[0_20px_50px_rgba(109,40,217,0.04)] hover:border-violet-200"
              },
              {
                title: "Deployment Ready",
                desc: "Deploy apps with environment setup, build commands, hosting steps, and production checks.",
                icon: "🚀",
                color: "bg-emerald-50/60 text-emerald-700 border-emerald-100",
                hoverShadow: "hover:shadow-[0_20px_50px_rgba(5,150,105,0.04)] hover:border-emerald-200"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${card.hoverShadow}`}
              >
                <div className="space-y-4">
                  <span className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg ${card.color}`}>
                    {card.icon}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-slate-900">{card.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">{card.desc}</p>
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