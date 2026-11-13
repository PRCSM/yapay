"use client";

import { Check, Copy, Plus } from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/components/dashboard/DemoProvider";
import { PageTitle, Panel } from "@/components/dashboard/Shell";
import { Field, Input, Select } from "@/components/forms/Field";
import { StatusBadge } from "@/components/ui/Section";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const tabs = ["Invoices", "Subscriptions", "Payment links"] as const;

export default function BillingPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Invoices");
  return (
    <>
      <PageTitle title="Billing" description="Invoices, subscriptions and payment links — all simulated." />
      <div role="tablist" aria-label="Billing sections" className="mb-4 flex gap-1 rounded-full bg-white p-1 ring-1 ring-line sm:inline-flex">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("flex-1 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors", tab === t ? "bg-ink text-white" : "text-muted hover:text-ink")}>{t}</button>
        ))}
      </div>
      <div role="tabpanel">
        {tab === "Invoices" && <Invoices />}
        {tab === "Subscriptions" && <Subscriptions />}
        {tab === "Payment links" && <Links />}
      </div>
    </>
  );
}

function Invoices() {
  const { invoices, customers, createInvoice, markInvoicePaid } = useDemo();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"all" | "open" | "paid" | "overdue" | "draft">("all");
  const list = invoices.filter((i) => filter === "all" || i.status === filter);
  const outstanding = invoices.filter((i) => i.status === "open" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const customerId = String(fd.get("customer") ?? "");
    const amount = Number(fd.get("amount"));
    const errs: Record<string, string> = {};
    if (!customers.some((c) => c.id === customerId)) errs.customer = "Choose a customer.";
    if (!Number.isFinite(amount) || amount < 1 || amount > 100000) errs.amount = "Enter an amount between $1 and $100,000.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const c = customers.find((x) => x.id === customerId)!;
    createInvoice({ customerId, customer: c.name, amount: Math.round(amount * 100) / 100 });
    e.currentTarget.reset();
  };

  return (
    <div className="grid gap-3 2xl:grid-cols-[1.6fr_1fr]">
      <Panel title={`Invoices · ${formatCurrency(outstanding)} outstanding`} action={
        <div className="w-36 shrink-0"><Select id="inv-filter" aria-label="Filter invoices" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="h-9 rounded-full text-[13px]">
          <option value="all">All</option><option value="open">Open</option><option value="overdue">Overdue</option><option value="paid">Paid</option><option value="draft">Draft</option>
        </Select></div>
      }>
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full min-w-[680px] whitespace-nowrap text-left text-[13px]">
            <thead className="text-[12px] text-muted"><tr>{["Invoice", "Customer", "Issued", "Due", "Status", "Amount", ""].map((h) => <th key={h} className="px-5 py-2 font-normal">{h}</th>)}</tr></thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id} className="border-t border-line">
                  <td className="px-5 py-3 font-mono">{i.number}</td>
                  <td className="px-5 py-3">{i.customer}</td>
                  <td className="px-5 py-3 text-muted">{formatDate(i.issued)}</td>
                  <td className="px-5 py-3 text-muted">{formatDate(i.due)}</td>
                  <td className="px-5 py-3"><StatusBadge status={i.status} /></td>
                  <td className="px-5 py-3 tabular-nums">{formatCurrency(i.amount)}</td>
                  <td className="px-5 py-3 text-right">
                    {(i.status === "open" || i.status === "overdue") && <button onClick={() => markInvoicePaid(i.id)} className="rounded-full border border-line px-3 py-1 text-[12px] hover:border-ink">Mark paid</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel title="New invoice">
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Customer" id="inv-customer" error={errors.customer}>
            <Select id="inv-customer" name="customer" defaultValue="" error={errors.customer}>
              <option value="" disabled>Select a customer…</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>
          <Field label="Amount (USD)" id="inv-amount" error={errors.amount}><Input id="inv-amount" name="amount" type="number" min={1} step="0.01" inputMode="decimal" error={errors.amount} /></Field>
          <button type="submit" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-electric text-[14px] font-medium text-white hover:bg-bright"><Plus className="h-4 w-4" /> Create & send (simulated)</button>
          <p className="text-[12px] text-muted">The invoice is added to your demo data. No email is sent.</p>
        </form>
      </Panel>
    </div>
  );
}

function Subscriptions() {
  const { subscriptions, toggleSubscription } = useDemo();
  const mrr = subscriptions.filter((s) => s.status === "active").reduce((a, s) => a + (s.interval === "year" ? s.amount / 12 : s.amount), 0);
  return (
    <Panel title={`Subscriptions · MRR ${formatCurrency(mrr)}`}>
      <div className="-mx-5 overflow-x-auto">
        <table className="w-full min-w-[680px] whitespace-nowrap text-left text-[13px]">
          <thead className="text-[12px] text-muted"><tr>{["Customer", "Plan", "Price", "Status", "Next renewal", ""].map((h) => <th key={h} className="px-5 py-2 font-normal">{h}</th>)}</tr></thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.id} className="border-t border-line">
                <td className="px-5 py-3">{s.customer}</td>
                <td className="px-5 py-3">{s.plan}</td>
                <td className="px-5 py-3 tabular-nums">{formatCurrency(s.amount)}/{s.interval}</td>
                <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-5 py-3 text-muted">{s.status === "active" ? formatDate(s.renews) : "—"}</td>
                <td className="px-5 py-3 text-right">{s.status !== "canceled" && <button onClick={() => toggleSubscription(s.id)} className="rounded-full border border-line px-3 py-1 text-[12px] hover:border-ink">{s.status === "active" ? "Pause" : "Resume"}</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function Links() {
  const { links, createLink, toggleLink } = useDemo();
  const [copied, setCopied] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const raw = String(fd.get("amount") ?? "").trim();
    const amount = raw ? Number(raw) : null;
    const errs: Record<string, string> = {};
    if (name.length < 3) errs.name = "Give the link a name (3+ characters).";
    if (amount !== null && (!Number.isFinite(amount) || amount < 0.5 || amount > 50000)) errs.amount = "Leave empty for customer-chosen amounts, or enter $0.50–$50,000.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    createLink({ name, amount });
    e.currentTarget.reset();
  };
  const copy = async (id: string, url: string) => {
    try { await navigator.clipboard.writeText(`https://${url}`); } catch { /* ignore */ }
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div className="grid gap-3 2xl:grid-cols-[1.6fr_1fr]">
      <Panel title="Payment links">
        <ul className="divide-y divide-line">
          {links.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center gap-3 py-3 text-[13px]">
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{l.name}</span>
                <span className="block truncate text-[12px] text-muted">{l.url} · {l.amount === null ? "Customer chooses" : formatCurrency(l.amount)} · {l.payments} payments</span>
              </span>
              <StatusBadge status={l.active ? "active" : "paused"} />
              <button onClick={() => copy(l.id, l.url)} className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-[12px] hover:border-ink">{copied === l.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}{copied === l.id ? "Copied" : "Copy"}</button>
              <button onClick={() => toggleLink(l.id)} className="rounded-full border border-line px-3 py-1 text-[12px] hover:border-ink">{l.active ? "Deactivate" : "Activate"}</button>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Create a link">
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Name" id="pl-name" error={errors.name}><Input id="pl-name" name="name" placeholder="e.g. Team dinner split" error={errors.name} /></Field>
          <Field label="Amount (optional)" id="pl-amount" error={errors.amount} hint="Leave empty to let customers choose."><Input id="pl-amount" name="amount" type="number" step="0.01" min={0.5} inputMode="decimal" error={errors.amount} /></Field>
          <button type="submit" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-electric text-[14px] font-medium text-white hover:bg-bright"><Plus className="h-4 w-4" /> Create link</button>
          <p className="text-[12px] text-muted">Demo links don't resolve to a live checkout.</p>
        </form>
      </Panel>
    </div>
  );
}
