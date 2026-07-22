# ABA Soft-Launch Delivery Plan

Plan version: 0.1
Last updated: 2026-07-21
Status legend: `NOT STARTED` · `IN PROGRESS` · `WAITING` · `READY FOR REVIEW` · `APPROVED` · `COMPLETE`

## Outcome

Deliver a hosted ABA soft launch consisting of:

- a credible public website;
- one canonical member application, used first by founding members, then by later cohorts and potentially opened publicly when ABA is ready;
- a separate public membership-interest route;
- Lyle's registration-tracker work integrated into the public site through approved landing-page, navigation, content, and state hooks;
- production behaviour in `unpoisonsa/monorepo` that faithfully implements the approved reference prototype and PRD;
- an operational process for reviewing, handling, and safely using submitted information.

## Delivery model

```text
source evidence + accepted decisions
                ↓
        consolidated PRD
                +
 approved reference prototype
                ↓
  monorepo implementation contract
                ↓
 protected production preview
                ↓
      soft-launch cutover
```

The reference prototype is not disposable inspiration. Once approved, it is the visual, content, responsive, and interaction acceptance reference. The PRD is the behavioural, data, validation, consent, operational, and integration reference.

## Workspaces and change boundaries

| Workspace | Role | Change rule |
|---|---|---|
| `soft-launch/` | New requirements, design brief, and reference prototype | Active work area |
| Existing ABA repo surfaces | Historical prototypes, source evidence, and Lyle's tracker workspace | Preserve unless separately authorised |
| `unpoisonsa/monorepo` | Production application and infrastructure | No frontend implementation until prototype and PRD gates pass |

## Gate summary

| Gate | Required approval/evidence | Status |
|---|---|---|
| G1 — Release authority | PRD, authority map, decision register, claims matrix agree | COMPLETE FOR REFERENCE PROTOTYPE 2026-07-20 |
| G2 — UX brief | Design context, sitemap, state inventory, content hierarchy approved | APPROVED 2026-07-20 |
| G3 — Reference prototype | Desktop/mobile journeys and critical states approved | IN PROGRESS — BROCHURE-LED SHARED FOUNDATION ACTIVE; ABOUT REOPENED AND REBUILT; WHOLE SITE RECONCILIATION CONTINUES |
| G4 — Production contract | Monorepo audit and implementation spec approved | NOT STARTED |
| G5 — Integrated preview | Frontend fidelity, real persistence, tracker handoff, and operations pass | NOT STARTED |
| G6 — Go-live | Content, privacy, accessibility, data, ownership, rollback, and smoke tests pass | NOT STARTED |

---

## Phase 1 — Establish the release authority

Status: `COMPLETE FOR REFERENCE PROTOTYPE`

Purpose: turn the accumulated transcripts, workshop conclusions, brochure, WhatsApp context, prototype learning, and current repo documents into one non-contradictory release contract.

### Work

- [x] Create an isolated soft-launch workspace.
- [x] Record that existing sites and Lyle's tracker workspace remain untouched.
- [x] Create an initial source-authority map.
- [x] Create an initial accepted/open decision register.
- [x] Create an initial soft-launch PRD.
- [x] Create an initial content-and-claims matrix.
- [x] Reconcile every launch-relevant requirements document against the new authority layer at document level.
- [x] Complete document-level classification of all 40 existing requirements files.
- [x] Mark older documents as governing, supporting, historical, superseded, or workstream-owned in the index/matrix.
- [x] Complete launch-critical rule reconciliation for membership, intake, Technical Network, consent, states, and tracker boundaries.
- [ ] Resolve remaining factual gaps with Jen; do not reopen accepted workshop decisions.
- [ ] Incorporate Lyle's latest tracker handoff when it lands.
- [x] Produce a clean G1 prototype-authority version with production dependencies explicitly bounded.

### Phase 1 deliverables

- `requirements/source-authority-and-index.md`
- `requirements/soft-launch-prd.md`
- `requirements/decision-register.md`
- `requirements/content-and-claims-matrix.md`
- `requirements/reconciliation-matrix.md`
- `requirements/common-record-field-state-contract.md`

### Exit gate G1

- every first-release requirement has one clear status;
- accepted decisions are not presented as open questions;
- the membership value proposition is central, not deferred;
- claims describe current value honestly without collapsing ABA into forms or a tracker;
- prototype-only choices are not mistaken for production behaviour;
- Lyle integration has an explicit dependency and boundary;
- Jen approves the consolidated contract.

---

## Phase 2 — Define and prove the soft-launch experience

Status: `IN PROGRESS — ACCEPTED REFERENCE SET LOCKED; REMAINING-PAGE PLAN ACTIVE`

Purpose: design the whole soft-launch journey afresh, using the approved strategy and brochure-led identity, without inheriting the existing HTML or monorepo frontend as the answer.

### 2A. Product and design discovery

- [x] Capture known audiences, jobs, journey rules, brand evidence, and anti-goals.
- [x] Create the initial page-and-state inventory.
- [x] Receive Jen's answers to the remaining high-leverage discovery questions.
- [x] Write `.impeccable.md` with the confirmed project design context.
- [x] Produce the structured UX/design brief.
- [x] Adopt the final logo and derive the launch palette from it and the brochure.
- [x] Obtain explicit approval of the brief before coding.

### 2B. Information architecture and content design

- [x] Confirm sitemap and navigation labels for the first reference build.
- [x] Define the home-page content hierarchy and action priority.
- [x] Define the membership narrative as a progressive value proposition.
- [x] Define public interest separately from one cohort-neutral member application.
- [x] Define About, governance, current work, and credibility content boundaries.
- [x] Define the tracker landing/handoff area without inventing Lyle's finished interface.
- [x] Confirm Technical Network as a public-launch recruitment route for aligned experts.
- [x] Express page-by-page content hierarchy in the approved brief, inventory, claims matrix, and reference pages.

### 2C. Reference prototype

- [x] Establish a fresh token and component baseline inside `soft-launch/prototype/`.
- [x] Build the public shell and primary navigation.
- [x] Build Home, About, and Membership.
- [x] Rebuild Home as the brochure-inspired typography/composition proof after visual-direction feedback.
- [x] Define the page-family rollout, reusable-pattern approach, sequence, review points, states, and acceptance matrix in `design/design-treatment-rollout-plan.md`.
- [x] Extract the accepted homepage typography, palette, shell, controls, rules, and responsive behaviour into a shared public-site foundation.
- [x] Rebuild About as a purpose, enabling-conditions, connected-work, and geographic-truth narrative.
- [x] Replace the rejected Membership split-grid/slab treatment with one brochure-derived membership spread, an indexed account of member work, a compact staged joining sequence, clear boundaries, and one restrained close.
- [x] Rewrite public prototype copy in the brochure's active, declarative voice; remove AI slogan fragments, internal data-model language, vague route explanations, and public-facing implementation narration.
- [ ] Complete review checkpoint A across Home, About, and Membership. Earlier Membership passes were not accepted; the route was rebuilt again on 2026-07-21 and now requires Jen's review rather than being treated as locked.
- [x] Write the page-specific remaining-routes execution plan covering copy architecture, distinct composition, states, dependencies, sequencing, review gates, and acceptance in `design/remaining-pages-delivery-plan.md`.
- [x] Re-establish the final ABA brochure as the governing creative source for the entire public site and move its palette, type roles, labels, chapter bands, image fields, callouts, rules, controls, forms, and footer treatment into the shared CSS foundation.
- [x] Rebuild About from the brochure's challenge/response sequence, five named pillars, original agricultural imagery, outcomes band, and South Africa/Africa split after the earlier administrative row layout was rejected.
- [ ] Deliver Wave 1: Membership interest and Technical Network, then pass public-capture review gate B. Visual/content implementation is complete; final review and state coverage remain.
- [ ] Deliver Wave 2: the single member application, then pass application review gate C. The brochure-led working-document treatment is implemented; final review and state coverage remain.
- [ ] Deliver Wave 3: Registration Tracker orientation and Privacy/data use, then pass tracker-and-trust review gate D. The distinct public-utility and policy treatments are implemented; final review and Lyle handoff remain.
- [ ] Complete Wave 4 whole-site integration, shared 404/unavailable states, scenario review, and G3 approval.
- [x] Build public membership-interest capture with validation and confirmation states.
- [x] Build one member application for founding members, later cohorts and eventual public applicants.
- [ ] Complete explicit duplicate, recoverable error, and unavailable states across capture routes.
- [x] Build the tracker orientation/integration shell using the agreed handoff contract.
- [x] Build the Technical Network recruitment/application route and its review-aware confirmation state.
- [ ] Complete responsive review at phone, tablet, laptop, and wide desktop widths. The brochure-led foundation and rebuilt About pass blocking overflow/title checks; every route still requires final creative reconciliation and review against the brochure.
- [ ] Review accessibility, keyboard flow, form comprehension, and reduced motion.
- [ ] Run the same application as a founding member, later applicant and eventual public applicant, plus the public-interest, tracker and ABA-operator scenarios.

Current QA evidence is recorded in `prototype/qa-log.md`.

### Exit gates G2 and G3

G2 requires an approved design brief, sitemap, page/state inventory, and content hierarchy.
G3 requires an approved, functioning reference prototype with critical responsive and interaction states.

---

## Phase 3 — Audit the production foundation

Status: `NOT STARTED`

Purpose: determine what can safely be retained from the existing monorepo as infrastructure and what must be replaced or extended.

### Work

- [ ] Refresh the live audit of `unpoisonsa/monorepo` immediately before implementation.
- [ ] Inventory ABA routes, data models, migrations, auth, consent, mail, queues, tests, deployment, CI, and environment configuration.
- [ ] Mark each production element `retain`, `extend`, `replace`, or `remove after cutover`.
- [ ] Confirm the isolated frontend route/namespace for side-by-side implementation.
- [ ] Verify that existing ABA frontend code is not imported as the design baseline.
- [ ] Identify any work shared with other monorepo applications and protect it from ABA-specific regression.

### Exit gate

An approved audit report and bounded production work area exist before frontend changes begin.

---

## Phase 4 — Write the monorepo implementation contract

Status: `NOT STARTED`

Purpose: translate the approved PRD and prototype into testable production requirements.

### Contract areas

- route map and access rules;
- prototype-to-production screen mapping;
- component and token mapping;
- entities, fields, relationships, and state transitions;
- application-source and cohort metadata without page or field variants;
- public interest and communication-consent behaviour;
- form validation, duplicate handling, error recovery, and resubmission;
- private-route indexing and access assumptions;
- operator review and data-export minimums;
- content-management ownership;
- analytics and privacy boundaries;
- email/notification behaviour, including what is deliberately manual at launch;
- tracker navigation, route, state, and data-handoff contract;
- accessibility, performance, responsive, browser, test, and acceptance criteria;
- migration, preview, cutover, and rollback plan.

### Exit gate G4

Every production ticket traces to the PRD, prototype, or an explicit integration requirement. No ticket says merely "make it like the current ABA site."

---

## Phase 5 — Build the new frontend side by side

Status: `NOT STARTED`

Purpose: implement the approved experience in the monorepo without patching it onto the current ABA frontend.

### Work

- [ ] Create a protected preview route or deploy target.
- [ ] Implement tokens, layout primitives, and components from the approved prototype.
- [ ] Implement public pages and navigation.
- [ ] Implement public interest capture against the existing/extended backend.
- [ ] Implement the canonical member application with one visible experience for every cohort.
- [ ] Implement server validation, persistence, consent versioning, error handling, and operator access.
- [ ] Add automated tests for journeys, permissions, state transitions, and validation.
- [ ] Perform visual comparisons against the prototype at agreed widths.

### Exit gate

The protected preview passes behavioural and visual acceptance. Working infrastructure does not compensate for poor fidelity.

---

## Phase 6 — Integrate Lyle's registration tracker

Status: `DEPENDENCY — LYLE'S WORK MUST LAND BEFORE GO-LIVE`

Purpose: make the tracker part of one coherent ABA website while preserving its independent public utility and workstream ownership.

### Work

- [ ] Receive and review Lyle's implementation/handover.
- [ ] Confirm its canonical route and hosting arrangement.
- [ ] Align public navigation, landing-page framing, page shell, terminology, and return routes.
- [ ] Confirm authentication and shared-session assumptions, if any.
- [ ] Confirm data ownership and consent boundaries; do not silently merge tracker participation with membership.
- [ ] Confirm real-data or truthful-empty public states; no fake launch dashboard.
- [ ] Test cross-surface responsive and accessibility continuity.

### Exit gate

A visitor can understand what the tracker does, enter it, complete the intended route, and return to ABA without the two experiences feeling accidentally stitched together.

---

## Phase 7 — Make the release operationally real

Status: `NOT STARTED`

Purpose: ensure that captures lead to owned work rather than an unattended database.

### Work

- [ ] Assign an owner and response expectation for public interest submissions.
- [ ] Assign an owner and review process for membership intake submissions.
- [ ] Define duplicate/contact-merging handling.
- [ ] Define how known founding-member records and later applications reconcile behind the one form.
- [ ] Define privacy notice, consent copy, retention, correction, export, and deletion handling.
- [ ] Define manual and automated acknowledgement emails.
- [ ] Define access control, audit visibility, backup, and incident handling.
- [ ] Establish content/claim approval and update ownership.
- [ ] Create the go-live and rollback runbooks.

---

## Phase 8 — Test with real launch scenarios

Status: `NOT STARTED`

### Required scenarios

- founding member completes the member application;
- later applicant completes the same member application;
- public visitor asks to hear when membership opens;
- person with an active registration matter enters the tracker;
- visitor understands membership value without assuming guaranteed outcomes;
- ABA operator locates, reviews, and acts on submissions;
- invalid, duplicate, incomplete, withdrawn, and failed-submission paths;
- mobile, slow-network, keyboard-only, reduced-motion, and screen-reader paths.

### Exit gate G5

No critical journey depends on verbal explanation by the team, fake data, or a hidden manual workaround that is absent from the runbook.

---

## Phase 9 — Soft-launch cutover

Status: `NOT STARTED`

### Sequence

1. freeze approved prototype and PRD versions;
2. complete production backup and rollback checks;
3. verify domain, TLS, environment, mail, analytics, privacy, and robots/indexing rules;
4. complete final content, link, form, tracker, accessibility, and browser smoke tests;
5. switch the public experience only after G6 approval;
6. send the private URL to founding members;
7. monitor submissions, errors, and support needs daily during the initial window;
8. log observations as evidence, not immediate uncontrolled scope changes.

---

## Phase 10 — Invite the next cohort and learn deliberately

Status: `NOT STARTED`

- [ ] Send the same canonical member-application URL to the next cohort without changing its copy, fields or confirmation.
- [ ] Review founder feedback and fix only validated blockers before wider invitations.
- [ ] Track completion, abandonment, questions, data quality, and review effort.
- [ ] Decide when public membership intake is mature enough to consider.
- [ ] Prioritise Explorer, richer knowledge resources, chapters, dashboards, member self-service, billing automation, and advisory services from evidence and operating readiness.

---

## Cross-cutting non-negotiables

- Membership value is a core launch narrative, not future-only scope.
- Membership value is one connected proposition, not a ranked hierarchy.
- The tracker is complementary public utility, not a membership gate.
- Public interest is not membership application; approval is not activation.
- Existing prototype sites remain intact unless separately authorised.
- The monorepo frontend is not a design reference.
- No direct-regulator-access, approval-outcome, automatic-listing, endorsement, referral, sales, or unbounded-advice promises.
- ABA's African purpose must be stated with South Africa's current operating reality.
- Lyle's tracker must land and be integrated before go-live.
- Founders and invitees complete the same substantive data model; founders do not skip fields.
- Technical Network is a public call for experts aligned to ABA's vision, values, and code of conduct.
- Use the final supplied logo and derived palette; old prototype tokens are not design authority.
- Member-logo placeholders remain clearly fictional until real assets and display permission arrive.
- Hero titles remain on one visual line at every supported viewport—no exceptions.
- No fake public tracker data.
- Every captured record must have an owner, purpose, consent basis, and next action.
- Public copy and page composition must pass `PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`; brochure-led tone cannot be replaced with slogan fragments, internal-model narration, or generic AI page structures.

## Working cadence and plan maintenance

- Update this file whenever a phase, decision, owner, dependency, or gate changes.
- Record accepted/open decisions in the decision register, not only in chat.
- Keep task-level implementation work in the production repo only after G4.
- Review progress by gate, not by number of pages coded.
- If a new request conflicts with an accepted decision, record the conflict before changing the plan.
- Before any public route is called complete, run the static preflight and responsive render check, inspect full-page mobile and desktop captures, and record material corrections in the QA log.

## Immediate next actions

1. Codex completes the Phase 1 source classification and requirements reconciliation.
2. Jen approves or corrects the completed G1 release authority.
3. Codex begins the reference prototype in this isolated root.
4. The next review occurs at the complete Home/shared-shell visual-direction checkpoint.
