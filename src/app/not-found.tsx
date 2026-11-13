import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { ArrowPill } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-svh bg-charcoal p-2 sm:p-3 md:p-5">
        <main id="main" className="relative grid min-h-[calc(100svh-2.5rem)] place-items-center overflow-hidden rounded-[22px] bg-charcoal text-white md:rounded-[28px]" data-cursor-tone="light">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-[140px]" />
          <div className="relative px-6 text-center">
            <div className="glass mx-auto w-[260px] rounded-[24px] p-3">
              <div className="flex items-center gap-3 rounded-2xl bg-[#d93a3a]/80 p-3 text-left">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 font-medium">!</span>
                <span className="flex-1"><span className="block text-[13px] font-medium">Page not found</span><span className="text-[11px] text-white/70">Transaction declined</span></span>
                <span className="font-mono text-[15px]">404</span>
              </div>
            </div>
            <h1 className="text-display mt-10">This route didn't clear.</h1>
            <p className="mx-auto mt-4 max-w-[44ch] text-white/60">The page you're looking for doesn't exist or has moved. No charges were made.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ArrowPill href="/" tone="blue">Back to home</ArrowPill>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm hover:border-white">Contact us</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
