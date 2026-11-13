import type { Metadata } from "next";
import { images } from "@/lib/images";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = { title: "About", description: "Why Yapay exists and the principles behind it." };

const principles = [
  ["Clarity over cleverness", "Every fee, status and number should be understandable at a glance."],
  ["Reliability is a feature", "Payments are infrastructure. We design for the bad day, not just the demo."],
  ["Honest by default", "No dark patterns, no hidden fees, no claims we can't support."],
  ["Craft matters", "Finance software can be beautiful — and is better used when it is."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Yapay" title="Payments should feel effortless." intro="Yapay is a concept for what payment infrastructure could feel like if it were designed with the same care as the products it powers." image="team" />
      <section className="bg-paper py-24">
        <div className="container-site grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Our story" title="Built for businesses that are still growing." />
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-muted">
              <p>Growing businesses juggle payment tools: one for the website, another for the counter, a third for invoices, and a spreadsheet to reconcile them all.</p>
              <p>Yapay imagines a single platform where every payment — online, in person or recurring — lands in one ledger, with reporting a finance team can trust and an API developers enjoy.</p>
              <p className="rounded-2xl bg-mist p-5 text-[14px]">Note: Yapay is a design concept. Team size, customers and metrics are not claimed.</p>
            </div>
          </div>
          <div data-reveal="mask" className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-charcoal">
            <SmartImage src={images.office} alt="A bright modern office" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="bg-charcoal py-24 text-white" data-cursor-tone="light">
        <div className="container-site">
          <SectionHeading tone="light" eyebrow="Principles" title="What we believe." />
          <ul data-reveal-stagger className="mt-14 grid gap-px overflow-hidden rounded-[22px] bg-white/10 md:grid-cols-2">
            {principles.map(([t, b], i) => (
              <li key={t} className="bg-charcoal p-8">
                <span className="font-mono text-[12px] text-sky">0{i + 1}</span>
                <h3 className="mt-4 text-[22px] font-medium tracking-[-0.02em]">{t}</h3>
                <p className="mt-2 text-[15px] text-white/60">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="h-16 bg-paper" />
      <FinalCTA />
    </>
  );
}
