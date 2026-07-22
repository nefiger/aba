# ABA Reference Prototype Design-Treatment Rollout Plan

Status: strategic rollout reference; accepted reference set locked and remaining-page execution plan active
Version: 0.4
Last updated: 2026-07-21

## 1. Outcome

Apply the approved homepage design language to every remaining page in `soft-launch/prototype/` so the reference prototype reads as one intentional ABA experience across public narrative, action, form, private-intake, tracker, and trust contexts.

The goal is consistency of character and quality, not layout duplication. Home and About ABA establish the current identity baseline. Membership has been rebuilt after another rejected pass and must be reviewed on its own merits; it is not a layout template for the remaining pages. Each remaining page must use the shared grammar in a composition appropriate to its job.

The active page-by-page sequence, copy direction, distinct compositions, states, dependencies, and review gates are now maintained in `remaining-pages-delivery-plan.md`. This document remains the strategic system reference.

This work remains confined to `soft-launch/`. It does not alter the preserved prototype sites, Lyle's tracker workspace, or `unpoisonsa/monorepo`.

## 2. Primary user outcome

Across every route, a visitor must be able to understand within the first screen:

- where they are;
- why the route exists;
- whether it is relevant to them;
- what relationship or record their action creates;
- the single most important next step.

The shared design treatment must reinforce the distinctions between membership, membership interest, the member application, tracker participation, Technical Network application, and communication consent.

## 3. Rollout principles

### 3.1 Propagate a system, not a screenshot

- Reuse palette, typography, spacing, rules, buttons, shell behaviour, focus treatment, and responsive logic.
- Adapt section composition to page purpose; do not reproduce the homepage split hero or route panels everywhere.
- Give each page one recognisable compositional idea while retaining shared edges and component behaviour.
- Avoid adding another page-specific override layer on top of obsolete styling. Consolidate shared patterns as pages are migrated and remove the superseded serif-led rules.

### 3.2 Keep the brochure relationship accurate

- Use the ABA brochure as tone and style authority: material colour fields, agricultural context, disciplined information, confident labels, and purposeful orange.
- Do not turn secondary pages into magazine spreads or introduce serif dominance.
- Concentrate imagery where it adds meaning. Form and policy pages should not receive decorative agricultural photographs merely for consistency.

### 3.3 Protect the product semantics

- Membership remains the institutional centre of the public story.
- Tracker participation remains a separate public utility, never a membership gate.
- Membership interest remains a contact and consent relationship, not an application.
- Founding members, later cohorts and eventual public applicants use the same member application; only internal reconciliation and source handling may differ.
- Technical Network application is reviewed and separate from membership.
- Internal implementation notes, including temporary Lyle handoff narration, must not appear as public copy.

### 3.4 Preserve the absolute hero rule

Every page hero title must remain on one visual line at all supported widths. Titles must be shortened or the layout/type scale adjusted before wrapping is permitted. Clipping, truncation, overflow, and illegibly small fallbacks are not acceptable.

## 4. Shared foundation to establish first

Before restyling individual pages, extract the accepted homepage treatment into a coherent shared foundation.

### 4.1 Tokens

- Final logo colours and approved companion orange values.
- Saira Semi Condensed for primary display roles and Archivo for body, controls, and quieter supporting headings.
- A five-level type hierarchy with fluid display sizes and fixed readable body sizes.
- The existing semantic spacing scale, content widths, rules, focus state, motion timing, and responsive breakpoints.
- Page-purpose colour fields: forest for institutional gravity, warm paper for reading, sage for structure, beige for transition, and orange only for emphasis/conversion.

### 4.2 Shared shell

- One header, mobile navigation, active-route behaviour, wordmark treatment, and footer across all pages.
- Stable public navigation and membership-interest action.
- Keyboard-visible navigation, 44px minimum controls, and no horizontal overflow.
- Shared footer links to About, Membership, Technical Network, Tracker, Privacy and Terms/Use where available.

### 4.3 Reusable page patterns

Create a small set of patterns rather than a universal template:

- **Purpose hero:** one-line title, route label, concise consequence-oriented summary, and at most one primary plus one secondary action.
- **Chapter field:** decisive colour section for a page's central proposition.
- **Evidence/rule list:** structured rows for related facts, principles, permissions, or outcomes.
- **Relationship statement:** compact explanation of what the route creates and does not create.
- **Action handoff:** one visually dominant next step with explicit outcome wording.
- **Form introduction and section rhythm:** purpose, record consequence, grouped fields, declaration, submit, and success/failure states.
- **Trust/provenance block:** owner, review date, correction/withdrawal route, and policy status.

### 4.4 CSS approach

- Keep the existing layered stylesheet entry point, but organise new rules by tokens, base, shell/components, form patterns, page patterns, responsive rules, and page-specific exceptions.
- Replace shared obsolete rules as a unit; do not leave both the Literata/editorial system and the approved homepage system active for migrated pages.
- Keep page-specific selectors narrow and semantic. A component used on more than one page becomes a shared pattern.
- Remove dead selectors after each page family passes visual comparison.

## 5. Page families and treatment

### Family A — Public narrative

#### About ABA

Primary job: explain the challenge, ABA's role, the connected areas of work, and the Africa-wide/South-Africa-now truth.

Treatment:

- Use a confident purpose hero, with imagery or a hard colour field that does not repeat the homepage composition exactly.
- Replace the current editorial two-column repetition with a clearer sequence: challenge → ABA response → connected work → geographic truth → membership handoff.
- Present the five areas of work as a connected field or rule system, not five equal numbered cards and not a ranked hierarchy.
- Use a restrained geographic statement; do not imply active chapters where they do not exist.
- End with a single membership-oriented handoff.

#### Membership

Primary job: provide the complete, credible membership proposition and explain the controlled first-release route.

Treatment:

- Make this the deepest narrative page, but do not repeat the homepage word for word.
- Expand the reinforcing membership system into practical participation, representation, evidence, capability, visibility, and governance implications.
- Remove numbered presentation that could imply benefit ranking.
- Separate `what membership is`, `how value is created`, `what is available now`, and `important boundaries` through colour and density shifts.
- Use one membership-interest conversion at the end. Tracker remains a clearly secondary independent route.

Review checkpoint A: review About and Membership together. They prove that the visual system can support two substantial narrative pages without becoming repetitive.

Checkpoint A correction, 2026-07-21:

- The first two passes failed this test. They reused oversized display type, broad colour slabs, and the same sparse two-column rhythm, so the pages felt like incomplete variants of one template.
- The blank full-page capture bands were a progressive-enhancement defect: core content depended on a scroll-triggered reveal state. Core page content is now visible by default.
- About now uses a continuous institutional field-brief sequence and a connected-work diagram.
- Membership now uses a reciprocal member/ABA exchange, an explicit joining sequence, a compact charter, and one final conversion.
- Homepage layout rules are isolated from the secondary routes. Shared inheritance is limited to identity tokens, shell, controls, rules, focus behaviour, and responsive foundations.
- The subsequently corrected About direction remains the current reference. Membership was rejected again on 2026-07-21, rebuilt as a brochure-derived membership spread and staged joining sequence, and remains pending Jen's review rather than locked.

### Family B — Public orientation bridge

#### Registration Tracker orientation

Primary job: route a person with a real registration situation into Lyle's tracker with accurate purpose, consent, and relationship boundaries.

Treatment:

- Give the route a practical, evidence-oriented character within the shared ABA shell.
- Make `public utility`, `what it records`, and `permission stays specific` immediately scannable.
- Replace the public-facing sentence `Lyle's tracker lands here` with a truthful configurable handoff state:
  - live tracker CTA when integrated;
  - opening-soon/unavailable explanation when not integrated;
  - safe return route in either state.
- Treat private record, reviewed aggregate, and separately authorised named use as a precise permission sequence, not generic cards.
- Show a truthful empty/public-evidence state; do not fabricate dashboard data.

Dependency boundary: the orientation page and handoff states can be designed now. Final destination, shared shell/session behaviour, and live tracker CTA remain dependent on Lyle's handover.

### Family C — Public capture

#### Membership interest

Primary job: capture a lightweight contact and communication-permission relationship.

Treatment:

- Keep the page deliberately compact; it should feel easier and lighter than a membership application.
- Replace the current logo-slab hero with a concise relationship statement and clear form consequence.
- Keep `interest is not an application` visible without repeating it in every block.
- Group only necessary contact and consent information.
- Design explicit default, validation, duplicate/repeat, recoverable failure, unavailable, and success states.
- The success state must confirm that no application or membership was created.

#### Technical Network

Primary job: recruit aligned technical experts into a reviewed expert-network application.

Treatment:

- Lead with expertise, contribution, values, and African context rather than a generic application form.
- Present the expertise landscape as structured bands or a field map, not three interchangeable cards.
- Give the values/code-of-conduct commitment appropriate visual weight before the form.
- Use a stable desktop form introduction and a linear mobile sequence.
- Keep membership, public profile, selection, and representation boundaries explicit.
- Design validation, recoverable failure, duplicate/repeat, unavailable, success, accepted/onboarding, and declined/not-a-fit presentation patterns, even where production behaviour remains outside this static prototype.

Review checkpoint B: review the two public capture routes together before the longer member application is migrated. This proves form hierarchy, consequence copy, errors, and confirmations.

### Family D — Member application

#### One member application

Primary job: collect one coherent factual dataset from every organisation applying for or confirming ABA membership.

Treatment:

- Use a more operational, focused treatment than public marketing pages while retaining the shared ABA identity.
- Use one canonical page, one set of questions, one introduction and one confirmation for founding members, later invited cohorts and eventual public applicants.
- Do not use a query parameter, hidden field or copy variant to make the form appear to be different applications.
- If ABA needs to retain invitation or cohort provenance, attach it as internal source metadata outside the public form.
- Use section progress and strong grouping for person/role, organisation, operating context, participation, declarations, and review/submit; do not turn the form into a multi-step wizard unless the content audit proves it is necessary.
- Keep the tracker handoff separate and optional for people with registrations in play.
- Make clear that ABA reviews every submission and may use it to keep approved member information current; submission does not itself confirm or change membership status.
- Implement visible validation, duplicate/conflict, recoverable failure, repeat/correction, withdrawal/support, and success states.
- Retain entered values after recoverable client/server failures wherever the static prototype can demonstrate that expectation.

### Family E — Trust and legal

#### Privacy and data use

Primary job: explain purpose-specific data use and give people a credible correction, withdrawal, and contact path.

Treatment:

- Use the quietest version of the design system: warm reading surface, restrained display typography, strong information hierarchy, and minimal decoration.
- Add a compact contents/section-navigation treatment if the final copy length warrants it.
- Organise by route/purpose, information handling, permissions, visibility, correction/withdrawal, retention/deletion dependency, and contact.
- Show owner, version/review date, and policy-status information once those are approved.
- Do not use imagery that competes with trust or legal comprehension.

#### Shared unavailable and 404 states

- Add a shared 404 route and a service-unavailable pattern.
- Keep language plain, provide a safe return, and preserve the public shell.
- Provide route-specific unavailable copy for tracker and form services without implying that a submission succeeded.

## 6. Implementation sequence

| Step | Scope | Output | Gate |
|---|---|---|---|
| 0 | Freeze the approved homepage | Reference screenshots, measured hero behaviour, QA baseline | No homepage visual regression |
| 1 | Shared foundation | Consolidated tokens, shell, type hierarchy, patterns, and responsive rules | Homepage remains visually unchanged |
| 2 | About + Membership | Two completed narrative pages | Review checkpoint A |
| 3 | Tracker orientation | Restyled orientation plus live/unavailable handoff states | Lyle dependencies remain explicit |
| 4 | Membership interest | Compact public capture with complete presentation states | Form and consent semantics pass |
| 5 | Technical Network | Recruitment narrative, conduct treatment, application and states | Review checkpoint B |
| 6 | Member application | One canonical long-form application and state system | Same page, questions and confirmation verified |
| 7 | Privacy + global states | Trust page, 404 and unavailable patterns | Public shell and recovery pass |
| 8 | Whole-prototype QA | Responsive, accessibility, scenario, content and link review | G3 ready for approval |

Implementation should continue autonomously between the two review checkpoints. A page is not reviewed only in isolation: each checkpoint includes the homepage and previously migrated routes so drift is caught early.

### Checkpoint A implementation record — 2026-07-21

- The shared public-site foundation now carries the accepted Saira Semi Condensed/Archivo hierarchy, final forest/paper/sage/orange palette, square controls, route shell, labels, rules, footer, focus inheritance, and breakpoint behaviour.
- About now uses a forest purpose field, a warm-paper challenge sequence, a sage connected-work rule system, and a forest geographic-truth close. It does not repeat the homepage split-image composition.
- Membership now uses a paper relationship hero, a forest reinforcing-value system, a controlled first-release explanation, a sage boundaries section, and one orange conversion close.
- Membership value is deliberately unnumbered and unranked. Membership interest and tracker participation remain distinct relationships.
- Home, About, and Membership pass the responsive matrix at 320, 375, 768, 1024, 1280, and 1440 CSS px with one-line hero titles and no horizontal document overflow.
- No existing ABA prototype surface, Lyle-owned tracker workspace, or monorepo implementation was altered.

### Checkpoint A correction — 2026-07-21

The first checkpoint render over-propagated the homepage's most visible devices: oversized condensed headings, large hard colour fields, and repeated block rhythms. It was rejected as too visually uniform.

The corrected treatment keeps the homepage as the image-led, highest-impact route while differentiating the secondary pages:

- About is now a light institutional profile with an asymmetric purpose introduction, prose-led challenge section, compact connected-work field, and calm geographic statement.
- Membership is now a denser, document-like proposition with a quieter relationship definition and value expressed as structured information rows rather than a grid of large panels.
- Saira Semi Condensed is concentrated in page identity and major propositions. Supporting headings use Archivo at a materially smaller scale.
- Full-bleed forest and orange fields are no longer the default section grammar; they remain exceptional emphasis devices.

This correction becomes the rule for later families: shared identity must not create repeated page silhouettes.

## 7. Required states

### Shared

- desktop and mobile navigation;
- active route;
- keyboard focus;
- reduced motion;
- slow or failed image/font load;
- 404;
- service unavailable.

### Capture routes

- empty/default;
- field validation and summary/focus behaviour;
- duplicate or repeat submission;
- recoverable network/server failure;
- unavailable submission service;
- loading without double submission;
- successful submission with accurate next step;
- privacy/support route.

### Member application

- founding member using the canonical page;
- later or public applicant using the canonical page;
- unavailable application service;
- known-record reconciliation/conflict;
- repeat/correction;
- withdrawn through an operational path.

### Tracker bridge

- tracker live;
- tracker temporarily unavailable;
- insufficient safe public aggregate data;
- safe return to ABA.

## 8. Content requirements

- Remove all prototype narration and internal handoff wording from the public interface.
- Preserve the approved claims boundaries; visual polish must not broaden promises.
- Use concise one-line hero titles and avoid headings that require artificial width constraints.
- Make every CTA state the action or destination, not a vague aspiration.
- State what each form creates, what it does not create, who reviews it, and what happens next.
- Keep public interest, application, approval, activation, tracker consent, communication consent, and Technical Network review terminology consistent with the PRD and common record/state contract.

## 9. Quality and acceptance matrix

Every migrated route must pass:

### Visual and responsive

- full-page comparison at 320, 375, 768, 1024, 1280, and 1440 CSS px;
- no horizontal document overflow;
- one-line hero title without clipping or illegible fallback;
- readable body type at 200% browser zoom;
- no repeated generic card grid or repeated homepage composition;
- orange remains rare and purposeful;
- page has a clear primary, secondary, and tertiary hierarchy under the squint test.

### Accessibility and interaction

- semantic headings and landmarks;
- keyboard-complete navigation and forms;
- visible focus;
- controls and touch targets at least 44px;
- WCAG 2.2 AA contrast target;
- inline, associated, comprehensible errors;
- focus moves to the right error or confirmation state;
- reduced-motion behaviour;
- useful alt text and no meaning conveyed through colour alone.

### Product and content

- route purpose is clear without verbal explanation;
- relationship/record consequence is accurate;
- membership and tracker semantics remain separate;
- no unapproved promises or invented public data;
- no internal implementation narration;
- links, return routes, privacy paths, and active navigation are correct.

### Technical hygiene

- HTML validation passes;
- no browser console errors;
- all local assets and links resolve;
- no dead migrated selectors remain;
- no page-specific fix breaks the homepage or a previously migrated route;
- the static prototype continues to make non-persistence explicit in documentation rather than inside the public UI.

## 10. Approval and definition of done

The rollout is complete when:

- all eight current HTML routes use the approved design system;
- page roles remain visually distinct but unmistakably part of one ABA experience;
- the homepage has not regressed;
- all required presentation states exist;
- tracker handoff dependencies are explicit and no fake integration is shown;
- whole-prototype responsive, accessibility, keyboard, content, and scenario QA passes;
- `prototype/qa-log.md`, `PLAN.md`, and the decision register reflect the final result;
- Jen approves G3 before the monorepo production audit begins.

## 11. Open dependencies, not design blockers

- Lyle's final tracker route, shell/session assumptions, and handoff details;
- approved ABA values and code-of-conduct wording;
- named owners and response expectations for each capture route;
- final privacy, retention, correction, withdrawal, and deletion policy;
- real founding-member logos and permission to display them.

These must block go-live where the PRD says they do. They do not block creating accurate layouts and truthful placeholder/unavailable states now.

## 12. Recommended implementation references

- `soft-launch/.impeccable.md`
- `soft-launch/design/ux-brief.md`
- `soft-launch/design/page-and-state-inventory.md`
- `soft-launch/design/brand-palette.md`
- `soft-launch/requirements/soft-launch-prd.md`
- `soft-launch/requirements/content-and-claims-matrix.md`
- `soft-launch/requirements/common-record-field-state-contract.md`
- `soft-launch/requirements/decision-register.md`
- `soft-launch/prototype/qa-log.md`
