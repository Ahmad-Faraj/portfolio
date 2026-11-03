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

/**
 * External links and PDFs open in a new tab, so a reader who opens the CV or
 * the paper does not lose the page. Other internal links stay in place.
 */
export const a = (href, text) => {
  const rel = /^https?:|\.pdf$/.test(href) ? ' target="_blank" rel="noreferrer"' : '';
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
 * Favicon: the band's near-black with the wordmark's red dot, the dot of
 * `ahmed.faraj`. Square, as the buttons are. Inline SVG in a data URI, so the
 * page still makes no network requests. `#` must be written `%23`: unencoded it
 * would start a URL fragment and cut the document short.
 */
const MARK =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>` +
  `<rect width='16' height='16' fill='%2323211f'/>` +
  `<rect x='6' y='9' width='4' height='4' fill='%23b31b1b'/>` +
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
 * `<html>`, `<head>` and `<body>` are written out even though HTML5 makes them
 * optional: LinkedIn's scraper only reads Open Graph tags inside an explicit
 * `<head>`, and without one it guessed a title and image from the page body.
 * `color-scheme: light` pins the page white so a reader in dark mode still
 * sees paper.
 *
 * The Open Graph and Twitter tags are what LinkedIn, WhatsApp, Slack and X read
 * to draw a link preview. Their image must be an absolute URL.
 */
export const page = ({ title, desc, css, body, bg, url, image }) =>
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(url + image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="628">
<meta property="og:image:alt" content="${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,${MARK}">
${css ? `<style>${rules(css)}</style>\n` : ''}</head>
<body${bg ? ` bgcolor="${bg}"` : ''}>
${body}
</body>
</html>`;
