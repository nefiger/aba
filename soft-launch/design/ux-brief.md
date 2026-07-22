# ABA Soft-Launch UX and Design Brief

Status: approved by Jen
Version: 0.2
Last updated: 2026-07-20

## 1. Feature summary

Create a fresh public and controlled-release soft-launch experience for the African Biologicals Alliance. It must establish ABA as a credible, Africa-led membership sector body; explain the connected membership value proposition; route people to the right action; capture coherent member-application information through one enduring form; recruit aligned technical experts; and integrate Lyle's registration tracker before go-live.

The reference prototype will be built in `soft-launch/prototype/` without altering existing repo websites. Once approved, it becomes the production design authority for the monorepo implementation.

## 2. Primary user action

The most important outcome is that a visitor understands why ABA matters and can confidently choose the correct relationship with it:

- understand membership and register public interest;
- complete the member application when it is made available;
- bring a real registration situation to the tracker;
- apply to join the Technical Network as an aligned expert.

The design must not flatten these into equally weighted product tiles. Membership establishes the institutional story; the other actions are clear routes within it.

## 3. Design direction

Use the confirmed context in [`.impeccable.md`](../.impeccable.md): rooted, authoritative, catalytic.

The aesthetic is a contemporary African institution with technical field-guide clarity rather than a corporate, software, or editorial site. The final brochure provides the compositional spirit: full-bleed agricultural imagery, bold green and warm-paper fields, compact uppercase labels, disciplined rules, structured information blocks, and burnt-orange emphasis. The new logo provides the exact green, sage, and beige foundation; the palette is defined in [`brand-palette.md`](brand-palette.md).

The distinctive memory should be: an African institution with the gravity of a serious sector body and the energy of a movement taking practical shape.

Do not copy the brochure page for page. Translate its confidence and material quality into a responsive web language. Do not inherit the current prototype or monorepo frontend composition.

## 4. Layout strategy

### Public pages

- Use a disciplined institutional rhythm with shifts in density, scale, imagery, and colour rather than repeated equal cards or page-like editorial spreads.
- Keep every hero title on one visual line at every supported viewport. Shorten the title or adjust responsive type/layout before allowing a wrap; never clip, truncate, overflow, or shrink it into insignificance.
- Establish ABA's purpose and membership meaning before presenting actions.
- Move between warm paper and decisive forest sections to create chapter-like pacing.
- Use asymmetry for momentum while retaining disciplined shared edges, compact display typography, and readable body-text measures.
- Allow one major idea per section, supported by concise evidence or an action.
- Use the new logo at a confident but not dominating scale.
- Use member-logo placeholders as a single credibility band, not a grid of invented badges.

### Membership

Present the value proposition as an interconnected system:

- collective representation;
- stronger regulatory pathways informed by real evidence;
- sector legitimacy and product clarity;
- technical relationships and capability;
- market development and communication;
- participation, governance, knowledge, and learning.

No numbered ranking is implied. The page should explain how these reinforce one another and distinguish what is active, being established, or governed by later policy.

### Forms

- Begin with why the information is needed and what submission means.
- Group coherent factual topics and reveal detail progressively.
- Use one canonical member application for founding members, later cohorts and eventual public applicants.
- Keep its introduction, data requirements, action and confirmation unchanged; handle known-record matching and application source behind the form.
- Preserve calm orientation, progress, error recovery, and a visible privacy/help route.

### Technical Network

Treat this as a public recruitment call for technical experts who share ABA's vision, align with its values, and agree to the code of conduct. It is an expert-community application/interest route, not a promise of public advisory services.

## 5. Key states

### Shared public shell

- new visitor and returning visitor;
- active route and mobile navigation;
- keyboard focus and reduced-motion treatment;
- 404, unavailable, and degraded tracker states.

### Public membership interest

- untouched form;
- field validation and accessible error summary;
- likely duplicate/repeat interest;
- successful capture with next-step explanation;
- recoverable network/server failure;
- communication preference/correction route.

### Member application

- one cohort-neutral introduction and confirmation;
- founding-member, later-cohort and eventual-public use of the same page;
- complete and incomplete groups;
- known person/organisation match and possible conflict;
- validation, duplicate, and recoverable failure;
- one application-received outcome;
- correction, withdrawal, privacy, and support paths.

Founding members do not skip fields or bypass the common data model. Reconciliation with existing records and membership history happens behind the same application experience.

### Technical Network

- recruitment explanation;
- expertise/profile capture;
- values and code-of-conduct acknowledgement;
- successful submission for review;
- more-information, declined/not-a-fit, and accepted/onboarding states in the operational model;
- no-response-owner/unavailable state must not occur at launch.

### Registration tracker

- tracker available;
- route temporarily unavailable;
- truthful no/low public-data state;
- successful handoff and clear return to ABA;
- consent and membership distinctions remain visible.

## 6. Interaction model

- Navigation exposes a small set of meaningful public destinations, with membership and current work clearly findable.
- Home progressively establishes purpose, value, evidence, credibility, and available action.
- Primary actions lead to dedicated contexts rather than opening modals.
- Forms give immediate field-level guidance plus an accessible summary on submit.
- Progressive disclosure is used for explanation and optional detail, never to hide consequences or consent.
- Buttons and links have clear priority; not every route is styled as a primary action.
- Motion is sparse and supports entry/state change only, with reduced-motion parity.
- The member application does not require saved drafts, but recoverable errors should not unnecessarily erase entered information.

## 7. Content requirements

### Public narrative

- a concise definition of ABA;
- the African problem/opportunity and South Africa's current operating base;
- the connected membership value proposition;
- five-pillar/current-work explanation grounded in approved claims;
- what is available now and what is being built, without internal rollout narration;
- member/founding credibility area with temporary placeholders;
- registration tracker orientation;
- governance, privacy, source, and contact information.

### Membership and intake

- controlled-release status;
- cohort-neutral application copy;
- field help and reason-for-collection text;
- review, approval, and activation distinction;
- consent and privacy wording;
- confirmations that accurately describe the next step.

### Technical Network

- ABA's vision and values;
- why the network exists;
- expertise sought;
- expected contribution and conduct;
- code-of-conduct acknowledgement;
- selection/review and response expectations;
- explicit boundary against unbounded public advisory promises.

### Dynamic ranges

- member-logo area must work with `0`, a small founding set, and a later larger set without changing the page's logic;
- public tracker material must work with insufficient data and later meaningful permitted aggregates;
- form copy must handle short and long organisation/product/role names;
- public pages must remain credible before chapters, a mature Explorer, or extensive content libraries exist.

## 8. Internal implementation references — no action for Jen

This is Codex's implementation checklist. Jen is not expected to read, supply, or act on these files. Before prototype implementation, Codex will use these Impeccable references:

- `reference/typography.md` — select a condensed institutional display face and legible body face that translate the brochure without magazine-like serif dominance;
- `reference/color-and-contrast.md` — express the approved hex sources as an accessible OKLCH token scale;
- `reference/spatial-design.md` — build asymmetrical editorial rhythm and responsive section composition;
- `reference/interaction-design.md` — design the interest, intake, and expert-network forms;
- `reference/responsive-design.md` — adapt hierarchy and forms rather than merely shrinking desktop;
- `reference/ux-writing.md` — write route, consent, validation, error, and confirmation copy;
- `reference/motion-design.md` — define one restrained entrance/state-change language with reduced-motion support.

## 9. Open implementation questions

These do not change the design direction but must be resolved by their gates:

- named operational owner and response expectation for Technical Network submissions;
- approved ABA values and code-of-conduct text;
- final membership and expert-network field maps;
- final privacy/consent wording;
- acquisition and display permission for real member logos;
- Lyle's tracker route, shell, auth/session, and public-data contract;
- final production domain and launch date;
- policy details for eligibility, dues, governance privileges, activation, and lapse.

## Approval

Jen approved this brief on 2026-07-20, subject to the absolute single-line hero-title rule now incorporated above. Detailed content structure and reference-prototype work remain gated by completion of the Phase 1 release authority. Any later correction must be recorded in the decision register before implementation changes direction.
