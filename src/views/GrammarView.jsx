import { useMemo } from "react";
import { GRAMMAR } from "../data/grammar.js";
import { s } from "../styles/theme.js";

// Renders one content block (text / rule / list / table / examples).
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

    default:
      return null;
  }
}

export default function GrammarView({ ui, patch }) {
  const levelName = ui.grammarLevel;
  const level = useMemo(
    () => GRAMMAR.find((l) => l.level === levelName) ?? GRAMMAR[0],
    [levelName],
  );

  // Resolve the active topic, falling back to the first topic of the level.
  const topic = useMemo(() => {
    return level.topics.find((t) => t.id === ui.grammarTopicId) ?? level.topics[0];
  }, [level, ui.grammarTopicId]);

  const selectLevel = (name) => {
    const next = GRAMMAR.find((l) => l.level === name);
    patch({ grammarLevel: name, grammarTopicId: next.topics[0].id });
  };

  return (
    <div style={s.thematicLayout}>
      <aside style={s.groupSidebar}>
        <div style={s.levelPills}>
          {GRAMMAR.map((l) => (
            <button
              key={l.level}
              style={s.levelPill(l.level === level.level)}
              onClick={() => selectLevel(l.level)}
            >
              {l.level}
            </button>
          ))}
        </div>
        <div style={s.groupSidebarTitle}>
          📖 {level.level} Topics ({level.topics.length})
        </div>
        {level.topics.map((t) => {
          const active = t.id === topic.id;
          return (
            <button
              key={t.id}
              style={s.groupSidebarItem(active)}
              onClick={() => patch({ grammarTopicId: t.id })}
              aria-current={active ? "true" : undefined}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t.title}
              </span>
            </button>
          );
        })}
      </aside>

      <div style={s.thematicMain}>
        <div style={{ ...s.card }}>
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
