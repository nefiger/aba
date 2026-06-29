# ABA Release Snapshot Readiness

Last updated: 2026-06-29

Purpose:
- define what must be true before the prototype is accepted as the canonical spec snapshot
- give the repo a release readiness checklist before tagging a deployment

## 1. Acceptance standard

The snapshot is ready only when the connected prototype feels like one coherent system, not separate demo islands.

That means:
- public site, membership flow, tracker flow, company workspace, operator review, and registrar/export views all align
- Lyle's tracker updates are included in the accepted integrated experience
- the requirements notes match what the prototype actually shows

## 2. Required prototype checks

### Public ABA site

- Home page clearly presents:
  - `Join ABA`
  - `Track Product Registrations`
  - `Explore Biologicals`
- Membership reads as alliance value, not only tracker access
- Registration path reads as open public contribution
- Explorer reads as a real public knowledge layer
- South Africa-active / Africa-wide participation framing is explicit

### Navigation and landing pages

- top-level navigation labels are stable across public landing pages
- Membership, Biologicals Explorer, Registration Tracker, and Workspace each have a well-designed landing page of their own
- landing pages explain purpose, audience, next action, and connection to the wider ABA story
- no major area still feels like an under-resolved jump page

### Visual completeness

- major public surfaces have the minimum required imagery, icons, diagrams, or other visual assets to feel intentional
- any temporary visual assets are explicitly known and accepted
- the visual language is coherent enough that a later design-system extraction would have a stable basis

### Membership flow

- Full, Associate, and Observer routes are clear
- Full membership shows the product-registration relevance path
- Full-membership applicants with products have a visible next step into tracker intake
- Non-member tracking path remains distinct
- Review states are visible:
  - received
  - under review
  - more information required
  - approved
  - next action
- No instant payment or checkout logic is implied

### Tracker and linked workspaces

- Public intake flow is clear and believable
- Public signals/dashboard is coherent and public-safe
- Company workspace feels member-facing and private
- Operator workspace shows how records are reviewed and managed
- Registrar/export workspace shows export logic and packet versioning
- Public/private/operator/export boundaries are explicit everywhere

## 3. Spec alignment checks

- `aba-prototype-system-model.md` matches the prototype behavior
- `aba-prototype-consistency-checklist.md` is satisfied by the major landing pages and workspaces
- release readiness note remains consistent with the current prototype
- no major prototype behavior exists without a matching status, role, or entity definition
- no note describes behavior the prototype contradicts

## 4. Signoff checklist

- all linked surfaces are manually reviewed
- no major UX contradictions remain
- no major language mismatch remains between ABA public surfaces and tracker surfaces
- no broken links across the public, member, and operator journeys
- Lyle's accepted tracker updates are present in the integrated review state
- the accepted commit or branch head is identified

## 5. Release tagging process

When the team is satisfied:

1. Confirm the exact accepted commit.
2. Confirm that the prototype and requirements notes are in sync.
3. Confirm that the deployment being shown matches that commit.
4. Create a release tag for that accepted state.
5. Treat the tagged deployment as the implementation reference snapshot.

## 6. Post-tag interpretation

The release tag does not mean the product is production-ready software.

It means:
- the prototype is accepted as the spec artifact
- the snapshot can be referenced consistently by downstream implementation teams
- later work should compare back to that tagged state when clarifying behavior
