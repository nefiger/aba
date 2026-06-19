# Admin / Operator Review Brief V1

## Audience

ABA staff or trusted operators responsible for turning raw submissions into reviewed tracker records.

## Purpose

Provide the internal control point for triage, verification, consent inspection, duplicate handling, clarification requests, public aggregate eligibility, registrar packet eligibility, and operator inclusion decisions.

## Access / Role

Operator only. This area is not accessible to public users or company members.

## Key Screens Or Sections

- Review queue.
- Record detail panel.
- Self-reported vs verified membership status.
- Consent and visibility summary.
- Proof and registrar reference review.
- Duplicate warning.
- Needs-clarification state.
- Public aggregate eligibility decision.
- Registrar packet eligibility decision.
- Operator inclusion decision.
- CRM/system-of-record note.

## Important States

- Review pending.
- Possible duplicate.
- Needs clarification.
- Accepted into tracker.
- Public aggregate eligible or excluded.
- Registrar packet eligible, blocked, or excluded.

## Data Shown

Fictional queue rows, detail fields, proof/reference statuses, membership checks, consent settings, duplicate warning examples, and operator decisions. Canonical review fields are described in `../context-and-decisions-v1.md`.

## Relationship To CRM

This may become a CRM module or a tracker-specific operator UI over CRM-backed records. It is the internal source-of-truth workflow for v1 decisions.

## Relationship To Other Tracker Areas

It receives raw submissions from `intake-flow`, controls which records appear in `company-dashboard`, feeds accepted aggregates to `public-dashboard`, and decides eligibility for `registrar-list`.

## Notes For Later Production Implementation

- Keep submitter consent separate from ABA's operator inclusion decision.
- Record why proof, reference, consent, or membership blocks export.
- Preserve review decisions and audit trail.
- Prototype markup is disposable; durable rules live in `../context-and-decisions-v1.md`.
