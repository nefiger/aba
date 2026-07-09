# Registration Tracker Context And Decisions V1

## Purpose And Scope

The registration tracker follows how registrations of biological and alternative *agricultural* inputs — microbial inoculants, plant biostimulants, biofertilisers, plant extracts, and biological crop-protection products — move through the South African registrar's process under Act 36 of 1947. "Biological" refers only to the natural origin of these crop inputs.

The regulatory framework for these products is unsettled and hard to navigate: the forms and guideline criteria exist, but in practice many of these inputs end up registered under one category when they arguably belong under another, and registration is slow. **The tracker does not try to fix that.** It does not adjudicate categories or reengineer the registrar's process. Its job is narrower and factual — to track what is actually happening:

- **Per-company pipeline** — a company logs its products and the status of each registration submission and sees its own pipeline (this private view is also the participation incentive).
- **Sector-wide picture** — submissions are aggregated into an anonymised, sector-level view of how registration is behaving: where time is lost, by application type and stage. This serves both the named evidence-for-the-registrar purpose and the anonymised advocacy purpose.

Together these form a combined ("married") view into the registrar's office — one that serves the companies submitting and is useful to the registrar's own work. The tracker references what a submission requires (dossier readiness, application type, stage) without reproducing the registrar's forms field-by-field.

*("Married view" is a working interpretation still to be confirmed — see the open questions in the context summary.)*

## Framing And Terminology (Standing Convention)

Applies to every session and artifact in this workspace. It is **self-enforcing** — this file is always read as source of truth — so no one has to remember to apply it. Three rules:

1. **Lead with the domain.** Open every session, prompt and document with the agricultural-regulatory frame: this is registration administration for ordinary farm inputs under Act 36 of 1947, and "biological" refers only to the natural origin of a crop input. Precise, benign context is better prompting and keeps automated content filters from over-reacting to decontextualised chemistry / hazard terms.
2. **Prefer domain terms over the bare word "biological".** Where natural, write "agricultural remedy", "crop input", "registration paperwork", "product dossier" rather than a standalone "biological"; when "biological" is needed, pair it with its noun (e.g. "biological crop-protection product").
3. **Name the regulatory purpose before sensitive detail.** When a task must handle toxicology, GHS hazard, or chemistry tables, state the regulatory reason first (e.g. "this is the Act 36 hazard-classification section of the label requirement") so the purpose travels with the terms.

This convention is the canonical version; `session-prompt-template-v2.md` carries a locked copy so filled prompts inherit it.

## Project Context

The `registration-tracker` work is being developed separately from the main ABA website and biological database work, but the outputs are expected to come together into one coherent ABA digital product.

The tracker may eventually live as a subdomain or product area of the core ABA website, for example as a registration tracker module linked from the homepage and used by different audiences.

The tracker should therefore be able to stand alone during prototyping while remaining visually and conceptually easy to unify with the main ABA site.

The tracker should be treated as a self-contained product area for now, but designed as if it will eventually mount under the main ABA ecosystem.

The exact visual treatment is intentionally flexible by area:

- intake flow can be friendlier and closer to public-facing UX
- company dashboard should feel like a calm member workspace
- public dashboard should align more closely with the public website and advocacy story
- admin/operator review should be utilitarian and evidence-led
- registrar list should be the most export/table-oriented

The shared outer shell should preserve family resemblance with the main ABA website through brand placement, typography, base palette, navigation assumptions, role/access labels, and terminology.

The tracker should assume a future relationship with the custom CRM being built by Jen. The CRM is the likely eventual system of record, while the tracker wireframes remain product-focused and disposable.

## Folder Structure

The tracker work is organised into five product areas:

- `intake-flow`
- `company-dashboard`
- `public-dashboard`
- `admin-operator-review`
- `registrar-list`

Each product area should eventually receive its own focused brief and low-fidelity HTML wireframe.

Suggested files:

- `intake-flow/intake-flow-brief-v1.md`
- `company-dashboard/company-dashboard-brief-v1.md`
- `public-dashboard/public-dashboard-brief-v1.md`
- `admin-operator-review/admin-operator-review-brief-v1.md`
- `registrar-list/registrar-list-brief-v1.md`

The original `starting-prompt-v1.md` should remain as the first master wireframe prompt.

This file, `context-and-decisions-v1.md`, is the living product/integration brief.

## Prototype Approach

The v1 prototype should be low-fidelity HTML wireframes.

The HTML/CSS is explicitly disposable and should not be treated as production implementation.

The durable artifacts are:

- context and decision markdown files
- focused folder briefs
- terminology
- data model decisions
- product rules
- visual alignment principles

Recommended v1 pattern:

- one shared CSS file for wireframe tokens and common shell
- one low-fidelity `index.html` per product area
- no framework
- no build tooling
- no backend
- no real data
- realistic but fictional placeholder examples

Potential shared file:

- `shared/tracker-wireframe.css`

The shared CSS should define typography, page shell, header, prototype navigation, wireframe cards, forms, tables, annotations, role badges, and responsive behavior.

Every wireframe should include:

- ABA brand / product shell
- `Registration Tracker` product label
- navigation between the five prototype areas
- role/access badge or note
- disabled or placeholder `ABA Home` / `Back to ABA website` slot

The `ABA Home` link should be visually present but not wired to a real route until the tracker is merged with the main site.

Prototype navigation may link the five wireframe pages to each other for review, even though real users will not have access to every area.

The wireframes should explicitly show role/access boundaries:

- intake: public submission, authorised representatives only
- company dashboard: member workspace
- public dashboard: public aggregate view
- admin/operator review: operator only
- registrar list: operator export workspace

## Product Areas

### Intake Flow

The intake flow is for company representatives submitting or updating product registration data.

It is open to both ABA members and non-members, but only authorised company representatives should submit registration information.

The intake should use an eligibility gate:

- Ask whether the person is authorised to submit registration information for the company/product.
- If yes, continue.
- If no, stop the flow and ask them to forward the link to the authorised person.

The intake flow can use low-friction return links by email because this is a longitudinal process and companies may update records over time.

The intake flow should not become a heavy membership sales funnel, but it may lightly explain that named advocacy support or registrar packet inclusion may be a member benefit.

### Company Dashboard

The company dashboard is intended as a member benefit.

It should require member login or invited member workspace access, not merely a magic intake return link.

The dashboard should show a company's own product/application pipeline, including:

- draft records
- submitted records
- records under ABA review
- accepted tracker records
- records needing clarification
- records excluded from registrar packet use

The dashboard should show both pre-submission pipeline and regulatory submissions, but separate them clearly into lanes such as:

- pipeline / pre-submission
- with registrar
- finalised

Benchmarks should apply only where meaningful, especially to records that are with a regulator or registrar.

### Public Dashboard

The public dashboard is an anonymised advocacy and communications artifact.

It should be based on reviewed/accepted data by default, not raw unreviewed intake data.

It may include data from both ABA members and non-members, because non-member submissions can still contribute to sector intelligence.

**Superseded (D2, data-model-v1 §11, closed):** this section originally called for a public
all/member/non-member filter. That's now decided against for v1 — even suppressed, a member/non-member
split narrows inference on small cells for no v1 requirement. The public dashboard shows all reviewed
submissions as one pool; member/non-member stays an internal classification only. Revisit later if the
advocacy story needs segmented public evidence.

~~The public dashboard should allow aggregate filtering by:~~

~~- all reviewed submissions~~
~~- ABA member submissions~~
~~- non-member submissions~~

~~These filters must be phrased neutrally and combined with strong suppression rules to avoid revealing individual contributors.~~

Pre-submission pipeline may appear as a separate future pipeline signal, but it must not be mixed into registrar backlog metrics.

The public dashboard may also show aggregate evidence packet activity, such as:

- registrar evidence packets prepared
- applications represented in submitted packets
- most recent packet period

This should remain aggregate and should not name companies.

### Registrar List

The registrar list is the final export-facing packet/list.

It should default to reviewed, consented, operator-approved verified Full member records.

Non-member submissions may be visible in adjacent review context or as excluded/upgrade candidates, but they should not be included in the registrar packet by default.

Registrar packet inclusion should require:

- reviewed record
- verified ABA relationship type
- consent for named registrar packet use
- proof attached
- registrar reference number present, or an explicit reference-unavailable reason
- operator inclusion decision

The registrar list should show the current export-ready working list, but the underlying concept should include saved export packets or registrar submission batches.

An export packet is evidence sent at a moment in time. It should conceptually preserve:

- records included
- generated date
- generated by
- packet version
- sent/revised/withdrawn state
- attachments included
- relationship-type exclusion logic

### Admin / Operator Review

The admin/operator review area is the control point where raw intake submissions become trusted records.

It should allow ABA staff to:

- triage submissions
- verify proof
- inspect consent and visibility settings
- verify ABA relationship type
- detect duplicates or obvious errors
- request clarification
- decide whether a record is accepted into the tracker
- decide whether a record is eligible for public aggregate use
- decide whether a record is included in the registrar packet

The intended data flow is:

1. `intake-flow` collects submitted data.
2. `admin-operator-review` reviews, corrects, tags, and decides inclusion.
3. `company-dashboard` reflects the company's own records and review states.
4. `public-dashboard` aggregates reviewed eligible records.
5. `registrar-list` exports named reviewed, consented, included records.

Admin/operator review is the internal source of truth for v1 record state, not merely a moderation queue.

Canonical review fields may include:

- review status
- verified ABA relationship type
- data quality status
- public aggregate eligibility
- registrar packet eligibility
- operator inclusion decision
- clarification needed

## ABA Relationship Type

ABA relationship type should be a first-class company-level field that carries through every view.

Suggested statuses:

- full member
- associate
- observer
- non-member
- unknown / pending
- lapsed, if needed later

The intake flow should ask for self-reported ABA relationship type:

- full member
- associate
- observer
- non-member
- not sure / pending

The admin/operator review area should distinguish between:

- self-reported ABA relationship type
- verified ABA relationship type

Verified `Full member, active` is the default registrar-packet eligible relationship type. Other relationship types may contribute to reviewed aggregate intelligence but require operator exception before named packet inclusion.

ABA relationship type affects:

- company dashboard access
- registrar packet inclusion by default
- public dashboard filtering
- internal review and follow-up

The company dashboard is a member benefit.

Non-member submissions may still feed reviewed public aggregate intelligence, but they should not receive the same dashboard or named advocacy benefits by default.

## Consent And Inclusion

Consent and inclusion must be separate concepts.

`visibility_consent` describes what the submitter permits:

- internal ABA review
- anonymised public aggregate use
- named registrar packet use

`operator_inclusion` describes what ABA decides to actually use:

- include
- exclude
- needs review

Default visibility should be:

- internal review
- anonymised public aggregate use

Named registrar packet use should require explicit opt-in.

High-sensitivity fields such as proof attachments, reference numbers, company names, product names, and free-text notes should not become public raw fields.

The intake flow may use record-level defaults with optional advanced per-field visibility controls.

For non-members, consent to registrar packet use should be captured as permission, not as a promise of inclusion.

## POPIA And Privacy

The intake flow should include:

- a concise POPIA/privacy notice up front
- contextual consent near visibility controls
- a final confirmation summary showing what the submitter agreed to

Add concise disclaimers where relevant:

- intake: ABA uses information to build sector evidence and support advocacy; this is not legal or regulatory advice
- company dashboard: benchmarks are informational and based on reviewed submissions
- public dashboard: metrics are aggregated from reviewed submissions and do not identify individual companies
- registrar list: export packets are prepared from consented and reviewed records for engagement with the registrar

## Company And Contact Model

Company data and contact person data should be separate.

Company fields may include:

- company name
- country
- ABA relationship type
- company role

Contact person fields may include:

- name
- email
- phone, optional
- role/title
- permission to contact

Only companies or authorised representatives responsible for registration should submit registration information.

**Approved person (Act 36).** The registrar requires a nominated **approved person** — an individual resident in South Africa who is accountable for the application (signs the form, consents to alterations, gives/changes information, and can withdraw the application). Where a third party acts, a **letter of authority** is required specifying the scope and duration of their mandate *[Process Guide §4]*. The tracker's authorised-representative concept should carry this role, and the signatory may also have a **SACNASP** registration number *[Application form 2023, declaration]*.

**Eligibility.** For Act 36 records the applicant must be **resident in South Africa**, or for a company have a **registered office in South Africa** *[Process Guide §4.1]* — an intake eligibility signal.

The intake flow should not invite unauthorised third-party reporting.

Company role may include:

- manufacturer
- importer
- local registration holder
- distributor responsible for registration
- other authorised representative

The intake flow should avoid asking users to report on products or applications for which they are not responsible.

If a person is not authorised, the flow should stop and ask them to forward the link to the responsible authorised contact.

## Product And Application Model

The core data model remains:

Company -> Products -> Applications -> Status Log

The application is the unit of backlog.

One company should be able to add multiple products, and each product should be able to have multiple applications.

The interface should guide users one application at a time, with options to:

- add another application for this product
- add another product
- finish for now

**Application / service type** is a first-class field drawn from the canonical service-type taxonomy in `registrar-requirements-spec-v1.md` §2 (keyed to the registrar's Service Request Form codes `14ARx`). Backlog and wait-time differ by type, so the type must sit at the registrar's clock-granularity, not a coarser grouping. Each type carries an **official timeframe** in calendar days, held as a benchmark constant *[Process Guide Table 1]* against which real waits are compared.

An Act 36 registration is **valid for three years** and must be **renewed before 31 May**; renewal is itself a tracked application type *[Process Guide §6.3; Data Req §3.7]*. This drives renewal reminders and the live-vs-lapsed distinction.

## Product Axes And Regime Logic

**Reconciled against the registrar corpus (Phase 2 extraction).** The items below have been checked against the Act 36 forms, guidelines and tariff gazette; see `registrar-requirements-spec-v1.md` for the full citations. Specialist confirmation is welcome but is treated as a later refinement, not a blocker. One item remains our best documentary reading rather than a confirmed fact: the pathway for **biostimulants** (see Legal pathway below).

Functional category should be global and always visible.

Suggested values:

- biofertiliser
- biopesticide
- biostimulant
- not sure

This is a sector / marketing axis. It **maps to** — it does not replace — the registrar's own function axis (Insecticide / Fungicide / Herbicide / Other, incl. PGR, rodenticide, adjuvant), which is what the Service Request Form and Application form actually capture *[SRF Table 2; Application form 2023]*.

Country and governing regime should always be visible.

Legal pathway and classification code should be conditional, especially for South African Act 36 records.

For South Africa, the active, fully-modelled regime is:

- Agriculture / Act 36

The following are **not** modelled in the current tracker — they sit under a different legal regime and are treated as future scope:

- public-health pest control — *future / different legal regime — not modelled in the current tracker*
- water treatment — *future / different legal regime — not modelled in the current tracker*

`other` is retained only as a lightweight, awareness-only capture: a way to see how many submissions fall outside Act 36. It feeds sector insights and internal submission-type statistics only — it does **not** drive the member (company) dashboard and is **not** eligible for the registrar list.

Under Agriculture / Act 36, show:

- **Legal pathway** — agricultural remedy vs fertilizer. This is the load-bearing axis. Biopesticides, microbial inoculants and plant growth regulators are **agricultural remedies** under Act 36 (the Act's definition explicitly names "biological remedy", "legume inoculant" and "plant growth regulator"). Biofertilisers route instead to the **fertilizer** pathway. The split is evidenced by distinct tariff lines — agricultural-remedy registration R13,956 vs fertilizer R6,279 / group-3 fertilizer R9,207 *[Tariffs §8.1, §6.1, §6.4; Process Guide §1; Data Req §2.5]*. **Biostimulants** split by claim on our current documentary reading — a plant-growth-regulator claim → agricultural remedy; a soil / nutritional input → fertilizer (flagged as interpretation, not a confirmed fact).
- **Registration number** — *not* a classification the applicant picks. Under Act 36 an agricultural remedy is issued an **L-number** (e.g. "Reg. No. L1234, Act 36 of 1947") *[GHS 2022 §1 and label; SRF Table 3]*. Within the tracker's modelled scope — Act 36 agricultural remedies — the series is **always L**; the other Act 36 series (B / K / M — stock remedies, fertilizers, farm feeds) fall outside scope and are not modelled. The L-number **exists only once a registration is successful**, so it is a post-registration attribute tied to the registration lifecycle, not an intake field: pre-submission and in-process records have no number. It populates only when a record reaches the `approved / registered` state.

For non-South Africa countries, the model should remain country-aware and flexible.

## Geographic Truth

ABA can receive registration signals from across Africa, while current operating activity is centered in South Africa.

Tracker views should make this boundary visible where it helps interpretation: intake, public dashboard, and country-level aggregate reporting. South African Act 36 fields can be more specific, but non-South Africa records must remain country-aware and flexible.

## Status Logs And Wait Time

Each application should maintain a dated status log.

Minimum intake should require:

- current status
- date this status began
- approximate date toggle

The form may optionally allow previous statuses to be added.

The interface should show status history as a timeline/status log even if only one entry exists at first.

## Pipeline, Backlog, And Stuck Records

Pre-submission and R&D records should be tracked separately as pipeline, not registrar backlog.

The application can exist before submission, but it should not count toward registrar backlog until it has been submitted to the relevant authority or registrar.

Suggested conceptual lanes:

- pipeline / pre-submission
- with registrar
- finalised

Public metrics should distinguish:

- open applications
- backlog applications
- products in pre-submission pipeline
- approved or finalised records

`Open applications` means reviewed applications not yet finalised.

`Backlog applications` means open applications that have exceeded a configurable threshold.

Thresholds should initially be stage-specific, with room to vary later by regime and country.

## Bottleneck Themes

Admin/operator review should assign a controlled bottleneck theme so private blockers can be aggregated safely.

Starter values:

- Proof missing
- Reference issue
- Classification ambiguity
- Regulator delay
- Consent missing
- Membership not verified
- Possible duplicate
- Other

Company and registrar views may show record-level blockers. Public dashboard views should show only aggregate bottleneck themes after review and suppression.

## Status List

**Reconciled against the registrar corpus (Phase 2 extraction).** The controlled statuses below map onto the five official Act 36 process stages — verification → scientific screening → evaluation → decision → appeal — plus the cross-cutting "referred back for missing information" case *[Process Guide §6]*. See `registrar-requirements-spec-v1.md` §3 for the full mapping.

Starter controlled statuses (official stage in brackets):

- preparing submission *(pre-submission — pipeline, not registrar backlog)*
- submitted to registrar *(received)*
- acknowledged / reference issued *(verification; file number issued — not yet an L-number)*
- under screening *(scientific screening)*
- under technical review *(evaluation)*
- query / additional information requested *(referred back — can occur at verification, screening or evaluation)*
- response submitted *(back into screening / evaluation)*
- awaiting decision *(decision)*
- approved / registered *(decision → registered; L-number issued)*
- rejected *(decision → rejected)*
- withdrawn *(withdrawal after evaluation has commenced is treated by the registrar as a rejection, no refund [Process Guide §5.7])*
- under appeal *(appeal to the Minister under section 6 of the Act)*
- unknown / not sure

Use controlled primary statuses plus optional free-text notes.

## Proof And Reference Numbers

Proof and reference come in **two stages** that must not be conflated *[SRF; Process Guide §5.3, §6.1; spec §4]*:

- **Application / file reference** — assigned at submission (the stamped page-1 acknowledgement kept as receipt, plus the Registrar's **file number**). Exists pre-registration.
- **Registration number (L-number)** — issued only on successful registration. Absent for pipeline and in-process records.

"Proof" is likewise staged: **proof of payment** is a distinct mandatory artifact at verification, while the substantive proof of a submission is the **dossier** (List I + List II + supporting studies) — which the tracker records as a single **dossier-readiness** flag, not field-by-field.

Proof of submission should be optional during intake but mandatory for registrar packet inclusion. A reference number should be optional, but a missing one requires an explicit reason.

Suggested reference status:

- provided
- not issued *(pre-registration — no number exists yet)*
- unknown
- lost / unavailable

When no reference number is provided, require a reference note.

## Submission Timestamp Rule

Every completed submission should receive a system-generated timestamp when it is sent for ABA review.

Do not expose submission timestamp as an intake form input. Draft saves may have a separate saved-at timestamp, but they are not submissions.

Downstream operator, company, and registrar views can display `submittedAt` as read-only audit metadata. Public dashboard views should only expose aggregate timestamp ranges where useful for transparency.

## Public Dashboard Metrics

The public dashboard should be auditably derived from reviewed records, even if the first prototype uses placeholder data.

Potential headline metrics:

- applications in backlog
- median wait time
- worst wait time
- product-years waiting

Example derivations:

- applications in backlog = count of reviewed applications currently in non-final statuses and over threshold
- median wait time = median duration in current status or total open duration, depending on final definition
- worst wait time = maximum open duration among reviewed applications
- product-years waiting = sum of open application durations converted to years

The public dashboard should include an anonymisation/suppression note, for example:

`Public metrics are based on submissions reviewed by ABA and aggregated to protect contributor identity.`

The public dashboard should also make the Knowledge Hub boundary clear: tracker metrics are deeper reviewed evidence, while Knowledge Hub Regulatory Signals are lighter public context. Functional category should conceptually align with Product Catalogue, and proof/reference material should conceptually align with Evidence Library.

## CRM Relationship

The tracker should assume the custom CRM is the eventual system of record, but not overfit the wireframes to final CRM implementation.

Conceptual CRM-linked entities:

- Company / Organisation
- Contact Person
- ABA Relationship Type
- Product
- Application / Registration Event
- Status Log Entry
- Attachment / Proof
- Consent / Visibility Setting
- Review Decision
- Export Packet / Registrar Submission Batch

Possible data relationships:

- `intake-flow` creates or updates CRM records
- `admin-operator-review` may become a tracker-specific operator UI or a CRM module/view
- `company-dashboard` reads approved/member-visible CRM data
- `public-dashboard` reads anonymised aggregate data derived from reviewed CRM-backed records
- `registrar-list` exports filtered packets from CRM-backed reviewed records

This relationship remains unresolved at implementation level.

**Alignment with Jen's CRM (2026-07 review).** The membership-ops requirements
(`docs/requirements/aba-public-capture-journeys-and-record-model.md` and `-field-map.md`) confirm the
CRM's canonical records are `Person`, `Organization`, `Product`, `RegistrationSubmission`,
`MembershipApplication`, and `MembershipRelationship` — and that the tracker is *expected to feed*
them. Two handoff points are open with Jen and tracked as **D8** (organisation identity / continuity
linkage — her "Journey E" matching layer; the tracker should defer to the CRM's dedupe, not build its
own) and **D9** (where the verified registration lifecycle lives — likely the CRM `Product` record).
**Naming caution:** the tracker's "renewal" (Act 36 3-year re-registration) is a different concept from
the CRM's "renewals" (membership dues) — do not conflate them.

## Wireframe States To Include

The v1 wireframes should include happy paths plus the most important edge states.

Recommended states:

- intake: not authorised stop state
- intake: save/return state
- intake: missing proof but can continue
- company dashboard: no accepted records yet
- company dashboard: needs clarification
- company dashboard: not export-ready
- company dashboard: included in ABA registrar packet
- public dashboard: suppressed small-cell state
- admin/operator review: duplicate or possible duplicate
- admin/operator review: needs clarification
- admin/operator review: review pending
- registrar list: export blocked because proof or consent is missing

The wireframes should use realistic but fictional placeholder examples and label them as fictional.

## Clean-Break Principle

The v1 HTML wireframes are throwaway prototypes.

They should be easy to delete, rewrite, or rebuild cleanly when the final ABA site/CRM architecture is chosen.

Do not let prototype HTML/CSS become inherited production code by accident.

Shared visual alignment with Jen's work should happen through product decisions, terminology, layout direction, and visual tokens, not through blindly copying prototype markup.
