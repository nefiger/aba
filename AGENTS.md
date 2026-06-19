# ABA Demo Workspace Guide

This repo is the shared prototype workspace for the ABA founding-members meeting on Thursday, June 25, 2026.

## Immediate Goal

Build a clear demo package that can be presented from `docs/index.html` and linked into focused workspaces.

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
  meeting hub and entry point
- `docs/site/`
  main ABA site mockup / umbrella story
- `docs/registration-tracker/`
  Lyle's workspace; do not reorganize it unless explicitly asked
- `docs/membership-flow/`
  membership flow workspace
- `docs/database/`
  biologicals-first database workspace
- `docs/flow-intelligence/`
  supporting explainer asset for the broader systems story
- `docs/requirements/`
  working requirements and specs

## Team Split

- Lyle is working on the registration tracker in `docs/registration-tracker/`.
- Anna is working on the membership flow and captured-data shape.
- The repo hub should make it easy to demo each area separately while still feeling like one coherent ABA presentation.

## Working Rules

- Treat this repo as a demo suite, not a production app.
- Optimize for clarity, demo flow, and believable product logic over backend completeness.
- Keep each major artifact in its own folder and avoid flattening new pages back into `docs/`.
- Prefer linking through `docs/index.html` so the hub remains the default starting point.
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

