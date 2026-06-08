# Twinkling Hearts In Home Care — Website

A fast, accessible, SEO-ready marketing site built with **Astro + Tailwind CSS v4**,
designed to deploy as a static site on **Vercel**.

## Develop

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Project structure

- `src/config/site.ts` — **single source of truth** for phone, address, hours, license,
  socials, and the contact-form key. Edit business facts here and they update everywhere.
- `src/content/` — services, service areas, FAQs, testimonials (edit/add JSON to change content).
- `src/pages/` — routes. `[slug].astro` files generate one page per content entry.
- `src/components/`, `src/layouts/` — design system + page scaffolding.
- `src/assets/images/` — photos (optimized at build); `public/` — favicon, OG image, robots.txt.
- `scripts/build-og.mjs` — regenerates `public/og-default.png` (the social-share image).

---

## ✅ Launch checklist — do these before pointing the domain

Search the codebase for `TODO` to find every placeholder. All live in `src/config/site.ts`:

1. **Phone** — set `phone` and `phoneHref` (E.164, e.g. `tel:+15551234567`).
2. **Address / service area** — set `address.*` and `serviceArea`. For a service-area
   business with no public office, leave `street` blank.
3. **Hours** — confirm `hours.display`, `hours.office`, and `hours.schema`.
4. **License** — set `license` to your state registration/license number (or set to `''` to hide it).
5. **Email** — `email` (a branded address like `care@twinklingheart.org` reads more professional).
6. **Social links** — replace the placeholder Facebook/Instagram/X URLs.
7. **Contact form key** — create a free key at https://web3forms.com and set `web3formsKey`.
   Submissions are emailed to the inbox tied to that key. Test it after deploying.
8. **Map** — set `mapEmbedSrc` to your real city/region (Google Maps → Share → Embed).
9. **Service areas** — edit `src/content/areas/*.json` with real cities; add one file per city.
   Remove the `"placeholder": true` flag once real.
10. **Testimonials** — replace `src/content/testimonials.json` with real, permissioned reviews
    and remove the "illustrative samples" note in `src/pages/index.astro`.
11. **Photos** — three source photos are low-resolution (~612px wide). For a crisp hero,
    supply higher-resolution images and replace files in `src/assets/images/`.
    Also note `team.jpeg` has letterbox bars; a clean crop is recommended.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project → Import** this repo. Framework preset auto-detects **Astro**.
3. Deploy (build command `npm run build`, output `dist/`).
4. Add the custom domain `twinklingheart.org` in Project → Settings → Domains and update DNS.

## Off-site SEO (owner tasks)

- Claim/verify your **Google Business Profile** in *service-area* mode; make name, address, and
  phone match this site **exactly**. Add your photos and gather reviews.
- After launch, submit `https://twinklingheart.org/sitemap-index.xml` in Google Search Console.
- Validate structured data at https://search.google.com/test/rich-results.
