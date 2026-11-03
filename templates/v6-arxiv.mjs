/**
 * v6: arXiv
 *
 * After the arxiv.org front page. What is taken from it:
 *
 *   - A dark band across the top: a grey wordmark with one red accent on the
 *     left, four or five plain light links on the right. Nothing else.
 *   - One plain paragraph under it that says what the page is.
 *   - A thin-bordered box holding the one control that matters. There it is
 *     the subject picker; here it is the ways to reach me.
 *   - Large bold section headings, then bullets in arXiv's own entry form:
 *       Name (code link, link, link) detail
 *       includes: a; b; c
 *   - Arial, a bright link blue, no rules between sections, a grey footer.
 *
 * The wordmark is a name written like a hostname, ahmed.faraj, with the dot in
 * the red arXiv puts on its X. It nods at the reference without borrowing the
 * logo itself.
 */
import { esc, tidy, a, md, range } from './shared.mjs';

export const info = { slug: 'v6', short: '6', name: 'arXiv' };

const css = `body{margin:0;font:16px/1.45 Arial,Helvetica,sans-serif;color:#000}
a{color:#0b5bd3;text-decoration:none}
a:hover{text-decoration:underline}
/* The band runs edge to edge as arXiv's does; its contents line up with the
   page column below, so the wordmark and the nav frame the text. */
header{background:#1c1c1c;padding:12px 0}
.in{max-width:1440px;margin:0 auto;padding:0 28px;box-sizing:border-box}
header .in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5em 1.5em}
header .mark{font:30px/1 "Courier New",Courier,monospace;letter-spacing:-.04em;color:#c4c4c4}
header .mark b{color:#b31b1b}
header nav a{color:#e8e8e8;font-weight:bold;font-size:15px;margin-left:1.6em}
header nav a:first-child{margin-left:0}
/* Two columns on a wide screen: the text, and a narrow rail holding who and
   where. Without the rail a 1920px window left a third of the page empty. */
.page{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:44px;align-items:start;padding-top:22px;padding-bottom:8px}
aside{margin-top:16px}
.who img{display:block;width:190px;height:auto;border:1px solid #ccc}
.who p{margin:10px 0 0;font-size:14px;color:#333}
.box{border:1px solid #ddd;padding:10px 12px;margin:16px 0 0}
.box b{display:block;margin-bottom:4px;font-size:15px}
.box a{display:inline-block;border:1px solid #bbb;border-radius:2px;background:#f2f2f2;color:#000;padding:1px 8px;margin:3px 2px 3px 0;font-size:14px}
.box a:hover{background:#e4e4e4;text-decoration:none}
.box dl{margin:0;font-size:14px}
.box dt{font-weight:bold;font-size:17px;margin-top:6px}
.box dd{margin:0;color:#444}
h2{font-size:27px;margin:30px 0 10px}
ul{padding-left:50px;margin:0}
li{margin:3px 0}
/* Findings and pull requests under an entry sit in the "includes:" register:
   smaller and indented, so the entry line stays the thing you scan. */
ul ul{padding-left:22px;margin:3px 0 8px;font-size:15px}
.inc{display:block;font-size:15px}
.st{color:#444}
img.paper{float:right;width:150px;height:auto;margin:0 0 12px 20px;border:1px solid #ccc}
h2{clear:both}
footer{clear:both;background:#efefef;margin-top:40px;padding:18px 0;font-size:14px;color:#444}
footer a{margin-right:1.4em}
@media (max-width:900px){
.page{grid-template-columns:1fr;gap:0}
aside{order:-1;margin:0 0 6px}
.glance{display:none}
.who{display:flex;gap:14px;align-items:flex-end}
.who img{width:80px}
}
@media (max-width:640px){
.in{padding-left:16px;padding-right:16px}
header nav a{margin:0 .7em 0 0;font-size:13px}
ul{padding-left:22px}
img.paper{width:96px}
}`;

const bg = '#FFFFFF';

export function render(C) {
  const { meta, narrative, links, experience, research, openSource, projects, education, achievements, community, skills, facts } = C;

  const ul = (items) => `<ul>\n${items.map((i) => `<li>${i}</li>`).join('\n')}\n</ul>`;
  const code = (s) => `<b>${esc(s)}</b>`;
  // Lowercased like arXiv's codes, except words where case carries meaning (MRs, SEP-2145).
  const low = (t) => t.replace(/\b(?![A-Z]{2,})\w+/g, (w) => w.toLowerCase());
  const joinLinks = (ls) => ls.map((l) => a(l.href, l.label)).join(', ');

  // Name (code links) detail, the arXiv entry line.
  const entry = (name, codeText, linkHtml, detail) =>
    `${name} (${code(codeText)}${linkHtml ? ' ' + linkHtml : ''})${detail ? ' ' + detail : ''}`;

  const res = research
    .map(
      (r) =>
        (r.thumb
          ? `<a href="${esc(r.pdf)}" target="_blank" rel="noreferrer"><img class="paper" src="${esc(r.thumb)}" width="150" height="212" alt="First page of ${esc(r.title)}"></a>\n`
          : '') +
        ul([
          entry(
            a(r.pdf ?? r.artifacts[0].href, r.title),
            r.authors,
            joinLinks([{ label: 'pdf', href: r.pdf }, ...r.artifacts].filter((x) => x.href).map((x) => ({ ...x, label: low(x.label) }))),
            `${esc(r.subtitle)}`
          ) +
            `<span class="inc">${esc(r.venue)}, ${esc(r.date)}. Sole author.</span>` +
            ul(r.points.map(md)),
        ])
    )
    .join('\n');

  const os = ul(
    openSource.map((g) => {
      const role = g.role ? (g.roleHref ? a(g.roleHref, low(g.role)) : esc(low(g.role))) : '';
      const head = entry(
        a(g.href, g.org),
        g.org.toLowerCase().replace(/\s+/g, '-'),
        [role, a(g.href, 'all')].filter(Boolean).join(', '),
        `${esc(g.note)}; ${esc(range(g.from, g.to))}`
      );
      return (
        head +
        ul(
          g.items.map(
            (i) =>
              `${a(i.href, i.ref)} <span class="st">(${esc(i.state)})</span> ${esc(i.text)}` +
              (i.extra ? ` ${a(i.extra.href, i.extra.label)}` : '')
          )
        )
      );
    })
  );

  const exp = ul(
    experience.map(
      (e) =>
        entry(
          a(e.href, e.org),
          e.title.toLowerCase(),
          esc(`${e.detail.toLowerCase()}, remote`),
          `${esc(e.orgNote)}, ${esc(e.place)}; ${esc(range(e.from, e.to))}`
        ) + ul(e.points.map(esc))
    )
  );

  const proj = ul(
    projects.map(
      (p) =>
        entry(
          a(p.linksOut[0].href, p.name),
          p.tag.split(' · ')[0].toLowerCase(),
          joinLinks(p.linksOut.map((l) => ({ ...l, label: l.label.toLowerCase() }))),
          esc(p.date)
        ) + `<span class="inc">${esc(tidy(p.blurb))}</span>`
    )
  );

  const edu = ul(
    education.map(
      (e) =>
        entry(
          esc(e.school),
          e.degree.toLowerCase(),
          e.href ? a(e.href, e.hrefLabel.toLowerCase()) : '',
          `${esc(e.faculty)}, ${esc(e.place)}; ${esc(range(e.from, e.to))}`
        ) + `<span class="inc">includes: ${e.points.map((x) => esc(x.replace(/\.$/, ''))).join('; ')}</span>`
    )
  );

  const ach = ul(
    achievements.map(
      (g) =>
        `${esc(g.group)}` +
        (g.href ? ` (${a(g.href, g.hrefLabel.toLowerCase())})` : '') +
        ul(g.items.map((i) => `${esc(i.text)}${i.href ? ` ${a(i.href, i.hrefLabel)}` : ''}`))
    )
  );

  const com = ul(community.map((c) => `${esc(c.text)} ${a(c.href, c.hrefLabel)}`));

  // The one place the arXiv "includes:" line fits as-is: a name, then a list.
  const sk = ul(
    skills.map((s) => `${esc(s.group)}<span class="inc">includes: ${esc(s.items.join('; '))}</span>`)
  );

  const SECTIONS = [
    ['research', 'Research', res],
    ['opensource', 'Open Source', os],
    ['experience', 'Experience', exp],
    ['software', 'Software', proj],
    ['education', 'Education', edu],
    ['awards', 'Awards', ach],
    ['teaching', 'Teaching and Service', com],
    ['skills', 'Skills', sk],
  ];

  const body = `<header>
<div class="in">
<a class="mark" href="./" aria-label="${esc(meta.name)}">ahmed<b>.</b>faraj</a>
<nav>
<a href="#research">Research</a>
<a href="#opensource">Open Source</a>
<a href="#experience">Experience</a>
<a href="${esc(links.find((l) => l.label.startsWith('CV')).href)}">CV</a>
<a href="mailto:${esc(meta.email)}">Contact</a>
</nav>
</div>
</header>
<div class="in page">
<main>
${narrative.slice(0, 2).map((p) => `<p>${md(p)}</p>`).join('\n')}

${SECTIONS.map(([id, t, content]) => `<h2 id="${id}">${esc(t)}</h2>\n${content}`).join('\n\n')}
</main>
<aside>
<div class="who">
<img src="${esc(meta.photo)}" width="190" height="338" alt="${esc(meta.name)}">
<p><b>${esc(meta.name)}</b><br>${meta.address.map(esc).join('<br>')}</p>
</div>
<div class="box">
<b>Find me elsewhere:</b>
${links.map((l) => a(l.href, l.label)).join('\n')}
</div>
<div class="box glance">
<b>At a glance:</b>
<dl>
${facts.map((f) => `<dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd>`).join('\n')}
</dl>
</div>
</aside>
</div>
<footer>
<div class="in">
${a('mailto:' + meta.email, meta.email)}${a('https://github.com/' + meta.handle, 'github.com/' + meta.handle)}${esc(meta.address.slice(1).join(', '))}
<br>Last updated ${esc(meta.stamp)}
</div>
</footer>
`;

  return { css, body, bg };
}
