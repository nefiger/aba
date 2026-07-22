# ABA Soft-Launch Workspace

Status: active planning workspace
Started: 2026-07-20
Working owner: Jen with Codex
Current phase: Phase 1 consolidated; Phase 2 reference prototype in progress

## Purpose

This is the isolated workspace for defining and proving the ABA soft-launch product before it is implemented in `unpoisonsa/monorepo`.

It exists to keep three things separate:

1. the existing ABA demo and prototype websites, which remain preserved;
2. the new reference prototype, which will become the approved design and interaction authority;
3. the production implementation, which will be built later in the monorepo from the approved prototype and PRD.

Nothing in this folder is linked from an existing site. Creating this workspace does not change the current public homepage, membership prototypes, database prototype, registration tracker, or internal launcher.

## Non-negotiable boundary

The monorepo instruction will eventually be:

> Implement the approved ABA soft-launch prototype and its PRD as a new production frontend. The prototype controls the experience; the PRD controls behaviour and data. The existing monorepo ABA frontend is not a design reference and must not be patched into the approved experience.

No production cutover is allowed merely because the backend works. The implementation must pass design-fidelity, responsive, content, accessibility, workflow, and operational acceptance gates.

## Reading order

1. [`PLAN.md`](PLAN.md) — phases, owners, gates, status, and next actions
2. [`PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`](PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md) — governing public-copy, typography, composition, and delivery checks
3. [`requirements/source-authority-and-index.md`](requirements/source-authority-and-index.md) — what governs this release and what is only background
4. [`requirements/soft-launch-prd.md`](requirements/soft-launch-prd.md) — product and delivery contract
5. [`requirements/decision-register.md`](requirements/decision-register.md) — accepted decisions and genuinely open decisions
6. [`requirements/content-and-claims-matrix.md`](requirements/content-and-claims-matrix.md) — membership value, public claims, and evidence boundaries
7. [`requirements/reconciliation-matrix.md`](requirements/reconciliation-matrix.md) — classification of all 40 older requirements files
8. [`requirements/common-record-field-state-contract.md`](requirements/common-record-field-state-contract.md) — shared records, fields, states, consent, visibility, and route outcomes
9. [`design/discovery.md`](design/discovery.md) — confirmed UX discovery outcomes
10. [`design/brand-palette.md`](design/brand-palette.md) — final logo, derived greens/beiges, and brochure-aligned accents
11. [`design/ux-brief.md`](design/ux-brief.md) — approved Phase 2 experience and design contract
12. [`design/design-treatment-rollout-plan.md`](design/design-treatment-rollout-plan.md) — page families, implementation sequence, review gates, required states, and acceptance criteria for propagating the approved homepage treatment
13. [`design/remaining-pages-delivery-plan.md`](design/remaining-pages-delivery-plan.md) — active page-by-page plan for Membership interest, Technical Network, private member intake, Registration Tracker orientation, and Privacy
14. [`design/page-and-state-inventory.md`](design/page-and-state-inventory.md) — first-release routes and states to design
15. [`prototype/README.md`](prototype/README.md) — prototype routes and local preview instructions
16. [`prototype/qa-log.md`](prototype/qa-log.md) — rendered checks, fixes, and remaining G3 coverage

## Current status

- Phase 1 is complete for reference-prototype authority: the source index, PRD, decision register, claims matrix, reconciliation matrix, and common record/field/state contract agree on the launch-critical rules.
- Phase 2's UX brief and palette were approved by Jen on 2026-07-20. Design context, final logo, palette, users, journeys, constraints, page scope, Technical Network call, member-logo placeholder rules, and the absolute single-line hero-title requirement are captured.
- Home and About ABA establish the current reference direction. Membership was rebuilt again after the latest layout was rejected and remains pending review. The five remaining routes have an active, page-specific execution sequence in `design/remaining-pages-delivery-plan.md`; identity foundations are shared, but composition follows each route's job.
- The first integrated reference build now covers the public site, public membership interest, Technical Network application, tracker orientation, one canonical member application, and the privacy/data-use route. It is in G3 iteration, not yet production approval.
- Existing repository websites are untouched.

## Existing surfaces deliberately preserved

- `docs/site/`
- `docs/membership-flow/`
- `docs/membership-ops/`
- `docs/database/`
- `docs/flow-intelligence/`
- `registration-tracker/`
- `docs/index.html`
- `docs/design-system/`

These remain evidence and historical prototypes. They are not silently converted into the soft-launch build.

## Required public-site checks

Run the static copy and markup preflight from the repository root:

```sh
node soft-launch/scripts/public-site-preflight.mjs
```

Then serve the repository and open:

```text
http://127.0.0.1:8766/soft-launch/qa/public-site-render-check.html
```

A passing automated result does not replace the required full-scroll mobile and desktop composition review.
