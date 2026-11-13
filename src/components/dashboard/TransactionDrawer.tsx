"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Transaction } from "@/lib/data/demo";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Section";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useDemo } from "./DemoProvider";

export function TransactionDrawer({ tx, onClose }: { tx: Transaction | null; onClose: () => void }) {
  const { refund, transactions } = useDemo();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [confirm, setConfirm] = useState(false);
  const current = tx ? transactions.find((t) => t.id === tx.id) ?? tx : null;

  useEffect(() => {
    setConfirm(false);
    if (!tx) return;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { lenis?.start(); window.removeEventListener("keydown", onKey); };
  }, [tx, onClose, lenis]);

  if (!current) return null;
  return (
    <div className="fixed inset-0 z-[95]" role="dialog" aria-modal="true" aria-labelledby="tx-title">
      <button aria-label="Close" className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div data-lenis-prevent className="absolute inset-y-2 right-2 flex w-[min(440px,calc(100%-1rem))] flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id="tx-title" className="text-[15px] font-medium">Payment details</h2>
          <button ref={closeRef} onClick={onClose} aria-label="Close details" className="grid h-8 w-8 place-items-center rounded-full hover:bg-fog"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-6">
          <p className="text-[13px] text-muted">{current.description}</p>
          <p className="mt-1 text-[34px] font-medium tabular-nums tracking-tight">{formatCurrency(current.amount)}</p>
          <div className="mt-2"><StatusBadge status={current.status} /></div>
          <dl className="mt-6 divide-y divide-line rounded-2xl ring-1 ring-line">
            {[
              ["Payment ID", current.id],
              ["Date", formatDate(current.date, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })],
              ["Customer", current.customer],
              ["Email", current.email],
              ["Method", current.method === "Card" || current.method === "Tap to Pay" ? `${current.method} •••• ${current.card}` : current.method],
              ["Illustrative fee", formatCurrency(Math.round((current.amount * 0.024 + 0.25) * 100) / 100)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-[13px]"><dt className="text-muted">{k}</dt><dd className="truncate text-right font-medium">{v}</dd></div>
            ))}
          </dl>
          <ol className="mt-6 space-y-3 text-[13px]">
            {["Payment created", "Risk check passed", current.status === "failed" ? "Declined by issuer" : current.status === "pending" ? "Awaiting confirmation" : "Payment succeeded", ...(current.status === "refunded" ? ["Refunded (simulated)"] : [])].map((s, i, a) => (
              <li key={s} className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${i === a.length - 1 ? "bg-electric" : "bg-line"}`} />{s}</li>
            ))}
          </ol>
          {current.status === "succeeded" && (
            <div className="mt-8">
              {confirm ? (
                <div className="rounded-2xl bg-mist p-4 text-[13px]">
                  <p>Refund {formatCurrency(current.amount)} to {current.customer}? This is simulated.</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => { refund(current.id); setConfirm(false); }} className="rounded-full bg-ink px-4 py-2 text-white">Confirm refund</button>
                    <button onClick={() => setConfirm(false)} className="rounded-full border border-line px-4 py-2">Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setConfirm(true)} className="w-full rounded-full border border-line py-3 text-[14px] font-medium hover:border-ink">Issue refund</button>
              )}
            </div>
          )}
          <p role="status" className="mt-4 text-[12px] text-muted">{current.status === "refunded" ? "Refund recorded in demo data. No money moved." : ""}</p>
        </div>
      </div>
    </div>
  );
}
