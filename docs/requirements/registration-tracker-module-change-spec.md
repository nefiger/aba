# Registration Tracker Module — Change Specification

**Status:** Reconciled implementation specification for the static mockup; amended by the 14 August 2026 takeover reconciliation below
**Last updated:** 14 August 2026
**Planning baseline:** `bdd1921` (`origin/main` when the implementation scope and workflow were finalized)  
**Implementation scope:** Registration Tracker landing page, intake form, public insights view, and tracker content on the Privacy and data use page  
**Not in scope:** Production persistence or security implementation, participant editing after submission, a live operator workspace, company dashboard, registrar export, or redesign of archived prototype pages

> **Mandatory first action:** Do not edit the current checkout. Read this complete specification, including Section 21, and create or safely reuse the isolated worktree before making any implementation change.

## 0. Takeover reconciliation — 14 August 2026

This section records Anna's later direction and governs wherever the older 30 July instructions below conflict. The earlier decisions remain in place as historical context; they have not been deleted.

**Newer sources:**

- `reference/shared/transcripts/2026-08-05-anna-lyle-registration-tracker-meeting-notes.md` — Anna's tracker review on 5 August 2026;
- `reference/shared/transcripts/2026-08-13-anna-jen-priorities-meeting-notes.md` — Anna's handover to Jen on 13 August 2026; and
- `reference/shared/task-tracking/2026-08-13-registration-tracker-handover.md` — the source and implementation reconciliation prepared on 13 August 2026.

### Superseding decisions

| Earlier instruction retained below | Later decision that now governs |
|---|---|
| Orient and qualify through a prominent `Is this for you?` action | Use **one dominant hero action: `Start a new registration`**. Do not place an `Is this for you?` button or a registration-resources action beside it. |
| Treat preparation as a branch that can block the visitor before intake | Keep concise readiness criteria and preparation help lower in the journey. Early submissions can be manually reviewed, so the public entry should help a legitimate participant move forward instead of over-gating them. |
| Lead public insights with a future methodology / insufficient-evidence explanation and avoid charts | Put the sector questions first. The static mockup may use clearly labelled **illustrative data**, provided it cannot be mistaken for live evidence, uses source-backed regulator constants, and implements the future review and privacy-threshold contract. |
| Use a restrained evidence-status page | Use accessible infographic summaries, but keep the approved paper/forest palette dominant. Orange is a scarce action or graphic signal, not a full-width metrics field, and insight blocks do not each receive a different brand tint. |
| Treat `functional category` as the only visible product classification | Keep three axes separate: **ABA product category**, **Registrar function of product**, and **Legal pathway**. Do not present ABA's sector categories as the registrar's verbatim taxonomy. |
| Show the five new-registration subtypes regardless of legal pathway | Show the sourced subtype / `14ARx` mapping only for **Agricultural remedy**. Fertilizer and unresolved pathways remain capturable for manual review but receive no agricultural-remedy code or published timeframe. |
| Store/display a registration type as one value | Store the specific plain-language subtype separately from `service_request_code` and `service_request_row`. The code is a shared payment reference, not a unique subtype. |

### Public voice and colour correction — 14 August 2026

The public tracker must not narrate its implementation. A visible explanation is kept
only when it helps the visitor decide, complete the form, trust the consequence, or
recover from an error. Source-row reconciliation, field-taxonomy rationale, review-state
names, data-contract language, prototype status, and operator instructions remain in
this specification and QA.

The public wording may say that figures are illustrative and not sector findings. It
must not present `Design preview`, release terminology such as `V1`, threshold approval
notes, or phrases such as `reviewed and included records` as page content. The intake may
show a service code and published timeframe after a relevant choice because those values
help the applicant; it must not explain the internal mapping machinery.

Tracker colour follows the approved soft-launch system: paper and forest dominate, cream
or sage wash may group supporting information, and orange remains rare. Data graphics use
the smallest semantic set needed for comprehension. Section rhythm comes from spacing,
rules, and composition before colour changes.

The public insights route uses the `tracker-module--data-infographic` foundation and the
`tracker-module--signal-infographic` composition. It must read as a sequenced regulatory
data story rather than an editorial brochure or software dashboard: a compact, light visual
synopsis, direct questions, visible axes, exact values and chart forms selected for the
question. Ranked median bars compare pending time, ordered columns compare official-stage
counts, grouped bars compare outcomes on a common baseline and percentage bars show
benchmark status. Process flows are reserved for questions about movement, and stacked bars
for genuine part-to-whole questions; neither is the default for cross-category comparison.
Public interactive charts use the pinned local Apache ECharts 6.1 SVG renderer, with
hover/tap tooltips, visible keyboard focus, arrow-key value navigation, responsive resizing,
ARIA descriptions and accessible data tables.
The page gets impact from comparative scale, density and diagram structure while retaining
the shared forest/paper palette. It must not box every finding, use a scatterplot where the
question is comparison, add thick side rails or use oversized sequence numerals as
decoration.

### Source-backed new-registration lookup

For Agricultural remedy records only, the mockup uses this single lookup, verified against the Service Request Form and Process Guide 2015:

| `registration_type_key` | Public label | `service_request_code` | `service_request_row` | `official_timeframe_days` |
|---|---|---:|---:|---:|
| `new_molecule` | New molecule / new active ingredient | `14AR2` | 2 | 627 |
| `new_formulation` | New formulation | `14AR2` | 2 | 418 |
| `generic_active_ingredient` | Generic active ingredient | `14AR1` | 1 | 418 |
| `parallel_registration` | Parallel registration | `14AR1` | 1 | 118 |
| `daughter_registration` | Daughter registration | `14AR1` | 1 | 118 |

`Reinstatement` is present on Service Request Form row 1 / `14AR1`, but it is not a new registration and remains outside V1 metrics. Selecting it must stop submission and say directly that this tracker does not collect reinstatements. `Not sure` is valid and leads to manual review with no invented code or timeframe.

The shared source metadata is:

```text
source_document_version = Service Request Form, modified October 2016
official_timeframe_source = Guideline of the Registration Process for Agricultural Remedies, 2015, Table 1
```

The current source pack does not establish equivalent Fertilizer service codes, subtype labels, or published timeframes. Obtaining the current Fertilizer Application Form and Service Request Form is an unresolved dependency.

This is not a reason to reject a Fertilizer application from the tracker. It may contribute
to overall, stage, outcome and pathway-fit insights. It is excluded only from the overdue
comparison until ABA confirms the applicable Fertilizer timeframe. Public copy states that
consequence, not the source-pack limitation.

### Public-insight questions for this pass

The illustrative insights page must answer directly:

1. How long are current applications pending, using the median as the primary summary?
2. Where in the official process are applications waiting or blocked?
3. How do outcomes vary by new-registration subtype or ABA product category?
4. Which eligible Agricultural remedy records are beyond an applicable source-backed published timeframe?
5. What thresholded aggregate pathway-fit problems are being reported?

Every illustrative application is fictional. The page must say `Illustrative data — not sector findings` prominently. The implementation counts only records marked reviewed and included and never exposes names, products, contact details, references, registration numbers, or private pathway-fit notes.

The preview privacy threshold applies independently to every displayed group in every public view, including pending-age, process-stage, benchmark, outcome and pathway-fit views. When a group is below the threshold, its count and every derivative—median, longest wait, barrier, overdue count, chart mark, tooltip and accessible alternative—must be suppressed. Synopsis totals and legends must also avoid complementary disclosure that would let a reader derive a suppressed group. These implementation rules remain testable but are not narrated as public page copy.

### Pathway-fit capture

Capture the underlying mismatch neutrally without presenting B/K/L/M prefixes as applicant-selected categories:

```text
submitted_legal_pathway
believed_best_fit_pathway
pathway_fit = fits | does_not_fit | not_sure
pathway_fit_reason = registrar_advice | precedent | no_suitable_category | evidence_burden | delay_or_repeated_difficulty | other
pathway_fit_note_private
```

Raw answers and notes are participant/ABA-review information. Only reviewed, thresholded aggregates may feed public insights. Kathy or Anouska must still validate when and how L/M/K terminology is used in practice before those letters appear in applicant-facing copy.

## Fresh-session kickoff prompt

Use this prompt when handing the work to a new agent:

> Implement `docs/requirements/registration-tracker-module-change-spec.md` exactly. Read `AGENTS.md`, `README.md`, `HANDOVER.md`, and the complete specification before editing anything. Follow the mandatory worktree workflow. The 30 July 2026 reconciliation in this tracker module spec and tracker-local data-model note governs the form changes. Do not modify the current checkout, archived or future pages, shared cross-journey contracts, glossary files, taxonomy workbooks, or unrelated parallel planning work. Complete the four-page static mockup and its QA, start the local browser preview, and give me the review links, 375px and 1440px screenshots, changed-file list, and QA results. Stop for my browser review. Do not merge, deploy, or change `main` without my explicit approval.

## 1. Purpose

This specification defines the next version of the Registration Tracker module within the larger ABA prototype.

The release is deliberately narrow:

- focus on **new registrations only**;
- orient a person who arrives through a shared link;
- confirm that the visitor is the right person to provide the information;
- move an eligible visitor into a clear new-registration intake journey;
- explain the future public value of the information without inventing data or relying on charts;
- keep registrar export and other future work outside the active mockup.

The implementation agent must treat this document as a change specification, not as permission to redesign unrelated ABA surfaces.

## 2. Product outcome

A visitor receiving a Registration Tracker link should be able to answer, within the first screen and the first short qualification step:

1. What is this?
2. Is this intended for me?
3. What kind of registration can I share?
4. What will ABA do with the information?
5. What should I do next?

The intended journey is:

```text
Shared link
  → Registration Tracker landing and qualification
  → Start a new-registration intake
  → Review answers and submit
  → ABA review, with a two-week target
  → Approved information may support combined, non-named public insights
```

## 3. Governing sources and precedence

When sources conflict, use this order:

1. Confirmed product decisions in this specification, reconciled on 30 July 2026 against the
   workshop recording.
2. The reconciled registration-tracker data model, current unified system contract, and
   registrar-source requirements, except where this specification records an explicit release
   decision that supersedes them.
3. Current registration-tracker reset, UX, and product requirement documents.
4. `soft-launch/PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`.
5. The live Membership page as a reference for CTA hierarchy and journey clarity.
6. Current HTML as the implementation baseline, not as the source of product truth.

The file `docs/requirements/aba-system-model-workshop-reference.md` is **not an active governing document**. Do not cite it as authority, use it to resolve decisions, or reintroduce requirements from it.

Where older registration-tracker briefs or prototypes conflict with this specification, this specification governs this release.

Before implementation, read and reconcile at least:

- `README.md`
- `HANDOVER.md`
- `registration-tracker/README.md`
- `registration-tracker/data-model-v1.md`
- `registration-tracker/registrar-requirements-spec-v1.md`
- `registration-tracker/intake-flow/intake-flow-brief-v2.md`
- `registration-tracker/public-dashboard/public-dashboard-brief-v2.md`
- `docs/requirements/aba-first-release-website-reset-spec.md`
- `docs/requirements/aba-public-capture-journeys-and-record-model.md`
- `docs/requirements/aba-public-capture-field-map.md`
- `docs/requirements/aba-unified-membership-tracker-system-contract.md`
- `docs/requirements/aba-membership-type-policy.md`
- `docs/requirements/registration-tracker-site-integration-implementation-plan.md`
- `soft-launch/requirements/source-authority-and-index.md`
- `soft-launch/requirements/decision-register.md`
- `soft-launch/requirements/common-record-field-state-contract.md`
- `soft-launch/PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`

Also inspect the current implementations:

- `soft-launch/prototype/membership.html`, for the transferable CTA and journey pattern only;
- `soft-launch/prototype/registration-tracker.html`;
- `registration-tracker/intake-flow/index.html`;
- `registration-tracker/public-dashboard/index.html`;
- `soft-launch/prototype/privacy.html`.

This reading list does not make every older statement equally authoritative. Use the precedence order above and record any unresolved conflict instead of choosing silently.

## 4. Confirmed product decisions

| Area | Confirmed decision |
|---|---|
| Module scope | Treat Registration Tracker as a focused module within the larger ABA repository. Do not reorganize the root workspace. |
| Release scope | V1 accepts new registrations only. Amendments, renewals, appeals, permits, source changes, reinstatements, and other post-registration services are out of scope. |
| Entry context | Assume the visitor commonly arrives through a link sent to them. The landing page must orient and qualify them before asking for detailed data. |
| Data-use condition | Contributing reviewed information to combined, non-named registration insights is a condition of using the tracker, not optional aggregate consent. The participant must actively acknowledge this condition before submission. |
| SACNASP | SACNASP status is required and self-reported in the mockup. Valid responses are `Verified`, `Not verified`, and `Unknown`. `Unknown` is a valid answer. Do not collect a raw SACNASP number. |
| ABA relationship | The only membership categories are `Full member` and `Technical partner`, plus no current relationship. Each category must distinguish `Active` from `Application submitted`. |
| Jurisdiction | Structured V1 capture is South Africa / Act 36 only. Do not apply South African terminology or published timeframes to other jurisdictions. |
| New-registration lifecycle | V1 begins only after the Application Form, Service Request Form, and proof of payment have all been submitted. It represents a qualifying new-registration application from submission through decision. Pre-submission preparation, post-registration changes, renewals, and other service types remain out of scope. |
| V1 record grain | One intake concerns one new-product `Application` for one `Product`. `Product` remains separate and may have later applications or lifecycle events. |
| Service-request handling | Do not create a separate Service Request entity in V1. Store the three required submission confirmations as application intake metadata. |
| Identity continuity | Tracker and membership routes share `Person`, `Organization`, and `OrganizationPersonRole`; later membership must reuse the same records and history. The production matching algorithm remains open. |
| Status layers | Keep application/service type, participant-reported status, mapped official regulator stage, and ABA lifecycle (`active` or `complete`) distinct. Production updates must be append-only and auditable. |
| Save draft | Save and resume is required for production, but is not implemented or presented as functional in this static mockup. Record the production requirement in the migration note. |
| Post-submission editing | ABA manages corrections and status changes in this mockup. Secure participant editing is required in production and belongs in the migration note. |
| Review | ABA admin reviews each submission and selects `Approved for insights`, `Needs clarification`, or `Excluded`. The public mockup states a two-week review target; the existing operator-review page remains archived and is not redesigned. |
| Membership verification | Intake relationship status is self-reported. Production verification may be provided through admin status links; it is not simulated in this mockup. |
| Export eligibility | Future export eligibility remains a production/future-feature note only. |
| Registrar export in V1 | No registrar export view, export packet, export preview, or active export link in this release. Retain the concept only in clearly marked future-feature notes. |
| Public insights | Do not use fake data or charts that imply a meaningful sample. Start with an evidence-status or coming-soon experience. |
| Public terminology | Use **published timeframe**. |
| General updates | Do not ask the participant to subscribe to general ABA updates through the tracker. |
| Production-only decisions | Retention, deletion, duplicate matching, participant accounts, publication thresholds, clock treatment, analytics, production security, and final metric definitions are migration-note items, not mockup behavior. |
| Titles and metrics | Page titles require later review. Metrics are not implemented in this mockup. |

## 5. Module surfaces and routes

The current release has four active public mockup surfaces. Preserve their existing routes.

Canonical public entry:

`https://nefiger.github.io/aba/soft-launch/prototype/registration-tracker.html`

| Role | Canonical route | Target responsibility |
|---|---|---|
| Public entry | `soft-launch/prototype/registration-tracker.html` | Canonical tracker URL. Explain, qualify, set expectations, and route to intake or public insights. |
| Intake | `registration-tracker/intake-flow/index.html` | Capture one South African Act 36 new-registration record and demonstrate review and submission states. |
| Public insights | `registration-tracker/public-dashboard/index.html` | Explain the evidence programme and publication state truthfully without fake charts. |
| Privacy and data use | `soft-launch/prototype/privacy.html` | Explain the tracker’s required data-use condition, private data, review, non-named insights, and correction/contact route. |

Use these relative links:

| From | To | Relative URL |
|---|---|---|
| Landing | Intake | `../../registration-tracker/intake-flow/index.html` |
| Landing | Insights | `../../registration-tracker/public-dashboard/index.html` |
| Intake | Landing | `../../soft-launch/prototype/registration-tracker.html` |
| Intake | Insights | `../public-dashboard/index.html` |
| Insights | Landing | `../../soft-launch/prototype/registration-tracker.html` |
| Insights | Intake | `../intake-flow/index.html` |
| Landing | Privacy | `privacy.html` |
| Intake | Privacy | `../../soft-launch/prototype/privacy.html` |
| Insights | Privacy | `../../soft-launch/prototype/privacy.html` |

Visible naming may use “Registration insights” instead of “Public dashboard,” subject to title review. Do not rename the route merely to change the visible label.

The following are archived or future surfaces and are not redesigned:

- `docs/registration-tracker/index.html` — archived earlier public tracker;
- `registration-tracker/index.html` — archived combined demo hub;
- `registration-tracker/admin-operator-review/index.html` — archived operator-review mockup;
- `registration-tracker/company-dashboard/index.html` — preserved future company page;
- `registration-tracker/registrar-list/index.html` — preserved future registrar-export page;
- `docs/site/workspace.html` and `docs/site/operator-workspace.html` — archived internal workspaces.

Do not link to these pages from the four active mockup surfaces. Existing archive-only links may remain.

Use these pages as reference or link-verification surfaces only; do not redesign them:

- `soft-launch/prototype/membership.html` — transfer its CTA and journey logic, and verify its tracker link;
- `soft-launch/prototype/index.html` — verify its tracker entry;
- `soft-launch/prototype/member-intake.html` — verify its optional post-membership tracker handoff;
- `docs/database/regulatory-signals.html` — verify that its existing redirect still reaches the insights route.

## 6. Membership-page pattern to carry across

The current Membership page provides a useful journey pattern:

1. a direct proposition;
2. an immediate primary CTA;
3. a clear audience qualifier;
4. concrete value;
5. a short process explanation;
6. explicit boundaries;
7. an adjacent route;
8. a repeated closing CTA.

Apply that logic to the Registration Tracker, but do not clone the Membership page literally.

| Membership-page behavior | Registration Tracker adaptation |
|---|---|
| “Why join ABA?” | What the tracker is and why ABA is collecting the information. |
| “Who membership is for” | “Is this for you?” qualification for a new registration and an authorized contributor. |
| Membership value areas | What ABA can learn from reviewed registration information. |
| Membership-opening steps | Share, review and submit, ABA review, and safe contribution to insights. |
| Membership boundaries | ABA is not the registrar and submission does not create regulatory or membership outcomes. |
| Adjacent registration route | Adjacent public-insights route. |
| Repeated expression-of-interest CTA | Repeated start-intake CTA. |

The tracker is an operational tool, not a membership-sales page. Keep the copy practical, restrained, and specific to the registration task.

## 7. Landing page change specification

### 7.1 Primary job

The landing page must orient and qualify a recipient before sending them into the form. It must not make the visitor read multiple explanatory sections before finding the main action.

### 7.2 Recommended page sequence

#### A. Direct opening

Use a short eyebrow identifying the Registration Tracker and a plain-language title.

Working title, pending review:

> Track a new biological product registration.

The opening description should state:

- this first release is for new registrations;
- structured capture currently covers South African Act 36 registrations;
- the visitor shares the current position of one registration;
- ABA reviews the information before using it;
- submitted information may support combined, non-named insights after ABA review;
- contact details and identifying company or product information are not published through the insights view.

Primary CTA:

> Start a new registration

Do not lead with “How the tracker works” as the only action.

#### B. “Is this for you?” qualification

Ask four short questions:

1. Is this a new biological product registration?
2. Is it a South African registration under Act 36?
3. Are you responsible for the registration or authorized to provide its information?
4. Have the Application Form, Service Request Form, and proof of payment all been submitted?

Provide a clear next step for each outcome:

| Outcome | Response |
|---|---|
| Eligible | Show or enable “Start a new registration.” |
| Not responsible or authorized | Ask the visitor to forward the link to the responsible person. |
| Registration service is out of scope | Explain that the first release focuses on new registrations. Do not route the person into an incompatible form. |
| Country or regime is out of scope | Explain that structured capture currently covers South African Act 36 registrations. |
| Required submission steps are incomplete | Explain that this release begins after the Application Form, Service Request Form, and proof of payment have all been submitted. Ask the visitor to return after completing those steps; do not route them into intake. |

This interaction must use accessible form controls, keyboard operation, visible focus, and announced status changes. It must be progressive enhancement:

- do not collect or persist sensitive information during qualification;
- if JavaScript is unavailable, show the eligibility criteria and direct intake link;
- do not turn qualification into an account or membership gate.

#### C. What the tracker helps ABA understand

Use four concise, indexed items rather than a grid of promotional cards:

1. where new registrations are in the process;
2. elapsed time in relation to the published timeframe;
3. barriers that recur across reviewed registrations;
4. evidence that can be shared safely in public insights.

#### D. How it works

Use four steps:

1. **Share** — provide the current position of one new registration.
2. **Review and submit** — check the information and acknowledge how reviewed information may be used.
3. **ABA reviews** — ABA aims to review the submission within two weeks and may request clarification.
4. **Build insights** — approved information may contribute to combined, non-named findings when the evidence is sufficient.

Avoid wording that promises an automatic publication date or inclusion.

#### E. Boundaries

State clearly:

- ABA is not the registrar.
- The tracker does not submit an application to a regulator.
- ABA does not provide legal or regulatory advice through this form.
- Do not upload a full dossier or payment documentation.
- Contact, organisation, product, and raw registration details are not made public automatically.
- Contribution to combined, non-named insights after review is a condition of submitting through the tracker.
- Using the tracker does not create, approve, or change ABA membership.
- A registrar export is not available in this release.

#### F. Adjacent public-insights route

Use a restrained link or section:

> See how registration insights will be published

This route should lead to the public insights page, not to an export preview or a chart-heavy dashboard.

#### G. Closing action

Repeat the primary decision at the end:

> Ready to share a new registration?

Actions:

- Start a new registration

### 7.3 Landing-page removals

Remove or rewrite:

- broad promises covering all registration and regulatory services;
- repeated permission explanations that belong in the intake;
- membership-first qualification;
- export links, export previews, or export-readiness language;
- save/resume claims that imply the static mockup provides persistence;
- internal terminology, product-roadmap narration, or prototype commentary;
- claims that public insights already represent a meaningful market sample.

## 8. Intake form change specification

### 8.1 Primary job

Capture the minimum credible information needed for ABA to review one South African Act 36 new registration while making authority, required data use, and professional accountability explicit.

The form must not imply that ABA is accepting a regulatory application.

### 8.2 Visible stages

Use five user-facing stages:

1. You and your organisation
2. Product and new-registration type
3. Current status
4. Submission confirmation and professional accountability
5. Data use and submission

The implementation may use smaller technical components internally, but the participant should not experience an unnecessarily long or fragmented wizard.

### 8.3 Stage 1 — You and your organisation

Required:

- confirmation that the participant is responsible for the registration or authorized to provide the information;
- name;
- email;
- role or job title;
- organisation;
- organisation role in the registration;
- country;
- permission for ABA to contact the participant about this submission;
- self-reported ABA relationship.

Optional:

- phone number.

Organisation registration details should remain out of the form unless a confirmed CRM or identity requirement establishes their purpose.

#### ABA relationship choices

Display only:

- Active Full member
- Applied for Full membership
- Active Technical partner
- Applied as Technical partner
- No current membership or application

Store the answer as separate category and status values:

```text
self_reported_aba_category:
  full_member | technical_partner | none

self_reported_aba_status:
  active | application_submitted | not_applicable
```

Do not treat the participant’s answer as verified membership. Any operator-verified membership category and status must be stored separately.

For this mockup, do not simulate membership verification. Record production verification through admin status links in the production-migration note.

### 8.4 Stage 2 — Product and new-registration type

Required:

- product name;
- functional category;
- legal pathway where conditionally applicable;
- new-registration type.

The page must state that this mockup covers applications in South Africa under Act 36. Do not present a country or regime selector that implies other jurisdictions are supported. Allow `Not sure` where the participant may not reasonably know the Act 36 legal pathway. Do not force false precision.

For this release, show only:

- New molecule or active ingredient
- New formulation
- Generic active ingredient
- Parallel registration
- Daughter registration

These user-facing labels require review against regulator-source terminology before final copy freeze.

Do not expose in this release:

- reinstatement;
- new source for an existing registration;
- amendments;
- renewals;
- permits or certificates;
- appeals;
- other post-registration services.

Preserve the broader underlying taxonomy for later use where it already exists. This is a release-scope filter, not permission to delete valid domain definitions.

### 8.5 Stage 3 — Current status

Required:

- participant-reported current status;
- status date;
- approximate decision state or expectation, where appropriate;
- whether an official reference has been issued;
- reason when an expected reference is not available.

Derived or system-controlled:

- mapped official stage;
- applicable published timeframe;
- calculated open duration;
- `submitted_at`.

Rules:

- Do not invent or generate a regulator reference.
- Do not require an L-number or equivalent if one has not been issued.
- Treat `submitted_at` as a production system event, not a participant field or a fabricated mockup value.
- Keep participant wording distinguishable from ABA-reviewed or mapped status.

### 8.6 Stage 4 — Submission confirmation and professional accountability

Required:

- confirmation that the Application Form was submitted;
- confirmation that the Service Request Form was submitted;
- confirmation that proof of payment was submitted;
- self-reported SACNASP status: `Verified | Not verified | Unknown`.

Optional or conditional:

- approved or responsible person name;
- role;
- residency information where the legal pathway requires it;
- confirmation of authority or appointment.

All three submission confirmations must be affirmative. `No` and `Not sure` are not valid intake
states in this release because the landing qualification excludes pre-submission records.

Do not collect:

- a raw SACNASP registration number;
- a full dossier upload;
- proof-of-payment files;
- sensitive documents without a defined storage, access, retention, and deletion policy.

`Unknown` SACNASP status is a valid completed answer. It must not be silently converted to `Not verified`.

### 8.7 Stage 5 — Data use and submission

Required:

- processing acknowledgement necessary to handle and review the submission.
- required data-use acknowledgement, initially unchecked:

> I understand that ABA may use reviewed information from this submission in combined, non-named registration insights. ABA will not publish my contact details or identify my organisation or product through the public insights view.

Rules:

- This is a condition of using the tracker, not an optional aggregate-consent toggle.
- The participant cannot submit without acknowledging it.
- Do not pre-check the acknowledgement.
- Do not offer named-use, registrar-export, newsletter, or general-updates controls in this mockup.
- Explain before the final action that ABA review determines whether information is suitable for combined insights.
- Prefer `combined, non-named insights` to an absolute promise that an individual record has been anonymised.

### 8.8 Review and confirmation

Before submission, show a readable summary of material answers and the required data-use acknowledgement. Allow edits without losing completed fields.

After submission, confirm:

- ABA received the registration information;
- ABA aims to review it within two weeks;
- ABA may contact the participant for clarification;
- ABA admin may mark it `Approved for insights`, `Needs clarification`, or `Excluded`;
- approved information may contribute to combined, non-named insights;
- contact details and identifying organisation or product information are not published through the insights view;
- the submission does not create or change membership;
- the participant may add another new registration or view the public-insights explanation.

Recommended next actions:

- Add another registration
- View registration insights
- Return to the Registration Tracker
- Return to the ABA site

## 9. Privacy and data-use page change specification

The repository already contains `soft-launch/prototype/privacy.html`. Update its Registration Tracker content; do not create a second tracker privacy page.

The page must explain in plain language:

- the tracker collects contact, organisation, product, registration, status, submission-confirmation, professional-accountability, and acknowledgement information;
- ABA uses the raw submission for follow-up and review;
- submitting through the tracker includes a required acknowledgement that approved information may contribute to combined, non-named registration insights;
- contact details are not published through the public insights view;
- the public insights view does not name the participant, organisation, or product in this mockup;
- using the tracker does not create membership or permission for unrelated communications;
- the participant can contact ABA to ask a question or request a correction;
- the mockup does not provide participant accounts, saved drafts, post-submission editing, or automated publication.

Do not say that tracker submissions remain entirely private or that public use is optional. Do not use `consent` where the intended concept is the required data-use condition.

Link to this page:

- from the landing page near the explanation of how information is used;
- from the intake before final submission;
- from the submission confirmation;
- from the insights page near the publication explanation.

Detailed retention, deletion, withdrawal effects, production security, and lawful-processing language belong in the production-migration note and require production privacy/legal review. The mockup should not invent those policies.

## 10. Mockup boundary and production migration notes

This repository contains a static reference mockup. Do not build or simulate production persistence.

### 10.1 Mockup behavior

- Do not claim that a draft has been saved or emailed.
- Do not store entered tracker information in `localStorage`, `sessionStorage`, a URL, or another browser-only workaround.
- Do not generate fake submission identifiers, timestamps, regulator references, or L-numbers.
- It is acceptable for the mockup to demonstrate client-side stage navigation, validation, answer review, and a submission-confirmation state.
- ABA-managed corrections and status changes may be described in copy; do not create a participant editing account or operator interface.
- The archived operator-review page is not an implementation dependency and must not be redesigned.

### 10.2 Production requirements to preserve

The production migration note must record:

- secure save and resume;
- `saved_at` separate from `submitted_at`;
- cryptographically secure, expiring, revocable resume tokens with server-side hashes;
- encrypted transport and rate limits;
- draft expiry, retention, and deletion;
- token invalidation on final submission;
- preservation of entered values after recoverable errors;
- secure participant editing after submission;
- membership verification through admin status links;
- duplicate detection and reconciliation;
- auditable ABA review and publication-inclusion decisions;
- publication thresholds and suppression rules;
- published-timeframe source ownership and clock treatment;
- permissible analytics that never receive sensitive field values;
- production privacy, legal, security, notification, and accessibility review.

These production requirements are notes only for this tranche. They must not expand the mockup implementation.

## 11. Public insights change specification

### 11.1 Analytical job

The page should explain:

- what evidence ABA is collecting;
- how submitted information becomes reviewed evidence;
- what ABA intends to publish;
- why results may not yet be shown.

It is an **explanatory evidence-status page**, not yet a monitoring dashboard.

### 11.2 Default release state

Use a truthful status such as:

- Collecting submissions
- Reviewing information
- Not enough reviewed information to publish findings

Do not show:

- fake or fixture totals;
- mock trends;
- placeholder country comparisons;
- chart axes without defensible values;
- export packet counts;
- sample claims that cannot be substantiated;
- charts merely to make the page look like a dashboard.

### 11.3 Recommended composition

#### A. Evidence status

Lead with the current publication state, the meaning of that state, and the next threshold or review condition where one has been approved.

Do not invent a numeric publication threshold.

#### B. Registration process map

Show a simple sourced process sequence:

```text
Preparing
  → Received
  → Verification
  → Scientific screening
  → Evaluation
  → Decision
```

Labels must be checked against the active registrar-source model before implementation. The process map explains structure; it must not imply live counts.

#### C. Questions future insights will answer

Explain that reviewed information may eventually show:

- where new registrations are waiting;
- elapsed time in relation to the published timeframe;
- recurring barriers;
- safe coverage by registration category and country.

Each area may display “Insufficient reviewed information” until publication is supportable.

#### D. Publication pipeline

Show:

```text
Participant shares information
  → ABA reviews it
  → Quality and inclusion checks are applied
  → Approved information is combined without names
  → Findings are published
```

#### E. What is collected and why

Use a compact table connecting major information groups to their purpose. For example:

| Information group | Why ABA collects it |
|---|---|
| Product and registration type | To compare like with like. |
| Current status and dates | To understand position and elapsed time. |
| Readiness and barriers | To identify recurring causes of delay. |
| Professional accountability | To understand the submission context. |
| Data-use acknowledgement | To confirm the required condition for contributing reviewed information to combined insights. |

#### F. CTA

End with:

> Share a new registration

Link to the intake form.

### 11.4 Low-data visualization hierarchy

When real reviewed data becomes available, use the smallest truthful representation:

1. a short reviewed-findings bulletin;
2. one or two defensible headline values;
3. a directly labelled list;
4. a compact table;
5. only then, simple bar charts when sample size and comparison quality support them.

Avoid a conventional multi-chart dashboard until the evidence base warrants one.

Candidate metrics, all pending review:

- reviewed open new registrations;
- registrations beyond the published timeframe;
- median elapsed duration;
- reviewed registrations by official stage;
- registration type in relation to the published timeframe.

Every published value must identify:

- reporting period;
- last-updated date;
- contributing sample size where disclosure is safe;
- methodology or definition;
- suppression or inclusion rules.

Supported presentation states should include:

```text
collecting | reviewing | insufficient | limited | live | stale | unavailable
```

Do not collapse these into a misleading zero.

### 11.5 Accessibility and small-screen behavior

- The meaning of every status must be available in text, not color alone.
- Any future chart requires an accessible data alternative.
- Avoid horizontal scrolling for primary content.
- Keep directly labelled lists and tables readable on narrow screens.
- Ensure focus order follows the visual reading order.
- Do not use hover as the only way to reveal meaning.

## 12. Data use, review, and future eligibility model

Keep these concepts separate:

1. self-reported ABA relationship;
2. future operator-verified ABA relationship;
3. required tracker data-use acknowledgement;
4. ABA review outcome;
5. public-insights inclusion;
6. future export eligibility.

One must not automatically imply another.

### 12.1 Combined public insights

The mockup communicates this rule:

- submission requires the data-use acknowledgement;
- ABA reviews the submission;
- ABA admin selects `Approved for insights`, `Needs clarification`, or `Excluded`;
- only approved information may contribute to combined, non-named findings;
- contact details and identifying organisation or product information are not published through the insights view;
- a submission does not produce an automatic public record or immediate metric.

Production thresholds, suppression, withdrawal effects, and inclusion mechanics are not implemented in this mockup.

### 12.2 Named use

Do not collect named-use permission in this mockup. There is no current named output or registrar-export workflow that requires it.

Preserve named use as a separate, explicit, purpose-specific decision for a future production feature. It must never be inferred from tracker submission, insight participation, or membership.

### 12.3 Future registrar export eligibility

Although registrar export is not part of this release, preserve this rule in future-feature notes.

A record is export-eligible only if all conditions are true:

- verified ABA category is `Full member`;
- verified ABA status is `Active`;
- ABA review is complete;
- named-use consent is granted;
- an operator has explicitly included the record;
- required export fields are complete;
- the registration is still in process.

The following are not eligible:

- Technical partners;
- Full member applicants;
- Technical partner applicants;
- non-members;
- unverified relationships;
- drafts;
- records lacking named-use consent;
- records not explicitly included by an operator.

Do not use self-reported relationship status to grant eligibility. This entire subsection is a future-feature note and must not create mockup controls or copy.

## 13. Data-model alignment and explicit release overrides

Before changing form controls, map each visible field to the current data model and document:

- field identifier;
- type;
- allowed values;
- required/optional status;
- source: participant, system, derived, or operator;
- visibility and permission class;
- downstream use.

This specification records intentional mockup-level changes that may differ from older model or brief language:

1. **SACNASP status is required and self-reported** for this release, with `Unknown` accepted.
2. **Only the new-registration subset is visible** in V1, while the broader service taxonomy remains available for future scope.
3. **South Africa / Act 36 is the only structured jurisdiction and regime** in this mockup.
4. **Combined, non-named insight use is a required submission condition**, not an optional aggregate-consent toggle.
5. **Named use and general updates are not collected** in the tracker mockup.

Additional required distinctions:

- future `saved_at` and `submitted_at` are separate lifecycle events;
- self-reported and verified membership are separate;
- participant status and ABA-mapped official stage are separate;
- participant status, mapped official stage, and ABA lifecycle are separate;
- the required insight-use acknowledgement and any future named-use permission are separate;
- reviewed and published are separate;
- registration state and display state are separate.

Do not add a field solely because it appears in an older prototype. Every field needs a stated collection purpose and downstream use.

## 14. Canonical routing, archives, and registrar-export deferral

“Remove export” means remove the active product feature and its entry points. It does **not** mean removing legitimate references to a government registrar, a registrar-issued reference, or the regulatory process.

### 14.1 Active mockup surfaces

Only these public surfaces are active for this tranche:

- `soft-launch/prototype/registration-tracker.html`
- `registration-tracker/intake-flow/index.html`
- `registration-tracker/public-dashboard/index.html`
- `soft-launch/prototype/privacy.html`

On these surfaces:

- link back to the canonical landing at `soft-launch/prototype/registration-tracker.html`;
- remove registrar-export links, packet activity, export-readiness language, and named-use controls;
- preserve legitimate registrar-process and registrar-reference terminology;
- do not link to the archived combined hub, archived operator review, future company dashboard, or future registrar-export page.

### 14.2 Archived and future pages

Preserve these files without redesign:

- `docs/registration-tracker/index.html`;
- `registration-tracker/index.html`;
- `registration-tracker/admin-operator-review/index.html`;
- `registration-tracker/company-dashboard/index.html`;
- `registration-tracker/registrar-list/index.html`;
- `docs/site/workspace.html`;
- `docs/site/operator-workspace.html`.

They may retain their historical content and archive-only links. They are not part of the current release and must not be used as implementation or acceptance dependencies.

Update `registration-tracker/README.md` and current tracker briefs to distinguish:

- the four active mockup pages;
- archived earlier prototypes;
- the preserved future company page;
- the preserved future registrar-export page;
- production-migration requirements.

Do not delete historical briefs. Mark conflicting current instructions as superseded for this mockup. The packet-activity concept in older public-dashboard planning is not part of this release.

## 15. Content and visual rules

Follow the soft-launch public voice and design guardrails.

### 15.1 Voice

Prefer:

- new registration;
- published timeframe;
- reviewed information;
- public insights;
- responsible person;
- authorized to provide the information.

Avoid in public copy unless legally necessary and explained:

- regulatory intelligence;
- aggregate signals;
- canonical;
- route;
- dossier readiness;
- internal system or data-model language.

Do not expose repo narration, prototype instructions, future-meeting commentary, or internal decision notes in the interface.

### 15.2 Typography and composition

- Use Saira for page identity.
- Use Archivo for operational content, forms, labels, and data.
- Use Lora sparingly, if at all.
- Preserve the forest, paper/cream, and orange action palette.
- Use a deep-forest header and footer consistent with the soft-launch family.
- Do not apply `max-width` constraints to headings.
- Do not force heading wraps with manual `<br>` elements.
- Keep page titles on one line by adjusting copy, type size, or layout.
- Avoid repeated grids of equal cards where a sequence, list, or table communicates the structure better.
- Keep orange for actions and important state, not decoration.

### 15.3 Responsive behavior

Design mobile-first:

- primary CTA visible without horizontal scrolling;
- qualification controls large enough for touch;
- stage labels readable without compressing them into tiny type;
- review summary stacks in a logical order;
- tables convert or scroll accessibly without hiding labels;
- no interaction depends on hover.

## 16. Implementation boundaries

The implementation agent must:

- change only the tracker module and directly related active entry points;
- preserve unrelated user changes in the working tree;
- retain stable relative routes;
- reuse the established soft-launch shell and tokens where practical;
- avoid fake production integrations;
- avoid invented data;
- avoid weakening public-site checks to make the work pass;
- preserve valid regulatory taxonomy and source-grounded terminology outside the V1 filter;
- update current tracker documentation so archived, future, production-note, and active-mockup requirements cannot be confused.

The implementation agent must not:

- reorganize `registration-tracker/`;
- redesign the public ABA homepage;
- redesign archived or future tracker pages;
- edit workshop, shared system-contract, or model documents beyond the tracker-local
  `registration-tracker/data-model-v1.md` reconciliation authorized for this branch;
- edit or copy glossary files, taxonomy workbooks, or other parallel planning work;
- build an operator workspace or participant account;
- turn the tracker into a membership application;
- implement registrar export;
- implement or simulate persistent save/resume;
- add full dossier, proof-of-payment, or identity-document uploads;
- store sensitive draft data in insecure browser storage;
- manufacture charts, totals, dates, countries, or trends;
- treat the inactive system-model workshop reference as authority.

## 17. Recommended implementation sequence

1. **Baseline and source audit**
   - Inspect current HTML, active tracker requirements, the data model, registrar-source mapping, and soft-launch guardrails.
   - Record the field-level mapping and conflicts before editing controls.

2. **Canonical routing and archive separation**
   - Treat the soft-launch tracker page as the only active public landing.
   - Change intake and insights return links to that landing.
   - Keep archived and future pages out of the active navigation without redesigning them.

3. **Landing-page journey**
   - Implement the South Africa / Act 36 proposition, CTA hierarchy, qualification, value, process, data-use condition, boundaries, adjacent insights route, and repeated CTA.

4. **Intake model and flow**
   - Apply the five-stage structure.
   - Implement confirmed self-reported relationship, required data-use acknowledgement, SACNASP, jurisdiction, and new-registration rules.
   - Remove save/resume, named-use, general-updates, export, and fabricated persistence behavior.

5. **Public insights**
   - Replace unsupported chart/dashboard claims with evidence status, process explanation, future questions, publication pipeline, and CTA.

6. **Privacy and data-use**
   - Update the existing privacy page so it accurately explains the tracker’s private information, required data-use condition, review, combined non-named insights, and correction/contact route.

7. **Cross-surface content pass**
   - Normalize “published timeframe,” `combined, non-named insights`, membership boundaries, review target, and status labels.

8. **Documentation and production note**
   - Update the current tracker README and briefs without deleting historical material.
   - Record save/resume, participant editing, verification, duplicate handling, retention, thresholds, clocks, analytics, and production security as migration requirements.

9. **QA and evidence**
   - Run automated checks.
   - Serve and inspect all four active surfaces at desktop and mobile widths.
   - Verify that active pages do not link to archived or future tracker pages.

## 18. Acceptance criteria

### 18.1 Landing

- [ ] The first screen identifies the Registration Tracker and limits it to new registrations.
- [ ] South Africa / Act 36 scope is clear before intake.
- [ ] A direct “Start a new registration” action is visible.
- [ ] No save/resume action claims persistence in the static mockup.
- [ ] The visitor can determine whether they are the responsible or authorized person.
- [ ] The visitor confirms that the Application Form, Service Request Form, and proof of payment
      were submitted before entering intake.
- [ ] Out-of-scope registration services receive a clear boundary, not a dead end.
- [ ] What ABA does with the information is explained before intake.
- [ ] ABA/regulator and tracker/membership boundaries are explicit.
- [ ] The public-insights route is present.
- [ ] No active export route or promise remains.

### 18.2 Intake

- [ ] The participant experiences five clear stages.
- [ ] Only the approved new-registration types are shown.
- [ ] SACNASP status is required and supports `Unknown`.
- [ ] The Application Form, Service Request Form, and proof-of-payment confirmations are all
      required and affirmative.
- [ ] No raw SACNASP number is collected.
- [ ] ABA relationship offers only Full member, Technical partner, and no relationship, with active/application-submitted distinctions.
- [ ] ABA relationship and SACNASP status are clearly self-reported.
- [ ] The required data-use acknowledgement is initially unchecked and blocks submission until acknowledged.
- [ ] No optional aggregate-consent, named-use, newsletter, or general-updates control appears.
- [ ] No fake draft save, email, submission identifier, timestamp, regulator reference, or L-number is generated.
- [ ] The confirmation states the two-week review target and the three ABA review outcomes.
- [ ] Submission confirmation does not promise publication, membership, or regulatory action.

### 18.3 Public insights

- [ ] The page truthfully reports the evidence/publication state.
- [ ] No fake data or unsupported sample claims appear.
- [ ] No chart appears unless reviewed data and sample quality support it.
- [ ] The official process structure is source-checked.
- [ ] The publication pipeline explains required acknowledgement, review, inclusion, and combined non-named reporting.
- [ ] Future questions are explained without presenting them as current findings.
- [ ] “Published timeframe” is used consistently.
- [ ] A clear intake CTA is present.
- [ ] Empty, insufficient, stale, and unavailable states do not appear as zero.

### 18.4 Privacy and cross-module

- [ ] The active surfaces contain no export feature, named-use control, or link to an archived/future tracker page.
- [ ] Archived and future pages have not been redesigned.
- [ ] Legitimate registrar-process terminology remains intact.
- [ ] All relative links work from their deployed paths.
- [ ] The privacy page accurately explains required insight use, private data, review, correction, and unrelated-communications boundaries.
- [ ] No heading has a forced narrow `max-width`.
- [ ] No public UI exposes internal planning or prototype language.
- [ ] Keyboard, focus, labels, error messages, and small-screen layouts have been reviewed.
- [ ] The tracker remains visually related to ABA but distinct from the Membership journey.

## 19. Required verification

At minimum, run:

```powershell
node soft-launch/scripts/public-site-preflight.mjs
```

Also serve the repository locally and inspect:

- `soft-launch/prototype/registration-tracker.html`
- `registration-tracker/intake-flow/index.html`
- `registration-tracker/public-dashboard/index.html`
- `soft-launch/prototype/privacy.html`
- `soft-launch/qa/public-site-render-check.html`

Verify at representative desktop and mobile widths.

Search the active surfaces for stale feature language:

```powershell
rg -n -i "registrar export|export preview|export packet|export readiness|packet activity|named-use|named use" soft-launch/prototype/registration-tracker.html registration-tracker/intake-flow/index.html registration-tracker/public-dashboard/index.html soft-launch/prototype/privacy.html
```

Review every match in context. Do not mechanically remove legitimate uses of “registrar.”

Also search the active pages for stale optional-consent and fake-persistence behavior:

```powershell
rg -n -i "turn.*off|optional aggregate|consentPublic|consentRegistrar|localStorage|sessionStorage|L1234|draft saved|email return link" soft-launch/prototype/registration-tracker.html registration-tracker/intake-flow/index.html registration-tracker/public-dashboard/index.html soft-launch/prototype/privacy.html
```

## 20. Items still requiring product review

These do not block structural implementation but must not be silently finalized:

- final landing-page title;
- final visible name for the public dashboard/insights page;
- final labels for the five new-registration types;
- whether optional phone and organisation identifiers are required downstream;
- final source-approved official-stage labels;
- final public wording of the required data-use acknowledgement and privacy explanation.

Publication thresholds, metric definitions, draft expiry, retention, deletion, duplicate matching, clock treatment, production security, and legal/privacy approval are production-migration items. They are not implemented or invented in the mockup.

The shared-record outcome is not open: tracker and membership journeys must reuse the same `Person`,
`Organization`, and history. Only the production matching and duplicate-resolution method remains
open.

Where an unresolved item affects public copy, use the working language in this specification and flag it for review rather than inventing a new commitment.

## 21. Mandatory safe Git and browser-review workflow

The implementation must be isolated from the current checkout and from the live GitHub Pages site. Do not implement directly on `main`.

### 21.1 Protect the current checkout

Before doing anything:

```powershell
git status --short --branch
git branch --show-current
```

If the checkout contains modified or untracked files, treat them as unrelated user work unless their ownership has been explicitly confirmed.

Do not:

- stash the entire working tree;
- discard or overwrite existing changes;
- switch the dirty checkout onto the implementation branch;
- stage unrelated files;
- pull into a dirty checkout;
- implement directly in the existing `main` folder.

### 21.2 Create an isolated worktree and branch

From the existing ABA repository:

```powershell
git worktree list
git fetch origin

git diff --name-only bdd1921..origin/main -- `
  soft-launch/prototype/registration-tracker.html `
  registration-tracker/intake-flow/index.html `
  registration-tracker/public-dashboard/index.html `
  soft-launch/prototype/privacy.html

git worktree add `
  -b codex/registration-tracker-mockup `
  "C:\Users\krimc\OneDrive\Desktop\Claude\projects\aba-registration-tracker-mockup" `
  origin/main
```

This creates a clean implementation folder and branch without altering the existing checkout.

If the baseline comparison lists any of the four active pages, stop and report the upstream changes before creating or modifying the implementation worktree. The user must decide whether the specification needs reconciliation with the newer page state.

If that worktree or branch already exists, inspect and reuse it only if it is the intended clean implementation worktree. Do not create a second branch or overwrite the existing one.

If this specification is not yet present in `origin/main`, copy only this file into the new worktree:

```powershell
Copy-Item `
  -LiteralPath "C:\Users\krimc\OneDrive\Desktop\Claude\projects\aba\docs\requirements\registration-tracker-module-change-spec.md" `
  -Destination "C:\Users\krimc\OneDrive\Desktop\Claude\projects\aba-registration-tracker-mockup\docs\requirements\registration-tracker-module-change-spec.md"
```

Commit the specification separately before implementation:

```powershell
git add docs/requirements/registration-tracker-module-change-spec.md
git commit -m "docs: add registration tracker mockup specification"
```

Do not copy other modified or untracked files into the worktree without explicit review.

Except for the targeted 30 July 2026 tracker-local data-model reconciliation committed on this
branch, do not copy or modify:

- `registration-tracker/data-model-v1.md`;
- `docs/requirements/aba-system-model-workshop-reference.md`;
- `docs/requirements/aba-system-model-uml-diagrams.md`;
- canonical-glossary or taxonomy-workbook files;
- other parallel planning files found modified or untracked in the original checkout.

Use this specification and the reconciled tracker-local data-model note as the mockup-release
authority.
Record any new conflict with protected files in the implementation report instead of editing them.

### 21.3 Keep the change surface narrow

Expected implementation files are:

- `soft-launch/prototype/registration-tracker.html`;
- `registration-tracker/intake-flow/index.html`;
- `registration-tracker/public-dashboard/index.html`;
- `soft-launch/prototype/privacy.html`;
- tracker-scoped CSS or JavaScript;
- tracker-specific requirements, README, briefs, and QA files.

Avoid editing the shared soft-launch `assets/styles.css` and `assets/app.js` when page-scoped assets can meet the need. Prefer files such as:

```text
soft-launch/prototype/assets/registration-tracker.css
registration-tracker/shared/registration-tracker-module.css
registration-tracker/shared/registration-tracker-module.js
```

Scope all new styles under a tracker-specific root class. The Membership, homepage, and member-intake pages must not change as a side effect.

At each checkpoint, inspect:

```powershell
git diff --name-only origin/main...HEAD
git diff --stat origin/main...HEAD
git diff --check origin/main...HEAD
git diff --check
```

Stop and investigate any file outside the agreed change surface.

### 21.4 Commit in reviewable slices

Use small commits with one clear responsibility:

1. `docs: add registration tracker mockup specification`
2. `refactor: establish tracker-scoped styles and navigation`
3. `feat: redesign tracker landing and qualification`
4. `feat: simplify new-registration intake`
5. `feat: update tracker privacy and data-use explanation`
6. `feat: replace mock dashboard with evidence-status view`
7. `test: add tracker mockup preflight coverage`

Do not combine the full redesign into one opaque commit.

### 21.5 Start the local browser preview

From the isolated worktree:

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Keep that terminal running. The implementation agent must then provide the user with clickable local links:

- `http://127.0.0.1:8766/soft-launch/prototype/registration-tracker.html`
- `http://127.0.0.1:8766/registration-tracker/intake-flow/index.html`
- `http://127.0.0.1:8766/registration-tracker/public-dashboard/index.html`
- `http://127.0.0.1:8766/soft-launch/prototype/privacy.html`
- `http://127.0.0.1:8766/soft-launch/qa/public-site-render-check.html`

The user may open these links in their browser and click through the mockup normally. When working through Codex, the implementation agent should also open the local pages in the in-app browser, exercise the interactions, and provide screenshots or a concise visual QA report.

The local preview is isolated. It does not publish the branch or alter the live GitHub Pages site.

### 21.6 Compare with unchanged reference pages

While the local server is running, inspect:

- `http://127.0.0.1:8766/soft-launch/prototype/index.html`
- `http://127.0.0.1:8766/soft-launch/prototype/membership.html`
- `http://127.0.0.1:8766/soft-launch/prototype/member-intake.html`

Compare the local tracker landing with the current live page:

- `https://nefiger.github.io/aba/soft-launch/prototype/registration-tracker.html`

The user should be able to see the proposed branch version and the current live version side by side. Reference pages must remain visually and behaviorally unchanged.

### 21.7 Required browser walkthrough

Before asking for approval, demonstrate:

1. landing-page orientation and primary CTA;
2. eligible, unauthorized, out-of-service-scope, out-of-country/regime, and missing-information qualification outcomes;
3. all five intake stages;
4. exact ABA relationship choices;
5. required self-reported SACNASP status, including `Unknown`;
6. required data-use acknowledgement initially unchecked;
7. submission blocked until acknowledgement;
8. review summary and correction of answers before submission;
9. confirmation with the two-week review target and three ABA review outcomes;
10. truthful insights collecting/insufficient-information state;
11. privacy-page explanation and return links;
12. mobile behavior at 320 and 375 pixels;
13. tablet and desktop behavior at 768, 1024, and 1440 pixels.

Provide a browser-review screenshot packet containing, at minimum:

- tracker landing at 375px and 1440px;
- intake opening at 375px and 1440px;
- intake review/submission state at 375px and 1440px;
- public insights at 375px and 1440px;
- Privacy and data use at 375px and 1440px.

Screenshots supplement the interactive local preview; they do not replace it.

Explicitly verify the absence of:

- fake registration data, totals, trends, charts, countries, references, timestamps, and L-numbers;
- persistent save/resume claims;
- named-use or general-updates controls;
- registrar-export links or packet activity;
- links from active pages to archived or future tracker pages;
- changes to Membership, the homepage, or member intake.

### 21.8 Automated and rendered checks

Run:

```powershell
node soft-launch/scripts/public-site-preflight.mjs
```

Run `soft-launch/qa/public-site-render-check.html` through the local server. Add tracker-specific render coverage when the existing checker does not exercise the intake and insights routes.

Report:

- commands run;
- pass, warning, or failure status;
- pages and viewport sizes inspected;
- the required 375px and 1440px screenshot packet;
- any known visual or interaction limitations;
- the final `git diff --name-only origin/main...HEAD` output.

### 21.9 Hard stop conditions

Stop without broadening scope and report the issue if:

- the intended implementation worktree or branch already exists but contains unexplained changes;
- `origin/main` has changed one of the four active pages since this specification was finalized;
- the implementation appears to require changing shared site assets in a way that could affect Membership, the homepage, member intake, or another public page;
- completing the work appears to require editing an archived or future page;
- completing the work appears to require editing a protected data-model, system-model, workshop, glossary, taxonomy, or parallel planning file;
- a required check fails and the proposed fix would expand the agreed change surface;
- the local preview cannot be started or made available for user review;
- the changed-file list contains a file outside the agreed implementation surface;
- a conflict cannot be resolved using this specification’s source precedence.

Do not silently choose a wider implementation. Preserve the isolated branch and ask the user for direction.

### 21.10 Approval and merge gate

The implementation agent must stop after presenting the local browser preview and QA report.

Do not:

- merge the branch;
- push directly to `main`;
- deploy a replacement GitHub Pages site;
- open a non-draft pull request;
- treat automated checks as user approval.

Continue refining the same isolated branch until the user explicitly confirms that the browser review is satisfactory.

After approval:

1. push `codex/registration-tracker-mockup`;
2. open a draft pull request;
3. review the changed-file list and screenshots;
4. mark the pull request ready only with explicit approval;
5. merge only when the user authorizes the live-site change;
6. verify the GitHub Pages deployment after merge.

If a merged change must be undone, revert the merge through a new pull request. Do not reset or force-push `main`.

## 22. Definition of done for the implementation agent

The work is complete only when:

1. the four active target surfaces form one coherent journey;
2. all confirmed decisions in this specification are represented in UI behavior and field semantics;
3. data-model differences are documented and intentionally resolved;
4. archived and future pages remain preserved, unredesigned, and outside active navigation;
5. the insights page is truthful with a small or unavailable sample;
6. no production persistence, participant editing, verification, duplicate handling, or publication logic is faked;
7. automated and rendered checks pass without weakening the guardrails;
8. the production-migration note captures deferred requirements;
9. the implementation report lists changed files, model decisions, preserved archive pages, and remaining review items;
10. the user has reviewed the actual branch changes through the local browser preview;
11. no merge or live deployment has occurred without the user’s explicit approval.
