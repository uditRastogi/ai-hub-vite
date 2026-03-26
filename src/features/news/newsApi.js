import { SEARCH_QUERIES } from "../../constants";

export async function fetchAINews(queryIndex) {
  const q = SEARCH_QUERIES[queryIndex % SEARCH_QUERIES.length];
  try {
    const base = import.meta.env.VITE_API_URL || "";
    const res = await fetch(`${base}/api/news?queryIndex=${queryIndex}`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const items = await res.json();
    return items.map((item, i) => ({
      id: `${queryIndex}-${i}-${Date.now()}`,
      title: item.title || "Untitled",
      summary: item.summary || "",
      source: item.source || "",
      date: item.date || "",
      category: q.category,
      hot: i === 0,
    }));
  } catch (err) {
    console.error("News fetch failed:", err);
    return [];
  }
}
