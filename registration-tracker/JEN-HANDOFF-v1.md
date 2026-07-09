# Registration Tracker — Planning Handoff (for Jen)

**This is the entry point.** If you're using an agent, point it at this file first — it links the three
planning docs and lists the decisions we need from you and Anna.

**Where this lives:** branch `codex/registration-tracker-governing-files`, PR #29 (unmerged, held for
your review). All paths below are relative to the repo root.

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

Five open decisions remain, logged in **`data-model-v1.md` §11**: public segmentation privacy
sign-off, the function-axis mapping, the median-wait definition, packet scope, and the biostimulant
pathway.

**D1 is now closed** — the "approved person / eligibility / SACNASP" block (highest-PII part of the
form, not needed for the core metrics) is decided: **include, optional, non-gating, reviewable**. Full
rationale in `data-model-v1.md` §6 if you want the detail; nothing further needed from you on it.

---

## What is NOT done yet

The **actual HTML pages have not been rebuilt** to these docs. That was deliberate: the model needed
agreeing first.

**Where the real build happens (settled):** the production build lives in the **monorepo with Malin**
(dataman), not in this repo. This repo is **spec + front-end-look reference** — the durable data model,
form logic, and page-feed rules Malin's build reads from, plus the low-fi wireframes as a visual
starting point for look and feel. The earlier "rebuild in your shell vs. restyle the wireframes"
question is moot now that the build location is settled.

*(The current wireframes in this branch are re-synced to the intake spec so the prototype and the docs
agree — throwaway reference, not production.)*

---

## Giving feedback

Comment inline on PR #29, or send notes back via [krimchanski]. Nothing is merged, so your review can
still reshape any of it. This is a **first draft** — edits expected.
