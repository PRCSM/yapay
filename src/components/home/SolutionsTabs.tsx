"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { ProductVisual, type VisualKind } from "@/components/mockups/ProductVisual";

const tabs: { id: string; label: string; kind: VisualKind; title: string; body: string; stats: [string, string][]; href: string }[] = [
  { id: "online", label: "Online Payments", kind: "checkout", href: "/payments", title: "A checkout that feels native to your brand.", body: "Hosted or embedded checkout with cards, wallets and bank transfers — optimised for mobile and localised by default.", stats: [["Methods", "Cards · Wallets · Bank"], ["Setup", "Hosted or embedded"]] },
  { id: "in-person", label: "In-Person Payments", kind: "terminal", href: "/tap-to-pay", title: "Take payments at the counter or on the move.", body: "Tap to Pay on phones and handheld terminals share one ledger with your online sales.", stats: [["Hardware", "Phone or terminal"], ["Extras", "Tips · Receipts · Splits"]] },
  { id: "subscriptions", label: "Subscriptions", kind: "subscription", href: "/subscriptions", title: "Recurring revenue on autopilot.", body: "Plans, trials, proration and smart retries — with a customer portal that removes support tickets.", stats: [["Models", "Flat · Seats · Usage"], ["Recovery", "Configurable retries"]] },
  { id: "links", label: "Payment Links", kind: "link", href: "/payment-links", title: "Request money with a single link.", body: "Branded payment pages you can share in chat, email or as a QR code — no website needed.", stats: [["Share", "URL · QR · Email"], ["Amounts", "Fixed or flexible"]] },
  { id: "billing", label: "Billing", kind: "invoice", href: "/billing", title: "Invoices that chase themselves.", body: "Professional invoices with scheduled reminders and automatic reconciliation when payments land.", stats: [["Reminders", "Before & after due"], ["Export", "PDF · CSV"]] },
  { id: "reporting", label: "Reporting", kind: "analytics", href: "/analytics", title: "Know exactly where every dollar is.", body: "Volume, success rates, refunds and payout reconciliation in one clear view.", stats: [["Views", "Live dashboards"], ["Delivery", "Exports & schedules"]] },
];

export function SolutionsTabs() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Animated underline follows the active tab.
  useEffect(() => {
    const list = listRef.current;
    const btn = list?.querySelectorAll<HTMLButtonElement>("[role=tab]")[active];
    if (!btn || !indicator.current || !list) return;
    const vars = { x: btn.offsetLeft, width: btn.offsetWidth, duration: first.current || prefersReducedMotion() ? 0 : 0.6, ease: "expo.out" };
    gsap.to(indicator.current, vars);
    // Scroll only the tab strip horizontally — never the page.
    const target = btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2;
    if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: Math.max(0, target), behavior: first.current ? "auto" : "smooth" });
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      const btn = listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[active];
      if (btn && indicator.current) gsap.set(indicator.current, { x: btn.offsetLeft, width: btn.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  // Panel transition.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!panel.current || prefersReducedMotion()) return;
    gsap.fromTo(panel.current.querySelectorAll("[data-tab-anim]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "expo.out" });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % tabs.length);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + tabs.length) % tabs.length);
    if (e.key === "Home") setActive(0);
    if (e.key === "End") setActive(tabs.length - 1);
  };
  useEffect(() => {
    if (document.activeElement?.getAttribute("role") === "tab") listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[active]?.focus();
  }, [active]);

  const t = tabs[active];
  return (
    <section aria-labelledby="tabs-title" className="bg-paper py-28">
      <div className="container-site">
        <SectionHeading eyebrow="One platform, multiple solutions" title={<span id="tabs-title">Every way you get paid, in one place.</span>} description="Switch between products to see how each one works — they all share the same customers, data and reporting." />

        <div className="relative mt-12 border-b border-line">
          <div ref={listRef} role="tablist" aria-label="Yapay products" onKeyDown={onKey} className="no-scrollbar relative flex gap-1 overflow-x-auto" data-lenis-prevent-wheel>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${tab.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn("shrink-0 px-4 pb-4 pt-2 text-[14px] transition-colors", i === active ? "text-ink" : "text-muted hover:text-ink")}
              >
                {tab.label}
              </button>
            ))}
            <span ref={indicator} aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-electric" />
          </div>
        </div>

        <div
          ref={panel}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          className="mt-12 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <h3 data-tab-anim className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-[1.1] tracking-[-0.025em]">{t.title}</h3>
            <p data-tab-anim className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">{t.body}</p>
            <dl data-tab-anim className="mt-8 grid grid-cols-2 gap-4">
              {t.stats.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line p-4">
                  <dt className="text-[12px] text-muted">{k}</dt>
                  <dd className="mt-1 text-[14px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div data-tab-anim className="mt-8"><ArrowLink href={t.href}>Explore {t.label.toLowerCase()}</ArrowLink></div>
          </div>
          <div data-tab-anim className="rounded-[28px] bg-[linear-gradient(160deg,#f4f7ff,#eef1f6)] p-5 sm:p-10">
            <ProductVisual key={t.id} kind={t.kind} />
          </div>
        </div>
      </div>
    </section>
  );
}
