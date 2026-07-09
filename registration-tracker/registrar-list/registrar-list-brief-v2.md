# Registrar List Brief V2

*Supersedes `registrar-list-brief-v1.md`. Reconciled to `../registrar-requirements-spec-v1.md`
(verified Phase 2 extraction) and `../context-and-decisions-v1.md`. V1 retained as history.*

**Domain frame.** Export-facing operator workspace assembling named, verifiable evidence packets for
engagement with the Act 36 registrar, covering agricultural crop inputs (microbial inoculants, plant
biostimulants, biofertilisers, plant extracts, biological crop-protection products). "Biological"
refers only to the natural origin of these crop inputs.

**What changed in V2 (headline).** The packet list now carries the reconciled vocabulary: a
**service-type** column at clock-granularity, statuses shown **with their official Act 36 stage**, the
single Reference column split into **file ref (pre) / registration no. (L, post)**, and the single
Proof column split into **dossier-readiness / proof-of-payment**. Inclusion logic and attachment
counts follow the split flags. Changes are itemised in the ledger with *current → proposed → citation*.

---

**Status note.** This entire product area is `data-model-v1.md` §7's **deferred layer** — the
registrar packet/ExportPacket is named and modelled as extensible, but **not built in v1's
open-capture model**. This brief is retained as forward-looking design for when ABA's packet-export
tooling is built; nothing here gates or blocks the v1 intake → company-dashboard → public-dashboard
flow.

## Audience

ABA operators preparing named, verifiable evidence packets for the registrar.

## Access / Role

Operator export workspace. Default focus: reviewed, consented, operator-approved verified Full-member
records.

---

## Reconciliation ledger (current → proposed → citation)

| # | Field / behaviour | V1 (current) | V2 (proposed) | Cite |
|---|---|---|---|---|
| L1 | **Service / application type** | *absent* | New **Service type** column at clock-granularity (SRF `14ARx`). | spec §2.1; G1 |
| L2 | **Reference column** | single "Reference" | Split into **File ref (pre-registration) / Reg. no. (L, post-registration)**; L shows "—" for every in-process packet candidate (correct: the number exists only once registered). | spec §4, §5.4; G8, G9 |
| L3 | **Proof column** | single "Proof" | Split into **Dossier / Payment** (dossier-readiness + proof-of-payment). | spec §6; G12 |
| L4 | **Status** | mixed labels ("Under technical review", "Query requested", "Submitted to authority") | Reconciled controlled labels, each shown **with its official Act 36 stage**. | spec §3.1; G6 |
| L5 | **Inclusion rule** | "…+ proof/reference + operator included" | "…+ **dossier ready + proof of payment + file reference** + operator included". | spec §6; context §"Registrar List" |
| L6 | **Attachments count** | counted records where proof = Attached | Counts records where **dossier Ready AND payment Attached**. | spec §6 |
| L7 | **Bottleneck-theme column** | present in the table | Dropped from this wide export table to fit the split columns; the actionable **blocker** column remains, and bottleneck theme stays first-class in `admin-operator-review`. | layout (wireframe, disposable) |
| L8 | **Default packet eligibility** | verified Full-member + consent + proof/reference + operator | Unchanged in principle; readiness now reads the split flags (L5). | context §"Registrar List" |

---

## Key sections (V2)

- Packet draft header — version, generated date, status (unchanged).
- **Registrar packet list** — columns: Include · Company · Product · **Service type** · ABA
  relationship · Country · **Status (official stage)** · Submitted · **File ref / Reg. no. (L)** ·
  **Dossier / Payment** · Consent · Blocker.
- Eligibility blockers (unchanged; keyed off the split readiness).
- Export packet/batch concept — version, generated date/by, status, preserved snapshot (unchanged).
- Export controls (preview / prepare CSV / freeze / mark sent) (unchanged).
- Registrar engagement disclaimer (unchanged).

## Important states

- Export-ready record.
- Export blocked — **proof of payment missing** (distinct from dossier not ready).
- Export blocked — named registrar consent missing.
- Export blocked — membership not verified / not a default candidate.
- Packet draft / previewed / prepared / frozen / sent / revised / withdrawn.
- **L-number absent ("—") for all in-process candidates** — reinforcing that packet evidence is
  in-process applications, not yet-registered products.

## Data shown

Fictional export rows with service type, official stage, staged reference (file ref / L), dossier +
payment, member indicators, consent, blockers, and packet metadata — labelled fictional. Inclusion
rules in `../context-and-decisions-v1.md`; requirement basis in `../registrar-requirements-spec-v1.md`.

## Relationship to other tracker areas

Only reviewed, operator-approved records from `admin-operator-review` enter the export-ready list.
Intake consent, membership verification, dossier/payment readiness, and file reference determine
readiness.

## Notes for later production implementation

- Default packets to verified member records only; non-members appear as excluded / follow-up
  candidates, not included by default.
- Preserve packet history as evidence sent at a moment in time.
- L-number is a post-registration attribute — most packet candidates are in-process and correctly
  carry no L-number.
- Prototype markup disposable; durable rules live in the governing docs.

## Open questions surfaced

- ~~Should a registrar packet ever include registered (L-numbered) records as historical evidence?~~
  **Resolved (D5, data-model-v1 §11/§7, closed):** no — in-process applications only. Already-registered
  records are never packet candidates. V2's fictional set (all in-process) already matches this.
- **Column budget** — the table is wide; if more axes are needed later, consider a detail drawer per
  record rather than more columns.
