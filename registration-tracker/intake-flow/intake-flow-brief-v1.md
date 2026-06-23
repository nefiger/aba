# Intake Flow Brief V1

## Audience

Authorised company representatives who are responsible for submitting or updating product registration information for biological inputs.

## Purpose

Collect company, contact, product, application, proof, status log, consent, and visibility information in a low-friction flow that can be saved and resumed by email. The intake creates raw submissions for ABA operator review; it is not the system of record by itself.

## Access / Role

Public submission flow, but only authorised representatives may continue. The first screen must stop unauthorised users and ask them to forward the link to the responsible person.

## Key Screens Or Sections

- Authorised submitter gate.
- POPIA/privacy and participation notice.
- Company and contact details.
- Self-reported ABA relationship type: Full member, Associate, Observer, Non-member, or Not sure / pending.
- Product entry with functional category.
- Country and governing regime.
- Conditional Act 36 fields for South Africa agriculture records.
- Application and current status entry.
- Dated status log with approximate-date toggle.
- Proof upload and registrar reference status.
- Visibility and consent controls.
- Save/return by email confirmation.

## Important States

- Authorised user can continue.
- Not-authorised stop state.
- Missing proof can continue, but is marked as not registrar-packet ready.
- Registrar reference missing requires an unavailable reason.
- Save/return link is available because registration status changes over time.

## Data Shown

Fictional company/contact details, product examples, status values, dates, reference status, proof upload placeholder, and consent settings. Follow the Company -> Products -> Applications -> Status Log model in `../context-and-decisions-v1.md`.

## Relationship To CRM

The intake may eventually create or update CRM-backed company, contact, product, application, attachment, consent, and status-log records. For v1, the wireframe should show the product logic without assuming final CRM implementation.

## Relationship To Other Tracker Areas

Submitted records flow into `admin-operator-review` first. Reviewed records may later appear in the member `company-dashboard`, anonymised `public-dashboard`, and eligible `registrar-list`.

## Notes For Later Production Implementation

- Keep consent and operator inclusion separate.
- Do not expose proof files, reference numbers, company names, product names, or free-text notes publicly.
- Use controlled statuses plus optional notes.
- Treat "not sure" as a valid answer where the submitter cannot classify the record.
- Prototype markup is disposable; durable rules live in `../context-and-decisions-v1.md`.
