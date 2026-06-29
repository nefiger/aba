# Handover Note — ABA Prototype

Last updated: 2026-06-29

---

## Current state

The prototype is in good shape as a connected demo suite. Two PRs are currently in flight:

- **[PR #7](https://github.com/nefiger/aba/pull/7)** `fix/remove-catalogue-evidence-hero-sections` — removes the large intro/shortcut-card blocks from product-catalogue.html and evidence-library.html. Awaiting review.

Branch `feature/data-expansion-ux` (PR #6) has been merged into main.

The latest prototype-as-spec pass added a stronger public-page consistency layer and new supporting requirements notes:

- `docs/requirements/aba-prototype-system-model.md`
- `docs/requirements/aba-release-snapshot-readiness.md`
- `docs/requirements/aba-prototype-foundation-and-design-system-notes.md`
- `docs/requirements/aba-prototype-consistency-checklist.md`
- `docs/requirements/aba-content-taxonomy-and-semantic-visual-language.md`
- `docs/requirements/aba-visual-language-conventions.md`

Public and role-based prototype updates now include:

- stronger membership post-submit and handoff states
- a clearer workspace gateway plus integrated operator workspace
- tracker landing-page framing that better connects public site, member workspace, and operator/export handling
- richer secondary public pages for `Technical Network` and `Updates`
- wider nav consistency across the public ABA site

The founding-members demo happened on 2026-06-25. Follow-up notes from both the demo and the internal debrief are now captured in:

- `docs/requirements/aba-founding-members-demo-and-debrief-notes.md`

That note is now the best source for:
- what the group reacted to positively
- what shifted from "demo" into real product-spec thinking
- the July sequencing around copy, intake, governance, and first-cohort testing

### Registration tracker linked-page polish

Branch `codex/registration-linked-pages-polish` has completed the first two slices of the downstream registration-tracker page cleanup:

- public-linked tracker screens now use a contained tracker nav: Tracker overview, Add product data, Sector signals, Company workspace
- `Combined`, `Admin Review`, and `Registrar Export` are no longer exposed from the three pages linked by `docs/registration-tracker/index.html`
- `registration-tracker/intake-flow/index.html` now reads as a public product-record submission surface instead of a low-fidelity internal flow
- browser checks passed for the intake page at desktop and mobile widths, with no horizontal overflow

Remaining slices for the next session:

- Slice 3: align `registration-tracker/public-dashboard/index.html` with the landing-page "Sector signals" promise, remove disposable/demo framing, and reduce hierarchy confusion without making canonical label changes
- Slice 4: polish `registration-tracker/company-dashboard/index.html` as a member-facing company workspace, reduce internal/admin phrasing, and preserve the private/member boundary
- After visual review, discuss canonical labels before touching Knowledge Hub / Biologicals Explorer / Product Catalogue / Regulatory Signals naming
- Continue the consistency pass across remaining secondary/public pages and any tracker-linked pages that still feel older or thinner than the newer shell

---

## What was completed in the last session

### Biologicals Explorer data expansion
- Crops: 6 → 22 contexts (added sugarcane, macadamia, cucurbits, cotton, blueberries, cut flowers, and more)
- Pests: 6 → 20 patterns (added fall armyworm, fruit fly, botrytis, Fusarium wilt, scale insects, cutworm, diamondback moth, and more)
- New SVG icons (all CC-BY licensed via bioicons.com): strawberry, cabbage, pear, pepper, eggplant, fruit-fly, corn, green-beans, kiwi, lemon, raspberry

### UX cross-links
Every explorer card now has a contextual CTA:
- Crop cards → "Browse products for [Crop] →" links to `product-catalogue.html?crop=X`
- Pest cards → "Find biological solutions →" links to `product-catalogue.html?pressure=X`
- Product catalogue reads `?pressure=` and `?crop=` URL params on init to pre-filter

### Bug fixes
- Evidence library shortcut cards were setting `activeView` but `filteredRecords` filters on `activeType` — now unified, shortcuts actually filter
- `cropIcon()` and `pressureIcon()` functions extended to cover all new crops/pests

### Copy and cleanup
- "Knowledge Hub" renamed "Biologicals Explorer" site-wide (12 files)
- All public-facing pages reviewed: removed internal editorial bleed, rewrote value propositions and storytelling across site, about, membership, registration tracker, standards, resource library pages
- Hero sections removed from product catalogue and evidence library (pending PR #7)

Full session notes: `docs/requirements/biologicals-explorer-data-expansion-ux-notes.md`

---

## What's still open

### Prototype-as-spec and visual consistency

- The public site now has clearer shared-shell conventions, but some deeper pages still need a second-pass visual and IA review
- `registration-tracker/public-dashboard/index.html` remains the most obvious candidate for a stronger semantic signals treatment
- `registration-tracker/company-dashboard/index.html` should continue moving from "demo page" language toward a credible member workspace feel
- Visual assets, imagery, and iconography still need a more intentional pass once the page architecture settles further
- A full design system is still intentionally deferred; the current requirement is disciplined consistency, not component-library implementation

### July follow-through after the founding-members demo

- Copy still needs an owner pass and cleanup before the next share-out
- The first realistic target is now a combined membership-plus-product-intake flow for testing
- Anoushka feedback on intake fields should inform the next form/data-model pass
- Admin/backend and member-workspace thinking now needs to move from implied to explicit
- Governance setup should run in parallel with product work rather than being deferred
- The database / explorer remains valuable, but is not the immediate launch gate

### Data
- Product catalogue is still at 23 products — doesn't fully reflect the 22 crop / 20 pest surface yet. Good candidates to add: more Trichoderma and Bt product variants, semiochemical examples, inoculant lines for sugarcane and soy
- Some new crops (sugarcane, macadamia, cut flowers) have no matching products visible in the catalogue

### UX
- No "See pests affecting this crop" cross-link from crop cards to the explorer pest view — the reverse direction (pest → products) works, crop → pest doesn't exist yet
- No empty-state handling if a filter returns zero cards
- Subnav "Signal Dashboard" link goes to a sparse page — needs content or should link elsewhere

### Registration tracker
- Standalone presenter page is clean; not yet integrated into the member-facing site flow

---

## Key files to know

| File | What it is |
|------|------------|
| `docs/index.html` | Demo hub — entry point for presentations |
| `docs/database/index.html` | Biologicals Explorer (Alpine.js, main data app) |
| `docs/database/product-catalogue.html` | Product catalogue with filters |
| `docs/database/evidence-library.html` | Evidence records library |
| `docs/site/index.html` | Public homepage |
| `docs/site/about.html` | About ABA |
| `docs/membership-flow/index.html` | Membership application flow |
| `docs/registration-tracker/index.html` | Registration tracker presenter page |
| `docs/database/assets/bioicons/ATTRIBUTION.md` | SVG icon licence attribution |
| `docs/requirements/` | Working notes, specs, and session notes |
| `AGENTS.md` | Repo working rules for agents |

---

## Workflow notes

- The user reviews and merges PRs, then deletes branches. Always check PR/branch state with `gh pr list` before pushing to an existing branch — don't assume a branch is still open.
- New work goes on a fresh branch; never push directly to main.
- Internal session notes go in `docs/requirements/` as `<topic>-notes.md`.
- This HANDOVER.md should be updated at the end of each session.
