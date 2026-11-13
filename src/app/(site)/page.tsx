import { Hero } from "@/components/home/Hero";
import { Platform } from "@/components/home/Platform";
import { Infrastructure } from "@/components/home/Infrastructure";
import { SolutionsTabs } from "@/components/home/SolutionsTabs";
import { PaymentDemo } from "@/components/home/PaymentDemo";
import { Businesses } from "@/components/home/Businesses";
import { Intelligence } from "@/components/home/Intelligence";
import { Developer } from "@/components/home/Developer";
import { Integrations } from "@/components/home/Integrations";
import { PricingSection } from "@/components/home/PricingSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Platform />
      <Infrastructure />
      <SolutionsTabs />
      <PaymentDemo />
      <Businesses />
      <Intelligence />
      <Developer />
      <Integrations />
      <PricingSection />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
