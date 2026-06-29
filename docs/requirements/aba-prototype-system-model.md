# ABA Prototype System Model

Last updated: 2026-06-29

Purpose:
- define the product behavior behind the current ABA prototype
- keep the data model, roles, states, and visibility rules aligned with what the prototype demonstrates
- give the prototype a stable systems spine before any separate implementation process begins

## 1. Product modules in scope

The current prototype acts as one connected system with 6 linked modules:

1. Public ABA site
2. Membership application flow
3. Registration tracker intake
4. Member company workspace
5. ABA operator workspace
6. Registrar/export workspace

The Biologicals Explorer is part of the same public story, but it is not yet the deepest modeled subsystem in this tranche.

The prototype also needs to lock 4 structural UI decisions because it is acting as the spec:
- the top-level navigation model
- the landing page for each major module
- the visual asset direction needed for a complete snapshot
- the reusable UI patterns that later become a design system

## 2. Core roles

### Public visitor

Can:
- read the ABA public site
- explore Biologicals Explorer public surfaces
- open the tracker presenter page
- submit a product registration record if authorised
- begin a membership application

Cannot:
- see company-private registration detail
- see operator review controls
- see registrar/export packet detail

### Applicant

This is a person or organisation in the act of applying for membership.

Can:
- submit a membership application
- receive a submission state
- receive follow-up requests
- in the Full membership route, continue into product intake where relevant

Cannot:
- assume approval is immediate
- access member workspace by default

### Member company user

This is a verified ABA member with company-scoped access.

Can:
- see their company-specific tracker records
- see status, blockers, evidence readiness, and next actions
- respond to follow-up or clarification requests

Cannot:
- see other companies' records
- see operator-only review decisions beyond what is surfaced as a member-facing state

### ABA operator

This is the internal ABA review and workflow role.

Can:
- review membership applications
- update applicant/member status
- review tracker submissions
- control public aggregate inclusion
- control registrar/export eligibility
- prepare export-facing packet views

### Registrar/export context

This is not a standalone user role in the prototype. It is an ABA-controlled export context.

Can:
- show only the subset of reviewed records approved for named regulator engagement
- preserve packet version, status, and inclusion logic

Cannot:
- expose the full internal review workspace
- expose public-only or unrelated membership data

## 3. Core entities

### Organization

Represents a company, institution, lab, association, or other body interacting with ABA.

Fields shown or implied:
- organization_name
- organization_type
- primary_country
- membership_relationship
- membership_status
- ownership_or_independence_notes

Relationships:
- can have many `Person`
- can have many `MembershipApplication`
- can become one `Member`
- can have many `RegistrationSubmission`

### Person

Represents an individual applicant, contact, or organisation-linked user.

Fields shown or implied:
- full_name
- email
- phone
- role_title
- organisation_link
- authorisation_status for tracker submission where relevant

### MembershipApplication

Represents an application to join ABA.

Fields shown or implied:
- applicant_shape
- applicant_person
- organization_link
- membership_type
- primary_country
- sector_roles
- activity_areas
- market_countries
- registration_support_interest
- has_products flag
- consent flags
- source_notes
- operator_notes

Status model:
- draft
- submitted
- under_review
- more_information_required
- approved
- declined

### Member

Represents an approved ABA membership relationship.

Fields shown or implied:
- organization_link or individual_link
- membership_type
- membership_status
- verified_relationship_label
- country_scope
- member_visibility_scope

Status model:
- pending_activation
- active
- inactive
- lapsed

### Product

Represents a biological product or product concept tied to a registration record.

Fields shown or implied:
- product_name
- functional_category
- application_country
- regime
- act36_pathway when relevant
- classification_code when relevant

### RegistrationSubmission

Represents a product registration record submitted through the tracker flow.

Fields shown or implied:
- submitting_organization
- contact_person
- self_reported_membership_relationship
- product_link
- current_status
- status_started_at
- approximate_date flag
- reference_status
- reference_number or unavailable_reason
- proof_status
- proof_description
- bottleneck_theme
- public_aggregate_consent
- named_registrar_consent

Status model:
- draft
- submitted_for_review
- accepted_tracker_record
- needs_clarification
- excluded
- export_ready

### RegistrationStageEvent

Represents a status point in the product-registration journey.

Fields shown or implied:
- registration_submission_link
- stage_name
- stage_started_at
- approximate_date flag
- notes

### Country

Represents the operating country or regulatory context tied to a record.

Fields shown or implied:
- country_name
- current_operating_relevance
- aggregate_reporting_grouping

### PublicSignal

Represents the public-safe aggregate expression of tracker data.

Fields shown or implied:
- country
- stage counts
- bottleneck patterns
- time-in-stage trends
- public narrative framing

Rules:
- aggregate only
- no proprietary company detail
- no protocol-level detail

### InternalReview

Represents an ABA operator-controlled decision record.

Fields shown or implied:
- source_record_type
- source_record_id
- owner
- review_status
- bottleneck_theme
- clarification_required flag
- duplicate_flag
- public_decision
- packet_decision
- operator_inclusion_decision
- follow_up_action

## 4. System flows

### Public membership flow

1. Visitor chooses membership route.
2. Visitor submits Full, Associate, or Observer membership application.
3. A `MembershipApplication` record is created.
4. ABA operator reviews application.
5. Application moves to:
   - `under_review`
   - `more_information_required`
   - `approved`
   - `declined`
6. If approved, a `Member` relationship can be activated.

### Full membership with product-registration relevance

1. Visitor applies for Full membership.
2. Application captures whether registration support or product relevance exists.
3. If product-registration relevance is present, the next step is the tracker intake flow.
4. Membership review and tracker intake remain linked but distinct.
5. Operator can see both the membership context and the tracker submission context.

### Non-member registration tracker flow

1. Authorised representative opens tracker intake.
2. They pass the authorisation gate.
3. A `RegistrationSubmission` record is created for review.
4. ABA operator reviews, clarifies, includes, or excludes.
5. Public aggregates and export packet logic depend on operator decisions and consent.

### Member company workspace flow

1. Verified member company user opens their workspace.
2. They see only their company-scoped records.
3. They can see:
   - current statuses
   - blockers
   - evidence readiness
   - next actions
4. They do not see other companies or operator-only detail.

### Operator review flow

1. ABA operator receives membership and tracker records.
2. Operator verifies relationship, proof, reference logic, and consent.
3. Operator sets:
   - public aggregate inclusion
   - registrar/export eligibility
   - operator inclusion decision
4. Operator may request clarification, exclude, or prepare export-ready records.

### Registrar/export flow

1. ABA operator selects eligible reviewed records.
2. Packet version and status are recorded.
3. Export packet preserves:
   - included record set
   - blockers
   - packet version
   - packet status
   - generation date

## 5. Visibility rules

### Public

May include:
- ABA public positioning
- membership routes
- tracker intake
- aggregate regulatory signals
- public-safe Explorer content

Must not include:
- proprietary protocols
- company-private registration detail
- unreviewed or internal operator notes

### Company/member-private

May include:
- organisation-scoped tracker records
- next actions
- status detail
- evidence readiness

Must not include:
- other companies' records
- unrelated operator queues

### ABA operator only

May include:
- review queue
- membership verification
- proof/reference review
- duplicate and clarification controls
- public and export decisions

### Registrar/export-facing

May include:
- reviewed, consented, selected records
- packet versioning and blockers

Must not include:
- full internal operator queue
- unrelated membership-review content

## 6. Prototype states that must remain visible

The prototype should continue to visibly demonstrate:
- membership application states
- review and follow-up states
- member activation states
- tracker record states
- export eligibility states
- public vs private boundaries

These visible states are part of the spec and should not be hidden behind purely narrative documentation.
