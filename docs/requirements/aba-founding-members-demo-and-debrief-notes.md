# ABA Founding-Members Demo And Debrief Notes

Last updated: 2026-06-26

Source basis:
- founding-members demo transcript from 2026-06-25:
  `/Users/nefiger/Downloads/ABA Update, Strat & Next Steps Meeting's transcript.txt`
- internal debrief transcript from 2026-06-25:
  `/Users/nefiger/Downloads/UnPoison's Zoom Meeting's transcript(22).txt`

Purpose:
- capture what the Thursday demo validated
- record the product, governance, and sequencing decisions that came out of the debrief
- give the next ABA session a durable source of truth for July priorities

## 1. What The Demo Successfully Landed

The founding-members demo appears to have landed the core ABA proposition well enough to create real excitement rather than polite interest.

The strongest themes that resonated were:
- ABA as an independent biologicals body, not an extension of big-ag structures
- membership as collective representation and sector leverage
- the registration tracker as an immediate practical value-add
- the database / explorer as a future strategic asset with Africa-wide potential

The demo also succeeded in showing that the work is not just a brochure site. Even though the current build is still HTML-first, the group reacted to it as a believable operating model for membership, registration intelligence, and future coordination.

## 2. Core Product Decisions Confirmed

### The current front-end work is now functioning as product spec

The debrief made an important shift explicit: the current demo should not be treated as throwaway "smoke and mirrors." It is now a fairly well-defined front-end spec for the real system that would need to sit behind it.

That means the next important companion layer is:
- admin / backend tooling
- member-facing logged-in views
- CRM and workflow handling around leads, submissions, and memberships

### The registration tracker should stay open as a public contribution path

The tracker is still intended to be usable by people who are not yet ABA members.

Current working model:
- public-facing intake path for product-registration submissions
- private company workspace for each submitting entity
- aggregate public signals view
- internal / registrar-facing export or representation output

This matches the repo's existing public/private split and should continue to guide future prototype work.

### Full members should flow straight from membership into product intake

The preferred first realistic flow is now:
1. a person or organization applies for membership
2. if they indicate they have registered or pending products, they are passed directly into the product intake flow
3. the process should feel seamless, even if the underlying prototype still uses separate internal structures

There should still be a separate path for someone who is not yet a member but wants to track products.

### No instant payments in the first live-like version

The team does not want website-based instant payment in the early phase.

Working assumption:
- applications are reviewed
- there is still a vetting step
- membership approval comes back manually
- payment, if needed at this stage, is handled through invoicing rather than immediate online checkout

### The database is not required for the first live ABA launch

The debrief clarified that the database / explorer is valuable but not critical for the first go-live threshold.

Near-term launch-critical surfaces are:
- ABA public site
- membership application flow
- registration tracker intake and downstream handling

The database can continue to develop in parallel and may be positioned as an in-development or coming-soon strategic asset rather than a prerequisite for launch.

## 3. Privacy And Access Boundaries To Preserve

The call surfaced an important boundary around registration information.

The public side can show:
- aggregate signals
- counts
- stage visibility at a high level
- product labels or other deliberately shareable surface information

The public side should not expose:
- proprietary protocols
- research packets
- private company registration detail
- any other sensitive submission material that companies would not want in public

This means the tracker architecture should continue to separate:
- public signal outputs
- member or company-private views
- internal ABA operator handling
- regulator-facing packets or exports

## 4. Additional Product Implications Raised In Discussion

### Admin and data model work now matters more

The debrief explicitly pointed to the need for an admin section and a stronger underlying data model, especially for:
- product intake storage
- application status handling
- lead management
- membership review workflows
- member-visible enriched views over time

The existing admin prototype spec should be treated as active context, not background nice-to-have.

### The intake form needs field review plus a real destination

The next practical milestone is not just prettier flow copy. The intake form needs:
- the right fields
- a clear storage destination or "basket"
- a believable management model for what happens after submission

Anoushka was named as a key reviewer for field-level feedback before the flow is treated as ready for broader testing.

### The database should evolve toward live learnings and cross-reference value

The demo feedback suggested that the database becomes much stronger when it can eventually capture and surface:
- practical learnings
- cross-references between crop, pest, and solution context
- contributions from people in the field

Voice-note-style capture was mentioned as a future-friendly direction, but this is not part of the immediate July critical path.

### Country handling must stay Africa-wide, not South-Africa-only

The founding-members discussion reinforced that ABA's tools need to support:
- South Africa as the current operating base
- wider African participation and onboarding
- country-by-country regulatory differences over time

Zimbabwe came up specifically as an example of faster registration turnaround than South Africa, which suggests future tracker logic may need a stronger country lens rather than assuming one regulatory shape.

## 5. Governance And Organizational Decisions

The debrief made it clear that the technical founding-members group is not, by itself, the governance structure ABA needs.

Working direction:
- form a board or equivalent governance layer early
- keep technical experts involved, but do not confuse technical contributors with the full accountability body
- make sure the organization is structurally sound before retrofitting governance later

Key governance questions called out:
- what a public member-benefit structure requires in practice
- what compliance, reporting, or standing obligations exist
- how accountability and ethical stewardship should be held
- what mix of governance and technical representation ABA needs

The implied shape is:
- board for governance, accountability, and institutional stewardship
- advisory or technical committee(s) for product, regulatory, and specialist guidance

## 6. Near-Term Sequence And Target Dates

These dates were spoken about in the debrief and should be treated as the current working sequence rather than hard implementation promises.

### By 2026-07-03

Aim to:
- get Anoushka's feedback on the intake fields
- integrate immediate copy and flow corrections
- give Anna enough material to respond in parallel external conversations, including Greenpeace-related timing mentioned on the call

### By 2026-07-10

Aim to have:
- a first combined membership-plus-product-intake version
- something the founding-members cohort can actively test
- a cleaner run-through of the text, flow, and obvious sticking points

### From mid-July 2026

Anna wants to start:
- confidential high-level conversations with wider African network leaders
- showing the four-pillar transition model plus the ABA tools
- using the South African chapter work as a concrete demonstration of what a chapter could look like

The package expected to support those conversations is:
- an ABA brochure or PDF-level story asset
- the ABA site
- the registration tracker
- the Biologicals Explorer / database story at the right fidelity

### By August 2026

The intent is to:
- aggregate real founding-member product-registration submissions
- take a meaningful grouped picture to the registrar
- demonstrate direct value back to early members through representation and visibility

## 7. Immediate Repo Implications

For the next ABA work sessions, the strongest priorities now look like:
- tighten public-facing copy without making the homepage sound like repo narration
- move the membership-plus-registration flow toward a believable combined intake
- define the admin/data model companion layer more concretely
- preserve the public/private/IP boundaries in tracker outputs
- keep the database moving, but do not let it delay launch-critical membership and registration work
- capture governance setup tasks alongside product work rather than leaving them for later

## 8. Related Files To Use Next

- `HANDOVER.md`
- `docs/requirements/aba-homepage-strategy-and-copy-notes.md`
- `docs/requirements/african-biologicals-alliance-admin-prototype-spec.md`
- `docs/requirements/registration-tracker-site-integration-implementation-plan.md`

