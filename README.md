# The AI.Hub — Intelligence Observatory

A single-page app for comparing frontier AI models, testing AI knowledge, and reading live AI news via infinite scroll.

## Stack

- **Vite 6** + **React 19** + **React Router 7**
- **Anthropic API** with web search for live news feed
- Zero CSS frameworks — custom design system via CSS variables
- Light/dark mode via `prefers-color-scheme`

## Quick Start

```bash
# 1. Install
npm install

# 2. (Optional) Set API key for live news feed
cp .env.example .env
# Edit .env and add your Anthropic API key

# 3. Dev server
npm run dev
# → opens http://localhost:3000
```

## Routes

| Path       | Tab          |
|------------|--------------|
| `/`        | Signal Feed  |
| `/feed`    | Signal Feed  |
| `/models`  | Model Arena  |
| `/quiz`    | AI Quiz      |

## Build & Deploy

```bash
npm run build    # → outputs to dist/
npm run preview  # → preview production build locally
```

### Vercel (recommended — zero config)
```bash
npx vercel --prod
```
`vercel.json` is already configured for SPA rewrites.

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```
`public/_redirects` handles SPA fallback.

### Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name=ai-hub
```

## Architecture Notes

### Live News Feed
The Signal Feed calls the Anthropic Messages API with the `web_search` tool enabled. Each scroll-triggered page fetches a different topic (model releases, research, policy, industry...) from a rotating query list. Results are parsed as JSON and appended to the feed.

> **Security note**: For production, proxy the Anthropic API through a backend (e.g., a Vercel serverless function or Cloudflare Worker) so the API key isn't exposed in the browser. The current setup uses `VITE_ANTHROPIC_API_KEY` which is fine for local dev but gets bundled into client code.

### Chunk splitting
Vite is configured to split `react` + `react-dom` and `react-router-dom` into separate vendor chunks for optimal caching.

## License

MIT
