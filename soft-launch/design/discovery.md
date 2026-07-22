# Phase 2 Product and Design Discovery

Status: complete; UX brief approved
Last updated: 2026-07-20

This document starts Phase 2 without pretending that codebase styling can answer the design question. The current repo shows what was tried. Jen's answers establish who the new experience is for and how it should feel.

## What is already known

### Product purpose

The soft launch must establish ABA as a credible membership-based African biologicals sector body, explain its membership value proposition, capture the first usable cohort data, build a permissioned interest base, and connect people with real registration situations to Lyle's tracker.

### Primary audiences and context

- existing founding members arriving through a privately shared link;
- carefully selected prospective members arriving through a later invitation;
- manufacturers, distributors, formulators, and other locally rooted biologicals actors evaluating ABA;
- regulatory, technical, policy, agricultural, funding, and institutional stakeholders checking ABA's legitimacy and direction;
- people with active registration situations entering the tracker;
- specialists or enabling contributors who may connect through the Technical Network;
- ABA operators reviewing and acting on captured information.

Most public visitors are likely to arrive without a detailed briefing. The page must do its job on phone and desktop, often from a shared link, and without Jen or Anna narrating it.

### Core jobs

- understand what ABA is and why it exists;
- judge whether it is credible, relevant, and active;
- understand why membership matters now and what is still developing;
- select the correct public-interest, member-application, tracker, or technical route;
- understand what will happen after submitting information;
- complete forms with confidence about purpose, privacy, and consequences.

### Strategic and brand evidence

- final brochure is the primary strategic and visual reference;
- ABA should feel Africa-wide and locally rooted, with South Africa active now;
- the voice must be public, clear, technically credible, constructive, and solutions-led;
- the site should feel like a serious sector-building institution, not a software startup, NGO template, generic corporate site, or prototype review surface;
- the brochure points toward a strong editorial hierarchy, dark green, warm neutral, and restrained orange/earth accents.

### Known visual anti-goals

- no patching of the current monorepo ABA frontend;
- no refinement of the existing prototype as the main path;
- no generic AI/SaaS card grid;
- no endless rounded panels, icon-over-heading tiles, glassy effects, or ornamental dashboard metrics;
- no tiny ABA symbols in white rounded badge/blob backgrounds;
- no random cropped symbol fragments used as decoration;
- no dense explanation of rollout mechanics inside the public UI;
- no inherited design-system rule merely because it exists in the repo.

### Technical and quality constraints

- public, private-intake, and tracker journeys must work coherently across phone and desktop;
- production is Laravel/Inertia/React/TypeScript unless Phase 3 finds a reason to change the frontend arrangement;
- the reference prototype is implementation-agnostic but must be reproducible in that stack;
- proposed baseline is WCAG 2.2 AA;
- an unlisted private URL is an operational boundary, not a security control;
- headings must not use forced narrow `max-width` measures per repo rule;
- existing websites must remain untouched.

## Confirmed discovery outcomes

### Brand and emotional outcome

- Brand personality: `rooted, authoritative, catalytic`.
- The site should leave a credible prospective member feeling that ABA is serious, African-led, useful, and gathering real momentum without overselling itself.
- The final brochure is the primary visual reference; no external site is adopted as a template.
- `/Users/nefiger/Downloads/New ABA Logo.png` is the final mark.
- The logo's exact green, sage, and beige establish the palette foundation; brochure orange supplies the principal warm accent.

### Membership value architecture

The earlier phrase `membership hierarchy` was confusing and is withdrawn. The membership proposition is not a ranked list. It is a connected set of reinforcing value:

- collective representation;
- stronger regulatory pathways informed by evidence and coordinated engagement;
- sector legitimacy and product clarity;
- technical relationships and capability;
- market development and communication;
- participation, governance, shared knowledge, and learning.

Page hierarchy will control comprehension, but it must not imply that one of these is the membership product and the others are optional future decoration.

### Member-application data

- Founders do not skip the substantive intake or parts of the data model.
- Founding members, later cohorts and eventual public applicants complete the same factual dataset on the same page.
- The system must develop as one coherent person, organisation, role, intake/application, membership, consent, and participation model over time.
- Known-record matching, source metadata and relationship history may differ behind the form; the explanation, information request and confirmation do not fork.

### Technical Network

- A public-launch call for technical experts is required.
- It recruits people who share ABA's vision and align with its values and code of conduct.
- It is a reviewed network/application route, not an unbounded public advisory promise.
- Approved values, code-of-conduct wording, review ownership, and response expectations remain operational dependencies.

### Logos and credibility

- Real member logos still need to be acquired with display permission.
- Use neutral, clearly fictional placeholders in the reference prototype.
- Placeholders must test realistic layout without inventing organisations or implying endorsement.

### Delivery defaults accepted

- three review points rather than page-by-page interruption;
- light-first public reading and form experience;
- WCAG 2.2 AA baseline;
- current mainstream phone and desktop contexts;
- no fixed launch date assumed yet;
- no people, member, or partner claims without approval.

## Discovery outputs

- confirmed design context: [`../.impeccable.md`](../.impeccable.md)
- derived palette: [`brand-palette.md`](brand-palette.md)
- UX/design brief: [`ux-brief.md`](ux-brief.md)
- accepted decisions: [`../requirements/decision-register.md`](../requirements/decision-register.md)

Jen approved the UX brief and palette on 2026-07-20, with the additional absolute rule that hero titles must always remain on one visual line. Prototype coding remains gated behind completion of the Phase 1 release authority.
