// Central design tokens — preserved exactly from the original artifact.
export const colors = {
  bg: "#ffffff",
  surface: "#f5f6f8",
  border: "#e2e4e9",
  textPrimary: "#1f2937",
  textMuted: "#6b7280",
  accentBlue: "#1d72c2",
  accentBlueBg: "#dbeafe",
  accentGreen: "#16a34a",
  accentGreenBg: "#dcfce7",
  accentAmber: "#b45309",
  accentAmberBg: "#fef3c7",
  accentRed: "#dc2626",
  accentRedBg: "#fee2e2",
};

// Shared style objects / factories used across views.
export const s = {
  app: {
    fontFamily: "'Inter', system-ui, sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
    color: "#1f2937",
    padding: "0 0 60px 0",
  },
  // Sticky wrapper keeping header + section menu + tabs pinned on scroll.
  stickyTop: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "#ffffff",
  },
  header: {
    background: "#ffffff",
    borderBottom: "1px solid #ececf0",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: 800, color: "#111827", letterSpacing: -0.3 },
  subtitle: { fontSize: 14, color: "#6b7280" },
  // Top-level section nav (Words / Grammar / …) — the primary menu.
  sectionNav: {
    display: "flex",
    gap: 8,
    background: "#ffffff",
    borderBottom: "1px solid #ececf0",
    padding: "10px 24px",
    flexWrap: "wrap",
  },
  sectionTab: (active) => ({
    padding: "8px 18px",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0.2,
    color: active ? "#111827" : "#6b7280",
    cursor: "pointer",
    background: active ? "#dbeafe" : "transparent",
    border: active ? "1px solid #93c5fd" : "1px solid #e2e4e9",
    borderRadius: 8,
  }),
  // Meta links (About | Privacy) pushed to the right of the section nav.
  metaNav: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  metaNavLink: (active) => ({
    background: "none",
    border: "none",
    padding: "4px 8px",
    fontSize: 14,
    fontWeight: active ? 700 : 500,
    color: active ? "#1d72c2" : "#6b7280",
    cursor: "pointer",
    textDecoration: active ? "underline" : "none",
  }),
  metaNavSep: { color: "#d1d5db", fontSize: 14 },
  // "Star on GitHub" pill in the top-right nav.
  githubStar: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginLeft: 12,
    padding: "5px 12px",
    fontSize: 14,
    fontWeight: 700,
    color: "#1f2937",
    background: "#f5f6f8",
    border: "1px solid #e2e4e9",
    borderRadius: 999,
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  // Prominent star button used on the About page.
  githubButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
    padding: "10px 18px",
    fontSize: 15,
    fontWeight: 700,
    color: "#1d72c2",
    background: "#dbeafe",
    border: "1px solid #93c5fd",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
  },
  tabs: {
    display: "flex",
    gap: 0,
    background: "#f5f6f8",
    borderBottom: "1px solid #ececf0",
    padding: "0 24px",
    flexWrap: "wrap",
  },
  tab: (active) => ({
    padding: "12px 20px",
    fontSize: 15,
    fontWeight: active ? 700 : 400,
    color: active ? "#1d72c2" : "#6b7280",
    cursor: "pointer",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid #1d72c2" : "2px solid transparent",
  }),
  body: { padding: "24px", maxWidth: 640, margin: "0 auto" },
  card: {
    background: "#f5f6f8",
    border: "1px solid #e2e4e9",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 16,
  },
  groupNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  // Two-column layout: theme sidebar + drill content.
  thematicLayout: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },
  groupSidebar: {
    flex: "0 0 340px",
    maxHeight: "70vh",
    overflowY: "auto",
    background: "#f5f6f8",
    border: "1px solid #e2e4e9",
    borderRadius: 12,
    padding: 8,
  },
  groupSidebarTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "8px 10px 6px",
  },
  // Thin separator between the filter block and the list inside the sidebar.
  sidebarDivider: {
    height: 1,
    background: "#e2e4e9",
    margin: "8px 4px 6px",
  },
  // Persistent footer with the non-commercial note.
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #ececf0",
    padding: "10px 24px",
    textAlign: "center",
    fontSize: 13,
    color: "#9ca3af",
    lineHeight: 1.6,
    background: "#ffffff",
    zIndex: 50,
  },
  footerLink: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#1d72c2",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "underline",
  },
  groupSidebarItem: (active) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    textAlign: "left",
    padding: "9px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: active ? 700 : 500,
    background: active ? "#dbeafe" : "transparent",
    color: active ? "#1d72c2" : "#4b5563",
    marginBottom: 2,
  }),
  groupSidebarCount: (active) => ({
    fontSize: 13,
    fontWeight: 600,
    color: active ? "#1d72c2" : "#6b7280",
    flexShrink: 0,
  }),
  thematicMain: {
    flex: 1,
    minWidth: 0,
  },
  btn: (variant = "default") => ({
    padding: "9px 18px",
    borderRadius: 8,
    border: "none",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    background:
      variant === "known"
        ? "#dcfce7"
        : variant === "review"
        ? "#fef3c7"
        : variant === "primary"
        ? "#dbeafe"
        : variant === "danger"
        ? "#fee2e2"
        : "#e2e4e9",
    color:
      variant === "known"
        ? "#16a34a"
        : variant === "review"
        ? "#b45309"
        : variant === "primary"
        ? "#1d72c2"
        : variant === "danger"
        ? "#dc2626"
        : "#4b5563",
  }),
  dirToggle: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  // Grammar section — level pills above the topic sidebar.
  levelPills: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },
  levelPill: (active) => ({
    flex: 1,
    padding: "8px 0",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0.3,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 8,
    background: active ? "#1d72c2" : "#f5f6f8",
    color: active ? "#ffffff" : "#6b7280",
    border: active ? "1px solid #1d72c2" : "1px solid #e2e4e9",
  }),
  // Heading + intro line shown above the topic content.
  grammarTopicTitle: { fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 4 },
  grammarTopicSummary: { fontSize: 15, color: "#6b7280", marginBottom: 20 },
  grammarBlockHeading: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1d72c2",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    margin: "18px 0 8px",
  },
  grammarText: { fontSize: 16, lineHeight: 1.6, color: "#374151", marginBottom: 8 },
  // Highlighted rule / tip box.
  grammarRule: {
    fontSize: 15.5,
    lineHeight: 1.6,
    color: "#1f2937",
    background: "#eaf2fb",
    border: "1px solid #dbeafe",
    borderLeft: "3px solid #1d72c2",
    borderRadius: 8,
    padding: "10px 14px",
    margin: "10px 0",
  },
  grammarTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 15,
    margin: "8px 0 14px",
  },
  grammarTh: {
    textAlign: "left",
    padding: "8px 10px",
    background: "#f5f6f8",
    color: "#374151",
    fontWeight: 700,
    borderBottom: "1px solid #e2e4e9",
  },
  grammarTd: {
    padding: "7px 10px",
    color: "#1f2937",
    borderBottom: "1px solid #ececf0",
  },
  // DE/EN example pair row.
  grammarExample: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: "8px 12px",
    borderRadius: 8,
    background: "#f5f6f8",
    marginBottom: 8,
  },
  grammarExampleDe: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
  grammarExampleEn: { fontSize: 15, color: "#6b7280" },
  // Writing section — full worked-example "letter" block.
  writingSampleNote: {
    fontSize: 15,
    lineHeight: 1.55,
    color: "#b45309",
    background: "#fef3c7",
    border: "1px solid #fde68a",
    borderRadius: 8,
    padding: "10px 14px",
    marginBottom: 12,
  },
  writingSample: {
    background: "#ffffff",
    border: "1px solid #e2e4e9",
    borderRadius: 10,
    padding: "18px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
    color: "#1f2937",
    whiteSpace: "pre-wrap",
  },
  // Form field styles (dark-themed, consistent with the existing language).
  label: { fontSize: 14, color: "#1d72c2", fontWeight: 700, marginBottom: 6, display: "block" },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "#ffffff",
    border: "1px solid #e2e4e9",
    borderRadius: 8,
    color: "#1f2937",
    fontSize: 16,
    fontFamily: "inherit",
    marginBottom: 14,
  },
  field: { marginBottom: 4 },
};
