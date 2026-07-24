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
  liveLabel?: string;
  unavailableLabel?: string;
  primaryLinkKind?: "demo" | "artifact";
  source: string;
  thumbnail?: {
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
export const POPMENU_PERFORMANCE_SOURCE =
  "https://www.shakacode.com/services/performance-optimization/";
export const ROR_17_RELEASE =
  "https://github.com/shakacode/react_on_rails/releases/tag/v17.0.0";
export const ROR_RUBYGEMS = "https://rubygems.org/gems/react_on_rails";
export const SHAKAPACKER_RUBYGEMS = "https://rubygems.org/gems/shakapacker";
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
export const SHAKAPERF_LICENSE = "https://shakaperf.com/license";
export const SHAKAPERF_METHOD = "https://shakaperf.com/docs/";

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
export const SHADCN_UI = "https://ui.shadcn.com/";
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
    tagline: "Bring React 19 and modern rendering to Rails.",
    blurb:
      "Start with the MIT-licensed React on Rails 17.0.0 core for components, server rendering, and hydration. When you need more, React on Rails Pro adds supported GA React Server Components, streaming SSR, fragment caching, and a dedicated Node renderer without forcing Rails behind a separate frontend app.",
    benefits: [
      ["Keep Rails in charge", "Render React from Rails views and controllers while keeping your routes, domain logic, and conventions."],
      ["Start open source", "Use the MIT-licensed core for Rails + React integration, hydration, and server rendering."],
      ["Upgrade when it earns its place", "Add Pro for GA RSC, streaming, caching, and advanced rendering when your application needs them."],
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
      ["v17.0.0", ROR_17_RELEASE],
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
    tagline: "Prove whether a change actually made your app faster.",
    blurb:
      "Compare branch and trunk side by side, cancel shared noise with paired measurements, and keep only changes that produce a measurable improvement. Use one Playwright definition for performance, visual, accessibility, SEO, and bundle checks.",
    benefits: [
      ["Paired measurements", "Control and experiment run together so shared CPU noise can cancel inside each measured pair."],
      ["One test, multiple gates", "Reuse one Playwright definition for performance, visual, accessibility, SEO, and bundle checks."],
      ["Docker-based", "Measure any web stack that can run as a production Docker image with an exposed port."],
    ],
    license: {
      label: "Source available",
      href: SHAKAPERF_LICENSE,
    },
    install: "yarn add shaka-perf shaka-bundle-size",
    altInstall: "yarn shaka-perf compare",
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
      alt: "Hacker News on Rails demo showing a ranked list of news stories",
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
    blurb: "The original full-app React on Rails tutorial, using Shakapacker with server rendering.",
    stack: ["React on Rails", "Shakapacker", "SSR"],
    live: null,
    unavailableLabel: "Demo unavailable",
    source: "https://github.com/shakacode/react-webpack-rails-tutorial",
    thumbnail: {
      src: "/examples/legacy-tutorial.webp",
      alt: "React on Rails tutorial demo showing routes for Rails, React, and server rendering",
    },
  },
];

export const problems: Benefit[] = [
  ["Agents need a map", "Blank-prompt code drifts. Conventions, typed boundaries, working examples, and repository instructions keep ambitious changes coherent."],
  ["Modern React crosses layers", "RSC, streaming, data loading, browser tests, bundles, and deploys all have to work as one Rails application."],
  ["Faster needs proof", "A change is not an improvement until repeatable measurements show it is faster and visual checks show it is still correct."],
];

export const guideStats: EvidenceStat[] = [
  {
    value: "12.5M+",
    label: "React on Rails gem downloads",
    sourceLabel: "RubyGems",
    sourceUrl: ROR_RUBYGEMS,
  },
  {
    value: "11.4M+",
    label: "Shakapacker gem downloads",
    sourceLabel: "RubyGems",
    sourceUrl: SHAKAPACKER_RUBYGEMS,
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
  title: "Clone a working Rails + React app",
  blurb:
    "The public Rails 8 starter combines React on Rails Pro, React 19, supported GA React Server Components, streaming, and TanStack Router, Query & Table. Its shared shadcn/ui layer provides buttons, dialogs, inputs, tables, tabs, and toasts styled with Tailwind CSS.",
  guardrail:
    "Rails stays the application boundary. Add the React and TanStack pieces you need without adding a second server tier.",
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
      "Use SSR, hydration, and streaming where they earn their place",
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
  title: "Give agents a real codebase and a measurable goal.",
  body: "Rails conventions, typed contracts, and the starter's AGENTS.md let agents build ambitious features without starting from a blank prompt. Humans still own product decisions and review.",
  proof: "ShakaPerf closes the loop: agents iterate, and only changes verified faster and visually stable are kept.",
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
  "React on Rails Pro requires its Node renderer for streaming and RSC. React on Rails Pro 17.0.0 supports push, pull, and mixed async-props modes.";
