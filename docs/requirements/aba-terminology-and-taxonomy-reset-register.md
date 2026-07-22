# ABA Terminology And Taxonomy Reset Register

Last updated: 2026-07-21

## Purpose

Provide one working language reference for the first-release website reset. It separates:

- words a visitor can understand and should see
- internal implementation terms that should remain internal
- regulator-defined terms that must preserve source meaning
- labels that still need an ABA decision

This register is intentionally not a policy document. A term marked `Decision needed` must not be made definitive in website copy, a form label, or data logic until ABA agrees it.

Source basis:
- `aba-ux-workshop-decision-digest-2026-07-15.md`
- the 15 July 2026 UX workshop recording and transcript
- the final ABA brochure
- existing membership and tracker requirements, used only where they do not conflict with the workshop reset

## 1. Public journey terms

| Term | Meaning | Use on public site? | Status |
|---|---|---:|---|
| `Founding member` | A known early ABA participant helping establish the alliance. Founding members complete the member application first. | Yes where the founding role is relevant, including a permitted founders list and logos | Confirmed |
| `Member application` | The one application used by founding members first, later cohorts next and public applicants when ABA is ready. Its visible copy and questions do not change by cohort. | Controlled-release only at first; public later if approved | Confirmed |
| `Founding-member details capture` | An internal operational description for reconciling a founding member's application with known records. It is not a public form name or variant. | No | Internal only |
| `Cohort source` | Internal provenance attached by ABA or the release channel. It must not appear as a visitor-selected field or change the form. | No | Internal only |
| `Membership interest` | A public request to hear when membership opens. It does not create an application or membership. | Yes | Confirmed concept; final button/form wording needed |
| `Membership application` | A reviewed submission from the canonical member-application page. Submitting does not itself confirm or activate membership. | Controlled-release only at first; may become public later | Confirmed |
| `Member` | A person or organisation with an approved and activated ABA membership relationship. | Yes, when the activation condition is clear | Confirmed principle |
| `Technical Network` | The ABA route for specialists and enabling contributors. | Yes, only if the available action and response boundary are clear | Existing direction; release scope needs confirmation |

Do not use as substitutes:

- `interest` is not `application`
- `application` is not `membership`
- `approval` is not `activation`
- founding members, later cohorts and eventual public applicants use the same member application; source and reconciliation differences remain internal

## 2. Membership states

| Layer | Approved working labels | Notes |
|---|---|---|
| Membership application | `Submitted`, `More information required`, `Approved`, `Declined`, `Withdrawn` | `Submitted` is the first form-completion state. The review queue is an internal work view, not a competing public status. |
| Membership relationship | `Pending activation`, `Active`, `Suspended`, `Deactivated`, `Lapsed` | `Lapsed` and its payment/renewal rule need policy confirmation. Do not expose a public self-service cancellation flow in v1. |

Do not use `Draft` for a membership application in v1. The form does not support save-and-return behaviour.

## 3. Data and relationship terms

| Term | Meaning | Public or internal? | Status |
|---|---|---:|---|
| `Person` | One named human contact. A person may be linked to an organisation, membership, technical network, tracker activity, or public interest. | Internal | Confirmed system concept |
| `Organisation` | A company, institution, lab, agency, association, or other body that relates to ABA. | Public where appropriate; internal as a record | Confirmed system concept |
| `Organisation-person role` | The relationship between a person and organisation, including authority or primary-contact context. | Internal | Confirmed system concept |
| `Membership application` | The reviewed submission created from the canonical member-application page. Existing membership history may change how ABA reconciles the submission, not how the page is described. | Public page name and internal record concept | Confirmed |
| `Membership relationship` | The approved ongoing relationship after membership activation. | Internal | Confirmed system concept |
| `Public interest contact` | A CRM/contact relationship created when someone asks to hear about ABA or future membership opening. It is not a member, membership application, or membership relationship. | Internal record; public form wording still to be agreed | Confirmed principle |
| `Communication consent` | Permission to send the person ABA updates for the stated purpose. | Internal term; use plain consent wording in the interface | Preferred |
| `Communication preferences` | Optional later choices about topics or channels for ABA updates. | Internal term; expose only if real choices are available | Preferred |

Use `Receive ABA updates` (with clear supporting consent language) rather than `subscribe`, `subscription`, or `contact subscription` in public UI.

## 4A. Member value terminology

| Term | Working meaning | Public-use rule |
|---|---|---|
| `Structured registrar engagement` | ABA may consolidate and represent relevant, authorised member registration matters in its engagement with the registrar, subject to membership, consent, review, and an agreed process. | Prefer a plain explanation over the term itself. Never imply personal or unrestricted regulator access, faster approval, or guaranteed results. |
| `Named registrar-facing use` | A member authorises ABA to use relevant information about their matter in a defined engagement with the registrar. | Requires an agreed authorisation, inclusion, and withdrawal process before it is promised. |
| `Member product visibility` | Eligible, reviewed member product information may be considered for named visibility through ABA’s approved channels. | Do not imply automatic listing, endorsement, registration approval, or marketing results. |
| `Technical and market-development channels` | Developing ABA channels through which accurate, reviewed information may reach relevant technical or agricultural audiences. | Do not promise referrals, sales, leads, individual recommendations, or a standard marketing package. |

## 4. Tracker terms

| Term | Meaning | Use rule |
|---|---|---|
| `Registration application` | One regulator-facing application-level record. This is the unit relevant to tracker status and any aggregate analysis. | Preserve as an internal/system term unless plain-language copy is clearer in context. |
| `Service request` | The associated administrative request/route used in the regulator process. It may relate to one or more registration applications. | Use only with source-grounded explanation. Do not collapse it into `application`. |
| `Application type` / `service type` | The regulator-defined category of work, which affects the evidence package and official timing. | Use source-defined labels in tracker data. |
| `Official stage` | A regulator-process stage, such as verification, scientific screening, evaluation, decision, or appeal. | Preserve source terminology and source provenance. |
| `Current status` | The current progress/status of a specific registration application. | Keep distinct from official stage. |
| `Public tracker view` | A future public presentation based on permitted, real aggregate information. | Avoid calling it a dashboard until there is sufficient real data to justify one. |

Do not use in public copy without an agreed plain-language alternative:

- `public aggregate signals`
- `regulatory intelligence`
- `dossier readiness`
- `canonical record`
- `shared spine`
- `continuity`

## 5. Strategic and organisational language

| Term | Working meaning | Status |
|---|---|---|
| `African Biologicals Alliance` / `ABA` | A membership-based sector body advancing fairer markets, stronger regulatory pathways, and a coherent African voice for biological alternatives. | Brochure baseline |
| `Locally rooted biologicals` | Biologicals activity with meaningful local production, formulation, research, employment, skills, or economic participation. | Preferred public wording until legal membership criteria are settled |
| `Independent biological manufacturer` | Legacy/preliminary eligibility wording. | Do not use as though it is a settled legal test |
| `South African Biological Manufacturer` | A proposed legal/policy definition discussed in the founding group. | Decision and legal review needed |
| `Chapter` | A country-level ABA presence operating within a continental framework. | Strategic direction; do not imply existing chapters unless real |
| `Product clarity` | Clear, structured product information that supports credibility and appropriate regulatory/technical discussion. | Brochure pillar; publish only verified/consented information |

## 6. Process for new terms

Before a new term enters the build, record:

1. proposed wording
2. plain-language meaning
3. public, private, internal, or regulator-defined audience
4. source/owner of the definition
5. whether it creates an obligation, eligibility rule, or service promise
6. decision status

If any of those are unknown, use neutral explanatory language or keep the term out of the interface.
