/**
 * Curated Unsplash photography (Unsplash License). Remote URLs are optimised by next/image.
 * Every <SmartImage> falls back to a tonal gradient if a source ever becomes unavailable.
 */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;

export const images = {
  // Hero — hand presenting a dark card to a handheld terminal (Blake Wisz / Unsplash)
  hero: u("photo-1556742031-c6961e8560b0"),
  heroAlt: u("photo-1556742049-0cfed4f6a45d"),
  // Portable reader held in hand (SumUp / Unsplash)
  tapToPay: u("photo-1726137569807-c0ce211ccbec"),
  counter: u("photo-1556742111-a301076d9d18"),
  merchant: u("photo-1556740758-90de374c12ad"),
  retail: u("photo-1441986300917-64674bd600d8"),
  ecommerce: u("photo-1607082348824-0a96f2a4b9da"),
  saas: u("photo-1460925895917-afdab827c52f"),
  marketplace: u("photo-1556745757-8d76bdb6984b"),
  analytics: u("photo-1551288049-bebda4e38f71"),
  online: u("photo-1563013544-824ae1b704d3"),
  team: u("photo-1522071820081-009f0129c71c"),
  office: u("photo-1497366216548-37526070297c"),
} as const;

export type ImageKey = keyof typeof images;
