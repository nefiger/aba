# African Biologicals Alliance Public Website Spec

Source basis:
- original prototype visually inspected from `https://movie-sculpt-81644835.figma.site/`
- expanded requirements captured on `2026-06-10`

This document is no longer just a recreation note for the original prototype. It is now the working spec for the next public-facing website prototype in HTML.

## 1. Purpose

Create a responsive public ABA website prototype that:
- presents ABA as the coordinating body for biologicals sector participation and intelligence
- supports 4 primary public flows
- introduces a stronger advocacy and sector-intelligence story
- clearly communicates Africa-wide interest capture with current operational activity in South Africa
- removes the flow diagram from the website itself and treats it as a standalone asset

## 2. Public Website Goals

The public site must do 5 jobs:
- explain who ABA is
- route visitors into the correct flow quickly
- communicate the value of contributing data and joining the network
- show proof that aggregate intelligence is being generated
- capture leads from across Africa while clarifying that ABA is currently active in South Africa

## 3. Primary Public Flows

The homepage must present 4 top-level audience pathways as first-class flows.

### Flow 1: Membership Interest

Audience:
- manufacturers
- distributors
- researchers
- academics
- NGOs
- government stakeholders

Goal:
- capture membership leads and organizational interest

Primary output created:
- `Membership Lead`

Downstream value:
- relationship assets
- chapter pipeline
- partnership opportunities

### Flow 2: Registration Tracker

Audience:
- product owners
- regulatory or registration leads
- operators managing biological product registration progress

Goal:
- collect structured registration journey data

Primary output created:
- `Application`

Downstream value:
- sector intelligence
- advocacy evidence
- bottleneck visibility
- continental patterns and trends

### Flow 3: Stay Informed

Audience:
- general supporters
- sector observers
- ecosystem participants not yet ready for formal membership or submission

Goal:
- capture permission-based communication signups

Primary output created:
- `Contact Record`

Downstream value:
- future engagement
- event and update distribution
- audience growth

### Flow 4: Technical Network

Working label for now:
- `Technical Network`

This replaces the idea of a fourth placeholder flow previously described as a “brain trust.”

Audience:
- consultants
- technical specialists
- subject-matter experts
- country or region specialists
- regulatory and commercialization advisors

Goal:
- recruit specialists into a structured expert network that ABA can draw on over time

Primary output created:
- `Technical Network Lead`

Downstream value:
- expert directory
- regional specialist pool
- technical support capacity
- future chapter and program enablement

## 4. Geographic Positioning Requirement

The website must state two things at the same time:
- ABA welcomes interest, registrations, and participation from across the African continent
- ABA is currently active operationally in South Africa

The messaging must avoid sounding exclusionary while remaining clear about present operating scope.

Required meaning:
- visitors from any African country may submit interest, join the technical network, subscribe, and contribute registration-tracker data
- membership and other leads from outside South Africa should still be captured for future chapter development and handoff
- registration intelligence should explicitly be framed as continent-wide where possible

Recommended message pattern:
- `We welcome participation and sector input from across Africa. ABA is currently active in South Africa, while building broader continental relationships and intelligence.`

This message should appear:
- in the hero or a clearly visible context strip
- in relevant form introductions
- in the registration intelligence section

## 5. Overall Information Architecture

Recommended homepage order:

1. Header
2. Hero
3. Geographic scope / operating footprint context strip
4. Four audience pathway cards
5. Registration intelligence / advocacy section
6. Value creation section
7. Footer

Recommended semantic structure:

```html
<div class="page-shell">
  <header class="site-header">...</header>
  <main>
    <section class="hero-section">...</section>
    <section class="scope-strip">...</section>
    <section class="pathways-section">...</section>
    <section class="intelligence-section">...</section>
    <section class="value-section">...</section>
  </main>
  <footer class="site-footer">...</footer>
</div>
```

Footer requirement update:
- the footer is now a required shared public shell element, not a page-specific afterthought
- it should carry:
  - ABA brand context
  - stable links to the main public destinations
  - governance/data links:
    `Privacy & POPIA`, `Terms of use`, `Member terms`, `Data and consent`
- it should not be replaced by a page-specific CTA banner on ordinary public pages
- the public IA now requires a governance/data destination that these links resolve to

## 6. Visual Direction

Preserve the existing tone from the original prototype:
- clean
- optimistic
- institutional
- modern but not flashy

Design cues to retain:
- soft diagonal background tint from pale green into pale blue
- white cards with saturated color accents
- rounded corners on cards and buttons
- subtle contemporary shadows
- dark slate/navy typography

The evolved homepage may become denser than the original prototype, but it should still feel calm and legible.

## 7. Design Tokens

These remain suitable for the evolved prototype.

### Colors

- `--page-bg-start: #f0fdf4`
- `--page-bg-end: #eff6ff`
- `--text-strong: #0f172a`
- `--text-body: #475569`
- `--text-muted: #64748b`
- `--border-soft: #d1d5db`
- `--white: #ffffff`
- `--footer-bg: #111827`

- `--green-500: #4ade80`
- `--green-600: #16a34a`
- `--green-50: #f0fdf4`
- `--green-200: #bbf7d0`

- `--blue-500: #3b82f6`
- `--blue-600: #2563eb`
- `--blue-50: #eff6ff`
- `--blue-200: #bfdbfe`

- `--purple-500: #a855f7`
- `--purple-600: #9333ea`
- `--purple-50: #faf5ff`
- `--purple-200: #e9d5ff`

- `--amber-500: #f59e0b`
- `--amber-600: #d97706`
- `--amber-50: #fffbeb`
- `--amber-200: #fde68a`

### Radii

- `--radius-card: 16px`
- `--radius-button: 10px`
- `--radius-pill: 9999px`

### Shadow

```css
box-shadow:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);
```

### Spacing

- outer page gutter: `16px`
- major section vertical padding: `64px`
- card internal padding: `24px`
- inset panel padding: `12px`
- standard large grid gap: `32px`

## 8. Typography

Recommended stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Suggested working sizes:
- brand title: `24px / 32px / 700`
- hero headline desktop: `36px / 40px / 700`
- hero supporting copy: `20px / 32px / 400`
- section headings: `24px / 32px / 700`
- pathway card titles: `24px / 32px / 700`
- value card titles: `18px / 28px / 700`
- body copy: `16px / 24px / 400`
- secondary small copy: `14px / 20px / 400`

## 9. Header Spec

- full-width white header
- bottom border `1px solid` soft gray
- centered inner wrapper
- brand cluster on the left
- `Admin Login` button on the right

Brand cluster contents:
- green rounded-square shield icon tile
- `African Biologicals Alliance`
- `Advancing biological solutions across Africa`

Mobile behavior:
- brand title may wrap to 2 lines
- button remains on same row if feasible

## 10. Hero Spec

### Purpose

The hero should establish:
- ABA’s sector role
- the broad value proposition
- the continental framing

### Required content

Headline direction:
- can stay close to `Building Africa's Biologicals Future`
- may be refined to better support the broader advocacy and network story

Supporting copy should speak to:
- membership
- registration intelligence
- collaboration
- sector advancement

Primary secondary CTA retained:
- `View Information Flow`

Note:
- this CTA must point to or open the standalone flow asset, not an embedded on-page diagram

## 11. Geographic Context Strip

Add a dedicated short section or strip immediately below the hero.

Purpose:
- clarify that ABA welcomes Africa-wide participation
- clarify current operational activity in South Africa

Content requirements:
- one short headline or label
- one compact explanatory paragraph
- optional tiny map/badge treatment if useful in the future

Tone:
- inclusive
- factual
- forward-looking

## 12. Pathways Section

### Grid Behavior

Desktop:
- 4 columns if space allows on large screens, otherwise 2x2

Tablet:
- 2 columns

Mobile:
- 1 column

Recommendation:
- do not force a cramped 4-up layout at standard laptop width
- prefer `2x2` at medium desktop widths and `4-up` only when it still reads comfortably

### Shared Card Pattern

Each pathway card should retain the pattern from the original prototype:
- white background
- rounded `16px`
- `2px` accent border
- overflow hidden
- medium shadow
- stronger hover shadow
- colored header band
- white icon and title in the header
- body copy, list items, a `Creates:` inset box, and a full-width CTA

### Accent mapping

- Membership Interest: green
- Registration Tracker: blue
- Stay Informed: purple
- Technical Network: amber

### Shared card structure

```html
<article class="pathway-card pathway-card--green">
  <div class="pathway-card__header">...</div>
  <div class="pathway-card__body">...</div>
</article>
```

## 13. Pathway Card Content

### Card 1: Membership Interest

Title:
- `Membership Interest`

Body copy:
- `Join ABA as a member. For manufacturers, distributors, researchers, academics, NGOs, and government stakeholders.`

List items:
- `Full membership options`
- `Associate member pathways`
- `Observer status available`

Creates box:
- `Membership Lead -> Relationship Assets`

CTA:
- `Express Interest`

### Card 2: Registration Tracker

Title:
- `Registration Tracker`

Body copy:
- evolve the copy from simple submission framing into an evidence-and-advocacy framing

Suggested direction:
- `Share your product registration journey so ABA can build continent-wide evidence on bottlenecks, timelines, and sector needs.`

List items:
- `Track R&D and submissions`
- `Surface bottlenecks and delays`
- `Support advocacy with evidence`

Creates box:
- `Application -> Sector Intelligence`

CTA:
- `Share Registration Info`

### Card 3: Stay Informed

Title:
- `Stay Informed`

Body copy:
- `Stay connected with ABA updates, news, and developments in Africa's biologicals sector.`

List items:
- `Regular updates and news`
- `Event notifications`
- `Sector insights`

Creates box:
- `Contact Record -> Future Engagement`

CTA:
- `Subscribe`

### Card 4: Technical Network

Title:
- `Technical Network`

Body copy:
- `Join a growing network of consultants, technical specialists, and regional experts who can help strengthen biologicals capacity across Africa.`

List items:
- `Regional and country expertise`
- `Technical and regulatory insight`
- `Future collaboration opportunities`

Creates box:
- `Technical Network Lead -> Expert Capacity`

CTA:
- `Join the Network`

## 14. Registration Intelligence Section

This is a new major homepage section and should be treated as a first-class block, not a small add-on.

### Purpose

This section tells the advocacy story behind the registration tracker.

It should answer:
- why ABA is collecting registration data
- what the aggregated picture can reveal
- why contributors should add their information

### Core narrative

The key story is:
- products and organizations get stuck
- they get stuck in patterns
- they may stay stuck for long periods
- aggregate evidence makes it easier to advocate, identify bottlenecks, and show the scale of the issue

### Positioning

This section belongs:
- after the four pathway cards
- before the broader value section

### Section content model

Recommended structure:

1. section heading
2. short explanatory copy
3. 3 to 5 public-safe intelligence visuals or stat cards
4. a short advocacy framing block
5. a subtle CTA to contribute additional registration submissions

### Suggested section heading directions

- `What the Registration Tracker Reveals`
- `Emerging Sector Intelligence`
- `Building the Continental Registration Picture`

### Public-safe visual candidates

The public site should show only aggregated, non-sensitive views.

Recommended initial set:
- `Registrations by Country`
- `Registrations by Stage`
- `Reported Bottlenecks`
- `Average Time in Stage` or `Time Stuck by Stage`
- `Application Growth Over Time`

### Advocacy framing

Suggested content direction:
- show that delays are not isolated
- show that stalled progress has economic and innovation consequences
- show that evidence can support regulators, industry dialogue, and chapter development

### CTA behavior

This section should include a subtle secondary acquisition route.

Recommended CTA labels:
- `Contribute Your Registration Journey`
- `Add Your Product Data`
- `Help Build the Picture`

This CTA should feel lighter than the primary pathway card CTA, but still visible.

## 15. Value Creation Section

Retain the existing section but update the framing so it reflects the expanded scope.

### Purpose

Summarize what ABA creates from participation across all four flows.

### Suggested three-column model

#### Value Item 1: Relationship Assets

Copy:
- `Build a network of contacts, organizations, and membership leads for future collaboration and chapter growth.`

#### Value Item 2: Sector Intelligence

Copy:
- `Gather evidence on registration patterns, bottlenecks, product categories, and regional dynamics across Africa.`

#### Value Item 3: Strategic Action

Copy:
- `Turn shared evidence and network capacity into advocacy, chapter readiness, and better sector coordination.`

## 16. Footer Spec

- full-width dark slate background
- centered text
- `32px` vertical padding
- footer copy may evolve beyond the original internal-wireframe wording if the prototype becomes more polished

Working copy can remain:
- `© 2026 African Biologicals Alliance | Internal Planning Wireframe`

## 17. Interaction Notes

Expected interaction level for the public prototype:
- button hover tint changes
- card hover shadow increase
- light reveal/entrance animations are optional
- registration intelligence visuals may be static illustrative charts in the prototype

No heavy interactivity is required yet.

## 18. Responsive Behavior

### Desktop

- hero centered
- scope strip compact and readable
- pathway cards in `4-up` only when space permits, otherwise `2x2`
- intelligence visuals may use a mixed grid
- value section in 3 columns

### Mobile

- stacked single-column cards
- intelligence visuals stack vertically
- CTA buttons remain easy to tap
- copy blocks should not become overly long; use concise summaries

### Recommended breakpoints

- `< 768px`: single-column flow cards and single-column intelligence visuals
- `768px - 1199px`: 2-column flow grid, 2-column intelligence layout where appropriate
- `>= 1200px`: allow 4-card pathway grid and fuller intelligence layout

## 19. Accessibility Notes

- maintain proper heading hierarchy
- use semantic sections and lists
- ensure chart/visual summaries have text equivalents
- use clear focus states
- keep public intelligence visuals understandable without color alone
- mark decorative icons `aria-hidden="true"` where appropriate

## 20. Standalone Asset Dependency

The information flow diagram must not be embedded directly into this website prototype.

Instead:
- the website should link to a separate standalone flow/intelligence asset
- the public prototype may include one CTA or teaser referencing that asset
- the standalone asset must include the new Technical Network flow and expanded sector-intelligence outputs

## 21. High-Level HTML Outline

```html
<div class="page-shell">
  <header class="site-header">...</header>

  <main>
    <section class="hero-section">...</section>

    <section class="scope-strip">
      <div class="container">...</div>
    </section>

    <section class="pathways-section">
      <div class="container">
        <div class="pathway-grid">
          <article class="pathway-card pathway-card--green">...</article>
          <article class="pathway-card pathway-card--blue">...</article>
          <article class="pathway-card pathway-card--purple">...</article>
          <article class="pathway-card pathway-card--amber">...</article>
        </div>
      </div>
    </section>

    <section class="intelligence-section">
      <div class="container">
        <div class="section-copy">...</div>
        <div class="intelligence-visual-grid">...</div>
        <div class="advocacy-copy">...</div>
        <div class="section-cta">...</div>
      </div>
    </section>

    <section class="value-section">
      <div class="container">
        <div class="value-grid">...</div>
      </div>
    </section>
  </main>

  <footer class="site-footer">...</footer>
</div>
```

## 22. Fidelity Guidance

The next prototype should preserve the aesthetic DNA of the original Figma site but is allowed to depart from it in order to meet the expanded product brief.

Preserve:
- the soft gradient background
- the clean card-based layout language
- the optimistic institutional tone
- the general iconography style

Evolve:
- 3 flows to 4 flows
- simple registration copy into an advocacy/intelligence story
- a small mockup into a fuller public product prototype
