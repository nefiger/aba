# ABA Admin Design Brief

Last updated: 2026-06-30

## 1. Feature Summary

The ABA admin is an internal operational product for a dedicated staff administrator. It needs to help that operator review membership activity, manage finance and chapter-related administration, monitor registration intelligence, and maintain relationship records without noise, duplication, or public-site style storytelling.

This admin should feel like one coherent system with clear modules, quiet confidence, and efficient work surfaces. It should not feel like a prototype collage or a narrative website with buttons scattered around.

## 2. Primary User Action

The single most important thing the primary operator should be able to do is:

- move operational work forward quickly and confidently

In the first tranche, that means:

- review applications
- assign or adjust membership policy
- complete finance-gated activation
- move between modules without confusion

## 3. Design Direction

The admin should feel:

- operational
- well designed
- quiet

This means the visual language should be:

- restrained rather than performative
- highly legible
- structured around hierarchy and scan speed
- clearly related to the public ABA brand, but denser and more task-oriented

The right reference mode is not a marketing page or a dashboard full of cards. It is a disciplined administrative workspace where hierarchy, rhythm, and state clarity do most of the work.

## 4. Layout Strategy

The admin should use a stable shared shell:

- persistent primary navigation
- one clear page title area
- one main work surface per page

The shell should not be repeated inside the page body.

### Layout rules

- left sidebar navigation is the primary wayfinding tool
- page body should not duplicate navigation targets through hero buttons, route cards, or repeated launch blocks
- dashboard should summarise and prioritise, not act like a second navigation menu
- module pages should lead with the working surface, not a large explanatory banner
- filters should be compact and subordinate to the table or primary content
- actions should live close to the relevant records

### Dashboard shape

The dashboard should answer:

- what needs attention now
- what volume is in motion
- what is blocked or at risk
- where the operator should focus first

It should not repeat links that already exist in nav.

### Work-surface shape

Each module page should have:

- compact title row
- small state summary where needed
- one dominant operational surface
- default datagrid layout where the module is primarily record-driven

For example:

- `Membership > Applications`
  queue-first table
- `Membership > Members`
  member directory / relationship list
- `Membership > Types & Policy`
  policy table and settings forms
- `Finance > Pending Activation`
  exception-first finance table

## 5. Key States

### Global states

- default operational state
- empty state
- no results after filtering
- blocked / needs attention
- success after action

### Dashboard states

- normal workload
- workload spike
- blocked approvals
- finance backlog
- no current urgent issues

### Applications states

- submitted
- under review
- more information required
- approved
- declined

### Membership relationship states

- pending activation
- active
- inactive
- lapsed

### Finance states

- approved but not invoiced
- invoiced but unpaid
- paid and ready to activate
- renewal due
- lapsed / overdue

### Policy states

- active type
- restricted type
- retired type
- draft / not yet available on forms

## 6. Interaction Model

The admin should support a simple interaction model:

- navigate by persistent module nav
- arrive on one clear work surface
- scan rows or states quickly
- act inline wherever possible
- open deeper detail only when more context is genuinely required

### Specific interaction principles

- routine actions happen in place
- default record interaction should happen in a datagrid
- inline editing is the default behaviour for editable fields and routine actions
- details expand inline or in a controlled secondary view only when more context is required
- filters refine the main surface, not compete with it
- the dashboard routes attention through data and exceptions, not duplicate buttons
- active nav state should always be obvious
- return to dashboard should always be possible from sub-pages through primary nav

## 7. Content Requirements

The admin needs short, product-grade copy only.

### Copy rules

- no narration
- no prototype explanation
- no “open X” button language where simple navigation already exists
- no repeated descriptions of the same destination in multiple blocks
- no generic filler such as “review in place” unless it communicates something operationally necessary

### Required content objects

- module names
- page titles
- status labels
- concise filter labels
- action labels
- exception or alert copy
- empty-state copy

### Operational ranges to design for

- low volume: 0–5 records
- normal working set: 10–50 records
- heavier queue: 50–200 records

The surfaces should remain calm and usable across those ranges.

## 8. Recommended Navigation Model

Top-level admin navigation should include all planned modules, even if some are stubs for now:

1. Dashboard
2. Membership
3. Finance
4. Chapters
5. Registration Intelligence
6. Contacts & Network

### First-pass sub-navigation

`Membership`

- Applications
- Members
- Types & Policy

`Finance`

- Pending Activation
- Invoices
- Renewals

`Chapters`

- Overview
- Settings
- Roster

`Registration Intelligence`

- Dashboard
- Submissions
- Bottlenecks

`Contacts & Network`

- Contacts
- Subscribers
- Technical Network

Stub modules are acceptable, but the nav structure should reflect the intended product model now.

The left sidebar is the canonical navigation pattern for this admin.

Do not replace it with:

- oversized top navigation blocks
- repeated CTA launch buttons
- secondary card menus that duplicate the same destinations

## 9. Anti-Goals

The admin should not become:

- a stack of oversized cards
- a duplicated set of links in nav, hero, and body
- a page that wastes vertical space before the work starts
- a marketing-style surface with operational labels pasted onto it
- a mixed screen where queue, policy, and finance all compete at once
- a drawer-heavy or panel-heavy interface when inline datagrid editing would do the job

The biggest risk is building page-by-page visuals without enforcing the module structure first.

## 10. Implementation Sequence

The next build sequence should be:

1. establish one shared admin shell
2. add complete module nav with stub destinations
3. make dashboard a true operational overview
4. rebuild `Membership > Applications`
5. add `Membership > Members`
6. rebuild `Membership > Types & Policy`
7. rebuild `Finance > Pending Activation`
8. add stubs for Chapters, Registration Intelligence, and Contacts & Network

## 11. Open Questions

These are now resolved for the current tranche:

- `Chapters` can remain a stub module for now
- `Registration Intelligence` can remain a stub module for now
- `Finance` should not be treated as purely conceptual because some finance objects already exist, especially membership fees

Implementation consequence:

- include `Chapters` and `Registration Intelligence` in the primary left nav as stub destinations
- treat `Finance` as a real first-pass module with explicit fee-related objects and states
- allow invoices, dues, and activation gating to appear as lightweight but real operational records in the prototype
