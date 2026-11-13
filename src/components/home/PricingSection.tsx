import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";
import { DemoBadge, SectionHeading } from "@/components/ui/Section";

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <ul data-reveal-stagger className="grid gap-4 lg:grid-cols-3">
      {plans.map((p) => {
        const featured = "featured" in p && p.featured;
        return (
          <li
            key={p.id}
            className={cn(
              "relative flex flex-col rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-1",
              featured ? "bg-electric text-white shadow-[0_40px_80px_-40px_rgba(8,102,249,0.7)]" : "border border-line bg-white",
            )}
            data-cursor-tone={featured ? "light" : undefined}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-medium">{p.name}</h3>
              {featured && <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px]">Most popular</span>}
            </div>
            <p className={cn("mt-2 text-[14px] leading-relaxed", featured ? "text-white/75" : "text-muted")}>{p.blurb}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-[40px] font-medium tracking-tight">{p.price}</span>
              <span className={featured ? "text-white/70" : "text-muted"}>{p.cadence}</span>
            </div>
            <div className={cn("mt-1 text-[13px]", featured ? "text-white/80" : "text-ink")}>
              {p.rateLabel} <span className={featured ? "text-white/55" : "text-muted"}>{p.rate ? "per successful card payment (sample)" : ""}</span>
            </div>
            {!compact && (
              <ul className="mt-6 space-y-2.5 text-[14px]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className={cn("h-4 w-4 shrink-0", featured ? "text-white" : "text-electric")} /> {f}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={p.cta.href}
              className={cn(
                "mt-8 inline-flex h-11 items-center justify-center rounded-full text-[14px] font-medium transition-colors",
                featured ? "bg-white text-electric hover:bg-ice" : "bg-ink text-white hover:bg-graphite",
              )}
            >
              {p.cta.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function PricingSection() {
  return (
    <section aria-labelledby="pricing-title" className="bg-mist py-28">
      <div className="container-site">
        <SectionHeading eyebrow="Transparent pricing" title={<span id="pricing-title">Simple pricing that grows with you.</span>} description="No setup fees, no monthly minimums on Starter. Pay a small fee per successful transaction." />
        <div className="mt-6 flex justify-center"><DemoBadge>All prices are illustrative samples — not official fees</DemoBadge></div>
        <div className="mt-12"><PricingCards /></div>
        <p className="mt-8 text-center text-[14px] text-muted">
          Need the full breakdown? <Link href="/pricing" className="font-medium text-ink underline underline-offset-4">See pricing details and FAQ</Link>
        </p>
      </div>
    </section>
  );
}
