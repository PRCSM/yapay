"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { AreaChart, RankedBars } from "@/components/charts/Charts";
import { DAY, DEMO_TODAY, dailySeries, seed, summarize } from "@/lib/data/demo";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { DemoBadge, SectionHeading, StatusBadge } from "@/components/ui/Section";

const ranges = [
  { id: "7d", label: "7D", days: 7 },
  { id: "30d", label: "30D", days: 30 },
  { id: "90d", label: "90D", days: 90 },
] as const;

/** Analytics dashboard preview driven by deterministic demo data; date filter recalculates everything. */
export function Intelligence() {
  const [range, setRange] = useState<(typeof ranges)[number]["id"]>("30d");
  const days = ranges.find((r) => r.id === range)!.days;
  const now = new Date(DEMO_TODAY).getTime();

  const { cur, prev, series } = useMemo(() => ({
    cur: summarize(seed.transactions, now - days * DAY, now),
    prev: summarize(seed.transactions, now - 2 * days * DAY, now - days * DAY),
    series: dailySeries(seed.transactions, days).map((d) => ({ date: d.date, value: d.volume })),
  }), [days, now]);

  const delta = (a: number, b: number) => (b ? ((a - b) / b) * 100 : 0);
  const kpis = [
    { label: "Payment volume", value: formatCurrency(cur.volume, "USD", 0), d: delta(cur.volume, prev.volume) },
    { label: "Successful payments", value: formatNumber(cur.succeeded), d: delta(cur.succeeded, prev.succeeded) },
    { label: "Success rate", value: `${(cur.successRate * 100).toFixed(1)}%`, d: (cur.successRate - prev.successRate) * 100 },
    { label: "Refunds", value: formatCurrency(cur.refunds, "USD", 0), d: delta(cur.refunds, prev.refunds), invert: true },
  ];
  const recent = seed.transactions.slice(0, 5);

  return (
    <section aria-labelledby="intel-title" className="bg-charcoal py-28 text-white" data-cursor-tone="light">
      <div className="container-site">
        <SectionHeading tone="light" eyebrow="Financial intelligence" title={<span id="intel-title">Your payments, beautifully understood.</span>} description="Volume, success rates, refunds and payment-method mix — updating as you change the period." />

        <div data-reveal="scale" className="mt-14 rounded-[28px] border border-white/10 bg-[#101010] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium">Overview</span>
              <DemoBadge tone="light">Demonstration data</DemoBadge>
            </div>
            <div role="group" aria-label="Date range" className="flex rounded-full bg-white/[0.06] p-1">
              {ranges.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRange(r.id)}
                  aria-pressed={range === r.id}
                  className={cn("rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors", range === r.id ? "bg-white text-ink" : "text-white/60 hover:text-white")}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((k) => {
              const good = k.invert ? k.d <= 0 : k.d >= 0;
              return (
                <div key={k.label} className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
                  <dt className="text-[12px] text-white/50">{k.label}</dt>
                  <dd className="mt-2 text-[clamp(1.2rem,2vw,1.6rem)] font-medium tabular-nums tracking-tight">{k.value}</dd>
                  <dd className={cn("mt-1 inline-flex items-center gap-1 text-[12px]", good ? "text-[#5fd68f]" : "text-[#ff8a8a]")}>
                    {k.d >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {Math.abs(k.d).toFixed(1)}{k.label === "Success rate" ? " pts" : "%"} <span className="text-white/40">vs prior</span>
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
              <div className="mb-2 text-[13px] text-white/70">Revenue trend · daily gross volume</div>
              <AreaChart data={series} tone="dark" label={`Daily gross volume, last ${days} days (demo data)`} height={250} />
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.06]">
              <div className="mb-4 text-[13px] text-white/70">Payment methods</div>
              <RankedBars tone="dark" items={cur.methods.map((m) => ({ label: m.method, value: m.value }))} />
            </div>
          </div>

          <div className="mt-3 overflow-x-auto rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
            <table className="w-full min-w-[620px] text-left text-[13px]">
              <caption className="px-4 pt-4 text-left text-[13px] text-white/70">Recent transactions</caption>
              <thead className="text-[12px] text-white/40">
                <tr><th className="px-4 py-3 font-normal">Customer</th><th className="px-4 py-3 font-normal">Method</th><th className="px-4 py-3 font-normal">Date</th><th className="px-4 py-3 font-normal">Status</th><th className="px-4 py-3 text-right font-normal">Amount</th></tr>
              </thead>
              <tbody>
                {recent.map((t) => (
                  <tr key={t.id} className="border-t border-white/[0.06]">
                    <td className="px-4 py-3">{t.customer}</td>
                    <td className="px-4 py-3 text-white/60">{t.method}</td>
                    <td className="px-4 py-3 text-white/60">{formatDate(t.date)}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
