export type NavItem = { label: string; href: string; children?: { label: string; href: string; description: string }[] };

export const mainNav: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Online payments", href: "/payments", description: "Checkout, cards and wallets" },
      { label: "Tap to Pay", href: "/tap-to-pay", description: "Contactless on your phone" },
      { label: "Subscriptions", href: "/subscriptions", description: "Recurring revenue, automated" },
      { label: "Payment Links", href: "/payment-links", description: "Get paid without a website" },
      { label: "Billing", href: "/billing", description: "Invoices and collections" },
      { label: "Analytics", href: "/analytics", description: "Payment intelligence" },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Partner program", href: "/partners", description: "Build and refer with Yapay" },
      { label: "Integrations", href: "/integrations", description: "Connect your stack" },
      { label: "Solutions", href: "/solutions", description: "By business model" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Guides & articles", href: "/resources", description: "Playbooks for payment teams" },
      { label: "Developers", href: "/developers", description: "APIs, SDKs and webhooks" },
      { label: "API docs", href: "/developers/docs", description: "Reference and quickstart" },
      { label: "About Yapay", href: "/about", description: "Our story and principles" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Payments", href: "/payments" },
      { label: "Tap to Pay", href: "/tap-to-pay" },
      { label: "Subscriptions", href: "/subscriptions" },
      { label: "Payment Links", href: "/payment-links" },
      { label: "Billing", href: "/billing" },
      { label: "Analytics", href: "/analytics" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "E-commerce", href: "/solutions/ecommerce" },
      { label: "SaaS platforms", href: "/solutions/saas" },
      { label: "Retail", href: "/solutions/retail" },
      { label: "Marketplaces", href: "/solutions/marketplaces" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Overview", href: "/developers" },
      { label: "API docs", href: "/developers/docs" },
      { label: "Merchant dashboard demo", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Resources", href: "/resources" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
