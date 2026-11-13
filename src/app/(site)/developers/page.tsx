import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, KeyRound, Terminal, Webhook } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { ArrowPill } from "@/components/ui/Button";
import { DemoBadge, SectionHeading } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/Code";
import { Developer } from "@/components/home/Developer";
import { webhookSample } from "@/lib/data/code";

export const metadata: Metadata = { title: "Developers", description: "APIs, SDKs and webhooks for the Yapay concept platform (illustrative)." };

const cards = [
  { icon: BookOpen, t: "Quickstart", b: "Accept your first test payment in a few steps.", href: "/developers/docs#quickstart" },
  { icon: KeyRound, t: "Authentication", b: "API keys, environments and key rotation.", href: "/developers/docs#authentication" },
  { icon: Terminal, t: "Payments API", b: "Create, confirm, capture and refund payments.", href: "/developers/docs#payments" },
  { icon: Webhook, t: "Webhooks", b: "Event types, signatures and retries.", href: "/developers/docs#webhooks" },
];

export default function DevelopersPage() {
  return (
    <>
      <PageHero eyebrow="Developers" title="Build payments you'll enjoy maintaining." intro="Predictable APIs, typed SDKs and signed webhooks. All endpoints shown are illustrative — this is a concept platform.">
        <ArrowPill href="/developers/docs" tone="light">Read the docs</ArrowPill>
        <DemoBadge tone="light">Illustrative API</DemoBadge>
      </PageHero>
      <section className="bg-paper pt-24">
        <div className="container-site">
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <li key={c.t}>
                <Link href={c.href} className="group flex h-full flex-col rounded-[22px] border border-line p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-electric/40">
                  <div className="flex items-center justify-between"><c.icon className="h-5 w-5 text-electric" /><ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></div>
                  <h2 className="mt-8 text-[17px] font-medium">{c.t}</h2>
                  <p className="mt-1 text-[14px] text-muted">{c.b}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Developer />
      <section className="bg-mist py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading align="left" eyebrow="Webhooks" title="Events you can trust." description="Every event is signed. Verify the signature, store the event ID for idempotency, acknowledge fast and process in the background." />
          <CodeBlock title="Webhook handler (illustrative)" code={webhookSample} />
        </div>
      </section>
    </>
  );
}
