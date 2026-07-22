# ABA Soft-Launch Product Requirements Document

Status: Phase 1 working draft
Version: 0.1
Last updated: 2026-07-21
Product owner: Jen
Production repository: `unpoisonsa/monorepo`
Reference-design workspace: this `soft-launch/` root

## 1. Product decision

ABA will launch a live, controlled first release with:

- a public website that explains ABA and its membership value proposition;
- a public route to register interest in future membership and receive relevant ABA updates;
- one member application used first by founding members, then by later cohorts and potentially opened publicly when ABA is ready;
- Lyle's public registration tracker integrated into the website before go-live;
- real persistence and an owned operational follow-up process in the production application.

The release is not an open public membership launch. It is also not merely a brochure plus forms: it must establish ABA's membership value, credibility, work, and reason to exist.

## 2. Product and implementation boundary

### Reference prototype

The new prototype in this workspace will define the approved experience without modifying existing repo websites. It may use realistic static/mock states to prove journeys, but it will not pretend that static behaviour is production-ready.

### Production application

The monorepo will implement the approved prototype and PRD as a new frontend, side by side with the current ABA frontend until accepted. Existing backend capability may be retained or extended after audit. Existing ABA frontend code is not design authority.

### Registration tracker

Lyle owns tracker product/implementation work. The soft-launch work owns the coherent public entry, landing-page framing, navigation hooks, shell/interface agreement, and tested cross-surface journey. Tracker and membership remain separate journeys and relationships.

## 3. Objectives

The first release must enable a visitor to understand:

1. what ABA is;
2. why ABA exists;
3. what membership means and why it matters;
4. what ABA is doing now and building toward;
5. which actions are available to that visitor;
6. what information each action captures and what happens next.

It must also enable ABA to:

- establish a usable founding-member data set;
- receive and review the next trusted cohort through the same initial intake;
- build a consented public-interest/contact base;
- receive real tracker participation without making membership a gate;
- safely act on submissions with clear ownership.

## 4. Users and jobs

| User | Context | Primary job |
|---|---|---|
| Public sector visitor | Arrives from a referral, search, event, article, or ABA communication | Understand ABA, judge credibility, and find the relevant next action |
| Prospective future member | Interested but not privately invited | Understand the membership proposition and ask to hear when membership opens |
| Member applicant | Uses the member-application URL as a founding member, later cohort participant or eventual public applicant | Submit the same person, organisation, operating and participation information for ABA review |
| Registration participant | Has a real registration situation | Understand the tracker boundary and submit permitted information through Lyle's route |
| Technical contributor | Has expertise, capability, or a relevant question | Understand how to engage without assuming an unbounded advisory service |
| ABA operator/reviewer | Handles contacts and applications | Find, understand, review, reconcile, and act on records safely |

## 5. Core experience principles

- Membership is an alliance and participation proposition, not a form feature.
- Explain value progressively, with the strongest current truths first.
- Make current availability explicit without filling pages with rollout narration.
- Use plain public language; retain regulator-defined terms only where necessary and sourced.
- Separate interest, application, approval, activation, membership, tracker participation, and communication consent.
- Show ABA's African purpose and South Africa's current reality together.
- Prefer truthful unavailable/empty states over simulated live capability.
- Every action must explain what happens next.

## 6. Required public information architecture

Final labels and hierarchy are Phase 2 decisions, but the release must cover these roles:

- Home/front door;
- About ABA / proposition / operating context;
- Membership value and controlled-release status;
- Current work, including registration-tracker orientation;
- Public membership-interest capture;
- privacy, data use, consent, and governance information appropriate to launch;
- a public Technical Network recruitment route for aligned experts, with approved values, code-of-conduct, review, and response boundaries.

The Explorer and a rich public tracker display are included only to the degree they are real, maintained, and useful at launch. They may not be padded with illustrative data or hollow navigation.

Use neutral member-logo placeholders in the reference prototype until ABA receives the real assets and permission to display them.

## 7. Public membership-interest requirements

The public interest route must:

- make clear that membership intake is not publicly open;
- explain what updates/follow-up the person is requesting;
- capture only fields needed for contact, relevance, and permission;
- record the consent wording/version and submission source;
- create a contact/communication relationship, not an application or membership;
- prevent or safely reconcile obvious duplicates;
- show accessible validation, failure, and confirmation states;
- tell the person what happens next and how to change their preference.

Final fields and consent language remain subject to Phase 1 reconciliation and privacy approval.

## 8. Member application requirements

### Single-application rule

There is one member application page. Founding members complete it first, the next cohort uses the same page, and ABA may make it public later. The URL, introduction, questions, submission action and confirmation must remain the same for every organisation. The form writes to one evolving person, organisation, role, application, membership and consent model.

### Application handling

Every completed form creates a reviewable submission. Production must reconcile it with known people, organisations, roles, applications, membership relationships and consents rather than blindly duplicating records. Existing founding relationships and history are preserved behind the form. Invitation, cohort or public-source provenance may be attached internally, but applicants do not select it and it must not alter the visible experience.

### Common requirements

- no persisted save-and-return draft for v1;
- clear progress and reasonable form length;
- do not ask a person to identify a founding, invited or public cohort merely to support internal routing;
- capture factual person, organisation, role/authority, eligibility-relevant, operating, and contribution information required for review and downstream use;
- collect consents and authorisations distinctly by purpose;
- allow safe corrections through an operational process even if public self-service is absent;
- accessible validation, failure, and confirmation states;
- state what submission does and does not mean.

### Application states

`Submitted` → `More information required` → `Approved` / `Declined` / `Withdrawn`

Approval does not create active membership. Membership relationship states include `Pending activation`, `Active`, `Suspended`, `Deactivated`, and potentially `Lapsed` once policy is settled.

## 9. Membership value requirements

The website must present membership as meaningful participation in ABA's sector-building work. The initial content model must cover, with readiness-appropriate language:

- collective representation and priority shaping;
- stronger evidence and preparation for constructive regulatory engagement;
- sector legitimacy and clearer product information;
- technical relationships and capability development;
- market-development and communication channels;
- governance and participation, subject to approved rules;
- shared knowledge and learning.

It must not promise direct or personal regulator access, faster or successful approval, automatic product listing, endorsement, referrals, sales, unrestricted advice, or privileges not approved in policy.

## 10. Registration-tracker integration requirements

- Lyle's work must land before go-live.
- The public site must have intentional tracker landing-page and navigation hooks.
- Tracker orientation must explain who it is for, what real situation it captures, the confidentiality/consent boundary, and what can happen with permitted information.
- Tracker use is public and independent of membership.
- Tracker participation must not silently create membership interest, application, or consent for unrelated communication.
- Production may reconcile known people/organisations internally only under explicit data rules.
- Any public summary uses real, permitted information at a safe aggregation level.
- If the data is insufficient, show a truthful explanatory or empty state, not mock statistics.
- Final route, shell, session/auth, state, and data-handoff details depend on Lyle's handover and Phase 3/4 audit.

## 11. Technical Network requirement

The public launch must include a call for technical experts who share ABA's vision and align with its values and code of conduct to apply or register interest in joining the Technical Network.

The route must:

- explain why ABA is building the network and the kinds of expertise sought;
- capture relevant expertise, experience, location/jurisdiction, affiliation, areas of contribution, and motivation;
- present the approved ABA values and code of conduct;
- capture an explicit acknowledgement of the conduct/participation basis;
- explain review, selection, response, and onboarding expectations;
- identify who receives and owns the submission;
- distinguish joining the network from becoming an ABA member;
- state what is outside scope and when professional sign-off or referral is required.

This is an expert-community recruitment route. It must not be presented as a promise that ABA already provides unrestricted legal, regulatory, scientific, agronomic, or business advice to the public.

## 12. Operator and operational requirements

Before go-live, ABA must be able to:

- access interest and intake records securely;
- distinguish journey, source, consent, status, person, and organisation;
- identify and reconcile duplicates;
- review member applications and request more information;
- update application and membership states according to role;
- export or report information safely where needed;
- record who changed a consequential status;
- respond through an owned, documented process;
- handle correction, withdrawal, communication preference, and deletion requests;
- back up and restore production data.

## 13. Privacy, consent, and trust requirements

- collect only information tied to an explained purpose;
- separate membership processing, communication permission, tracker aggregate use, and named/regulator-facing authorisation;
- record consent text/version and time where required;
- do not expose private member, company, product, or tracker details publicly without permission and review;
- publish clear privacy/contact information and a correction/withdrawal route;
- define retention, deletion, access, and incident handling before go-live;
- do not rely on an unlisted URL as the only protection for sensitive information.

## 14. Quality requirements

### Design fidelity

- production must be compared to the approved prototype at agreed viewport widths;
- existing monorepo frontend styling is not an acceptable substitute;
- critical states and responsive behaviour are part of fidelity, not optional polish.
- every hero title must remain on one visual line at every supported viewport; acceptance fails if a hero wraps, clips, truncates, overflows, or becomes illegibly small.

### Accessibility

Target WCAG 2.2 AA unless Jen sets a different requirement. Support keyboard use, visible focus, semantic structure, readable contrast, useful labels/errors, reduced motion, and screen-reader comprehension.

### Performance and resilience

- prioritise fast first render on mobile and ordinary South African network conditions;
- avoid unnecessary large assets and blocking scripts;
- preserve entered form information where safe after recoverable errors;
- provide understandable server and network failure states;
- instrument errors without collecting sensitive form values in logs/analytics.

### Browser/device scope

Support current mainstream mobile and desktop browsers. Final test matrix is defined in Phase 4.

## 15. Analytics and learning

Use privacy-conscious measurement for:

- visits to key public routes;
- entry into interest/intake/tracker journeys;
- form completion, validation failure, abandonment, and technical failure;
- application source or cohort where ABA has attached that metadata internally;
- common questions/support needs;
- operator review load and turnaround.

Do not send sensitive form values or private tracker information to analytics.

## 16. Explicit exclusions from first release

- public open membership self-service;
- a fake or demo-data public tracker dashboard;
- full confidential registration dossier management;
- automatic approval, activation, billing, or renewal;
- member self-service portal unless separately added and gated;
- guaranteed Technical Network advice;
- mature Explorer/knowledge platform unless real content and ownership exist;
- active multi-country chapters presented as existing fact;
- unapproved eligibility enforcement or governance privileges.

## 17. Dependencies

- approved ABA values/code of conduct and a Technical Network review owner;
- acquisition and display permission for real member logos;
- Lyle's landed tracker work and handover;
- leadership/legal decisions on eligibility, membership policy, consent/privacy, and public claims;
- named operational owners;
- current monorepo audit and production environment access.

## 18. Release acceptance

The release is acceptable only when:

- a public visitor can accurately explain ABA and choose a relevant action;
- membership value is clear, concrete, and credible;
- public membership interest, the single member application, and tracker participation remain semantically distinct;
- all critical production forms persist correctly and can be operated by ABA;
- Lyle's tracker is coherently integrated;
- prototype-to-production fidelity passes on mobile and desktop;
- privacy, consent, security, accessibility, operational, backup, and rollback checks pass;
- no existing prototype site was accidentally altered or used as an unapproved shortcut;
- Jen approves cutover.

## 19. Open items

Open items live in `decision-register.md`. Accepted decisions must not be duplicated there as questions.
