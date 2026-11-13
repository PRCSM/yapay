"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, CreditCard, FileText, Home, LogOut, RotateCcw, Users } from "lucide-react";
import { useState } from "react";
import { clearSession, useSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useDemo } from "./DemoProvider";

const nav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/transactions", label: "Transactions", icon: CreditCard },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/billing", label: "Billing", icon: FileText },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const { reset } = useDemo();
  const [confirm, setConfirm] = useState(false);
  const name = session?.name ?? "Demo Merchant";
  const company = session?.company ?? "Grocery Store";

  return (
    <div className="min-h-svh bg-charcoal p-2 md:p-3">
      <div className="flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[20px] bg-mist md:min-h-[calc(100svh-1.5rem)] lg:flex-row">
        <aside className="flex shrink-0 flex-col bg-charcoal text-white lg:w-60" data-cursor-tone="light">
          <div className="flex items-center justify-between px-5 py-5"><Logo /><span className="rounded-full bg-[#e3a008]/15 px-2 py-0.5 text-[10px] font-medium text-[#f5c451] lg:hidden">Demo</span></div>
          <nav aria-label="Dashboard" className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
            {nav.map((n) => {
              const active = n.href === "/dashboard" ? pathname === n.href : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} className={cn("flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors", active ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white")}>
                  <n.icon className={cn("h-4 w-4", active && "text-sky")} />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto hidden space-y-2 p-4 lg:block">
            <div className="rounded-2xl bg-white/[0.05] p-4 text-[12px] leading-relaxed text-white/55">
              <span className="mb-1 flex items-center gap-1.5 font-medium text-[#f5c451]"><span className="h-1.5 w-1.5 rounded-full bg-[#e3a008]" />Demo mode</span>
              All data is simulated and stored in this browser. No money moves.
            </div>
            <Link href="/" className="block px-1 text-[12px] text-white/45 hover:text-white">← Back to website</Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-5 py-3.5 md:px-8">
            <div>
              <p className="text-[12px] text-muted">{company}</p>
              <p className="text-[15px] font-medium">Hello, {name.split(" ")[0]}</p>
            </div>
            <div className="flex items-center gap-2">
              {confirm ? (
                <span className="flex items-center gap-2 text-[13px]">
                  Reset all demo changes?
                  <button onClick={() => { reset(); setConfirm(false); }} className="rounded-full bg-danger px-3 py-1.5 text-white">Reset</button>
                  <button onClick={() => setConfirm(false)} className="rounded-full border border-line px-3 py-1.5">Cancel</button>
                </span>
              ) : (
                <button onClick={() => setConfirm(true)} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[13px] hover:border-ink"><RotateCcw className="h-3.5 w-3.5" /> Reset demo data</button>
              )}
              {session ? (
                <button onClick={() => { clearSession(); router.push("/login"); }} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[13px] text-white"><LogOut className="h-3.5 w-3.5" /> Log out</button>
              ) : (
                <Link href="/login" className="rounded-full bg-electric px-3.5 py-1.5 text-[13px] font-medium text-white">Log in</Link>
              )}
            </div>
          </header>
          <div className="flex-1 px-5 py-8 md:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-medium tracking-[-0.025em]">{title}</h1>
        {description && <p className="mt-1 text-[14px] text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl bg-white p-5 ring-1 ring-line", className)}>
      {(title || action) && <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-[14px] font-medium">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

export function RangePicker<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { id: T; label: string }[] }) {
  return (
    <div role="group" aria-label="Date range" className="flex rounded-full bg-white p-1 ring-1 ring-line">
      {options.map((o) => (
        <button key={o.id} onClick={() => onChange(o.id)} aria-pressed={value === o.id} className={cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors", value === o.id ? "bg-ink text-white" : "text-muted hover:text-ink")}>{o.label}</button>
      ))}
    </div>
  );
}
