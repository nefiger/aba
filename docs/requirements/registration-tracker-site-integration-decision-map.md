# Registration Tracker Site Integration Decision Map

Context date: 2026-06-22

## Completion Note

This decision map is preserved as discovery history. The final integration was implemented via PR #1 and merged into `main` at `58759d2 Merge pull request #1 from nefiger/codex/registration-tracker-site-integration`.

Final decisions:

- The root launcher now opens `./docs/registration-tracker/index.html`, not GitHub source.
- The public homepage stays light and does not show tracker metrics.
- Public dashboard access sits in Knowledge Hub / Regulatory Signals.
- Member company, ABA operator, and registrar export views sit behind the Workspace gateway.
- Lyle's root `registration-tracker/` workspace remains in place and was not reorganized.

Source context:

- Live launcher checked at `https://nefiger.github.io/aba/`.
- Launcher currently links to:
  - `./docs/site/index.html` as `ABA site prototype`
  - `./docs/index.html` as `Internal demo material`
  - `https://github.com/nefiger/aba/tree/main/registration-tracker` as `Lyle's registration tracker workspace`
- Live ABA site primary pages checked:
  - `docs/site/index.html` with Home, About, Membership, Knowledge Hub navigation
  - `docs/site/about.html`
  - `docs/site/technical-network.html` as a secondary surface
  - `docs/site/updates.html` as a secondary surface
- Local tracker workspace has:
  - `registration-tracker/index.html` combined view
  - `registration-tracker/intake-flow/index.html`
  - `registration-tracker/company-dashboard/index.html`
  - `registration-tracker/public-dashboard/index.html`
  - `registration-tracker/admin-operator-review/index.html`
  - `registration-tracker/registrar-list/index.html`

Goal:

When Jen's ABA site is ready, integrate the registration tracker into it as if the site were live. The result should feel like a coherent customer and operator experience, not a separate wireframe dump. The launcher should also have a registration-tracker internal demo material page equivalent to the current `Internal demo material` page, so the tracker concept can be presented in a live call.

## #1: What Customer-Facing Tracker Entry Points Belong In The ABA Site?

Blocked by: none

Type: Prototype

### Question

Where should tracker surfaces appear inside the ABA site from a customer experience perspective?

### Answer

Open. Current hypothesis:

- Home page should include selected public registration dashboard visuals or metrics as proof of ABA's advocacy and sector-intelligence value.
- Membership path should include a company login/member workspace entry into the company dashboard.
- Membership or product participation copy should explain that registration visibility, pipeline tracking, and registrar packet readiness are member-value components.
- Knowledge Hub should connect biologicals-first product intelligence with registration readiness and public sector signals.
- Site navigation may need a `Registration Tracker`, `Member Login`, or `Dashboard` affordance, but this should be designed to match Jen's final site architecture.

## #2: What Operator/Admin Entry Points Should The Live-Like Site Expose?

Blocked by: none

Type: Prototype

### Question

How should admin, registrar, and verification surfaces be represented without making the public site feel cluttered or unrealistic?

### Answer

Open. Current hypothesis:

- Add an internal/admin route or login-style entry that opens the admin/operator review surface.
- The registrar export/list should be framed as an internal ABA staff output, not public navigation.
- The demo can use static login buttons or role switchers, but they should communicate real access boundaries:
  - public visitors see aggregate public dashboard signals
  - member companies see their own dashboard
  - ABA operators see review, verification, and registrar packet views

## #3: What Should The Registration Tracker Internal Demo Page Contain?

Blocked by: #1, #2

Type: Discuss

### Question

What should replace the launcher link to GitHub source so opening `Lyle's registration tracker workspace` feels like opening Jen's internal demo material page, but focused only on the registration tracker?

### Answer

Open. Current hypothesis:

- Create a single HTML page, likely under `registration-tracker/` or `docs/registration-tracker/`, that walks through:
  - what the tracker is
  - why ABA needs it
  - the audience-specific paths
  - intake to review to company dashboard to public dashboard to registrar export
  - what is client-facing versus internal
  - member benefits and advocacy benefits
  - key data decisions, consent boundaries, and verification logic
  - how it would integrate into the ABA site once live
- The page should be presentable in a live call, with clear sections and links into the focused tracker screens.
- It should mirror the purpose of `docs/index.html`, not copy its exact content.

## #4: Should The Tracker Remain At Repo Root Or Be Mirrored Under `docs/` For GitHub Pages?

Blocked by: #3

Type: Research

### Question

What file structure lets the registration tracker be both Lyle's independent workspace and part of the live GitHub Pages demo?

### Answer

Open. Current constraint from `AGENTS.md`: `registration-tracker/` is Lyle's workspace at repo root and should not be reorganized unless explicitly asked.

Likely options:

- Keep source pages at `registration-tracker/` and link to them if GitHub Pages serves the repo root.
- Add a presentation page under `docs/registration-tracker/` that links back to root tracker files.
- Mirror or copy selected tracker surfaces into `docs/registration-tracker/` only if GitHub Pages cannot serve root workspace pages cleanly.

The preferred answer should avoid reorganizing Lyle's workspace.

## #5: What Needs To Change In The Project Launcher?

Blocked by: #3, #4

Type: Prototype

### Question

How should the launcher change once the tracker has a presentable internal demo surface?

### Answer

Open. Current hypothesis:

- Keep three launcher choices:
  - ABA site prototype
  - Internal demo material
  - Registration tracker demo material
- Replace the GitHub source link with a live HTML tracker demo page.
- Keep a smaller source-code link inside the tracker demo page if useful, but not as the primary presentation route.

## #6: What Are The Minimum Changes Needed Before The Thursday Demo?

Blocked by: #1, #2, #3, #4, #5

Type: Discuss

### Question

What is the smallest coherent package that can be shown on Thursday, June 25, 2026?

### Answer

Open. Current hypothesis:

- A live-like ABA site homepage with one or two tracker signals embedded.
- A membership/company path into the company dashboard.
- An admin/internal path into the operator review and registrar export views.
- A dedicated registration tracker internal demo HTML page for presentation.
- Updated launcher link so the tracker opens as a demo surface, not GitHub source.
