import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const softLaunchRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(softLaunchRoot, "..");
const prototypeRoot = path.join(softLaunchRoot, "prototype");
const trackerRoot = path.join(repositoryRoot, "registration-tracker");

// Registration Tracker directories that are NOT part of the public journey.
// These are internal operator and spec views, excluded deliberately rather
// than by oversight. If one becomes user-facing, remove it from this set and
// fix whatever the scan then reports — do not weaken the checks to let it pass.
const internalTrackerDirectories = new Set([
  "admin-operator-review",
  "company-dashboard",
  "registrar-list",
  "stitch-wireframe",
]);

// Individual archived files inside the tracker tree. `prototype-overview.html`
// was `registration-tracker/index.html` until 2026-08-03: an unlinked internal
// hub on its own wireframe stylesheet, now listed in archive.html. Renamed
// rather than relocated so its sibling-relative links and iframe sources keep
// resolving. Same rule as above — if it goes public, delete it from this set.
const archivedTrackerFiles = new Set(["prototype-overview.html"]);

const exactBans = [
  "Biologicals, organised.",
  "Useful work.",
  "Honest limits.",
  "Five practical jobs.",
  "Africa-wide ambition.",
  "Starting in South Africa.",
  "Sound advice. Responsible conduct.",
  "Members set the agenda. ABA takes it forward.",
  "broader service package",
];

const bannedVisiblePatterns = [
  { label: "ambition", pattern: /\bambition\b/i },
  { label: "operating system", pattern: /\boperating system\b/i },
  { label: "entry context", pattern: /\bentry context\b/i },
  { label: "coherent record", pattern: /\bcoherent record\b/i },
  { label: "relationship and next step", pattern: /\brelationship(?:s)? and (?:a |the )?next step(?:s)?\b/i },
  { label: "different relationships and permissions", pattern: /\bdifferent relationships and permissions\b/i },
  { label: "choose the right route", pattern: /\bchoose the right route\b/i },

  // Institutional / internal-model drift. Added 2026-08-03 after this class of
  // copy accumulated unchecked in registration-tracker/, which this script did
  // not scan at the time.
  { label: "release-note voice", pattern: /\b(?:in |for )?this release\b/i },
  { label: "internal policy reference", pattern: /\bapproved polic(?:y|ies)\b/i },
  { label: "evidence gates", pattern: /\bevidence gates?\b/i },
  { label: "non-named", pattern: /\bnon-named\b/i },
  { label: "spec state", pattern: /\bspec state\b/i },
  { label: "operator inclusion", pattern: /\boperator inclusion\b/i },
  { label: "prototype narration", pattern: /\bprototype (?:spec|state|form|mockup|narration)\b/i },
];

const reviewTerms = ["ecosystem", "route", "relationship", "context", "record"];

function decodeEntities(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function visibleText(html) {
  return decodeEntities(html)
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function relative(file) {
  return path.relative(repositoryRoot, file);
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(candidate));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(candidate);
  }
  return files;
}

const failures = [];
const warnings = [];

const publicTrackerFiles = (await htmlFiles(trackerRoot)).filter((file) => {
  const segments = path.relative(trackerRoot, file).split(path.sep);
  if (internalTrackerDirectories.has(segments[0])) return false;
  return !(segments.length === 1 && archivedTrackerFiles.has(segments[0]));
});

const files = [...await htmlFiles(prototypeRoot), ...publicTrackerFiles];

for (const file of files) {
  const source = await readFile(file, "utf8");
  const text = visibleText(source);

  for (const phrase of exactBans) {
    const index = text.toLowerCase().indexOf(phrase.toLowerCase());
    if (index !== -1) failures.push(`${relative(file)}: banned phrase: ${phrase}`);
  }

  for (const { label, pattern } of bannedVisiblePatterns) {
    if (pattern.test(text)) failures.push(`${relative(file)}: banned public wording: ${label}`);
  }

  const headingPattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  for (const match of source.matchAll(headingPattern)) {
    const heading = visibleText(match[2]);
    const line = lineNumber(source, match.index);

    if (/<br\b/i.test(match[2])) {
      failures.push(`${relative(file)}:${line}: forced break inside heading: ${heading}`);
    }

    const paired = heading.match(/^([^.!?]+[.!?])\s+([^.!?]+[.!?])$/);
    if (paired && !/^Thank you\./i.test(heading)) {
      const firstWords = wordCount(paired[1]);
      const secondWords = wordCount(paired[2]);
      if (firstWords <= 5 && secondWords <= 5) {
        failures.push(`${relative(file)}:${line}: short paired-slogan heading: ${heading}`);
      }
    }
  }

  for (const term of reviewTerms) {
    const pattern = new RegExp(`\\b${term}\\b`, "i");
    if (pattern.test(text)) {
      warnings.push(`${relative(file)}: review visible use of “${term}”; confirm it is ordinary public language`);
    }
  }
}

const sharedScript = path.join(prototypeRoot, "assets", "app.js");
const sharedSource = await readFile(sharedScript, "utf8");
for (const phrase of exactBans) {
  if (sharedSource.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`${relative(sharedScript)}: banned phrase: ${phrase}`);
  }
}
for (const { label, pattern } of bannedVisiblePatterns) {
  if (pattern.test(sharedSource)) failures.push(`${relative(sharedScript)}: banned public wording: ${label}`);
}

const canonicalTagline = "For Africa. By Africa.";
const shellSources = [
  [sharedScript, sharedSource],
  [path.join(repositoryRoot, "index.html"), await readFile(path.join(repositoryRoot, "index.html"), "utf8")],
  [path.join(repositoryRoot, "archive.html"), await readFile(path.join(repositoryRoot, "archive.html"), "utf8")],
];
for (const [file, source] of shellSources) {
  if (!source.includes(canonicalTagline)) failures.push(`${relative(file)}: missing canonical ABA tagline: ${canonicalTagline}`);
  if (/In Africa\s*(?:·|&middot;)\s*For Africa/i.test(source)) failures.push(`${relative(file)}: superseded ABA tagline remains visible`);
}

const homepageSource = await readFile(path.join(prototypeRoot, "index.html"), "utf8");
if (/home-button--ghost[^>]*href="about\.html"[^>]*>Why ABA exists</i.test(homepageSource)) failures.push("soft-launch/prototype/index.html: redundant About hero action remains visible");

const trackerFeatureMatch = homepageSource.match(/<section class="home-tracker-feature"[\s\S]*?<\/section>/i);
if (!trackerFeatureMatch) {
  failures.push("soft-launch/prototype/index.html: missing prominent Registration Tracker feature");
} else {
  const trackerFeature = trackerFeatureMatch[0];
  const trackerFeatureText = visibleText(trackerFeature);
  const trackerFeatureRequirements = [
    ["South Africa label", /Registration Tracker · South Africa/i],
    ["already-submitted prompt", /Already submitted an Act 36 application\?/i],
    ["submitted South African Act 36 scope", /South African Act 36 applications? that (?:has|have) already been submitted/i],
    ["open participation", /open to members and non-members/i],
    ["grouped sector evidence", /individual delays and barriers into grouped sector evidence/i],
    ["public identity protection", /Grouped insights do not name organisations or products/i],
  ];
  for (const [label, pattern] of trackerFeatureRequirements) {
    if (!pattern.test(trackerFeatureText)) failures.push(`soft-launch/prototype/index.html: tracker feature missing ${label}`);
  }

  const trackerFeatureLinks = [...trackerFeature.matchAll(/<a\b[^>]*href="registration-tracker\.html"[^>]*>([\s\S]*?)<\/a>/gi)];
  if (trackerFeatureLinks.length !== 1) failures.push("soft-launch/prototype/index.html: tracker feature must contain exactly one Registration Tracker link");
  if (trackerFeatureLinks.length === 1 && !/Open the Registration Tracker/i.test(visibleText(trackerFeatureLinks[0][1]))) {
    failures.push("soft-launch/prototype/index.html: tracker feature CTA label is not canonical");
  }
}

const heroIndex = homepageSource.indexOf('<section class="home-hero">');
const trackerFeatureIndex = homepageSource.indexOf('<section class="home-tracker-feature"');
const membershipValueIndex = homepageSource.indexOf('<section class="home-section home-value"');
if (!(heroIndex !== -1 && trackerFeatureIndex > heroIndex && membershipValueIndex > trackerFeatureIndex)) {
  failures.push("soft-launch/prototype/index.html: tracker feature must appear after the hero and before the membership-value section");
}
if (!/Registration Tracker evidence/i.test(homepageSource)) failures.push("soft-launch/prototype/index.html: membership-value cycle does not name Registration Tracker evidence");

const trackerRouteMatch = homepageSource.match(/<a class="home-route home-route--tracker"[\s\S]*?<\/a>/i);
if (!trackerRouteMatch || !/submitted Act 36 application/i.test(visibleText(trackerRouteMatch[0])) || !/South African biological-product application/i.test(visibleText(trackerRouteMatch[0]))) {
  failures.push("soft-launch/prototype/index.html: Take part tracker route does not state its submitted South African Act 36 scope");
}

const membershipSource = await readFile(path.join(prototypeRoot, "membership.html"), "utf8");
if (!/Already submitted an Act 36 application\?/i.test(membershipSource) || !/South African biological-product application/i.test(membershipSource) || !/open to members and non-members/i.test(membershipSource) || !/href="registration-tracker\.html"/i.test(membershipSource)) {
  failures.push("soft-launch/prototype/membership.html: missing precise open Registration Tracker route");
}

const aboutSource = await readFile(path.join(prototypeRoot, "about.html"), "utf8");
if (/A new, organised agricultural sector and system in Africa/i.test(aboutSource)) failures.push("soft-launch/prototype/about.html: vague 'sector and system' proposition remains visible");
if (!/Registration Tracker gathers structured updates on South African Act 36 biological-product applications that have already been submitted/i.test(aboutSource) || !/public insights keep organisations and products private/i.test(aboutSource)) {
  failures.push("soft-launch/prototype/about.html: missing factual Registration Tracker evidence reference");
}

const trackerLandingSource = await readFile(path.join(prototypeRoot, "registration-tracker.html"), "utf8");
const privacySource = await readFile(path.join(prototypeRoot, "privacy.html"), "utf8");
if (!/South African Act 36 application/i.test(trackerLandingSource) || !/href="\.\.\/\.\.\/registration-tracker\/intake-flow\/index\.html"[^>]*>Add an application update/i.test(trackerLandingSource)) {
  failures.push("soft-launch/prototype/registration-tracker.html: tracker landing route or South African Act 36 scope is inaccurate");
}
if (!/does not submit an application to the registrar, provide legal or regulatory advice, or make your registration publicly searchable/i.test(privacySource)) {
  failures.push("soft-launch/prototype/privacy.html: missing Registration Tracker submission, advice and publication boundary");
}
if (/Start a new registration|Share a new registration|Return to new-registration intake/i.test(`${homepageSource}\n${trackerLandingSource}\n${privacySource}`)) {
  failures.push("public tracker routes: misleading new-registration action remains visible");
}

console.log("ABA public-site static preflight");
console.log(
  `Checked ${files.length} HTML files and the shared shell ` +
    `(soft-launch/prototype + public registration-tracker routes; ` +
    `excluded internal: ${[...internalTrackerDirectories].join(", ")}).`,
);

if (warnings.length) {
  console.log(`\nReview warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (failures.length) {
  console.error(`\nFAIL (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("\nPASS: no banned copy patterns or forced heading breaks found.");
}
