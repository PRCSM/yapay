import { Check, DollarSign } from "lucide-react";
import { images } from "@/lib/images";
import { Logo } from "@/components/ui/Logo";
import { SmartImage } from "@/components/ui/SmartImage";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-charcoal p-2 sm:p-3 md:p-5">
      <main id="main" className="grid min-h-[calc(100svh-1rem)] overflow-hidden rounded-[22px] bg-paper md:min-h-[calc(100svh-2.5rem)] md:rounded-[28px] lg:grid-cols-2">
        <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
          <Logo tone="dark" />
          <div className="flex flex-1 items-center py-12">
            <div className="w-full max-w-[420px]">{children}</div>
          </div>
          <p className="text-[12px] text-muted">Demo environment — accounts are stored only in your browser. Never enter real card or banking details.</p>
        </div>
        <div className="relative hidden overflow-hidden bg-[#7b7a78] lg:block" data-cursor-tone="light">
          <SmartImage src={images.hero} alt="" fill sizes="50vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.45))]" />
          <div className="glass absolute bottom-[12%] left-1/2 w-[62%] -translate-x-1/2 rounded-[28px] p-4">
            <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-ink"><Check className="h-4 w-4" /></span>
            <div className="mt-40 flex items-center gap-3 rounded-2xl bg-[linear-gradient(135deg,rgba(23,105,255,0.8),rgba(8,82,214,0.7))] p-4 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 ring-1 ring-white/40"><DollarSign className="h-5 w-5" /></span>
              <span className="flex-1"><span className="block text-[14px] font-medium">Grocery Store</span><span className="text-[12px] text-white/70">Payment processed</span></span>
              <span className="text-[17px] font-medium tabular-nums">$36.17</span>
            </div>
          </div>
          <p className="absolute left-10 top-10 max-w-[18ch] text-[clamp(2rem,3vw,3rem)] font-[450] leading-[1.06] tracking-[-0.035em] text-white">Scale finance with smarter payments.</p>
        </div>
      </main>
    </div>
  );
}
