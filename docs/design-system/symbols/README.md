# ABA Symbol Family — icon assets

The 20 institutional symbols from the ABA Symbol Family, extracted as individual
icon assets and **reconciled onto the live brand palette**.

> **These symbols predate the final ABA logo.** They are supplementary *iconography*
> for the design system — not an alternative identity. The live logo (the ABA roundel)
> is unchanged and remains the mark; the symbols are only used as section/nav/list icons.

- **`*.svg`** — glyph alone (no field-mark contour ground), using `currentColor`.
  Best for UI/nav/section icons. Tint via CSS `color:` **only when the SVG is inlined**
  (inline `<svg>`, an SVG sprite `<use>`, or `mask-image`) — verified working on light
  and dark. Referenced as `<img src>` it ignores page `color` and renders its default,
  live `--green-deep` `#15322f`.
- **`png/*.svg` → `png/*.png`** — 512×512 transparent PNG in live green, for slides/docs.
- Source design: [`../symbol-family.html`](../symbol-family.html) (faithful record, designed palette).
- Naming follows the design: `aba-symbol-<name>`.

| Symbol | Asset id |
|---|---|
| Registration Tracker | `aba-symbol-registration-tracker` |
| Biologicals Explorer | `aba-symbol-biologicals-explorer` |
| Membership | `aba-symbol-membership` |
| Technical Network | `aba-symbol-technical-network` |
| Updates | `aba-symbol-updates` |
| Advocacy | `aba-symbol-advocacy` |
| Visibility | `aba-symbol-visibility` |
| Credibility | `aba-symbol-credibility` |
| Growth | `aba-symbol-growth` |
| Biological Transition | `aba-symbol-biological-transition` |
| Institutional Voice | `aba-symbol-institutional-voice` |
| Shared Signal | `aba-symbol-shared-signal` |
| Governance & Data | `aba-symbol-governance-data` |
| Market Access | `aba-symbol-market-access` |
| Regulatory Intelligence | `aba-symbol-regulatory-intelligence` |
| Africa-wide Participation | `aba-symbol-africa-wide-participation` |
| South Africa Active Now | `aba-symbol-south-africa-active` |
| Local Manufacturing | `aba-symbol-local-manufacturing` |
| Evidence / Knowledge | `aba-symbol-evidence-knowledge` |
| Sector Legitimacy | `aba-symbol-sector-legitimacy` |
