# CODE_MAP.md

Feature-oriented map of the Twinkling Hearts marketing site (Astro 5 + Tailwind v4, static → Vercel).

## Site Configuration & Business Data
Category: Infra
Primary Files:
* src/config/site.ts  (single source of truth: NAP, hours, license, socials, form key, nav links)
Supporting Files:
* astro.config.mjs  (site URL, sitemap + tailwind vite plugin)
* tsconfig.json  (path alias `@/*` → `src/*`)
External Integrations: Web3Forms (form key), Google Maps (embed src)

## Design System (tokens + primitives)
Category: UI
Primary Files:
* src/styles/global.css  (Tailwind v4 `@theme` color/font/shadow tokens, base a11y resets, utilities)
* src/components/Button.astro
* src/components/Icon.astro
* src/lib/icons.ts  (IconName union, shared by Icon + Button)
Supporting Files:
* src/components/SectionHeading.astro
* src/components/Brandmark.astro  (inline house+heart+twinkle logo + wordmark)

## Layout & Page Scaffolding
Category: UI
Primary Files:
* src/layouts/BaseLayout.astro  (head/meta/OG/Twitter, JSON-LD, skip link, Header+Footer shell)
* src/layouts/PageLayout.astro  (interior hero + breadcrumb + auto BreadcrumbList JSON-LD)
Supporting Files:
* src/components/Header.astro  (sticky nav, phone+CTA, mobile menu w/ inline script)
* src/components/Footer.astro  (NAP, nav, services list, social, license)
* src/components/CTABand.astro

## Content Collections (data-driven pages)
Category: Service
Primary Files:
* src/content.config.ts  (zod schemas + loaders: services/areas glob, faqs/testimonials file)
Supporting Files:
* src/content/services/*.json  (4 services)
* src/content/areas/*.json  (service-area landing data)
* src/content/faqs.json, src/content/testimonials.json
Consuming Components:
* src/components/ServiceCard.astro, FaqAccordion.astro, Testimonial.astro, Steps.astro

## SEO / Structured Data
Category: Infra
Primary Files:
* src/lib/schema.ts  (localBusiness / serviceSchema / faqSchema / breadcrumbs builders)
* src/components/JsonLd.astro  (renders ld+json script)
Supporting Files:
* public/robots.txt, public/og-default.png, scripts/build-og.mjs (OG generator)
* @astrojs/sitemap (build-time sitemap-index.xml)
External Integrations: Google (Rich Results / Search Console targets)

## Pages (routes)
Category: UI
Primary Files:
* src/pages/index.astro  (Home)
* src/pages/about.astro, why-choose-us.astro, faq.astro, contact.astro
* src/pages/services/index.astro, services/[slug].astro
* src/pages/service-areas/index.astro, service-areas/[slug].astro
* src/pages/privacy.astro, accessibility.astro, 404.astro

## Lead Capture
Category: UI / Service
Primary Files:
* src/components/ContactForm.astro  (Web3Forms POST, honeypot, progressive-enhancement script)
* src/components/MapEmbed.astro
Entry Points: /contact route
External Integrations: Web3Forms API (api.web3forms.com/submit)

## Brand Assets
Category: Other
Primary Files:
* src/assets/images/*.jpeg  (logo + 5 photos, optimized via astro:assets)
* public/favicon.svg
