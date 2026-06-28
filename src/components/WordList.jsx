import { s } from "../styles/theme.js";

// Scrollable list shown below the active flashcard. Highlights the current card
// and replaces the translation column with a ✅ / 🔁 marker once a word has a
// recorded status. `variant` selects the thematic (2-col) or verb (3-col) layout.
export default function WordList({ title, items, activeIndex, statusOf, variant = "thematic", onSelect }) {
  const marker = (item) => {
    const st = statusOf(item.id);
    if (st === "known") return "✅";
    if (st === "review") return "🔁";
    return null;
  };

  return (
    <div style={{ ...s.card, marginTop: 24, maxHeight: 360, overflowY: "auto" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1d72c2", marginBottom: 12 }}>{title}</div>
      {items.map((item, i) => {
        const rowBase = {
          padding: "6px 8px",
          borderBottom: i < items.length - 1 ? "1px solid #ececf0" : "none",
          background: i === activeIndex ? "#eef2fb" : "transparent",
          borderRadius: 4,
          transition: "background 0.2s",
          cursor: onSelect ? "pointer" : "default",
        };
        const clickProps = onSelect
          ? {
              onClick: () => onSelect(i),
              onMouseEnter: (e) => {
                if (i !== activeIndex) e.currentTarget.style.background = "#f0f1f4";
              },
              onMouseLeave: (e) => {
                if (i !== activeIndex) e.currentTarget.style.background = "transparent";
              },
            }
          : {};
        const m = marker(item);

        if (variant === "verb") {
          return (
            <div
              key={item.id}
              {...clickProps}
              style={{ ...rowBase, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}
            >
              <span style={{ color: "#1f2937", fontSize: 14, fontWeight: 600 }}>{item.inf}</span>
              <span style={{ color: "#1d72c2", fontSize: 14 }}>
                {item.aux} + {item.part}
              </span>
              <span style={{ color: "#6b7280", fontSize: 14 }}>{m ?? item.en}</span>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            {...clickProps}
            style={{ ...rowBase, display: "flex", justifyContent: "space-between" }}
          >
            <span style={{ color: "#1f2937", fontSize: 15 }}>{item.de}</span>
            <span style={{ color: "#1d72c2", fontSize: 15 }}>{m ?? item.en}</span>
          </div>
        );
      })}
    </div>
  );
}
