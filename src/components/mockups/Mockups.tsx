import { Check, ChevronLeft, Nfc, Receipt, Send, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

/** Dark handheld card terminal seen from above, with animated contactless ripples. */
export function TerminalMockup({ amount = "$12.65", className }: { amount?: string; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-[64%] max-w-[210px]", className)}>
      <div className="relative rounded-[26px] bg-[linear-gradient(180deg,#2a2a2c,#0d0d0e)] p-2.5 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="relative overflow-hidden rounded-[18px] bg-[radial-gradient(120%_80%_at_50%_0%,#1f2a44_0%,#0a0d14_70%)] px-4 pb-6 pt-4 text-white">
          <div className="flex items-center justify-between text-[9px] text-white/50">
            <span>Yapay Terminal</span>
            <Wifi className="h-3 w-3" />
          </div>
          <div className="mt-5 text-center">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Total</div>
            <div className="mt-1 text-[28px] font-medium tabular-nums tracking-tight">{amount}</div>
          </div>
          <div className="relative mx-auto mt-5 grid h-16 w-16 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-electric/25 [animation-duration:2.4s]" />
            <span className="absolute inset-2 rounded-full bg-electric/25" />
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-electric shadow-[0_0_24px_rgba(8,102,249,0.8)]">
              <Nfc className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-3 text-center text-[10px] text-white/55">Tap card or phone</p>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5 px-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-3 rounded-full bg-white/[0.08]" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Paper receipt with split-allocation chips. */
export function ReceiptMockup({ className }: { className?: string }) {
  const people = [
    { n: "AM", share: "$24.20", c: "bg-[#ffd7c2]" },
    { n: "JK", share: "$24.20", c: "bg-[#cfe0ff]" },
    { n: "RS", share: "$24.20", c: "bg-[#d9f2dd]" },
  ];
  return (
    <div className={cn("relative mx-auto w-[72%] max-w-[230px]", className)}>
      <div className="relative rotate-[-3deg] bg-white px-5 pb-8 pt-5 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/5 [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),95%_100%,90%_calc(100%-8px),85%_100%,80%_calc(100%-8px),75%_100%,70%_calc(100%-8px),65%_100%,60%_calc(100%-8px),55%_100%,50%_calc(100%-8px),45%_100%,40%_calc(100%-8px),35%_100%,30%_calc(100%-8px),25%_100%,20%_calc(100%-8px),15%_100%,10%_calc(100%-8px),5%_100%,0_calc(100%-8px))]">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted">
          <span>Table 12</span>
          <Receipt className="h-3 w-3" />
        </div>
        <div className="mt-2 border-t border-dashed border-line pt-2 font-mono text-[10px] leading-[1.7]">
          {[
            ["Truffle pasta", "21.00"],
            ["Burrata", "14.50"],
            ["Sparkling ×3", "12.00"],
            ["Tiramisu ×2", "18.00"],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between"><span>{a}</span><span>{b}</span></div>
          ))}
        </div>
        <div className="mt-2 flex justify-between border-t border-dashed border-line pt-2 font-mono text-[11px] font-semibold">
          <span>TOTAL</span><span>$72.60</span>
        </div>
      </div>
      <div className="absolute -bottom-5 -right-6 w-[78%] rounded-2xl bg-white p-2.5 shadow-[0_20px_40px_-20px_rgba(9,9,9,0.45)] ring-1 ring-black/5">
        <div className="mb-1.5 text-[9px] font-medium uppercase tracking-wider text-muted">Split equally</div>
        {people.map((p) => (
          <div key={p.n} className="flex items-center justify-between py-0.5">
            <span className="flex items-center gap-1.5">
              <span className={cn("grid h-5 w-5 place-items-center rounded-full text-[8px] font-semibold", p.c)}>{p.n}</span>
              <span className="h-1.5 w-10 rounded-full bg-fog" />
            </span>
            <span className="text-[10px] font-medium tabular-nums">{p.share}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Phone showing a send-money / confirmation screen. */
export function PhoneMockup({
  title = "Send Money", amount = "$8.14", status = "Payment confirmed", className, dark = false,
}: { title?: string; amount?: string; status?: string; className?: string; dark?: boolean }) {
  return (
    <div className={cn("relative mx-auto w-[58%] max-w-[200px]", className)}>
      <div className="rounded-[34px] bg-[#111] p-[7px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className={cn("relative overflow-hidden rounded-[28px] px-4 pb-8 pt-3", dark ? "bg-[#0c0f16] text-white" : "bg-white text-ink")}>
          <div className="flex items-center justify-between text-[9px] font-semibold">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-[#111]" />
            <span className="flex gap-0.5"><span className="h-2 w-3 rounded-[2px] bg-current" /></span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-medium">
            <ChevronLeft className="h-3.5 w-3.5" />
            {title}
          </div>
          <div className="mt-6 text-center">
            <div className={cn("text-[9px]", dark ? "text-white/50" : "text-muted")}>Enter Amount</div>
            <div className="mt-1 text-[30px] font-semibold tabular-nums tracking-tight">{amount}</div>
          </div>
          <div className={cn("mt-4 flex items-center gap-2 rounded-xl p-2", dark ? "bg-white/5" : "bg-fog")}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-electric text-[8px] font-semibold text-white">MK</span>
            <span className="text-[9px] leading-tight">
              <span className="block font-medium">Maya K.</span>
              <span className={dark ? "text-white/50" : "text-muted"}>•••• 4417</span>
            </span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-[#e7f6ee] py-1.5 text-[9px] font-medium text-[#0d7a3d]">
            <Check className="h-3 w-3" /> {status}
          </div>
          <div className="mt-3 flex h-8 items-center justify-center gap-1.5 rounded-full bg-electric text-[10px] font-medium text-white">
            <Send className="h-3 w-3" /> Send
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small browser-window frame used for product previews. */
export function BrowserFrame({ children, className, url = "pay.yapay.example/checkout" }: { children: React.ReactNode; className?: string; url?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-40px_rgba(9,9,9,0.45)] ring-1 ring-black/[0.06]", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-muted ring-1 ring-line">{url}</span>
      </div>
      {children}
    </div>
  );
}
