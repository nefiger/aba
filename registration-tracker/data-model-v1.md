# Registration Tracker — Source-Grounded Model Note V1

**Status:** Reconciled V1 model note (30 July 2026).

## 2026-07-30 workshop reconciliation

The following decisions supersede older exploratory language in this note:

- `Person`, `Organization`, and `OrganizationPersonRole` are shared across tracker, membership, and
  CRM journeys. `OrganizationPersonRole` carries role, authority, and primary-contact context.
- A tracker participant who later becomes a member reuses the same records and history. Only the
  production matching and duplicate-resolution algorithm remains open.
- Intake creates or matches one `Person`, one `Organization`, one `Product`, and one `Application`.
- One scoped V1 intake concerns one new-product `Application` for one `Product`. `Product` remains a
  separate durable record and may have later applications or lifecycle events.
- V1 begins after the regulator's Application Form, accompanying Service Request Form, and proof of
  payment have all been submitted. The tracker records three affirmative confirmations; it does not
  store those documents.
- Application intake metadata uses `submitter_person_id` and `submitter_role_id` for the shared
  records, plus required `application_form_submitted`, `service_request_form_submitted`, and
  `proof_of_payment_submitted` booleans. Older `submitter_contact_id`, `dossier_ready`,
  proof-readiness, and pre-submission `is_pipeline` fields are not active V1 intake fields.
- V1 does not introduce a separate Service Request entity. Administrative receipt and submission
  facts remain metadata on `Application`.
- Status has four distinct layers: application/service type, participant-reported current status,
  mapped official regulator stage, and ABA record lifecycle (`active` or `complete`).
- Status history is append-only. Participant and ABA-admin updates and participant reminders are
  production requirements. Each entry records reporting source, actor, and recorded timestamp;
  corrections append a superseding entry.
- Public insights derive only from reviewed `Application` records, never directly from `Person`,
  `ConsentSetting`, `Product`, or raw intake records.
- The active V1 intake exposes only the five approved new-registration types. The broader source
  taxonomy remains reference data for later releases.
- The active tracker uses a required, initially unchecked acknowledgement for combined, non-named
  insight use. The older optional aggregate and named-use controls below are superseded. A future
  named regulator-facing use would require a separate purpose-specific permission.

This file only covers the registration-tracker / regulatory slice.
The whole ABA system model for the workshop is in:

- `docs/requirements/aba-system-model-workshop-reference.md`

This file has been checked against the original regulator documents now stored in this repo at:

- `registration-tracker/reference/regulator-source-docs/Application form_16.08.2023_Final.docx`
- `registration-tracker/reference/regulator-source-docs/Service Request Form for Agricultural Remedies (2).doc`
- `registration-tracker/reference/regulator-source-docs/Guide-Reg-Process-Agric-Remedies-2015  (time frame).pdf`
- `registration-tracker/reference/regulator-source-docs/Guidelines on Data Requirements for Agricultural Remedies 2015 AVCASA.pdf`

The same files were originally supplied locally as:

- `Application form_16.08.2023_Final.docx`
- `Service Request Form for Agricultural Remedies (2).doc`
- `Guide-Reg-Process-Agric-Remedies-2015 (time frame).pdf`
- `Guidelines on Data Requirements for Agricultural Remedies 2015 AVCASA.pdf`

**How to read this note:**

- if a statement is tied directly to the regulator documents, treat it as **source-grounded**
- if a statement is a tracker structure or CRM mapping, treat it as **our modelling proposal**
- if the documents do not settle something cleanly, treat it as an **open question**

**Domain frame.** This models the *paperwork* side of registering ordinary farm inputs (microbial
inoculants, plant biostimulants, biofertilisers, plant extracts, biological crop-protection products)
under the *Fertilizers, Farm Feeds, Agricultural Remedies and Stock Remedies Act, 1947 (Act 36 of
1947)*, South Africa. "Biological" refers only to the natural origin of these crop inputs. **ABA is
not the registrar** — submitters upload data *about* their registrations (which sit with the SA
registrar) so ABA can build sector-intelligence and advocacy assets.

---

## 0. What is source-defined vs what is our model

The source documents are strong enough to ground several important business terms and process rules.
They are **not** strong enough to justify presenting the entire tracker model as if it came
directly from the regulator corpus.

### Source-defined in the regulator documents

These are clearly present in the documents:

- `application` as the formal unit being completed, signed, submitted, screened, evaluated,
  withdrawn, decided, and appealed
- application/service categories
- approved-person responsibilities
- receipt/file-number/application-reference mechanics
- the verification -> screening -> evaluation -> decision -> appeal process

*[Application form_16.08.2023_Final.docx, "Information for Applicants"; Service Request Form for
Agricultural Remedies (2).doc, Instructions and Tables 1-3; Guide-Reg-Process-Agric-Remedies-2015
(time frame).pdf, §§4-6; Guidelines on Data Requirements for Agricultural Remedies 2015 AVCASA.pdf,
§§2-4.]*

### Our tracker-side modelling

These are useful ABA modelling choices, but they are still **our structure**, not regulator wording:

- splitting one received packet into `Organisation`, `Product`, `Application`, and `StatusLogEntry`
- deciding whether receipt/admin details should live on the application or in a separate stored record
- mapping this model onto Jen's CRM objects

### Open questions

These still need explicit confirmation rather than assumption:

- the production matching and duplicate-resolution algorithm for shared records
- final privacy, retention, and publication-threshold policy
- whether a later release needs a first-class received-packet or Service Request record for broader
  service types

## 1. Design constraints

This model is governed by two independent constraints:

- **Access = open.** Anyone — ABA member or not — reaches the submission form from a link and
  submits. No membership gate, no login wall. Membership is one optional self-reported field.
- **Data rigor = full Act 36 alignment.** What we collect about each registration mirrors the real
  Act 36 process, *for everyone*, member or not. Rigor is **not** lightened for non-members.

## 2. Capture policy

Capture aligns with the **structure** of Act 36 but is capped at the **tracker's purpose**.
Use three capture levels:

- **CAPTURE (rigorous, Act 36-exact):** the registration's position and shape in the process —
  service type, official stage, status dates/wait, legal pathway, functional category, file reference
  vs L-number, dossier-readiness + proof-of-payment flags. Collected in full from everyone.
- **OPTIONAL (D1 — decided, included):** applicant-identity (approved person, eligibility, SACNASP,
  letter of authority). Authentic Act 36 data, but **not part of the core backlog model**. Included as
  optional, non-gating; see §5.
- **NEVER (flag only):** dossier contents (chemistry, tox, efficacy), payment documents. We record
  readiness/attached flags; we never store the documents.

**Principle:** capture the Act 36 process *map*, not the full Act 36 dossier.

---

## 3. Model boundary

The regulator documents are clear about the **application** grain.
They also show receipt/admin handling around the service request form.
They do **not** clearly define a second formal business object called `submission`.

### 3.1 Source-defined concepts

- The corpus consistently treats an **application** as the formal unit that is completed, signed,
  submitted with fees and supporting documents, screened, evaluated, altered, withdrawn, decided, and
  appealed. *[Application form_16.08.2023_Final.docx, "Information for Applicants"; Guide-Reg-
  Process-Agric-Remedies-2015 (time frame).pdf, §§4-6; Guidelines on Data Requirements for
  Agricultural Remedies 2015 AVCASA.pdf, §§2-4.]*
- The Service Request Form shows that one received packet may include the relevant application form(s)
  plus supporting documentation, multiple requested services, and multiple product rows, and that the
  Registrar records receipt through a stamped front page, `File no.`, and `Application Reference No.`.
  *[Service Request Form for Agricultural Remedies (2).doc, Instructions, "For official use only",
  Table 1, and Table 3.]*
- The official process flow is application-centred: verification, scientific screening, evaluation,
  decision, and appeal, with time frames by application category. *[Guide-Reg-Process-Agric-
  Remedies-2015 (time frame).pdf, §6 and Table 1.]*

#### Official process / status ladder from the source documents

- `Verification`
- `Scientific screening`
- `Evaluation`
- `Decision`
- `Appeal`

These are the source-defined process stages the tracker should anchor to before it introduces any
additional product-side statuses.

### 3.2 How the application form and service request form relate

- The `Application form` is the detailed regulator form for the registration matter itself. It is
  titled `APPLICATION FOR THE REGISTRATION OF AN AGRICULTURAL REMEDY` and is written around a single
  applicant and a single product dossier. *[Application form_16.08.2023_Final.docx, title page and
  product section.]*
- The `Service Request Form` says it must be submitted **with the relevant application form(s) and
  supporting documentation**. It captures requested services, payment details, receipt details, and
  product rows. *[Service Request Form for Agricultural Remedies (2).doc, Instructions and Tables
  1-3.]*
- Table 1 of the Service Request Form captures the kinds of services requested and their quantities.
- Table 3 lists product names, service(s) required for each, and official-use `Application Reference
  No.` handling.
- The safest reading is therefore: the Service Request Form acts as a cover / receipt / service-summary
  form for one or more underlying application forms.

What this supports:

- one received packet may contain more than one application
- one received packet may contain more than one product row
- ABA may need receipt/admin details as well as application records

What this does not settle cleanly:

- whether ABA should store the received packet as its own first-class record
- the final rule for product-to-application cardinality in the tracker model

### 3.3 ABA tracker modelling

The current tracker model may still be the right design move, but it should be labelled plainly as
**ABA-side modelling**, not as if the regulator documents themselves define it:

```
Application
   └─ carries intake / receipt metadata if ABA needs it operationally
Organisation → Product → Application → StatusLogEntry
                                    └─ (later) Attachment, ReviewDecision
```

- The official categories, fees, completeness tests, stages, decisions, and time frames are all
  defined at application level, so `Application` is the record whose regulatory progress ABA should
  track over time.
- Intake / receipt metadata may still be useful operationally, but in this note it should not be
  described as a second source-defined business object.
- Jen mapping may still be practical for implementation, but it is integration shorthand, not
  regulator terminology.

### 3.4 Open questions and required validation

- Does the tracker need anything more than `Application` plus receipt/audit metadata to cover the
  required history?
- When one service request form covers multiple product rows and multiple service types, what is the
  correct tracker grain for one received packet versus many applications?
- Once the original source files are added to the repo, all downstream notes that currently assume a
  settled `Organisation -> Product -> Application` spine should be rechecked against the
  primary files.

---

## 4. Core entities (tracker-side v1 capture proposal)

Unless a subsection explicitly says otherwise, the entities below should be read as **tracker-side
modelling proposals** built to support ABA's product needs. They are not all terms that appear as
standalone business objects in the regulator corpus.

### Application intake / receipt metadata

> **Source note:** the corpus describes an application being submitted, received, stamped, and
> assigned a file/reference number, but it does **not** clearly define a separate formal business
> object for that administrative packet. These fields should therefore be read as application-level
> intake or receipt metadata unless ABA deliberately decides to store a separate received-packet
> record. *[Application form_16.08.2023_Final.docx,
> "Information for Applicants"; Service Request Form for Agricultural Remedies (2).doc, Instructions
> and "For official use only"; Guide-Reg-Process-Agric-Remedies-2015 (time frame).pdf, §§5.5-5.7.]*

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| submitted_at | S | MEMBER (named) / PUBLIC (aggregate) | system-set on submit; **never an input**; visible to the submitting org from the start (context §"Application Submit Timestamp Rule" — operator/company/registrar views may all show it); public shows only aggregate ranges |
| saved_at (draft) | S | OPERATOR | draft return-link save; not an application submission timestamp |
| submitter_contact_id | I | OPERATOR | FK → ContactPerson |
| responsible_attestation | I | OPERATOR | light checkbox: "I'm responsible for this product's registration" (data quality, **not** an auth gate) |
| consent_id | I | OPERATOR | FK → ConsentSetting |

### Organisation

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | |
| name | I | MEMBER | identifying + commercially sensitive; never public raw |
| country | I | PUBLIC | aggregate-safe |
| company_role | I,L | MEMBER | manufacturer / importer / local registration holder / distributor / other |
| aba_relationship_self | I,L | MEMBER | **optional self-reported**: Full member / Technical partner / Observer / Non-member / Not sure. Not a gate. |

### Legacy ContactPerson capture  *(superseded by shared Person and OrganizationPersonRole)*

> **Sensitivity principle (same rule as §5 ApprovedPerson):** PII the submitter enters about
> themselves or their own people is **MEMBER (own-record)** — the submitting org can see its own
> contact details, they are **never public raw**, and the operator may use them for follow-up.
> Previously this block was tagged OPERATOR, which inconsistently hid a company's own contact record
> from itself while §5 ApprovedPerson (identical kind of data) was MEMBER. Corrected here so the
> principle is applied the same way to both.

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

| Field | Prov | Sens | Notes |
|---|---|---|---|
| id | S | OPERATOR | internal surrogate key |
| name | I | MEMBER (own-record) | PII; never public raw |
| email | I | MEMBER (own-record) | PII; return-link handle; never public raw |
| phone (optional) | I | MEMBER (own-record) | PII; drop unless needed |
| role_title | I | MEMBER (own-record) | |
| permission_to_contact | I | MEMBER (own-record) | POPIA basis for operator follow-up |

### Product

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

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

### Application — source-defined, and the record ABA tracks over time

> **Source note:** `Application` is explicit in the corpus: application categories, fees, completeness
> checks, approved-person responsibilities, screening/evaluation/decision flow, and official time
> frames are all defined at application level. The tracker's progress logic should therefore stay
> application-centred. *[Application form_16.08.2023_Final.docx, "Information for Applicants"; Service
> Request Form for Agricultural Remedies (2).doc, Table 1 and Table 3; Guide-Reg-Process-Agric-
> Remedies-2015 (time frame).pdf, §§3-6; Guidelines on Data Requirements for Agricultural Remedies
> 2015 AVCASA.pdf, §§2-4.]*

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

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
| approved_person_id | I | OPERATOR | FK → ApprovedPerson *(optional module — §5)* |

### StatusLogEntry — inferred tracker timeline built from source-defined stages

> **Source note:** the corpus defines application stages, stage-specific review flow, and time frames,
> but it does not prescribe a `StatusLogEntry` table. The tracker timeline is therefore a source-
> grounded implementation choice rather than a quoted source entity. *[Guide-Reg-Process-Agric-
> Remedies-2015 (time frame).pdf, §6 and Table 1.]*

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

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

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

| Field | Prov | Sens | Notes |
|---|---|---|---|
| allow_internal_review | I | MEMBER | default ON |
| allow_public_aggregate | I | MEMBER + PUBLIC-gate | default ON — permits anonymised aggregate use |
| allow_named_use (opt-in) | I | MEMBER | default OFF — named/registrar-facing use; for non-members captured as *permission, not a promise* |
| retention / deletion | I/O | MEMBER | submitter may withdraw; record removable from aggregates + any packet |

---

## 5. Optional module: applicant accountability

> **Decision (D1, closed):** include, as **optional and non-gating**. SACNASP is captured as a
> **verification state**, not a raw registration number by default. This whole block is
> **secondary identity data, not part of the core backlog model**. It does **not** drive the backlog
> metric, the stage pipeline, or any public asset. If a future review drops it, the edit is localized:
> delete this module and the `approved_person_id` FK.
>
> **Note on the spec's bucketing:** `registrar-requirements-spec-v1.md` §0/§7 sorts approved-person
> and eligibility into its **CAPTURE** bucket (G13, G14). This model deliberately treats that data as
> **optional secondary identity data** because the tracker can still function for backlog and sector
> reporting without making it part of the core record spine.

### ApprovedPerson  *(PII — the most sensitive data in the form)*

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

| Field | Prov | Sens | Notes |
|---|---|---|---|
| name | I | MEMBER (own-record) / NEVER-public | Act 36 accountable individual (signs, consents to changes, can withdraw) |
| sa_resident | I | MEMBER (own-record) | eligibility signal |
| sacnasp_verified (optional) | I | MEMBER (own-record) | professional credential captured as a verification state such as verified / not verified / unknown, not a raw number by default |
| letter_of_authority_ref | I | MEMBER (own-record) | when submitter ≠ registration holder (third-party mandate) |

### Eligibility (applicant standing)

Table notation:
`Prov` = `I` intake, `O` operator, `D` derived, `L` lookup, `S` system/audit.
`Sens` = `PUBLIC` aggregate-safe, `MEMBER` own-record only, `OPERATOR` internal only, `NEVER` not stored.

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
| D8 | Tracker → CRM organisation identity / continuity linkage — how open (no-login) application intake links to one shared `Organization` over time | **Open — with Jen (CRM).** Her capture model already frames this (Journey E "continuity"; the tracker's flagged "missing CRM linkage" in `aba-public-capture-field-map.md`). Tracker should **defer to the CRM's matching** and capture the same key the membership side uses (business registration number + name + country + acquisition source), **not invent its own dedupe**. Entity-name alignment now needs to preserve the source-led `Application` language while still handing intake metadata and contact context into CRM in a coherent way. Resolve that when the handoff is designed, not before | Jen (CRM) |
| D9 | Post-registration attribute provenance + home of the verified registration lifecycle (L-number, grant/expiry) | **Open — with Jen (CRM).** Registrar-owned facts: submitter-*reported* now, operator-*verified* later (the "two vocabularies" pattern, §9). The CRM `Product` record is the likely home for the verified lifecycle. Confirm whether the CRM will hold per-product registration lifecycle so the tracker captures toward that shape. **Note:** tracker "renewal" (Act 36, 3-year term) ≠ CRM "renewals" (membership dues) — keep distinct | Jen (CRM) |

---

*All illustrative values are fictional. Regulatory facts are cited to
`registrar-requirements-spec-v1.md`. This is a first draft intended for iteration.*
