import type { ReactNode } from "react";
import { images, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";

/** Dark hero used across supporting pages so the transparent header always sits on a dark surface. */
export function PageHero({
  eyebrow, title, intro, image, children, aside, compact = false,
}: { eyebrow?: string; title: ReactNode; intro?: ReactNode; image?: ImageKey; children?: ReactNode; aside?: ReactNode; compact?: boolean }) {
  return (
    <section data-cursor-tone="light" className={cn("relative isolate overflow-hidden bg-charcoal text-white", compact ? "pb-16 pt-36 md:pt-44" : "pb-20 pt-40 md:pb-28 md:pt-52")}>
      {image && (
        <>
          <SmartImage src={images[image]} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-55" fallbackClassName="-z-20 opacity-60" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,20,20,0.92)_0%,rgba(20,20,20,0.6)_55%,rgba(20,20,20,0.35)_100%)]" />
        </>
      )}
      {!image && <div aria-hidden className="absolute -right-40 -top-56 -z-10 h-[620px] w-[620px] rounded-full bg-electric/25 blur-[150px]" />}
      <div className={cn("container-site", aside && "grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]")}>
        <div>
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h1 className="text-display mt-5 max-w-[16ch]">
            <span className="line-mask"><span data-reveal="up">{title}</span></span>
          </h1>
          {intro && <p data-reveal data-reveal-delay="0.1" className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-white/65">{intro}</p>}
          {children && <div data-reveal data-reveal-delay="0.18" className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div data-reveal="right">{aside}</div>}
      </div>
    </section>
  );
}
