# ENTRY_POINTS.md

This is a static Astro site. "Entry points" are the build config, the file-based
routes Astro compiles to HTML, and one standalone asset script.

## Astro Build / Dev
Path: astro.config.mjs (+ package.json scripts: dev, build, preview)
Responsibility: Configure site URL, integrations (sitemap), Tailwind v4 vite plugin, image optimization
Invokes: Astro compiler over src/pages/**
Depends On: tsconfig.json (path alias), src/content.config.ts (collections)

## Route: Home
Path: src/pages/index.astro
Responsibility: Landing page; aggregates services + testimonials collections
Invokes: BaseLayout, Hero/section components, ServiceCard, Testimonial, Steps, CTABand
Depends On: src/config/site.ts, astro:content, src/assets/images

## Route: Static content pages
Path: src/pages/{about,why-choose-us,faq,contact,privacy,accessibility}.astro
Responsibility: One page each (FAQ + contact read collections; contact mounts ContactForm)
Invokes: PageLayout, domain components
Depends On: site.ts, schema.ts, astro:content

## Route: Services (dynamic)
Path: src/pages/services/[slug].astro (+ services/index.astro)
Responsibility: getStaticPaths → one page per services collection entry
Invokes: PageLayout, ServiceCard, CTABand, serviceSchema()
Depends On: content/services/*.json

## Route: Service Areas (dynamic)
Path: src/pages/service-areas/[slug].astro (+ service-areas/index.astro)
Responsibility: getStaticPaths → one localized page per areas collection entry
Invokes: PageLayout, ServiceCard, MapEmbed, serviceSchema()
Depends On: content/areas/*.json

## Route: 404
Path: src/pages/404.astro
Responsibility: Not-found page (noindex)
Invokes: BaseLayout, Button

## Asset Script: brand asset generator
Path: scripts/build-assets.mjs
Responsibility: Crop logo.jpeg → public/logo-lockup.png + logo-icon.png; rebuild og-default.png (sharp)
Invokes: `node scripts/build-assets.mjs`
Depends On: sharp, src/assets/images/logo.jpeg

## Client runtime scripts (hydration-free, inline)
Path: src/components/Header.astro (mobile menu toggle), src/components/ContactForm.astro (fetch submit)
Responsibility: Minimal vanilla-JS progressive enhancement; no framework runtime
