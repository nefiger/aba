# ABA Remaining Pages Delivery Plan

Status: active Phase 2 execution plan
Version: 1.0
Last updated: 2026-07-21
Scope: the five soft-launch routes that have not yet received the accepted copy and composition treatment

## 1. The starting point

The final ABA brochure is the governing creative reference for the whole site. It establishes the public voice, narrative order, type contrast, image-led pacing, colour fields, rules, inset statements and panel relationships. Home, About ABA, and Membership remain useful route-specific work, but they are no longer treated as the source of the visual system where they conflict with the brochure.

The shared public-site CSS must express that brochure-led system before later routes are styled. About ABA has been reopened as the first proof of the corrected foundation because its previous administrative rows exposed the problem most clearly.

The remaining routes already exist as working static prototypes:

1. `membership-interest.html`
2. `technical-network.html`
3. `member-intake.html`, the single member application used across cohorts
4. `registration-tracker.html`
5. `privacy.html`

Their current content is directionally useful, but their presentation still relies too heavily on the earlier shared hero, repeated two-column structures, interchangeable cards, and generic form introductions. They also have incomplete error, duplicate, unavailable, and recovery states.

The task is therefore not to apply the About or Membership layout to these pages. It is to retain the agreed ABA identity while designing each page around the work a visitor needs to do. Membership remains a review candidate, not a reusable layout template.

## 2. Non-negotiable delivery method

Every page is completed in this order:

1. **Source check:** confirm the page's purpose, claims, fields, states, and dependencies against the PRD, decision register, claims matrix, and common record/state contract.
2. **Copy architecture:** write the page title, headings, explanatory copy, field guidance, action labels, errors, and confirmation text as plain text before changing layout.
3. **Copy readout:** read the title and headings consecutively. Remove slogan fragments, passive constructions, internal system language, vague route explanations, and claims that need a team member to interpret.
4. **Composition sketch:** decide the page's distinct information structure and density. Compare its silhouette with every accepted route before implementation.
5. **Implementation:** use the shared ABA shell, tokens, controls, focus behaviour, and responsive foundations without copying another page's section pattern.
6. **State completion:** implement the page-specific loading, validation, duplicate, failure, unavailable, and success presentations required below.
7. **Rendered review:** inspect full-page mobile and desktop captures, then run the static and responsive checks.
8. **Record the result:** add material decisions and corrections to `prototype/qa-log.md` before marking the page complete.

No page advances to styling with unresolved public copy. No page is accepted from its first viewport alone.

## 3. Page-by-page approach

### 3.1 Membership interest

**Page job**
Let a public visitor ask ABA to contact them when an appropriate membership opportunity becomes available.

**What the current page gets right**

- It says public applications are not yet open.
- It separates contact permission from membership application.
- It asks for a deliberately small amount of information.

**Problems to correct**

- The standard hero followed by a standard left-introduction/right-form layout gives a small task too much ceremony.
- `This is not an application` is necessary, but the page currently relies on repeating that boundary rather than making the action itself unmistakable.
- Duplicate, service failure, and unavailable states are not visibly designed.

**Copy direction**

- Lead with the action and timing: the visitor is leaving contact details for a later membership opening.
- Explain once, in ordinary language, that ABA will email them and that no application is created.
- Keep only the fields ABA can justify for follow-up.
- Make permission language specific to membership-opening and relevant ABA updates.

**Distinct composition**
A compact sign-up sheet rather than a marketing page: short introduction, one contained form, a plain permission statement, and a concise confirmation. It should be the shortest and lightest route in the site.

**States to design**

- empty/default;
- field-level validation plus a clear error summary;
- email already recorded, with a useful next step;
- recoverable submission failure without clearing entered details;
- form temporarily unavailable;
- submitting state with repeat submission prevented;
- success confirming that ABA recorded contact permission, not a membership application;
- correction, opt-out, and privacy path.

**Acceptance test**
A visitor can explain, in one sentence, what they submitted and what ABA will do next. The page is materially shorter and quieter than Membership and Technical Network.

### 3.2 Technical Network

**Page job**
Invite technical experts who share ABA's purpose and standards to apply for a reviewed role in the network.

**What the current page gets right**

- It names relevant scientific, regulatory, production, field, and market expertise.
- It gives conflicts, confidentiality, evidence, and conduct real weight.
- It explicitly separates the network from ABA membership and public profile publication.

**Problems to correct**

- The current purpose hero, three equal expertise cards, values block, and standard form reproduce familiar website patterns without showing how ABA will use expertise.
- `People with relevant experience` and `Tell us what you know` are generic and could belong to any expert directory.
- The values and code-of-conduct decision arrives as another content section instead of a clear condition of applying.
- Post-submission review, not-a-fit, and unavailable presentations are incomplete.

**Copy direction**

- Say which decisions and work ABA needs experts to support.
- Use sector nouns and concrete fields of contribution.
- State the expected professional conduct before the application begins.
- Explain what ABA reviews and what acceptance does and does not authorise.

**Distinct composition**
A recruitment brief followed by an application. Use a structured expertise field—grouped by the kinds of ABA work experts may support—rather than equal promotional cards. Place the conduct commitment at the transition into the form. The page should feel selective and professional, not exclusive or bureaucratic.

**States to design**

- empty/default;
- field and declaration validation;
- duplicate or existing application;
- recoverable failure with entered information retained;
- application service unavailable;
- submitting state;
- application received and awaiting review;
- accepted/onboarding presentation pattern;
- declined or not-a-fit presentation pattern;
- separate later permission for any public profile;
- privacy and contact path.

**Acceptance test**
Before reaching the form, an expert understands where ABA needs help, the standards they must meet, and that applying creates a reviewed Technical Network application—not membership or permission to represent ABA.

### 3.3 Member application

**Page job**
Collect one coherent membership dataset through one application used by founding members first, later cohorts next and public applicants when ABA is ready.

**What the current page gets right**

- Every organisation completes the same fields on the same page.
- The introduction, action and confirmation remain unchanged across cohorts.
- Product registrations remain a separate optional tracker handoff.
- Authority, organisation, operating activity, independence, priorities, declarations, and consent are captured explicitly.

**Problems to correct**

- A standard hero and a long uninterrupted two-column form do not provide enough orientation for a careful private submission.
- The page needs clearer orientation about why ABA collects the information and what submission means.
- There is no strong progress, review, or recovery model for a long form with no saved draft.
- Conflict, correction, unavailable-service and withdrawn states exist in the specification but not in the presentation.

**Copy direction**

- Tell the person why ABA needs each group of information and what happens after submission.
- Do not ask applicants to identify their cohort or expose `entry context`, `record reconciliation`, or other model language.
- Keep membership review, approval, activation, and optional communications distinct.
- Keep field help factual and brief; remove explanations that merely restate the label.

**Distinct composition**
An operational application workspace, not a public campaign page. Use a compact purpose banner, a section navigator/progress index, tightly grouped field sections, a review-before-submit area, and a visible support/privacy route. Do not turn it into a wizard unless testing shows that the linear document cannot remain usable.

**States to design**

- founding member completing the canonical application;
- later or public applicant completing the same application;
- missing or conflicting information;
- possible duplicate person, organisation, or contact;
- application service unavailable;
- recoverable failure with values retained;
- repeat submission or correction path;
- submission withdrawn/support path;
- one application-received confirmation;
- separate optional handoff to the Registration Tracker.

**Acceptance test**
A founding member, later applicant and eventual public applicant see the same page, questions and confirmation, and never mistake submission for automatic membership activation.

### 3.4 Registration Tracker orientation

**Page job**
Help a person with a real biological product registration understand the tracker and move into Lyle's live intake when it is available.

**What the current page gets right**

- It states that tracker participation does not require membership.
- It separates private submission, anonymous reviewed use, and named use with permission.
- It does not invent public tracker data.
- It currently tells the truth that the live intake is not yet connected.

**Problems to correct**

- The current dark hero, split introduction, three equal permission cards, and closing split read like a generic public information page.
- `Only real, reviewed information` is broad and does not explain what a participant needs to decide.
- The live and unavailable tracker handoff is copy in a content block rather than a clear service state.
- Final route, session, shell, and handoff details depend on Lyle's work and need one explicit integration slot.

**Copy direction**

- Start with the situation: a person has a biological product registration underway and wants ABA to understand its progress or barriers.
- Explain what the tracker asks for without implying dossier submission or regulatory advice.
- Explain the three information-use choices in sequence and ordinary language.
- State that tracker participation does not create membership or unrelated email permission.

**Distinct composition**
An evidence handoff page. Use a short `what you will need` checklist, a linear permission sequence, and one prominent service-status/handoff panel. The live tracker replaces the panel destination without redesigning the surrounding page. Avoid promotional cards and fabricated dashboard imagery.

**States to design**

- tracker live, with confirmed destination and handoff wording;
- tracker temporarily unavailable/opening soon, with safe return or contact path;
- insufficient reviewed public information to publish an aggregate view;
- live public aggregate when Lyle's approved implementation later supplies it;
- broken or failed handoff;
- clear return to ABA.

**Dependency**
The orientation page, permissions explanation, and unavailable state can be completed now. The live CTA, destination, shared shell/session behaviour, and any post-submission return depend on Lyle's handover and must be verified before launch.

**Acceptance test**
A non-member with a real registration can tell whether the tracker is relevant, what information ABA will ask for, what ABA may do with it, and whether the live service is currently available.

### 3.5 Privacy and data use

**Page job**
Explain, in usable language, why ABA collects information through each launch form and how a person can ask questions, correct details, or stop optional communications.

**What the current page gets right**

- It distinguishes membership interest, the member application, Technical Network, and tracker purposes.
- It says private information is not published by default.
- It includes correction and opt-out language.

**Problems to correct**

- The existing hero, list, and editorial split make a short policy page look like another narrative route.
- It does not yet show approved owner, version/review date, retention/deletion position, or a concrete contact method.
- Purpose-specific permissions would be easier to compare in a structured reference format.

**Copy direction**

- Use direct answers: what ABA collects, why it uses it, who reviews it, when anything may be shared, and how a person can act.
- Keep communication consent separate from application or tracker processing.
- Do not claim a retention or deletion process until policy and ownership are approved.
- Surface unresolved operational dependencies as launch blockers in the plan, not vague public wording.

**Distinct composition**
A calm reference document. Use a compact page introduction, contents links only if the final length needs them, a purpose-by-purpose information table or definition list, and a visible contact/correction block. Keep decoration minimal and reading density higher than on narrative pages.

**States and dependencies**

- current approved policy content;
- policy owner and contact route;
- version and review date;
- correction and withdrawal request path;
- optional-email opt-out path;
- retention/deletion statement once approved;
- temporary contact fallback if a dedicated route is not ready.

**Acceptance test**
A person can find the data-use explanation for the form they used and a concrete way to ask for correction, withdrawal, or an explanation without reading the whole page.

## 4. Implementation waves and review gates

### Wave 0 — Lock the accepted reference set

- Capture current Home, About, and Membership desktop/mobile references.
- Record accepted titles, headings, density, and silhouettes.
- Treat changes to these pages as regression fixes only during the remaining-page work.

**Gate:** no visual or copy regression in the accepted three routes.

### Wave 1 — Public capture pair

1. Membership interest
2. Technical Network

These pages share form mechanics but must not look like the same form with different labels. Membership interest proves the compact pattern; Technical Network proves the deeper recruitment and review pattern.

**Review gate B:** inspect both pages with Home, About, and Membership. Approve copy, form hierarchy, error/confirmation language, mobile completion, and visibly different silhouettes before moving the form pattern into the member application.

### Wave 2 — Member application

3. Canonical member application

Implement and test one form system. Review the full task, not just the first and final screens.

**Review gate C:** verify the shared field model, cohort-neutral copy, long-form navigation, validation, recovery, privacy, and one confirmation. Run founding-member, later-applicant and eventual-public scenarios against the same URL.

### Wave 3 — Tracker and trust

5. Registration Tracker orientation, including live and unavailable handoff states
6. Privacy and data use

The tracker route can be completed with an unavailable state before Lyle's final destination lands. Privacy should be finalised after the form copy so it describes the real purposes and permissions used across the site.

**Review gate D:** verify the tracker/member boundary, permission sequence, dependency wording, privacy route, and concrete correction/contact path.

### Wave 4 — Whole-site integration

- add the shared 404 and service-unavailable presentation;
- run every public route at 320, 375, 768, 1024, 1280, and 1440 CSS pixels;
- inspect full-page mobile and desktop captures;
- compare all eight route silhouettes on one review sheet;
- run keyboard, focus, reduced-motion, zoom, slow-asset, broken-link, and console checks;
- run scenario reviews as a public-interest visitor, expert applicant, founding member, later member applicant, tracker participant, and ABA operator;
- update the QA log, decision register, and G3 status.

**Exit gate G3:** Jen approves the complete reference prototype before any instruction to implement it in the monorepo.

## 5. Shared implementation work

Only these foundations should be shared across all remaining routes:

- header, mobile navigation, active-route behaviour, and footer;
- logo, palette, type families, rules, controls, focus treatment, and breakpoints;
- form fields, labels, help, errors, buttons, loading prevention, and confirmation foundations;
- status-message language and accessibility behaviour;
- privacy/support links and safe return patterns.

The following are page-specific and must not become a universal template:

- hero composition;
- section sequence;
- use of colour fields;
- content density;
- expertise presentation;
- form navigation;
- service-status treatment;
- policy/reference structure.

## 6. Quality checklist for every page

### Copy

- The page uses complete, active statements and real sector nouns.
- A visitor can understand the page without knowing ABA's internal model.
- No `ambition`, vague `ecosystem`, `route`, `entry context`, `record`, `operating system`, or slogan-fragment language has leaked into public copy.
- The page says what the action creates and what happens next.
- Claims remain within the approved membership, tracker, network, privacy, and current-stage boundaries.

### Typography and composition

- The page title remains on one line at every supported width.
- Major desktop section headings remain on one line; any retained narrow-screen wrap is explicitly reviewed and logged.
- No heading is narrowed or given a forced line break to manufacture drama.
- The full page has purposeful density and no large empty field without a reason.
- The page is recognisably ABA without repeating the silhouette of Home, About, Membership, or another remaining route.
- Orange identifies a real action or point of emphasis.

### Interaction and access

- Keyboard flow is complete and focus is visible.
- Validation is associated, specific, and recoverable.
- Loading prevents duplicate submission.
- Failure does not unnecessarily clear entered information.
- Success text accurately names the result and next step.
- Touch targets, contrast, zoom, reduced motion, and responsive behaviour pass the governing checks.

## 7. Open launch dependencies

These do not block the page compositions or static states, but they do block final launch approval where relevant:

- Lyle's final tracker destination, handoff, shell/session assumptions, and post-submission return;
- approved ABA values and code-of-conduct wording;
- named operational owners and response expectations for membership interest, Technical Network, and member intake;
- final privacy owner, contact route, retention, deletion, correction, and withdrawal process;
- production duplicate detection, persistence, notification, retry, and operator handling;
- private-link access and expiry behaviour;
- real member logos and permission to display them.

## 8. Definition of done

The remaining-page work is complete only when:

- all five routes use approved public copy and a page-specific composition;
- the canonical member application passes founding-member, later-cohort and eventual-public scenarios without visible variation;
- all required static presentation states exist;
- public membership interest, member application, Technical Network application, tracker participation, and communication consent remain visibly and verbally distinct;
- all automated and manual delivery checks pass;
- Home, About, and Membership have not regressed;
- the QA log and G3 status reflect the final reviewed prototype;
- Jen approves the complete reference prototype.
