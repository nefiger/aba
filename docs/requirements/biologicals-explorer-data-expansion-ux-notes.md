# Biologicals Explorer — Data Expansion & UX Notes

Work completed on branch `feature/data-expansion-ux`. Documents what changed, why, and what's still open.

---

## Session summary

Two sessions focused on:
1. Getting the explorer into a clean, user-facing state (copy, icons, no editorial bleed)
2. Expanding data depth
3. Adding UX cross-links so users can actually navigate from explorer cards to products and evidence

---

## What changed

### Site-wide rename
"Knowledge Hub" renamed to "Biologicals Explorer" across all 12 HTML files. The public name is now consistent everywhere.

### Copy pass (all public-facing pages)
All pages reviewed and rewritten for external audience:
- `docs/site/index.html` — H1, lede, value cards, CTAs
- `docs/site/about.html` — problem/solution framing, "How ABA helps" section
- `docs/membership-flow/index.html` — founding membership framing, member value section
- `docs/registration-tracker/index.html` — stripped internal editorial notes, replaced with real copy
- `docs/database/standards-regulations.html` — added regulatory fragmentation context
- `docs/database/resource-library.html` — replaced placeholder copy

### Biologicals Explorer card cleanup
- Removed `.meaning-strip` div (was rendering "What stands out: " instructional text on every card)
- Removed all `meaningLead` fields from Alpine data
- Fixed `.crop-chip img` missing size constraint (was causing full-size botanical SVGs to render in chips)

### Data expansion

**Crops** — expanded from 6 → 22 contexts:
Added: soybeans, wheat, avocados, brassicas, peppers, groundnuts, mango, pears, strawberries, onions, sugarcane, macadamia, cucurbits, cotton, blueberries, cut flowers

**Pests & Diseases** — expanded from 6 → 20 patterns:
Added: fall armyworm, whitefly, botrytis, false codling moth, Phytophthora, spider mites, mealybug, diamondback moth, Fusarium wilt, grey leaf spot, scale insects, fruit fly (Ceratitis), cutworm

### New SVG icon assets (all CC-BY-3.0 Servier via bioicons.com)
Added to `docs/database/assets/bioicons/`:
- `strawberry.svg`, `lemon.svg`, `cabbage.svg`, `raspberry.svg`
- `fruit-fly.svg` (fruitfly_drosophila-yellow)
- `corn.svg`, `green-beans.svg`, `eggplant.svg`, `kiwi.svg`

Full attribution in `docs/database/assets/bioicons/ATTRIBUTION.md`.

### Icon mapping improvements
`cropIcon()` function expanded to cover:
- strawberries → strawberry.svg
- brassicas/cabbage/broccoli → cabbage.svg
- pears → pear.svg (was using generic apple tree SVG)
- peaches/apricots/stone fruit → peach.svg
- peppers → pepper.svg (was using tomato.svg)
- cucurbits → eggplant.svg
- groundnuts → beans.svg
- sugarcane, cotton, sunflower → inline SVGs

`pressureIcon()` function expanded to cover:
- fruit fly / Ceratitis / Drosophila → fruit-fly.svg
- whitefly → inline SVG
- spider mites → inline SVG
- botrytis / grey mould → inline SVG
- scale insects → inline SVG
- Fusarium / wilt / Pythium / Phytophthora → inline SVG
- cutworm / armyworm / caterpillar → moth.svg
- mealybug → inline SVG
- diamondback moth / false codling moth → moth.svg

### UX: Card-level cross-links
Every explorer card now has a contextual CTA at the bottom:
- **Crop cards** → "Browse products for [Crop] →" — links to `product-catalogue.html?crop=Citrus`
- **Pest cards** → "Find biological solutions →" — links to `product-catalogue.html?pressure=African+bollworm`
- **Product cards** → "View in full catalogue →" — links to `product-catalogue.html`

CSS: `.card-cta` + `.card-cta-link` classes added in explorer stylesheet.

### UX: Product catalogue URL param pre-filtering
`product-catalogue.html` `init()` now reads:
- `?crop=` → sets `activeCrop` (existing, already worked)
- `?pressure=` → sets `searchQuery` (new — enables pest card links to pre-filter catalogue)
- `?category=` → sets `activeCategory` (existing)
- `?q=` → sets `searchQuery` (existing)

### Bug fix: Evidence library shortcut cards
Shortcut cards were setting `activeView` but `filteredRecords` filters on `activeType`. The two states were disconnected — clicking a shortcut had no visible effect.

Fixed by changing all three shortcut card bindings from `activeView` to `activeType`:
```html
<!-- before -->
:class="{ active: activeView === 'trial' }" @click="activeView = 'trial'"

<!-- after -->
:class="{ active: activeType === 'trial' }" @click="activeType = 'trial'"
```

---

## What's still open

### Data
- Product catalogue is still at 23 products — could add another round of named products (Bt products, Trichoderma lines, semiochemical examples) to match the expanded crop/pest surface
- Some new crops don't yet have matching product records visible in the catalogue (sugarcane, macadamia, cut flowers)

### UX
- Crop chips on pest cards already link to `product-catalogue.html?crop=X` but the most visible cross-linking gap is now between crops and their associated pest cards — no "See pests affecting this crop" view exists yet
- The explorer has no empty-state handling if a filter returns zero cards
- Subnav "SIGNAL DASHBOARD" link goes to `registration-signals.html` which is sparse — could expand

### Registration tracker
- Not yet integrated into the member-facing site flow; presenter page is clean but standalone

---

## Key design decisions

**Why CTAs on cards rather than card-level expand/detail panels?**
Cards already show the key signal. The user need is navigation — "now what do I do with this?" — not more detail on the same card. A CTA link is faster and lower-friction than a slide-in panel for a prototype at this stage.

**Why `?pressure=` maps to `searchQuery` rather than a dedicated filter state?**
The product catalogue doesn't have a pressure-axis filter (it filters by category and by crop). Injecting the pressure name into the search query is pragmatic — it works, it's two lines of code, and it keeps the catalogue's filter model simple. A dedicated pressure filter axis would be the right call if the catalogue grows to 50+ products.

**Why `activeType` not `activeView` in evidence library?**
`activeView` is a UI concept (which shortcut card is visually active). `activeType` is the filter state that `filteredRecords` actually reads. The original code conflated them. The fix aligns the shortcut card interaction with the actual filter mechanism.
