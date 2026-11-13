"use client";

import {
  ArrowLeftRight, Banknote, CalendarClock, CreditCard, Globe, Landmark, Link2, QrCode, Repeat, Smartphone, Wallet, Zap,
} from "lucide-react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Tile = { label: string; mark: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; tone: "white" | "blue" };

/** Illustrative payment-rail tiles — generic categories, not real provider logos. */
const tiles: Tile[] = [
  { label: "Card networks", mark: "cardnet", icon: CreditCard, tone: "white" },
  { label: "Recurring billing", mark: "recurly·", icon: Repeat, tone: "white" },
  { label: "Payment links", mark: "linkpay", icon: Link2, tone: "blue" },
  { label: "Instant payouts", mark: "PAYOUT", icon: Zap, tone: "white" },
  { label: "Digital wallets", mark: "walletly", icon: Wallet, tone: "white" },
  { label: "Bank transfers", mark: "BANKRAIL", icon: Landmark, tone: "white" },
  { label: "Interbank network", mark: "◎◎", icon: ArrowLeftRight, tone: "blue" },
  { label: "Local methods", mark: "locopay", icon: Banknote, tone: "white" },
  { label: "International payments", mark: "globex", icon: Globe, tone: "blue" },
  { label: "Contactless", mark: "tapwave", icon: Smartphone, tone: "white" },
  { label: "QR payments", mark: "qr·code", icon: QrCode, tone: "white" },
  { label: "Instalments", mark: "LATERLY", icon: CalendarClock, tone: "blue" },
];

const COLS = 4;

export function GatewayPanel() {
  const field = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  const scope = useGsap<HTMLDivElement>(({ reduced, scope: el }) => {
    const tileEls = gsap.utils.toArray<HTMLElement>("[data-tile]", el);
    // Hand the SSR transform over to GSAP so pointer tilt composes cleanly.
    gsap.set(field.current, { rotationX: 54, rotationZ: -38 });
    if (reduced) return;
    gsap.fromTo(
      tileEls,
      { opacity: 0, z: -120, y: 40 },
      {
        opacity: 1, z: 0, y: 0, duration: 1.2, ease: "expo.out",
        stagger: { each: 0.05, from: "end" },
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      },
    );
    gsap.fromTo("[data-gw-copy] > *", { opacity: 0, y: 26 }, {
      opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 70%", once: true },
    });
    // Subtle drift while scrolling past.
    gsap.fromTo(field.current, { yPercent: 6 }, {
      yPercent: -6, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });

    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rx = gsap.quickTo(field.current, "rotationX", { duration: 1, ease: "power3" });
    const rz = gsap.quickTo(field.current, "rotationZ", { duration: 1, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(54 + py * -6);
      rz(-38 + px * 5);
      if (glow.current) {
        glow.current.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        glow.current.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      }
    };
    const leave = () => { rx(54); rz(-38); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });

  const lift = (index: number, on: boolean) => {
    const el = scope.current;
    if (!el) return;
    const all = gsap.utils.toArray<HTMLElement>("[data-tile]", el);
    const r = Math.floor(index / COLS);
    const c = index % COLS;
    all.forEach((t, i) => {
      const tr = Math.floor(i / COLS);
      const tc = i % COLS;
      const isSelf = i === index;
      const near = Math.abs(tr - r) <= 1 && Math.abs(tc - c) <= 1 && !isSelf;
      gsap.to(t, {
        z: on ? (isSelf ? 34 : near ? 6 : 0) : 0,
        x: on && near ? (tc - c) * 6 : 0,
        y: on && near ? (tr - r) * 6 : 0,
        duration: 0.6,
        ease: "expo.out",
        overwrite: "auto",
      });
      t.style.boxShadow = on && isSelf ? "0 40px 60px -20px rgba(0,16,70,0.65)" : "";
    });
  };

  return (
    <div
      ref={scope}
      data-reveal="mask"
      data-cursor="explore"
      data-cursor-tone="light"
      className="relative isolate h-[440px] overflow-hidden rounded-[22px] bg-electric sm:h-[400px] md:aspect-[2.42] md:h-auto"
    >
      {/* pointer glow */}
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_var(--gx,70%)_var(--gy,30%),rgba(255,255,255,0.22),transparent_70%)] transition-[background] duration-300"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_45%,rgba(0,40,140,0.35)_100%)]" />

      {/* Isometric tile field */}
      <div className="absolute -right-[18%] -top-[42%] h-[150%] w-[105%] [perspective:1800px] sm:-right-[6%] md:-top-[58%] md:right-[-8%] md:w-[82%]">
        <div
          ref={field}
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: "rotateX(54deg) rotateZ(-38deg)" }}
        >
          {/* dashed rails */}
          <div aria-hidden className="absolute inset-[-10%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.22)_0_8px,transparent_8px_16px)] [mask-image:repeating-linear-gradient(0deg,#000_0_1px,transparent_1px_25%)] opacity-60" />
          <ul className="absolute inset-0 grid grid-cols-4 gap-[2.2%] p-[3%] [transform-style:preserve-3d]" aria-label="Supported payment categories (illustrative)">
            {tiles.map((t, i) => (
              <li
                key={t.label}
                data-tile
                onPointerEnter={() => lift(i, true)}
                onPointerLeave={() => lift(i, false)}
                className={cn(
                  "group/tile relative flex aspect-[1.45] items-center justify-center rounded-[14%/22%] transition-shadow duration-500 [transform-style:preserve-3d]",
                  t.tone === "white"
                    ? "bg-white text-ink shadow-[0_18px_30px_-16px_rgba(0,20,80,0.55)]"
                    : "bg-[rgba(255,255,255,0.14)] text-white ring-1 ring-white/25 shadow-[0_18px_30px_-16px_rgba(0,20,80,0.45)] backdrop-blur-sm",
                )}
              >
                <span className="flex items-center gap-[0.35em] text-[clamp(0.7rem,1.3vw,1.05rem)] font-bold tracking-tight">
                  <t.icon className="h-[1.25em] w-[1.25em]" strokeWidth={2.4} />
                  {t.mark}
                </span>
                <span className="sr-only">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div data-gw-copy className="absolute bottom-[9%] left-[5%] max-w-[340px] text-white md:left-[3.2%]">
        <h3 className="text-[clamp(1.5rem,2.1vw,2.05rem)] font-[450] leading-[1.12] tracking-[-0.02em]">
          Payment
          <br />
          Solutions Across
          <br />
          Various Gateways
        </h3>
        <p className="mt-3 max-w-[270px] text-[13px] leading-snug text-white/80">
          Integrating seamless online payment options that simplify transactions for your customers.
        </p>
      </div>
    </div>
  );
}
