// Structured grammar reference for the Grammar section.
//
// Content is organized by CEFR level (A1 → A2 → B1). Each topic is rendered
// from an ordered list of "blocks" so the view stays generic:
//   { type: "text",     text }                       → paragraph
//   { type: "rule",     text }                       → highlighted rule box
//   { type: "list",     items: [string] }            → bullet list
//   { type: "table",    headers: [string], rows: [[string]] }
//   { type: "examples", items: [{ de, en }] }        → DE/EN example pairs
//
// All examples are written for self-study and follow standard Goethe/telc
// A1–B1 usage. Add or edit topics freely; the view requires no changes.

export const GRAMMAR = [
  {
    level: "A1",
    blurb: "The foundations: pronouns, present tense, questions, articles and the first two cases.",
    topics: [
      {
        id: "a1-pronouns",
        title: "Personal Pronouns",
        summary: "The subject pronouns — who is doing the action.",
        blocks: [
          {
            type: "text",
            text: "Personal pronouns replace the subject of a sentence. German has a formal 'you' (Sie) used with strangers and in professional settings, and informal forms (du / ihr) for friends, family and children.",
          },
          {
            type: "table",
            headers: ["German", "English", "Number"],
            rows: [
              ["ich", "I", "singular"],
              ["du", "you (informal)", "singular"],
              ["er / sie / es", "he / she / it", "singular"],
              ["wir", "we", "plural"],
              ["ihr", "you (informal)", "plural"],
              ["sie", "they", "plural"],
              ["Sie", "you (formal)", "sg. & pl."],
            ],
          },
          {
            type: "rule",
            text: "Formal Sie is always capitalised, even in the middle of a sentence. It uses the same verb form as sie (they).",
          },
          {
            type: "examples",
            items: [
              { de: "Ich heiße Anna.", en: "My name is Anna." },
              { de: "Woher kommst du?", en: "Where do you come from?" },
              { de: "Sind Sie Herr Müller?", en: "Are you Mr. Müller?" },
            ],
          },
        ],
      },
      {
        id: "a1-sein",
        title: "Verb „sein\" (to be)",
        summary: "The most important irregular verb — used for identity, origin and states.",
        blocks: [
          {
            type: "text",
            text: "„sein\" is irregular and must be memorised. It links the subject to a noun, adjective or place.",
          },
          {
            type: "table",
            headers: ["Pronoun", "Form", "Example"],
            rows: [
              ["ich", "bin", "Ich bin müde."],
              ["du", "bist", "Du bist nett."],
              ["er / sie / es", "ist", "Er ist Lehrer."],
              ["wir", "sind", "Wir sind hier."],
              ["ihr", "seid", "Ihr seid jung."],
              ["sie / Sie", "sind", "Sie sind Ärztin."],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Ich bin aus Deutschland.", en: "I am from Germany." },
              { de: "Das ist meine Schwester.", en: "This is my sister." },
              { de: "Wir sind seit 2020 verheiratet.", en: "We have been married since 2020." },
            ],
          },
        ],
      },
      {
        id: "a1-haben",
        title: "Verb „haben\" (to have)",
        summary: "Possession and many fixed expressions (hunger, age …).",
        blocks: [
          {
            type: "table",
            headers: ["Pronoun", "Form", "Example"],
            rows: [
              ["ich", "habe", "Ich habe Zeit."],
              ["du", "hast", "Du hast Recht."],
              ["er / sie / es", "hat", "Sie hat ein Auto."],
              ["wir", "haben", "Wir haben Hunger."],
              ["ihr", "habt", "Ihr habt Glück."],
              ["sie / Sie", "haben", "Sie haben Kinder."],
            ],
          },
          {
            type: "rule",
            text: "German uses haben for age and physical states: Ich habe Hunger (I am hungry), Ich habe Angst (I am afraid), Ich bin 30 Jahre alt (here sein is used for age!).",
          },
          {
            type: "examples",
            items: [
              { de: "Hast du einen Stift?", en: "Do you have a pen?" },
              { de: "Wir haben heute keine Schule.", en: "We have no school today." },
            ],
          },
        ],
      },
      {
        id: "a1-present",
        title: "Present Tense (Präsens)",
        summary: "Regular verb conjugation — endings on the stem.",
        blocks: [
          {
            type: "text",
            text: "Take the infinitive (e.g. wohnen), remove -en to get the stem (wohn-), then add the personal ending. German present tense covers both English 'I live' and 'I am living'.",
          },
          {
            type: "table",
            headers: ["Pronoun", "Ending", "wohnen → wohn-"],
            rows: [
              ["ich", "-e", "wohne"],
              ["du", "-st", "wohnst"],
              ["er / sie / es", "-t", "wohnt"],
              ["wir", "-en", "wohnen"],
              ["ihr", "-t", "wohnt"],
              ["sie / Sie", "-en", "wohnen"],
            ],
          },
          {
            type: "rule",
            text: "If the stem ends in -t or -d (arbeiten, finden), add an extra -e before the ending for du/er/ihr: du arbeitest, er findet, ihr arbeitet.",
          },
          {
            type: "text",
            text: "Some strong verbs change their stem vowel in the du and er/sie/es forms: fahren → du fährst, er fährt; sprechen → du sprichst, er spricht; sehen → du siehst, er sieht.",
          },
          {
            type: "examples",
            items: [
              { de: "Ich spiele gern Fußball.", en: "I like playing football." },
              { de: "Er fährt nach Berlin.", en: "He is driving to Berlin." },
              { de: "Sprichst du Englisch?", en: "Do you speak English?" },
            ],
          },
        ],
      },
      {
        id: "a1-w-fragen",
        title: "W-Questions (W-Fragen)",
        summary: "Open questions starting with a question word.",
        blocks: [
          {
            type: "text",
            text: "W-questions ask for information. The question word comes first, then the conjugated verb in position 2, then the subject.",
          },
          {
            type: "table",
            headers: ["Word", "Meaning", "Example"],
            rows: [
              ["Wer", "Who", "Wer ist das?"],
              ["Was", "What", "Was machst du?"],
              ["Wo", "Where", "Wo wohnst du?"],
              ["Woher", "Where from", "Woher kommst du?"],
              ["Wohin", "Where to", "Wohin gehst du?"],
              ["Wann", "When", "Wann kommst du?"],
              ["Wie", "How", "Wie geht es dir?"],
              ["Warum", "Why", "Warum lernst du Deutsch?"],
              ["Wie viel(e)", "How much/many", "Wie viele Kinder hast du?"],
            ],
          },
          {
            type: "rule",
            text: "Word order: [W-Wort] + [Verb] + [Subjekt] … — Wann beginnt der Kurs?",
          },
        ],
      },
      {
        id: "a1-ja-nein",
        title: "Yes/No Questions (Ja-/Nein-Fragen)",
        summary: "Questions answered with ja, nein or doch.",
        blocks: [
          {
            type: "text",
            text: "To form a yes/no question, simply put the conjugated verb in first position, before the subject.",
          },
          {
            type: "table",
            headers: ["Statement", "Question"],
            rows: [
              ["Du kommst aus Spanien.", "Kommst du aus Spanien?"],
              ["Er hat Zeit.", "Hat er Zeit?"],
              ["Das Zimmer ist frei.", "Ist das Zimmer frei?"],
            ],
          },
          {
            type: "rule",
            text: "Answer a negative question with doch to contradict it: „Hast du keine Zeit?\" – „Doch, ich habe Zeit!\" (Yes, I do!).",
          },
          {
            type: "examples",
            items: [
              { de: "Trinkst du Kaffee? – Ja, gern.", en: "Do you drink coffee? – Yes, gladly." },
              { de: "Magst du keinen Tee? – Doch!", en: "Don't you like tea? – Yes, I do!" },
            ],
          },
        ],
      },
      {
        id: "a1-articles",
        title: "Articles & Gender (der/die/das)",
        summary: "Every noun has a gender: masculine, feminine or neuter.",
        blocks: [
          {
            type: "text",
            text: "German nouns are masculine (der), feminine (die) or neuter (das). The plural article is always die. Learn each noun together with its article.",
          },
          {
            type: "table",
            headers: ["Gender", "Definite", "Indefinite", "Example"],
            rows: [
              ["masculine", "der", "ein", "der Mann"],
              ["feminine", "die", "eine", "die Frau"],
              ["neuter", "das", "ein", "das Kind"],
              ["plural", "die", "– (keine)", "die Kinder"],
            ],
          },
          {
            type: "rule",
            text: "Helpful tendencies: words ending in -ung, -heit, -keit, -tion, -schaft are feminine; -chen and -lein are always neuter (das Mädchen).",
          },
        ],
      },
      {
        id: "a1-nominative-accusative",
        title: "Nominative & Accusative Case",
        summary: "Subject vs. direct object — the article changes for masculine.",
        blocks: [
          {
            type: "text",
            text: "The nominative is the subject (who/what does the action). The accusative is the direct object (who/what receives the action). Only the masculine article changes in the accusative.",
          },
          {
            type: "table",
            headers: ["", "Nominative", "Accusative"],
            rows: [
              ["masculine", "der / ein Mann", "den / einen Mann"],
              ["feminine", "die / eine Frau", "die / eine Frau"],
              ["neuter", "das / ein Kind", "das / ein Kind"],
              ["plural", "die Kinder", "die Kinder"],
            ],
          },
          {
            type: "rule",
            text: "Only masculine changes: der → den, ein → einen. Feminine, neuter and plural look the same in nominative and accusative.",
          },
          {
            type: "examples",
            items: [
              { de: "Der Mann liest ein Buch.", en: "The man reads a book." },
              { de: "Ich sehe den Mann.", en: "I see the man." },
              { de: "Sie kauft einen Apfel.", en: "She buys an apple." },
            ],
          },
        ],
      },
      {
        id: "a1-negation",
        title: "Negation: nicht & kein",
        summary: "Two ways to say 'not' / 'no'.",
        blocks: [
          {
            type: "text",
            text: "Use kein to negate a noun that has an indefinite article (ein) or no article. Use nicht to negate verbs, adjectives, or nouns with a definite article.",
          },
          {
            type: "table",
            headers: ["", "kein (with noun)", "nicht (everything else)"],
            rows: [
              ["positive", "Ich habe ein Auto.", "Ich komme heute."],
              ["negative", "Ich habe kein Auto.", "Ich komme heute nicht."],
            ],
          },
          {
            type: "text",
            text: "kein declines like the indefinite article ein: kein (m/n), keine (f/pl), keinen (m acc.).",
          },
          {
            type: "examples",
            items: [
              { de: "Das ist nicht mein Buch.", en: "That is not my book." },
              { de: "Ich habe keine Zeit.", en: "I have no time." },
              { de: "Er arbeitet nicht.", en: "He does not work." },
            ],
          },
        ],
      },
      {
        id: "a1-possessive",
        title: "Possessive Articles (mein, dein …)",
        summary: "Expressing ownership: my, your, his …",
        blocks: [
          {
            type: "table",
            headers: ["Pronoun", "Possessive", "Example"],
            rows: [
              ["ich", "mein", "mein Vater"],
              ["du", "dein", "deine Mutter"],
              ["er / es", "sein", "sein Auto"],
              ["sie", "ihr", "ihr Hund"],
              ["wir", "unser", "unser Haus"],
              ["ihr", "euer", "euer Lehrer"],
              ["sie / Sie", "ihr / Ihr", "ihre / Ihre Tasche"],
            ],
          },
          {
            type: "rule",
            text: "Possessives take the same endings as ein/kein: mein Vater (m), meine Mutter (f), mein Kind (n), meine Eltern (pl). In the accusative masculine: meinen Vater.",
          },
        ],
      },
      {
        id: "a1-imperative",
        title: "Imperative (Commands)",
        summary: "Telling someone to do something.",
        blocks: [
          {
            type: "table",
            headers: ["Form", "Rule", "Example (kommen)"],
            rows: [
              ["du", "stem (no ending)", "Komm!"],
              ["ihr", "stem + -t", "Kommt!"],
              ["Sie", "verb + Sie", "Kommen Sie!"],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Warte bitte!", en: "Please wait! (du)" },
              { de: "Macht die Bücher auf!", en: "Open your books! (ihr)" },
              { de: "Nehmen Sie Platz!", en: "Take a seat! (Sie)" },
            ],
          },
        ],
      },
    ],
  },

  {
    level: "A2",
    blurb: "Talking about the past, the dative case, modal verbs and your first subordinate clauses.",
    topics: [
      {
        id: "a2-dative",
        title: "Dative Case",
        summary: "The indirect object — to/for whom something is done.",
        blocks: [
          {
            type: "text",
            text: "The dative marks the indirect object (the receiver). It also follows certain verbs and prepositions. All articles change in the dative.",
          },
          {
            type: "table",
            headers: ["", "Nominative", "Dative"],
            rows: [
              ["masculine", "der / ein", "dem / einem"],
              ["feminine", "die / eine", "der / einer"],
              ["neuter", "das / ein", "dem / einem"],
              ["plural", "die", "den (+ -n on noun)"],
            ],
          },
          {
            type: "rule",
            text: "In the dative plural, add -n to the noun if it doesn't already end in -n: die Kinder → den Kindern.",
          },
          {
            type: "text",
            text: "Dative verbs (the person is in the dative): helfen, danken, gefallen, gehören, antworten, schmecken, passen.",
          },
          {
            type: "examples",
            items: [
              { de: "Ich gebe dem Kind einen Apfel.", en: "I give the child an apple." },
              { de: "Das Buch gehört meiner Schwester.", en: "The book belongs to my sister." },
              { de: "Wie geht es Ihnen?", en: "How are you? (lit. how goes it to you)" },
            ],
          },
        ],
      },
      {
        id: "a2-dative-prepositions",
        title: "Dative Prepositions",
        summary: "Prepositions that always take the dative.",
        blocks: [
          {
            type: "text",
            text: "These prepositions are always followed by the dative case. Memorise them as a set.",
          },
          {
            type: "list",
            items: [
              "aus — out of / from (Ich komme aus der Türkei.)",
              "bei — at / near (Ich bin beim Arzt.)",
              "mit — with (Ich fahre mit dem Bus.)",
              "nach — after / to (a country/city) (nach der Arbeit)",
              "seit — since / for (seit einem Jahr)",
              "von — from / of (von meinem Freund)",
              "zu — to (a person/place) (zum Bahnhof)",
              "gegenüber — opposite (gegenüber dem Park)",
            ],
          },
          {
            type: "rule",
            text: "Common contractions: bei + dem = beim, von + dem = vom, zu + dem = zum, zu + der = zur.",
          },
        ],
      },
      {
        id: "a2-perfekt",
        title: "Perfect Tense (Perfekt)",
        summary: "The everyday past tense for spoken German.",
        blocks: [
          {
            type: "text",
            text: "The Perfekt is built with a helper verb (haben or sein) in position 2 and the past participle (Partizip II) at the very end of the sentence.",
          },
          {
            type: "rule",
            text: "Structure: Subjekt + haben/sein + … + Partizip II. → Ich habe einen Film gesehen.",
          },
          {
            type: "text",
            text: "Regular participles: ge- + stem + -t (machen → gemacht). Irregular participles often end in -en and change the vowel (sehen → gesehen, trinken → getrunken).",
          },
          {
            type: "rule",
            text: "Use sein with verbs of movement (gehen, fahren, kommen) and change of state (aufstehen, einschlafen, werden). Everything else uses haben.",
          },
          {
            type: "examples",
            items: [
              { de: "Ich habe Pizza gegessen.", en: "I have eaten / ate pizza." },
              { de: "Wir sind nach Hause gegangen.", en: "We went home." },
              { de: "Sie ist um 7 Uhr aufgestanden.", en: "She got up at 7." },
            ],
          },
        ],
      },
      {
        id: "a2-praeteritum-sein-haben",
        title: "Präteritum of sein, haben & modals",
        summary: "The simple past of the most common verbs.",
        blocks: [
          {
            type: "text",
            text: "Even in speech, sein, haben and the modal verbs are normally used in the Präteritum (simple past) rather than the Perfekt.",
          },
          {
            type: "table",
            headers: ["Pronoun", "sein", "haben", "können"],
            rows: [
              ["ich", "war", "hatte", "konnte"],
              ["du", "warst", "hattest", "konntest"],
              ["er/sie/es", "war", "hatte", "konnte"],
              ["wir", "waren", "hatten", "konnten"],
              ["ihr", "wart", "hattet", "konntet"],
              ["sie/Sie", "waren", "hatten", "konnten"],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Gestern war ich krank.", en: "Yesterday I was ill." },
              { de: "Wir hatten kein Geld.", en: "We had no money." },
              { de: "Ich konnte nicht kommen.", en: "I couldn't come." },
            ],
          },
        ],
      },
      {
        id: "a2-modals",
        title: "Modal Verbs",
        summary: "können, müssen, wollen, dürfen, sollen, mögen.",
        blocks: [
          {
            type: "text",
            text: "Modal verbs express ability, necessity, permission and wishes. The modal is conjugated in position 2; the main verb goes to the end as an infinitive.",
          },
          {
            type: "table",
            headers: ["Modal", "Meaning", "ich-form"],
            rows: [
              ["können", "can / be able to", "kann"],
              ["müssen", "must / have to", "muss"],
              ["wollen", "want to", "will"],
              ["dürfen", "may / be allowed", "darf"],
              ["sollen", "should / supposed to", "soll"],
              ["mögen / möchten", "to like / would like", "mag / möchte"],
            ],
          },
          {
            type: "rule",
            text: "Sentence frame: Subjekt + Modalverb + … + Infinitiv (Ende). → Ich muss heute arbeiten.",
          },
          {
            type: "examples",
            items: [
              { de: "Kannst du mir helfen?", en: "Can you help me?" },
              { de: "Ich möchte einen Kaffee, bitte.", en: "I would like a coffee, please." },
              { de: "Hier darf man nicht rauchen.", en: "You may not smoke here." },
            ],
          },
        ],
      },
      {
        id: "a2-wechselpraepositionen",
        title: "Two-way Prepositions (Wechselpräpositionen)",
        summary: "Dative for location, accusative for direction.",
        blocks: [
          {
            type: "text",
            text: "Nine prepositions take either the dative or the accusative. Ask Wo? (where, no movement → dative) or Wohin? (where to, movement → accusative).",
          },
          {
            type: "list",
            items: [
              "in — in / into",
              "an — at / on (vertical)",
              "auf — on (horizontal)",
              "über — over / above",
              "unter — under",
              "vor — in front of",
              "hinter — behind",
              "neben — next to",
              "zwischen — between",
            ],
          },
          {
            type: "table",
            headers: ["Question", "Case", "Example"],
            rows: [
              ["Wo? (location)", "dative", "Das Buch liegt auf dem Tisch."],
              ["Wohin? (direction)", "accusative", "Ich lege das Buch auf den Tisch."],
            ],
          },
          {
            type: "rule",
            text: "Contractions: in + dem = im, in + das = ins, an + dem = am, an + das = ans.",
          },
        ],
      },
      {
        id: "a2-reflexive",
        title: "Reflexive Verbs",
        summary: "Verbs whose action reflects back on the subject.",
        blocks: [
          {
            type: "text",
            text: "Reflexive verbs use a reflexive pronoun (mich, dich, sich …) that refers back to the subject. Many are about daily routine and feelings.",
          },
          {
            type: "table",
            headers: ["Pronoun", "Reflexive (acc.)", "Example"],
            rows: [
              ["ich", "mich", "Ich freue mich."],
              ["du", "dich", "Du wäschst dich."],
              ["er/sie/es", "sich", "Er ärgert sich."],
              ["wir", "uns", "Wir treffen uns."],
              ["ihr", "euch", "Ihr setzt euch."],
              ["sie/Sie", "sich", "Sie erholen sich."],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Ich interessiere mich für Musik.", en: "I am interested in music." },
              { de: "Wir freuen uns auf den Urlaub.", en: "We are looking forward to the holiday." },
            ],
          },
        ],
      },
      {
        id: "a2-subordinate",
        title: "Subordinate Clauses (weil, dass, wenn)",
        summary: "Conjunctions that send the verb to the end.",
        blocks: [
          {
            type: "text",
            text: "Subordinating conjunctions introduce a dependent clause. The conjugated verb moves to the very end of that clause.",
          },
          {
            type: "table",
            headers: ["Conjunction", "Meaning", "Use"],
            rows: [
              ["weil", "because", "reason"],
              ["dass", "that", "reported content"],
              ["wenn", "if / when", "condition / repeated time"],
              ["als", "when (single past)", "one past event"],
              ["obwohl", "although", "contrast"],
              ["damit", "so that", "purpose"],
            ],
          },
          {
            type: "rule",
            text: "Verb to the end: Ich lerne Deutsch, weil ich in Deutschland arbeite. When the clause comes first, the main clause starts with its verb: Weil es regnet, bleibe ich zu Hause.",
          },
          {
            type: "examples",
            items: [
              { de: "Ich glaube, dass er Recht hat.", en: "I think that he is right." },
              { de: "Wenn ich Zeit habe, komme ich.", en: "If I have time, I'll come." },
            ],
          },
        ],
      },
      {
        id: "a2-comparative",
        title: "Comparative & Superlative",
        summary: "Comparing things: bigger, the biggest.",
        blocks: [
          {
            type: "table",
            headers: ["Positive", "Comparative (-er)", "Superlative (am …-sten)"],
            rows: [
              ["schnell", "schneller", "am schnellsten"],
              ["klein", "kleiner", "am kleinsten"],
              ["groß", "größer", "am größten"],
              ["gut", "besser", "am besten"],
              ["viel", "mehr", "am meisten"],
              ["gern", "lieber", "am liebsten"],
            ],
          },
          {
            type: "rule",
            text: "Use als for 'than': Ich bin größer als du. Use (genau)so … wie for 'as … as': Er ist so alt wie ich.",
          },
          {
            type: "examples",
            items: [
              { de: "Der Zug ist schneller als das Auto.", en: "The train is faster than the car." },
              { de: "Im Sommer ist es am schönsten.", en: "In summer it is the nicest." },
            ],
          },
        ],
      },
    ],
  },

  {
    level: "B1",
    blurb: "Refinement: genitive, subjunctive, passive, relative clauses and connecting your ideas.",
    topics: [
      {
        id: "b1-genitive",
        title: "Genitive Case",
        summary: "Possession and formal relationships (of …).",
        blocks: [
          {
            type: "text",
            text: "The genitive shows possession and follows certain prepositions. In everyday speech it is often replaced by von + dative, but you must recognise and use it at B1.",
          },
          {
            type: "table",
            headers: ["", "Nominative", "Genitive"],
            rows: [
              ["masculine", "der Mann", "des Mannes"],
              ["feminine", "die Frau", "der Frau"],
              ["neuter", "das Kind", "des Kindes"],
              ["plural", "die Kinder", "der Kinder"],
            ],
          },
          {
            type: "rule",
            text: "Masculine and neuter nouns add -s or -es in the genitive (des Mannes, des Autos). Genitive prepositions: wegen (because of), trotz (despite), während (during), (an)statt (instead of).",
          },
          {
            type: "examples",
            items: [
              { de: "Das ist das Auto meines Vaters.", en: "That is my father's car." },
              { de: "Während der Pause essen wir.", en: "During the break we eat." },
              { de: "Trotz des Regens gehen wir spazieren.", en: "Despite the rain we go for a walk." },
            ],
          },
        ],
      },
      {
        id: "b1-konjunktiv2",
        title: "Konjunktiv II (würde, hätte, wäre)",
        summary: "Hypotheticals, polite requests and wishes.",
        blocks: [
          {
            type: "text",
            text: "Konjunktiv II expresses unreal situations, wishes and polite requests. For most verbs, use würde + infinitive. For sein, haben and modals, use the special forms.",
          },
          {
            type: "table",
            headers: ["Verb", "Konjunktiv II", "Example"],
            rows: [
              ["sein", "wäre", "Ich wäre gern reich."],
              ["haben", "hätte", "Hätten Sie Zeit?"],
              ["können", "könnte", "Könntest du helfen?"],
              ["werden", "würde", "Ich würde gern kommen."],
            ],
          },
          {
            type: "rule",
            text: "Polite requests: Könnten Sie mir helfen? / Ich hätte gern … Unreal conditions: Wenn ich Zeit hätte, würde ich kommen.",
          },
          {
            type: "examples",
            items: [
              { de: "An deiner Stelle würde ich das nicht machen.", en: "In your place I wouldn't do that." },
              { de: "Wenn ich reich wäre, würde ich reisen.", en: "If I were rich, I would travel." },
            ],
          },
        ],
      },
      {
        id: "b1-passive",
        title: "Passive Voice (Passiv)",
        summary: "Focus on the action, not who does it.",
        blocks: [
          {
            type: "text",
            text: "The passive emphasises the action itself. It is formed with werden + Partizip II. The doer (if mentioned) is introduced with von.",
          },
          {
            type: "table",
            headers: ["Tense", "Form", "Example"],
            rows: [
              ["Präsens", "wird + Part. II", "Das Haus wird gebaut."],
              ["Präteritum", "wurde + Part. II", "Das Haus wurde gebaut."],
              ["Perfekt", "ist + Part. II + worden", "Das Haus ist gebaut worden."],
            ],
          },
          {
            type: "rule",
            text: "Active: Man repariert das Auto. → Passive: Das Auto wird repariert. The object becomes the subject.",
          },
          {
            type: "examples",
            items: [
              { de: "Hier wird nicht geraucht.", en: "Smoking is not allowed here (lit. here is not smoked)." },
              { de: "Der Brief wurde gestern geschrieben.", en: "The letter was written yesterday." },
            ],
          },
        ],
      },
      {
        id: "b1-relative",
        title: "Relative Clauses",
        summary: "Adding information with der, die, das …",
        blocks: [
          {
            type: "text",
            text: "Relative clauses describe a noun in more detail. The relative pronoun agrees in gender and number with the noun, but its case depends on its role inside the relative clause. The verb goes to the end.",
          },
          {
            type: "table",
            headers: ["", "masc.", "fem.", "neut.", "plural"],
            rows: [
              ["Nominative", "der", "die", "das", "die"],
              ["Accusative", "den", "die", "das", "die"],
              ["Dative", "dem", "der", "dem", "denen"],
              ["Genitive", "dessen", "deren", "dessen", "deren"],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Das ist der Mann, der nebenan wohnt.", en: "That's the man who lives next door." },
              { de: "Die Frau, die ich gestern traf, ist Ärztin.", en: "The woman (whom) I met yesterday is a doctor." },
              { de: "Das Buch, das du mir gabst, war toll.", en: "The book that you gave me was great." },
            ],
          },
        ],
      },
      {
        id: "b1-adjective-endings",
        title: "Adjective Endings (Declension)",
        summary: "Adjectives before a noun take endings.",
        blocks: [
          {
            type: "text",
            text: "When an adjective stands before a noun, it takes an ending that depends on the article, gender and case. After the definite article (der/die/das), the endings are simple: -e or -en.",
          },
          {
            type: "table",
            headers: ["After der/die/das", "masc.", "fem.", "neut.", "plural"],
            rows: [
              ["Nominative", "-e", "-e", "-e", "-en"],
              ["Accusative", "-en", "-e", "-e", "-en"],
              ["Dative", "-en", "-en", "-en", "-en"],
            ],
          },
          {
            type: "rule",
            text: "After ein/kein/possessives, masculine nominative is -er and neuter is -es (ein guter Mann, ein kleines Kind). With no article, the adjective itself shows the case ending (kalter Kaffee, mit gutem Wein).",
          },
          {
            type: "examples",
            items: [
              { de: "Der neue Lehrer ist nett.", en: "The new teacher is nice." },
              { de: "Ich kaufe einen roten Apfel.", en: "I buy a red apple." },
              { de: "Sie wohnt in einer kleinen Wohnung.", en: "She lives in a small flat." },
            ],
          },
        ],
      },
      {
        id: "b1-konnektoren",
        title: "Connectors (deshalb, trotzdem, obwohl)",
        summary: "Linking ideas: cause, contrast, consequence.",
        blocks: [
          {
            type: "text",
            text: "Connectors join ideas. Watch the word order: some keep normal order, some cause inversion (verb in position 2 after the connector), and subordinating ones send the verb to the end.",
          },
          {
            type: "table",
            headers: ["Connector", "Meaning", "Effect on word order"],
            rows: [
              ["deshalb / deswegen", "therefore", "verb position 2 (inversion)"],
              ["trotzdem", "nevertheless", "verb position 2 (inversion)"],
              ["dann / danach", "then / after that", "verb position 2 (inversion)"],
              ["obwohl", "although", "verb to the end (subordinate)"],
              ["weil", "because", "verb to the end (subordinate)"],
              ["denn", "because", "normal order (position 0)"],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Es regnet, deshalb bleibe ich zu Hause.", en: "It's raining, therefore I'm staying home." },
              { de: "Obwohl es regnet, gehe ich spazieren.", en: "Although it's raining, I go for a walk." },
              { de: "Ich bleibe zu Hause, denn es regnet.", en: "I'm staying home, because it's raining." },
            ],
          },
        ],
      },
      {
        id: "b1-verben-praepositionen",
        title: "Verbs with Prepositions",
        summary: "Fixed verb + preposition combinations.",
        blocks: [
          {
            type: "text",
            text: "Many verbs are tied to a fixed preposition, which determines the case. These must be learned as units.",
          },
          {
            type: "table",
            headers: ["Verb + preposition", "Case", "Meaning"],
            rows: [
              ["warten auf", "accusative", "to wait for"],
              ["sich freuen auf", "accusative", "to look forward to"],
              ["sich freuen über", "accusative", "to be glad about"],
              ["denken an", "accusative", "to think of"],
              ["teilnehmen an", "dative", "to take part in"],
              ["sich interessieren für", "accusative", "to be interested in"],
              ["träumen von", "dative", "to dream of"],
            ],
          },
          {
            type: "rule",
            text: "For things, use a da-compound: Ich warte darauf. For people, use preposition + pronoun: Ich warte auf ihn. Questions use wo(r)-: Worauf wartest du?",
          },
        ],
      },
      {
        id: "b1-futur",
        title: "Future Tense (Futur I)",
        summary: "Predictions, plans and promises.",
        blocks: [
          {
            type: "text",
            text: "Futur I is formed with werden (conjugated) + infinitive at the end. German often uses the present tense with a time word for the future, but Futur I expresses predictions and intentions.",
          },
          {
            type: "table",
            headers: ["Pronoun", "werden", "Example"],
            rows: [
              ["ich", "werde", "Ich werde studieren."],
              ["du", "wirst", "Du wirst es schaffen."],
              ["er/sie/es", "wird", "Es wird regnen."],
              ["wir", "werden", "Wir werden umziehen."],
              ["ihr", "werdet", "Ihr werdet gewinnen."],
              ["sie/Sie", "werden", "Sie werden kommen."],
            ],
          },
          {
            type: "examples",
            items: [
              { de: "Morgen wird es kälter.", en: "Tomorrow it will get colder." },
              { de: "Ich werde dir helfen.", en: "I will help you." },
            ],
          },
        ],
      },
      {
        id: "b1-infinitiv-zu",
        title: "Infinitive with zu & um … zu",
        summary: "Expressing purpose and complementing verbs.",
        blocks: [
          {
            type: "text",
            text: "Many verbs and expressions are followed by an infinitive with zu. Use um … zu to express purpose ('in order to'), when both clauses share the same subject.",
          },
          {
            type: "rule",
            text: "um … zu = damit (with same subject): Ich lerne Deutsch, um in Deutschland zu studieren. = …, damit ich in Deutschland studieren kann.",
          },
          {
            type: "examples",
            items: [
              { de: "Es ist wichtig, gesund zu essen.", en: "It is important to eat healthily." },
              { de: "Ich habe vergessen, dich anzurufen.", en: "I forgot to call you." },
              { de: "Ich gehe zum Markt, um Obst zu kaufen.", en: "I go to the market (in order) to buy fruit." },
            ],
          },
        ],
      },
      {
        id: "b1-plusquamperfekt",
        title: "Past Perfect (Plusquamperfekt)",
        summary: "An action before another past action.",
        blocks: [
          {
            type: "text",
            text: "The Plusquamperfekt describes an event that happened before another past event. It is formed with hatte / war (Präteritum of haben/sein) + Partizip II. It often pairs with nachdem.",
          },
          {
            type: "rule",
            text: "Sequence: Nachdem ich gegessen hatte, ging ich schlafen. (After I had eaten, I went to sleep.) The earlier action uses Plusquamperfekt; the later one uses Präteritum/Perfekt.",
          },
          {
            type: "examples",
            items: [
              { de: "Der Zug war schon abgefahren, als ich ankam.", en: "The train had already left when I arrived." },
              { de: "Nachdem wir gegessen hatten, gingen wir spazieren.", en: "After we had eaten, we went for a walk." },
            ],
          },
        ],
      },
    ],
  },
];
