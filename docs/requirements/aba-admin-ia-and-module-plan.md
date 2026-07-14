# ABA Admin IA And Module Plan

Last updated: 2026-06-30

## Purpose

Stop designing the ABA admin as isolated screens.

The admin should be shaped in this order:

1. canonical records and relationships
2. operational modules
3. navigation and information architecture
4. work surfaces inside each module

If the prototype skips those layers and jumps straight into page composition, the result is predictable:
- mixed concerns on one screen
- settings, workflow, and reporting jammed together
- queue pages that waste space while still failing to guide action
- UI labels that describe screens instead of reflecting the actual system model

This note defines the structure the admin side should now follow.

## 1. Core admin principle

The ABA admin is not one generic "membership ops" page.

It is a small internal product made up of distinct modules that sit on top of one shared data spine.

That means:
- a queue is not a module by itself
- activation is not just a button after approval
- finance is not the same concern as membership policy
- chapter settings should not be mixed into application review
- views should be derived from canonical records, not invented screen by screen

## 2. Recommended core records

The current prototype and spec notes already point to the right base entities.

These should be treated as the minimum first-pass admin spine:

- `Organization`
  company, institution, lab, association, or other body interacting with ABA
- `Person`
  named individual linked to one or more organisations and roles
- `MembershipApplication`
  a submitted request to join ABA
- `MembershipRelationship`
  the approved or managed ABA relationship after review
- `MembershipTypePolicy`
  the rules attached to a membership type, including dues and privileges
- `Invoice` or `DuesObligation`
  the finance record created when an approved relationship requires payment before activation
- `Chapter`
  a country or regional chapter context
- `ChapterMembership` or `ChapterRole`
  the link between a member and a chapter
- `Application`
  product-registration-related record
- `InternalReviewCase`
  operator-managed review object linked to membership or tracker records

## 3. Module model

The admin should be organised by operational module, not by arbitrary page names.

### A. Dashboard

Purpose:
- show current operational load
- surface what needs attention
- route operators into the correct module

Contains:
- review workload
- pending activations
- dues exceptions
- chapter-level highlights
- recent activity

Does not contain:
- full tables
- deep settings
- explanatory copy blocks

### B. Membership

Purpose:
- handle the lifecycle from applicant to approved relationship

Sub-areas:
- Applications queue
- Member directory
- Membership type policy

Primary records:
- `MembershipApplication`
- `MembershipRelationship`
- `MembershipTypePolicy`
- linked `Organization`
- linked `Person`

Core questions:
- who has applied
- what type did they apply for
- what was approved
- who is already an active member
- which policy objects are available for assignment

### C. Finance

Purpose:
- handle dues, invoicing, payment state, renewals, and activation gating

Sub-areas:
- Pending activation
- Invoices and dues
- Renewals and lapsed members

Primary records:
- `MembershipRelationship`
- `Invoice` or `DuesObligation`

Core questions:
- who is approved but not active
- who still needs an invoice
- who is unpaid
- who is due for renewal
- who has lapsed

Important rule:
- approval is a membership decision
- activation is a finance-and-status decision

Those should not be collapsed into one blurred workspace.

### D. Chapters

Purpose:
- manage country or regional chapter structure once ABA is ready to make it explicit

Sub-areas:
- Chapter settings
- Chapter roster
- Chapter readiness

Primary records:
- `Chapter`
- `ChapterMembership` or `ChapterRole`
- linked `Organization`
- linked `Person`

Core questions:
- which chapters exist
- which members belong to which chapters
- who leads or administers each chapter
- where demand suggests a future chapter should emerge

Important note:
- chapter settings make sense as a module only if `Chapter` is a real entity
- until then, "chapter settings" should not appear as generic filler navigation

### E. Registration Intelligence

Purpose:
- give ABA internal visibility into tracker-derived regulatory patterns

Primary records:
- `Application`
- linked `Organization`
- linked `Person`

### F. Contacts And Network

Purpose:
- manage broader relationships that are not the same thing as paid members

Sub-areas:
- Contacts
- Subscribers
- Technical network

Primary records:
- `Person`
- `Organization`
- communications preferences
- specialist profiles where relevant

## 4. Recommended top-level admin navigation

The admin should now be structured as:

1. Dashboard
2. Membership
3. Finance
4. Chapters
5. Registration Intelligence
6. Contacts & Network

Settings should remain small and intentional.

Do not create a giant "Settings" bucket and dump domain objects into it.

If a section is important enough to manage regularly, it is probably a module, not a buried setting.

## 5. Recommended membership-area navigation

Within `Membership`, the first-pass sub-navigation should be:

1. Applications
2. Members
3. Types & Policy

This is more coherent than treating:
- queue
- activation
- types

as three equal siblings under one vague "membership administration" shell.

Activation should move under `Finance`, not remain framed as a peer to applications and policy.

## 6. Recommended finance-area navigation

Within `Finance`, the first-pass sub-navigation should be:

1. Pending activation
2. Invoices
3. Renewals

This makes the gating logic visible:

- application approved
- dues obligation created
- payment received
- relationship activated

## 7. Work-surface rules

Once modules are correct, the page-level UX should follow these rules:

### Dashboards

- should route, summarise, and prioritise
- should not try to be the main place work happens

### Queues and directories

- should be table-first
- should keep filters compact
- should minimise introductory copy
- should support routine actions inline

### Policy and settings surfaces

- should use structured tables and forms
- should not pretend to be dashboards

### Finance surfaces

- should foreground state and exceptions
- should make invoice/payment/renewal status legible at scan speed

### Chapter surfaces

- should be roster- and governance-oriented
- should not be mixed into membership review tables

## 8. Implications for the current prototype

The current `docs/membership-ops/` section should be re-framed around this structure.

### Keep

- `docs/membership-ops/index.html`
  as a dashboard / launcher

### Reframe

- `docs/membership-ops/queue.html`
  as `Membership > Applications`
- `docs/membership-ops/membership-types.html`
  as `Membership > Types & Policy`
- `docs/membership-ops/activation.html`
  as a finance surface, not a membership peer

### Add next

- a true `Membership > Members` surface
- a true `Finance > Invoices / Activation` surface
- a future `Chapters` module only once the chapter record and responsibilities are explicit

## 9. Anti-patterns to avoid

Do not:

- mix navigation, narration, and action prompts in the same oversized header block
- mix queue work, settings, and finance states on one screen
- treat a dashboard as if it is the full operational workspace
- add instructional copy where the structure itself should provide clarity
- invent sections that do not map to a stable record type or operational job

## 10. Next prototype rule

Before any further admin page redesign, lock these 3 things first:

1. top-level module map
2. record-to-module mapping
3. sub-navigation inside Membership and Finance

Only then should the visual design of individual screens continue.
