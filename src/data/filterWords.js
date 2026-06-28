// Apply the FilterBar selection to a list of word entries.
// filters: { level, sources, status }, statusOf: (id) => "unseen"|"review"|"known".
export function applyFilters(items, filters, statusOf) {
  return items.filter((item) => {
    if (filters.level !== "all" && item.level !== filters.level) return false;
    if (filters.sources !== "all" && !filters.sources.includes(item.source)) return false;
    if (filters.status !== "all" && statusOf(item.id) !== filters.status) return false;
    return true;
  });
}

export const DEFAULT_FILTERS = { level: "all", sources: "all", status: "all" };
