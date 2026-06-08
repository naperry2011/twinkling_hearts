# FEATURE_BOUNDARIES.md

Responsibility boundaries between systems.

## Site Configuration (src/config/site.ts)
Owns: All business facts (NAP, hours, license, socials, form key, nav links)
Does NOT Own: Presentation, markup, structured-data shape
Communicates With: Layouts, Header/Footer, ContactForm, MapEmbed, schema.ts
Isolation Level: Strong (pure data module, no imports of UI)

## Design System (global.css, Button, Icon, icons.ts, SectionHeading, Sparkle, LeafSprig, DottedDivider, PhotoFrame)
Owns: Tokens (color/font/shadow, watercolor, gold-foil, arch), primitive UI, icon set, signature motifs, photo treatment
Does NOT Own: Page content, business data, routing
Communicates With: Every component/page (via classes + imports)
Isolation Level: Strong (presentation only)

## Layout System (BaseLayout, PageLayout, Header, Footer, CTABand)
Owns: Page shell, <head>/meta/OG, nav, skip link, breadcrumb chrome, footer
Does NOT Own: Page-specific body content, collection queries
Communicates With: site.ts, schema.ts, JsonLd, design-system components
Isolation Level: Moderate (depends on config + schema)

## Content Collections (content.config.ts + content/*)
Owns: Structured content data + zod schemas (services, areas, faqs, testimonials)
Does NOT Own: Rendering, layout, SEO tags
Communicates With: Pages and domain components via astro:content
Isolation Level: Strong (data + validation only)

## SEO / Structured Data (lib/schema.ts, JsonLd, sitemap, OG)
Owns: JSON-LD node construction, social/OG image, sitemap/robots
Does NOT Own: Visible content, business facts (reads them from site.ts)
Communicates With: site.ts (input), BaseLayout/PageLayout/pages (output)
Isolation Level: Moderate (pure functions, but config-dependent)

## Pages / Routing (src/pages/**)
Owns: Per-route composition, getStaticPaths, page copy, prop wiring
Does NOT Own: Shell chrome, tokens, raw business data, schema internals
Communicates With: Layouts, domain components, collections, schema builders
Isolation Level: Moderate (orchestration layer)

## Lead Capture (ContactForm, MapEmbed)
Owns: Form markup/fields, honeypot, client submit + status UI, map iframe
Does NOT Own: Email delivery (Web3Forms external), access key (from site.ts)
Communicates With: site.ts, Web3Forms API, Google Maps
Isolation Level: Moderate (external service dependency)

## Brand Assets (src/assets/images, public/)
Owns: Source images, favicon, generated OG image
Does NOT Own: Where/how they render
Communicates With: Pages via astro:assets; scripts/build-assets.mjs crops logo + regenerates OG
Isolation Level: Strong
