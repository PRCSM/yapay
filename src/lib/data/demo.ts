import { mulberry32 } from "@/lib/utils";

/** All merchant data below is generated, deterministic demonstration data. No money moves. */
export type TxStatus = "succeeded" | "pending" | "failed" | "refunded";
export type Method = "Card" | "Wallet" | "Bank transfer" | "Payment link" | "Tap to Pay";

export type Transaction = {
  id: string; date: string; amount: number; status: TxStatus; method: Method;
  customerId: string; customer: string; email: string; description: string; card?: string;
};
export type Customer = { id: string; name: string; email: string; country: string; since: string; plan?: string };
export type Invoice = { id: string; number: string; customerId: string; customer: string; amount: number; issued: string; due: string; status: "paid" | "open" | "overdue" | "draft" };
export type Subscription = { id: string; customer: string; plan: string; amount: number; interval: "month" | "year"; status: "active" | "paused" | "canceled"; renews: string };
export type PaymentLink = { id: string; name: string; amount: number | null; url: string; created: string; active: boolean; payments: number };

export const DEMO_TODAY = "2026-11-13T00:00:00.000Z";
const DAY = 86_400_000;
const today = new Date(DEMO_TODAY).getTime();
const iso = (t: number) => new Date(t).toISOString();

const first = ["Amara", "Lucas", "Priya", "Daniel", "Sofia", "Kenji", "Maya", "Omar", "Elena", "Noah", "Zara", "Theo", "Ines", "Ravi", "Hana", "Mateo", "Leah", "Felix", "Aisha", "Jonas", "Nora", "Arjun", "Clara", "Sami", "Yuki", "Ezra", "Lina", "Oscar", "Mira", "Tomas"];
const last = ["Okafor", "Moreau", "Raman", "Kim", "Rossi", "Tanaka", "Kowalski", "Haddad", "Petrov", "Fischer", "Ahmed", "Laurent", "Silva", "Mehta", "Sato", "Garcia", "Cohen", "Weber", "Bello", "Nilsson", "Berg", "Iyer", "Duarte", "Aziz", "Mori", "Levi", "Khan", "Lund", "Rao", "Novak"];
const countries = ["US", "GB", "DE", "FR", "IN", "JP", "NL", "ES", "CA", "AU"];
const items = ["Annual plan", "Monthly plan", "Order #", "Consultation", "Workshop ticket", "Store purchase", "Deposit", "Add-on seats"];
const methods: Method[] = ["Card", "Card", "Card", "Wallet", "Wallet", "Bank transfer", "Payment link", "Tap to Pay"];

function build() {
  const r = mulberry32(20261113);
  const customers: Customer[] = first.map((f, i) => ({
    id: `cus_${(1000 + i * 37).toString(36)}${i}`,
    name: `${f} ${last[i]}`,
    email: `${f.toLowerCase()}.${last[i].toLowerCase()}@example.com`,
    country: countries[i % countries.length],
    since: iso(today - Math.floor(30 + r() * 600) * DAY),
    plan: r() > 0.5 ? (r() > 0.5 ? "Growth" : "Starter") : undefined,
  }));

  const transactions: Transaction[] = [];
  for (let d = 0; d < 180; d++) {
    const weekday = new Date(today - d * DAY).getUTCDay();
    const n = Math.floor((weekday === 0 || weekday === 6 ? 3 : 5) + r() * 5 + (180 - d) / 60);
    for (let k = 0; k < n; k++) {
      const c = customers[Math.floor(r() * customers.length)];
      const roll = r();
      const status: TxStatus = d < 1 && roll > 0.7 ? "pending" : roll > 0.955 ? "failed" : roll > 0.925 ? "refunded" : "succeeded";
      const item = items[Math.floor(r() * items.length)];
      transactions.push({
        id: `py_${(d * 97 + k * 13 + 4096).toString(36)}${Math.floor(r() * 1e6).toString(36)}`,
        date: iso(today - d * DAY - Math.floor(r() * DAY)),
        amount: Math.round((12 + r() ** 2 * 680) * 100) / 100,
        status,
        method: methods[Math.floor(r() * methods.length)],
        customerId: c.id, customer: c.name, email: c.email,
        description: item.endsWith("#") ? `${item}${1200 + Math.floor(r() * 8000)}` : item,
        card: String(1000 + Math.floor(r() * 8999)),
      });
    }
  }
  transactions.sort((a, b) => (a.date < b.date ? 1 : -1));

  const invoices: Invoice[] = Array.from({ length: 16 }, (_, i) => {
    const c = customers[(i * 7) % customers.length];
    const issued = today - (i * 6 + 2) * DAY;
    const status: Invoice["status"] = i === 0 ? "draft" : i < 4 ? "open" : i === 5 || i === 9 ? "overdue" : "paid";
    return { id: `in_${i}`, number: `YP-${(2041 - i).toString()}`, customerId: c.id, customer: c.name, amount: Math.round((180 + r() * 4200) * 100) / 100, issued: iso(issued), due: iso(issued + 14 * DAY), status };
  });

  const plans = [["Starter", 29], ["Growth", 99], ["Scale", 299]] as const;
  const subscriptions: Subscription[] = Array.from({ length: 14 }, (_, i) => {
    const [plan, price] = plans[i % 3];
    const yearly = i % 4 === 0;
    return { id: `sub_${i}`, customer: customers[(i * 5 + 3) % customers.length].name, plan, amount: yearly ? price * 10 : price, interval: yearly ? "year" : "month", status: i === 6 ? "paused" : i === 11 ? "canceled" : "active", renews: iso(today + ((i * 3) % 28 + 1) * DAY) };
  });

  const links: PaymentLink[] = [
    { id: "pl_1", name: "Pottery workshop — Saturday", amount: 65, url: "pay.yapay.example/l/pottery-sat", created: iso(today - 12 * DAY), active: true, payments: 14 },
    { id: "pl_2", name: "Consultation deposit", amount: 150, url: "pay.yapay.example/l/consult", created: iso(today - 30 * DAY), active: true, payments: 9 },
    { id: "pl_3", name: "Team dinner split", amount: 24.2, url: "pay.yapay.example/l/dinner-split", created: iso(today - 3 * DAY), active: true, payments: 2 },
    { id: "pl_4", name: "Donation — pay what you want", amount: null, url: "pay.yapay.example/l/donate", created: iso(today - 60 * DAY), active: false, payments: 41 },
  ];

  return { customers, transactions, invoices, subscriptions, links };
}

export const seed = build();

export type DemoData = typeof seed;

export function rangeStart(range: "7d" | "30d" | "90d" | "12m" | "180d", now = today) {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 180;
  return now - days * DAY;
}

export function dailySeries(txs: Transaction[], days: number, now = today) {
  const buckets = Array.from({ length: days }, (_, i) => ({ date: iso(now - (days - i) * DAY), volume: 0, count: 0 }));
  for (const t of txs) {
    if (t.status !== "succeeded") continue;
    const d = Math.floor((now - new Date(t.date).getTime()) / DAY);
    const idx = days - 1 - d;
    if (idx >= 0 && idx < days) { buckets[idx].volume += t.amount; buckets[idx].count += 1; }
  }
  return buckets;
}

export function summarize(txs: Transaction[], fromTs: number, toTs = today + DAY) {
  const inRange = txs.filter((t) => { const ts = new Date(t.date).getTime(); return ts >= fromTs && ts < toTs; });
  const ok = inRange.filter((t) => t.status === "succeeded");
  const byMethod = new Map<Method, number>();
  ok.forEach((t) => byMethod.set(t.method, (byMethod.get(t.method) ?? 0) + t.amount));
  return {
    volume: ok.reduce((s, t) => s + t.amount, 0),
    count: inRange.length,
    succeeded: ok.length,
    pending: inRange.filter((t) => t.status === "pending").length,
    failed: inRange.filter((t) => t.status === "failed").length,
    refunds: inRange.filter((t) => t.status === "refunded").reduce((s, t) => s + t.amount, 0),
    refundCount: inRange.filter((t) => t.status === "refunded").length,
    successRate: inRange.length ? ok.length / inRange.length : 0,
    methods: [...byMethod.entries()].sort((a, b) => b[1] - a[1]).map(([method, value]) => ({ method, value })),
  };
}

export { DAY };
