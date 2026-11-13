"use client";

import { Check, Copy, CreditCard, FileText, Landmark, Lock, QrCode, RefreshCw, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { AreaChart } from "@/components/charts/Charts";
import { dailySeries, seed } from "@/lib/data/demo";
import { cn, formatCurrency } from "@/lib/utils";
import { BrowserFrame, PhoneMockup, TerminalMockup } from "./Mockups";

export type VisualKind = "checkout" | "terminal" | "subscription" | "link" | "invoice" | "analytics";

/** Realistic product UI previews built in React (no screenshots). All values are illustrative. */
export function ProductVisual({ kind, className }: { kind: VisualKind; className?: string }) {
  return <div className={cn("relative", className)}>{renderKind(kind)}</div>;
}

function renderKind(kind: VisualKind) {
  switch (kind) {
    case "checkout": return <CheckoutPreview />;
    case "terminal": return (
      <div className="grid items-end gap-6 sm:grid-cols-2">
        <TerminalMockup amount="$48.90" className="w-[80%]" />
        <PhoneMockup title="Tap to Pay" amount="$48.90" status="Contactless approved" dark className="w-[72%]" />
      </div>
    );
    case "subscription": return <SubscriptionPreview />;
    case "link": return <LinkPreview />;
    case "invoice": return <InvoicePreview />;
    case "analytics": return <AnalyticsPreview />;
  }
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl bg-white p-5 shadow-[0_30px_70px_-40px_rgba(9,9,9,0.45)] ring-1 ring-black/[0.06]", className)}>{children}</div>;
}

function CheckoutPreview() {
  const [method, setMethod] = useState<"card" | "wallet" | "bank">("card");
  const opts = [
    { id: "card" as const, label: "Card", icon: CreditCard },
    { id: "wallet" as const, label: "Wallet", icon: Wallet },
    { id: "bank" as const, label: "Bank", icon: Landmark },
  ];
  return (
    <BrowserFrame>
      <div className="grid gap-0 sm:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-line bg-mist p-5 sm:border-b-0 sm:border-r">
          <div className="text-[12px] text-muted">Northwind Studio</div>
          <div className="mt-1 text-[26px] font-medium tabular-nums tracking-tight">$129.00</div>
          <div className="mt-4 space-y-2 text-[12px]">
            <div className="flex justify-between"><span>Design course</span><span className="tabular-nums">$119.00</span></div>
            <div className="flex justify-between text-muted"><span>Tax</span><span className="tabular-nums">$10.00</span></div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Preview payment method">
            {opts.map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={method === o.id}
                onClick={() => setMethod(o.id)}
                className={cn("flex flex-col items-start gap-1.5 rounded-xl border p-2.5 text-[12px] transition-colors", method === o.id ? "border-electric bg-ice text-electric" : "border-line text-ink hover:border-ink/30")}
              >
                <o.icon className="h-4 w-4" />
                {o.label}
              </button>
            ))}
          </div>
          <div className="mt-3 space-y-2" aria-hidden>
            {method === "card" && (<>
              <div className="flex h-9 items-center rounded-lg border border-line px-3 text-[12px] text-muted">•••• •••• •••• 4242 <span className="ml-auto">12/29</span></div>
              <div className="flex h-9 items-center rounded-lg border border-line px-3 text-[12px] text-muted">Name on card</div>
            </>)}
            {method === "wallet" && <div className="flex h-[76px] items-center justify-center rounded-lg bg-ink text-[13px] font-medium text-white">Pay with wallet</div>}
            {method === "bank" && <div className="rounded-lg border border-line p-3 text-[12px] text-muted">You'll be redirected to approve the transfer with your bank.</div>}
          </div>
          <div className="mt-3 flex h-10 items-center justify-center gap-2 rounded-full bg-electric text-[13px] font-medium text-white">
            <Lock className="h-3.5 w-3.5" /> Pay $129.00
          </div>
          <p className="mt-2 text-center text-[10px] text-muted">Preview only — no fields accept input</p>
        </div>
      </div>
    </BrowserFrame>
  );
}

function SubscriptionPreview() {
  const subs = seed.subscriptions.slice(0, 5);
  const mrr = seed.subscriptions.filter((s) => s.status === "active").reduce((a, s) => a + (s.interval === "year" ? s.amount / 12 : s.amount), 0);
  return (
    <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
      <Card className="bg-electric text-white ring-0">
        <div className="text-[12px] text-white/70">Monthly recurring revenue</div>
        <div className="mt-1 text-[30px] font-medium tabular-nums">{formatCurrency(mrr, "USD", 0)}</div>
        <div className="mt-6 space-y-2 text-[12px]">
          {["Starter · $29/mo", "Growth · $99/mo", "Scale · $299/mo"].map((p, i) => (
            <div key={p} className={cn("flex items-center justify-between rounded-lg px-3 py-2", i === 1 ? "bg-white text-ink" : "bg-white/10")}>
              {p} {i === 1 && <span className="rounded-full bg-ice px-2 py-0.5 text-[10px] text-electric">Popular</span>}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="mb-3 flex items-center justify-between text-[12px]"><span className="font-medium">Upcoming renewals</span><RefreshCw className="h-3.5 w-3.5 text-muted" /></div>
        <ul className="divide-y divide-line text-[12px]">
          {subs.map((s) => (
            <li key={s.id} className="flex items-center justify-between py-2.5">
              <span><span className="block font-medium">{s.customer}</span><span className="text-muted">{s.plan} · {s.interval}ly</span></span>
              <span className="tabular-nums">{formatCurrency(s.amount)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function LinkPreview() {
  const [copied, setCopied] = useState(false);
  const cells = useMemo(() => Array.from({ length: 81 }, (_, i) => ((i * 37 + (i % 7) * 11) % 5 < 2 ? 1 : 0)), []);
  return (
    <div className="grid items-center gap-4 sm:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <div className="text-[12px] text-muted">Payment link</div>
        <div className="mt-1 text-[18px] font-medium">Pottery workshop — Saturday</div>
        <div className="mt-1 text-[24px] font-medium tabular-nums">$65.00</div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-fog p-1.5 pl-3 text-[12px]">
          <span className="truncate text-muted">pay.yapay.example/l/pottery-sat</span>
          <button
            type="button"
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }}
            className="ml-auto inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 font-medium shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="mt-4 flex gap-4 text-[12px] text-muted"><span><b className="text-ink">14</b> paid</span><span><b className="text-ink">31</b> views</span></div>
      </Card>
      <Card className="flex flex-col items-center">
        <div className="grid w-full max-w-[150px] grid-cols-9 gap-[2px] rounded-lg bg-white p-1" aria-label="Illustrative QR code" role="img">
          {cells.map((c, i) => <span key={i} className={cn("aspect-square rounded-[1px]", c ? "bg-ink" : "bg-transparent")} />)}
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-[12px] text-muted"><QrCode className="h-3.5 w-3.5" /> Scan to pay</span>
      </Card>
    </div>
  );
}

function InvoicePreview() {
  return (
    <Card className="mx-auto max-w-[480px] p-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[13px] font-medium"><FileText className="h-4 w-4 text-electric" /> Invoice YP-2041</div>
          <div className="mt-1 text-[12px] text-muted">Due Nov 27, 2026</div>
        </div>
        <span className="rounded-full bg-ice px-2.5 py-1 text-[11px] font-medium text-electric">Open</span>
      </div>
      <div className="mt-6 space-y-2 border-t border-line pt-4 text-[13px]">
        {[["Brand strategy sprint", 2400], ["Design system audit", 1200], ["Workshop facilitation", 650]].map(([a, b]) => (
          <div key={a} className="flex justify-between"><span>{a}</span><span className="tabular-nums">{formatCurrency(b as number)}</span></div>
        ))}
      </div>
      <div className="mt-4 flex justify-between border-t border-line pt-4 text-[15px] font-medium"><span>Total</span><span className="tabular-nums">$4,250.00</span></div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-[11px]">
        {["Sent Nov 13", "Reminder Nov 24", "Due Nov 27"].map((s, i) => (
          <div key={s} className={cn("rounded-lg px-2 py-1.5 text-center", i === 0 ? "bg-electric text-white" : "bg-fog text-muted")}>{s}</div>
        ))}
      </div>
    </Card>
  );
}

function AnalyticsPreview() {
  const data = useMemo(() => dailySeries(seed.transactions, 30).map((d) => ({ date: d.date, value: d.volume })), []);
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <Card className="p-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[12px] text-muted">Gross volume · last 30 days</div>
          <div className="mt-1 text-[26px] font-medium tabular-nums tracking-tight">{formatCurrency(total, "USD", 0)}</div>
        </div>
        <span className="rounded-full bg-[#fff4e0] px-2 py-0.5 text-[10px] font-medium text-[#8a5a00]">Demo data</span>
      </div>
      <div className="mt-4"><AreaChart data={data} label="Gross volume, last 30 days (demo data)" height={200} /></div>
    </Card>
  );
}
