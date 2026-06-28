import { useState } from "react";
import { s } from "../styles/theme.js";

export default function WordList({ title, items, activeIndex, statusOf, mark, variant = "thematic", onSelect }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => {
          const haystack = variant === "verb"
            ? `${item.inf} ${item.en} ${item.aux ?? ""} ${item.part ?? ""}`.toLowerCase()
            : `${item.de} ${item.en}`.toLowerCase();
          return haystack.includes(q);
        })
    : items.map((item, i) => ({ item, i }));

  return (
    <div style={{ ...s.card, marginTop: 24, flex: 1, minHeight: 0, overflowY: "auto" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1d72c2", marginBottom: 8 }}>{title}</div>
      <input
        type="search"
        placeholder="Search words…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "7px 10px",
          marginBottom: 10,
          fontSize: 14,
          border: "1px solid #e2e4e9",
          borderRadius: 7,
          background: "#ffffff",
          color: "#1f2937",
          fontFamily: "inherit",
          boxSizing: "border-box",
          outline: "none",
        }}
      />
      {filtered.length === 0 && (
        <div style={{ fontSize: 14, color: "#9ca3af", textAlign: "center", padding: "10px 0" }}>
          No matches
        </div>
      )}
      {filtered.map(({ item, i }, fi) => {
        const st = statusOf(item.id);
        const isMarked = st === "known" || st === "review";
        const isKnown = st === "known";
        const marker = st === "known" ? "✅" : st === "review" ? "🔁" : null;

        const prevItem = fi > 0 ? filtered[fi - 1] : null;
        const prevIsKnown = prevItem ? statusOf(prevItem.item.id) === "known" : false;
        const showKnownDivider = isKnown && !prevIsKnown;

        const rowBase = {
          padding: "6px 8px",
          borderBottom: fi < filtered.length - 1 ? "1px solid #ececf0" : "none",
          background: i === activeIndex ? "#eef2fb" : "transparent",
          borderRadius: 4,
          transition: "background 0.2s",
          cursor: onSelect ? "pointer" : "default",
          opacity: isKnown ? 0.55 : 1,
          display: "flex",
          alignItems: "center",
          gap: 6,
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

        const clearBtn = isMarked && mark ? (
          <button
            onClick={(e) => { e.stopPropagation(); mark(item.id, null); }}
            title="Clear status"
            style={{
              marginLeft: "auto",
              flexShrink: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              fontSize: 13,
              lineHeight: 1,
              padding: "2px 4px",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
          >
            ✕
          </button>
        ) : null;

        const row = variant === "verb" ? (
          <div key={item.id} {...clickProps} style={rowBase}>
            <span style={{ color: "#1f2937", fontSize: 14, fontWeight: 600, flex: "0 0 30%" }}>{item.inf}</span>
            <span style={{ color: "#1d72c2", fontSize: 14, flex: "0 0 35%" }}>
              {item.aux} + {item.part}
            </span>
            <span style={{ color: "#6b7280", fontSize: 14, flex: 1 }}>{marker ?? item.en}</span>
            {clearBtn}
          </div>
        ) : (
          <div key={item.id} {...clickProps} style={rowBase}>
            <span style={{ color: "#1f2937", fontSize: 15, flex: 1 }}>{item.de}</span>
            <span style={{ color: "#1d72c2", fontSize: 15 }}>{marker ?? item.en}</span>
            {clearBtn}
          </div>
        );

        return (
          <div key={item.id}>
            {showKnownDivider && (
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5, padding: "8px 8px 4px" }}>
                ✅ Known
              </div>
            )}
            {row}
          </div>
        );
      })}
    </div>
  );
}
