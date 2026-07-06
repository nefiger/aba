# Registration Tracker Workspace

This folder contains planning material, domain-grounding work, and low-fidelity wireframes for the ABA registration tracker — a tool that follows how registrations of biological and alternative *agricultural* inputs (microbial inoculants, biostimulants, biofertilisers, plant extracts, biological crop-protection products) move through the South African registrar's process under Act 36 of 1947. "Biological" here refers only to the natural origin of these crop inputs. The tracker does not try to resolve the regulatory ambiguity these products sit in — it tracks registration status per company and aggregates submissions into a sector-wide picture of the registrar's backlog. It is designed to stand alone during prototyping but should eventually unify with the main ABA website and the custom CRM work.

## Important Principle

The HTML/CSS prototypes in this folder are disposable wireframes.

They should not be treated as production source code.

When the final ABA website / CRM architecture is ready, the implementation should be rebuilt cleanly in that architecture.

## Durable Artifacts

The durable artifacts are the markdown planning and domain-grounding files:

- shared context and decisions
- folder-level briefs
- product rules
- terminology
- data model decisions
- consent, membership, review, and export logic
- visual alignment principles
- registrar-requirements domain grounding and extraction work

This workspace holds both the disposable wireframes and this durable domain-grounding / extraction work — it is not wireframes alone.

## Disposable Artifacts

The disposable artifacts are the low-fidelity prototype files:

- wireframe HTML
- wireframe CSS
- placeholder data
- temporary navigation
- rough layout experiments

These files are useful for review, alignment, and fast iteration, but they should be easy to delete or replace.

## Product Areas

The workspace is organised into five areas:

- `intake-flow`
- `company-dashboard`
- `public-dashboard`
- `admin-operator-review`
- `registrar-list`

There is also a combined review page at `index.html`. Keep the combined and individual views aligned; the current combined page embeds the individual views so updates should be made in the individual pages first.

## Shared Context

Read `context-and-decisions-v1.md` before creating or revising any wireframes.

Read `starting-prompt-v1.md` for the original master prompt that launched the low-fidelity wireframe work.

## Current Working Notes

- Buttons, filters, toggles, and selections in the HTML wireframes should be real interactive controls, not visual labels only.
- Submission timestamps are system audit metadata. The intake form must not ask the submitter to enter one; it is set only when the completed submission is sent.
- Draft save state can show its own saved-at time, but it must not create or imply a submission timestamp.
- Downstream views may display `submittedAt` as read-only audit metadata. Public views should show only aggregate timestamp ranges, not identifiable submission timestamps.
- Use ABA relationship types consistently: `Full member`, `Associate`, `Observer`, `Non-member`, and `Not sure / pending`; only verified `Full member, active` records are default registrar-packet candidates.
- Track bottleneck themes as controlled review metadata so private blockers can aggregate into public evidence safely.
- Keep the tracker deeper than the Knowledge Hub: tracker dashboards show reviewed evidence logic, while Knowledge Hub pages remain lighter public context surfaces.
- Verify interactive behavior in the browser, not just with screenshots.

## Relationship To Main ABA Work

This work is expected to connect later with:

- the public ABA website
- Jen's custom CRM work
- the biological database / sector intelligence work

The registration tracker should keep a family resemblance with the main ABA website through shared terminology, role boundaries, typography assumptions, product shell, and visual tokens.

The tracker should not force final architecture decisions before the website and CRM direction is settled.
