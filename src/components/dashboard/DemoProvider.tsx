"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { DEMO_TODAY, seed, type Invoice, type PaymentLink, type Subscription, type Transaction } from "@/lib/data/demo";
import { useLocalState } from "@/lib/hooks";

type Overrides = {
  refunded: string[];
  invoices: Invoice[] | null;
  links: PaymentLink[] | null;
  subscriptions: Subscription[] | null;
  activity: { id: string; text: string; at: string }[];
};
const empty: Overrides = { refunded: [], invoices: null, links: null, subscriptions: null, activity: [] };

type Ctx = {
  transactions: Transaction[];
  customers: typeof seed.customers;
  invoices: Invoice[];
  links: PaymentLink[];
  subscriptions: Subscription[];
  activity: Overrides["activity"];
  ready: boolean;
  refund: (id: string) => void;
  createInvoice: (i: Omit<Invoice, "id" | "number" | "issued" | "due" | "status">) => void;
  markInvoicePaid: (id: string) => void;
  createLink: (l: { name: string; amount: number | null }) => void;
  toggleLink: (id: string) => void;
  toggleSubscription: (id: string) => void;
  reset: () => void;
};

const DemoCtx = createContext<Ctx | null>(null);
export const useDemo = () => {
  const c = useContext(DemoCtx);
  if (!c) throw new Error("useDemo must be used inside <DemoProvider>");
  return c;
};

const DAY = 86_400_000;

/** Demo merchant state. Seeded deterministically, user changes persist in localStorage. No money moves. */
export function DemoProvider({ children }: { children: ReactNode }) {
  const [o, setO, ready] = useLocalState<Overrides>("yapay-demo-data-v1", empty);

  const log = (text: string) => ({ id: Math.random().toString(36).slice(2), text, at: new Date().toISOString() });

  const transactions = useMemo(() => {
    const set = new Set(o.refunded);
    return seed.transactions.map((t) => (set.has(t.id) ? { ...t, status: "refunded" as const } : t));
  }, [o.refunded]);

  const invoices = o.invoices ?? seed.invoices;
  const links = o.links ?? seed.links;
  const subscriptions = o.subscriptions ?? seed.subscriptions;

  const refund = useCallback((id: string) => setO((p) => {
    const t = seed.transactions.find((x) => x.id === id);
    return { ...p, refunded: [...new Set([...p.refunded, id])], activity: [log(`Refund issued for ${t?.customer ?? id} (simulated)`), ...p.activity].slice(0, 20) };
  }), [setO]);

  const createInvoice = useCallback((i: Omit<Invoice, "id" | "number" | "issued" | "due" | "status">) => setO((p) => {
    const list = p.invoices ?? seed.invoices;
    const now = new Date(DEMO_TODAY).getTime();
    const next = Math.max(...list.map((x) => Number(x.number.split("-")[1]))) + 1;
    const inv: Invoice = { ...i, id: `in_${Date.now()}`, number: `YP-${next}`, issued: new Date(now).toISOString(), due: new Date(now + 14 * DAY).toISOString(), status: "open" };
    return { ...p, invoices: [inv, ...list], activity: [log(`Invoice ${inv.number} sent to ${i.customer}`), ...p.activity].slice(0, 20) };
  }), [setO]);

  const markInvoicePaid = useCallback((id: string) => setO((p) => {
    const list = (p.invoices ?? seed.invoices).map((x) => (x.id === id ? { ...x, status: "paid" as const } : x));
    const inv = list.find((x) => x.id === id);
    return { ...p, invoices: list, activity: [log(`Invoice ${inv?.number} marked as paid`), ...p.activity].slice(0, 20) };
  }), [setO]);

  const createLink = useCallback((l: { name: string; amount: number | null }) => setO((p) => {
    const slug = l.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "link";
    const link: PaymentLink = { id: `pl_${Date.now()}`, name: l.name, amount: l.amount, url: `pay.yapay.example/l/${slug}`, created: new Date().toISOString(), active: true, payments: 0 };
    return { ...p, links: [link, ...(p.links ?? seed.links)], activity: [log(`Payment link “${l.name}” created`), ...p.activity].slice(0, 20) };
  }), [setO]);

  const toggleLink = useCallback((id: string) => setO((p) => ({ ...p, links: (p.links ?? seed.links).map((x) => (x.id === id ? { ...x, active: !x.active } : x)) })), [setO]);

  const toggleSubscription = useCallback((id: string) => setO((p) => ({
    ...p,
    subscriptions: (p.subscriptions ?? seed.subscriptions).map((s) => (s.id === id && s.status !== "canceled" ? { ...s, status: s.status === "active" ? ("paused" as const) : ("active" as const) } : s)),
  })), [setO]);

  const reset = useCallback(() => setO(empty), [setO]);

  const value: Ctx = {
    transactions, customers: seed.customers, invoices, links, subscriptions, activity: o.activity, ready,
    refund, createInvoice, markInvoicePaid, createLink, toggleLink, toggleSubscription, reset,
  };
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>;
}
