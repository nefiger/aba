import { readFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

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

const forbiddenActivePatterns = [
  ["browser persistence API", /\b(?:localStorage|sessionStorage)\b/i],
  ["fake L-number", /\bL[- ]?\d{3,}\b/i],
  ["fake registrar reference", /\b(?:reference|file)\s*(?:number|no\.?)\s*[:#-]?\s*[A-Z0-9]{5,}/i],
  ["registrar export control", /<(?:a|button|input|select)[^>]*(?:registrar[- ]?export|export[- ]?(?:preview|packet|readiness)|packet[- ]?activity)/i],
  ["named-use control", /<(?:input|select|button)[^>]*(?:named[-_ ]?use|consentRegistrar)/i],
  ["general-updates control", /<(?:input|select|button)[^>]*(?:general[-_ ]?updates|newsletter)/i],
  ["saved-draft claim", /\b(?:draft saved|email return link|save and resume|save draft)\b/i],
  ["chart markup", /<(?:svg|canvas)[^>]*(?:chart|graph)|class=["'][^"']*\bchart\b/i],
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
requireMatch("intake", /Approved for insights[\s\S]*Needs clarification[\s\S]*Excluded/, "three ABA review outcomes");
requireMatch("intake", /within two weeks/i, "two-week review target");

const registrationTypes = [
  "New molecule or active ingredient",
  "New formulation",
  "Generic active ingredient",
  "Parallel registration",
  "Daughter registration",
];
for (const registrationType of registrationTypes) requireMatch("intake", new RegExp(registrationType), `new-registration type “${registrationType}”`);

// --- Insights behaves like the real, populated page -- not a page that narrates its own
// empty/example state in paragraphs. Exactly one compact tag marks the data as fictional;
// everything else (headings, captions, methodology) reads like the mature page will. ---
requireMatch("insights", /Where are new registrations waiting[\s\S]*How does time compare[\s\S]*Which obstacles appear[\s\S]*What can ABA responsibly say/i, "four evidence-panel questions");
forbidMatch("insights", /<h3>/i, "H1-to-H3 heading-level skip (evidence-panel titles must be H2)");
requireMatch("insights", /Received[\s\S]*Verification[\s\S]*Scientific screening[\s\S]*Evaluation[\s\S]*Decision/, "source-checked post-submission registration process");
requireMatch("insights", /class="tracker-example-tag"[^>]*>Example data/i, "exactly one compact example-data tag, not a narrated disclaimer");
forbidMatch("insights", /Awaiting sufficient|Not yet assessable|Future view:|no real findings|not enough real registrations|do not describe any real|fictional example dataset|Illustrative example|labelled, empty structures/i, "narrated empty-state or illustrative-example prose (the compact tag already covers this)");
requireMatch("insights", /registration-tracker-insights-seed\.js/, "insights page loads the seed-data script");
requireMatch("insights", /registration-tracker-insights\.js/, "insights page loads the seed-data render script");
{
  const seedJs = await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-insights-seed.js"), "utf8");
  const renderJs = await readFile(path.join(repoRoot, "registration-tracker/shared/registration-tracker-insights.js"), "utf8");
  if (!/window\.ABA_TRACKER_INSIGHTS_SEED\s*=/.test(seedJs)) failures.push("insights-seed.js: missing ABA_TRACKER_INSIGHTS_SEED dataset");
  else checks.push("insights-seed.js: defines ABA_TRACKER_INSIGHTS_SEED dataset");
  if (!/ABA_TRACKER_INSIGHTS_SEED/.test(renderJs)) failures.push("insights.js: does not read the seed dataset -- evidence-preview panels would not be driven by it");
  else checks.push("insights.js: evidence-preview panels driven by the seed dataset (not hand-typed figures)");

  // --- Every aria-hidden chart element (stage bars, coverage dots) must have a visible
  // sibling value the render script populates -- otherwise the data is sighted-only. ---
  for (const attr of ["data-stage-value", "data-coverage-value"]) {
    if (!new RegExp(attr).test(sources.insights)) failures.push(`insights: missing ${attr} elements -- aria-hidden chart data has no accessible text equivalent`);
    else checks.push(`insights: ${attr} elements present for accessible chart values`);
    if (!new RegExp(`querySelector\\(\`\\[${attr}`).test(renderJs)) failures.push(`insights.js: does not populate ${attr} elements`);
    else checks.push(`insights.js: populates ${attr} elements`);
  }
}

forbidMatch("insights", /this period/i, "undefined 'this period' language (use a stated, defined reporting basis instead)");

// --- A single short methodology line replaces the old full "Publication pipeline" /
// "What is collected and why" sections, which duplicated privacy.html and dominated the page ---
requireMatch("insights", /class="tracker-methodology-note"/i, "single compact methodology line (not a full duplicate-of-privacy section)");
requireMatch("insights", /<dt>Reporting basis<\/dt>/i, "stated reporting basis (not left implicit)");
requireMatch("insights", /<dt>Last revised<\/dt>/i, "stated last-revised date");
forbidMatch("insights", /Publication pipeline|What is collected and why|Every published finding must pass/i, "the old full-section methodology explanation, now duplicated on privacy.html");

// --- No paragraph-per-panel narration restating what the heading/figure already show ---
{
  const panelParagraphs = (sources.insights.match(/tracker-evidence-panel[\s\S]{0,20}?<\/div>\s*<p>/g) || []).length;
  if (panelParagraphs > 0) failures.push(`insights: found ${panelParagraphs} explanatory paragraph(s) directly under an evidence-panel heading -- panels should carry only a heading, figcaption, and figure`);
  else checks.push("insights: evidence panels carry no restating explanatory paragraphs");
}

for (const sourceKey of ["landing", "intake", "insights", "resources", "privacy"]) {
  forbidMatch(sourceKey, />[^<]*\b(?:mockup|prototype)\b[^<]*</i, "public mockup or prototype framing");
  forbidMatch(sourceKey, /\bPreparing\b|pre-submission/i, "pre-submission active-flow language");
}
requireMatch("privacy", /condition of using the tracker/i, "required tracker data-use condition");
requireMatch("privacy", /submission confirmations?/i, "submission-confirmation information group");
requireMatch("privacy", /does not give ABA permission to send unrelated general updates/i, "unrelated-communications boundary");
requireMatch("privacy", /id="registration-tracker"/, "formalized #registration-tracker anchor");

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
}

const linkedAssets = [
  "registration-tracker/shared/registration-tracker-module.css",
  "registration-tracker/shared/registration-tracker-module.js",
  "registration-tracker/shared/registration-tracker-insights-seed.js",
  "registration-tracker/shared/registration-tracker-insights.js",
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
