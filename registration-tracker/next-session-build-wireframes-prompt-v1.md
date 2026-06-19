# Next Session Prompt: Build Registration Tracker Wireframes V1

Use this prompt in a new session to continue the ABA registration tracker work.

## Context

We are working in:

`C:\Users\krimc\OneDrive\Desktop\Claude\projects\aba\registration-tracker`

This folder contains planning and low-fidelity wireframe work for a Biological Inputs Registration Tracker for ABA.

The tracker is being designed separately from the main ABA website and Jen's custom CRM work, but it must remain easy to unify with both later.

Important files to read first:

1. `README.md`
2. `context-and-decisions-v1.md`
3. `starting-prompt-v1.md`

The HTML/CSS wireframes are disposable prototypes. Do not treat them as production code.

## Goal

Create the v1 low-fidelity wireframe package for the registration tracker.

Complete these steps:

1. Create one focused brief per product area.
2. Create shared disposable wireframe CSS.
3. Create a low-fidelity `index.html` wireframe in each of the five product folders.
4. Review the wireframes visually and revise for obvious layout, overlap, consistency, and role-boundary issues.

## Product Areas

The five product areas are:

- `intake-flow`
- `company-dashboard`
- `public-dashboard`
- `admin-operator-review`
- `registrar-list`

## Files To Create

Create these briefs:

- `intake-flow/intake-flow-brief-v1.md`
- `company-dashboard/company-dashboard-brief-v1.md`
- `public-dashboard/public-dashboard-brief-v1.md`
- `admin-operator-review/admin-operator-review-brief-v1.md`
- `registrar-list/registrar-list-brief-v1.md`

Create shared prototype styling:

- `shared/tracker-wireframe.css`

Create these wireframes:

- `intake-flow/index.html`
- `company-dashboard/index.html`
- `public-dashboard/index.html`
- `admin-operator-review/index.html`
- `registrar-list/index.html`

## Prototype Rules

These wireframes should be:

- low-fidelity
- greyscale or nearly greyscale
- desktop-first but mobile-considerate
- made of boxes, tables, placeholder charts, forms, and annotation callouts
- clear about intent
- realistic enough to test product logic
- easy to delete or rebuild later

Do not:

- add a framework
- add build tooling
- add backend assumptions
- use real data
- polish into production UI
- let the prototype code become architecture

Use realistic but fictional placeholder data.

Label fictional data clearly where useful.

## Shared Shell

Each wireframe should include:

- ABA brand / product shell
- `Registration Tracker` product label
- navigation between the five prototype areas
- role/access badge or note
- disabled or placeholder `ABA Home` / `Back to ABA website` slot

The `ABA Home` link should be visually present but not wired to a real route yet.

Suggested nav labels:

- Intake
- Company Dashboard
- Public Dashboard
- Admin Review
- Registrar Export

Role/access labels:

- intake: `Public submission: authorised representatives only`
- company dashboard: `Company member workspace`
- public dashboard: `Public aggregate view`
- admin/operator review: `Operator only`
- registrar list: `Operator export workspace`

## Brief Requirements

Each folder brief should include:

- audience
- purpose
- access/role
- key screens or sections
- important states
- data shown
- relationship to CRM
- relationship to other tracker areas
- notes for later production implementation

The briefs should cite shared rules from `context-and-decisions-v1.md` instead of duplicating every detail.

## Wireframe Content Requirements

### Intake Flow

Show:

- eligibility gate for authorised submitter
- company/contact details
- self-reported ABA membership status
- POPIA/privacy notice
- product entry
- functional category
- country
- governing regime
- conditional Act 36 fields
- application/status entry
- date status began and approximate toggle
- proof upload
- registrar reference or explicit unavailable reason
- visibility/consent controls
- save/return by email
- not-authorised stop state
- missing-proof-but-can-continue state

### Company Dashboard

Show:

- member workspace gate/label
- company's own records
- lanes for pipeline/pre-submission, with registrar, finalised
- review states such as submitted, under review, accepted, needs clarification
- benchmark against anonymised sector median
- export/registrar packet status for member records
- no accepted records yet state
- not export-ready state

### Public Dashboard

Show:

- anonymised public aggregate metrics
- applications in backlog
- median wait time
- worst wait time
- product-years waiting
- member/non-member/all filter
- backlog by legal pathway
- breakdown by functional category and regime
- trend over time
- future pipeline signal separate from backlog
- suppression for small cells
- note that metrics are based on reviewed submissions
- aggregate evidence packet activity

### Admin / Operator Review

Show:

- review queue
- record detail panel
- self-reported vs verified membership status
- consent and visibility summary
- proof/reference review
- duplicate or possible duplicate state
- needs clarification state
- public aggregate eligibility decision
- registrar packet eligibility decision
- operator inclusion decision
- relationship to CRM/system of record

### Registrar List

Show:

- export-ready registrar packet list
- default focus on reviewed, consented, operator-approved member records
- member/non-member indicators
- proof and reference columns
- eligibility blockers
- export packet/batch concept
- packet version/date/status
- export blocked because proof or consent is missing
- concise disclaimer that export packets are prepared for engagement with the registrar

## Visual Review

After creating the files, start a local static server if helpful and inspect the pages in a browser.

Check:

- text does not overlap
- mobile width is usable
- role/access labels are visible
- nav works between prototype pages
- shared shell is consistent
- public/admin/member boundaries are clear
- conditional fields are understandable
- suppression and visibility mechanics are visible

If using a local server, give the user the URL.

## Final Response For That Session

Report:

- files created
- what was verified
- any unresolved assumptions
- how to open the wireframes
