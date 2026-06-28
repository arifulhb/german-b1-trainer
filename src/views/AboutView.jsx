import { s } from "../styles/theme.js";
import { REPO_URL } from "../App.jsx";

// Static "About" / disclaimer page. States clearly that this is a free,
// non-commercial, open-source learning project with no money involved.
export default function AboutView() {
  return (
    <div style={s.card}>
      <div style={s.grammarTopicTitle}>About this project</div>
      <div style={s.grammarTopicSummary}>
        A free, open-source German B1 exam-preparation app.
      </div>

      <p style={s.grammarText}>
        This is a personal, non-commercial hobby project created to help with preparing
        for the German B1 exam. It is shared freely so that other learners can use it too.
      </p>

      <p style={s.grammarText}>
        If this app helps you, please consider giving it a star on GitHub — it&rsquo;s a
        free way to support the project and help other learners find it.
      </p>
      <div>
        <a style={s.githubButton} href={REPO_URL} target="_blank" rel="noopener noreferrer">
          ⭐ Star this project on GitHub
        </a>
      </div>

      <div style={s.grammarBlockHeading}>What this project is</div>
      <ul style={{ margin: "8px 0 14px", paddingLeft: 20 }}>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          🆓 <strong>Free for everyone.</strong> There is no price, no subscription, and no paywall.
        </li>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          📖 <strong>Open source.</strong> The code is public and released under the
          permissive <strong>MIT License</strong>, so anyone may use, copy and modify it.
        </li>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          🤖 <strong>Built with AI.</strong> The app and much of its study content were
          generated with the help of AI tools.
        </li>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          🎓 <strong>For learning only.</strong> It is a study aid, not an official exam
          product and not affiliated with any exam institute or publisher.
        </li>
      </ul>

      <div style={s.grammarBlockHeading}>No money is involved</div>
      <div style={s.grammarRule}>
        This project is purely non-commercial. No money is earned, charged, requested,
        donated or handed over through it. There are no ads, no sales, no payments and no
        income of any kind. It is a free-time learning project, not a business or a source
        of revenue.
      </div>

      <div style={s.grammarBlockHeading}>Disclaimer</div>
      <p style={s.grammarText}>
        The content is provided “as is”, without any guarantee of accuracy or completeness.
        Some translations and grammar explanations were generated with AI and may contain
        mistakes. Always check important details against your official course material and
        textbooks. Use of this app is at your own discretion.
      </p>

      <p style={{ ...s.grammarExampleEn, marginTop: 16 }}>
        Made with ❤️ for language learners · Non-commercial · No money involved.
      </p>
    </div>
  );
}
