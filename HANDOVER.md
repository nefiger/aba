# Handover Note — ABA Prototype

Last updated: 2026-07-04

---

## Current state

The prototype is now in a more explicit page-by-page review and refinement phase.

The current priority is not broad new feature spread. It is:
- tightening the public ABA surfaces so they read coherently
- making the semantic visual language more intentional
- keeping repo notes aligned with what the prototype is actually trying to become

As of 2026-07-03, the current judgment is:
- the public core pass across homepage, About, and membership entry surfaces is good enough for now
- Explorer / database work remains valuable, but should stay secondary to spec and handover coherence
- tracker work remains out of scope unless it is needed to explain the broader ABA system model in notes

Tracker-heavy work is currently parked unless it is needed to explain ABA's product model in notes.

Current sequencing decision:
- Jen and Codex work through the rest of the ABA prototype first
- registration-tracker work is only revisited later if Lyle is still not back in action by that stage

The latest prototype-as-spec pass added a stronger public-page consistency layer and new supporting requirements notes:

- `docs/requirements/aba-prototype-system-model.md`
- `docs/requirements/aba-release-snapshot-readiness.md`
- `docs/requirements/aba-prototype-foundation-and-design-system-notes.md`
- `docs/requirements/aba-prototype-consistency-checklist.md`
- `docs/requirements/aba-content-taxonomy-and-semantic-visual-language.md`
- `docs/requirements/aba-visual-language-conventions.md`
- `docs/requirements/aba-update-strategy-next-steps-email-notes.md`
- `docs/requirements/aba-email-derived-task-list.md`
- `docs/requirements/aba-active-now-checklist.md`
- `docs/requirements/aba-membership-admin-crm-spec-gap-pass.md`
- `docs/requirements/aba-membership-type-policy.md`
- `docs/requirements/aba-public-capture-journeys-and-record-model.md`
- `docs/requirements/aba-public-capture-field-map.md`
- `docs/requirements/aba-admin-surface-taxonomy.md`
- `docs/requirements/aba-admin-pause-and-public-data-capture-shift.md`
- `docs/requirements/aba-public-brand-and-footer-spec.md`
- `docs/requirements/aba-symbol-family-implementation-notes.md`
- `docs/requirements/aba-unified-membership-tracker-system-contract.md`

Public and role-based prototype updates now include:

- stronger membership post-submit and handoff states
- a dedicated internal `Membership Operations` prototype section for review, type assignment, dues, and activation logic
- internal/system views separated more clearly from public primary navigation
- tracker landing-page framing that better connects public site, member workspace, and operator/export handling
- richer secondary public pages for `Technical Network` and `Updates`
- a stronger first pass at semantic route distinctions on the homepage:
  `Alliance`, `Intelligence`, and `Knowledge`
- a first implemented ABA symbol family across the public site, using:
  - route-entry symbols
  - corrected homepage/system symbols
  - secondary-page support symbols
- an active page-by-page visual review of `docs/site/about.html`, including sourced Africa-map treatment and sharper content hierarchy decisions

Important current status on that symbol-family implementation:

- the assets are now wired into the repo and deployed across several public pages
- however, the current execution is not accepted as a visual direction
- the user explicitly disliked:
  - the tiny symbol treatment
  - the white rounded badge/blob backgrounds
  - the insufficient scale and presence of the symbols
  - the fact that the family still does not appear broadly enough across the site
  - the random-feeling cropped route-1 field-mark fragments used as decorative backgrounds
- this tranche should therefore be treated as:
  - a placement and asset-integration checkpoint
  - not a finished or approved visual-system pass

The founding-members demo happened on 2026-06-25. Follow-up notes from both the demo and the internal debrief are now captured in:

- `docs/requirements/aba-founding-members-demo-and-debrief-notes.md`
- `docs/requirements/aba-update-strategy-next-steps-email-notes.md`
- `docs/requirements/aba-email-derived-task-list.md`

The founding-members note is now the best source for:
- what the group reacted to positively
- what shifted from "demo" into real product-spec thinking
- the July sequencing around copy, intake, governance, and first-cohort testing

The newer email-derived note and task list are now the best source for:
- how Anna is currently narrating ABA's role and value to founders
- the explicit post-meeting action sequence
- the practical work items around founder testing, regulator engagement, cohort building, and advisory-network development

The new membership/admin/CRM gap-pass note is now the best source for:
- where the current prototype is already acting like a systems spec
- what is still ambiguous in the operational data model
- the next ordered backlog for turning the prototype into a safer implementation contract

The membership-type policy note is now the best source for:
- the current canonical membership taxonomy
- how categories, annual dues, privileges, and admin-management should be modeled
- the distinction between applied and approved membership type

The public-capture journeys note is now the best source for:
- the different public-side users and entry routes already implied by the prototype
- what each journey is trying to achieve
- what canonical records each route should create
- why route-specific field modeling needs to be clarified before more capture UI work

The public-capture field-map note is now the best source for:
- the actual fields currently being captured on each membership and tracker route
- where route naming has drifted from the canonical taxonomy
- what is shared across routes versus route-specific
- what still needs to move from page-level form design into the canonical system model

The unified membership-and-tracker system-contract note is now the best source for:
- the canonical shared record set across membership, tracker, review, consent, and company continuity
- the journey-to-record map across public routes
- the rule that tracker and membership stay separate entry journeys while still attaching to one shared person-organisation spine
- the v1 list of spec-bearing prototype surfaces
- the reconciliation rules that were used to align the tracker package during the July 2026 spec pass

Current public-capture sequencing clarification:
- resolve the non-tracker membership-side routes first
- keep tracker redesign parked for now
- retain tracker notes only where the broader system model needs continuity and handoff rules
The admin-surface taxonomy note is now the best source for:
- which admin pages are queues versus managed records versus reference data versus observational surfaces
- when inline editing is appropriate
- when a value should instead open a governed process

The admin-pause note is now the best source for:
- why further admin-page refinement is paused for now
- which unresolved field and attribute questions still make more admin specificity premature
- why the next focus should shift to public/frontend data capture

Latest form-shape decisions now locked:
- route-specific public forms should not ask applicants to restate route/category/type decisions already carried by page context
- technical-network capture should collect expertise and contribution facts rather than abstract self-classification or network-fit metadata
- observer is now an institution-first route that captures the institution and primary contact, not a shared person/organisation form variant
- full-member capture has been reduced to factual commercial, support, and eligibility inputs and should not drift back into duplicated review logic

Latest public-shell decision now locked:
- public ABA pages should use one consistent logo placement, organisation name, and tagline
- public pages should end with one shared footer pattern rather than ad hoc CTA footers
- governance and data surfaces are now part of the public information architecture through:
  `docs/site/governance-and-data.html`

The prototype implementation approach should now assume:
- no real database for this tranche
- one canonical mock data layer reused across public forms, membership/admin views, and scenario screens
- realistic fake records and stateful demos rather than persistent backend behavior

Current branch state after cleanup:
- local worktree is back to a simple `main` checkout
- merged local branches used for the recent ABA passes have been removed
- merged remote branches used for those passes have also been removed
- the only remaining remote `codex/*` branches are older reference branches:
  `codex/branch-housekeeping-notes`
  `codex/product-intake-public-form`
  `codex/product-intake-public-form-notes`
  `codex/product-intake-public-form-v3`
- treat those remaining remote branches as historical/reference context, not as the active work line

---

## What was completed in the last session

### Internal documentation capture

- captured Anna's post-meeting email into:
  `docs/requirements/aba-update-strategy-next-steps-email-notes.md`
- extracted a practical repo worklist into:
  `docs/requirements/aba-email-derived-task-list.md`
- created a condensed current-focus checklist in:
  `docs/requirements/aba-active-now-checklist.md`
- updated `HANDOVER.md` to connect those notes back into session continuity

### Membership/admin/CRM spec pass

- audited the current prototype and requirements notes as a systems contract rather than only a public-site prototype
- captured the main domain-model gaps in:
  `docs/requirements/aba-membership-admin-crm-spec-gap-pass.md`
- captured the first-pass membership type taxonomy and policy direction in:
  `docs/requirements/aba-membership-type-policy.md`
- added `docs/membership-ops/index.html` as the first internal demo surface that makes the membership queue, category/type approval, invoicing, and activation states visible in the prototype itself
- moved that surface out of `docs/site/` and into its own launcher-accessible section so the public site remains a public narrative shell
- redesigned that surface away from explanatory content blocks and toward a desktop-first operator admin: sidebar navigation, application review grid, policy table, member detail panel, and activation/billing queue
- then split membership operations into a true overview entry point plus separate work-surface pages:
  `docs/membership-ops/queue.html`
  `docs/membership-ops/membership-types.html`
  `docs/membership-ops/activation.html`
- added `docs/requirements/aba-admin-ia-and-module-plan.md` to reset the admin around modules and canonical records rather than continuing page-by-page screen improvisation
- rebuilt `docs/membership-ops/` around a shared admin shell, a canonical mock-data layer, datagrid-first pages, and explicit stub modules:
  `docs/membership-ops/assets/admin.css`
  `docs/membership-ops/assets/admin-shell.js`
  `docs/membership-ops/assets/admin-data.js`
  `docs/membership-ops/assets/admin-render.js`
  `docs/membership-ops/index.html`
  `docs/membership-ops/queue.html`
  `docs/membership-ops/members.html`
  `docs/membership-ops/membership-types.html`
  `docs/membership-ops/activation.html`
  `docs/membership-ops/invoices.html`
  `docs/membership-ops/renewals.html`
  `docs/membership-ops/chapters.html`
  `docs/membership-ops/registration-intelligence.html`
  `docs/membership-ops/contacts-network.html`
- captured the first-pass public-side journey map in:
  `docs/requirements/aba-public-capture-journeys-and-record-model.md`
  so the next tranche can lock user routes, captured fields, and record creation before redesigning forms
- captured the current route-by-route public field inventory in:
  `docs/requirements/aba-public-capture-field-map.md`
  so the next tranche can compare actual prototype fields against the intended journeys and canonical records before touching form UX
- captured the next-pass interaction contract in:
  `docs/requirements/aba-admin-surface-taxonomy.md`
  so later refinement can classify each admin page before deciding its interaction pattern
- captured the deliberate pause/shift decision in:
  `docs/requirements/aba-admin-pause-and-public-data-capture-shift.md`
  so the current admin work is treated as retained groundwork while the next focus moves to public capture and field modeling
- clarified that the next spec-first tranche should lock:
  - canonical CRM-style records
  - membership relationship semantics
  - operator review/case behavior
  - field-level visibility and consent rules
  - membership-to-submission linkage

### Public-site correction and review

- removed `Workspace` from the public primary navigation where it had been wrongly standardised
- clarified that workspace/operator views are internal prototype utilities rather than first-class public destinations
- continued the consistency pass across:
  `docs/site/index.html`
  `docs/site/about.html`
  `docs/site/technical-network.html`
  `docs/site/updates.html`
  `docs/membership-flow/index.html`
  `docs/membership-flow/membership-types.html`
  `docs/database/index.html`

### Membership capture refinement

- tightened `docs/membership-flow/apply-full.html` so it no longer asks applicants to repeat route-derived or duplicated support/product classifications
- tightened `docs/membership-flow/apply-associate.html` so the technical-network route captures expertise, biologicals focus, geography, and contribution rather than redundant type/fit metadata
- tightened `docs/membership-flow/apply-observer.html` into an institution-first capture path with `Institution name` plus `Primary contact`
- updated `docs/requirements/aba-public-capture-field-map.md` and `docs/requirements/aba-public-capture-journeys-and-record-model.md` to reflect those route-shape decisions explicitly

### Semantic visual language work

- homepage now distinguishes the main routes more intentionally as:
  `Alliance`, `Intelligence`, and `Knowledge`
- button treatment across the main public landing pages moved away from pill/lozenge styling toward more explicit button forms
- `docs/requirements/aba-visual-language-conventions.md` now reflects:
  - no `Workspace` in the public nav vocabulary
  - button-shape guidance
  - the current semantic route labels and color logic
  - the rule that symbolic visuals should be reused intentionally or documented clearly

### About-page refinement

- `docs/site/about.html` is the main active testbed for deeper visual review
- added icon-with-title treatment for the five ABA capability blocks
- removed the earlier system-architecture narration block entirely
- replaced fabricated continent graphics with a sourced Africa map asset:
  `docs/site/assets/africa-map-freevectormaps.png`
- moved map accreditation into the footer note area of the page

### Asset-sourcing correction

- an earlier improvised Africa shape was a mistake and has been removed from the final page direction
- the repo now uses the sourced Free Vector Maps asset instead of a made-up SVG
- the visual-language note now explicitly warns against improvising continent outlines in-page

---

## What's still open

### Prototype-as-spec and visual consistency

- The public site now has clearer shared-shell conventions, but the semantic visual language is still only partially implemented
- The current symbol-family deployment should be revised before being treated as the preferred visual pattern
- The next pass should:
  - remove or greatly reduce tiny white-badge symbol treatments
  - enlarge symbol presence in key homepage and public-page sections
  - use the family more consistently across the wider site
  - replace arbitrary cropped route-1 decorative fragments with more intentional brand-asset composition
- `docs/site/about.html` still needs visual tuning around the sourced Africa-map treatment, marker placement, and how the illustration integrates with text
- `docs/site/index.html`, `docs/membership-flow/index.html`, and `docs/database/index.html` still need deeper page-specific design passes rather than only consistency edits
- Visual assets, imagery, and iconography still need to become more systematic and defensible across the site
- A full design system is still intentionally deferred; the current requirement is disciplined consistency and reusable conventions, not component-library implementation
- For the next agent, do not reopen homepage / About / membership-core refinement as the immediate priority unless the user explicitly asks; those surfaces are currently considered good enough to move past

### Prototype-as-spec data-model work

- The repo now needs a more explicit canonical data spine for membership, admin, CRM-style records, and operator workflow
- The biggest remaining gap is not route structure, but operational modeling:
  people, organisations, relationships, applications, submissions, review cases, consents, and downstream outputs
- The immediate public-side starting note for this is now:
  `docs/requirements/aba-public-capture-journeys-and-record-model.md`
- The immediate companion note for actual current-field inventory is now:
  `docs/requirements/aba-public-capture-field-map.md`
- Those two notes should now be treated as the canonical source for:
  - when public forms should infer route/category from context
  - where public capture stops and review-time classification begins
  - why observer is institution-first and technical network is expertise-first
- Admin refinement is intentionally paused here until more of the public-side capture fields and member-class attributes are surfaced
- `docs/requirements/aba-prototype-system-model.md` should be the next main note to deepen using the new gap-pass note as input
- The prototype should not be allowed to drift into separate public-page logic and admin/workflow logic that describe different systems
- Prototype implementation should stay mock-data-first:
  one canonical in-repo data layer, no real database, no fake backend complexity unless the user explicitly asks for it
- If another agent picks this up, the cleanest next task is repo-note alignment and takeover clarity, not a fresh UI pass:
  `docs/requirements/aba-prototype-system-model.md`
  `docs/requirements/aba-visual-language-conventions.md`
  `HANDOVER.md`

### Sequencing constraint

- Continue with the non-tracker ABA surfaces first:
  public site, membership flow, capture/data-model work, supporting notes, and wider prototype coherence
- Continue next with the public/frontend capture side first:
  public site, membership flow, intake/data-capture shape, supporting notes, and wider prototype coherence
- Only resume tracker-focused implementation or polish later if Lyle is still unavailable at that point

### July follow-through after the founding-members demo

- Copy still needs an owner pass and cleanup before wider sharing
- The first realistic target remains a believable combined membership-plus-product-intake flow for testing
- Anoushka feedback on intake fields should inform the next form/data-model pass
- Admin/backend and member-workspace thinking still needs to move from implied to explicit in notes, even while tracker implementation work is paused
- Governance setup should continue in parallel with product work rather than being deferred
- The database / explorer remains valuable, but is not the immediate launch gate
- Membership/admin/CRM clarification is now part of the immediate prototype-spec work, not just a later implementation concern

### Founder and regulator preparation

- The email-derived task list still needs to be worked through for:
  founder testing
  dummy tracker runs with real examples
  pending-product collection
  regulator engagement preparation
  second-cohort identification
  advisory-network build-out

### Data

- Product catalogue is still at 23 products — it does not yet fully reflect the 22 crop / 20 pest surface
- Good candidates to add: more Trichoderma and Bt product variants, semiochemical examples, inoculant lines for sugarcane and soy
- Some new crops such as sugarcane, macadamia, and cut flowers still have no matching products visible in the catalogue

---

## Key files to know

| File | What it is |
|------|------------|
| `docs/index.html` | Demo hub — entry point for presentations |
| `docs/database/index.html` | Biologicals Explorer (Alpine.js, main data app) |
| `docs/database/product-catalogue.html` | Product catalogue with filters |
| `docs/database/evidence-library.html` | Evidence records library |
| `docs/site/index.html` | Public homepage |
| `docs/site/about.html` | About ABA |
| `docs/membership-ops/index.html` | Internal membership review, dues, and activation prototype |
| `docs/site/assets/africa-map-freevectormaps.png` | Sourced Africa-map asset currently used on About |
| `docs/membership-flow/index.html` | Membership application flow |
| `docs/registration-tracker/index.html` | Registration tracker presenter page |
| `docs/database/assets/bioicons/ATTRIBUTION.md` | SVG icon licence attribution |
| `docs/requirements/` | Working notes, specs, and session notes |
| `AGENTS.md` | Repo working rules for agents |

---

## Workflow notes

- The user reviews and merges PRs, then deletes branches. Always check PR/branch state before pushing to an existing branch — do not assume a branch is still open.
- New work goes on a fresh branch; never push directly to main.
- Internal session notes go in `docs/requirements/` as `<topic>-notes.md`.
- Distinct operational prototype sections should launch from the root ABA directory rather than being absorbed into `docs/site/`.
- This `HANDOVER.md` should be updated at the end of each session.
- Other agents working in this repo should also treat this file as the default shared continuity log and leave updates here unless there is a strong reason to capture something only elsewhere.
- This applies to tracker-adjacent workspaces too, including Lyle-linked work, so cross-agent context does not drift.
- Unless explicitly asked otherwise, prototype implementation work should use curated static reference data plus realistic fake records instead of building a real database or persistence layer.
