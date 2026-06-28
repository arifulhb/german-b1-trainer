import { sources as allSources } from "../data/loadWords.js";

// Filter bar: level / source / status. `filters` is the slice of uiState:
//   { level: "all"|"A1"|"A2"|"B1", sources: string[]|"all", status: "all"|"unseen"|"review"|"known" }
// onChange receives the updated filters object.
const LEVELS = ["all", "A1", "A2", "B1"];
const STATUSES = ["all", "unseen", "review", "known"];

function pill(active) {
  return {
    padding: "5px 12px",
    borderRadius: 999,
    border: active ? "1px solid #dbeafe" : "1px solid #e2e4e9",
    background: active ? "#dbeafe" : "#f5f6f8",
    color: active ? "#1d72c2" : "#6b7280",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    textTransform: "capitalize",
  };
}

function Group({ label, children, compact }) {
  if (compact) {
    // Vertical stack for the left sidebar: label on its own line, pills below.
    return (
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
          {label}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: "#6b7280", width: 52, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

// `compact` renders a vertical, card-less variant intended for a left sidebar.
export default function FilterBar({ filters, compact = false }) {
  const { value, onChange } = filters;
  const selectedSources = value.sources;
  const sourcesActive = (id) => selectedSources === "all" || selectedSources.includes(id);

  const toggleSource = (id) => {
    let next;
    if (selectedSources === "all") {
      // Switching from "all" to an explicit set with this one removed.
      next = allSources.map((src) => src.id).filter((sid) => sid !== id);
    } else if (selectedSources.includes(id)) {
      next = selectedSources.filter((sid) => sid !== id);
    } else {
      next = [...selectedSources, id];
    }
    // Collapse "everything selected" back to the "all" sentinel.
    if (next.length === allSources.length) next = "all";
    onChange({ ...value, sources: next });
  };

  const containerStyle = compact
    ? { marginBottom: 4 }
    : {
        background: "#f5f6f8",
        border: "1px solid #e2e4e9",
        borderRadius: 12,
        padding: "12px 16px",
        marginBottom: 16,
      };

  return (
    <div style={containerStyle}>
      <Group label="Level" compact={compact}>
        {LEVELS.map((lv) => (
          <button key={lv} style={pill(value.level === lv)} onClick={() => onChange({ ...value, level: lv })}>
            {lv === "all" ? "All" : lv}
          </button>
        ))}
      </Group>
      <Group label="Status" compact={compact}>
        {STATUSES.map((st) => (
          <button key={st} style={pill(value.status === st)} onClick={() => onChange({ ...value, status: st })}>
            {st === "all" ? "All" : st}
          </button>
        ))}
      </Group>
      <Group label="Source" compact={compact}>
        {allSources.map((src) => (
          <button key={src.id} style={pill(sourcesActive(src.id))} onClick={() => toggleSource(src.id)} title={src.description}>
            {src.name.replace(/Goethe-Zertifikat /, "").replace(/ Textbook/, "")}
          </button>
        ))}
      </Group>
    </div>
  );
}
