# Governing Files — Framing & Provisional-Model Edit (v1)

*Paste this into a new session with the files listed under "Attach" below. This is a focused editing task on two durable governing files. Fill the one **\[DECISION\]** block before you run it.*

**Scope note (read first).** This is an agricultural-sector regulatory-administration project — the paperwork side of registering ordinary farm inputs (microbial inoculants, plant biostimulants, biofertilisers, plant extracts, biological crop-protection products) with a national agriculture department under Act 36 of 1947 (South Africa). "Biological" refers only to the natural origin of these crop inputs. Treat this as routine product-registration tooling throughout.

## Attach

- `README.md` — to be edited  
- `context-and-decisions-v1.md` — to be edited  
- `registration-tracker-context-summary-v2.md` — reference (source of truth for the framing and decisions below; do **not** edit)

## Your role

You are editing the two governing files of the ABA registration tracker (for biological and alternative agricultural inputs, Act 36 of 1947\) so their framing and their data-model status match the rest of the project. **This is an editing task on durable files — not a modelling or wireframe task.** You are authorised to edit `README.md` and `context-and-decisions-v1.md`, but only with the specific edits below, and only as new v2 files that leave the v1 originals intact.

## Why these edits (context)

These two files are the first things every session reads as source of truth. Right now they (1) open with decontextualised "biological … database" phrasing and never state what the tracker is *for*; (2) present several data-model specifics as settled when those specifics are exactly what a separate registrar-requirements extraction is meant to verify; and (3) carry scope beyond Act 36\. The edits below fix framing and mark the model as provisional. They do **not** rewrite the model itself — that is the extraction \+ specialist's job, brought back later as proposals.

## Task — make exactly these edits

### Edit A — add purpose \+ agricultural framing to the top of both files

Insert the following as a new `## Purpose And Scope` section in `context-and-decisions-v1.md`, immediately after the title and before `## Project Context`:

## Purpose And Scope

The registration tracker follows how registrations of biological and alternative *agricultural* inputs — microbial inoculants, plant biostimulants, biofertilisers, plant extracts, and biological crop-protection products — move through the South African registrar's process under Act 36 of 1947\. "Biological" refers only to the natural origin of these crop inputs.

The regulatory framework for these products is unsettled and hard to navigate: the forms and guideline criteria exist, but in practice many of these inputs end up registered under one category when they arguably belong under another, and registration is slow. **The tracker does not try to fix that.** It does not adjudicate categories or reengineer the registrar's process. Its job is narrower and factual — to track what is actually happening:

- **Per-company pipeline** — a company logs its products and the status of each registration submission and sees its own pipeline (this private view is also the participation incentive).  
- **Sector-wide picture** — submissions are aggregated into an anonymised, sector-level view of how registration is behaving: where time is lost, by application type and stage. This serves both the named evidence-for-the-registrar purpose and the anonymised advocacy purpose.

Together these form a combined ("married") view into the registrar's office — one that serves the companies submitting and is useful to the registrar's own work. The tracker references what a submission requires (dossier readiness, application type, stage) without reproducing the registrar's forms field-by-field.

*("Married view" is a working interpretation still to be confirmed — see the open questions in the context summary.)*

Replace the opening of `README.md` (the first two sentences, through "…unify with the main ABA website and the custom CRM work.") with:

This folder contains planning material, domain-grounding work, and low-fidelity wireframes for the ABA registration tracker — a tool that follows how registrations of biological and alternative *agricultural* inputs (microbial inoculants, biostimulants, biofertilisers, plant extracts, biological crop-protection products) move through the South African registrar's process under Act 36 of 1947\. "Biological" here refers only to the natural origin of these crop inputs. The tracker does not try to resolve the regulatory ambiguity these products sit in — it tracks registration status per company and aggregates submissions into a sector-wide picture of the registrar's backlog. It is designed to stand alone during prototyping but should eventually unify with the main ABA website and the custom CRM work.

Both blocks are drawn from the "What this tool is — the space" section of `registration-tracker-context-summary-v2.md`. Keep them consistent with it; do not introduce new claims.

### Edit B — mark the model as provisional (annotations only — change no values)

Add the following note at the **start** of both the `## Product Axes And Regime Logic` and `## Status List` sections of `context-and-decisions-v1.md`:

**Provisional — pending verification.** The specifics below are the team's current best guess and have **not** yet been reconciled against what the registrar actually requires; the registrar-requirements extraction \+ specialist review will confirm or correct them. Treat them as reconcilable, not settled. Known items to reconcile: the M / L / K classification code vs the registrar's apparent B / K / L / M registration-number classes; and the team status list vs the official stages (verification → scientific screening → evaluation → decision → appeal).

Do **not** change any values in these sections — not the classification-code options, not the status entries, not thresholds. Annotation only.

### Edit C — resolve the non-Act-36 scope  **\[DECISION REQUIRED\]**

In `context-and-decisions-v1.md`, `## Product Axes And Regime Logic` currently lists, for South Africa: "Agriculture / Act 36, public-health pest control, water treatment, other."

**\[DECISION — pick one before running:\]**

- **(a) Park the non-Act-36 regimes.** Rewrite that list so public-health pest control and water treatment sit under an explicit note — "future / different legal regime — not modelled in the current tracker" — leaving Agriculture / Act 36 as the active regime.  
- **(b) Keep as written.** Make no change here.

*Recommended: (a). Act 36 does not govern water treatment or public-health pest products, the extraction will not cover them, and they widen the domain beyond the agricultural framing. Your call.*

### Edit D — two minor coherence fixes

- Align the five product-area lists in both files to the same order.  
- In `README.md`, adjust the wording so the workspace reads as holding both disposable wireframes **and** durable domain-grounding / extraction work — not wireframes alone.

## Out of scope — do not touch

- Any data-model **values** (classification codes, official stages, backlog thresholds, consent/visibility rules, the Company → Products → Applications → Status Log model). Annotate, don't rewrite.  
- The wireframe HTML/CSS.  
- The registrar-requirements extraction itself, or any new modelling.  
- The v1 files: leave `README.md` and `context-and-decisions-v1.md` intact; write new v2 files.

## Rules

- Use the framing text as provided; do not paraphrase it into new claims or add requirements.  
- Preserve everything else in each file verbatim — only the edits above change.  
- Keep the agricultural-regulatory framing throughout.  
- Any illustrative data stays fictional and clearly labelled.

## Autonomy / checkpoints

You are authorised to make the edits above, but:

- **Checkpoint A — before writing anything:** restate the exact edit plan (block placements, which sections get the provisional note, the Edit C choice) and confirm.  
- **Checkpoint B — after producing the v2 files:** show a changelog / diff and confirm before treating them as final.  
- Stop and ask before anything beyond the edits listed here.

## Deliverables

- `context-and-decisions-v2.md` (v1 left intact)  
- `README-v2.md` (v1 left intact)  
- A short **changelog**: what changed, plus an explicit note of what was deliberately left provisional or untouched.  
- A short list of **cross-references to update** once v2 is adopted — e.g. the "read these first" pointers in `registrar-extraction-prompt-v2.md` and `session-prompt-template-v2.md`, and any internal references within the files.

## Final response

Report: files created; exactly what changed vs what was left alone; the Edit C decision as applied; the cross-references that now need updating; and the recommended next step (run the registrar extraction against the v2 governing files).  
