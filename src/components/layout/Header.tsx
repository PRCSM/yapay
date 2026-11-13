"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { mainNav } from "@/lib/nav";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "@/components/ui/Magnetic";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Transparent, compact navigation that sits over every page hero. After scrolling past the hero
 * it condenses into a floating dark-glass bar so it stays legible on white sections.
 */
export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    if (open && mobileRef.current && !prefersReducedMotion()) {
      gsap.fromTo(mobileRef.current.querySelectorAll("[data-m-item]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "expo.out" });
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setMenu(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        data-cursor-tone="light"
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-transform duration-500 ease-[var(--ease-out-expo)]",
          hidden && !open && !menu ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="px-3 pt-3 md:px-5 md:pt-5">
          <div
            className={cn(
              "relative mx-auto flex h-14 items-center justify-between rounded-full transition-[background-color,box-shadow,max-width,padding,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]",
              scrolled
                ? "max-w-[1180px] bg-[rgba(14,14,14,0.72)] px-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-5"
                : "mt-2 max-w-none bg-transparent px-[6%] md:mt-5 md:px-[5.6%]",
            )}
          >
            <Logo />
            <nav aria-label="Primary" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block" onMouseLeave={() => setMenu(null)}>
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => {
                  const active = pathname === item.href || item.children?.some((c) => pathname.startsWith(c.href));
                  return (
                    <li key={item.label} className="relative" onMouseEnter={() => setMenu(item.children ? item.label : null)}>
                      <Link
                        href={item.href}
                        aria-expanded={item.children ? menu === item.label : undefined}
                        onFocus={() => setMenu(item.children ? item.label : null)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-[1.05rem] py-2 text-[13px] text-white/85 transition-colors hover:text-white",
                          active && "text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div
                          className={cn(
                            "absolute left-1/2 top-full w-[360px] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
                            menu === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
                          )}
                        >
                          <ul className="grid gap-0.5 rounded-2xl border border-white/10 bg-[rgba(16,16,16,0.94)] p-2 shadow-2xl backdrop-blur-xl">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="group/m flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]">
                                  <span>
                                    <span className="block text-[13px] font-medium text-white">{c.label}</span>
                                    <span className="block text-[12px] text-white/50">{c.description}</span>
                                  </span>
                                  <span className="h-1.5 w-1.5 rounded-full bg-electric opacity-0 transition-opacity group-hover/m:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden h-8 items-center rounded-full border border-white/35 px-4 text-[13px] text-white transition-colors hover:border-white hover:bg-white/10 sm:inline-flex">
                Login
              </Link>
              <Magnetic>
                <Link href="/signup" className="inline-flex h-8 items-center rounded-full bg-electric px-4 text-[13px] font-medium text-white shadow-[0_6px_20px_-8px_rgba(8,102,249,0.9)] transition-colors hover:bg-bright">
                  Signup
                </Link>
              </Magnetic>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={mobileRef}
        data-lenis-prevent
        className={cn(
          "fixed inset-0 z-[85] overflow-y-auto bg-charcoal px-6 pb-10 pt-28 transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.label} data-m-item className="border-b border-white/10 py-3">
                <Link href={item.href} className="text-3xl font-medium tracking-tight text-white" tabIndex={open ? 0 : -1}>
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="text-sm text-white/60 hover:text-white" tabIndex={open ? 0 : -1}>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div data-m-item className="mt-8 flex gap-3">
            <Link href="/login" className="flex h-11 flex-1 items-center justify-center rounded-full border border-white/30 text-sm text-white" tabIndex={open ? 0 : -1}>Login</Link>
            <Link href="/signup" className="flex h-11 flex-1 items-center justify-center rounded-full bg-electric text-sm font-medium text-white" tabIndex={open ? 0 : -1}>Signup</Link>
          </div>
        </nav>
      </div>
    </>
  );
}
