import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

// Session log for the (future) stats dashboard:
//   [{ date: "2026-06-28", wordsReviewed: 15, verbsReviewed: 20, duration: 480 }]
// One aggregated row per calendar day; counts accumulate as the user drills.
const SESSION_KEY = "sessionLog";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function useSession() {
  const [sessionLog, setSessionLog, resetSessionLog] = useLocalStorage(SESSION_KEY, []);
  const startRef = useRef(Date.now());

  // Record one reviewed card. kind: "word" | "verb".
  const recordReview = useCallback(
    (kind) => {
      const date = today();
      const elapsed = Math.round((Date.now() - startRef.current) / 1000);
      setSessionLog((prev) => {
        const rows = [...prev];
        let row = rows.find((r) => r.date === date);
        if (!row) {
          row = { date, wordsReviewed: 0, verbsReviewed: 0, duration: 0 };
          rows.push(row);
        }
        if (kind === "verb") row.verbsReviewed += 1;
        else row.wordsReviewed += 1;
        row.duration = Math.max(row.duration, elapsed);
        return rows;
      });
    },
    [setSessionLog]
  );

  return { sessionLog, recordReview, resetSessionLog };
}
