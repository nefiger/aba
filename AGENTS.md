# ABA Demo Workspace Guide

This repo is the shared prototype workspace for the ABA founding-members meeting on Thursday, June 25, 2026.

## Immediate Goal

Build a clear demo package with `docs/site/index.html` as the public-facing umbrella surface, supported by focused workspaces and internal demo material where needed.

The presentation currently needs to cover:

- registration tracker:
  from intake and data capture through public dashboard, member dashboard, and admin views
- membership flow:
  membership types, signup journey, and captured data
- biologicals-first database:
  reposition the existing highly hazardous pesticides database toward biologicals first
- main ABA site:
  a walkthrough or prototype that ties the other artifacts together

## Current Folder Layout

- `docs/index.html`
  internal demo material; not the public homepage
- `docs/site/`
  main ABA site / umbrella story / public homepage
- `registration-tracker/`
  Lyle's workspace at the repo root; do not reorganize it unless explicitly asked
- `docs/membership-flow/`
  membership flow workspace
- `docs/database/`
  biologicals-first database workspace
- `docs/flow-intelligence/`
  supporting explainer asset for the broader systems story
- `docs/requirements/`
  working requirements and specs

## Read This First

Before making substantial changes, read these files first:

- `README.md`
  current repo model, publishing setup, and which surfaces are public vs internal
- `HANDOVER.md`
  current status, open work, and key files
- `docs/requirements/african-biologicals-alliance-html-spec.md`
  broader website structure and messaging spec

Read these when working specifically on the homepage or site copy:

- `docs/requirements/aba-homepage-strategy-and-copy-notes.md`
  current homepage strategy, audience split, copy rules, and guardrails

Read these when working on related surfaces:

- `docs/requirements/biologicals-explorer-data-expansion-ux-notes.md`
  recent explorer changes and copy cleanup context
- `docs/requirements/registration-tracker-site-integration-implementation-plan.md`
  registration-tracker integration context and homepage boundary decisions

## Team Split

- Lyle is working on the registration tracker in `registration-tracker/`.
- Anna is working on the membership flow and captured-data shape.
- The repo hub should make it easy to demo each area separately while still feeling like one coherent ABA presentation.

## Working Rules

- Treat this repo as a demo suite, not a production app.
- Optimize for clarity, demo flow, and believable product logic over backend completeness.
- Keep each major artifact in its own folder and avoid flattening new pages back into `docs/`.
- Treat `docs/site/index.html` as the real public homepage.
- Treat `docs/index.html` as internal working/demo material unless explicitly told otherwise.
- Preserve the core ABA framing:
  Africa-wide participation, South Africa currently active, registration tracker as a member-value and advocacy engine.
- If you add new pages for a workspace, keep relative links stable from that folder back to the hub.

## Workspace Notes

### Membership flow

- Focus on the types of members ABA wants to attract.
- Make the captured data feel intentional and useful downstream.
- Keep the flow legible enough to demo live without a lot of explanation.

### Database

- Reframe the database as biologicals first.
- It can still inherit from existing hazardous-pesticides structure, but the presentation should lead with biologicals, registration readiness, intelligence, and member usefulness.

### Main site

- This is the umbrella narrative surface.
- It should connect the membership, tracker, and database stories into one believable ABA proposition.
- Public-facing copy should sound public, not like repo narration, prototype explanation, or internal meeting guidance.
