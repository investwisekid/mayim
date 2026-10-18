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

## Content rules

- No fundraising amounts or round details.
- No pilot results, customer names or LOIs unless cleared for public use.
- Product images are demo data and are labeled that way.
