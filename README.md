# ABA

Shared prototype workspace for the African Biologicals Alliance.

This repo currently holds the working materials for the ABA founding-members presentation and the prototype surfaces that support it.

## What Lives Here

- a publishable ABA site prototype
- a membership flow prototype
- a biologicals-first knowledge hub prototype
- Lyle's separate registration-tracker workspace
- internal demo and planning material
- requirements and supporting notes

## Repo Structure

- `index.html`
  - root launcher for the main workspaces
- `docs/site/`
  - the main ABA site prototype
- `docs/membership-flow/`
  - membership types and application flow
- `docs/database/`
  - biologicals-first knowledge hub
- `registration-tracker/`
  - Lyle's registration-tracker workspace at repo root
- `docs/index.html`
  - internal demo material for working sessions and prep
- `docs/flow-intelligence/`
  - supporting explainer material
- `docs/walkthrough/`
  - supporting presentation flow material
- `docs/requirements/`
  - working requirements and specs

## Publishing

GitHub Pages is configured to publish from:

- `main:/`

That means:

- the live site entry point is root `index.html`
- `docs/` contains prototype and internal project material, but is not the Pages root anymore

## Current Working Model

- `docs/site/` is the public-facing umbrella surface
- `docs/membership-flow/` and `docs/database/` are supporting destinations inside that broader ABA story
- `registration-tracker/` remains a separate workspace and should not be duplicated elsewhere in the repo
- `docs/index.html` is internal working material, not the public homepage

## Notes

- This is a demo suite, not a production application.
- Optimize for clear story, believable product logic, and easy live walkthroughs.
- Keep major artifacts in their own folders rather than flattening new pages into `docs/`.
