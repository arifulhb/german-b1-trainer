// Thin progress bar. Preserved from the original artifact.
export default function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ background: "#e2e4e9", borderRadius: 4, height: 6, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: pct === 100 ? "#16a34a" : "#2563eb",
          transition: "width 0.3s ease",
          borderRadius: 4,
        }}
      />
    </div>
  );
}
