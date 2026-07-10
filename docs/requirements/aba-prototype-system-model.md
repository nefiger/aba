# ABA Prototype System Model

Last updated: 2026-07-01

Purpose:
- define the product behavior behind the current ABA prototype
- keep the data model, roles, states, and visibility rules aligned with what the prototype demonstrates
- give the prototype a stable systems spine before any separate implementation process begins

Canonical cross-reference:
- `docs/requirements/aba-unified-membership-tracker-system-contract.md` is now the canonical cross-journey contract for shared record ownership, tracker-to-membership continuity, consent ownership, and v1 surface scope.
- This file remains useful for the broader prototype system framing, but the unified contract should win if there is any drift on membership/tracker integration behavior.

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

Current sequencing rule for the public capture tranche:
- continue deepening the membership-side public intake model now
- keep registration-tracker redesign parked for now
- allow tracker references only where the membership model needs a future handoff or continuity rule

Prototype implementation approach for this tranche:
- do not build a real database-backed system
- use one canonical mock data layer for membership policy, fake records, and scenario states
- let multiple prototype surfaces read from that shared data layer so the system behaves coherently
- use stateful demos and curated examples rather than persistence, auth, or real CRUD

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
- acquisition_channel
- relationship_stage
- authorisation_status for tracker submission where relevant

Notes:
- every individual in the system should resolve to a `Person` record
- a person may hold multiple roles at once:
  applicant, member contact, tracker submitter, subscriber, technical-network participant
- if a tracker submitter is new to the system, a new `Person` record should be created as a prospect with a clear `acquisition_channel` link to `registration_tracker`

### MembershipApplication

Represents an application to join ABA.

Fields shown or implied:
- applicant_shape
- applicant_person
- organization_link
- applied_membership_category
- applied_membership_type
- approved_membership_category
- approved_membership_type
- primary_country
- sector_roles
- activity_areas
- market_countries
- registration_support_interest
- has_products flag
- consent flags
- source_notes
- operator_notes
- operator_decision_reason
- invoicing_required flag

Status model:
- draft
- submitted
- under_review
- more_information_required
- approved
- declined

Rules:
- `MembershipApplication` is separate from `RegistrationSubmission`
- approval does not make the member active by itself
- an application may be approved into a different membership type from the one originally applied for
- `applied_membership_category`, `applied_membership_type`, `approved_membership_category`, and `approved_membership_type` must remain separate fields

### Membership public-intake spine

For the current non-tracker tranche, the public membership forms should be treated as one shared intake model with route-specific extensions.

#### Shared first-capture fields

These fields should be common across `Full member`, `Technical partner`, and `Observer` routes:

- application_route
- applicant_shape
- applicant_person_name
- organization_name where relevant
- primary_contact_name where relevant
- email
- phone where relevant
- primary_country
- regional_scope or market_scope
- follow_up_consent
- newsletter_consent
- source_channel

#### Full member extension

Adds fields such as:

- applied_membership_category = `full_member`
- applied_membership_type
- sector_roles
- product_relationship
- market_stage
- activity_areas
- market_countries
- registration_support_interest
- independence_signals
- ownership_or_group_notes

Rules:
- this route may capture that registration support is relevant
- it should not become the tracker form itself
- future tracker handoff should be a linked next step, not a mixed single form

#### Technical partner extension

Adds fields such as:

- applied_membership_category = `technical_partner`
- applied_membership_type
- role_title
- expertise_areas
- capability_areas
- countries_of_operation
- contribution_modes
- discoverability_preference
- contribution_notes

Rules:
- this route is the intentional public technical-network path
- current prototype wording may still say `Associate`, but the system label should be `Technical partner`
- this route should optimize for capability and contribution matching, not commercial product ownership

#### Observer extension

Adds fields such as:

- applied_membership_category = `observer`
- applied_membership_type
- institution_type
- interest_areas
- engagement_modes
- mandate_regions
- engagement_notes

Rules:
- this route should optimize for stakeholder or institutional relationship capture
- it should not inherit commercial-member assumptions by default

#### Out of scope for this immediate tranche

The following should remain documented, but not drive the next public-form redesign pass:

- tracker-specific product fields
- tracker-specific status history fields
- regulator/export packet fields

The only tracker-adjacent membership-side concern that remains in scope now is:
- whether a full-member applicant signals likely future registration-support follow-up

### MembershipType

Represents a defined ABA membership category and the policy attached to it.

Fields shown or implied:
- membership_category_code
- membership_type_code
- public_label
- membership_category
- annual_dues_amount
- billing_cycle
- privileges_summary
- voting_rights flag where relevant
- workspace_access_scope
- tracker_support_scope where relevant
- review_requirements_summary
- is_active
- display_order

Rules:
- membership types are distinct and should not be flattened into a single generic member class
- different membership types may have different dues, approval logic, and privileges
- ABA needs an internal way to create and manage membership types, categories, and fee policies

Reference note:
- see `docs/requirements/aba-membership-type-policy.md` for the current canonical first-pass taxonomy and policy direction

### Member

Represents an approved ABA membership relationship.

Fields shown or implied:
- membership_category
- organization_link or individual_link
- membership_type
- membership_status
- verified_relationship_label
- country_scope
- member_visibility_scope
- application_link
- approved_at
- activated_at
- annual_dues_amount
- dues_cycle
- invoice_status
- payment_status
- renewal_due_on
- privileges_summary

Status model:
- pending_activation
- active
- inactive
- lapsed

Rules:
- successful applicants must be invoiced and pay member dues before becoming `active`
- annual dues are typically charged yearly and may vary by membership type
- `pending_activation` covers approved members who are not yet active because invoicing, payment, or onboarding is incomplete
- `lapsed` should be used where renewal or dues obligations were not maintained

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
- acquisition_channel
- prospect_person_link where relevant
- prospect_organization_link where relevant

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

### ContactSubscription

Represents a general stay-informed, newsletter, or updates relationship.

Fields shown or implied:
- person_link
- organization_link where relevant
- subscription_type
- source_channel
- advocacy_contact_ok flag
- fundraising_contact_ok flag
- recruitment_contact_ok flag
- newsletter_consent
- active_status

Rules:
- this is separate from membership and tracker records
- newsletter or stay-informed contacts should still resolve to the same person/contact spine
- these contacts may later support recruiting, fundraising, advocacy, or broader relationship-building

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
2. Visitor submits Full member, Technical partner, or Observer membership application.
3. A `MembershipApplication` record is created.
4. ABA operator reviews application.
5. Application moves to:
   - `under_review`
   - `more_information_required`
   - `approved`
   - `declined`
6. If approved, a `Member` relationship is created in a pending activation state.
7. Member is invoiced according to the approved membership type and annual dues rules.
8. Member becomes `active` only after dues/payment requirements are satisfied.

### Stay informed / newsletter flow

1. Visitor signs up for updates through a public stay-informed entry point.
2. A `Person` record is created or matched.
3. A `ContactSubscription` record is created with clear source attribution.
4. ABA may later use this contact base for newsletter, advocacy, recruitment, convening, or fundraising follow-up according to captured permissions.

### Full membership with product-registration relevance

1. Visitor applies for Full membership.
2. Application captures whether registration support or product relevance exists.
3. If product-registration relevance is present, the next step is the tracker intake flow.
4. Membership review and tracker intake remain linked but distinct.
5. Operator can see both the membership context and the tracker submission context.

Current sequencing note:
- this linkage should stay in the system model
- the tracker form itself is not the current redesign focus

### Non-member registration tracker flow

1. Authorised representative opens tracker intake.
2. They pass the authorisation gate.
3. If person or organisation does not already exist, the system creates prospect records with clear source attribution to the tracker.
4. A `RegistrationSubmission` record is created for review.
5. ABA operator reviews, clarifies, includes, or excludes.
6. Public aggregates and export packet logic depend on operator decisions and consent.

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
- member dues and subscription status where relevant

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
- invoice, payment, or annual subscription gating before active status
- general stay-informed capture as a purposeful route, not an afterthought
- tracker record states
- export eligibility states
- public vs private boundaries

For the immediate non-tracker capture tranche, the highest-priority visible states are:
- membership route choice
- application submission state
- review and clarification state
- approval versus pending activation
- dues or subscription gating before active membership

These visible states are part of the spec and should not be hidden behind purely narrative documentation.

## 7. Prototype delivery rule

For this ABA tranche, the prototype should behave like a spec-driven front end over a future system model, without becoming a real application backend.

Preferred implementation pattern:
- static reference data for membership categories, types, privileges, fee-display rules, and status models
- realistic fake records for applications, members, prospects, tracker-origin contacts, and subscribers
- curated scenario views for admin and operator flows
- shared mock data across public forms and internal prototype surfaces

Avoid by default:
- real database work
- real persistence
- overbuilt backend architecture
- fake complexity that does not improve the demo or the spec
