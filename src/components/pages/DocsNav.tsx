"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky docs sidebar with scroll-spy. Anchor links are handled by Lenis (anchors option). */
export function DocsNav({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [sections]);
  return (
    <nav aria-label="Documentation" className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">On this page</p>
      <ul className="no-scrollbar mt-4 flex gap-1 overflow-x-auto lg:flex-col">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
              className={cn("block whitespace-nowrap rounded-lg border-l-2 px-3 py-1.5 text-[14px] transition-colors", active === s.id ? "border-electric bg-ice/60 text-ink" : "border-transparent text-muted hover:text-ink")}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
