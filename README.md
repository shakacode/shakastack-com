# shakastack.com

Marketing site for **ShakaStack**, a public
[ShakaCode](https://shakacode.com) toolkit for building ambitious Rails +
React applications with AI agents, testing the result, proving performance and
visual stability, and deploying it. The working starter gives agents a concrete
architecture and guardrails instead of a blank prompt.

| Phase  | Project | What it does |
|--------|---------|--------------|
| Build  | [React on Rails](https://reactonrails.com) | Open-source Rails + React integration; Pro 17.0.0 adds supported GA RSC and advanced rendering. |
| Build  | [Shakapacker](https://shakapacker.com) | Bundle frontend assets with webpack, the Rails way. |
| Test   | [E2E on Rails](https://e2eonrails.com) | Cypress or Playwright with Rails scenarios, factories, and clean test data. |
| Prove  | [ShakaPerf](https://shakaperf.com) | Branch-vs-trunk performance and visual verification. |
| Deploy | [Control Plane Flow](https://controlplaneflow.com) | A Heroku-style workflow on Control Plane infrastructure. |

The page follows Donald Miller's **StoryBrand (SB7)** framework: the Rails
engineer is the hero, ShakaCode is the guide, and the four-phase stack is the
plan. Cloning the public starter is the primary call to action; its live demo is
the secondary evaluation path. React on Rails Pro and maintainer contact remain
contextual options after visitors can inspect and build with the work.

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

## Example gallery captures

The gallery uses static captures of four linked live demos plus one historical legacy capture
so production builds remain deterministic. Each currently linked demo URL returned HTTP 200
immediately before its capture on 2026-07-15 (UTC).

The legacy capture remains as a historical local asset; the current gallery retains the stable source link while suppressing the unavailable live endpoint.

| Demo | Source URL | Capture date | Capture viewport | Output | Optimization | Provenance |
|------|------------|--------------|------------------|--------|--------------|------------|
| Marketplace | [rsc.reactonrails.com](https://rsc.reactonrails.com/) | 2026-07-15 UTC | 1440×900 | [`public/examples/marketplace.webp`](public/examples/marketplace.webp) | Top 1440×810 crop; 960×540 WebP, quality 76, method 6, metadata stripped | Captured from the ShakaCode-operated live demo |
| Hacker News | [hn.reactonrails.com](https://hn.reactonrails.com/) | 2026-07-15 UTC | 1440×900 | [`public/examples/hacker-news.webp`](public/examples/hacker-news.webp) | Top 1440×810 crop; 960×540 WebP, quality 76, method 6, metadata stripped | Captured from the ShakaCode-operated live demo |
| Gumroad | [gumroad.reactonrails.com](https://gumroad.reactonrails.com/public_product/rsc_demo) | 2026-07-15 UTC | 1440×900 | [`public/examples/gumroad.webp`](public/examples/gumroad.webp) | Top 1440×810 crop; 960×540 WebP, quality 76, method 6, metadata stripped | Captured from the ShakaCode-operated live demo |
| TanStack Starter | [starter.reactonrails.com](https://starter.reactonrails.com/) | 2026-07-15 UTC | 1440×900 | [`public/examples/tanstack-starter.webp`](public/examples/tanstack-starter.webp) | Top 1440×810 crop; 960×540 WebP, quality 76, method 6, metadata stripped | Captured from the ShakaCode-operated live demo |
| Legacy Tutorial App | Historical capture; [stable source repository](https://github.com/shakacode/react-webpack-rails-tutorial) | 2026-07-15 UTC | 1440×900 | [`public/examples/legacy-tutorial.webp`](public/examples/legacy-tutorial.webp) | Top 1440×810 crop; 960×540 WebP, quality 76, method 6, metadata stripped | Historical local capture retained for documentation; live endpoint unavailable |

Captures were made with Playwright Chromium in light mode using the `en-US`
locale and `Pacific/Honolulu` timezone after a three-second settle, with service
workers blocked. They are first-party documentation assets for this
ShakaCode-owned site. Linked applications and source code retain their own
licenses; third-party names and marks visible in a capture remain the property
of their respective owners.

## Claim maintenance

Public product and performance claims are curated in
[`src/data/shaka.ts`](src/data/shaka.ts) together with their primary-source
URLs. Keep each claim and its source in the same change, and verify the source
still supports the wording before publishing. The static site deliberately does
not fetch live GitHub or marketing metrics at build or runtime; this keeps
builds deterministic and prevents silent claim drift. The rounded download
proof was checked on `2026-07-24 UTC` against RubyGems totals of `12,509,202`
for React on Rails and `11,444,369` for Shakapacker. Refresh the displayed
figures and this note together when either rounded threshold changes.

## License

[MIT](LICENSE) © ShakaCode. This website is open source; linked stack projects
retain their own licenses.
