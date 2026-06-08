// Brand asset generator. Run with: node scripts/build-assets.mjs
// Crops the real logo into a nav lockup + icon, and rebuilds the OG image.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SRC = join(root, 'src', 'assets', 'images', 'logo.jpeg');
const pub = (f) => join(root, 'public', f);

// Source logo is 1918x1784. Manual crop boxes (tight) — verify in preview & nudge.

// 1) Lockup: wordmark + icon, with the bottom tagline cropped off.
await sharp(SRC)
  .extract({ left: 230, top: 235, width: 1500, height: 895 })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(pub('logo-lockup.png'));

// 2) Icon: the house + gold heart + leaf sprigs on the right side.
await sharp(SRC)
  .extract({ left: 1250, top: 400, width: 520, height: 700 })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(pub('logo-icon.png'));

// 3) OG image (1200x630): cream wash + real lockup composited.
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

const lockup = await sharp(pub('logo-lockup.png'))
  .resize({ height: 430, fit: 'inside' })
  .toBuffer();

await sharp(Buffer.from(ogBg))
  .composite([{ input: lockup, gravity: 'center' }])
  .png()
  .toFile(pub('og-default.png'));

console.log('Wrote logo-lockup.png, logo-icon.png, og-default.png');
