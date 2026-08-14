# Registration Tracker Workspace

## Current Static Mockup Release

`docs/requirements/registration-tracker-module-change-spec.md` governs the current four-page static mockup, including the 14 August 2026 takeover reconciliation. Where older briefs or wireframes conflict with that specification, the change specification governs this release.

Active mockup pages:

- `../soft-launch/prototype/registration-tracker.html` — canonical public landing and qualification
- `intake-flow/index.html` — five-stage South African Act 36 new-registration intake
- `public-dashboard/index.html` — illustrative registration insights using explicitly fictional, non-publishable application data
- `../soft-launch/prototype/privacy.html` — tracker privacy and required data-use explanation

The public landing lets a participant open the intake directly and places preparation guidance below that action. Final intake review still requires confirmation that the Application Form, Service Request Form, and proof of payment were submitted. One intake concerns one `Product` and one new-product `Application`; the three submission facts are application intake metadata rather than a separate Service Request record. Pre-submission preparation is not a separate active V1 workflow.

Agricultural-remedy service codes and published timeframes come from the shared `shared/registration-tracker-reference-data.js` lookup. Fertilizer and unresolved-pathway records deliberately receive no Agricultural remedy code or benchmark until a Fertilizer source pack is confirmed. Public insight examples count reviewed-and-included records only and never include contact, organisation, product, reference-number, L-number, or private-note fields. The preview threshold applies independently to every public grouping: below-threshold counts, derived values, chart marks, tooltips and table alternatives are suppressed, and summaries must not disclose them by subtraction.

The public insights page uses a pinned local Apache ECharts 6.1 bundle in `shared/vendor/` with SVG rendering. Ranked bars compare pending time, ordered columns compare process-stage counts, grouped bars compare outcomes and percentage bars show overdue or pathway-fit shares. Every chart supports hover/tap tooltips, keyboard value navigation, responsive resizing and an ARIA description, with a readable HTML table as the data alternative.

Tracker and membership journeys must reuse the same `Person`, `Organization`, and `OrganizationPersonRole` records in production. The matching and duplicate-resolution method remains open and is not simulated in this static mockup.

Archived earlier prototypes, preserved without redesign:

- `../docs/registration-tracker/index.html`
- `index.html`
- `admin-operator-review/index.html`
- `../docs/site/workspace.html`
- `../docs/site/operator-workspace.html`

Preserved future pages, outside active navigation:

- `company-dashboard/index.html`
- `registrar-list/index.html`

The static mockup does not persist data, save drafts, provide participant accounts, verify membership, publish metrics, or provide registrar export. Production requirements—including append-only status history, participant and administrator updates, reminders, and the separate ABA `active` / `complete` lifecycle—are recorded in `registration-tracker-mockup-implementation-report.md`.

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

## Historical Working Notes

The notes below describe earlier prototype decisions and remain useful as historical context. The current four-page release and the 14 August reconciliation above supersede them where they conflict.

- Buttons, filters, toggles, and selections in the HTML wireframes should be real interactive controls, not visual labels only.
- Application submit timestamps are system audit metadata. The intake form must not ask the submitter to enter one; it is set only when the completed application is sent.
- Draft save state can show its own saved-at time, but it must not create or imply an application submit timestamp.
- Downstream views may display `submittedAt` as read-only audit metadata. Public views should show only aggregate timestamp ranges, not identifiable application submit timestamps.
- Use ABA relationship types consistently: `Full member`, `Technical partner`, `Observer`, `Non-member`, and `Not sure / pending`; only verified `Full member, active` records are default registrar export-preview candidates.
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
