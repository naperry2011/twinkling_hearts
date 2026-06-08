# IMPORT_GRAPH_SUMMARY.md

High-level coupling for an Astro static site. No circular dependencies present.

## Core Dependency Nodes
* src/config/site.ts — imported by BaseLayout, Header, Footer, ContactForm, MapEmbed, schema.ts, and most pages. The central data hub.
* src/layouts/BaseLayout.astro — wraps every page; imports global.css, Header, Footer, JsonLd, schema.localBusiness().
* src/layouts/PageLayout.astro — wraps all interior pages; depends on BaseLayout + schema.breadcrumbs().
* src/lib/schema.ts — depends on site.ts; consumed by BaseLayout, PageLayout, and [slug]/faq pages.
* src/components/Icon.astro + src/lib/icons.ts — IconName union reused across Button, Header, Footer, cards, headings.
* src/styles/global.css — single import in BaseLayout; defines all Tailwind v4 tokens used by every component.

## Utility / Broadly Reused Modules
* src/lib/icons.ts (type-only, shared by Icon + Button)
* src/components/Button.astro, SectionHeading.astro, CTABand.astro (reused across most pages)
* astro:content (getCollection) — used by index, faq, contact, footer, services/*, service-areas/*

## Potential Refactor Risk Areas
* src/config/site.ts (single point of change; many `TODO` placeholders — wide blast radius, but intentional as the NAP source of truth)
* astro.config.mjs (tailwindcss() cast to `any` to bypass a benign dual-Vite type mismatch; revisit on version bumps)
* Inline <script> in Header.astro and ContactForm.astro (untyped vanilla JS, not covered by astro check)
