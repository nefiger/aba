# Public Dashboard Brief V2

> **Current mockup release note (28 July 2026):** `docs/requirements/registration-tracker-module-change-spec.md` supersedes this brief where it conflicts. The active public page is a registration-insights evidence-status experience with no fictional records, totals, trends, timestamps, packet activity, country comparisons, or charts. It explains the process, future questions, review and publication pipeline, and truthful collecting/insufficient-information state. This V2 brief remains as historical metric-planning context for a later evidence-backed release.

*Supersedes `public-dashboard-brief-v1.md`. Reconciled to `../registrar-requirements-spec-v1.md`
(verified Phase 2 extraction) and `../context-and-decisions-v1.md`. V1 retained as history.*

**Domain frame.** Anonymised sector-evidence view of how registration of ordinary farm inputs
(microbial inoculants, plant biostimulants, biofertilisers, plant extracts, biological crop-protection
products) moves through the South African registrar's process under Act 36 of 1947. "Biological"
refers only to the natural origin of these crop inputs.

**What changed in V2 (headline).** The dashboard's metric spine is re-cut around the spec's core
question — *where is time lost, by application type and official stage?* That means: (1) every headline
figure is **derived from one record-level dataset**, not hardcoded; (2) waits are benchmarked against
the **official statutory timeframes** (the spec's benchmark spine); (3) a new **backlog-by-official-stage**
view; (4) a new **by-service-type vs benchmark** view; (5) the legal-pathway labels are corrected to
**Agricultural remedy / Fertilizer**; and (6) the aggregate evidence-packet block (already in V1's
section list but absent from the wireframe) is added. A public member/non-member filter was considered
(D2) and **decided against for v1** — see P7. Each change is itemised in the reconciliation ledger with
*current → proposed → citation*.

---

**Status note.** This brief's metric derivations (backlog, wait time, by-stage/type/pathway breakdowns)
are v1 — computed from the open-capture spine. Its "reviewed records only" framing describes
`data-model-v1.md` §7's **deferred** operator-review layer: until that layer is built, v1 aggregates
read from the open-capture data directly, with the same suppression/anonymisation rules. The
aggregate evidence-packet block (P8) similarly previews the deferred registrar-packet layer.

## Audience

Public website visitors, sector participants, policymakers, and communications audiences who need an
anonymised view of registration-backlog evidence.

## Access / Role

Public aggregate view. No company-, product-, proof-, or reference-level detail. Reviewed records only.

---

## Reconciliation ledger (current → proposed → citation)

| # | Metric / behaviour | V1 (current) | V2 (proposed) | Cite |
|---|---|---|---|---|
| P1 | **Legal-pathway breakdown** | bars labelled `Group 3 fertilizer / Agricultural remedy / Not sure / Other` | **Agricultural remedy** (incl. biopesticide / inoculant / PGR) vs **Fertilizer** (biofertiliser) vs **Not sure**; drop the stray `Group 3 fertilizer` label. Matches intake R7. | spec §5.2; G11 |
| P2 | **Where time is lost by official stage** | *absent* — no stage axis at all | New breakdown: open reviewed records and median time held **by official Act 36 stage** (Verification → Scientific screening → Evaluation → Decision → Appeal, plus the cross-cutting "referred back" case). This is the spec's central sector axis. | spec §3, §3.1; §0 ("where time is lost, by … stage") |
| P3 | **Benchmark comparison** | median/worst wait shown as raw months, no yardstick | Waits benchmarked against the **official per-type statutory timeframe** (627 / 418 / 208 / 118 / 90 … calendar days). Add a headline **"over statutory timeframe"** count and frame median/worst as *actual vs benchmark*. | spec §2.1, §2.2 (Finding 1 — benchmark spine); G7 |
| P4 | **By application / service type** | *absent* | New breakdown by **service type at clock-granularity** keyed to SRF `14ARx` (generic vs parallel/daughter kept separate), each shown against its benchmark. | spec §2.1; G1, G4 |
| P5 | **Derivation / single source of truth** | headline figures hardcoded *and* duplicated in each chart array | All headline figures and breakdowns **derived from one record-level fictional dataset** of reviewed applications, so the page is auditable and figures cannot drift. | context §"Public Dashboard Metrics" ("auditably derived"); CLAUDE.md "derive, never duplicate" |
| P6 | **Backlog threshold** | single implicit threshold behind "over threshold" | Backlog = open reviewed records whose open duration **exceeds the official benchmark for their type** (threshold is type/stage-specific, per context), not one flat cut-off. | context §"Pipeline, Backlog, And Stuck Records"; spec Finding 1 |
| P7 | **All / member / non-member filter** | static "All reviewed submissions"; summary states no segmentation | **Decided against (D2, closed).** No public filter in v1 — all reviewed submissions shown as one pool. Even suppressed, a member/non-member split narrows inference on small cells; that's a real trust cost for no v1 requirement. Member/non-member stays an internal classification only. Revisit later if the advocacy story needs it. | data-model-v1 §11 (D2) |
| P8 | **Aggregate evidence-packet activity** | *absent* | Add the aggregate block: **registrar evidence packets prepared**, **applications represented**, **most recent packet period** — aggregate only, never naming companies. | context §"Public Dashboard" (packet activity) |
| P9 | **Bottleneck themes** | present, aligned to controlled list | Keep; confirm they render only post-review and after suppression (unchanged). | context §"Bottleneck Themes" |
| P10 | **Pipeline vs backlog** | pipeline shown separately, correctly excluded from backlog | Keep unchanged; reaffirm pre-submission never enters registrar-backlog metrics. | context §"Pipeline, Backlog, And Stuck Records" |

---

## Metric catalogue & derivations (the durable spec)

Every figure below is derived from the record-level dataset `reviewedApplications[]` (fictional). A
record carries: `memberType` (member / non-member — internal classification only, never a public
filter per D2), `final` (bool), `stage` (official stage, for open records), `serviceType` (+
`benchmarkDays`), `pathway`, `category`, `country`, `regime`, `openDays`, `bottleneckTheme`.
Pre-submission pipeline records are held in a **separate** list and never counted as backlog.

**Filter set** `F` = all reviewed records (no public all/member/non-member filter in v1 — D2).

| Headline metric | Derivation |
|---|---|
| Open applications | `count(r in F where !r.final)` — reviewed applications not yet finalised |
| Applications in backlog | `count(r in F where !r.final && r.openDays > r.benchmarkDays)` — open **and** over the statutory benchmark for its type (P6) |
| Over statutory timeframe | same set as backlog, surfaced as its own advocacy headline (P3) |
| Median wait | median `openDays` over open records in `F`, shown in months |
| Worst / longest open | `max(openDays)` over open records in `F`, in months |
| Product-years waiting | `sum(openDays)/365` over open records in `F` |

| Breakdown | Derivation |
|---|---|
| By official stage (P2) | group open records in `F` by `stage`; show count (+ optional median days held) |
| By service type vs benchmark (P4) | group open records by `serviceType`; per group show median `openDays` and the `benchmarkDays` yardstick |
| By legal pathway (P1) | group by `pathway` (Agricultural remedy / Fertilizer / Not sure) |
| By category | group by `category` (Biofertiliser / Biopesticide / Biostimulant) |
| By regime | group by `regime` (Agriculture·Act 36 fully modelled; others thin) |
| By country | group by `country` |
| Bottleneck themes | group by `bottleneckTheme` (controlled list, post-review) |
| Pipeline signal | count of the separate pre-submission list — shown beside backlog, never inside it |
| Trend | monthly reviewed-open counts held as an explicit series (cannot be derived from point-in-time records; labelled as such) |

**Suppression rule.** Any breakdown cell whose contributing record count is **below the anonymisation
threshold** (wireframe uses `< 4` as a placeholder `k`) is rendered as *Suppressed*, not as an exact
count. Company/product/proof/reference detail never appears.

---

## Key sections (V2)

- Headline metric row: open applications · in backlog (over benchmark) · median wait vs benchmark ·
  longest open · product-years waiting.
- **Where time is lost — by official stage** (new).
- **By service type vs statutory benchmark** (new).
- By legal pathway (relabelled) · by category · by regime · by country.
- Recurring bottleneck themes.
- Pre-submission pipeline signal (separate from backlog).
- Reviewed-open trend over time.
- **Aggregate evidence-packet activity** (new).
- Contributor-protection / suppression panel + "how to read these signals" summary.

## Important states

- Metrics based on reviewed submissions only; raw intake excluded.
- Small cells suppressed after filtering.
- Pipeline kept separate from registrar backlog.
- Benchmark context always attached to wait metrics (actual vs statutory).
- No public all/member/non-member filter (D2, decided) — one pool of all reviewed submissions.

## Relationship to other tracker areas

Only `admin-operator-review` accepted + public-eligible records feed this view. `company-dashboard`
stays private. `registrar-list` contributes only aggregate packet activity (P8).

## Notes for later production implementation

- One source of truth: derive every figure from reviewed records; never hardcode a headline separately
  from its chart (CLAUDE.md).
- Benchmarks are lookup constants (official timeframes), not stored per record.
- Enforce the suppression threshold `k` before launch; treat it as configurable.
- Never reveal company/product names, proof, reference numbers, or free text.
- Prototype markup disposable; durable rules live here and in `../context-and-decisions-v1.md` /
  `../registrar-requirements-spec-v1.md`.

## Open questions surfaced

- ~~Member/non-member segmentation on a *public* page~~ **Resolved (D2, closed):** no public filter in
  v1 — even suppressed, a member/non-member split narrows inference for no v1 requirement. Stays an
  internal classification only.
- **Backlog threshold = the official benchmark?** V2 adopts the statutory timeframe as the threshold
  (cleanest, spec-aligned). Confirm ABA wants "backlog" pinned to the statutory clock vs a softer
  internal SLA.
- ~~Median wait definition~~ **Resolved (D4, closed):** total open duration, revisable later since it's
  a derived metric, not stored data.
- **Trend** cannot be derived from point-in-time records without historical snapshots; kept as an
  explicit series pending a real snapshot pipeline.
