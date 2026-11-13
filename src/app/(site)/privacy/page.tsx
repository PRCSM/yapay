import type { Metadata } from "next";
import { Legal } from "@/components/pages/Legal";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy notice" updated="November 13, 2026" sections={[
      { h: "Who we are", p: ["Yapay is a concept website demonstrating a payments product. It is not operated as a live financial service."] },
      { h: "Information this site handles", p: ["Contact and partner forms are validated on the server and then discarded; they are not stored or forwarded in this build.", "The merchant dashboard and demo account keep sample data in your browser's local storage so your changes persist on this device. You can clear it at any time from the dashboard or your browser settings."] },
      { h: "Payment data", p: ["This site never asks for, collects or stores real card numbers or bank details. The checkout demo is a visual simulation.", "A production deployment should capture payment details only through a regulated payment provider's hosted fields."] },
      { h: "Cookies and analytics", p: ["This build sets no tracking cookies and includes no third-party analytics. Images are loaded from Unsplash's CDN."] },
      { h: "Your choices", p: ["Because no personal data is retained server-side, there is nothing for us to export or delete. Local demo data can be removed from the dashboard via ‘Reset demo data’."] },
      { h: "Contact", p: ["Questions about this notice can be sent through the contact page."] },
    ]} />
  );
}
