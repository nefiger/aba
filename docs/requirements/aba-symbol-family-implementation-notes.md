# ABA Symbol Family Implementation Notes

Last updated: 2026-07-04

## Current implementation status

The public site now uses a first implemented ABA symbol family drawn from:

- the stronger route and systems symbols from the earlier next-round family
- the corrected six-symbol refinement pass for:
  - `Advocacy`
  - `Visibility`
  - `Credibility`
  - `Institutional Voice`
  - `Evidence / Knowledge`
  - `Sector Legitimacy`

Implemented asset location:

- `docs/site/assets/symbols/`

Current public-page usage includes:

- homepage route-entry symbols
- homepage hero support symbols
- homepage advocacy / visibility / credibility / growth system section
- about-page capability cards
- technical-network page support symbols
- updates page support symbols

## Current user feedback on this implementation pass

This implementation pass should be treated as an unsatisfactory first deployment, not an accepted visual direction.

Main objections from review:

- the small symbol treatment feels cramped and diminished
- the white badge / blob background weakens the symbols rather than supporting them
- symbol size is too timid in key homepage placements
- symbol usage is still too sparse across the site
- the heavily cropped route-1 background field-mark fragments feel random rather than intentional

The current build is therefore useful as:

- an asset-wiring pass
- a placement experiment
- a repo checkpoint

It is not yet the right visual-system execution.

## Scale guidance

The symbols should not be used at one fixed size everywhere.

Current working scale tiers:

- small:
  support badges, compact route references, inline explanatory use
  around `42px`
- medium:
  primary route cards, system pillars, secondary page cards
  around `54px`
- large:
  hero-side support panels or major section anchors
  around `66px`

The direction of variable scale is still correct, but the current execution is too small and too padded in several important placements.

Next pass should assume:

- fewer tiny uses
- fewer enclosed white badges
- more direct symbol placement into layouts
- larger symbol presence where ABA is making a major conceptual point
- some sections should use symbol-plus-pattern or symbol-plus-layout treatment rather than badge-plus-label treatment

## Immediate UI fixes for the next pass

### 1. Remove the white blob treatment

- stop using small white rounded containers as the default symbol presentation
- prefer direct placement on tinted cards, inline layouts, or open background space
- only use enclosed containers where a strong compositional reason exists

### 2. Increase symbol presence

- enlarge key homepage symbols substantially
- route-entry symbols should feel like real route identifiers, not small decorative stamps
- hero support symbols and homepage proposition symbols should carry more visual weight

### 3. Use the family more systematically

- extend symbol use further across:
  - homepage sections below the fold
  - about page
  - technical network page
  - updates page
  - governance and data page
- create repeated, recognisable pairings between concepts and symbols

### 4. Rework route-1 field-mark usage

- stop using arbitrary cropped field-mark corners or squeezed fragments
- if the field-mark is used decoratively, it should feel deliberate, scaled, and compositionally anchored
- use fewer but better placements

## Symbols that are working well enough to use now

- `Registration Tracker`
- `Biologicals Explorer`
- `Membership / Join ABA`
- `Technical Network`
- `Updates / Stay Informed`
- `Growth`
- `Biological Transition`
- `Shared Signal`
- `Institutional Voice`
- `Visibility`
- `Credibility`

## Symbols that should still get another refinement pass

### Advocacy

Current issue:
- cleaner than the earlier version, but still somewhat abstract
- can read as conduit, gateway, or channel rather than organised representation

Desired direction:
- more clearly express organised voice, representation, or sector-facing stance
- stay geometric and ABA-native
- avoid cliché megaphone, speech bubble, or protest icon logic

### Evidence / Knowledge

Current issue:
- improved discipline, but still not fully convincing as structured proof or usable knowledge
- the current diagonal line risks reading as interruption or cancellation

Desired direction:
- stronger sense of ordered reference, layered evidence, or verified knowledge
- should feel easier to associate with explorer content, standards, or proof

### Sector Legitimacy

Current issue:
- improved, but semantically close to `Credibility`
- both currently sit in a similar formal-trust / certification zone

Desired direction:
- preserve institutional seriousness
- separate `Sector Legitimacy` from `Credibility`
- legitimacy should feel more like recognised standing, standing in the sector, or formal presence
- credibility should remain closer to verification, trustworthiness, and standards

## Practical rule

Do not block implementation waiting for perfect symbol finalisation.

The family is now strong enough to use as a system prototype, while the three weaker concepts above can still be refined in later art passes.
