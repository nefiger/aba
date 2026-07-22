# ABA Soft-Launch Reference Prototype

Status: first integrated reference build in progress

This folder contains the new ABA soft-launch reference prototype built from the approved product and design brief.

It will not import, overwrite, redirect, or relink any existing ABA website. It will begin with a fresh shell and its own assets, styles, components, routes, and state model.

## Run locally

From this folder:

```sh
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.

## Routes

- `index.html` — public home and umbrella proposition
- `about.html` — problem, proposition, pillars, and geographic truth
- `membership.html` — full membership value proposition and controlled-release status
- `membership-interest.html` — light public interest and communication permission
- `technical-network.html` — expert-community recruitment and reviewed application
- `registration-tracker.html` — public tracker orientation and Lyle handoff boundary
- `member-intake.html` — the single member application used for founding members, later cohorts and eventual public applications
- `privacy.html` — public data-use summary and production policy dependency

Forms demonstrate validation and confirmation states locally. They do not persist data.

## Required preflight

From the repository root, run:

```sh
node soft-launch/scripts/public-site-preflight.mjs
```

With the repository being served locally, open:

```text
http://127.0.0.1:8766/soft-launch/qa/public-site-render-check.html
```

The static check blocks banned copy patterns and forced heading breaks. The browser check measures horizontal overflow and responsive heading wrapping across all public routes. Complete-page visual review remains mandatory under `../PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`.

## Authority

Once approved, this prototype governs:

- page composition and visual hierarchy;
- content hierarchy and copy treatment;
- navigation and interaction patterns;
- responsive behaviour;
- form presentation and progressive disclosure;
- validation, feedback, success, empty, and error-state presentation;
- visual tokens and component behaviour.

The PRD governs persistence, data semantics, state transitions, access, consent, operations, and integrations. If the PRD and prototype appear to disagree, resolve the conflict in the decision register before implementing production code.

The public voice and design guardrail contract governs copy quality, typography, composition, page differentiation, and the checks required before a route is considered ready for review.
