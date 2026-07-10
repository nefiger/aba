# ABA Public Capture Journeys And Record Model

Last updated: 2026-07-01

## Purpose

Pause feature implementation long enough to reconstruct the real public-side journeys already implied by the ABA prototype and requirements notes.

This note is the bridge between:
- public-facing entry points
- captured form fields
- canonical internal records
- later member, admin, CRM, and finance workflows

The immediate goal is not to perfect UI.

The goal is to understand who the different users are, what they are trying to do, what data ABA needs from them, and what record each journey should create.

Canonical cross-reference:
- `docs/requirements/aba-unified-membership-tracker-system-contract.md` now locks the shared record set, journey-to-record map, continuity rules, and visibility contract across membership and tracker routes.
- Read this note for route intent and user-journey framing, and the unified contract for canonical record ownership and handoff behavior.

## Why this note is needed now

The current prototype already implies several distinct user journeys:
- joining ABA as a member
- joining the technical network
- expressing observer or institutional interest
- submitting product registration information
- moving from non-member engagement into deeper ABA relationship

Those journeys overlap, but they are not the same.

If the public/frontend capture work proceeds without locking them first, the forms will either:
- collapse unlike users into one generic application
- capture too little information for later review and follow-up
- or capture the wrong information too early

## Core product entry points already confirmed

From the current notes and platform direction, the 3 main public entry points remain:

1. `Join ABA`
2. `Registration Tracker`
3. `Biologicals Explorer`

For journey design, the first 2 matter most right now.

## Core user groups to design for

### 1. Full membership applicant

This is a person or organisation seeking commercially grounded ABA membership.

Current likely examples:
- student
- individual member
- manufacturer (small)
- manufacturer (commercial)

Primary intent:
- join ABA as a reviewed member
- access member benefits
- potentially receive registration support

Likely downstream outcomes:
- `MembershipApplication`
- later `MembershipRelationship`
- linked `Organization`
- linked `Person`
- possible later `DuesObligation` or `Invoice`
- possible later `RegistrationSubmission`

### 2. Technical network applicant

This is a specialist, advisor, researcher, consultant, regulatory expert, or service provider.

Current likely examples:
- consultant
- agronomist
- researcher
- regulatory specialist
- service provider

Primary intent:
- join ABA's technical network
- contribute expertise
- be discoverable or engage in sector support

Likely downstream outcomes:
- `MembershipApplication` or a closely related specialist-relationship application
- linked `Person`
- optional linked `Organization`
- later `MembershipRelationship` in the technical-partner category
- possible CRM-style follow-up and advisory matching

Important note:
- this should not be treated as a second-class leftover version of full membership
- it is its own intentional route with different capture needs and different review criteria
- public capture should gather factual expertise and contribution data, not ask the applicant to self-classify into redundant internal types

### 3. Observer or institutional stakeholder applicant

This is an institutional or stakeholder participant whose role is not ordinary commercial membership.

Current likely examples:
- government agency
- development partner
- funder
- international partner

Primary intent:
- observe, support, connect, or engage with ABA at an institutional level

Capture-shape rule:
- this route should be institution-first
- it should capture the institution plus the primary contact ABA should work with
- it should not behave like a generic person-or-organisation membership form

Likely downstream outcomes:
- `MembershipApplication`
- linked `Organization`
- linked `Person`
- possible later `MembershipRelationship` in the observer or stakeholder category

### 4. Non-member registration submitter

This is a person or organisation using the tracker before becoming a member.

Primary intent:
- submit product registration information
- gain visibility on status, blockers, and follow-up

Likely downstream outcomes:
- `RegistrationSubmission`
- new prospect `Person`
- optional prospect `Organization`
- acquisition-channel tagging to `registration_tracker`

Important note:
- this is not the same journey as a membership application
- but it should feed the same CRM spine later

### 5. Member company user

This is a verified ABA member acting inside a company or organisation context.

Primary intent:
- manage or monitor their company-specific registration and membership-related work

This is not a first-capture journey in the same way as the others.

It matters here because earlier capture should prepare for:
- company-scoped access
- multiple contacts over time
- pre-member and post-member continuity

## Journey map

## Journey A: Full member path

### Start condition

User arrives from:
- public site
- `Join ABA`
- likely motivated by representation, registration support, member benefits, or sector participation

### Public promise

The route needs to clearly signal:
- reviewed membership
- commercial or practitioner relevance
- later member benefits
- possible connection to registration support

### Capture needs

Minimum first-pass capture likely includes:
- applicant shape
- organisation name
- individual name where relevant
- primary contact name
- email
- phone
- country
- operating role
- market or activity region
- applied membership category
- applied membership type
- product or registration-support interest
- whether the applicant currently has products needing support
- consent and communications permissions

### Record creation

Creates:
- `MembershipApplication`
- `Person`
- optional or probable `Organization`

### Review phase

ABA operator reviews:
- eligibility
- independence or fit
- type/category correctness
- whether more information is required

### Approval phase

If approved:
- `approved_membership_category`
- `approved_membership_type`
- later `MembershipRelationship`

### Finance phase

If invoicing is required:
- create dues obligation
- issue invoice
- confirm payment

### Active state

Only after approval plus finance completion:
- member becomes active
- member-facing workspace and benefits can become available where relevant

### Possible onward branch

Where relevant:
- hand off into registration-tracker capture

Important rule:
- the handoff is related, but it is not the same thing as membership approval

## Journey B: Technical network path

### Start condition

User arrives from:
- public site
- technical network invitation or discovery
- specialist or professional interest

### Public promise

The route needs to clearly signal:
- expertise-based participation
- advisory or specialist contribution
- non-voting or different-governance relationship where relevant
- visibility and matching into ABA's technical ecosystem

### Capture needs

Minimum first-pass capture likely includes:
- person name
- organisation name where relevant
- profession or role title
- expertise areas
- countries of operation
- services or support areas
- regulatory, agronomic, scientific, or implementation capabilities
- technical-network interest
- willingness to advise, review, or support
- contact and communications permissions

### Record creation

Creates:
- `MembershipApplication` in the technical-partner category or an equivalent specialist-intake record if later separated
- `Person`
- optional `Organization`

### Review phase

ABA operator reviews:
- expertise fit
- duplication against existing network
- suitability for later advisory or service contribution

### Approval phase

If approved:
- create technical-partner relationship
- classify expertise for later search, referral, or contact use

### Ongoing objective

This journey is not mainly about dues or product registration.

It is about:
- expert network building
- specialist discoverability
- sector-support capability

## Journey C: Observer or stakeholder path

### Start condition

User arrives from:
- public site
- strategic invitation
- institutional interest in the alliance

### Public promise

The route needs to clearly signal:
- institutional participation
- observer or support role
- non-standard governance or access

### Capture needs

Likely first-pass capture:
- organisation name
- primary representative
- organisation type
- country or regional remit
- reason for interest
- expected role in relation to ABA
- partnership or support interest

### Record creation

Creates:
- `MembershipApplication`
- `Organization`
- `Person`

### Review phase

ABA operator reviews:
- alignment
- value to the alliance
- correct category or type

### Ongoing objective

This is a stakeholder relationship journey, not a product-support journey.

## Journey D: Registration tracker path for non-members

### Start condition

User arrives from:
- public site
- `Registration Tracker`
- immediate need to submit or organise registration information

### Public promise

The route needs to clearly signal:
- structured registration visibility
- better paper trail and bottleneck tracking
- member and non-member use where applicable

### Capture needs

Likely first-pass capture:
- submitting person
- organisation
- authorisation to submit
- product details
- country/regime
- current registration state
- blockers
- evidence/proof availability
- permissions for aggregate use
- permissions for regulator/export use

### Record creation

Creates:
- `RegistrationSubmission`
- prospect `Person` if needed
- prospect `Organization` if needed

### Review phase

ABA operator reviews:
- completeness
- clarity
- whether public aggregate use is allowed
- whether regulator-facing use is allowed

### Ongoing objective

This journey supports:
- member value
- acquisition
- sector intelligence
- regulator engagement

### Important relationship to membership

A non-member submitter may later become:
- a member
- a technical-network contact
- or remain only a tracker-linked prospect

The system therefore needs continuity between tracker acquisition and later relationship creation.

## Journey E: Conversion and continuity path

This is not one form.

It is the cross-journey rule that someone who first appears through one route can later deepen their relationship without duplication.

Examples:
- tracker submitter later becomes a full member
- technical-network contact later becomes a paid member
- observer relationship later becomes more active

This means the public-side capture model must support:
- matching people and organisations over time
- preserving acquisition source
- linking later applications and submissions to earlier records

## Canonical records that public capture must feed

Based on the current prototype, public capture should feed these core records:

- `Person`
- `Organization`
- `MembershipApplication`
- `MembershipRelationship`
- `MembershipTypePolicy`
- `RegistrationSubmission`
- `DuesObligation` or `Invoice`
- future review/case layer where needed

## Public-side field-model implications

The public/frontend capture work now needs to answer these questions explicitly.

### 1. Which fields are shared across all membership routes

Likely shared:
- contact identity
- organisation/individual shape
- country
- consent
- route selection

### 2. Which fields are route-specific

Examples:
- product/registration-support fields for full members
- expertise and capability fields for technical network
- partnership-intent fields for observer/stakeholder routes

### 3. Which fields belong to person vs organisation vs relationship

This distinction needs to become visible in the capture model, not only in later implementation notes.

### 4. Which fields are needed only after review

Not everything should be captured upfront if:
- it is only meaningful after approval
- it creates friction too early
- it belongs to an internal process rather than public application

## Immediate design rules for the next tranche

Before implementing more frontend capture screens:

1. lock the route map
2. lock the user groups
3. lock the minimum fields per route
4. lock the record each route creates
5. lock the handoff from capture into review and later relationship state

## Recommended next work order

1. Review existing public entry points against these journeys
2. Map the current forms field by field
3. Identify shared vs route-specific fields
4. Identify missing fields required by later admin/CRM/finance logic
5. Only then redesign or extend the public/frontend capture surfaces
