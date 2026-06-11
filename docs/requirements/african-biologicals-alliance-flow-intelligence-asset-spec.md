# African Biologicals Alliance Flow And Intelligence Asset Spec

This document defines the standalone flow/intelligence asset that must sit outside the public website prototype.

Format:
- standalone HTML preferred for iteration
- exportable to PDF later if needed

Purpose:
- explain the full systems picture in a way that is legible to stakeholders
- make the 4 public flows visible in one place
- unpack what ABA actually creates from submissions and participation
- explain the advocacy value of the registration-tracker data

## 1. Asset Role

This asset is not a page section inside the public website.

It is a separate deliverable that the website can link to from:
- the hero CTA
- the registration intelligence section
- future stakeholder materials

It should work as:
- a stakeholder explainer
- a planning artifact
- a systems-clarity tool for future implementation

## 2. Audience

Primary readers:
- ABA internal stakeholders
- collaborators helping shape the prototype
- funders or partners who need to understand the system logic
- sector participants who need a clearer picture of why data capture matters

Secondary readers:
- technical implementers
- future admin/product designers

## 3. Asset Goals

The asset must make 5 things clear:
- who can come into the system
- what each audience contributes
- what internal objects or assets are created
- how those assets become intelligence, coordination, and advocacy capability
- why this matters across Africa even while ABA is currently active in South Africa

## 4. Narrative Frame

The diagram should tell a simple story:

1. multiple public audiences enter through different flows
2. each flow creates a different kind of lead, record, or submission
3. those objects can be grouped, reviewed, and aggregated
4. aggregation produces relationship assets, intelligence assets, and strategic assets
5. those assets support advocacy, chapter readiness, network-building, and sector coordination

The registration flow should have visibly greater detail than the other 3 because it now carries the strongest intelligence and advocacy story.

## 5. Core Structural Model

Recommended top-level diagram pattern:

1. inbound audiences
2. intake flows
3. created records
4. enrichment / grouping / normalization
5. intelligence and relationship assets
6. downstream organizational and sector outcomes

Recommended left-to-right structure:

```text
Inbound audiences
-> Public flows
-> Captured records
-> Grouping / review / normalization
-> Assets created
-> Outcomes and value
```

## 6. Required Inbound Flows

The diagram must include these 4 flows as parallel but distinct pathways.

### Flow A: Membership Interest

Inputs:
- member or organization interest
- stakeholder type
- country

Created record:
- `Membership Lead`

### Flow B: Registration Tracker

Inputs:
- product registration journey information
- country
- stage
- delays
- bottlenecks

Created record:
- `Registration Submission`

### Flow C: Stay Informed

Inputs:
- contact details
- communication opt-in

Created record:
- `Contact Record`

### Flow D: Technical Network

Inputs:
- specialist identity
- organization
- country
- expertise area

Created record:
- `Technical Network Lead`

## 7. Grouping And Normalization Layer

This layer should sit after the raw inputs and before the value outcomes.

It should show that ABA is not merely collecting records, but making them usable.

Recommended grouping / normalization concepts:
- grouped by country
- grouped by stakeholder type
- grouped by expertise area
- grouped by registration stage
- grouped by product category
- grouped by common bottleneck

Recommended labels for this layer:
- `Review and structure`
- `Group and normalize`
- `Convert submissions into usable assets`

## 8. Asset Creation Layer

The diagram should make clear that the flows produce more than just contacts.

Recommended asset families:

### Relationship Assets

Created from:
- membership leads
- contact records
- technical network leads

Examples:
- membership pipeline
- partner pipeline
- future chapter lead pool
- expert network directory

### Sector Intelligence Assets

Created primarily from:
- registration submissions

Can also be enriched by:
- technical network data
- geography patterns from all flows

Examples:
- country trend visibility
- stage bottleneck visibility
- time-stuck evidence
- product-category pattern visibility
- repeat challenge themes

### Strategic Action Assets

Created from:
- relationship assets
- intelligence assets

Examples:
- advocacy positioning
- stakeholder engagement
- chapter readiness clues
- partner mobilization
- future program design

## 9. Registration Intelligence Expansion

This is the most important updated part of the diagram.

The registration tracker path should not end with a generic `Sector Intelligence` label. It should be unpacked into sub-assets.

### Recommended sub-assets to show

- `Country-level registration picture`
- `Stage-level delay picture`
- `Products stuck in process`
- `Average time stuck`
- `Recurring bottlenecks`
- `Category-level patterns`
- `Advocacy evidence base`

### Why this matters

The diagram should communicate:
- isolated stories become visible patterns
- patterns become evidence
- evidence becomes advocacy and coordination capability

### Plain-language explanation to include

Suggested supporting copy direction:
- `ABA can use aggregate registration data to show where products are getting stuck, how long they are delayed, and which issues appear repeatedly across the sector.`

## 10. Geographic Story

The asset must explicitly handle the Africa-wide versus South Africa-active tension.

Required message:
- participation can come from across Africa
- operational activity is currently centered in South Africa
- lead capture and intelligence gathering should still happen continent-wide

Recommended visual treatment:
- a small note or band near the top or bottom of the asset
- optionally a map or territory callout in future iterations

Suggested wording:
- `ABA is currently active in South Africa while intentionally building relationships, evidence, and future readiness across the African continent.`

## 11. Outcomes Layer

The final layer should show where all this work leads.

Recommended outcome groups:

### Advocacy And Evidence

- clearer proof of sector bottlenecks
- stronger case-making with regulators and stakeholders
- evidence-based public narrative

### Chapter Readiness

- country-level lead visibility
- future handoff opportunities
- understanding where interest is growing

### Network Strength

- broader membership relationships
- stronger specialist bench
- better visibility into who can help where

### Sector Coordination

- improved shared understanding
- better-informed interventions
- stronger regional picture over time

## 12. Visual Structure Recommendation

Recommended format:
- horizontal flow diagram for desktop-first viewing
- exportable as a portrait PDF if required

Recommended section layout:

1. title
2. one-paragraph explainer
3. main flow diagram
4. legend or key if needed
5. short “why this matters” summary

Recommended title directions:
- `How ABA Turns Participation Into Sector Intelligence`
- `ABA Public Flows, Data Assets, and Advocacy Value`
- `From Public Participation to Sector Intelligence`

## 13. Content Density Guidance

The diagram should be richer than a homepage graphic, but it should not become a technical architecture diagram.

Do:
- use plain language
- show logical transitions
- make the registration path more detailed
- highlight outcomes clearly

Do not:
- overload with implementation detail
- show database-level schema behavior
- include speculative workflow automation

## 14. Interaction And Format Guidance

If built in HTML:
- allow subtle hover or expand states for explanatory callouts
- keep the base diagram readable without interaction
- allow export-friendly styling for print/PDF

If exported to PDF:
- ensure all callouts are already visible
- avoid depending on hover-only explanation

## 15. Recommended Content Outline

```text
Title
Short explainer

Audience flows:
- Membership Interest
- Registration Tracker
- Stay Informed
- Technical Network

Created records:
- Membership Lead
- Registration Submission
- Contact Record
- Technical Network Lead

Grouping / normalization:
- By country
- By stage
- By expertise
- By stakeholder type
- By bottleneck

Assets created:
- Relationship Assets
- Sector Intelligence Assets
- Strategic Action Assets

Outcomes:
- Advocacy
- Chapter Readiness
- Network Strength
- Sector Coordination
```

## 16. Relationship To Other Deliverables

This asset should align with:
- the 4-card pathways on the public website
- the registration intelligence section on the public website
- the first-pass admin dashboards and filters

It should help future reviewers see that these are all parts of one coherent system rather than separate features.
