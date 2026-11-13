"use client";

import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDemo } from "@/components/dashboard/DemoProvider";
import { PageTitle } from "@/components/dashboard/Shell";
import { TransactionDrawer } from "@/components/dashboard/TransactionDrawer";
import { StatusBadge } from "@/components/ui/Section";
import { DAY, DEMO_TODAY, type Method, type Transaction, type TxStatus } from "@/lib/data/demo";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Select } from "@/components/forms/Field";
import { downloadCsv } from "@/lib/csv";

const PAGE = 15;

export default function TransactionsPage() {
  const { transactions } = useDemo();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TxStatus | "all">("all");
  const [method, setMethod] = useState<Method | "all">("all");
  const [range, setRange] = useState("30");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<Transaction | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const filtered = useMemo(() => {
    const from = new Date(DEMO_TODAY).getTime() - Number(range) * DAY;
    const needle = q.trim().toLowerCase();
    return transactions.filter((t) =>
      new Date(t.date).getTime() >= from &&
      (status === "all" || t.status === status) &&
      (method === "all" || t.method === method) &&
      (!needle || `${t.customer} ${t.email} ${t.id} ${t.description} ${t.amount}`.toLowerCase().includes(needle)));
  }, [transactions, q, status, method, range]);

  useEffect(() => setPage(0), [q, status, method, range]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const rows = filtered.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <>
      <PageTitle
        title="Transactions"
        description={`${filtered.length.toLocaleString("en-US")} payments match your filters (demo data).`}
        action={<button onClick={() => downloadCsv("yapay-transactions-demo.csv", filtered.map((t) => ({ id: t.id, date: t.date, customer: t.customer, email: t.email, method: t.method, status: t.status, amount: t.amount })))} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[13px] hover:border-ink"><Download className="h-3.5 w-3.5" /> Export CSV</button>}
      />
      <div className="grid gap-2 rounded-2xl bg-white p-3 ring-1 ring-line md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <label className="flex h-11 items-center gap-2 rounded-xl bg-mist px-3">
          <Search className="h-4 w-4 text-muted" /><span className="sr-only">Search transactions</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customer, email, ID or amount" className="w-full bg-transparent text-[14px] outline-none" />
        </label>
        <Select id="f-status" aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as TxStatus | "all")} className="h-11 rounded-xl text-[14px]">
          <option value="all">All statuses</option><option value="succeeded">Succeeded</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option>
        </Select>
        <Select id="f-method" aria-label="Method" value={method} onChange={(e) => setMethod(e.target.value as Method | "all")} className="h-11 rounded-xl text-[14px]">
          <option value="all">All methods</option>{["Card", "Wallet", "Bank transfer", "Payment link", "Tap to Pay"].map((m) => <option key={m}>{m}</option>)}
        </Select>
        <Select id="f-range" aria-label="Date range" value={range} onChange={(e) => setRange(e.target.value)} className="h-11 rounded-xl text-[14px]">
          <option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="180">Last 180 days</option>
        </Select>
      </div>
      <div className="mt-3 overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
        <table className="w-full min-w-[760px] whitespace-nowrap text-left text-[13px]">
          <caption className="sr-only">Transactions</caption>
          <thead className="text-[12px] text-muted"><tr>{["Amount", "Status", "Description", "Customer", "Method", "Date"].map((h) => <th key={h} className="px-5 py-3 font-normal">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} onClick={() => setOpen(t)} className="cursor-pointer border-t border-line hover:bg-mist">
                <td className="px-5 py-3 font-medium tabular-nums"><button onClick={() => setOpen(t)} className="text-left">{formatCurrency(t.amount)}</button></td>
                <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                <td className="px-5 py-3 text-muted">{t.description}</td>
                <td className="px-5 py-3"><span className="block">{t.customer}</span><span className="text-[12px] text-muted">{t.email}</span></td>
                <td className="px-5 py-3 text-muted">{t.method}</td>
                <td className="px-5 py-3 text-muted">{formatDate(t.date, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-16 text-center text-muted">No transactions match these filters.</td></tr>}
          </tbody>
        </table>
      </div>
      <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-[13px] text-muted">
        <span>Page {page + 1} of {pages}</span>
        <div className="flex gap-2">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Prev</button>
          <button disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 disabled:opacity-40">Next <ChevronRight className="h-4 w-4" /></button>
        </div>
      </nav>
      <TransactionDrawer tx={open} onClose={close} />
    </>
  );
}
