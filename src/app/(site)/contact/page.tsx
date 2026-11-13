import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Contact sales", description: "Talk to the Yapay team about payments for your business." };

export default function ContactPage() {
  return (
    <>
      <PageHero compact eyebrow="Contact" title="Let's talk payments." intro="Tell us about your business and we'll help you find the right setup — from your first payment to enterprise volume." />
      <section className="bg-mist py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-8">
            {[
              { icon: Mail, t: "Email", b: "sales@yapay.example (demo address)" },
              { icon: Clock, t: "Response time", b: "Typically within one business day" },
              { icon: MapPin, t: "Coverage", b: "Remote-first, supporting businesses internationally" },
            ].map((x) => (
              <div key={x.t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-electric ring-1 ring-line"><x.icon className="h-5 w-5" /></span>
                <span><span className="block text-[15px] font-medium">{x.t}</span><span className="text-[14px] text-muted">{x.b}</span></span>
              </div>
            ))}
            <p className="rounded-2xl bg-white p-5 text-[13px] leading-relaxed text-muted ring-1 ring-line">
              This form is validated in your browser and again on the server. In this concept build, submissions are not stored or sent anywhere.
            </p>
          </aside>
          <Suspense fallback={<div className="h-[560px] rounded-[24px] bg-white ring-1 ring-line" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
