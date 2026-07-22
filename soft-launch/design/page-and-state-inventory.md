# Soft-Launch Page and State Inventory

Status: approved Phase 2 scope and first-build sitemap
Last updated: 2026-07-20

This inventory describes the approved first-release experience. The tracker destination and integration details remain subject to Lyle's handover; that dependency does not reopen the surrounding website hierarchy.

## Public experience

| Page/area | Primary job | Primary action | Essential states/notes |
|---|---|---|---|
| Home | Explain ABA, its urgency, value, credibility, and available routes | Understand membership; choose a relevant action | New visitor; returning visitor; desktop/mobile navigation; no internal rollout narration; hero title remains one visual line |
| About ABA | Explain the sector challenge, proposition, pillars, geographic reality, and how ABA works | Explore membership or current work | Clear Africa-wide/SA-now distinction; governance/current-stage claims bounded |
| Membership | Make the complete membership value proposition understandable and compelling | Register interest while public intake is controlled | Available now/developing distinction without reducing membership to a roadmap |
| Membership interest | Capture consented contact interest | Submit interest | Empty; validation; duplicate/repeat; success; server/network failure; privacy/support path |
| Current work / tracker orientation | Explain relevant ABA work and route people with real registration situations correctly | Enter Lyle's tracker | Tracker available; temporarily unavailable; truthful low/no public data; clear return path |
| Technical Network | Recruit technical experts who share ABA's vision and align with its values and code of conduct | Apply/register interest to join the network | Expertise, contribution, values/conduct acknowledgement, review, response, accepted/onboarding, declined/not-a-fit, validation, failure |
| Governance, privacy, and data use | Build trust and explain accountability appropriate to launch | Read policy/contact ABA | Current governance only; source/review dates; correction/withdrawal route |
| Shared site shell | Establish consistent identity, navigation, and footer | Move across public routes | Desktop; mobile menu; keyboard/focus; active route; error/404 |
| Member/founding credibility area | Show real participation without overstating status | Understand who is involved | Neutral fictional logo placeholders until real files and display permission exist; supports zero, few, and later many logos |

## Member application

One canonical form supports founding members first, later cohorts next and eventual public applications. Everyone sees the same introduction, questions, action and confirmation. Founding members do not skip fields or bypass the shared data model; known-record reconciliation, source metadata and relationship history are handled internally.

| State/page | Required treatment |
|---|---|
| Entry/introduction | Explain what ABA needs, how it uses the information and that submission does not confirm or change membership status |
| Person and role | Capture applicant contact and authority/role; production may prefill known values without changing the questions |
| Organisation | Capture or confirm the same reviewable organisation facts |
| Eligibility/operating information | Capture facts required for policy review and ABA understanding without enforcing unsettled thresholds |
| Membership participation | Capture interests, priorities and contributions for review and ongoing member work |
| Product/tracker handoff | Offer a clear separate route if registrations are in play; never make it a membership condition |
| Consent and declaration | Capture purpose-specific permission, accuracy, authority and privacy acknowledgement |
| Review/submit | Use one action and explain what happens next |
| Confirmation | Use one application-received confirmation; make no automatic approval or activation claim |

Required interaction states:

- valid first completion;
- missing required information;
- invalid or conflicting data;
- duplicate person/organisation/contact detected;
- unavailable or invalid application URL if access controls are later used;
- recoverable network/server failure without unnecessary data loss;
- repeat submission/correction path;
- privacy or support request;
- submission withdrawn through an operational path.

## Operator experience required for production

The reference prototype needs enough operator-state definition to prove that public capture is operationally coherent, even if a full admin UI is not designed in Phase 2.

| Operator job | Minimum state/behaviour |
|---|---|
| Review interest contacts | Source, purpose, consent version, date, person, organisation, follow-up status |
| Reconcile known member details | Match known person/organisation/member relationship; flag conflicts; preserve audit history |
| Review member application | `Submitted`, `More information required`, `Approved`, `Declined`, `Withdrawn` |
| Activate approved membership | Separate `Pending activation` from `Active`; apply approved finance/onboarding rules |
| Handle duplicate/correction/withdrawal | Safe merge/correction process with accountability |
| Handle communication preferences | Record opt-in/opt-out and purpose accurately |
| Work with tracker references | Keep tracker consent/purpose separate while recognising a shared person/organisation where permitted |
| Review Technical Network submissions | Expertise, affiliation, contribution, values/conduct acknowledgement, review state, response, and onboarding owner |

## Cross-surface system states

- every hero/title layout tested at the narrowest supported viewport with no wrapping, clipping, truncation, overflow, or illegibly small type;
- global 404 and unavailable page;
- maintenance/degraded tracker integration;
- form service unavailable;
- acknowledgement email delayed or not configured;
- privacy/contact route;
- narrow mobile layout and touch navigation;
- keyboard-only and visible focus path;
- reduced-motion mode;
- no-JavaScript/server fallback where the production framework permits it;
- slow-loading imagery and font fallback.

## Deliberately not assumed

- a member dashboard;
- automatic public application availability in the first controlled release;
- billing/payment UI;
- saved application drafts;
- public application status self-service;
- full operator admin redesign;
- mature Explorer or knowledge-library route;
- mock-data tracker dashboard;
- multi-country chapter pages;
- unbounded public advisory service.

These can only enter Phase 2 if the PRD is explicitly changed.
