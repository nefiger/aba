# ABA UX Workshop Decision Digest

Last updated: 2026-07-20

## Purpose

Capture the decisions from the 15 July 2026 ABA UX workshop that change the first website release, membership capture, tracker scope, and terminology work.

This is a decision record, not a replacement for the final website specification. Where the workshop raised a question without resolving it, that is marked as open rather than converted into a product rule.

## Source basis

- workshop recording:
  `/Users/nefiger/Downloads/ABA UX workshop - 2026_07_15 12_00 SAST – Recording.mp4`
- local transcript generated from that recording:
  `/tmp/aba-workshop/transcript/aba-ux-workshop.txt`
- final design and strategic reference:
  `/Users/nefiger/Downloads/ABA Brochure (final).pdf`
  and the accompanying ABA core-functions positioning diagram supplied on 2026-07-20

Use the brochure as the primary visual and strategic reference for the website reset. Treat earlier public HTML as reference material only, not as the design or content source of truth.

## 1. First-release membership model

### Confirmed

The first release is a controlled launch, not a public membership launch.

| Audience | Route | Immediate outcome |
|---|---|---|
| Existing founding members | the private initial membership intake form, introduced as founding-member details capture | their people, organisations, and membership details are captured for the first usable ABA data set |
| Next trusted cohort | the same private initial membership intake form, introduced as invite-only intake | a reviewable membership application is captured |
| General public | public interest route | a lightweight request to hear when membership opens; not a membership application |

Implications:

- The public site must not present an open `Apply for membership` route in this release.
- The private routes can be implemented as non-indexed URLs. Their privacy is operational rather than a security boundary; submission review is still required.
- There is one initial membership intake form, initially hosted at a private URL. Founding members use it first; additional invited candidates use the same form later. Their entry context and explanatory copy differ, but the form itself does not.
- The public interest route should create a CRM/contact relationship and permission to receive relevant ABA updates. It remains distinct from a membership application, membership relationship, and tracker intake.

### Membership application workflow confirmed for v1

- Do not offer save-and-return drafting for the short membership form.
- A completed form enters the review queue as `Submitted`.
- `More information required`, `Approved`, `Declined`, and `Withdrawn` are useful application states.
- The review queue is an operational view, not necessarily a public-facing status label.
- Approval does not equal active membership. Finance, onboarding, and activation remain later membership-handling steps.
- Membership management must allow suspension and deactivation; lapse/payment handling needs a final policy decision.

## 2. Registration tracker decisions that affect the website

### Confirmed direction

- The tracker should capture an actual registration situation, not reconstruct a full confidential dossier.
- Intake should be simplified around the information ABA needs for the participant, follow-up, and any permitted aggregate view.
- Participants should confirm the relevant application and service-request steps, including payment/proof requirements where relevant, rather than upload or expose sensitive source material by default.
- The tracker has to distinguish application/service type, current status, and official regulator stage. Official terminology must remain sourced from regulator material, not invented for the website.
- A public aggregate view must be based on real, permitted data at the application level. It must not be populated with fake data at launch.
- If the data set is too small for a useful dashboard, use a modest explainer or a few truthful live headlines instead of a simulated dashboard.

### Still open

- the exact minimum data set for a useful public aggregate view
- the final public labels for the tracker’s information and status model
- whether, when, and how country or product-category detail can be shown without making a participant identifiable
- the final consent language for aggregate use and any named regulator-facing use

## 3. Public-site reset decisions

### The brochure becomes the primary design asset

The new public experience should inherit from the brochure:

- the dark green, warm neutral, and orange accent visual system, to be updated when the new brand file/colour set is supplied
- a clear, editorial hierarchy rather than a dense set of generic cards and panels
- ABA as a sector-building alliance: coordination, advocacy, harmonisation, local manufacturing, chapters/governance, and product clarity
- an Africa-wide proposition with South Africa as the current operating base

### The site needs a simpler first-release job

The website should help a visitor understand:

1. what ABA is and why it exists
2. what ABA is working to change
3. which actions are available now
4. what happens after each action

For this release, the available actions are deliberately limited:

- founding-member details capture — private route
- invite-only membership intake — private route
- public membership-interest capture
- registration-tracker orientation and permitted intake
- a lightweight technical-network interest route, if the service boundary is clear enough

The Explorer, public tracker display, and broader knowledge resources must be positioned according to what is actually ready. They should not be padded with illustrative content or promises of services that ABA is not yet operating.

### Membership and tracker are complementary, not competing paths

The tracker should remain a useful public route for a real registration situation. It should not be paywalled or made conditional on membership. Membership needs its own, progressively revealed proposition: organised participation in ABA’s collective sector work; potential structured representation of authorised relevant matters in ABA’s registrar engagement; and eligible product-information, technical-network, or market-development opportunities as those channels are defined and become available.

No public page may convert that proposition into promises of direct regulator access, approval outcomes, automatic listing, endorsement, referrals, or sales. The detailed rationale and claim boundaries are in `aba-membership-value-and-engagement-model-notes.md`.

## 4. Terminology discipline agreed in the workshop

The workshop identified language drift as a delivery risk. Terms in the previous prototype and notes have sometimes sounded technical, generic, or internally invented rather than understandable to real ABA users.

Rules for the reset:

- Do not put an internal data-model term into public navigation, UI, or copy by default.
- Do not turn a provisional term into a product promise simply because it appears in a mockup or AI-generated note.
- For registration terminology, distinguish regulator-defined language from ABA’s own explanatory labels.
- When a label is unclear, record it as a question for agreement; do not create an alternative casually.
- Use the terminology register with the website specification before building pages or forms.

Examples needing this discipline:

- `public aggregate signals` should not be used at all, internally or externally, until a plain-language meaning is agreed.
- `canonical`, `spine`, `continuity`, and similar system-model words should not be used at all, internally or externally.
- `application`, `membership`, `interest`, and `subscription` must not be used interchangeably.
- `Associate` is legacy wording; do not reintroduce it without an explicit policy decision.

## 5. Implementation sequence

1. Agree the reset terminology and first-release journey map.
2. Approve the first-release sitemap, page roles, and private-route boundaries.
3. Produce the page-by-page content brief from the brochure and agreed terminology.
4. Apply the updated logo and colour system.
5. Build the public and private routes against that approved specification.
6. Test founding-member capture before sharing the invite-only route.

## 6. Workshop-derived decisions to keep out of scope for now

- a real persistent backend or live data integration
- public membership self-service
- a dashboard populated with mock data
- full dossier/document capture in the tracker
- automatic workflow emails, invoicing, or payment automation beyond the states needed to support them later
- complex saved-draft behaviour for the membership form
