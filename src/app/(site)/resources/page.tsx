import type { Metadata } from "next";
import { articles } from "@/lib/data/content";
import { PageHero } from "@/components/pages/PageHero";
import { ResourceGrid } from "@/components/pages/ResourceGrid";

export const metadata: Metadata = { title: "Resources", description: "Guides, playbooks and engineering notes for payment teams." };

export default function ResourcesPage() {
  return (
    <>
      <PageHero compact eyebrow="Resources" title="Guides for people who move money." intro="Practical playbooks on checkout, subscriptions, in-person payments and payment engineering." />
      <section className="bg-paper py-20">
        <div className="container-site"><ResourceGrid articles={articles} /></div>
      </section>
    </>
  );
}
