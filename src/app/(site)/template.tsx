"use client";

import { useRef } from "react";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

let firstLoad = true;

/** Fast masked wipe between routes (skipped on first load and for reduced motion). */
export default function Template({ children }: { children: React.ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (firstLoad || prefersReducedMotion()) {
      firstLoad = false;
      gsap.set(el, { display: "none" });
      return;
    }
    const tl = gsap.timeline();
    tl.set(el, { display: "block", yPercent: 0 })
      .to(el.firstElementChild, { yPercent: -100, duration: 0.55, ease: "expo.inOut" }, 0)
      .to(el, { yPercent: -100, duration: 0.6, ease: "expo.inOut" }, 0.06)
      .set(el, { display: "none" });
    return () => { tl.kill(); };
  }, []);
  return (
    <>
      <div ref={panel} aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden bg-electric">
        <div className="absolute inset-0 bg-charcoal" />
      </div>
      {children}
    </>
  );
}
