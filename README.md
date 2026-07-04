# shakastack.com

Marketing site for **ShakaStack** - a single entry point into four open-source
[ShakaCode](https://www.shakacode.com) projects that take a Rails + React app
from idea to proven-fast in production:

| Phase  | Project | What it does |
|--------|---------|--------------|
| Build  | [React on Rails](https://www.reactonrails.com) | Render React inside Rails - SSR, hydration, and RSC. |
| Bundle | [Shakapacker](https://www.shakapacker.com) | Webpack, the Rails way. The maintained successor to Webpacker. |
| Deploy | [Control Plane Flow](https://www.controlplaneflow.com) | A Heroku-style workflow on Control Plane infrastructure. |
| Prove  | [ShakaPerf](https://www.shakaperf.com) | Rigorously prove which changes actually make pages faster. |

The page follows Donald Miller's **StoryBrand (SB7)** framework: the Rails
engineer is the hero, ShakaCode is the guide, and the four tools are the plan.

## Tech stack

- **[Astro](https://astro.build) 6** - static output, near-zero JavaScript.
- **React 19 islands** - only the four interactive pieces ship JS and hydrate on
  the client:
  - `Nav` - sticky-nav scroll state (`client:load`)
  - `HeroStackCard` - auto-cycling stack highlight (`client:visible`)
  - `StackExplorer` - tab/tabpanel "the plan" explorer (`client:visible`)
  - `GalleryGrid` - examples filter (`client:visible`)
- Everything else (hero copy, problem, guide, project deep-dives, stakes, proof,
  CTA, footer) is server-rendered to static HTML with **no client JS**.
- The design system lives in [`src/styles/global.css`](src/styles/global.css)
  (colors authored in OKLCH). Content is typed data in
  [`src/data/shaka.ts`](src/data/shaka.ts).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static build → dist/
pnpm preview    # preview the production build
pnpm check      # astro check (type + template diagnostics)
pnpm test:mobile # Playwright check for page-level mobile overflow
```

Requires Node 18.20.8+, 20.3.0+, or 22+ (Astro 6). Built with Node 24.

## Mobile layout guardrail

Before shipping responsive/layout changes, run `pnpm test:mobile`. The
Playwright check loads the homepage at 375px, 393px, and 430px widths and fails
if the document is wider than the viewport. Treat any page-level horizontal
overflow as a release blocker; use contained scroll regions for wide tables or
code samples instead of allowing the whole page to sideways-scroll.

## Deploy

`pnpm build` emits a fully static site to `dist/` - deploy it to Cloudflare
Pages, Netlify, Vercel, GitHub Pages, or any static host. No server runtime
required. Set the production domain in [`astro.config.mjs`](astro.config.mjs)
(`site`) so canonical URLs and the sitemap are correct.

## Before launch - placeholders to replace

This site faithfully recreates the design prototype, including its deliberate
placeholders. Replace before going live:

1. **Project logos** - each deep-dive has a dashed "logo / screenshot" slot.
   Drop in real React on Rails, Shakapacker, Control Plane Flow, and ShakaPerf
   logos/screenshots.
2. **Example screenshots** - gallery cards use striped name placeholders.
3. **OG image** - [`public/og.svg`](public/og.svg) is a vector placeholder; most
   social crawlers want a 1200×630 PNG/JPG. Render it to `og.png` and update the
   reference in [`src/layouts/Layout.astro`](src/layouts/Layout.astro).
4. **Copy to verify:** all **ShakaPerf** copy (least-documented of the four),
   the **Popmenu pull-quote** attribution & metrics, the client **logo list**,
   and the **"80-90% faster"** guide stat.

## License

[MIT](LICENSE) © ShakaCode. ShakaStack is open source.
