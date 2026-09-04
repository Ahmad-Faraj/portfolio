/**
 * v1: Morris
 *
 * After nil.lcs.mit.edu/rtm, which is 2 KB and has no CSS at all.
 *
 * The structural idea worth stealing: the work is not itemised. Projects,
 * papers and patches are named inside sentences, and every noun that matters
 * is a link. No headings, no bullets, no dates, no metrics. The reader is
 * trusted to click. Photo and postal block sit in a table at the top, which is
 * how that page has done it for twenty years.
 */
import { esc, md } from './shared.mjs';

export const info = { slug: 'v1', short: '1', name: 'Morris' };

const css = ''; // deliberate; rtm's page has none
const bg = '#FFFFFF';

export function render(C) {
  const { meta, narrative, research, links } = C;

  const paras = narrative.map((p) => `<p>\n${md(p)}\n</p>`).join('\n\n');

  const paper = research[0];

  const body = `<table>
<tr>
<td rowspan="2">
<img src="${esc(meta.photo)}" width="240" height="427" alt="${esc(meta.name)}">
</td>
<td>
<b>${esc(meta.name)}</b>
</td>
</tr>
<tr>
<td valign="top">
${meta.address.map((l) => esc(l)).join('<br>\n')}<br>
${esc(meta.emailPlain)}<br>
</td>
</tr>
</table>

${paras}

<p>
The conformance study is written up as
<a href="${esc(paper.artifacts[0].href)}" target="_blank" rel="noreferrer">${esc(paper.title)}</a>,
${esc(paper.venue)}, ${esc(paper.date)}; the harness and the released dataset are
in the same repository. You can find my code on
${links
    .filter((l) => ['GitHub', 'GitLab'].includes(l.label))
    .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noreferrer">${esc(l.label)}</a>`)
    .join(' and ')},
and a CV <a href="${esc(links.find((l) => l.label.startsWith('CV')).href)}">here</a>.
</p>
`;

  return { css, body, bg };
}
