#!/usr/bin/env node
/**
 * Zero-dependency static site generator.
 *
 *   node build.mjs                     all five versions + landing page
 *   node build.mjs --only v4           just one version
 *   node build.mjs --clean             strip the preview switcher (ship build)
 *   node build.mjs --clean --only v4 --flat
 *                                      emit dist/index.html ready to deploy
 */
import { mkdir, writeFile, rm, copyFile, access, stat, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as C from './content.js';
import { page, rules } from './templates/shared.mjs';
import * as v1 from './templates/v1-morris.mjs';
import * as v2 from './templates/v2-kernighan.mjs';
import * as v3 from './templates/v3-stroustrup.mjs';
import * as v4 from './templates/v4-faculty.mjs';
import * as v5 from './templates/v5-sidebar.mjs';
import * as v6 from './templates/v6-arxiv.mjs';
import * as landing from './templates/landing.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(HERE, 'dist');

const TEMPLATES = [v1, v2, v3, v4, v5, v6];
const VERSIONS = TEMPLATES.map((t) => t.info);

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const val = (f) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : null);

const clean = has('--clean');
const flat = has('--flat');
const only = val('--only');

/**
 * Static assets copied next to every page.
 * [ source path relative to build.mjs, filename in the output ]
 */
const ASSETS = [
  ['static/ahmed_faraj_cv.pdf', 'ahmed_faraj_cv.pdf'],
  ['static/photo.jpg', 'photo.jpg'],
  ['static/photo-square.jpg', 'photo-square.jpg'],
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

async function copyAssets(intoDirs) {
  for (const [from, name] of ASSETS) {
    const src = resolve(HERE, from);
    if (!(await exists(src))) {
      console.warn(`  ! asset missing, skipped: ${name}`);
      continue;
    }
    for (const dir of intoDirs) await copyFile(src, join(dir, name));
  }
}

async function emit(dir, html) {
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
  return Buffer.byteLength(html, 'utf8');
}

async function main() {
  // A module namespace object is sealed, so the live stamp is layered on with a
  // copy rather than assigned into the imported content.
  const stamp = await contentStamp();
  const CONTENT = { ...C, meta: { ...C.meta, stamp } };

  const picked = only ? TEMPLATES.filter((t) => t.info.slug === only) : TEMPLATES;
  if (!picked.length) {
    console.error(`Unknown version "${only}". Options: ${VERSIONS.map((v) => v.slug).join(', ')}`);
    process.exit(1);
  }

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  console.log(`\n  build → dist/${clean ? '   [clean: no switcher]' : ''}${flat ? '   [flat]' : ''}\n`);

  const dirs = [];

  for (const t of picked) {
    const { css, body, bg } = t.render(CONTENT);
    const html = page({
      title: C.meta.name,
      desc: DESC,
      css, body, bg,
      current: t.info.slug,
      versions: VERSIONS,
      clean: clean || flat,
    });
    // --flat puts the single chosen version at the root, ready to deploy as-is.
    const dir = flat && picked.length === 1 ? DIST : join(DIST, t.info.slug);
    const bytes = await emit(dir, html);
    dirs.push(dir);
    // Measured on what ships, which is the rules with the comments stripped out.
    const cssB = Buffer.byteLength(rules(css), 'utf8');
    console.log(
      `  ${t.info.slug}  ${t.info.name.padEnd(8)} ${(bytes / 1024).toFixed(1).padStart(5)} kB html` +
      `   ${String(cssB).padStart(4)} B css`
    );
  }

  if (!flat) {
    const { css, body, bg } = landing.render(CONTENT, picked.map((t) => t.info));
    const bytes = await emit(DIST, page({
      title: `${C.meta.name}, portfolio versions`,
      desc: 'Six pages in the idiom of the classic CS homepage and arxiv.org.',
      css, body, bg,
      current: '', versions: VERSIONS, clean: true,
    }));
    dirs.push(DIST);
    console.log(`  --  ${'landing'.padEnd(8)} ${(bytes / 1024).toFixed(1).padStart(5)} kB html`);
  }

  await copyAssets(dirs);

  console.log(`\n  done. serve with:  npm start\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
