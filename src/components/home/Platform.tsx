import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GatewayPanel } from "./GatewayPanel";
import { PhoneMockup, ReceiptMockup, TerminalMockup } from "@/components/mockups/Mockups";

const cards = [
  {
    title: ["Tap to Pay A Modern", "Payment Solution"],
    body: "Accept contactless payments directly through your smartphone.",
    href: "/tap-to-pay",
    visual: <TerminalMockup className="translate-y-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-2" />,
    bg: "bg-[linear-gradient(180deg,#fff_0%,#f3f4f6_100%)]",
  },
  {
    title: ["Let's Capture", "Bills To Split Bills"],
    body: "Let's simplify splitting bills with our easy online payment solution!",
    href: "/payment-links",
    visual: <ReceiptMockup className="translate-y-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:rotate-1" />,
    bg: "bg-[linear-gradient(180deg,#fff_0%,#f4f4f2_100%)]",
  },
  {
    title: ["Accelerate Your", "Payment Processes"],
    body: "Create and distribute secure payment links with ease.",
    href: "/payments",
    visual: <PhoneMockup className="translate-y-8 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-3" />,
    bg: "bg-[linear-gradient(180deg,#fff_0%,#f2f5fb_100%)]",
  },
];

/** Section 2 — centred intro, the electric-blue gateway panel and three product cards (as in the reference). */
export function Platform() {
  return (
    <section aria-labelledby="platform-title" className="bg-paper pb-24 pt-[clamp(4.5rem,7.5vw,7rem)]">
      <div className="mx-auto w-full max-w-[1080px] px-5 md:w-[74%] md:px-0">
        <div className="text-center">
          <h2 id="platform-title" data-reveal className="mx-auto text-[clamp(1.9rem,3.45vw,3.2rem)] font-[450] leading-[1.12] tracking-[-0.03em] text-ink">
            An all-in-one platform
            <br />
            for smarter payment processes
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mx-auto mt-5 max-w-[470px] text-[14px] leading-relaxed text-muted">
            Choose Yapay for seamless online and in-person payments, subscriptions, billing and financial
            operations — with fraud screening built into every transaction.
          </p>
        </div>

        <div className="mt-[clamp(2rem,3.4vw,3rem)]">
          <GatewayPanel />
        </div>

        <ul data-reveal-stagger className="mt-4 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                data-cursor="view"
                className={`group relative flex h-[360px] flex-col overflow-hidden rounded-[20px] border border-line p-6 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-electric/40 hover:shadow-[0_30px_60px_-36px_rgba(8,102,249,0.45)] ${c.bg}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[19px] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
                    {c.title[0]}
                    <br />
                    {c.title[1]}
                  </h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink transition-[background-color,color,border-color,transform] duration-500 group-hover:rotate-45 group-hover:border-electric group-hover:bg-electric group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 max-w-[240px] text-[13px] leading-snug text-muted">{c.body}</p>
                <div className="relative mt-auto">{c.visual}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
