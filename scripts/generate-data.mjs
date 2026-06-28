// One-off generator: extracts the hardcoded data literals from the original
// b1_vocab_trainer.jsx artifact and writes normalized JSON conforming to the
// shared schema (see SCHEMA.md). Run with: node scripts/generate-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = readFileSync(resolve(root, "b1_vocab_trainer.jsx"), "utf8");

// Slice out the object/array literals (they are pure JS literals, safe to eval).
function sliceLiteral(text, startMarker, open, close) {
  const start = text.indexOf(startMarker);
  if (start === -1) throw new Error(`marker not found: ${startMarker}`);
  const from = text.indexOf(open, start);
  let depth = 0;
  for (let i = from; i < text.length; i++) {
    if (text[i] === open) depth++;
    else if (text[i] === close) {
      depth--;
      if (depth === 0) return text.slice(from, i + 1);
    }
  }
  throw new Error(`unterminated literal for ${startMarker}`);
}

const thematicSrc = sliceLiteral(src, "const THEMATIC_GROUPS", "{", "}");
const verbsSrc = sliceLiteral(src, "const VERBS", "[", "]");

// eslint-disable-next-line no-eval
const THEMATIC_GROUPS = eval(`(${thematicSrc})`);
// eslint-disable-next-line no-eval
const VERBS = eval(`(${verbsSrc})`);

const SOURCE = "goethe_b1_wortliste";
const pad = (n) => String(n).padStart(3, "0");

// ── Thematic ──
const thematic = [];
let t = 0;
for (const [group, words] of Object.entries(THEMATIC_GROUPS)) {
  for (const w of words) {
    t += 1;
    thematic.push({
      id: `them-${pad(t)}`,
      group,
      de: w.de,
      en: w.en,
      level: "B1",
      source: SOURCE,
      tags: [],
    });
  }
}

// ── Verbs ──
const verbs = VERBS.map((v, i) => ({
  id: `verb-${pad(i + 1)}`,
  inf: v.inf,
  aux: v.aux,
  part: v.part,
  en: v.en,
  level: "B1",
  source: SOURCE,
  tags: [],
}));

const outDir = resolve(root, "src/data");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "thematic.json"), JSON.stringify(thematic, null, 2) + "\n");
writeFileSync(resolve(outDir, "verbs.json"), JSON.stringify(verbs, null, 2) + "\n");

console.log(`Wrote ${thematic.length} thematic words and ${verbs.length} verbs.`);
