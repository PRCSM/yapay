import type { ImageKey } from "@/lib/images";

export type ProductPage = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: ImageKey;
  visual: "checkout" | "terminal" | "subscription" | "link" | "invoice" | "analytics";
  highlights: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const products: Record<string, ProductPage> = {
  payments: {
    slug: "payments", eyebrow: "Online payments", visual: "checkout", image: "online",
    title: "Accept payments everywhere your customers are.",
    intro: "A single integration for cards, wallets and bank transfers — with hosted, embedded or fully custom checkout.",
    highlights: [
      { title: "Hosted & embedded checkout", body: "Launch a branded checkout in minutes or embed payment fields into your own flow." },
      { title: "Cards, wallets & bank transfers", body: "Offer the methods customers expect, ordered by locale and device." },
      { title: "Risk screening", body: "Every payment is scored; tune rules for your business without code." },
      { title: "Refunds & disputes", body: "Full and partial refunds, plus a guided dispute evidence flow." },
    ],
    steps: [
      { title: "Create a checkout", body: "Use the dashboard or a single API call to create a checkout session." },
      { title: "Customer pays", body: "Hosted fields capture payment details securely on the provider side." },
      { title: "Get notified", body: "Receive a webhook and see the payment in your dashboard instantly." },
    ],
    faq: [
      { q: "Can I customise the checkout?", a: "Yes — colours, logo, copy and field order are configurable; embedded fields can be styled to match your site." },
      { q: "Do I need to handle card data?", a: "No. Payment details are captured by hosted fields so raw card data never reaches your servers." },
      { q: "Is this live?", a: "This is a concept site. The checkout shown is a simulation and processes no money." },
    ],
  },
  "tap-to-pay": {
    slug: "tap-to-pay", eyebrow: "Tap to Pay", visual: "terminal", image: "tapToPay",
    title: "Turn a phone into a contactless terminal.",
    intro: "Accept contactless cards and digital wallets on a compatible smartphone — ideal for pop-ups, deliveries and table service.",
    highlights: [
      { title: "No extra hardware", body: "Start taking contactless payments on a supported phone." },
      { title: "Wallets & cards", body: "Accept contactless cards and phone wallets in one tap." },
      { title: "Tips & receipts", body: "Optional tipping screens and digital receipts by email or SMS." },
      { title: "Unified reporting", body: "In-person sales appear alongside online payments." },
    ],
    steps: [
      { title: "Enter the amount", body: "Key in the total or pull it from your cart." },
      { title: "Customer taps", body: "The customer holds their card or phone near the device." },
      { title: "Done", body: "A confirmation appears and the receipt is sent." },
    ],
    faq: [
      { q: "Which phones are supported?", a: "In a real deployment, device support depends on the payment provider and the phone's NFC capabilities." },
      { q: "Can I use a terminal too?", a: "Yes — Tap to Pay and dedicated card readers report into the same dashboard." },
      { q: "Does the demo read cards?", a: "No. The interactive demo is visual only and never reads or stores card data." },
    ],
  },
  subscriptions: {
    slug: "subscriptions", eyebrow: "Subscriptions", visual: "subscription", image: "saas",
    title: "Recurring billing that runs itself.",
    intro: "Flat, per-seat, tiered and usage-based plans with trials, proration, retries and a self-serve customer portal.",
    highlights: [
      { title: "Any pricing model", body: "Combine fixed fees, seats and metered usage on the same plan." },
      { title: "Trials & coupons", body: "Free trials, introductory pricing and promotion codes." },
      { title: "Smart retries", body: "Configurable retry schedules and reminder emails for failed renewals." },
      { title: "Customer portal", body: "Customers manage plans, invoices and payment methods themselves." },
    ],
    steps: [
      { title: "Define a plan", body: "Set price, interval and any trial or usage component." },
      { title: "Subscribe customers", body: "Via checkout, API or payment link." },
      { title: "Bill automatically", body: "Invoices, charges, retries and receipts on schedule." },
    ],
    faq: [
      { q: "Can customers switch plans mid-cycle?", a: "Yes. Changes can be prorated immediately or applied at the next renewal." },
      { q: "Do you support usage billing?", a: "Yes — report usage via API and it is aggregated onto the next invoice." },
      { q: "Are the numbers shown real?", a: "No, all subscription data on this site is illustrative." },
    ],
  },
  "payment-links": {
    slug: "payment-links", eyebrow: "Payment Links", visual: "link", image: "merchant",
    title: "Get paid with a link. No website required.",
    intro: "Create a branded payment page in seconds and share it anywhere — email, chat, social or a printed QR code.",
    highlights: [
      { title: "Share anywhere", body: "Links and QR codes work across every channel." },
      { title: "Fixed or flexible amounts", body: "Set a price, accept deposits or let customers choose." },
      { title: "Split bills", body: "Divide a total between several payers, each with their own link." },
      { title: "Track status", body: "See which links were opened and paid." },
    ],
    steps: [
      { title: "Create a link", body: "Name it, set an amount and choose payment methods." },
      { title: "Share it", body: "Copy the URL or download a QR code." },
      { title: "Get paid", body: "Receive the payment and an automatic receipt is sent." },
    ],
    faq: [
      { q: "Can a link be reused?", a: "Links can be single-use or reusable, and can be deactivated at any time." },
      { q: "Can I collect extra details?", a: "Yes — add custom fields such as an order reference or delivery notes." },
      { q: "Can I try it?", a: "Yes, the merchant dashboard demo lets you create simulated links." },
    ],
  },
  billing: {
    slug: "billing", eyebrow: "Billing", visual: "invoice", image: "office",
    title: "Invoices that get paid on time.",
    intro: "Create professional invoices, send automatic reminders and reconcile payments the moment they land.",
    highlights: [
      { title: "Branded invoices", body: "Your logo, terms and line items, delivered by email or link." },
      { title: "Automatic reminders", body: "Polite, scheduled nudges before and after the due date." },
      { title: "Multiple payment options", body: "Customers can pay by card, wallet or bank transfer." },
      { title: "Auto-reconciliation", body: "Payments are matched to invoices automatically." },
    ],
    steps: [
      { title: "Draft", body: "Add a customer and line items, or generate from a subscription." },
      { title: "Send", body: "Email the invoice with a secure payment link." },
      { title: "Collect", body: "Track status from open to paid and export for accounting." },
    ],
    faq: [
      { q: "Can I export invoices?", a: "Yes — download PDFs and export CSVs for your accounting tools." },
      { q: "Can invoices be partially paid?", a: "Yes, partial payments are tracked against the outstanding balance." },
      { q: "Is the invoice data real?", a: "No — invoices in the demo are sample data stored in your browser." },
    ],
  },
  analytics: {
    slug: "analytics", eyebrow: "Analytics", visual: "analytics", image: "analytics",
    title: "Understand every transaction at a glance.",
    intro: "Volume, success rates, refunds and payment-method mix in real time — with exports and scheduled reports.",
    highlights: [
      { title: "Live dashboards", body: "Key payment metrics updated as transactions happen." },
      { title: "Drill-downs", body: "Filter by date, method, channel, country or customer." },
      { title: "Exports & schedules", body: "CSV exports and scheduled email reports for finance." },
      { title: "Anomaly spotting", body: "Visual cues when success or refund rates move unusually." },
    ],
    steps: [
      { title: "Connect", body: "Analytics work automatically with your Yapay payments." },
      { title: "Explore", body: "Pick a period and slice by the dimensions that matter." },
      { title: "Share", body: "Export or schedule reports for your team." },
    ],
    faq: [
      { q: "How fresh is the data?", a: "In a production system, dashboards update as payment events arrive." },
      { q: "Can I build custom reports?", a: "Yes — combine filters and save views for your team." },
      { q: "Is the chart data real?", a: "No — all analytics on this site are generated demonstration data." },
    ],
  },
};
