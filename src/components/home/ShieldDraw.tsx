"use client";

import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/hooks";

/** Animated shield: outline draws in on scroll, checkmark follows, then a slow scanning pulse. */
export function ShieldDraw() {
  const ref = useGsap<HTMLDivElement>(({ reduced, scope }) => {
    if (reduced) return;
    const paths = scope.querySelectorAll<SVGPathElement>("[data-draw]");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    const tl = gsap.timeline({ scrollTrigger: { trigger: scope, start: "top 85%", once: true } });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.25 })
      .fromTo("[data-scan]", { attr: { y: 14 } }, { attr: { y: 86 }, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true }, 0.8);
  });
  return (
    <div ref={ref} className="mt-10 flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
        <defs>
          <clipPath id="shield-clip"><path d="M50 8 84 20v28c0 22-15 37-34 44C31 85 16 70 16 48V20Z" /></clipPath>
        </defs>
        <path d="M50 8 84 20v28c0 22-15 37-34 44C31 85 16 70 16 48V20Z" fill="rgba(8,102,249,0.12)" />
        <g clipPath="url(#shield-clip)">
          <rect data-scan x="0" y="14" width="100" height="2" fill="#6aa3ff" opacity="0.7" />
        </g>
        <path data-draw d="M50 8 84 20v28c0 22-15 37-34 44C31 85 16 70 16 48V20Z" fill="none" stroke="#6aa3ff" strokeWidth="2" strokeLinejoin="round" />
        <path data-draw d="M35 50 46 60 66 39" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="text-[13px] leading-relaxed text-white/60">
        <div className="font-medium text-white">Every payment, screened</div>
        Risk checks run before authorisation.
      </div>
    </div>
  );
}
