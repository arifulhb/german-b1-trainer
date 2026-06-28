// Tap-to-reveal flashcard. Preserved from the original artifact.
export default function FlashCard({ front, back, revealed, onReveal }) {
  return (
    <div
      onClick={!revealed ? onReveal : undefined}
      style={{
        background: "#f5f6f8",
        border: `1px solid ${revealed ? "#86efac" : "#d1d5db"}`,
        borderRadius: 12,
        padding: "28px 32px",
        cursor: revealed ? "default" : "pointer",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "border-color 0.2s",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 700, color: "#1f2937", marginBottom: revealed ? 12 : 0 }}>
        {front}
      </div>
      {revealed ? (
        <div style={{ fontSize: 17, color: "#1d72c2", marginTop: 8 }}>{back}</div>
      ) : (
        <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 12 }}>tap to reveal</div>
      )}
    </div>
  );
}
