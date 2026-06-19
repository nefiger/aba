# Company Dashboard Brief V1

## Audience

ABA member companies and invited member workspace users who need to monitor their own product registration pipeline.

## Purpose

Show a company's own tracker records, review states, pipeline lanes, wait times, anonymised sector benchmarks, and registrar-packet readiness in a member workspace.

## Access / Role

Company member workspace. This should imply member login or invited workspace access, not a public intake return link.

## Key Screens Or Sections

- Member workspace gate and role label.
- Company record summary.
- Pipeline / pre-submission lane.
- With-registrar lane.
- Finalised lane.
- Review-state tags: submitted, under review, accepted, needs clarification.
- Benchmark panel against anonymised sector median.
- Registrar packet readiness for member records.
- Clarification request panel.

## Important States

- No accepted records yet.
- Record needs clarification.
- Record is not export-ready.
- Record is included in an ABA registrar packet.
- Benchmarks shown as informational and based on reviewed submissions.

## Data Shown

Fictional company product/application rows, review statuses, current status dates, wait-time examples, sector median examples, export-readiness blockers, and packet status. Use the shared definitions in `../context-and-decisions-v1.md`.

## Relationship To CRM

This dashboard likely reads member-visible company, product, application, status-log, review, and export-packet data from the future CRM/system of record.

## Relationship To Other Tracker Areas

Records originate in `intake-flow`, become trusted through `admin-operator-review`, and may contribute to `public-dashboard` aggregates or `registrar-list` packets if eligible.

## Notes For Later Production Implementation

- Separate pipeline/pre-submission from registrar backlog.
- Limit visibility to the company's own records.
- Do not expose other companies through benchmarks.
- Benchmark only where the data is reviewed and meaningful.
- Prototype markup is disposable; durable rules live in `../context-and-decisions-v1.md`.
