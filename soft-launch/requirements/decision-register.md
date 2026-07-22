# Soft-Launch Decision Register

Status: Phase 1 working draft
Last updated: 2026-07-21

This register distinguishes accepted decisions from actual open choices. Accepted workshop conclusions are not sent back for validation.

## Accepted decisions

| ID | Decision | Consequence |
|---|---|---|
| DEC-001 | The first release is a hosted live soft launch. | Production persistence, privacy, operations, monitoring, and rollback matter even though reach is controlled. |
| DEC-002 | The release includes a public website and one member-application URL sent first to founding members. | The application can remain unlisted during the controlled release without becoming a different form or experience. |
| DEC-003 | The same member application is used for founding members, the next cohort and, when ABA is ready, public applications. | Maintain one URL, introduction, question set, submit action and confirmation. Application source or cohort may be recorded internally without changing the page. |
| DEC-004 | Public visitors can register membership interest, not submit a membership application. | Interest creates a contact/consent relationship only. |
| DEC-005 | The 15 July working-session conclusions are accepted. | Use them as requirements; do not add a validation phase for settled choices. |
| DEC-006 | Membership value proposition is central to this release. | The website must explain why membership matters beyond filling in a form or using the tracker. |
| DEC-007 | The tracker is a public utility and evidence route, not a membership gate. | Joining or registering interest cannot be required to use it. |
| DEC-008 | Lyle's tracker work lands before go-live and must be integrated into the landing page and navigation. | The website cannot pass final release gate without a tested tracker handoff. |
| DEC-009 | Existing websites and prototypes in this repo are preserved. | All new planning and design work lives under `soft-launch/` unless separately authorised. |
| DEC-010 | The new reference prototype is designed afresh. | Existing HTML and the current monorepo frontend are evidence, not starting templates. |
| DEC-011 | The approved prototype controls production visual design, copy treatment, responsiveness, and interaction. | Monorepo implementation is judged against it, not against existing ABA views. |
| DEC-012 | The PRD controls data, validation, consent, access, workflow, integration, and operations. | Visual fidelity cannot override correct production behaviour, and backend reuse cannot override experience fidelity. |
| DEC-013 | Production implementation happens side by side before cutover. | No public replacement until protected-preview acceptance. |
| DEC-014 | Founders can submit product-tracker information if they have registrations in play, but tracker use is not part of membership qualification. | Keep tracker and membership records/journeys distinct while allowing known-person/organisation reconciliation in production. |
| DEC-015 | Public tracker output must use real, permitted information. | Use a truthful empty or modest state if there is not enough data; never launch a fake dashboard. |
| DEC-016 | No save-and-return draft is needed for the short v1 membership form. | A complete submission enters review; incomplete browser state is not a persisted application. |
| DEC-017 | Application approval and active membership are different states. | Finance/onboarding/activation follows review; UI and data must not collapse them. |
| DEC-018 | `/Users/nefiger/Downloads/New ABA Logo.png` is the final logo. | The unchanged asset is copied to `soft-launch/design/assets/aba-logo-final.png`; its exact colours establish the launch palette foundation. |
| DEC-019 | The final brochure is the sole external visual reference; the brand personality is rooted, authoritative, and catalytic. | Build a distinctive editorial/institutional experience; do not inherit the old prototype design system or another organisation's site. |
| DEC-020 | Membership value is one connected proposition, not a ranked hierarchy. | Collective representation, regulatory pathways/evidence, legitimacy/product clarity, technical relationships, market development, participation, governance, and knowledge reinforce one another. Page hierarchy may order the explanation without ranking membership value. |
| DEC-021 | Every applicant completes the same member application against the same evolving data model. | Founders do not skip fields or bypass records. Reconciliation with known relationships happens behind the form; the person, organisation, role, application, membership and consent information remains coherent. |
| DEC-022 | Technical Network is needed for public launch as a call for aligned technical experts. | Recruit experts who share ABA's vision and align with its values and code of conduct. This is a reviewed network route, not a promise of unbounded public advice. |
| DEC-023 | Use neutral member-logo placeholders until real logos and display permission are obtained. | Prototype credibility/layout can be tested without inventing members or implying endorsement. |
| DEC-024 | Phase 2 uses three review points. | Review the consolidated authority/brief, then visual direction/home, then the complete responsive prototype; proceed autonomously between gates. |
| DEC-025 | Hero titles never wrap onto multiple visual lines. | At every supported viewport, use concise copy, responsive typography, and sufficient layout width. Do not solve this with clipping, truncation, overflow, or illegibly small type. |
| DEC-026 | Jen approved the Phase 2 UX brief and palette on 2026-07-20, subject to DEC-025. | G2 is approved; reference-prototype coding remains gated by completion of G1. |
| DEC-027 | The single member application creates a reviewable submission before any operational reconciliation or decision. | The public form and confirmation do not change by cohort. Known founding relationships and application source are handled as internal record concerns. |
| DEC-028 | Technical Network uses a distinct expert-network application/profile model linked to shared people and organisations. | Do not force experts into membership or publish accepted profiles automatically. |
| DEC-029 | G1 is complete for reference-prototype work with unresolved policy and owner dependencies explicitly bounded. | Prototype work may proceed; production cutover remains blocked by the dependencies listed in the PRD and common contract. |
| DEC-030 | Brochure inspiration does not mean an editorial or serif-dominant website. | Translate the brochure through real agricultural imagery, hard green/cream fields, compact labels, orange interruptions, disciplined rules, structured information, and a condensed institutional sans. The homepage is rebuilt first as the visual-direction proof before the remaining pages are restyled. |
| DEC-031 | The revised homepage treatment is the accepted visual-system basis for the remaining soft-launch routes. | Propagate its palette, type hierarchy, shell, interaction quality, spacing and compositional discipline; adapt layouts by narrative, orientation, capture, private-intake, and trust/legal page role rather than copying the homepage structure. |
| DEC-032 | Public copy and composition are governed by `PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md` and its preflight checks. | Do not use compressed AI-slogan fragments, `ambition`, internal-model narration, forced heading breaks, repetitive page silhouettes, or unreviewed full-page spacing. A clean automated check is necessary but does not replace full-scroll visual review. |

## Phase 2 discovery decisions

The initial design-context, membership-framing, founder-data, Technical Network, logo, placeholder, review-cadence, hero-title, common-record, visual-treatment, and public-quality-control questions are resolved in `DEC-018` through `DEC-032`.

## Open decisions that do not block initial UX specification

| ID | Decision needed | Owner/timing |
|---|---|---|
| OPN-007 | Final membership eligibility and locally rooted/control definition | Leadership/legal before application logic is enforced |
| OPN-008 | Final categories/types, dues, privileges, governance rights, lapse and renewal policy | Leadership before operational activation |
| OPN-009 | Named owner, response expectation, and system access for interest and membership submissions | Operations before integrated-preview gate |
| OPN-010 | Final privacy notice, communication-consent copy, retention, correction, and deletion policy | Leadership/legal/operations before go-live |
| OPN-011 | Production domain and whether `aba.datashaman.com` remains staging or becomes part of launch | Delivery before G4/G5 |
| OPN-012 | Acknowledgement and workflow email scope | Operations before G5 |
| OPN-013 | Exact tracker route, shell, auth/session, and public-data interface | Lyle/production integration after handoff |
| OPN-014 | Exact minimum dataset and privacy thresholds for public tracker summaries | Lyle/ABA data governance before public output |
| OPN-015 | Approved ABA values and code-of-conduct content, plus the Technical Network review/response owner | Leadership/operations before the public Technical Network route goes live |
| OPN-016 | Real founding/member logos and permission to display them | Membership/communications before placeholder replacement |

## Change rule

When an accepted decision changes, add a dated superseding decision. Do not quietly edit history or let an implementation shortcut become policy.
