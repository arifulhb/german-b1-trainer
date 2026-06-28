import { useMemo, useState } from "react";
import FlashCard from "../components/FlashCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import WordList from "../components/WordList.jsx";
import DrillModeToggle from "../components/DrillModeToggle.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Badge from "../components/Badge.jsx";
import { applyFilters } from "../data/filterWords.js";
import { s } from "../styles/theme.js";

const MODE_OPTIONS = [
  { value: "inf", label: "Infinitive → Meaning" },
  { value: "aux", label: "Infinitive → Aux + Participle" },
  { value: "part", label: "Infinitive + Aux → Participle" },
];

export default function VerbView({ verbs, ui, patch, mark, statusOf, recordReview }) {
  const [revealed, setRevealed] = useState(false);

  const filters = ui.verbFilters;
  const mode = ui.verbMode;
  const cardIdx = ui.verbCardIdx;

  const filtered = useMemo(() => applyFilters(verbs, filters, statusOf), [verbs, filters, statusOf]);

  // For the drill: status-filtered and sorted.
  const sortedVerbs = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aKnown = statusOf(a.id) === "known" ? 1 : 0;
      const bKnown = statusOf(b.id) === "known" ? 1 : 0;
      if (aKnown !== bKnown) return aKnown - bKnown;
      return a.inf.localeCompare(b.inf, "de");
    });
  }, [filtered, statusOf]);

  // For the WordList: level/source filtered but status-agnostic, so known verbs always show.
  const allFilteredVerbs = useMemo(() => {
    return [...verbs]
      .filter((v) => {
        if (filters.level !== "all" && v.level !== filters.level) return false;
        if (filters.sources !== "all" && !filters.sources.includes(v.source)) return false;
        return true;
      })
      .sort((a, b) => {
        const aKnown = statusOf(a.id) === "known" ? 1 : 0;
        const bKnown = statusOf(b.id) === "known" ? 1 : 0;
        if (aKnown !== bKnown) return aKnown - bKnown;
        return a.inf.localeCompare(b.inf, "de");
      });
  }, [verbs, filters.level, filters.sources, statusOf]);

  if (sortedVerbs.length === 0) {
    return (
      <div style={s.thematicLayout}>
        <aside style={s.groupSidebar}>
          <FilterBar
            compact
            filters={{ value: filters, onChange: (v) => patch({ verbFilters: v, verbCardIdx: 0 }) }}
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

  const cIdx = Math.min(cardIdx, sortedVerbs.length - 1);
  const verb = sortedVerbs[cIdx];

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
    if (cIdx < sortedVerbs.length - 1) patch({ verbCardIdx: cIdx + 1 });
  };

  const knownCount = sortedVerbs.filter((v) => statusOf(v.id) === "known").length;
  const reviewCount = sortedVerbs.filter((v) => statusOf(v.id) === "review").length;

  return (
    <div style={s.thematicLayout}>
      <aside style={s.groupSidebar}>
        <FilterBar
          compact
          filters={{ value: filters, onChange: (v) => patch({ verbFilters: v, verbCardIdx: 0 }) }}
        />
      </aside>

      <div style={s.thematicMain}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280", marginBottom: 6 }}>
            <span>Card {cIdx + 1} / {sortedVerbs.length}</span>
            <span>✅ {knownCount} known &nbsp; 🔁 {reviewCount} review</span>
          </div>
          <ProgressBar value={cIdx + 1} max={sortedVerbs.length} />
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
          title={`📋 All ${allFilteredVerbs.length} verbs`}
          items={allFilteredVerbs}
          activeIndex={allFilteredVerbs.findIndex((v) => verb && v.id === verb.id)}
          statusOf={statusOf}
          mark={mark}
          variant="verb"
          onSelect={(idx) => {
            const drillIdx = sortedVerbs.findIndex((v) => v.id === allFilteredVerbs[idx].id);
            if (drillIdx >= 0) { patch({ verbCardIdx: drillIdx }); resetReveal(); }
          }}
        />
      </div>
    </div>
  );
}
