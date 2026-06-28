import { useMemo, useState } from "react";
import FlashCard from "../components/FlashCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import WordList from "../components/WordList.jsx";
import DrillModeToggle from "../components/DrillModeToggle.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Badge from "../components/Badge.jsx";
import { applyFilters } from "../data/filterWords.js";
import { s } from "../styles/theme.js";

const CHUNK_SIZE = 20;
const MODE_OPTIONS = [
  { value: "inf", label: "Infinitive → Meaning" },
  { value: "aux", label: "Infinitive → Aux + Participle" },
  { value: "part", label: "Infinitive + Aux → Participle" },
];

export default function VerbView({ verbs, ui, patch, mark, statusOf, recordReview }) {
  const [revealed, setRevealed] = useState(false);

  const filters = ui.verbFilters;
  const mode = ui.verbMode;
  const chunkIdx = ui.verbChunkIdx;
  const cardIdx = ui.verbCardIdx;

  const filtered = useMemo(() => applyFilters(verbs, filters, statusOf), [verbs, filters, statusOf]);
  const chunks = useMemo(() => {
    const out = [];
    for (let i = 0; i < filtered.length; i += CHUNK_SIZE) out.push(filtered.slice(i, i + CHUNK_SIZE));
    return out;
  }, [filtered]);

  if (chunks.length === 0) {
    return (
      <div style={s.thematicLayout}>
        <aside style={s.groupSidebar}>
          <FilterBar
            compact
            filters={{ value: filters, onChange: (v) => patch({ verbFilters: v, verbChunkIdx: 0, verbCardIdx: 0 }) }}
          />
        </aside>
        <div style={s.thematicMain}>
          <div style={{ ...s.card, textAlign: "center", color: "#6b7280" }}>
            No verbs match the current filters.
          </div>
        </div>
      </div>
    );
  }

  const chIdx = Math.min(chunkIdx, chunks.length - 1);
  const chunk = chunks[chIdx];
  const cIdx = Math.min(cardIdx, chunk.length - 1);
  const verb = chunk[cIdx];

  const resetReveal = () => setRevealed(false);

  const front =
    mode === "inf" ? verb.inf : mode === "aux" ? `${verb.inf} → ?` : `${verb.inf} → ${verb.aux} + ?`;
  const back =
    mode === "inf" ? verb.en : mode === "aux" ? `${verb.aux} + ${verb.part}` : verb.part;

  const nextVerb = (status) => {
    if (status) {
      mark(verb.id, status);
      recordReview("verb");
    }
    resetReveal();
    if (cIdx < chunk.length - 1) patch({ verbCardIdx: cIdx + 1 });
  };

  const goChunk = (delta) => {
    const next = Math.max(0, Math.min(chIdx + delta, chunks.length - 1));
    patch({ verbChunkIdx: next, verbCardIdx: 0 });
    resetReveal();
  };

  const knownCount = chunk.filter((v) => statusOf(v.id) === "known").length;
  const reviewCount = chunk.filter((v) => statusOf(v.id) === "review").length;
  const firstNum = chIdx * CHUNK_SIZE + 1;
  const lastNum = Math.min(chIdx * CHUNK_SIZE + chunk.length, filtered.length);

  return (
    <div style={s.thematicLayout}>
      <aside style={s.groupSidebar}>
        <FilterBar
          compact
          filters={{ value: filters, onChange: (v) => patch({ verbFilters: v, verbChunkIdx: 0, verbCardIdx: 0 }) }}
        />
      </aside>

      <div style={s.thematicMain}>
      <div style={s.groupNav}>
        <button style={s.btn()} onClick={() => goChunk(-1)} disabled={chIdx === 0}>
          ← Prev
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>
            Batch {chIdx + 1} of {chunks.length}
          </div>
          <div style={{ fontSize: 15, color: "#6b7280" }}>
            Verbs #{firstNum}–{lastNum}
          </div>
        </div>
        <button style={s.btn()} onClick={() => goChunk(1)} disabled={chIdx === chunks.length - 1}>
          Next →
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280", marginBottom: 6 }}>
          <span>
            Card {cIdx + 1} / {chunk.length}
          </span>
          <span>
            ✅ {knownCount} known &nbsp; 🔁 {reviewCount} review
          </span>
        </div>
        <ProgressBar value={cIdx + 1} max={chunk.length} />
      </div>

      <DrillModeToggle
        options={MODE_OPTIONS}
        value={mode}
        wrap
        onChange={(v) => {
          patch({ verbMode: v });
          resetReveal();
        }}
      />

      <FlashCard front={front} back={back} revealed={revealed} onReveal={() => setRevealed(true)} />

      {revealed && (
        <div
          style={{
            background: "#eaf2fb",
            border: "1px solid #dbeafe",
            borderRadius: 8,
            padding: "12px 16px",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span style={{ color: "#1f2937", fontWeight: 700 }}>{verb.inf}</span>
          <span style={{ color: "#6b7280", margin: "0 8px" }}>→</span>
          <Badge color="blue">{verb.aux}</Badge>
          <span style={{ color: "#1d72c2", marginLeft: 8 }}>{verb.part}</span>
          <span style={{ color: "#6b7280", margin: "0 8px" }}>·</span>
          <span style={{ color: "#4b5563" }}>{verb.en}</span>
        </div>
      )}

      {revealed && (
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={{ ...s.btn("known"), flex: 1 }} onClick={() => nextVerb("known")}>
            ✅ Got it
          </button>
          <button style={{ ...s.btn("review"), flex: 1 }} onClick={() => nextVerb("review")}>
            🔁 Review later
          </button>
          <button style={{ ...s.btn(), flex: 1 }} onClick={() => nextVerb(null)}>
            → Skip
          </button>
        </div>
      )}

      <WordList
        title={`📋 This batch — all ${chunk.length} verbs`}
        items={chunk}
        activeIndex={cIdx}
        statusOf={statusOf}
        variant="verb"
        onSelect={(idx) => {
          patch({ verbCardIdx: idx });
          resetReveal();
        }}
      />
      </div>
    </div>
  );
}
