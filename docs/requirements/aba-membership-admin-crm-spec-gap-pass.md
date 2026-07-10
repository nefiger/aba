# ABA Membership, Admin, And CRM Spec Gap Pass

Last updated: 2026-06-30

Purpose:
- assess whether the current ABA prototype can function as a trustworthy implementation spec for membership, admin, and CRM-adjacent behavior
- identify what is already well specified versus what is still ambiguous
- create an ordered backlog for the next spec-first tranche

Follow-on note:
- `docs/requirements/aba-unified-membership-tracker-system-contract.md` is the next-pass consolidation of the membership and tracker spine described as a gap in this note.
- Read this file as the diagnostic/background pass, and the unified contract as the current canonical direction for shared records, review objects, consent ownership, and continuity rules.

Primary source surfaces reviewed:
- `docs/requirements/aba-prototype-system-model.md`
- `docs/requirements/african-biologicals-alliance-product-requirements.md`
- `docs/requirements/african-biologicals-alliance-admin-prototype-spec.md`
- `docs/requirements/aba-update-strategy-next-steps-email-notes.md`
- `docs/membership-flow/index.html`
- `docs/membership-flow/apply-full.html`
- `docs/membership-flow/apply-associate.html`
- `docs/membership-flow/apply-observer.html`
- `docs/site/workspace.html`
- `docs/site/operator-workspace.html`

## 1. Summary

The ABA prototype already carries more systems thinking than a normal visual demo.

It already specifies:
- distinct public, member, operator, and export-facing layers
- a review-based membership model rather than instant sign-up
- a linked but separate relationship between membership and tracker intake
- public versus company-private versus operator-only visibility boundaries
- consent-aware movement from raw submission to reviewed intelligence

What is still missing is not "more UI."

What is missing is a more explicit operational data spine that later builders can implement without guessing:
- how people, organisations, applications, memberships, contacts, and submissions relate
- what the canonical CRM-style records are
- which state transitions are allowed
- which operator decisions create downstream records or visibility changes
- how cohort, advisory, and follow-up logic fit into the same model

The prototype is close to a believable product spec, but not yet a safe implementation contract.

## 1A. Clarifications Locked In This Pass

The following decisions are now clear enough to treat as spec direction:

- membership application is separate from registration-tracker intake
- every human in the system should resolve to a `Person` contact record
- people may hold multiple roles across membership, tracker, updates, and technical-network participation
- tracker submitters who are new to the system should create new prospect records with clear source attribution to the tracker
- membership types must remain distinct because they carry different privileges and different dues
- successful membership applications do not become active immediately:
  approval, invoicing, payment, and activation are separate steps
- `applied_membership_type` and `approved_membership_type` should remain separate fields
- ABA needs an internal way to create membership types, group them into categories, and associate fee policies to them

## 2. What The Prototype Already Specifies Well

### Roles and system layers

The current notes and prototype surfaces already define:
- `Public visitor`
- `Applicant`
- `Member company user`
- `ABA operator`
- `Registrar/export context`

This is strong enough to preserve the key public/private boundary decisions.

### Membership as a reviewed relationship

The membership prototype already makes several important decisions explicit:
- membership is reviewed, not automatic
- different membership routes exist for different relationship types
- approval and activation are separate concepts
- Full membership may hand off into tracker intake, but that handoff is not the same as approval

### Tracker and intelligence boundaries

The current model already states that:
- raw submissions do not become public signals automatically
- operator review sits between input and trusted output
- member-facing record visibility is narrower than operator visibility
- regulator/export use is narrower still

### Multi-surface system behavior

The prototype already behaves like a connected system rather than unrelated pages:
- public site explains and routes
- membership forms capture reviewable relationships
- tracker flow captures structured registration records
- operator workspace governs review and release
- company workspace shows scoped follow-up and status

This is the right overall architecture.

## 3. Main Spec Gaps

## Gap 1: The CRM spine is implied, but not yet canonical

The current system model includes `Organization`, `Person`, `MembershipApplication`, `Member`, `RegistrationSubmission`, `PublicSignal`, and `InternalReview`.

That is a strong start, but it still leaves the operational relationship model partly implied.

What is clearer now:
- a separate `MembershipLead` object is probably not required as a primary system record if `Person`, `Organization`, and `MembershipApplication` are modeled properly
- "membership leads" can instead be treated as a derived admin category:
  prospects, partial starts, or relationship prospects with membership intent

What is still unclear:
- whether `Observer` and `Associate` routes create the same underlying relationship object as `Full` membership, or whether they should remain distinct lead/relationship types
- whether `Contact Record` and `Technical Network Lead` are first-class entities in the same CRM spine or only admin list concepts
- how existing organisations and people are matched when a later application or submission arrives

Spec consequence:
- an implementation team would still have to invent the real contact/relationship model

## Gap 2: Membership relationship states need more operational detail

The current model defines:
- application states
- member states

What is still underspecified:
- what operator decision actually creates a `Member`
- whether approval itself creates the relationship record or whether there is a separate acceptance step
- what "pending activation" means operationally across:
  approved, invoiced, paid, and active
- whether "more information required" pauses SLA or remains an active queue state
- what member-facing language should be used while a member is approved but not yet paid and active
- how `inactive` differs from `lapsed`
- whether there are relationship states for:
  invited, referred, deferred, waitlisted, archived

Spec consequence:
- later implementation could collapse review, approval, onboarding, and activation into one step even though the prototype is signaling they are distinct

## Gap 3: The organisation-person model needs to be locked

The application forms currently capture:
- organisation or individual shape
- organisation name
- individual name
- primary contact
- country
- role and market information

What remains ambiguous:
- when an application creates an `Organization` record versus only a pending application
- whether an individual Full member can later become linked to an organisation record
- whether the primary contact is always the applicant person
- whether one organisation can have multiple member-facing users in the future, even if only one is shown now
- how `organisation_name`, `individual_name`, and `contact_name` should map into canonical fields

Clarification from this pass:
- tracker intake should create a new prospect `Person` record, and where relevant a linked prospect `Organization` record, if those do not already exist

Spec consequence:
- the prototype currently demonstrates input capture, but not the final record model those inputs normalize into

## Gap 4: Follow-up, review, and case-handling behavior is not yet formalized

The notes consistently mention:
- review
- more information required
- follow-up
- next actions
- clarification

But the underlying workflow object is still fuzzy.

What is missing:
- whether `InternalReview` is generic enough to represent both membership and tracker handling
- whether operator notes, due dates, owners, and follow-up actions belong on the source record or on a review/case record
- whether a follow-up request creates a durable sub-record or only changes the main record status
- whether one source record can have multiple review passes over time

Spec consequence:
- implementation teams may put workflow fields directly onto every object instead of introducing a cleaner review/case layer

## Gap 5: Consent and visibility rules need a field-level matrix

The prototype already distinguishes:
- anonymised aggregate use
- membership follow-up permission
- newsletter permission
- tracker public aggregate decisions
- regulator/export decisions

What is not yet locked:
- which exact object stores each permission
- whether consent is captured once per organisation, per person, or per submission/application
- how membership-form aggregate consent relates to tracker-form aggregate consent
- whether regulator-facing permission is organisation-level, submission-level, or packet-level
- what happens if a member relationship remains active but a specific submission is not cleared for aggregate or export use

Spec consequence:
- the current principles are strong, but implementation could still mishandle sensitive data because the field-level ownership is not explicit enough

## Gap 6: Non-member to member conversion logic is not yet explicit

The prototype allows both:
- non-member registration submission
- membership-linked registration support

What remains underspecified:
- whether a non-member submitter can later become a member without duplicating organisation and contact records
- whether old submissions should back-link to a later member relationship
- whether member approval changes company workspace access for prior submissions
- whether the operator sees one unified company history across pre-member and post-member activity

Clarification from this pass:
- tracker intake is explicitly an acquisition channel and should create prospect records, not sit outside the relationship model

Spec consequence:
- one of the most valuable ABA propositions, moving from isolated submission into deeper relationship, is not yet fully modeled

## Gap 6A: Dues, invoicing, and annual subscription behavior is now mandatory spec work

The user clarified that successful applicants must:
- be invoiced
- pay their member dues
- only then become active

The prototype therefore needs to model:
- approved but not yet invoiced
- invoiced but unpaid
- active and paid
- inactive or lapsed on renewal/dues logic

This also means membership type policy needs to define:
- membership category
- annual dues amount
- billing cycle
- renewal assumptions
- type-specific privileges

Spec consequence:
- membership status cannot be treated as a simple yes/no flag

## Gap 6B: Membership type privileges need a formal spec layer

It is no longer enough to present membership types as copy variants on a page.

The system needs to define:
- the membership types themselves
- the categories those types sit within
- how they differ
- what privileges each type has
- whether privileges affect:
  voting
  visibility
  workspace access
  participation rights
  tracker support pathways
  communications and governance roles

Spec consequence:
- without this layer, later implementation will improvise access and value logic

## Gap 6C: Membership type administration needs an explicit internal surface

It is not enough to model membership types as static reference data in a note.

ABA needs an internal capability to:
- create a membership type
- assign it to a membership category
- set or revise annual dues
- define privileges and review requirements
- control whether the type is active and available on public forms
- preserve older applications and members against the type that applied at the time

This does not need a full billing platform in the prototype phase.

It does need a clear spec for a lightweight membership-type admin surface or settings area.

Spec consequence:
- without an explicit admin-management layer, builders may hard-code membership types and fees into forms instead of treating them as managed policy objects

## Gap 7: Technical network and advisory records are not yet fully integrated

The broader notes clearly preserve:
- technical network growth
- advisory roles
- expertise coverage
- country/regional specialist capacity

But the system model does not yet fully show how these records live alongside membership and contact records.

What is still unclear:
- whether `Technical Network Lead` is a separate entity or a specialized person/relationship type
- whether advisory candidates can also be members or observers
- whether expertise, availability, geography, and referral logic belong to the person record, a profile record, or a lead record

Spec consequence:
- advisory and specialist growth may drift into a separate spreadsheet mindset instead of belonging to the same system

## Gap 8: Admin information architecture is right, but record ownership is thin

The admin spec is directionally good:
- dashboard
- registration intelligence
- membership leads
- technical network
- contacts/subscribers

What is not yet clear enough:
- what the canonical list item is in each admin area
- when two areas are different slices of the same underlying record
- whether the dashboard summarizes one unified data layer or several disconnected tables
- whether country grouping belongs to the base records or only reporting views

Spec consequence:
- a future admin implementation may mirror pages without sharing an underlying domain model

## 4. Recommended Canonical Data Spine For The Next Spec Pass

The next pass should not invent a production ERP.

It should, however, lock a durable first-pass domain model.

Recommended core records:
- `Organization`
  one company, institution, lab, or body interacting with ABA
- `Person`
  one named individual who may hold multiple relationship roles
- `MembershipApplication`
  one submitted application for a specific route and review cycle
- `MembershipRelationship`
  the durable approved or managed ABA relationship after review
- `MembershipTypePolicy`
  the fee, renewal, and privileges definition for one membership type
- `RegistrationSubmission`
  one product-registration contribution record
- `TechnicalNetworkProfile`
  structured specialist/advisory capability record
- `ContactSubscription`
  communications permission and update relationship record
- `InternalReviewCase`
  operator-managed review and follow-up object linked to a source record
- `PublicSignal`
  reviewed public aggregate output
- `ExportPacket`
  regulator/export-facing reviewed packet snapshot

Recommended supporting records:
- `OrganizationPersonRole`
  link between person and organisation with role label and authority context
- `ConsentRecord`
  optional separate abstraction if permissions become too important to leave embedded
- `ActivityLog`
  optional later abstraction if review history needs durable event tracking

## 5. Recommended Relationship Rules To Lock

These decisions should be made explicitly in the next tranche:

1. `MembershipApplication` is not the same thing as `MembershipRelationship`.
2. `Organization` and `Person` may exist before membership approval.
3. One `Organization` may have many `Person` records.
4. One `Person` may appear in multiple ABA capacities.
5. `RegistrationSubmission` may exist without an active `MembershipRelationship`.
6. Later membership approval may attach to earlier submission history.
7. Public aggregate eligibility and export eligibility are not the same decision.
8. Technical/advisory participation should not live outside the same person-organisation graph.
9. Membership activation happens only after invoicing and payment requirements are met.
10. `applied_membership_type` and `approved_membership_type` must remain separate.
11. Tracker-origin records should preserve acquisition-source attribution at person and organisation level where relevant.
12. Membership types should be managed records, not only hard-coded form options.

## 6. Ordered Spec Backlog

### Priority 1: Lock the operational domain model

Create or update the core system-model notes so they explicitly define:
- canonical records
- record ownership
- relationship links
- deduping/matching assumptions
- which records are durable versus derived

Primary target files:
- `docs/requirements/aba-prototype-system-model.md`
- this note

### Priority 2: Lock membership lifecycle semantics

Define:
- application decision states
- relationship activation states
- invoice and dues states
- onboarding and fee-handling assumptions
- defer/waitlist/archive behavior if needed
- what counts as approval versus activation

This should remove ambiguity between:
- application status
- relationship status
- invoice/payment/subscription status
- workspace access status

### Priority 2A: Lock membership type policies and privileges

Define for each membership type:
- membership category
- annual dues amount
- renewal cadence
- approval criteria
- privileges
- governance or voting role where relevant
- workspace or support entitlements where relevant

Also define:
- who can create or retire membership types
- how public application forms pick up active types
- how historical applications preserve older type definitions if fee policy changes later

### Priority 3: Lock the review/case model

Define whether ABA needs one generic review object for:
- membership applications
- tracker submissions
- technical network review where relevant

At minimum, decide:
- source record link
- owner
- due date
- clarification state
- decision outputs
- follow-up action model

### Priority 4: Lock field-level visibility and consent rules

Create a compact matrix for:
- public
- member-private
- operator-only
- export/regulator-facing

And specify for each meaningful field or field family:
- where it is captured
- who can see it
- whether it is reusable for aggregate/public logic
- whether it is reusable for regulator/export logic

### Priority 5: Lock membership-to-submission linkage

Define the exact operational path for:
- member with no products yet
- member with pending products
- non-member submitter who later becomes a member
- operator view across both relationship and submission history

### Priority 6: Integrate technical network and advisory modeling

Define:
- whether technical network is a lead, a profile, or a relationship type
- how advisory capability is stored
- how it overlaps with member and observer pathways

### Priority 7: Align prototype surfaces with the locked model

Only after the above is clearer, update the prototype pages so:
- forms use canonical labels
- workspace pages reflect the true record/state model
- admin views summarize the same domain model rather than a parallel invented one

## 7. Proposed Immediate Repo Follow-Through

The next concrete ABA work session should do these 3 things:

1. Update `aba-prototype-system-model.md` so it includes the canonical CRM/admin spine rather than only the current public/tracker layer.
2. Add a field-and-visibility matrix note for membership, tracker, and contact/admin records.
3. Add a compact membership-type policy table covering dues, renewal, and privileges.
4. Revise the operator workspace and membership notes so they reference the same canonical relationship objects and states.

## 8. Practical Guardrail

As this prototype becomes a spec, avoid treating:
- forms as the data model
- dashboards as the data model
- page labels as the data model

The durable contract needs to sit in the requirements notes first, then be reflected consistently in the HTML surfaces.
