import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Marketing shell: charcoal outer canvas with a centred, rounded site container (as in the reference). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-charcoal p-2 sm:p-3 md:p-5">
        <main id="main" className="relative overflow-hidden rounded-[22px] bg-paper md:rounded-[28px]">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
