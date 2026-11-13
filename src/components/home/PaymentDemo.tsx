"use client";

import { Check, CreditCard, Landmark, Loader2, RotateCcw, ShieldCheck, Wallet } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn, formatCurrency, prefersReducedMotion } from "@/lib/utils";
import { DemoBadge, Eyebrow } from "@/components/ui/Section";

type Stage = "form" | "processing" | "success";
const methods = [
  { id: "card", label: "Card", detail: "Simulated test card •••• 4242", icon: CreditCard },
  { id: "wallet", label: "Digital wallet", detail: "Simulated wallet approval", icon: Wallet },
  { id: "bank", label: "Bank transfer", detail: "Simulated instant transfer", icon: Landmark },
] as const;
type MethodId = (typeof methods)[number]["id"];

/**
 * Fully simulated payment flow. It never asks for, reads or stores card details and
 * never contacts a payment provider. Clearly marked as a demonstration throughout.
 */
export function PaymentDemo() {
  const [amount, setAmount] = useState("36.17");
  const [method, setMethod] = useState<MethodId>("card");
  const [stage, setStage] = useState<Stage>("form");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{ id: string; time: string; fee: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const amountId = useId();

  const value = Number(amount);

  useEffect(() => {
    if (!stageRef.current || prefersReducedMotion()) return;
    gsap.fromTo(stageRef.current, { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out" });
    if (stage === "success") {
      gsap.fromTo(stageRef.current.querySelector("[data-check-path]"), { strokeDashoffset: 30 }, { strokeDashoffset: 0, duration: 0.7, delay: 0.2, ease: "power2.out" });
      gsap.fromTo(stageRef.current.querySelector("[data-ring]"), { scale: 0.6, opacity: 0.8 }, { scale: 1.8, opacity: 0, duration: 1.2, ease: "power2.out" });
    }
  }, [stage]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{1,5}(\.\d{1,2})?$/.test(amount) || value < 0.5 || value > 10000) {
      setError("Enter an amount between $0.50 and $10,000.00 (up to two decimals).");
      return;
    }
    setError("");
    setStage("processing");
    window.setTimeout(() => {
      setReceipt({
        id: `demo_${Math.random().toString(36).slice(2, 10)}`,
        time: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        fee: Math.round((value * 0.029 + 0.3) * 100) / 100,
      });
      setStage("success");
    }, 1800);
  };

  const reset = () => { setStage("form"); setReceipt(null); };
  const m = methods.find((x) => x.id === method)!;

  return (
    <section aria-labelledby="demo-title" className="bg-mist py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow>Payment experience</Eyebrow>
          <h2 id="demo-title" data-reveal className="text-h2 mt-5 max-w-[14ch]">Feel the checkout. Try it yourself.</h2>
          <p data-reveal data-reveal-delay="0.08" className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Enter an amount, pick a method and confirm. This interactive demo simulates the full flow —
            authorisation, confirmation and receipt — without collecting any payment details.
          </p>
          <ul className="mt-8 space-y-3 text-[14px]">
            {["No card numbers are requested or stored", "No connection to a payment provider", "Nothing is charged — ever"].map((x) => (
              <li key={x} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-ice text-electric"><Check className="h-3.5 w-3.5" /></span>{x}</li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(8,102,249,0.18),transparent)]" />
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_-50px_rgba(9,9,9,0.5)] ring-1 ring-black/[0.06]">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="text-[13px] font-medium">Grocery Store · Checkout</span>
              <DemoBadge>Simulation</DemoBadge>
            </div>
            <div ref={stageRef} className="p-6" aria-live="polite">
              {stage === "form" && (
                <form onSubmit={submit} noValidate>
                  <label htmlFor={amountId} className="text-[12px] font-medium text-muted">Amount (USD)</label>
                  <div className={cn("mt-2 flex h-16 items-center rounded-2xl border bg-mist px-4 focus-within:border-electric", error ? "border-danger" : "border-line")}>
                    <span className="text-[28px] font-medium text-muted">$</span>
                    <input
                      id={amountId}
                      inputMode="decimal"
                      autoComplete="off"
                      value={amount}
                      onChange={(e) => { setAmount(e.target.value.replace(/[^\d.]/g, "")); setError(""); }}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${amountId}-err` : undefined}
                      className="ml-1 w-full bg-transparent text-[28px] font-medium tabular-nums tracking-tight focus:outline-none"
                    />
                  </div>
                  {error && <p id={`${amountId}-err`} className="mt-2 text-[12px] text-danger">{error}</p>}
                  <div className="mt-3 flex gap-2">
                    {["12.65", "36.17", "149.00"].map((q) => (
                      <button key={q} type="button" onClick={() => { setAmount(q); setError(""); }} className="rounded-full border border-line px-3 py-1 text-[12px] hover:border-ink">${q}</button>
                    ))}
                  </div>

                  <fieldset className="mt-6">
                    <legend className="text-[12px] font-medium text-muted">Payment method</legend>
                    <div className="mt-2 space-y-2">
                      {methods.map((x) => (
                        <label key={x.id} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-colors", method === x.id ? "border-electric bg-ice/60" : "border-line hover:border-ink/30")}>
                          <input type="radio" name="demo-method" value={x.id} checked={method === x.id} onChange={() => setMethod(x.id)} className="sr-only" />
                          <span className={cn("grid h-9 w-9 place-items-center rounded-xl", method === x.id ? "bg-electric text-white" : "bg-fog text-ink")}><x.icon className="h-4 w-4" /></span>
                          <span className="flex-1">
                            <span className="block text-[14px] font-medium">{x.label}</span>
                            <span className="block text-[12px] text-muted">{x.detail}</span>
                          </span>
                          <span className={cn("h-4 w-4 rounded-full border-2", method === x.id ? "border-electric bg-electric shadow-[inset_0_0_0_2px_white]" : "border-line")} />
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <button type="submit" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-electric text-[14px] font-medium text-white transition-[background-color,transform] hover:bg-bright active:scale-[0.98]">
                    <ShieldCheck className="h-4 w-4" /> Confirm {Number.isFinite(value) && value > 0 ? formatCurrency(value) : ""}
                  </button>
                </form>
              )}

              {stage === "processing" && (
                <div className="flex flex-col items-center py-16 text-center" role="status">
                  <Loader2 className="h-10 w-10 animate-spin text-electric" />
                  <p className="mt-5 text-[15px] font-medium">Processing simulated payment…</p>
                  <p className="mt-1 text-[13px] text-muted">{m.label} · {formatCurrency(value)}</p>
                  <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-fog"><div className="h-full w-1/2 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-electric" /></div>
                </div>
              )}

              {stage === "success" && receipt && (
                <div className="text-center">
                  <div className="relative mx-auto mt-2 grid h-16 w-16 place-items-center">
                    <span data-ring className="absolute inset-0 rounded-full bg-electric/30" />
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-electric text-white shadow-[0_10px_30px_-8px_rgba(8,102,249,0.8)]">
                      <svg viewBox="0 0 24 24" className="h-8 w-8"><path data-check-path d="M5 12.5 10 17 19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" /></svg>
                    </span>
                  </div>
                  <p className="mt-5 text-[13px] text-muted">Payment processed (simulated)</p>
                  <p className="mt-1 text-[34px] font-medium tabular-nums tracking-tight">{formatCurrency(value)}</p>
                  <dl className="mt-6 space-y-2 rounded-2xl bg-mist p-4 text-left text-[13px]">
                    {[
                      ["Merchant", "Grocery Store"],
                      ["Method", m.label],
                      ["Reference", receipt.id],
                      ["Date", receipt.time],
                      ["Illustrative fee", formatCurrency(receipt.fee)],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4"><dt className="text-muted">{k}</dt><dd className="truncate font-medium tabular-nums">{v}</dd></div>
                    ))}
                  </dl>
                  <p className="mt-3 text-[11px] text-muted">Demo receipt — no money moved.</p>
                  <button onClick={reset} className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[14px] font-medium hover:border-ink">
                    <RotateCcw className="h-4 w-4" /> Start again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
