import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { ArrowPill, ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/pages/PageHero";
import { ProductVisual } from "@/components/mockups/ProductVisual";
import { Infrastructure } from "@/components/home/Infrastructure";
import { SolutionsTabs } from "@/components/home/SolutionsTabs";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = { title: "Product", description: "One platform for online payments, in-person payments, subscriptions, payment links, billing and analytics." };

export default function ProductPage() {
  const list = Object.values(products);
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="One platform for every payment."
        intro="Accept, manage and understand payments across every channel — with one integration, one dashboard and one set of reports."
        aside={<div className="rounded-[24px] bg-white/[0.04] p-4 ring-1 ring-white/10"><ProductVisual kind="analytics" /></div>}
      >
        <ButtonLink href="/signup" size="lg" magnetic>Get started</ButtonLink>
        <ArrowPill href="/contact" tone="light">Talk to Sales</ArrowPill>
      </PageHero>
      <section className="bg-paper py-24">
        <div className="container-site">
          <SectionHeading eyebrow="The platform" title="Six products. One ledger." description="Every product shares customers, payment methods and reporting, so adding one never means starting over." />
          <ul data-reveal-stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} data-cursor="open" className="group flex h-full flex-col rounded-[22px] border border-line p-7 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_30px_60px_-40px_rgba(8,102,249,0.5)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] text-electric">0{i + 1}</span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                  <h3 className="mt-10 text-[20px] font-medium tracking-[-0.02em]">{p.eyebrow}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.intro}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SolutionsTabs />
      <Infrastructure />
      <div className="h-16 bg-paper" />
      <FinalCTA />
    </>
  );
}
