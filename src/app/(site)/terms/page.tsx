import type { Metadata } from "next";
import { Legal } from "@/components/pages/Legal";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Legal title="Terms of use" updated="November 13, 2026" sections={[
      { h: "About this site", p: ["This website presents Yapay, a fictional payments platform, for demonstration purposes. No financial services are offered."] },
      { h: "No real transactions", p: ["All checkouts, balances, invoices, payouts and transactions shown are simulated. No money is moved and no payment instrument is charged."] },
      { h: "Illustrative content", p: ["Pricing, fees, customer names, testimonials and metrics are illustrative samples and must not be relied upon."] },
      { h: "Acceptable use", p: ["Do not enter real payment card numbers, bank credentials or other sensitive financial data anywhere on this site."] },
      { h: "Third-party content", p: ["Photography is provided via Unsplash under the Unsplash License. Generic payment categories shown do not imply partnerships with any provider."] },
      { h: "Changes", p: ["These terms may be updated as the concept evolves."] },
    ]} />
  );
}
