import Link from "next/link";
import { getAllTracks } from "@/lib/content";
import { 
  ArrowRight, BookOpen, Award, Layers, Sparkles, 
  Layout, Code2, Server, Compass, CheckCircle2, Play, 
  Terminal, ShieldCheck, HelpCircle 
} from "lucide-react";

export const metadata = {
  title: "Learning Hub - DevMentor",
  description: "Gain hands-on developer experience. Follow guided paths, practice daily tasks, build project blueprints, and crack interviews.",
};

export default function LearnPage() {
  const tracks = getAllTracks();

  // Mapping of role-based roadmaps for recommended paths
  const roles = [
    {
      title: "Intern Developer",
      slug: "intern-developer",
      desc: "Start here if you are a beginner. Master HTML, CSS, Git, and hosting basics.",
      color: "border-blue-200 bg-blue-50/50 text-blue-700 hover:border-blue-400"
    },
    {
      title: "Junior Frontend",
      slug: "junior-frontend",
      desc: "Master React, TypeScript, state components, and client-side fetching.",
      color: "border-violet-200 bg-violet-50/50 text-violet-750 hover:border-violet-400"
    },
    {
      title: "Mid-Level Full-Stack",
      slug: "mid-level-fullstack",
      desc: "Build Next.js App Router applications, Node.js APIs, and database relations.",
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-750 hover:border-emerald-400"
    },
    {
      title: "Senior UI Developer",
      slug: "senior-ui-developer",
      desc: "Master Fiber reconcilers, rendering speedups, caching, and Docker pipelines.",
      color: "border-pink-200 bg-pink-50/50 text-pink-700 hover:border-pink-400"
    },
    {
      title: "Technical Interview Prep",
      slug: "interview-preparation",
      desc: "Crack engineering interviews using structured system design and code pitches.",
      color: "border-purple-200 bg-purple-50/50 text-purple-700 hover:border-purple-400"
    }
  ];

  // Goals
  const goals = [
    { label: "Build a Portfolio", target: "/projects/personal-portfolio", desc: "For beginners seeking jobs" },
    { label: "Master React & Next.js", target: "/learn/frontend-frameworks", desc: "For frontend jobs" },
    { label: "Write Node APIs", target: "/learn/fullstack", desc: "For backend operations" },
    { label: "Crack System Design", target: "/roadmaps/interview-preparation", desc: "For interview candidates" }
  ];

  // Track summaries detailing specific skills and outcomes for rendering cards
  const trackDetails: Record<string, {
    bestFor: string;
    skills: string[];
    tasks: string[];
    project: { title: string; slug: string };
    outcome: string;
    colorClass: string;
    icon: React.ReactNode;
  }> = {
    foundations: {
      bestFor: "Beginners, interns, and developers looking to solidify their core frontend and JavaScript knowledge.",
      skills: ["Semantic HTML5 & W3C Validations", "CSS Grid & Flexbox Sizing", "Event Loop, Closures, & Async ES6", "TypeScript Interfaces & Types"],
      tasks: ["Native HTML Validation", "Responsive Pricing Cards", "JS Array Transformation"],
      project: { title: "Portfolio Website", slug: "personal-portfolio" },
      outcome: "You will write accessible, semantic code and understand the browser rendering and script execution lifecycle.",
      colorClass: "from-blue-600 to-indigo-600",
      icon: <Code2 className="w-5 h-5" />
    },
    "frontend-frameworks": {
      bestFor: "Frontend developers transition to component state architectures and Next.js scale frameworks.",
      skills: ["React Fiber Mechanics", "hooks & Context Custom States", "Next.js RSCs & Caching", "Server Actions & Forms"],
      tasks: ["Debounced Search Input", "React Custom Hook", "Next.js Dynamic Route"],
      project: { title: "Resume Builder App", slug: "resume-builder" },
      outcome: "You will build fast React applications, manage URL state filters, and deploy caching rendering paths.",
      colorClass: "from-indigo-600 to-violet-600",
      icon: <Layout className="w-5 h-5" />
    },
    fullstack: {
      bestFor: "Developers wanting to couple client interfaces with relational database storage and Docker containers.",
      skills: ["Express Routing & Middlewares", "Zod Body Validations", "PostgreSQL Indexes & Pools", "Docker Compose Multi-stage Builds"],
      tasks: ["API Route Handler", "JWT Protected Route", "PostgreSQL CRUD Query"],
      project: { title: "Blog CMS App", slug: "blog-cms" },
      outcome: "You will design secure relational schemas, validate backend requests, configure JWT cookies, and containerize systems.",
      colorClass: "from-violet-600 to-fuchsia-600",
      icon: <Server className="w-5 h-5" />
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4 dark:bg-slate-900 dark:border-slate-800 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            Self-Guided Real-Time Developer Curriculum
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            Professional Learning Hub
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Ditch generic tutorials. Gain production experience by matching concepts with practice tasks and project blueprints.
          </p>
        </div>

        {/* 1. Where should I start? Section */}
        <section className="mb-12 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            Where should I start?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl space-y-2">
              <h3 className="font-bold text-blue-900">Beginners & Intern Candidates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you are new to web development, start with the <strong>Web Foundations</strong> track. It takes you through HTML elements, CSS variables, and core JavaScript execution scopes before introducing frameworks.
              </p>
              <Link href="/learn/foundations" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline">
                Start foundations <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 bg-purple-50/30 border border-purple-100 rounded-2xl space-y-2">
              <h3 className="font-bold text-purple-900">Experienced Developers & Interviewees</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you already know JavaScript and React, skip straight to <strong>Next.js App Router</strong> or the <strong>Technical Interview Preparation</strong> roadmap to practice system designs and project explanations.
              </p>
              <Link href="/roadmaps/interview-preparation" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-750 hover:underline">
                Start interview prep <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Learn → Practice → Build → Review → Explain Framework */}
        <section className="mb-12 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100 mb-6">
            <Compass className="w-5 h-5 text-indigo-500" />
            The DevMentor Workflow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { step: "1. Learn", desc: "Read structured concepts and senior developer logs.", color: "bg-indigo-50 text-indigo-700 border-indigo-100", icon: <BookOpen className="w-4.5 h-4.5" /> },
              { step: "2. Practice", desc: "Complete daily coding tasks with instant outcomes.", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <Terminal className="w-4.5 h-4.5" /> },
              { step: "3. Build", desc: "Develop real projects with database schemas.", color: "bg-violet-50 text-violet-750 border-violet-100", icon: <Layers className="w-4.5 h-4.5" /> },
              { step: "4. Review", desc: "Perform code reviews using senior audit checklists.", color: "bg-pink-50 text-pink-700 border-pink-100", icon: <ShieldCheck className="w-4.5 h-4.5" /> },
              { step: "5. Explain", desc: "Prepare project pitches for technical interviews.", color: "bg-amber-50 text-amber-700 border-amber-100", icon: <Award className="w-4.5 h-4.5" /> }
            ].map((item, idx) => (
              <div key={idx} className={`p-4 border rounded-2xl space-y-2 flex flex-col justify-between ${item.color}`}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-extrabold text-xs uppercase tracking-wider">{item.step}</span>
                </div>
                <p className="text-2xs sm:text-xs leading-relaxed mt-1 font-semibold opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Choose by Goal */}
        <section className="mb-12">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            Choose by Goal
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {goals.map((goal, idx) => (
              <Link
                key={idx}
                href={goal.target}
                className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:border-indigo-400 hover:shadow-xs transition duration-200"
              >
                <h3 className="text-xs font-black text-slate-800">{goal.label}</h3>
                <p className="text-3xs text-slate-500 mt-1 font-semibold">{goal.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Recommended Path by Role */}
        <section className="mb-16">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-500" />
            Recommended Path by Role
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roles.map((role) => (
              <Link
                key={role.slug}
                href={`/roadmaps/${role.slug}`}
                className={`p-4 border rounded-2xl flex flex-col justify-between transition duration-200 hover:scale-[1.02] ${role.color}`}
              >
                <div>
                  <h3 className="text-xs font-black">{role.title}</h3>
                  <p className="text-3xs text-slate-600 mt-2 leading-relaxed font-semibold">{role.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-3xs font-extrabold uppercase tracking-widest opacity-80">
                  Open roadmap <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tracks List with detailed audits */}
        <div className="space-y-16">
          {tracks.map((track) => {
            const details = trackDetails[track.slug] || {
              bestFor: "Developers looking to expand knowledge.",
              skills: ["Core variables", "Dynamic operations"],
              tasks: ["Task 1", "Task 2"],
              project: { title: "Portfolio Website", slug: "personal-portfolio" },
              outcome: "Gain core competencies.",
              colorClass: "from-indigo-600 to-indigo-800",
              icon: <Code2 className="w-5 h-5" />
            };

            return (
              <div key={track.slug} className="group/track relative">
                {/* Track Heading Banner */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${details.colorClass}`}>
                        {details.icon}
                        {track.title}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-2 max-w-3xl leading-relaxed text-sm sm:text-base">
                      {track.description}
                    </p>
                  </div>
                  <Link
                    href={`/learn/${track.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-indigo-600 hover:text-indigo-800 transition whitespace-nowrap"
                  >
                    View Roadmap Path
                    <ArrowRight className="w-4 h-4 group-hover/track:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Grid layout: Left is track modules list, Right is audit details card */}
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Modules list */}
                  <div className="md:col-span-7 space-y-6">
                    {track.modules.map((module) => (
                      <div
                        key={module.slug}
                        className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs transition duration-200 hover:border-slate-350"
                      >
                        <span className="text-[10px] font-extrabold text-indigo-600 tracking-widest uppercase">MODULE</span>
                        <h3 className="text-base font-bold text-slate-800 mt-0.5 mb-3">{module.title}</h3>
                        
                        <div className="space-y-2">
                          {module.lessons
                            .sort((a, b) => a.order - b.order)
                            .map((lesson) => (
                              <Link
                                key={lesson.slug}
                                href={`/learn/${track.slug}/${lesson.slug}`}
                                className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50/20 p-2.5 hover:border-slate-200 hover:bg-slate-50/80 transition"
                              >
                                <span className="text-xs font-semibold text-slate-700 truncate pr-2">
                                  {lesson.title}
                                </span>
                                <Play className="w-3 h-3 text-indigo-500 shrink-0" />
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Audit summary card */}
                  <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-6">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Best For</h4>
                      <p className="text-xs font-semibold text-slate-650 mt-1 leading-relaxed">{details.bestFor}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Target Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {details.skills.map((skill, idx) => (
                          <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 text-3xs font-bold px-2 py-0.5 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Practice Tasks</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-semibold">
                        {details.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Project Blueprint</h4>
                      <div className="p-3 bg-violet-50/50 border border-violet-100 rounded-xl mt-2 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-violet-850">{details.project.title}</p>
                          <span className="text-[9px] font-bold text-violet-500 uppercase tracking-widest mt-0.5 block">PROJECT LAB</span>
                        </div>
                        <Link href={`/projects/${details.project.slug}`} className="p-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-750 transition">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Interview Outcome</h4>
                      <p className="text-xs font-semibold text-slate-600 mt-1.5 leading-relaxed">{details.outcome}</p>
                    </div>

                    {/* Track Actions CTA Button Grid */}
                    <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/learn/${track.slug}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-3xs font-bold text-center transition"
                      >
                        Start Track
                      </Link>
                      <Link
                        href="/tasks"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-3xs font-bold text-center transition"
                      >
                        View Tasks
                      </Link>
                      <Link
                        href={`/projects/${details.project.slug}`}
                        className="bg-violet-55/10 border border-violet-150 text-violet-750 py-2 rounded-xl text-3xs font-bold text-center hover:bg-violet-100 transition"
                      >
                        Build Project
                      </Link>
                      <Link
                        href="/code-review"
                        className="bg-slate-50 border border-slate-200 text-slate-600 py-2 rounded-xl text-3xs font-bold text-center hover:bg-slate-100 transition"
                      >
                        Review Code
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
