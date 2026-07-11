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
export const RSC_VS_NEXTJS_DOC =
  "https://reactonrails.com/docs/pro/react-server-components/nextjs-comparison";
export const MIGRATE_FROM_NEXTJS_DOC =
  "https://reactonrails.com/docs/migrating/migrating-from-nextjs";
export const TANSTACK_ROUTER_DOC =
  "https://reactonrails.com/docs/building-features/tanstack-router";
export const TANSTACK_QUERY_DOC =
  "https://reactonrails.com/docs/building-features/tanstack-query";
export const BLOG_POST =
  "https://shakacode.com/blog/tanstack-with-react-on-rails";

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
   "Leaving Next.js? The fork in the road" - positioning content.
   Accuracy guardrails: RSC is demoable/maturing (RC), NOT GA. We never claim
   the Query-backed data is server-rendered/SEO-crawlable - only the shell +
   router state are SSR'd; data is fast client fetch. See README before edits.
   ============================================================ */

export interface Road {
  kind: "leave" | "stay";
  label: string;
  title: string;
  body: string;
  points: string[];
}

/** The Next.js exodus is a tailwind - the critique went mainstream. */
export const exodusEvidence =
  "Teams are leaving Next.js. Lovable made TanStack Start its default for new projects this year; Inngest reported cutting local dev load times by roughly 83% after migrating off Next.js. The reasons they give - complexity, slow local dev, fighting the network - are exactly the critique ShakaCode has made for years.";

export const roads: Road[] = [
  {
    kind: "leave",
    label: "Road A - another JS framework",
    title: "Swap Next.js for TanStack Start",
    body: "A new vendor, but the same all-JavaScript backend. TanStack Start's server functions put your data access, auth, and business logic into TypeScript on a Node server.",
    points: [
      "New framework, same architecture: JavaScript owns the server",
      "Business logic migrates into TypeScript server functions",
      "Fine for greenfield, one-language teams - but it isn't Rails",
    ],
  },
  {
    kind: "stay",
    label: "Road B - ShakaStack",
    title: "Keep a real backend",
    body: "Rails owns data, business logic, and auth. React renders the view. TanStack Query owns the client. You leave Next.js without giving up your backend - and nobody else is evangelizing this path.",
    points: [
      "Rails: ActiveRecord, validations, jobs, mailers, sessions, CSRF",
      "React on Rails Pro: SSR, streaming, and React Server Components",
      "TanStack Query, Router & Table on the client, against a Rails JSON API",
    ],
  },
];

/** "TanStack" is two different things - keep them separate. */
export const tanstackSplit: { kind: "embrace" | "substitute"; title: string; body: string }[] = [
  {
    kind: "embrace",
    title: "Embrace - TanStack Query, Router & Table",
    body: "Backend-agnostic client libraries. TanStack Query is the single best companion to a Rails JSON API: caching, mutations, and URL-synced state on the client.",
  },
  {
    kind: "substitute",
    title: "Substitute - TanStack Start",
    body: "The full-stack framework. Its server functions pull business logic into TypeScript - the one thing you don't want if you have, or want, Rails.",
  },
];

/** Official starter - the proof. Copy reflects what it genuinely demonstrates. */
export const starter = {
  title: "The official starter",
  blurb:
    "A deployable Rails 8 + React on Rails Pro app with TanStack Router, Query & Table, shadcn/ui, and an RSC showcase. Rails owns data, logic, and auth and exposes explicit JSON; React on Rails Pro server-renders the TanStack shell and hydrates router state; TanStack Query owns the client data lifecycle - CSRF-aware fetch, URL-synced query keys, mutations and invalidation.",
  guardrail:
    "Its AGENTS.md encodes the thesis as an engineering guardrail: “do not add TanStack Start, Vite, or file-based routing.”",
  stack: ["Rails 8", "React on Rails Pro", "TanStack Router", "TanStack Query", "TanStack Table", "shadcn/ui", "RSC showcase"],
};

export interface Faq {
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    q: "Isn't TanStack Start the future?",
    a: "TanStack Query, Router, and Table are excellent - we use them every day. TanStack Start, the full-stack framework, is a different decision: it puts your business logic in TypeScript on a Node server. If you have Rails, that's the part you don't want to give up.",
  },
  {
    q: "Is RSC on Rails actually ready?",
    a: "React Server Components in React on Rails Pro are demoable and maturing - running today in the starter and demos on a release-candidate build, not yet GA. You get the “server code next to your component” experience now, with Rails models as the server source; we're upfront that the spec is still stabilizing.",
  },
  {
    q: "When is Next.js (or TanStack Start) the right call?",
    a: "Greenfield, no Rails, a one-language team optimizing raw velocity, and little server-side business logic? A JavaScript meta-framework is a fine choice - and we'll tell you so. ShakaStack is for teams with Rails, or who want it, and real business logic.",
  },
  {
    q: "Do I have to adopt all of TanStack?",
    a: "No. Add TanStack Query against your Rails JSON API and stop there if you like. Router and Table are there when you want type-safe routing and URL-owned table state. You never need TanStack Start.",
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
    body: "Drop React on Rails Pro and TanStack Router, Query & Table into the app you already have. Keep your routes, conventions, and team - no rewrite, no separate frontend deploy.",
    points: [
      "Adopt it page by page, alongside your existing Rails views",
      "Great performance out of the box - SSR, hydration, streaming",
      "Your Rails API stays the single source of truth",
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
   Performance parity - React 19.2 / Next.js-class features, in Rails.
   Differentiator: only React on Rails Pro pairs the React server-performance
   features with a real Rails backend. Inertia renders on the client (no
   streaming SSR / RSC / selective hydration). RSC stays annotated as RC.
   ============================================================ */

export type CmpCell = "yes" | "no" | "rc";
export interface CmpRow {
  feature: string;
  /** cells align 1:1 with perfColumns. */
  cells: CmpCell[];
}

export const perfLead = {
  title: "Next.js-class React performance - only in Rails.",
  body: "React on Rails Pro fully supports React 19.2 and brings the performance features Next.js is known for - streaming SSR, React Server Components, and selective hydration - to a real Rails backend, with your Rails models as the server source. Inertia and other Rails + React adapters do plain server rendering at best, with no streaming SSR, no React Server Components, and no selective hydration.",
};

export const perfColumns = ["React on Rails Pro", "Inertia", "Next.js"];

export const perfMatrix: CmpRow[] = [
  { feature: "Streaming SSR", cells: ["yes", "no", "yes"] },
  { feature: "React Server Components", cells: ["rc", "no", "yes"] },
  { feature: "Selective hydration", cells: ["yes", "no", "yes"] },
  { feature: "Real Rails backend", cells: ["yes", "yes", "no"] },
];

export const perfNote =
  "React Server Components in React on Rails Pro are demoable & maturing (RC), not yet GA - React 19.2 itself is fully supported.";
