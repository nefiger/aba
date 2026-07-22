# ABA Soft-Launch Common Record, Field, and State Contract

Status: G1 governing contract for reference-prototype work
Version: 0.1
Last updated: 2026-07-20

## 1. Purpose

Define one coherent soft-launch data contract across public membership interest, the single member application, membership review and activation, Technical Network recruitment, Lyle's registration-tracker handoff, and operational handling.

This contract resolves the main conflict in the older notes: a public interest, intake submission, membership application, membership relationship, technical profile, and tracker submission are not interchangeable, even when they connect to the same person and organisation over time.

It is technology-neutral. Phase 3 maps it onto the production monorepo and records naming or migration differences.

## 2. Governing principles

1. One human resolves to one `Person` over time.
2. One organisation resolves to one `Organisation` over time.
3. A person may hold several roles and relationships without duplicate person records.
4. Every organisation completes the same member application, regardless of cohort or release stage.
5. The form creates an `IntakeSubmission`; known relationships and internally held source metadata determine reconciliation without changing what the applicant sees or completes.
6. A membership application is not an active membership relationship.
7. Technical Network participation is a reviewed expert relationship, not automatically membership.
8. Tracker participation is not membership and never supplies unrelated communication consent.
9. Each permission belongs to the route and purpose that captured it.
10. Raw personal, company, product, and registration information is never public by default.
11. Policy that is not approved remains data to collect/review, not logic to enforce silently.

## 3. Core records

### 3.1 Person

One named human.

Minimum fields:

- `id`
- `given_name`
- `family_name`
- `preferred_name` — optional
- `primary_email`
- `primary_phone` — optional where route permits
- `country_of_residence` — optional unless required by route
- `created_at`
- `updated_at`

Matching candidates:

- normalised email;
- phone where supplied;
- name plus linked organisation, used only for review rather than automatic merge.

Do not store route-specific roles, consent, expertise, or membership status directly on `Person`.

### 3.2 Organisation

One company, institution, laboratory, association, agency, or other body.

Minimum fields:

- `id`
- `legal_name`
- `trading_name` — optional
- `registration_number` — optional until policy makes it required
- `website` — optional
- `organisation_kind`
- `primary_country`
- `operating_countries` — optional, multi-value
- `created_at`
- `updated_at`

Matching candidates:

- registration number plus jurisdiction where available;
- normalised legal name plus country;
- website domain as a review signal, never the sole automatic key.

### 3.3 OrganisationPersonRole

The time-bound relationship between a person and organisation.

Minimum fields:

- `id`
- `person_id`
- `organisation_id`
- `role_title`
- `relationship_role`
- `is_primary_contact`
- `authority_scope`
- `effective_from`
- `effective_to` — optional

Authority is contextual. A person authorised for membership intake is not automatically authorised for named tracker use.

### 3.4 AcquisitionSource

Preserves how a person or organisation first and subsequently entered ABA.

Minimum fields:

- `id`
- `person_id`
- `organisation_id` — optional
- `source_route`
- `campaign_or_invitation_reference` — optional
- `first_touch_at`
- `captured_at`

Allowed first-release route values:

- `public_membership_interest`
- `founding_member_intake`
- `invited_member_intake`
- `technical_network`
- `registration_tracker`
- `manual_import`

### 3.5 ConsentRecord

One versioned permission or acknowledgement tied to a specific person, source record, purpose, and wording.

Minimum fields:

- `id`
- `person_id`
- `source_record_type`
- `source_record_id`
- `purpose_code`
- `wording_version`
- `status`
- `captured_at`
- `withdrawn_at` — optional
- `capture_method`

First-release purpose codes:

- `process_membership_intake` — processing basis/acknowledgement, not marketing consent
- `receive_aba_updates`
- `technical_network_follow_up`
- `tracker_follow_up`
- `tracker_public_aggregate_use`
- `tracker_named_registrar_use`

One purpose never implies another.

### 3.6 IntakeSubmission

The immutable submission envelope created whenever the member application is completed.

Minimum fields:

- `id`
- `application_source` — internal provenance such as `founding_member`, `later_cohort`, or `public`; assigned by ABA or the release channel, not selected by the applicant and never used to change the form page
- `person_id`
- `organisation_id`
- `organisation_person_role_id`
- `invitation_reference` — optional
- `submitted_at`
- `source_snapshot`
- `processing_status`
- `supersedes_submission_id` — optional

Processing states:

- `received`
- `matching`
- `reconciliation_required`
- `processed`
- `superseded`

This record proves what was submitted. It does not decide membership status.

### 3.7 MembershipApplication

One reviewable request for membership.

Created from the canonical member application. If the organisation already has an active founding relationship, review may reconcile the submission with that relationship instead of treating it as a new membership decision.

Minimum fields:

- `id`
- `intake_submission_id`
- `person_id`
- `organisation_id`
- `application_route`
- `applied_category` — may be inferred during review where policy permits
- `applied_type` — optional until review
- `approved_category` — optional
- `approved_type` — optional
- `status`
- `submitted_at`
- `decided_at` — optional

States:

- `submitted`
- `more_information_required`
- `approved`
- `declined`
- `withdrawn`

There is no saved `draft` in v1. Internal work is represented by `ReviewCase`, not a required public `under_review` status.

### 3.8 MembershipRelationship

The durable relationship after approval or the existing relationship reconciled for a founder.

Minimum fields:

- `id`
- `person_id` — optional for organisation-held membership where policy permits
- `organisation_id` — optional only for truly individual membership
- `membership_category`
- `membership_type`
- `status`
- `effective_from`
- `effective_to` — optional
- `source_application_id` — optional for reconciled historic founders
- `policy_version_id` — optional until policy is configured

States:

- `pending_activation`
- `active`
- `suspended`
- `deactivated`
- `lapsed` — supported in the model but not applied until renewal policy is approved

Approval does not equal activation.

### 3.9 MembershipPolicyVersion

A dated policy record governing a membership category or type.

Potential fields include code and public label; eligibility/review summary; dues, currency and cadence; governance/voting rights; privileges; and active dates.

No unapproved fee, eligibility threshold, voting right, or privilege may be enforced in the soft launch. Intake captures factual evidence for later review instead.

### 3.10 PublicInterest

A public request to hear about membership opening or relevant ABA updates.

Minimum fields:

- `id`
- `person_id`
- `organisation_id` — optional
- `interest_topic`
- `source_route`
- `status`
- `created_at`

States:

- `active`
- `withdrawn`
- `converted` — linked later to an intake/application without deleting the interest history

Permission to send updates belongs to the linked `ConsentRecord`.

### 3.11 TechnicalNetworkApplication

One reviewed request by an expert to join ABA's Technical Network.

Minimum fields:

- `id`
- `person_id`
- `organisation_id` — optional
- `organisation_person_role_id` — optional
- `professional_title`
- `expertise_areas`
- `biologicals_focus_areas`
- `countries_or_regions`
- `contribution_modes`
- `availability_summary` — optional
- `motivation`
- `values_alignment_acknowledged_at`
- `code_of_conduct_version`
- `code_of_conduct_accepted_at`
- `directory_visibility_preference`
- `status`
- `submitted_at`

States:

- `submitted`
- `more_information_required`
- `accepted`
- `declined`
- `withdrawn`

This record is not a membership application.

### 3.12 TechnicalNetworkProfile

The active, governed expert profile created after acceptance.

Minimum fields:

- `id`
- `technical_network_application_id`
- `person_id`
- `organisation_id` — optional
- `status`
- approved expertise/capability tags;
- approved countries/regions;
- approved contribution modes;
- public discoverability status;
- `effective_from`
- `effective_to` — optional

States:

- `active`
- `paused`
- `removed`

Public discoverability requires a separate approved publication basis. Acceptance does not make a profile public automatically.

### 3.13 ReviewCase

One operator workflow record attached to an intake, application, expert-network application, or tracker source.

Minimum fields:

- `id`
- `source_record_type`
- `source_record_id`
- `owner_user_id`
- `status`
- `due_at` — optional
- `decision_code` — optional
- `decision_reason` — operator-only
- `created_at`
- `resolved_at` — optional

States:

- `new`
- `in_review`
- `clarification_requested`
- `resolved`
- `excluded`

### 3.14 OrganisationBrandAsset

One real organisation logo or brand file and its publication permission.

Minimum fields:

- `id`
- `organisation_id`
- `asset_path`
- `asset_kind`
- `display_name`
- `permission_status`
- `permission_recorded_at`
- `approved_for_public_display_at`
- `effective_to` — optional

Prototype placeholders do not create this record and must remain clearly fictional.

### 3.15 Tracker-owned records

The website contract recognises, but does not redefine, Lyle's tracker submission, product, registration application, consent, review, and permitted-publication records.

Final production names and fields are an owner dependency. Integration rules are fixed:

- tracker records link to the same matched person and organisation where permitted;
- tracker consent remains tracker-specific;
- tracker use never creates membership, membership interest, or Technical Network participation automatically;
- membership signals registration relevance but never creates tracker records automatically;
- only reviewed, permitted data can feed public output.

## 4. Member-application field contract

Every organisation answers the same questions on the canonical member-application page. Prefill may reduce retyping in production, but every value remains visible for confirmation or correction and does not change the form's public wording.

### Person and contact

- first name;
- last name;
- preferred name — optional;
- work email;
- phone — optional unless operations makes it required;
- country of residence — optional if organisation country and role are sufficient.

### Organisation and authority

- legal or commonly used organisation name;
- trading name — optional;
- registration number and jurisdiction — optional pending policy;
- website — optional;
- primary country;
- countries/regions of operation;
- organisation kind;
- role/title;
- primary-contact status;
- authority to provide the submitted organisation information.

### Biologicals and operating profile

- roles in the sector: manufacturer, formulator, importer, distributor, product owner, researcher, service provider, other;
- biologicals focus: biofertilisers, biopesticides, biostimulants, other/enabling;
- current operating/market stage;
- countries where market access or registration matters;
- whether products/registrations are currently in play;
- concise optional context, followed by a separate tracker handoff rather than tracker fields inside membership intake.

### Locally rooted and eligibility-relevant facts

Until policy/legal review is complete, collect facts without calculating eligibility automatically:

- ownership/control description;
- local manufacturing/formulation/research activity;
- local employment, skills, or innovation activity;
- relationship to multinational agrochemical control — factual declaration;
- willingness to comply with approved ABA values, governance requirements, and code of conduct.

Detailed evidence or clarification belongs in review, not first capture.

### Participation and priorities

- areas in which the applicant expects to participate or contribute;
- priority sector/regulatory issues;
- interest in technical, knowledge, convening, communication, or governance activity, with no promise of unapproved privileges.

### Submission and communication

- accuracy/authority declaration;
- privacy/data-use acknowledgement;
- optional permission to receive ABA updates;
- source/invitation context captured by the system, not reselected by the user.

Tracker public/named-use consent never appears in this form.

## 5. Public membership-interest field contract

Keep this deliberately light:

- first name;
- last name;
- email;
- organisation — optional;
- country — optional;
- relationship to biologicals — concise choice or optional short field;
- interest topic: future membership and relevant ABA updates;
- explicit permission to receive those communications;
- consent wording version and timestamp.

This route creates no membership application.

## 6. Technical Network field contract

### Identity and professional context

- first and last name;
- work email;
- phone — optional;
- country;
- professional title/role;
- organisation/affiliation — optional;
- relevant professional registration or credential summary — optional and not automatically verified.

### Expertise and contribution

- expertise areas;
- biologicals focus areas;
- countries/jurisdictions of experience;
- years or level of relevant experience — optional factual indicator;
- contribution modes: review, research, trials, agronomy/field implementation, regulation/policy, training/extension, data/evidence, manufacturing/quality, economics/markets, other;
- availability/capacity summary — optional;
- motivation for joining;
- relevant links or short evidence reference — optional, no sensitive documents by default.

### Alignment and permission

- acknowledgement of ABA's vision and values;
- acceptance of the versioned code of conduct;
- permission for ABA to follow up about the application;
- separate preference for later public directory/profile visibility;
- privacy/data-use acknowledgement.

## 7. Visibility and publication

| Information family | Public | Person/organisation private | ABA operator | Never stored in v1 |
|---|---:|---:|---:|---:|
| Public ABA narrative | Yes | Yes | Yes | — |
| Raw public-interest contact data | No | Own data only if self-service later exists | Yes | — |
| Raw member application | No | Own data only if a portal later exists | Yes | — |
| Membership category/status | Only with approved publication basis | Own/authorised organisation | Yes | — |
| Technical Network application | No | Own data only if self-service later exists | Yes | — |
| Approved expert profile | Only if separately approved for directory visibility | Yes | Yes | — |
| Organisation logo | Only with recorded permission | Yes | Yes | — |
| Tracker record details | Aggregate only after review/permission | Authorised organisation | Yes | — |
| Tracker named registrar use | No public display | Authorised organisation | Yes | — |
| Full confidential dossiers and payment documents | No | No | No | Yes |
| Operator notes/decision reasons | No | No | Yes | — |

## 8. Required route outcomes

| Route | Source record | Immediate outcome | Must not create automatically |
|---|---|---|---|
| Public membership interest | `PublicInterest` + consent | Active consented interest/contact relationship | Membership application, membership, tracker record |
| Member application | `IntakeSubmission` + reviewable application handling | Submission received; known records reconciled and application reviewed according to current membership status | Active membership, tracker record, communication consent without opt-in |
| Technical Network | `TechnicalNetworkApplication` | Expert application in `submitted` state and review case | Membership, public expert profile, advisory promise |
| Registration tracker | Lyle-owned tracker records | Tracker submission/review flow | Membership, interest subscription, unrelated communication consent |

## 9. Duplicate and reconciliation rules

- Never auto-merge solely on name.
- Exact normalised email may propose a person match but consequential conflicts require review.
- Registration number plus jurisdiction may propose an organisation match.
- Preserve every source submission even when records are merged/reconciled.
- A match never transfers consent from one route or purpose to another.
- A known founding-member record may prefill values for confirmation where technically possible, but must not hide or omit questions.
- Conflicting founder details create a reconciliation case rather than silently overwriting trusted data.

## 10. G1 boundaries carried forward

The following remain explicit dependencies rather than hidden assumptions:

- final membership eligibility definition;
- membership categories/types, dues, privileges, voting/governance, renewal and lapse rules;
- approved ABA values and code of conduct;
- operational owners and response targets;
- final privacy/retention/correction/deletion policy;
- Lyle's final tracker contract;
- production-model mapping and migrations;
- real member logos and display permission.

These do not block the reference prototype because it can show required fields, states, placeholders, and boundaries without enforcing or promising unresolved policy. They do block production cutover where relevant.

## 11. Reference-prototype acceptance

The prototype must make this contract legible through:

- one member application with the same URL, introduction, questions, action and confirmation for every cohort;
- no founder field omissions;
- a distinct light public-interest form;
- a distinct Technical Network expert application;
- tracker orientation/handoff that collects no tracker data itself;
- precise confirmation states;
- no implication that submitting the application automatically creates or changes membership status;
- no implied automatic membership, expert acceptance, product publication, or tracker/public-data use;
- realistic duplicate, validation, failure, and success states;
- neutral member-logo placeholders;
- single-line hero titles at every supported viewport.
