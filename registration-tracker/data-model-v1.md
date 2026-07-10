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
- **OPTIONAL (D1 — decided, included):** applicant-identity (approved person, eligibility, SACNASP,
  letter of authority). Authentic Act 36 data, but a leaf — included as optional, non-gating; see §6.
- **NEVER (flag only):** dossier contents (chemistry, tox, efficacy), payment documents. We record
  readiness/attached flags; we never store the documents.

> **Principle:** as rigorous as the Act 36 process *map*, not as heavy as the Act 36 *application*.

## 3. Legends used below

- **Provenance:** `I` intake · `O` operator (later) · `D` derived · `L` lookup · `S` system/audit
- **Sensitivity:** `PUBLIC` aggregate-safe · `MEMBER` own-record only · `OPERATOR` internal only ·
  `NEVER` never store in tracker (secure reference only). Below, these four base values are sometimes
  combined: `A(named) / B(aggregate)` means tier A applies to the record-level value, tier B to its
  aggregate; `A→B` means the field starts at tier A and is promoted to tier B on some event (e.g. a
  submission is OPERATOR-only until reviewed, then MEMBER-visible); `-gate` (e.g. `MEMBER + PUBLIC-gate`)
  marks a field that doesn't hold public data itself but controls whether *other* fields on the same
  record may flow into PUBLIC aggregates.

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
| submitted_at | S | MEMBER (named) / PUBLIC (aggregate) | system-set on submit; **never an input**; visible to the submitting org from the start (context §"Submission Timestamp Rule" — operator/company/registrar views may all show it); public shows only aggregate ranges |
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
| aba_relationship_self | I,L | MEMBER | **optional self-reported**: Full member / Technical partner / Observer / Non-member / Not sure. Not a gate. |

### ContactPerson  *(PII)*

> **Sensitivity principle (same rule as §6 ApprovedPerson):** PII the submitter enters about
> themselves or their own people is **MEMBER (own-record)** — the submitting org can see its own
> contact details, they are **never public raw**, and the operator may use them for follow-up.
> Previously this block was tagged OPERATOR, which inconsistently hid a company's own contact record
> from itself while §6 ApprovedPerson (identical kind of data) was MEMBER. Corrected here so the
> principle is applied the same way to both.

| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | internal surrogate key |
| name | I | MEMBER (own-record) | PII; never public raw |
| email | I | MEMBER (own-record) | PII; return-link handle; never public raw |
| phone (optional) | I | MEMBER (own-record) | PII; drop unless needed |
| role_title | I | MEMBER (own-record) | |
| permission_to_contact | I | MEMBER (own-record) | POPIA basis for operator follow-up |

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
| status | D | MEMBER (named) / PUBLIC (aggregate) | **= latest StatusLogEntry.status** — a denormalised cache, **not** an independent field. StatusLog is the source of truth (see StatusLogEntry note below; §10 metrics are computed, never stored). FK → StatusVocabulary |
| official_stage | D | PUBLIC | derived from latest StatusLogEntry.status via StatusVocabulary |
| official_timeframe_days | D,L | PUBLIC | lookup from ServiceType — benchmark, not stored per record |
| file_reference (pre) | I | MEMBER | pre-registration Registrar file no.; absent for pipeline |
| file_reference_status | I,L | MEMBER | provided / not issued / unknown / lost *(submitter-reported)* |
| registration_number_L (post) | O | MEMBER | **nullable**; exists only once `approved / registered`; never an intake field. Externally an L-number is gazetted public record, but inside the tracker it is **MEMBER** — it directly identifies a company + product, so putting it on the public aggregate surface would break record anonymisation. Clean call, not a hedge. |
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

> **Sensitivity note:** these are the submitter's *own* consent choices, so the base tier is
> **MEMBER** (own-record only), not OPERATOR — a company must be able to see what it agreed to.
> `allow_public_aggregate` carries the additional **PUBLIC-gate** role: it doesn't become public
> itself, it *controls whether the record's other fields* are allowed to flow into PUBLIC
> aggregates. (Previous draft marked this whole entity OPERATOR while its own Notes column said
> "submitter may withdraw" — a self-contradiction; corrected here.)

| Field | Prov | Sens | Notes |
|---|---|---|---|
| allow_internal_review | I | MEMBER | default ON |
| allow_public_aggregate | I | MEMBER + PUBLIC-gate | default ON — permits anonymised aggregate use |
| allow_named_use (opt-in) | I | MEMBER | default OFF — named/registrar-facing use; for non-members captured as *permission, not a promise* |
| retention / deletion | I/O | MEMBER | submitter may withdraw; record removable from aggregates + any packet |

---

## 6. OPTIONAL MODULE — Applicant accountability ⚑ DECIDED: include, optional, non-gating

> **Decision (D1, closed):** include, as **optional and non-gating**. SACNASP captured as a
> **verification state**, not a raw registration number by default. **This whole block is a leaf, not a spine** — it is
> applicant-*identity* data and does **not** drive the backlog metric, the stage pipeline, or any
> public asset. If a future review drops it, the edit is localized and near-zero-ripple: delete this
> §6 module and the `approved_person_id` FK — nothing else moves.
>
> **Note on the spec's bucketing:** `registrar-requirements-spec-v1.md` §0/§7 sorts approved-person
> and eligibility into its **CAPTURE** bucket (G13, G14) — i.e. authentic, spec-mandated Act 36 data.
> This model deliberately demotes that CAPTURE-bucket data to an optional leaf here, because the
> tracker's own purpose test (backlog metric + sector view) doesn't need applicant identity to
> function. That's a considered override, not an oversight — recorded here so a future reader doesn't
> mistake the demotion for a gap against the spec.

### ApprovedPerson  *(PII — the most sensitive data in the form)*
| Field | Prov | Sens | Notes |
|---|---|---|---|
| name | I | MEMBER (own-record) / NEVER-public | Act 36 accountable individual (signs, consents to changes, can withdraw) |
| sa_resident | I | MEMBER (own-record) | eligibility signal |
| sacnasp_verified (optional) | I | MEMBER (own-record) | professional credential captured as a verification state such as verified / not verified / unknown, not a raw number by default |
| letter_of_authority_ref | I | MEMBER (own-record) | when submitter ≠ registration holder (third-party mandate) |

### Eligibility (applicant standing)
| Field | Prov | Sens | Notes |
|---|---|---|---|
| sa_residency_or_office | I,L | MEMBER (own-record) | resident in SA / SA-registered office / neither (flag) |

> **Sensitivity correction:** this whole module was previously tagged OPERATOR (internal-only),
> which would hide a company's own submitted accountable-person data from its own dashboard. It's
> the submitter's own data about their own accountable person, so the base tier is **MEMBER**
> (own-record only) like the rest of the submitter's record — never OPERATOR-only, and never
> public raw. `page-feed-map-v1.md`'s matrix is updated to match.

**The tradeoff that was weighed:**

| | Include (optional, non-gating) — **chosen** | Defer |
|---|---|---|
| **Worth** | Registrar-facing **credibility** (records look like properly-constituted Act 36 applications); completeness; minor analytics (local-agent routing, foreign-vs-local, SACNASP-verified participation) | Leaner, lower-friction open form; less PII to protect |
| **Cost** | Extra optional fields; **highest PII/POPIA burden in the form** (approved-person name and accountability details) | Records are thinner Act 36 representations; add later if registrar-facing use demands it |

---

## 7. Deferred layers (named, not built in v1)

Modelled as extensible; **out of scope for the open-capture v1**:

- **Operator review / verification** — ReviewDecision (review status, data quality, verified
  relationship, public/packet eligibility, operator inclusion, bottleneck theme, duplicate/clarification).
- **Verified ABA relationship** (vs self-reported) and member-benefit branching.
- **Registrar packet / ExportPacket** — versioned evidence batches for registrar engagement.
  **Scope decided (D5): in-process applications only** — already-registered records are never packet
  candidates.
- **Attachment storage** — secure references only; never dossier/payment documents in the tracker.

These attach to the spine without reshaping it.

---

## 8. Lookup tables (single source — kills cross-file drift)

Reference data, defined once, read everywhere (today these constants are hardcoded in ~5 wireframes):

- **ServiceType** — `key · SRF 14ARx · official_timeframe_days · evidence_ref` (spec §2.1):
  new-molecule·14AR2·627 · new-formulation·14AR2·418 · generic·14AR1·418 · parallel·14AR1·118 ·
  daughter·14AR1·118 · reinstatement·14AR1·118 · new-source·—·208 · renewal·14AR3·90 ·
  major-amendment·14AR16·418 · minor-amendment·14AR15·118 · … (full set in spec §2.1). **All four
  types sharing SRF code `14AR1`** (generic/parallel/daughter/reinstatement) must stay listed
  individually here — collapsing them loses the day-count split that's the entire reason for
  union-granularity keying (spec Finding 1).
- **StatusVocabulary** — `label → official_stage · is_terminal · is_pipeline` (spec §3.1)
- **OfficialStage** — Verification · Scientific screening · Evaluation · Decision · Appeal (+ Referred-back)
- **LegalPathway** — Agricultural remedy · Fertilizer · Not sure
- **FunctionalCategory ↔ RegistrarFunction** — mapping *(provisional, spec §5.1)*
- **BottleneckTheme · ABARelationshipType · Country · Regime** — controlled lists

> **Scope decision (D7, initial and reversible): full union taxonomy vs. registration + renewal only.**
> v1 ships the *whole* union taxonomy — registration, amendment, renewal, permits & certificates,
> appeal — because a company's relationship with the registrar isn't just "get a new registration": a
> 3-year term forces renewal (with a harsher late-renewal fee), amendments happen more often than new
> registrations in a mature sector, and appeal was a literal gap in the old model (no status mapped to
> it at all). Leaving any of these out understates the sector's real friction, which weakens the
> advocacy evidence this tracker exists to build.
>
> **That said — this is an initial scope call, not a load-bearing architecture decision, and the cost
> is real:** it pushes the intake service-type selector to ~25 grouped options against a "low-friction
> open form" goal. If intake friction or scope pressure argues for a leaner v1, **the peel-back path
> is cheap and explicit** because this table is the single source everything else reads from:
> 1. Keep only the **Registration** family — new-molecule, new-formulation, generic, parallel,
>    daughter, reinstatement, new-source — and the **Renewal** family — renewal, late-renewal.
> 2. Drop amendment / permits-&-certificates / appeal entries from this table and from the intake
>    selector's groups (`intake-form-spec-v1.md` §3, `intake-flow-brief-v2.md` Screen 4).
> 3. Nothing else moves: the spine, sensitivity model, and derived metrics are keyed off whatever
>    `ServiceType` rows exist, not off the count of rows — narrowing this list is a single-table edit,
>    not a schema change.

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
- **POPIA.** Consent + retention/deletion are first-class; approved-person + contact PII is
  **`MEMBER` (own-record)** — visible to the submitting org, **never public raw**, operator-usable for
  follow-up (aligned with §5 ContactPerson and §6 ApprovedPerson); cross-border processing (non-SA
  submitters) flagged for the compliance owner.

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

## 11. Decisions register (for Jen / Anna / you)

| # | Decision | Status | Owner |
|---|---|---|---|
| D1 | Applicant-accountability module (§6) — include optional vs defer | **Decided:** include, optional, non-gating, reviewable; SACNASP as boolean (see §6) | Closed |
| D2 | Public member/non-member segmentation — privacy sign-off | **Decided: no public filter in v1.** All reviewed submissions shown as one pool; member/non-member stays an internal classification only, never a public control. Revisit later if the advocacy story needs it | Closed |
| D3 | Functional-category → registrar-function mapping | Provisional table, flagged for **regulatory specialist** consultation — not a Jen/Anna decision | Specialist |
| D4 | Median wait definition — total open duration vs time-in-stage | **Decided (revisable): total open duration.** Cheap to change later — it's a derived metric, not stored data | Closed |
| D5 | Registrar packet scope — in-process only vs include registered | **Decided: in-process applications only.** Already-registered records are never packet candidates | Closed |
| D6 | Biostimulant pathway (claim-based split) | Documentary reading, flagged for **regulatory specialist** consultation — not a Jen/Anna decision | Specialist |
| D7 | Service-type breadth — full union taxonomy vs. registration+renewal only | **Chosen for v1:** full taxonomy (see §8 callout for rationale + peel-back path). Initial scope call, not architectural — revisit if intake friction becomes a problem | Team |
| D8 | Tracker → CRM organisation identity / continuity linkage — how open (no-login) submissions link to one canonical `Organization` over time | **Open — with Jen (CRM).** Her capture model already frames this (Journey E "continuity"; the tracker's flagged "missing CRM linkage" in `aba-public-capture-field-map.md`). Tracker should **defer to the CRM's matching** and capture the same key the membership side uses (business registration number + name + country + acquisition source), **not invent its own dedupe**. Entity-name alignment (our `Organisation`/`ContactPerson`/`Submission` ↔ CRM `Organization`/`Person`/`RegistrationSubmission`) folds in here — resolve when the handoff is designed, not before | Jen (CRM) |
| D9 | Post-registration attribute provenance + home of the verified registration lifecycle (L-number, grant/expiry) | **Open — with Jen (CRM).** Registrar-owned facts: submitter-*reported* now, operator-*verified* later (the "two vocabularies" pattern, §9). The CRM `Product` record is the likely home for the verified lifecycle. Confirm whether the CRM will hold per-product registration lifecycle so the tracker captures toward that shape. **Note:** tracker "renewal" (Act 36, 3-year term) ≠ CRM "renewals" (membership dues) — keep distinct | Jen (CRM) |

---

*All illustrative values are fictional. Regulatory facts are cited to
`registrar-requirements-spec-v1.md`. This is a first draft intended for iteration.*
