import { Activity, Fingerprint, GitMerge, Layers, ScanSearch, ServerCog } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { ShieldDraw } from "./ShieldDraw";

const pillars = [
  { icon: Layers, title: "Layered security architecture", body: "Hosted payment fields, tokenisation and encrypted transport keep raw card data away from your servers." },
  { icon: ScanSearch, title: "Fraud screening", body: "Each payment is risk-scored using device, velocity and behavioural signals, with rules you control." },
  { icon: Activity, title: "Transaction monitoring", body: "Live status for every payment — from authorisation to settlement — with alerts on unusual patterns." },
  { icon: GitMerge, title: "Automatic reconciliation", body: "Payouts are matched to the transactions, fees and refunds they contain, ready for your ledger." },
  { icon: ServerCog, title: "Built for reliability", body: "Idempotent APIs, retried webhooks and graceful degradation designed to keep checkout available." },
  { icon: Fingerprint, title: "Strong customer authentication", body: "Support for issuer authentication flows such as 3-D Secure when a payment requires it." },
];

/** Trust section — wording is deliberately qualified; no certifications or guarantees are claimed. */
export function Infrastructure() {
  return (
    <section aria-labelledby="infra-title" className="relative overflow-hidden bg-charcoal py-28 text-white" data-cursor-tone="light">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-electric/20 blur-[140px]" />
      <div className="container-site relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow tone="light">Trusted payment infrastructure</Eyebrow>
          <h2 id="infra-title" data-reveal className="text-h2 mt-5 max-w-[14ch]">Security designed into every transaction.</h2>
          <p data-reveal data-reveal-delay="0.08" className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/60">
            Payments infrastructure should be invisible when it works and obvious when something needs attention.
            Yapay is designed around both.
          </p>
          <ShieldDraw />
          <p className="mt-6 max-w-[46ch] text-[12px] leading-relaxed text-white/40">
            Yapay is a concept product. Production compliance obligations (for example PCI DSS) depend on the payment
            provider and integration you deploy, and are not claimed by this site.
          </p>
        </div>
        <ul data-reveal-stagger className="grid gap-px overflow-hidden rounded-[22px] bg-white/10 sm:grid-cols-2">
          {pillars.map((p) => (
            <li key={p.title} className="group bg-charcoal p-7 transition-colors duration-500 hover:bg-[#191919]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-sky ring-1 ring-white/10 transition-[background-color,color] duration-500 group-hover:bg-electric group-hover:text-white">
                <p.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-[17px] font-medium tracking-[-0.01em]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
