/** SAMPLE pricing for a concept product. These are not real or official fees. */
export const plans = [
  {
    id: "starter", name: "Starter", price: "$0", cadence: "/ month",
    rate: { pct: 2.4, fixed: 0.25 }, rateLabel: "2.4% + 25¢",
    blurb: "Pay as you go. Everything you need to start accepting payments.",
    features: ["Online & in-person payments", "Payment links & invoices", "Standard fraud screening", "Dashboard & reports", "Email support"],
    cta: { label: "Get started", href: "/signup" },
  },
  {
    id: "growth", name: "Growth", price: "$49", cadence: "/ month",
    rate: { pct: 2.1, fixed: 0.2 }, rateLabel: "2.1% + 20¢", featured: true,
    blurb: "Lower rates and automation for businesses scaling up.",
    features: ["Everything in Starter", "Subscriptions & smart retries", "Custom fraud rules", "Scheduled reports & exports", "Priority support"],
    cta: { label: "Start Growth", href: "/signup?plan=growth" },
  },
  {
    id: "enterprise", name: "Enterprise", price: "Custom", cadence: "",
    rate: null, rateLabel: "Volume-based",
    blurb: "Custom pricing, contracts and support for high-volume businesses.",
    features: ["Everything in Growth", "Volume & interchange-plus options", "Dedicated success manager", "Custom SLAs & onboarding", "Multi-entity reporting"],
    cta: { label: "Talk to Sales", href: "/contact?topic=enterprise" },
  },
] as const;

export const addOns = [
  { name: "International cards", value: "+1.0%", note: "Sample surcharge" },
  { name: "Currency conversion", value: "+1.0%", note: "Sample surcharge" },
  { name: "Instant payouts", value: "1%", note: "Sample, min $0.50" },
  { name: "Disputes", value: "$15", note: "Sample, per dispute" },
  { name: "Tap to Pay", value: "Same as card", note: "Sample" },
  { name: "Invoicing", value: "Included", note: "Sample" },
];
