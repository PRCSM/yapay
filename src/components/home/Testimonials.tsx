"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { testimonials } from "@/lib/data/content";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { DemoBadge, Eyebrow } from "@/components/ui/Section";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const quote = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const go = useCallback((d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!quote.current || prefersReducedMotion()) return;
    gsap.fromTo(quote.current.querySelectorAll("[data-q]"), { opacity: 0, y: 20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "expo.out" });
  }, [i]);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const t = testimonials[i];
  const initials = t.name.split(" ").map((s) => s[0]).join("");

  return (
    <section
      aria-labelledby="t-title"
      aria-roledescription="carousel"
      className="bg-paper py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Eyebrow>Customer stories</Eyebrow><DemoBadge>Illustrative examples</DemoBadge></div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-ink"><ArrowLeft className="h-4 w-4" /></button>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-electric"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <h2 id="t-title" className="sr-only">Customer stories</h2>
        <div ref={quote} aria-live="polite" aria-atomic="true" className="mt-12 grid gap-10 lg:grid-cols-[auto_1fr]" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${testimonials.length}`}>
          <Quote data-q className="h-12 w-12 text-electric" aria-hidden />
          <figure>
            <blockquote data-q className="text-[clamp(1.6rem,3.1vw,2.9rem)] font-[450] leading-[1.18] tracking-[-0.025em] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption data-q className="mt-10 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ice text-[14px] font-semibold text-electric" aria-hidden>{initials}</span>
              <span>
                <span className="block text-[15px] font-medium">{t.name}</span>
                <span className="text-[14px] text-muted">{t.role}, {t.company}</span>
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="mt-12 flex gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((x, k) => (
            <button key={x.name} role="tab" aria-selected={k === i} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className="group h-6 flex-1">
              <span className={cn("block h-[2px] rounded-full transition-colors duration-500", k === i ? "bg-electric" : "bg-line group-hover:bg-muted")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
