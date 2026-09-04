/**
 * Review landing page. Not part of the portfolio; it exists so the five
 * versions can be compared and picked. Omitted by `--clean`.
 */
import { esc } from './shared.mjs';

const NOTES = {
  v1: [
    'nil.lcs.mit.edu/rtm',
    '0 B',
    'Robert Morris’s page is 2 KB and has no CSS. The idea worth stealing is that the work is never itemised. Projects and patches are named inside sentences and every noun that matters is a link. No headings, no dates, no metrics.',
  ],
  v2: [
    'cs.princeton.edu/~bwk',
    '~150 B',
    'Kernighan’s exact stylesheet: Helvetica, 14px, 20px line-height. Photo floated left with the postal block beside it, the raw output of date(1), a rule, then h3 sections. Papers in citation form.',
  ],
  v3: [
    'stroustrup.com',
    '0 B',
    'Pipe-separated centre nav repeated top and bottom, centred heading and photo, one first-person paragraph, then everything as an annotated list: a link, a colon, and one sentence saying what it is.',
  ],
  v4: [
    'the generic department page',
    '~230 B',
    'Serif, numbered publication list in full citation form, and the canonical academic section order. The most formal of the five and the only one that reads as a CV.',
  ],
  v5: [
    'the other department page',
    '~330 B',
    'Narrow left rail with photo, address and section links; content in a wide right column. Held together by a table, as pages of this vintage are.',
  ],
};

const css = `body{max-width:44em;margin:3em auto;padding:0 1.5em;font:16px/1.55 Georgia,serif}
dt{margin-top:1.4em;font-weight:bold}
dd{margin:.2em 0 0}`;

export function render(C, versions) {
  const items = versions
    .map((v) => {
      const [after, size, text] = NOTES[v.slug];
      return (
        `<dt><a href="${v.slug}/">${esc(v.name)}</a> ` +
        `<small>after ${esc(after)}, ${esc(size)} of CSS</small></dt>\n` +
        `<dd>${esc(text)}</dd>`
      );
    })
    .join('\n');

  const body = `<h1>Ahmed Faraj: five versions</h1>

<p>Same content, five pages in the idiom of the classic CS homepage. Each one is
modelled on a specific page, measured rather than remembered:
<a href="https://www.stroustrup.com/">stroustrup.com</a> (3.8 KB, 141 B of CSS),
<a href="http://nil.lcs.mit.edu/rtm/">nil.lcs.mit.edu/rtm</a> (2.0 KB, none), and
<a href="https://www.cs.princeton.edu/~bwk/">cs.princeton.edu/~bwk</a> (12.6 KB, 224 B).
None of the three loads an external stylesheet.</p>

<dl>
${items}
</dl>

<h2>What the three references have in common</h2>

<ul>
<li><b>An off-white background.</b> Morris uses <tt>#FFFFFA</tt>, Stroustrup <tt>#FFFBFB</tt>. Both set it with the <tt>bgcolor</tt> attribute, not CSS.</li>
<li><b>A photograph and a postal address</b>, together, at the top. All three.</li>
<li><b>The name is not a banner.</b> Morris uses <tt>&lt;b&gt;</tt>. Kernighan uses plain text and <tt>&lt;br&gt;</tt>.</li>
<li><b>One first-person paragraph</b> does the positioning. No summary bullets, no tagline.</li>
<li><b>Links carry the content</b>, either inside prose or as <i>link: one sentence</i>.</li>
<li><b>Small headings</b>: <tt>h3</tt>, title case, no rules, no tracking.</li>
<li><b>A timestamp.</b> Kernighan ships the raw output of <tt>date</tt>. It is the only proof a page is maintained.</li>
<li><b>Nothing is quantified.</b> No metrics, no badges, no percentages. A thing is described, and the reader judges it.</li>
</ul>

<h2>How it is put together</h2>

<ul>
<li>All content lives once, in <tt>site/content.js</tt>. Edit a fact there and every version updates.</li>
<li><tt>node build.mjs</tt> regenerates <tt>dist/</tt>. <tt>npm run ship v2</tt> emits just the chosen one, with the preview line stripped.</li>
<li>The <i>preview</i> line at the top of each version is review chrome and never ships.</li>
</ul>
`;

  return { css, body, bg: '#FFFFFA' };
}
