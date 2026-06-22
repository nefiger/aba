# Registration Tracker Context And Decisions V1

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
- `registrar-list`
- `admin-operator-review`

Each product area should eventually receive its own focused brief and low-fidelity HTML wireframe.

Suggested files:

- `intake-flow/intake-flow-brief-v1.md`
- `company-dashboard/company-dashboard-brief-v1.md`
- `public-dashboard/public-dashboard-brief-v1.md`
- `registrar-list/registrar-list-brief-v1.md`
- `admin-operator-review/admin-operator-review-brief-v1.md`

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

The public dashboard should allow aggregate filtering by:

- all reviewed submissions
- ABA member submissions
- non-member submissions

These filters must be phrased neutrally and combined with strong suppression rules to avoid revealing individual contributors.

Pre-submission pipeline may appear as a separate future pipeline signal, but it must not be mixed into registrar backlog metrics.

The public dashboard may also show aggregate evidence packet activity, such as:

- registrar evidence packets prepared
- applications represented in submitted packets
- most recent packet period

This should remain aggregate and should not name companies.

### Registrar List

The registrar list is the final export-facing packet/list.

It should default to reviewed, consented, operator-approved ABA member records.

Non-member submissions may be visible in adjacent review context or as excluded/upgrade candidates, but they should not be included in the registrar packet by default.

Registrar packet inclusion should require:

- reviewed record
- verified ABA member status
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
- member/non-member exclusion logic

### Admin / Operator Review

The admin/operator review area is the control point where raw intake submissions become trusted records.

It should allow ABA staff to:

- triage submissions
- verify proof
- inspect consent and visibility settings
- verify member status
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
- verified membership status
- data quality status
- public aggregate eligibility
- registrar packet eligibility
- operator inclusion decision
- clarification needed

## Membership Status

ABA membership status should be a first-class company-level field that carries through every view.

Suggested statuses:

- member
- non-member
- unknown / pending
- lapsed, if needed later

The intake flow should ask for self-reported membership status:

- yes
- no
- not sure / pending

The admin/operator review area should distinguish between:

- self-reported membership status
- verified membership status

Membership status affects:

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
- ABA membership status
- company role

Contact person fields may include:

- name
- email
- phone, optional
- role/title
- permission to contact

Only companies or authorised representatives responsible for registration should submit registration information.

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

## Product Axes And Regime Logic

Functional category should be global and always visible.

Suggested values:

- biofertiliser
- biopesticide
- biostimulant
- not sure

Country and governing regime should always be visible.

Legal pathway and classification code should be conditional, especially for South African Act 36 records.

For South Africa, the prototype should support:

- Agriculture / Act 36
- public-health pest control
- water treatment
- other

Under Agriculture / Act 36, show:

- legal pathway, such as Group 3 fertilizer / agricultural remedy / not sure
- classification code, such as M / L / K / unknown

For non-South Africa countries, the model should remain country-aware and flexible.

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

## Status List

Starter controlled statuses:

- preparing submission
- submitted to registrar
- acknowledged / reference issued
- under screening
- under technical review
- query / additional information requested
- response submitted
- awaiting decision
- approved / registered
- rejected / withdrawn
- unknown / not sure

Use controlled primary statuses plus optional free-text notes.

## Proof And Reference Numbers

Proof of submission should be optional during intake but mandatory for registrar packet inclusion.

Registrar reference number should be optional, but missing references require an explicit reason.

Suggested reference status:

- provided
- not issued
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

## CRM Relationship

The tracker should assume the custom CRM is the eventual system of record, but not overfit the wireframes to final CRM implementation.

Conceptual CRM-linked entities:

- Company / Organisation
- Contact Person
- Membership Status
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
