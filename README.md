# Portfolio: Ahmed Faraj

One page, after the [arxiv.org](https://arxiv.org/) front page, deployed to
[ahmad-faraj.github.io/portfolio](https://ahmad-faraj.github.io/portfolio/), the
URL printed on the CV. Content lives in one file. No dependencies, no framework,
no client-side JavaScript, no network requests.

## What it takes from arXiv

- A warm near-black band: grey wordmark with one red accent on the left, muted
  grey nav on the right that gets a lighter pill on hover, and the last link
  (Contact, where arXiv has Log in) set apart by a hairline and drawn in white.
- Plain lead paragraphs, then large section headings with bullets in arXiv's
  entry form: `Name (code links) detail`, and `includes: a; b; c`.
- Arial at 15px on about 1.3 leading, flat lists, full width and flush left.

Its own additions: a right rail with a square photo, the postal block, the link
buttons (square, in the band's colours) and four numbers; a favicon of the band
with the red dot; Open Graph tags so a pasted link previews with the photo.

## Layout

```
content.js            all content, the only file you edit to change a fact
build.mjs             generator (Node built-ins only), writes dist/
serve.mjs             local static server
static/
  photo-square.jpg    400x400, cropped from the 900x1600 original
  paper-p1.jpg        first page of the preprint
  *.pdf               CV, transcript, preprint, copied next to the page
templates/
  arxiv.mjs           the page
  shared.mjs          escaping, links, document shell, favicon
.github/workflows/    builds and publishes to Pages on push to main
dist/                 generated, safe to delete
```

The "Last updated" stamp is derived from the newest mtime across `content.js`
and `templates/`, formatted the way `date(1)` prints it. In CI that is the
checkout time, which is the deploy time.

The five earlier versions (after Morris, Kernighan, Stroustrup and two faculty
pages) were removed in November 2026 and are in the git history.

## Run it

```bash
npm start          # build, then serve on http://localhost:4321
npm run build      # build only
```

`PORT=3000 npm run serve` to change the port.

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
