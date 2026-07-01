# ABA Public Brand And Footer Spec

Last updated: 2026-07-01

Purpose:
- standardise the public ABA brand lockup across pages
- define the shared footer as part of the prototype spec
- make governance and data-handling surfaces explicit in the public information architecture

This is a prototype-as-spec note.
It does not claim final legal drafting is complete.
It defines the surfaces, placement, and content responsibilities the product now needs.

## 1. Canonical public brand lockup

All public ABA pages should use the same topbar brand treatment:

- left-aligned ABA roundel / mark
- organisation name:
  `African Biologicals Alliance`
- shared tagline:
  `Collective voice, regulatory visibility, and stronger market conditions for African biologicals.`

The lockup should stay stable across:
- `docs/site/`
- `docs/membership-flow/`
- `docs/database/`
- future public capture routes that sit in the same family

It should not drift page by page into:
- alternate taglines
- internal descriptors
- route-specific slogans in the brand area

Route-specific meaning belongs in the page hero, not in the brand lockup.

## 2. Logo placement rule

Primary placement:
- top-left in the public header

Usage rule:
- the ABA mark should anchor orientation, not act like a decorative badge
- the mark and the text lockup should remain paired
- public pages should not invent secondary logo placements unless a page has a very specific communications reason

Do not:
- move the mark into the page body as a substitute for hierarchy
- duplicate the mark in hero panels and footer callouts without reason
- vary brand alignment between otherwise related public pages

Header shell rule:
- the public header should run full width across the page
- the content inside it should still align to the standard ABA reading width
- it should read as shared site chrome, not as another bordered card floating inside the page

## 3. Footer purpose

The shared public footer should do four jobs:

1. reinforce who ABA is
2. give stable access to the main public destinations
3. expose governance and data-handling surfaces
4. close the page with trust and accountability rather than another oversized CTA

The footer is not:
- a second hero
- a launchpad duplicating the left-to-right primary navigation
- a place for repo narration or prototype explanation

## 4. Footer structure

The shared footer should contain three content blocks plus one closing line.

Layout rule:
- the footer should run full width across the page
- its internal content should align to the same reading width as the rest of the page
- it should not appear as a separate boxed CTA card at the bottom of each page

### Brand block

Required content:
- `African Biologicals Alliance`
- short mission line:
  `Collective voice for African biologicals.`
- canonical tagline
- one operational scope line clarifying:
  South Africa is the current operating base, while participation and intelligence are Africa-wide

### Explore block

Required public links:
- `About ABA`
- `Membership`
- `Biologicals Explorer`
- `Track Registrations`
- `Updates`

These are navigational utilities, not promotional banners.

### Governance and data block

Required policy links:
- `Privacy & POPIA`
- `Terms of use`
- `Member terms`
- `Data and consent`

These should point to actual public-facing policy surfaces even if the copy is still provisional.

### Closing line

Required function:
- clarify that membership, tracker, and update submissions are governed by ABA privacy and route-specific consent handling

This line should remain short and trust-oriented.

## 5. Governance and data surfaces now required

The prototype now needs a stable public page for governance/data handling.

Minimum sections:
- privacy and POPIA notice
- public site terms of use
- member-specific terms or participation conditions
- route-specific data and consent handling

Current prototype page:
- `docs/site/governance-and-data.html`

This page is not the final legal document set.
It is the correct prototype surface for:
- policy IA
- trust expectations
- future legal drafting handoff

## 6. Copy and tone rules

Footer and governance copy should be:
- calm
- public-facing
- specific enough to feel intentional
- free of repo or process narration

Avoid:
- `this prototype...` inside the footer itself
- instructional language telling users how to read the page
- vague reassurance without saying what the policy surface is for

Allowed in requirements notes:
- clear statements that formal legal drafting still needs board and counsel review

## 7. Open legal and product questions

These are not blockers for the current prototype, but they do need later resolution:

- final POPIA wording and controller/contact details
- retention and deletion expectations by route
- whether tracker submissions can be used in aggregate advocacy outputs by default or require more explicit opt-in wording
- how member-only resources and confidentiality expectations should be expressed
- whether separate public `Privacy`, `Terms`, and `Member terms` pages will later split out from the current combined governance/data page

## 8. Immediate implementation rule

For this tranche:
- use one consistent brand lockup
- use full-width public header and footer shells with centered inner content
- use one shared public footer pattern
- route legal/data links through the governance/data surface
- remove page-specific footer clutter where it duplicates shared navigation or shared trust surfaces
- soften major public section panels so the layout does not feel like stacked bordered boxes
