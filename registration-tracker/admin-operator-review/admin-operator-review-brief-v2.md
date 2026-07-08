# Admin / Operator Review Brief V2

*Supersedes `admin-operator-review-brief-v1.md`. Reconciled to `../registrar-requirements-spec-v1.md`
(verified Phase 2 extraction) and `../context-and-decisions-v1.md`. V1 retained as history.*

**Domain frame.** Internal control point where raw submissions become trusted records in the Act 36
registration-administration workflow for agricultural crop inputs (microbial inoculants, plant
biostimulants, biofertilisers, plant extracts, biological crop-protection products). "Biological"
refers only to the natural origin of these crop inputs.

**What changed in V2 (headline).** The operator's proof/reference review is re-cut around the spec's
staged model: the single "Proof check" and "Reference check" become **dossier-readiness +
proof-of-payment** and **file-reference check + registration number (L)**. Record detail now shows
**service type, legal pathway, and official Act 36 stage**, and the packet-ready gate keys off the
split flags. Changes are itemised in the ledger with *current → proposed → citation*.

---

## Audience

ABA staff / trusted operators turning raw submissions into reviewed tracker records.

## Access / Role

Operator only. Not accessible to public users or company members.

---

## Reconciliation ledger (current → proposed → citation)

| # | Field / behaviour | V1 (current) | V2 (proposed) | Cite |
|---|---|---|---|---|
| A1 | **Proof review** | single "Proof check" (Verified / Missing / Unreadable / Mismatch) | Split into **Dossier readiness** (Ready / In progress / Not ready) and **Proof of payment** (Attached / Missing / Unreadable) — the two distinct mandatory artifacts. | spec §4, §6; G12 |
| A2 | **Reference review** | single "Reference check" | Split into **File reference check (pre-registration)** and a read-only **Registration no. (L, post-registration)** that only shows a number once the record is registered. | spec §4, §5.4; G8, G9 |
| A3 | **Service / application type** | not on the record | Show **service type** at clock-granularity (SRF `14ARx`) in record detail and decision summary. | spec §2.1; G1 |
| A4 | **Official stage** | status shown bare | Status shown **with its official Act 36 stage**. | spec §3.1; G6 |
| A5 | **Legal pathway** | not shown | Show **Agricultural remedy / Fertilizer / Not sure** in record detail. | spec §5.2; G11 |
| A6 | **Packet-ready gate** | required proof "Verified" + reference | Now requires **dossier Ready + proof-of-payment Attached + file reference Verified/Reason-accepted** (plus verified Full-member, consent, packet-eligible, operator-include). | spec §6; context §"Registrar List" |
| A7 | **Bottleneck themes** | controlled list | Unchanged — still assigned here as controlled review metadata. | context §"Bottleneck Themes" |
| A8 | **Verified vs self-reported relationship** | present | Unchanged — kept as the membership-verification control. | context §"ABA Relationship Type" |

---

## Key sections (V2)

- Review queue (unchanged).
- **Record detail** — now includes service type (A3), legal pathway (A5), status + official stage (A4).
- Self-reported vs verified ABA relationship (unchanged).
- Consent and visibility summary (unchanged).
- **Dossier, payment & reference review** (was "Proof and reference review") — dossier readiness,
  proof of payment, file-reference check, and read-only registration no. (L) (A1, A2).
- Duplicate / clarification state + bottleneck theme (unchanged).
- Public aggregate / registrar packet / operator inclusion decisions (unchanged).
- Decision summary — now surfaces service type, registration no. (L), and dossier/payment (A3, A2, A1).

## Important states

- Review pending · possible duplicate · needs clarification · accepted into tracker.
- Public aggregate eligible / excluded.
- Registrar packet eligible / blocked / excluded.
- **Registered record exposes its L-number**; in-process records show "—".
- Export-ready only when the split readiness gate (A6) is satisfied.

## Data shown

Fictional queue rows and detail fields — service type, official stage, legal pathway, dossier/payment,
file-reference, L-number, membership checks, consent, duplicate/clarification, and operator decisions —
labelled fictional. Canonical review fields in `../context-and-decisions-v1.md`; requirement basis in
`../registrar-requirements-spec-v1.md`.

## Relationship to other tracker areas

Receives raw submissions from `intake-flow`, controls which records appear in `company-dashboard`,
feeds accepted aggregates to `public-dashboard`, and decides eligibility for `registrar-list`.

## Notes for later production implementation

- Keep submitter consent separate from operator inclusion decision.
- Record why dossier, payment, reference, consent, or membership blocks export (distinct reasons now).
- L-number is a post-registration attribute tied to lifecycle status — read-only here, never entered.
- Preserve review decisions and audit trail.
- Prototype markup disposable; durable rules live in the governing docs.

## Open questions surfaced

- **Withdrawal semantics** — the spec notes withdrawal after evaluation = rejection (no refund,
  spec §3, G16). The operator UI does not yet expose that transition explicitly; confirm whether
  operators need a distinct "withdraw → treated as rejection" action.
- **Eligibility (SA residency / approved person)** captured at intake — confirm whether operators need
  a verification control for it here, or whether it stays an intake-only signal.
