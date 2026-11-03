/**
 * v2: Kernighan
 *
 * After cs.princeton.edu/~bwk, whose entire stylesheet is:
 *   body,table { font-family: Helvetica, Arial, sans-serif;
 *                line-height: 20px; font-size: 14px; }
 *
 * Structure taken from that page: photo beside the name and postal block, the
 * raw output of date(1) in small type, a rule, then <h3> sections. The photo is
 * floated as his is, with one extra rule to close it; see the body below.
 * Research entries use the citation form he uses:
 * title, authors, (venue, date). Books there become projects here, laid out
 * in the same two-column table.
 */
import { esc, tidy, a, md, range, dot } from './shared.mjs';

export const info = { slug: 'v2', short: '2', name: 'Kernighan' };

const css = `body,table{font-family:Helvetica,Arial,sans-serif;line-height:20px;font-size:14px}
body{margin:1em 2.5em}
td{vertical-align:top;padding:0 1em .8em 0}
/* Both clear a float: the rule closes the photo at the top of the page, and a
   heading closes the paper thumbnail in the section above it. */
h3,hr{clear:both}
h3{margin-top:1.8em;border-bottom:1px solid #ddd;padding-bottom:.25em}
img{margin-right:1.2em}
img.paper{float:right;width:170px;max-width:28%;height:auto;margin:0 0 1em 1.5em;border:1px solid #ccc}
/* Findings nested under a paper. Without this they set solid at 20px and read
   as one block, which is the density that made the section feel crammed. */
ul ul li{margin:.55em 0}`;

/**
 * Background. Across 40 reference pages, only 9 declare one at all, and among
 * the classic CS homepages it splits evenly:
 *
 *   off-white   rtm #fffffa, stroustrup #fffbfb, lamport #fffff0
 *   pure white  bwk #ffffff, dmr #ffffff, paulgraham #ffffff
 *
 * So this is a taste call, not a rule. Pure white, following bwk exactly.
 * Set with the bgcolor attribute rather than CSS, the way all of them do it.
 */
const bg = '#FFFFFF';

export function render(C) {
  const { meta, narrative, links, experience, research, openSource, projects, education, achievements, community, skills } = C;

  const ul = (items) => `<ul>\n${items.map((i) => `<li> ${i}`).join('\n')}\n</ul>`;

  // Title, authors, (venue, date), the form bwk uses for every paper. The title
  // points at the paper itself when we ship one, otherwise at its first artifact.
  const cite = (r) =>
    `${a(r.pdf ?? r.artifacts[0].href, r.title)},\n${esc(r.authors)}\n(${esc(r.venue)}, ${esc(r.date)})`;

  // First page of the paper, floated right, opening the PDF in a new tab.
  // Sits before the list so the text wraps around it.
  const thumb = (r) =>
    r.thumb
      ? `<a href="${esc(r.pdf)}" target="_blank" rel="noreferrer"><img class="paper" src="${esc(
          r.thumb
        )}" width="170" height="220" alt="First page of ${esc(r.title)}"></a>\n`
      : '';

  // The findings nest inside the paper's own <li> rather than sitting in a
  // second sibling list, so they read as belonging to it. bwk indents his
  // supporting lines under a paper the same way.
  //
  // No abstract here: the opening prose already states the result, and
  // repeating it two inches lower reads like padding.
  const res = research
    .map((r) =>
      thumb(r) +
      ul([
        cite(r) +
          '\n' +
          ul(r.points.map(md)) +
          `\n<p>\n${r.artifacts.map((x) => a(x.href, x.label)).join(' &nbsp; ')}`,
      ])
    )
    .join('\n');

  const exp = experience
    .map(
      (e) =>
        `<p>\n<b>${esc(e.org)}</b>, ${esc(e.title)}, ${esc(range(e.from, e.to))}<br>\n` +
        `${esc(dot(e.orgNote, e.place))}\n</p>\n` +
        ul(e.points.map(esc))
    )
    .join('\n');

  const os = openSource
    .map(
      (g) =>
        `<p>\n<b>${esc(g.org)}</b>, ${esc(g.note)}, ${esc(range(g.from, g.to))}\n</p>\n` +
        ul(
          g.items.map(
            (i) =>
              `${a(i.href, i.ref)} (${esc(i.state)}) ${esc(i.text)}` +
              (i.extra ? ` ${a(i.extra.href, i.extra.label)}` : '')
          )
        )
    )
    .join('\n');

  // Two-column table: label column left, description right, bwk's book layout.
  const proj = `<table>\n${projects
    .map(
      (p) =>
        // width attribute rather than CSS: bwk's page sizes its table columns
        // the same way, and the label column wraps badly without it.
        `<tr>\n<td width="170"><b>${esc(p.name)}</b><br><font size="-1">${esc(p.tag)}<br>${esc(p.date)}</font>\n` +
        `<td>${esc(tidy(p.blurb))}\n<p>\n` +
        p.points.map((x) => esc(x)).join('<br>\n') +
        `\n<p>\n${p.linksOut.map((l) => a(l.href, l.label)).join(' &nbsp; ')}\n`
    )
    .join('\n')}\n</table>`;

  const edu = ul(
    education.map(
      (e) =>
        `<b>${esc(e.school)}</b>, ${esc(e.degree)} (${esc(range(e.from, e.to))})<br>\n` +
        `${esc(dot(e.faculty, e.place))}<br>\n` +
        e.points.map(esc).join('<br>\n') +
        (e.href ? `<br>\n${a(e.href, e.hrefLabel)}` : '')
    )
  );

  const ach = achievements
    .map(
      (g) =>
        `<p>\n<b>${esc(g.group)}</b>` +
        (g.href ? ` ${a(g.href, g.hrefLabel)}` : '') +
        `\n</p>\n` +
        ul(g.items.map((i) => `${esc(i.text)}${i.href ? ` ${a(i.href, i.hrefLabel)}` : ''}`))
    )
    .join('\n');

  const com = ul(community.map((c) => `${esc(c.text)} ${a(c.href, c.hrefLabel)}`));

  /**
   * No skills matrix. bwk has none, and Pike's page does not mention that he
   * knows Go. Thirty tools across six rows said less than the work does, and
   * the one row with a voice in it was the last. That row survives, as a line
   * of prose in the personal block where a detail like this belongs.
   */
  const driver = skills.find((s) => s.group === 'Daily driver');
  const daily = driver ? `<p>\nDaily driver: ${esc(driver.items.join(', '))}.\n` : '';

  /**
   * One list drives both the nav and the headings, so the two cannot drift
   * apart when a section is added, renamed or dropped. Stroustrup keeps his
   * nav by hand and repeats it verbatim twice; this is the same result
   * without the bookkeeping.
   */
  const SECTIONS = [
    ['research', 'Research', res],
    ['opensource', 'Open Source', os],
    ['employment', 'Employment', exp],
    ['software', 'Software', proj],
    ['education', 'Education', edu],
    ['awards', 'Awards', ach],
    ['teaching', 'Teaching and Service', com],
  ];

  const nav = SECTIONS.map(([id, t]) => `<a href="#${id}">${esc(t.toLowerCase())}</a>`).join('\n|\n');

  const sections = SECTIONS.map(
    ([id, t, content]) => `<h3><a name="${id}"></a>${esc(t)}</h3>\n${content}`
  ).join('\n\n');

  /**
   * bwk's photo and the block beside it are about the same height, so his float
   * closes cleanly. This photo is 267px against four short lines, and the float
   * left the opening paragraph wrapping into a narrow gutter beside the bottom
   * of the picture.
   *
   * Two fixes, and the float survives both. Everything personal (stamp, links,
   * daily driver) moves above the rule, which fills most of the column; and
   * `hr{clear:both}` puts the rule below the picture whatever is left over, so
   * the prose always starts at full measure.
   *
   * A table would have done the same thing on the desktop and is the more
   * period-correct answer, but a table cannot shrink below its min-content
   * width: a 150px image column plus a text column overflowed a 390px viewport.
   * A float just reflows.
   */
  const body = `<p>
<img src="${esc(meta.photo)}" width="150" height="267" align="left" alt="${esc(meta.name)}">
${esc(meta.name)} <br>
${meta.address.map((l) => esc(l)).join(' <br>\n')} <br>
${esc(meta.emailPlain)}

<p>
<font size="-2">
${esc(meta.stamp)}
</font>

<p>
${links.map((l) => a(l.href, l.label)).join(' &nbsp; ')}
${daily}<hr>

${narrative.slice(0, 2).map((p) => `<p>\n${md(p)}`).join('\n\n')}

<p>
${nav}

${sections}

<hr>
<p>
${nav}
`;

  return { css, body, bg };
}
