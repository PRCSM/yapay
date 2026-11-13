import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white" data-cursor-tone="light">
      <div className="container-site pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Payment infrastructure for growing businesses — accept, manage and understand every transaction from one platform.
            </p>
            <NewsletterForm />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden className="pointer-events-none mt-20 select-none overflow-hidden">
          <div className="text-[clamp(5rem,22vw,20rem)] font-medium leading-[0.8] tracking-[-0.06em] text-white/[0.06]">Yapay</div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Yapay. Concept product — figures, pricing, customers and testimonials shown are illustrative.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
