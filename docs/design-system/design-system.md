# ABA Design System

A design system **extracted from the live ABA prototype** — the canonical values are
taken from the umbrella homepage (`docs/site/index.html`) and the shared shell
(`docs/site/assets/public-shell.css`).

## Intended use — this is a build spec, not a prototype refactor

> **This design system is a specification for the proper ABA build in the monorepo.**
> It is deliberately **not** wired into these prototype HTML pages. The prototype's job
> was to discover and prove the product, IA, copy, and visual language; this document
> captures the resulting **visual/interaction language** so the production
> implementation can be built from an agreed baseline rather than reverse-engineered
> page by page.
>
> It is one half of the handoff. The other half is the **data model that is emerging
> from the same prototype** — see [`registration-tracker/data-model-v1.md`](../../registration-tracker/data-model-v1.md)
> and the related governing specs in `registration-tracker/` and `docs/requirements/`.
> Together, **design system + data model = the spec the monorepo build works from.**
>
> Consequently, the drift documented in §6 is **not a prototype clean-up backlog** — it
> is context for the build (which values are canonical, and how the prototype's variants
> reconcile onto them). Do not spend effort retrofitting `tokens.css` into these pages.

- **Tokens:** [`tokens.css`](./tokens.css) holds the canonical values to seed the
  production token system (CSS vars / Tailwind theme / tokens package).
- **Generated:** 2026-07-11 (re-verify against the prototype if it changes before build).

---

## 1. Brand foundations

**Mark.** A deep-green circular roundel with an olive Africa silhouette and a white
`ABA` wordmark. The wordmark uses a geometric, crossbar-less **peak-A** letterform
(Poiret One / Futura-adjacent). The roundel is the primary mark; it sits top-left in
the shared header at 66px (58px on narrow screens). Asset:
`docs/site/assets/aba-mark-roundel.png`. Favicon: `favicon-192.png` from the same art.

**Positioning.** Africa-wide alliance, South Africa as the current operating base.
Keep the continental framing — do not narrow the brand to South Africa.

**Voice.** Calm, credible, public-facing. Institutional but warm and grounded — not
corporate-slick, not activist. No prototype/meta narration in user-facing copy.

---

## 2. Color

Canonical palette (warm-sand, forest-and-olive greens with earth accents). Values
live in `tokens.css`; roles below.

### Core

| Token | Value | Role |
|---|---|---|
| `--green-deep` | `#15322f` | **Primary brand.** Primary buttons, roundel, dark route panels, key headings-on-light |
| `--green` | `#5a6b3a` | **Secondary.** Africa silhouette, olive accents, active states, soft tints |
| `--ink` | `#203b44` | Headings and body text |
| `--muted` | `rgba(32,59,68,0.74)` | Secondary/supporting text (use at ≥14px) |
| `--on-primary` | `#f7f7f2` | Text/icons on `--green-deep` |

### Surfaces

| Token | Value | Role |
|---|---|---|
| `--page` | `#f3eee1` | Page background (warm sand) |
| `--page-deep` | `#ebe3d3` | Deeper sand for section banding |
| `--surface` | `rgba(251,247,239,0.9)` | Translucent cream card |
| `--surface-strong` | `rgba(255,252,246,0.94)` | Higher-contrast card |
| `--sand` | `#f3f1e8` | Opaque sand panel |
| `--line` | `rgba(35,59,68,0.12)` | Hairline borders |

### Accents & status

Accents are used **sparingly** — for chips, route cards, dashboard signals, and small
graphic moments, not for large fields of color.

| Token | Value | Role | Status alias |
|---|---|---|---|
| `--gold-deep` | `#c89b2c` | Gold highlight, graphic fills | `--status-waiting` (waiting/caution) |
| `--clay-deep` | `#b24a32` | Terracotta accent | `--status-alert` (exceeded/blocked) |
| `--teal-deep` | `#235344` | Teal info accent | `--status-info` (neutral) |
| `--green` | `#5a6b3a` | — | `--status-ok` (on track) |

Soft tints (`--green-soft`, `--gold-soft`, `--clay-soft`, `--teal-soft`) are ~8–12%
opacity versions for chip/card backgrounds.

### Contrast notes

- `--ink` / `--green-deep` on `--page` or any surface — strong contrast, passes AA.
- `--on-primary` on `--green-deep` — very strong, passes AAA.
- `--muted` — verify at small sizes; intended for ≥14px secondary text.
- **`--gold-deep` is a fill/graphic color, not a text color** on light backgrounds
  (too low contrast for body text). Use `--clay-deep` or `--green-deep` for accent text.

---

## 3. Typography

**Family:** `--font-sans` = `"Public Sans", system-ui, sans-serif` (weights 400–900,
loaded from Google Fonts). The peak-A logo lettering (Poiret One) is **logo-only** —
never use it for UI text.

**Display scale** (fluid `clamp`, from the homepage):

| Level | Size | Weight | Tracking / leading |
|---|---|---|---|
| H1 (hero) | `clamp(2.2rem, 3.2vw, 3.5rem)` | 900 | `-0.045em`, line-height `0.94` |
| H2 (section) | `clamp(1.7rem, 2.15vw, 2.35rem)` | 800–900 | tight negative tracking |
| H3 (card) | `~1.3–1.55rem` | 800 | `-0.02em` |
| Lead paragraph | `clamp(1.02rem, 0.96rem + 0.24vw, 1.14rem)` | 400 | line-height `1.6`, `--muted` |
| Body | `0.9–1rem` | 400 | line-height `~1.6` |
| Eyebrow / label | `11px` | 900 | `0.16–0.18em`, UPPERCASE |

**Rule (from AGENTS.md):** never set `max-width` on headings. If a heading wraps
badly, fix copy length, size, or layout width — not a narrow measure.

---

## 4. Spacing, radius, elevation

**Spacing scale:** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 72` px
(`--space-2xs … --space-3xl`).

**Radius:** buttons `--radius-sm` 12px · inner cards `--radius-lg` 20px ·
outer surfaces `--radius-xl` 28px · pills/chips `--radius-pill` 999px.

**Elevation:** soft, long, low-opacity.
- Resting: `--shadow` = `0 26px 54px -42px rgba(21,50,47,0.28)`
- Hover: `--shadow-hover` = `0 16px 28px -24px rgba(23,48,57,0.22)`

---

## 5. Components

Specs below are the built values (canonical: homepage + `public-shell.css`).

### Button
- Base: `inline-flex`, `min-height: 48px`, `padding: 0 18px`, `border-radius: 12px`,
  `font-size: 0.8rem`, `font-weight: 900`, `letter-spacing: 0.06em`, UPPERCASE.
- **Primary:** background `--green-deep`, text `--on-primary`.
- **Secondary:** translucent cream background, `1px` `--line` border, text `--ink`.
- Hover: add `--shadow-hover`. Transitions ~180ms.

### Navigation (shared shell)
- Links: `0.9rem`, weight `750`, color = `--ink` lightened ~16%.
- Active link: 2px underline in brand green (`::after`), plus `.active`.
- Nav lives in the full-width header; inner content aligns to the reading width.

### Eyebrow / label
- Pill: `min-height 32px`, `padding 0 12px`, `--radius-pill`, background
  `rgba(21,50,47,0.08)`, `1px` border `rgba(21,50,47,0.12)`, text `--green-deep`,
  `11px`, weight 900, `0.18em`, UPPERCASE. (Bare labels drop the pill.)

### Surface / card
- Background `--surface`, `1px` border `rgba(73,95,82,0.12)`, `--radius-xl`,
  `--shadow`, `backdrop-filter: blur(12px)`. Inner cards use `--radius-lg`.

### Pill / chip
- Fully rounded (`--radius-pill`), soft tint background, hairline border, small
  weight-700 label. Used for filters, tags, micro-stats.

### Stat / micro-stat
- Compact pill or card: large weight-800 value in `--ink` + small uppercase muted
  label. Dashboard tiles use the status colors for emphasis.

### Form field
- Label: small, weight 700–800. Input: `--font-sans`, hairline border, generous
  padding, large radius. Grouped by numbered steps (see the tracker intake flow).

### Header shell (`.topbar`)
- Full-width chrome; inner content aligned to the reading width. Generated by
  `public-shell.js`: roundel mark (66/58px) + brand line + support line on the left,
  primary nav on the right. Do not re-implement per page — it is shared.

### Footer shell (`.site-footer`)
- Full-width; three blocks (Brand · Explore · Governance & Data) plus a closing
  line and copyright. Also generated by `public-shell.js`.

### Route / decision panel (dark)
- Dark green panel (`--green-deep` gradient) with light text, containing tinted
  route cards. Used on the homepage and tracker overview to present the 3 entry
  points / 5 tracker paths.

### Iconography — the Symbol Family
A set of **20 institutional symbols** for section, nav, list, and route iconography.
Assets and manifest: [`symbols/`](./symbols/) (SVG + transparent PNG); the faithful
source gallery is [`symbol-family.html`](./symbol-family.html).

- **These symbols predate the final ABA logo and do not replace it.** The ABA roundel
  remains the mark; the symbols are supplementary iconography only.
- **Reconciled to brand:** the extracted SVGs use `currentColor` and default to
  `--green-deep` `#15322f`. Tint by setting CSS `color:` — **but only when the SVG is
  inlined** (inline `<svg>`, sprite `<use>`, or `mask-image`). As `<img>`/PNG they use
  the default green.
- **Style:** drawn from the monogram's curved-contour grammar — rounded-end strokes,
  circular nodes, soft arcs; geometric but organic. The source gallery also shows each
  glyph over a three-line "field-mark" contour ground; for UI use, prefer the
  **glyph-alone** icon assets in `symbols/`.
- **Natural mapping to the prototype** (the symbol names line up with real surfaces):

  | Symbol | Surface |
  |---|---|
  | Registration Tracker, Biologicals Explorer, Membership, Technical Network, Updates | the five nav destinations / homepage route cards |
  | Advocacy, Visibility, Credibility, Growth | homepage "system conditions" cards |
  | Governance & Data, Market Access, Regulatory Intelligence, Africa-wide Participation, South Africa Active Now, Local Manufacturing, Evidence / Knowledge, Sector Legitimacy | supporting section/list icons |

---

## 6. Prototype drift (reference for the build)

In the prototype the palette exists in **three dialects**. This is recorded so the
build knows which values are canonical and how the variants reconcile — **not** as a
prototype clean-up task (see Intended use).

| Dialect | Where | Example divergence | Resolves to |
|---|---|---|---|
| **Canonical** (warm sand, hex/rgba) | homepage, intake-flow, `public-shell.css` | `--green #5a6b3a`, `--green-deep #15322f`, `--ink #203b44` | — (this is the target) |
| **oklch** | about, governance, membership, database index, thuricide | `--green oklch(0.48 0.09 156)` (cooler/brighter), `--ink oklch(0.26 0.04 204)`; adds `--amber/--red/--teal` for data | canonical greens; amber→gold, red→clay, teal→teal |
| **`#2b6b4f` hex** | about (older), standards-regulations | `--green #2b6b4f`, `--ink #173039`, `--amber #f0b429` | canonical greens; amber→gold |

`tokens.css` records these reconciliations as **compatibility aliases**
(`--amber → --gold-deep`, `--red → --clay-deep`, `--paper → --surface`,
`--accent → --green`, etc.). For the production build, treat the canonical column as
the design tokens and drop the aliases — they exist only to explain the prototype.

**Build note — data colors.** The prototype's `--amber` / `--red` were slightly hotter
than brand. The system folds them onto brand gold/clay for the dashboards. If the
production dashboards need a hotter alert red for "exceeds statutory clock," add it as a
deliberate, documented status extension rather than reintroducing an off-brand red.

---

## 7. Feeding the monorepo build

- **Tokens →** seed the production token layer (CSS custom properties, a Tailwind
  `theme.extend`, or a design-tokens package) from `tokens.css`'s canonical values and
  the roles in §2–§4. Keep the role-oriented naming.
- **Components →** §5 specs (button, nav, eyebrow, card, pill, stat, form, header/footer
  shell, dark route panel) are the baseline for the production component library.
- **Copy →** [`docs/requirements/aba-public-site-copy-working-document.md`](../requirements/aba-public-site-copy-working-document.md)
  is the extracted copy for the same surfaces.
- **Data model →** [`registration-tracker/data-model-v1.md`](../../registration-tracker/data-model-v1.md)
  and the governing specs in `registration-tracker/`. The design system and the data
  model are the paired inputs to the build.

---

## 8. Do / don't

- **Do** keep the roundel paired with the brand line in the shared header only.
- **Do** use accents sparingly and prefer `--green-deep` / `--ink` for text.
- **Do** keep the continental framing (Africa-wide, SA current base).
- **Don't** introduce new greens or a second sans-serif — converge on the tokens.
- **Don't** set `max-width` on headings.
- **Don't** put gold text on light backgrounds (contrast); gold is a fill/graphic color.
