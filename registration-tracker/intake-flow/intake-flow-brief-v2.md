# Intake Flow Brief V2

*Supersedes `intake-flow-brief-v1.md`. Reconciled to `../registrar-requirements-spec-v1.md`
(the verified Phase 2 extraction) and `../context-and-decisions-v1.md`. V1 is retained as history.*

**Domain frame.** This is registration administration for ordinary farm inputs under the
*Fertilizers, Farm Feeds, Agricultural Remedies and Stock Remedies Act, 1947 (Act 36 of 1947)*,
South Africa — the paperwork side of registering microbial inoculants, plant biostimulants,
biofertilisers, plant extracts and biological crop-protection products. "Biological" refers only to
the natural origin of these crop inputs.

**What changed in V2 (headline).** The intake flow now carries the registrar's own *service/application
type* at clock-granularity, maps statuses onto the five official Act 36 stages, splits the pre- vs
post-registration reference, drops the M/L/K intake picker (a category error), splits proof into
dossier-readiness and proof-of-payment, **replaces the hard authorisation stop-gate with an open-access
model plus a data-quality attestation**, and moves the Act 36 approved-person / eligibility / SACNASP
data into an **optional, non-gating** module. Each change is itemised in §"Reconciliation ledger" with
*current → proposed → citation*.

---

**Status note.** This brief's core capture logic (Screens 1–9) is v1 — open-capture, live. Where it
mentions **operator review, verified ABA relationship, or registrar export preview**, those are
`data-model-v1.md` §7's **deferred layer** (named, extensible, not built in v1) — forward-looking
framing for a later layer, not current v1 gating.

## Audience

Anyone reaching the form from a link — ABA member or not. In practice this is typically a company
representative reporting on their own product's registration; a responsible-attestation checkbox
signals this without gating access. The optional applicant-accountability module lets a submitter
additionally name the Act 36 **approved person** — or a third party holding a **letter of
authority** — as the accountable signatory, but this is not required to submit.

## Purpose

Collect company, contact, product, **service/application type**, application status, staged
reference, readiness flags, consent and visibility information in a low-friction, open-access flow
that can be saved and resumed by email. Intake creates raw submissions; it is not the system of
record by itself. The intake captures the *front door and readiness* — never the dossier contents
*(spec §0, §1, §6)*.

## Access / Role

**Open access.** Anyone — ABA member or not — reaches the form from a link and submits; no login, no
membership gate (data-model-v1 §1). A single **responsible-attestation** checkbox ("I'm responsible
for, or authorised to report, this product's registration") is a **data-quality signal, not a stop
gate** — it discourages third-party reporting but never blocks submission. *(Corrected from V1/early
V2 drafts, which described a hard authorisation stop-gate; that contradicted the open-access model in
`data-model-v1.md`, `intake-form-spec-v1.md`, and the resynced intake wireframe.)*

---

## Reconciliation ledger (current → proposed → citation)

Durable changes proposed onto the existing model. Nothing is silently overwritten; each row quotes
what V1 has, what V2 proposes, and the spec basis.

| # | Field / behaviour | V1 (current) | V2 (proposed) | Cite |
|---|---|---|---|---|
| R1 | **Service/application type** | *absent* — no type field at all | First-class **service type** selector at clock-granularity, keyed to SRF `14ARx`. Distinguishes the types the SRF bundles under one code: generic (14AR1, 418 d) vs parallel / daughter / reinstatement (14AR1, 118 d); includes **new source of a.i.** (208 d, no SRF row) and **appeal under s.6**. Grouped by family (registration / amendment / renewal / permits & certificates / appeal) so the list is scannable. **Scope note (D7):** covering all five families is an initial, reversible scope call — see data-model-v1 §8/§11 for the peel-back path to registration+renewal only if the full list proves too much for a low-friction form. | spec §2.1, §2.2; G1, G2, G4 |
| R2 | **Classification code (M/L/K picker)** | intake dropdown `M / L / K / Unknown` | **Removed from intake.** B/K/L/M are registrar-assigned *registration-number prefixes*, not an applicant choice; within our scope the series is always **L**. The L-number is a *post-registration* attribute tied to lifecycle status — shown read-only, populated only at `approved / registered`, absent for pipeline/in-process records. | spec §5.4, §4; G9 |
| R3 | **Reference (single field)** | one `Registrar reference` status + number/reason | **Split into two staged fields.** (a) *Application / file reference* — the stamped page-1 acknowledgement + Registrar **file number**, assigned at submission, exists pre-registration. (b) *Registration number (L-number)* — post-registration only, per R2. | spec §4; G8 |
| R4 | **Status list** | 11 statuses, `Rejected / withdrawn` lumped, no Appeal | Same friendly labels, but each mapped 1:1 to an **official stage** (Verification → Scientific screening → Evaluation → Decision → Appeal) shown as a badge; **Appeal** added; `rejected` and `withdrawn` split, with the note that *withdrawal after evaluation has commenced = rejection (no refund)*. | spec §3, §3.1; G6, G3, G16 |
| R5 | **Proof (single flag)** | one `Proof of submission attached` checkbox | **Split into two readiness flags:** *dossier-readiness* (List I + List II + supporting studies as a single flag — never field-by-field) and *proof-of-payment attached*. Neither is the dossier itself. | spec §4, §6; G12 |
| R6 | **Authorisation check** | single yes/no "are you authorised?" **stop gate** | **Reframed to open access** (data-model-v1 §1): the yes/no becomes a **responsible-attestation checkbox** — data-quality signal, never blocks submission. The Act 36 **approved-person / eligibility / SACNASP / letter-of-authority** data moves into the **optional, non-gating** applicant-accountability module (data-model-v1 §6 — decision D1, closed: include, optional). | data-model-v1 §1, §6 (D1); spec §5, Company/Contact model; G13, G14 |
| R7 | **Legal pathway** | `Group 3 fertilizer / Agricultural remedy / Not sure` | Relabelled to the load-bearing split: **Agricultural remedy** (incl. biopesticide / inoculant / PGR) vs **Fertilizer** (biofertiliser) vs **Not sure**, evidenced by the fee split. Biostimulant note: *splits by claim* (PGR claim → remedy; soil/nutritional → fertilizer) — flagged as documentary reading, not confirmed. | spec §5.2, §8 Q2; G11 |
| R8 | **Functional category** | sector dropdown, standalone | Kept as the sector axis, but annotated as **mapping to** the registrar's own function axis (Insecticide / Fungicide / Herbicide / Other incl. PGR, adjuvant, rodenticide). Shown as a read-only "maps to registrar function" hint. | spec §5.1; G10 |
| R9 | **3-year term / renewal** | *absent* | Surfaced where relevant: when type = **Renewal** or status = `approved / registered`, show the **3-year validity** and **renew-before-31-May** reminder. Not asked at intake for pipeline records. | spec §2.2 note; G15 |
| R10 | **Data-path tag (optional)** | *absent* | Optional light tag — **5-batch vs Certificate of Analysis**; botanical **Cat 1/2/3** — to slice the sector view. Awareness-only; never stores chemistry. Marked optional so it does not add intake friction. | spec §5.3; G17 |

---

## Field / status / gate list (the checkpoint artifact)

### Entry + attestation (Screen 1) — no gate *(reframed, R6)*
- Short plain-language intro (open to anyone) + concise POPIA/privacy notice.
- **Responsible attestation** — single checkbox: *"I'm responsible for, or authorised to report, this
  product's registration."* Data-quality signal, **not** a stop gate — continues either way.

### Company & contact (Screen 2) — largely unchanged
- Company name; company role (manufacturer / importer / local registration holder / distributor
  responsible for registration / other authorised representative); company country.
- Self-reported ABA relationship: Full member / Technical partner / Observer / Non-member / Not sure–pending.
- Contact person; email for return link; POPIA/privacy notice.

### Product & regime (Screen 3)
- Product name.
- **Functional category** (biofertiliser / biopesticide / biostimulant / not sure) — sector axis,
  with a read-only "maps to registrar function" hint. *(R8)*
- Country for application; governing regime (Agriculture·Act 36 / public-health pest / water
  treatment / other — only Act 36 fully modelled).
- **Legal pathway** (Act 36 only): Agricultural remedy / Fertilizer / Not sure, with the biostimulant
  split-by-claim note. *(relabelled, R7)*
- *(removed: M/L/K classification picker — R2)*
- Optional **data-path tag** (5-batch / CoA; botanical Cat 1/2/3). *(R10)*

### Service/application type (Screen 4 — new) *(R1, scope decision D7 — see data-model-v1 §8/§11)*
- **Service type** selector keyed to SRF `14ARx`, grouped:
  - *Registration:* new molecule (14AR2) · new formulation type (14AR2) · generic (14AR1) ·
    parallel (14AR1) · daughter (14AR1) · reinstatement of lapsed (14AR1) · new source of a.i.
  - *Amendment:* major / minor amendment · label extension · administrative · transfer/name change ·
    new manufacturer/formulator · packaging change.
  - *Renewal:* renewal (14AR3) · late renewal.
  - *Permits & certificates:* import/export permit · free sale · advertisement approval · etc.
  - *Appeal:* appeal under section 6.
- Read-only **official timeframe** benchmark shown for the chosen type (e.g. generic 418 d;
  parallel/daughter 118 d) — a lookup constant, not an input.

### Application status & log (Screen 5) *(R4)*
- **Current status** (friendly label) with its **official-stage badge**:
  - preparing submission *(pre-submission — pipeline, not backlog)*
  - submitted to registrar *(received)*
  - acknowledged / reference issued *(Verification — file number issued)*
  - under screening *(Scientific screening)*
  - under technical review *(Evaluation)*
  - query / additional information requested *(referred back — cross-stage)*
  - response submitted *(back to screening/evaluation)*
  - awaiting decision *(Decision)*
  - approved / registered *(Decision → registered; L-number issued)*
  - rejected *(Decision → rejected)*
  - withdrawn *(withdrawal after evaluation = rejection, no refund)*
  - under appeal *(Appeal — s.6)*
  - unknown / not sure
- Date status began; approximate-date toggle; optional previous entries; status-log timeline.

### Reference & readiness (Screen 6) *(R3, R5)*
- **Application / file reference** (pre-registration): status (provided / not issued / unknown /
  lost–unavailable) + file number, or a required unavailable-reason note.
- **Registration number (L-number)** (post-registration): read-only, shown only when status =
  `approved / registered`; otherwise "Not issued — no number exists pre-registration."
- **Dossier-readiness** flag (List I/II bundle ready — single flag, not contents).
- **Proof-of-payment attached** flag.

### Applicant accountability (Screen 7 — optional, non-gating) *(moved here, R6; data-model-v1 §6, D1)*
- Collapsible/skippable block, one-line explainer: *"Optional — helps make the record a complete
  Act 36 application; skip if you'd rather not."* Never blocks continuing to consent/submit.
- **Approved person named** (accountable individual, Act 36) — name + role. *(optional)*
- **Eligibility signal:** applicant resident in SA / company has SA-registered office (Act 36
  records). *(optional)*
- **Acting under letter of authority?** yes/no (third-party mandate, scope + duration). *(optional)*
- **SACNASP signatory number** — captured as a **verified boolean**, not the raw number. *(optional)*

### Consent & visibility (Screen 8) — unchanged
- Internal ABA review (required) / anonymised public aggregate / named registrar export use (opt-in).

### Save / submit (Screen 9) — unchanged
- Save draft + email return link (saved-at only); submit for ABA review (sets `submittedAt`).

---

## Important states (v2)

- Open access: everyone continues; the responsible attestation is data-quality only, never a stop
  state.
- **Not eligible** (no SA residency / registered office, in the optional module) — soft warning,
  record still captured but flagged for operator review; never blocks submission.
- **L-number absent** for any pipeline/in-process record — shown as a lifecycle state, never an input.
- Missing **dossier-readiness** or **proof-of-payment** can continue for review, but blocks registrar
  export-preview inclusion.
- Application/file reference missing requires an unavailable-reason.
- Renewal/registered records surface the **3-year term / renew-before-31-May** reminder.
- Save/return link available (longitudinal process).

## Packet-readiness rule (unchanged logic, updated inputs)

A record is *potentially* export-preview ready after operator review only when: responsible attestation
given; dossier-ready; proof-of-payment attached; named-registrar-export consent given; file reference
provided or an unavailable-reason recorded; and verified `Full member, active` (others need operator
exception).

## Data shown

Fictional company/contact/product examples, status values, dates, reference/readiness flags and
consent — all clearly labelled fictional. Follows the Company → Products → **Applications (typed)** →
Status Log model *(spec §1; context §"Product And Application Model")*.

## Relationship to other tracker areas

Submitted records flow into `admin-operator-review` first; reviewed records may later appear in the
member `company-dashboard`, anonymised `public-dashboard`, and eligible `registrar-list` preview.

## Notes for later production implementation

- Keep consent and operator inclusion separate.
- Do not expose proof/dossier files, reference numbers, company/product names, or free-text notes publicly.
- Controlled statuses + official-stage mapping + optional notes.
- Treat "not sure" as a valid answer.
- Service-type list must stay at *clock-granularity* (the SRF's 18 rows are too coarse for the backlog
  metric) — see spec §2.2.
- Official timeframes are lookup constants, not intake fields.
- Prototype markup is disposable; durable rules live in `../context-and-decisions-v1.md` and
  `../registrar-requirements-spec-v1.md`.

## Open questions surfaced

- **Married-view definition** still open (spec §8) — not an intake question.
- **Biostimulant pathway** is our documentary reading (split-by-claim), not confirmed — the legal-pathway
  helper text flags this.
- **Function-axis mapping** (sector category → registrar Insecticide/Fungicide/Herbicide/Other) is a
  suggested mapping pending specialist confirmation (spec §5.1).
- ~~Should the eligibility failure be a hard stop or a soft flag?~~ **Resolved (D1, data-model-v1 §6):**
  the whole applicant-accountability module, including eligibility, is optional and non-gating — a
  soft flag only, never a stop.
