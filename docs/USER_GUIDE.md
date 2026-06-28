# User Guide — German B1 Vocabulary Trainer

A flashcard app for the **Goethe-Zertifikat B1** exam. This guide covers how to
use it day-to-day and how to add your own words.

> New to the project? Start the app with `npm install` then `npm run dev`, and
> open the printed URL (usually <http://localhost:5173/>).

---

## 1. The four tabs

| Tab | What it does |
|-----|--------------|
| **Thematic Groups** | ~190 words in 13 categories (Abkürzungen, Farben, Tiere, Zeit, …). |
| **Verbs** | 287 B1 verbs with auxiliary (`hat`/`ist`) and past participle. |
| **Add Word** | Add your own thematic words or verbs. |
| **Stats** | See how many words you've marked known/review, plus a session log. |

The app **remembers where you left off** — your tab, group, card, drill
direction, and filters are all restored when you reopen it.

---

## 2. Drilling flashcards

1. A card shows the prompt (e.g. the German word). **Click the card** to reveal
   the answer.
2. Mark how you did:
   - **✅ Got it** — you knew it. Marked *known*.
   - **🔁 Review later** — you want to see it again. Marked *review*.
   - **→ Skip** — move on without recording anything.
3. The card advances automatically. In the word list below, known words show
   ✅ and review words show 🔁 in place of the translation.

### Thematic options
- **DE → EN / EN → DE** — flip which side is the prompt.
- **← Prev / Next →** — move between the 13 thematic groups.

### Verb drill modes
- **Infinitive → Meaning** — recall the English meaning.
- **Infinitive → Aux + Participle** — recall `hat/ist` + the past participle.
- **Infinitive + Aux → Participle** — given the auxiliary, recall just the participle.

Verbs are drilled in **batches of 20**. Use **← Prev / Next →** to change batch.
After each reveal, the full conjugation row is shown (`abbiegen → ist abgebogen · to turn off`).

---

## 3. Filtering what you drill

Each drill tab has a filter bar at the top:

- **Level** — All / A1 / A2 / B1.
- **Status** — All / Unseen / Review / Known. *(Tip: set **Review** to drill only
  the cards you flagged with 🔁.)*
- **Source** — toggle which word sources are included (see below).

Filters persist between sessions, so you can set up a focused review queue once
and keep coming back to it.

---

## 4. Adding your own words

Open the **Add Word** tab. There are two sub-modes.

### Add a thematic word
- **German word** *(required)* — include the article, e.g. `der Tisch`.
- **English translation** *(required)*.
- **Group** — pick an existing category, **or** type a new group name in the box
  below the dropdown to create one.
- **Level** — A1 / A2 / B1 (default B1).
- **Tags** — comma-separated, e.g. `noun, masculine`.
- **Notes** — optional (an example sentence, a usage note).

### Add a verb
- **Infinitive** *(required)* — e.g. `abholen`.
- **Auxiliary** *(required)* — `hat`, `ist`, or `hat/ist`.
- **Past participle** *(required)* — e.g. `abgeholt`.
- **English meaning** *(required)*.
- **Level** — A1 / A2 / B1 (default B1).
- **Tags** — pick any of `separable`, `irregular`, `modal`, `reflexive`.
- **Notes** — optional.

When you submit, the word immediately joins the normal drill flow (under the
**User Added** source). Below the form, **Your added words** lists everything
you've added with a **Delete** button per entry.

### Where do my added words live?
Your words are saved in your **browser's localStorage** under the key
`userWords`. They are **not** written to project files and are **not** synced
across browsers or devices. Clearing your browser data will remove them. If you
want words that ship with the app for everyone, see the *Developer Guide*.

---

## 5. Tracking progress (Stats tab)

- **Words by source** — total / seen / known / review, per source and overall.
- **Progress over time** — placeholder for an upcoming chart.
- **Session log** — words and verbs reviewed per day.
- **Reset all progress** — wipes your known/review marks and session history
  (asks for confirmation first). This does **not** delete your added words.

---

## 6. Where do the built-in words come from?

The bundled vocabulary is drawn from the **official Goethe-Zertifikat B1
Wortliste** (the exam's published word list). The source PDF lives in the repo
at `resource/Goethe-Zertifikat_B1_Wortliste.pdf`, and the registered source
entry links to the official Goethe page. Future sources (Goethe A2, Netzwerk neu
A1/A2 textbooks) are already registered and ready to be filled in — see the
*Developer Guide* for how to add them.

---

## 7. Coming soon

The app is being extended toward **grammar learning** (cases, articles, verb
conjugation drills, sentence structure) alongside vocabulary. The data model and
UI are being designed so a grammar track can slot in as another tab. See the
*Developer Guide → Roadmap* for the plan.
