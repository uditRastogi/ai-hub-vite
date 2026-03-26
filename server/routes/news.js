import { Router } from "express";

const router = Router();

const SEARCH_QUERIES = [
  { query: "latest AI model releases 2026", category: "Models" },
  { query: "AI research breakthroughs 2026", category: "Research" },
  { query: "AI regulation policy news 2026", category: "Policy" },
  { query: "AI industry enterprise adoption 2026", category: "Industry" },
  { query: "large language model benchmark results 2026", category: "Models" },
  { query: "AI safety alignment news 2026", category: "Research" },
  { query: "AI startups funding 2026", category: "Industry" },
  { query: "generative AI applications 2026", category: "Industry" },
  { query: "open source AI models news 2026", category: "Models" },
  { query: "AI ethics governance 2026", category: "Policy" },
];

router.get("/", async (req, res) => {
  const queryIndex = parseInt(req.query.queryIndex, 10) || 0;
  const q = SEARCH_QUERIES[queryIndex % SEARCH_QUERIES.length];

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: `Search the web for: "${q.query}". Then return ONLY a JSON array of 5 news items you found. No markdown fences, no explanation, no preamble — just the raw JSON array. Each object: {"title":"headline","summary":"one sentence","source":"domain.com","date":"Mon YYYY"}`
            }]
          }],
          tools: [{ google_search: {} }],
          generationConfig: {
            maxOutputTokens: 4096,
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(response.status).json({ error: "Gemini API error", details: data });
    }

    // Extract text from the first candidate's first text part (avoid duplicates)
    const parts = data.candidates?.[0]?.content?.parts || [];
    const firstText = parts.find(p => p.text)?.text || "";

    const cleaned = firstText.replace(/```json|```/g, "").trim();
    const match = cleaned.match(/\[[\s\S]*\]/);

    if (!match) {
      return res.json([]);
    }

    const items = JSON.parse(match[0]);
    res.json(items);
  } catch (err) {
    console.error("News fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
