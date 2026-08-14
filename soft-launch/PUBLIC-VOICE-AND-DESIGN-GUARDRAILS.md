# ABA Public Voice and Design Guardrails

Status: governing soft-launch contract
Accepted: 2026-07-21
Applies to: every public page, public form, shared header/footer, and production implementation derived from `soft-launch/prototype/`

## Why this exists

The ABA prototype has repeatedly drifted into two recognisable failure modes:

1. public copy written as compressed AI slogans or internal product-model narration; and
2. page design built from oversized type, repeated two-column blocks, large empty areas, and the same visual silhouette on every route.

This document turns the corrections into a delivery contract. Future work must pass these rules; it is not enough for an agent or developer to say that the brochure was used as inspiration.

## Authority

Use sources in this order:

1. Jen's direct decisions and corrections;
2. the final ABA brochure for public tone, proposition, and visual character;
3. accepted workshop decisions and current requirements for behaviour and claims;
4. verified regulator or policy sources where technical accuracy matters;
5. the reference prototype for approved composition and interaction;
6. older prototypes and internal system documents as background only.

The brochure governs the public voice as well as the palette and visual direction. Internal system terminology does not become public language merely because it is accurate in the data model.

## Brochure translation contract

`/Users/nefiger/Downloads/ABA Brochure (final).pdf` is the primary creative source for the entire public site. It is not a mood board and it is not limited to colour selection.

The shared site CSS must carry the brochure's system:

- deep green and warm off-white as the dominant fields;
- the brochure's leaf green, beige, sage and orange as controlled secondary colours, never competing page palettes;
- Archivo for body, navigation, labels, forms and operational information;
- Saira Semi Condensed for concise page identity where a strong sans is needed;
- Lora for selected chapter statements, inset principles and proposition language that plays the role of the brochure's serif voice;
- compact uppercase labels, thin rules, square controls and rare orange interruptions;
- full-bleed agricultural imagery used as structural fields, not decorative thumbnails;
- challenge/response contrast, inset statements, uneven panel groupings, outcome bands and split compositions drawn from the brochure's four pages.

These decisions belong in the shared public-site foundation. A route may have its own composition because its job differs, but it must not invent a separate palette, type system, label style, control treatment or chapter language.

The shared page frame is deep forest at both ends: the top navigation uses the same deep forest as the footer. Header wordmark and navigation text use paper, the active route uses light orange, and the primary navigation action uses a light-orange field with deep-forest text. Mobile navigation must preserve the same contrast and must not fall back to a pale menu panel.

### Canonical shared tokens

Do not create route-local alternatives to these roles:

| Role | Canonical value | Use |
|---|---|---|
| Forest | `#103729` | primary dark field and text |
| Deep forest | `#0b281e` | footer and deepest institutional field |
| Leaf green | `#285619` | rare brochure quotation or image-overlay accent; not an ordinary section field |
| Paper | `#f7f3ee` | normal page ground |
| Cream | `#f4eee4` | warmer explanatory field |
| Beige | `#e3dcd6` | restrained secondary field |
| Sage | `#9dac99` | supporting field, never a default full-page background |
| Orange | `#c75c2b` | rules and graphic interruption |
| Light orange | `#efa16f` | buttons and small orange text on dark green |

The type roles are equally fixed:

- Saira Semi Condensed: page identity and major section headings;
- Lora: a small number of selected proposition or principle statements only—never routine headings, form headings, lists or cards;
- Archivo: navigation, body copy, operational headings, cards, forms, labels and footer navigation.

Type size may respond to the available width, but it must come from the shared label, body, subhead, section, title or statement scale. A route must not switch a semantic role to another typeface or scale merely to make its composition feel different.

### Palette distribution

The shared tokens are not permission to use every brochure colour at page scale.

- Forest, paper and cream carry the site.
- Orange marks actions, labels, rules and deliberate transitions. Do not use a full orange slab for an ordinary call to action.
- Sage and beige may distinguish contained supporting material. Do not use them as a default full-width chapter background.
- Leaf green is rare. It must not compete with forest as a second site identity.
- A public page should not introduce a new green, beige or orange because its local composition feels flat. Fix the hierarchy and density first.

For data and tracker pages, the same restraint still applies:

- summary figures sit on paper, cream, or a contained forest field—not a full orange band;
- orange may identify the primary action, a short label, a rule, or one exceptional state;
- charts use the smallest accessible semantic set needed to distinguish outcomes;
- section-to-section rhythm comes from spacing, rules, and composition before colour changes;
- do not assign a different brand tint to every insight block.

### Data infographic page type

Use the `tracker-module--data-infographic` foundation with the
`tracker-module--signal-infographic` composition for a public aggregate-data view whose
primary job is to communicate findings. It complements the shared forest identity but is
not composed like an editorial brochure or a software dashboard.

- Open with one compact, light visual synopsis that encodes the headline data through meaningful marks. It must establish the sample, central tendency and exceptional share without becoming a row of oversized metric cells.
- Choose each chart from the question being answered: ranked horizontal bars for category comparisons, ordered columns for stage counts, grouped bars for comparing several outcomes across categories, and percentage bars for benchmark status. Use a process flow only when movement between stages is the question.
- Use stacked bars only for a genuine part-to-whole question when the whole and segment order are stable. Do not stack several outcome series when readers need to compare each series across categories; interior segments do not share a readable baseline.
- Do not use a scatterplot merely because individual observations are available. Use one only when distribution or correlation is the actual public question, and explain its axes and marks directly.
- Give charts more area than explanatory copy and place each short answer beside its question.
- Use visible axes, exact values, disciplined rules, compact labels and an explicit top-to-bottom sequence.
- Vary the visual grammar between findings while preserving a coherent data story. Do not box every finding, add side rails, or use oversized sequence numerals as decoration.
- Create impact through comparative scale, evidence density and diagram structure—not more brand colours, decorative cards or magazine-like whitespace.
- Keep forest and paper dominant. Use orange for a threshold, axis, index or exceptional figure; use semantic outcome colours only where the distinction is necessary.
- Use a maintained charting library for public interactive data graphics rather than hand-building plot geometry. The current static tracker standard is a pinned local Apache ECharts 6.1 bundle with SVG rendering.
- Every interactive chart must provide hover and tap tooltips, a visible keyboard focus state, arrow-key value navigation, responsive resizing and an ARIA description. Hover must not be the only path to meaning.
- Keep tables as accessible alternatives and provenance as a quiet disclosure rather than part of the main composition.
- Apply the approved privacy threshold independently to every displayed group in every chart and table. Suppress the count and all derived values, chart marks, tooltips and accessible alternatives for a below-threshold group, and avoid synopsis or legend breakdowns that disclose the group by subtraction.

The brochure also governs narrative order and naming. Prefer its real concepts—`African agriculture is at a crossroads`, `advocacy and representation`, `enabling environment and harmonisation`, `local manufacturing and circularity`, `membership, chapters and governance`, and `product clarity and sector credibility`—where they remain accurate. The claims matrix still decides what may be described as current, developing or unavailable; brochure language is not permission to publish an unsupported promise.

## Public voice contract

### Write what ABA is doing

Public copy should normally make at least one of these concrete:

- who ABA brings together;
- what ABA is building or changing;
- where the work is currently based;
- who the work is for;
- what a visitor can do;
- what happens after the visitor acts.

Prefer complete, active statements. Write for an informed visitor who knows the agricultural sector but has not attended ABA's internal meetings.

### Do not manufacture rhythm

Do not split one thought into two short slogan fragments. Do not use punctuation as a substitute for meaning.

Brand exception: `For Africa. By Africa.` is ABA's canonical tagline, supplied directly by Anna on 2026-08-05. Use it only as the shared brand tagline or a deliberate branded signature; do not use it as a pattern for page headings or manufacture variations of it.

Rejected:

- `Biologicals, organised.`
- `Useful work. Honest limits.`
- `Five practical jobs.`
- `Africa-wide ambition. Starting in South Africa.`
- `Sound advice. Responsible conduct.`
- `Members set the agenda. ABA takes it forward.`

Accepted direction:

- `ABA is building a stronger biologicals sector in Africa.`
- `ABA brings African manufacturers, formulators, distributors and specialists together to improve the conditions for biological agriculture.`
- `ABA is based in South Africa and welcomes participation from across Africa.`
- `Members help set ABA's priorities.`
- `Experts must share ABA's purpose and standards.`

The accepted examples are not a phrase library to repeat across pages. They demonstrate directness, subject, action, place, and purpose.

### Banned or restricted public language

Do not use:

- `ambition` or `Africa-wide ambition`;
- `ecosystem` as a vague substitute for the sector, organisations, people, work, or systems actually meant;
- `operating system`, `coherent record`, `entry context`, `relationship and next step`, or similar internal-model language;
- `route` where the visitor simply needs an action, page, form, application, tracker, or membership explanation;
- `broader service package`;
- unsupported claims about regulator access, faster approval, automatic listing, endorsement, referrals, sales, or guaranteed outcomes.

Words such as `relationship`, `context`, and `record` may be legitimate in a specific legal, form, or data-use statement. When used publicly, they must retain their ordinary meaning and be the clearest available word—not a trace of the internal model.

### Copy test

Before implementation, read the page as plain text and ask:

1. Could a visitor understand it without a team member explaining ABA?
2. Does each heading say something, rather than merely sounding like a heading?
3. Is the language specific to ABA, or could it appear on any NGO, consultancy, membership body, or software site?
4. Does it use the sector's real nouns?
5. Does it promise only what ABA can support?

If the page sounds like campaign filler, LinkedIn copy, a pitch-deck label, or an internal architecture note, rewrite it before styling it.

### Public guidance must have a user job

Do not expose a requirement, mapping, caveat, workflow state, or implementation fact
merely because it exists in the specification. Before placing explanatory text in the
interface, name the user job it serves:

- **decide** — helps the visitor know whether this action is right for them;
- **complete** — prevents a likely error at the point where it can occur;
- **trust** — explains a material consequence, privacy boundary, or next step; or
- **recover** — tells the visitor how to correct a problem.

If copy serves none of these jobs, remove it from the public interface. Keep source-row
reconciliation, field-taxonomy rationale, data-contract language, review-state names,
prototype or release labels, threshold approval notes, and operator instructions in the
governing specification or QA material.

For form guidance, state the visitor benefit or risk in ordinary language. Prefer
`We ask because unclear categories can add delay` to an explanation of how ABA stores or
maps the answer. Do not repeat a label, explain the interface itself, or narrate what the
software is doing.

## Typography and composition contract

### Headings

- Never insert `<br>` inside `h1`, `h2`, or `h3` to create drama.
- Every page title and hero title stays on one line at every supported viewport.
- Major section headings should stay on one line on desktop. Because the prototype also uses `h2` and `h3` for smaller components and form states, the responsive check reports their wrapping for mandatory review rather than treating every wrap as an automatic failure.
- On narrow screens, rewrite a supporting heading before accepting a natural wrap; do not use a forced break. If the wrap is retained because it materially improves clarity, record that review in the QA log.
- Do not constrain heading width to manufacture wrapping. Change the copy, type size, or layout width.
- Do not use large type as a replacement for hierarchy or substance.

### Page identity

Consistency comes from the logo, palette, type system, rules, controls, and interaction quality—not from repeating one page template.

Before extending a treatment to another route, identify that page's job:

- narrative pages explain and persuade;
- orientation pages help a visitor choose or understand an action;
- forms support completion and confidence;
- the member-application page supports careful data capture;
- privacy and trust pages support reading and verification.

The layout must follow the job. Do not reuse the homepage silhouette merely because its visual direction was approved.

### Spacing and density

- Group related copy tightly and separate distinct arguments clearly.
- Do not leave large empty fields without a compositional reason.
- Do not give every section the same top and bottom padding.
- Do not place a small amount of copy inside a very tall block.
- Ordinary information sections should normally use the shared compact or section spacing range. Hero-scale vertical space is reserved for a genuine page opening with enough content to justify it.
- Do not let a decorative or atmospheric image consume the entire first viewport. A public narrative page must reveal its proposition or next substantive argument within the initial fold at ordinary laptop and desktop heights.
- Review the complete scroll, not only the first viewport.
- Body copy should retain a readable measure; headings must not be narrowed to force line breaks.

### Structures to avoid by default

- repeated oversized heading plus explanatory paragraph blocks;
- identical two-column sections across a whole page or across every route;
- generic equal-card grids;
- radial diagrams used to make ordinary lists appear strategic;
- large colour slabs without enough information to justify their weight;
- decorative numbers, labels, arrows, or diagrams that do not improve understanding;
- brochure imitation that becomes a sequence of editorial spreads.

Use a diagram only when relationships cannot be understood more clearly as prose, an indexed list, a comparison, or a sequence.

### Membership-specific composition rule

The rejected Membership treatments stacked multiple page-wide colour bands, repeated the same left-heading/right-copy grid, and presented member value as an administrative exchange table. Do not restore them.

The current Membership reference uses:

1. one brochure-derived green/cream opening spread;
2. a compact, indexed account of what members can do through ABA;
3. one horizontal joining sequence that becomes one or two columns before it becomes cramped;
4. one contained boundaries/tracker note; and
5. one shallow closing action.

At tablet widths the opening spread stacks. It only becomes asymmetric at wide desktop widths. The page must not preserve a desktop split when that forces headings, value items or controls into narrow columns.

## Required delivery sequence

1. Read this contract and the page-specific source material.
2. Draft the page's heading and copy structure before styling.
3. Read all headings consecutively as plain text.
4. Run the static preflight:

   ```sh
   node soft-launch/scripts/public-site-preflight.mjs
   ```

5. Serve the repository and open the responsive render check:

   ```text
   http://127.0.0.1:8766/soft-launch/qa/public-site-render-check.html
   ```

6. Inspect a full-page capture at mobile and desktop sizes.
7. Compare the page silhouette and density with the other routes.
8. Record material failures and corrections in `prototype/qa-log.md`.
9. Only then describe the page as complete or ready for review.

## Automated versus human checks

The static preflight fails on high-confidence language and markup errors. The responsive check fails on horizontal overflow and wrapped page titles, and reports all other heading wraps for review.

Automation cannot judge whether a page feels empty, repetitive, self-important, or generic. The full-scroll composition review therefore remains mandatory. A clean automated result is necessary but not sufficient.

## Change rule

Do not weaken this contract to make a failing page pass. Correct the page first. If a rule genuinely conflicts with clearer public communication, record the reason and obtain Jen's decision before changing the rule.
