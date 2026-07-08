# Company Dashboard Brief V2

*Supersedes `company-dashboard-brief-v1.md`. Reconciled to `../registrar-requirements-spec-v1.md`
(verified Phase 2 extraction) and `../context-and-decisions-v1.md`. V1 retained as history.*

**Domain frame.** Private member workspace showing a company's own registration pipeline for
agricultural crop inputs under Act 36 of 1947 — microbial inoculants, plant biostimulants,
biofertilisers, plant extracts and biological crop-protection products. "Biological" refers only to
the natural origin of these crop inputs.

**What changed in V2 (headline).** Each record now carries the reconciled vocabulary: **service type**
at clock-granularity, its **official Act 36 stage**, the **legal pathway**, the staged reference
(**file ref** pre-registration vs **L-number** post-registration), and the split **dossier-readiness /
proof-of-payment** flags. Wait time is now framed against the **official statutory timeframe** for the
record's type, not shown in isolation. Changes are itemised in the ledger with *current → proposed →
citation*.

---

## Audience

ABA member companies and invited member workspace users monitoring their own product registration
pipeline.

## Access / Role

Company member workspace — member login or invited workspace access, not a public intake return link.

---

## Reconciliation ledger (current → proposed → citation)

| # | Field / behaviour | V1 (current) | V2 (proposed) | Cite |
|---|---|---|---|---|
| C1 | **Service / application type** | *absent from record detail* | Show each record's **service type** at clock-granularity (SRF `14ARx`), e.g. Generic (14AR1), New molecule (14AR2). | spec §2.1; G1 |
| C2 | **Official stage** | status shown as a bare label | Status shown **with its official Act 36 stage** (Received → Verification → Scientific screening → Evaluation → Decision → Appeal, plus referred-back). | spec §3.1; G6 |
| C3 | **Reference** | timeline step "Reference issued"; no explicit reference field | Split into **file reference (pre-registration)** and **registration number (L, post-registration)**; L shows "Not issued (pre-registration)" until the record is registered. | spec §4, §5.4; G8, G9 |
| C4 | **Proof / readiness** | single implicit readiness | Split **dossier-readiness** and **proof-of-payment** shown per record. | spec §6; G12 |
| C5 | **Wait-time benchmark** | company average vs anonymised sector median only | Keep the sector-median comparison **and** surface the **official statutory timeframe** for the record's type as the regulatory yardstick. | spec §2.1–2.2 (benchmark spine); G7 |
| C6 | **Legal pathway** | not shown | Show **Agricultural remedy / Fertilizer / Not sure** on the record. | spec §5.2; G11 |
| C7 | **Lanes** | pipeline / with registrar / finalised | Unchanged — correct; pre-submission stays out of registrar backlog. | context §"Pipeline, Backlog…" |

---

## Key sections (V2)

- Member workspace gate + role label (unchanged).
- Company record summary (unchanged).
- Pipeline / with-registrar / finalised lanes (unchanged).
- Review-state tags (unchanged).
- **Wait-time panel** — company average vs sector median, with the record's **official statutory
  timeframe** surfaced in the selected-record detail (C5).
- **Selected-record detail** now includes: service type (C1), legal pathway (C6), status + official
  stage (C2), wait vs official timeframe (C5), file reference (pre) and registration no. (L, post)
  (C3), dossier readiness and proof of payment (C4).
- Registrar-packet readiness for member records (unchanged logic).
- Clarification panel (unchanged).

## Important states

- No accepted records yet.
- Record needs clarification.
- Record not export-ready (now gated on dossier + proof-of-payment, not a single proof flag).
- Record included in an ABA registrar packet.
- **Registered record shows its L-number**; all in-process/pipeline records show "Not issued".
- Benchmarks informational, based on reviewed submissions.

## Data shown

Fictional company product/application rows with service type, official stage, legal pathway, staged
reference, readiness flags, wait vs official timeframe, and packet status — labelled fictional. Uses
shared definitions in `../context-and-decisions-v1.md` and `../registrar-requirements-spec-v1.md`.

## Relationship to other tracker areas

Records originate in `intake-flow`, become trusted through `admin-operator-review`, and may contribute
to `public-dashboard` aggregates or `registrar-list` packets if eligible.

## Notes for later production implementation

- Separate pipeline/pre-submission from registrar backlog.
- Limit visibility to the company's own records; never expose other companies through benchmarks.
- Official timeframes are lookup constants, not stored per record.
- L-number is a post-registration attribute tied to lifecycle status — never an editable field here.
- Prototype markup disposable; durable rules live in the governing docs.

## Open questions surfaced

- **Wait-vs-benchmark framing** — should the member view lead with sector median, official statutory
  timeframe, or both side by side? V2 shows both; confirm the primary yardstick with the team.
- Same **median definition** question as the public dashboard (total open duration vs time-in-stage).
