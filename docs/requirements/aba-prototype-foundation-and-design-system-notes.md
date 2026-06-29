# ABA Prototype Foundation And Design System Notes

Last updated: 2026-06-29

Purpose:
- capture the structural design decisions the prototype-as-spec approach depends on
- make sure navigation, landing pages, visual assets, and eventual design-system thinking are treated as part of the spec, not as post-facto polish

## 1. Prototype-as-spec means structure is part of the product

If this prototype is the implementation reference, then it must not only show screen-level interactions.

It must also lock:
- the information architecture
- the navigation model
- the landing-page pattern for each major product area
- the visual language and asset direction
- the reusable UI primitives that later become a design system

These are not decorative extras. They are part of the product contract.

## 2. Top-level navigation rule

The ABA prototype should converge toward one consistent top-level navigation model across public surfaces.

Current intended top-level public destinations:
- Home
- About
- Membership
- Biologicals Explorer
- Track Registrations
- Workspace

Working rule:
- the same primary destinations should appear consistently across the public site and major landing pages
- wording should stay stable once accepted
- the navigation should imply one connected system rather than independent mini-sites

The eventual implementation can use a shared component, but the prototype must first settle:
- final labels
- ordering
- which destinations are public
- which destinations are gateway surfaces into deeper workspaces

## 3. Landing-page requirement for each major area

Each major product area needs a well-designed landing page of its own.

Minimum landing-page set:
- `docs/site/index.html`
  - umbrella public homepage
- `docs/membership-flow/index.html`
  - membership landing page and route chooser
- `docs/registration-tracker/index.html`
  - tracker landing page and explainer
- `docs/database/index.html`
  - Biologicals Explorer landing page
- `docs/site/workspace.html`
  - gateway into deeper member/operator/export workspaces

Each landing page should do 4 jobs:
- explain the purpose of that area
- clarify who it is for
- route the visitor to the next meaningful action
- show how that area relates to the wider ABA system

## 4. Landing-page quality standard

Each major landing page should feel complete enough to stand on its own in a demo or release snapshot.

That means every landing page should have:
- a strong headline and framing statement
- clear audience or use-case positioning
- meaningful calls to action
- connection back to the wider ABA story
- consistent top-level navigation
- visual completeness, not just placeholder layout

The landing pages should not read like:
- repo explanation
- prototype narration
- internal placeholder copy
- a rough jump page without point of view

## 5. Visual assets are part of completeness

A complete prototype snapshot should include intentionally chosen visual assets where they materially affect the experience.

Asset categories to plan for:
- homepage and section imagery
- icons and category markers
- product or crop/pest support visuals where useful
- explanatory diagrams or pattern visuals where needed
- any branded ABA visual treatments that help unify the system

The goal is not to fill every screen with decoration.

The goal is to avoid a situation where:
- interactions are defined
- copy is strong
- but the prototype still looks under-resolved because its visual system has not been chosen

## 6. Asset direction needs its own checklist

Before the prototype is treated as the reference snapshot, the team should know:
- which surfaces still need imagery
- which surfaces need bespoke icons or diagrams
- which visuals are final enough for the snapshot
- which visuals are intentionally temporary and should be flagged as such

This can stay as a lightweight asset inventory in requirements until the visual direction is settled.

## 7. Design system timing

It is a good idea to create a design system, but not before the prototype interaction model and major surface patterns have settled enough.

Recommended sequence:
1. stabilise prototype interactions and information architecture
2. settle navigation and landing-page patterns
3. settle visual direction and core assets
4. extract reusable UI primitives into a design system

That later design system would likely include:
- top navigation/header
- CTA button styles
- section headers and label patterns
- route cards
- process-step cards
- state-summary rows
- status chips
- workspace cards and panels
- chart or metrics presentation patterns

## 8. What the current prototype should do before design-system extraction

In this prototype tranche, we should explicitly converge on:
- accepted nav labels and ordering
- accepted landing-page pattern for each major surface
- accepted tone and layout direction across public, member, and operator views
- the minimum visual asset set required for a convincing release snapshot
- accepted content taxonomy and semantic visual language across narrative, knowledge, workflow, and export surfaces

Only once those are stable should we formalise them into a reusable design system layer.
