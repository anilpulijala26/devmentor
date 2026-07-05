"use client";

import { Check, ChevronDown, ChevronRight, Copy, FileCode, FileText, Folder, FolderOpen, ListFilter } from "lucide-react";
import { useMemo, useState } from "react";
import type { CodeFile } from "@/lib/projectDetailsData";

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

export function ProjectCodeExplorer({ files }: { files: CodeFile[] }) {
  const [selectedFile, setSelectedFile] = useState<TreeFile | null>(null);
  const [copied, setCopied] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const fileTree = useMemo(() => {
    const root: (TreeFile | TreeFolder)[] = [];

    files.forEach((file) => {
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
            language: file.language,
          });
        } else {
          let folder = currentLevel.find(
            (item) => item.type === "folder" && item.name === part,
          ) as TreeFolder | undefined;

          if (!folder) {
            folder = { type: "folder", name: part, children: [] };
            currentLevel.push(folder);
          }

          currentLevel = folder.children;
        }
      });
    });

    return root;
  }, [files]);

  const firstFile = useMemo(() => {
    const findFirst = (nodes: (TreeFile | TreeFolder)[]): TreeFile | null => {
      for (const node of nodes) {
        if (node.type === "file") return node;
        const nested = findFirst(node.children);
        if (nested) return nested;
      }
      return null;
    };

    return findFirst(fileTree);
  }, [fileTree]);

  const currentSelectedFile = selectedFile || firstFile;
  const currentFileMeta = files.find((file) => file.path === currentSelectedFile?.path);

  const handleCopy = async () => {
    if (!currentSelectedFile) return;
    await navigator.clipboard.writeText(currentSelectedFile.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTreeNodes = (nodes: (TreeFile | TreeFolder)[], pathPrefix = ""): React.ReactNode[] =>
    nodes.map((node) => {
      const currentPath = pathPrefix ? `${pathPrefix}/${node.name}` : node.name;

      if (node.type === "folder") {
        const isExpanded = expandedFolders[currentPath] !== false;
        return (
          <div key={currentPath} className="space-y-1">
            <button
              type="button"
              onClick={() => toggleFolder(currentPath)}
              className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              )}
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 shrink-0 text-indigo-600" />
              ) : (
                <Folder className="h-4 w-4 shrink-0 text-indigo-600" />
              )}
              <span className="truncate">{node.name}</span>
            </button>
            {isExpanded ? (
              <div className="ml-3.5 space-y-1 border-l border-slate-200/70 pl-4">
                {renderTreeNodes(node.children, currentPath)}
              </div>
            ) : null}
          </div>
        );
      }

      const isSelected = currentSelectedFile?.path === node.path;
      return (
        <button
          type="button"
          key={node.path}
          onClick={() => setSelectedFile(node)}
          className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            isSelected ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <FileCode className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{node.name}</span>
        </button>
      );
    });

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xs">
      <div className="grid min-h-[32rem] md:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-slate-50/70 p-4 md:border-b-0 md:border-r">
          <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-3">
            <ListFilter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Project Files
            </span>
          </div>
          <div className="max-h-[22rem] space-y-1 overflow-y-auto md:max-h-[36rem]">
            {fileTree.length ? renderTreeNodes(fileTree) : <p className="text-xs text-slate-400">No files available</p>}
          </div>
        </aside>

        <div className="min-w-0 bg-slate-950 text-slate-200">
          {currentSelectedFile ? (
            <div className="flex h-full min-w-0 flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900 bg-slate-900/70 px-4 py-3">
                <div className="min-w-0">
                  <span className="block truncate font-mono text-xs text-slate-400">
                    {currentSelectedFile.path}
                  </span>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                    {currentFileMeta?.label || "Starter Code"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-slate-200 transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>
              <div className="overflow-x-auto overflow-y-auto p-4">
                <pre className="font-mono text-xs leading-relaxed">
                  <code>{currentSelectedFile.code}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-slate-500">
              <FileText className="mb-2 h-8 w-8" />
              <p className="text-xs">Select a file to preview the code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
