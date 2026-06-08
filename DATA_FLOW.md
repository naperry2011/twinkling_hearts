# DATA_FLOW.md

Structural data movement. Build-time content is static; the only runtime flow is the lead form.

## Content → Pages (build time)
Source: src/content/**/*.json
Transport: astro:content getCollection() (zod-validated via content.config.ts)
Processor: Page .astro templates (sort/filter/map) + getStaticPaths for [slug] routes
Storage: Pre-rendered HTML in dist/
Downstream Consumers: Browser (static pages), sitemap-index.xml

## Business config → UI + structured data (build time)
Source: src/config/site.ts
Transport: ESM import (`@/config/site`)
Processor: Components (Header/Footer/Contact), src/lib/schema.ts builders
Storage: Inlined into HTML (visible text, meta tags, JSON-LD)
Downstream Consumers: Browser, search-engine crawlers

## SEO metadata → document head (build time)
Source: Page props (title/description/image) + site.ts + schema.ts
Transport: BaseLayout / PageLayout props
Processor: BaseLayout (meta/OG/Twitter/canonical), JsonLd.astro
Storage: <head> of each HTML page
Downstream Consumers: Crawlers, social link unfurlers

## Images (build time)
Source: src/assets/images/*.jpeg
Transport: astro:assets <Image> imports
Processor: sharp (responsive WebP, width/height)
Storage: dist/_astro/*.webp
Downstream Consumers: Browser

## Lead form (runtime)
Source: /contact form fields (user input)
Transport: fetch POST → https://api.web3forms.com/submit (access_key from site.ts; honeypot `botcheck`)
Processor: Web3Forms (external) → email; client script renders inline success/error
Storage: Web3Forms inbox (external email)
Downstream Consumers: Business email recipient

## Map (runtime)
Source: site.mapEmbedSrc
Transport: <iframe> (MapEmbed.astro), lazy-loaded
Processor/Storage: Google Maps (external)
Downstream Consumers: Browser (Contact + Service Area pages)
