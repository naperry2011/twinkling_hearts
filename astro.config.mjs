// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://twinklingheart.org',
  integrations: [sitemap()],
  vite: {
    // Cast avoids a benign Vite-version type mismatch between Astro's bundled
    // Vite and @tailwindcss/vite's peer Vite. Runtime is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  image: {
    // Allow on-build optimization of local assets (sharp).
    responsiveStyles: true,
  },
});
