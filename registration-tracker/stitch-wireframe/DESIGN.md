---
name: Blueprint Functionalist
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  annotation:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  annotation-width: 240px
---

> **Internal wireframe brief only — not public design authority.** This file describes
> the old annotated Stitch wireframe and its deliberately grayscale review treatment.
> Its annotation-first copy, Inter/Space Mono typography, blueprint styling, and
> component notes must not appear in public Registration Tracker pages. Public work is
> governed by `soft-launch/PUBLIC-VOICE-AND-DESIGN-GUARDRAILS.md`,
> `soft-launch/.impeccable.md`, and `soft-launch/design/brand-palette.md`.

## Brand & Style

The design system is a high-utility, low-fidelity framework focused on structural integrity and information architecture. The personality is clinical, objective, and analytical, removing the distraction of aesthetic flourishes to prioritize user flow and content hierarchy.

The style is a hybrid of **Minimalism** and **Brutalism**, utilizing a "blueprint" aesthetic. It emphasizes heavy strokes for structural boundaries, monospaced accents for technical annotations, and a rigid adherence to a skeletal layout. Every element exists to define a function or a content zone rather than an emotion. 

Key principles:
- **Clarity over Visuals:** No imagery or decorative icons; use placeholders (crossed boxes) for visual assets.
- **Structural Honesty:** Borders are used explicitly to define containers and interactive zones.
- **Annotation-First:** The UI includes dedicated space and specific styles for UX logic and behavior notes.

## Colors

The palette is strictly grayscale to ensure that color never interferes with usability testing or structural reviews.

- **Backgrounds:** Use pure white (#FFFFFF) for the primary canvas and light gray (#F4F4F4) for secondary logic/annotation areas.
- **Borders:** Use mid-grays (#757575 or #BDBDBD) for structural outlines. Active or focused states use the primary black (#121212).
- **Text:** High-contrast dark gray (#121212) for primary content; medium gray (#757575) for secondary metadata and placeholders.
- **Fills:** Use a light wash (#E0E0E0) for disabled states or to denote "empty" containers.

## Typography

This design system utilizes a dual-font approach. **Inter** provides a neutral, highly legible foundation for all interface elements and content. **Space Mono** is used exclusively for technical metadata, labels, and UX annotations to differentiate "system notes" from "product content."

- **Hierarchy:** Maintain strict vertical rhythm. Large headlines should be reserved for page titles only.
- **Annotations:** Use the `label-sm` style for technical specs (e.g., [BUTTON: SUBMIT]) and `annotation` for logic descriptions.
- **Contrast:** Bold weights are used only for headlines to signify major section breaks.

## Layout & Spacing

The layout is governed by a **Fluid Grid** within a fixed max-width container. All spacing is derived from a strict 8px base unit.

- **The Grid:** A 12-column grid for desktop, 6-column for tablet, and 2-column for mobile.
- **Annotation Gutter:** On desktop, a 240px "Logic Column" resides to the right of the main content area for UX notes.
- **Safe Zones:** High-density content uses 16px padding; low-density "hero" or marketing-style wireframes use 48px+ padding.
- **Component Spacing:** Use the 8px unit consistently (e.g., 8px between label and input, 24px between form groups).

## Elevation & Depth

This design system avoids shadows entirely. Depth is communicated solely through **Tonal Layers** and **Bold Outlines**.

- **Z-Index:** To show an element is "above" another (like a modal or dropdown), use a white background with a 2px solid black border.
- **Backdrop:** Use a 20% opacity black overlay (no blur) to dim the background when high-level components like modals are active.
- **Stacking:** Elements are visually tiered by background shade (White = Top level, Light Gray = Background/Surface level).

## Shapes

The shape language is strictly **Sharp**. 

- **Corners:** 0px radius for all elements including buttons, inputs, cards, and modals.
- **Iconography:** Use "Box with X" placeholders for images. For functional icons (arrows, close), use simple geometric line-art with 2pt stroke weights.
- **Indicators:** Selection states (checkboxes/radio) should be square or diamond-shaped to maintain the angular aesthetic.

## Components

Components are designed to look like "work-in-progress" blueprints.

- **Buttons:**
  - Primary: 2px solid black border, white background, black text.
  - Secondary: 1px solid gray border, white background, gray text.
  - State: On hover/active, invert the colors (black background, white text).
- **Inputs:**
  - 1px solid gray border. Label sits above the field in `label-sm` (Mono font).
  - Placeholder text is light gray and italicized.
- **Cards:**
  - Simple 1px solid gray outline. No shadows. Use a "crossed box" icon at the top for image placeholders.
- **Lists:**
  - Items separated by 1px horizontal gray lines. No vertical lines.
- **UX Logic Boxes:**
  - Small rectangles with dashed borders used to contain technical notes or "If/Then" logic. Connected to UI elements with simple 1px lines.
- **Navigation:**
  - Horizontal top-bar with 1px bottom border. Links are simple text with no underlining unless hovered.
