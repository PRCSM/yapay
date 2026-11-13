"use client";

import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tiny, dependency-free highlighter for the illustrative snippets (JSON, JS/TS, Python, shell). */
export function highlight(code: string): ReactNode[] {
  const re = /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|await|async|import|from|export|function|return|if|new|true|false|null|def|for|in)\b|([A-Za-z_][\w]*)(?=\()/gm;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] ? "tok-com" : m[2] ? (code[re.lastIndex] === ":" ? "tok-key" : "tok-str") : m[3] ? "tok-num" : m[4] ? "tok-kw" : "tok-fn";
    out.push(<span key={k++} className={cls}>{m[0]}</span>);
    last = re.lastIndex;
  }
  out.push(code.slice(last));
  return out;
}

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch { /* clipboard blocked */ }
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className={cn("inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] text-white/70 transition-colors hover:bg-white/10 hover:text-white", className)}
      aria-label={done ? "Copied" : "Copy code"}
    >
      {done ? <Check className="h-3.5 w-3.5 text-[#5fd68f]" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

export function CodeBlock({ code, title, className }: { code: string; title?: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-[#0d0f14] ring-1 ring-white/[0.08]", className)} data-cursor-tone="light">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span className="font-mono text-[12px] text-white/45">{title}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] text-white/85" data-lenis-prevent-wheel><code>{highlight(code)}</code></pre>
    </div>
  );
}
