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

## Hero video

`index.html` holds `<div class="hero-video" data-youtube="VydpQhBqmp4" data-mp4="">`. `site.js` loads the video one second after the page finishes loading. To self-host (faster, no YouTube scripts), add a short muted loop at `assets/video/hero.mp4` (H.264, about 1–3 MB) and set `data-mp4="/assets/video/hero.mp4"`.

## Content rules

- No fundraising amounts or round details.
- No pilot results, customer names or LOIs unless cleared for public use.
- Public contact email is info@mayimflow.com.
- Product images are demo data and are labeled that way.
