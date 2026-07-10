# Registration Tracker — Planning Handoff (for Jen)

**This is the entry point.** If you're using an agent, point it at this file first — it links the three
planning docs and the docs below.

**Where this lives:** branch `codex/registration-tracker-governing-files`, PR #29 (unmerged, held for
your review). All paths below are relative to the repo root.

**ABA integration note:** for the ABA repo's cross-journey contract, also read
`docs/requirements/aba-unified-membership-tracker-system-contract.md`.
This tracker package remains durable source input, but that note is the canonical layer for
membership/tracker continuity, consent ownership, and soft-launch v1 surface scope in this repo.

---

## Read these three, in order

1. **`registration-tracker/data-model-v1.md`** — the data model: what we capture and why, how sensitive
   each field is (`PUBLIC` / `MEMBER` / `OPERATOR` / `NEVER`), the lookup tables, the derived metrics,
   and how it maps to your **"Registration Submission"** lead object.
2. **`registration-tracker/intake-form-spec-v1.md`** — the intake form as **fields / sequence /
   conditional logic / validation**. Content and structure only — **styling is yours.**
3. **`registration-tracker/page-feed-map-v1.md`** — how captured data flows into each downstream page,
   with a **field × surface visibility matrix** (what each page may and may not show).

Supporting/durable context (already on the branch): `registrar-requirements-spec-v1.md` (the verified
Act 36 extraction everything is cited to), `context-and-decisions-v1.md`, and the five `*-brief-v2.md`
area briefs.

---

## The core decisions already baked in

- **Access = open.** Anyone — ABA member or not — reaches the form from a link and submits. No login,
  no membership gate. Membership is one optional self-reported field.
- **Data rigor = full Act 36 alignment**, for everyone. As rigorous as the Act 36 process *map*
  (service type, official stage, wait time, reference vs L-number, readiness flags), but **not** as
  heavy as the *application* — we never collect the dossier itself, only readiness flags.

---

## What we need from you + Anna

**The old decision list is closed.** Everything that was open for you and Anna (D1, D2, D4, D5) is
decided:

- **D1** — the optional "approved person / eligibility / SACNASP" block: **include, optional,
  non-gating, reviewable.** (`data-model-v1.md` §6)
- **D2** — public dashboard member/non-member filter: **no filter in v1** — all reviewed submissions
  shown as one pool; the split stays internal-only. Revisit later if needed.
- **D4** — median wait time definition: **total open duration.** Easy to change later; it's a
  calculation, not stored data.
- **D5** — registrar export-preview scope: **in-process applications only** — already-registered
  records are never export-preview candidates.

**Two things I'd value your input on — not blocking, and more yours than mine** (both are really about
how the tracker hands off to your CRM; logged as D8/D9 in `data-model-v1.md` §11):

- **D8 — linking submissions to one organisation over time.** Tracker submission is open (no login),
  so I don't want it inventing its own company identity/dedupe — it should capture whatever key lets
  your CRM match submissions to one `Organization` (your membership side already uses business
  registration number + name + country). Your capture model already frames this as the "continuity /
  Journey E" layer, so I'd rather align to it than reinvent it.
- **D9 — where registration facts live.** The registration/L-number and grant/expiry dates are the
  registrar's facts — self-reported now, verified later. Your `Product` record feels like the natural
  home for the verified version. Worth confirming so the tracker captures toward that shape.

Neither is urgent — I know tracker redesign is parked while you lock the membership capture model. I'm
flagging them so the tracker aligns to your continuity model when it resumes.

Two further items (**D3** — mapping our product categories to the registrar's own function axis, and
**D6** — the biostimulant legal pathway) are **regulatory questions, not product/design ones** — flagged
in `data-model-v1.md` §11 for whoever at ABA has that domain expertise, not for you.

Otherwise: just read through and comment on anything that looks off.

---

## Reconciliation status for ABA spec use

This tracker package is now usable as **durable source input** for the ABA-wide system contract.

What is aligned:
- open tracker capture remains separate from membership application
- the tracker uses reviewed aggregate release rules rather than raw-public visibility
- export-preview logic is narrower than company-private visibility
- dossier and proof-of-payment are treated as readiness or attached-state flags, not stored tracker documents
- the optional approved-person block is non-gating and no longer treated as the tracker spine

What remains deferred preview:
- registrar/export-preview behavior
- operator-review interaction depth beyond the current prototype
- low-fi tracker wireframes as look-and-feel reference only

What should still not be treated as production truth:
- the wireframes themselves
- any page copy that conflicts with `docs/requirements/aba-unified-membership-tracker-system-contract.md`
- any implication that this package replaces the ABA repo as the planning/spec source of truth

---

## What is NOT done yet

The **actual HTML pages have not been rebuilt** to these docs. That was deliberate: the model needed
agreeing first.

**Where this fits in the ABA repo:** this tracker package should be treated here as **spec + front-end-look reference**
for the tracker area — the durable data model, form logic, page-feed rules, and low-fi wireframes that
the broader ABA prototype can absorb and align to. Later production implementation may still happen in a
different build context, but this repo remains a valid planning/spec source of truth for the ABA prototype.

*(The current wireframes in this branch are re-synced to the intake spec so the prototype and the docs
agree — throwaway reference, not production.)*

---

## Giving feedback

Comment inline on PR #29, or send notes back via [krimchanski]. Nothing is merged, so your review can
still reshape any of it. This is a **first draft** — edits expected.
