import { useMemo } from "react";
import { WRITING } from "../data/writing.js";
import { s } from "../styles/theme.js";

// Renders one content block. Mirrors the grammar blocks and adds "sample".
function Block({ block }) {
  switch (block.type) {
    case "text":
      return <p style={s.grammarText}>{block.text}</p>;

    case "rule":
      return <div style={s.grammarRule}>💡 {block.text}</div>;

    case "list":
      return (
        <ul style={{ margin: "8px 0 14px", paddingLeft: 20 }}>
          {block.items.map((it, i) => (
            <li key={i} style={{ ...s.grammarText, marginBottom: 4 }}>
              {it}
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <table style={s.grammarTable}>
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th key={i} style={s.grammarTh}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={s.grammarTd}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "examples":
      return (
        <div style={{ margin: "8px 0 14px" }}>
          {block.items.map((ex, i) => (
            <div key={i} style={s.grammarExample}>
              <span style={s.grammarExampleDe}>{ex.de}</span>
              <span style={s.grammarExampleEn}>{ex.en}</span>
            </div>
          ))}
        </div>
      );

    case "sample":
      return (
        <div style={{ margin: "8px 0 14px" }}>
          <div style={s.grammarBlockHeading}>{block.title ?? "Example"}</div>
          {block.note && <div style={s.writingSampleNote}>📝 {block.note}</div>}
          <div style={s.writingSample}>{block.lines.join("\n")}</div>
        </div>
      );

    default:
      return null;
  }
}

export default function WritingView({ ui, patch }) {
  const topic = useMemo(
    () => WRITING.find((t) => t.id === ui.writingTopicId) ?? WRITING[0],
    [ui.writingTopicId],
  );

  return (
    <div style={s.thematicLayout}>
      <aside style={s.groupSidebar}>
        <div style={s.groupSidebarTitle}>✍️ B1 Writing ({WRITING.length})</div>
        {WRITING.map((t) => {
          const active = t.id === topic.id;
          return (
            <button
              key={t.id}
              style={s.groupSidebarItem(active)}
              onClick={() => patch({ writingTopicId: t.id })}
              aria-current={active ? "true" : undefined}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t.icon} {t.title}
              </span>
            </button>
          );
        })}
      </aside>

      <div style={s.thematicMain}>
        <div style={s.card}>
          <div style={s.grammarTopicTitle}>{topic.title}</div>
          <div style={s.grammarTopicSummary}>{topic.summary}</div>
          {topic.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
