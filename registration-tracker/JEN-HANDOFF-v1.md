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

Six open decisions are logged in **`data-model-v1.md` §11**. The one that matters most:

- **D1 — the "approved person / eligibility / SACNASP" block.** Authentic Act 36 applicant data, but
  it's the highest-PII part of the form and not needed for the core metrics. Built as **optional and
  non-gating** so it blocks nothing either way. The full cost/worth is in `data-model-v1.md` §6 — worth
  a quick read before you decide include-vs-defer.

The other five (D2–D6) are lighter — public segmentation privacy sign-off, the function-axis mapping,
the median-wait definition, packet scope, and the biostimulant pathway.

---

## What is NOT done yet — and the question for you

The **actual HTML pages have not been rebuilt** to these docs. That was deliberate: the model needed
agreeing first, and *how* the pages get built depends on you.

**Please decide:** do you want the tracker pages **rebuilt inside your shell** (`public-shell.css`,
your symbol family, your IA) — your domain — **or** should the standalone low-fi wireframes keep being
updated to match these specs, for you to restyle afterwards? Once we know, we move.

*(The current wireframes in this branch are being re-synced to the intake spec so the prototype and the
docs agree — but that's throwaway reference, not production. Production/shell is your call.)*

---

## Giving feedback

Comment inline on PR #29, or send notes back via [krimchanski]. Nothing is merged, so your review can
still reshape any of it. This is a **first draft** — edits expected.
