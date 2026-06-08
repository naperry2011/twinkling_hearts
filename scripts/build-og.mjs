// One-off generator for the social share image (public/og-default.png).
// Run with: node scripts/build-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og-default.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4f7f1"/>
      <stop offset="1" stop-color="#fbf8f1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="12" fill="#8aa67e"/>
  <rect x="0" y="618" width="1200" height="12" fill="#c9a24a"/>

  <!-- twinkles -->
  <g fill="#4cb3c2" opacity="0.7">
    <path d="M250 120l8 16 16 8-16 8-8 16-8-16-16-8 16-8z"/>
    <circle cx="300" cy="150" r="5"/>
  </g>
  <path d="M345 135l6 12 12 6-12 6-6 12-6-12-12-6 12-6z" fill="#c9a24a" opacity="0.8"/>

  <!-- house + heart mark -->
  <g transform="translate(880 200)">
    <path d="M90 0l130 100v8H-40v-8L90 0Z" fill="#8aa67e"/>
    <path d="M-30 108h240v150a8 8 0 0 1-8 8H-22a8 8 0 0 1-8-8V108Z" fill="#a0b890"/>
    <path d="M90 250c-3 0-6-1-8-3-26-23-58-50-58-83 0-19 14-33 32-33 11 0 22 6 30 16 8-10 19-16 30-16 18 0 32 14 32 33 0 33-32 60-58 83-2 2-5 3-8 3Z" fill="#d6b35f"/>
  </g>

  <!-- wordmark -->
  <text x="110" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="78" fill="#3c4f35" font-weight="600" letter-spacing="1">Twinkling Hearts</text>
  <text x="112" y="345" font-family="Georgia, serif" font-size="30" fill="#8c7361" letter-spacing="8">IN HOME CARE</text>
  <text x="110" y="430" font-family="Georgia, serif" font-size="38" fill="#5f7a55" font-style="italic">Care You Can Trust, Hearts That Understand.</text>
  <text x="112" y="500" font-family="Arial, sans-serif" font-size="26" fill="#2c2a26">Compassionate non-medical in-home senior care</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
