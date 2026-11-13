"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium"
              >
                {it.q}
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-500", isOpen && "rotate-45 border-electric bg-electric text-white")}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div id={`${id}-${i}`} role="region" className={cn("grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="max-w-[70ch] pb-6 text-[15px] leading-relaxed text-muted">{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
