# Existing Requirements Reconciliation Matrix

Status: document-level classification complete; rule-level reconciliation in progress
Last updated: 2026-07-20

## Purpose

Classify every document currently in `docs/requirements/` against the approved soft-launch direction. This prevents an old task list, prototype screen, visual token, or speculative service from silently overriding the new PRD and reference prototype.

## Outcome legend

- `ADOPT` — remains a governing input, subject to the newer decision register.
- `ADAPT` — useful intent/rules are retained but must be rewritten or revalidated.
- `DEFER` — valid later work, not part of first-release scope.
- `REJECT` — must not be used as launch authority.
- `EVIDENCE` — preserves history/context but is not itself a product contract.
- `OWNER DEPENDENCY` — another owner or formal policy decision controls the final requirement.

More than one outcome can apply when a document mixes enduring domain insight with obsolete screens or delivery assumptions.

## Public site, launch, brand, and copy

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `aba-first-release-website-reset-spec.md` | `ADAPT` | Controlled public/private release, core journeys, tracker boundary, truthful capability, brochure-led reset | Static-prototype scope presented as production delivery; unresolved decisions now settled; any conflict with the new PRD |
| `aba-homepage-strategy-and-copy-notes.md` | `ADAPT` | ABA as a membership sector body, Africa-wide/SA-now truth, membership/tracker distinction, public-language guardrails | Existing HTML or restrained old visual style as design authority; three equal product tiles as default structure |
| `aba-public-brand-and-footer-spec.md` | `ADAPT` + partial `REJECT` | Shared public identity, consistent navigation/footer purpose, governance/privacy visibility | Old logo, palette, lockup dimensions, or page-shell implementation; final logo and new palette now govern |
| `aba-public-site-copy-working-document.md` | `REJECT` as launch copy + `EVIDENCE` | Historical content inventory and useful facts that can be re-sourced | Page-by-page copy, open public application routes, old taxonomy, old promises, fake/public dashboard language |
| `african-biologicals-alliance-html-spec.md` | `REJECT` as implementation/design spec + `ADAPT` | High-level public purpose, geographic truth, accessibility/responsive intent | Its IA, tokens, typography, hero, cards, layout, and HTML outline; it is superseded by the new UX brief/prototype |
| `aba-content-taxonomy-and-semantic-visual-language.md` | `ADAPT` | Separation of public narrative, applications, knowledge, workflow, evidence, and consent-aware data | Old visual motifs, internal jargon, and any semantic colour/icon system not re-established by the new prototype |
| `aba-visual-language-conventions.md` | `ADAPT` + partial `REJECT` | Clear action/state semantics, privacy cues, coherent page families | Existing visual conventions, typography, colours, icon treatments, and layout rules as binding design authority |
| `aba-symbol-family-implementation-notes.md` | `DEFER` + `EVIDENCE` | Asset provenance and lessons from failed placement/scale | Symbol family as required launch identity or decoration; tiny badges and cropped fragments are expressly rejected |

## Accepted decisions, membership value, terminology, and evidence

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `aba-ux-workshop-decision-digest-2026-07-15.md` | `ADOPT` | Accepted journey, tracker, reset, terminology, and exclusion decisions | Questions later resolved by Jen must not remain open |
| `aba-membership-value-and-engagement-model-notes.md` | `ADOPT` + `ADAPT` | Membership as meaningful organised participation; strong claim boundaries; tracker not a gate | Any implication that membership value itself is deferred or a ranked hierarchy; mechanisms must reflect current readiness |
| `aba-terminology-and-taxonomy-reset-register.md` | `ADOPT` | Interest/application/membership/activation distinctions; public/internal/regulator language discipline | Terms superseded by newer decisions; internal jargon in public UI |
| `aba-whatsapp-group-synthesis-2026-07-20.md` | `EVIDENCE` | Locally rooted, constructive, evidence-led positioning; governance and service-boundary cautions | Private commentary, allegations, contact details, unreviewed proposals, or source material presented as ABA policy |
| `aba-founding-members-demo-and-debrief-notes.md` | `EVIDENCE` + `ADOPT` where confirmed | Founder reactions, privacy boundaries, cohort logic, system-level intent | Old target dates, demo-specific UI assumptions, or unresolved ideas treated as current decisions |
| `aba-update-strategy-next-steps-email-notes.md` | `EVIDENCE` | Founding-member proposition, cohort sequence, platform intent, operational needs | Email narrative as final public copy or unapproved future mechanisms as current services |
| `aba-email-derived-task-list.md` | `EVIDENCE` + `ADAPT` | Useful source checklist and outstanding operational/governance work | Historical task order that parks launch-critical tracker integration or directs work back into old pages |
| `aba-active-now-checklist.md` | `EVIDENCE` + `REJECT` as current plan | Record of the June tranche | Current priority authority; `soft-launch/PLAN.md` supersedes it |

## Membership, CRM, intake, consent, and shared data model

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `aba-membership-admin-crm-spec-gap-pass.md` | `ADAPT` | Domain gaps, person/organisation relationships, review/activation separation, operational ownership needs | Proposed record structure without verification against the production monorepo; old `canonical spine` language |
| `aba-membership-type-policy.md` | `OWNER DEPENDENCY` + `ADAPT` | Applied versus approved type, policy-driven categories, dues/privilege/activation separation | Unapproved categories, fees, eligibility, voting rights, lapse, or renewal rules as launch fact |
| `aba-public-capture-journeys-and-record-model.md` | `ADAPT` | Distinct journey outcomes and shared person/organisation relationships | Separate founder data shape, public open application assumptions, or page-level records that fragment the model |
| `aba-public-capture-field-map.md` | `ADAPT` | Factual field inventory, deduplication needs, role/authority, consent separation | Old route-specific duplication, loose Technical Network capture, old types, and founder field omissions |
| `aba-unified-membership-tracker-system-contract.md` | `ADAPT` + `OWNER DEPENDENCY` | Shared person/organisation model, journey separation, explicit consent/visibility, state discipline | Old terminology, prototype-specific surface list, unresolved tracker details, or a model that founders can bypass |
| `aba-prototype-system-model.md` | `ADAPT` | Core entities, roles, relationships, states, and visibility questions as audit input | Prototype UI as proof that the production model exists; any fields or states contradicted by current decisions |

## Admin and operational surfaces

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `aba-admin-pause-and-public-data-capture-shift.md` | `ADOPT` as sequencing rationale | Public capture must be coherent before admin specificity; unresolved attributes should not be invented in screens | A permanent deferral of operational readiness; production still needs minimum secure review/handling before launch |
| `aba-admin-surface-taxonomy.md` | `ADAPT` | Queue, managed-record, reference-data, and observational distinctions | Existing page set as required launch admin IA |
| `aba-admin-ia-and-module-plan.md` | `DEFER` + `ADAPT` | Record-oriented admin principles and work-surface rules | Full module/navigation plan in the first release unless the production audit proves it necessary |
| `aba-admin-design-brief.md` | `DEFER` + `EVIDENCE` | Operator jobs, consequential actions, state visibility, audit needs | Its desktop UI and visual design as launch authority |
| `african-biologicals-alliance-admin-prototype-spec.md` | `DEFER` + `ADAPT` | Minimum operator jobs for contacts, applications, membership, Technical Network, and tracker handling | Broad dashboard, charts, intelligence, or complete admin experience as soft-launch scope |

## Prototype process and release discipline

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `aba-prototype-foundation-and-design-system-notes.md` | `ADAPT` | Approved prototype as deliberate product/design specification; complete route/state thinking | The old prototype foundation or extracted design system as the new starting point |
| `aba-prototype-consistency-checklist.md` | `ADAPT` | Cross-page navigation, state, responsive, and completeness checks | Checks tied to existing pages/assets rather than the new prototype |
| `aba-release-snapshot-readiness.md` | `ADAPT` | Explicit signoff, versioned snapshot, traceability, and release gate discipline | Treating a static prototype tag as production release readiness |
| `aba-surface-boundary-principle.md` | `ADOPT` | Keep public narrative, private intake, operator work, tracker, and other audience surfaces appropriately separated | Launching internal/admin surfaces through public navigation |

## Tracker and Lyle-owned work

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `registration-tracker-presenter-branch-status.md` | `OWNER DEPENDENCY` + `EVIDENCE` | Historical branch/handoff context | Stale branch state as current implementation truth |
| `registration-tracker-presenter-implementation-lessons.md` | `OWNER DEPENDENCY` + `ADAPT` | Useful tracker UX and implementation lessons after comparison with Lyle's landed work | Presenter details that conflict with the landed tracker |
| `registration-tracker-presenter-tightening-plan.md` | `OWNER DEPENDENCY` + `EVIDENCE` | Historical refinement intent | Soft-launch tracker redesign backlog owned by this workstream |
| `registration-tracker-site-integration-decision-map.md` | `OWNER DEPENDENCY` + `ADAPT` | Website/tracker boundary questions and integration options | Any option treated as final before Lyle's route and implementation are reviewed |
| `registration-tracker-site-integration-implementation-plan.md` | `OWNER DEPENDENCY` + `ADAPT` | Landing, navigation, terminology, return-route, state, and handoff acceptance needs | Old route assumptions, placeholder tracker integration, or implementation before Lyle's handover |

## Explorer, intelligence, and broader future platform

| Existing document | Outcome | Carry forward | Do not carry forward |
|---|---|---|---|
| `biologicals-explorer-audience-and-ia.md` | `DEFER` + `EVIDENCE` | Future audience and knowledge architecture context | Explorer as launch-critical work or a hollow public route |
| `biologicals-explorer-data-expansion-ux-notes.md` | `DEFER` + `EVIDENCE` | Future data/provenance/UX lessons | Expanded Explorer scope in the soft launch |
| `african-biologicals-alliance-flow-intelligence-asset-spec.md` | `DEFER` + `EVIDENCE` | Broader system/value-flow understanding | Standalone intelligence asset as required public-launch surface |
| `african-biologicals-alliance-product-requirements.md` | `ADAPT` + `DEFER` | Broader platform purpose, geographic rules, and system relationships | Its full deliverable set, intelligence/admin surfaces, or old immediate build targets as current scope |

## First rule-level reconciliation priorities

Document classification is complete. Before G1 closes, extract and reconcile the actual rules from the sources most likely to affect production behaviour:

1. `aba-public-capture-field-map.md`;
2. `aba-public-capture-journeys-and-record-model.md`;
3. `aba-membership-admin-crm-spec-gap-pass.md`;
4. `aba-membership-type-policy.md`;
5. `aba-unified-membership-tracker-system-contract.md`;
6. `aba-terminology-and-taxonomy-reset-register.md`;
7. the current monorepo ABA migrations/models/routes during Phase 3;
8. Lyle's landed tracker handover.

The output must be one explicit common record/field/state contract, not another narrative layer.
