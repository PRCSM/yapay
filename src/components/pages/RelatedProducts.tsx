import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data/products";

const order = ["payments", "tap-to-pay", "subscriptions", "payment-links", "billing", "analytics"];

export function RelatedProducts({ current, title = "Explore the platform" }: { current?: string; title?: string }) {
  const list = order.filter((s) => s !== current).map((s) => products[s]);
  return (
    <section className="bg-paper pb-24">
      <div className="container-site">
        <h2 className="text-h3">{title}</h2>
        <ul data-reveal-stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <Link href={`/${p.slug}`} className="group flex h-full items-start justify-between gap-4 rounded-[20px] border border-line p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-electric/40">
                <span>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-muted">{p.eyebrow}</span>
                  <span className="mt-2 block text-[16px] font-medium leading-snug">{p.title}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-electric" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
