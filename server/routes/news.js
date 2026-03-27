import { Router } from "express";

const router = Router();

router.get("/", async (_req, res) => {
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
              text: `Search the web for the latest AI news across these categories: AI model releases, AI research breakthroughs, AI regulation & policy, and AI industry & startups. Return ONLY a JSON array of 10 news items. No markdown fences, no explanation, no preamble — just the raw JSON array. Each object must have: {"title":"headline","summary":"one or two sentences","source":"domain.com","url":"https://full-link-to-article","date":"Mar 2026","category":"Models|Research|Policy|Industry"}`
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
