# ABA Tracker — Reusable Session Prompt Template (v2)

Fill the \[brackets\], attach the listed files, delete sections you don't need. Save each filled copy as `<task>-prompt-vN.md` in the relevant folder, matching the workspace convention (durable, versioned markdown).

**Why this shape works:** a good session prompt does five things — sets the role, points at the source of truth, states one clear task with explicit in/out scope, fixes the standing rules, and defines where the model must stop and check with you. Vagueness in any one of those is where drift starts.

**Standing domain frame (MUST KEEP — do not delete this block, even when trimming others. Canonical version: `context-and-decisions-v1.md` → "Framing And Terminology"):** These prompts describe an agricultural-sector regulatory-administration project — tracking the registration of ordinary farm inputs (microbial inoculants, plant biostimulants, biofertilisers, plant extracts, and biological crop-protection products) with a national agriculture department under Act 36 of 1947\. "Biological" refers only to the natural origin of these crop inputs. Three rules apply automatically to every session and artifact:

1. **Lead with this framing** — it keeps the domain unambiguous for a human reader and any automated content filter, without hiding anything.
2. **Prefer domain terms** — "agricultural remedy / crop input / registration paperwork" over the bare word "biological"; pair "biological" with its noun when used.
3. **Name the regulatory purpose first** before any toxicology / GHS / chemistry detail (e.g. "the Act 36 hazard-classification section of the label requirement").

## Your role

You are working on \[product / area\]. \[1–2 sentences: what it is, who it's for, how it connects to the wider ABA website / CRM work — **lead with the agricultural-regulatory framing above**.\] This is a \[planning / extraction / wireframe / production\] task. Do not touch \[what to leave alone — name it\].

## Read these first, in this order

**Source of truth (obey; do not contradict or silently overwrite):**

- `README.md`  
- `context-and-decisions-v1.md`  
- `starting-prompt-v1.md`  
- \[relevant folder brief(s)\]

**Prior work to build on (don't repeat):**

- \[existing notes / specs already covering this ground\]

**Inputs for this task (with how to read each):**

- \[file\] → \[tool / method — flag legacy `.doc` / `.xls` conversions and any OCR needs; use the file-reading skill router\]

## Task

\[1–3 sentences: the specific deliverable.\]

- **In scope:** \[concrete things to produce\].  
- **Out of scope:** \[what to leave alone — especially "don't touch the wireframes" / "don't start production" when true\].

## Rules (standing)

- **Cite sources; don't invent.** If it isn't in a source, say so — it's an open question, not a fact.  
- **Reconcile onto the existing model; don't invent a parallel one** or silently overwrite durable files. Propose durable changes (quote current → proposed → cite), don't apply them.  
- **Fictional data only, clearly labelled.**  
- **Durable markdown is the real artifact; wireframe HTML/CSS is disposable** — don't treat it as spec.  
- **Autonomy:** \[pick one\] stop and ask before any substantive decision / decide but flag assumptions / move fast and I'll review afterwards.

## Checkpoints

- \[Checkpoint: after X, before Y — share Z and confirm.\]  
- \[Add more as the task warrants; fewer, meaningful ones beat many trivial ones.\]

## Deliverables

- \[durable artifact(s), versioned `.md`\]

## Final response

Report: files created; what was verified vs assumed; open questions; and the recommended next step.

### Quick tips

- **Apply the three framing rules** (see the standing domain-frame block — they're mandatory, not optional): lead with the agricultural framing; prefer domain terms over a bare "biological"; and name the regulatory purpose before any tox / GHS / chemistry detail. Precise, benign context reads better to a person and keeps automated filters from over-reacting — and it's better prompting regardless of any filter.  
- **One task per prompt.** If you're tempted to add a second goal, that's a second prompt.  
- **Name what NOT to do.** "Don't restyle the wireframes" prevents the most common drift.  
- **Attach the source-of-truth files every time** — don't rely on the model remembering them across sessions.  
- **Match your autonomy setting to the risk.** "Ask first" for anything touching the data model or durable files; looser is fine for throwaway exploration.  
- **Version the prompt** (`-vN.md`) so the handoff history stays legible, like your existing `next-session-*` prompts.

