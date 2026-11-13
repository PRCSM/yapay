import { PageHero } from "./PageHero";

export function Legal({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <>
      <PageHero compact eyebrow="Legal" title={title} intro={`Last updated ${updated}. This is template text for a concept product and is not legal advice.`} />
      <section className="bg-paper py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Sections" className="lg:sticky lg:top-28 lg:self-start">
            <ol className="space-y-2 text-[14px] text-muted">
              {sections.map((s, i) => <li key={s.h}><a href={`#s${i}`} className="hover:text-ink">{i + 1}. {s.h}</a></li>)}
            </ol>
          </nav>
          <div className="max-w-[720px]">
            {sections.map((s, i) => (
              <section key={s.h} id={`s${i}`} className="scroll-mt-28 border-t border-line py-8 first:border-t-0 first:pt-0">
                <h2 className="text-[22px] font-medium tracking-[-0.02em]">{i + 1}. {s.h}</h2>
                {s.p.map((p, k) => <p key={k} className="mt-3 text-[15px] leading-relaxed text-muted">{p}</p>)}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
