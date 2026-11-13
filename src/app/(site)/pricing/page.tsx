import type { Metadata } from "next";
import { addOns } from "@/lib/data/pricing";
import { faqs } from "@/lib/data/content";
import { DemoBadge, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/pages/PageHero";
import { Faq } from "@/components/pages/Faq";
import { PricingCards } from "@/components/home/PricingSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FeeEstimator } from "@/components/forms/FeeEstimator";

export const metadata: Metadata = { title: "Pricing", description: "Illustrative sample pricing for the Yapay concept platform." };

export default function PricingPage() {
  return (
    <>
      <PageHero compact eyebrow="Pricing" title="Transparent pricing. No surprises." intro="Pay per successful transaction, upgrade when lower rates make sense, and talk to us about volume pricing.">
        <DemoBadge tone="light">Sample pricing — Yapay is a concept and these are not official fees</DemoBadge>
      </PageHero>
      <section className="bg-mist py-20">
        <div className="container-site"><PricingCards /></div>
      </section>
      <section className="bg-paper py-20">
        <div className="container-site"><FeeEstimator /></div>
      </section>
      <section className="bg-paper pb-24">
        <div className="container-site">
          <SectionHeading align="left" eyebrow="Additional services" title="Everything else, itemised." />
          <div className="mt-10 overflow-x-auto rounded-[22px] ring-1 ring-line">
            <table className="w-full min-w-[540px] text-left text-[14px]">
              <caption className="sr-only">Additional service fees (sample)</caption>
              <thead className="bg-mist text-[12px] text-muted"><tr><th className="px-6 py-3 font-medium">Service</th><th className="px-6 py-3 font-medium">Sample fee</th><th className="px-6 py-3 font-medium">Note</th></tr></thead>
              <tbody>
                {addOns.map((a) => (
                  <tr key={a.name} className="border-t border-line"><td className="px-6 py-4 font-medium">{a.name}</td><td className="px-6 py-4 tabular-nums">{a.value}</td><td className="px-6 py-4 text-muted">{a.note}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading align="left" eyebrow="FAQ" title="Pricing questions." />
          <Faq items={faqs} />
        </div>
      </section>
      <div className="h-16 bg-paper" />
      <FinalCTA />
    </>
  );
}
