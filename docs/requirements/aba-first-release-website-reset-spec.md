# ABA First-Release Website Reset Specification

Last updated: 2026-07-20

## 1. Purpose

Define the first production-ready ABA website release before implementation begins.

This is a reset, not a refinement pass on the current public prototype. The first release must be built from:

1. the final ABA brochure and core-functions positioning diagram
2. decisions from the 15 July 2026 UX workshop
3. agreed terminology and taxonomy
4. the current registration-tracker work, where it determines a public handoff
5. the updated brand assets and colour system when supplied

Earlier public pages, mockups, and generic prototype patterns are reference material only. They do not override this specification.

For the rationale behind public tracker access, progressive engagement, and the member-value proposition, read `aba-membership-value-and-engagement-model-notes.md` alongside this document.

## 2. First-release objective

Launch a credible, clear ABA public presence that:

- explains ABA as an African biologicals sector body
- expresses the brochure’s five-pillar proposition without overclaiming unbuilt services
- captures known founding-member details through a controlled route
- captures founding members and later cohorts through the same member application, without visible cohort variants
- lets the public register interest without implying membership is open
- introduces the registration tracker in a way that is useful, safe, and aligned with Lyle’s implementation work
- creates a stable basis for later public membership opening, knowledge content, chapters, and live aggregate reporting

The public tracker is a useful sector route, not a membership gate. Membership must instead be made compelling through a clear, progressive explanation of collective participation, eligible member-facing opportunities, and the work members help ABA shape.

## 3. Release modes and route rules

### 3.1 Public routes

| Route | Role now | Primary action | Must not do |
|---|---|---|---|
| Home | Explain ABA, its value, and what is available now | register membership interest; explore relevant ABA work | imply public membership intake is open |
| About ABA | Explain the challenge, proposition, five pillars, and operating context | move to an available public action | promise completed chapters, advisory services, or regulator outcomes |
| Membership | Explain why membership makes ABA’s collective regulatory, technical, product-information, and sector-building work more direct and participatory; state the current controlled-release status | register interest to hear when membership opens | show a general application form or promise unrestricted registrar access, outcomes, listings, referrals, or promotion |
| Registration Tracker | Explain the purpose, who it is for, what is safely captured, and what happens next | move to tracker orientation or intake where eligible | expose sensitive data or imply a populated public dashboard |
| Technical Network | Describe the contribution route for specialists if confirmed for this release | express interest / make contact | promise a live directory, paid work, or individual advice |
| Governance and data | Explain basic terms, consent, and privacy boundaries | read the relevant conditions | substitute provisional wording for final policy/legal documents |

### 3.2 Member application

| Route | Audience | Required result |
|---|---|---|
| Member application | founding members first, later cohorts next, and public applicants when ABA is ready | capture the person, organisation, role, operating and participation information needed for membership review and coherent member records |

The application should be non-indexed and absent from public navigation during the controlled release. That release choice must not create a different page, introduction, question set, action or confirmation for different cohorts. The page still needs normal validation, consent, review and safe handling; an unlisted URL is not access control by itself.

## 4. Information architecture

### Proposed first-release sitemap

```text
Home
About ABA
Membership
  - membership interest
Registration Tracker
  - tracker orientation / resources
  - permitted tracker intake
Technical Network (only if release scope is approved)
Governance and data

Controlled release, non-indexed initially
  - member application (one page for founders, later cohorts and eventual public applicants)
```

The Explorer/knowledge area remains strategically important, but it should be included in this release only if it can present real, reviewed content. If not, it is better represented as part of ABA’s work than as a thin public product destination.

### 4.1 Value architecture and progressive engagement

The site must show value progressively instead of treating every visitor as a prospective member.

| Engagement stage | What the site should make clear | Appropriate first-release action |
|---|---|---|
| Understand ABA | Why ABA exists and the sector change it is working towards | Explore ABA’s purpose and work |
| Engage with ABA | A visitor can stay informed without becoming a member | Receive ABA updates |
| Address a registration matter | The tracker may be relevant whether or not the participant is a member | Understand or begin permitted tracker intake |
| Consider membership | Membership creates a more direct collective relationship, with eligible participation and visibility opportunities as ABA develops them | Register membership interest |
| Complete member application | Founding members complete it first; later cohorts and eventual public applicants complete the same page | Submit the member application |

The membership story should be revealed in layers: sector purpose first; then participation and collective influence; then the specific value areas that are available or developing. For the wording and claim boundaries, use `aba-membership-value-and-engagement-model-notes.md`.

## 5. Content and design direction

### 5.1 Brochure-led content hierarchy

The brochure establishes the core ABA story:

- African agriculture is at a crossroads
- ABA is an organised sector response
- ABA works through advocacy and representation, enabling environment and harmonisation, local manufacturing and circularity, membership/chapters/governance, and product clarity
- ABA’s long-term aim is fairer market access and a safer, more resilient agricultural sector

The website must translate this into clear public language. It should not copy every brochure claim or turn the site into a long brochure page.

### 5.2 Visual system

Start from the brochure’s visual character:

- deep green base
- warm off-white/neutral surfaces
- orange accent
- agricultural/natural imagery used with restraint and legibility
- editorial serif display typography paired with a clean sans-serif utility typeface
- calm, substantial content blocks rather than a grid of generic floating panels

The latest supplied logo is the current logo source. The final palette/tokens must be updated when the replacement colour set is provided. Do not continue the current public-site visual language by inertia.

### 5.3 Copy rules

- Explain what is available now and what is being built; do not collapse the distinction.
- Use `membership interest` rather than `apply` on public routes until public intake opens.
- Avoid internal model language and undefined category labels.
- Keep Africa-wide ambition clear while accurately stating the current operating base and rollout stage.
- Make regulatory, product, safety, and service claims only where they can be sourced and supported.
- Describe local biologicals in values-led, precise language without presenting unsettled ownership criteria as formal eligibility rules.

All copy that appears in a public interface must speak directly to a visitor. Phrases that distinguish work in progress from what is available must do so as useful public information, not as internal rollout narration, implementation instructions, or strategic commentary.

## 6. Journey requirements

### 6.1 Member application

There is one member application. Founding members complete it first, later cohorts use it next, and ABA may make it public when ready. Its introduction, questions, submission action and confirmation do not change by cohort. It explains what ABA needs, how the information will be used, what happens next, and that submission does not itself confirm or change membership status.

It needs to capture the agreed minimum information for:

- person and primary contact details
- organisation details where relevant
- relationship/role context
- agreed membership information
- consent and communications preferences
- possible registration-support interest, without turning the route into tracker intake

Production may use known records to prefill or reconcile information and may attach source or cohort metadata internally. That handling must not produce visible application variants or require the applicant to identify their cohort.

The application must:

- explain what the applicant is being asked to provide and what happens after submission;
- submit once complete; no save-and-return draft state in v1
- use the agreed application states: `Submitted`, `More information required`, `Approved`, `Declined`, `Withdrawn`
- make clear that approval, invoicing, and activation are separate later steps

### 6.2 Public membership interest

The public route must be intentionally small:

- explain that membership is being opened in phases
- capture only the information needed to stay in touch and understand broad relevance
- provide permission-based communications handling
- avoid asking the visitor to choose detailed membership categories/types before they are applicable

Where it is contextually relevant, this route may include a subtle parallel action for a person with a registration need: the registration tracker remains open as a separate route, not a prerequisite or a membership upsell.

Final public form wording and fields need confirmation in the terminology/content pass.

### 6.3 Registration tracker handoff

The public tracker page must work for two needs:

- a person who wants to understand whether ABA’s tracker is relevant before entering a form
- an eligible participant ready to start the intake route

It should make clear:

- what the tracker helps ABA understand
- that the participant provides a registration situation, not a full confidential dossier
- how the submitted information is handled and used
- that any public reporting is aggregate, consent-aware, and only based on real data

The detailed form and tracker interaction model remain owned by the tracker workstream. The website spec only defines the public orientation and handoff.

Membership may be mentioned after the tracker’s purpose and action are clear, but only as an optional route to receive ABA updates or learn about future membership. Tracker submission must never be conditional on membership.

## 7. Launch exclusions

Do not ship these as live first-release capabilities:

- open public membership applications
- fake or illustrative public tracker data presented as live
- a public dashboard without enough real permitted data
- product/dossier-level public disclosure
- a fully operational advisory service, supplier directory, chapter network, or technical marketplace
- automated membership billing, renewal, suspension, or workflow messaging

## 8. Acceptance criteria before implementation

The build may start when these are agreed:

1. the current logo file and replacement colour system
2. the final public sitemap and which optional routes are included
3. public wording for membership interest and the cohort-neutral member application
4. the terminology register’s unresolved items that affect visible copy or fields
5. the membership-interest field set and consent wording
6. tracker orientation/handoff copy approved with the tracker workstream
7. the public/private route and indexing rules

## 9. Implementation order

1. Confirm the reset pack with ABA leadership.
2. Turn the brochure-led content hierarchy into a page-by-page content brief.
3. Set logo, colour, type, imagery, and component rules.
4. Build shared shell and public pages.
5. Build the one member application with unchanged copy, fields, action and confirmation across cohorts.
6. Integrate the public tracker handoff when the tracker branch is ready.
7. Test with founding members before inviting the next cohort.
