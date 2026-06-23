# Public Dashboard Brief V1

## Audience

Public website visitors, sector participants, policymakers, and communications audiences who need an anonymised view of registration backlog evidence.

## Purpose

Present reviewed, anonymised aggregate metrics that support advocacy and communications without identifying individual companies or products.

## Access / Role

Public aggregate view. No company-specific or proof-level information should appear.

## Key Screens Or Sections

- Headline metrics: applications in backlog, median wait time, worst wait time, product-years waiting.
- All / ABA relationship / non-member reviewed-submissions filter.
- Backlog by legal pathway.
- Functional category and regime breakdowns.
- Trend over time.
- Future pipeline signal separate from backlog.
- Small-cell suppression state.
- Aggregate evidence packet activity.

## Important States

- Metrics based on reviewed submissions only.
- Suppressed small cells where counts could identify contributors.
- Pipeline signal kept separate from registrar backlog.
- Neutral filtering by all, ABA member, and non-member reviewed submissions.

## Data Shown

Fictional aggregate counts, wait-time metrics, bars, trend placeholders, suppression examples, and packet-activity figures. Derivation rules and privacy logic come from `../context-and-decisions-v1.md`.

## Relationship To CRM

The dashboard should eventually read from anonymised aggregates derived from reviewed CRM-backed records, not from raw intake submissions.

## Relationship To Other Tracker Areas

Only `admin-operator-review` accepted and public-eligible records should feed this view. `company-dashboard` remains private. `registrar-list` may contribute only aggregate packet activity.

## Notes For Later Production Implementation

- Never reveal company names, product names, proof attachments, reference numbers, or sensitive free text.
- Define and enforce suppression thresholds before launch.
- Keep public metrics auditable and derived from one source of truth.
- Prototype markup is disposable; durable rules live in `../context-and-decisions-v1.md`.
