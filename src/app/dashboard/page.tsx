"use client";

import { ArrowUpRight, Bell } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AreaChart, RankedBars } from "@/components/charts/Charts";
import { useDemo } from "@/components/dashboard/DemoProvider";
import { Panel, PageTitle, RangePicker } from "@/components/dashboard/Shell";
import { TransactionDrawer } from "@/components/dashboard/TransactionDrawer";
import { StatusBadge } from "@/components/ui/Section";
import { DAY, DEMO_TODAY, dailySeries, summarize, type Transaction } from "@/lib/data/demo";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

const ranges = [{ id: "7d", label: "7D" }, { id: "30d", label: "30D" }, { id: "90d", label: "90D" }] as const;
type R = (typeof ranges)[number]["id"];

export default function DashboardHome() {
  const { transactions, activity, invoices } = useDemo();
  const [range, setRange] = useState<R>("30d");
  const [open, setOpen] = useState<Transaction | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const now = new Date(DEMO_TODAY).getTime();
  const s = useMemo(() => summarize(transactions, now - days * DAY, now), [transactions, days, now]);
  const series = useMemo(() => dailySeries(transactions, days).map((d) => ({ date: d.date, value: d.volume })), [transactions, days]);

  const kpis = [
    ["Total payment volume", formatCurrency(s.volume)],
    ["Transactions", formatNumber(s.count)],
    ["Successful", formatNumber(s.succeeded)],
    ["Pending", formatNumber(s.pending)],
    ["Refunds", formatCurrency(s.refunds)],
  ];
  const feed = [
    ...activity.map((a) => ({ text: a.text, at: a.at })),
    { text: `${invoices.filter((i) => i.status === "overdue").length} invoices are overdue`, at: new Date(now - 2 * 3600e3).toISOString() },
    { text: "Payout of $8,412.20 scheduled (simulated)", at: new Date(now - 20 * 3600e3).toISOString() },
    { text: "New payment method enabled: Tap to Pay", at: new Date(now - 3 * DAY).toISOString() },
  ].slice(0, 6);

  return (
    <>
      <PageTitle title="Overview" description="Demonstration data — no real payments are processed." action={<RangePicker value={range} onChange={setRange} options={[...ranges]} />} />
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {kpis.map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-line">
            <dt className="text-[12px] text-muted">{k}</dt>
            <dd className="mt-2 text-[20px] font-medium tabular-nums tracking-tight">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 grid gap-3 xl:grid-cols-[1.7fr_1fr]">
        <Panel title="Revenue" action={<span className="text-[12px] text-muted">Success rate {(s.successRate * 100).toFixed(1)}%</span>}>
          <AreaChart data={series} label={`Daily revenue, last ${days} days`} height={260} />
        </Panel>
        <Panel title="Payment methods"><RankedBars items={s.methods.map((m) => ({ label: m.method, value: m.value }))} /></Panel>
      </div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[1.7fr_1fr]">
        <Panel title="Recent transactions" action={<Link href="/dashboard/transactions" className="inline-flex items-center gap-1 text-[13px] text-electric">View all <ArrowUpRight className="h-3.5 w-3.5" /></Link>}>
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[560px] whitespace-nowrap text-left text-[13px]">
              <thead className="text-[12px] text-muted"><tr><th className="px-5 py-2 font-normal">Customer</th><th className="px-5 py-2 font-normal">Method</th><th className="px-5 py-2 font-normal">Status</th><th className="px-5 py-2 font-normal">Date</th><th className="px-5 py-2 text-right font-normal">Amount</th></tr></thead>
              <tbody>
                {transactions.slice(0, 7).map((t) => (
                  <tr key={t.id} onClick={() => setOpen(t)} className="cursor-pointer border-t border-line hover:bg-mist">
                    <td className="px-5 py-3"><button className="text-left font-medium" onClick={() => setOpen(t)}>{t.customer}</button></td>
                    <td className="px-5 py-3 text-muted">{t.method}</td>
                    <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-5 py-3 text-muted">{formatDate(t.date)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Account activity" action={<Bell className="h-4 w-4 text-muted" />}>
          <ul className="space-y-4">
            {feed.map((f, i) => (
              <li key={i} className="flex gap-3 text-[13px]">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-electric" />
                <span><span className="block">{f.text}</span><span className="text-[12px] text-muted">{formatDate(f.at, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span></span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <TransactionDrawer tx={open} onClose={close} />
    </>
  );
}
