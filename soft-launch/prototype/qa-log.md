# Reference Prototype QA Log

Last updated: 2026-07-21
Gate: G3 in progress

## Rendered browser checks completed

### Single member application correction

- the founding-member and invited-candidate query variants were removed;
- `member-intake.html` is now the one canonical member application for founding members, later cohorts and eventual public applications;
- every organisation sees the same page title, introduction, questions, submit action and confirmation;
- the form no longer sends a hidden `entry_context`; ABA may attach cohort or invitation provenance as internal source metadata without changing the applicant's form;
- the copy explains that ABA reviews the information, may use it to keep approved member information current, and that submission does not itself confirm or change membership status;
- the rendered-route check now tests the canonical URL without a cohort query parameter.

### Whole-site typography, palette, density and tracker correction

- the shared top navigation now uses the footer's deep forest, with paper wordmark/navigation text, a light-orange active route, and a light-orange primary action; the mobile menu uses the same field and contrast hierarchy;
- the six-page review screenshots showed that route-specific CSS was still overriding the shared brochure system: serif and condensed faces changed roles between pages, leaf green competed with forest, sage and orange became full-width page palettes, and routine sections retained hero-scale spacing;
- the stylesheet now declares an explicit final `system-correction` layer after the shared brochure foundation, so the canonical decisions cannot be silently reversed by older route rules;
- Saira Semi Condensed now names pages and major sections; Archivo carries body copy, operational headings, forms, navigation and the footer; Lora remains only on selected brochure-derived propositions and principles;
- forest, paper and cream now carry the public routes. Full-width sage fields on Home, Membership interest and Technical Network were replaced with cream fields and orange rules; Home's orange conversion slab was replaced with paper, forest and an orange transition rule; About's leaf-green chapter fields now use forest;
- Membership's opening spread was compressed, the left-rail audience note no longer creates an automatic empty field, and its serif proposition now uses forest rather than a competing bright green;
- the Registration Tracker opening is now a compact public-utility split rather than a stacked green field. The page no longer says that a live intake will be added later or describes what the site will display before data exists;
- tracker copy now tells visitors when to use it, what to prepare, that membership is not required, what remains private, and that any named use requires separate permission;
- every primary page title uses Saira, remains on one line, fits its own layout column at the 1707 by 960 review viewport, and produces no horizontal overflow;
- mobile browser review across Home, About, Membership, Membership interest, Technical Network and Registration Tracker reports no horizontal overflow; the responsive render check reports zero blocking issues across all eight routes;
- the final static preflight passes all eight routes with no banned phrase, forced heading break or paired-slogan failure. The only review warning is ordinary public use of `relationship` in the private member intake.

### Latest corrective checkpoint: Membership and shared tokens

- the Membership layout shown in the latest review screenshot was rejected; earlier statements in this log that describe that composition as accepted or complete are superseded;
- Membership no longer uses the reciprocal exchange table, sage release slab, dark charter slab and orange conversion slab;
- the replacement uses one brochure-derived green/cream opening spread, six indexed member-work areas, one compact joining sequence, a contained boundaries/tracker note and one shallow closing action;
- at 1024 CSS px the opening spread stacks instead of squeezing the desktop composition into narrow columns; the asymmetric split begins at 1280 CSS px;
- the shared type roles now resolve consistently across all eight routes: Archivo body and operational copy, Saira page identity, and Lora only for selected proposition/chapter statements;
- shared footer navigation headings resolve to 11 CSS px Archivo labels on every route; the route override that enlarged them to 40 CSS px is no longer active;
- shared colour aliases now resolve to the brochure palette rather than route-specific near-duplicates; active Membership fields are forest, paper, cream, light orange and rules derived from the same source;
- Membership has zero horizontal-overflow or page-title-wrap failures at 320, 375, 768, 1024 and 1440 CSS px; it has no supporting-heading wraps at 768, 1024 or 1440 CSS px;
- the 320 and 375 CSS px supporting statements `What members do through ABA.` and `Membership is opening in stages.` use natural two-line wraps; the page title `Why join ABA?` remains one line;
- the final whole-site render check passes with zero blocking failures, 29 distinct supporting-heading review warnings and no browser console errors;
- HTML Tidy passes Membership with `aba-header` and `aba-footer` registered as custom block elements.

### About first-fold correction

- the About image hero was allowed to grow to 43rem and consumed the first viewport before the page made its case;
- the image field is now capped at 25rem on wide screens and 19rem on phones, with proportionally tighter internal spacing;
- at the 1707 by 960 review viewport, the fold now includes the 400px image field, ABA's proposition, the challenge statement and the beginning of the problem/response section;
- About retains zero horizontal-overflow or page-title-wrap failures at 320, 375, 768, 1024 and 1440 CSS px after the height change;
- the image and page title remain prominent, but the opening now behaves as part of the page rather than a splash screen.

- the final four-page ABA brochure was re-rendered and inspected as the governing creative source, including its cover image field, challenge/response spread, five-pillar image field, outcomes band, and membership split;
- the brochure-led palette, Archivo/Saira/Lora type roles, labels, page-title treatment, chapter bands, image fields, inset callouts, outcome bands, split composition, square controls, form rules, and footer treatment now live in one shared `brochure-theme` CSS foundation consumed by all eight routes;
- About was reopened after its administrative two-column rows were rejected. It now uses the brochure's original soil and grain images, challenge/response narrative, five named pillars, grounded outcomes, and explicit South Africa/Africa closing split;
- the current whole-site responsive preflight reports zero blocking horizontal-overflow or page-title-wrap failures across 320, 375, 768, 1024, and 1440 CSS px;
- Membership now uses the brochure's final-page green/cream split, while Registration Tracker uses a full green case field with an inset information sheet; the two routes no longer share the same silhouette;
- private member intake now has a compact working-document header and persistent private-data explanation rather than the legacy decorative hero;
- Privacy now uses a restrained cream statement header and shorter public-language headings; its initial mobile no-wrap overflow was found and removed in the responsive runner;
- a shared-stylesheet version bump is present on all eight routes so browser caches cannot retain the half-migrated Tracker state captured during implementation;
- review checkpoint A was reopened after two secondary-page passes were rejected as too repetitive, oversized, sparse, and visually unfinished;
- About has now been rebuilt as a concise institutional account with a direct introduction, one case for ABA, a compact five-row account of the work, a clear South Africa/Africa statement, and membership handoff;
- an earlier Membership pass used a reciprocal exchange model; that layout was subsequently rejected and has been replaced by the latest corrective checkpoint above;
- the rebuilt About and Membership routes were rendered at 320, 375, 768, 1024, 1280, and 1440 CSS px; both have zero horizontal overflow, no hidden main sections, and one-line hero titles at every width;
- the accepted homepage composition remained intact after moving shared shell and typography decisions into the new foundation;
- the active-route header, mobile wordmark/menu state, desktop navigation, and membership-interest action remained legible across the three routes;
- no browser console errors were reported in the final responsive run;
- Home, About, and Membership pass HTML Tidy with custom elements enabled after the rebuild;
- after the first checkpoint was judged too uniform, About and Membership were reworked to reduce display scale, remove repeated dark colour slabs, and replace repeated chunky block grids with route-specific institutional and document-like compositions;
- core route content is now visible by default. Scroll-triggered enhancement can no longer leave blank full-page sections when a capture or reader does not scroll;
- public copy across Home, About, Membership, membership interest, private intake, Technical Network, Registration Tracker and privacy was rewritten after the previous language was rejected as generic AI copy and internal modelling language;
- the brochure now governs public voice as well as visual tone: copy names what ABA is building, where and for whom; uses active declarations and concrete visitor actions; and avoids compressed slogan fragments such as `Biologicals, organised.`;
- the homepage choice section now asks what the visitor wants to do and states the three actions plainly: learn about membership, add a registration to the tracker, or apply to contribute technical expertise;
- the public voice and design corrections are now preserved in `soft-launch/PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`, linked from the agent instructions, handover, plan, design context, source index, decision register, and prototype README;
- `node soft-launch/scripts/public-site-preflight.mjs` now blocks banned public phrases, high-confidence internal-model wording, forced heading breaks, and short paired-slogan headings; the current baseline passes with two reviewed ordinary-language warnings (`relationship` in an ownership/control question and `Professional context` in the expert form);
- `soft-launch/qa/public-site-render-check.html` now renders all eight routes at 320, 375, 768, 1024, and 1440 CSS px; the current baseline has zero blocking page-title or horizontal-overflow failures and reports supporting-heading wraps for deliberate review;

- the full homepage was restructured after the whole-page critique: section numbering and the orange manifesto band were removed, typography tiers were tightened, and repeated brochure-spread compositions were reduced;
- the GitHub Pages root gateway was rendered at desktop and phone widths after the release links were added; its current-release and Archive headings remain on one line and neither page creates horizontal overflow;
- the canonical member application exposed 31–33 px of phone-width overflow in the site-wide runner; the intake title scale and grid-item shrink behaviour were corrected, its form introduction was shortened to `Your organisation`, and the stylesheet cache key was advanced;
- the full-scroll compression pass folds “Not another directory” into the collective-action argument, merges the practical membership offer into the dark membership chapter, and removes the repeated intermediate membership-interest conversion;
- supporting membership headings now use the quieter body face and a smaller scale so the primary propositions retain visual dominance;
- the membership proposition now reads as one reinforcing cycle rather than a ranked list, followed by a concrete member-value section covering collective advocacy, structured engagement, product visibility, and technical/market-development activity;
- membership, tracker participation, and Technical Network entry remain distinct routes with explicit consequences, while the page now ends on the primary membership-interest conversion;
- the founding-member logo grid remains in place as intentional layout scaffolding and must receive approved logos before the public launch;
- the revised homepage was rendered at 320, 375, 768, 1280, 1440 CSS px widths with no horizontal document overflow;
- the hero title remained on one line without clipping at all five widths; measured title widths were 288/320 px at the 320 px viewport, 338/375 px at 375, 645/768 px at 768, 576/742 px in its 1280 px content field, and 648/835 px in its 1440 px content field;
- mobile navigation now changes both `aria-expanded` and its accessible name between `Open navigation` and `Close navigation`;
- all three homepage image instances loaded successfully in the rendered browser check;
- rebuilt homepage style proof inspected after the 2026-07-20 typography/composition correction;
- rebuilt homepage inspected at true 320, 1024, 1280, and 1440 CSS px widths;
- the rebuilt hero remains one line at every tested width, stays inside its content field, and creates no horizontal page overflow;
- the 1024 CSS px layout deliberately retains the stacked hero, while 1280 CSS px and above use the image split only where the title has sufficient width;
- rebuilt homepage headings consistently resolve to Saira Semi Condensed, with Archivo retained for body copy;
- mobile navigation control retains a 48 by 48 CSS px target after flex layout;
- cream-on-forest primary navigation contrast is 11.88:1, and the revised small-text orange against deep green is 7.48:1;
- public home inspected at 1440 CSS px;
- all nine hero variants measured at 1440 CSS px;
- all nine hero variants measured at a true 320 CSS px;
- every measured hero uses `white-space: nowrap`, remains within its content column, and creates no horizontal page overflow;
- mobile navigation opens and reports its expanded state correctly;
- superseded: the earlier founder/invited URL variants and hidden `entry_context` were removed when the application was consolidated into one canonical page;
- public membership-interest empty submission focuses the first invalid field;
- a valid local membership-interest submission hides the form, focuses the confirmation, and shows the correct non-membership outcome;
- all eight HTML files pass HTML Tidy when custom elements are enabled;
- all local HTML, image, stylesheet, and script targets resolve.

## Issues found and corrected during rendered review

1. The first homepage treatment overused a large serif and repeated split-page compositions. The rebuilt style proof now takes its visual grammar from the brochure's imagery, hard fields, labels, rules, structured information, and orange interruptions instead.
2. The rebuilt desktop hero title initially extended into the image field at 1440 CSS px. Its fluid scale and split breakpoint were corrected, then remeasured at four widths.
3. The membership-value heading initially occupied four lines at desktop and competed with the content system. Its copy and display scale were revised to restore a clearer hierarchy.
4. The brochure's exact orange provided only 3.84:1 contrast against deep green. It remains a graphic accent; a lighter companion orange is now used wherever small text sits on the colour.
5. The mobile menu control could shrink below its intended size beside the wordmark. It now has a fixed 48 CSS px flex basis.
6. Checkbox inputs inherited full-width text-field rules inside form groups, forcing mobile horizontal overflow. Checkbox sizing and flex behaviour were corrected and all routes were rechecked.
7. The longest original mobile hero could expand its grid item beyond the page before being clipped. Hero content now permits shrinkage and the fluid minimum was corrected; the longest title fits within 288 CSS px of content at the 320 CSS px viewport.
8. The global balanced-heading rule could override the homepage hero's no-wrap rule because of selector specificity. The hero now has an explicit higher-specificity no-wrap rule and was rechecked in the rendered page.
9. The shared navigation text rule initially overrode the light text on the dark header action for the newly migrated pages. The component selector was corrected and the action was re-rendered on Home, About, and Membership.
10. The initial shared treatment made Home, About, and Membership feel like the same page through repeated oversized condensed type, large colour fields, and block-based section rhythm. The secondary-page system now limits condensed display type to page identity, uses Archivo for supporting headings, reduces the scale, and gives About and Membership distinct composition and density.
11. The second pass still retained the same sparse two-column skeleton and hid section content behind scroll-triggered reveals. About and Membership were rebuilt from route-specific information structures, homepage layout styles were isolated, and core content now renders visible without JavaScript or intersection events.
12. The initial public copy translated the internal system model into abstract website language. Terms such as `relationship`, `route`, `context`, `operating system`, `coherent record`, and paired abstractions were replaced with plain descriptions of what ABA does, what the visitor can do, and what happens next.
13. A later copy pass reintroduced synthetic stacked fragments (`Useful work. Honest limits.`, `Five practical jobs.`, and `Africa-wide ambition. Starting in South Africa.`) and the About page still used a sparse radial infographic. The fragments and the word `ambition` were removed from the public prototype, the diagram was replaced with a compact indexed list, section spacing was tightened, and every About heading was verified on one line at desktop and mobile widths.
14. Copy and design corrections previously depended on conversational memory. The new canonical guardrail, static preflight, responsive render check, agent instructions, decision entry, and handover gate make the rules discoverable and testable by future agents and developers.
15. The later About correction applied brochure cues as a page-specific treatment while leaving the shared visual source ambiguous. The brochure now governs the shared CSS foundation for every route; route-specific CSS is limited to composition required by that page's job.

## Remaining before G3 approval

- replace the four founding-member logo placeholders with approved member logos before public launch;
- confirm the final public wording and operating boundaries for structured member engagement, product visibility, and technical/market-development activity;
- Jen's checkpoint A approval or correction of the rebuilt About and Membership compositions before the next page family is migrated;
- final visual approval of the tracker orientation, public capture, private intake, and privacy/trust routes after the brochure-led migration;
- review and resolve the responsive check's supporting-heading warnings during each page-family pass; warnings must not be ignored merely because they are non-blocking;
- keyboard-only end-to-end review across every route;
- explicit capture-route duplicate, recoverable failure, and unavailable reference states;
- Technical Network validation and outcome interaction check;
- focused accessibility review, including reduced motion and screen-reader wording;
- scenario review from tracker participant and ABA operator perspectives;
- final tracker destination/shell details after Lyle's handover.
