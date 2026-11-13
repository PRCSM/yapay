"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "./SmoothScroll";

/**
 * Narrow neutral track + electric-blue thumb, synced to Lenis (or native scroll).
 * Draggable, click-to-jump on the track. Pointer-fine devices only; touch keeps native bars.
 */
export function CustomScrollbar() {
  const lenis = useLenis();
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const set = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle("has-custom-scrollbar", mq.matches);
    };
    set();
    mq.addEventListener("change", set);
    return () => {
      mq.removeEventListener("change", set);
      document.documentElement.classList.remove("has-custom-scrollbar");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let idle: number | undefined;
    const update = () => {
      const t = track.current;
      const th = thumb.current;
      if (!t || !th) return;
      const docH = document.documentElement.scrollHeight;
      const viewH = window.innerHeight;
      const trackH = t.clientHeight;
      const ratio = Math.min(1, viewH / docH);
      const thumbH = Math.max(48, trackH * ratio);
      const max = docH - viewH;
      const progress = max > 0 ? window.scrollY / max : 0;
      th.style.height = `${thumbH}px`;
      th.style.transform = `translate3d(0, ${(trackH - thumbH) * progress}px, 0)`;
      t.style.opacity = ratio >= 1 ? "0" : "";
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
      setActive(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setActive(false), 900);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [enabled]);

  const scrollTo = (y: number, immediate = true) => {
    if (lenis) lenis.scrollTo(y, { immediate });
    else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
  };

  const onThumbDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY };
    document.body.style.userSelect = "none";
  };
  const onThumbMove = (e: React.PointerEvent) => {
    if (!drag.current || !track.current || !thumb.current) return;
    const docH = document.documentElement.scrollHeight;
    const max = docH - window.innerHeight;
    const travel = track.current.clientHeight - thumb.current.clientHeight;
    const delta = ((e.clientY - drag.current.startY) / travel) * max;
    scrollTo(Math.max(0, Math.min(max, drag.current.startScroll + delta)));
  };
  const onThumbUp = () => {
    drag.current = null;
    document.body.style.userSelect = "";
  };
  const onTrackDown = (e: React.PointerEvent) => {
    if (!track.current) return;
    const rect = track.current.getBoundingClientRect();
    const p = (e.clientY - rect.top) / rect.height;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollTo(p * max, false);
  };

  if (!enabled) return null;

  return (
    <div
      ref={track}
      aria-hidden="true"
      onPointerDown={onTrackDown}
      className={`group fixed right-1 top-2 bottom-2 z-[110] w-2.5 rounded-full transition-[opacity,background-color] duration-300 hover:bg-white/10 ${
        active ? "opacity-100" : "opacity-60 hover:opacity-100"
      }`}
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15" />
      <div
        ref={thumb}
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
        className="absolute left-1/2 top-0 w-1 -translate-x-1/2 cursor-grab rounded-full bg-electric shadow-[0_0_12px_rgba(8,102,249,0.6)] transition-[width] duration-200 group-hover:w-1.5 active:cursor-grabbing"
      />
    </div>
  );
}
