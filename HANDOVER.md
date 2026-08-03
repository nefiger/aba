# Handover Note — ABA Prototype

Last updated: 2026-08-03

---

## Current state

### Public copy: institutional disclaimer sweep (2026-08-03)

**For Lyle and his agent.**

Jen flagged the Registration Tracker landing page's `Clear boundaries` block — eight negative statements — as copy written for ABA's protection rather than for the reader, and asked what reason it had to exist. It had none. The sweep that followed removed that class of copy across the public site.

Four findings justified deleting the section outright rather than rewriting it:

- The intake flow has **no file input at all**, so `Do not upload a full dossier or payment documentation` warned against an interaction the product does not offer.
- `registration-tracker/intake-flow/index.html` already stated four of the eight points in a single paragraph on the success screen, at the moment they matter.
- The tracker landing page's own header aside already carried the privacy point, in better words.
- `soft-launch/prototype/privacy.html` already carried the membership and registrar-export statements.

Jen's two decisions governed the pass: legal/liability copy is **cut from marketing and form pages** and lives in `privacy.html`; scope was the **whole public site**, not only tracker pages. The single line privacy did not already carry — no legal or regulatory advice — was added to `Current tracker limits`.

What changed:

- Deleted: `Clear boundaries` (tracker landing), `Membership boundaries` (membership), the duplicated liability paragraph above the Technical Network submit button, the outcome-guarantee sentence on home, and a policy sentence being used as a checkbox hint in the member application.
- Rewritten in second person: tracker and intake ledes, the insights consent checkbox, the review step, the intake success screen, four member-application hints, and the dashboard methodology note.
- Terminology: `combined, non-named` (9 instances) replaced with plain phrasing. None remain. `privacy.html` keeps precise wording but now uses the same words people consent to in the form.
- Layout: `Public evidence` took over the forest treatment left by the deleted section, so the tracker landing keeps its dark band and spends it on the insights call to action instead of on disclaimers. Section rhythm is unchanged: cream, default, beige, forest, cream.
- `membership-joining__notes` lost one of its two grid children, so its desktop rule moved from `repeat(2, minmax(0, 1fr))` to `repeat(auto-fit, minmax(min(100%, 22rem), 1fr))` and the remaining card fills the row rather than half of it.

Verification: `soft-launch/scripts/public-site-preflight.mjs` passes. All nine edited files parse with balanced tags. Section order, backgrounds and the collapsed grid were confirmed by DOM measurement. The one warning (`record` in `privacy.html`) is pre-existing and unrelated to this change.

**Not visually confirmed at desktop width.** The browser pane reported `innerWidth: 0` for the whole session and returned blank captures. The membership notes card and the tracker's forest section should be eyeballed in a real browser before this is treated as accepted.

**Preflight gap closed (same day).** The script previously scanned only `soft-launch/prototype` and reported `Checked 8 HTML files`, so the entire `registration-tracker/` tree — intake flow, public dashboard, resources — was never checked. That is why this class of copy accumulated there unchallenged. It now checks 12 files across both roots and carries seven added `bannedVisiblePatterns` for institutional drift: `this release`, `approved polic(y|ies)`, `evidence gates`, `non-named`, `spec state`, `operator inclusion`, `prototype (spec|state|form|mockup|narration)`.

The internal operator and spec views are excluded through a **named** `internalTrackerDirectories` set — `admin-operator-review`, `company-dashboard`, `registrar-list`, `stitch-wireframe` — so the exclusion is a visible decision rather than a silent omission, and the console line prints it on every run. `registrar-list` still carries `Prototype spec state. Export readiness is controlled by review, consent, proof, reference, membership verification, and operator inclusion.` If any of those four becomes user-facing, remove it from the set and fix what the scan reports. Do not weaken the checks to let a page pass.

On its first run the extended scan immediately caught copy the manual sweep had missed: `This release supports South African Act 36 new registrations only.` in an intake-flow field hint. Now reworded. The three remaining `reviewTerms` warnings (`record`, `route`, `context`) are pre-existing and unreviewed.

### Follow-ups from Jen's review of the same session

Three further defects, all of the same family:

- **Tracker landing, `Is this for you?`** — opened with `These aren't saved or sent to ABA`. That section is a static `<ul>` with no inputs, so the sentence described form fields that do not exist — the same defect as the deleted dossier-upload bullet. Cut.
- **Resources copy** — the lede duplicated the table directly beneath it; a note repeated the non-existent upload concept; and the sample-deposit aside closed with `that's exactly the kind of detail ABA wants to hear about` while **the site has no contact route at all** (zero `mailto:` anywhere, no contact page). All three cut or tightened. The missing contact route is a real gap and still open — several pages want to invite a reply and have nowhere to send it.
- **Reading-measure bug (sitewide root cause)** — `soft-launch/prototype/assets/styles.css:515` sets `p { max-width: var(--reading) }` with `--reading: 68ch`. Because `ch` resolves against each element's *own* font size, one rule yields a different pixel width per element: 623px for 1rem body copy, 511px for a 0.82rem note. Text therefore wrapped into mismatched narrow columns inside the same 1184px shell, beside headings and tables spanning it fully.

  Fixed at the root: `.tracker-module p, .tracker-module li { max-width: 100% }`, and the now-redundant explicit caps on `.tracker-lede` (62rem) and `.tracker-section-heading p` (64rem) were removed. `.tracker-shell` is already the reading constraint. **Do not reintroduce `ch`-based measures in this module** — if a block genuinely needs a narrower measure, give it an explicit rem value and say why.

  On Resources at 1440px: lede 992px/3 lines to 1184px/1; methodology note 511px/3 to 1184px/1; the sample-deposit aside 623px/2 to 1148px/1; the delay list 623px/2 to 1115px/1.

  Audited all six public tracker pages via same-origin iframes at 1440px. What remains narrow is genuine multi-column grid layout, not the bug: the two-column eligibility list on the tracker landing (48%) and the five-column stage nav in the intake flow (20%). The dashboard `.tracker-example-tag` measured as two lines but has one real line box — vertical padding inflating a naive `height / lineHeight` estimate. No horizontal overflow at 375, 768, or 1024 on any page.

  **Process note.** The first pass found this root cause, fixed only `.tracker-methodology-note`, and recorded the rest as "latent, worth a sweep if more turn up." Jen hit the remaining three cases on the very next page load. Having the diagnosis and shipping one selector is worse than not finding it, because the handover then reads as though it were handled. When a root cause is identified, sweep every element it touches in the same change.

### Reading measure fixed sitewide; tracker prototype hub archived (2026-08-03)

**Sitewide.** `--reading: 68ch` is deleted and `p { max-width: var(--reading) }` is now `p { max-width: 100% }` in `soft-launch/prototype/assets/styles.css`. The tracker module fix above only covered `.tracker-module`; the same inversion was live on every other public page.

Measured across all eight brochure pages at 1440px, before and after, via same-origin iframes:

- Paragraphs still carrying a `ch`-derived cap: **25 → 0**.
- Cramped paragraphs (multi-line, wrapping more than 30px short of their container): **25 → 9**. Every one of the nine is held by a deliberate **rem** cap on its own component — 38rem, 42rem, 43rem, 46rem, 64rem — not by the bug. Those were left alone; they are per-component design decisions, and the guardrails doc forbids page-level overrides.
- Worst case before: a paragraph on `index.html` at **29%** of its container (374px inside 1296px). Also 36% on Technical Network, 37% on Membership.
- No horizontal overflow at 375, 768, 1024 or 1440 on any of the eight pages.

Resulting measures land at 78–92 characters per line, which is long but defensible. Three blocks on `privacy.html` run to 101–117 characters: two are `<dd>` elements the `p` rule never governed, so that is pre-existing, and one is a `.tracker-section-heading p` that widened from 1024px to 1184px. If those read too wide, cap those two components in rem — do not restore a global measure.

**Cache keys.** Both stylesheets changed without their keys moving, which is how the first wrapping fix appeared not to deploy. `styles.css` is now `?v=20260803a` across all 11 referencing pages (one straggler was still on `20260722-system6`), and the tracker module is `?v=20260803d` across its 5. **Any change to either file must bump its key in the same commit.**

**Archived.** `registration-tracker/index.html` was an unlinked internal hub — no public page pointed at it, its nav went to Company Dashboard / Operator Review / Registrar Export, and it loaded only `shared/tracker-wireframe.css`, never the site CSS. Adding a `tracker-module` class to it would have been inert.

It is renamed to `registration-tracker/prototype-overview.html` and listed in `archive.html`. Renamed rather than relocated: it has 11 relative paths, including five iframe `src`s to sibling directories, all of which resolve from `registration-tracker/` and would break on a directory move. `/registration-tracker/index.html` now 404s, which is intended — the sibling public routes (`intake-flow`, `resources`, `public-dashboard`) are unaffected. The preflight excludes it through a named `archivedTrackerFiles` set, so the scan is 11 files and the two stale `route` / `context` warnings it produced are gone.

The `docs/**` references to `../registration-tracker/index.html` resolve to `docs/registration-tracker/index.html`, a different and already-archived file. They are not dangling.

**`.nojekyll` added — read this before removing it.** Vacating the index slot did not 404 as expected: the URL began serving `registration-tracker/README.md`, the internal workspace doc, because GitHub Pages runs Jekyll by default and converts `README.md` to `index.html`. Checking that turned up the wider issue — Jekyll was publishing **every internal `.md` in the repo as a browsable HTML page**. All of these returned 200:

- `HANDOVER.html`, `AGENTS.html`
- `soft-launch/PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.html`
- `registration-tracker/JEN-HANDOFF-v1.html`, `pr29-open-items.html`, and every spec, brief, prompt and session-template file in that tree

The repository is public, so the Markdown was already readable on GitHub. The difference is that Pages rendered it as clean, crawlable, indexable pages on the project domain, where it reads as part of the site.

`.nojekyll` at the repository root disables that processing. Verified safe first: no HTML file carries Jekyll front matter, none contains Liquid tags, and `/`, `/docs/` and `/soft-launch/prototype/` each have a real `index.html`, so nothing relied on Markdown conversion. The raw `.md` files remain fetchable at their own paths — `.nojekyll` stops them being rendered as pages, it does not unpublish them. If internal docs must not be reachable at all, they have to move out of the Pages source or into a private repo; that is a separate decision and is **not** done.

The shared module CSS changed without its cache key moving, so `registration-tracker-module.css?v=20260803` was bumped to `?v=20260803c` across all five referencing pages. Returning visitors and the Pages CDN would otherwise have served stale CSS and never seen the wrapping fix.

### Registration Tracker post-submission reconciliation (2026-07-30)

The isolated worktree `C:\Users\krimc\OneDrive\Desktop\Claude\projects\aba-registration-tracker-mockup` on `codex/registration-tracker-mockup` now implements the reconciled tracker model from the documentation checkpoint `e8f9e12`.

The active tracker journey now:

- asks four landing-qualification questions;
- starts only after the Application Form, Service Request Form, and proof of payment were submitted;
- captures those three affirmative confirmations as `Application` intake metadata;
- removes the active pre-submission `Preparing` state and older readiness fields;
- keeps one intake at one `Product` and one new-product `Application`;
- preserves the shared `Person`, `Organization`, and `OrganizationPersonRole` continuity constraint without choosing Jen's production matching algorithm;
- keeps participant status, mapped official stage, and the ABA `active` / `complete` lifecycle distinct;
- explains reviewed Application-level public insights without invented data.

Static QA passes 57 tracker assertions and the public-site preflight. Browser QA covered the four qualification failure branches plus eligibility, all five intake stages, three submission-confirmation gates, conditional reference handling, `Unknown` SACNASP, acknowledgement blocking, review/correction, confirmation, reset behavior, and complete-scroll inspection of the landing, intake opening, intake review, insights, and privacy pages at 375 and 1440 pixels. The shared render checker reports no blocking issue at 320, 375, 768, 1024, or 1440 pixels. The four active pages have clean browser consoles.

The screenshot packet includes full-page stitched scroll captures, viewport captures, and `full-page-contact-sheet.png` at:

`C:\Users\krimc\.codex\visualizations\2026\07\30\019fb40a-b2c2-75d2-950b-aa261efe7a1f\tracker-reconciliation-screenshots`

Do not merge, push, deploy, or change `main` until the user has completed the local browser review.

### GitHub Pages release gateway (2026-07-22)

The root `index.html` is now the GitHub Pages gateway for the current soft-launch work. It links directly to the public website, the single member application, membership interest, the Technical Network application, and Registration Tracker orientation under `soft-launch/prototype/`.

The four links from the earlier root launcher are preserved in `archive.html`. The root page exposes them through one subdued `Archive` link rather than mixing old prototypes and internal workspaces into the current-release list. GitHub Pages remains configured to publish from `main:/`, so the deployed base remains `https://nefiger.github.io/aba/`.

### Public voice and design quality gate (2026-07-21)

Public soft-launch work is now governed by:

- `soft-launch/PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`
- `soft-launch/design/remaining-pages-delivery-plan.md`
- `soft-launch/scripts/public-site-preflight.mjs`
- `soft-launch/qa/public-site-render-check.html`

This was added after repeated copy and composition drift: compressed slogan fragments, internal-model language, oversized headings, repeated two-column blocks, large empty fields, and page treatments that became indistinguishable from one another.

The final ABA brochure is the governing creative source for the entire soft-launch site, not a reference for one or two pages. Its palette, type roles, labels, chapter transitions, image fields, rules, square controls, form treatment and footer now live in one shared `brochure-theme` foundation in `soft-launch/prototype/assets/styles.css`, consumed by all eight public routes.

Shared CSS does not mean shared page composition. The current route treatments deliberately differ:

- Home is the umbrella narrative with the agricultural image field, member cycle, three public actions and founding-member logo scaffold.
- About follows the brochure's challenge/response sequence, five named pillars, outcomes band and South Africa/Africa close, using the brochure's original soil and grain images. Its opening soil image is a controlled 25rem field on wide screens, not a full-fold splash; the first viewport must also reveal the proposition and challenge.
- Membership uses one brochure-derived green/cream spread, an indexed account of what members can do through ABA, a compact staged joining sequence, firm boundaries, and one restrained close. The earlier exchange table and repeated full-width colour slabs were rejected and must not be restored.
- Membership interest is a short public contact-capture page.
- Technical Network is a dark recruitment brief and application, not a membership-page variant.
- Registration Tracker is a public-utility case brief with an inset information sheet; it is not a membership gate and no longer reuses Membership's vertical split.
- The member application is a compact working document with a clear private-data notice and one unchanged form for founders, later cohorts and eventual public applicants.
- Privacy is a restrained reading document rather than another marketing hero.

The visual/content migration is implemented but has not been declared finally approved. Jen's 2026-07-21 screenshots are the current review evidence. Membership was rebuilt again after the latest screenshot was rejected for its layout and system drift; it is ready for review, not recorded as accepted. The full render check currently reports zero blocking horizontal-overflow or primary-title failures across 320, 375, 768, 1024 and 1440 CSS px. The remaining work is whole-site refinement, interaction/error-state completion, accessibility review and final route-by-route approval.

The latest six-page screenshot review triggered a shared-system correction rather than another set of isolated page overrides. The active stylesheet now fixes the cascade order explicitly: Saira is used for page and major-section identity, Archivo for body/operational UI, and Lora only for selected brochure propositions. Forest, paper and cream carry the pages; orange is an action/transition accent; sage and leaf green no longer become competing full-width palettes. Routine section spacing was compressed across Home, Membership, Membership interest, Technical Network and Tracker. Tracker prototype narration was removed and its opening was rebuilt as a compact public-utility brief. These changes are recorded in `soft-launch/prototype/qa-log.md` and remain ready for Jen's visual review, not accepted by implication.

The top navigation now uses the same deep-forest field as the footer. Wordmark and navigation copy are paper, active-route text/rule and the primary action use light orange, and the mobile menu retains the same dark field. Do not revert individual routes to pale headers.

Before changing public soft-launch copy or layouts, read the guardrail contract and the remaining-pages plan. Before describing a route as complete, run the static preflight, run the responsive browser check, inspect full-page mobile and desktop captures, compare the route silhouette with the rest of the site, and record material corrections in `soft-launch/prototype/qa-log.md`.

Do not weaken the checks to permit a failing page. Jen's direct corrections and the final brochure govern public tone; behaviour and claim boundaries remain governed by the accepted workshop and requirements pack.

### Website reset and first-cohort specification (2026-07-20)

The public-site work has been reset before implementation. Do not continue panel-beating the earlier public HTML as the primary path. Use the final brochure, the core-functions positioning diagram, and the new reset pack as the source of truth:

1. `docs/requirements/aba-first-release-website-reset-spec.md`
2. `docs/requirements/aba-membership-value-and-engagement-model-notes.md`
3. `docs/requirements/aba-terminology-and-taxonomy-reset-register.md`
4. `docs/requirements/aba-ux-workshop-decision-digest-2026-07-15.md`

The first-release membership rule is now explicit:

- one member application page, initially available at a private URL;
- founding members use it first to complete their details;
- later invited candidates use the same page and questions, and the page may open publicly later;
- cohort or invitation provenance may be retained as internal metadata but must not create query-based form variants or different public copy;
- public visitors can only register membership interest / receive ABA updates, creating a CRM contact and consent relationship rather than a membership application.

The tracker remains Lyle’s workstream and a useful public route for an actual registration situation. It must not be used as a membership gate. Membership needs a distinct, progressive proposition with carefully bounded claims.

### Workshop handover for Lyle (2026-07-14)

If Lyle needs to get his head around the system model quickly before the workshop, use this reading order:

1. `docs/requirements/aba-system-model-workshop-reference.md`
   - this is the best whole-system written reference
   - it covers actors, records, relationships, business rules, and open gaps across membership, tracker, admin, and communications
2. `docs/requirements/aba-system-model-uml-diagrams.md`
   - this is the visual companion to the workshop reference
   - it now includes:
     - the shared database model
     - CRM/admin entities
     - admin modules
     - status models
     - user accounts and roles
     - membership categories/types/packages
     - finance/activation/renewal
     - communications/opt-ins
     - Biologicals Explorer/member-product listing model
     - route-level capture-field models
     - tracker and source-form relationship diagrams
3. `registration-tracker/data-model-v1.md`
   - this is now the source-grounded tracker/regulatory slice only
   - use it for Act 36 / regulator-model questions, not for the whole ABA system
4. `docs/requirements/aba-terminology-review-register.md`
   - use this to spot vague, invented, or overloaded language in one place before the workshop

Main corrections made in this pass:

- `Application` is the source-grounded tracker business record.
- A separate formal `Submission` object is **not** supported clearly by the source docs.
- The `Service Request Form` sits with one or more application forms and carries distinct receipt/admin/payment/service-summary data.
- If ABA wants to store that separate administrative grouping, the clean model is:
  - `ServiceRequestPacket` as an admin/grouping record
  - `Application` as the actual tracked registration record
- `public aggregate signal output` was renamed to `Public registration tracker dashboard`.
- The workshop note now treats the system as one shared database across membership, tracker, admin, CRM, finance, and comms.

Key current modeling stance for tomorrow's workshop:

- do not treat tracker and membership as separate databases
- do treat membership, tracker, admin, comms, and explorer as one shared data model with different entry routes and visibility rules
- do distinguish:
  - `MembershipApplication` from `MembershipRelationship`
  - `Product` from `Application`
  - `Application` from receipt/admin metadata
  - public dashboard use from member/private/admin/export use

Where to find the clearest current status models:

- membership application states:
  `docs/requirements/aba-system-model-uml-diagrams.md`
- membership relationship states:
  `docs/requirements/aba-system-model-uml-diagrams.md`
- tracker status/stage framing:
  `docs/requirements/aba-system-model-uml-diagrams.md`

Important remaining open questions for workshop discussion:

- whether every observer becomes a true `MembershipRelationship` or whether some remain lighter stakeholder records
- whether every Explorer-listed product must belong to an active member relationship
- how explicit the final `ServiceRequestPacket` storage/handling should be in v1
- whether a dedicated lead/prospect status model is needed, or whether `Person` / `Organization` / `MembershipApplication` / `ContactSubscription` are enough
- the final permission model for company users, ABA admin, finance, chapter, and technical-network access

### Registration-tracker intake refinement (2026-07-13)

- Branch `codex/registration-tracker-intake-refinements` updates the intake flow for the current review:
  - Step 5 is now a complete-submission checklist.
  - Step 6 is now `Professional accountability`; SACNASP verification status is required, with `Unknown` retained for pending verification.
  - The named / registrar-facing consent is the second option and is visibly disabled unless the submitter identifies as a Full ABA member; anonymised aggregate use is third.
- The intake brief records a future monthly post-submission reminder flow, explicitly pending journey design before implementation.

### UX workshop system-model reference added (2026-07-14)

- Added `docs/requirements/aba-system-model-workshop-reference.md`.
- This note now works as a workshop reference rather than a short brief.
- It consolidates:
  - actors
  - canonical records
  - key attributes
  - relationships
  - business rules already stated in the repo
  - unresolved modeling gaps
- Use it as the quickest re-entry point if the next session needs to reason about:
  - tracker backlog unit versus intake envelope
  - person/organisation continuity across membership and tracker routes
  - the distinctions between membership category/type, company role, product category, service type, and status/stage

### Registration-tracker regulator source docs and source-grounded model note added (2026-07-14)

- Added the primary regulator reference files under `registration-tracker/reference/regulator-source-docs/`.
- Replaced `registration-tracker/data-model-v1.md` with the cleaner rewrite from the side-thread handoff.
- The tracker model note now distinguishes:
  - source-defined regulator terms and process structures
  - ABA tracker-side normalization choices
  - open questions still not settled by the source documents
- Most important clarification:
  - `Application` is clearly source-defined in the regulator corpus
  - the docs on this branch should now use `Application` as the main tracker record, with intake/receipt details treated as metadata rather than as a second named business object

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

### 2026-07-11 → 07-12: Brand mark, design system, symbol family, copy

- Adopted the new ABA roundel logo (deep-green Africa-silhouette mark) across the public site, unified mark sizing in the shared shell, and removed the retired route-1 wordmark assets. (PR #30)
- Extracted a **design system as a spec for the eventual monorepo build** — deliberately *not* wired into the prototype:
  - `docs/design-system/tokens.css` — canonical design tokens (from homepage + shared shell) with a drift map for the older oklch / `#2b6b4f` palette dialects
  - `docs/design-system/design-system.md` — colour, type, spacing, components, iconography, and how it pairs with `registration-tracker/data-model-v1.md` as the build spec
  - `docs/design-system/symbol-family.html` — faithful record of the 20-symbol "ABA Symbol Family" handoff (from Claude Design)
  - `docs/design-system/symbols/` — per-symbol assets (glyph-only SVG/PNG + composed `color/`)
- Reconciled and rolled out the symbol family:
  - Replaced the older multi-colour "refined" symbols with the **composed handoff symbols** (glyph + field-mark contour bands, live-brand palette) at the shared `docs/site/assets/symbols/*.svg` — updating homepage, About, Technical Network, and Updates in one file swap
  - Homepage: removed two decorative shared-signal placements that read as blobs; About: dropped the tinted lockup boxes so symbols render full-sized
  - The symbols predate the final logo and are supplementary iconography only — the roundel logo is unchanged
- Refreshed `docs/requirements/aba-public-site-copy-working-document.md` into a full copy extract of all 21 public-facing pages, pulled from the live HTML.
- Fixes: registration-tracker hero "Who this route is for" bullets made legible on the dark panel; intake-flow restored the shared-header top gap (it was missing `tracker-wireframe.css`'s `.prototype-shell` padding). (PRs #31, #32)
- Minor leftover: dead `.system-glyph` CSS rules remain on `docs/site/index.html` after removing that element (harmless orphan; can be tidied in a follow-up).

### Internal documentation capture

- captured Anna's post-meeting email into:
  `docs/requirements/aba-update-strategy-next-steps-email-notes.md`
- extracted a practical repo worklist into:
  `docs/requirements/aba-email-derived-task-list.md`
- created a condensed current-focus checklist in:
  `docs/requirements/aba-active-now-checklist.md`
- updated `HANDOVER.md` to connect those notes back into session continuity
- started the production-readiness website reset from the final brochure and the 15 July ABA UX workshop:
  - `docs/requirements/aba-ux-workshop-decision-digest-2026-07-15.md`
  - `docs/requirements/aba-terminology-and-taxonomy-reset-register.md`
  - `docs/requirements/aba-first-release-website-reset-spec.md`
  - `docs/requirements/aba-membership-value-and-engagement-model-notes.md`
  - these now supersede the earlier page-by-page refinement stance for future public-site work, pending leadership agreement of the reset pack
  - the next build must be brochure-led and first-cohort-led: there is one member application page, used by founding members first, later cohorts next and potentially public applicants later; the visible page and questions do not change by cohort, while public membership interest remains a separate CRM/contact and communication-consent route
  - tracker participation remains a public utility, not a membership gate; the new member-value note records the source-grounded distinction between tracker participation and the more direct collective relationship membership is intended to create
  - the note also sets claim boundaries: no public promise of direct regulator access, outcomes, automatic product listing, endorsement, referrals, sales, or a marketing package
- captured the supplied founding-group WhatsApp archive into:
  `docs/requirements/aba-whatsapp-group-synthesis-2026-07-20.md`
  - use this as the internal source for message discipline, regulatory-preparation context, service-boundary guardrails, and unresolved membership/governance questions
  - it is deliberately explicit about what is confirmed direction versus material still needing legal, board, or technical review
  - corresponding public-copy and knowledge-provenance guardrails were added to:
    `docs/requirements/aba-homepage-strategy-and-copy-notes.md`
    `docs/requirements/aba-content-taxonomy-and-semantic-visual-language.md`

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
- The symbol family has been reconciled to the composed handoff symbols (glyph + field-mark bands) and rolled out across homepage, About, Technical Network, and Updates; tiny white-badge treatments and blob-like decorative placements were removed. Still to do: symbols are not yet used on the database, membership, or tracker pages (no slots there yet) — introduce them there if wanted.
- `docs/site/about.html` still needs visual tuning around the sourced Africa-map treatment, marker placement, and how the illustration integrates with text
- `docs/site/index.html`, `docs/membership-flow/index.html`, and `docs/database/index.html` still need deeper page-specific design passes rather than only consistency edits
- Visual assets, imagery, and iconography still need to become more systematic and defensible across the site
- A design system has now been **extracted as a spec for the monorepo build** (`docs/design-system/`), paired with `registration-tracker/data-model-v1.md`. It is intentionally *not* wired into the prototype. A component-library implementation inside the prototype is still deferred; the prototype should keep using disciplined consistency and the shared shell.
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
| `docs/design-system/` | Extracted design tokens, design-system spec, and symbol-family assets — build spec for the monorepo (not wired into the prototype) |
| `docs/site/assets/symbols/` | Composed ABA symbols (glyph + field-mark bands) used across the public site |
| `docs/requirements/aba-public-site-copy-working-document.md` | Full copy extract of all public-facing pages |
| `docs/requirements/aba-whatsapp-group-synthesis-2026-07-20.md` | Internal synthesis of founding-group WhatsApp context; use before strategy, content, membership, regulatory, or advisory work |
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
