# ABA Unified Membership And Tracker System Contract

Last updated: 2026-07-09

## Purpose

Absorb the durable planning work from the registration-tracker package into the ABA prototype contract without treating PR #29 wireframes as the new source of truth for the whole repo.

This note is the canonical cross-journey contract for:
- membership capture
- tracker capture
- company continuity
- review and operator handling
- consent and visibility rules
- soft-launch v1 prototype surface scope

Read this together with:
- `docs/requirements/aba-membership-type-policy.md`
- `docs/requirements/aba-public-capture-journeys-and-record-model.md`
- `docs/requirements/aba-public-capture-field-map.md`
- `registration-tracker/data-model-v1.md`
- `registration-tracker/intake-form-spec-v1.md`
- `registration-tracker/page-feed-map-v1.md`

This note wins whenever those sources drift on cross-journey record ownership, continuity, or visibility.

## 1. Product stance

The ABA prototype remains one connected system with separate but related entry routes.

The key rule is:
- membership application is not tracker intake
- tracker intake is not membership approval
- both routes still attach to one shared person-organisation spine over time

The prototype should therefore behave like:
- a public narrative shell
- a set of first-capture routes
- a set of company and operator workspaces
- a stable implementation contract for later builders

The prototype should not behave like:
- one giant generic application form
- disconnected demo pages with separate invented data models
- a tracker branch that displaces the ABA repo as the spec workspace

## 2. Canonical records for v1

These are the canonical durable records for the soft-launch contract.

### Person

One named human contact in the ABA system.

Used for:
- membership applicants
- primary contacts
- tracker submitters
- technical-network participants
- observer representatives
- newsletter or updates subscribers

Key rules:
- every human resolves to one `Person` record over time
- one person may hold multiple ABA roles at once
- route of entry must be preserved through source metadata, not separate duplicate people

### Organization

One company, institution, lab, agency, association, or other body interacting with ABA.

Used for:
- membership applicant organisations
- member companies
- observer institutions
- tracker submitter companies

Key rules:
- an organisation may exist before membership approval
- an organisation may have many linked people over time
- tracker-origin organisations may later become members without record replacement

### OrganizationPersonRole

The link between one `Person` and one `Organization`.

Used for:
- primary contact
- applicant
- authorised tracker submitter
- member company user
- observer representative

Key rules:
- this record carries relationship context, not the base person record
- authority to submit tracker data belongs here, not on `Person` globally

### MembershipTypePolicy

One managed policy record for a membership type.

Used for:
- category and type definitions
- annual dues rules
- privileges
- review requirements
- workspace scope
- tracker support scope

Key rules:
- public forms do not hard-code long-term type semantics
- applications preserve applied and approved type separately
- policy records can change without rewriting historical applications

### MembershipApplication

One public-side application for one membership route and review cycle.

Created by:
- Full member route
- Technical network route
- Observer/institutional route

Key rules:
- one application is not yet a membership relationship
- route context determines much of the category meaning
- review can confirm or revise approved category/type

### MembershipRelationship

The durable approved ABA relationship after review.

Created from:
- an approved `MembershipApplication`

Key rules:
- approval and activation are separate
- `pending_activation` persists until dues, invoicing, and onboarding requirements are satisfied
- relationship status governs member workspace and benefits, not the application alone

### Product

One named product or product concept linked to tracker activity.

Used for:
- product identity
- category
- regime/pathway context

Key rules:
- a product may appear across multiple applications or updates over time
- product identity should not be collapsed into a received packet or receipt/admin event

### Application

One application-level registration record under the tracker model.

Used for:
- service/application type
- status timeline
- benchmark/wait-time logic
- workload and progress tracking
- company workspace status lanes
- public aggregate signals

Key rules:
- `application` is the source-defined unit in the regulator corpus
- this is the record whose regulatory progress ABA tracks
- intake and receipt details may be attached as metadata if needed, but should not be treated as a second source-defined business object here
- public and export decisions operate on reviewed application-level records, not raw receipt/admin data alone

### ConsentRecord

One field-owning consent bundle linked to the source route that captured it.

Used for:
- follow-up permission
- newsletter permission
- public aggregate permission
- named registrar/export permission
- retention or withdrawal decisions where relevant

Key rules:
- membership-route consent belongs to the membership-side source record
- tracker-route consent belongs to the tracker-side source record
- tracker consent does not automatically imply membership consent
- membership consent does not automatically imply tracker public/export consent

### ReviewCase

One operator-managed review and follow-up object linked to a source record.

Used for:
- membership application review
- tracker application review
- clarification requests
- inclusion or exclusion decisions
- audit trail of operator handling

Key rules:
- review decisions should not be scattered as ad hoc fields on every page
- the review object stores operator workflow state
- the source record stores the business data being reviewed

### ContactSubscription

One non-membership communications relationship.

Used for:
- newsletter signups
- stay-informed relationships
- lighter contact capture that should still resolve to the same person spine

### RegistrarPacket

Optional later export-batch record.

Used for:
- versioned regulator/export packet snapshots
- frozen inclusion lists
- export status

Key rules:
- this remains preview-only for v1 unless later implementation work deepens it
- packet eligibility is narrower than company-private visibility

## 3. Canonical journey-to-record map

### Full member route

Creates:
- `Person`
- optional `Organization`
- `OrganizationPersonRole`
- `MembershipApplication`
- membership-side `ConsentRecord`

May later create:
- `MembershipRelationship`
- `ReviewCase`
- tracker-linked records if product support is later pursued

### Technical network route

Creates:
- `Person`
- optional `Organization`
- `OrganizationPersonRole`
- `MembershipApplication`
- membership-side `ConsentRecord`

May later create:
- `MembershipRelationship`
- specialist profile behavior through role and capability fields, not a separate disconnected spreadsheet model

### Observer/institutional route

Creates:
- `Organization`
- `Person`
- `OrganizationPersonRole`
- `MembershipApplication`
- membership-side `ConsentRecord`

May later create:
- `MembershipRelationship`

### Registration tracker route

Creates:
- `Person` if new
- `Organization` if new
- `OrganizationPersonRole`
- tracker-side `ConsentRecord`
- one or more `Product`
- one or more `Application`
- intake or receipt metadata attached to the application where needed

May later create:
- `ReviewCase`
- later membership application and relationship links without replacing the tracker history

### Stay-informed / updates route

Creates:
- `Person`
- optional `Organization`
- `ContactSubscription`

## 4. State model and continuity rules

### Membership application states

Canonical states:
- `draft`
- `submitted`
- `under_review`
- `more_information_required`
- `approved`
- `declined`
- `withdrawn`

### Membership relationship states

Canonical states:
- `pending_activation`
- `active`
- `inactive`
- `lapsed`

Meaning:
- `pending_activation` = approved but not yet fully active
- `active` = approved and financially/onboarding complete enough for live member benefits
- `inactive` = relationship deliberately not active for an operational reason other than normal lapse
- `lapsed` = dues or renewal obligations were not maintained

### Tracker states

`Application` is the business record and should carry:
- current official status
- official stage
- service/application type
- status timeline
- benchmark/wait calculations
- lane placement such as pipeline / with registrar / finalised

If ABA needs to keep intake or receipt history, that should be treated as metadata attached to the
application rather than as a second named canonical business object in this note.

### Review states

`ReviewCase` should be able to represent:
- `new`
- `in_review`
- `clarification_requested`
- `resolved`
- `excluded`

Case outputs should include:
- application decision where relevant
- public aggregate inclusion
- company-visible review outcome
- registrar/export eligibility

## 5. Cross-journey rules that are now locked

### Membership and tracker remain separate entry journeys

Do not collapse them into one first-capture form.

Full-member capture may ask whether registration support is relevant.
Tracker capture may ask self-reported ABA relationship.
Neither route should attempt to fully perform the other route's job.

### Handoff from membership to tracker is a linked next step

If a Full member applicant signals product-registration relevance:
- keep that signal on `MembershipApplication`
- do not create tracker records automatically at first capture
- use it to drive follow-up or a later tracker intake handoff

### Non-member tracker continuity is mandatory

A non-member tracker submitter must be able to:
- remain only a tracker-linked prospect
- later become a member
- later appear in technical-network or general-contact contexts

That means:
- create prospect-style `Person` and `Organization` records immediately when needed
- preserve `registration_tracker` as acquisition source
- attach later membership records back to the same org/person spine

### Company workspace is narrower than operator view

Company workspace may show:
- that organisation's own reviewed records
- member-facing statuses
- blockers
- next actions
- company-private details allowed by review and membership context

Company workspace may not show:
- raw global tracker data
- other organisations
- operator-only notes or internal comparison logic

### Public regulatory-signals pages use reviewed aggregate data only

Public signals must derive from:
- reviewed records
- permitted public aggregate consent
- public inclusion decisions

Public signals must never derive directly from raw intake alone.

### Operator review is the central gate

Operator review is the gate between raw input and:
- public intelligence
- company workspace release
- registrar/export inclusion

The source record provides the facts.
The `ReviewCase` provides the governed decision trail.

### Registrar/export use is narrower than company-private use

Registrar/export eligibility requires more than company visibility.

At minimum, later builders should assume:
- reviewed record
- explicit named-use consent
- operator inclusion
- export-suitable record completeness

Packet use must remain narrower than:
- company-private workspace visibility
- public aggregate inclusion

## 6. Consent and visibility ownership

### Consent ownership

Use this ownership rule everywhere:

- `MembershipApplication` owns membership-route follow-up and application-side permissions through its `ConsentRecord`
- tracker-side application intake owns tracker aggregate and named-use permissions through its `ConsentRecord`
- `ContactSubscription` owns general updates/newsletter permissions
- `MembershipRelationship` may reference standing member status, but does not rewrite earlier route-specific consent decisions

### Visibility tiers

Use these four durable tiers:
- `PUBLIC_AGGREGATE`
- `COMPANY_PRIVATE`
- `OPERATOR_ONLY`
- `NEVER_STORED`

### Field-family visibility rules

Membership-route applicant and organisation basics:
- company/private or operator-only depending on field sensitivity
- never public raw

Tracker product and status fields:
- company-private at record level
- public only in reviewed aggregate form

Tracker reference and regulator-facing details:
- company-private or operator-only
- never public aggregate as named record detail

Contact and approved-person PII:
- company-private when it is the submitting organisation's own data
- operator-only for broader workflow handling
- never public raw

Dossier and payment documents:
- `NEVER_STORED` in the tracker for v1
- readiness or attached-state flags may be stored

## 7. Soft-launch v1 spec-bearing surfaces

These are the minimum surfaces that count as spec-bearing for the next ABA tranche.

### Public ABA homepage and route framing

Surface type:
- public narrative shell

Spec role:
- explain the system
- route people into membership, tracker, and knowledge/intelligence paths

### Full member application

Surface type:
- first-capture form

Spec role:
- define commercial/member intake
- capture future tracker relevance without becoming tracker intake

### Technical network application

Surface type:
- first-capture form

Spec role:
- define capability and contribution intake

### Observer/institutional application

Surface type:
- first-capture form

Spec role:
- define institution-first stakeholder capture

### Tracker intake

Surface type:
- first-capture form

Spec role:
- define structured registration submission capture

### Member company workspace

Surface type:
- company-private workspace

Spec role:
- define company-scoped visibility, statuses, blockers, and next actions

### Public regulatory-signals / tracker aggregate view

Surface type:
- public intelligence surface

Spec role:
- define reviewed public aggregate outputs and suppression expectations

### Membership operations queue / approval / invoicing / activation

Surface type:
- operator/admin surface

Spec role:
- define membership review, type assignment, dues, invoice, and activation handling

### Operator tracker review

Surface type:
- operator/admin surface

Spec role:
- define review, clarification, inclusion, and visibility gating for tracker records

### Registrar/export packet concept

Surface type:
- deferred preview

Spec role:
- define the narrowed export concept and consent boundary
- remain preview-only until later work resolves deeper packet semantics

## 8. PR #29 contradictions to resolve before absorbed-and-accepted status

These are explicit reconciliation tasks, not reasons to ignore the tracker package.

### D1 / SACNASP mismatch

Resolved in this tranche:
- tracker data model, intake spec, and wireframe now all treat SACNASP as a verification-state capture, not a raw-number-first field

Ongoing rule:
- keep verification-state wording canonical unless a later implementation deliberately adds a governed credential-reference flow

### Dossier / payment mismatch

Resolved in this tranche:
- tracker model and export/intake wording now treat dossier and proof-of-payment as readiness or attached-state flags, not stored tracker documents

Ongoing rule:
- ABA-wide contract keeps dossier/payment as flags only
- any later export implementation must align to reference/readiness logic, not stored document bundles

### Repo-role mismatch

Resolved in this tranche:
- tracker handoff now treats this repo as a valid ABA planning/spec workspace even if later implementation happens elsewhere

Ongoing rule:
- treat any external build context as implementation detail only
- do not let it displace this repo as the source of planning truth for the ABA prototype

## 9. Follow-on implementation order

Once this note is accepted, execute the next tranche in this order:

1. Update tracker-related and ABA requirements notes so they point at this contract for shared record ownership, visibility, and continuity.
2. Align membership and tracker forms to the canonical capture rules in this note.
3. Align shared mock data so membership, tracker, and membership-ops surfaces use the same person, organisation, application, and relationship states.
4. Only then do targeted UI/spec page updates where pages still imply the wrong model.

## 10. Acceptance checks for this tranche

This note succeeds if a later implementer can answer all of the following without invention:

- What record is created by each public route?
- How does a tracker submitter become a member later without duplicate person or organisation history?
- What is the difference between `MembershipApplication`, `MembershipRelationship`, `Application`, and application intake metadata?
- Which field families are public aggregate, company-private, operator-only, or never stored?
- What operator action is required before data appears in company workspace, public signals, or registrar/export context?
- Which prototype surfaces are in-scope for v1, and which remain preview-only?

If another note or wireframe conflicts with those answers, this note should be treated as the canonical integration layer.
