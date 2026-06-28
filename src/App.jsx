import { useCallback, useMemo, useState } from "react";
import ThematicView from "./views/ThematicView.jsx";
import VerbView from "./views/VerbView.jsx";
import GrammarView from "./views/GrammarView.jsx";
import WritingView from "./views/WritingView.jsx";
import AboutView from "./views/AboutView.jsx";
import PrivacyView from "./views/PrivacyView.jsx";
import AddWordView from "./views/AddWordView.jsx";
import StatsView from "./views/StatsView.jsx";
import { loadWordStore } from "./data/loadWords.js";
import { DEFAULT_FILTERS } from "./data/filterWords.js";
import { useProgress } from "./hooks/useProgress.js";
import { useSession } from "./hooks/useSession.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { s } from "./styles/theme.js";

export const REPO_URL = "https://github.com/arifulhb/german-b1-trainer";

const DEFAULT_UI = {
  activeSection: "words",
  activeTab: "thematic",
  thematicGroupIdx: 0,
  thematicCardIdx: 0,
  thematicDir: "de→en",
  thematicFilters: DEFAULT_FILTERS,
  verbCardIdx: 0,
  verbMode: "inf",
  verbFilters: DEFAULT_FILTERS,
  grammarLevel: "A1",
  grammarTopicId: "a1-pronouns",
  writingTopicId: "overview",
};

export default function App() {
  // Word store is reloaded whenever user-added words change.
  const [store, setStore] = useState(() => loadWordStore());
  const reloadStore = useCallback(() => setStore(loadWordStore()), []);

  const [ui, setUi] = useLocalStorage("uiState", DEFAULT_UI);
  // Merge defaults so older/partial persisted state still has every key.
  const uiState = { ...DEFAULT_UI, ...ui };
  const patch = useCallback((partial) => setUi((prev) => ({ ...DEFAULT_UI, ...prev, ...partial })), [setUi]);

  const { mark, statusOf, resetProgress } = useProgress();
  const { sessionLog, recordReview, resetSessionLog } = useSession();

  const groups = useMemo(() => {
    const seen = [];
    for (const w of store.thematic) if (!seen.includes(w.group)) seen.push(w.group);
    return seen;
  }, [store.thematic]);

  const section = uiState.activeSection;
  const setSection = (sec) => patch({ activeSection: sec });

  const tab = uiState.activeTab;
  const setTab = (t) => patch({ activeTab: t });

  const resetAll = () => {
    resetProgress();
    resetSessionLog();
  };

  // Top-level menu. The full word section lives under "Words"; Grammar is next.
  const sections = [
    { id: "words", label: "📚 Words" },
    { id: "grammar", label: "🧩 Grammar" },
    { id: "writing", label: "✍️ Writing" },
  ];

  // Meta pages shown as light links on the right side of the nav.
  const metaSections = [
    { id: "about", label: "ℹ️ About" },
    { id: "privacy", label: "🔒 Privacy" },
  ];

  const tabs = [
    { id: "thematic", label: "🗂️ Thematic Groups" },
    { id: "verbs", label: `🏃 Verbs (${store.verbs.length})` },
    { id: "add", label: "➕ Add Word" },
    { id: "stats", label: "📊 Stats" },
  ];

  return (
    <div style={s.app}>
      <div style={s.stickyTop}>
        <div style={s.header}>
          <div>
            <div style={s.title}>🇩🇪 German B1 Exam Trainer</div>
            <div style={s.subtitle}>
              Thematic: {store.thematic.length} words &nbsp;·&nbsp; Verbs: {store.verbs.length} verbs
            </div>
          </div>
        </div>

        <div style={s.sectionNav}>
          {sections.map((sec) => (
            <button
              key={sec.id}
              style={s.sectionTab(section === sec.id)}
              onClick={() => setSection(sec.id)}
            >
              {sec.label}
            </button>
          ))}

          <div style={s.metaNav}>
            {metaSections.map((sec, i) => (
              <span key={sec.id} style={{ display: "inline-flex", alignItems: "center" }}>
                {i > 0 && <span style={s.metaNavSep}>|</span>}
                <button
                  style={s.metaNavLink(section === sec.id)}
                  onClick={() => setSection(sec.id)}
                >
                  {sec.label}
                </button>
              </span>
            ))}
            <a
              style={s.githubStar}
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Star this project on GitHub"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>

        {section === "words" && (
          <div style={s.tabs}>
            {tabs.map((t) => (
              <button key={t.id} style={s.tab(tab === t.id)} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {section === "words" && (
        <>
          <div style={tab === "thematic" || tab === "verbs" ? { ...s.body, maxWidth: 1400 } : s.body}>
            {tab === "thematic" && (
              <ThematicView
                words={store.thematic}
                ui={uiState}
                patch={patch}
                mark={mark}
                statusOf={statusOf}
                recordReview={recordReview}
              />
            )}
            {tab === "verbs" && (
              <VerbView
                verbs={store.verbs}
                ui={uiState}
                patch={patch}
                mark={mark}
                statusOf={statusOf}
                recordReview={recordReview}
              />
            )}
            {tab === "add" && <AddWordView groups={groups} onWordsChanged={reloadStore} />}
            {tab === "stats" && (
              <StatsView
                thematic={store.thematic}
                verbs={store.verbs}
                statusOf={statusOf}
                sessionLog={sessionLog}
                onResetAll={resetAll}
              />
            )}
          </div>
        </>
      )}

      {section === "grammar" && (
        <div style={{ ...s.body, maxWidth: 1400 }}>
          <GrammarView ui={uiState} patch={patch} />
        </div>
      )}

      {section === "writing" && (
        <div style={{ ...s.body, maxWidth: 1200 }}>
          <WritingView ui={uiState} patch={patch} />
        </div>
      )}

      {section === "about" && (
        <div style={s.body}>
          <AboutView />
        </div>
      )}

      {section === "privacy" && (
        <div style={s.body}>
          <PrivacyView />
        </div>
      )}

      <footer style={s.footer}>
        Free &amp; open-source learning project · Built with AI · Non-commercial — no money involved.
        <br />
        <button style={s.footerLink} onClick={() => setSection("about")}>
          About &amp; disclaimer
        </button>
        <span style={{ margin: "0 8px", color: "#d1d5db" }}>·</span>
        <button style={s.footerLink} onClick={() => setSection("privacy")}>
          Datenschutz / Privacy
        </button>
      </footer>
    </div>
  );
}
