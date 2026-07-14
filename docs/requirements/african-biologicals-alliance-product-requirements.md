# African Biologicals Alliance Product Requirements Notes

This companion document captures product-level requirements that sit above the public website visual spec. It is intended to keep the broader direction clear as the work expands into multiple artifacts.

## 1. Deliverables

There are now 3 distinct deliverables.

### Deliverable A: Public Website Prototype

Purpose:
- public-facing acquisition, explanation, and trust-building

Must include:
- 4 public flows
- Africa-wide participation framing
- South Africa active-now framing
- dedicated registration intelligence section
- link or pointer to a separate flow/intelligence asset

### Deliverable B: Admin / Backend Prototype

Purpose:
- internal handling, filtering, and interpretation of captured data

Current scope:
- light-to-medium admin concepting only
- no need yet for complex chapter handoff workflows
- no need yet for advanced routing logic beyond practical grouping and filtering

Must support at minimum:
- grouping by country
- visibility of registration submissions
- visibility of membership leads
- visibility of technical network leads
- visibility of subscriber/contact records

### Deliverable C: Standalone Flow / Intelligence Diagram

Purpose:
- explain the systems picture clearly outside the website mockup

Format options:
- HTML
- PDF

Requirements:
- separate asset, not embedded directly in the homepage prototype
- include all 4 public flows
- expand the sector-intelligence pathway and outputs
- explain value in language accessible to non-specialists

## 2. Core Product Entities

At the current level of abstraction, the system should assume these lead/data objects exist.

- `Membership Lead`
- `Application`
- `Contact Record`
- `Technical Network Lead`

Additional derived or aggregate objects:
- `Sector Intelligence Asset`
- `Country Grouping`
- `Advocacy Insight`

## 3. Public Flow Objectives

### Membership Interest

Capture:
- individual or organization interest
- role or stakeholder type
- country

Use:
- relationship building
- chapter pipeline
- membership follow-up

### Registration Tracker

Capture:
- product-related registration journey information
- country
- stage
- bottlenecks and delays

Use:
- evidence-building
- advocacy
- aggregated sector visibility
- continental intelligence

### Stay Informed

Capture:
- contact details
- communication permission
- country if useful

Use:
- updates
- events
- sector communications

### Technical Network

Capture at minimum:
- name
- organization
- country
- expertise area

Likely future capture:
- languages
- specialist themes
- availability
- region/country coverage
- advisory or consulting profile

Use:
- expert network building
- specialist matching
- regional capacity mapping

## 4. Registration Intelligence Product Direction

This is one of the main product evolutions.

The registration tracker is not only a form flow. It is also the front door to an advocacy and intelligence story.

### What the intelligence should reveal

- how many products or organizations appear stuck
- where they are getting stuck
- how long they have been stuck
- which countries or regions are represented
- what product categories are represented
- what bottlenecks appear repeatedly

### Why it matters

- it provides evidence for advocacy
- it surfaces systemic rather than anecdotal issues
- it helps explain the state of the sector to stakeholders
- it creates a basis for future chapter readiness and regional prioritization

### Public versus admin split

Public-facing:
- aggregated
- selective
- narrative-led
- non-sensitive

Admin-facing:
- operational
- filterable
- more detailed
- country-based grouping and review

## 5. Recommended Public Intelligence Surfaces

For the website prototype, the intelligence section should likely include 3 to 5 items max.

Candidate surfaces:
- registrations by country
- registrations by stage
- most common bottlenecks
- average or indicative time stuck by stage
- growth in data submissions over time

Also include:
- short advocacy copy
- subtle acquisition CTA back into the registration flow

## 6. Recommended Admin Intelligence Surfaces

The admin prototype should focus on clarity, not maximum complexity.

Recommended first-pass sections:
- summary counts
- submissions by country
- submissions by stage
- flagged or stalled cases
- bottleneck themes

Useful first-pass filters:
- country
- stage
- product category if available
- date range

## 7. Geographic Positioning Rules

This must be consistent across all deliverables.

### Required truth

- ABA accepts interest and participation from across Africa
- ABA is currently active in South Africa

### Product implications

- no need to exclude non-South-African submissions
- capture country for all meaningful flows
- preserve external-country leads for future chapter development
- emphasize that continental registration data helps tell a larger regional story

## 8. Technical Network Notes

Current working public label:
- `Technical Network`

This is intentionally more legible than `Brain Trust`.

The value proposition should feel practical rather than elitist.

It should communicate:
- expertise
- regional insight
- technical contribution
- future collaboration

It should not yet imply:
- guaranteed contracts
- immediate engagement
- formal chapter governance roles

## 9. Standalone Diagram Requirements

The standalone flow/intelligence diagram should show:

1. the 4 inbound public personas/flows
2. the data or lead objects each flow creates
3. how those objects are grouped or normalized
4. how they become relationship, intelligence, or strategic assets
5. how those assets support advocacy, chapter readiness, sector coordination, and future action

The diagram should also unpack “sector intelligence” into clearer sub-value, for example:
- bottleneck evidence
- country-level trend visibility
- stage-level delay visibility
- product category visibility
- expert network context
- advocacy narrative support

## 10. Current Non-Goals

For this phase, do not over-design:
- complex chapter handoff automation
- advanced permissions models
- deep CRM behavior
- heavy workflow logic

Current intent is to define:
- what the public experience needs to communicate
- what the core captured objects are
- what the admin needs to be able to see at a high level
- what the standalone system picture needs to explain

## 11. Immediate Next Build Targets

In practical order:

1. update and refine the public website prototype
2. design the standalone flow/intelligence asset
3. shape the first-pass admin backend prototype

This sequence is sensible because the public narrative and flow logic will inform both the diagram and the admin surfaces.
