import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { Businesses } from "@/components/home/Businesses";
import { Integrations } from "@/components/home/Integrations";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ArrowPill } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Solutions", description: "Payments for e-commerce, SaaS platforms, retail and marketplaces." };

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Payments shaped around your business model." intro="Whether you run a storefront, a subscription product, a shop floor or a multi-sided platform, Yapay adapts to how you sell." image="marketplace">
        <ArrowPill href="/contact" tone="light">Talk to Sales</ArrowPill>
      </PageHero>
      <Businesses />
      <Integrations />
      <FinalCTA />
    </>
  );
}
