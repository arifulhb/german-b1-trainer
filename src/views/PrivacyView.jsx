import { s } from "../styles/theme.js";

// Static privacy / Datenschutz page. The app is fully client-side: it makes no
// network requests and stores everything in the browser's localStorage.
export default function PrivacyView() {
  return (
    <div style={s.card}>
      <div style={s.grammarTopicTitle}>Datenschutz · Privacy</div>
      <div style={s.grammarTopicSummary}>
        This is a client-only app. Your data never leaves your device.
      </div>

      <p style={s.grammarText}>
        This application runs entirely in your web browser. It does not have a backend
        server, user accounts, or a database. It does not send your learning data,
        progress, or any other information anywhere.
      </p>

      <div style={s.grammarBlockHeading}>No data is transferred</div>
      <div style={s.grammarRule}>
        The app makes no network requests of its own. There is no tracking, no analytics,
        no advertising, no cookies, and no third-party scripts. Nothing you do in the app
        is transmitted to the developer or to any external server.
      </div>

      <div style={s.grammarBlockHeading}>What is stored, and where</div>
      <p style={s.grammarText}>
        Your progress and settings are saved only in your own browser, using the browser&rsquo;s
        local storage (<code>localStorage</code>) on your device. This includes:
      </p>
      <ul style={{ margin: "8px 0 14px", paddingLeft: 20 }}>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          Your learning progress (which words you marked as known / to review).
        </li>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          Your session statistics (counts of reviewed cards).
        </li>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          Your interface preferences (selected tab, filters, drill mode).
        </li>
        <li style={{ ...s.grammarText, marginBottom: 4 }}>
          Any custom words you add yourself.
        </li>
      </ul>
      <p style={s.grammarText}>
        This data stays on your device and is under your control. No personal information
        (such as your name or email) is requested or collected.
      </p>

      <div style={s.grammarBlockHeading}>Deleting your data</div>
      <p style={s.grammarText}>
        You can remove everything at any time: use the reset option in the Stats tab, or
        clear the site data / local storage for this page in your browser settings. Once
        cleared, the data is gone for good — there is no copy anywhere else.
      </p>

      <div style={s.grammarBlockHeading}>Hosting</div>
      <p style={s.grammarText}>
        Like any website, the static files of this app must be delivered by a web host
        (for example GitHub Pages). Such hosting providers may automatically record
        standard technical access logs (e.g. IP address, browser type) to deliver the page
        — this is handled by the hosting provider, not by the app, and the app itself sends
        them nothing about your activity.
      </p>

      <div style={s.grammarBlockHeading}>GDPR (DSGVO) statement</div>
      <div style={s.grammarRule}>
        ✅ This app is privacy-friendly by design. Because it collects no personal data,
        transmits nothing, sets no cookies, and processes everything locally on your own
        device, there is no personal-data processing by the app under the GDPR (DSGVO).
        Your data stays with you. This is &ldquo;privacy by design&rdquo; in its simplest form.
      </div>
      <p style={{ ...s.grammarExampleEn, marginTop: 12 }}>
        Note: this statement describes how the app works and is provided in good faith for
        transparency. It is not legal advice. The only data leaving your browser is the
        normal web traffic needed to load the page from the hosting provider.
      </p>
    </div>
  );
}
