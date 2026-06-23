# Registration Tracker Site Integration Implementation Plan

## Purpose

Integrate the registration tracker into the ABA public demo website as a believable member-value pathway for the Thursday, June 25, 2026 founding-members meeting.

The integration should keep Jen's current public website work on `origin/main` as the base of truth, while preserving the presenter branch's tracker meeting brief and root `registration-tracker/` application screens.

## Branch and Git Safety

- Work on `codex/registration-tracker-site-integration`.
- Base the branch on `origin/main`.
- Do not work directly on local `main` or `codex/registration-tracker-presenter`.
- Do not reset, clean, or modify local `main`.
- Before merging the presenter branch, inspect:
  `git diff --name-status origin/main..codex/registration-tracker-presenter`
- Merge `codex/registration-tracker-presenter` into this integration branch only after this plan is committed.
- If a merge goes badly, abort or reset only this integration branch and retry.

## Conflict Resolution Guidance

- Prefer `origin/main` for public website typography, copy tone, navigation style, and page structure.
- Preserve presenter branch content for the tracker meeting brief and root tracker app screens.
- Adapt any new tracker integration sections to the current `origin/main` style: Public Sans, bold display headings, simple public copy, and restrained cards.
- Do not reintroduce older Source Serif styling from the presenter branch into Jen's website pages.
- Avoid broad CSS cleanup, reformatting, or shared-style rewrites.

## Planned Website Integration

- Add a subtle `Workspace` link to edited website navigation blocks.
- Create `docs/site/workspace.html` as a mock role gateway, not a real login page.
- Use the label `Workspace`, not `Login`.
- Keep admin/operator/registrar tools behind the Workspace gateway rather than exposing them as ordinary public site sections.
- Add the exact demo-data label wherever mock registration metrics appear:
  `Prototype data - illustrative only`

## Workspace Gateway Routes

- Member company workspace: `../../registration-tracker/company-dashboard/index.html`
- ABA operator review: `../../registration-tracker/admin-operator-review/index.html`
- Registrar export: `../../registration-tracker/registrar-list/index.html`
- Tracker meeting brief: `../registration-tracker/index.html`

The different route depths are intentional. Root tracker app screens live in repo-root `registration-tracker/`; the meeting brief lives in `docs/registration-tracker/`.

## Page-Level Changes

- Update `docs/site/index.html` with a compact public registration intelligence band after "Why ABA."
- Update `docs/site/about.html` with member-specific advocacy versus sector-wide advocacy and the trusted review layer.
- Update `docs/membership-flow/index.html` with member workspace and registration support value before the application form.
- Lightly update `docs/membership-flow/membership-types.html`, especially Full Membership, to mention registration support for commercial product owners.
- Update `docs/database/index.html` to bridge the Knowledge Hub to registration visibility.
- Update `docs/database/regulatory-signals.html` as the public-facing registration signal bridge.

Avoid touching `docs/site/technical-network.html`, `docs/site/updates.html`, `docs/database/product-catalogue.html`, and `docs/database/evidence-library.html` unless link consistency absolutely requires it.

## Verification Checklist

- Open locally:
  - `docs/site/index.html`
  - `docs/site/about.html`
  - `docs/site/workspace.html`
  - `docs/membership-flow/index.html`
  - `docs/membership-flow/membership-types.html`
  - `docs/database/index.html`
  - `docs/database/regulatory-signals.html`
- Verify all `Workspace` nav links resolve.
- Verify gateway links resolve:
  - Member company workspace
  - ABA operator review
  - Registrar export
  - Tracker meeting brief
- Verify public pages show only aggregate or sample intelligence.
- Verify admin/operator/registrar views are only exposed through the Workspace role gateway.
- Verify the exact mock-data label appears wherever sample metrics appear:
  `Prototype data - illustrative only`
- Check mobile and desktop layout for:
  - no horizontal overflow
  - no clipped buttons
  - clean nav wrapping
  - readable cards

## Final Review Commands

- `git status --short --branch`
- `git diff --stat origin/main`
- Manual diff inspection of edited website files.
- Confirm changes are limited to planned integration files plus this planning document.
