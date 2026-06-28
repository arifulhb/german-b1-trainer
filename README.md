# German B1 Vocabulary Trainer

A flashcard trainer for the **German B1** exam, built with
Vite + React. Two learning tracks — **Thematic Groups** (~190 words in 13
categories) and **Verbs** (287 verbs with auxiliary + past participle) — plus
add-your-own-word, multi-source filtering, localStorage persistence, and a stats
scaffold.

## Running the project

```bash
npm installi
npm run dev
```

That's it — open the printed URL. No backend, no database.

## Features

- **Thematic drill** — tap to reveal, mark ✅ Got it / 🔁 Review later / → Skip,
  DE→EN or EN→DE direction, per-group progress + word list.
- **Verb drill** — 3 modes (Infinitive→Meaning, Infinitive→Aux+Participle,
  Infinitive+Aux→Participle), batches of 20, full conjugation row on reveal.
- **Filter bar** — by level (A1/A2/B1), source, and status (unseen/review/known).
- **Add Word** — add thematic words or verbs; stored in localStorage, merged
  into the same drill flow, deletable.
- **Stats** — totals per source + overall, session log, reset-all.
- **Persistence** — progress, UI state (resume where you left off), and the
  session log all live in `localStorage`.

## Adding a new word source

1. Create `src/data/words_{sourcename}.json` — any file matching `words_*.json`
   in `src/data/` is auto-imported (via `import.meta.glob`), no code changes.
2. Add the source entry to `src/data/sources.json`.
3. Ensure every entry follows the schema in [SCHEMA.md](./SCHEMA.md). A word is
   treated as a verb iff it has an `inf` field.

## Documentation

- [User Guide](./docs/USER_GUIDE.md) — using the app, adding your own words.
- [Developer Guide](./docs/DEVELOPER_GUIDE.md) — architecture, the data pipeline,
  the three ways to add words, and the grammar-learning roadmap.
- [SCHEMA.md](./SCHEMA.md) — the shared word data schema.

## Data schema

See [SCHEMA.md](./SCHEMA.md).

## Regenerating the base data

The base JSON (`src/data/thematic.json`, `src/data/verbs.json`) was extracted
from the original artifact with:

```bash
npm run generate-data
```

## User-added words

Stored in `localStorage` under key `userWords`. Not written to disk.

## Project structure

```
src/
  data/        thematic.json, verbs.json, sources.json, loader + filter utils
  components/  FlashCard, ProgressBar, Badge, WordList, DrillModeToggle, FilterBar
  views/       ThematicView, VerbView, AddWordView, StatsView
  hooks/       useProgress, useSession, useLocalStorage
  styles/      theme.js (color tokens + shared styles)
  App.jsx, main.jsx
```

## localStorage keys

| Key          | Shape |
|--------------|-------|
| `progress`   | `{ [id]: { status, reviewedAt, reviewCount } }` |
| `uiState`    | active tab, group/card indices, direction, filters |
| `sessionLog` | `[{ date, wordsReviewed, verbsReviewed, duration }]` |
| `userWords`  | array of user-added word entries |

## Future features (designed for, not built)

Spaced-repetition (SM-2) scoring, review-queue mode, CSV/text import, JSON
export, per-word example sentences (`examples`) and audio (`audioUrl`), and
A1→A2→B1 progression gating. The schema already reserves `examples` and
`audioUrl` fields.

## License

Released under the [MIT License](LICENSE) — free to use, copy and modify.
This is a non-commercial, AI-built learning project; see the in-app About page
for details. The study PDFs under `resource/` are third-party copyrighted
material and are intentionally excluded from version control.
