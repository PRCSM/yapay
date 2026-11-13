import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/lib/data/content";
import { images } from "@/lib/images";
import { formatDate } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { FinalCTA } from "@/components/home/FinalCTA";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <header className="bg-charcoal pb-16 pt-36 text-white md:pt-44" data-cursor-tone="light">
        <div className="container-site max-w-[900px]">
          <Link href="/resources" className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white"><ArrowLeft className="h-4 w-4" /> All resources</Link>
          <p className="mt-8 text-[12px] uppercase tracking-[0.14em] text-sky">{a.category} · {a.readTime} read</p>
          <h1 data-reveal className="mt-4 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em]">{a.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/65">{a.excerpt}</p>
          <p className="mt-6 text-[13px] text-white/45">Yapay Editorial · {formatDate(a.date, { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </header>
      <div className="container-site max-w-[1100px]">
        <div data-reveal="mask" className="relative -mt-0 aspect-[16/8] overflow-hidden rounded-[24px] bg-charcoal md:mt-10">
          <SmartImage src={images[a.image]} alt="" fill sizes="(min-width:1100px) 1100px, 100vw" className="object-cover" />
        </div>
      </div>
      <article className="container-site max-w-[720px] py-16">
        {a.body.map((p, i) => (
          <p key={i} className={i === 0 ? "text-[20px] leading-[1.6] text-ink" : "mt-6 text-[17px] leading-[1.75] text-[#333]"}>{p}</p>
        ))}
      </article>
      <section className="bg-mist py-20">
        <div className="container-site">
          <h2 className="text-h3">Keep reading</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/resources/${m.slug}`} className="group block rounded-[20px] bg-white p-6 ring-1 ring-line transition-transform duration-500 hover:-translate-y-1">
                  <span className="text-[12px] uppercase tracking-[0.14em] text-electric">{m.category}</span>
                  <h3 className="mt-2 text-[17px] font-medium leading-snug">{m.title}</h3>
                  <p className="mt-2 text-[14px] text-muted">{m.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="h-16 bg-paper" />
      <FinalCTA />
    </>
  );
}
