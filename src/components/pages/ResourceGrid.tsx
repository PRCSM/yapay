"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Article } from "@/lib/data/content";
import { images } from "@/lib/images";
import { cn, formatDate } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

export function ResourceGrid({ articles }: { articles: readonly Article[] }) {
  const cats = useMemo(() => ["All", ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = articles.filter((a) => (cat === "All" || a.category === cat) && (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase()));
  const [feature, ...rest] = list;
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="no-scrollbar flex gap-2 overflow-x-auto">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("shrink-0 rounded-full px-4 py-2 text-[13px] transition-colors", cat === c ? "bg-ink text-white" : "bg-fog text-ink hover:bg-line")}>{c}</button>
          ))}
        </div>
        <label className="flex h-11 items-center gap-2 rounded-full border border-line px-4 focus-within:border-electric md:w-72">
          <Search className="h-4 w-4 text-muted" />
          <span className="sr-only">Search articles</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="w-full bg-transparent text-[14px] outline-none" />
        </label>
      </div>
      {list.length === 0 && <p className="mt-16 text-center text-muted" role="status">No articles match your search.</p>}
      {feature && (
        <Link href={`/resources/${feature.slug}`} data-cursor="view" className="group mt-10 grid overflow-hidden rounded-[24px] border border-line md:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden bg-charcoal">
            <SmartImage src={images[feature.image]} alt="" fill sizes="50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-[12px] uppercase tracking-[0.14em] text-electric">{feature.category} · {feature.readTime}</span>
            <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.025em]">{feature.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{feature.excerpt}</p>
            <span className="mt-6 text-[13px] text-muted">{formatDate(feature.date, { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </Link>
      )}
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <li key={a.slug}>
            <Link href={`/resources/${a.slug}`} data-cursor="view" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-charcoal">
                <SmartImage src={images[a.image]} alt="" fill sizes="33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              </div>
              <span className="mt-4 block text-[12px] uppercase tracking-[0.14em] text-electric">{a.category} · {a.readTime}</span>
              <h3 className="mt-2 text-[18px] font-medium leading-snug tracking-[-0.01em] group-hover:underline group-hover:underline-offset-4">{a.title}</h3>
              <p className="mt-1.5 text-[14px] text-muted">{a.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
