import type { Metadata } from "next";
import { integrationGroups } from "@/components/home/Integrations";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/Code";
import { ArrowPill } from "@/components/ui/Button";
import { webhookSample } from "@/lib/data/code";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = { title: "Integrations", description: "Integration categories supported by the Yapay platform design." };

export default function IntegrationsPage() {
  return (
    <>
      <PageHero eyebrow="Integrations" title="Connect payments to everything you run." intro="Integration categories the platform is designed around. No third-party partnerships are implied by this concept site." image="office">
        <ArrowPill href="/developers/docs" tone="light">Read the docs</ArrowPill>
      </PageHero>
      <section className="bg-paper py-24">
        <div className="container-site">
          {integrationGroups.map((g, gi) => (
            <div key={g.title} className="grid gap-8 border-t border-line py-12 lg:grid-cols-[0.6fr_1.4fr]">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ice text-electric"><g.icon className="h-5 w-5" /></span>
                <div><span className="font-mono text-[12px] text-muted">0{gi + 1}</span><h2 className="text-h3">{g.title}</h2></div>
              </div>
              <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center justify-between rounded-2xl border border-line px-5 py-4 text-[15px] transition-colors hover:border-electric/40">
                    {it}
                    <span className="rounded-full bg-fog px-2 py-0.5 text-[11px] text-muted">Category</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading align="left" eyebrow="Technical connectivity" title="Webhooks keep every system in sync." description="Receive signed events for payments, refunds, payouts and subscriptions. Verify, acknowledge, then process asynchronously." />
          <CodeBlock title="app/api/yapay/route.ts (illustrative)" code={webhookSample} />
        </div>
      </section>
      <div className="h-16 bg-paper" />
      <FinalCTA />
    </>
  );
}
