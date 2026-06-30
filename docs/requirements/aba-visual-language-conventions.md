# ABA Visual Language Conventions

Last updated: 2026-06-30

Purpose:
- turn the content taxonomy and design-principles thinking into practical conventions for the prototype
- keep the prototype consistent without forcing a full design-system implementation inside this tranche
- make sure new pages can be added without drifting into unrelated visual languages

## 1. What consistency means in this prototype

Consistency does not mean every page should look identical.

It means:
- the same organisation should feel visibly present across the whole system
- similar actions should look similar
- page families should be recognisable by structure and tone
- users should be able to predict where navigation, actions, states, and summaries will appear

The prototype should feel like one ecosystem with several content modes, not one flat website and not a bag of unrelated demos.

## 2. Shared shell conventions

All core ABA prototype pages should share these baseline traits:

- `Public Sans` as the default family
- same ABA mark, brand line, and topbar structure
- same background atmosphere:
  warm sand base, light green natural tint, restrained gold support
- same rounded translucent surface treatment for primary page sections
- same CTA language model:
  primary filled button for the main action, secondary outlined button for supporting movement
- same nav vocabulary:
  `Home`, `About`, `Membership`, `Biologicals Explorer`, `Track Registrations`

This shared shell is what holds the prototype together.

Boundary rule:
- `docs/site/` is for the public ABA site shell
- separate operational sections should not be introduced as if they were ordinary public-site subsections
- when a surface becomes its own operational prototype, launch it from the root ABA directory instead
- coherence between public and admin/workflow surfaces should still be preserved where sensible through shared brand atmosphere, typography, shell treatment, and action language

## 3. Page-family conventions

### Public narrative pages

Examples:
- `docs/site/index.html`
- `docs/site/about.html`
- `docs/site/updates.html`

Use:
- stronger hero statements
- broader spacing rhythm
- fewer dense controls
- supporting side panels instead of data-heavy grids

Avoid:
- internal workflow language in the hero
- dashboard-style density as the main first impression
- narration that explains the prototype, repo, or design exercise instead of speaking in the product's own voice

### Pathway pages

Examples:
- `docs/membership-flow/index.html`
- `registration-tracker/index.html`
- `docs/site/workspace.html`
- `docs/site/technical-network.html`

Use:
- obvious route cards
- numbered or clearly named pathways
- explicit role boundaries
- direct CTA hierarchy
- distinct semantic route cues when pathways represent different kinds of value

Avoid:
- long abstract introductions without a clear next move
- too many equal-weight options in one cluster

### Structured knowledge pages

Examples:
- `docs/database/index.html`
- catalogue, evidence, standards, and resource pages

Use:
- semantic grouping
- filters and browse controls near the top of the content
- clear distinction between overview and drill-down content
- category cues that help users orient quickly

Avoid:
- making the Explorer feel like generic marketing content
- hiding useful structure behind decorative layouts

### Internal workflow pages

Examples:
- `docs/site/operator-workspace.html`
- `docs/membership-ops/index.html`
- tracker operator and registrar views

Use:
- denser information blocks
- explicit state labels
- record/action/decision separation
- lower-noise backgrounds inside content modules
- a separate workspace identity when the page is no longer part of the public-site reading flow
- table and queue surfaces as the primary working area
- in-place actions inside rows or immediate adjacent detail panels by default
- visible family resemblance to the public ABA product through shared brand shell, background atmosphere, mark, type, and button language where that does not reduce operator clarity

Avoid:
- public-storytelling tone where procedural clarity is needed
- making private and public information look equivalent
- meta labels such as `prototype`, `demo`, `internal note`, `why this page exists`, or launcher-oriented instructions inside the product UI
- pushing routine operator actions into separate pages when the same decision can be made safely in context
- drifting into a separate SaaS visual identity that feels unrelated to the public ABA system
- overview or helper copy that describes the screen itself instead of helping the operator complete work

## 4. Hierarchy rules

To preserve clear visual hierarchy:

- every page gets one dominant `h1`
- the eyebrow introduces the content mode or area, not a marketing slogan
- primary CTA should be visually obvious within the first view
- section labels should act as reading anchors, not decorative captions
- cards in the same row should have a comparable information load where possible

Blur-test rule:
- if the page is blurred, it should still be obvious what the page is for and where the main action is

## 5. Color semantics

The prototype already uses an earth-toned ABA palette. That palette now needs more semantic discipline.

Recommended meaning:

- deep green:
  primary action, ABA ownership, trusted movement
- soft green:
  pathway emphasis, route markers, positive context
- sand / warm neutral:
  narrative support, framing panels, contextual explanation
- teal-soft:
  knowledge, evidence, or interpretation support
- gold-soft:
  caution, review significance, or outward-facing packet context

Do not use color only decoratively when a clearer semantic role is available.

## 6. Action conventions

Use a stable action pattern:

- primary button:
  the main next step on the page
- secondary button:
  adjacent exploration or supporting workflow
- route cards:
  should imply movement and choice
- workspace links:
  should signal deeper/private/system views rather than ordinary public reading

Button shape rule:
- action controls should read as buttons, not capsules or lozenges
- use a modest corner radius rather than full-pill treatment unless the control is intentionally tag-like

If everything is styled like a primary CTA, nothing is primary.

## 7. State and privacy conventions

State-bearing surfaces should make these boundaries obvious:

- public
- applicant or member-private
- ABA operator-only
- registrar or export-facing

State language should be explicit and reusable:

- `Received`
- `Under review`
- `More information required`
- `Approved`
- `Pending activation`
- `Ready for export`

Do not rely on ambient copy alone to explain privacy or readiness.

## 8. Typography conventions

Typography should do more of the semantic work.

Use:
- large, compressed-feeling display headlines for public narrative and route pages
- smaller, firmer headings for internal workflow pages
- short uppercase labels for eyebrows, mini labels, and section anchors
- comfortable body line-lengths for explanatory copy

Do not constrain heading width with arbitrary max-width rules.
If a heading wraps badly, fix the layout, the measure, or the copy.

## 9. Iconography and image direction

The prototype does not need a full icon set yet, but it should move toward a coherent image vocabulary.

Direction:
- organic, agricultural, regulatory, and evidence motifs should feel related
- Explorer can carry the richest semantic icon layer
- public narrative pages can use more atmospheric imagery
- internal workflow pages should use icons sparingly and procedurally

When visual assets are added, prefer:
- crop or field imagery
- product/evidence/knowledge illustrations
- restrained diagrams
- meaningful symbols over generic stock abstractions

When a symbolic treatment is introduced on one page, it becomes a candidate system convention and should either:
- be reused elsewhere for the same meaning, or
- be documented here as page-specific and not reused

Current semantic symbols now in use:
- `Alliance`:
  warm clay accent for participation, membership, and institutional belonging
- `Intelligence`:
  teal accent for tracking, signals, and interpreted evidence
- `Knowledge`:
  gold accent for public reference, exploration, and structured learning
- Africa footprint marker:
  use only when backed by a sourced, recognisable Africa silhouette or approved asset
  do not improvise continent outlines freehand in-page

These should not be remixed casually into unrelated meanings.
## 10. Immediate application in this tranche

For the current prototype iteration, these conventions should drive:

- shared nav and page-shell consistency across ABA public pages
- stronger, distinct landing-page treatment for Membership, Tracker, Explorer, and secondary public routes
- clearer separation between narrative, path, knowledge, and workflow surfaces
- more intentional CTA hierarchy and role signaling
- better continuity between public and private/system-facing pages

This is enough to keep the prototype coherent now.
A fuller tokenised design system can be extracted later, once the interaction model and site structure are genuinely settled.
