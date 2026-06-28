import { useMemo, useState } from "react";
import FlashCard from "../components/FlashCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import WordList from "../components/WordList.jsx";
import DrillModeToggle from "../components/DrillModeToggle.jsx";
import FilterBar from "../components/FilterBar.jsx";
import { applyFilters } from "../data/filterWords.js";
import { s } from "../styles/theme.js";

const DIR_OPTIONS = [
  { value: "de→en", label: "DE → EN" },
  { value: "en→de", label: "EN → DE" },
];

export default function ThematicView({ words, ui, patch, mark, statusOf, recordReview }) {
  const [revealed, setRevealed] = useState(false);

  const filters = ui.thematicFilters;
  const direction = ui.thematicDir;
  const groupIdx = ui.thematicGroupIdx;
  const cardIdx = ui.thematicCardIdx;

  // Filtered words, then grouped into ordered category buckets.
  const groups = useMemo(() => {
    const filtered = applyFilters(words, filters, statusOf);
    const order = [];
    const byGroup = new Map();
    for (const w of filtered) {
      if (!byGroup.has(w.group)) {
        byGroup.set(w.group, []);
        order.push(w.group);
      }
      byGroup.get(w.group).push(w);
    }
    return order.map((name) => ({ name, words: byGroup.get(name) }));
  }, [words, filters, statusOf]);

  const hasGroups = groups.length > 0;
  const gIdx = hasGroups ? Math.min(groupIdx, groups.length - 1) : 0;
  const group = hasGroups ? groups[gIdx] : null;
  const cIdx = group ? Math.min(cardIdx, group.words.length - 1) : 0;
  const card = group ? group.words[cIdx] : null;

  const resetReveal = () => setRevealed(false);

  const nextCard = (status) => {
    if (status) {
      mark(card.id, status);
      recordReview("word");
    }
    resetReveal();
    if (cIdx < group.words.length - 1) patch({ thematicCardIdx: cIdx + 1 });
  };

  const selectGroup = (idx) => {
    if (idx === gIdx) return;
    patch({ thematicGroupIdx: idx, thematicCardIdx: 0 });
    resetReveal();
  };

  const knownCount = group ? group.words.filter((w) => statusOf(w.id) === "known").length : 0;
  const reviewCount = group ? group.words.filter((w) => statusOf(w.id) === "review").length : 0;

  return (
    <div style={s.thematicLayout}>
      <aside style={s.groupSidebar}>
        <FilterBar
          compact
          filters={{ value: filters, onChange: (v) => patch({ thematicFilters: v, thematicGroupIdx: 0, thematicCardIdx: 0 }) }}
        />
        <div style={s.sidebarDivider} />
        <div style={s.groupSidebarTitle}>🗂️ Themes ({groups.length})</div>
        {groups.map((g, i) => {
          const known = g.words.filter((w) => statusOf(w.id) === "known").length;
          const active = i === gIdx;
          return (
            <button
              key={g.name}
              style={s.groupSidebarItem(active)}
              onClick={() => selectGroup(i)}
              aria-current={active ? "true" : undefined}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {g.name}
              </span>
              <span style={s.groupSidebarCount(active)}>
                {known}/{g.words.length}
              </span>
            </button>
          );
        })}
      </aside>

      <div style={s.thematicMain}>
        {!hasGroups ? (
          <div style={{ ...s.card, textAlign: "center", color: "#6b7280" }}>
            No words match the current filters.
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>
                {group.name}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280", marginBottom: 6 }}>
                <span>
                  Card {cIdx + 1} / {group.words.length}
                </span>
                <span>
                  ✅ {knownCount} known &nbsp; 🔁 {reviewCount} review
                </span>
              </div>
              <ProgressBar value={cIdx + 1} max={group.words.length} />
            </div>

            <DrillModeToggle
              options={DIR_OPTIONS}
              value={direction}
              onChange={(v) => {
                patch({ thematicDir: v });
                resetReveal();
              }}
            />

            <FlashCard
              front={direction === "de→en" ? card.de : card.en}
              back={direction === "de→en" ? card.en : card.de}
              revealed={revealed}
              onReveal={() => setRevealed(true)}
            />

            {revealed && (
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button style={{ ...s.btn("known"), flex: 1 }} onClick={() => nextCard("known")}>
                  ✅ Got it
                </button>
                <button style={{ ...s.btn("review"), flex: 1 }} onClick={() => nextCard("review")}>
                  🔁 Review later
                </button>
                <button style={{ ...s.btn(), flex: 1 }} onClick={() => nextCard(null)}>
                  → Skip
                </button>
              </div>
            )}

            <WordList
              title="📋 All words in this group"
              items={group.words}
              activeIndex={cIdx}
              statusOf={statusOf}
              variant="thematic"
              onSelect={(idx) => {
                patch({ thematicCardIdx: idx });
                resetReveal();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
