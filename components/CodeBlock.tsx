"use client";

import { Copy, Check } from "lucide-react";
import { useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

function normalizeCode(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((child) => (typeof child === "string" ? child : "")).join("");
  }
  return "";
}

export function CodeBlock({ children, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = normalizeCode(children);
  const lang = language?.toLowerCase() || "javascript";

  const highlighted = useMemo(() => {
    const grammar = Prism.languages[lang] || Prism.languages.javascript;
    return Prism.highlight(code, grammar, lang);
  }, [code, lang]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{lang}</span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
      <pre className={`p-4 overflow-x-auto language-${lang}`} tabIndex={0}>
        <code
          className={`text-slate-200 text-sm font-mono language-${lang}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
