# Registration Tracker Presenter Tightening Plan

Context date: 2026-06-23

Branch: `codex/registration-tracker-presenter`

Target page: `docs/registration-tracker/index.html`

## Purpose

This planning note exists before editing the presenter page. The goal is to review, assess, critique, and clarify the registration tracker presentation so the next edit pass removes repetition while preserving the strongest product story.

The page should be presentable in a live ABA founding-members conversation. It should explain the registration tracker clearly enough that the audience understands why it matters, how it works, which audiences use it, and how it connects to the wider ABA site.

## Current Read

The current presenter page has a strong foundation:

- It correctly frames the tracker as more than a form or dashboard.
- It keeps ABA's review gate and consent boundaries visible.
- It separates public, member, operator, and registrar-facing views.
- It links into the existing focused registration tracker screens.
- It connects the tracker back to membership, advocacy, and live-site integration.

The concern is not that the ideas are wrong. The concern is that several sections explain adjacent versions of the same idea, which makes the page feel heavier than it needs to be.

## Repetition Diagnosis

The page currently repeats these messages in several forms:

- The tracker turns registration friction into member value and sector evidence.
- The tracker is useful because one structured data layer can serve multiple audiences.
- Different audiences enter the same system through different doors.
- The same data supports different views, with boundaries.
- Raw intake becomes useful only after review, verification, consent, and visibility decisions.
- Public output is aggregate, company output is private, operator output is internal, and registrar output is controlled.

These are all important, but they do not all need separate sections. Some should become the main narrative spine; others should become supporting detail.

## Proposed Narrative Spine

The tightened version should probably answer five questions in order:

1. What is the tracker?
   - A controlled evidence system for registration visibility, member support, and advocacy.

2. Why does ABA need it now?
   - It creates practical value before the full platform exists by turning member-submitted registration data into trusted insight.

3. How does it work?
   - Intake captures structured records; ABA review creates trusted records; approved records feed the appropriate views.

4. Who sees what?
   - Public visitors see aggregate signals; members see their own pipeline; ABA operators manage review; registrar packets use stricter approved exports.

5. How does it fit into the wider ABA site?
   - Public proof points belong in the site and Knowledge Hub, while member and operator surfaces sit behind role-appropriate paths.

## Candidate Consolidation

### Keep

- Hero framing, but make the headline and lede do more work.
- One concise "why it matters" section.
- One process section showing intake to review to outputs.
- One audience/visibility section that combines the current audience cards and client-facing/internal matrix.
- One trust rulebook section, shorter and clearly optional for deeper questions.
- One live-site integration section, focused on where the tracker appears in the ABA site.

### Merge

- Merge "Audience-specific paths" with "Client-facing versus internal."
- Merge "same data supports different views" into the audience visibility explanation.
- Fold repeated trust-boundary language into either the process section or a shorter rulebook.
- Fold "product logic" into the intake-to-review-to-output flow.

### Cut Or Reduce

- Reduce repeated explanations of public aggregate-only visibility.
- Reduce repeated explanations that company dashboards stay private.
- Reduce repeated explanations that operator review is the gate before use.
- Avoid restating "member value, advocacy value, operational value" in every later section.

## Proposed Page Structure

1. Hero: tracker concept and presenter framing
   - One sharp definition.
   - Three proof metrics can stay if they support the live talk.
   - Primary links to combined walkthrough, public view, and company view.

2. Why this matters
   - Three cards: member value, advocacy value, operating discipline.
   - Keep this short and outcome-led.

3. How records become useful
   - Intake, ABA review, trusted record, role-specific outputs.
   - Consider reducing five steps to four if registrar export is framed as one output rather than a full process step.

4. Who sees what
   - Replace the separate audience grid and matrix with one compact table or card grid.
   - Each row/card should include audience, visible experience, boundary, and demo link.

5. Trust rules
   - Keep as a deeper-answer section.
   - Shorten to the minimum rules needed to answer trust questions.

6. Site integration
   - Homepage: public proof points.
   - Membership: company workspace as member value.
   - Knowledge Hub: registration readiness and biologicals intelligence.
   - Admin: internal operator route, not public navigation.

## Wording Principles For The Edit

- Say the core idea once, then let later sections add new information.
- Prefer concrete nouns over abstract repetition: record, review gate, public aggregate, company workspace, registrar packet.
- Avoid using "same data, different views" as a repeated slogan; use it once or replace it with a clearer access-boundary explanation.
- Keep presenter language confident but not overbuilt.
- Make each section earn its place by answering a different question.
- Preserve ABA framing: Africa-wide ambition, South Africa active now, member value, advocacy evidence, and trust boundaries.

## Open Decisions To Grill

These should be resolved before editing the HTML.

### Decision 1: Primary Message

What is the one sentence the audience should remember?

Working answer:

> The registration tracker turns member-submitted registration data into trusted evidence for company support, public advocacy, and ABA operations, without exposing private company detail.

User refinement:

> While primarily providing ABA with a detailed picture of the registrations that its members have lodged with the Registrar's office.

Combined working message:

> The registration tracker gives ABA a detailed, trusted picture of the registrations its members have lodged with the Registrar's office, turning member-submitted data into evidence for company support, public advocacy, and ABA operations without exposing private company detail.

Alternative emphases:

- Member-value emphasis: the tracker gives companies a practical reason to participate now.
- Advocacy emphasis: the tracker gives ABA a defensible evidence base for sector conversations.
- Operating-system emphasis: the tracker gives ABA a controlled review layer before data becomes public or official.

### Decision 2: Presenter Depth

Should this page be a high-level meeting story or a detailed explainer?

Recommended answer:

It should be a high-level meeting story with optional detail. The first read should be fast; trust and rulebook detail should exist only for questions.

User decision:

Lead with ABA's need for a detailed picture of registrations lodged with the Registrar's office. Member value, public communications, advocacy, and company-facing registration visibility are downstream uses of that trusted picture.

Editorial stance:

The page does not need to sell the basic idea of a registration tracker from zero. The feature appears well-supported, even if not formally confirmed. The presenter page should paint a concrete picture of what the tracker looks like, how it works, and how it is constructed.

### Decision 3: Audience Priority

Which audience should the page optimize for first?

Recommended answer:

Founding members and ABA leadership first, then internal operators. The page should sell the strategic value before showing internal mechanics.

Resolved domain model:

The core unit of the tracker is a registration record for a product/application lodged with the Registrar's office. Companies matter because they own, submit, or manage records, but the tracker is centered on the registration/application journey: status, dates, category, bottlenecks, proof, consent, and readiness.

### Decision 4: Registrar Export Prominence

Should registrar packets appear as a major output, or as a controlled internal byproduct of reviewed records?

Recommended answer:

Treat registrar packets as a controlled internal byproduct, not the fourth equal audience. This keeps the page from over-indexing on one downstream workflow.

Resolved structure:

Use a registration record lifecycle rather than a linear workflow as the main explanation. The cleaner sequence is:

1. A member has lodged a product/application registration with the Registrar's office.
2. ABA captures or receives a structured registration record.
3. ABA reviews proof, membership relationship, duplicates, consent, bottlenecks, and data quality.
4. The record becomes a trusted registration record.
5. That trusted record can support different outputs: ABA's internal picture, member company visibility, public aggregate signals, advocacy evidence, and controlled registrar packet/export use.

### Decision 5: Relationship To The ABA Site

Should the presenter page explain future site integration, or should that move into a separate site-integration branch?

Recommended answer:

Keep a short integration section here, but leave detailed site integration design for the separate branch.

Resolved public-dashboard role:

The public dashboard should be secondary. It exists to show that anonymised registration data has industry-wide value and that ABA can capture and present signals no one else appears to be presenting. It should support the core story, not replace it. The lead story remains ABA's trusted internal picture of member registrations lodged with the Registrar's office.

Wording rule:

Do not make the absolute claim "no one else is doing this" unless it has been verified. Use confident but defensible language instead:

> ABA can create a sector-wide registration evidence base that is currently missing from the biologicals industry.

Resolved member-benefit role:

Member benefits should remain visible, but they should be framed as the participation bargain. Companies contribute structured registration records, and in return they receive a clearer private view of their own registration pipeline, blockers, readiness, and benchmark context. The presenter page should not imply that the tracker exists mainly as a company dashboard.

Resolved trust section role:

Keep a short trust/rulebook section, but make it an optional deeper reassurance layer. The page needs to make clear that raw company detail is not exposed, but the main narrative should not repeat review-gate, consent, privacy, and aggregate-only language in every section.

Resolved registrar-facing advocacy role:

Registrar packets/exports should be treated as one key example of what ABA can do with reviewed, trusted member registration records, not as a separate audience equal to public visitors, member companies, or ABA operators.

This output still needs to be clear and prominent because it is central to the member value proposition: ABA needs accurate member registration data in order to advocate on members' behalf with the Registrar's office. That advocacy support is a key service for members, and it should be distinguished from what non-members receive. Non-members may benefit indirectly from public aggregate intelligence or sector-wide advocacy, but member-specific registrar support depends on contributed, reviewed member records.

Resolved advocacy distinction:

The presenter page should make a sharper distinction between member-specific advocacy and sector-wide advocacy.

- Member-specific advocacy: ABA can help with records members have submitted and consented to share.
- Sector-wide advocacy: ABA can use anonymised aggregate patterns to argue for broader improvements across the biologicals sector.

This distinction should replace vague repeated "advocacy value" language where possible.

Resolved member/non-member distinction:

The presenter page should explicitly distinguish members from non-members, but without sounding punitive.

- Members can submit registration records, see their own registration picture, and receive member-specific Registrar-office advocacy and case support.
- Non-members may see public aggregate intelligence and may benefit indirectly from sector-wide advocacy, but they do not get private tracking or case-specific support.

This should make membership value concrete and help explain why companies would contribute data.

Resolved data-capture burden:

The presenter page should briefly acknowledge the member data-capture burden. It should reassure members that ABA is asking for structured registration details because those details directly support registration visibility, member-specific advocacy, and trusted aggregate sector insight. Avoid making the data ask feel open-ended or one-sided.

Resolved example fields role:

The presenter page can include a compact example of what a registration record contains, but this should not become a detailed form specification. Detailed field-level design is more relevant for the user-facing main-site/member integrations. Here, the example should simply make the concept concrete.

Possible example fields:

- Product/application
- Applicant or member company
- Active ingredient or biological category
- Lodged date
- Current registration status
- Registrar reference
- Bottleneck theme
- Proof/attachment status
- Consent and use permissions
- Next action

Resolved presentation mode:

Optimize the presenter page for the live meeting, not post-meeting exploration. The main ABA site and related website pages can carry richer exploratory material. This page should read top-to-bottom like a clean presenter script, with links available for demo jumps but not as the primary experience.

Resolved page label:

Use a more definite label than "Registration tracker concept." The preferred label is:

> Registration tracker meeting brief

Local title check:

- `docs/walkthrough/index.html` uses meeting-oriented language: "Thursday walkthrough" and "A clean walkthrough for Thursday's ABA story."
- The hub uses "Internal demo material" and "Registration tracker demo material."
- No local page was found that is explicitly titled as Jen's version.

Rationale:

"Registration tracker meeting brief" matches the meeting-support purpose and avoids making the tracker sound speculative. It also stays distinct from the more exploratory website pages.

## Proposed Editing Passes

1. Mark repeated claims in the current page and assign each one a single home.
2. Rewrite the section order around the five-question narrative spine.
3. Merge audience and visibility sections.
4. Shorten the trust rulebook.
5. Tune CTA labels so they match the presentation flow.
6. Run a browser pass for desktop and mobile layout after editing.

## Non-Goals

- Do not redesign the underlying tracker screens in this pass.
- Do not reorganize `registration-tracker/`.
- Do not merge this branch into `main`.
- Do not start the separate ABA site integration branch as part of this edit.
