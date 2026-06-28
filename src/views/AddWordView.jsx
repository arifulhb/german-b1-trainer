import { useState } from "react";
import { readUserWords, writeUserWords } from "../data/loadWords.js";
import { s } from "../styles/theme.js";

const LEVELS = ["A1", "A2", "B1"];
const VERB_TAGS = ["separable", "irregular", "modal", "reflexive"];

let seq = 0;
function makeId() {
  seq += 1;
  return `user-${Math.floor(Date.now() / 1000)}-${String(seq).padStart(3, "0")}`;
}

function parseTags(text) {
  return text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function AddWordView({ groups, onWordsChanged }) {
  const [sub, setSub] = useState("thematic"); // thematic | verb
  const [userWords, setUserWords] = useState(() => readUserWords());

  // Thematic form state
  const [tDe, setTDe] = useState("");
  const [tEn, setTEn] = useState("");
  const [tGroup, setTGroup] = useState(groups[0] ?? "");
  const [tNewGroup, setTNewGroup] = useState("");
  const [tLevel, setTLevel] = useState("B1");
  const [tTags, setTTags] = useState("");
  const [tNotes, setTNotes] = useState("");

  // Verb form state
  const [vInf, setVInf] = useState("");
  const [vAux, setVAux] = useState("hat");
  const [vPart, setVPart] = useState("");
  const [vEn, setVEn] = useState("");
  const [vLevel, setVLevel] = useState("B1");
  const [vTags, setVTags] = useState([]);
  const [vNotes, setVNotes] = useState("");

  const persist = (words) => {
    writeUserWords(words);
    setUserWords(words);
    onWordsChanged();
  };

  const addThematic = (e) => {
    e.preventDefault();
    if (!tDe.trim() || !tEn.trim()) return;
    const group = tNewGroup.trim() || tGroup;
    const entry = {
      id: makeId(),
      group,
      de: tDe.trim(),
      en: tEn.trim(),
      level: tLevel,
      source: "user_added",
      tags: parseTags(tTags),
      ...(tNotes.trim() ? { notes: tNotes.trim() } : {}),
    };
    persist([...userWords, entry]);
    setTDe("");
    setTEn("");
    setTTags("");
    setTNotes("");
    setTNewGroup("");
  };

  const addVerb = (e) => {
    e.preventDefault();
    if (!vInf.trim() || !vPart.trim() || !vEn.trim()) return;
    const entry = {
      id: makeId(),
      inf: vInf.trim(),
      aux: vAux,
      part: vPart.trim(),
      en: vEn.trim(),
      level: vLevel,
      source: "user_added",
      tags: [...vTags],
      ...(vNotes.trim() ? { notes: vNotes.trim() } : {}),
    };
    persist([...userWords, entry]);
    setVInf("");
    setVPart("");
    setVEn("");
    setVTags([]);
    setVNotes("");
  };

  const remove = (id) => persist(userWords.filter((w) => w.id !== id));

  const toggleVerbTag = (tag) =>
    setVTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const tagPill = (active) => ({
    padding: "5px 12px",
    borderRadius: 999,
    border: active ? "1px solid #dbeafe" : "1px solid #e2e4e9",
    background: active ? "#dbeafe" : "#ffffff",
    color: active ? "#1d72c2" : "#6b7280",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  });

  return (
    <>
      <div style={{ ...s.dirToggle }}>
        <button style={s.btn(sub === "thematic" ? "primary" : "default")} onClick={() => setSub("thematic")}>
          Add Thematic Word
        </button>
        <button style={s.btn(sub === "verb" ? "primary" : "default")} onClick={() => setSub("verb")}>
          Add Verb
        </button>
      </div>

      <div style={s.card}>
        {sub === "thematic" ? (
          <form onSubmit={addThematic}>
            <label style={s.label}>German word *</label>
            <input style={s.input} value={tDe} onChange={(e) => setTDe(e.target.value)} placeholder="der Tisch" required />

            <label style={s.label}>English translation *</label>
            <input style={s.input} value={tEn} onChange={(e) => setTEn(e.target.value)} placeholder="table" required />

            <label style={s.label}>Group</label>
            <select style={s.input} value={tGroup} onChange={(e) => setTGroup(e.target.value)} disabled={!!tNewGroup.trim()}>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <input
              style={s.input}
              value={tNewGroup}
              onChange={(e) => setTNewGroup(e.target.value)}
              placeholder="…or type a new group name"
            />

            <label style={s.label}>Level</label>
            <select style={s.input} value={tLevel} onChange={(e) => setTLevel(e.target.value)}>
              {LEVELS.map((lv) => (
                <option key={lv} value={lv}>
                  {lv}
                </option>
              ))}
            </select>

            <label style={s.label}>Tags (comma-separated)</label>
            <input style={s.input} value={tTags} onChange={(e) => setTTags(e.target.value)} placeholder="noun, masculine" />

            <label style={s.label}>Notes</label>
            <textarea style={{ ...s.input, minHeight: 60, resize: "vertical" }} value={tNotes} onChange={(e) => setTNotes(e.target.value)} />

            <button type="submit" style={{ ...s.btn("primary"), width: "100%" }}>
              + Add word
            </button>
          </form>
        ) : (
          <form onSubmit={addVerb}>
            <label style={s.label}>Infinitive *</label>
            <input style={s.input} value={vInf} onChange={(e) => setVInf(e.target.value)} placeholder="abholen" required />

            <label style={s.label}>Auxiliary *</label>
            <select style={s.input} value={vAux} onChange={(e) => setVAux(e.target.value)}>
              <option value="hat">hat</option>
              <option value="ist">ist</option>
              <option value="hat/ist">hat/ist</option>
            </select>

            <label style={s.label}>Past participle *</label>
            <input style={s.input} value={vPart} onChange={(e) => setVPart(e.target.value)} placeholder="abgeholt" required />

            <label style={s.label}>English meaning *</label>
            <input style={s.input} value={vEn} onChange={(e) => setVEn(e.target.value)} placeholder="to pick up" required />

            <label style={s.label}>Level</label>
            <select style={s.input} value={vLevel} onChange={(e) => setVLevel(e.target.value)}>
              {LEVELS.map((lv) => (
                <option key={lv} value={lv}>
                  {lv}
                </option>
              ))}
            </select>

            <label style={s.label}>Tags</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {VERB_TAGS.map((tag) => (
                <button type="button" key={tag} style={tagPill(vTags.includes(tag))} onClick={() => toggleVerbTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>

            <label style={s.label}>Notes</label>
            <textarea style={{ ...s.input, minHeight: 60, resize: "vertical" }} value={vNotes} onChange={(e) => setVNotes(e.target.value)} />

            <button type="submit" style={{ ...s.btn("primary"), width: "100%" }}>
              + Add verb
            </button>
          </form>
        )}
      </div>

      <div style={s.card}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1d72c2", marginBottom: 12 }}>
          Your added words ({userWords.length})
        </div>
        {userWords.length === 0 && <div style={{ color: "#6b7280", fontSize: 15 }}>None yet.</div>}
        {userWords.map((w) => (
          <div
            key={w.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 0",
              borderBottom: "1px solid #ececf0",
            }}
          >
            <span style={{ color: "#1f2937", fontSize: 15 }}>
              {w.inf ? `${w.inf} · ${w.aux} ${w.part}` : w.de}
              <span style={{ color: "#6b7280" }}> — {w.en}</span>
            </span>
            <button style={{ ...s.btn("danger"), padding: "4px 12px" }} onClick={() => remove(w.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
