# ABA Terminology Review Register

Last updated: 2026-07-14

This note pulls vague, overloaded, or invented repo terminology into one place for review.

Purpose:

- identify phrases that are not good enough for workshop or product use
- state what they appear to mean
- decide whether to rename, define, or delete them

## 1. How this register was built

Initial sweep command:

```bash
rg -n "canonical|spine|continuity|signal|packet|route-owned|field-owning|trusted intelligence|governed decision trail|received-packet|received packet" docs/requirements registration-tracker HANDOVER.md
```

This is not a perfect detector. It is a practical first-pass list of terms most likely to hide ambiguity or invented abstraction.

## 2. Terms needing review

| Term or phrase | What it appears to mean | Why it is a problem | Recommended action | Representative references |
|---|---|---|---|---|
| `public aggregate signal output` | a public-facing registration tracker dashboard or public reporting view | too abstract; not a thing anyone would naturally name | rename to `Public registration tracker dashboard` | `docs/requirements/aba-system-model-workshop-reference.md:198` |
| `public aggregate signals` | public dashboard metrics derived from reviewed tracker records | still vague unless tied to a visible surface | rename or define as `public dashboard metrics` or `public dashboard view` | `docs/requirements/aba-system-model-workshop-reference.md:185`, `docs/requirements/registration-tracker-presenter-tightening-plan.md:54` |
| `canonical records` | the agreed shared system records | useful internally, but vague in workshop material | use `shared system records` in user-facing/system-model notes | `HANDOVER.md:23`, `docs/requirements/aba-admin-ia-and-module-plan.md:11` |
| `spine` / `data spine` / `record spine` | the shared core data model | shorthand that assumes people already know the internal framing | replace with `shared core data model` or `shared record model` where clarity matters | `HANDOVER.md:154`, `docs/requirements/aba-prototype-system-model.md:8`, `registration-tracker/data-model-v1.md:191` |
| `continuity` | linking the same person, organisation, and history across routes over time | meaningful internally, but too abstract if left undefined | define as `record linking across routes over time` | `HANDOVER.md:30`, `docs/requirements/aba-public-capture-journeys-and-record-model.md:403`, `docs/requirements/aba-system-model-workshop-reference.md:452` |
| `lead` / `membership lead` / `technical network lead` | older shorthand for a person or organisation not yet normalized into the shared model | ambiguous because the repo is moving away from `Lead` as a primary object | review and replace with `prospect Person`, `prospect Organization`, `MembershipApplication`, or `ContactSubscription` as appropriate | `docs/requirements/african-biologicals-alliance-admin-prototype-spec.md:95`, `docs/requirements/aba-membership-admin-crm-spec-gap-pass.md:111` |
| `received packet` / `received-packet record` | the material ABA receives, likely shaped by the Service Request Form plus attached application form(s) | maybe valid, but still an ABA modelling choice rather than an established system term | keep only if explicitly defined; otherwise say `receipt/admin details` | `registration-tracker/data-model-v1.md:73`, `docs/requirements/aba-system-model-workshop-reference.md:54` |
| `route-owned permission bundle` / `field-owning consent bundle` | a consent record attached to the route that captured it | too much internal abstraction in one phrase | say `consent record attached to the source route` | `docs/requirements/aba-system-model-workshop-reference.md:194`, `docs/requirements/aba-unified-membership-tracker-system-contract.md:173` |
| `governed decision trail` | operator audit trail of review decisions | abstract and corporate-sounding | rename to `operator review history` or `operator decision history` | `docs/requirements/aba-system-model-workshop-reference.md:195`, `docs/requirements/aba-system-model-workshop-reference.md:438` |
| `trusted intelligence` | reviewed tracker data that ABA can actually use in dashboards, advocacy, or exports | sounds inflated and unclear | replace with `reviewed tracker data` unless a very specific evidence product is intended | `docs/site/operator-workspace.html:347`, `registration-tracker/admin-operator-review/index.html:139` |
| `packet` / `RegistrarPacket` | a versioned export batch prepared for registrar-facing use | partly real, but still underdefined unless the export behavior is shown | keep the term only with explicit definition: `registrar export batch` | `docs/requirements/aba-system-model-workshop-reference.md:197`, `registration-tracker/registrar-list/registrar-list-brief-v2.md:20` |
| `system category` | the agreed internal taxonomy label for a route or membership type | workable, but still jargon | use `agreed membership category` or just name the category directly | `docs/requirements/aba-system-model-workshop-reference.md:134`, `docs/requirements/aba-system-model-workshop-reference.md:279` |
| `source-defined business object` | a thing explicitly defined in the regulator source docs | precise but heavy | acceptable in technical notes; avoid in workshop prose | `docs/requirements/aba-system-model-workshop-reference.md:65`, `registration-tracker/data-model-v1.md:180` |
| `workload and progress tracking` | the operational use of application records | not wrong, but bland and generic | use only where the audience already understands the model | `docs/requirements/aba-unified-membership-tracker-system-contract.md:162` |

## 3. Terms that are probably fine if defined once

These do not look like nonsense by themselves, but they still need one explicit definition in the model:

| Term | Suggested definition | Representative references |
|---|---|---|
| `Application` | the application-level regulatory record whose progress ABA tracks | `registration-tracker/data-model-v1.md:106`, `docs/requirements/aba-system-model-workshop-reference.md:64` |
| `Product` | the product being registered; not the same as an application | `docs/requirements/aba-system-model-workshop-reference.md:184` |
| `ReviewCase` | the operator review record attached to a source record | `docs/requirements/aba-system-model-workshop-reference.md:195` |
| `RegistrarPacket` | a versioned export batch for registrar-facing engagement | `docs/requirements/aba-system-model-workshop-reference.md:197` |
| `receipt or intake details` | admin details about how ABA received the material | `docs/requirements/aba-system-model-workshop-reference.md:65`, `registration-tracker/data-model-v1.md:202` |

## 4. Immediate changes recommended

1. Rename `public aggregate signal output` everywhere it appears.
2. Replace `canonical records` and `spine` in workshop-facing notes with plainer names.
3. Keep `RegistrarPacket` only if the export-batch concept remains in scope; otherwise hide it from workshop material.
4. Add one short glossary section to the main workshop note for any technical terms that stay.
5. Use this register as the single review list before further copy or UX work.
