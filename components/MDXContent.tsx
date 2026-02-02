import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "./CodeBlock";
import { SeniorNote } from "./SeniorNote";
import { Pitfall } from "./Pitfall";
import { ProTip } from "./ProTip";
import { Checklist } from "./Checklist";
import { YouTubeEmbed } from "./YouTubeEmbed";

function getHeadingText(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getHeadingText).join("");
  if (children?.props?.children) return getHeadingText(children.props.children);
  return "";
}

const components = {
  CodeBlock,
  SeniorNote,
  Pitfall,
  ProTip,
  Checklist,
  YouTubeEmbed: () => null,
  // Add default HTML components with styling
  h1: () => null,
  h2: (props: any) => {
    const text = getHeadingText(props.children).trim();
    if (/^watch\b/i.test(text)) return null;
    return <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />;
  },
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-base leading-7 my-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside my-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
  ),
  li: (props: any) => <li className="text-base" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-slate-300 pl-4 italic text-slate-700 my-4"
      {...props}
    />
  ),
  table: (props: any) => (
    <table
      className="w-full border-collapse border border-slate-300 my-4"
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className="border border-slate-300 bg-slate-100 p-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-slate-300 p-2" {...props} />
  ),
  a: (props: any) => (
    <a className="text-blue-600 hover:underline" {...props} />
  ),
  pre: (props: any) => {
    const child = props.children;
    const code = child?.props?.children ?? "";
    const className = child?.props?.className ?? "";
    const language = className.replace("language-", "") || "javascript";

    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
  code: (props: any) => (
    <code
      className="bg-slate-100 px-2 py-1 rounded font-mono text-sm"
      {...props}
    />
  ),
};

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
    />
  );
}
