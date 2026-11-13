"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type CursorState = "default" | "explore" | "view" | "drag" | "open" | "hidden";
const LABELS: Partial<Record<CursorState, string>> = { explore: "Explore", view: "View", drag: "Drag", open: "Open" };

/**
 * Small premium cursor for fine pointers. Elements opt in with `data-cursor="view|explore|drag|open|hidden"`.
 * Interactive payment UI is left alone so the cursor never covers transaction content.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const set = () => setEnabled(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => setState("default"), [pathname]);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xDot(e.clientX); yDot(e.clientY); xRing(e.clientX); yRing(e.clientY);
      const target = e.target as HTMLElement | null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]");
      const next = (tagged?.dataset.cursor as CursorState) ?? "default";
      setState((s) => (s === next ? s : next));
      const dark = target?.closest("[data-cursor-tone='light']");
      setOnDark(Boolean(dark));
    };
    const leave = () => setState("hidden");
    const enter = () => setState("default");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;
  const label = LABELS[state];
  const big = Boolean(label);

  return (
    <div className="cursor-root" aria-hidden="true">
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-300 ease-[var(--ease-out-expo)]"
        style={{
          width: big ? 76 : 30,
          height: big ? 76 : 30,
          marginLeft: big ? -38 : -15,
          marginTop: big ? -38 : -15,
          background: big ? "rgba(8,102,249,0.92)" : "transparent",
          border: big ? "1px solid transparent" : `1px solid ${onDark ? "rgba(255,255,255,0.55)" : "rgba(9,9,9,0.35)"}`,
          opacity: state === "hidden" ? 0 : 1,
        }}
      >
        <span
          className="text-[11px] font-medium tracking-wide text-white transition-opacity duration-200"
          style={{ opacity: big ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full transition-opacity duration-200"
        style={{ background: onDark ? "#fff" : "#0866F9", opacity: big || state === "hidden" ? 0 : 1 }}
      />
    </div>
  );
}
