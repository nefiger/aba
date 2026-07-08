# Registration Tracker — Data Model V1 (first draft)

**Status:** First draft for review with Jen (and Anna). Derived from
`registrar-requirements-spec-v1.md` (verified Phase 2 extraction), `context-and-decisions-v1.md`,
and the five reconciled area briefs. Expect edits — this is the starting point, not the final word.

**Domain frame.** This models the *paperwork* side of registering ordinary farm inputs (microbial
inoculants, plant biostimulants, biofertilisers, plant extracts, biological crop-protection products)
under the *Fertilizers, Farm Feeds, Agricultural Remedies and Stock Remedies Act, 1947 (Act 36 of
1947)*, South Africa. "Biological" refers only to the natural origin of these crop inputs. **ABA is
not the registrar** — submitters upload data *about* their registrations (which sit with the SA
registrar) so ABA can build sector-intelligence and advocacy assets.

---

## 1. Two design axes (read this first)

The model is governed by two **independent** dials that must not be conflated:

- **Access = open.** Anyone — ABA member or not — reaches the submission form from a link and
  submits. No membership gate, no login wall. Membership is one optional self-reported field.
- **Data rigor = full Act 36 alignment.** What we collect about each registration mirrors the real
  Act 36 process, *for everyone*, member or not. Rigor is **not** lightened for non-members.

## 2. How rigorous? — the capture lens (the ceiling on depth)

Rigor aligns with the **structure** of Act 36 but is capped at the **tracker's purpose** (spec §0).
Three tiers govern every field:

- **CAPTURE (rigorous, Act 36-exact):** the registration's position and shape in the process —
  service type, official stage, status dates/wait, legal pathway, functional category, file reference
  vs L-number, dossier-readiness + proof-of-payment flags. Collected in full from everyone.
- **OPTIONAL / DECISION-PENDING:** applicant-identity (approved person, eligibility, SACNASP, letter
  of authority). Authentic Act 36 data, but a leaf — see §6 for the flagged decision.
- **NEVER (flag only):** dossier contents (chemistry, tox, efficacy), payment documents. We record
  readiness/attached flags; we never store the documents.

> **Principle:** as rigorous as the Act 36 process *map*, not as heavy as the Act 36 *application*.

## 3. Legends used below

- **Provenance:** `I` intake · `O` operator (later) · `D` derived · `L` lookup · `S` system/audit
- **Sensitivity:** `PUBLIC` aggregate-safe · `MEMBER` own-record only · `OPERATOR` internal only ·
  `NEVER` never store in tracker (secure reference only)

---

## 4. Grain and spine

Open-capture, Organisation-centred, with an intake envelope that maps to Jen's lead object.

```
Submission  (= Jen's "Registration Submission" — an intake event, not the data itself)
   └─ creates/updates one Organisation + one-or-more Product + Application records
Organisation → Product → Application → StatusLogEntry
                                    └─ (later) Attachment, ReviewDecision
```

- The **Application is the unit of backlog.** One submission = one Organisation + N Products + M
  Applications. The form guides one application at a time ("add another application / product / finish").
- Jen mapping: her single `Registration Submission` lead object decomposes into our normalized spine.
  A "submission count" (Jen) and an "application count" (backlog) are **different units** — keep them
  distinct.

---

## 5. Core entities (v1 capture core)

### Submission — the intake envelope
| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| submitted_at | S | OPERATOR→MEMBER | system-set on submit; **never an input**; public shows only aggregate ranges |
| saved_at (draft) | S | OPERATOR | draft return-link save; not a submission timestamp |
| submitter_contact_id | I | OPERATOR | FK → ContactPerson |
| responsible_attestation | I | OPERATOR | light checkbox: "I'm responsible for this product's registration" (data quality, **not** an auth gate) |
| consent_id | I | OPERATOR | FK → ConsentSetting |

### Organisation
| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| name | I | MEMBER | identifying + commercially sensitive; never public raw |
| country | I | PUBLIC | aggregate-safe |
| company_role | I,L | MEMBER | manufacturer / importer / local registration holder / distributor / other |
| aba_relationship_self | I,L | MEMBER | **optional self-reported**: Full member / Associate / Observer / Non-member / Not sure. Not a gate. |

### ContactPerson  *(PII)*
| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| name | I | OPERATOR | PII |
| email | I | OPERATOR | PII; return-link handle |
| phone (optional) | I | OPERATOR | PII; drop unless needed |
| role_title | I | OPERATOR | |
| permission_to_contact | I | OPERATOR | POPIA basis for follow-up |

### Product
| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| name | I | MEMBER | reveals pipeline; never public raw |
| functional_category | I,L | PUBLIC | biofertiliser / biopesticide / biostimulant / not sure (sector axis) |
| registrar_function | D/O,L | PUBLIC | mapped: Insecticide/Fungicide/Herbicide/Other (PGR…) — **mapping provisional** (spec §5.1) |
| legal_pathway | I,L | PUBLIC | Agricultural remedy / Fertilizer / Not sure |
| data_path_tag (optional) | I,L | OPERATOR | 5-batch / CoA / botanical Cat 1-3 — light sector slice |
| country | I | PUBLIC | |
| governing_regime | I,L | PUBLIC | Agriculture·Act 36 fully modelled; others awareness-only (see §9 regime gate) |

### Application — *the unit of backlog*
| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| service_type | I,L | PUBLIC | FK → ServiceType (SRF `14ARx`, clock-granularity) |
| status | I,L | MEMBER (named) / PUBLIC (aggregate) | FK → StatusVocabulary |
| official_stage | D | PUBLIC | derived from status via StatusVocabulary |
| official_timeframe_days | D,L | PUBLIC | lookup from ServiceType — benchmark, not stored per record |
| file_reference (pre) | I | MEMBER | pre-registration Registrar file no.; absent for pipeline |
| file_reference_status | I,L | MEMBER | provided / not issued / unknown / lost *(submitter-reported)* |
| registration_number_L (post) | O | MEMBER (mostly public record) | **nullable**; exists only once `approved / registered`; never an intake field |
| dossier_ready | I | MEMBER | readiness flag only — never the dossier |
| proof_of_payment | I | MEMBER | attached flag only — never the document |
| granted_date | O | MEMBER | post-registration |
| term_end_date | D | MEMBER | granted_date + 3 years |
| renew_by_date | D | MEMBER | before 31 May of expiry year |
| is_pipeline | D | PUBLIC | true until submitted-to-registrar; pipeline ≠ backlog |
| approved_person_id | I | OPERATOR | FK → ApprovedPerson *(optional module — §6)* |

### StatusLogEntry — the dated timeline (wait-time source of truth)
| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| application_id | S | OPERATOR | FK |
| status | I,L | MEMBER | FK → StatusVocabulary |
| official_stage | D | PUBLIC | |
| date_began | I | MEMBER (named) / PUBLIC (aggregate) | |
| is_approximate | I | MEMBER | |
| note (optional) | I | OPERATOR | free text — **never public** |

> **Wait-time is derived from these entries — never stored as a literal on the Application.**

### ConsentSetting  *(POPIA — kept even in "simple")*
| Field | Prov | Sens | Notes |
|---|---|---|---|
| allow_internal_review | I | OPERATOR | default ON |
| allow_public_aggregate | I | PUBLIC-gate | default ON — permits anonymised aggregate use |
| allow_named_use (opt-in) | I | OPERATOR | default OFF — named/registrar-facing use; for non-members captured as *permission, not a promise* |
| retention / deletion | I/O | OPERATOR | submitter may withdraw; record removable from aggregates + any packet |

---

## 6. OPTIONAL MODULE — Applicant accountability ⚑ DECISION PENDING

> **This whole block is a leaf, not a spine.** It is applicant-*identity* data — it does **not** drive
> the backlog metric, the stage pipeline, or any public asset. It can be included (optional, non-gating)
> or dropped entirely with a **localized edit and near-zero ripple** into the rest of the model, the
> form, or the downstream pages. **Decision owner: Jen + Anna (+ you).**

### ApprovedPerson  *(PII — the most sensitive data in the form)*
| Field | Prov | Sens | Notes |
|---|---|---|---|
| name | I | NEVER-public / OPERATOR | Act 36 accountable individual (signs, consents to changes, can withdraw) |
| sa_resident | I | OPERATOR | eligibility signal |
| sacnasp_no (optional) | I | OPERATOR | professional credential; consider storing a **verified boolean** rather than the number |
| letter_of_authority_ref | I | OPERATOR | when submitter ≠ registration holder (third-party mandate) |

### Eligibility (applicant standing)
| Field | Prov | Sens | Notes |
|---|---|---|---|
| sa_residency_or_office | I,L | OPERATOR | resident in SA / SA-registered office / neither (flag) |

**The tradeoff (for Jen/Anna to weigh):**

| | Include (optional, non-gating) | Defer |
|---|---|---|
| **Worth** | Registrar-facing **credibility** (records look like properly-constituted Act 36 applications); completeness; minor analytics (local-agent routing, foreign-vs-local, SACNASP scientists) | Leaner, lower-friction open form; less PII to protect |
| **Cost** | Extra optional fields; **highest PII/POPIA burden in the form** (approved-person name, SACNASP no.) | Records are thinner Act 36 representations; add later if registrar-facing use demands it |
| **Lean toward it if…** | the near-term goal is **registrar-grade evidence** | the near-term goal is **open-form volume** |

**Recommendation (implementable default until decided):** include as **optional, non-gating** in-form
fields, grouped in one skippable section, with SACNASP captured as a verified boolean rather than the
raw number. If dropped later, delete this §6 module and the `approved_person_id` FK — nothing else moves.

---

## 7. Deferred layers (named, not built in v1)

Modelled as extensible; **out of scope for the open-capture v1**:

- **Operator review / verification** — ReviewDecision (review status, data quality, verified
  relationship, public/packet eligibility, operator inclusion, bottleneck theme, duplicate/clarification).
- **Verified ABA relationship** (vs self-reported) and member-benefit branching.
- **Registrar packet / ExportPacket** — versioned evidence batches for registrar engagement.
- **Attachment storage** — secure references only; never dossier/payment documents in the tracker.

These attach to the spine without reshaping it.

---

## 8. Lookup tables (single source — kills cross-file drift)

Reference data, defined once, read everywhere (today these constants are hardcoded in ~5 wireframes):

- **ServiceType** — `key · SRF 14ARx · official_timeframe_days · evidence_ref` (spec §2.1):
  new-molecule·14AR2·627 · new-formulation·14AR2·418 · generic·14AR1·418 · parallel·14AR1·118 ·
  daughter·14AR1·118 · new-source·—·208 · renewal·14AR3·90 · major-amendment·14AR16·418 ·
  minor-amendment·14AR15·118 · … (full set in spec §2.1)
- **StatusVocabulary** — `label → official_stage · is_terminal · is_pipeline` (spec §3.1)
- **OfficialStage** — Verification · Scientific screening · Evaluation · Decision · Appeal (+ Referred-back)
- **LegalPathway** — Agricultural remedy · Fertilizer · Not sure
- **FunctionalCategory ↔ RegistrarFunction** — mapping *(provisional, spec §5.1)*
- **BottleneckTheme · ABARelationshipType · Country · Regime** — controlled lists

---

## 9. Cross-cutting rules

- **Regime gate.** `service_type`, `legal_pathway`, `registration_number_L`, and the official-timeframe
  benchmarks exist **only under Agriculture / Act 36**. Non-Act 36 records (public-health pest, water
  treatment) carry none of these and are **excluded from backlog/benchmark metrics** (awareness-only).
- **L-number lifecycle.** `registration_number_L` is null until the Application reaches
  `approved / registered`; it is a post-registration attribute, never asked at intake.
- **Two vocabularies, not one.** Reference and proof each have a *submitter-reported* value (intake) and,
  later, an *operator-verified* value (review). V1 captures the submitter-reported side; the verified
  side belongs to the deferred operator layer.
- **Audit.** `submitted_at` is system-set on submission only; draft `saved_at` must never imply a
  submission timestamp; public views expose only aggregate timestamp ranges.
- **POPIA.** Consent + retention/deletion are first-class; approved-person/contact PII is `OPERATOR`/
  `NEVER-public`; cross-border processing (non-SA submitters) flagged for the compliance owner.

---

## 10. Derived metrics (defined once; computed, never stored)

The public/sector assets read these definitions (from `public-dashboard-brief-v2.md`):

- **open** = Applications not in a terminal status.
- **backlog** = open AND `open_days > ServiceType.official_timeframe_days` (threshold = the statutory clock).
- **median / worst wait** = median / max of open-durations (from StatusLog).
- **product-years waiting** = Σ open-durations ÷ 365.
- **by official stage · by service-type-vs-benchmark · by pathway/category/country/bottleneck** = group open set.
- **suppression** = any breakdown cell with contributing count < `k` rendered *Suppressed*, applied
  **after** filtering and on **cross-tab combinations** (not just single-axis counts).

---

## 11. Open decisions register (for Jen / Anna / you)

| # | Decision | Default in this draft | Owner |
|---|---|---|---|
| D1 | Applicant-accountability module (§6) — include optional vs defer | Include, optional, non-gating; SACNASP as boolean | Jen + Anna |
| D2 | Public member/non-member segmentation — privacy sign-off | Neutral filter with cross-tab suppression | Jen + Anna |
| D3 | Functional-category → registrar-function mapping | Provisional table, pending specialist | Specialist |
| D4 | Median wait definition — total open duration vs time-in-stage | Total open duration | Team |
| D5 | Registrar packet scope — in-process only vs include registered | Deferred (operator layer) | Team |
| D6 | Biostimulant pathway (claim-based split) | Documentary reading, flagged | Specialist |

---

*All illustrative values are fictional. Regulatory facts are cited to
`registrar-requirements-spec-v1.md`. This is a first draft intended for iteration.*
