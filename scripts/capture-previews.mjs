/**
 * Capture the screenshots shown on the project cards.
 *
 * Usage:
 *   bun run previews                    (every card with a preview image)
 *   bun run previews afallon erenshor   (only the named images)
 *
 * Prerequisite (one-time): bunx playwright install chromium
 *
 * The cards come from public/index.html: every link whose body contains an <img> is
 * captured from the link's href in the dark theme, at a viewport with the image's
 * aspect ratio, and written to the image's path as WebP at the image's width and
 * height. A recapture that differs from the existing image only by rendering noise keeps
 * the existing file.
 *
 * A capture starts once the page has rendered: the load event has fired, web fonts
 * are ready, the DOM has stopped changing, and every image in view has loaded and
 * decoded. Network activity is not a readiness signal, because pages keep background
 * requests open. A broken image or a page that never settles fails the capture.
 */

import { chromium } from 'playwright';
import sharp from 'sharp';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const PUBLIC_DIR = resolve(ROOT_DIR, 'public');

/** Logical width the linked sites are rendered at before scaling to the card size */
const VIEWPORT_WIDTH = 1440;

/** Device scale factor. The 2x capture is scaled down for a sharp card image. */
const DEVICE_SCALE = 2;

/** WebP quality (0–100) */
const QUALITY = 85;

/** How long a page may take to render before the capture fails (ms) */
const READY_TIMEOUT_MS = 30000;

/** The DOM counts as settled once it has not changed for this long (ms) */
const DOM_QUIET_MS = 500;

const html = readFileSync(resolve(PUBLIC_DIR, 'index.html'), 'utf8');
const cards = [];
for (const [, attributes, body] of html.matchAll(/<a\s([^>]*)>([\s\S]*?)<\/a>/g)) {
  const img = body.match(/<img\s[^>]*>/)?.[0];
  if (!img) continue;
  const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  const src = attribute(img, 'src');
  const width = Number(attribute(img, 'width'));
  const height = Number(attribute(img, 'height'));
  const href = attribute(attributes, 'href');
  if (!href || !src || !width || !height) {
    throw new Error(`Card image needs an href, src, width, and height: ${img}`);
  }
  cards.push({ name: basename(src, extname(src)), href, src, width, height });
}

const requested = process.argv.slice(2);
const unknown = requested.filter((name) => !cards.some((card) => card.name === name));
if (unknown.length > 0) {
  console.error(`Unknown card image(s): ${unknown.join(', ')}`);
  console.error(`Known: ${cards.map((card) => card.name).join(', ')}`);
  process.exit(1);
}
const toCapture = requested.length > 0 ? cards.filter((card) => requested.includes(card.name)) : cards;

/**
 * Wait until the content inside `area` (viewport coordinates) has rendered: web fonts
 * are ready, the DOM has not changed for DOM_QUIET_MS, and every image intersecting
 * the area has loaded and decoded.
 */
async function waitForRenderedContent(page, area) {
  await page.waitForLoadState('load', { timeout: READY_TIMEOUT_MS });
  await page.evaluate(
    async ({ area, quietMs, timeoutMs }) => {
      const deadline = performance.now() + timeoutMs;
      const expire = (describe) =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(describe())), Math.max(0, deadline - performance.now()))
        );

      await Promise.race([document.fonts.ready, expire(() => 'Web fonts did not finish loading')]);

      let observer;
      await Promise.race([
        new Promise((resolve) => {
          const settle = () => {
            observer?.disconnect();
            resolve();
          };
          let quiet = setTimeout(settle, quietMs);
          observer = new MutationObserver(() => {
            clearTimeout(quiet);
            quiet = setTimeout(settle, quietMs);
          });
          observer.observe(document, {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true
          });
        }),
        expire(() => {
          observer?.disconnect();
          return `The page kept changing for ${timeoutMs} ms`;
        })
      ]);

      const images = [...document.images].filter((img) => {
        const r = img.getBoundingClientRect();
        return (
          r.width > 0 &&
          r.height > 0 &&
          r.left < area.x + area.width &&
          r.right > area.x &&
          r.top < area.y + area.height &&
          r.bottom > area.y
        );
      });
      await Promise.race([
        Promise.all(
          images.map(
            (img) =>
              new Promise((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
                if (img.complete) resolve();
              })
          )
        ),
        expire(
          () =>
            `Images did not finish loading: ${images
              .filter((img) => !img.complete)
              .map((img) => img.currentSrc || img.src)
              .join(', ')}`
        )
      ]);

      const broken = images.filter((img) => img.naturalWidth === 0);
      if (broken.length > 0) {
        throw new Error(
          `Images failed to load: ${broken.map((img) => img.currentSrc || img.src).join(', ')}`
        );
      }
      await Promise.race([
        Promise.all(images.map((img) => img.decode())),
        expire(() => 'Images did not finish decoding')
      ]);
    },
    { area, quietMs: DOM_QUIET_MS, timeoutMs: READY_TIMEOUT_MS }
  );
}

/**
 * A recapture that changes fewer pixels than this keeps the existing image, because the
 * difference is rendering noise. Unchanged pages measure 0 changed pixels, real changes
 * thousands.
 */
const CHANGED_PIXELS = 500;

/** Pixels whose summed RGB difference exceeds 60 between the existing image and `candidate`. */
async function changedPixels(existingPath, candidate) {
  const [a, b] = await Promise.all(
    [existingPath, candidate].map((input) => sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true }))
  );
  if (a.info.width !== b.info.width || a.info.height !== b.info.height) return Infinity;
  let changed = 0;
  for (let i = 0; i < a.data.length; i += 3) {
    const delta =
      Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    if (delta > 60) changed++;
  }
  return changed;
}

console.log(`Capturing ${toCapture.length} card preview(s)...\n`);
const browser = await chromium.launch();
for (const card of toCapture) {
  const url = new URL(card.href);
  url.searchParams.set('theme', 'dark');
  const viewport = {
    width: VIEWPORT_WIDTH,
    height: Math.round((VIEWPORT_WIDTH * card.height) / card.width)
  };
  console.log(`  ${card.name}: ${url}`);

  const context = await browser.newContext({ viewport, deviceScaleFactor: DEVICE_SCALE });
  const page = await context.newPage();
  await page.goto(url.toString(), { waitUntil: 'domcontentloaded', timeout: READY_TIMEOUT_MS });
  await waitForRenderedContent(page, { x: 0, y: 0, ...viewport });
  const png = await page.screenshot({ animations: 'disabled' });
  await context.close();

  const output = resolve(PUBLIC_DIR, card.src.replace(/^\//, ''));
  const image = await sharp(png).resize(card.width, card.height).webp({ quality: QUALITY }).toBuffer();
  if (existsSync(output) && (await changedPixels(output, image)) < CHANGED_PIXELS) {
    console.log('    unchanged, kept the existing image');
    continue;
  }
  writeFileSync(output, image);
  console.log(`    ${card.src}: ${(image.length / 1024).toFixed(1)} kB`);
}
await browser.close();
