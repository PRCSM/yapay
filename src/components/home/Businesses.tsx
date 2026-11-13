import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/data/content";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";

const layout = ["lg:col-span-7 lg:row-span-2 min-h-[520px]", "lg:col-span-5 min-h-[250px]", "lg:col-span-5 min-h-[250px]", "lg:col-span-12 min-h-[320px]"];

/** Asymmetric editorial grid of the four solution categories. */
export function Businesses() {
  return (
    <section aria-labelledby="biz-title" className="bg-paper py-28">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading align="left" eyebrow="Built for modern businesses" title={<span id="biz-title">Whatever you sell, wherever you sell it.</span>} />
          <p data-reveal className="max-w-[40ch] text-[15px] leading-relaxed text-muted">
            Yapay adapts to your business model — from a single storefront to a platform paying thousands of sellers.
          </p>
        </div>
        <ul data-reveal-stagger className="mt-14 grid gap-4 lg:grid-cols-12">
          {solutions.map((s, i) => (
            <li key={s.slug} className={cn("relative", layout[i])}>
              <Link
                href={`/solutions/${s.slug}`}
                data-cursor="view"
                data-cursor-tone="light"
                className="group absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[22px] bg-charcoal p-7 text-white"
              >
                <SmartImage
                  src={images[s.image]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.05)_20%,rgba(9,9,9,0.82)_100%)]" />
                <div className="relative flex items-end justify-between gap-6">
                  <div className={cn(i === 3 && "lg:flex lg:items-end lg:gap-10")}>
                    <span className="text-[12px] uppercase tracking-[0.14em] text-white/60">0{i + 1}</span>
                    <h3 className="mt-2 text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.02em]">{s.name}</h3>
                    <p className="mt-2 max-w-[42ch] text-[14px] leading-relaxed text-white/70">{s.short}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-[background-color,transform] duration-500 group-hover:rotate-45 group-hover:bg-electric">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
