// B1 Writing guide for the Writing section.
//
// Same generic block model as grammar.js, plus one extra block type:
//   { type: "sample", title, lines: [string], note }  → a full worked example
//
// Block types:
//   { type: "text",     text }
//   { type: "rule",     text }                       → highlighted tip box
//   { type: "list",     items: [string] }
//   { type: "table",    headers: [string], rows: [[string]] }
//   { type: "examples", items: [{ de, en }] }        → DE/EN phrase pairs
//   { type: "sample",   title, lines: [string], note }
//
// Content follows the Goethe-/telc-Zertifikat B1 "Schreiben" module.

export const WRITING = [
  {
    id: "overview",
    icon: "📌",
    title: "How B1 Writing Works",
    summary: "What the Schreiben module asks for and how it is graded.",
    blocks: [
      {
        type: "text",
        text: "The B1 writing exam (Goethe / telc) has three short tasks. You don't need long, complex texts — you need clear structure, the right register (formal vs. informal), and to answer every guide point (Leitpunkt) you are given.",
      },
      {
        type: "table",
        headers: ["Task", "Text type", "Length", "Register"],
        rows: [
          ["Teil 1", "Informal email to a friend", "~80 words", "informal (du)"],
          ["Teil 2", "Forum post / opinion comment", "~80 words", "neutral"],
          ["Teil 3", "Short formal message (e.g. apology)", "~40 words", "formal (Sie)"],
        ],
      },
      {
        type: "rule",
        text: "The #1 reason people lose points: they ignore a guide point. Every prompt lists 3–4 things you must mention. Tick each one off — answer ALL of them, even briefly.",
      },
      {
        type: "text",
        text: "What the examiner rewards:",
      },
      {
        type: "list",
        items: [
          "Inhalt — you covered every guide point and stayed on topic.",
          "Struktur — greeting, clear middle (connected sentences), closing.",
          "Wortschatz & Grammatik — varied vocabulary and connectors, not just „und … und …\".",
          "Register — correct Sie/du and the matching greeting & closing.",
        ],
      },
      {
        type: "rule",
        text: "Golden routine (10 min per task): 1) underline the guide points, 2) jot 1 sentence per point, 3) add greeting + closing, 4) connect with weil / deshalb / trotzdem / außerdem, 5) check verb position & capital nouns.",
      },
    ],
  },

  {
    id: "informal-email",
    icon: "📧",
    title: "Informal Email (to a friend)",
    summary: "Teil 1 — writing to someone you address with „du\".",
    blocks: [
      {
        type: "text",
        text: "You write to a friend or family member. Use du, a warm tone, and react to their news before answering the guide points.",
      },
      {
        type: "table",
        headers: ["Part", "What to write", "Example"],
        rows: [
          ["Greeting", "Hallo / Liebe(r) + name", "Liebe Anna,"],
          ["Opener", "Thank / react to their message", "vielen Dank für deine E-Mail!"],
          ["Main 1–3", "One sentence per guide point", "see Redemittel below"],
          ["Closing line", "Friendly sign-off sentence", "Ich freue mich, von dir zu hören."],
          ["Sign-off", "Casual + your name", "Liebe Grüße, Max"],
        ],
      },
      {
        type: "text",
        text: "Useful phrases (Redemittel):",
      },
      {
        type: "examples",
        items: [
          { de: "Vielen Dank für deine E-Mail / deinen Brief.", en: "Thanks a lot for your email / letter." },
          { de: "Es tut mir leid, dass ich erst jetzt schreibe.", en: "Sorry that I'm only writing now." },
          { de: "Wie geht es dir? Bei mir ist alles gut.", en: "How are you? I'm doing fine." },
          { de: "Du hast mich gefragt, ob …", en: "You asked me whether …" },
          { de: "Ich würde dich gern besuchen.", en: "I'd love to visit you." },
          { de: "Schreib mir bald zurück!", en: "Write back soon!" },
          { de: "Liebe Grüße / Viele Grüße / Bis bald", en: "Best wishes / Many greetings / See you soon" },
        ],
      },
      {
        type: "rule",
        text: "Informal sign-offs: Liebe Grüße, Viele Grüße, Bis bald, Dein/Deine + name. NEVER use „Mit freundlichen Grüßen\" to a friend — that's formal.",
      },
      {
        type: "sample",
        title: "Worked example",
        note: "Prompt: A friend invited you to their birthday party. Write back: thank them, say if you'll come, ask what to bring, suggest meeting earlier.",
        lines: [
          "Liebe Sarah,",
          "",
          "vielen Dank für deine Einladung zur Geburtstagsparty! Ich habe mich sehr darüber gefreut.",
          "",
          "Natürlich komme ich gern. Ich habe an diesem Samstag Zeit und freue mich schon sehr darauf, dich zu sehen.",
          "",
          "Sag mir bitte, ob ich etwas mitbringen soll. Ich könnte zum Beispiel einen Salat oder einen Kuchen machen.",
          "",
          "Außerdem hätte ich eine Idee: Sollen wir uns vorher treffen, vielleicht um 17 Uhr im Café? Dann können wir in Ruhe reden.",
          "",
          "Ich freue mich auf deine Antwort. Bis Samstag!",
          "",
          "Liebe Grüße",
          "Max",
        ],
      },
    ],
  },

  {
    id: "formal-letter",
    icon: "📨",
    title: "Formal Email / Letter",
    summary: "Teil 3 — writing to a company, office, teacher or landlord (Sie).",
    blocks: [
      {
        type: "text",
        text: "A formal message is polite, short and to the point. Use Sie, the fixed greeting and closing, and state your reason clearly.",
      },
      {
        type: "table",
        headers: ["Part", "What to write", "Example"],
        rows: [
          ["Greeting", "Sehr geehrte(r) Frau/Herr + name", "Sehr geehrte Frau Müller,"],
          ["If name unknown", "Sehr geehrte Damen und Herren,", "Sehr geehrte Damen und Herren,"],
          ["Reason", "Why you are writing", "ich schreibe Ihnen, weil …"],
          ["Request / info", "Your concern or apology", "Leider kann ich … / Könnten Sie …"],
          ["Closing line", "Polite next step / thanks", "Vielen Dank im Voraus."],
          ["Sign-off", "Mit freundlichen Grüßen + name", "Mit freundlichen Grüßen, A. Haque"],
        ],
      },
      {
        type: "text",
        text: "Useful phrases (Redemittel):",
      },
      {
        type: "examples",
        items: [
          { de: "Sehr geehrte Damen und Herren,", en: "Dear Sir or Madam," },
          { de: "ich schreibe Ihnen, weil …", en: "I am writing to you because …" },
          { de: "Hiermit möchte ich mich für … entschuldigen.", en: "I would hereby like to apologise for …" },
          { de: "Leider kann ich am … nicht teilnehmen.", en: "Unfortunately I cannot attend on …" },
          { de: "Könnten Sie mir bitte mitteilen, ob …", en: "Could you please let me know whether …" },
          { de: "Ich wäre Ihnen sehr dankbar, wenn …", en: "I would be very grateful if …" },
          { de: "Vielen Dank im Voraus für Ihre Mühe.", en: "Thank you in advance for your effort." },
          { de: "Mit freundlichen Grüßen", en: "Kind regards / Yours sincerely" },
        ],
      },
      {
        type: "rule",
        text: "Note the comma + lowercase: after „Sehr geehrte Frau Müller,\" the next line starts with a small letter (ich schreibe …). Formal sign-off is always „Mit freundlichen Grüßen\".",
      },
      {
        type: "sample",
        title: "Worked example",
        note: "Prompt: You signed up for a German course but can't attend the first lesson. Write to the school: apologise, give a reason, ask for the material, ask if you can still join.",
        lines: [
          "Sehr geehrte Damen und Herren,",
          "",
          "ich habe mich für den Deutschkurs A2 angemeldet, der am Montag beginnt.",
          "",
          "Leider kann ich an der ersten Stunde nicht teilnehmen, weil ich an diesem Tag einen wichtigen Arzttermin habe.",
          "",
          "Könnten Sie mir bitte mitteilen, ob ich trotzdem im Kurs bleiben kann? Außerdem wäre ich Ihnen sehr dankbar, wenn Sie mir das Material der ersten Stunde schicken könnten.",
          "",
          "Vielen Dank im Voraus für Ihre Hilfe.",
          "",
          "Mit freundlichen Grüßen",
          "Ariful Haque",
        ],
      },
    ],
  },

  {
    id: "forum-post",
    icon: "💬",
    title: "Forum Post / Opinion (Meinung)",
    summary: "Teil 2 — reacting to a topic and giving your opinion in a comment.",
    blocks: [
      {
        type: "text",
        text: "You read a short statement or question (e.g. „Should children have smartphones?\") and write a comment. Take a clear position, give reasons and an example, then conclude. Tone is neutral — neither very formal nor very casual.",
      },
      {
        type: "table",
        headers: ["Part", "Function", "Example phrase"],
        rows: [
          ["Intro", "React to the topic", "Das Thema finde ich sehr interessant."],
          ["Opinion", "State your view", "Meiner Meinung nach …"],
          ["Reason", "Justify it", "… weil / denn …"],
          ["Example", "Give an example", "Zum Beispiel …"],
          ["Other side", "Acknowledge (optional)", "Natürlich gibt es auch …"],
          ["Conclusion", "Wrap up", "Zusammenfassend …"],
        ],
      },
      {
        type: "text",
        text: "Useful phrases (Redemittel):",
      },
      {
        type: "examples",
        items: [
          { de: "Meiner Meinung nach …", en: "In my opinion …" },
          { de: "Ich bin der Meinung, dass …", en: "I am of the opinion that …" },
          { de: "Ich finde, dass …", en: "I think that …" },
          { de: "Einerseits … andererseits …", en: "On the one hand … on the other hand …" },
          { de: "Ein Vorteil / Nachteil ist, dass …", en: "An advantage / disadvantage is that …" },
          { de: "Ich stimme … (nicht) zu.", en: "I (don't) agree with …" },
          { de: "Aus diesen Gründen denke ich, dass …", en: "For these reasons I think that …" },
          { de: "Zusammenfassend kann man sagen, dass …", en: "To sum up, one can say that …" },
        ],
      },
      {
        type: "rule",
        text: "Show range with connectors: weil, deshalb, trotzdem, außerdem, einerseits/andererseits, zum Beispiel. One or two of these in your text noticeably raises your grammar score.",
      },
      {
        type: "sample",
        title: "Worked example",
        note: "Forum topic: „Ist es gut, im Homeoffice zu arbeiten?\" — Give your opinion with a reason and an example.",
        lines: [
          "Das Thema Homeoffice finde ich sehr interessant, weil heute viele Menschen von zu Hause aus arbeiten.",
          "",
          "Meiner Meinung nach hat das Homeoffice viele Vorteile. Einerseits spart man Zeit, weil man nicht zur Arbeit fahren muss. Andererseits kann man sich die Arbeit besser einteilen.",
          "",
          "Zum Beispiel kann meine Schwester morgens in Ruhe arbeiten und nachmittags Sport machen.",
          "",
          "Natürlich gibt es auch Nachteile: Manchmal fehlt der Kontakt zu den Kollegen.",
          "",
          "Zusammenfassend denke ich aber, dass Homeoffice eine gute Möglichkeit ist, wenn man diszipliniert ist.",
        ],
      },
    ],
  },

  {
    id: "connectors-toolkit",
    icon: "🔗",
    title: "Connector Toolkit",
    summary: "The linking words that lift every B1 text.",
    blocks: [
      {
        type: "text",
        text: "Sprinkle these through any of the three text types. They make your writing flow and directly raise your grammar/structure marks. Mind the word order each one triggers.",
      },
      {
        type: "table",
        headers: ["Connector", "Meaning", "Word order after it"],
        rows: [
          ["und / aber / oder / denn", "and / but / or / because", "normal (verb stays position 2)"],
          ["deshalb / deswegen", "therefore", "inversion (verb before subject)"],
          ["trotzdem", "nevertheless", "inversion"],
          ["außerdem", "besides / also", "inversion"],
          ["weil / da", "because", "verb to the end"],
          ["obwohl", "although", "verb to the end"],
          ["wenn", "if / when", "verb to the end"],
          ["dass", "that", "verb to the end"],
        ],
      },
      {
        type: "examples",
        items: [
          { de: "Ich lerne viel, deshalb bin ich müde.", en: "I study a lot, therefore I'm tired." },
          { de: "Ich komme nicht, weil ich krank bin.", en: "I'm not coming because I'm ill." },
          { de: "Obwohl es regnet, gehe ich joggen.", en: "Although it's raining, I go jogging." },
          { de: "Es ist teuer. Trotzdem kaufe ich es.", en: "It's expensive. Nevertheless I'll buy it." },
        ],
      },
      {
        type: "rule",
        text: "Quick self-check before you hand in: every sentence has a verb in the right spot, all nouns are capitalised, and you used at least 3 different connectors. That alone clears most B1 writing thresholds.",
      },
    ],
  },
];
