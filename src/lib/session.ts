"use client";

import { useEffect, useState } from "react";

/**
 * DEMO session only. Stores a display name/email in localStorage so the merchant dashboard can
 * greet the user. Passwords are never stored. Replace with a real auth provider (server-side
 * sessions, httpOnly cookies) before handling any real accounts.
 */
export type DemoSession = { name: string; email: string; company: string };
const KEY = "yapay-demo-session";

export function saveSession(s: DemoSession) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); window.dispatchEvent(new Event("yapay-session")); } catch { /* ignore */ }
}
export function clearSession() {
  try { localStorage.removeItem(KEY); window.dispatchEvent(new Event("yapay-session")); } catch { /* ignore */ }
}
export function useSession() {
  const [s, setS] = useState<DemoSession | null>(null);
  useEffect(() => {
    const read = () => { try { const r = localStorage.getItem(KEY); setS(r ? JSON.parse(r) : null); } catch { setS(null); } };
    read();
    window.addEventListener("yapay-session", read);
    window.addEventListener("storage", read);
    return () => { window.removeEventListener("yapay-session", read); window.removeEventListener("storage", read); };
  }, []);
  return s;
}
