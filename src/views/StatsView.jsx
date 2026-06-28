import { useMemo, useState } from "react";
import { sources } from "../data/loadWords.js";
import { s } from "../styles/theme.js";

// Scaffold only — totals + session log are wired; the chart is a placeholder.
export default function StatsView({ thematic, verbs, statusOf, sessionLog, onResetAll }) {
  const [confirming, setConfirming] = useState(false);

  const allWords = useMemo(() => [...thematic, ...verbs], [thematic, verbs]);

  // Per-source and overall tallies.
  const rows = useMemo(() => {
    const tally = {};
    const blank = () => ({ total: 0, known: 0, review: 0, seen: 0 });
    tally.__overall = blank();
    for (const w of allWords) {
      const st = statusOf(w.id);
      const bucket = (tally[w.source] ??= blank());
      for (const b of [bucket, tally.__overall]) {
        b.total += 1;
        if (st === "known") {
          b.known += 1;
          b.seen += 1;
        } else if (st === "review") {
          b.review += 1;
          b.seen += 1;
        }
      }
    }
    return tally;
  }, [allWords, statusOf]);

  const sourceName = (id) => sources.find((src) => src.id === id)?.name ?? id;
  const usedSources = Object.keys(rows).filter((k) => k !== "__overall");

  const cell = { padding: "8px 10px", fontSize: 15, textAlign: "right", color: "#1f2937" };
  const headCell = { ...cell, color: "#6b7280", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 };
  const labelCell = { ...cell, textAlign: "left" };

  return (
    <>
      <div style={s.card}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1d72c2", marginBottom: 12 }}>Words by source</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...headCell, textAlign: "left" }}>Source</th>
              <th style={headCell}>Total</th>
              <th style={headCell}>Seen</th>
              <th style={headCell}>Known</th>
              <th style={headCell}>Review</th>
            </tr>
          </thead>
          <tbody>
            {usedSources.map((id) => (
              <tr key={id} style={{ borderTop: "1px solid #ececf0" }}>
                <td style={labelCell}>{sourceName(id)}</td>
                <td style={cell}>{rows[id].total}</td>
                <td style={cell}>{rows[id].seen}</td>
                <td style={{ ...cell, color: "#16a34a" }}>{rows[id].known}</td>
                <td style={{ ...cell, color: "#b45309" }}>{rows[id].review}</td>
              </tr>
            ))}
            <tr style={{ borderTop: "2px solid #e2e4e9" }}>
              <td style={{ ...labelCell, fontWeight: 800 }}>Overall</td>
              <td style={{ ...cell, fontWeight: 800 }}>{rows.__overall.total}</td>
              <td style={{ ...cell, fontWeight: 800 }}>{rows.__overall.seen}</td>
              <td style={{ ...cell, fontWeight: 800, color: "#16a34a" }}>{rows.__overall.known}</td>
              <td style={{ ...cell, fontWeight: 800, color: "#b45309" }}>{rows.__overall.review}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={s.card}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1d72c2", marginBottom: 12 }}>Progress over time</div>
        <div
          style={{
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #e2e4e9",
            borderRadius: 8,
            color: "#6b7280",
            fontSize: 15,
          }}
        >
          Progress chart — coming soon
        </div>
      </div>

      <div style={s.card}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1d72c2", marginBottom: 12 }}>Session log</div>
        {sessionLog.length === 0 ? (
          <div style={{ color: "#6b7280", fontSize: 15 }}>No sessions logged yet.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...headCell, textAlign: "left" }}>Date</th>
                <th style={headCell}>Words</th>
                <th style={headCell}>Verbs</th>
              </tr>
            </thead>
            <tbody>
              {sessionLog.map((row) => (
                <tr key={row.date} style={{ borderTop: "1px solid #ececf0" }}>
                  <td style={labelCell}>{row.date}</td>
                  <td style={cell}>{row.wordsReviewed}</td>
                  <td style={cell}>{row.verbsReviewed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={s.card}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#dc2626", marginBottom: 12 }}>Danger zone</div>
        {confirming ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 15, color: "#4b5563" }}>Erase all progress and session history?</span>
            <button
              style={s.btn("danger")}
              onClick={() => {
                onResetAll();
                setConfirming(false);
              }}
            >
              Yes, reset
            </button>
            <button style={s.btn()} onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button style={s.btn("danger")} onClick={() => setConfirming(true)}>
            Reset all progress
          </button>
        )}
      </div>
    </>
  );
}
