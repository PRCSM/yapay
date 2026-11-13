import { ArrowPill, ButtonLink } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/mockups/Mockups";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-paper px-3 pb-3 md:px-5 md:pb-5">
      <div data-reveal="mask" data-cursor-tone="light" className="relative isolate overflow-hidden rounded-[24px] bg-electric px-6 py-20 text-white md:px-16 md:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(255,255,255,0.25),transparent_60%),radial-gradient(50%_70%_at_0%_100%,rgba(0,20,90,0.5),transparent_60%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="cta-title" data-reveal className="text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              Move money
              <br />
              smarter.
            </h2>
            <p data-reveal className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-white/80">
              Build simpler payment experiences for your customers and your finance team — online, in person and everywhere in between.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/signup" variant="light" size="lg" magnetic>Get Started</ButtonLink>
              <ArrowPill href="/contact" tone="dark">Talk to Sales</ArrowPill>
            </div>
          </div>
          <div data-reveal="up" className="relative hidden h-[440px] lg:block">
            <PhoneMockup className="absolute left-[2%] top-10 w-[48%] rotate-[-7deg]" title="Payouts" amount="$12,480" status="Payout scheduled" dark />
            <PhoneMockup className="absolute right-[2%] top-0 w-[48%] rotate-[6deg]" title="Send Money" amount="$36.17" />
          </div>
        </div>
      </div>
    </section>
  );
}
