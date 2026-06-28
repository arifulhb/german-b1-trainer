import { useState, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const THEMATIC_GROUPS = {
  "1.1 Abkürzungen": [
    { de: "das Abo", en: "subscription" },
    { de: "der Akku", en: "battery / accumulator" },
    { de: "der Azubi (D)", en: "trainee / apprentice" },
    { de: "die DVD", en: "DVD (data carrier)" },
    { de: "das EG / OG / UG", en: "ground / upper / lower floor" },
    { de: "der ICE", en: "InterCity Express (fast train)" },
    { de: "das Kfz", en: "motor vehicle" },
    { de: "der Lkw", en: "lorry / truck" },
    { de: "der PC", en: "personal computer" },
    { de: "der Pkw", en: "car / passenger vehicle" },
    { de: "die SMS", en: "text message" },
    { de: "das WC", en: "toilet / water closet" },
    { de: "die WG", en: "flat share / shared flat" },
    { de: "usw.", en: "etc. / and so on" },
    { de: "z. B.", en: "e.g. / for example" },
    { de: "d. h.", en: "i.e. / that is" },
    { de: "ca.", en: "approximately / circa" },
    { de: "bzw.", en: "or / respectively" },
  ],
  "1.2 Anglizismen": [
    { de: "das Baby", en: "baby" },
    { de: "der Blog", en: "blog" },
    { de: "bloggen", en: "to blog" },
    { de: "chatten", en: "to chat (online)" },
    { de: "checken", en: "to check" },
    { de: "der Computer", en: "computer" },
    { de: "das E-Bike", en: "e-bike / electric bicycle" },
    { de: "das E-Book", en: "e-book" },
    { de: "faxen", en: "to fax" },
    { de: "das Festival", en: "festival" },
    { de: "googeln", en: "to google" },
    { de: "das Internet", en: "internet" },
    { de: "der Job", en: "job" },
    { de: "jobben", en: "to work (casually)" },
    { de: "joggen", en: "to jog" },
    { de: "der Laptop", en: "laptop" },
    { de: "mailen", en: "to email" },
    { de: "das Smartphone", en: "smartphone" },
    { de: "surfen", en: "to surf / browse" },
    { de: "das Team", en: "team" },
    { de: "der Trend", en: "trend" },
    { de: "der User / die Userin", en: "user" },
    { de: "online", en: "online" },
    { de: "live", en: "live" },
    { de: "global", en: "global" },
    { de: "cool", en: "cool" },
  ],
  "1.4 Bildungseinrichtungen": [
    { de: "die Krippe", en: "crèche / nursery" },
    { de: "der Kindergarten", en: "kindergarten" },
    { de: "die Grundschule", en: "primary school" },
    { de: "die Realschule", en: "secondary school (middle track)" },
    { de: "das Gymnasium", en: "grammar school / high school" },
    { de: "die Berufsschule", en: "vocational school" },
    { de: "die Hochschule", en: "university / college" },
    { de: "die Universität (Uni)", en: "university" },
    { de: "die Volkshochschule", en: "adult education centre" },
  ],
  "1.5 Schulfächer": [
    { de: "Biologie", en: "Biology" },
    { de: "Chemie", en: "Chemistry" },
    { de: "Geografie", en: "Geography" },
    { de: "Geschichte", en: "History" },
    { de: "Mathematik (Mathe)", en: "Mathematics (Maths)" },
    { de: "Musik", en: "Music" },
    { de: "Philosophie", en: "Philosophy" },
    { de: "Physik", en: "Physics" },
    { de: "Sport", en: "PE / Sport" },
  ],
  "1.7 Farben": [
    { de: "blau", en: "blue" },
    { de: "braun", en: "brown" },
    { de: "gelb", en: "yellow" },
    { de: "grau", en: "grey" },
    { de: "grün", en: "green" },
    { de: "lila", en: "purple / lilac" },
    { de: "orange", en: "orange" },
    { de: "rosa", en: "pink / rose" },
    { de: "rot", en: "red" },
    { de: "schwarz", en: "black" },
    { de: "violett", en: "violet" },
    { de: "weiß", en: "white" },
    { de: "hell-", en: "light- (e.g. hellblau)" },
    { de: "dunkel-", en: "dark- (e.g. dunkelblau)" },
  ],
  "1.8 Himmelsrichtungen": [
    { de: "der Norden / nördlich", en: "north / northern" },
    { de: "der Osten / östlich", en: "east / eastern" },
    { de: "der Süden / südlich", en: "south / southern" },
    { de: "der Westen / westlich", en: "west / western" },
  ],
  "1.10 Politische Begriffe": [
    { de: "der Bundeskanzler/-in", en: "Federal Chancellor" },
    { de: "der Bundespräsident/-in", en: "Federal President" },
    { de: "der Bürgermeister/-in", en: "mayor" },
    { de: "die Demokratie", en: "democracy" },
    { de: "demokratisch", en: "democratic" },
    { de: "die Europäische Union (EU)", en: "European Union" },
    { de: "konservativ", en: "conservative" },
    { de: "liberal", en: "liberal" },
    { de: "der Minister/-in", en: "minister" },
    { de: "das Parlament", en: "parliament" },
    { de: "die Partei", en: "political party" },
    { de: "die Regierung", en: "government" },
    { de: "der Staat", en: "state / country" },
    { de: "staatlich", en: "state-owned / governmental" },
    { de: "die Gemeinde", en: "municipality / community" },
  ],
  "1.11 Tiere": [
    { de: "der Affe", en: "monkey / ape" },
    { de: "der Bär", en: "bear" },
    { de: "die Biene", en: "bee" },
    { de: "der Elefant", en: "elephant" },
    { de: "die Ente", en: "duck" },
    { de: "der Fisch", en: "fish" },
    { de: "die Fliege", en: "fly" },
    { de: "die Giraffe", en: "giraffe" },
    { de: "der Hase", en: "hare / rabbit" },
    { de: "der Hund", en: "dog" },
    { de: "das Insekt", en: "insect" },
    { de: "die Katze", en: "cat" },
    { de: "das Krokodil", en: "crocodile" },
    { de: "die Kuh", en: "cow" },
    { de: "der Löwe", en: "lion" },
    { de: "die Maus", en: "mouse" },
    { de: "die Mücke", en: "mosquito / gnat" },
    { de: "das Pferd", en: "horse" },
    { de: "der Pinguin", en: "penguin" },
    { de: "das Schaf", en: "sheep" },
    { de: "die Schildkröte", en: "tortoise / turtle" },
    { de: "die Schlange", en: "snake" },
    { de: "das Schwein", en: "pig" },
    { de: "der Vogel", en: "bird" },
  ],
  "1.12 Währungen / Maße / Gewichte": [
    { de: "der Euro (€)", en: "euro" },
    { de: "der Cent (c)", en: "cent" },
    { de: "der Franken (sFr.)", en: "Swiss franc" },
    { de: "der Meter (m)", en: "metre" },
    { de: "der Zentimeter (cm)", en: "centimetre" },
    { de: "der Kilometer (km)", en: "kilometre" },
    { de: "der Quadratmeter (m²)", en: "square metre" },
    { de: "das Gramm (g)", en: "gram" },
    { de: "das Kilo(gramm) (kg)", en: "kilogram" },
    { de: "das Pfund (500g)", en: "pound (500g)" },
    { de: "der Liter (l)", en: "litre" },
    { de: "das Prozent (%)", en: "percent" },
    { de: "der Grad (°C)", en: "degree Celsius" },
  ],
  "1.13 Zahlen / Bruchzahlen": [
    { de: "eins, zwei, drei ... zehn", en: "one, two, three ... ten" },
    { de: "elf, zwölf", en: "eleven, twelve" },
    { de: "dreizehn ... zwanzig", en: "thirteen ... twenty" },
    { de: "dreißig, vierzig ... neunzig", en: "thirty, forty ... ninety" },
    { de: "hundert, tausend", en: "hundred, thousand" },
    { de: "eine Million", en: "one million" },
    { de: "eine Milliarde", en: "one billion" },
    { de: "der/die/das erste", en: "the first" },
    { de: "einmal / zweimal / dreimal", en: "once / twice / three times" },
    { de: "einfach / doppelt", en: "single / double" },
    { de: "½ = ein halb", en: "a half" },
    { de: "⅓ = ein Drittel", en: "a third" },
    { de: "¼ = ein Viertel", en: "a quarter" },
  ],
  "1.14 Zeit — Tageszeiten": [
    { de: "der Morgen", en: "morning" },
    { de: "der Vormittag", en: "late morning / before noon" },
    { de: "der Mittag", en: "midday / noon" },
    { de: "der Nachmittag", en: "afternoon" },
    { de: "der Abend", en: "evening" },
    { de: "die Nacht", en: "night" },
    { de: "die Mitternacht", en: "midnight" },
    { de: "morgens", en: "in the morning" },
    { de: "mittags", en: "at midday" },
    { de: "abends", en: "in the evening" },
    { de: "nachts", en: "at night" },
    { de: "tagsüber", en: "during the day" },
  ],
  "1.14 Zeit — Wochentage": [
    { de: "der Montag", en: "Monday" },
    { de: "der Dienstag", en: "Tuesday" },
    { de: "der Mittwoch", en: "Wednesday" },
    { de: "der Donnerstag", en: "Thursday" },
    { de: "der Freitag", en: "Friday" },
    { de: "der Samstag", en: "Saturday" },
    { de: "der Sonntag", en: "Sunday" },
    { de: "das Wochenende", en: "weekend" },
    { de: "der Wochentag", en: "weekday" },
    { de: "wochentags / werktags", en: "on weekdays" },
  ],
  "1.14 Zeit — Monate": [
    { de: "der Januar", en: "January" },
    { de: "der Februar", en: "February" },
    { de: "der März", en: "March" },
    { de: "der April", en: "April" },
    { de: "der Mai", en: "May" },
    { de: "der Juni", en: "June" },
    { de: "der Juli", en: "July" },
    { de: "der August", en: "August" },
    { de: "der September", en: "September" },
    { de: "der Oktober", en: "October" },
    { de: "der November", en: "November" },
    { de: "der Dezember", en: "December" },
  ],
  "1.14 Zeit — Jahreszeiten / Zeitangaben": [
    { de: "der Frühling / das Frühjahr", en: "spring" },
    { de: "der Sommer", en: "summer" },
    { de: "der Herbst", en: "autumn" },
    { de: "der Winter", en: "winter" },
    { de: "die Sekunde", en: "second" },
    { de: "die Minute", en: "minute" },
    { de: "die Stunde", en: "hour" },
    { de: "die Woche", en: "week" },
    { de: "der Monat", en: "month" },
    { de: "das Jahr", en: "year" },
    { de: "das Jahrzehnt", en: "decade" },
    { de: "das Jahrhundert", en: "century" },
    { de: "stündlich / täglich / wöchentlich / monatlich / jährlich", en: "hourly / daily / weekly / monthly / yearly" },
  ],
};

const VERBS = [
  { inf: "abbiegen", aux: "ist", part: "abgebogen", en: "to turn off (road)" },
  { inf: "abfahren", aux: "ist", part: "abgefahren", en: "to depart / leave" },
  { inf: "abgeben", aux: "hat", part: "abgegeben", en: "to hand in / deliver" },
  { inf: "abhängen (von)", aux: "hat", part: "abgehangen", en: "to depend (on)" },
  { inf: "abheben", aux: "hat", part: "abgehoben", en: "to withdraw (money)" },
  { inf: "abholen", aux: "hat", part: "abgeholt", en: "to pick up / collect" },
  { inf: "ablehnen", aux: "hat", part: "abgelehnt", en: "to reject / decline" },
  { inf: "abmachen", aux: "hat", part: "abgemacht", en: "to arrange / agree" },
  { inf: "abnehmen", aux: "hat", part: "abgenommen", en: "to lose weight / remove" },
  { inf: "abonnieren", aux: "hat", part: "abonniert", en: "to subscribe" },
  { inf: "absagen", aux: "hat", part: "abgesagt", en: "to cancel" },
  { inf: "abstimmen", aux: "hat", part: "abgestimmt", en: "to vote" },
  { inf: "abwaschen", aux: "hat", part: "abgewaschen", en: "to wash up / wash off" },
  { inf: "achten (auf)", aux: "hat", part: "geachtet", en: "to pay attention (to)" },
  { inf: "akzeptieren", aux: "hat", part: "akzeptiert", en: "to accept" },
  { inf: "analysieren", aux: "hat", part: "analysiert", en: "to analyse" },
  { inf: "ändern", aux: "hat", part: "geändert", en: "to change / alter" },
  { inf: "anbieten", aux: "hat", part: "angeboten", en: "to offer" },
  { inf: "ankommen", aux: "ist", part: "angekommen", en: "to arrive" },
  { inf: "anmelden", aux: "hat", part: "angemeldet", en: "to register" },
  { inf: "annehmen", aux: "hat", part: "angenommen", en: "to accept / assume" },
  { inf: "anrufen", aux: "hat", part: "angerufen", en: "to phone / call" },
  { inf: "anfangen", aux: "hat", part: "angefangen", en: "to begin / start" },
  { inf: "antworten", aux: "hat", part: "geantwortet", en: "to answer / reply" },
  { inf: "arbeiten", aux: "hat", part: "gearbeitet", en: "to work" },
  { inf: "ärgern", aux: "hat", part: "geärgert", en: "to annoy / get annoyed" },
  { inf: "atmen", aux: "hat", part: "geatmet", en: "to breathe" },
  { inf: "auffordern", aux: "hat", part: "aufgefordert", en: "to urge / request" },
  { inf: "aufgeben", aux: "hat", part: "aufgegeben", en: "to give up / post (letter)" },
  { inf: "aufhören", aux: "hat", part: "aufgehört", en: "to stop / cease" },
  { inf: "ausfüllen", aux: "hat", part: "ausgefüllt", en: "to fill in (a form)" },
  { inf: "ausgeben", aux: "hat", part: "ausgegeben", en: "to spend (money)" },
  { inf: "ausruhen", aux: "hat", part: "ausgeruht", en: "to rest" },
  { inf: "backen", aux: "hat", part: "gebacken", en: "to bake" },
  { inf: "baden", aux: "hat", part: "gebadet", en: "to bathe / have a bath" },
  { inf: "basteln", aux: "hat", part: "gebastelt", en: "to do crafts / tinker" },
  { inf: "bauen", aux: "hat", part: "gebaut", en: "to build / construct" },
  { inf: "beachten", aux: "hat", part: "beachtet", en: "to pay attention to / observe" },
  { inf: "bedeuten", aux: "hat", part: "bedeutet", en: "to mean / signify" },
  { inf: "begleiten", aux: "hat", part: "begleitet", en: "to accompany" },
  { inf: "behandeln", aux: "hat", part: "behandelt", en: "to treat / deal with" },
  { inf: "behaupten", aux: "hat", part: "behauptet", en: "to claim / assert" },
  { inf: "behindern", aux: "hat", part: "behindert", en: "to obstruct / hinder" },
  { inf: "bekommen", aux: "hat", part: "bekommen", en: "to receive / get" },
  { inf: "beleidigen", aux: "hat", part: "beleidigt", en: "to insult / offend" },
  { inf: "bemerken", aux: "hat", part: "bemerkt", en: "to notice" },
  { inf: "benutzen", aux: "hat", part: "benutzt", en: "to use" },
  { inf: "berichten", aux: "hat", part: "berichtet", en: "to report" },
  { inf: "beruhigen", aux: "hat", part: "beruhigt", en: "to calm (down)" },
  { inf: "beschreiben", aux: "hat", part: "beschrieben", en: "to describe" },
  { inf: "beschweren", aux: "hat", part: "beschwert", en: "to complain" },
  { inf: "besuchen", aux: "hat", part: "besucht", en: "to visit" },
  { inf: "bieten", aux: "hat", part: "geboten", en: "to offer / provide" },
  { inf: "bitten", aux: "hat", part: "gebeten", en: "to ask / request" },
  { inf: "bleiben", aux: "ist", part: "geblieben", en: "to stay / remain" },
  { inf: "braten", aux: "hat", part: "gebraten", en: "to fry / roast" },
  { inf: "brauchen", aux: "hat", part: "gebraucht", en: "to need" },
  { inf: "brechen", aux: "hat", part: "gebrochen", en: "to break" },
  { inf: "bremsen", aux: "hat", part: "gebremst", en: "to brake" },
  { inf: "brennen", aux: "hat", part: "gebrannt", en: "to burn" },
  { inf: "bringen", aux: "hat", part: "gebracht", en: "to bring" },
  { inf: "buchen", aux: "hat", part: "gebucht", en: "to book" },
  { inf: "buchstabieren", aux: "hat", part: "buchstabiert", en: "to spell out" },
  { inf: "danken", aux: "hat", part: "gedankt", en: "to thank" },
  { inf: "dauern", aux: "hat", part: "gedauert", en: "to last / take (time)" },
  { inf: "denken", aux: "hat", part: "gedacht", en: "to think" },
  { inf: "diskutieren", aux: "hat", part: "diskutiert", en: "to discuss" },
  { inf: "drehen", aux: "hat", part: "gedreht", en: "to turn / rotate" },
  { inf: "drucken", aux: "hat", part: "gedruckt", en: "to print" },
  { inf: "dürfen", aux: "hat", part: "gedurft", en: "to be allowed to (modal)" },
  { inf: "einrichten", aux: "hat", part: "eingerichtet", en: "to furnish / set up" },
  { inf: "einschalten", aux: "hat", part: "eingeschaltet", en: "to switch on" },
  { inf: "entwickeln", aux: "hat", part: "entwickelt", en: "to develop" },
  { inf: "erinnern", aux: "hat", part: "erinnert", en: "to remind / remember" },
  { inf: "erleichtern", aux: "hat", part: "erleichtert", en: "to make easier / relieve" },
  { inf: "erwarten", aux: "hat", part: "erwartet", en: "to expect" },
  { inf: "essen", aux: "hat", part: "gegessen", en: "to eat" },
  { inf: "fahren", aux: "hat/ist", part: "gefahren", en: "to drive / travel" },
  { inf: "fallen", aux: "ist", part: "gefallen", en: "to fall" },
  { inf: "fangen", aux: "hat", part: "gefangen", en: "to catch" },
  { inf: "faulenzen", aux: "hat", part: "gefaulenzt", en: "to laze around" },
  { inf: "feiern", aux: "hat", part: "gefeiert", en: "to celebrate" },
  { inf: "finden", aux: "hat", part: "gefunden", en: "to find" },
  { inf: "fliegen", aux: "ist", part: "geflogen", en: "to fly" },
  { inf: "fliehen", aux: "ist", part: "geflohen", en: "to flee" },
  { inf: "fließen", aux: "ist", part: "geflossen", en: "to flow" },
  { inf: "folgen", aux: "ist", part: "gefolgt", en: "to follow" },
  { inf: "fotografieren", aux: "hat", part: "fotografiert", en: "to photograph" },
  { inf: "fragen", aux: "hat", part: "gefragt", en: "to ask" },
  { inf: "fressen", aux: "hat", part: "gefressen", en: "to eat (animals)" },
  { inf: "frieren", aux: "hat", part: "gefroren", en: "to freeze / be cold" },
  { inf: "führen", aux: "hat", part: "geführt", en: "to lead / guide" },
  { inf: "funktionieren", aux: "hat", part: "funktioniert", en: "to work / function" },
  { inf: "fühlen", aux: "hat", part: "gefühlt", en: "to feel" },
  { inf: "geben", aux: "hat", part: "gegeben", en: "to give" },
  { inf: "gehen", aux: "ist", part: "gegangen", en: "to go / walk" },
  { inf: "gelingen", aux: "ist", part: "gelungen", en: "to succeed" },
  { inf: "gelten", aux: "hat", part: "gegolten", en: "to be valid / apply" },
  { inf: "genießen", aux: "hat", part: "genossen", en: "to enjoy" },
  { inf: "geschehen", aux: "ist", part: "geschehen", en: "to happen" },
  { inf: "gewinnen", aux: "hat", part: "gewonnen", en: "to win" },
  { inf: "gewöhnen", aux: "hat", part: "gewöhnt", en: "to get used to" },
  { inf: "glauben", aux: "hat", part: "geglaubt", en: "to believe" },
  { inf: "gratulieren", aux: "hat", part: "gratuliert", en: "to congratulate" },
  { inf: "greifen", aux: "hat", part: "gegriffen", en: "to grab / reach" },
  { inf: "grillen", aux: "hat", part: "gegrillt", en: "to barbecue / grill" },
  { inf: "gründen", aux: "hat", part: "gegründet", en: "to found / establish" },
  { inf: "grüßen", aux: "hat", part: "gegrüßt", en: "to greet" },
  { inf: "haben", aux: "hat", part: "gehabt", en: "to have" },
  { inf: "halten", aux: "hat", part: "gehalten", en: "to hold / stop" },
  { inf: "handeln", aux: "hat", part: "gehandelt", en: "to act / trade / deal" },
  { inf: "hassen", aux: "hat", part: "gehasst", en: "to hate" },
  { inf: "heben", aux: "hat", part: "gehoben", en: "to lift" },
  { inf: "heiraten", aux: "hat", part: "geheiratet", en: "to marry" },
  { inf: "heizen", aux: "hat", part: "geheizt", en: "to heat" },
  { inf: "heißen", aux: "hat", part: "geheißen", en: "to be called" },
  { inf: "helfen", aux: "hat", part: "geholfen", en: "to help" },
  { inf: "hoffen", aux: "hat", part: "gehofft", en: "to hope" },
  { inf: "holen", aux: "hat", part: "geholt", en: "to fetch / get" },
  { inf: "hören", aux: "hat", part: "gehört", en: "to hear / listen" },
  { inf: "informieren", aux: "hat", part: "informiert", en: "to inform" },
  { inf: "installieren", aux: "hat", part: "installiert", en: "to install" },
  { inf: "integrieren", aux: "hat", part: "integriert", en: "to integrate" },
  { inf: "interessieren", aux: "hat", part: "interessiert", en: "to interest" },
  { inf: "kämpfen", aux: "hat", part: "gekämpft", en: "to fight" },
  { inf: "kennen", aux: "hat", part: "gekannt", en: "to know (a person/place)" },
  { inf: "klagen", aux: "hat", part: "geklagt", en: "to complain / sue" },
  { inf: "klappen", aux: "hat", part: "geklappt", en: "to work out / go well" },
  { inf: "klären", aux: "hat", part: "geklärt", en: "to clarify" },
  { inf: "kleben", aux: "hat", part: "geklebt", en: "to stick / glue" },
  { inf: "klettern", aux: "ist", part: "geklettert", en: "to climb" },
  { inf: "klingeln", aux: "hat", part: "geklingelt", en: "to ring (doorbell/phone)" },
  { inf: "klopfen", aux: "hat", part: "geklopft", en: "to knock" },
  { inf: "kochen", aux: "hat", part: "gekocht", en: "to cook" },
  { inf: "kommen", aux: "ist", part: "gekommen", en: "to come" },
  { inf: "können", aux: "hat", part: "gekonnt", en: "can / to be able to (modal)" },
  { inf: "konsumieren", aux: "hat", part: "konsumiert", en: "to consume" },
  { inf: "kontrollieren", aux: "hat", part: "kontrolliert", en: "to check / control" },
  { inf: "korrigieren", aux: "hat", part: "korrigiert", en: "to correct" },
  { inf: "kosten", aux: "hat", part: "gekostet", en: "to cost" },
  { inf: "kriegen", aux: "hat", part: "gekriegt", en: "to get (colloquial)" },
  { inf: "kritisieren", aux: "hat", part: "kritisiert", en: "to criticise" },
  { inf: "kündigen", aux: "hat", part: "gekündigt", en: "to resign / terminate" },
  { inf: "küssen", aux: "hat", part: "geküsst", en: "to kiss" },
  { inf: "lachen", aux: "hat", part: "gelacht", en: "to laugh" },
  { inf: "landen", aux: "ist", part: "gelandet", en: "to land" },
  { inf: "lassen", aux: "hat", part: "gelassen", en: "to let / leave" },
  { inf: "laufen", aux: "ist", part: "gelaufen", en: "to run / walk" },
  { inf: "leben", aux: "hat", part: "gelebt", en: "to live" },
  { inf: "legen", aux: "hat", part: "gelegt", en: "to lay / put (flat)" },
  { inf: "leiden", aux: "hat", part: "gelitten", en: "to suffer" },
  { inf: "leihen", aux: "hat", part: "geliehen", en: "to lend / borrow" },
  { inf: "lernen", aux: "hat", part: "gelernt", en: "to learn" },
  { inf: "lesen", aux: "hat", part: "gelesen", en: "to read" },
  { inf: "lieben", aux: "hat", part: "geliebt", en: "to love" },
  { inf: "liefern", aux: "hat", part: "geliefert", en: "to deliver" },
  { inf: "liegen", aux: "ist", part: "gelegen", en: "to lie / be located" },
  { inf: "loben", aux: "hat", part: "gelobt", en: "to praise" },
  { inf: "löschen", aux: "hat", part: "gelöscht", en: "to delete / extinguish" },
  { inf: "lösen", aux: "hat", part: "gelöst", en: "to solve / release" },
  { inf: "lügen", aux: "hat", part: "gelogen", en: "to lie (untruth)" },
  { inf: "machen", aux: "hat", part: "gemacht", en: "to make / do" },
  { inf: "malen", aux: "hat", part: "gemalt", en: "to paint / draw" },
  { inf: "markieren", aux: "hat", part: "markiert", en: "to mark / highlight" },
  { inf: "meinen", aux: "hat", part: "gemeint", en: "to mean / think" },
  { inf: "melden", aux: "hat", part: "gemeldet", en: "to report / register" },
  { inf: "merken", aux: "hat", part: "gemerkt", en: "to notice / memorise" },
  { inf: "messen", aux: "hat", part: "gemessen", en: "to measure" },
  { inf: "mieten", aux: "hat", part: "gemietet", en: "to rent" },
  { inf: "mögen", aux: "hat", part: "gemocht", en: "to like (modal)" },
  { inf: "müssen", aux: "hat", part: "gemusst", en: "must / to have to (modal)" },
  { inf: "nähen", aux: "hat", part: "genäht", en: "to sew" },
  { inf: "nehmen", aux: "hat", part: "genommen", en: "to take" },
  { inf: "nennen", aux: "hat", part: "genannt", en: "to name / call" },
  { inf: "nutzen", aux: "hat", part: "genutzt", en: "to use / utilise" },
  { inf: "öffnen", aux: "hat", part: "geöffnet", en: "to open" },
  { inf: "operieren", aux: "hat", part: "operiert", en: "to operate (medical)" },
  { inf: "ordnen", aux: "hat", part: "geordnet", en: "to organise / sort" },
  { inf: "organisieren", aux: "hat", part: "organisiert", en: "to organise" },
  { inf: "packen", aux: "hat", part: "gepackt", en: "to pack" },
  { inf: "parken", aux: "hat", part: "geparkt", en: "to park" },
  { inf: "passen", aux: "hat", part: "gepasst", en: "to fit / suit" },
  { inf: "passieren", aux: "ist", part: "passiert", en: "to happen / pass" },
  { inf: "pflanzen", aux: "hat", part: "gepflanzt", en: "to plant" },
  { inf: "pflegen", aux: "hat", part: "gepflegt", en: "to care for / maintain" },
  { inf: "planen", aux: "hat", part: "geplant", en: "to plan" },
  { inf: "probieren", aux: "hat", part: "probiert", en: "to try / taste" },
  { inf: "produzieren", aux: "hat", part: "produziert", en: "to produce" },
  { inf: "protestieren", aux: "hat", part: "protestiert", en: "to protest" },
  { inf: "prüfen", aux: "hat", part: "geprüft", en: "to check / test" },
  { inf: "putzen", aux: "hat", part: "geputzt", en: "to clean" },
  { inf: "raten", aux: "hat", part: "geraten", en: "to advise / guess" },
  { inf: "rauchen", aux: "hat", part: "geraucht", en: "to smoke" },
  { inf: "reagieren", aux: "hat", part: "reagiert", en: "to react" },
  { inf: "rechnen", aux: "hat", part: "gerechnet", en: "to calculate" },
  { inf: "reden", aux: "hat", part: "geredet", en: "to talk / speak" },
  { inf: "reduzieren", aux: "hat", part: "reduziert", en: "to reduce" },
  { inf: "regeln", aux: "hat", part: "geregelt", en: "to regulate / sort out" },
  { inf: "regnen", aux: "hat", part: "geregnet", en: "to rain" },
  { inf: "reichen", aux: "hat", part: "gereicht", en: "to suffice / hand over" },
  { inf: "reinigen", aux: "hat", part: "gereinigt", en: "to clean" },
  { inf: "reisen", aux: "ist", part: "gereist", en: "to travel" },
  { inf: "reiten", aux: "ist", part: "geritten", en: "to ride (horse)" },
  { inf: "rennen", aux: "ist", part: "gerannt", en: "to run" },
  { inf: "reparieren", aux: "hat", part: "repariert", en: "to repair" },
  { inf: "reservieren", aux: "hat", part: "reserviert", en: "to reserve" },
  { inf: "retten", aux: "hat", part: "gerettet", en: "to rescue / save" },
  { inf: "riechen", aux: "hat", part: "gerochen", en: "to smell" },
  { inf: "rufen", aux: "hat", part: "gerufen", en: "to call / shout" },
  { inf: "sagen", aux: "hat", part: "gesagt", en: "to say / tell" },
  { inf: "sammeln", aux: "hat", part: "gesammelt", en: "to collect" },
  { inf: "schaffen", aux: "hat", part: "geschafft", en: "to manage / accomplish" },
  { inf: "schauen", aux: "hat", part: "geschaut", en: "to look / watch" },
  { inf: "scheinen", aux: "hat", part: "geschienen", en: "to seem / shine" },
  { inf: "schenken", aux: "hat", part: "geschenkt", en: "to give (as a gift)" },
  { inf: "schicken", aux: "hat", part: "geschickt", en: "to send" },
  { inf: "schlafen", aux: "hat", part: "geschlafen", en: "to sleep" },
  { inf: "schlagen", aux: "hat", part: "geschlagen", en: "to hit / beat" },
  { inf: "schließen", aux: "hat", part: "geschlossen", en: "to close" },
  { inf: "schmecken", aux: "hat", part: "geschmeckt", en: "to taste" },
  { inf: "schreiben", aux: "hat", part: "geschrieben", en: "to write" },
  { inf: "schreien", aux: "hat", part: "geschrien", en: "to shout / scream" },
  { inf: "schweigen", aux: "hat", part: "geschwiegen", en: "to be silent" },
  { inf: "schwimmen", aux: "ist", part: "geschwommen", en: "to swim" },
  { inf: "sehen", aux: "hat", part: "gesehen", en: "to see" },
  { inf: "sein", aux: "ist", part: "gewesen", en: "to be" },
  { inf: "senden", aux: "hat", part: "gesendet", en: "to send / broadcast" },
  { inf: "singen", aux: "hat", part: "gesungen", en: "to sing" },
  { inf: "sinken", aux: "ist", part: "gesunken", en: "to sink / fall (prices)" },
  { inf: "sitzen", aux: "ist", part: "gesessen", en: "to sit" },
  { inf: "sorgen (für)", aux: "hat", part: "gesorgt", en: "to take care (of)" },
  { inf: "sparen", aux: "hat", part: "gespart", en: "to save (money)" },
  { inf: "spielen", aux: "hat", part: "gespielt", en: "to play" },
  { inf: "sprechen", aux: "hat", part: "gesprochen", en: "to speak" },
  { inf: "springen", aux: "ist", part: "gesprungen", en: "to jump" },
  { inf: "stehen", aux: "ist", part: "gestanden", en: "to stand" },
  { inf: "stehlen", aux: "hat", part: "gestohlen", en: "to steal" },
  { inf: "steigen", aux: "ist", part: "gestiegen", en: "to climb / rise" },
  { inf: "stellen", aux: "hat", part: "gestellt", en: "to place (upright)" },
  { inf: "sterben", aux: "ist", part: "gestorben", en: "to die" },
  { inf: "stimmen", aux: "hat", part: "gestimmt", en: "to be correct / vote" },
  { inf: "stoppen", aux: "hat", part: "gestoppt", en: "to stop" },
  { inf: "stören", aux: "hat", part: "gestört", en: "to disturb" },
  { inf: "streiken", aux: "hat", part: "gestreikt", en: "to strike" },
  { inf: "studieren", aux: "hat", part: "studiert", en: "to study (at university)" },
  { inf: "stürzen", aux: "ist", part: "gestürzt", en: "to fall / crash" },
  { inf: "suchen", aux: "hat", part: "gesucht", en: "to look for / search" },
  { inf: "tanken", aux: "hat", part: "getankt", en: "to refuel" },
  { inf: "tanzen", aux: "hat", part: "getanzt", en: "to dance" },
  { inf: "tauschen", aux: "hat", part: "getauscht", en: "to swap / exchange" },
  { inf: "teilen", aux: "hat", part: "geteilt", en: "to share / divide" },
  { inf: "telefonieren", aux: "hat", part: "telefoniert", en: "to phone / talk on phone" },
  { inf: "tragen", aux: "hat", part: "getragen", en: "to carry / wear" },
  { inf: "trainieren", aux: "hat", part: "trainiert", en: "to train" },
  { inf: "treffen", aux: "hat", part: "getroffen", en: "to meet / hit" },
  { inf: "trinken", aux: "hat", part: "getrunken", en: "to drink" },
  { inf: "trocknen", aux: "ist", part: "getrocknet", en: "to dry" },
  { inf: "tun", aux: "hat", part: "getan", en: "to do" },
  { inf: "übernachten", aux: "hat", part: "übernachtet", en: "to stay overnight" },
  { inf: "überqueren", aux: "hat", part: "überquert", en: "to cross (road/river)" },
  { inf: "unterrichten", aux: "hat", part: "unterrichtet", en: "to teach" },
  { inf: "verhindern", aux: "hat", part: "verhindert", en: "to prevent" },
  { inf: "vermieten", aux: "hat", part: "vermietet", en: "to rent out" },
  { inf: "vermuten", aux: "hat", part: "vermutet", en: "to suspect / assume" },
  { inf: "versichern", aux: "hat", part: "versichert", en: "to insure / assure" },
  { inf: "verwechseln", aux: "hat", part: "verwechselt", en: "to confuse / mix up" },
  { inf: "verzichten (auf)", aux: "hat", part: "verzichtet", en: "to give up / do without" },
  { inf: "wachsen", aux: "ist", part: "gewachsen", en: "to grow" },
  { inf: "wählen", aux: "hat", part: "gewählt", en: "to choose / elect / dial" },
  { inf: "wandern", aux: "ist", part: "gewandert", en: "to hike" },
  { inf: "warnen", aux: "hat", part: "gewarnt", en: "to warn" },
  { inf: "warten", aux: "hat", part: "gewartet", en: "to wait" },
  { inf: "wechseln", aux: "hat", part: "gewechselt", en: "to change / swap" },
  { inf: "wecken", aux: "hat", part: "geweckt", en: "to wake (someone) up" },
  { inf: "weinen", aux: "hat", part: "geweint", en: "to cry" },
  { inf: "werden", aux: "ist", part: "geworden", en: "to become" },
  { inf: "werfen", aux: "hat", part: "geworfen", en: "to throw" },
  { inf: "wissen", aux: "hat", part: "gewusst", en: "to know (a fact)" },
  { inf: "wohnen", aux: "hat", part: "gewohnt", en: "to live / reside" },
  { inf: "wollen", aux: "hat", part: "gewollt", en: "to want (modal)" },
  { inf: "zahlen", aux: "hat", part: "gezahlt", en: "to pay" },
  { inf: "zählen", aux: "hat", part: "gezählt", en: "to count" },
  { inf: "zeichnen", aux: "hat", part: "gezeichnet", en: "to draw" },
  { inf: "zeigen", aux: "hat", part: "gezeigt", en: "to show" },
  { inf: "zelten", aux: "hat", part: "gezeltet", en: "to camp (in a tent)" },
  { inf: "ziehen", aux: "ist", part: "gezogen", en: "to move / pull" },
  { inf: "zweifeln", aux: "hat", part: "gezweifelt", en: "to doubt" },
];

const VERB_CHUNKS = [];
const CHUNK_SIZE = 20;
for (let i = 0; i < VERBS.length; i += CHUNK_SIZE) {
  VERB_CHUNKS.push(VERBS.slice(i, i + CHUNK_SIZE));
}

const THEMATIC_KEYS = Object.keys(THEMATIC_GROUPS);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Badge({ children, color = "blue" }) {
  const colors = {
    blue: "background:#1a3a5c;color:#7ec8f7",
    green: "background:#0d3320;color:#4ade80",
    amber: "background:#3a2000;color:#fbbf24",
    red: "background:#3a0d0d;color:#f87171",
    grey: "background:#1e1e1e;color:#888",
  };
  return (
    <span
      style={{
        ...Object.fromEntries(
          colors[color].split(";").map((s) => {
            const [k, v] = s.split(":");
            return [k.trim(), v.trim()];
          })
        ),
        fontSize: 11,
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

function ProgressBar({ value, max }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ background: "#1e1e1e", borderRadius: 4, height: 6, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: pct === 100 ? "#4ade80" : "#3b82f6",
          transition: "width 0.3s ease",
          borderRadius: 4,
        }}
      />
    </div>
  );
}

function FlashCard({ front, back, revealed, onReveal }) {
  return (
    <div
      onClick={!revealed ? onReveal : undefined}
      style={{
        background: "#111",
        border: `1px solid ${revealed ? "#2a4a2a" : "#222"}`,
        borderRadius: 12,
        padding: "28px 32px",
        cursor: revealed ? "default" : "pointer",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "border-color 0.2s",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, color: "#e8e0d0", marginBottom: revealed ? 12 : 0 }}>
        {front}
      </div>
      {revealed ? (
        <div style={{ fontSize: 15, color: "#7ec8f7", marginTop: 8 }}>{back}</div>
      ) : (
        <div style={{ fontSize: 12, color: "#444", marginTop: 12 }}>tap to reveal</div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("thematic"); // thematic | verbs
  const [thematicIdx, setThematicIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [review, setReview] = useState(new Set());
  const [verbChunkIdx, setVerbChunkIdx] = useState(0);
  const [verbCardIdx, setVerbCardIdx] = useState(0);
  const [verbRevealed, setVerbRevealed] = useState(false);
  const [verbKnown, setVerbKnown] = useState(new Set());
  const [verbReview, setVerbReview] = useState(new Set());
  const [showDir, setShowDir] = useState("de→en"); // de→en | en→de
  const [showVerb, setShowVerb] = useState("inf"); // inf | aux | part

  // ── THEMATIC ──
  const groupKey = THEMATIC_KEYS[thematicIdx];
  const groupWords = THEMATIC_GROUPS[groupKey];
  const card = groupWords[cardIdx];
  const globalKey = `${thematicIdx}-${cardIdx}`;

  const nextCard = useCallback(
    (mark) => {
      if (mark === "known") setKnown((s) => new Set([...s, globalKey]));
      if (mark === "review") setReview((s) => new Set([...s, globalKey]));
      setRevealed(false);
      if (cardIdx < groupWords.length - 1) {
        setCardIdx(cardIdx + 1);
      }
    },
    [cardIdx, groupWords.length, globalKey]
  );

  const nextGroup = () => {
    setThematicIdx((i) => Math.min(i + 1, THEMATIC_KEYS.length - 1));
    setCardIdx(0);
    setRevealed(false);
  };

  const prevGroup = () => {
    setThematicIdx((i) => Math.max(i - 1, 0));
    setCardIdx(0);
    setRevealed(false);
  };

  // ── VERBS ──
  const verbChunk = VERB_CHUNKS[verbChunkIdx];
  const verb = verbChunk[verbCardIdx];
  const vKey = verbChunkIdx * CHUNK_SIZE + verbCardIdx;

  const nextVerb = useCallback(
    (mark) => {
      if (mark === "known") setVerbKnown((s) => new Set([...s, vKey]));
      if (mark === "review") setVerbReview((s) => new Set([...s, vKey]));
      setVerbRevealed(false);
      if (verbCardIdx < verbChunk.length - 1) {
        setVerbCardIdx(verbCardIdx + 1);
      }
    },
    [verbCardIdx, verbChunk.length, vKey]
  );

  const nextVerbChunk = () => {
    setVerbChunkIdx((i) => Math.min(i + 1, VERB_CHUNKS.length - 1));
    setVerbCardIdx(0);
    setVerbRevealed(false);
  };
  const prevVerbChunk = () => {
    setVerbChunkIdx((i) => Math.max(i - 1, 0));
    setVerbCardIdx(0);
    setVerbRevealed(false);
  };

  const verbFront =
    showVerb === "inf"
      ? verb.inf
      : showVerb === "aux"
      ? `${verb.inf} → ?`
      : `${verb.inf} → ${verb.aux} + ?`;

  const verbBack =
    showVerb === "inf"
      ? verb.en
      : showVerb === "aux"
      ? `${verb.aux} + ${verb.part}`
      : verb.part;

  const s = {
    app: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "#e8e0d0",
      padding: "0 0 60px 0",
    },
    header: {
      background: "#0f0f0f",
      borderBottom: "1px solid #1a1a1a",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    title: { fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: -0.3 },
    subtitle: { fontSize: 12, color: "#555" },
    tabs: {
      display: "flex",
      gap: 0,
      background: "#111",
      borderBottom: "1px solid #1a1a1a",
      padding: "0 24px",
    },
    tab: (active) => ({
      padding: "12px 20px",
      fontSize: 13,
      fontWeight: active ? 700 : 400,
      color: active ? "#7ec8f7" : "#555",
      borderBottom: active ? "2px solid #7ec8f7" : "2px solid transparent",
      cursor: "pointer",
      background: "none",
      border: "none",
      borderBottom: active ? "2px solid #7ec8f7" : "2px solid transparent",
    }),
    body: { padding: "24px", maxWidth: 640, margin: "0 auto" },
    card: {
      background: "#111",
      border: "1px solid #1e1e1e",
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
    btn: (variant = "default") => ({
      padding: "9px 18px",
      borderRadius: 8,
      border: "none",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      background:
        variant === "known"
          ? "#0d3320"
          : variant === "review"
          ? "#3a2000"
          : variant === "primary"
          ? "#1a3a5c"
          : "#1e1e1e",
      color:
        variant === "known"
          ? "#4ade80"
          : variant === "review"
          ? "#fbbf24"
          : variant === "primary"
          ? "#7ec8f7"
          : "#aaa",
    }),
    dirToggle: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
    },
  };

  return (
    <div style={s.app}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.title}>🇩🇪 Goethe B1 Vocabulary Trainer</div>
          <div style={s.subtitle}>
            Thematic: {Object.values(THEMATIC_GROUPS).flat().length} words &nbsp;·&nbsp; Verbs: {VERBS.length} verbs
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        <button style={s.tab(tab === "thematic")} onClick={() => setTab("thematic")}>
          Thematic Groups
        </button>
        <button style={s.tab(tab === "verbs")} onClick={() => setTab("verbs")}>
          Verbs ({VERBS.length})
        </button>
      </div>

      <div style={s.body}>
        {/* ── THEMATIC TAB ── */}
        {tab === "thematic" && (
          <>
            {/* Group navigation */}
            <div style={s.groupNav}>
              <button style={s.btn()} onClick={prevGroup} disabled={thematicIdx === 0}>
                ← Prev
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
                  Group {thematicIdx + 1} of {THEMATIC_KEYS.length}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e0d0" }}>{groupKey}</div>
              </div>
              <button style={s.btn()} onClick={nextGroup} disabled={thematicIdx === THEMATIC_KEYS.length - 1}>
                Next →
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#555",
                  marginBottom: 6,
                }}
              >
                <span>
                  Card {cardIdx + 1} / {groupWords.length}
                </span>
                <span>
                  ✅ {known.size} known &nbsp; 🔁 {review.size} review
                </span>
              </div>
              <ProgressBar value={cardIdx + 1} max={groupWords.length} />
            </div>

            {/* Direction toggle */}
            <div style={s.dirToggle}>
              <button
                style={s.btn(showDir === "de→en" ? "primary" : "default")}
                onClick={() => { setShowDir("de→en"); setRevealed(false); }}
              >
                DE → EN
              </button>
              <button
                style={s.btn(showDir === "en→de" ? "primary" : "default")}
                onClick={() => { setShowDir("en→de"); setRevealed(false); }}
              >
                EN → DE
              </button>
            </div>

            {/* Flashcard */}
            <FlashCard
              front={showDir === "de→en" ? card.de : card.en}
              back={showDir === "de→en" ? card.en : card.de}
              revealed={revealed}
              onReveal={() => setRevealed(true)}
            />

            {/* Actions */}
            {revealed && (
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button style={{ ...s.btn("known"), flex: 1 }} onClick={() => nextCard("known")}>
                  ✅ Got it
                </button>
                <button style={{ ...s.btn("review"), flex: 1 }} onClick={() => nextCard("review")}>
                  🔁 Review later
                </button>
                <button style={{ ...s.btn(), flex: 1 }} onClick={() => nextCard(null)}>
                  → Skip
                </button>
              </div>
            )}

            {/* Word list for current group */}
            <div style={{ ...s.card, marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#7ec8f7", marginBottom: 12 }}>
                All words in this group
              </div>
              {groupWords.map((w, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: i < groupWords.length - 1 ? "1px solid #1a1a1a" : "none",
                    background: i === cardIdx ? "#1a1a2e" : "transparent",
                    paddingLeft: i === cardIdx ? 8 : 0,
                    borderRadius: 4,
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{ color: "#e8e0d0", fontSize: 13 }}>{w.de}</span>
                  <span style={{ color: "#7ec8f7", fontSize: 13 }}>
                    {known.has(`${thematicIdx}-${i}`)
                      ? "✅"
                      : review.has(`${thematicIdx}-${i}`)
                      ? "🔁"
                      : w.en}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── VERBS TAB ── */}
        {tab === "verbs" && (
          <>
            {/* Chunk navigation */}
            <div style={s.groupNav}>
              <button style={s.btn()} onClick={prevVerbChunk} disabled={verbChunkIdx === 0}>
                ← Prev
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
                  Batch {verbChunkIdx + 1} of {VERB_CHUNKS.length}
                </div>
                <div style={{ fontSize: 13, color: "#888" }}>
                  Verbs #{verbChunkIdx * CHUNK_SIZE + 1}–
                  {Math.min((verbChunkIdx + 1) * CHUNK_SIZE, VERBS.length)}
                </div>
              </div>
              <button style={s.btn()} onClick={nextVerbChunk} disabled={verbChunkIdx === VERB_CHUNKS.length - 1}>
                Next →
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#555",
                  marginBottom: 6,
                }}
              >
                <span>
                  Card {verbCardIdx + 1} / {verbChunk.length}
                </span>
                <span>
                  ✅ {verbKnown.size} known &nbsp; 🔁 {verbReview.size} review
                </span>
              </div>
              <ProgressBar value={verbCardIdx + 1} max={verbChunk.length} />
            </div>

            {/* Drill mode selector */}
            <div style={{ ...s.dirToggle, flexWrap: "wrap" }}>
              <button
                style={s.btn(showVerb === "inf" ? "primary" : "default")}
                onClick={() => { setShowVerb("inf"); setVerbRevealed(false); }}
              >
                Infinitive → Meaning
              </button>
              <button
                style={s.btn(showVerb === "aux" ? "primary" : "default")}
                onClick={() => { setShowVerb("aux"); setVerbRevealed(false); }}
              >
                Infinitive → Aux + Participle
              </button>
              <button
                style={s.btn(showVerb === "part" ? "primary" : "default")}
                onClick={() => { setShowVerb("part"); setVerbRevealed(false); }}
              >
                Infinitive + Aux → Participle
              </button>
            </div>

            {/* Verb flashcard */}
            <FlashCard
              front={verbFront}
              back={verbBack}
              revealed={verbRevealed}
              onReveal={() => setVerbRevealed(true)}
            />

            {/* Always show full conjugation after reveal */}
            {verbRevealed && (
              <div
                style={{
                  background: "#0d1a2e",
                  border: "1px solid #1a3a5c",
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginTop: 10,
                  fontSize: 13,
                }}
              >
                <span style={{ color: "#e8e0d0", fontWeight: 700 }}>{verb.inf}</span>
                <span style={{ color: "#555", margin: "0 8px" }}>→</span>
                <Badge color="blue">{verb.aux}</Badge>
                <span style={{ color: "#7ec8f7", marginLeft: 8 }}>{verb.part}</span>
                <span style={{ color: "#555", margin: "0 8px" }}>·</span>
                <span style={{ color: "#aaa" }}>{verb.en}</span>
              </div>
            )}

            {/* Actions */}
            {verbRevealed && (
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button style={{ ...s.btn("known"), flex: 1 }} onClick={() => nextVerb("known")}>
                  ✅ Got it
                </button>
                <button style={{ ...s.btn("review"), flex: 1 }} onClick={() => nextVerb("review")}>
                  🔁 Review later
                </button>
                <button style={{ ...s.btn(), flex: 1 }} onClick={() => nextVerb(null)}>
                  → Skip
                </button>
              </div>
            )}

            {/* Verb list for current chunk */}
            <div style={{ ...s.card, marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#7ec8f7", marginBottom: 12 }}>
                This batch — all {verbChunk.length} verbs
              </div>
              {verbChunk.map((v, i) => {
                const key = verbChunkIdx * CHUNK_SIZE + i;
                return (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 8,
                      padding: "6px 0",
                      borderBottom: i < verbChunk.length - 1 ? "1px solid #1a1a1a" : "none",
                      background: i === verbCardIdx ? "#1a1a2e" : "transparent",
                      paddingLeft: i === verbCardIdx ? 8 : 0,
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ color: "#e8e0d0", fontSize: 12, fontWeight: 600 }}>{v.inf}</span>
                    <span style={{ color: "#7ec8f7", fontSize: 12 }}>
                      {v.aux} + {v.part}
                    </span>
                    <span style={{ color: "#888", fontSize: 12 }}>
                      {verbKnown.has(key) ? "✅" : verbReview.has(key) ? "🔁" : v.en}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
