"use client";

import { Boxes, Braces, Webhook } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { requestSamples, responseSample, type Lang } from "@/lib/data/code";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { ArrowPill } from "@/components/ui/Button";
import { CodeBlock, CopyButton, highlight } from "@/components/ui/Code";
import { Eyebrow } from "@/components/ui/Section";

const langs: { id: Lang; label: string }[] = [
  { id: "curl", label: "cURL" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
];

export function Developer() {
  const [lang, setLang] = useState<Lang>("node");
  const codeRef = useRef<HTMLPreElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (codeRef.current && !prefersReducedMotion())
      gsap.fromTo(codeRef.current.querySelectorAll(".code-line"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.018, ease: "power2.out" });
  }, [lang]);

  const code = requestSamples[lang];
  const lines = code.split("\n");

  return (
    <section aria-labelledby="dev-title" className="bg-paper py-28">
      <div className="container-site grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow>Developer experience</Eyebrow>
          <h2 id="dev-title" data-reveal className="text-h2 mt-5">
            Powerful payments.
            <br />
            <span className="text-muted">Beautifully simple integration.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-muted">
            A predictable REST API, idempotent requests, signed webhooks and typed SDKs. The samples here are
            illustrative — Yapay is a concept and these endpoints are not live.
          </p>
          <ul data-reveal-stagger className="mt-8 space-y-4">
            {[
              { icon: Braces, t: "REST API", b: "Resource-oriented endpoints with consistent errors and pagination." },
              { icon: Webhook, t: "Signed webhooks", b: "Verify signatures, retry on failure, replay from the dashboard." },
              { icon: Boxes, t: "SDKs", b: "Illustrative Node.js and Python clients with full types." },
            ].map((x) => (
              <li key={x.t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ice text-electric"><x.icon className="h-5 w-5" /></span>
                <span><span className="block text-[15px] font-medium">{x.t}</span><span className="text-[14px] text-muted">{x.b}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-10"><ArrowPill href="/developers/docs" tone="dark">Read the docs</ArrowPill></div>
        </div>

        <div data-reveal="right" className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-[#0d0f14] ring-1 ring-white/[0.08]" data-cursor-tone="light">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-2">
              <div role="tablist" aria-label="Code language" className="flex">
                {langs.map((l) => (
                  <button
                    key={l.id}
                    role="tab"
                    aria-selected={lang === l.id}
                    onClick={() => setLang(l.id)}
                    className={cn("relative px-3.5 py-3 font-mono text-[12px] transition-colors", lang === l.id ? "text-white" : "text-white/45 hover:text-white/80")}
                  >
                    {l.label}
                    <span className={cn("absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-electric transition-transform duration-500 ease-[var(--ease-out-expo)]", lang === l.id ? "scale-x-100" : "scale-x-0")} />
                  </button>
                ))}
              </div>
              <CopyButton text={code} />
            </div>
            <pre ref={codeRef} className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75] text-white/85" data-lenis-prevent-wheel>
              <code>
                {lines.map((ln, i) => (
                  <span key={`${lang}-${i}`} className="code-line block">
                    <span className="mr-5 inline-block w-4 select-none text-right text-white/20">{i + 1}</span>
                    {highlight(ln)}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_0.9fr]">
            <CodeBlock title="200 OK · response" code={responseSample} />
            <div className="relative overflow-hidden rounded-2xl bg-electric p-5 text-white" data-cursor-tone="light">
              <div className="text-[12px] text-white/70">Webhook delivery</div>
              <ol className="mt-4 space-y-3 text-[13px]">
                {["payment.created", "payment.processing", "payment.succeeded"].map((e, i) => (
                  <li key={e} className="flex items-center gap-3">
                    <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/15 font-mono text-[10px]">
                      {i + 1}
                      {i === 2 && <span className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2s]" />}
                    </span>
                    <span className="font-mono">{e}</span>
                    <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px]">200</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[12px] leading-relaxed text-white/70">Events are signed and retried with backoff until your endpoint acknowledges them.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
