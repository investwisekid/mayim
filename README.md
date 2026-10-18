# MayimFlow website

Source for [www.mayimflow.com](https://www.mayimflow.com). Plain HTML, CSS and JavaScript — no framework and no build step. Vercel deploys every push to `main`; pushes to any other branch get a preview link.

## Pages

| URL | File | What's on it |
| --- | --- | --- |
| `/` | `index.html` | Hero video, the problem, how MayimFlow works, product, recognition |
| `/platform` | `platform.html` | Product detail, six signals, AI layer, integrations, deployment |
| `/recognition` | `recognition.html` | Awards timeline and press |
| `/team` | `team.html` | Founder story and team |
| `/investors` | `investors.html` | Investor inquiry form (Tally) |
| `/insights` | `insights/index.html` | Article list |
| `/insights/<slug>` | `insights/<slug>.html` | One file per article |
| — | `404.html` | Not-found page |

`vercel.json` turns on clean URLs (`/team` serves `team.html`) and redirects the old `/about` and `/media` paths.

## Folders

```
assets/
  css/site.css     all styles; brand colors are variables at the top
  js/site.js       header, mobile menu, scroll animations
  img/             every image the site uses (WebP), named by type:
                   team-*, logo-*, press-*, product-*, bg-*, plus favicon/OG image
```

## Editing

- **Text:** edit the page's `.html` file directly.
- **Header and footer** are repeated in every page. If you change a nav link, change it in all six `.html` files.
- **Images:** add them to `assets/img/` as `.webp` (about 2× the size they display at), lowercase with hyphens, and reference them as `/assets/img/name.webp`. Don't link images from `raw.githubusercontent.com`.
- **Forms:** "Request a demo" buttons open Tally form `Ek5oZA`; the investor page embeds Tally form `ODlMDA`.
- **Hero video:** YouTube video `VydpQhBqmp4` in `index.html`; `bg-server-racks.webp` shows while it loads.

## Adding an Insights article

1. Copy an existing file in `insights/` and rename it to the new URL slug (lowercase, hyphens).
2. Update the `<title>`, meta description, canonical URL, `og:` tags, the Article JSON-LD (headline, dates, image) and the body.
3. Make a 1200×630 share image named `assets/img/og-insights-<slug>.jpg`.
4. Add a card for it in `insights/index.html` and a `<url>` entry in `sitemap.xml`.
5. After it's live, use Search Console's URL Inspection to request indexing.
6. If you also post it on Medium or LinkedIn, publish here first and use Medium's "Import a story" so it points back to this page.

## Scheduled news (Recognition page)

New "In the news" items are queued in `_scheduled/news.json`, each with a `publish` date. A GitHub Action (`.github/workflows/publish-news.yml`) runs daily at 9 am Central and adds any item whose date has arrived to `recognition.html` (cards newest first, milestones oldest first), then commits, and Vercel deploys. To change timing, edit the `publish` dates; to publish one now, run the workflow from the repo's Actions tab. `_scheduled/` and `.github/` are not deployed (see `.vercelignore`).

## Hero video

The home page plays a self-hosted, muted loop: `assets/video/hero-720.mp4` (desktop) and `hero-480.mp4` (phones, under 800px wide). `assets/img/hero-poster.webp` shows until the video starts. `site.js` loads the video one second after the page finishes loading and skips it for visitors with Save-Data or reduced-motion settings. To replace the video, export a muted H.264 MP4 at 1280×720 and 854×480 (keep each under about 5 MB) with the same names.

## Content rules

- No fundraising amounts or round details.
- No pilot results, customer names or LOIs unless cleared for public use.
- Public contact email is info@mayimflow.com.
- Product images are demo data and are labeled that way.
