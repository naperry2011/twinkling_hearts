// Brand asset generator. Run with: node scripts/build-assets.mjs
// Crops the real logo into a nav lockup (consumed by astro:assets) and rebuilds
// the social OG image. The nav <Image> derives its own dimensions + emits an
// optimized WebP, so no hand-maintained width/height lives in the markup.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SRC = join(root, 'src', 'assets', 'images', 'logo.jpeg');
const lockupOut = join(root, 'src', 'assets', 'images', 'logo-lockup.png');
const ogOut = join(root, 'public', 'og-default.png');

// Source logo is 1918x1784. Manual crop box (tight) — verify in preview & nudge.
// Lockup: wordmark + icon, with the bottom tagline cropped off.
const lockup = await sharp(SRC)
  .extract({ left: 230, top: 235, width: 1500, height: 895 })
  .flatten({ background: '#ffffff' })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();

await sharp(lockup).toFile(lockupOut);

// OG image (1200x630): cream wash + real lockup composited.
const ogBg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#f4f7f1"/>
      <stop offset="0.55" stop-color="#fbf8f1"/>
      <stop offset="1" stop-color="#f7f1e6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.32" r="0.5">
      <stop offset="0" stop-color="#e3c878" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#e3c878" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#8aa67e"/>
  <rect x="0" y="620" width="1200" height="10" fill="#c9a24a"/>
</svg>`;

const ogLockup = await sharp(lockup).resize({ height: 430, fit: 'inside' }).toBuffer();

await sharp(Buffer.from(ogBg))
  .composite([{ input: ogLockup, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(ogOut);

console.log('Wrote src/assets/images/logo-lockup.png and public/og-default.png');
