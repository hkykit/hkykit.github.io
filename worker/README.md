# food-analyzer Worker

Cloudflare Worker that proxies food-photo analysis to Claude vision, so the
Anthropic API key never reaches the browser. Used by `trainer.html`'s
"📷 拍照分析" button.

## Deploy

```bash
cd worker
npx wrangler login          # if not already logged in
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy
```

After deploying, wrangler prints the Worker URL
(e.g. `https://food-analyzer.<your-subdomain>.workers.dev`).
Paste that URL into `trainer.html` where `WORKER_URL` is defined (search for
`WORKER_URL` near the top of the `<script>` block), or enter it once in the
app's photo-upload prompt — it's saved to localStorage so you only set it once.

## Notes

- Model: `claude-haiku-4-5` — cheap/fast, appropriate for casual personal food
  logging. Edit `MODEL` in `food-analyzer.js` to upgrade if estimates are too
  rough.
- CORS is locked to `https://hkykit.github.io`. Update `ALLOWED_ORIGIN` in
  `food-analyzer.js` if you serve the site from elsewhere (e.g. local testing).
- The worker never stores images or results — it's a stateless proxy.
