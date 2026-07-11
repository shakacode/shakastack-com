# E2E On Rails Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add E2E on Rails to ShakaStack, bootstrap `e2eonrails-com`, and wire Cypress Playwright on Rails docs publishing like React on Rails.

**Architecture:** ShakaStack is the top-level five-layer overview. The gem repo remains the source of truth for docs content and table of contents. The docs-site repo syncs from the gem repo on local builds and on `docs-updated` repository-dispatch events, then builds and deploys the static Docusaurus site.

**Tech Stack:** Astro 6, React 19 islands, Ruby gem repo GitHub Actions, Docusaurus, Node 24, GitHub repository dispatch, Cloudflare Pages.

---

## Scope Check

This plan spans three repositories, but the work is one connected release:

- `shakastack-com`: public stack positioning and project layer.
- `cypress-playwright-on-rails`: canonical docs source, sidebar, docs validation, docs-site dispatch, README/repo metadata.
- `e2eonrails-com`: synced docs website and Cloudflare Pages deploy workflow.

Do not split the work into disconnected PRs without keeping the docs URLs and dispatch names consistent.

For portable commands below, replace `<workspace>` with the directory containing
the checkouts and `<asset-source>` with the approved brand-asset source.

## File Structure

### ShakaStack Repo

- Modify `src/data/shaka.ts`: add the E2E project, reorder projects, update types.
- Modify `src/lib/iconPaths.ts`: add the test-layer icon.
- Modify `src/components/ProjectSection.astro`: render a real project logo when supplied.
- Modify `src/components/Hero.astro`: update project count/copy.
- Modify `src/components/Stack.astro`: update stack headline and phase copy.
- Modify `src/components/Projects.astro`: update project count/copy.
- Modify `src/components/Footer.astro`: update footer tagline order.
- Modify `src/components/islands/HeroStackCard.tsx`: update decorative header.
- Modify `src/components/islands/StackExplorer.tsx`: add Test/Deploy phase notes.
- Modify `src/styles/global.css`: add `--e2e` colors and logo-slot styles.
- Modify `README.md`: update the stack table and copy.
- Create `public/projects/cypress-playwright-on-rails/`: copy the selected brand assets.

### Cypress Playwright On Rails Repo

- Create branch `jg-codex/e2e-docs-site-wiring` from `master`.
- Modify `README.md`: add E2E on Rails/docs positioning near the top.
- Create `docs/sidebars.ts`: Docusaurus table of contents.
- Create docs pages:
  - `docs/introduction.md`
  - `docs/getting-started.md`
  - `docs/cypress.md`
  - `docs/playwright.md`
  - `docs/factory-bot.md`
  - `docs/fixtures.md`
  - `docs/scenarios.md`
  - `docs/app-commands.md`
  - `docs/migration/from-cypress-on-rails.md`
- Create `docs/.sidebar-exclusions`: exclude ADR and roadmap docs from sidebar checks.
- Create `script/check-docs-sidebar`: adapted React on Rails sidebar checker.
- Create `.github/workflows/check-docs-sidebar.yml`: CI validation for docs navigation.
- Create `.github/workflows/trigger-docs-site.yml`: dispatch `shakacode/e2eonrails-com` on docs changes.
- Copy brand assets into `docs/assets/brand/`.

### E2E On Rails Docs Repo

- Bootstrap `shakacode/e2eonrails-com` with the approved initial `main` commit.
- Create root scripts:
  - `scripts/sync-docs.mjs`
  - `scripts/prepare-docs.mjs`
  - `scripts/audit-docs.mjs`
- Create Docusaurus app under `prototypes/docusaurus/`.
- Create `.github/workflows/site-build-deploy.yml`.
- Create `README.md` and `CLOUDFLARE_SETUP.md`.
- Copy brand assets into `prototypes/docusaurus/static/img/`.

## Task 1: Prepare Working Repos

**Files:**
- Modify: local git state only.

- [ ] **Step 1: Confirm ShakaStack branch and clean state**

Run:

```bash
git -C <workspace>/shakastack-com status --short --branch
```

Expected: branch `jg-codex/add-e2e-on-rails-layer` with no unstaged changes except the plan while it is being edited.

- [ ] **Step 2: Clone or refresh the gem repo**

Run:

```bash
cd <workspace>
if [ -d cypress-playwright-on-rails/.git ]; then
  git -C cypress-playwright-on-rails fetch origin
else
  git clone git@github.com:shakacode/cypress-playwright-on-rails.git
fi
git -C cypress-playwright-on-rails switch master
git -C cypress-playwright-on-rails pull --ff-only origin master
git -C cypress-playwright-on-rails switch -c jg-codex/e2e-docs-site-wiring
```

Expected: branch `jg-codex/e2e-docs-site-wiring`.

- [ ] **Step 3: Clone or initialize the docs repo**

Run:

```bash
cd <workspace>
if [ -d e2eonrails-com/.git ]; then
  git -C e2eonrails-com fetch origin
else
  git clone git@github.com:shakacode/e2eonrails-com.git
fi
```

Expected: if the repo is still empty, `git clone` may warn that it is empty. Continue and make the approved initial `main` commit from inside `e2eonrails-com`.

## Task 2: Update ShakaStack Content

**Files:**
- Modify: `src/data/shaka.ts`
- Modify: `src/lib/iconPaths.ts`
- Modify: `src/components/ProjectSection.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Stack.astro`
- Modify: `src/components/Projects.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/islands/HeroStackCard.tsx`
- Modify: `src/components/islands/StackExplorer.tsx`
- Modify: `src/styles/global.css`
- Modify: `README.md`
- Create: `public/projects/cypress-playwright-on-rails/*`

- [ ] **Step 1: Copy E2E assets into the site**

Run:

```bash
mkdir -p <workspace>/shakastack-com/public/projects/cypress-playwright-on-rails
cp <asset-source>/cypress-playwright-on-rails/lockup-dark.svg <workspace>/shakastack-com/public/projects/cypress-playwright-on-rails/lockup-dark.svg
```

Expected: the selected assets exist under `public/projects/cypress-playwright-on-rails/`.

- [ ] **Step 2: Add typed logo support to the content model**

In `src/data/shaka.ts`, extend `ProjectId`, `IconName`, and `Project`:

```ts
export type ProjectId = "ror" | "shakapacker" | "e2e" | "shakaperf" | "cpflow";
export type IconName =
  | "build"
  | "bundle"
  | "test"
  | "deploy"
  | "prove"
  | "arrow"
  | "arrowUR"
  | "check"
  | "play"
  | "spark"
  | "layers"
  | "surf";

export interface Project {
  id: ProjectId;
  stage: string;
  phase: "Build" | "Test" | "Prove" | "Deploy";
  name: string;
  domain: string;
  url: string;
  accent: ProjectId;
  icon: IconName;
  logo?: {
    src: string;
    alt: string;
  };
  tagline: string;
  blurb: string;
  benefits: Benefit[];
  install: string;
  altInstall?: string;
  links: ProjectLink[];
}
```

Expected: TypeScript accepts five project IDs and the optional logo metadata.

- [ ] **Step 3: Insert the E2E project and move deploy last**

In `src/data/shaka.ts`, place this project object between Shakapacker and ShakaPerf:

```ts
  {
    id: "e2e",
    stage: "Test",
    phase: "Test",
    name: "E2E on Rails",
    domain: "e2eonrails.com",
    url: "https://e2eonrails.com",
    accent: "e2e",
    icon: "test",
    logo: {
      src: "/projects/cypress-playwright-on-rails/lockup-dark.svg",
      alt: "E2E on Rails logo",
    },
    tagline: "The Rails test bridge for Cypress and Playwright.",
    blurb:
      "Use Cypress or Playwright with your real Rails test setup: FactoryBot, fixtures, database cleanup, scenarios, VCR, and custom app commands.",
    benefits: [
      ["Rails-aware browser tests", "Run Cypress or Playwright against a Rails app without giving up Rails test helpers."],
      ["Clean app state", "Reset data, load scenarios, and use factories through app commands designed for repeatable E2E tests."],
      ["One bridge, two runners", "Keep Cypress and Playwright support under the same Rails-native integration layer."],
    ],
    install: "gem 'cypress-on-rails'",
    altInstall: "bin/rails g cypress_on_rails:install --framework playwright",
    links: [
      ["Website", "https://e2eonrails.com"],
      ["Docs", "https://e2eonrails.com/docs"],
      ["GitHub", "https://github.com/shakacode/cypress-playwright-on-rails"],
      ["Gem", "https://rubygems.org/gems/cypress-on-rails"],
    ],
  },
```

Then move the existing Control Plane Flow object after ShakaPerf.

Expected: rendered order is React on Rails, Shakapacker, E2E on Rails, ShakaPerf, Control Plane Flow.

Also update the existing Shakapacker object so `phase: "Build"` and `stage: "Bundle"` align with the four-phase stack language while keeping Shakapacker visible as its own project.

- [ ] **Step 4: Add the test icon path**

In `src/lib/iconPaths.ts`, add:

```ts
  test:
    '<rect x="4" y="5" width="10" height="8" rx="2"/><rect x="10" y="11" width="10" height="8" rx="2"/><path d="M8 17l2.6 2.6L16.5 13"/><path d="M6.5 8h5M12.5 14h5"/>',
```

Expected: `Icon name="test"` renders in both Astro and React components.

- [ ] **Step 5: Render project logos when present**

In `src/components/ProjectSection.astro`, replace the generic logo slot body with:

```astro
      <div class:list={["proj-logo-slot", p.logo && "has-logo"]}>
        {
          p.logo ? (
            <img src={p.logo.src} alt={p.logo.alt} loading="lazy" decoding="async" />
          ) : (
            <>
              <span class="glyph"><Icon name={p.icon} /></span>
              <span class="ph">{p.name} logo / screenshot</span>
            </>
          )
        }
      </div>
```

Expected: E2E on Rails shows its supplied lockup; older projects keep their current generic visual slot.

- [ ] **Step 6: Update global visual styles**

In `src/styles/global.css`, add the accent variables:

```css
  --e2e:         oklch(0.67 0.135 196);
  --e2e-deep:    oklch(0.49 0.13 215);
```

Add logo rendering styles near `.proj-logo-slot`:

```css
.proj-logo-slot.has-logo {
  border-style: solid;
  background: oklch(0.985 0.008 85);
  padding: 18px;
}
.proj-logo-slot.has-logo img {
  width: min(100%, 520px);
  max-height: 112px;
  object-fit: contain;
}
```

Expected: the lockup fits in the visual card without stretching or clipping.

- [ ] **Step 7: Update visible copy and phase notes**

Make these copy changes:

```text
Hero: "ShakaStack is five open-source projects..."
Hero stat: "5" / "open-source projects"
Stack heading: "Build -> bundle -> test -> prove -> deploy."
Stack body: "Four phases, five open-source projects - one path from Rails + React code to validated production."
Projects body: "Use one, use all five."
Footer tagline: "build -> bundle -> test -> prove -> deploy"
```

In `src/components/islands/StackExplorer.tsx`, set:

```ts
const PHASE_NOTE: Record<string, string> = {
  Build: "Render React in Rails and bundle assets.",
  Test: "Exercise real browser flows with Rails test state.",
  Prove: "Prove every page is faster before it ships.",
  Deploy: "Ship the validated app to production.",
};
```

Expected: deploy appears last in all visible stack summaries.

- [ ] **Step 8: Verify ShakaStack**

Run:

```bash
pnpm check
pnpm build
```

Expected: both commands pass.

- [ ] **Step 9: Commit ShakaStack implementation**

Run:

```bash
git add src public README.md docs/superpowers
git commit -m "Add E2E on Rails to ShakaStack"
```

Expected: one implementation commit after the design/plan commits.

## Task 3: Wire Docs Source In The Gem Repo

**Files:**
- Modify: `README.md`
- Create: `docs/sidebars.ts`
- Create: `docs/.sidebar-exclusions`
- Create: `docs/introduction.md`
- Create: `docs/getting-started.md`
- Create: `docs/cypress.md`
- Create: `docs/playwright.md`
- Create: `docs/factory-bot.md`
- Create: `docs/fixtures.md`
- Create: `docs/scenarios.md`
- Create: `docs/app-commands.md`
- Create: `docs/migration/from-cypress-on-rails.md`
- Create: `docs/assets/brand/*`
- Create: `script/check-docs-sidebar`
- Create: `.github/workflows/check-docs-sidebar.yml`
- Create: `.github/workflows/trigger-docs-site.yml`

- [ ] **Step 1: Add docs IA**

Create `docs/sidebars.ts`:

```ts
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'introduction',
    'getting-started',
    {
      type: 'category',
      label: 'Test Runners',
      items: ['cypress', 'playwright'],
    },
    {
      type: 'category',
      label: 'Rails Test State',
      items: ['factory-bot', 'fixtures', 'scenarios', 'app-commands'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'authentication',
        'factory_bot_associations',
        'BEST_PRACTICES',
        'TROUBLESHOOTING',
        'VCR_GUIDE',
        'DX_IMPROVEMENTS',
      ],
    },
    {
      type: 'category',
      label: 'Migration',
      items: ['migration/from-cypress-on-rails'],
    },
  ],
};

export default sidebars;
```

Expected: the docs site can import the sidebar directly from the synced gem repo docs.

- [ ] **Step 2: Add sidebar exclusions**

Create `docs/.sidebar-exclusions`:

```text
# Historical and planning docs are source-controlled but not published navigation.
RELEASE
adr/0001-reserve-e2e_on_rails-rename-at-2.0
adr/0002-public-rebrand-e2e-on-rails
roadmap/2026-07-e2e-on-rails-naming-decision
roadmap/2026-07-release-and-adoption-plan
```

Expected: navigation checks do not force ADR/roadmap documents into public docs navigation.

- [ ] **Step 3: Add public docs pages**

Create the new docs pages with these H1 titles and links:

```text
docs/introduction.md: # E2E on Rails
docs/getting-started.md: # Getting Started
docs/cypress.md: # Cypress
docs/playwright.md: # Playwright
docs/factory-bot.md: # FactoryBot
docs/fixtures.md: # Fixtures
docs/scenarios.md: # Scenarios
docs/app-commands.md: # App Commands
docs/migration/from-cypress-on-rails.md: # Migrating from cypress-rails
```

Each page must link back to the current install command `gem 'cypress-on-rails'` and explain that the public brand is E2E on Rails while the 1.x gem name remains `cypress-on-rails`.

Expected: the docs-site sync has first-class pages for the ADR-approved URL structure.

- [ ] **Step 4: Add the sidebar checker**

Create `script/check-docs-sidebar` by adapting the React on Rails checker with these repo-specific rules:

```bash
DOC_FILES=$(echo "$ADDED_FILES" | grep -E '^docs/.*\.(md|mdx)$' | grep -vE '^docs/(adr|roadmap)/' || echo "")
DOC_ID="${file#docs/}"
DOC_ID="${DOC_ID%.md}"
DOC_ID="${DOC_ID%.mdx}"
```

Keep the rest of the behavior: strip comments, accept quoted doc IDs in `docs/sidebars.ts`, respect `docs/.sidebar-exclusions`, and fail with the missing doc IDs.

Expected: `bash script/check-docs-sidebar origin/master HEAD` reports all new public docs accounted for.

- [ ] **Step 5: Add docs-sidebar CI**

Create `.github/workflows/check-docs-sidebar.yml`:

```yaml
name: Check Docs Sidebar

permissions:
  contents: read

on:
  push:
    branches: [master]
    paths:
      - 'docs/**'
      - 'script/check-docs-sidebar'
      - '.github/workflows/check-docs-sidebar.yml'
  pull_request:
    paths:
      - 'docs/**'
      - 'script/check-docs-sidebar'
      - '.github/workflows/check-docs-sidebar.yml'
  workflow_dispatch:

jobs:
  check-sidebar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Check new docs have sidebar entries
        env:
          BASE_REF: ${{ github.event.pull_request.base.sha || github.event.before || 'origin/master' }}
        run: script/check-docs-sidebar "$BASE_REF"
```

Expected: PRs touching docs validate navigation.

- [ ] **Step 6: Add docs-site dispatch workflow**

Create `.github/workflows/trigger-docs-site.yml`:

```yaml
name: Trigger docs site rebuild

permissions:
  contents: read

on:
  push:
    branches: [master]
    paths:
      - 'docs/**'
      - 'README.md'

jobs:
  notify-docs-site:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/create-github-app-token@v1
        id: app-token
        with:
          app-id: ${{ secrets.DOCS_DISPATCH_APP_ID }}
          private-key: ${{ secrets.DOCS_DISPATCH_APP_KEY }}
          owner: shakacode
          repositories: e2eonrails-com

      - uses: peter-evans/repository-dispatch@ff45666b9427631e3450c54a1bcbee4d9ff4d7c0
        with:
          token: ${{ steps.app-token.outputs.token }}
          repository: shakacode/e2eonrails-com
          event-type: docs-updated
```

Expected: docs changes merged to `master` can trigger the docs-site build.

- [ ] **Step 7: Add docs link to README**

Near the top of `README.md`, add:

```md
> **E2E on Rails documentation:** https://e2eonrails.com
>
> E2E on Rails is the public brand for this project. The 1.x gem is still installed as `cypress-on-rails`; the staged `e2e_on_rails` gem flip comes later.
```

Expected: GitHub users see the canonical docs link before the long support block.

- [ ] **Step 8: Verify and commit the gem repo**

Run:

```bash
bash script/check-docs-sidebar origin/master HEAD
ruby -e "require 'yaml'; Dir['.github/workflows/*.{yml,yaml}'].sort.each { |f| YAML.safe_load_file(f, permitted_classes: [], aliases: false); puts f }"
bundle exec rake
git diff --check
git add README.md docs script .github/workflows
git commit -m "Wire E2E on Rails docs publishing"
```

Expected: checks pass and commit is created. If `bundle exec rake` fails for an environment/toolchain reason, capture the exact failure and run the narrower docs checks before pushing.

## Task 4: Bootstrap The Docs Site

**Files:**
- Create: `README.md`
- Create: `CLOUDFLARE_SETUP.md`
- Create: `package.json`
- Create: `scripts/sync-docs.mjs`
- Create: `scripts/prepare-docs.mjs`
- Create: `scripts/audit-docs.mjs`
- Create: `prototypes/docusaurus/package.json`
- Create: `prototypes/docusaurus/docusaurus.config.ts`
- Create: `prototypes/docusaurus/sidebars.ts`
- Create: `prototypes/docusaurus/src/pages/index.tsx`
- Create: `prototypes/docusaurus/src/css/custom.css`
- Create: `prototypes/docusaurus/static/img/*`
- Create: `.github/workflows/site-build-deploy.yml`

- [ ] **Step 1: Initialize repo main**

Inside `<workspace>/e2eonrails-com`, if the repo is empty:

```bash
git switch --orphan main
```

Expected: empty `main` branch ready for the approved bootstrap commit.

- [ ] **Step 2: Add root package scripts**

Create `package.json`:

```json
{
  "name": "e2eonrails-com",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "sync:docs": "node scripts/sync-docs.mjs",
    "prepare:docs": "node scripts/prepare-docs.mjs",
    "audit:docs": "node scripts/audit-docs.mjs",
    "prepare": "npm run sync:docs && npm run prepare:docs",
    "install:site": "npm --prefix prototypes/docusaurus install",
    "dev": "npm --prefix prototypes/docusaurus run start",
    "build": "npm --prefix prototypes/docusaurus run build",
    "build:full": "npm run prepare && npm run audit:docs && npm run build",
    "cloudflare:deploy": "npm run build:full && npx wrangler pages deploy prototypes/docusaurus/build --project-name ${CLOUDFLARE_PAGES_PROJECT:-e2eonrails-com}"
  },
  "devDependencies": {
    "wrangler": "^4.0.0"
  }
}
```

Expected: root scripts mirror the React on Rails site shape.

- [ ] **Step 3: Add Docusaurus package**

Create `prototypes/docusaurus/package.json`:

```json
{
  "name": "e2eonrails-docusaurus",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "start": "docusaurus start --host 0.0.0.0",
    "build": "docusaurus build",
    "serve": "docusaurus serve"
  },
  "dependencies": {
    "@docusaurus/core": "^3.8.1",
    "@docusaurus/preset-classic": "^3.8.1",
    "@docusaurus/theme-mermaid": "^3.8.1",
    "@easyops-cn/docusaurus-search-local": "^0.49.2",
    "@mdx-js/react": "^3.1.0",
    "clsx": "^2.1.1",
    "prism-react-renderer": "^2.4.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.8.1",
    "@docusaurus/tsconfig": "^3.8.1",
    "@docusaurus/types": "^3.8.1",
    "typescript": "^5.9.3"
  }
}
```

Expected: `npm --prefix prototypes/docusaurus install` can install the site.

- [ ] **Step 4: Add sync script**

Create `scripts/sync-docs.mjs` that:

```text
1. Uses E2E_ON_RAILS_REPO if set, otherwise ../cypress-playwright-on-rails when present.
2. Falls back to cloning E2E_ON_RAILS_REPO_URL or https://github.com/shakacode/cypress-playwright-on-rails.git at E2E_ON_RAILS_REF or master.
3. Copies source docs to content/upstream/docs.
4. Copies README.md to content/upstream/README.md.
5. Copies docs/sidebars.ts to content/upstream/sidebars.ts.
6. Copies docs/assets/brand into content/upstream/static/img/brand when present.
```

Expected: `npm run sync:docs` populates `content/upstream/` from the local or remote gem repo.

- [ ] **Step 5: Add prepare script**

Create `scripts/prepare-docs.mjs` that:

```text
1. Removes prototypes/docusaurus/docs.
2. Copies content/upstream/docs into prototypes/docusaurus/docs.
3. Copies content/upstream/sidebars.ts into prototypes/docusaurus/sidebars.ts.
4. Copies content/upstream/static/img/brand into prototypes/docusaurus/static/img/brand.
5. Ensures prototypes/docusaurus/static/img/icon-tile.svg, favicon.ico, and social-card.png exist from supplied assets.
```

Expected: the Docusaurus app always builds from freshly synced source docs.

- [ ] **Step 6: Add audit script**

Create `scripts/audit-docs.mjs` that fails when:

```text
1. prototypes/docusaurus/docs/introduction.md is missing.
2. prototypes/docusaurus/sidebars.ts is missing.
3. prototypes/docusaurus/static/img/social-card.png is missing.
4. docs pages referenced in sidebars.ts are missing under prototypes/docusaurus/docs.
```

Expected: broken sync or missing sidebar entries fail before site build.

- [ ] **Step 7: Add Docusaurus config**

Create `prototypes/docusaurus/docusaurus.config.ts` with:

```ts
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'E2E on Rails',
  tagline: 'The Rails test bridge for Cypress and Playwright.',
  favicon: 'img/favicon.ico',
  url: 'https://e2eonrails.com',
  baseUrl: '/',
  organizationName: 'shakacode',
  projectName: 'e2eonrails-com',
  onBrokenLinks: 'warn',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: ['@easyops-cn/docusaurus-search-local', '@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: ({docPath}) =>
            `https://github.com/shakacode/cypress-playwright-on-rails/tree/master/docs/${docPath}`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'E2E on Rails',
      logo: {
        alt: 'E2E on Rails Logo',
        src: 'img/icon-tile.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs'},
        {href: 'https://github.com/shakacode/cypress-playwright-on-rails', label: 'GitHub', position: 'right'},
        {href: 'https://rubygems.org/gems/cypress-on-rails', label: 'RubyGems', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'Cypress', to: '/docs/cypress'},
            {label: 'Playwright', to: '/docs/playwright'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'GitHub', href: 'https://github.com/shakacode/cypress-playwright-on-rails'},
            {label: 'RubyGems', href: 'https://rubygems.org/gems/cypress-on-rails'},
            {label: 'ShakaStack', href: 'https://shakastack.com'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} ShakaCode.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

Expected: Docusaurus points edits back to the gem repo docs.

- [ ] **Step 8: Add site workflow**

Create `.github/workflows/site-build-deploy.yml`:

```yaml
name: Site Build and Deploy

on:
  pull_request:
  push:
    branches: [main]
  repository_dispatch:
    types: [docs-updated]
  workflow_dispatch:

permissions:
  contents: read
  pull-requests: write

concurrency:
  group: site-build-deploy-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Setup Node
        uses: actions/setup-node@v5
        with:
          node-version: 24

      - name: Sync docs
        run: npm run sync:docs
        env:
          E2E_ON_RAILS_REPO_URL: https://github.com/shakacode/cypress-playwright-on-rails.git
          E2E_ON_RAILS_REF: master

      - name: Prepare docs
        run: npm run prepare:docs

      - name: Audit docs
        run: npm run audit:docs

      - name: Install site dependencies
        run: npm --prefix prototypes/docusaurus install

      - name: Build site
        run: npm run build

      - name: Upload built site
        uses: actions/upload-artifact@v4
        with:
          name: docusaurus-build
          path: prototypes/docusaurus/build
          if-no-files-found: error
          retention-days: 1

  deploy:
    if: (github.event_name == 'push' && github.ref == 'refs/heads/main') || github.event_name == 'repository_dispatch' || github.event_name == 'workflow_dispatch' || (github.event_name == 'pull_request' && github.event.pull_request.head.repo.fork == false)
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: pages-deploy
      url: ${{ steps.deploy.outputs.deployment_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Setup Node
        uses: actions/setup-node@v5
        with:
          node-version: 24

      - name: Download built site
        uses: actions/download-artifact@v4
        with:
          name: docusaurus-build
          path: prototypes/docusaurus/build

      - name: Determine deploy branch
        id: deploy_branch
        run: |
          if [ "${{ github.event_name }}" = "pull_request" ]; then
            echo "branch=pr-${{ github.event.pull_request.number }}" >> "$GITHUB_OUTPUT"
          elif [ "${{ github.event_name }}" = "workflow_dispatch" ]; then
            echo "branch=${{ github.ref_name }}" >> "$GITHUB_OUTPUT"
          else
            echo "branch=main" >> "$GITHUB_OUTPUT"
          fi

      - name: Deploy to Cloudflare Pages
        id: deploy
        run: |
          set -euo pipefail
          npx wrangler pages deploy prototypes/docusaurus/build \
            --project-name "${CLOUDFLARE_PAGES_PROJECT:-e2eonrails-com}" \
            --branch "${{ steps.deploy_branch.outputs.branch }}" | tee /tmp/wrangler-pages-deploy.log

          DEPLOYMENT_URL="$(grep -Eo 'https://[^ ]+\.pages\.dev' /tmp/wrangler-pages-deploy.log | head -n 1 || true)"
          if [ -z "$DEPLOYMENT_URL" ]; then
            DEPLOYMENT_URL="https://e2eonrails.com"
          fi

          echo "deployment_url=$DEPLOYMENT_URL" >> "$GITHUB_OUTPUT"
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          CLOUDFLARE_PAGES_PROJECT: ${{ vars.CLOUDFLARE_PAGES_PROJECT }}
```

Expected: docs-site rebuilds on PR, push to `main`, manual dispatch, and gem repo repository dispatch.

- [ ] **Step 9: Install, build, and commit docs site**

Run:

```bash
npm install
npm --prefix prototypes/docusaurus install
E2E_ON_RAILS_REPO=<workspace>/cypress-playwright-on-rails npm run build:full
git add .
git commit -m "Bootstrap E2E on Rails docs site"
git push -u origin main
```

Expected: initial approved bootstrap commit is pushed to `main`.

## Task 5: GitHub Metadata, PRs, And Verification

**Files:**
- Modify: GitHub repository metadata.

- [ ] **Step 1: Update gem repo metadata**

Run:

```bash
gh repo edit shakacode/cypress-playwright-on-rails \
  --homepage https://e2eonrails.com \
  --add-topic e2e \
  --add-topic end-to-end-testing \
  --add-topic rails \
  --add-topic cypress \
  --add-topic playwright
```

Expected: repo homepage is `https://e2eonrails.com` and topics include the E2E/Rails keywords GitHub accepts.

- [ ] **Step 2: Verify sites in browsers**

Run ShakaStack:

```bash
pnpm dev --host 127.0.0.1
```

Run docs site:

```bash
cd <workspace>/e2eonrails-com
npm run dev -- --host 127.0.0.1
```

Use Playwright or the browser tool to capture desktop and mobile screenshots for:

```text
http://127.0.0.1:4321
http://127.0.0.1:3000
```

Expected: ShakaStack shows five ordered layers; E2E docs site shows synced docs navigation and brand assets.

- [ ] **Step 3: Push ShakaStack PR**

Run:

```bash
cd <workspace>/shakastack-com
git status --short
git push -u origin jg-codex/add-e2e-on-rails-layer
gh pr create --draft --title "Add E2E on Rails to ShakaStack" --body "Adds E2E on Rails as the Test layer, moves Deploy last, and documents the docs-site publication workflow."
```

Expected: draft PR exists for `shakacode/shakastack-com`.

- [ ] **Step 4: Push gem repo PR**

Run:

```bash
cd <workspace>/cypress-playwright-on-rails
git status --short
git push -u origin jg-codex/e2e-docs-site-wiring
gh pr create --draft --title "Wire E2E on Rails docs site" --body "Adds the docs sidebar, docs publication dispatch, public docs pages, and README link for e2eonrails.com."
```

Expected: draft PR exists for `shakacode/cypress-playwright-on-rails`.

- [ ] **Step 5: Summarize required secrets**

Report these required external settings:

```text
Gem repo secrets:
- DOCS_DISPATCH_APP_ID
- DOCS_DISPATCH_APP_KEY

Docs repo secrets/vars:
- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- CLOUDFLARE_PAGES_PROJECT (optional var, defaults to e2eonrails-com)
```

Expected: maintainer knows what remains outside code.
