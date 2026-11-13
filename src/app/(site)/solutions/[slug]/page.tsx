import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { solutions } from "@/lib/data/content";
import { images } from "@/lib/images";
import { ArrowPill, ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedProducts } from "@/components/pages/RelatedProducts";
import { ProductVisual } from "@/components/mockups/ProductVisual";
import { FinalCTA } from "@/components/home/FinalCTA";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  return s ? { title: `${s.name} payments`, description: s.short } : {};
}

const visualFor = { ecommerce: "checkout", saas: "subscription", retail: "terminal", marketplaces: "analytics" } as const;

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = solutions.filter((x) => x.slug !== s.slug);
  return (
    <>
      <PageHero eyebrow={`Solutions · ${s.name}`} title={s.headline} intro={s.intro} image={s.image}>
        <ButtonLink href="/signup" size="lg" magnetic>Get started</ButtonLink>
        <ArrowPill href="/contact" tone="light">Talk to Sales</ArrowPill>
      </PageHero>

      <section className="bg-paper py-24">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <ul data-reveal-stagger className="mt-8 space-y-6">
              {s.points.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
                  <span>
                    <span className="block text-[17px] font-medium">{p.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-muted">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="scale" className="rounded-[28px] bg-[linear-gradient(160deg,#f4f7ff,#eef1f6)] p-5 sm:p-10">
            <ProductVisual kind={visualFor[s.slug]} />
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Other solutions" title="Built for more than one model." />
          <ul data-reveal-stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/solutions/${o.slug}`} data-cursor="view" className="group relative block h-72 overflow-hidden rounded-[22px] bg-charcoal" data-cursor-tone="light">
                  <SmartImage src={images[o.image]} alt="" fill sizes="33vw" className="object-cover opacity-80 transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(9,9,9,0.85))]" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-[20px] font-medium">{o.name}</h3>
                    <p className="mt-1 text-[13px] text-white/70">{o.short}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="h-24 bg-paper" />
      <RelatedProducts />
      <FinalCTA />
    </>
  );
}
