# ABA Membership Type Policy

Last updated: 2026-06-30

Purpose:
- define the canonical ABA membership types that power public application forms, internal review, member activation, dues handling, and permissions
- separate membership-type policy from the wording of the current prototype pages
- give later implementation work a stable reference for categories, fees, privileges, and admin-management behavior

Primary source surfaces reviewed:
- `docs/membership-flow/index.html`
- `docs/membership-flow/membership-types.html`
- `docs/membership-flow/apply-full.html`
- `docs/membership-flow/apply-associate.html`
- `docs/membership-flow/apply-observer.html`
- `docs/requirements/aba-prototype-system-model.md`

## 1. Core policy direction

The ABA prototype currently implies 3 visible membership types:
- `Full`
- `Associate`
- `Observer`

These should now be treated as managed policy records, not only as application-form choices.

Current clarification from the June 30 review:
- `Full member`, `Technical partner`, and `Observer` should be treated as categories
- the specific member options inside those categories should be modeled as types
- ABA should keep a strong public route for technical partners, consultants, agronomists, advisors, and specialists
- the strongest public CTA for that route is likely `Join our technical network`

Each membership type needs:
- a type code
- a public label
- a membership category
- an annual dues rule
- a privilege set
- review requirements
- an active/inactive availability state

## 2. Membership categories

At the current spec level, the cleanest structure is:

### Full member

For voting and commercially grounded ABA membership.

Current likely types inside this category:
- `Student`
- `Individual`
- `Manufacturer (small)`
- `Manufacturer (commercial)`

### Technical partner

For specialist, advisory, scientific, implementation, agronomic, and enabling contributors.

Current likely types inside this category:
- `Consultant`
- `Agronomist`
- `Researcher`
- `Regulatory specialist`
- `Service provider`

### Institutional and stakeholder

For institutions and stakeholders participating from a sector-support or sector-observation position.

Current likely types inside this category:
- `Government agency`
- `Development partner`
- `Funder`
- `International partner`

These categories are useful for:
- public route guidance
- internal admin grouping
- fee-policy administration
- future expansion if ABA later adds more types without breaking the model

## 2A. Full member type taxonomy

`Full member` should remain one top-level category for now, but it should contain distinct member types.

Current likely types:
- `student`
- `individual_member`
- `manufacturer_small`
- `manufacturer_commercial`

Possible additional slices still to be settled:
- product owner
- importer
- distributor
- smaller local producer
- grower or practitioner where relevant

Recommended modeling approach:
- keep one `Full member` category at top level
- add a concrete membership type field under that category on the application and approved relationship
- allow ABA to revise the internal type taxonomy without rewriting the whole category model

Why this matters:
- pricing may vary inside Full member types
- eligibility review may vary by type
- some privileges or support pathways may vary by type
- reporting should distinguish commercial cohorts more precisely than one generic bucket

## 3. Canonical membership type table

### Full member category

- `membership_category_code`: `full_member`
- `public_label`: `Full member`
- `application route`: `apply-full.html`
- `current prototype signal`: voting route, strongest connection to registration and market-access support
- `review expectation`: eligibility and independence review required
- `tracker relationship`: strongest connection to product-registration support and intake handoff where relevant
- `fee_display_rule`: `R-- placeholder`
- `billing_cycle`: annual
- `status`: active category once configured by ABA admin

Current likely types:
- `Student`
- `Individual`
- `Manufacturer (small)`
- `Manufacturer (commercial)`

Current privilege direction:
- voting rights: yes
- governance participation: full, one vote
- member relationship status: full member relationship
- tracker support pathway: strongest
- registration eligibility checker: yes
- registration guidance: paid value-add
- pre-submission audits: yes
- alternatives database: listed
- chapter access: full access to tools, knowledge base, support, events
- company workspace eligibility: yes where relevant

### Technical partner category

- `membership_category_code`: `technical_partner`
- `public_label`: `Technical partner`
- `public_cta`: `Join our technical network`
- `application route`: currently aligns most closely with `apply-associate.html`
- `current prototype signal`: non-voting specialist and enabling pathway
- `review expectation`: contribution-fit review required
- `tracker relationship`: may support members or sector capability, but does not imply the same commercial registration pathway as Full member
- `fee_display_rule`: `Contact us`
- `billing_cycle`: annual where applicable, otherwise policy-defined
- `status`: active category once configured by ABA admin

Current likely types:
- `Consultant`
- `Agronomist`
- `Researcher`
- `Regulatory specialist`
- `Service provider`

Current privilege direction:
- voting rights: no
- governance participation: supported, non-voting
- member relationship status: technical partner relationship
- registration eligibility checker: no default assumption
- registration guidance: not included by default
- pre-submission audits: no
- chapter access: TBC
- company workspace eligibility: not assumed by default

Positioning note:
- this should be presented as an intentional parallel route, not a secondary leftover category
- the underlying capture may still reuse the current associate form until the prototype copy is revised

### Observer category

- `membership_category_code`: `observer`
- `public_label`: `Observer`
- `application route`: currently aligns most closely with `apply-observer.html`
- `current prototype signal`: non-voting institutional route
- `review expectation`: institutional fit and engagement-intent review required
- `tracker relationship`: not the primary route for tracker-linked company support
- `fee_display_rule`: `Board invite only`
- `billing_cycle`: policy-defined if used
- `status`: controlled category once configured by ABA admin

Current likely types:
- `Government agency`
- `Development partner`
- `Funder`
- `International partner`

Current privilege direction:
- voting rights: no
- governance participation: observer-only unless separately defined
- member relationship status: observer relationship
- policy representation: read-only briefings
- chapter access: TBC
- company workspace eligibility: not assumed by default

## 4. Policy fields every membership type should carry

Minimum first-pass fields:
- `membership_category_code`
- `membership_type_code`
- `public_label`
- `membership_category`
- `description`
- `annual_dues_amount`
- `currency`
- `billing_cycle`
- `voting_rights`
- `governance_participation_level`
- `workspace_access_scope`
- `tracker_support_scope`
- `review_requirements_summary`
- `is_active`
- `display_order`
- `effective_from`
- `effective_to` where relevant

Optional but useful fields:
- `fee_notes`
- `internal_policy_notes`
- `reclassification_allowed`
- `default_visibility_scope`
- `fee_display_rule`

## 5. Applied type versus approved type

The system must preserve:
- `applied_membership_category`
- `applied_membership_type`
- `approved_membership_category`
- `approved_membership_type`

Why this matters:
- ABA may reclassify an application into a different type during review
- fee handling may depend on the approved category and type, not the requested one
- historical reporting should preserve both applicant intent and final decision

## 6. Dues and activation rules

Membership types should own their dues policy.

Current required direction:
- dues are annual
- amount differs by membership type
- members are not active immediately on approval
- approved members must be invoiced and pay dues before activation

This means the membership system must separate:
- application approval
- invoice issuance
- payment confirmation
- member activation
- later renewal and lapse logic

## 7. Privilege model to carry into implementation

The prototype does not yet need a full permissions engine.

It does need a stable privilege summary per membership type.

At minimum, privileges should be defined across these dimensions:
- voting rights
- governance participation
- access to member-only communication or convening
- access to company-scoped workspace views
- access to tracker-linked support pathways
- visibility or eligibility for certain follow-up services
- access to chapter tools, knowledge base, support, and events
- access to policy briefings or read-only institutional briefings

The spec should avoid pretending that all members are equivalent if the routes are intentionally different.

The screenshot reviewed on 2026-06-30 adds useful first-pass signals:
- `Full member`: 1 vote, full policy representation, registration-eligibility checker access, paid registration guidance, pre-submission audits, alternatives database listing, strongest chapter/tool access
- `Technical partner`: no vote, supported policy relationship, lighter or limited registration pathway, chapter access TBC, contact-led fee path
- `Observer`: no vote, read-only briefings, board-invite or tightly controlled institutional access, chapter access TBC

These should be treated as draft privilege-direction inputs, not yet final policy.

## 8. Admin-management requirements

ABA needs an internal place to manage membership types as policy records.

Minimum actions:
- create a membership type
- create a membership category where needed
- assign a category
- set annual dues
- set privilege summary
- set review requirements
- activate or deactivate a type
- control public display order
- manage type options inside each category

Required behavior:
- public forms should only show active types
- deactivated types should not disappear from historical records
- members and applications should preserve the type and fee context that applied at the time of decision
- category and type should both be preserved historically if the taxonomy changes later

## 8A. Technical partner positioning rule

The public experience should not make technical specialists feel like an afterthought.

ABA should maintain:
- a strong primary CTA for commercial/full members
- a strong parallel CTA for technical partners, consultants, agronomists, advisors, and specialists

For now, this likely means:
- using `Technical partner` as the category/system label
- using `Join our technical network` as the strongest public CTA
- keeping it coordinated with the wider `Technical Network` story already present in the site

## 9. Current open questions

These still need explicit policy decisions:
- exact annual dues for each type
- whether category-level default fees or rules should exist
- whether Full member types should affect dues or privileges
- whether Technical partner and Observer have any formal governance participation beyond non-voting status
- whether Technical partner members can ever receive specific workspace or service entitlements
- whether Observer is a true membership relationship or a more limited stakeholder class that still uses the membership machinery

## 9A. Stay informed and newsletter relationship

ABA should also preserve a general non-member relationship path for people who are not applying for membership yet.

This should exist as a clear public `Stay informed` or newsletter path and should likely be reinforced in a universal footer or similarly persistent site element.

These contacts should enter the system as newsletter or stay-informed contacts, not as members.

However, they should remain usable later for:
- recruiting future members
- fundraising follow-up
- advocacy or campaign communication
- convening and event communication
- broader ecosystem relationship-building

## 10. Recommended next follow-through

1. Update the main system-model note to point explicitly to this policy note as the canonical membership-type reference.
2. Add a compact privileges matrix once ABA is ready to define rights more concretely.
3. Update membership-facing prototype copy once final dues and privilege distinctions are confirmed.
