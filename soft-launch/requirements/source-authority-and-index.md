# Soft-Launch Source Authority and Requirements Index

Status: Phase 1 working draft
Last updated: 2026-07-20

## Why this exists

The repository contains valuable but overlapping specifications from different moments in the prototype process. This index prevents an old prototype choice, internal system term, or speculative service idea from silently becoming a launch requirement.

## Authority order

When two sources conflict, use this order:

1. direct decisions and clarifications accepted by Jen in the current handover/discussion;
2. accepted conclusions from the 15 July 2026 ABA UX workshop;
3. final ABA brochure and supplied core-functions positioning material for proposition and visual direction;
4. current official or regulator source material for regulator-defined terminology;
5. Lyle's latest tracker implementation and handover for tracker behaviour, subject to the agreed website boundary;
6. the consolidated soft-launch PRD, decision register, and claims matrix in this workspace;
7. transcript/debrief/WhatsApp evidence used to explain intent and expose constraints;
8. earlier prototype requirements and existing HTML as learning evidence, not automatic design or delivery authority;
9. the existing monorepo ABA frontend as infrastructure context only, never design authority.

The consolidated documents at item 6 include `common-record-field-state-contract.md`. `../PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md` is the day-to-day public-copy and page-composition contract created from item 1 corrections and the brochure authority at item 3. These documents must remain faithful to items 1–5.

## Source classification

| Source | Classification | First-release use |
|---|---|---|
| Jen's current clarifications | Governing | Hosted soft launch; public site plus one member application initially shared privately; accepted workshop conclusions; membership value proposition is central; Lyle integration required; preserve existing sites; fresh design root |
| `/Users/nefiger/Downloads/New ABA Logo.png` | Governing brand asset | Final logo; its exact deep green, sage, and beige establish the launch palette foundation |
| `aba-ux-workshop-decision-digest-2026-07-15.md` | Governing decision evidence | Journey rules, intake states, tracker boundaries, brochure-led reset, terminology discipline |
| `ABA Brochure (final).pdf` | Governing strategic and visual reference | Core proposition, five-pillar story, editorial tone, colour/brand direction |
| Core-functions positioning diagram | Governing strategic reference | Proposition hierarchy and relationship of ABA functions |
| `aba-first-release-website-reset-spec.md` | Supporting, to be superseded by approved PRD | Strong release framing; contains prototype/production ambiguity that must be corrected |
| `aba-membership-value-and-engagement-model-notes.md` | Governing claims/value evidence | Membership proposition and public promise boundaries |
| `aba-terminology-and-taxonomy-reset-register.md` | Governing language reference | Public, internal, regulator, and undecided terms |
| `aba-whatsapp-group-synthesis-2026-07-20.md` | Supporting internal evidence | Strategic intent, credibility, governance, evidence, and service-boundary cautions |
| Founding-member demo/debrief and post-meeting notes | Supporting product evidence | Member reactions, operating needs, cohort sequence, and membership value context |
| Existing `docs/design-system/` | Historical/extracted design evidence | Useful record of the previous prototype; not binding on the new brochure-led design |
| Existing `docs/site/` and other prototype HTML | Historical UX evidence | Learn from content and interaction work; do not refine or copy by default |
| `registration-tracker/` | Workstream-owned dependency | Lyle's area; use its latest landed state for tracker integration, not older guesses |
| Earlier `docs/requirements/` notes | Supporting or historical pending line-by-line classification | Reuse valid domain rules; do not allow them to override the reset |
| `unpoisonsa/monorepo` ABA app | Production infrastructure context | Retain/extend useful backend capability after audit; replace frontend experience side by side |

## Current document reconciliation priorities

### Must reconcile before G1

- membership type, eligibility, dues, privileges, and activation policy;
- public-interest fields, consent wording, and CRM outcome;
- member-application fields, record reconciliation and internal application-source handling;
- existing membership/admin/CRM model notes versus the real monorepo model;
- tracker landing, navigation, route, terminology, and data/consent handoff;
- approved Technical Network values, code of conduct, review owner, and response process;
- what membership value is available now versus governed/developing;
- privacy, review ownership, communications, and operational response.

### Must not be reopened as discovery

- first release is hosted live but soft-launched;
- working-session conclusions are accepted;
- the public website and one member application, initially shared privately, coexist;
- one member application serves founding members first, later cohorts next and public applicants when ABA is ready;
- public interest is not an application;
- tracker participation is not a membership gate;
- membership value proposition is core;
- Lyle's tracker work must be integrated before go-live;
- existing sites are preserved;
- the new design is created afresh and becomes monorepo design authority;
- every organisation completes the same visible member application against one evolving shared data model;
- Technical Network is a public-launch call for experts aligned to ABA's vision, values, and code of conduct;
- neutral member-logo placeholders are used until real files and permission are obtained;
- membership value is one connected proposition, not a ranked hierarchy.

## Known conflict corrections

| Earlier wording/problem | Correct first-release interpretation |
|---|---|
| `production-ready website` inside a static-prototype scope | Build a production-intent reference prototype here, then implement real production behaviour in the monorepo |
| `no persistent backend` as a release rule | No persistent backend is required in the reference prototype; the hosted production release must persist and operationalise submissions |
| design system extracted from the old prototype is canonical | It is historical evidence only; the new approved prototype will establish the launch design authority |
| tracker-heavy work parked | Tracker redesign remains Lyle's work, but website integration is launch-critical |
| membership proposition treated as potential/developing detail | The membership value proposition is central now; individual mechanisms are bounded according to readiness and claim risk |
| `broader service package` | Do not use; it is not an agreed ABA term |

## Phase 1 completion method

For every launch-relevant existing requirement, record one outcome:

- `ADOPT` — included in the soft-launch PRD;
- `ADAPT` — intent retained but wording/behaviour changed;
- `DEFER` — valid later, not part of this release;
- `REJECT` — conflicts with accepted intent or creates risk;
- `OWNER DEPENDENCY` — governed by Lyle, legal/policy review, or another named owner;
- `UNKNOWN` — missing evidence and needs a decision.

Document-level classification is complete in `reconciliation-matrix.md`. Launch-critical membership, intake, Technical Network, consent, state, and tracker-boundary rules are consolidated in `common-record-field-state-contract.md`. Production naming and tracker-owner details remain Phase 3/4 dependencies.
