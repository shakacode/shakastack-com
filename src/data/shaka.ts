/**
 * ShakaStack content model.
 *
 * Public claims in this file are deliberately paired with primary-source links.
 * Keep the site static: update the curated wording and its source together rather
 * than fetching volatile marketing or repository data at runtime.
 */

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

/** [title, description] */
export type Benefit = [title: string, description: string];
/** [label, href] */
export type ProjectLink = [label: string, href: string];

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
  license: {
    label: string;
    href: string;
  };
  install: string;
  altInstall?: string;
  links: ProjectLink[];
}

export interface Example {
  name: string;
  tag: string;
  projects: ProjectId[];
  blurb: string;
  stack: string[];
  live: string | null;
  source: string;
  thumbnail: {
    src: string;
    alt: string;
  };
}

export interface ShakaContent {
  projects: Project[];
  examples: Example[];
  problems: Benefit[];
  guideStats: EvidenceStat[];
}

export interface EvidenceStat {
  value: string;
  label: string;
  sourceLabel: string;
  sourceUrl: string;
}

/** Primary CTA - HubSpot scheduling link, used across the page. */
export const BOOK_A_CALL =
  "https://meetings.hubspot.com/justingordon/30-minute-consultation";
export const SHAKACODE_URL = "https://shakacode.com";
export const SHAKACODE_CONTACT = "https://shakacode.com/contact/";
export const GITHUB_ORG = "https://github.com/shakacode";
export const GITHUB_SPONSOR = "https://github.com/sponsors/shakacode";
export const ALL_DEMOS = "https://reactonrails.com/examples";
export const SHAKACODE_ABOUT = "https://shakacode.com/about/";
export const POPMENU_PERFORMANCE_SOURCE =
  "https://www.shakacode.com/services/performance-optimization/";
export const HVMN_PERFORMANCE_SOURCE =
  "https://www.shakacode.com/blog/hvmns-90-reduction-in-server-response-time-from-react-on-rails-pro/";
export const ROR_LICENSE =
  "https://github.com/shakacode/react_on_rails/blob/main/LICENSE.md";
export const ROR_PRO_LICENSE =
  "https://github.com/shakacode/react_on_rails/blob/main/REACT-ON-RAILS-PRO-LICENSE.md";
export const SHAKAPACKER_LICENSE =
  "https://github.com/shakacode/shakapacker/blob/main/MIT-LICENSE";
export const E2E_ON_RAILS_LICENSE =
  "https://github.com/shakacode/cypress-playwright-on-rails/blob/master/LICENSE";
export const CONTROL_PLANE_FLOW_LICENSE =
  "https://github.com/shakacode/control-plane-flow/blob/main/LICENSE";
export const ROR_OSS_VS_PRO =
  "https://reactonrails.com/docs/getting-started/oss-vs-pro/";
export const ROR_PRO = "https://reactonrails.com/pro/";
export const ROR_SUPPORT =
  "https://reactonrails.com/docs/deployment/troubleshooting/";
export const SHAKAPERF_LICENSE =
  "https://github.com/shakacode/shakaperf/blob/main/LICENSE.md";
export const SHAKAPERF_PRICING = "https://shakaperf.com/pricing";
export const SHAKAPERF_METHOD =
  "https://github.com/shakacode/shakaperf/blob/main/packages/shaka-perf/used_statistics.md";

export const popmenuEvidence = {
  title: "Measured at Popmenu",
  context: "One documented optimization engagement, not a universal benchmark.",
  sourceLabel: "Popmenu performance evidence",
  sourceUrl: POPMENU_PERFORMANCE_SOURCE,
  metrics: [
    ["80%", "LCP improvement · 23s to 4.5s"],
    ["90%", "Blocking-time reduction · 2,000ms to 200ms"],
    ["9×", "Smaller initial downloads · 9MB to 1MB"],
  ] satisfies Benefit[],
};

/* React on Rails Pro + TanStack positioning - official starter & docs (all verified live). */
export const STARTER_REPO =
  "https://github.com/shakacode/react-on-rails-starter-tanstack";
export const STARTER_DEMO = "https://starter.reactonrails.com";
export const NEXTJS_RAILS_COMPARISON_DOC =
  "https://reactonrails.com/docs/getting-started/nextjs-with-separate-rails-backend";
export const MIGRATE_FROM_NEXTJS_DOC =
  "https://reactonrails.com/docs/migrating/migrating-from-nextjs";
export const TANSTACK_ROUTER_DOC =
  "https://reactonrails.com/docs/building-features/tanstack-router";
export const TANSTACK_QUERY_DOC =
  "https://reactonrails.com/docs/building-features/tanstack-query";

export const projects: Project[] = [
  {
    id: "ror",
    stage: "Build",
    phase: "Build",
    name: "React on Rails",
    domain: "reactonrails.com",
    url: "https://reactonrails.com",
    accent: "ror",
    icon: "build",
    tagline: "Open-source Rails + React integration, with an optional Pro rendering tier.",
    blurb:
      "Use the MIT-licensed core to mount React components from Rails views and run server-side rendering with hydration. Add commercially licensed React on Rails Pro for React Server Components, streaming SSR, fragment caching, and a dedicated Node renderer.",
    benefits: [
      ["Rails-first React", "Render components from views & controllers. Keep Rails routes, conventions, and your team."],
      ["MIT-licensed core", "Use Rails + React integration, hydration, and ExecJS server rendering under the open-source license."],
      ["Explicit Pro path", "Review the commercial license before using Pro for advanced rendering and maintainer support."],
    ],
    license: {
      label: "MIT core · Pro EULA",
      href: ROR_LICENSE,
    },
    install: "bundle exec rails generate react_on_rails:install",
    altInstall: "npx create-react-on-rails-app@latest my-app",
    links: [
      ["Website", "https://reactonrails.com"],
      ["Docs", "https://reactonrails.com/docs/"],
      ["GitHub", "https://github.com/shakacode/react_on_rails"],
      ["OSS vs Pro", ROR_OSS_VS_PRO],
      ["Pro license", ROR_PRO_LICENSE],
    ],
  },
  {
    id: "shakapacker",
    stage: "Bundle",
    phase: "Build",
    name: "Shakapacker",
    domain: "shakapacker.com",
    url: "https://shakapacker.com",
    accent: "shakapacker",
    icon: "bundle",
    tagline: "Webpack, the Rails way. The maintained successor to Webpacker.",
    blurb:
      "Use webpack to bundle JavaScript and CSS with Rails conventions intact. Shakapacker picks up where rails/webpacker left off - actively maintained, modern defaults, and a smooth upgrade path.",
    benefits: [
      ["Rails-native bundling", "Asset compilation that follows Rails conventions - manifests, fingerprinting, and the asset pipeline."],
      ["Modern webpack", "Up-to-date webpack with sensible defaults so you configure less and ship more."],
      ["Easy migration", "A clear, supported path off the deprecated rails/webpacker."],
    ],
    license: {
      label: "MIT",
      href: SHAKAPACKER_LICENSE,
    },
    install: "bundle add shakapacker --strict",
    altInstall: "bin/rails shakapacker:install",
    links: [
      ["Website", "https://shakapacker.com"],
      ["Docs", "https://shakapacker.com/docs/"],
      ["GitHub", "https://github.com/shakacode/shakapacker"],
    ],
  },
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
    license: {
      label: "MIT",
      href: E2E_ON_RAILS_LICENSE,
    },
    install: 'bundle add cypress-on-rails --group "development,test"',
    altInstall: "bin/rails g cypress_on_rails:install --framework playwright",
    links: [
      ["Website", "https://e2eonrails.com"],
      ["Docs", "https://e2eonrails.com/docs"],
      ["GitHub", "https://github.com/shakacode/cypress-playwright-on-rails"],
      ["Gem", "https://rubygems.org/gems/cypress-on-rails"],
    ],
  },
  {
    id: "shakaperf",
    stage: "Prove",
    phase: "Prove",
    name: "ShakaPerf",
    domain: "shakaperf.com",
    url: "https://shakaperf.com",
    accent: "shakaperf",
    icon: "prove",
    tagline: "Source-available A/B performance testing for CI.",
    blurb:
      "Run control and experiment Docker containers side by side, sample them together, and compare performance with paired statistics. One Playwright definition can drive performance, visual, accessibility, SEO, and bundle checks.",
    benefits: [
      ["Paired measurements", "Control and experiment run together so shared CPU noise can cancel inside each measured pair."],
      ["One test, multiple gates", "Reuse one Playwright definition for performance, visual, accessibility, SEO, and bundle checks."],
      ["Docker-based", "Measure any web stack that can run as a production Docker image with an exposed port."],
    ],
    license: {
      label: "Source-available",
      href: SHAKAPERF_LICENSE,
    },
    install: "yarn add shaka-perf shaka-bundle-size",
    altInstall: "shaka-perf compare",
    links: [
      ["Website", "https://shakaperf.com"],
      ["Docs", "https://shakaperf.com/docs/"],
      ["GitHub", "https://github.com/shakacode/shakaperf"],
      ["Methodology", SHAKAPERF_METHOD],
      ["License", SHAKAPERF_LICENSE],
    ],
  },
  {
    id: "cpflow",
    stage: "Deploy",
    phase: "Deploy",
    name: "Control Plane Flow",
    domain: "controlplaneflow.com",
    url: "https://controlplaneflow.com",
    accent: "cpflow",
    icon: "deploy",
    tagline: "A Heroku-style workflow on Control Plane infrastructure.",
    blurb:
      "Control Plane Flow brings a Heroku-like developer experience - review apps, one-off tasks, releases, and scaling - to Control Plane. Its cpflow CLI moves you off Heroku without throwing away the workflow your team already knows.",
    benefits: [
      ["Heroku-like commands", "Familiar deploy, run, and scale commands plus review apps for every pull request."],
      ["Control Plane power", "Run on flexible, cost-efficient infrastructure with room to scale well past Heroku."],
      ["Migrate, don't rewrite", "Keep your release flow. Move the runtime underneath it with minimal disruption."],
    ],
    license: {
      label: "LGPL-3.0",
      href: CONTROL_PLANE_FLOW_LICENSE,
    },
    install: "gem install cpflow",
    altInstall: "cpflow setup-app -a my-app",
    links: [
      ["Website", "https://controlplaneflow.com"],
      ["Docs", "https://shakacode.com/control-plane-flow/docs/"],
      ["GitHub", "https://github.com/shakacode/control-plane-flow"],
    ],
  },
];

export const examples: Example[] = [
  {
    name: "Marketplace",
    tag: "Flagship",
    projects: ["ror"],
    blurb: "A marketplace performance demo for React on Rails Pro, React 19, and React Server Components.",
    stack: ["React on Rails Pro", "React 19", "RSC"],
    live: "https://rsc.reactonrails.com",
    source: "https://github.com/shakacode/react-on-rails-demo-marketplace-rsc",
    thumbnail: {
      src: "/examples/marketplace.webp",
      alt: "React on Rails Performance Demo landing page with the headline Make Your Rails App 2x Faster",
    },
  },
  {
    name: "Hacker News",
    tag: "Flagship",
    projects: ["ror"],
    blurb: "A Hacker News reader built on React on Rails Pro with React 19 and React Server Components.",
    stack: ["React on Rails Pro", "React 19", "RSC"],
    live: "https://hn.reactonrails.com",
    source: "https://github.com/shakacode/react-on-rails-demo-hacker-news-rsc",
    thumbnail: {
      src: "/examples/hacker-news.webp",
      alt: "Hacker Next on Rails demo showing a ranked list of news stories",
    },
  },
  {
    name: "Gumroad",
    tag: "Flagship",
    projects: ["ror"],
    blurb: "A Gumroad-style creator dashboard comparing Inertia and React on Rails Pro with React 19 and RSC.",
    stack: ["React on Rails Pro", "Inertia", "RSC"],
    live: "https://gumroad.reactonrails.com/public_product/rsc_demo",
    source: "https://github.com/shakacode/react-on-rails-demo-gumroad-rsc",
    thumbnail: {
      src: "/examples/gumroad.webp",
      alt: "Gumroad-style React Server Components demo showing the Tendon Book product page",
    },
  },
  {
    name: "TanStack Starter",
    tag: "Official",
    projects: ["ror", "shakapacker"],
    blurb: "The official Rails 8 + React on Rails Pro starter with TanStack Router, Query & Table, shadcn/ui, and an RSC showcase, with Rails remaining the application boundary.",
    stack: ["Rails 8", "React on Rails Pro", "TanStack", "RSC"],
    live: "https://starter.reactonrails.com",
    source: "https://github.com/shakacode/react-on-rails-starter-tanstack",
    thumbnail: {
      src: "/examples/tanstack-starter.webp",
      alt: "React on Rails and TanStack starter landing page describing three Rails rendering surfaces",
    },
  },
  {
    name: "Legacy Tutorial App",
    tag: "Production",
    projects: ["ror", "shakapacker"],
    blurb: "The original full-app React on Rails tutorial demo - running in production for years on Shakapacker.",
    stack: ["React on Rails", "Shakapacker", "SSR"],
    live: "https://reactrails.com",
    source: "https://github.com/shakacode/react-webpack-rails-tutorial",
    thumbnail: {
      src: "/examples/legacy-tutorial.webp",
      alt: "React on Rails tutorial demo showing routes for Rails, React, and server rendering",
    },
  },
];

export const problems: Benefit[] = [
  ["Bolting React onto Rails", "Webpacker’s deprecated, SSR is fiddly, and React 19 / RSC feel out of reach. You’re duct-taping a frontend instead of shipping features."],
  ["Pages that lost their speed", "Slow LCP and hydration drag down SEO and conversions - and you have no rigorous way to measure it or prove a fix actually worked."],
  ["The infra & config tax", "Heroku bills climb, build configs rot, and every upgrade is a gamble. The stack fights you instead of working for you."],
];

export const guideStats: EvidenceStat[] = [
  {
    value: "2011",
    label: "ShakaCode consulting since",
    sourceLabel: "ShakaCode about",
    sourceUrl: SHAKACODE_ABOUT,
  },
  {
    value: "≈90%",
    label: "Lower HVMN server-response times in one documented Pro engagement",
    sourceLabel: "HVMN case study",
    sourceUrl: HVMN_PERFORMANCE_SOURCE,
  },
];

export const shaka: ShakaContent = {
  projects,
  examples,
  problems,
  guideStats,
};

/** Helper: phase · stage label (collapses when identical), used in badges. */
export function phaseStage(p: Pick<Project, "phase" | "stage">): string {
  return p.phase === p.stage ? p.phase : `${p.phase} · ${p.stage}`;
}

/* ============================================================
   Leaving Next.js - compare the strongest versions of both architectures.
   The distinction is the application boundary for Rails-owned SSR data, not
   whether either stack can stream through Suspense.
   ============================================================ */

export interface Road {
  kind: "leave" | "stay";
  label: string;
  title: string;
  body: string;
  points: string[];
}

export const exodusEvidence =
  "If Next.js no longer fits, the important question is not simply which JavaScript framework replaces it. Decide whether the frontend should remain a separately owned application or whether Rails should own the page request and server render.";

export const roads: Road[] = [
  {
    kind: "leave",
    label: "Road A - separate frontend",
    title: "Next.js + a Rails API",
    body: "Next.js owns the web UI and server render while Rails owns business rules and persistence behind JSON or GraphQL endpoints.",
    points: [
      "Server Components can fetch Rails directly during the server render",
      "Suspense boundaries can stream Rails-backed sections independently",
      "Request context crosses an explicit API contract between applications",
    ],
  },
  {
    kind: "stay",
    label: "Road B - integrated Rails app",
    title: "React on Rails Pro",
    body: "Rails owns the browser request and streams React from the same application boundary where its policies, tenancy, caches, and queries already live.",
    points: [
      "No separate page-data API required for Rails-owned server rendering",
      "React 19 SSR, Suspense streaming, and React Server Components",
      "Incremental adoption inside existing Rails routes and views",
    ],
  },
];

/** "TanStack" is two different things - keep them separate. */
export const tanstackSplit: { kind: "embrace" | "substitute"; title: string; body: string }[] = [
  {
    kind: "embrace",
    title: "Embrace - TanStack Query, Router & Table",
    body: "Backend-agnostic client libraries for caching, mutations, routing, tables, and URL-synced state. Adopt the pieces that improve your UI.",
  },
  {
    kind: "substitute",
    title: "Substitute - TanStack Start",
    body: "A full-stack JavaScript framework whose server functions run in a Node application. Choose it when that application should own your server-side UI logic.",
  },
];

/** Official starter - the proof. Copy reflects what it genuinely demonstrates. */
export const starter = {
  title: "The official starter",
  blurb:
    "A deployable Rails 8 + React on Rails Pro app with TanStack Router, Query & Table, shadcn/ui, and an RSC showcase. It includes typed JSON contracts, CSRF-aware fetch, URL-synced query keys, mutations, invalidation, SSR, and hydration.",
  guardrail:
    "Its AGENTS.md encodes the thesis as an engineering guardrail: “do not add TanStack Start, Vite, or file-based routing.”",
  stack: ["Rails 8", "React on Rails Pro", "TanStack Router", "TanStack Query", "TanStack Table", "shadcn/ui", "RSC showcase"],
};

export interface Faq {
  q: string;
  a: string;
}

export const vsNextjsFaq: Faq[] = [
  {
    q: "Is RSC on Rails actually ready?",
    a: "Use the official starter and setup docs as your baseline. Production readiness still depends on deploying and sizing the Pro Node renderer, enabling RSC support, and validating your application's bundles, stream, and fallback behavior.",
  },
  {
    q: "When is Next.js (or TanStack Start) the right call?",
    a: "Choose Next.js when a separately deployed frontend, reusable APIs, independent team ownership, or its caching, prefetching, Partial Prerendering, and static-delivery ecosystem are product requirements. Choose TanStack Start when you want its full-stack JavaScript model rather than a Rails-owned application.",
  },
];

/* ============================================================
   Developer experience - the lead message: mix the best DX,
   stay flexible (two on-ramps), most agent-capable, plus all of Rails.
   ============================================================ */

export const AI_CONSULTING = "https://shakacode.com/services/ai-consulting";
export const AGENT_WORKFLOWS_REPO = "https://github.com/shakacode/agent-workflows";
export const STARTER_AGENTS_MD =
  "https://github.com/shakacode/react-on-rails-starter-tanstack/blob/main/AGENTS.md";

export interface OnRamp {
  kind: "add" | "start";
  icon: IconName;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
}

export const onRamps: OnRamp[] = [
  {
    kind: "add",
    icon: "layers",
    eyebrow: "Already have Rails?",
    title: "Add TanStack incrementally",
    body: "Add React on Rails Pro and the TanStack libraries you want to the app you already have. Keep your routes, conventions, and team while adopting the UI page by page.",
    points: [
      "Adopt it page by page, alongside your existing Rails views",
      "Great performance out of the box - SSR, hydration, streaming",
      "Choose Query, Router, and Table independently",
    ],
  },
  {
    kind: "start",
    icon: "spark",
    eyebrow: "Starting fresh?",
    title: "Spin up with full flexibility",
    body: "Begin a new Rails app and mix exactly what you want, per page: classic Rails views, React on Rails components, React 19 + RSC, and TanStack. Use as much or as little as you need.",
    points: [
      "Classic Rails, React components, RSC, or TanStack - your call",
      "The official starter gives you a deployable baseline on day one",
      "Scale from a sprinkle of React to a full TanStack app",
    ],
  },
];

/** Agent-capability is a DX proof point, not a separate pitch. Keep the proof
 *  grounded in the public agent-workflows repository's verifiable contents. */
export const agentCapable = {
  badge: "Agent-ready",
  title: "The most agent-capable stack",
  body: "AI agents thrive on convention. Rails' structure, explicit typed JSON contracts, and the starter's AGENTS.md guardrails give an agent a map it can't sprawl outside of - so AI-written changes stay reviewable and maintainable instead of turning into slop.",
  proof: "It doesn't stop at writing code: ShakaCode's public agent-workflows repository documents the guardrails and workflows behind this approach.",
};

export const railsGoodness: string[] = [
  "ActiveRecord",
  "Migrations",
  "Background jobs",
  "Mailers",
  "Sessions & auth",
  "CSRF protection",
  "Convention over configuration",
  "The gem ecosystem",
];

/* ============================================================
   React server-rendering comparison. Both Next.js and React on Rails Pro can
   stream Rails-backed data through Suspense; the boundary is the distinction.
   ============================================================ */

export type CmpCell = "yes" | "no";
export interface CmpRow {
  feature: string;
  /** cells align 1:1 with perfColumns. */
  cells: CmpCell[];
}

export const perfLead = {
  title: "Server-rendering capability matrix.",
};

export const perfColumns = ["React on Rails Pro", "Inertia", "Next.js"];

export const perfMatrix: CmpRow[] = [
  { feature: "Streaming SSR", cells: ["yes", "no", "yes"] },
  { feature: "React Server Components", cells: ["yes", "no", "yes"] },
  { feature: "Selective hydration", cells: ["yes", "no", "yes"] },
  { feature: "Rails SSR data without a separate app API", cells: ["yes", "yes", "no"] },
];

export const perfNote =
  "React on Rails Pro requires its Node renderer for streaming and RSC. React on Rails Pro 17.0.0+ supports push, pull, and mixed async-props modes.";
