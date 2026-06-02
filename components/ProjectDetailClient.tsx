"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, FolderTree, Layers, Server, Cpu, Info, Target, Wrench, 
  ShieldAlert, Sparkles, Folder, FolderOpen, FileCode, Check, Copy, 
  ChevronDown, ChevronRight, FileText, CheckCircle2, ListFilter
} from "lucide-react";
import { ProjectChecklist } from "./mdx/ProjectChecklist";
import { Project } from "@/lib/projects";

interface ProjectDetailClientProps {
  project: Project;
}

// Tree types for Full Code Explorer
interface TreeFile {
  type: "file";
  name: string;
  path: string;
  code: string;
  language: string;
}

interface TreeFolder {
  type: "folder";
  name: string;
  children: (TreeFile | TreeFolder)[];
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "requirements" | "build" | "code" | "tests" | "deploy" | "interview">("overview");

  // State for selected code file in explorer
  const [selectedFile, setSelectedFile] = useState<TreeFile | null>(null);
  
  // State for theme copy buttons
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});

  // Expand state for folder nodes in file tree
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  // Parse project details fallback
  const details = project.details;

  // Build the file tree
  const fileTree = React.useMemo(() => {
    if (!details || !details.codeFiles || details.codeFiles.length === 0) return [];
    
    const root: (TreeFile | TreeFolder)[] = [];
    
    details.codeFiles.forEach(file => {
      const parts = file.path.split("/");
      let currentLevel = root;
      
      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        
        if (isLast) {
          currentLevel.push({
            type: "file",
            name: part,
            path: file.path,
            code: file.code,
            language: file.language
          });
        } else {
          // Check if folder exists
          const folderName = parts.slice(0, index + 1).join("/");
          let folder = currentLevel.find(item => item.type === "folder" && item.name === part) as TreeFolder | undefined;
          if (!folder) {
            folder = {
              type: "folder",
              name: part,
              children: []
            };
            currentLevel.push(folder);
          }
          currentLevel = folder.children;
        }
      });
    });
    
    return root;
  }, [details]);

  // Set initial selected file
  useEffect(() => {
    if (fileTree.length > 0) {
      const findFirstFile = (nodes: any[]): TreeFile | null => {
        for (const n of nodes) {
          if (n.type === "file") return n;
          const f = findFirstFile(n.children);
          if (f) return f;
        }
        return null;
      };
      const first = findFirstFile(fileTree);
      if (first) {
        setSelectedFile(first);
      }
    }
  }, [fileTree]);

  const getLevelColor = (level: string) => {
    return {
      Beginner: "bg-blue-50 text-blue-700 border-blue-200",
      Intermediate: "bg-violet-50 text-violet-700 border-violet-200",
      Advanced: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }[level] || "bg-slate-50 text-slate-700";
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMap(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedMap(prev => ({ ...prev, [id]: false }));
      }, 2000);
    });
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  // Recursive Tree Rendering
  const renderTreeNodes = (nodes: any[], pathPrefix = "") => {
    return nodes.map((node) => {
      const currentPath = pathPrefix ? `${pathPrefix}/${node.name}` : node.name;
      if (node.type === "folder") {
        const isExpanded = expandedFolders[currentPath] !== false; // expanded by default
        return (
          <div key={currentPath} className="space-y-1">
            <button
              onClick={() => toggleFolder(currentPath)}
              className="w-full flex items-center gap-2 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
              {isExpanded ? <FolderOpen className="w-4 h-4 shrink-0 text-indigo-550" /> : <Folder className="w-4 h-4 shrink-0 text-indigo-550" />}
              <span className="truncate">{node.name}</span>
            </button>
            {isExpanded && (
              <div className="pl-4 border-l border-slate-200/60 ml-3.5 space-y-1">
                {renderTreeNodes(node.children, currentPath)}
              </div>
            )}
          </div>
        );
      } else {
        const isSelected = selectedFile?.path === node.path;
        return (
          <button
            key={node.path}
            onClick={() => setSelectedFile(node)}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isSelected
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-indigo-650" : "text-slate-400"}`} />
            <span className="truncate">{node.name}</span>
          </button>
        );
      }
    });
  };

  // State for Interview Questions Accordion
  const [openQA, setOpenQA] = useState<Record<number, boolean>>({});

  const toggleQA = (idx: number) => {
    setOpenQA(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
      {/* Top Back Navigation */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Project Labs
        </Link>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          LAB // {project.slug.toUpperCase()}
        </span>
      </div>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(project.level)}`}>
            {project.level} Lab
          </span>
          <span className="text-xs text-slate-500 font-semibold">{project.duration} Duration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
          {project.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-slate-200 dark:border-slate-800">
        <nav className="flex flex-wrap -mb-px gap-1 sm:gap-2" aria-label="Project Sections">
          {[
            { id: "overview", label: "Overview" },
            { id: "requirements", label: "Requirements" },
            { id: "build", label: "Build Steps" },
            { id: "code", label: "Full Code" },
            { id: "tests", label: "Tests" },
            { id: "deploy", label: "Deploy" },
            { id: "interview", label: "Interview" }
          ].map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-2.5 border-b-2 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-t-lg ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/40"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="space-y-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid sm:grid-cols-2 gap-6">
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Info className="w-4.5 h-4.5 text-indigo-500" />
                  Project Purpose
                </h2>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                  {project.description}
                </p>
              </section>

              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Target className="w-4.5 h-4.5 text-indigo-500" />
                  Who Should Build This?
                </h2>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                  {project.whoShouldBuild}
                </p>
              </section>
            </div>

            {/* Final Outcome / Core Features */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Layers className="w-5 h-5 text-indigo-500" />
                Final Outcome & Core Deliverables
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Core Features List</p>
                  <ul className="grid sm:grid-cols-2 gap-3 pl-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-slate-650">
                        <CheckCircle2 className="w-4 h-4 text-emerald-550 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills & Tech Stack */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Wrench className="w-5 h-5 text-indigo-500" />
                Skills Practiced & Stack
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-indigo-50/50 border border-indigo-100 text-indigo-750 px-3 py-1.5 rounded-xl text-xs font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Developer Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-50 border border-slate-200/80 text-slate-650 px-3 py-1 rounded-xl text-xs font-bold"
                      >
                        🧠 {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Future Enhancements */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Future Enhancements
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                {project.futureEnhancements.map((enh, idx) => (
                  <li key={idx} className="text-slate-600 font-semibold">{enh}</li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* REQUIREMENTS TAB */}
        {activeTab === "requirements" && details && (
          <div className="space-y-6 animate-fade-in">
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Target className="w-5 h-5 text-indigo-500" />
                Business Objectives & Target Audience
              </h2>
              <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                <p className="text-xs font-bold text-indigo-805 uppercase tracking-wider mb-1.5">Business Statement</p>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                  {details.requirements.businessObjective}
                </p>
              </div>
            </section>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Functional Requirements */}
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 border-b pb-2 text-sm uppercase tracking-wider">Functional Requirements</h3>
                <ul className="space-y-2">
                  {details.requirements.functional.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-600">
                      <span className="text-indigo-600 font-black mt-0.5">•</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Non-Functional Requirements */}
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 border-b pb-2 text-sm uppercase tracking-wider">Non-Functional Specs</h3>
                <ul className="space-y-2">
                  {details.requirements.nonFunctional.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-600">
                      <span className="text-indigo-600 font-black mt-0.5">⚙️</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* User Stories & Acceptance Criteria */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-base font-extrabold text-slate-900 border-b pb-2">User Stories & Acceptance</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-550 uppercase tracking-wider mb-2">User Stories</h4>
                  <div className="space-y-2.5">
                    {details.requirements.userStories.map((story, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed">
                        {story}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-550 uppercase tracking-wider mb-2">Acceptance Criteria</h4>
                  <ul className="space-y-2 pl-1">
                    {details.requirements.acceptanceCriteria.map((crit, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-600">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="font-semibold text-slate-650">{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Edge Cases */}
            <section className="p-6 bg-yellow-50/15 border border-yellow-200 rounded-3xl shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-yellow-800 uppercase tracking-wider">Edge Cases to Handle</h3>
              <ul className="space-y-2">
                {details.requirements.edgeCases.map((edge, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-650">
                    <span className="text-yellow-600 font-bold">⚠️</span>
                    <span className="font-semibold">{edge}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* BUILD STEPS TAB */}
        {activeTab === "build" && details && (
          <div className="space-y-6 animate-fade-in">
            {/* Folder Structure Code Block */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <FolderTree className="w-5 h-5 text-indigo-500" />
                Folder Directory Blueprint
              </h2>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                {project.folderStructure}
              </pre>
            </section>

            {/* 10-Step Timeline */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Cpu className="w-5 h-5 text-indigo-500" />
                Step-by-Step Implementation Path
              </h2>

              <div className="relative border-l-2 border-indigo-100 ml-3.5 pl-6 space-y-8">
                {details.buildSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Node */}
                    <span className="absolute -left-10 top-0.5 h-7 w-7 rounded-full bg-indigo-650 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {step.step}
                    </span>
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{step.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">{step.description}</p>
                      {step.code && (
                        <div className="relative group">
                          <button
                            onClick={() => handleCopyCode(`step-${idx}`, step.code || "")}
                            className="absolute right-3 top-3 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg text-2xs font-bold transition flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                            aria-label="Copy code block"
                          >
                            {copiedMap[`step-${idx}`] ? <Check className="w-3 h-3 text-emerald-450" /> : <Copy className="w-3 h-3" />}
                            {copiedMap[`step-${idx}`] ? "Copied" : "Copy"}
                          </button>
                          <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl border border-slate-900 font-mono text-2xs overflow-x-auto">
                            {step.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* FULL CODE TAB */}
        {activeTab === "code" && details && (
          <div className="space-y-6 animate-fade-in">
            {/* Split pane file explorer */}
            <div className="flex flex-col md:flex-row border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xs min-h-[500px] items-stretch">
              
              {/* Left pane: File explorer */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 p-4 bg-slate-50/50 overflow-y-auto max-h-[400px] md:max-h-[600px] space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <ListFilter className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Files</span>
                </div>
                <div className="space-y-1">
                  {fileTree.length > 0 ? renderTreeNodes(fileTree) : (
                    <span className="text-xs text-slate-400 italic">No files available</span>
                  )}
                </div>
              </div>

              {/* Right pane: Code Preview */}
              <div className="flex-1 bg-slate-950 text-slate-200 flex flex-col min-w-0">
                {selectedFile ? (
                  <>
                    <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-slate-900/60">
                      <span className="font-mono text-xs text-slate-400 truncate">{selectedFile.path}</span>
                      <button
                        onClick={() => handleCopyCode("selected-file", selectedFile.code)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-2xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        {copiedMap["selected-file"] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedMap["selected-file"] ? "Copied!" : "Copy Code"}
                      </button>
                    </div>
                    <div className="p-4 flex-1 overflow-x-auto overflow-y-auto max-h-[500px]">
                      <pre className="font-mono text-xs leading-relaxed">
                        <code>{selectedFile.code}</code>
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500">
                    <FileText className="w-8 h-8 mb-2 stroke-1" />
                    <span className="text-xs">Select a file from the explorer to view the code</span>
                  </div>
                )}
              </div>
            </div>

            {/* API Contract & Database Schema */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Server className="w-5 h-5 text-indigo-500" />
                API Contract & Database Schema
              </h2>

              <div className="space-y-6 text-sm text-slate-700">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">REST API Interface Contract</h3>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                    {project.apiContract}
                  </pre>
                </div>

                {project.databaseSchema && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">PostgreSQL Database Schema</h3>
                    <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
                      {project.databaseSchema}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* TESTS TAB */}
        {activeTab === "tests" && details && (
          <div className="space-y-6 animate-fade-in">
            {/* Testing Checklist */}
            <ProjectChecklist
              title="Manual Testing Checklist"
              storageKey={`project-testing-${project.slug}`}
              items={details.tests.manualChecklist}
            />

            {/* Test Framework advice */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                🧪 Automated Unit Test Spec
              </h2>
              <div className="relative group">
                <button
                  onClick={() => handleCopyCode("unit-test", details.tests.unitTestCode)}
                  className="absolute right-3 top-3 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg text-2xs font-bold transition flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                >
                  {copiedMap["unit-test"] ? <Check className="w-3.5 h-3.5 text-emerald-450" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedMap["unit-test"] ? "Copied" : "Copy"}
                </button>
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                  {details.tests.unitTestCode}
                </pre>
              </div>
            </section>

            {/* Accessibility & Performance Checklist */}
            <div className="grid sm:grid-cols-2 gap-6">
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b">Accessibility Checks</h3>
                <ul className="space-y-2">
                  {details.tests.accessibilityChecklist.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-650">
                      <span className="text-indigo-650">✓</span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b">Performance Profiling</h3>
                <ul className="space-y-2">
                  {details.tests.performanceChecklist.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-650">
                      <span className="text-indigo-650">⚡</span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {/* DEPLOY TAB */}
        {activeTab === "deploy" && details && (
          <div className="space-y-6 animate-fade-in">
            {/* Deploy checklists */}
            <ProjectChecklist
              title="Production Deployment Checklist"
              storageKey={`project-deploy-${project.slug}`}
              items={details.deploy.productionChecklist}
            />

            {/* Run Commands & Environment */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3">Local Run Commands</h2>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">Startup commands sequence</h4>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                    {details.deploy.localRun.join("\n")}
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">Environment Configuration (.env.example)</h4>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                    {details.deploy.envVariables.join("\n")}
                  </pre>
                </div>
              </div>
            </section>

            {/* Deployment configs (Docker, vercel, render etc) */}
            {(details.deploy.dockerfile || details.deploy.dockerCompose || details.deploy.githubActions) && (
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
                <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3">Cloud Configuration Files</h2>
                <div className="space-y-4">
                  {details.deploy.dockerfile && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">Docker Environment Specifications</h4>
                      <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                        {details.deploy.dockerfile}
                      </pre>
                    </div>
                  )}

                  {details.deploy.dockerCompose && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">Docker Compose Linkers</h4>
                      <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
                        {details.deploy.dockerCompose}
                      </pre>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Common Mistakes */}
            <section className="p-6 bg-red-50/20 border border-red-200 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-red-950 flex items-center gap-2 pb-3 border-b border-red-100">
                <ShieldAlert className="w-5 h-5 text-red-605" />
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                {project.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span className="text-slate-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Advice */}
            <section className="p-6 bg-indigo-50/20 border border-indigo-200 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2 pb-3 border-b border-indigo-100">
                <Sparkles className="w-5 h-5 text-indigo-650" />
                Senior Developer Advice
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-750 leading-relaxed font-semibold">
                {project.seniorNotes.map((note, idx) => (
                  <p key={idx}>
                    💡 {note}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* INTERVIEW TAB */}
        {activeTab === "interview" && details && (
          <div className="space-y-6 animate-fade-in">
            {/* Pitch & Architecture */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3">How to Pitch This Project</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">30-Second Elevator Pitch</h4>
                  <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold bg-indigo-50/30 p-4 border border-indigo-100 rounded-2xl">
                    {details.interview.howToExplain}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Architectural Blueprint Flow</h4>
                  <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                    {details.interview.architecture}
                  </p>
                </div>
              </div>
            </section>

            {/* Challenges & Improvements */}
            <div className="grid sm:grid-cols-2 gap-6">
              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h3 className="font-extrabold text-slate-900 border-b pb-2 text-sm uppercase tracking-wider">Key Challenge Solved</h3>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                  {details.interview.challenges}
                </p>
              </section>

              <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
                <h3 className="font-extrabold text-slate-900 border-b pb-2 text-sm uppercase tracking-wider">Improvements & Enhancements</h3>
                <ul className="space-y-2">
                  {details.interview.improvements.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-600">
                      <span className="text-indigo-650">✓</span>
                      <span className="font-semibold text-slate-650">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Resume Bullet Points */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3">Resume Bullet Points</h2>
              <ul className="space-y-2.5">
                {details.interview.resumeBullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-650 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-indigo-500 font-bold mt-0.5">🚀</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Interview Q&As Accordion */}
            <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3">Interviewer Questions & Answers</h2>
              <div className="space-y-3">
                {details.interview.qas.map((qa, idx) => {
                  const isOpen = openQA[idx] === true;
                  return (
                    <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                      <button
                        onClick={() => toggleQA(idx)}
                        className="w-full flex justify-between items-center p-4 text-left font-bold text-xs sm:text-sm text-slate-805 hover:bg-slate-100 transition cursor-pointer focus-visible:outline-none"
                      >
                        <span>{qa.question}</span>
                        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-450 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-450 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold bg-white">
                          {qa.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
