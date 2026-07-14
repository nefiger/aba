# Registration Tracker — Page-Feed Map V1 (first draft)

**Status:** First draft for Jen. Shows **how captured data flows into each downstream page/asset, and
at what visibility** — content/data logic, **not visual design** (Jen styles). Derived from
`data-model-v1.md` and `intake-form-spec-v1.md`. Expect edits.

**One rule above all:** every surface inherits the **per-field sensitivity** set in the data model
(`PUBLIC` / `MEMBER` / `OPERATOR` / `NEVER`). Decide sensitivity once at the field; each page just
reads it. That makes it structurally hard to leak a field onto a page it shouldn't be on.

---

## 1. The flow

```
Intake form (open, anyone)
   → creates/updates Application with Organisation + Product + intake metadata + StatusLog
      → (later) Operator review verifies + tags
         ├─ Company dashboard   (member sees own records)          MEMBER
         ├─ Public / sector signals + ABA homepage intelligence     PUBLIC (aggregate, suppressed)
         ├─ Operator review      (internal control) [deferred]      OPERATOR
         └─ Registrar packet/export (named evidence) [deferred]     MEMBER + named-use consent
```

Pipeline (pre-submission) records are tracked but **never counted as registrar backlog**.

---

## 2. Per-surface feed

### A. Intake form — *creates* the data
Writes application/organisation/product/status/consent data plus intake metadata. Nothing read from other records (open,
stateless entry). Draft return-link lets a submitter resume/update over time.

### B. Company dashboard — the submitter's own records  *(MEMBER)*
- **Reads:** that Organisation's own Products + Applications + StatusLog, at record level.
- **Shows:** service type, official stage, wait-time (derived vs statutory benchmark), file reference,
  L-number (if registered), dossier/payment readiness, pipeline/with-registrar/finalised lanes.
- **Never shows:** other organisations' records; anything cross-company.

### C. Public / sector-signals dashboard + ABA homepage intelligence section  *(PUBLIC)*
- **Reads:** derived aggregates only, from records with `allow_public_aggregate = ON`, after review.
- **Shows (all aggregate + suppressed):** backlog count, median/worst wait vs statutory benchmark,
  product-years; by official **stage**, by **service type vs benchmark**, by pathway/category/country;
  bottleneck themes; pre-submission pipeline (separate); trend.
- **Never shows:** company name, product name, contact/approved-person PII, file/registration numbers,
  free-text notes, dossier/payment docs. Cells below threshold `k` **and rare cross-tab combinations**
  are suppressed.
- **Jen link:** the homepage "registration intelligence" section is a *condensed mirror* of this — same
  derived definitions, fewer visuals. Must use the reconciled vocabulary (official stages, benchmark
  overruns), not the pre-reconciliation framing.

### D. Operator review — internal control  *(OPERATOR)* — *deferred layer*
- **Reads:** everything, including PII and the submitter-reported vs to-be-verified fields.
- **Adds:** verified relationship, data quality, public/packet eligibility, operator inclusion,
  bottleneck theme, duplicate/clarification. Gate for what flows to C and E.

### E. Registrar packet / export — named evidence  *(MEMBER + named-use consent)* — *deferred layer*
- **Reads:** named records where `allow_named_use = ON` **and** operator-included.
- **Shows:** company, product, service type, status/stage, file reference, dossier/payment,
  submitted-at — as a versioned, point-in-time evidence batch.
- **Never includes:** records without named-use consent; dossier/payment documents themselves.

---

## 3. Field × surface visibility matrix

`●` shown at record level · `▲` aggregate/suppressed only · `○` hidden

| Field | Company (B) | Public (C) | Operator (D) | Packet (E) |
|---|:--:|:--:|:--:|:--:|
| Company / product name | ● | ○ | ● | ● |
| Country | ● | ▲ | ● | ● |
| Functional category / pathway | ● | ▲ | ● | ● |
| Service type | ● | ▲ | ● | ● |
| Status / official stage | ● | ▲ | ● | ● |
| Wait time (derived) | ● | ▲ | ● | ● |
| File reference (pre) | ● | ○ | ● | ● |
| Registration L-number (post) | ● | ○ | ● | ● |
| Dossier / payment flags | ● | ○ | ● | ● |
| Contact PII | ● own-record | ○ | ● | ○ |
| Approved-person PII / SACNASP (§6) | ● own-record | ○ | ● | ○ |
| Free-text notes | ○ | ○ | ● | ○ |
| ABA relationship (self / verified) | ● self | ▲ | ● both | ● verified |

> The optional accountability block (data model §6) is `MEMBER` (own-record only — the submitting
> company can see its own accountable-person data) and feeds **nothing public or packet-facing**, so the
> include-vs-defer decision (now decided: include) has **near-zero downstream effect** on the other
> surfaces. Company-dashboard-brief-v2 doesn't currently render this block in its record-detail list;
> that's a v1 UI scope choice, not a visibility restriction — the data is allowed to be shown.

---

## 4. Alignment with Jen's existing site (note)

Jen's public site, membership flow, and database pages now exist on `main`. Two touch-points matter:
- **Homepage "registration intelligence" section** → must read from surface C's derived definitions
  (single source), so the homepage and the dashboard can't tell different stories about the same data.
- **"Share Registration Info" / tracker CTA** → lands on the open intake form (surface A).

Everything else (About, Membership, Explorer, Evidence Library) is chrome the tracker links *out* to;
no data flows from the tracker into them.

---

*Content/data-flow spec for Jen to style. Sensitivity is inherited from `data-model-v1.md`, decided
once per field. First draft — expect edits.*
