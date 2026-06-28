import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

// Per-word progress, keyed by word `id`:
//   { "verb-001": { status: "known", reviewedAt: ISO, reviewCount: 3 } }
// status is one of "known" | "review". Unseen words have no entry.
const PROGRESS_KEY = "progress";

export function useProgress() {
  const [progress, setProgress, resetProgress] = useLocalStorage(PROGRESS_KEY, {});

  // mark(id, "known" | "review" | null). null clears any prior status.
  const mark = useCallback(
    (id, status) => {
      if (!id) return;
      setProgress((prev) => {
        const next = { ...prev };
        if (status == null) {
          delete next[id];
          return next;
        }
        const existing = prev[id];
        next[id] = {
          status,
          reviewedAt: new Date().toISOString(),
          reviewCount: (existing?.reviewCount ?? 0) + 1,
        };
        return next;
      });
    },
    [setProgress]
  );

  const statusOf = useCallback((id) => progress[id]?.status ?? "unseen", [progress]);

  return { progress, mark, statusOf, resetProgress };
}
