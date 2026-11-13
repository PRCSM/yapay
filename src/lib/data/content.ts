import type { ImageKey } from "@/lib/images";

export const solutions = [
  {
    slug: "ecommerce",
    name: "E-commerce",
    short: "Conversion-focused checkout, saved payment methods and global wallets for online stores.",
    image: "ecommerce" as ImageKey,
    headline: "Checkout that keeps carts moving.",
    intro:
      "From first purchase to repeat orders, Yapay gives online stores a fast, mobile-first checkout with the payment methods shoppers already use.",
    points: [
      { title: "Optimised checkout", body: "Hosted or embedded checkout with address autocomplete, saved methods and one-tap wallets." },
      { title: "Local payment methods", body: "Offer cards, wallets, bank transfers and instalments by region from a single integration." },
      { title: "Fraud screening", body: "Risk scoring on every transaction with rules you can tune for your catalogue." },
      { title: "Refunds & disputes", body: "Issue partial or full refunds and respond to disputes with evidence from one view." },
    ],
    metric: { label: "Illustrative checkout steps", value: "3 → 1" },
  },
  {
    slug: "saas",
    name: "SaaS Platforms",
    short: "Subscriptions, usage-based pricing, invoicing and revenue recovery for software companies.",
    image: "saas" as ImageKey,
    headline: "Recurring revenue, without the spreadsheets.",
    intro:
      "Model any pricing — seats, tiers, usage or hybrids — and let Yapay handle proration, invoicing, retries and revenue reporting.",
    points: [
      { title: "Flexible plans", body: "Flat, per-seat, tiered and metered pricing with trials and coupons." },
      { title: "Smart retries", body: "Configurable retry schedules and dunning emails to recover failed renewals." },
      { title: "Customer portal", body: "Let customers update payment methods, download invoices and change plans." },
      { title: "Revenue reporting", body: "MRR, churn and cohort views built from your live billing data." },
    ],
    metric: { label: "Pricing models supported", value: "4+" },
  },
  {
    slug: "retail",
    name: "Retail",
    short: "In-person payments with Tap to Pay, card terminals and unified online + offline reporting.",
    image: "retail" as ImageKey,
    headline: "Every counter, every channel, one ledger.",
    intro:
      "Take contactless payments on a phone or terminal, sync inventory-ready receipts, and reconcile in-store and online sales together.",
    points: [
      { title: "Tap to Pay", body: "Accept contactless cards and wallets on a compatible smartphone — no extra hardware." },
      { title: "Terminals", body: "Countertop and handheld readers for busy checkouts and table service." },
      { title: "Unified reporting", body: "In-store and online sales in the same dashboard and payout reports." },
      { title: "Tips & split bills", body: "Built-in tipping and bill splitting for hospitality." },
    ],
    metric: { label: "Channels in one view", value: "All" },
  },
  {
    slug: "marketplaces",
    name: "Marketplaces",
    short: "Onboard sellers, split payments and route payouts across a multi-party platform.",
    image: "marketplace" as ImageKey,
    headline: "Move money between every side of your platform.",
    intro:
      "Collect from buyers, split funds between sellers and your platform fee, and schedule payouts — with onboarding and verification flows built in.",
    points: [
      { title: "Seller onboarding", body: "Hosted onboarding that collects the information needed for verification." },
      { title: "Split payments", body: "Divide a single charge between multiple recipients and your platform fee." },
      { title: "Payout scheduling", body: "Daily, weekly or on-demand payouts per seller." },
      { title: "Platform reporting", body: "Track volume, fees and balances per connected account." },
    ],
    metric: { label: "Parties per payment", value: "N" },
  },
] as const;

export type Solution = (typeof solutions)[number];

export const testimonials = [
  {
    quote: "We moved checkout, subscriptions and invoicing onto one platform. Finance closes the month in days instead of weeks.",
    name: "Amara Okafor", role: "Head of Finance", company: "Northwind Studio",
  },
  {
    quote: "Tap to Pay let our pop-up team take cards on their phones the same afternoon we signed up.",
    name: "Lucas Moreau", role: "Operations Lead", company: "Fieldhouse Coffee",
  },
  {
    quote: "The API is genuinely pleasant. Webhooks are predictable and the docs answer the question before we ask it.",
    name: "Priya Raman", role: "Staff Engineer", company: "Ledgerline",
  },
  {
    quote: "Split payments made our marketplace payouts boring — which is exactly what we wanted.",
    name: "Daniel Kim", role: "Co-founder", company: "Makerlane",
  },
];

export const articles = [
  {
    slug: "reduce-checkout-friction",
    title: "Seven ways to reduce checkout friction",
    category: "Guide",
    readTime: "6 min",
    date: "2026-10-14",
    image: "online" as ImageKey,
    excerpt: "Small changes to forms, payment-method ordering and error states compound into meaningfully higher conversion.",
    body: [
      "Checkout is where intent turns into revenue — and where small frictions quietly cost the most. Most improvements are not dramatic redesigns but a series of careful removals.",
      "Start by measuring. Instrument each step: page view, first field focus, payment-method selection, submit, and success. Drop-off between any two steps tells you where to look first.",
      "Ask for less. Every optional field is a decision. Use address autocomplete, infer country from the shipping address and only ask for a phone number if you will genuinely use it.",
      "Order payment methods by local preference. Showing the methods your customers already use — wallets on mobile, bank transfers in some regions — reduces hesitation.",
      "Write error messages that fix things. 'Card number is incomplete' is better than 'Invalid input'; validating as the customer types is better still.",
      "Keep people in place. Redirects and new tabs introduce doubt. Embedded or hosted flows that feel native to your brand build confidence.",
      "Finally, test on real devices and slow networks. A checkout that feels instant on office Wi-Fi can feel broken on a train.",
    ],
  },
  {
    slug: "subscription-dunning-playbook",
    title: "A practical dunning playbook for subscription teams",
    category: "Playbook",
    readTime: "8 min",
    date: "2026-09-30",
    image: "saas" as ImageKey,
    excerpt: "Failed renewals are often recoverable. Retry timing, messaging and card-update flows make the difference.",
    body: [
      "Involuntary churn — customers who leave because a payment failed, not because they chose to — is one of the most recoverable revenue leaks in a subscription business.",
      "Retry with intent. Spread retries over several days rather than hammering the card in an hour; failure reasons such as insufficient funds often resolve on payday.",
      "Pair retries with clear, friendly messages and a one-click link to update the payment method. Make the update page fast and mobile-friendly.",
      "Consider a short grace period before restricting access. Customers who feel respected are more likely to fix the issue.",
      "Review your recovery funnel monthly: how many failures, how many recovered by retry, how many by customer action, and how many lost.",
    ],
  },
  {
    slug: "in-person-payments-checklist",
    title: "The in-person payments checklist for new stores",
    category: "Checklist",
    readTime: "5 min",
    date: "2026-09-12",
    image: "counter" as ImageKey,
    excerpt: "Hardware, receipts, tipping, refunds and reconciliation — what to settle before opening day.",
    body: [
      "Opening a physical location means making a dozen payment decisions at once. Settling them early avoids awkward moments at the counter.",
      "Decide where payments happen: a fixed counter, at the table, or anywhere on the floor. That determines whether you need countertop terminals, handheld readers or Tap to Pay on phones.",
      "Configure receipts — printed, emailed or both — and make sure your business details and refund policy are on them.",
      "Agree on refunds and tipping before launch, and train staff on both flows.",
      "Finally, check that in-store sales land in the same reports as online sales so end-of-day reconciliation is a glance, not a project.",
    ],
  },
  {
    slug: "webhooks-done-right",
    title: "Webhooks done right: idempotency, retries and ordering",
    category: "Engineering",
    readTime: "9 min",
    date: "2026-08-28",
    image: "analytics" as ImageKey,
    excerpt: "Design webhook consumers that tolerate duplicates, out-of-order delivery and downtime.",
    body: [
      "Webhooks are how a payments platform tells your system that something happened. Treat them as at-least-once, possibly out-of-order messages.",
      "Verify signatures on every request using the signing secret, and reject anything that fails verification or falls outside a short timestamp tolerance.",
      "Make handlers idempotent. Store the event ID and skip events you have already processed — duplicates are normal, not exceptional.",
      "Acknowledge quickly, process asynchronously. Return a 2xx as soon as the event is safely queued; do heavy work in a background job.",
      "Don't rely on ordering. When state matters, fetch the latest object from the API rather than trusting the sequence events arrived in.",
    ],
  },
  {
    slug: "payment-links-for-services",
    title: "Getting paid faster with payment links",
    category: "Guide",
    readTime: "4 min",
    date: "2026-08-04",
    image: "merchant" as ImageKey,
    excerpt: "For service businesses and creators, a link can replace a website checkout entirely.",
    body: [
      "Not every business needs a full online store. Consultants, tutors, makers and event organisers often just need a reliable way to request money.",
      "A payment link is a hosted checkout page you can share by email, chat or QR code. Set a fixed amount, let customers choose, or collect a deposit.",
      "Brand the page, add a short description and choose which payment methods to accept. Links can be single-use or reusable.",
      "Track which links were paid from your dashboard, and send automatic receipts so customers have a record.",
    ],
  },
  {
    slug: "reading-your-payment-analytics",
    title: "Reading your payment analytics like a finance lead",
    category: "Insights",
    readTime: "7 min",
    date: "2026-07-20",
    image: "analytics" as ImageKey,
    excerpt: "Authorisation rate, refund rate and payment-method mix tell a richer story than volume alone.",
    body: [
      "Gross volume is the headline, but it hides the details that explain it. A few additional metrics turn a dashboard into a diagnostic tool.",
      "Authorisation rate shows how many attempted payments succeed. A sudden drop often points to an integration change or a specific card issuer.",
      "Refund rate, tracked by product or channel, highlights fulfilment or expectation issues early.",
      "Payment-method mix shows how customers prefer to pay — and where adding a method could unlock demand.",
      "Look at trends, not single days, and compare like with like: the same weekday, the same campaign period.",
    ],
  },
];

export type Article = (typeof articles)[number];

export const faqs = [
  { q: "Is the pricing on this site real?", a: "No. Yapay is a concept product and all prices shown are illustrative samples. A real deployment would publish fees set by the operating payment provider." },
  { q: "Can I process real payments with this website?", a: "Not as shipped. The demo checkout and merchant dashboard use simulated data only. Real payments require a configured payment provider and a secure server-side integration." },
  { q: "Which payment methods are supported?", a: "The platform is designed around cards, digital wallets, bank transfers, payment links and recurring billing. Availability in a real deployment depends on the provider and region." },
  { q: "Do you offer custom pricing for larger volumes?", a: "The enterprise plan is a contact-sales model in this concept, intended for businesses that need volume pricing, dedicated support or custom contracts." },
  { q: "How is card data handled?", a: "This site never collects real card numbers. In production, card details should be captured by the payment provider's hosted fields so raw card data never touches your servers." },
];
