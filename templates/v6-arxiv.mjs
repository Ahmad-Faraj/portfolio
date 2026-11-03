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

const css = `/* arXiv sets 16px on about 21px of leading; the density is most of the look. */
body{margin:0;font:16px/1.32 Arial,Helvetica,sans-serif;color:#000}
a{color:#0b5bd3;text-decoration:none}
a:hover{text-decoration:underline}
/* Full width and flush left, as arXiv is: wordmark at the left edge, nav at
   the right, lists free to run across the page. */
header{background:#23211f;padding:9px 0}
.in{padding:0 28px;box-sizing:border-box}
header .in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5em 1.5em}
header .mark{font:30px/1 "Courier New",Courier,monospace;letter-spacing:-.04em;color:#c4c4c4}
header .mark b{color:#b31b1b}
/* arXiv's nav: muted grey, a rounded lighter pill and white text on hover,
   and the last link set apart by a hairline and drawn in white. */
header nav{display:flex;align-items:center;gap:4px}
header nav a{color:#b9b6b2;font:600 15px/1 "Noto Sans","Segoe UI","Helvetica Neue",Arial,sans-serif;padding:8px 12px;border-radius:6px}
header nav a:hover,header nav a:focus-visible{background:#3a3734;color:#fff;text-decoration:none;outline:none}
header nav i{width:1px;height:26px;background:#4a4744;margin:0 10px}
header nav a.end{color:#fff}
/* Two columns on a wide screen: the text, and a narrow rail holding who and
   where. */
.page{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:40px;align-items:start;padding-top:8px;padding-bottom:8px}
aside{margin-top:16px}
.who img{display:block;width:100%;height:auto;box-sizing:border-box;border:1px solid #ccc}
.who p{margin:10px 0 0;font-size:14px;color:#333}
.box{border:1px solid #ddd;padding:8px 10px;margin:14px 0 0}
.box b{display:block;margin-bottom:4px;font-size:15px}
/* Buttons in the band's colours, with the same lighter pill on hover. */
.box a{display:inline-block;border-radius:6px;background:#23211f;color:#e2dfdb;font-weight:bold;padding:4px 10px;margin:3px 2px 3px 0;font-size:13px}
.box a:hover,.box a:focus-visible{background:#3a3734;color:#fff;text-decoration:none;outline:none}
.box dl{margin:0;font-size:14px}
.box dt{font-weight:bold;font-size:17px;margin-top:6px}
.box dd{margin:0;color:#444}
h2{font-size:26px;margin:28px 0 16px}
ul{padding-left:50px;margin:0}
li{margin:0}
/* Nested lines keep the entry's size and set solid, as arXiv's "includes:"
   lines do. */
ul ul{padding-left:22px;margin:0}
.inc{display:block}
.st{color:#444}
img.paper{float:right;width:108px;height:auto;margin:0 0 8px 20px;border:1px solid #ccc}
h2{clear:both}
footer{clear:both;background:#efefef;margin-top:36px;padding:14px 0;font-size:14px;color:#444}
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
header nav{gap:0}
header nav a{padding:5px 7px;font-size:13px}
header nav a:first-child{padding-left:0}
header nav i{margin:0 4px;height:20px}
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
          ? `<a href="${esc(r.pdf)}" target="_blank" rel="noreferrer"><img class="paper" src="${esc(r.thumb)}" width="108" height="153" alt="First page of ${esc(r.title)}"></a>\n`
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
${a(links.find((l) => l.label.startsWith('CV')).href, 'CV')}
<i></i>
<a class="end" href="mailto:${esc(meta.email)}">Contact</a>
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
<img src="${esc(meta.photoSquare)}" width="260" height="260" alt="${esc(meta.name)}">
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
