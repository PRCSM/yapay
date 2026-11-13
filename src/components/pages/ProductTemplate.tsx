import type { ProductPage } from "@/lib/data/products";
import { ArrowPill, ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { ProductVisual } from "@/components/mockups/ProductVisual";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Faq } from "./Faq";
import { PageHero } from "./PageHero";
import { RelatedProducts } from "./RelatedProducts";

export function ProductTemplate({ page }: { page: ProductPage }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} image={page.image}>
        <ButtonLink href="/signup" size="lg" magnetic>Get started</ButtonLink>
        <ArrowPill href="/contact" tone="light">Talk to Sales</ArrowPill>
      </PageHero>

      <section className="bg-paper py-24">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Why {page.eyebrow}</Eyebrow>
            <ul data-reveal-stagger className="mt-8 grid gap-6 sm:grid-cols-2">
              {page.highlights.map((h, i) => (
                <li key={h.title} className="border-t border-line pt-5">
                  <span className="font-mono text-[12px] text-electric">0{i + 1}</span>
                  <h3 className="mt-2 text-[17px] font-medium tracking-[-0.01em]">{h.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{h.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="scale" className="rounded-[28px] bg-[linear-gradient(160deg,#f4f7ff,#eef1f6)] p-5 sm:p-10">
            <ProductVisual kind={page.visual} />
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-site">
          <SectionHeading eyebrow="How it works" title="Three steps. That's it." />
          <ol data-reveal-stagger className="relative mt-14 grid gap-4 md:grid-cols-3">
            {page.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-[22px] bg-white p-7 ring-1 ring-line">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-electric text-[14px] font-medium text-white">{i + 1}</span>
                <h3 className="mt-6 text-[18px] font-medium">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading align="left" eyebrow="FAQ" title="Questions, answered." />
          <Faq items={page.faq} />
        </div>
      </section>

      <RelatedProducts current={page.slug} />
      <FinalCTA />
    </>
  );
}
