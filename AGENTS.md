# AGENTS.md

## Agent Workflow Configuration

Portable shared skills resolve this repo's commands and policy through:
- **Commands** — run `.agents/bin/<name>` (`setup`, `validate`, `test`, ...); see `.agents/bin/README.md`. A missing script means that capability is n/a here.
- **Policy / config** — `.agents/agent-workflow.yml`.

## Homepage Marketing Guardrails

Treat the homepage as one evaluation journey, not a collection of locally
accurate sections.

- The Rails + React builder is the hero; ShakaCode is the guide. Lead with what
  a developer can build and verify, not the company, license taxonomy, package
  records, or repository implementation details.
- Favor ambitious AI-assisted building with explicit guardrails. Do not promise
  that every agent-generated change improves performance. Say that agents
  iterate and the workflow keeps only changes ShakaPerf verifies are faster and
  visually stable.
- Let evaluators inspect and build before asking them to buy or talk to sales.
  Starter code, live demos, project source, and docs are primary actions.
  React on Rails Pro and consultation are contextual next steps.
- CTA labels must name the action and destination. Use wording such as “Clone
  the starter” or “View the live demo,” not ambiguous labels such as “Try the
  starter.”
- Evidence belongs on the homepage only when it increases trust and helps the
  next decision. Do not surface negative vanity metrics, zero counts, raw
  registry records, or legal distinctions merely because they are accurate.
  Keep detailed claim evidence behind canonical product or source links.
- Before publishing a homepage change, review the rendered page from top to
  bottom. Apply a five-second comprehension test, confirm one dominant action
  per stage, and compare word count, link count, heading count, and page height
  with the current production page. Local claim accuracy does not compensate
  for a confusing overall story.
