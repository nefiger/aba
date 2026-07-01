# ABA Admin Pause And Public Data-Capture Shift

Last updated: 2026-07-01

## Purpose

Record the decision to pause further admin-surface refinement for now and switch attention to the public/frontend data-capture side of the ABA prototype.

This is not a reversal of the admin work.

It is a sequencing decision:
- keep the current admin thinking
- do not continue polishing admin screens ahead of the underlying data model
- shift next effort into public-side capture, intake shape, and the field model those surfaces need to express

## Decision

Pause the internal `docs/membership-ops/` refinement after the current tranche.

Do not continue expanding or polishing admin workflows until the prototype has surfaced more of the real fields, attributes, and downstream objectives tied to each membership class and relationship type.

The immediate next area of work should be:
- public frontend data capture
- membership-facing intake structure
- the information shape needed to support later admin, CRM, and finance workflows

## Why this pause makes sense

The current admin work has clarified useful structural principles:
- shared shell
- module split
- finance vs membership separation
- queue vs managed-record vs reference-data vs observational surface types

But the next risk is obvious:
- UI refinement outruns product definition

At this point, many admin decisions would still be speculative because the prototype has not yet surfaced enough of:
- field-level capture requirements
- differences between member classes
- distinctions between applied, approved, and managed states
- finance-relevant attributes
- chapter- and network-relevant attributes
- what operational objectives ABA actually needs to support for each relationship

If work continues mainly on admin surfaces now, the prototype may become visually cleaner while still failing to express the real system model.

## What is already useful and should be kept

The current admin work should be treated as retained groundwork, not throwaway effort.

Keep:
- the shared admin shell
- the left-sidebar module structure
- the surface taxonomy in:
  `docs/requirements/aba-admin-surface-taxonomy.md`
- the distinction between:
  - operational queues
  - managed record lists
  - reference data
  - observational surfaces
- the clearer split between:
  - Membership
  - Finance
  - Settings

These are still valuable constraints for later implementation.

## What remains unresolved before more admin refinement

The following need deeper definition before the admin should be pushed much further:

### 1. Member-class field model

The prototype still needs a better expression of:
- Full member attributes
- Technical partner attributes
- Observer attributes
- prospect / subscriber / non-member relationship attributes where relevant

This includes:
- organisation fields
- person/contact fields
- role fields
- geography/chapter relevance
- technical-network relevance
- finance-related fields
- approvals and supporting evidence

### 2. Relationship-objective model

The prototype needs to surface what ABA is trying to do with each kind of relationship.

That means clarifying:
- why someone becomes a member vs subscriber vs technical-network contact
- what downstream support or service objectives follow
- which records need operational follow-up
- which records are primarily informational or relationship-driven

Without this, admin pages can only guess at what matters in each row.

### 3. Finance object shape

Finance has improved conceptually, but the true operational objects still need more definition:
- dues basis
- invoice trigger rules
- subscription behavior
- waiver or override concepts
- lapsed vs suspended vs not-yet-active logic

Until those are clearer, more finance-screen specificity risks being false precision.

### 4. Capture-to-admin continuity

The prototype still needs to show more clearly how captured public data becomes:
- application records
- member records
- contact records
- finance records
- review or follow-up work

This continuity should be surfaced from the public side first, not inferred only from admin mock tables.

## Next focus

The next tranche should prioritise public/frontend capture surfaces and their supporting notes.

That work should aim to clarify:
- which fields are captured for each membership route
- which fields are optional vs required
- what data belongs to organisation vs individual vs relationship
- what information becomes visible internally after submission
- what follow-up or admin handling those fields are meant to support

## Practical implementation rule

For the next phase:
- avoid further broad admin UI expansion
- only touch admin pages if required to support clarity in the capture-to-admin model
- prefer notes, field modeling, and public capture refinement over more internal-screen polishing

## Resume condition for admin work

Resume deeper admin refinement once the public capture side has clarified enough of:
- canonical fields
- record ownership
- member-class distinctions
- finance-relevant attributes
- downstream objectives

At that point, the admin can be refined against a better-defined system contract rather than design instinct alone.
