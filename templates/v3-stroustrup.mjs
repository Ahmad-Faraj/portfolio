/**
 * v3: Stroustrup
 *
 * After stroustrup.com. Three things define that page:
 *   1. a pipe-separated <center> nav, repeated verbatim at top and bottom;
 *   2. a centred heading and photo, then one first-person paragraph;
 *   3. everything else as an annotated list, <a>Thing</a>: what it is.
 *
 * No dates, no metrics, no state badges. Each line says what a thing is and
 * lets the reader decide whether to click.
 */
import { esc, tidy, a, md } from './shared.mjs';

export const info = { slug: 'v3', short: '3', name: 'Stroustrup' };

const css = ''; // the only rule on that page styles a box this layout does not use
const bg = '#FFFFFF';

export function render(C) {
  const { meta, links, research, openSource, projects, community, narrative } = C;

  // Anchors within the page, in the same clipped style as his section names.
  const NAV = [
    ['#research', 'research'],
    ['#work', 'work'],
    ['#opensource', 'open source'],
    ['#software', 'software'],
    ['#competitive', 'competitive'],
    ['#teaching', 'teaching'],
    [links.find((l) => l.label === 'GitHub').href, 'github'],
    [links.find((l) => l.label.startsWith('CV')).href, 'CV'],
  ];

  const nav =
    `<center>\n` +
    NAV.map(([h, t]) => (/^https?:/.test(h) ? a(h, t) : `<a href="${esc(h)}">${esc(t)}</a>`)).join('\n|\n') +
    `\n</center>`;

  /** <a>Thing</a>: one sentence saying what it is. */
  const item = (link, text) => `<li>\n${link}: ${text}`;

  const paper = research[0];

  const resList =
    `<ul>\n` +
    item(
      a(paper.artifacts[0].href, paper.title),
      `an execution-based conformance census of the Model Context Protocol ecosystem. ` +
        `6,106 registered servers installed into locked-down containers and driven through ` +
        `the protocol; two in five never complete a handshake, and the dominant deviation ` +
        `belongs to three SDKs rather than to thousands of authors.`
    ) +
    '\n' +
    item(
      a(paper.artifacts[1].href, 'SEP-2145'),
      `an open proposal to the specification, now carrying the first deployment data anyone has measured for it.`
    ) +
    `\n</ul>`;

  const osList =
    `<ul>\n` +
    openSource
      .flatMap((g) => g.items.map((i) => item(a(i.href, i.ref), esc(i.text))))
      .join('\n') +
    `\n</ul>`;

  const projList =
    `<ul>\n` +
    projects
      .map((p) => item(a(p.linksOut[0].href, p.name), `${esc(tidy(p.blurb))} <i>${esc(p.tag)}</i>`))
      .join('\n') +
    `\n</ul>`;

  const comList =
    `<ul>\n` + community.map((c) => item(a(c.href, c.hrefLabel), esc(c.text))).join('\n') + `\n</ul>`;

  const body = `${nav}

<center>
<h1>Welcome to ${esc(meta.name)}'s homepage!</h1>
<img src="${esc(meta.photo)}" width="200" height="356" alt="${esc(meta.name)}">
</center>

<p>
${narrative.slice(0, 2).map(md).join('\n<p>\n')}

<h3><a name="research"></a>Research</h3>
${resList}

<h3><a name="work"></a>Work</h3>
<p>
${esc(tidy(C.experience[0].points.join(' ')))}

<h3><a name="opensource"></a>Open source</h3>
${osList}

<h3><a name="software"></a>Software</h3>
${projList}

<h3><a name="competitive"></a>Competitive programming</h3>
<ul>
${C.achievements[0].items
    .map((i) => `<li>\n${i.href ? a(i.href, i.hrefLabel) : '<i>rating</i>'}: ${esc(i.text)}`)
    .join('\n')}
</ul>

<h3><a name="teaching"></a>Teaching and service</h3>
${comList}

<p>
${nav}
`;

  return { css, body, bg };
}
