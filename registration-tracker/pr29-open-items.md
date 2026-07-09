# PR #29 — Open Items & Next-Session Model Review

**Status: closed out.** Both threads below were completed in this session; see the "Comb findings"
section for what the fine-tooth comb (part A) actually turned up beyond the known part-B items.

## A. Data-model fine-tooth comb — done

Reviewed `data-model-v1.md` against `registrar-requirements-spec-v1.md`, `context-and-decisions-v1.md`,
and the five `*-brief-v2.md`. Findings, all fixed in `data-model-v1.md` (and cascaded where needed):

1. **Missing lookup entry.** §8's illustrative `ServiceType` list omitted `reinstatement·14AR1·118`,
   even though `intake-flow-brief-v2.md` already lists it as a service-type option and it's part of
   the same SRF-collapsed 14AR1 group (spec Finding 1) the union-granularity list exists to keep
   distinct. Added, with a note not to drop it again.
2. **Self-contradiction in ConsentSetting sensitivity.** All four consent fields were tagged
   `OPERATOR` (internal-only) except `allow_public_aggregate`, yet the `retention/deletion` row's own
   Notes column said "submitter may withdraw" — a submitter can't withdraw a setting it can't see.
   Retagged the whole entity `MEMBER` (own-record); `allow_public_aggregate` keeps an additional
   `PUBLIC-gate` role (doesn't become public itself, gates whether *other* fields do).
3. **Overly restrictive PII tag on ApprovedPerson.** Was `OPERATOR`-only, which would hide a
   company's own submitted accountable-person data from its own dashboard. Retagged `MEMBER`
   (own-record) — it's the submitter's own data about their own accountable person, same as the rest
   of their record. Cascaded to `page-feed-map-v1.md`'s field×surface matrix and footnote.
4. **`submitted_at` sensitivity didn't match the source of truth.** Tagged `OPERATOR→MEMBER`
   (implying it's hidden from the submitting company until some later promotion event), but
   `context-and-decisions-v1.md`'s "Submission Timestamp Rule" explicitly says operator/company/
   registrar views may all show it. Retagged `MEMBER (named) / PUBLIC (aggregate)` to match.
5. **Legend didn't document its own notation.** §3 defines exactly four sensitivity values, but §5/§6
   use compound forms (`A→B`, `A(named)/B(aggregate)`, `-gate` suffix) that aren't in the legend.
   Extended §3 to define what those mean.
6. **Spec's CAPTURE bucket silently downgraded.** `registrar-requirements-spec-v1.md` §0/§7 sorts
   approved-person/eligibility into its CAPTURE bucket (G13, G14) — i.e. spec-mandated data — while
   `data-model-v1.md` §6 treats the same fields as an optional leaf. Not wrong (the tracker's own
   purpose test doesn't need applicant identity), but undocumented. Added a note in §6 flagging this
   as a considered override, not an oversight.

Grain (Submission→Org→Product→Application→StatusLog), the capture/optional/never lens, and the
derived backlog/median definitions all checked out consistent across sources — no changes needed
there beyond what's listed above.

## B. PR #29 consistency fixes — done

1. **`intake-flow-brief-v2.md`** reconciled to open access — the hard authorisation stop-gate is
   replaced with the open-access model + non-gating responsible attestation; approved-person/
   eligibility/SACNASP moved into the optional module (new Screen 7), matching
   `intake-form-spec-v1.md` and the intake wireframe.
2. **All five `*-brief-v2.md`** now carry a "Status note" clarifying which parts are v1 (live) vs
   `data-model-v1.md` §7's deferred layer (operator review, verified membership, registrar packet) —
   `admin-operator-review` and `registrar-list` are deferred-layer previews in full; the other three
   are v1 with deferred-layer references called out.
3. **`JEN-HANDOFF-v1.md`** — the "rebuild in your shell vs restyle wireframes" question is removed;
   replaced with the settled fact that production happens in the monorepo with Malin, this repo is
   spec + look reference.
4. **D1** flipped from "DECISION PENDING" to decided (include, optional, non-gating, reviewable) in
   `data-model-v1.md` §6/§11, `intake-form-spec-v1.md` §4, and the intake wireframe.

## C. Wireframes — done

The five wireframes were already largely synced to the spec from prior sessions. The only drift
introduced by this pass was the intake wireframe's D1 "decision pending" copy, now updated to match
the closed decision. All doc + wireframe changes land in one commit.
