# Word data schema

Every word entry — across every source (`thematic.json`, `verbs.json`,
`words_*.json`, and user-added words) — conforms to this shared schema.

## Field reference

| Field    | Type       | Required        | Notes |
|----------|------------|-----------------|-------|
| `id`     | string     | yes             | unique, format `{source-prefix}-{n}` (e.g. `them-001`, `verb-001`, `user-1719568800-001`) |
| `de`     | string     | thematic        | German word with article where applicable |
| `en`     | string     | yes             | English translation |
| `level`  | string     | yes             | `"A1"`, `"A2"`, or `"B1"` |
| `source` | string     | yes             | a source `id` from `sources.json` |
| `tags`   | string[]   | yes             | empty array if none |
| `group`  | string     | thematic only   | category name (e.g. `"1.1 Abkürzungen"`) |
| `inf`    | string     | verbs only      | infinitive form |
| `aux`    | string     | verbs only      | `"hat"`, `"ist"`, or `"hat/ist"` |
| `part`   | string     | verbs only      | past participle |
| `en`     | string     | verbs only      | English meaning |
| `notes`  | string     | optional        | usage note or example sentence |

An entry is treated as a **verb** if and only if it has an `inf` field;
otherwise it is a **thematic** word.

## Reserved fields (designed for, not yet populated)

These are part of the schema so future features can fill them in without a
migration:

| Field      | Type     | For |
|------------|----------|-----|
| `examples` | string[] | sentence examples per word |
| `audioUrl` | string   | audio pronunciation |

## Example entries

```json
{
  "id": "them-001",
  "group": "1.1 Abkürzungen",
  "de": "das Abo",
  "en": "subscription",
  "level": "B1",
  "source": "goethe_b1_wortliste",
  "tags": []
}
```

```json
{
  "id": "verb-001",
  "inf": "abbiegen",
  "aux": "ist",
  "part": "abgebogen",
  "en": "to turn off (road)",
  "level": "B1",
  "source": "goethe_b1_wortliste",
  "tags": ["separable", "irregular"]
}
```

## Source registry

Sources are declared in `src/data/sources.json`:

| Field         | Type   | Notes |
|---------------|--------|-------|
| `id`          | string | referenced by every word's `source` field |
| `name`        | string | display name |
| `level`       | string | `"A1"` / `"A2"` / `"B1"` / `"mixed"` |
| `description` | string | short description |
| `url`         | string | optional link to the original list |
