export async function fetchAINews() {
  try {
    const res = await fetch("/api/news");
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const items = await res.json();
    return items.map((item, i) => ({
      id: `${i}-${Date.now()}`,
      title: item.title || "Untitled",
      summary: item.summary || "",
      source: item.source || "",
      url: item.url || "",
      date: item.date || "",
      category: item.category || "Industry",
      hot: i === 0,
    }));
  } catch (err) {
    console.error("News fetch failed:", err);
    return [];
  }
}
