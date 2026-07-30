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
  privacy: "soft-launch/prototype/privacy.html",
};

const sources = Object.fromEntries(
  await Promise.all(Object.entries(pages).map(async ([key, relativePath]) => [
    key,
    await readFile(path.join(repoRoot, relativePath), "utf8"),
  ])),
);

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
];

for (const [description, pattern] of forbiddenActivePatterns) {
  if (pattern.test(activeSource)) failures.push(`all active pages: found forbidden ${description}`);
  else checks.push(`all active pages: no ${description}`);
}

requireMatch("landing", /data-qualification-form/, "progressively enhanced qualification");
requireMatch("landing", /value="other-service"/, "out-of-service outcome");
requireMatch("landing", /value="other-regime"/, "out-of-country or regime outcome");
requireMatch("landing", /value="missing"/, "missing-information outcome");
requireMatch("landing", /<noscript>[\s\S]*intake-flow\/index\.html/i, "no-JavaScript intake fallback");

const stageCount = (sources.intake.match(/data-stage-panel="/g) || []).length;
if (stageCount !== 5) failures.push(`intake: expected 5 stage panels, found ${stageCount}`);
else checks.push("intake: five stage panels");

const relationships = [
  "Active Full member",
  "Applied for Full membership",
  "Active Technical partner",
  "Applied as Technical partner",
  "No current membership or application",
];
for (const relationship of relationships) requireMatch("intake", new RegExp(relationship), `relationship option “${relationship}”`);

const registrationTypes = [
  "New molecule or active ingredient",
  "New formulation",
  "Generic active ingredient",
  "Parallel registration",
  "Daughter registration",
];
for (const registrationType of registrationTypes) requireMatch("intake", new RegExp(registrationType), `new-registration type “${registrationType}”`);

requireMatch("intake", /id="sacnasp-status"[\s\S]*?<option>Unknown<\/option>/, "required SACNASP Unknown option");
requireMatch("intake", /id="insight-acknowledgement"\s+type="checkbox"(?![^>]*checked)/, "initially unchecked insight-use acknowledgement");
requireMatch("intake", /Approved for insights[\s\S]*Needs clarification[\s\S]*Excluded/, "three ABA review outcomes");
requireMatch("intake", /within two weeks/i, "two-week review target");

requireMatch("insights", /Not enough reviewed information to publish findings/i, "insufficient-information evidence state");
forbidMatch("insights", /for this mockup/i, "public mockup framing");
requireMatch("insights", /Preparing[\s\S]*Received[\s\S]*Verification[\s\S]*Scientific screening[\s\S]*Evaluation[\s\S]*Decision/, "source-checked registration process");
requireMatch("privacy", /condition of using the tracker/i, "required tracker data-use condition");
requireMatch("privacy", /does not give ABA permission to send unrelated general updates/i, "unrelated-communications boundary");

for (const [sourceKey, source] of Object.entries(sources)) {
  if (/<h[1-3][^>]*>[\s\S]*?<br\b/i.test(source)) failures.push(`${sourceKey}: forced heading break found`);
  else checks.push(`${sourceKey}: no forced heading break`);
}

const linkedAssets = [
  "registration-tracker/shared/registration-tracker-module.css",
  "registration-tracker/shared/registration-tracker-module.js",
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
  console.log("PASS: active routes, fields, states, and release boundaries match the tracker change specification.");
}
