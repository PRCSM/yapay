"use client";

import { useEffect, useLayoutEffect, useRef, useState, type DependencyList, type RefObject } from "react";
import { gsap } from "./gsap";
import { prefersReducedMotion } from "./utils";

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scoped GSAP context. Every tween/ScrollTrigger created inside `setup` is
 * reverted on unmount or when deps change, so route changes never leak triggers.
 * `setup` receives `reduced` so callers can skip motion and show the end state.
 */
export function useGsap<T extends HTMLElement>(
  setup: (ctx: { reduced: boolean; scope: T }) => void | (() => void),
  deps: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T | null>(null);
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    const el = scope.current;
    let cleanup: void | (() => void) = undefined;
    const ctx = gsap.context(() => {
      cleanup = setup({ reduced: prefersReducedMotion(), scope: el });
    }, el);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/** Persist state in localStorage (demo data only — never secrets or card data). */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* storage unavailable — fall back to in-memory state */
    }
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [key, value, ready]);
  return [value, setValue, ready] as const;
}
