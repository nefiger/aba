# Registration Tracker — Intake Form Spec V1 (first draft)

**Status:** First draft for Jen. Content/structure/logic only — **not visual design** (Jen owns
styling). Derived from `data-model-v1.md`. Expect edits.

**What this form is.** A single, open submission form. Anyone — ABA member or not — reaches it from a
link, fills it in, and submits data *about* their Act 36 registration(s) so ABA can build
sector-intelligence and advocacy assets. **ABA is not the registrar.** Low-friction to start; rigorous
in what it captures.

**Two rules it obeys** (from the data model):
- **Access = open.** No login, no membership gate. Membership is one optional field.
- **Data rigor = full Act 36 alignment**, for everyone — as rigorous as the Act 36 process *map*, not
  as heavy as the *application* (readiness flags, never the dossier).

**What one completed form creates:** a `Submission` → one `Organisation` + one-or-more
`Product` + `Application` + opening `StatusLogEntry`.

---

## Field legend
- **Req** = required to submit · **Opt** = optional · **Auto** = system/derived (not entered)
- **Cond** = shown only under a condition (stated)

---

## Section 0 — Intro + notice (no gate)
- Short plain-language intro: what this is, that it's open to anyone, and that it's not legal/regulatory advice.
- **POPIA/privacy notice** (concise): ABA uses this for internal review, anonymised sector evidence,
  and — only with your consent — named/registrar-facing use.
- **Responsible attestation** — `Req`, single checkbox: *"I'm responsible for, or authorised to report,
  this product's registration."* This is a **data-quality attestation, not an auth gate** — it does not
  stop anyone; it just discourages third-party reporting on products they don't own.

## Section 1 — Your details
| Field | Req/Opt | Type | Notes |
|---|---|---|---|
| Contact name | Req | text | PII |
| Email | Req | email | return-link handle; PII |
| Phone | Opt | tel | PII — optional |
| Role / title | Opt | text | |
| Permission to contact | Req | checkbox | POPIA basis for follow-up |
| Company name | Req | text | never shown publicly |
| Company country | Req | select | drives geographic aggregates |
| Company role | Req | select | manufacturer / importer / local registration holder / distributor / other |
| ABA relationship | Opt | select | Full member / Technical partner / Observer / Non-member / Not sure — **optional, self-reported, not a gate** |

## Section 2 — Product
| Field | Req/Opt | Type | Notes |
|---|---|---|---|
| Product name | Req | text | never shown publicly |
| Functional category | Req | select | biofertiliser / biopesticide / biostimulant / not sure |
| Country of application | Req | select | |
| Governing regime | Req | select | Agriculture·Act 36 / public-health pest / water treatment / other |
| Legal pathway | Cond·Req | select | **only if regime = Act 36**: Agricultural remedy / Fertilizer / Not sure |
| Data path | Cond·Opt | select | only if Act 36: 5-batch / CoA / botanical Cat 1-3 — optional sector slice |

- **"Not sure" is always a valid answer** — never force a guess.
- Show a passive helper: functional category *maps to* the registrar's function axis (provisional).

## Section 3 — Registration / application  *(the core, one application at a time)*

> **Scope note (D7, data-model-v1 §8/§11):** the selector below covers the full union taxonomy
> (registration + amendment + renewal + permits & certificates + appeal) as an initial, reversible
> scope call — not just new registration. If this proves too much selector for a low-friction form,
> the peel-back to registration + renewal only is a single-table edit; see the D7 callout for the
> exact list and rationale.

| Field | Req/Opt | Type | Notes |
|---|---|---|---|
| Service / application type | Req | select (grouped) | SRF `14ARx`, clock-granularity (new molecule / generic / parallel / renewal / amendment / …) |
| Official timeframe | Auto | display | benchmark days for the chosen type (read-only, informational) |
| Current status | Req | select | maps 1:1 to official stage (shown as a badge) |
| Official stage | Auto | display | derived from status |
| Date this status began | Req | date | + **"approximate" toggle** |
| File reference (pre-registration) | Cond·Opt | text | Registrar file no.; **only if a reference exists** |
| File reference status | Req | select | provided / not issued / unknown / lost *(submitter-reported)* |
| — reason (if not provided) | Cond·Req | text | required when status ≠ provided |
| Registration number (L) | Cond·Auto | display | **read-only; shown only if status = approved/registered**; never entered |
| Dossier ready? | Req | Y/N | readiness flag only — never upload the dossier |
| Proof of payment attached? | Req | Y/N | attached flag only — never upload the document |
| 3-year term / renew-by note | Cond | display | shown if service type = renewal OR status = registered |

- **Status log:** first entry is created from the above; UI may allow adding earlier dated entries so
  the timeline reads as history even with one entry. Wait-time is computed from these dates.

## Section 4 — Applicant accountability  ⚑ OPTIONAL MODULE — DECIDED: include, optional, non-gating
> **Decision (data model §6 / D1, closed):** include, optional, skippable, non-gating — blocks nobody.
> If a future review drops it, remove this whole section — nothing else in the form changes.

| Field | Req/Opt | Type | Notes |
|---|---|---|---|
| Approved person (name) | Opt | text | Act 36 accountable individual — **most sensitive PII in the form** |
| Their role | Opt | text | |
| Resident in SA / SA-registered office | Opt | select | eligibility signal |
| SACNASP verification status | Opt | select | verified / not verified / unknown; do not require a raw number in v1 |
| Acting under letter of authority? | Opt | checkbox | third-party mandate |

- Present as a collapsible/skippable block with a one-line explainer: *"Optional — helps make the
  record a complete Act 36 application; skip if you'd rather not."*

## Section 5 — Consent + submit
| Field | Req/Opt | Type | Notes |
|---|---|---|---|
| Internal ABA review | Auto·on | checkbox (disabled) | required to process at all |
| Anonymised public aggregate use | Req | checkbox | **default ON** |
| Named / registrar-facing use | Opt | checkbox | **default OFF (opt-in)**; for non-members captured as *permission, not a promise* |
| Save draft + email return link | action | button | sets `saved_at` only — **not** a submission |
| Submit for ABA | action | button | sets system `submitted_at` |
| Add another application / product / finish | action | buttons | multi-application capture |

- **No submission timestamp is ever an input** — set only by the system on submit.

---

## Conditional logic (summary)
- **Regime = Act 36** → show legal pathway, data path, service-type benchmark, L-number logic. Other
  regimes hide the Act 36 block (awareness-only capture; excluded from backlog metrics).
- **Status = approved/registered** → reveal read-only L-number; show renew-by note.
- **File reference status ≠ provided** → require a reason.
- **Service type = renewal** → show 3-year term / renew-before-31-May note.
- **Optional module** → skippable; never blocks submit.

## Validation (minimum to submit)
Required: responsible attestation · contact name + email + permission · company name + country + role ·
product name + category + country + regime (+ pathway if Act 36) · service type · current status + date
began · file-reference status (+ reason if not provided) · dossier + payment flags · public-aggregate
consent decision. Everything in Section 4 and phone/data-path are optional.

## States to support
- Fresh open form (default). · Draft saved + return-by-email. · Submitted confirmation.
- Missing dossier/payment → **can still submit** (flagged not-yet-ready), not blocked.
- Multi-application: return to Section 3 for "add another."
- Non-Act 36 regime → reduced form (no Act 36 block).

---

*Fictional placeholder values only. Regulatory facts cited via `registrar-requirements-spec-v1.md`.
Structure/logic for Jen to style. First draft — expect edits.*
