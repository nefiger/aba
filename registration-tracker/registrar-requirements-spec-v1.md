# Registrar Requirements Spec — ABA Registration Tracker (v1)

**Scope:** Agricultural-input registration administration under the *Fertilizers, Farm Feeds,
Agricultural Remedies and Stock Remedies Act, 1947 (Act 36 of 1947)*, South Africa — the
paperwork side of registering ordinary farm inputs (microbial inoculants, plant biostimulants,
biofertilisers, plant extracts, biological crop-protection products). "Biological" refers only to the
natural origin of these crop inputs.

**Status:** Phase 2 extraction output. Fully cited to the regulatory corpus. Proposes — does not
apply — changes to the governing files. Produced for a specialist review, not as a settled model.

---

## 0. How to read this spec (the capture lens)

The tracker is **not a replica of the registrar's forms**. It does two jobs: (1) a company sees its
own registration pipeline, and (2) submissions aggregate into a sector view of *where time is lost,
by application type and stage*. So every requirement extracted below is sorted into three buckets by
one test — *does a pipeline row or a sector metric need this, or does the tracker only need to know it
exists?*

- **CAPTURE** — becomes a tracker field/flag, because a pipeline row or sector metric depends on it
  (service type, stage, stage dates, legal pathway, reference/registration number, readiness flags).
- **REFERENCE-ONLY** — noted so we know it is part of reality; the tracker tracks its *readiness*
  as a single flag but does **not** reproduce it field-by-field (all of List I / List II; the full
  chemistry, tox, ecotox, residue dossier; SACNASP; EPR).
- **OUT** — pure dossier mechanics with no bearing on pipeline or backlog; named once and dropped.

The gap table (§7) compares only the **CAPTURE** bucket against the current model. REFERENCE-ONLY
items are logged as context and, where genuinely ambiguous, become specialist questions (§8).

**Corpus (all read directly from source this session):**

| # | Short name | File | How read |
|---|---|---|---|
| 1 | **Application form 2023** | `Application form_16.08.2023_Final.docx` | python-docx (incl. tables) |
| 2 | **Service Request Form (SRF)** | `Service Request Form for Agricultural Remedies (2).doc` | converted via MS Word, read directly — *retires the last second-hand gap* |
| 3 | **Data Requirements 2015** | `Guidelines on Data Requirements for Agricultural Remedies 2015 AVCASA.pdf` | pdftotext |
| 4 | **Process Guide 2015** | `Guide-Reg-Process-Agric-Remedies-2015 (time frame).pdf` | pdftotext |
| 5 | **Chemistry 2021** | `Chemistry data requirements guideline March 2021.pdf` | pdftotext |
| 6 | **GHS 2022** | `Guideline GHS.pdf` | scanned — rendered to images, read directly |
| 7 | **Tariffs 2026/27** | `Tariffs 2026 to 2027.pdf` | scanned — rendered to images, read directly |
| 8 | **Reg tracker notes** | `Reg tracker notes.docx` | python-docx (prior reconciliation; built on, not repeated) |

Citation format: *[short name, section/page/table]*.

---

## 1. The big picture (what a registration actually is)

A registration is **not a single form flow**. It is a structured workflow around four coupled things
*[Reg tracker notes; SRF; Process Guide 2015 §5–6]*:

1. **A service type** you are buying (SRF Table 1 — you tick which service, and pay the matching tariff).
2. **An evidence package** keyed to that type (Data Requirements 2015 §2–4).
3. **A classification/GHS package** (Application form; GHS 2022).
4. **A tariff** for the exact service (Tariffs 2026/27, §8).

The **front door** is two forms submitted together — the **Application form** (product + List I/II
dossier indexes) and the **Service Request Form** (routing + payment) *[SRF instructions; Application
form "Information for applicants"]*. The **real burden** is the attached List I / List II dossier
(chemistry, tox, ecotox, efficacy, residue, environmental, label). *The tracker tracks the front door
and dossier-readiness — never the dossier contents.*

The office **does its own full scientific review** and does *not* accept another authority's approval as
grounds for registration *[Process Guide 2015 §1]* — so "registered in EU/US" is context, never a shortcut.

---

## 2. Service-type taxonomy (CAPTURE — the load-bearing axis)

**Approach (Fork 1 = Union):** the canonical list is the *union* of four non-identical views —
SRF Table 1 (applicant-facing, with `14ARx` payment codes), the Process Guide timeframe table
(regulatory clocks), the Data Requirements sections (evidence), and the Tariffs §8 fee lines. Keyed
to SRF codes where they exist; two types with their own clock **and** fee that the SRF omits are
added explicitly (per Working Principle 1 — the SRF list is a floor).

### 2.1 Canonical service types

| Type | SRF code | Official timeframe (calendar days) | Fee 2026 (ZAR) | Evidence (Data Req §) |
|---|---|---|---|---|
| New molecule (new active ingredient) | 14AR2 | **627** (V14 · Scr30 · Eval569 · Dec14) | R13,956 §8.1 | §2.1 (heaviest) |
| New formulation type | 14AR2 | **418** (V14 · Scr30 · Eval360 · Dec14) | R13,956 §8.1 | §2.2 |
| Generic active ingredient | 14AR1 | **418** | R13,956 §8.1 | §2.3 (5-batch/CoA) |
| Parallel registration | 14AR1 | **118** (V14 · Eval90 · Dec14) | R13,956 §8.1 | §2.4 (no List I/II) |
| Daughter registration | 14AR1 | **118** | R13,956 §8.1 | §2.4 (+ legal agreement) |
| Reinstatement of lapsed registration | 14AR1 | **118** | R13,956 §8.1 (incl. lapsed) | §3.9 |
| **New source of active ingredient** ⚑ | *(not a distinct SRF row)* | **208** (V14 · Eval180 · Dec14) | R7,382 §8.4(a) | §3.1 |
| Major amendment to formulation | 14AR16 | **418** | R7,382 §8.4(d) | §3.2 |
| Minor amendment to formulation | 14AR15 | **118** | R1,513 §8.4(e) | §3.3 (no efficacy/residue) |
| Label extension (new claims + withdrawal period) | 14AR5 | **418** | R13,956 §8.4(g) | §3.4 |
| Administrative amendment | 14AR8 | **118** | R1,513 §8.4(i)/(j) | §3.5 |
| Transfer / name change | 14AR9 | **118** | R1,513 §8.4(j) | §3.6 (+ legal doc) |
| New / additional manufacturer or formulator | 14AR10 | **208** (formulator) | R7,382 §8.4(c) | §3.8 |
| Change/addition of packaging size or material | 14AR14 | **118** | R7,382 §8.4(f) | §3.11 |
| New company contact person | *(admin)* | *(not tabled)* | *no fee* §Data Req 3.12 | §3.12 |
| Renewal of registration | 14AR3 | **90** (V90 only) | R6,995 §8.2 | §3.7 (renew before 31 May) |
| Late renewal | *(via 14AR3)* | *(not tabled)* | R4,883 §8.3 | §3.7 |
| Cancellation of registration | *(via 14AR8?)* | **7** (with Free Sale row) | *no fee* §Data Req 3.10 | §3.10 (return certificate) |
| Data waiver | 14AR12 | *(not tabled)* | R4,445 §8.4(n) | §4.1 |
| Protocol approval | 14AR17 | *(not tabled)* | R4,445 §8.4(m) | §4.2 |
| Fulfilment of conditional registration | 14AR13 | *(not tabled)* | R2,268 §8.4(o) | — |
| Extension of shelf life | 14AR14 | *(not tabled)* | R7,382 §8.4(f) | §2.1.6 ref |
| Dossier update / notification | *(via 14AR8)* | *(not tabled)* | R1,513 §8.4(k) | — |
| Artwork / minor label change | 14AR8 | *(not tabled)* | R1,513 §8.4(l) | — |
| Advertisement approval | 14AR4 | **35** (V7 · 21 · Dec7) | R1,004 §8.5(ii) | — |
| Import (and export) permit | 14AR6 | **14** (V3 · 8 · Dec3) | R870 §8.5(i) | — |
| Free sale certificate | 14AR7 | **7** | R83 §8.5(iii) | — |
| Re-print / duplicate certificate | 14AR11 | *(not tabled)* | R83 §8.5(iv) | — |
| **Appeal under section 6** ⚑ | *(not an SRF row)* | *(not tabled)* | R8,574 §8.5(vii) | Process Guide §6.4 |
| Technical/data evaluation for exemption | *(via 14AR18)* | *(not tabled)* | R2,268 §8.4(p) | §Data Req note |
| Others (not listed) | 14AR18 | — | *(varies)* | — |

⚑ = **floor items** surfaced beyond the prompt's list and beyond the SRF's 18 rows. Both have a
distinct clock and/or fee, so they must be first-class types, not hidden inside another row.

### 2.2 Three findings that fall straight out of this table

- **The SRF collapses distinctions the clock keeps separate.** "Generic / Parallel / Daughter /
  Reinstatement" is *one* SRF row (14AR1) but the timeframes differ — generic **418** vs
  parallel/daughter/reinstatement **118** *[Process Guide Table 1]*. A backlog model built on the
  SRF's 18 rows literally cannot express the metric it needs. → The tracker's type list must sit at
  the *union* granularity, not the SRF granularity.
- **Fees are not "per type."** Registration is priced as **one bucket** — R13,956 covers new
  molecule, new formulation, generic, parallel, daughter *and* lapsed alike *[Tariffs §8.1]* — with
  amendments itemised separately (§8.4). The prompt's "fee per type" assumption is corrected here:
  the spec maps fees to the gazette's actual structure and marks where a type has no distinct fee.
- **Timeframes are the benchmark spine.** Every major/minor type has an official day-count
  *[Process Guide Table 1]*. This is a **lookup constant**, not an intake field — it is the yardstick
  the sector view benchmarks real waits against (Finding 1).

---

## 3. Official stages (CAPTURE — the "where time is lost" axis)

The review pipeline is defined *[Process Guide 2015 §6]*:

1. **Verification** — administrative screening within **14 calendar days** of receipt: cover letter,
   applicant + approved-person details, product reg number (if any), forms in triplicate & signed,
   legibility, **fees paid**, three label copies, data listed on cover letter *[§6.1]*.
2. **Scientific screening** — data screened against Data Requirements 2015 *[§6.1]*.
3. **Evaluation** — full scientific evaluation; applicant may be contacted for clarity/missing data *[§6.2]*.
4. **Decision** — technical advisor → registrar; applicant informed in writing; **registration valid 3 years** *[§6.3]*.
5. **Appeal** — to the Minister under section 6 of the Act *[§6.4]*.

Cross-cutting: **"referred back / rejected for missing info"** can occur at verification, screening or
evaluation — if information is not supplied in the specified period the application is **rejected**
*[§6, §6.1, §6.2]*. **Withdrawal after evaluation has commenced = rejection** (no refund) *[§5.7]*.

### 3.1 Team status list → official stage map (CAPTURE)

| Current team status | Official stage | Note |
|---|---|---|
| preparing submission | *(pre-submission)* | pipeline, **not** registrar backlog |
| submitted to registrar | *(received, pre-verification)* | clock starts |
| acknowledged / reference issued | **Verification** | stamped page-1 + **File no.** issued (§4 below) |
| under screening | **Scientific screening** | |
| under technical review | **Evaluation** | |
| query / additional information requested | *(cross-stage referral)* | can fire at verification/screening/evaluation |
| response submitted | back into screening/evaluation | |
| awaiting decision | **Decision** | |
| approved / registered | **Decision → registered** | registration number now exists (§4) |
| rejected / withdrawn | **Decision → rejected** | withdrawal-after-eval = rejection |
| *(missing)* | **Appeal** | ⚑ no team status maps to appeal — see gap table |
| unknown / not sure | n/a | |

---

## 4. Reference vs proof — what they mean at each stage (CAPTURE, confirms Finding 5)

The single "registrar reference" field conflates two things that exist at different times:

- **Pre-registration:** the acknowledgement is a **stamped front page (page 1) kept by the applicant
  as receipt**, plus a **File no.** assigned by the Registrar's office *[SRF instructions; SRF "For
  official use only"]*. There is **no registration number yet**.
- **Post-registration:** a **registration number** in the **B / K / L / M** series is issued only on
  approval. The SRF asks for the "**L-number** (for existing products)" *[SRF Table 3]*; the GHS label
  example shows "**Reg. No. LXXXX, Act 36 of 1947**" *[GHS 2022 Annexure A.1]*.

"**Proof**" is likewise staged: the real proof of a submission is a **dossier** (List I + List II +
supporting studies), not a single file; and **proof of payment** is a distinct mandatory artifact at
verification *[Process Guide §5.3, §6.1]*. → The tracker should split **application/file reference**
from **registration number**, and treat "proof" as *dossier-readiness + proof-of-payment flags*, not
one attachment.

---

## 5. Classification / typing axes (CAPTURE + REFERENCE-ONLY)

The registrar uses several axes; the tracker's current three (functional category / legal pathway /
M-L-K code) map onto them imperfectly. Reconciled below.

### 5.1 Function of product (CAPTURE) — registrar's own axis differs from the tracker's
The registrar's functional axis is **Insecticide / Fungicide / Herbicide / Other (PGR, swimming
pool, rodenticide, adjuvant)** *[SRF Table 2]*, and the Application form asks a free-text "Function of
product (e.g. insecticide, herbicide, PGR)" *[Application form, Product]*. This is **not** the
tracker's `biofertiliser / biopesticide / biostimulant`, which is a marketing/sector axis. → Keep the
tracker's sector axis but map it to the registrar's function list; flag the mismatch (specialist Q).

### 5.2 Legal pathway (CAPTURE) — the load-bearing axis; confirms Finding 3 with hard evidence
- Act 36 defines "agricultural remedy" to **explicitly include** "biological remedy", "legume
  inoculant", and "plant growth regulator, defoliant, desiccant" *[Process Guide §1]*. So
  **biopesticides, inoculants and PGRs *are* agricultural remedies** — same pathway, lighter data
  path (§5.3).
- **Biofertilisers** (non-inoculant plant nutrition) route instead to the **Fertilizer** pathway —
  now citable via *distinct fee lines*: agricultural-remedy registration **R13,956** *[Tariffs §8.1]*
  vs fertilizer registration **R6,279** *[§6.1]* / group-3 fertilizer **R9,207** *[§6.4]*. Different
  section, different fee, different Act treatment. This is exactly the boundary where real-world
  miscategorisation happens.
- Pest-Control-Operator registration is a **separate tariff section (§7)** from agricultural remedies
  (§8) — supporting evidence for keeping public-health pest control parked as a different regime.

### 5.3 Data path for biological/botanical actives (REFERENCE-ONLY — a light tag, not a dossier)
- Products whose active has no known minimum % purity — **adjuvants, PGRs, plant/botanical extracts,
  swimming-pool products and biological remedies** — may submit a **Certificate of Analysis in place
  of a 5-batch analysis** *[Data Req §2.3.6]*.
- Botanical actives are graded **Category 1 / 2 / 3** by certainty of composition/risk, driving
  analytical depth *[Chemistry 2021, Introduction]*.
- → The tracker may carry a lightweight **"data path"** tag (5-batch vs CoA; botanical Cat 1/2/3) to
  slice the sector view; it does **not** store the chemistry itself.

### 5.4 B/K/L/M (Fork 2 = A: propose reframe + specialist question) — resolves Finding 4
**Evidence (three independent sources agree):** B/K/L/M are **registration-number prefixes assigned
by the registrar**, not a product-classification code the applicant selects, and they exist only
**post-registration**:
- GHS 2022 §1: the covering letter "should clearly reference the **B, K, L or M number** of the
  registration."
- GHS 2022 Annexure A.1 label: "**Reg. No. LXXXX, Act 36 of 1947**."
- SRF Table 3: "**L-number** (for existing products)."

→ The tracker's "M/L/K classification code" as a *pre-submission product axis* is a category error.
**Applied decision (see §9):** because the tracker models only Act 36 agricultural remedies, the
number is **always an L-number**; B / K / M (stock remedies, fertilizers, farm feeds) are out of scope
and dropped. The L-number is **not** an intake field — it is a **post-registration attribute tied to
lifecycle status**, populated only when a record reaches `approved / registered`. Pre-submission and
in-process records simply have no number.

### 5.5 Other typing fields on the real forms (REFERENCE-ONLY)
Formulation type + **CropLife/FAO code**; **IRAC/HRAC/FRAC** mode-of-action codes; Customs Tariff
Code; SEARCH-country registration; registration status in JP/EU/AU/US *[Application form; List I MoA;
GHS label IRAC group]*. Awareness only — none is a tracker field unless a sector metric later needs it.

---

## 6. Evidence packages (REFERENCE-ONLY — captured as *readiness*, never reproduced)

Per Data Requirements 2015, packages scale by type. Captured here at **headline** level only; the
tracker records a single **dossier-readiness** state per application, not these contents.

- **Universal to almost every type:** proof of payment; covering letter (state what you are applying
  for); **3 copies** of the Application form; **3 copies** of the proposed label; SDS *[§2.1–3.11]*.
- **New a.i. (heaviest):** full List I + List II; OECD tox/eco/environmental studies; formulation
  toxicity; physical properties + storage stability; efficacy + phytotoxicity (≥2 seasons, SADC with
  ⅔ in SA); residue data; bee studies; provisional-registration route if already registered in
  US/EU/UK/JP/AU *[§2.1]*.
- **Generic:** manufacturer + formulator letters; **5-batch analysis** by ISO-17025/GLP lab (or
  **CoA** for no-fixed-purity actives incl. biologicals); equivalence *[§2.3]*.
- **Parallel/daughter:** form **excluding** List I/II; daughter needs a **signed legal agreement**
  *[§2.4]*.
- **Amendments:** graded — major (>10% change or worse hazard class) needs formulation data; minor
  needs no efficacy/phytotoxicity/residue; admin/transfer exclude List I/II *[§3.2–3.6]*.
- **Waiver / protocol:** scientific-argument note (waiver) or detailed protocol; submit **before**
  trials/application *[§4]*.
- **GHS label update package:** covering letter (reference B/K/L/M number), service form, new label
  (no colour band; all GHS elements), applicant declaration, SDS (UN Purple Book), proof of payment
  (minor-amendment tariff), **full classification rationale** (formulation, component classifications,
  hazard classes, ignored components, data/bridging/calculations, resulting classification)
  *[GHS 2022 §1–7]*.

**Lists I & II exist and matter — the tracker references their readiness, it does not re-implement
them** *[Application form List I/II; scope decision].*

---

## 7. GAP TABLE — tracker has vs registrar requires (CAPTURE bucket only)

| # | Area | Tracker currently has | Registrar requires (cited) | Verdict |
|---|---|---|---|---|
| G1 | Application type | Single "application type" (implied flat) | Union taxonomy at clock-granularity, keyed to SRF `14ARx` (§2) | **mismatch** — needs the union list; SRF granularity too coarse |
| G2 | New source of a.i. | not a distinct type | 208-day clock, R7,382, Data Req §3.1 | **missing** |
| G3 | Appeal | no status maps to it | s.6 appeal stage + R8,574 fee | **missing** |
| G4 | Generic vs parallel/daughter | likely lumped | 418 vs 118 days *[Process Guide T1]* | **mismatch** |
| G5 | Fee model | "fee per type" assumed | one registration bucket + itemised amendments *[Tariffs §8]* | **needs decision** |
| G6 | Official stages | 11 team statuses | Verification→Screening→Evaluation→Decision→Appeal *[Process Guide §6]* | **mismatch** — map via §3.1; add Appeal |
| G7 | Timeframe benchmark | not modelled as benchmark | official per-type day-counts *[Process Guide T1]* | **missing** (add as lookup constant) |
| G8 | Reference number | single "registrar reference or unavailable reason" | File no. (pre) vs B/K/L/M reg number (post) *[SRF; GHS]* | **mismatch** — split into two fields |
| G9 | Classification code | "M/L/K classification code" (intake axis) | B/K/L/M = post-registration number series *[GHS §1; SRF; label]* | **mismatch** — reframe (§5.4, §9) |
| G10 | Function axis | biofertiliser/biopesticide/biostimulant | Insecticide/Fungicide/Herbicide/Other *[SRF T2]* | **mismatch** — keep sector axis, map to registrar's |
| G11 | Legal pathway | Group 3 fertilizer / agric remedy / not sure | remedy (incl. biopesticide/inoculant/PGR) vs fertilizer, evidenced by fee split *[§8.1 vs §6.1/§6.4]* | **match, sharpen** — confirm mapping w/ specialist |
| G12 | Proof | proof mandatory for packet | dossier + proof-of-payment are distinct; dossier = List I/II bundle *[§5.3, §6.1]* | **mismatch** — separate dossier-readiness vs proof-of-payment |
| G13 | Approved person / authority ⚑ | authorisation gate + contact model | SA-resident accountable "approved person"; **letter of authority** for third party *[Process Guide §4]* | **partial** — extend contact model |
| G14 | Eligibility ⚑ | not modelled | applicant must be **SA-resident / SA-registered office** *[§4.1]* | **missing** (intake eligibility) |
| G15 | Registration term ⚑ | not modelled | **3-year** validity; renew **before 31 May** *[§6.3; Data Req §3.7]* | **missing** — feeds renewal/backlog |
| G16 | Withdrawal semantics ⚑ | "withdrawn" status | withdrawal **after evaluation = rejection**, no refund *[§5.7]* | **mismatch** — status logic |
| G17 | Data path tag ⚑ | not modelled | 5-batch vs CoA; botanical Cat 1/2/3 *[§2.3.6; Chemistry 2021]* | **missing (optional)** — light sector-slice tag |

⚑ = floor item (Fork 3 = A: included and reconciled here rather than deferred).

---

## 8. OPEN QUESTIONS — resolved from the documents where possible

Decision (Fork, confirmed): **work from our own picture and the corpus; treat specialist input as a
later refinement, not a blocker.** Each item below is resolved to our best documentary reading, with
the residual uncertainty stated. Only genuinely undecidable items are left open.

1. **B/K/L/M meaning — RESOLVED by scope.** The tracker models only Act 36 *agricultural remedies*,
   which are always issued **L-numbers** *[SRF Table 3; GHS §1 & label]*. The other series (B / K / M
   — stock remedies, fertilizers, farm feeds) are out of scope and not modelled. So the axis collapses
   to a single **L-number**, and it is a **post-registration attribute tied to lifecycle status**, not
   an intake classification (it exists only once a record is `registered`). *(Finding 4 — closed for
   our scope.)*
2. **Biostimulant pathway — RESOLVED as documentary reading (revisit if contradicted).** Biopesticides,
   inoculants and PGRs are agricultural remedies; biofertilisers are fertilizers (fee split, §5.2).
   Biostimulants **split by claim**: a plant-growth-regulator claim → agricultural remedy; a soil /
   nutritional input → fertilizer. Edge cases (seaweed extracts, microbial biofertilisers) follow the
   same claim test. Flagged as interpretation, not confirmed fact. *(Finding 3.)*
3. **Stages exposed — RESOLVED.** Expose all five official stages plus the "referred back" case
   (§3.1); the applicant-facing labels stay friendly but map 1:1 to the official stages.
4. **Benchmark against official timeframes — RESOLVED: yes.** The Process Guide day-counts
   (627 / 418 / 208 / 118 / 90 …) are the benchmark spine, held as lookup constants. *(Finding 1.)*
5. **Fee model — RESOLVED.** Do **not** store a per-type fee (the gazette prices a registration bucket
   + itemised amendments, §2.2). Store **"proof of payment attached (Y/N)"** and the service type;
   the fee schedule (§2.1) lives in the spec as reference, not as tracker data. *(G5.)*
6. **New-source vs new-formulator — RESOLVED: separate them.** They have distinct data requirements
   (§3.1 vs §3.8) even where the SRF bundles them under 14AR10; the union taxonomy (§2.1) already
   lists them separately. *(G2.)*
7. **Silent timeframes** — data waiver, protocol approval, transfer-of-registration have fees but no
   tabled day-count. **RESOLVED:** mark as "no official benchmark" (do not infer a number).

**Still genuinely open (not resolvable from the corpus):**

- **"Married view" definition** — per-company + sector unified, a shared applicant-and-registrar view,
   or both? A product-definition call for the team, not a documentary question. Carry as-is.

---

## 9. Changes APPLIED to `context-and-decisions-v1.md`

Confirmed and applied this session (specialist confirmation treated as later refinement):

1. **Product Axes — registration number (was "M/L/K classification code").** Reframed to a single
   **L-number**, post-registration, tied to lifecycle status; B/K/M dropped as out of scope. *[GHS §1
   & label; SRF Table 3]*
2. **Product Axes — legal pathway** sharpened: agricultural remedy (incl. biopesticide / inoculant /
   PGR) vs fertilizer (biofertiliser), evidenced by the fee split; biostimulant = split-by-claim
   reading. *[Tariffs §8.1/§6.1/§6.4; Process Guide §1; Data Req §2.5]*
3. **Functional category** annotated as a sector axis that maps to the registrar's function axis. *[SRF
   Table 2]*
4. **Status List** aligned to the five official stages; **Appeal** added; rejected/withdrawn split with
   withdrawal-after-evaluation = rejection noted. *[Process Guide §6, §5.7]*
5. **Product/Application Model** — application/service type made first-class at clock-granularity (SRF
   `14ARx`), official timeframe as benchmark constant; 3-year term / renew-before-31-May added. *[SRF
   Table 1; Process Guide Table 1, §6.3; Data Req §3.7]*
6. **Proof And Reference Numbers** — split into application/file reference (pre) vs L-number (post);
   proof = dossier-readiness + proof-of-payment. *[SRF; Process Guide §5.3, §6.1]*
7. **Company And Contact Model** — approved-person + letter-of-authority + SA-residency eligibility +
   SACNASP signatory added. *[Process Guide §4, §4.1; Application form 2023]*

README needs no change. Wireframes untouched (disposable).

---

## 10. What was verified vs left provisional

- **Verified from source:** the service-type union + `14ARx` codes (SRF); all timeframes (Process
  Guide T1); all fees (Tariffs §8, read from the scanned gazette); the 5 official stages; B/K/L/M =
  registration-number prefixes (three sources); function axis (SRF T2); remedy-vs-fertilizer fee
  split; CoA-vs-5-batch and botanical Cat 1/2/3; GHS label-update package; approved-person/eligibility/
  3-year-term/withdrawal semantics.
- **Left provisional (specialist):** the eight questions in §8 — chiefly the full B/K/M meanings and
  the biostimulant pathway.
- **Documents conflicted on:** nothing outright contradictory. The one *structural* tension is the
  SRF's coarser type granularity vs the Process Guide's finer clock granularity, and the "fee per
  type" assumption vs the gazette's bucket-plus-amendments structure — both resolved in favour of the
  finer/actual structure and flagged.

*All illustrative content herein is drawn from the cited documents; no fictional data is used in this
spec.*
