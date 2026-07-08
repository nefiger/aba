# ABA Registration Tracker — Claude Code Kickoff (v2)

**Working folder:** `projects/aba/registration-tracker` (repo root for this work) **Model:** Fable

**How to run:** from this folder in Claude Code, say — *"Read `claude-code-kickoff-v2.md` and follow it, starting with Phase 1."* Work the phases in order and stop at every checkpoint.

*v2 change: added the "Working principles" section below (scope lists are a floor, not a ceiling; and a standing licence to disagree with these instructions at a checkpoint). These govern how both phases run; the task-prompt files are unchanged. Everything else is carried over from v1.*

**Scope note (read first).** This is an agricultural-sector regulatory-administration project — the paperwork side of registering ordinary farm inputs (microbial inoculants, plant biostimulants, biofertilisers, plant extracts, biological crop-protection products) with a national agriculture department under Act 36 of 1947 (South Africa). "Biological" refers only to the natural origin of these crop inputs. Treat this as routine product-registration tooling throughout.

## What this tool is (context)

The regulatory framework these products sit in is unsettled and hard to navigate, and biological agricultural inputs are frequently registered under one category when they arguably belong under another. **The tool does not try to fix that — it tracks.** It does two things: a **per-company pipeline** (each company logs its products and the status of each registration, and sees its own pipeline), and a **sector-wide picture** (submissions aggregated into an anonymised view of where the registrar's process loses time, by application type and stage). Together these form a combined ("married") view into the registrar's office that also aims to be useful to the registrar's own work. It is not a field-by-field replica of the submission forms.

Read `registration-tracker-context-summary-v2.md` first for the full state — the regulatory corpus, the five findings, the scope decisions, and the open questions. That's the orientation doc. The **source of truth** is `README.md` \+ `context-and-decisions-v1.md` (+ `starting-prompt-v1.md`).

## Working principles (apply to both phases — read before starting)

These two principles sit above the task prompts. Where they and the letter of a task prompt pull in different directions, these win.

- **The scope lists are a floor, not a ceiling.** The "in scope" lists in the task prompts — the extraction's especially — are targeting, not limits. They exist to make sure nothing named gets dropped; they do not cap what you may surface. If you find a requirement, field, stage, or distinction that matters to the tracker but isn't on the list, include it and flag it. Missing something because it wasn't enumerated is the failure mode to avoid.
- **Disagreement is expected — raise it at the checkpoint.** These prompts were written by an assistant who is not the domain specialist, so they carry assumptions that may be wrong. Treat them as a strong starting point, not as settled fact. If a different approach would serve the goal better, or if any instruction here contradicts what you actually read in the source documents, do not silently comply and do not silently override — surface it at the next checkpoint, with your reasoning, before proceeding. Flagging a problem with the instructions is doing the job well, not deviating from it. (This is the project's truth-over-answers rule pointed at the instructions themselves: where you're uncertain or something looks off, say so rather than proceeding as if it were settled.)

## Files in this folder

- **Source of truth** (obey; don't silently overwrite): `README.md`, `context-and-decisions-v1.md`, `starting-prompt-v1.md`  
- **Orientation / handoff:** `registration-tracker-context-summary-v2.md`  
- **Task prompts:** `governing-files-edit-prompt-v1.md` (Phase 1), `registrar-extraction-prompt-v2.md` (Phase 2\)  
- **Reusable:** `session-prompt-template-v2.md`  
- **Prior reconciliation:** `Reg_tracker_notes.docx`  
- **Regulatory corpus** (needed for Phase 2): `Application_form_16_08_2023_Final.docx`, `Service_Request_Form_for_Agricultural_Remedies__2_.doc` (legacy `.doc`), `Guidelines_on_Data_Requirements_for_Agricultural_Remedies_2015_AVCASA.pdf`, `Guide-Reg-Process-Agric-Remedies-2015___time_frame_.pdf`, `Chemistry_data_requirements_guideline__March_2021.pdf`, `Guideline_GHS.pdf`, `Tariffs_2026_to_2027.pdf`  
- **Disposable** (do not treat as spec; do not edit as production): the wireframe HTML/CSS

## How to work in Claude Code (execution notes)

- The two task prompts were written for a paste-and-attach chat flow. Here, the files they list are already in this folder — **read them directly and disregard any "attach" / "paste into a new session" wording.**  
- **Preserve before editing.** Before changing any durable file, make a restore point: if this is a git repo, commit the current state first; otherwise copy the file to `_archive/<name>-v1.md`. Then edit the canonical file in place — this keeps `README.md` / `context-and-decisions-v1.md` as the names every other file references, so nothing needs repointing. (If you prefer the team's `-vN.md` convention, write `…-v2.md` files and leave v1 — but then also update the "read these first" pointers in the task prompts.)  
- **Reading Word / PDF files:** the task prompts mention an `extract-text` helper that isn't in this environment. Use whatever is available locally — `pandoc`, `libreoffice --headless --convert-to`, `python-docx`, `pdftotext` / `pdfplumber` — and install if needed.  
- Durable markdown is the real artifact; the wireframe HTML/CSS is disposable.  
- Any illustrative data stays fictional and clearly labelled.

## Phase 1 — fix the governing files (do this first)

Execute `governing-files-edit-prompt-v1.md`. It adds the purpose \+ agricultural framing to the top of `README.md` and `context-and-decisions-v1.md`, marks the data model as provisional (annotations only — **no value changes**), and resolves one scope decision.

- **Edit C decision** (non-Act-36 regimes): not yet fixed — confirm with the user at Checkpoint A. *Recommended: park water-treatment and public-health-pest-control as "future / different legal regime — not modelled in the current tracker," leaving Agriculture / Act 36 as the active regime.*  
- Follow that prompt's **Checkpoint A** (confirm the plan) and **Checkpoint B** (show the diff) before finalising.  
- Do **not** rewrite model values (M/L/K classification code, official stages, thresholds) — that is Phase 2 \+ the specialist's job.

**Stop after Phase 1 and confirm with the user before starting Phase 2\.**

## Phase 2 — registrar requirements extraction (after Phase 1 is confirmed)

Ensure the regulatory corpus files are present, then execute `registrar-extraction-prompt-v2.md`. It extracts what the registrar actually requires — the service-type taxonomy, and per type the evidence package / official stages / timeframe / fee; reconciles the classification axes against the tracker's model (flagging the M/L/K ↔ B/K/L/M question); and pins down what "reference" and "proof" mean at each stage. It produces `registrar-requirements-spec-v1.md`, a gap table, and a specialist question list, and **proposes (does not apply)** any changes to the governing files. Follow its own checkpoints — and remember Working Principle 1: its scope list is a floor, so surface any real requirement it doesn't name.

## When both phases are done

Report: files changed / created; what was verified vs left provisional; the open specialist and product questions (including the "married view" definition and the M/L/K ↔ B/K/L/M mapping); and any cross-references still needing an update.
