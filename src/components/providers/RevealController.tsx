"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Global, declarative scroll reveals.
 *   data-reveal="up|fade|scale|left|right|mask"  (default "up"), data-reveal-delay="0.1"
 *   data-reveal-stagger  → children reveal in sequence
 *   data-count="1234" data-prefix="$" data-suffix="%" data-decimals="1" → count-up
 * A MutationObserver initialises elements that mount later (client navigation, streaming),
 * so nothing can get stuck hidden.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {});

    const initReveal = (el: HTMLElement) => {
      if (el.dataset.revealInit) return;
      el.dataset.revealInit = "1";
      if (reduced) { gsap.set(el, { opacity: 1 }); return; }
      const v = el.dataset.reveal || "up";
      const delay = Number(el.dataset.revealDelay || 0);
      const from: gsap.TweenVars =
        v === "fade" ? { opacity: 0 }
        : v === "scale" ? { opacity: 0, scale: 0.94 }
        : v === "left" ? { opacity: 0, x: -48 }
        : v === "right" ? { opacity: 0, x: 48 }
        : v === "mask" ? { opacity: 1, clipPath: "inset(18% 6% 18% 6% round 28px)" }
        : { opacity: 0, y: 42 };
      const to: gsap.TweenVars =
        v === "mask"
          ? { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.3, ease: "expo.out", clearProps: "clipPath" }
          : { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "expo.out" };
      ctx.add(() => gsap.fromTo(el, from, { ...to, delay, scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
    };
    const initStagger = (group: HTMLElement) => {
      if (group.dataset.revealInit) return;
      group.dataset.revealInit = "1";
      if (reduced) return;
      ctx.add(() => gsap.fromTo(Array.from(group.children), { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: group, start: "top 86%", once: true },
      }));
    };
    const initCount = (el: HTMLElement) => {
      if (el.dataset.revealInit) return;
      el.dataset.revealInit = "1";
      if (reduced) return;
      const end = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      const obj = { v: 0 };
      ctx.add(() => gsap.to(obj, {
        v: end, duration: 1.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${el.dataset.prefix || ""}${obj.v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${el.dataset.suffix || ""}`;
        },
      }));
    };
    const SEL = "[data-reveal]:not([data-reveal-init]),[data-reveal-stagger]:not([data-reveal-init]),[data-count]:not([data-reveal-init])";
    const scan = (root: ParentNode) => {
      const fresh = root.querySelectorAll<HTMLElement>(SEL);
      fresh.forEach((el) => {
        if (el.hasAttribute("data-reveal")) initReveal(el);
        else if (el.hasAttribute("data-reveal-stagger")) initStagger(el);
        else initCount(el);
      });
      return fresh.length;
    };

    // Clear init flags from a previous route so re-mounted nodes animate again.
    document.querySelectorAll<HTMLElement>("[data-reveal-init]").forEach((el) => delete el.dataset.revealInit);
    scan(document);
    let pending = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => { if (scan(document) > 0) ScrollTrigger.refresh(); });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      mo.disconnect();
      cancelAnimationFrame(pending);
      window.clearTimeout(id);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
