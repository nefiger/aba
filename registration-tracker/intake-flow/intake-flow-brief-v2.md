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
dossier-readiness and proof-of-payment, and extends the authorisation gate with the Act 36
approved-person / eligibility requirements. Each change is itemised in §"Reconciliation ledger" with
*current → proposed → citation*.

---

## Audience

Authorised company representatives responsible for submitting or updating product registration
information for agricultural crop inputs. The nominated **approved person** (Act 36) — or a third
party holding a **letter of authority** — is the accountable signatory.

## Purpose

Collect company, contact, product, **service/application type**, application status, staged
reference, readiness flags, consent and visibility information in a low-friction flow that can be
saved and resumed by email. Intake creates raw submissions for ABA operator review; it is not the
system of record by itself. The intake captures the *front door and readiness* — never the dossier
contents *(spec §0, §1, §6)*.

## Access / Role

Public submission flow, authorised representatives only. The first screen must stop unauthorised
users and ask them to forward the link to the responsible person.

---

## Reconciliation ledger (current → proposed → citation)

Durable changes proposed onto the existing model. Nothing is silently overwritten; each row quotes
what V1 has, what V2 proposes, and the spec basis.

| # | Field / behaviour | V1 (current) | V2 (proposed) | Cite |
|---|---|---|---|---|
| R1 | **Service/application type** | *absent* — no type field at all | First-class **service type** selector at clock-granularity, keyed to SRF `14ARx`. Distinguishes the types the SRF bundles under one code: generic (14AR1, 418 d) vs parallel / daughter / reinstatement (14AR1, 118 d); includes **new source of a.i.** (208 d, no SRF row) and **appeal under s.6**. Grouped by family (registration / amendment / renewal / permits & certificates / appeal) so the list is scannable. | spec §2.1, §2.2; G1, G2, G4 |
| R2 | **Classification code (M/L/K picker)** | intake dropdown `M / L / K / Unknown` | **Removed from intake.** B/K/L/M are registrar-assigned *registration-number prefixes*, not an applicant choice; within our scope the series is always **L**. The L-number is a *post-registration* attribute tied to lifecycle status — shown read-only, populated only at `approved / registered`, absent for pipeline/in-process records. | spec §5.4, §4; G9 |
| R3 | **Reference (single field)** | one `Registrar reference` status + number/reason | **Split into two staged fields.** (a) *Application / file reference* — the stamped page-1 acknowledgement + Registrar **file number**, assigned at submission, exists pre-registration. (b) *Registration number (L-number)* — post-registration only, per R2. | spec §4; G8 |
| R4 | **Status list** | 11 statuses, `Rejected / withdrawn` lumped, no Appeal | Same friendly labels, but each mapped 1:1 to an **official stage** (Verification → Scientific screening → Evaluation → Decision → Appeal) shown as a badge; **Appeal** added; `rejected` and `withdrawn` split, with the note that *withdrawal after evaluation has commenced = rejection (no refund)*. | spec §3, §3.1; G6, G3, G16 |
| R5 | **Proof (single flag)** | one `Proof of submission attached` checkbox | **Split into two readiness flags:** *dossier-readiness* (List I + List II + supporting studies as a single flag — never field-by-field) and *proof-of-payment attached*. Neither is the dossier itself. | spec §4, §6; G12 |
| R6 | **Authorisation gate** | single yes/no "are you authorised?" | Extended to the Act 36 **approved-person** model: named approved person accountable for the application; **SA-residency / SA-registered-office** eligibility signal; optional **letter of authority** flag for third parties; optional **SACNASP** signatory number. | spec §5, Company/Contact model; G13, G14 |
| R7 | **Legal pathway** | `Group 3 fertilizer / Agricultural remedy / Not sure` | Relabelled to the load-bearing split: **Agricultural remedy** (incl. biopesticide / inoculant / PGR) vs **Fertilizer** (biofertiliser) vs **Not sure**, evidenced by the fee split. Biostimulant note: *splits by claim* (PGR claim → remedy; soil/nutritional → fertilizer) — flagged as documentary reading, not confirmed. | spec §5.2, §8 Q2; G11 |
| R8 | **Functional category** | sector dropdown, standalone | Kept as the sector axis, but annotated as **mapping to** the registrar's own function axis (Insecticide / Fungicide / Herbicide / Other incl. PGR, adjuvant, rodenticide). Shown as a read-only "maps to registrar function" hint. | spec §5.1; G10 |
| R9 | **3-year term / renewal** | *absent* | Surfaced where relevant: when type = **Renewal** or status = `approved / registered`, show the **3-year validity** and **renew-before-31-May** reminder. Not asked at intake for pipeline records. | spec §2.2 note; G15 |
| R10 | **Data-path tag (optional)** | *absent* | Optional light tag — **5-batch vs Certificate of Analysis**; botanical **Cat 1/2/3** — to slice the sector view. Awareness-only; never stores chemistry. Marked optional so it does not add intake friction. | spec §5.3; G17 |

---

## Field / status / gate list (the checkpoint artifact)

### Gate & eligibility (Screen 1)
- **Authorised to submit?** yes → continue; no → stop + forward-link state *(unchanged core gate)*.
- **Approved person named** (accountable individual, Act 36) — name + role. *(new, R6)*
- **Eligibility signal:** applicant resident in SA / company has SA-registered office (Act 36 records). *(new, R6)*
- **Acting under letter of authority?** yes/no (third-party mandate, scope + duration). *(new, optional, R6)*
- **SACNASP signatory number** (optional). *(new, optional, R6)*

### Company & contact (Screen 2) — largely unchanged
- Company name; company role (manufacturer / importer / local registration holder / distributor
  responsible for registration / other authorised representative); company country.
- Self-reported ABA relationship: Full member / Associate / Observer / Non-member / Not sure–pending.
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

### Service/application type (Screen 4 — new) *(R1)*
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

### Consent & visibility (Screen 7) — unchanged
- Internal ABA review (required) / anonymised public aggregate / named registrar packet (opt-in).

### Save / submit (Screen 8) — unchanged
- Save draft + email return link (saved-at only); submit for ABA review (sets `submittedAt`).

---

## Important states (v2)

- Authorised user continues; not-authorised stop state.
- **Not eligible** (no SA residency / registered office) — soft warning, record still captured but
  flagged for operator review.
- **L-number absent** for any pipeline/in-process record — shown as a lifecycle state, never an input.
- Missing **dossier-readiness** or **proof-of-payment** can continue for review, but blocks registrar
  packet inclusion.
- Application/file reference missing requires an unavailable-reason.
- Renewal/registered records surface the **3-year term / renew-before-31-May** reminder.
- Save/return link available (longitudinal process).

## Packet-readiness rule (unchanged logic, updated inputs)

A record is *potentially* packet-ready after operator review only when: authorised; dossier-ready;
proof-of-payment attached; named-registrar-packet consent given; file reference provided or an
unavailable-reason recorded; and verified `Full member, active` (others need operator exception).

## Data shown

Fictional company/contact/product examples, status values, dates, reference/readiness flags and
consent — all clearly labelled fictional. Follows the Company → Products → **Applications (typed)** →
Status Log model *(spec §1; context §"Product And Application Model")*.

## Relationship to other tracker areas

Submitted records flow into `admin-operator-review` first; reviewed records may later appear in the
member `company-dashboard`, anonymised `public-dashboard`, and eligible `registrar-list`.

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
- Should the **eligibility** failure be a hard stop or a soft flag? V2 proposes a *soft flag* (capture +
  operator review) so non-SA/pipeline signals are not lost; confirm with operator team.
