# ABA Public Capture Field Map

Last updated: 2026-07-01

## Purpose

Map the public-facing ABA capture routes against:
- the fields currently present in the prototype
- the journeys already defined in `aba-public-capture-journeys-and-record-model.md`
- the canonical records the prototype will need later

This note is meant to stop the next tranche from redesigning forms page by page without first locking:
- route intent
- shared capture fields
- route-specific fields
- fields that should move to later review instead of first capture

Current sequencing rule:
- continue resolving the membership-side capture model now
- keep registration-tracker redesign parked for now
- retain tracker notes here only so the shared system model does not lose continuity

## Current public capture routes in the prototype

### Membership

- `docs/membership-flow/apply-full.html`
- `docs/membership-flow/apply-associate.html`
- `docs/membership-flow/apply-observer.html`

### Registration tracker

- `registration-tracker/intake-flow/index.html`

Tracker note:
- this route remains documented in this note
- it is not part of the immediate form-redesign tranche

## Route naming alignment needed before more UI work

The current prototype still mixes older and newer route language.

### Current mismatch

- public form still says `Associate membership`
- membership policy note treats the route as `Technical partner`
- strongest public CTA is intended to be `Join our technical network`

### Working rule

For this tranche:
- keep `Full member`, `Technical partner`, and `Observer` as the canonical category layer
- treat the current associate form as the current implementation of the technical-partner route
- do not let `Associate` become the long-term system label unless ABA deliberately chooses that later

## Shared first-capture fields across membership routes

These fields already behave like common intake fields and should likely remain shared:

- applicant shape
  - organisation
  - individual
- organisation name
- applicant name
- primary contact name
- email
- primary country
- market or regional relevance
- follow-up consent
- newsletter consent
- source or acquisition channel

These fields imply shared canonical records:

- `Person`
- optional `Organization`
- `MembershipApplication`

## Route-by-route field inventory

## 1. Full member application

Source:
- `docs/membership-flow/apply-full.html`

### Current captured fields

#### Applicant basics

- applicant shape
- organisation name
- individual name
- primary contact
- email
- phone
- primary country
- business registration number
- current production or market stage

#### Commercial and product profile

- role(s) in the biologicals sector
  - manufacturer
  - importer
  - distributor
  - product owner
  - small local producer
  - other commercial participant
- product relationship
  - owns products
  - manufactures products
  - imports products
  - distributes products
- biological product categories
  - biofertilisers
  - biopesticides
  - biostimulants
  - other biological category
- countries where market access or registration matters
- registration support interest
  - yes
  - not yet
  - not sure
- product notes

#### Independence and eligibility

- majority African-owned and controlled
- controlled by multinational agrochemical corporation
- ownership notes
- willing to subscribe to code of ethics and independence requirements
- able to speak to regulatory compliance or product status

#### Permissions

- aggregate advocacy/reporting consent
- follow-up consent
- newsletter consent
- source notes

### What this route is already doing well

- distinguishes commercial membership from other routes
- captures enough to support first-pass type review
- starts linking membership intent to product and registration reality

### Main gaps or issues

- no explicit field for applied membership category or applied membership type
  - the page implies `Full member` but does not make the type explicit
- no clear split between category and type
  - for example small manufacturer vs larger commercial manufacturer is still inferred rather than captured cleanly
- registration-support interest is present, but there is no structured handoff field to indicate whether a tracker follow-up should be created
- ownership and independence fields are useful, but some of that detail may belong partly in review rather than pure public capture
- no explicit consent for linking membership application to later registration records

### Likely canonical record implications

- `MembershipApplication`
- `Person`
- `Organization`
- possible future `ReviewCase`
- possible later `MembershipRelationship`
- possible later `RegistrationSubmission`

## 2. Technical partner route

Current implementation source:
- `docs/membership-flow/apply-associate.html`

### Current captured fields

#### Applicant basics

- applicant shape
- organisation name
- applicant name
- primary contact
- email
- country
- primary role or title

#### Expertise and contribution

- expertise areas
  - research or trials
  - regulatory support
  - training or extension
  - field implementation
  - testing, data, or evidence
- biologicals focus areas
  - biofertilisers
  - biopesticides
  - biostimulants
  - cross-category or enabling support
- countries or regions where work is active
- contribution notes

#### Permissions

- aggregate advocacy/reporting consent
- follow-up consent
- newsletter consent
- source notes

### What this route is already doing well

- clearly captures expertise rather than commercial product ownership
- works for individual specialists as well as firms
- begins to support future technical-network matching

### Main gaps or issues

- route naming is outdated relative to the current policy note
- there is no explicit technical-network field even though that is the real public promise
- no structured service-capability layer beyond broad expertise tags
- no structured willingness-to-support fields
  - advisory
  - review
  - field support
  - regulatory support
  - training
- no visibility preference for whether someone wants to be discoverable, invited, or simply connected
- no explicit split between person-first and organisation-first specialist relationships

### Likely canonical record implications

- `MembershipApplication`
- `Person`
- optional `Organization`
- possible future technical-network profile or capability record
- later `MembershipRelationship` under `technical_partner`

## 3. Observer route

Source:
- `docs/membership-flow/apply-observer.html`

### Current captured fields

#### Applicant basics

- applicant shape
- organisation or institution name
- applicant name
- primary contact
- email
- country
- institution type
  - funder or donor
  - development partner
  - public-sector institution
  - regional or multilateral body
  - research or policy institution
  - industry association or sector body
  - other institutional stakeholder

#### Interest and engagement

- sector interest areas
  - biofertilisers
  - biopesticides
  - biostimulants
  - sector development or policy
- observer interests
  - receive sector updates
  - join convenings or briefings
  - follow programme or policy signals
- countries or regions relevant to mandate
- engagement notes

#### Permissions

- follow-up consent
- newsletter consent
- source notes

### What this route is already doing well

- separates institutional stakeholders from commercial applicants
- captures organisation type and engagement intent
- already feels closer to a stakeholder relationship than a commercial member review

### Main gaps or issues

- no explicit field for whether this is truly a membership relationship or a lighter stakeholder class
- no structured policy, programme, or funding intent fields
- no explicit organisation mandate or area-of-work summary
- fewer consent options than the full-member and technical routes
- no structured path for linking an institutional observer to future chapter, programme, or partnership work

### Likely canonical record implications

- `MembershipApplication`
- `Person`
- `Organization`
- later `MembershipRelationship` or a lighter stakeholder relationship record

## 4. Registration tracker intake

Source:
- `registration-tracker/intake-flow/index.html`

### Current captured fields

#### Company and contact

- company name
- company role
  - manufacturer
  - importer
  - local registration holder
  - distributor responsible for registration
  - other authorised representative
- company country
- self-reported ABA relationship
  - full member
  - associate
  - observer
  - non-member
  - not sure / pending
- contact person
- contact email

#### Product and regime

- product name
- functional category
  - biofertiliser
  - biopesticide
  - biostimulant
  - not sure
- country for application
- governing regime
- act 36 legal pathway
- classification code

#### Application and status

- current status
- date status began
- approximate date flag
- registrar reference status
- reference number
- reference unavailable reason

#### Proof and permissions

- proof attached
- proof description
- consent for anonymised public aggregate use
- consent for named registrar packet use

### What this route is already doing well

- captures a more structured regulatory/status object than the membership forms do
- separates private review use from public aggregate use
- already implies a real submission lifecycle rather than a simple lead form

### Main gaps or issues

- relationship labels are outdated
  - still uses `Associate` instead of the newer `Technical partner` direction
- no explicit link field for existing member company vs non-member prospect beyond self-reported status
- no product-owner vs submitter distinction
  - the contact may not be the same as the product owner or company admin
- no clear multi-product or repeated-submission structure
- no route for later conversion into member follow-up or dues context
- limited product metadata so far
  - no active ingredient or product family layer
  - no formulation or evidence-status layer
  - no route-specific commercial intent or market-priority fields

### Likely canonical record implications

- `RegistrationSubmission`
- `Person`
- optional or probable `Organization`
- possible later linkage to `MembershipRelationship`
- possible later linkage to `Product`

## Shared field patterns already visible

Across the current forms, ABA is repeatedly asking for these concepts:

- who is applying or submitting
- whether the relationship is person-led or organisation-led
- country context
- activity area or product category
- what kind of relationship the applicant wants with ABA
- whether ABA may follow up
- where the lead came from

This suggests the prototype should standardise a common public-intake spine around:

- `Person`
- `Organization`
- `ApplicationOrSubmission`
- `ConsentBundle`
- `AcquisitionSource`

## Cross-route gaps against the journey model

## 1. Category and type are still not captured cleanly

The current forms still rely too much on page choice and prose to imply:
- category
- applied type
- review intent

The system model will need explicit fields for:
- `applied_membership_category`
- `applied_membership_type`
- `application_route`

## 2. Relationship continuity is not yet modeled explicitly

A person may:
- submit tracker data before joining
- join as a full member later
- also participate in the technical network
- also remain on updates/newsletter lists

Current public forms do not yet capture enough structure to preserve those overlaps cleanly.

## 3. Technical network capture is still too loose

The current associate form is directionally useful, but it is still a generic application shape.

It does not yet capture:
- support modality
- discoverability preference
- advisory or review availability
- specialist matching attributes

## 4. Full-member capture mixes immediate intake and deeper review

Some full-member questions are appropriate at first capture.

Some may be better as second-step or review-stage fields:
- detailed ownership clarification
- deeper independence notes
- nuanced regulatory-compliance explanation

That split still needs to be designed deliberately.

## 5. Registration intake is structurally stronger than its CRM linkage

The tracker intake is already closer to a real record model than the membership forms.

Its weakness is not the status object.

Its weakness is the missing continuity layer:
- who this contact becomes in ABA
- whether the company later becomes a member
- how repeated submissions relate to one organisation

## Recommended public capture model for the next tranche

## Shared base capture block

Every public route should start from a shared base layer:

- route
- applicant or submitter shape
- person name
- organisation name where relevant
- primary contact
- email
- country
- follow-up consent
- newsletter consent
- source

## Route-specific extension blocks

Then each route adds its own extension layer.

### Full member extension

- commercial role
- market stage
- product relationship
- biological category
- market countries
- registration-support interest
- first-pass eligibility signals
- applied membership type

### Technical partner extension

- role title
- expertise areas
- capability areas
- territories served
- participation mode
- visibility or matching preference

### Observer extension

- institution type
- mandate or policy interest
- engagement mode
- regional scope

### Registration submission extension

- company role in submission
- product identity
- application country
- regime and pathway
- application status
- proof state
- public/private/regulator permissions

## Suggested next working order

1. Freeze route language:
   - full member
   - technical partner
   - observer
   - registration submitter
2. Add the shared public-intake field spine to the system-model note.
3. Decide which full-member fields belong at first capture vs review.
4. Redesign the technical-partner route around true capability and contribution fields.
5. Clarify whether observer is a full membership relationship or a lighter stakeholder record using the same machinery.
6. When tracker work resumes, deepen the tracker intake as a repeatable record layer linked to people, organisations, and possible later membership.

## Immediate implication for implementation

Do not jump straight into redesigning the public forms yet.

The next implementation pass should begin only after:
- the route names are frozen
- shared intake fields are locked
- route-specific extension fields are agreed
- first-capture vs later-review fields are separated deliberately

For the immediate next pass, that means:
- Full member
- Technical partner
- Observer

It does not yet mean redesigning the tracker intake itself.
