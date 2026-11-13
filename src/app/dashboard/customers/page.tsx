"use client";

import { Mail, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDemo } from "@/components/dashboard/DemoProvider";
import { PageTitle, Panel } from "@/components/dashboard/Shell";
import { StatusBadge } from "@/components/ui/Section";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const { customers, transactions, invoices, subscriptions } = useDemo();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(customers[0].id);

  const stats = useMemo(() => {
    const m = new Map<string, { spend: number; count: number; last: string }>();
    for (const t of transactions) {
      const s = m.get(t.customerId) ?? { spend: 0, count: 0, last: t.date };
      if (t.status === "succeeded") s.spend += t.amount;
      s.count += 1;
      if (t.date > s.last) s.last = t.date;
      m.set(t.customerId, s);
    }
    return m;
  }, [transactions]);

  const list = customers.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(q.toLowerCase()));
  const c = customers.find((x) => x.id === selected) ?? customers[0];
  const history = transactions.filter((t) => t.customerId === c.id).slice(0, 10);
  const st = stats.get(c.id);
  const sub = subscriptions.find((s) => s.customer === c.name);
  const custInvoices = invoices.filter((i) => i.customerId === c.id);

  return (
    <>
      <PageTitle title="Customers" description={`${customers.length} customers (demo data).`} />
      <div className="grid gap-3 xl:grid-cols-[1fr_1.15fr]">
        <Panel className="p-0">
          <label className="m-3 flex h-11 items-center gap-2 rounded-xl bg-mist px-3">
            <Search className="h-4 w-4 text-muted" /><span className="sr-only">Search customers</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email" className="w-full bg-transparent text-[14px] outline-none" />
          </label>
          <ul className="max-h-[640px] overflow-y-auto" data-lenis-prevent>
            {list.map((x) => {
              const s = stats.get(x.id);
              return (
                <li key={x.id}>
                  <button onClick={() => setSelected(x.id)} aria-current={x.id === c.id} className={cn("flex w-full items-center gap-3 border-t border-line px-4 py-3 text-left transition-colors", x.id === c.id ? "bg-ice/60" : "hover:bg-mist")}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fog text-[12px] font-semibold">{x.name.split(" ").map((p) => p[0]).join("")}</span>
                    <span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-medium">{x.name}</span><span className="block truncate text-[12px] text-muted">{x.email}</span></span>
                    <span className="text-right text-[13px] tabular-nums">{formatCurrency(s?.spend ?? 0, "USD", 0)}<span className="block text-[11px] text-muted">{s?.count ?? 0} payments</span></span>
                  </button>
                </li>
              );
            })}
            {list.length === 0 && <li className="p-8 text-center text-[14px] text-muted">No customers found.</li>}
          </ul>
        </Panel>

        <div className="space-y-3" aria-live="polite">
          <Panel>
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-electric text-[16px] font-semibold text-white">{c.name.split(" ").map((p) => p[0]).join("")}</span>
              <div className="flex-1">
                <h2 className="text-[20px] font-medium">{c.name}</h2>
                <p className="mt-1 flex flex-wrap gap-4 text-[13px] text-muted"><span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{c.email}</span><span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.country}</span></p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
              <div className="rounded-xl bg-mist p-3"><dt className="text-muted">Lifetime spend</dt><dd className="mt-1 text-[16px] font-medium tabular-nums">{formatCurrency(st?.spend ?? 0)}</dd></div>
              <div className="rounded-xl bg-mist p-3"><dt className="text-muted">Customer since</dt><dd className="mt-1 text-[16px] font-medium">{formatDate(c.since, { month: "short", year: "numeric" })}</dd></div>
              <div className="rounded-xl bg-mist p-3"><dt className="text-muted">Last payment</dt><dd className="mt-1 text-[16px] font-medium">{st ? formatDate(st.last) : "—"}</dd></div>
            </dl>
          </Panel>
          <Panel title="Billing information">
            <dl className="grid gap-3 text-[13px] sm:grid-cols-2">
              <div><dt className="text-muted">Default method</dt><dd className="mt-0.5 font-medium">{history[0] ? `${history[0].method}${history[0].card ? ` •••• ${history[0].card}` : ""}` : "None on file"}</dd></div>
              <div><dt className="text-muted">Subscription</dt><dd className="mt-0.5 font-medium">{sub ? `${sub.plan} · ${formatCurrency(sub.amount)}/${sub.interval}` : "No active subscription"}</dd></div>
              <div><dt className="text-muted">Open invoices</dt><dd className="mt-0.5 font-medium">{custInvoices.filter((i) => i.status !== "paid").length}</dd></div>
              <div><dt className="text-muted">Billing country</dt><dd className="mt-0.5 font-medium">{c.country}</dd></div>
            </dl>
          </Panel>
          <Panel title="Payment history">
            <ul className="divide-y divide-line text-[13px]">
              {history.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span><span className="block">{t.description}</span><span className="text-[12px] text-muted">{formatDate(t.date)} · {t.method}</span></span>
                  <span className="flex items-center gap-3"><StatusBadge status={t.status} /><span className="w-20 text-right tabular-nums">{formatCurrency(t.amount)}</span></span>
                </li>
              ))}
              {history.length === 0 && <li className="py-6 text-center text-muted">No payments yet.</li>}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
