# Starting Prompt V1

You are designing low-fidelity wireframes for a web tool called a "Biological
Inputs Registration Tracker" for South Africa.

PURPOSE
Manufacturers of biological inputs (agriculture, public-health pest control,
water treatment) log their product registrations and pipeline. The operator —
a neutral industry body — aggregates this into (a) a verifiable, named packet to
hand the regulator as evidence of a registration backlog, and (b) an anonymised
public dashboard for advocacy and communications.

DATA MODEL (the spine — reflect it in every screen)
- Company (manufacturer/importer) → has many Products → each has many
  Applications (the regulatory event that "sits with the registrar") → each
  Application has a dated Status Log (not just a current status).
- The Application is the unit of backlog. Wait-time = duration between dated
  status changes, so capture WHEN each status began.

THREE INDEPENDENT AXES on each product — never collapse into one field:
1. Functional category: biofertiliser / biopesticide / biostimulant / not sure
   (what it's sold as).
2. Legal pathway: Group 3 fertilizer / agricultural remedy / not sure
   (how the governing act treats it).
3. Classification code: M / L / K / unknown.
"Not sure" is a real, valuable value — never force a guess.

CONDITIONAL LOGIC
A top-level "governing regime" field (Agriculture·Act 36 / public-health pest /
water treatment / other) drives which classification fields appear. The
M/L/K + Group-3 fields only apply under Act 36; other regimes show their own or
none. Make this conditional behaviour visible in the wireframe.

SCREENS TO PRODUCE
1. CAPTURE FLOW (company-facing, multi-step, low-friction, returnable via email
   link — this is longitudinal, re-surveyed over time, not one-shot):
   - Company details (with POPIA consent notice).
   - Product + the three axes + conditional regime block.
   - Application: status, date-status-began (+ "approximate" toggle),
     registrar reference number, proof-of-submission upload.
   - Per-field VISIBILITY control: internal-only / registrar-packet /
     public-aggregate. This is the trust mechanism — show it clearly.
2. COMPANY PRIVATE DASHBOARD (the participation incentive):
   - Their own pipeline as a status timeline.
   - Their wait times benchmarked against the anonymised sector median.
3. PUBLIC ADVOCACY DASHBOARD (anonymised, the comms artifact):
   - Headline metrics: applications in backlog, median + worst wait time,
     total "product-years" waiting.
   - Backlog by legal pathway (Group 3 vs remedy) — shows WHERE the bottleneck
     is, including time lost per status stage.
   - Breakdown by functional category and by regime.
   - Trend over time (is the backlog growing?).
   - Apply suppression: hide any cell where the count is small enough to
     identify a single company.
4. REGISTRAR EXPORT VIEW (operator-facing):
   - The named, verifiable list (only records flagged registrar-packet),
     with reference numbers and proof attachments, ready to export.

CONSTRAINTS / FIDELITY
- Low-fidelity wireframe: greyscale, boxes, placeholder text, light annotation
  callouts explaining intent. No brand styling, no real data.
- Annotate the non-obvious mechanics (conditional fields, visibility flags,
  anonymisation threshold, dated status log) with short margin notes.
- Mobile-considerate but desktop-first.

Produce the screens as separate, labelled frames.
