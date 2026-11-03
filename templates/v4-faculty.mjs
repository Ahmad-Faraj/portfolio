/**
 * v4: Faculty
 *
 * The generic CS-department homepage the three references all descend from,
 * pushed toward the researcher end: serif, formal numbered citations, and the
 * canonical section order: Research, Publications, Software, Experience,
 * Education, Teaching, Awards.
 *
 * This is the only version that numbers the publication list, which is what a
 * reader coming from a paper expects to find.
 */
import { esc, tidy, a, md, range, dot } from './shared.mjs';

export const info = { slug: 'v4', short: '4', name: 'Faculty' };

const css = `body{max-width:46em;margin:2.5em auto;padding:0 1.5em;font:16px/1.55 Georgia,"Times New Roman",serif}
h2{font-size:1.15em;margin:2em 0 .4em}
img.p{float:left;margin:0 1.2em .6em 0}
ol,ul{padding-left:1.6em}
li{margin-bottom:.5em}`;

const bg = '#FFFFFF';

export function render(C) {
  const { meta, links, experience, research, openSource, projects, education, achievements, community, skills } = C;

  const h2 = (t) => `<h2>${esc(t)}</h2>`;
  const ul = (items) => `<ul>\n${items.map((i) => `<li>${i}</li>`).join('\n')}\n</ul>`;

  // Formal citation, numbered. Author list first, the way a CV lists papers.
  const pubs =
    `<ol>\n` +
    research
      .map(
        (r) =>
          `<li>${esc(r.authors)}. &ldquo;${esc(r.title)}: ${esc(r.subtitle)}.&rdquo; ` +
          `<i>${esc(r.venue)}</i>, ${esc(r.date)}. ` +
          r.artifacts.map((x) => `[${a(x.href, x.label)}]`).join(' ') +
          `</li>`
      )
      .join('\n') +
    `\n</ol>`;

  const resBody = research
    .map((r) => `<p>${esc(tidy(r.abstract))}</p>\n` + ul(r.points.map(md)))
    .join('\n');

  const soft = ul(
    projects.map(
      (p) =>
        `${a(p.linksOut[0].href, p.name)}: ${esc(tidy(p.blurb))} ` +
        `<i>${esc(p.tag)}.</i> ` +
        p.linksOut.slice(1).map((l) => `[${a(l.href, l.label)}]`).join(' ')
    )
  );

  const os = openSource
    .map(
      (g) =>
        `<p><i>${esc(g.org)}</i>, ${esc(g.note)} (${esc(range(g.from, g.to))})</p>\n` +
        ul(
          g.items.map(
            (i) =>
              `${esc(i.text)} [${a(i.href, i.ref)}, ${esc(i.state)}]` +
              (i.extra ? ` [${a(i.extra.href, i.extra.label)}]` : '')
          )
        )
    )
    .join('\n');

  const exp = experience
    .map(
      (e) =>
        `<p><b>${esc(e.title)}</b>, ${esc(e.org)} (${esc(e.orgNote)}), ${esc(range(e.from, e.to))}. ` +
        `${esc(e.place)}.</p>\n` +
        ul(e.points.map(esc))
    )
    .join('\n');

  const edu = ul(
    education.map(
      (e) =>
        `<b>${esc(e.degree)}</b>, ${esc(e.school)}, ${esc(range(e.from, e.to))}. ` +
        `${esc(dot(e.faculty, e.place))}. ` +
        e.points.map(esc).join(' ') +
        (e.href ? ` [${a(e.href, e.hrefLabel)}]` : '')
    )
  );

  const ach = achievements
    .map(
      (g) =>
        `<p><i>${esc(g.group)}</i>` +
        (g.href ? ` [${a(g.href, g.hrefLabel)}]` : '') +
        `</p>\n` +
        ul(g.items.map((i) => `${esc(i.text)}${i.href ? ` [${a(i.href, i.hrefLabel)}]` : ''}`))
    )
    .join('\n');

  const com = ul(community.map((c) => `${esc(c.text)} [${a(c.href, c.hrefLabel)}]`));

  const sk = ul(skills.map((s) => `<i>${esc(s.group)}.</i> ${esc(s.items.join(', '))}`));

  const body = `<img class="p" src="${esc(meta.photo)}" width="160" height="284" alt="${esc(meta.name)}">

<h1>${esc(meta.name)}</h1>

<p>
${meta.address.map((l) => esc(l)).join('<br>\n')}<br>
${esc(meta.emailPlain)}
</p>

<p>${esc(tidy(meta.bio))}</p>

<p><small>${links.map((l) => a(l.href, l.label)).join(' &middot; ')}</small></p>

${h2('Research')}
${resBody}

${h2('Publications')}
${pubs}

${h2('Software')}
${soft}

${h2('Open Source Contributions')}
${os}

${h2('Experience')}
${exp}

${h2('Education')}
${edu}

${h2('Teaching and Service')}
${com}

${h2('Awards and Certifications')}
${ach}

${h2('Technical Skills')}
${sk}

<hr>
<p><small>${esc(meta.stamp)}</small></p>
`;

  return { css, body, bg };
}
