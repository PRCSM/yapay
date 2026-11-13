"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { Columns, RankedBars } from "@/components/charts/Charts";
import { useDemo } from "@/components/dashboard/DemoProvider";
import { PageTitle, Panel, RangePicker } from "@/components/dashboard/Shell";
import { DAY, DEMO_TODAY, dailySeries, summarize } from "@/lib/data/demo";
import { downloadCsv } from "@/lib/csv";
import { formatCurrency, formatNumber } from "@/lib/utils";

const ranges = [{ id: "30", label: "30D" }, { id: "90", label: "90D" }, { id: "180", label: "180D" }] as const;

export default function ReportsPage() {
  const { transactions } = useDemo();
  const [range, setRange] = useState<(typeof ranges)[number]["id"]>("90");
  const days = Number(range);
  const now = new Date(DEMO_TODAY).getTime();

  const { s, weekly, months } = useMemo(() => {
    const s = summarize(transactions, now - days * DAY, now);
    const daily = dailySeries(transactions, days);
    const weekly = [] as { date: string; value: number }[];
    for (let i = 0; i < daily.length; i += 7) weekly.push({ date: daily[i].date, value: daily.slice(i, i + 7).reduce((a, d) => a + d.volume, 0) });
    const mm = new Map<string, { gross: number; refunds: number; count: number; failed: number }>();
    for (const t of transactions) {
      if (new Date(t.date).getTime() < now - days * DAY) continue;
      const k = t.date.slice(0, 7);
      const m = mm.get(k) ?? { gross: 0, refunds: 0, count: 0, failed: 0 };
      m.count++;
      if (t.status === "succeeded") m.gross += t.amount;
      if (t.status === "refunded") m.refunds += t.amount;
      if (t.status === "failed") m.failed++;
      mm.set(k, m);
    }
    const months = [...mm.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1)).map(([k, v]) => ({ month: k, ...v, fees: v.gross * 0.024 + v.count * 0.25 }));
    return { s, weekly, months };
  }, [transactions, days, now]);

  return (
    <>
      <PageTitle
        title="Reports"
        description="Illustrative fees use the sample Starter rate. Demonstration data only."
        action={<div className="flex gap-2"><RangePicker value={range} onChange={setRange} options={[...ranges]} />
          <button onClick={() => downloadCsv(`yapay-report-${range}d-demo.csv`, months.map((m) => ({ month: m.month, gross: m.gross.toFixed(2), refunds: m.refunds.toFixed(2), illustrative_fees: m.fees.toFixed(2), net: (m.gross - m.refunds - m.fees).toFixed(2), payments: m.count, failed: m.failed })))} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[13px] hover:border-ink"><Download className="h-3.5 w-3.5" /> Export</button></div>}
      />
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[["Gross volume", formatCurrency(s.volume)], ["Refunded", formatCurrency(s.refunds)], ["Success rate", `${(s.successRate * 100).toFixed(1)}%`], ["Failed payments", formatNumber(s.failed)]].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-line"><dt className="text-[12px] text-muted">{k}</dt><dd className="mt-2 text-[20px] font-medium tabular-nums">{v}</dd></div>
        ))}
      </dl>
      <div className="mt-3 grid gap-3 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Weekly gross volume"><Columns data={weekly} label="Weekly gross volume (demo data)" height={220} /></Panel>
        <Panel title="Volume by payment method"><RankedBars items={s.methods.map((m) => ({ label: m.method, value: m.value }))} /></Panel>
      </div>
      <Panel title="Monthly summary" className="mt-3">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full min-w-[680px] whitespace-nowrap text-left text-[13px]">
            <thead className="text-[12px] text-muted"><tr>{["Month", "Payments", "Failed", "Gross", "Refunds", "Illustrative fees", "Net"].map((h, i) => <th key={h} className={`px-5 py-2 font-normal ${i > 2 ? "text-right" : ""}`}>{h}</th>)}</tr></thead>
            <tbody>
              {months.map((m) => (
                <tr key={m.month} className="border-t border-line">
                  <td className="px-5 py-3 font-medium">{new Date(m.month + "-01T00:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</td>
                  <td className="px-5 py-3">{m.count}</td>
                  <td className="px-5 py-3">{m.failed}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatCurrency(m.gross)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatCurrency(m.refunds)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatCurrency(m.fees)}</td>
                  <td className="px-5 py-3 text-right font-medium tabular-nums">{formatCurrency(m.gross - m.refunds - m.fees)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
