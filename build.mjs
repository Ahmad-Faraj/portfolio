#!/usr/bin/env node
/**
 * Zero-dependency static site generator.
 *
 *   node build.mjs      writes dist/index.html and its assets, ready to deploy
 */
import { mkdir, writeFile, rm, copyFile, access, stat, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as C from './content.js';
import { page, rules } from './templates/shared.mjs';
import { render } from './templates/arxiv.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(HERE, 'dist');

/** Where the site is served. The link-preview tags need absolute URLs. */
const SITE = 'https://ahmad-faraj.github.io/portfolio/';

/**
 * Static assets copied next to every page.
 * [ source path relative to build.mjs, filename in the output ]
 */
const ASSETS = [
  ['static/ahmed_faraj_cv.pdf', 'ahmed_faraj_cv.pdf'],
  ['static/photo-square.jpg', 'photo-square.jpg'],
  ['static/preview.jpg', 'preview.jpg'],
  ['static/ahmed_faraj_transcript_english.pdf', 'ahmed_faraj_transcript_english.pdf'],
  ['static/Faraj-2026-MCP-conformance-census-preprint.pdf', 'Faraj-2026-MCP-conformance-census-preprint.pdf'],
  ['static/paper-p1.jpg', 'paper-p1.jpg'],
];

const DESC =
  `${C.meta.name}, software engineer at Datajar working on LLM agents. Kubeflow org member, ` +
  `Kyverno and PipeCD contributor, author of an execution-based census of 6,106 MCP servers.`;

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

/** The zone the stamp is written in, and the abbreviations date(1) prints there. */
const TZ = 'Africa/Cairo';

/**
 * The stamp bwk ships is the raw output of date(1), and it only means anything
 * if it is true: it is the one element on the page whose whole job is to say
 * the page is hand-maintained. A hand-typed one goes stale and then argues the
 * opposite, so it is derived instead.
 *
 * From the newest mtime across the content and the templates, not from the
 * clock: it moves when a fact or a layout changes and stays put when the build
 * merely runs again, which is what "last updated" is supposed to mean.
 */
async function contentStamp() {
  const dir = resolve(HERE, 'templates');
  const files = [resolve(HERE, 'content.js'), ...(await readdir(dir)).map((f) => join(dir, f))];

  let newest = 0;
  for (const f of files) newest = Math.max(newest, (await stat(f)).mtimeMs);
  const when = new Date(newest);

  const part = (opts) =>
    new Intl.DateTimeFormat('en-US', { timeZone: TZ, ...opts }).format(when);

  // Cairo runs EET at UTC+2 and EEST at UTC+3. Intl gives the offset, not the
  // abbreviation, so the abbreviation is read back off the offset.
  const zone = /GMT\+3/.test(part({ timeZoneName: 'short' })) ? 'EEST' : 'EET';

  // date(1) space-pads the day of the month to two columns.
  const day = part({ day: 'numeric' }).padStart(2, ' ');
  const clock = part({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return `${part({ weekday: 'short' })} ${part({ month: 'short' })} ${day} ` +
         `${clock} ${zone} ${part({ year: 'numeric' })}`;
}

async function main() {
  // A module namespace object is sealed, so the live stamp is layered on with a
  // copy rather than assigned into the imported content.
  const stamp = await contentStamp();
  const CONTENT = { ...C, meta: { ...C.meta, stamp } };

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const { css, body, bg } = render(CONTENT);
  // LinkedIn ignores titles under 15 characters and falls back to the page's wordmark.
  const html = page({ title: `${C.meta.name} · Software Engineer`, desc: DESC, css, body, bg, url: SITE, image: 'preview.jpg' });
  await writeFile(join(DIST, 'index.html'), html, 'utf8');

  for (const [from, name] of ASSETS) {
    const src = resolve(HERE, from);
    if (!(await exists(src))) {
      console.warn(`  ! asset missing, skipped: ${name}`);
      continue;
    }
    await copyFile(src, join(DIST, name));
  }

  // Measured on what ships, which is the rules with the comments stripped out.
  const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
  console.log(`\n  dist/index.html  ${kb} kB html, ${Buffer.byteLength(rules(css), 'utf8')} B css\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
