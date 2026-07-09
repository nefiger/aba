# PR #29 — Open Items & Next-Session Model Review

PR #29 (branch `codex/registration-tracker-governing-files`) is **held for review**. Two threads are
pending — do not lose these.

## A. Data-model fine-tooth comb — do in a FRESH session
Review `data-model-v1.md` against its sources (load these):
- `registrar-requirements-spec-v1.md`
- `context-and-decisions-v1.md`
- the five `*-brief-v2.md`

Hotspots to challenge:
1. Grain — Submission → Org → Product → Application → StatusLog; Application = unit of backlog.
2. Per-field sensitivity labels — PUBLIC / MEMBER / OPERATOR / NEVER (privacy-critical).
3. The capture line — rigorous-capture vs optional vs never-store.
4. Derived metrics — backlog = "open past the statutory benchmark"; median = total open duration.
5. Lookup accuracy — service types / official timeframes (cited to the spec).

## B. PR #29 consistency fixes — fold into the same pass
1. **`intake-flow-brief-v2.md`** — still describes the heavy authorisation gate (Screen 1 /
   stop-if-not-authorised / approved-person-as-gate). **Contradicts** the open-access model in
   `data-model-v1`, `intake-form-spec-v1`, and the resynced intake wireframe. → reconcile to open access.
2. **All `*-brief-v2.md`** — treat operator-review / packet / verified-membership as *current*, while
   `data-model-v1` marks them *deferred (not v1)*. → align framing (mark deferred).
3. **`JEN-HANDOFF-v1.md`** — the "rebuild in your shell vs restyle wireframes" question is **moot**. →
   update: production build happens in the monorepo with Malin (dataman); this repo = spec +
   front-end-look reference.
4. **D1 (approved-person / eligibility / SACNASP)** — Jen delegated to our judgment ("pop it in or
   leave it, we'll review"). **Decision: include, optional / non-gating, reviewable.** → flip
   `data-model-v1` §6 + §11 and the form spec from "DECISION PENDING" to decided.

## C. Then
Update the 5 wireframes to match the finalised model → **single commit** to PR #29.

## Operating model (Jen, confirmed)
- **Me:** get the data model right (md is fine). **Jen:** good-looking visual prototype.
  **Build:** monorepo with Malin, using this repo as spec + look reference.
- Keep Malin-facing docs tight (concision).
