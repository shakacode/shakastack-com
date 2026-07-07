# E2E On Rails ShakaStack Design

## Summary

ShakaStack should present five open-source layers for modern Rails + React teams:

1. Build: React on Rails
2. Bundle: Shakapacker
3. Test: Cypress Playwright on Rails
4. Prove: ShakaPerf
5. Deploy: Control Plane Flow

Deploy is the final operational step. ShakaPerf belongs before deploy because
teams should validate functional and performance behavior before shipping
through Control Plane Flow.

## Goals

- Add `shakacode/cypress-playwright-on-rails` as a first-class ShakaStack
  project.
- Use the supplied Cypress Playwright on Rails brand assets.
- Reorder the existing stack so Control Plane Flow appears after ShakaPerf.
- Bootstrap `shakacode/e2eonrails-com` as the public docs home for the test
  layer.
- Update the GitHub repo metadata and README for
  `shakacode/cypress-playwright-on-rails` to point to the docs site.

## Non-Goals

- Do not rewrite the gem itself.
- Do not migrate every historical README detail into ShakaStack.
- Do not claim the new docs site is deployed until deployment metadata exists.
- Do not push directly to `main` or `master` except for the approved initial
  bootstrap commit to the empty `e2eonrails-com` repository.

## ShakaStack Site

The Astro content model should add a new project id for Cypress Playwright on
Rails. The canonical project order becomes:

1. React on Rails
2. Shakapacker
3. Cypress Playwright on Rails
4. ShakaPerf
5. Control Plane Flow

The visible copy should update from "four projects" to "five projects" wherever
the count is user-facing. Stack language should shift from "Build -> Deploy ->
Prove" to "Build -> Test -> Prove -> Deploy" or the full five-step label when
space allows.

Cypress Playwright on Rails should be positioned as the Rails-aware end-to-end
testing layer:

- Runs Cypress or Playwright against Rails apps.
- Uses Rails scenarios, factories, and clean test data.
- Shares Rails test setup between browser tests and app state.

The project section should link to:

- Website/docs: `https://e2eonrails.com`
- GitHub: `https://github.com/shakacode/cypress-playwright-on-rails`
- Gem: `https://rubygems.org/gems/cypress-on-rails`

## Visual Assets

Use the supplied asset system from:

- `/Users/justin/Downloads/shakacode-oss-logo-system-with-cypress-playwright-on-rails/cypress-playwright-on-rails`
- `/Users/justin/Downloads/cypress-playwright-on-rails-logo-concepts/01-dual-test-windows`
- `/Users/justin/Downloads/shakacode-oss-social-cards-1200x630-with-cypress-playwright`

ShakaStack should copy only the assets it needs into `public/`, preferably under
`public/projects/cypress-playwright-on-rails/`. The project deep-dive visual
should render the actual logo/lockup instead of the generic icon placeholder.

## E2E Docs Repository

The empty `shakacode/e2eonrails-com` repo should be bootstrapped as a small
static docs site. The initial site should include:

- Home page introducing Cypress Playwright on Rails.
- Quick start for Cypress.
- Quick start for Playwright.
- Documentation links adapted from the current gem repo README and `docs/`
  folder.
- Links back to GitHub, RubyGems, ShakaStack, ShakaCode, Cypress, and
  Playwright.
- The supplied favicon, icons, lockups, and social card.

The first commit to `main` is an approved empty-repo bootstrap exception. Future
changes should use feature branches and pull requests.

## GitHub Repo Update

For `shakacode/cypress-playwright-on-rails`:

- Set homepage URL to `https://e2eonrails.com`.
- Add or retain relevant topics, including `cypress`, `playwright`, `rails`,
  `ruby-on-rails`, and `end-to-end-testing` if GitHub accepts them.
- Update README near the top with the docs-site link and new social/brand
  positioning.
- Preserve the existing README's substantive usage and support content.

## Error Handling

- If `e2eonrails-com` cannot accept the initial commit, create a local repo and
  report the exact GitHub blocker.
- If the docs domain is not configured yet, keep links as `https://e2eonrails.com`
  but state that deployment/DNS still needs to be wired outside the repo.
- If any supplied asset is missing, fall back to the matching asset in the other
  supplied folder before generating or drawing replacement art.

## Verification

ShakaStack:

- `pnpm check`
- `pnpm build`
- Browser screenshot review for desktop and mobile after starting the Astro dev
  server.

Docs repo:

- Install/build using the selected static-site tool.
- Browser screenshot review for desktop and mobile.
- Confirm asset paths resolve in the built output.

Gem repo:

- Markdown/link sanity check for README changes.
- Confirm GitHub metadata reflects the docs homepage.

## Publishing

ShakaStack changes should be committed on a `jg-codex/` feature branch, pushed,
and opened as a pull request.

The docs repo bootstrap should be committed to `main` only for the initial empty
repository setup, then follow normal PR workflow after that.

The gem repo changes should be committed on a feature branch, pushed, and opened
as a pull request.
