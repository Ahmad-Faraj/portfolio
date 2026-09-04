# Portfolio: Ahmed Faraj

Five pages in the idiom of the classic CS homepage. Content lives in exactly one
place; each version is a template that renders it. White or off-white only, no
dependencies, no framework, no client-side JavaScript, no network requests.

## The references

Forty pages fetched and measured, not remembered. The classic tier, sorted by
what they ship:

| Page | Size | Inline CSS | Ext sheets |
|---|---|---|---|
| [nil.lcs.mit.edu/rtm](http://nil.lcs.mit.edu/rtm/) (Robert Morris) | 2.0 kB | **0 B** | 0 |
| [stroustrup.com](https://www.stroustrup.com/) | 3.7 kB | 141 B | 0 |
| [cs-faculty.stanford.edu/~knuth](https://www-cs-faculty.stanford.edu/~knuth/) | 3.9 kB | 0 B | 1 |
| [herpolhode.com/rob](http://herpolhode.com/rob/) (Rob Pike) | 4.1 kB | **0 B** | 0 |
| [cr.yp.to](https://cr.yp.to/djb.html) (D. J. Bernstein) | 4.3 kB | **0 B** | 0 |
| [lamport.org](https://lamport.azurewebsites.net/) (Leslie Lamport) | 4.3 kB | **0 B** | 0 |
| [bellard.org](https://bellard.org/) (Fabrice Bellard) | 4.6 kB | **0 B** | 0 |
| [paulgraham.com](https://www.paulgraham.com/) | 5.2 kB | **0 B** | 0 |
| [swtch.com/~rsc](https://swtch.com/~rsc/) (Russ Cox) | 8.0 kB | **0 B** | 0 |
| [cs.princeton.edu/~bwk](https://www.cs.princeton.edu/~bwk/) (Kernighan) | 12.4 kB | 224 B | 0 |
| [bell-labs.com/usr/dmr](https://www.bell-labs.com/usr/dmr/www/) (Ritchie) | 20.3 kB | **0 B** | 0 |
| [danluu.com](https://danluu.com/) | 21.4 kB | 170 B | 0 |

Eight of those ship no CSS at all, inline or external: Morris, Pike, djb,
Lamport, Bellard, Graham, Cox, Ritchie.

What they have in common, and what these templates copy:

- A photograph and a postal address, together, at the top.
- The name is not a banner. Morris uses `<b>`, Kernighan plain text and `<br>`.
- One first-person paragraph does the positioning. No tagline, no summary bullets.
- Links carry the content: either inside prose, or as `link: one sentence`.
- Small headings, `h3` rather than `h1`, title case, no rules, no letter-spacing.
- A timestamp. Kernighan ships the raw output of `date(1)`.
- Nothing is quantified. No metrics, badges, or percentages.
- `<table>` for layout where an image sits beside text. Cox uses sixteen of them.

**Background colour is not a rule.** Only 9 of the 40 declare one, and among the
classic pages it splits evenly: off-white for Morris `#fffffa`, Stroustrup
`#fffbfb` and Lamport `#fffff0`; pure white for Kernighan, Ritchie and Graham.
All five versions here use pure white `#FFFFFF`, following bwk, set with the
`bgcolor` attribute as all of them do.

Two idioms worth knowing about but not copied here. **Bellard** has no bio, no
photo, no headings and no dates: his whole page is a reverse-chronological stack
of one-sentence paragraphs, one per project. **Rob Pike** writes his bio in the
third person and makes it funny, which only works once nobody needs convincing.

## What this builds

| Version | After | CSS | Size |
|---|---|---|---|
| v1 Morris | nil.lcs.mit.edu/rtm | **0 B** | 5.2 kB |
| v2 Kernighan | cs.princeton.edu/~bwk | 391 B | 17.4 kB |
| v3 Stroustrup | stroustrup.com | **0 B** | 11.1 kB |
| v4 Faculty | generic department page | 229 B | 13.7 kB |
| v5 Sidebar | two-column department page | 324 B | 17.0 kB |

v2 departs from bwk in four small ways, all deliberate: `2.5em` side margins so
the text does not sit against the window edge, a hairline rule under each `h3`,
`.55em` between the findings nested under a paper (they otherwise set solid at his
20px leading), and `h3,hr{clear:both}` so a heading closes the paper thumbnail and
the rule closes the photo. Everything else is his stylesheet.

Stylesheets carry a comment for every rule that departs from the reference page.
`rules()` in `shared.mjs` strips them on the way out, so the size the build
reports is the size that ships.

Section order in v2 leads with the evidence, not the CV order: research, open
source, employment, software, education, awards, teaching. A CV is scanned in a
conventional order; a homepage is judged on its first screen.

The **timestamp is derived**, not typed: `build.mjs` takes the newest mtime across
`content.js` and `templates/` and formats it the way `date(1)` does. It is the one
element whose whole job is to assert the page is hand-maintained, so a stale one
argues the opposite.

v2 has no skills matrix. bwk has none, and Pike's page does not mention that he
knows Go. The one row of it with a voice, `Daily driver`, survives as a line of
prose in the personal block.

`<html>`, `<head>` and `<body>` are omitted from the output. They are optional in
HTML5 and the parser inserts them, which is how danluu.com ships. White is pinned
with `<meta name="color-scheme" content="light">`: one tag, no CSS, and a reader
in dark mode still sees paper.

## Layout

```
content.js            all content, the only file you edit to change a fact
build.mjs             generator (Node built-ins only)
serve.mjs             local static server
static/
  photo.jpg           300x533, the 900x1600 original resized, not cropped
  paper-p1.jpg        first page of the preprint
  *.pdf               CV, transcript, preprint, copied next to every page
templates/
  shared.mjs          escaping, links, document shell, favicon, preview line
  v1-morris.mjs  v2-kernighan.mjs  v3-stroustrup.mjs
  v4-faculty.mjs v5-sidebar.mjs
  landing.mjs         review-only page listing all five
.github/workflows/    builds v2 and publishes it to Pages on push to main
dist/                 generated, safe to delete
```

## Deployed

`main` builds v2 and publishes it to
[ahmad-faraj.github.io/portfolio](https://ahmad-faraj.github.io/portfolio/),
which is the URL printed on the CV. The workflow runs `npm run ship v2` and
uploads `dist/`; there is nothing to install, so there is no lockfile and no
install step.

The React site that used to live here is tagged `old-react-site`.

## Run it

```bash
npm start          # build, then serve on http://localhost:4321
npm run build      # build only
npm run serve      # serve an existing dist/
```

`PORT=3000 npm run serve` to change the port. The build prints each version's CSS
size. If a number starts climbing, that is the signal to stop.

## Ship one

```bash
npm run ship v1    # dist/index.html, no preview line, deploy as-is
```

`dist/` is then `index.html`, `photo.jpg` and the CV PDF. Works on GitHub Pages,
Netlify, S3, or opened straight off the filesystem.

## House rules

- **No em dashes.** Anywhere: prose, templates, comments, page titles. Use a
  comma, a colon, a semicolon, or a full stop. En dashes stay in date ranges
  (`Nov 2025 – Present`), which is the correct character for a range.
- **Open-source `state` renders verbatim**: `merged`, `open`, `diagnosis`. An
  honest state reads better than an inflated one, and the reader can click through.
- **Every `href` should resolve.** Prefer `github.com/search?...&type=pullrequests`
  over `github.com/pulls`, and a project-scoped GitLab MR search over `/dashboard`.
  The latter of each pair 404s or 403s for a logged-out visitor.
- **Dates are absolute**, and `to: null` means ongoing.

## Verified

- No horizontal overflow at 390 / 768 / 1280 px, measured as `scrollWidth ===
  clientWidth` in headless Edge. A table for the photo block failed this at 390:
  a table cannot shrink below its min-content width, so the float stayed.
- Zero em dashes in source or output.
- Every external link checked. The four that fail are bot-blocking (Codeforces,
  LeetCode, Facebook, GitLab) and resolve in a real browser.
