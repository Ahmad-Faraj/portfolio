/**
 * v5: Sidebar
 *
 * The other classic department layout: a narrow left rail carrying the photo,
 * postal block and section links, with the content in a wide right column.
 * Laid out with a <table>, which is how pages of this vintage do it and which
 * needs no CSS to hold two columns together.
 *
 * On a phone the table collapses to one column, the single media query in
 * the whole project, and the reason this version costs more than the others.
 */
import { esc, tidy, a, range, dot } from './shared.mjs';

export const info = { slug: 'v5', short: '5', name: 'Sidebar' };

const css = `body{font:15px/1.5 Helvetica,Arial,sans-serif;margin:2em}
td{vertical-align:top}
td.rail{width:15em;padding-right:2.5em;font-size:13px}
td.main{max-width:44em}
h2{font-size:1.05em;margin:1.8em 0 .3em;border-bottom:1px solid #ccc}
@media(max-width:700px){td,tr,tbody,table{display:block}td.rail{width:auto;padding:0 0 1.5em}}`;

const bg = '#FFFFFF';

export function render(C) {
  const { meta, links, experience, research, openSource, projects, education, achievements, community, skills } = C;

  const SECTIONS = [
    ['research', 'Research'],
    ['work', 'Experience'],
    ['oss', 'Open source'],
    ['software', 'Software'],
    ['education', 'Education'],
    ['awards', 'Awards'],
    ['teaching', 'Teaching'],
    ['tools', 'Tools'],
  ];

  const h2 = (id, t) => `<h2><a name="${id}"></a>${esc(t)}</h2>`;
  const ul = (items) => `<ul>\n${items.map((i) => `<li>${i}</li>`).join('\n')}\n</ul>`;

  const rail = `<img src="${esc(meta.photo)}" width="150" height="267" alt="${esc(meta.name)}">

<p>
<b>${esc(meta.name)}</b><br>
${meta.address.map((l) => esc(l)).join('<br>\n')}<br>
${esc(meta.emailPlain)}
</p>

<p>
${SECTIONS.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join('<br>\n')}
</p>

<p>
${links.map((l) => a(l.href, l.label)).join('<br>\n')}
</p>

<p>
<font size="-2">${esc(meta.stamp)}</font>
</p>`;

  const res = research
    .map(
      (r) =>
        `<p>${a(r.artifacts[0].href, r.title)}<br>\n<i>${esc(r.authors)}, ${esc(r.venue)}, ${esc(r.date)}</i></p>\n` +
        `<p>${esc(tidy(r.abstract))}</p>\n` +
        ul(r.points.map(esc)) +
        `\n<p><small>${r.artifacts.map((x) => a(x.href, x.label)).join(' &middot; ')}</small></p>`
    )
    .join('\n');

  const exp = experience
    .map(
      (e) =>
        `<p><b>${esc(e.org)}</b>, ${esc(e.title)}, ${esc(range(e.from, e.to))}<br>\n` +
        `<i>${esc(dot(e.orgNote, e.place))}</i></p>\n` +
        ul(e.points.map(esc))
    )
    .join('\n');

  const os = openSource
    .map(
      (g) =>
        `<p><b>${esc(g.org)}</b>, ${esc(g.note)}, ${esc(range(g.from, g.to))}</p>\n` +
        ul(
          g.items.map(
            (i) =>
              `${a(i.href, i.ref)} (${esc(i.state)}) ${esc(i.text)}` +
              (i.extra ? ` ${a(i.extra.href, i.extra.label)}` : '')
          )
        )
    )
    .join('\n');

  const soft = projects
    .map(
      (p) =>
        `<p><b>${esc(p.name)}</b>, <i>${esc(p.tag)}</i>, ${esc(p.date)}</p>\n` +
        `<p>${esc(tidy(p.blurb))}</p>\n` +
        ul(p.points.map(esc)) +
        `\n<p><small>${p.linksOut.map((l) => a(l.href, l.label)).join(' &middot; ')}</small></p>`
    )
    .join('\n');

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
        `<p><i>${esc(g.group)}</i>` +
        (g.href ? ` ${a(g.href, g.hrefLabel)}` : '') +
        `</p>\n` +
        ul(g.items.map((i) => `${esc(i.text)}${i.href ? ` ${a(i.href, i.hrefLabel)}` : ''}`))
    )
    .join('\n');

  const com = ul(community.map((c) => `${esc(c.text)} ${a(c.href, c.hrefLabel)}`));

  const sk = ul(skills.map((s) => `<i>${esc(s.group)}:</i> ${esc(s.items.join(', '))}`));

  const main = `<p>${esc(tidy(meta.bio))}</p>

${h2('research', 'Research')}
${res}

${h2('work', 'Experience')}
${exp}

${h2('oss', 'Open source')}
${os}

${h2('software', 'Software')}
${soft}

${h2('education', 'Education')}
${edu}

${h2('awards', 'Awards and certifications')}
${ach}

${h2('teaching', 'Teaching and service')}
${com}

${h2('tools', 'Tools')}
${sk}`;

  const body = `<table>
<tr>
<td class="rail">
${rail}
</td>
<td class="main">
${main}
</td>
</tr>
</table>
`;

  return { css, body, bg };
}
