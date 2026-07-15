# shakastack.com

Marketing site for **ShakaStack** - a single entry point into four open-source
[ShakaCode](https://shakacode.com) projects, the ShakaPerf repository source,
and an optional commercially licensed React on Rails Pro tier. The projects
are organized into four phases for taking a Rails + React app from idea to
measured production changes:

| Phase  | Project | What it does |
|--------|---------|--------------|
| Build  | [React on Rails](https://reactonrails.com) | Open-source Rails + React integration; Pro adds RSC and advanced rendering. |
| Build  | [Shakapacker](https://shakapacker.com) | Bundle frontend assets with webpack, the Rails way. |
| Test   | [E2E on Rails](https://e2eonrails.com) | Cypress or Playwright with Rails scenarios, factories, and clean test data. |
| Prove  | [ShakaPerf](https://shakaperf.com) | Repository source for control-vs-experiment performance testing. |
| Deploy | [Control Plane Flow](https://controlplaneflow.com) | A Heroku-style workflow on Control Plane infrastructure. |

The page follows Donald Miller's **StoryBrand (SB7)** framework: the Rails
engineer is the hero, ShakaCode is the guide, and the four-phase stack is the
plan.

## Tech stack

- **[Astro](https://astro.build) 6** - static output, near-zero JavaScript.
- **React 19 islands** - only the four interactive pieces ship JS and hydrate on
  the client:
  - `Nav` - sticky-nav scroll state (`client:load`)
  - `HeroStackCard` - auto-cycling stack highlight (`client:visible`)
  - `StackExplorer` - tab/tabpanel "the plan" explorer (`client:visible`)
  - `GalleryGrid` - examples filter (`client:visible`)
- Everything else (hero copy, problem, guide, project deep-dives, proof,
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

## Before launch - asset placeholders to replace

This site faithfully recreates the design prototype, including its deliberate
placeholders. Replace before going live:

1. **Project logos** - remaining deep-dives have a dashed "logo / screenshot"
   slot. Drop in real React on Rails, Shakapacker, Control Plane Flow, and
   ShakaPerf logos/screenshots.
2. **OG image** - keep [`public/og.svg`](public/og.svg) and its rendered
   1200×630 `public/og.png` copy synchronized whenever public positioning
   changes.

## Claim maintenance

Public product, licensing, support, and performance claims are curated in
[`src/data/shaka.ts`](src/data/shaka.ts) together with their primary-source
URLs. Keep each claim and its source in the same change, and verify the source
still supports the wording before publishing. The static site deliberately does
not fetch live GitHub, registry, or marketing metrics at build or runtime; this
keeps builds deterministic and prevents silent claim drift.

The stack mixes licenses: [React on Rails core](https://github.com/shakacode/react_on_rails/blob/main/LICENSE.md),
[Shakapacker](https://github.com/shakacode/shakapacker/blob/main/MIT-LICENSE),
[E2E on Rails](https://github.com/shakacode/cypress-playwright-on-rails/blob/master/LICENSE),
and [Control Plane Flow](https://github.com/shakacode/control-plane-flow/blob/main/LICENSE)
are open source; [React on Rails Pro](https://github.com/shakacode/react_on_rails/blob/main/REACT-ON-RAILS-PRO-LICENSE.md)
uses its own commercial license. The [ShakaPerf repository source](https://github.com/shakacode/shakaperf/blob/f054e87b5d2712b78ed5e352ee31c6b44ea7e712/LICENSE.md)
uses the ShakaPerf License. Separately, npm registry metadata reports `MIT` for
[`shaka-perf@0.1.3`](https://registry.npmjs.org/shaka-perf/0.1.3) and
[`shaka-bundle-size@0.0.12`](https://registry.npmjs.org/shaka-bundle-size/0.0.12).
The site presents these as separate artifact/version records and does not extend
them to other artifacts or versions.

## License

[MIT](LICENSE) © ShakaCode. This website is open source; linked stack projects
retain their own licenses.
