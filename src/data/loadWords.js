// Multi-source word loader.
//
// Base data lives in thematic.json + verbs.json. Additional sources can be
// dropped into src/data/ as words_*.json with ZERO code changes — they are
// auto-imported via Vite's import.meta.glob. Each entry must conform to the
// shared schema (see SCHEMA.md). A word is treated as a verb iff it has an
// `inf` field; otherwise it is a thematic word.
//
// User-added words live in localStorage under `userWords` and are merged in at
// load time so they flow through the same drills. Everything is deduplicated by
// `id` (later sources / user words win on collision).
import baseThematic from "./thematic.json";
import baseVerbs from "./verbs.json";
import sources from "./sources.json";

export const USER_WORDS_KEY = "userWords";

// Auto-import any words_*.json files. eager => available synchronously at module load.
const extraModules = import.meta.glob("./words_*.json", { eager: true });

const extraThematic = [];
const extraVerbs = [];
for (const mod of Object.values(extraModules)) {
  const entries = mod.default ?? mod;
  if (!Array.isArray(entries)) continue;
  for (const e of entries) {
    if (e && e.inf) extraVerbs.push(e);
    else extraThematic.push(e);
  }
}

function dedupeById(list) {
  const map = new Map();
  for (const item of list) {
    if (item && item.id != null) map.set(item.id, item);
  }
  return Array.from(map.values());
}

export function readUserWords() {
  try {
    const raw = localStorage.getItem(USER_WORDS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeUserWords(words) {
  localStorage.setItem(USER_WORDS_KEY, JSON.stringify(words));
}

// Returns the merged in-memory word store. Call again after user words change.
export function loadWordStore() {
  const userWords = readUserWords();
  const userThematic = userWords.filter((w) => !w.inf);
  const userVerbs = userWords.filter((w) => w.inf);

  const thematic = dedupeById([...baseThematic, ...extraThematic, ...userThematic]);
  const verbs = dedupeById([...baseVerbs, ...extraVerbs, ...userVerbs]);

  return { thematic, verbs };
}

export { sources };
