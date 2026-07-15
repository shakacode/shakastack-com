/**
 * ShakaStack content model.
 *
 * NOTE: ShakaPerf copy is provisional - verify against shakaperf.com.
 * Ported from the design prototype's `window.SHAKA` object into typed constants.
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
}

export interface Stakes {
  without: string[];
  withStack: string[];
}

export interface ShakaContent {
  projects: Project[];
  examples: Example[];
  problems: Benefit[];
  guideStats: Benefit[];
  stakes: Stakes;
  logos: string[];
}

/** Primary CTA - HubSpot scheduling link, used across the page. */
export const BOOK_A_CALL =
  "https://meetings.hubspot.com/justingordon/30-minute-consultation";
export const SHAKACODE_URL = "https://shakacode.com";
export const SHAKACODE_CONTACT = "https://shakacode.com/contact/";
export const GITHUB_ORG = "https://github.com/shakacode";
export const GITHUB_SPONSOR = "https://github.com/sponsors/shakacode";
export const ALL_DEMOS = "https://reactonrails.com/examples";

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
    tagline: "Render React inside Rails - SSR, hydration, and RSC.",
    blurb:
      "Mount React components straight from Rails views and controllers. Server-side rendering, hydration, streaming, and React Server Components - without splitting your product into a separate frontend app.",
    benefits: [
      ["Rails-first React", "Render components from views & controllers. Keep Rails routes, conventions, and your team."],
      ["Production SSR", "Server rendering, hydration, and streaming paths built for mature Rails deployments."],
      ["OSS → Pro path", "Start free. Add Pro for RSC, higher SSR throughput, and guided support when you need it."],
    ],
    install: "bundle exec rails generate react_on_rails:install",
    altInstall: "npx create-react-on-rails-app@latest my-app",
    links: [
      ["Website", "https://reactonrails.com"],
      ["Docs", "https://reactonrails.com/docs/"],
      ["GitHub", "https://github.com/shakacode/react_on_rails"],
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
    tagline: "ShakaCode’s own tool for proving performance - rigorously.",
    blurb:
      "Containerize your app, run control-vs-experiment A/B tests, and let ShakaPerf prove which changes actually make pages faster - across desktop and mobile, with regressions caught automatically.",
    benefits: [
      ["Rigorous A/B testing", "Real control-vs-experiment perf testing across screen types - not flaky one-off Lighthouse runs."],
      ["Automatic regression detection", "Catches performance regressions and visual changes on your main branch before users do."],
      ["Stack agnostic", "Works with any web stack, with accessibility and SEO checks built in."],
    ],
    install: "# Bring rigorous perf testing to your app",
    altInstall: "# Get started at shakaperf.com",
    links: [
      ["Website", "https://shakaperf.com"],
      ["Docs", "https://shakaperf.com/docs/"],
      ["GitHub", "https://github.com/shakacode/shakaperf"],
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
  },
  {
    name: "Hacker News",
    tag: "Flagship",
    projects: ["ror"],
    blurb: "A Hacker News reader built on React on Rails Pro with React 19 and React Server Components.",
    stack: ["React on Rails Pro", "React 19", "RSC"],
    live: "https://hn.reactonrails.com",
    source: "https://github.com/shakacode/react-on-rails-demo-hacker-news-rsc",
  },
  {
    name: "Gumroad",
    tag: "Flagship",
    projects: ["ror"],
    blurb: "A Gumroad-style creator dashboard comparing Inertia and React on Rails Pro with React 19 and RSC.",
    stack: ["React on Rails Pro", "Inertia", "RSC"],
    live: "https://gumroad.reactonrails.com/public_product/rsc_demo",
    source: "https://github.com/shakacode/react-on-rails-demo-gumroad-rsc",
  },
  {
    name: "TanStack Starter",
    tag: "Official",
    projects: ["ror", "shakapacker"],
    blurb: "The official Rails 8 + React on Rails Pro starter with TanStack Router, Query & Table, shadcn/ui, and an RSC showcase - leave Next.js without leaving your Rails backend.",
    stack: ["Rails 8", "React on Rails Pro", "TanStack", "RSC"],
    live: "https://starter.reactonrails.com",
    source: "https://github.com/shakacode/react-on-rails-starter-tanstack",
  },
  {
    name: "Legacy Tutorial App",
    tag: "Production",
    projects: ["ror", "shakapacker"],
    blurb: "The original full-app React on Rails tutorial demo - running in production for years on Shakapacker.",
    stack: ["React on Rails", "Shakapacker", "SSR"],
    live: "https://reactrails.com",
    source: "https://github.com/shakacode/react-webpack-rails-tutorial",
  },
];

export const problems: Benefit[] = [
  ["Bolting React onto Rails", "Webpacker’s deprecated, SSR is fiddly, and React 19 / RSC feel out of reach. You’re duct-taping a frontend instead of shipping features."],
  ["Pages that lost their speed", "Slow LCP and hydration drag down SEO and conversions - and you have no rigorous way to measure it or prove a fix actually worked."],
  ["The infra & config tax", "Heroku bills climb, build configs rot, and every upgrade is a gamble. The stack fights you instead of working for you."],
];

export const guideStats: Benefit[] = [
  ["2013", "Shipping React in Rails since"],
  ["First", "Rails framework with React Server Components"],
  ["80-90%", "Faster pages for clients like HVMN & Popmenu"],
  ["Paia, HI", "Open-source maintainers - not a faceless vendor"],
];

export const stakes: Stakes = {
  without: [
    "A frontend you dread touching",
    "Guessing whether a change made things faster",
    "Rising infra bills and brittle build config",
    "Quietly falling behind on React (RSC, React 19)",
  ],
  withStack: [
    "Modern React, rendered the Rails way",
    "Performance you can prove, run after run",
    "Lower infra cost with a Heroku-style flow",
    "A stack the maintainers stand behind",
  ],
};

export const logos: string[] = [
  "Popmenu", "HVMN", "Printivity", "Simply Business", "User Interviews",
  "Jewlr", "AirRobe", "SkyVerge", "Datacenters.com", "The Information",
];

export const shaka: ShakaContent = {
  projects,
  examples,
  problems,
  guideStats,
  stakes,
  logos,
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

/** Agent-capability is a DX proof point, not a separate pitch. Copy stays within
 *  what ShakaCode publicly claims: experts pick the best AI proposals; ShakaPerf's
 *  A/B loop keeps only provably-faster changes. Verify before broadening. */
export const agentCapable = {
  badge: "Agent-ready",
  title: "The most agent-capable stack",
  body: "AI agents thrive on convention. Rails' structure, explicit typed JSON contracts, and the starter's AGENTS.md guardrails give an agent a map it can't sprawl outside of - so AI-written changes stay reviewable and maintainable instead of turning into slop.",
  proof: "It doesn't stop at writing code: ShakaCode's AI optimization loop runs proposed changes through ShakaPerf's A/B testing and keeps only the ones that are provably faster - with experts picking the best proposals.",
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
