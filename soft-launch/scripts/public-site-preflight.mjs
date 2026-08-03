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
  return !internalTrackerDirectories.has(segments[0]);
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
