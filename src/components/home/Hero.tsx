"use client";

import { Check, DollarSign } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/hooks";
import { images } from "@/lib/images";
import { ArrowPill } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";

/**
 * Pixel-faithful recreation of the reference hero. All desktop geometry is expressed in
 * percentages / container-query units of the hero itself, measured from the screenshot:
 *   headline   left 5.6%  top 17%   size ≈ 4.5cqw
 *   glass      left 35.8% top 23%   w 28.4% h 66%
 *   copy       left 67.7% top 79%   w 11.7%
 *   CTA        right 5.6% top 81%
 */
export function Hero() {
  const panel = useRef<HTMLDivElement>(null);

  const scope = useGsap<HTMLElement>(({ reduced }) => {
    if (reduced) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
    tl.fromTo("[data-hero-img]", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" })
      .fromTo("[data-hero-line] > span", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.09 }, 0.35)
      .fromTo("[data-hero-glass]", { opacity: 0, clipPath: "inset(100% 0% 0% 0% round 2.4cqw)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2.4cqw)", duration: 1.3, ease: "expo.inOut" }, 0.6)
      .fromTo("[data-hero-check]", { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)" }, 1.35)
      .fromTo("[data-hero-check] path", { strokeDashoffset: 24 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 1.5)
      .fromTo("[data-hero-toast]", { opacity: 0, y: 26, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 1.45)
      .fromTo("[data-hero-toast-glow]", { opacity: 0.9, scale: 0.6 }, { opacity: 0, scale: 1.35, duration: 1.4, ease: "power2.out" }, 1.7)
      .fromTo("[data-hero-copy]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1 }, 1.6)
      .fromTo("[data-hero-cta]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1 }, 1.72);

    // Gentle scroll parallax as the hero leaves the viewport.
    gsap.to("[data-hero-img]", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("[data-hero-glass]", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
    });
  });

  // Very small pointer parallax on the transaction panel.
  useEffect(() => {
    const el = panel.current;
    const host = scope.current;
    if (!el || !host || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      xTo(((e.clientX - r.left) / r.width - 0.5) * 14);
      yTo(((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    host.addEventListener("pointermove", move);
    return () => host.removeEventListener("pointermove", move);
  }, [scope]);

  return (
    <section
      ref={scope}
      data-hero
      data-cursor-tone="light"
      aria-labelledby="hero-title"
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#7b7a78] [container-type:inline-size] lg:h-auto lg:aspect-[1.565] lg:max-h-[calc(100svh-40px)] lg:min-h-[600px]"
    >
      {/* Photograph */}
      <div data-hero-img className="absolute inset-0 -z-10 will-change-transform">
        <SmartImage
          src={images.hero}
          alt="A customer holds a dark payment card to a handheld card terminal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_50%] lg:object-[50%_46%]"
        />
        {/* Tonal grade: neutral grey, slightly darker at the left for the headline */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,20,0.42)_0%,rgba(20,20,20,0.12)_42%,rgba(20,20,20,0.05)_70%,rgba(20,20,20,0.25)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,transparent_22%,transparent_70%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Headline */}
      <h1
        id="hero-title"
        className="absolute left-[6%] top-[19%] text-[12.2vw] font-[450] sm:text-[9vw] leading-[1.06] tracking-[-0.035em] text-white lg:left-[5.6%] lg:top-[16.5%] lg:text-[4.55cqw] lg:leading-[1.08]"
      >
        <span data-hero-line className="line-mask"><span>Scale Finance</span></span>
        <span data-hero-line className="line-mask"><span>With Smarter</span></span>
        <span data-hero-line className="line-mask"><span>Payments</span></span>
      </h1>

      {/* Floating translucent transaction panel */}
      <div
        ref={panel}
        className="absolute left-1/2 top-[44%] h-[34%] w-[70%] sm:top-[40%] sm:h-[40%] sm:w-[46%] -translate-x-1/2 lg:left-[35.8%] lg:top-[23%] lg:h-[66%] lg:w-[28.4%] lg:translate-x-0"
      >
        <div
          data-hero-glass
          className="glass absolute inset-0 rounded-[5vw] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_30px_80px_-40px_rgba(0,0,0,0.45)] lg:rounded-[2.4cqw]"
        >
          {/* verification badge */}
          <span
            data-hero-check
            className="absolute right-[4%] top-[3%] grid aspect-square w-[11%] min-w-6 place-items-center rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(0,0,0,0.25)] lg:w-[10%]"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]">
              <path d="M5 12.5 10 17 19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" />
            </svg>
          </span>

          {/* payment success toast */}
          <div
            data-hero-toast
            role="status"
            aria-label="Payment processed: Grocery Store, $36.17"
            className="absolute inset-x-[3.5%] bottom-[2.5%] flex items-center gap-[4%] overflow-hidden rounded-[3vw] bg-[linear-gradient(135deg,rgba(23,105,255,0.78),rgba(8,82,214,0.66))] px-[5%] py-[4.6%] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_30px_-12px_rgba(8,60,180,0.6)] backdrop-blur-md lg:rounded-[1.5cqw]"
          >
            <span data-hero-toast-glow aria-hidden className="absolute left-[10%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/40 blur-2xl" />
            <span className="relative grid aspect-square w-[15%] shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40">
              <DollarSign className="h-[55%] w-[55%]" strokeWidth={2.2} />
            </span>
            <span className="relative min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[3.4vw] font-medium sm:text-[2.2vw] lg:text-[max(0.8rem,1.12cqw)]">Grocery Store</span>
              <span className="mt-[2px] flex items-center gap-1 truncate text-[2.6vw] text-white/70 sm:text-[1.6vw] lg:text-[max(0.66rem,0.82cqw)]">
                <Check className="h-[1.1em] w-[1.1em]" aria-hidden /> Payment processed
              </span>
            </span>
            <span className="relative text-[3.8vw] font-medium tabular-nums sm:text-[2.4vw] lg:text-[max(0.9rem,1.35cqw)]">$36.17</span>
          </div>
        </div>
      </div>

      {/* Supporting copy */}
      <p
        data-hero-copy
        className="absolute bottom-[13%] left-[6%] max-w-[54%] text-[3.4vw] leading-snug text-white/90 sm:text-sm lg:bottom-auto lg:left-[67.7%] lg:top-[72%] lg:max-w-[22%] xl:top-[78.6%] xl:max-w-[13.5%] lg:text-[max(0.78rem,1.06cqw)] lg:leading-[1.38]"
      >
        Fast growing startups to global enterprises, our platform helps you accept payments your way.
      </p>

      {/* CTA */}
      <div data-hero-cta className="absolute bottom-[5.5%] left-[6%] lg:bottom-auto lg:left-[67.7%] lg:top-[88%] xl:left-auto xl:right-[5.6%] xl:top-[80.6%]">
        <ArrowPill href="/contact" tone="dark" className="h-11 text-[13px] lg:h-[max(2.6rem,3.75cqw)] lg:text-[max(0.8rem,1.05cqw)]" data-cursor="open">
          Talk to Sales
        </ArrowPill>
      </div>
    </section>
  );
}
