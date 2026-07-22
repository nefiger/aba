# African Biologicals Alliance Admin Prototype Spec

This document defines the first-pass admin/backend prototype scope for ABA.

This is a concept and interface spec, not a full systems implementation plan.

Implementation approach for this prototype phase:
- no real database is required
- admin views should be driven by shared mock data and realistic example records
- the goal is to demonstrate model, workflow, and visibility logic rather than persistence or heavy CRUD

## 1. Purpose

The admin prototype should give ABA an internal home for:
- viewing the records created by the 4 public flows
- grouping records by country
- seeing the emerging registration intelligence picture
- identifying where people or products appear stuck

The admin must stay lightweight for now. It does not need deep workflow automation or complex chapter handoff behavior yet.
It also does not need a real backend or database layer for this prototype tranche.

## 2. Core Admin Jobs

The admin prototype must allow staff to:
- view incoming leads and submissions
- understand volume by flow type
- filter records by country
- see registration submissions in aggregate
- spot bottlenecks, delays, and stuck patterns
- review technical network growth at a basic level

## 3. Primary Record Types

The admin should explicitly support these 4 record types.

### Membership Leads

Typical fields:
- person or organization name
- stakeholder type
- country
- notes or status

### Registration Applications

Typical fields:
- product or application name
- country
- stage
- product category if available
- described bottlenecks
- time in stage if available

### Contact Records

Typical fields:
- name
- email
- country if captured
- communication preferences

### Technical Network Leads

Typical fields:
- name
- organization
- country
- expertise area
- specialist notes

## 4. Recommended Information Architecture

Recommended top-level admin navigation:

1. Dashboard
2. Registration Intelligence
3. Membership Leads
4. Technical Network
5. Contacts / Subscribers
6. Membership Types

Optional future section:
- Countries

## 5. Dashboard Spec

### Purpose

Provide an at-a-glance picture of incoming activity and where attention may be needed.

### Recommended dashboard content

Summary cards:
- total membership leads
- total registration submissions
- total technical network leads
- total contacts/subscribers

High-level visual blocks:
- submissions by country
- submissions by stage
- recent activity stream
- flagged “stuck” or delayed registrations

### Dashboard questions it should answer

- where is activity coming from
- which flow is growing
- are registrations clustering in certain countries
- are there obvious bottleneck signals

## 6. Registration Intelligence Section

This is the most important area of the admin prototype.

### Purpose

Turn registration submissions into an internal evidence surface.

### Recommended layout

1. summary metrics row
2. filters bar
3. main charts / visual blocks
4. submission table or record list

### Summary metrics

Recommended first-pass cards:
- total registrations tracked
- countries represented
- most common current stage
- count of stuck or delayed cases

### Filters

Required first-pass filters:
- country
- stage
- product category if available
- date range

Optional first-pass filter:
- bottleneck theme

### Recommended visual blocks

- `Registrations by Country`
- `Registrations by Stage`
- `Most Common Bottlenecks`
- `Time Stuck by Stage`
- `Application Trend Over Time`

### Supporting record view

The intelligence section should also include a list/table view for submissions so staff can move from aggregate view to specific records.

Recommended columns:
- product or record name
- country
- stage
- category
- time in stage
- bottleneck summary

## 7. Definition Of “Stuck”

For prototype purposes, “stuck” can be treated as a conceptual status rather than a hard business rule.

The UI should suggest that a record may be flagged as stuck based on:
- unusually long time in stage
- explicit self-reported blockage
- repeated unresolved bottleneck indicators

The prototype does not need to encode final threshold logic yet.

## 8. Country Grouping Requirement

Country grouping is a minimum requirement across the admin.

The prototype should make it easy to:
- filter all main record types by country
- see counts by country
- understand where interest and activity are strongest

Country grouping matters for:
- continental intelligence
- South Africa versus wider-Africa visibility
- future chapter-readiness interpretation

## 9. Membership Leads Section

### Purpose

Provide a simple review surface for people and organizations interested in membership.

### Recommended content

- lead list
- summary counts by country
- summary counts by stakeholder type
- recent submissions

### Useful columns

- name / organization
- stakeholder type
- country
- date submitted
- notes / status

## 10. Technical Network Section

### Purpose

Give ABA visibility into its growing specialist and consultant pool.

### Recommended content

- total technical network leads
- leads by country
- leads by expertise area
- recent additions

### Useful columns

- name
- organization
- country
- expertise area
- optional notes

### What this section should help answer

- where specialist capacity is emerging
- which expertise areas are represented
- where there may be gaps in coverage

## 11. Contacts / Subscribers Section

### Purpose

Maintain visibility into general communications growth without overcomplicating it.

### Recommended content

- total subscribers
- recent signups
- by country if captured

This section should also support later relationship use beyond simple newsletter counting, including:
- recruiting future members
- advocacy or campaign outreach
- fundraising follow-up
- convening and event communication

This section can stay simple in the first prototype.

## 12. Membership Types Section

### Purpose

Give ABA an internal place to manage the membership types that power public applications and approved member relationships.

### Recommended content

- membership type list
- type category
- annual dues amount
- billing cadence
- privileges summary
- active/inactive status

### Useful columns

- membership type name
- category
- annual dues
- billing cycle
- current privileges summary
- active status

### Required actions

- create membership type
- edit membership type
- retire or deactivate membership type
- reorder or group visible types where useful

### Rules

- membership types should be managed policy objects, not only hard-coded form labels
- public application forms should only show active, approved membership types
- historical applications and approved members should preserve the applied or approved type from the time of decision, even if fees change later

Reference note:
- see `docs/requirements/aba-membership-type-policy.md`

## 13. Geographic Framing Inside Admin

The admin should support the same underlying product truth as the public site:
- Africa-wide participation is welcome
- ABA is currently active in South Africa

The admin should make this visible by:
- always showing country data where useful
- allowing users to inspect South Africa separately from the broader continental picture
- surfacing wider-Africa interest as future-ready signal, not noise

## 14. Visual Style Direction

The admin does not need to mimic the public site exactly, but it should feel related.

Recommended qualities:
- clear
- utilitarian
- calm
- evidence-led

Suggested design direction:
- white and pale-gray surfaces
- restrained accent colors
- blue used more strongly in the registration intelligence area
- charts should prioritize readability over decoration

## 15. Charting Guidance

The prototype may use static or semi-static charts.

Priority:
- clarity of story
- consistency of labeling
- easy country comparison

Do not overcomplicate:
- no need for advanced drilldowns yet
- no need for dense BI-style dashboards

## 16. Responsive Expectations

Primary use case:
- desktop and laptop

Tablet support:
- desirable

Mobile:
- not the priority for the admin prototype, but it should remain usable at a basic level

## 17. Non-Goals For This Phase

Do not over-spec:
- workflow automation
- notifications
- user permissions matrix
- assignment systems
- chapter handoff orchestration
- heavy CRM or case management logic

## 18. Relationship To Other Deliverables

This admin prototype should align with:
- the 4 public website flows
- the standalone flow/intelligence asset
- the public registration intelligence section

Together, the 3 artifacts should tell one consistent story:
- the public site acquires and explains
- the flow asset maps the system
- the admin surface interprets and organizes the data
