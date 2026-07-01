# ABA Admin Surface Taxonomy

Last updated: 2026-07-01

## Purpose

Stop treating every admin page as the same kind of datagrid.

The ABA admin now needs a small, explicit taxonomy for page types so that:

- interaction patterns match the operational risk of the records
- inline editing is used intentionally rather than universally
- reference data does not masquerade as queue work
- queues do not get slowed down by settings-style UX
- later implementation can distinguish between safe inline actions and governed workflows

This note is the contract for the next tranche of admin refinement.

## Core rule

Before designing a page, classify it.

The question is not:
- what should this screen look like

The question is:
- what class of administrative surface is this

Once the surface class is known, the correct interaction model should follow.

## Surface classes

### 1. Operational queue

Purpose:
- move high-frequency work forward quickly
- support rapid scanning, triage, assignment, and routine decisions

When to use:
- there is a working queue
- operators are expected to touch many rows in one sitting
- the main value is throughput rather than record stewardship

Typical records:
- `MembershipApplication`
- finance-clearance tasks
- review or follow-up cases

Interaction pattern:
- dense table or queue-first grid
- compact filters
- inline routine actions
- status signals are prominent
- open a deeper record only when more context is required

Allowed inline actions:
- assign owner
- approve or move forward
- request information
- issue invoice
- record payment confirmation when low-risk and bounded

Should not default to:
- large prose blocks
- settings-style editing
- multi-step record maintenance inside the row

Current ABA examples:
- `Membership > Applications`
- `Finance > Member Finance`

### 2. Managed record list

Purpose:
- let operators inspect active records and initiate controlled changes

When to use:
- records matter operationally
- many fields are visible
- meaningful changes should go through a process, not a casual inline mutation

Typical records:
- `MembershipRelationship`
- `Invoice`
- `Subscription`
- broader CRM-style records

Interaction pattern:
- read-first ledger or record list
- concise status and next-step signals
- icon actions inline
- “open record”, “edit member”, “restart subscription”, or similar process entry points

Allowed inline actions:
- open record
- start renewal process
- open invoice
- open finance case
- low-risk acknowledgement actions if clearly bounded

Should not default to:
- always-open selects
- freeform direct edits on every field
- status changes that imply deeper workflow without that workflow being explicit

Current ABA examples:
- `Membership > Members`
- `Finance > Invoices`
- `Finance > Subscriptions`

### 3. Reference data

Purpose:
- manage stable configuration and policy objects that shape other workflows

When to use:
- records change infrequently
- the page defines options, rules, categories, or policy objects
- these objects are reused elsewhere in the system

Typical records:
- `MembershipTypePolicy`
- fee rules
- route availability rules
- chapter configuration while still lightweight

Interaction pattern:
- read-first table
- values shown clearly
- explicit edit affordance
- edit mode, modal, drawer, or dedicated process can come later

Allowed inline actions:
- open edit
- create rule
- reorder
- retire or restrict through an explicit action

Should not default to:
- queue-style actions
- rows full of exposed controls
- pretending static configuration is an operational work surface

Current ABA examples:
- `Settings > Membership Rules`
- likely `Chapters` in the current prototype stage

### 4. Observational surface

Purpose:
- help operators understand load, bottlenecks, exceptions, and trends

When to use:
- the main job is interpretation
- the page is summarising rather than directly administering records

Typical records:
- rollups of applications
- finance exceptions
- registration bottleneck summaries
- dashboard signals

Interaction pattern:
- summaries
- compact exception lists or tables
- low editing affordance
- navigation via the shared shell, not duplicated CTA launch blocks

Allowed inline actions:
- minimal drill-in links or record openers

Should not default to:
- editing-heavy controls
- queue behavior disguised as reporting
- dashboard-as-second-navigation-menu

Current ABA examples:
- `Dashboard`
- `Registration Intelligence`

## Cross-surface rules

These rules apply regardless of module:

- the left sidebar remains the primary navigation
- the page body should not duplicate primary navigation already present in the shell
- exposed form controls should only appear where direct manipulation is genuinely safe and useful
- if changing a field implies a process, show the value and expose the process, not a casual dropdown
- icon actions are appropriate where users can already infer the object and the action from context
- labels and values should be readable before the user is asked to edit anything

## Mapping the current admin

### Membership

- `Applications`
  operational queue
- `Members`
  managed record list

### Finance

- `Member Finance`
  operational queue
- `Invoices`
  managed record list
- `Subscriptions`
  managed record list

### Settings

- `Membership Rules`
  reference data

### Other modules

- `Chapters`
  reference data for now, with scope to become a managed-record module later
- `Registration Intelligence`
  observational surface
- `Contacts & Network`
  likely managed record list, unless later split into multiple surfaces

## Design consequence

The current prototype should no longer be refined with one universal admin-table pattern.

The next implementation pass should explicitly use:

- queue patterns for queue pages
- ledger/process patterns for managed-record pages
- reference-data patterns for settings pages
- summary/exception patterns for observational pages

That distinction matters more than another round of purely visual cleanup.
