"use client";

import { useId, useState } from "react";
import { plans } from "@/lib/data/pricing";
import { cn, formatCurrency } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/Section";

/** Sample fee estimator. Uses the illustrative plan rates — not real fees. */
export function FeeEstimator() {
  const [volume, setVolume] = useState(25000);
  const [avg, setAvg] = useState(40);
  const id = useId();
  const count = Math.max(1, Math.round(volume / Math.max(1, avg)));
  const rows = plans.filter((p) => p.rate).map((p) => {
    const fees = volume * (p.rate!.pct / 100) + count * p.rate!.fixed + (p.id === "growth" ? 49 : 0);
    return { name: p.name, fees, effective: (fees / volume) * 100 };
  });
  const best = rows.reduce((a, b) => (a.fees <= b.fees ? a : b));
  return (
    <div className="rounded-[28px] bg-charcoal p-6 text-white sm:p-10" data-cursor-tone="light">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-h3">Estimate your monthly fees</h2>
        <DemoBadge tone="light">Sample rates</DemoBadge>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${id}-v`} className="text-[13px] text-white/60">Monthly card volume</label>
              <output htmlFor={`${id}-v`} className="text-[20px] font-medium tabular-nums">{formatCurrency(volume, "USD", 0)}</output>
            </div>
            <input id={`${id}-v`} type="range" min={1000} max={500000} step={1000} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="mt-3 w-full accent-[#0866F9]" />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${id}-a`} className="text-[13px] text-white/60">Average transaction</label>
              <output htmlFor={`${id}-a`} className="text-[20px] font-medium tabular-nums">{formatCurrency(avg, "USD", 0)}</output>
            </div>
            <input id={`${id}-a`} type="range" min={5} max={500} step={5} value={avg} onChange={(e) => setAvg(Number(e.target.value))} className="mt-3 w-full accent-[#0866F9]" />
          </div>
          <p className="text-[13px] text-white/50">≈ {count.toLocaleString("en-US")} transactions / month</p>
        </div>
        <ul className="space-y-3" aria-live="polite">
          {rows.map((r) => (
            <li key={r.name} className={cn("flex items-center justify-between rounded-2xl p-5 ring-1", r.name === best.name ? "bg-electric ring-electric" : "bg-white/[0.04] ring-white/10")}>
              <span>
                <span className="block text-[15px] font-medium">{r.name}{r.name === best.name && <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[11px]">Lowest</span>}</span>
                <span className="text-[12px] text-white/60">Effective rate {r.effective.toFixed(2)}%</span>
              </span>
              <span className="text-[22px] font-medium tabular-nums">{formatCurrency(r.fees)}</span>
            </li>
          ))}
          <li className="rounded-2xl bg-white/[0.04] p-5 text-[13px] text-white/60 ring-1 ring-white/10">
            Processing more than {formatCurrency(1_000_000, "USD", 0)} a month? Enterprise pricing is quoted individually.
          </li>
        </ul>
      </div>
    </div>
  );
}
