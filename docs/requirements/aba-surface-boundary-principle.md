# ABA Surface Boundary Principle

Last updated: 2026-06-30

Purpose:
- define the structural rule for where new ABA prototype surfaces should live
- keep the public site clear while still allowing deeper operational demos
- avoid mixing public narrative pages with internal workflow sections

## Principle

`docs/site/` is the public ABA site and umbrella narrative surface.

It should not absorb every deeper operational prototype page as if those pages were ordinary site sections.

When a prototype becomes:
- internally operational
- workflow-heavy
- role-specific
- better understood as a separate product or admin section

it should move into its own workspace folder and be launched from the root ABA directory (`/aba/`) rather than from inside the public site navigation.

## Current application

This principle now applies to:
- `docs/site/`
  public narrative and public route pages
- `docs/membership-ops/`
  internal membership operations prototype
- `docs/membership-flow/`
  membership route and application prototype
- `docs/database/`
  biologicals-first knowledge workspace
- `registration-tracker/`
  separate tracker workspace

## Practical rule

Ask this question before adding a new page:

Is this a public ABA page, or is it a separate operational section?

If it is a public ABA page:
- keep it under `docs/site/`

If it is a separate operational section:
- give it its own folder
- launch it from `index.html` at the repo root
- keep it out of the public-site primary navigation

## Why this matters

This keeps:
- the public site believable and public-facing
- internal or operator-heavy flows from diluting the ABA site story
- the root launcher useful as the place where distinct prototype sections begin
- repo structure aligned with how the demo is actually presented
