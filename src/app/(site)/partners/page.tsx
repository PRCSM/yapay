import type { Metadata } from "next";
import { partnerTypes } from "@/components/home/Integrations";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { PartnerForm } from "@/components/forms/PartnerForm";

export const metadata: Metadata = { title: "Partner program", description: "Build, embed and refer with Yapay." };

const benefits = [
  ["Partner dashboard", "Track referred accounts and their onboarding status."],
  ["Technical enablement", "Sandbox access, integration reviews and launch checklists."],
  ["Co-marketing", "Joint case studies and listings once you're live."],
  ["Revenue share", "Program terms would be agreed individually — none are published for this concept."],
];

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Grow with Yapay." intro="Agencies, software platforms and referral partners help businesses get more from their payments. Here's how a partnership could work." image="team" />
      <section className="bg-paper py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Partner types" title="Find your fit." />
          <ul data-reveal-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((p) => (
              <li key={p.title} className="rounded-[22px] border border-line p-7">
                <p.icon className="h-6 w-6 text-electric" />
                <h3 className="mt-8 text-[18px] font-medium">{p.title}</h3>
                <p className="mt-2 text-[14px] text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Benefits" title="What partners get." />
            <dl className="mt-10 space-y-6">
              {benefits.map(([t, b]) => (
                <div key={t} className="border-t border-line pt-5"><dt className="text-[16px] font-medium">{t}</dt><dd className="mt-1 text-[14px] text-muted">{b}</dd></div>
              ))}
            </dl>
          </div>
          <div><h2 className="text-h3 mb-6">Apply to the program</h2><PartnerForm /></div>
        </div>
      </section>
    </>
  );
}
