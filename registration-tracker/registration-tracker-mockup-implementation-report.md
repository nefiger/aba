# Registration Tracker Static Mockup Implementation Report

Status: ready for browser review  
Specification: `docs/requirements/registration-tracker-module-change-spec.md`  
Branch: `codex/registration-tracker-mockup`

## Active release surfaces

- `soft-launch/prototype/registration-tracker.html`
- `registration-tracker/intake-flow/index.html`
- `registration-tracker/public-dashboard/index.html`
- `soft-launch/prototype/privacy.html`

The canonical landing qualifies a visitor before intake. Intake captures one South African Act 36 new registration in five stages, supports review and correction, and shows a client-side confirmation without persistence. Registration insights reports an honest collecting/insufficient-information state. Privacy explains raw review, the required data-use condition, combined non-named insights, and correction/contact handling.

## Release decisions applied

- New registrations only.
- South Africa / Act 36 only.
- The participant must be responsible or authorized.
- Self-reported ABA relationship is stored as category plus status and is not treated as verified.
- SACNASP status is required and self-reported; `Unknown` remains a completed answer.
- Required combined, non-named insight use is a submission condition, initially unchecked.
- ABA review outcomes are `Approved for insights`, `Needs clarification`, and `Excluded`.
- The confirmation states a two-week review target.
- No save/resume, named use, general updates, registrar export, fake identifiers, fake timestamps, or fake evidence appears.

## Visible-field map

| Field identifier | Type / allowed values | Requirement | Source | Visibility | Purpose / downstream use |
|---|---|---|---|---|---|
| `authority-confirmation` | boolean | required | participant | operator review | Confirm responsible or authorized contributor. |
| `participant-name` | text | required | participant | private / operator | Follow-up and review. |
| `participant-email` | email | required | participant | private / operator | Follow-up and clarification. |
| `participant-phone` | telephone | optional | participant | private / operator | Optional follow-up. |
| `participant-role` | text | required | participant | private / operator | Registration context. |
| `organisation-name` | text | required | participant | private / operator | Identify the submitting organisation internally. |
| `organisation-role` | controlled choice | required | participant | private / operator | Explain the organisation’s responsibility in the registration. |
| `organisation-country` | fixed `South Africa` | required | release context | reviewed aggregate only | Enforce the structured V1 jurisdiction boundary. |
| `aba-relationship` | category plus status pairs | required | participant | private / operator | Store self-reported category and status separately; never verify automatically. |
| `contact-permission` | boolean | required | participant | private / operator | Permit contact about this submission only. |
| `product-name` | text | required | participant | private / operator | Identify the product internally; never publish raw. |
| `functional-category` | controlled choice including `Not sure` | required | participant | reviewed aggregate | Compare like registrations when publication is supportable. |
| `legal-pathway` | `Agricultural remedy`, `Fertilizer`, `Not sure` | required | participant | reviewed aggregate | Act 36 pathway context without false precision. |
| `registration-type` | five approved new-registration choices | required | participant | reviewed aggregate | Apply the release-scope filter and later compare like with like. |
| `current-status` | controlled participant status | required | participant | private; reviewed aggregate after mapping | Record participant understanding separately from ABA mapping. |
| `status-date` | date | required | participant | private; reviewed aggregate | Support elapsed-time analysis after review. |
| `decision-expectation` | controlled expectation | required | participant | private / operator | Capture approximate decision position without fabricating a result. |
| `reference-issued` | `issued`, `not-available`, `unknown` | required | participant | private / operator | Record availability without collecting or inventing the reference number. |
| `reference-reason` | text | conditional | participant | private / operator | Explain why an expected reference is unavailable. |
| `supporting-information` | `Yes`, `No`, `Not sure` | required | participant | private; reviewed aggregate | Readiness signal; no dossier is stored. |
| `payment-status` | `Yes`, `No`, `Not sure` | required | participant | private / operator | Payment-readiness signal; no payment file is stored. |
| `sacnasp-status` | `Verified`, `Not verified`, `Unknown` | required | participant | private / operator | Self-reported accountability state; no number is collected. |
| `responsible-person-name` | text | optional | participant | private / operator | Optional Act 36 accountability context. |
| `responsible-person-role` | text | optional | participant | private / operator | Optional accountability context. |
| `residency-information` | controlled choice | optional | participant | private / operator | Conditional pathway context. |
| `appointment-confirmation` | text | optional | participant | private / operator | Conditional authority or appointment context. |
| `processing-acknowledgement` | boolean | required | participant | private / operator | Acknowledge handling, review, and clarification contact. |
| `insight-acknowledgement` | boolean, initially false | required | participant | private / operator; public-use gate | Confirm the condition for reviewed information to contribute to combined, non-named insights. |
| `submitted_at` | system event | production only | system | audit/private | Set by the production service only; the mockup does not fabricate it. |
| mapped official stage | controlled lookup | production only | derived / operator | reviewed aggregate | Keep participant status separate from ABA-reviewed mapping. |
| applicable published timeframe | lookup | production only | system/lookup | public methodology | Compare reviewed elapsed time with an owned source. |
| calculated open duration | derived number | production only | derived | reviewed aggregate | Support future evidence after publication rules are approved. |

## Explicit model differences

- The final change specification supersedes the older optional SACNASP treatment for this release: the visible self-reported status is required and accepts `Unknown`.
- The broader service taxonomy remains valid domain context, but the visible mockup filters to five new-registration types.
- The older open-access attestation behavior is superseded: the active journey qualifies for a responsible or authorized contributor and requires that confirmation in intake.
- The older optional aggregate choice is superseded: the required insight-use acknowledgement is a condition of tracker submission.
- Older named-use, general-updates, and registrar-export concepts are preserved only as future-domain context and have no active controls or links.
- The protected data-model file was not modified. These differences are release overrides recorded by the governing specification.

## Preserved archived and future pages

The following files were not modified and are not linked from active pages:

- `docs/registration-tracker/index.html`
- `registration-tracker/index.html`
- `registration-tracker/admin-operator-review/index.html`
- `registration-tracker/company-dashboard/index.html`
- `registration-tracker/registrar-list/index.html`
- `docs/site/workspace.html`
- `docs/site/operator-workspace.html`

## Production migration requirements

The static mockup deliberately does not implement persistence. Production work must provide:

- secure save and resume;
- `saved_at` separate from `submitted_at`;
- cryptographically secure, expiring, revocable resume tokens with server-side hashes;
- encrypted transport and rate limits;
- draft expiry, retention, and deletion rules;
- token invalidation on final submission;
- preservation of entered values after recoverable errors;
- secure participant editing after submission;
- membership verification through admin status links;
- duplicate detection and reconciliation;
- auditable ABA review and publication-inclusion decisions;
- publication thresholds and suppression rules;
- published-timeframe source ownership and clock treatment;
- analytics that never receive sensitive field values;
- production privacy, legal, security, notification, and accessibility review.

## Product-review items retained

- Final landing-page title.
- Final visible name for the insights page.
- Final public labels for the five new-registration types.
- Whether optional phone or organisation identifiers are needed downstream.
- Final source-approved official-stage labels.
- Final wording of the required data-use acknowledgement and privacy explanation.

No unresolved item was silently converted into production policy or functionality.
