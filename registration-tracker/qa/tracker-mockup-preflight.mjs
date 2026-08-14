import { readFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const qaDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(qaDirectory, "..", "..");

const pages = {
  landing: "soft-launch/prototype/registration-tracker.html",
  intake: "registration-tracker/intake-flow/index.html",
  insights: "registration-tracker/public-dashboard/index.html",
  resources: "registration-tracker/resources/index.html",
  privacy: "soft-launch/prototype/privacy.html",
};

const sources = Object.fromEntries(
  await Promise.all(Object.entries(pages).map(async ([key, relativePath]) => [
    key,
    await readFile(path.join(repoRoot, relativePath), "utf8"),
  ])),
);

const moduleJsPath = "registration-tracker/shared/registration-tracker-module.js";
const moduleJs = await readFile(path.join(repoRoot, moduleJsPath), "utf8");
const appJsPath = "soft-launch/prototype/assets/app.js";
const appJs = await readFile(path.join(repoRoot, appJsPath), "utf8");
const referenceJsPath = "registration-tracker/shared/registration-tracker-reference-data.js";
const referenceJs = await readFile(path.join(repoRoot, referenceJsPath), "utf8");
const lowDataFixturePath = "soft-launch/qa/tracker-insights-low-data.html";
const lowDataFixture = await readFile(path.join(repoRoot, lowDataFixturePath), "utf8");

const failures = [];
const checks = [];

function requireMatch(sourceKey, pattern, description) {
  if (!pattern.test(sources[sourceKey])) failures.push(`${sourceKey}: missing ${description}`);
  else checks.push(`${sourceKey}: ${description}`);
}

function forbidMatch(sourceKey, pattern, description) {
  if (pattern.test(sources[sourceKey])) failures.push(`${sourceKey}: found forbidden ${description}`);
  else checks.push(`${sourceKey}: no ${description}`);
}

const activeSource = Object.values(sources).join("\n");

for (const sourceKey of Object.keys(sources)) {
  forbidMatch(sourceKey, /href=["'][^"']*(?:docs\/registration-tracker|admin-operator-review|company-dashboard|registrar-list|docs\/site\/(?:workspace|operator-workspace))/i, "archived or future tracker link");
}

requireMatch("landing", /<aba-footer><\/aba-footer>/i, "canonical shared footer component");
for (const sourceKey of ["intake", "insights", "resources"]) {
  requireMatch(sourceKey, /<aba-footer base="\.\.\/\.\.\/soft-launch\/prototype\/"><\/aba-footer>/i, "canonical shared footer component with nested-route base");
}

const forbiddenActivePatterns = [
  ["browser persistence API", /\b(?:localStorage|sessionStorage)\b/i],
  ["fake L-number", /\bL[- ]?\d{3,}\b/i],
  ["fake registrar reference", /\b(?:reference|file)\s*(?:number|no\.?)\s*[:#-]?\s*[A-Z0-9]{5,}/i],
  ["registrar export control", /<(?:a|button|input|select)[^>]*(?:registrar[- ]?export|export[- ]?(?:preview|packet|readiness)|packet[- ]?activity)/i],
  ["named-use control", /<(?:input|select|button)[^>]*(?:named[-_ ]?use|consentRegistrar)/i],
  ["general-updates control", /<(?:input|select|button)[^>]*(?:general[-_ ]?updates|newsletter)/i],
  ["saved-draft claim", /\b(?:draft saved|email return link|save and resume|save draft)\b/i],
  ["duplicate module header/footer", /tracker-module-header|tracker-module-footer/i],
];

for (const [description, pattern] of forbiddenActivePatterns) {
  if (pattern.test(activeSource)) failures.push(`all active pages: found forbidden ${description}`);
  else checks.push(`all active pages: no ${description}`);
}

// --- The readiness self-check (new registration / SA-Act-36 / authorized / already
// submitted) lives ONLY on the landing page, as plain non-blocking bullet content -- not
// as form controls, and not duplicated inside the intake. Two of those four facts turned
// out to already be real submission data ABA needs on file (authority, submission-confirmed)
// and live as ordinary required checkboxes inside the real form sections where they belong;
// the other two (new-registration-only, SA/Act-36-only) aren't stored per-record at all,
// since the whole product is scoped to only that case this release -- so there was nothing
// left to gate in the intake once the two real facts moved into the actual form. The five
// real sections are tabbed, but tabs are freely clickable in any order -- no Continue/Back
// gating between them. ---
forbidMatch("landing", /data-qualification-form|class="tracker-question"|tracker-qualifier/i, "standalone gated landing-page qualifier");
forbidMatch("landing", /does not use sample data|imitate a live evidence base/i, "landing-page claim that Insights uses no sample data (Insights is seeded with example data)");
{
  const hero = sources.landing.match(/<section class="tracker-page-header">[\s\S]*?<\/section>/i)?.[0] || "";
  const heroPrimaryActions = (hero.match(/tracker-button--orange/g) || []).length;
  if (heroPrimaryActions !== 1) failures.push(`landing: expected one dominant hero CTA, found ${heroPrimaryActions}`);
  else checks.push("landing: one dominant hero CTA");
  if (/href=["'][^"']*resources/i.test(hero)) failures.push("landing: found registration-resources action in the hero");
  else checks.push("landing: no registration-resources action in the hero");
  if (/>Is this for you\?</i.test(hero)) failures.push("landing: found competing 'Is this for you?' hero action");
  else checks.push("landing: no competing 'Is this for you?' hero action");
}
forbidMatch("intake", /data-next-stage|data-previous-stage|data-show-review\b/i, "sequential Continue/Back wizard gating");
forbidMatch("intake", /type="radio"/i, "Yes/No radio-pair readiness questions");
forbidMatch("intake", /\bqualifier\b|\bqualification\b/i, "internal 'qualifier/qualification' language in user-facing copy");
forbidMatch("intake", /id="readiness-/i, "readiness self-check duplicated as intake form controls (belongs on the landing page only)");

const stagePanelCount = (sources.intake.match(/data-stage-panel="/g) || []).length;
if (stagePanelCount !== 5) failures.push(`intake: expected 5 tabbed sections, found ${stagePanelCount}`);
else checks.push("intake: five tabbed sections");

const stageButtonCount = (sources.intake.match(/data-stage-button="/g) || []).length;
if (stageButtonCount !== 5) failures.push(`intake: expected 5 section tabs, found ${stageButtonCount}`);
else checks.push("intake: five section tabs");

const formSectionCount = (sources.intake.match(/<fieldset class="form-section">/g) || []).length;
if (formSectionCount !== 5) failures.push(`intake: expected 5 form sections, found ${formSectionCount}`);
else checks.push("intake: five form sections (participant/org, product, status, submission/accountability, data use)");

requireMatch("intake", /id="authority-confirmation"\s+name="authority_confirmation"\s+type="checkbox"\s+required/, "real, stored authority-confirmation checkbox");

// --- Regardless of which tab is open, only one confirm screen sits between filling the form and sending it ---
requireMatch("intake", /data-review-before-submit/, "review-and-confirm-before-submit opt-in");
requireMatch("intake", /data-review="tracker-intake"/, "review screen container");
requireMatch("intake", /data-review-confirm/, "review screen confirm action");

// --- Mobile compact section nav: hidden on desktop (full 5-tab bar stays as the only
// nav there), replaces the five full-size stacked buttons as the default view at narrow
// widths -- Prev/Next plus a toggle that still reaches the full, jumpable section list. ---
for (const hook of ["data-stage-compact", "data-stage-prev", "data-stage-next", "data-stage-toggle", "data-stage-compact-label", "data-stage-list"]) {
  requireMatch("intake", new RegExp(hook), `mobile compact-nav hook ${hook} present`);
}
{
  const moduleCssForNav = await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-module.css"), "utf8");
  if (!/\.tracker-stage-compact\s*\{\s*display:\s*none/.test(moduleCssForNav)) {
    failures.push("registration-tracker-module.css: .tracker-stage-compact must be display:none outside the mobile breakpoint (desktop keeps the always-visible tab bar only)");
  } else {
    checks.push("registration-tracker-module.css: .tracker-stage-compact hidden by default (desktop unaffected)");
  }
}

// --- ABA relationship captured passively via URL param, not a self-reported form field ---
forbidMatch("intake", /id="aba-relationship"/, "self-reported ABA-relationship form field");
requireMatch("intake", /id="referral-source"\s+name="referral_source"/, "passive referral-source hidden field");
if (!/URLSearchParams[\s\S]*get\(["']ref["']\)/.test(moduleJs)) failures.push(`${moduleJsPath}: missing referral param capture`);
else checks.push(`${moduleJsPath}: referral param capture`);

// --- Country vs. jurisdiction: organisation's country is a real field, not fixed to the registration jurisdiction ---
forbidMatch("intake", /id="organisation-country"[^>]*readonly/, "readonly organisation-country field");
forbidMatch("intake", /id="organisation-country"[^>]*value="South Africa"/, "organisation-country fixed to South Africa");

// --- Self-reported SACNASP status cannot claim a verified state ---
requireMatch("intake", /id="sacnasp-status"[\s\S]*?<option>Unknown<\/option>/, "required SACNASP Unknown option");
forbidMatch("intake", /id="sacnasp-status"[\s\S]{0,400}<option>Verified<\/option>/, "contradictory self-reported/Verified SACNASP option");

// --- Status date allows approximation instead of forcing exact-day precision ---
requireMatch("intake", /id="status-date"[^>]*type="month"/, "month-precision status date (not exact day)");

// --- Decision-expectation dropped; that determination is derived by ABA, not guessed by the participant ---
forbidMatch("intake", /id="decision-expectation"/, "removed decision-expectation field");

// --- One compact submission-confirmation instead of three near-identical checkboxes ---
requireMatch("intake", /id="submission-confirmed"\s+name="submission_confirmed"\s+type="checkbox"/, "single compact submission confirmation");
forbidMatch("intake", /id="(?:application-form-submitted|service-request-form-submitted|proof-of-payment-submitted)"/, "superseded triple submission-confirmation checkboxes");

// --- Contact permission and processing acknowledgement no longer duplicate one another ---
requireMatch("intake", /id="contact-permission"/, "single contact-permission choice");
forbidMatch("intake", /id="processing-acknowledgement"/, "superseded duplicate processing-acknowledgement checkbox");

// --- Responsible-person, residency and appointment fields are actually conditional ---
requireMatch("intake", /data-responsible-person-details hidden/, "responsible-person detail fields hidden by default");
requireMatch("intake", /id="responsible-person-status"/, "responsible-person-status conditional trigger");

forbidMatch("intake", /id="(?:supporting-information|payment-status)"/, "superseded readiness field");
requireMatch("intake", /id="insight-acknowledgement"[^>]*type="checkbox"(?![^>]*checked)/, "initially unchecked insight-use acknowledgement");
requireMatch("intake", /within two weeks/i, "two-week review target");
requireMatch("intake", /contact you if any detail needs clarification[\s\S]*non-identifying information may contribute/i, "user-focused review outcome and privacy expectation");

const registrationTypes = [
  "New molecule / new active ingredient — 14AR2",
  "New formulation",
  "Generic active ingredient",
  "Parallel registration",
  "Daughter registration",
];
for (const registrationType of registrationTypes) requireMatch("intake", new RegExp(registrationType), `new-registration type “${registrationType}”`);

// --- Three classification axes and conditional, source-backed type contract. ---
requireMatch("intake", /id="aba-product-category"\s+name="aba_product_category"/, "separate ABA product-category field");
requireMatch("intake", /id="registrar-function"\s+name="registrar_function"/, "separate registrar-function field");
requireMatch("intake", /Other \(PGR, Swimming Pool, Rodenticide, Adjuvant\)/, "verbatim Service Request Form Table 2 'Other' label");
requireMatch("intake", /id="legal-pathway"\s+name="legal_pathway"/, "separate legal-pathway field");
for (const fieldName of [
  "registration_type_key",
  "registration_type_label",
  "service_request_code",
  "service_request_row",
  "submitted_legal_pathway",
  "source_document_version",
  "official_timeframe_days",
  "official_timeframe_source",
]) requireMatch("intake", new RegExp(`name="${fieldName}"`), `data-contract field ${fieldName}`);
requireMatch("intake", /value="not_sure">Not sure<\/option>/, "registration-type Not sure path");
requireMatch("intake", /value="reinstatement">Reinstatement — 14AR1/, "Reinstatement visible but marked outside V1");
if (!/registrationType\.required\s*=\s*isAgriculturalRemedy/.test(moduleJs)) failures.push(`${moduleJsPath}: registration type is not conditional on Agricultural remedy`);
else checks.push(`${moduleJsPath}: registration type conditional on Agricultural remedy`);
if (!/include this application in general registration insights[\s\S]*will not label it overdue until the applicable Fertilizer timeframe is confirmed/i.test(moduleJs) || !/clearRegistrationContract\(\)/.test(moduleJs)) failures.push(`${moduleJsPath}: missing explicit user-facing Fertilizer no-benchmark consequence`);
else checks.push(`${moduleJsPath}: Fertilizer retains no agricultural-remedy code or benchmark`);
if (!/cannot accept a reinstatement[\s\S]*does not currently collect reinstatements of lapsed registrations/i.test(moduleJs)) failures.push(`${moduleJsPath}: missing direct reinstatement rejection and reason`);
else checks.push(`${moduleJsPath}: reinstatement state gives a direct user consequence`);

// --- Neutral, private-by-default pathway-fit capture. ---
for (const fieldName of ["pathway_fit", "believed_best_fit_pathway", "pathway_fit_reason", "pathway_fit_note_private"]) {
  requireMatch("intake", new RegExp(`name="${fieldName}"`), `pathway-fit field ${fieldName}`);
}
requireMatch("intake", /ABA can read this note, but it will not appear in public insights/i, "pathway-fit private-note boundary");

// --- Insights answers the five stakeholder questions with a conspicuous illustrative-data label. ---
requireMatch("insights", /Which registration types wait longest[\s\S]*Where are applications blocked[\s\S]*Which types see different outcomes[\s\S]*Which applications are overdue[\s\S]*How often is the pathway a poor fit/i, "five direct public-insight questions");
forbidMatch("insights", /<h3>/i, "H1-to-H3 heading-level skip (evidence-panel titles must be H2)");
requireMatch("insights", /class="tracker-example-tag"[^>]*>Illustrative data — not sector findings\./i, "explicit illustrative-data label");
requireMatch("insights", /class="[^"]*tracker-module--data-infographic[^"]*"/i, "dedicated public data-infographic page type");
requireMatch("insights", /class="[^"]*tracker-module--signal-infographic[^"]*"/i, "regulatory signal-infographic composition");
requireMatch("insights", /data-summary-queue[\s\S]*Median pending time by registration type\. Hover, tap, or use the arrow keys for exact values\./i, "compact synopsis and self-explaining interactive median-wait chart");
requireMatch("insights", /data-summary="median-pending"[\s\S]*Median pending time[\s\S]*data-summary="pending-count"[\s\S]*applications pending/i, "median as first pending-time summary");
forbidMatch("insights", /data-key="(?:within|unbenchmarked)"/i, "complementary disclosure of a below-threshold benchmark group in the synopsis");
requireMatch("insights", /Fertilizer applications contribute to the overall and process-stage figures[\s\S]*left out of the overdue figure[\s\S]*has not confirmed the applicable published timeframe/i, "visible user-focused Fertilizer benchmark consequence");
for (const hook of ["data-pending-table", "data-stage-table", "data-outcome-table", "data-benchmark-table", "data-pathway-table"]) {
  requireMatch("insights", new RegExp(hook), `accessible chart data alternative ${hook}`);
}
requireMatch("insights", /registration-tracker-reference-data\.js/, "insights page loads source-backed reference data");
requireMatch("insights", /vendor\/echarts-6\.1\.0\.min\.js/, "insights page loads the pinned local ECharts library");
requireMatch("insights", /registration-tracker-insights-seed\.js/, "insights page loads the seed-data script");
requireMatch("insights", /registration-tracker-insights\.js/, "insights page loads the seed-data render script");
{
  const seedJs = await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-insights-seed.js"), "utf8");
  const renderJs = await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-insights.js"), "utf8");
  if (!/window\.ABA_TRACKER_INSIGHTS_SEED\s*=/.test(seedJs)) failures.push("insights-seed.js: missing ABA_TRACKER_INSIGHTS_SEED dataset");
  else checks.push("insights-seed.js: defines ABA_TRACKER_INSIGHTS_SEED dataset");
  if (!/ABA_TRACKER_INSIGHTS_SEED/.test(renderJs)) failures.push("insights.js: does not read the seed dataset -- evidence-preview panels would not be driven by it");
  else checks.push("insights.js: evidence-preview panels driven by the seed dataset (not hand-typed figures)");
  if (!/window\.echarts\.init/.test(renderJs) || !/renderer:\s*"svg"/.test(renderJs)) failures.push("insights.js: charts must use the pinned ECharts SVG renderer rather than hand-built plot markup");
  else checks.push("insights.js: interactive charts use the pinned ECharts SVG renderer");
  if (!/aria:\s*\{\s*enabled:\s*true,\s*show:\s*true/.test(renderJs) || !/ResizeObserver/.test(renderJs) || !/dispatchAction\(\{\s*type:\s*"showTip"/.test(renderJs)) failures.push("insights.js: charts need ARIA descriptions, responsive resize, and keyboard tooltip navigation");
  else checks.push("insights.js: charts include ARIA descriptions, responsive resize, and keyboard tooltip navigation");
  if (!/03 — grouped outcomes/.test(renderJs) || /stack:\s*["']/.test(renderJs)) failures.push("insights.js: outcome comparison must use grouped bars, not stacked bars");
  else checks.push("insights.js: outcome comparison uses grouped bars with a common baseline");
  if (!/String\(record\.legal_pathway \|\| ""\)\.trim\(\)\.toLowerCase\(\) === "fertilizer"/.test(renderJs)) failures.push("insights.js: Fertilizer pathway comparison is case-sensitive and can mislabel seed records");
  else checks.push("insights.js: Fertilizer pathway labels are normalized case-insensitively");
  if (!/const insufficientInsight = "There is not enough shared information to show this comparison yet\."/.test(renderJs)
    || !/const pendingAnswer = longestMedianGroup\s*\?/.test(renderJs)
    || !/description:\s*longestMedianGroup\s*\?/.test(renderJs)) failures.push("insights.js: pending insight can dereference a missing publishable group");
  else checks.push("insights.js: pending insight has a low-data answer and ARIA fallback");
  if (!/const stageAnswer = busiestStage\s*\?/.test(renderJs)
    || !/busiestStage && item\.stage === busiestStage\.stage/.test(renderJs)
    || !/description:\s*busiestStage\s*\?/.test(renderJs)) failures.push("insights.js: stage insight can dereference a missing publishable stage");
  else checks.push("insights.js: stage insight has low-data answer, styling, and ARIA fallbacks");
  if (!/publicValue\(pendingSummarySuppressed, medianPending\)/.test(renderJs)
    || !/publicValue\(benchmarkSummarySuppressed, beyondPending\.length\)/.test(renderJs)
    || !/pendingSummarySuppressed[\s\S]{0,260}!\[\.\.\.pendingGroups\.values\(\)\]\.some/.test(renderJs)
    || !/if \(!pendingSummarySuppressed && !benchmarkSummarySuppressed\)/.test(renderJs)) failures.push("insights.js: low-volume synopsis can expose values or reconstructable markers");
  else checks.push("insights.js: low-volume synopsis suppresses values and reconstructable markers");

  const privacySections = [
    {
      name: "pending",
      source: renderJs.slice(renderJs.indexOf("// 01 —"), renderJs.indexOf("// 02 —")),
      patterns: [/suppressed:\s*isSuppressed\(items\)/, /cell\(publicThresholdCount\(items\)\)/, /group\.suppressed \? null : group\.medianDays/],
    },
    {
      name: "stage",
      source: renderJs.slice(renderJs.indexOf("// 02 —"), renderJs.indexOf("// 03 —")),
      patterns: [/suppressed:\s*isSuppressed\(items\)/, /cell\(publicValue\(suppressed, count\)\)/, /item\.suppressed \? null : item\.count/],
    },
    {
      name: "benchmark",
      source: renderJs.slice(renderJs.indexOf("// 04 —"), renderJs.indexOf("// 05 —")),
      patterns: [/const suppressed = isSuppressed\(items\)/, /cell\(publicValue\(suppressed, beyond\)\)/, /item\.suppressed \? null : item\.percentBeyond/],
    },
  ];
  privacySections.forEach((section) => {
    if (!section.source || section.patterns.some((pattern) => !pattern.test(section.source))) failures.push(`insights.js: ${section.name} output does not independently suppress below-threshold table and chart values`);
    else checks.push(`insights.js: ${section.name} table and chart values independently enforce the privacy threshold`);
  });

  const sandbox = { window: {} };
  runInNewContext(referenceJs, sandbox);
  runInNewContext(seedJs, sandbox);
  const previewRecords = sandbox.window.ABA_TRACKER_INSIGHTS_SEED;
  const sourceTypes = sandbox.window.ABA_TRACKER_REFERENCE.registration_types;
  if (sandbox.window.ABA_TRACKER_REFERENCE.privacy_threshold_preview !== 3) failures.push("registration-tracker-reference-data.js: preview privacy threshold must remain 3 until the policy decision changes");
  else checks.push("registration-tracker-reference-data.js: preview privacy threshold remains 3");
  const fertilizerRecords = previewRecords.filter((record) => record.legal_pathway === "Fertilizer");
  if (!fertilizerRecords.length) failures.push("insights-seed.js: missing Fertilizer records needed to verify the unsupported-path state");
  else if (fertilizerRecords.some((record) => record.service_request_code !== null || record.official_timeframe_days !== null)) failures.push("insights-seed.js: Fertilizer record received an agricultural-remedy code or benchmark");
  else checks.push("insights-seed.js: Fertilizer records have null service code and official timeframe");

  const remedyRecords = previewRecords.filter((record) => record.legal_pathway === "Agricultural remedy");
  if (remedyRecords.some((record) => {
    const source = sourceTypes[record.registration_type_key];
    return !source
      || record.service_request_code !== source.service_request_code
      || record.service_request_row !== source.service_request_row
      || record.official_timeframe_days !== source.official_timeframe_days;
  })) {
    failures.push("insights-seed.js: an Agricultural remedy record diverges from the shared source-backed lookup");
  } else {
    checks.push("insights-seed.js: all Agricultural remedy codes, rows, and clocks derive from the shared lookup");
  }
}

if ((lowDataFixture.match(/review_status:\s*"approved_for_insights"/g) || []).length !== 4
  || !/registration-tracker-insights\.js/.test(lowDataFixture)
  || !/__TRACKER_LOW_DATA_ERRORS__/.test(lowDataFixture)) failures.push(`${lowDataFixturePath}: fixture must execute the real renderer with four publishable records and capture runtime errors`);
else checks.push(`${lowDataFixturePath}: all-suppressed browser fixture executes the real renderer with four records`);

if (!/function isSuppressed\(items\)[\s\S]{0,100}items\.length < threshold/.test(await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-insights.js"), "utf8"))) failures.push("insights.js: missing shared small-group suppression predicate");
else checks.push("insights.js: small-group suppression uses the shared privacy-threshold predicate");

if (!/function publicThresholdCount\(items\)[\s\S]{0,140}`\$\{threshold\}\+`/.test(await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-insights.js"), "utf8"))) failures.push("insights.js: pending-group counts permit complementary disclosure from the headline total");
else checks.push("insights.js: pending-group counts are threshold-bucketed to prevent complementary disclosure");

if (!/function updateReferenceReason\(\)[\s\S]{0,420}referenceReason\.required = !referenceReasonWrap\.hidden/.test(moduleJs)
  || !/intakeForm\.reset\(\)[\s\S]{0,900}updateReferenceReason\(\)/.test(moduleJs)) failures.push(`${moduleJsPath}: reset does not reapply the hidden reference-reason requirement state`);
else checks.push(`${moduleJsPath}: add-another reset clears the hidden reference-reason requirement`);

if (!/if \(child\.hidden\) return;/.test(appJs)) failures.push(`${appJsPath}: review builder includes fields inside hidden conditional groups`);
else checks.push(`${appJsPath}: review builder excludes hidden conditional groups`);

forbidMatch("insights", /this period/i, "undefined 'this period' language (use a stated, defined reporting basis instead)");

requireMatch("insights", /<summary>About these figures<\/summary>/i, "quiet public provenance disclosure");
forbidMatch("insights", /Design preview|Primary summary|reviewed and included|production threshold|regulator constants/i, "internal methodology narration");
forbidMatch("insights", /Publication pipeline|What is collected and why|Every published finding must pass/i, "the old full-section methodology explanation, now duplicated on privacy.html");

for (const sourceKey of ["landing", "intake", "insights", "resources", "privacy"]) {
  forbidMatch(sourceKey, />[^<]*\b(?:mockup|prototype)\b[^<]*</i, "public mockup or prototype framing");
  forbidMatch(sourceKey, />[^<]*(?:Design preview|\bV1\b|source pack|reviewed and included|production threshold|regulator constants|Approved for insights|Mapped official stage)[^<]*</i, "internal implementation, review, or release-language exposed as public copy");
}

// Helper copy is useful only when it helps someone complete the form, understand a
// privacy consequence, or recover from uncertainty. A rising count is an early warning
// that specification notes are leaking back into the interface.
{
  const intakeHelperCount = (sources.intake.match(/<small\b/g) || []).length;
  if (intakeHelperCount > 8) failures.push(`intake: found ${intakeHelperCount} helper notes; expected no more than 8 motivated completion/privacy aids`);
  else checks.push(`intake: helper-copy budget respected (${intakeHelperCount}/8)`);
}
// Resources is legitimately a pre-submission preparation page, so ordinary uses of
// "preparing" are expected there -- this check only needs to guard the pages where the old
// deprecated `Preparing submission` tracked-status value could actually resurface.
for (const sourceKey of ["landing", "intake", "insights", "privacy"]) {
  forbidMatch(sourceKey, /<option[^>]*>Preparing submission<\/option>/i, "deprecated Preparing submission tracked status");
}
// --- Resources is a real, complete page for launch, not a "still being built" placeholder ---
forbidMatch("resources", /still being assembled|being built|does not yet cover every step/i, "Resources placeholder framing (page must be genuinely complete for launch)");
requireMatch("resources", /Application Form/, "Resources covers the Application Form requirement");
requireMatch("resources", /Service Request Form/, "Resources covers the Service Request Form requirement");
requireMatch("resources", /biological reference sample|reference sample/i, "Resources covers the reference-sample deposit requirement");
requireMatch("resources", /Last reviewed \d/, "Resources states a last-reviewed date");
requireMatch("resources", /Use the tracker for a new application[\s\S]*new Agricultural remedy or Fertilizer application/i, "plain tracker scope for new applications");
requireMatch("resources", /Reinstating a lapsed registration[\s\S]*Do not use this form[\s\S]*does not currently collect reinstatements/i, "direct reinstatement exclusion");
requireMatch("resources", /Resolve these three issues before submitting/i, "actionable pre-submission check");
forbidMatch("resources", /preparation delays|Other registration services|agricultural-remedy service codes and published timeframes shown elsewhere/i, "ambiguous preparation-delay or implementation-boundary copy");

requireMatch("privacy", /To use the tracker, you must agree/i, "required tracker data-use condition");
requireMatch("privacy", /submission confirmations?/i, "submission-confirmation information group");
requireMatch("privacy", /does not give ABA permission to send unrelated general updates/i, "unrelated-communications boundary");
requireMatch("privacy", /id="registration-tracker"/, "formalized #registration-tracker anchor");
requireMatch("privacy", /Pathway-fit answers[\s\S]*grouped answers[\s\S]*private notes are never published/i, "pathway-fit privacy boundary");

for (const [sourceKey, source] of Object.entries(sources)) {
  if (/<h[1-3][^>]*>[\s\S]*?<br\b/i.test(source)) failures.push(`${sourceKey}: forced heading break found`);
  else checks.push(`${sourceKey}: no forced heading break`);
}

// --- .tracker-button--orange/--secondary must each declare their own :hover rule -- without
// one, the base variant's text color survives while the generic .tracker-button:hover changes
// only the background, and for both variants that collision converges text and background on
// the same near-black tone (confirmed empirically: text became illegible on hover). ---
{
  const moduleCss = await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-module.css"), "utf8");
  for (const variant of ["tracker-button--orange", "tracker-button--secondary"]) {
    if (!new RegExp(`\\.${variant}:hover\\s*\\{`).test(moduleCss)) {
      failures.push(`registration-tracker-module.css: .${variant} has no dedicated :hover rule -- risks converging text and background to the same color`);
    } else {
      checks.push(`registration-tracker-module.css: .${variant} has a dedicated :hover rule`);
    }
  }

  if (!/\.tracker-module \.tracker-section--forest \.tracker-button--secondary\s*\{[\s\S]{0,180}border-color:\s*var\(--tracker-paper\);[\s\S]{0,100}color:\s*var\(--tracker-paper\)/.test(moduleCss)
    || !/\.tracker-module \.tracker-section--forest \.tracker-button--secondary:hover\s*\{[\s\S]{0,220}background:\s*var\(--tracker-paper\);[\s\S]{0,100}color:\s*var\(--tracker-deep\)/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: secondary buttons on forest need a paper outline/text and an inverse hover state");
  } else {
    checks.push("registration-tracker-module.css: secondary buttons retain contrast on forest fields");
  }

  if (/^\.tracker-module (?:h[1-6]|p\b|li\b)/m.test(moduleCss)) {
    failures.push("registration-tracker-module.css: unscoped route typography can leak into the shared header or footer");
  } else {
    checks.push("registration-tracker-module.css: route typography is contained within main and cannot override the shared shell");
  }

  // --- Sitewide .brochure-theme h1 (styles.css) forces white-space: nowrap by design, and
  // wins the cascade on tracker pages (equal specificity, later source order) unless overridden
  // here -- confirmed empirically to force real horizontal overflow on any tracker h1 too long
  // for one line (e.g. Resources' "Before you submit a new registration."). ---
  if (!/\.brochure-theme\.tracker-module main h1[\s\S]{0,80}white-space:\s*normal/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: missing .brochure-theme.tracker-module h1 white-space override -- multi-word tracker h1s will overflow at narrow widths");
  } else {
    checks.push("registration-tracker-module.css: .brochure-theme.tracker-module h1 white-space override present");
  }

  if (!/\.tracker-insight-summary\s*\{[\s\S]{0,260}background:\s*var\(--tracker-cream\)/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: insight summary must use the restrained cream field, not a page-wide orange treatment");
  } else {
    checks.push("registration-tracker-module.css: insight summary uses the restrained cream field");
  }

  if (/\.tracker-insight-summary\s*\{[\s\S]{0,260}background:\s*var\(--tracker-orange(?:-light)?\)/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: insight summary reintroduces an orange field");
  } else {
    checks.push("registration-tracker-module.css: no orange insight-summary field");
  }

  if (/\.tracker-dot--(?:type|stage|outcome|pathway)-[^,{\s]+\s*\{[\s\S]{0,80}(?:background|color):/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: subtype-specific rainbow dots reintroduced; charts must use the minimal semantic palette");
  } else {
    checks.push("registration-tracker-module.css: no subtype-specific rainbow dots");
  }

  if (!/\.tracker-module\.tracker-module--data-infographic\s*\{/.test(moduleCss)
    || !/Public data-infographic: regulatory signal story/.test(moduleCss)
    || !/\.tracker-module--data-infographic \.tracker-summary-queue\s*\{/.test(moduleCss)
    || !/\.tracker-module--data-infographic \.tracker-echart\s*\{/.test(moduleCss)
    || !/\.tracker-module--data-infographic \.tracker-insight-block\s*\{[\s\S]{0,260}border:\s*0;[\s\S]{0,120}border-bottom:\s*1px/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: incomplete signal-infographic type (needs marker overview, question-specific chart forms, and open findings)");
  } else {
    checks.push("registration-tracker-module.css: dedicated regulatory signal-infographic page type present");
  }

  if (/\.tracker-pending-row__line/.test(moduleCss) || /--dot-offset/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: pending-time scatterplot reintroduced; compare registration types with ranked median bars");
  } else {
    checks.push("registration-tracker-module.css: pending-time comparison uses ranked median bars, not a scatterplot");
  }

  if (/\.tracker-stage-bars|\.tracker-outcome-bars|\.tracker-pending-bars/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: hand-built chart scaffolding reintroduced");
  } else {
    checks.push("registration-tracker-module.css: no hand-built chart scaffolding");
  }

  if (/\.tracker-module--data-infographic \.tracker-insight-block::after/.test(moduleCss)
    || /font:\s*800 clamp\(6rem/.test(moduleCss)
    || /\.tracker-module--data-infographic \.tracker-insight-summary__grid > div:first-child\s*\{[\s\S]{0,100}background:\s*var\(--tracker-forest\)/.test(moduleCss)) {
    failures.push("registration-tracker-module.css: data-infographic reintroduces a side rail, decorative giant numeral, or hero metric card");
  } else {
    checks.push("registration-tracker-module.css: no side rails, decorative giant numerals, or hero metric card");
  }
}

const linkedAssets = [
  "registration-tracker/shared/registration-tracker-module.css",
  "registration-tracker/shared/registration-tracker-module.js",
  "registration-tracker/shared/registration-tracker-reference-data.js",
  "registration-tracker/shared/registration-tracker-insights-seed.js",
  "registration-tracker/shared/registration-tracker-insights.js",
  "registration-tracker/shared/vendor/echarts-6.1.0.min.js",
  "soft-launch/qa/tracker-insights-low-data.html",
];
for (const relativePath of linkedAssets) {
  try {
    await access(path.join(repoRoot, relativePath));
    checks.push(`${relativePath}: exists`);
  } catch {
    failures.push(`${relativePath}: missing`);
  }
}

console.log("Registration Tracker static mockup preflight");
console.log(`Passed checks: ${checks.length}`);

if (failures.length) {
  console.error(`FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("PASS: active routes, fields, states, and release boundaries match the tracker's tabbed, ungated, review-and-confirm intake architecture.");
}
