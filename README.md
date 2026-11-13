# Yapay — premium fintech payments website

A complete Next.js (App Router) + TypeScript + Tailwind CSS v4 build of the **Yapay** reference design,
expanded into a 29-route marketing site, simulated checkout and interactive merchant dashboard.

> **Concept product.** All pricing, fees, customers, testimonials and dashboard figures are
> illustrative and clearly labelled. No real payments are processed and no card data is ever collected.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node 18.18+ (Node 20+ recommended). No environment variables are needed.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Motion | GSAP 3 + ScrollTrigger, Lenis smooth scroll (single GSAP ticker loop) |
| Icons | lucide-react |
| Images | `next/image` with curated Unsplash photography (`src/lib/images.ts`) |
| Charts | Lightweight custom SVG charts (`src/components/charts`) — crosshair tooltips, keyboard support, no chart dependency |
| Fonts | Geist / Geist Mono via `next/font/google` |

## Design tokens

`#141414` charcoal · `#090909` ink · `#FFFFFF` / `#F7F7F7` · `#0866F9` electric · `#1769FF` bright ·
`#777777` muted · `#E7E7E7` line · glass `rgba(255,255,255,.10–.16)`.

## Hero fidelity

The hero geometry was measured from the reference and is expressed in percentages and container-query
units of the hero itself, so it scales exactly with the framed container:

| Element | Left | Top | Size |
|---|---|---|---|
| Headline | 5.6% | 16.5% | 4.55cqw |
| Glass panel | 35.8% | 23% | 28.4% × 66% |
| Supporting copy | 67.7% | 78.6% | max-w 13.5% |
| CTA | right 5.6% | 80.6% | — |

`docs/screens/hero-overlay-vs-reference-1440.png` shows the build rendered **over the reference
screenshot** as a stand-in photo — the ghosted reference text and panel sit almost exactly under the
built elements. Below `lg` the hero switches to a stacked mobile/tablet composition.

## Routes

Marketing: `/`, `/product`, `/payments`, `/tap-to-pay`, `/subscriptions`, `/payment-links`, `/billing`,
`/analytics`, `/solutions`, `/solutions/[ecommerce|saas|retail|marketplaces]`, `/integrations`,
`/developers`, `/developers/docs`, `/partners`, `/pricing`, `/resources`, `/resources/[slug]`, `/about`,
`/contact`, `/privacy`, `/terms`, custom 404.
Auth (demo): `/login`, `/signup`.
Dashboard (demo): `/dashboard`, `/dashboard/transactions`, `/dashboard/customers`,
`/dashboard/billing`, `/dashboard/reports`.
API: `POST /api/contact`, `POST /api/partners` (server-side validation, nothing persisted).

## Structure

```
src/
  app/
    (site)/          marketing pages, shared header/footer frame, route-transition template
    (auth)/          login + signup split layout
    dashboard/       merchant dashboard (client pages, DemoProvider)
    api/             route handlers with server-side validation
  components/
    home/            hero, gateway panel, feature cards and all homepage sections
    providers/       Lenis+ScrollTrigger, custom scrollbar, cursor, declarative reveals
    mockups/         terminal, phone, receipt, browser and product-UI previews (pure React)
    charts/          AreaChart, RankedBars, Columns
    dashboard/       shell, demo data provider, transaction drawer
    pages/           page hero, product template, FAQ, docs nav, legal
    forms/           fields, contact, partner, auth, fee estimator, newsletter
    ui/              buttons (magnetic, arrow pill), logo, sections, code blocks
  lib/               gsap setup, hooks, utils, validation, session, csv, data/*
```

## Motion system

- **Hero timeline**: photo fade + 1.06→1 scale, line-masked headline, glass panel clip reveal,
  verification check draw, toast rise + glow, copy and CTA. Scroll parallax + subtle pointer parallax.
- **Declarative reveals** — add attributes, no per-component code:
  `data-reveal="up|fade|scale|left|right|mask"`, `data-reveal-delay`, `data-reveal-stagger`,
  `data-count`. A MutationObserver initialises nodes that mount later, so nothing gets stuck hidden.
- **Gateway panel**: 3D isometric tile field, pointer tilt via `quickTo`, hovered tile lifts and
  neighbours shift, staggered scroll entrance, drifting parallax.
- **Lenis** is driven by `gsap.ticker` (one rAF loop), wired to `ScrollTrigger.update`, handles anchors,
  resets on route change, and is disabled under `prefers-reduced-motion`.
- **Custom scrollbar**: narrow track, electric-blue thumb, draggable, click-to-jump; fine pointers only
  (touch keeps native scrolling; keyboard scrolling untouched).
- **Cursor**: small dot + ring, opt-in states via `data-cursor="view|explore|drag|open"`; disabled on
  touch and reduced motion.
- **Route transitions**: fast charcoal → blue wipe (`(site)/template.tsx`), skipped on first load.

All GSAP work is scoped with `gsap.context` and reverted on unmount.

## Demo data & security notes

- Dashboard data is generated deterministically (`src/lib/data/demo.ts`) so server and client render
  identically; user changes (refunds, invoices, links, subscription pauses) persist in `localStorage`
  and can be cleared with **Reset demo data**.
- The demo session stores only name/email/company in `localStorage`; passwords are validated and
  discarded. Replace with a real auth provider (httpOnly session cookies) before handling accounts.
- The checkout demo never shows card inputs and never contacts a provider.
- To go live, integrate a regulated payment provider server-side, capture card details only through
  its hosted fields, and keep secrets in server-only environment variables (see `.env.example`).
- Security headers are set in `next.config.ts`; contact API has a honeypot and basic rate limit.
- No compliance certifications are claimed.

## Verification performed

The sandbox this was built in had no npm registry access, so `next build` could not be run there.
Instead, every route was compiled with esbuild against shims for Next/GSAP/Lenis, styled with the real
Tailwind v4 compiler, and exercised in headless Chromium:

- All 29 routes render with zero runtime errors at 1440px and 390px; hero checked at 1920/1440/1280/1024/768/390.
- End-to-end flows pass: payment demo (validation → processing → receipt → reset), product tabs incl.
  keyboard, analytics range filter, code language tabs, login → dashboard greeting, refund via drawer,
  transaction search/filter/empty state, invoice validation + creation, payment-link creation,
  persistence after reload, reset, customer search/detail, resource filters, contact validation with
  focus management, fee estimator, FAQ accordion.

**First thing to do locally:** `npm install && npm run build` (and `npm run typecheck`) to confirm the
full Next.js build in your environment.
