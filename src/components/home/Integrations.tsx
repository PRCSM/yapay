import { BarChart3, Boxes, Building2, CreditCard, Globe, Landmark, Plug, ShoppingBag, Smartphone, Store, Users, Webhook } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";

export const integrationGroups = [
  { title: "Payment methods", icon: CreditCard, items: ["Credit & debit cards", "Digital wallets", "Bank transfers", "Local payment methods", "Buy now, pay later"] },
  { title: "Commerce platforms", icon: ShoppingBag, items: ["Storefront plugins", "Headless commerce", "Point of sale", "Booking systems"] },
  { title: "Business tools", icon: BarChart3, items: ["Accounting exports", "CRM sync", "Data warehouse", "Spreadsheet exports"] },
  { title: "Technical connectivity", icon: Plug, items: ["REST API", "Signed webhooks", "Node.js & Python SDKs", "Hosted checkout"] },
];

export const partnerTypes = [
  { icon: Building2, title: "Agencies", body: "Build payment experiences for your clients." },
  { icon: Boxes, title: "Software platforms", body: "Embed payments into your product." },
  { icon: Users, title: "Referral partners", body: "Introduce businesses to Yapay." },
  { icon: Landmark, title: "Financial partners", body: "Banking and settlement relationships." },
];

const rail = [CreditCard, Smartphone, Landmark, Globe, Store, Webhook];

export function Integrations() {
  return (
    <section aria-labelledby="int-title" className="overflow-hidden bg-paper py-28">
      <div className="container-site">
        <SectionHeading eyebrow="Partners & integrations" title={<span id="int-title">Fits the stack you run today.</span>} description="Integration categories supported by the platform design. Partner names are intentionally omitted — no partnerships are implied." />
        <div aria-hidden className="relative mx-auto mt-14 flex max-w-[760px] items-center justify-between">
          <div className="absolute inset-x-6 top-1/2 h-px bg-[repeating-linear-gradient(90deg,#d6d6d6_0_6px,transparent_6px_12px)]" />
          {rail.map((Icon, i) => (
            <span key={i} data-reveal="scale" data-reveal-delay={String(i * 0.06)} className={`relative grid h-14 w-14 place-items-center rounded-2xl ${i === 2 ? "bg-electric text-white shadow-[0_14px_30px_-10px_rgba(8,102,249,0.7)]" : "border border-line bg-white text-ink"}`}>
              <Icon className="h-5 w-5" />
            </span>
          ))}
        </div>
        <ul data-reveal-stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrationGroups.map((g) => (
            <li key={g.title} className="rounded-[22px] border border-line p-6 transition-colors duration-300 hover:border-electric/40">
              <g.icon className="h-5 w-5 text-electric" />
              <h3 className="mt-5 text-[16px] font-medium">{g.title}</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-muted">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
