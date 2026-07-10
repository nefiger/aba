# Registration Tracker — Context Summary (v2)

Snapshot of where the ABA registration-tracker work stands and the reasoning behind the current Fable prompts. Read this to get oriented without re-reading the working chat.

*v2 changes: added a "What this tool is — the space" section (the domain and purpose the tool serves); recorded the decision on how to frame the project for Fable; refreshed the deliverables list to the v2 prompts. Everything else is carried over from v1.*

## What this tool is — the space

The regulatory framework governing these products is unsettled, contested, and hard to navigate. The submission forms and guideline criteria exist, but in practice many biological agricultural inputs end up registered under one category when they arguably belong under another — the boundary between an agricultural remedy and a Group 1/2/3 fertilizer (and between biopesticide, biofertiliser, and biostimulant) is exactly where the ambiguity bites (see Finding 3). Registration is slow and difficult as a result.

**The tool does not try to fix any of that.** It does not adjudicate categories, resolve the ambiguity, or reengineer the registrar's process. Its job is narrower and factual — to *track* what is actually happening. It does two things:

1. **Per-company pipeline** — an individual company logs its products and the status of each registration submission, and sees its own pipeline. (This private view is also the participation incentive.)  
2. **Sector-wide picture** — the submissions the tool receives are aggregated into an anonymised, sector-level view of how registration is actually behaving: where time is lost, by application type and by stage. This serves both the named evidence-for-the-registrar purpose and the anonymised advocacy purpose.

Together these are meant to form a combined ("married") view into the registrar's office — one that serves the companies submitting *and* is useful to the registrar's own work.

*Working interpretation of "married view" (not yet confirmed — see open questions): the per-company pipelines and the sector aggregate unified into one coherent picture, and a view both the applicant side and the registrar can read from. To be pinned before it hardens into the model.*

The tracker is **not a replica of the submission forms.** It references what a submission requires (dossier readiness, application type, stage) without reproducing the forms field-by-field.

## Where things stand

Workspace principle: durable markdown (context, decisions, briefs) is the source of truth; the wireframe HTML/CSS is disposable. Five product areas: intake-flow, company-dashboard, public-dashboard, admin-operator-review, registrar-list.

Wireframes exist as v1 low-fidelity prototypes (note: they have drifted from the original "greyscale / no brand styling" rule into colour-coded UI — a constraint to re-assert or officially relax later).

Blocked: waiting on a domain specialist for the product-intake design.

Decision: run a registrar-requirements extraction first, before choosing between "go deep on one area" and "move toward production."

## Why extraction-first

The specialist gates interpretation of the intake, but not what the registrar's own forms and guidelines already say. Pulling submission requirements out of those documents is factual extraction, not judgement, so it isn't blocked — and it's what everything downstream depends on. The current intake fields and packet columns are the team's best-guess model; building production (or deepening any area) on an unverified data model is the expensive mistake. Verifying the spine first is cheap insurance. It also reframes the specialist meeting from a blank page into a review ("here's what the registrar requires vs what we capture; here are the confirmed fields, the gaps, and the ambiguities we need you to resolve"), produces a durable markdown artifact, and dissolves the deep-vs-production either/or — once the spine is verified, deepening intake to match real requirements is production-grade by definition.

## The regulatory corpus (Act 36 of 1947, South Africa)

Read directly during the working session (7 of 8):

- **Application form (2023) .docx** — main registration form \+ List I (technical-grade active ingredient) and List II (formulated product) dossier indexes. The real intake reality; far richer than the current wireframe (function, formulation type \+ CIPAC/FAO code, IRAC/HRAC/FRAC mode-of-action codes, SEARCH-country registration, status in JP/EU/AU/US, EPR producer-responsibility org, SACNASP number of signatory).  
- **Reg\_tracker\_notes .docx** — the user's own first-pass reconciliation of this corpus against the tracker. Build on it; don't repeat it.  
- **Guidelines on Data Requirements 2015** — evidence required per registration category.  
- **Registration Process guide 2015 (time frames)** — applicant rules, review pipeline, and the official per-category timeframes.  
- **Chemistry Data Requirements 2021** — deep TGAI/equivalence/formulation chemistry; also categorises botanical actives by certainty/risk.  
- **GHS guideline 2022** — what a GHS label update requires (cover letter, service form, new label, declaration, SDS, proof of payment, full classification rationale).  
- **Tariffs 2026–2027 gazette** — fees per application category.

Not opened directly (second-hand, from Reg\_tracker\_notes):

- **Service Request Form .doc (legacy)** — the admin routing/payment form; carries the service-type list. The Fable prompt instructs converting and reading it directly. *(Still the one "not opened directly" gap in the corpus; retire it by reading the actual form.)*

## Five findings that reshape the tracker

1. **"Application" is a taxonomy of service types**, each with its own evidence package and its own official timeframe. Process guide (Table 1): new molecule \~627 calendar days, generic \~418, new formulation / major amendment \~418, label extension \~418, new source \~208, minor/admin/transfer \~118, renewal \~90. → Backlog and "benchmark vs sector median" can be grounded against these official timeframes, not just raw waits.  
2. **Official status stages are defined:** verification → scientific screening → evaluation → decision → appeal (plus "referred back / rejected for missing info"). → These are the stages to log "time lost per stage" against, as the starting prompt wanted.  
3. **Classification axes need reconciling, not inventing.** Biofertiliser vs biopesticide vs biostimulant don't all sit under Act 36: biopesticides are agricultural remedies, but biofertilisers likely route to the Fertilizer Group 1/2/3 pathway — a different Act treatment. Legal pathway is the load-bearing axis, not the marketing category. (This is the same boundary where the real-world miscategorisation happens; mapping to confirm with the specialist.)  
4. **Likely M/L/K mismatch.** The GHS and fertilizer-label documents reference B/K/L/M registration-number prefixes, which appears to differ from the tracker's standalone "M/L/K classification code." (To confirm with the specialist.)  
5. **"Proof" and "reference number" are stage-dependent.** The real proof is a dossier (List I \+ List II \+ supporting studies), and a registration number only exists post-registration — pre-submission there's a receipt/application reference, not a reg number. The intake's "registrar reference or unavailable reason" needs that nuance.

## Scope decision for the extraction

In: service-type taxonomy; per-type evidence package / official stages / timeframe / fee; classification axes reconciled against the tracker's model; what "reference" and "proof" mean at each stage; a gap table (tracker has vs registrar requires) and a specialist question list. Out: field-by-field reproduction of List I/II or the full chemistry dossier (the tracker references dossier readiness, it doesn't re-implement it); any wireframe or production work. An exhaustive field-level extraction is a separate later pass if wanted.

## Working rules that shaped the prompts

- Cite every requirement to its source; if it isn't in a document, it's an open question, not a fact.  
- Reconcile onto the existing model; don't invent a parallel one; propose durable changes, don't apply them.  
- Fictional data only, clearly labelled.  
- Durable markdown is the artifact; wireframe HTML/CSS is disposable.  
- Autonomy: stop and ask before any substantive modelling decision or durable-file change.  
- **Framing for Fable (v2 decision):** frame the project by its true domain — agricultural-input registration administration — and lead with that framing in every prompt. "Biological" refers only to the natural origin of ordinary crop inputs. This is precision, not disguise: decontextualised phrasing like "biological inputs" is what makes a conservative content filter over-react, so foregrounding the agricultural-regulatory frame both reads better to a person and gives a classifier the context to route correctly. It can't guarantee a given Fable run won't be redirected to Opus, and the extraction still works if it is — but accurate framing is the best available lever and is better prompting regardless.

## Open questions

For the specialist:

- How does the tracker's M/L/K map onto the registrar's B/K/L/M registration-number classes?  
- How do biofertiliser / biopesticide / biostimulant map onto the remedy vs Fertilizer Group 1/2/3 pathways?  
- Which official process stages should the tracker expose, and how do they map to the current "submitted / under review / accepted / needs clarification" states?  
- Should the tracker benchmark actual waits against the official per-type timeframes?

For the user / team (product definition):

- **What "married view" means precisely** — the per-company \+ sector aggregate unified into one picture, a shared applicant-and-registrar view, or both. Confirm before it shapes the data model.

## Deliverables produced \+ next step

- `registrar-extraction-prompt-v2.md` — ready-to-paste task prompt; now opens with a domain scope note and a "space this tool works in" section, and foregrounds the agricultural-regulatory framing. (v1 task/scope/rules unchanged.)  
- `session-prompt-template-v2.md` — reusable, versioned prompt template; now carries a standing domain-frame block and a framing quick-tip so every future session inherits the framing.  
- `registration-tracker-context-summary-v2.md` — this file.

Next: run the extraction in a fresh session with just the registration-tracker folder \+ `registrar-extraction-prompt-v2.md` attached, so it starts with a clean context. Uploading the actual Service Request Form (legacy `.doc`) into that session retires the last second-hand gap in the corpus.  
