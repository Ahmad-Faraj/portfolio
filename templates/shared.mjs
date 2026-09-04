/**
 * Helpers shared by every template. No dependencies, no framework.
 *
 * The budget for these pages is set by the sites they imitate:
 *   swtch.com/~rsc  0 bytes of CSS
 *   danluu.com      170 bytes
 *   brendangregg    101 bytes
 * Anything a browser default already does, we let it do.
 */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Escape text for HTML. */
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ENTITIES[c]);

/** Collapse the whitespace introduced by indented template literals in content.js. */
export const tidy = (s) => String(s).replace(/\s+/g, ' ').trim();

/** External links get the usual safety attributes; internal ones do not need them. */
export const a = (href, text) => {
  const rel = /^https?:/.test(href) ? ' target="_blank" rel="noreferrer"' : '';
  return `<a href="${esc(href)}"${rel}>${esc(text)}</a>`;
};

/** "Nov 2025 – Present" */
export const range = (from, to, present = 'Present') => `${from} – ${to ?? present}`;

/**
 * Render the `[label](url)` links used in content.js narrative prose.
 * Everything outside the brackets is escaped, so the source stays readable
 * without letting raw HTML through.
 */
export const md = (s) =>
  tidy(s)
    .split(/(\[[^\]]+\]\([^)]+\))/)
    .map((part) => {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
      return m ? a(m[2], m[1]) : esc(part);
    })
    .join('');

/** Join with a middot, skipping empties. */
export const dot = (...parts) => parts.filter(Boolean).join(' · ');

/**
 * Review-only version switcher. Plain text, no styling of its own, first thing
 * in the document. Omitted from `--clean` builds.
 */
export const switcher = (current, versions) =>
  `<p><small>preview: ` +
  versions
    .map((v) => (v.slug === current ? `<b>${esc(v.short)}</b>` : `<a href="../${v.slug}/">${esc(v.short)}</a>`))
    .join(' ') +
  ` <a href="../">all</a></small></p>\n`;

/**
 * Favicon: a lit bulb, drawn as three primitives because anything finer than
 * that (a filament, rays) turns to mush at 16 px. Inline SVG in a data URI, so
 * the page still makes no network requests.
 *
 * The glass is amber so it reads on a light tab strip and on a dark one; the
 * base is mid-grey for the same reason. `#` must be written `%23`: unencoded it
 * would start a URL fragment and cut the document short.
 */
const BULB =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>` +
  `<circle cx='8' cy='6.2' r='4.6' fill='%23f5b301'/>` +
  `<rect x='5.6' y='10.6' width='4.8' height='1.9' rx='.5' fill='%238d8d8d'/>` +
  `<rect x='6.4' y='13.1' width='3.2' height='1.9' rx='.7' fill='%238d8d8d'/>` +
  `</svg>`;

/**
 * Rules only. A template's stylesheet carries the reasoning for each rule it
 * breaks from its reference page, and none of that belongs in the shipped
 * bytes: the build reports each version's CSS size as a discipline, and a
 * number inflated by prose would stop meaning anything.
 */
export const rules = (css) =>
  css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n{2,}/g, '\n').trim();

/**
 * Document shell.
 *
 * `<html>`, `<head>` and `<body>` are omitted; they are optional in HTML5 and
 * the parser inserts them. danluu.com ships exactly this way. `color-scheme:
 * light` pins the page white so a reader in dark mode still sees paper.
 */
export const page = ({ title, desc, css, body, current, versions, clean, bg }) =>
  `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="data:image/svg+xml,${BULB}">
${css ? `<style>${rules(css)}</style>\n` : ''}<body${bg ? ` bgcolor="${bg}"` : ''}>
${clean ? '' : switcher(current, versions)}${body}`;
