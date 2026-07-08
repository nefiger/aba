# Registrar Requirements Extraction — ABA Registration Tracker (v2)

*Paste this into a new session with the **registration-tracker** folder attached.*

*v2 changes: added a domain scope note and a "space this tool works in" section so the session understands the problem it serves, and foregrounded the agricultural-regulatory framing throughout. The task, scope, rules, checkpoints, and deliverables are unchanged from v1.*

**Scope note (read first).** This is an agricultural-sector regulatory-administration project — the paperwork side of registering ordinary farm inputs with a national agriculture department under a 1947 agricultural-inputs statute (Act 36 of 1947, South Africa). The inputs in question are things farmers apply to crops and soil: microbial inoculants, seaweed and other plant biostimulants, biofertilisers, plant extracts, and biological crop-protection products. "Biological" refers only to the natural origin of these agricultural inputs. Throughout, treat this as routine product-registration tracking and regulatory administration.

## The space this tool works in

The regulatory framework governing these products is unsettled, contested, and hard to navigate. The submission forms and guideline criteria exist, but in practice many biological agricultural inputs end up registered under one category when they arguably belong under another — the boundary between an agricultural remedy and a Group 1/2/3 fertilizer (and between biopesticide, biofertiliser, and biostimulant) is exactly where the ambiguity bites. Registration is slow and difficult as a result.

**This tool does not try to fix any of that.** It does not adjudicate categories, resolve the regulatory ambiguity, or reengineer the registrar's process. Its job is narrower and factual — to *track* what is actually happening:

1. **Per-company pipeline** — an individual company logs its products and the status of each registration submission, and sees its own pipeline.  
2. **Sector-wide picture** — the submissions the tool receives are aggregated into an anonymised, sector-level view of how registration is actually behaving: where time is lost, by application type and by stage.

Together these are meant to form a combined ("married") view into the registrar's office — one that serves the companies submitting *and* is useful to the registrar's own work.

*Working interpretation of "married view" (not yet confirmed — carry as an open question): the individual-company pipelines and the sector aggregate unified into one coherent picture, and a view that both the applicant side and the registrar can read from. If the intended meaning is different, correct this before it hardens into the model.*

The tracker is **not a replica of the submission forms.** It references what a submission requires — dossier readiness, application type, stage — without reproducing the forms field-by-field. This is why the extraction below is scoped to *what the tracker needs to know*, not a full transcription of the dossier.

## Your role

You are helping build the ABA registration tracker for biological and alternative agricultural inputs — a low-fidelity product designed to stand alone during prototyping but unify later with the main ABA website and CRM. **This is a domain-grounding task, not a UI task.** You will extract what the South African registrar (Act 36 of 1947\) actually requires for a product registration, and reconcile it against the tracker's current data model, so that intake fields, status stages, and dashboard metrics are grounded in real requirements rather than best-guess assumptions.

Do **not** build, edit, or restyle any wireframe in this session.

## Read these first, in this order

**Durable planning (source of truth — obey; do not contradict or silently overwrite):**

1. `README.md`  
2. `context-and-decisions-v1.md`  ← the governing rules  
3. `starting-prompt-v1.md`

**Prior reconciliation (already drafted by the user — build on it, do not repeat it):**

4. `Reg_tracker_notes.docx`  ← the user's own first-pass summary of the regulatory corpus below

**Regulatory corpus (the evidence to extract from — read each properly, not by `cat`):**

5. `Application_form_16_08_2023_Final.docx` → `extract-text`  
6. `Service_Request_Form_for_Agricultural_Remedies__2_.doc` → legacy `.doc`; convert to `.docx` via LibreOffice first, then `extract-text`  
7. `Guidelines_on_Data_Requirements_for_Agricultural_Remedies_2015_AVCASA.pdf`  
8. `Guide-Reg-Process-Agric-Remedies-2015___time_frame_.pdf`  
9. `Chemistry_data_requirements_guideline__March_2021.pdf`  
10. `Guideline_GHS.pdf`  
11. `Tariffs_2026_to_2027.pdf`

Use the file-reading skill's router to pick the right tool per file type.

## Task

Produce a **Registrar Requirements Spec** that captures what a registration submission actually requires, and map it onto the tracker's existing model.

**In scope (what the tracker needs to know):**

- **Application / service TYPE taxonomy** — the distinct types (e.g. new active ingredient, new formulation, generic, parallel / daughter, new source, major / minor amendment, label extension, admin amendment, transfer, renewal, new formulator, data waiver, protocol approval, packaging change, GHS label update). Backlog and wait-time differ by type, so this taxonomy is load-bearing.  
- **Per type:** the required document / evidence package (high level — cover letter, application form, List I / List II dossier, proof of payment, labels, SDS, letters from manufacturer / formulator, 5-batch analysis or Certificate of Analysis, etc.); the official process STAGES (verification → scientific screening → evaluation → decision → appeal); and the official TIMEFRAME in calendar days.  
- **Classification / typing axes as the registrar actually defines them** — the product "function"; legal pathway / formulation type (+ CIPAC / FAO codes); Fertilizer Group 1/2/3 vs agricultural remedy; and the **B/K/L/M** registration-number classes — reconciled against the tracker's current "functional category / legal pathway / M-L-K classification" model. (Note the likely M/L/K vs B/K/L/M mismatch explicitly.)  
- **What "registrar reference" and "proof" actually mean at each stage** — e.g. application receipt vs post-registration number; a dossier vs a single proof file.  
- **Fees per type** (from the tariffs gazette).

**Then:**

6. Map all of the above onto the tracker's current intake fields, status model, and dashboard metrics.  
7. Produce a **GAP TABLE**: \[tracker currently has\] vs \[registrar requires\] vs \[match / mismatch / missing / needs decision\].  
8. Produce a **SPECIALIST QUESTION LIST**: the genuinely ambiguous items where the documents are silent or unclear and the domain expert must decide.

**Out of scope for this session:**

- Do **not** reproduce List I / List II or the full chemistry data requirements field-by-field. Capture their existence, purpose, and headline data categories; the tracker references dossier readiness, it does not re-implement the dossier. (An exhaustive field-level extraction is a separate, later pass if the user asks for it.)  
- Do **not** build, edit, or restyle any wireframe.  
- Do **not** begin production / architecture work.

## Rules

- **Cite every extracted requirement** to its source: document name \+ section / page. If it isn't in a document, it isn't a requirement — it's an open question.  
- **Reconcile onto the existing model.** Map registrar concepts onto the tracker's three axes, relationship types, statuses, and visibility / consent rules already defined in `context-and-decisions-v1.md`. Do not invent a parallel model.  
- **Never fill a gap with a plausible-sounding requirement.** Ambiguity → specialist question, explicitly. Say "the documents do not specify" rather than guessing.  
- **Do not edit `context-and-decisions-v1.md` or any durable file directly.** Where you think a rule should change, PROPOSE it (quote current text, state proposed text, cite the source) and stop for the user's decision.  
- Any illustrative records remain **fictional and clearly labelled**; the requirements themselves must be faithful to the documents.

## Autonomy — stop and ask first

Pause and ask the user before:

- making any substantive modelling decision (e.g. how to reconcile M/L/K with B/K/L/M, or how biofertiliser / biopesticide / biostimulant map onto the remedy vs fertilizer pathways);  
- proposing any change to a durable file;  
- expanding scope beyond the list above.

Hard checkpoints:

- **Checkpoint A** — after reading everything, before writing the spec: share a one-page outline of the type taxonomy \+ your reconciliation approach, and confirm.  
- **Checkpoint B** — after the gap table \+ specialist questions, before writing or proposing any durable change: confirm.

## Deliverables

- `registrar-requirements-spec-v1.md` — the structured, fully-cited spec (taxonomy; per-type package / stages / timeframe / fee; classification axes; reference / proof meaning).  
- A gap table (in the spec or its own file).  
- A specialist question list (in the spec or its own file).  
- A short list of PROPOSED (not applied) changes to `context-and-decisions-v1.md`.

## Final response

Report: files created; what was verified vs assumed; the open specialist questions; any place the documents conflicted; and the recommended next step.  
