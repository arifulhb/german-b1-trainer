// Small colored pill. Preserved from the original artifact.
export default function Badge({ children, color = "blue" }) {
  const colors = {
    blue: { background: "#dbeafe", color: "#1d72c2" },
    green: { background: "#dcfce7", color: "#16a34a" },
    amber: { background: "#fef3c7", color: "#b45309" },
    red: { background: "#fee2e2", color: "#dc2626" },
    grey: { background: "#e2e4e9", color: "#6b7280" },
  };
  return (
    <span
      style={{
        ...colors[color],
        fontSize: 13,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 4,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
