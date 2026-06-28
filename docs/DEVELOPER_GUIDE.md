# Developer Guide — German B1 Vocabulary Trainer

How the project is built, how the data pipeline works, the three ways to add
words, and how to extend the app toward grammar learning.

---

## 1. Stack & layout

- **Vite + React 18**, hooks only. No router, no state library, no CSS framework.
- Styling is **inline style objects**; all color tokens live in
  `src/styles/theme.js`.
- State persists to **localStorage** only — no backend, no database.

```
src/
  data/
    thematic.json        base thematic words (generated)
    verbs.json           base verbs (generated)
    sources.json         source registry
    loadWords.js         merges all sources + user words into one store
    filterWords.js       applies the level/source/status filters
  components/            FlashCard, ProgressBar, Badge, WordList,
                         DrillModeToggle, FilterBar
  views/                 ThematicView, VerbView, AddWordView, StatsView
  hooks/                 useProgress, useSession, useLocalStorage
  styles/theme.js        color tokens + shared style objects
  App.jsx, main.jsx
scripts/
  generate-data.mjs      one-off base-data generator
resource/
  Goethe-Zertifikat_B1_Wortliste.pdf   the authoritative source list
docs/                    this guide + the user guide
```

Run it:

```bash
npm install
npm run dev          # dev server
npm run build        # production build
npm run generate-data  # regenerate src/data/thematic.json + verbs.json
```

---

## 2. The data model

Every word — whatever its source — conforms to **one shared schema**, fully
documented in [`SCHEMA.md`](../SCHEMA.md). The essentials:

- Required everywhere: `id`, `en`, `level`, `source`, `tags`.
- Thematic words add `de` and `group`.
- Verbs add `inf`, `aux` (`hat` / `ist` / `hat/ist`), and `part`.
- **A word is a verb if and only if it has an `inf` field.** This single rule is
  how the loader, the views, and the Add-Word form tell the two apart — keep it
  true for any new data.
- `id` must be unique and is formatted `{source-prefix}-{n}` (e.g. `them-001`,
  `verb-001`, `user-1719568800-001`).

Reserved-but-unused fields (`examples`, `audioUrl`) are already part of the
schema so future features need no migration.

### How sources merge at runtime
`src/data/loadWords.js` builds the in-memory store:

1. Statically imports `thematic.json` + `verbs.json` (the base Goethe B1 set).
2. Auto-imports any `src/data/words_*.json` via `import.meta.glob` (eager).
3. Reads user-added words from localStorage (`userWords`).
4. Splits every entry into thematic vs verb by the `inf` rule.
5. **Deduplicates by `id`** — later sources and user words win on collision.

`sources.json` is the registry the filter bar and stats read from; every word's
`source` field must match an `id` there.

---

## 3. Where the built-in words come from

The authoritative source is the **official Goethe-Zertifikat B1 Wortliste** — the
exam's published vocabulary list. The PDF is checked in at
`resource/Goethe-Zertifikat_B1_Wortliste.pdf`, and its registry entry
(`goethe_b1_wortliste` in `sources.json`) links to the official Goethe URL.

The vocabulary was curated from that list into JS literals in the original
artifact (`b1_vocab_trainer.jsx`, kept at the repo root for reference). The
`scripts/generate-data.mjs` script extracts those literals and emits the
normalized JSON — see the next section.

---

## 4. Three ways to add words

Pick based on **who** the words are for.

### A. For yourself, quickly → Add Word UI
Use the in-app **Add Word** tab. Saved to localStorage under `userWords`, merged
into drills immediately, never written to disk. Good for personal additions.
Implementation: `src/views/AddWordView.jsx` (id format `user-{unixSeconds}-{n}`,
`source: "user_added"`).

### B. For everyone, as a shipped source → drop-in JSON  *(recommended for new content)*
Add a curated source that ships with the app, with **zero code changes**:

1. Create `src/data/words_{sourcename}.json` — any file matching `words_*.json`
   in `src/data/` is auto-imported.
2. Make every entry follow [`SCHEMA.md`](../SCHEMA.md). Mix thematic words and
   verbs freely in one file; the `inf` rule routes them.
3. Register the source in `src/data/sources.json`:
   ```json
   {
     "id": "netzwerk_neu_a1",
     "name": "Netzwerk neu A1 Textbook",
     "level": "A1",
     "description": "Vocabulary from Netzwerk neu A1 Kurs- und Übungsbuch"
   }
   ```
4. Use that `id` as the `source` on every entry, and give each a unique `id`
   (e.g. `nwa1-001`). Restart `npm run dev`.

Example `src/data/words_netzwerk_neu_a1.json`:

```json
[
  {
    "id": "nwa1-001",
    "de": "die Tasche",
    "en": "bag",
    "group": "Alltag",
    "level": "A1",
    "source": "netzwerk_neu_a1",
    "tags": ["noun"]
  },
  {
    "id": "nwa1-002",
    "inf": "kaufen",
    "aux": "hat",
    "part": "gekauft",
    "en": "to buy",
    "level": "A1",
    "source": "netzwerk_neu_a1",
    "tags": []
  }
]
```

The level/source filters and the Stats tallies pick the new source up
automatically.

### C. Regenerating the base set → the generator script
`thematic.json` and `verbs.json` are **generated artifacts**, not hand-edited.
`scripts/generate-data.mjs`:

- reads the `THEMATIC_GROUPS` and `VERBS` literals out of `b1_vocab_trainer.jsx`,
- normalizes each entry to the schema (assigns `them-NNN` / `verb-NNN` ids,
  `level: "B1"`, `source: "goethe_b1_wortliste"`, `tags: []`),
- writes `src/data/thematic.json` and `src/data/verbs.json`.

Run it with `npm run generate-data`. To change the base content, edit the
literals in `b1_vocab_trainer.jsx` (or repoint the script at a new source file)
and re-run — don't hand-edit the JSON, it'll be overwritten.

> For a brand-new bulk source, prefer **option B** (a `words_*.json` source) over
> stuffing more into the generator. The generator exists to reproduce the
> original Goethe B1 base set deterministically.

---

## 5. Persistence keys

| Key | Owner | Shape |
|-----|-------|-------|
| `progress` | `useProgress` | `{ [id]: { status: "known"\|"review", reviewedAt, reviewCount } }` |
| `uiState` | `App` | active tab, group/card/batch indices, drill direction/mode, filters |
| `sessionLog` | `useSession` | `[{ date, wordsReviewed, verbsReviewed, duration }]` |
| `userWords` | `AddWordView` / `loadWords` | array of user-added entries |

All four go through `useLocalStorage` (`src/hooks/useLocalStorage.js`), which
read-on-mount / write-on-change and swallows quota errors.

---

## 6. Roadmap — extending to grammar learning

The app is structured so a **grammar track** can be added as a sibling to the
vocabulary tracks without disturbing them. Suggested approach:

### 6.1 Data
- Add a new registered content type, e.g. a `grammar` schema, in its own files:
  `src/data/grammar_*.json` (mirror the `words_*.json` auto-import pattern with a
  new glob in a `loadGrammar.js`).
- Sketch of a grammar item schema (keep the same `id`/`level`/`source`/`tags`
  spine so filters and stats stay reusable):
  ```json
  {
    "id": "gram-001",
    "type": "article_gender",
    "level": "A1",
    "source": "grammar_core",
    "prompt": "___ Tisch",
    "answer": "der",
    "options": ["der", "die", "das"],
    "explanation": "Tisch is masculine.",
    "tags": ["nouns", "articles"]
  }
  ```
- Likely topic families: noun gender/articles, plural forms, cases
  (Nom/Akk/Dat/Gen), verb conjugation (present/Perfekt/Präteritum), adjective
  endings, prepositions + case, word order.

### 6.2 UI
- Add a **Grammar** tab in `App.jsx`'s `tabs` array and a `views/GrammarView.jsx`.
- Reuse `FlashCard`, `ProgressBar`, `FilterBar`, and the `useProgress` /
  `useSession` hooks — they're already keyed by generic `id`, so grammar items
  track progress and log sessions for free.
- For multiple-choice / fill-in drills, add a small `QuizCard` component
  alongside `FlashCard` (same theme tokens in `styles/theme.js`).

### 6.3 Keep these invariants
- One shared id space, deduped by `id`.
- Every drillable item carries `id` / `level` / `source` / `tags` so the existing
  filter bar and stats keep working.
- Generated data stays generated; curated bulk content goes in `*_*.json` source
  files, not inline.

### Other planned vocab features (schema already supports)
Spaced-repetition (SM-2) scoring, a dedicated review-queue mode, CSV/text import,
JSON export of progress, per-word `examples` and `audioUrl`, and A1→A2→B1
progression gating.
