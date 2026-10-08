// Audit every local reference in the site and fail if a target is missing.
// Usage: node tools/audit-paths.mjs   (exit 0 = all resolve, exit 1 = broken)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SKIP_DIRS = new Set(["docs", "tools", "node_modules", ".git"]);
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
const HAS_EXT = /\.[a-z0-9]{2,5}(?:$|[?#])/i;
const FILE_EXT = /\.(?:png|jpe?g|webp|avif|svg|gif|ico|css|js|html|woff2?|ttf|otf|mp4|webm)$/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

// Split an attribute value into candidate local references.
function candidates(value) {
  const trimmed = value.trim();
  if (!trimmed || EXTERNAL.test(trimmed)) return [];
  // srcset holds several "url 800w" entries separated by commas.
  if (/\d+w\b/.test(trimmed)) {
    return trimmed
      .split(",")
      .map((part) => part.trim().split(/\s+/)[0])
      .filter(Boolean);
  }
  return [trimmed];
}

// A reference is a local file reference when it carries a known file extension.
// This keeps viewport meta content="width=device-width" out of the report.
function localPath(ref) {
  const clean = ref.split(/[?#]/)[0];
  if (!clean || EXTERNAL.test(clean)) return null;
  return HAS_EXT.test(ref) || FILE_EXT.test(clean) ? clean : null;
}

const files = walk(ROOT).filter((f) => /\.(?:html|css)$/.test(f));
let broken = 0;
let checked = 0;

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const found = [];

  if (file.endsWith(".html")) {
    const attr =
      /(?:href|src|content|srcset|data-srcset)\s*=\s*"([^"]*)"/gi;
    for (const match of source.matchAll(attr)) {
      for (const ref of candidates(match[1])) found.push(ref);
    }
  } else {
    for (const match of source.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
      found.push(match[1].trim());
    }
  }

  const local = found.map(localPath).filter(Boolean);
  const missing = [];
  for (const ref of local) {
    const target = path.resolve(path.dirname(file), ref);
    checked++;
    if (!fs.existsSync(target)) missing.push(ref);
  }

  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const status = missing.length ? "BROKEN" : "ok";
  console.log(
    `${status.padEnd(6)} ${rel.padEnd(42)} ${String(local.length).padStart(3)} refs`,
  );
  for (const ref of missing) console.log(`         -> missing: ${ref}`);
  broken += missing.length;
}

console.log(`\n${files.length} files, ${checked} local references, ${broken} broken`);
process.exit(broken ? 1 : 0);