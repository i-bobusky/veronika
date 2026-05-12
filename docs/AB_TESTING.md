# A/B Testing — Kindergeburtstag v1 vs v2

The website now has **two live versions** of the Kindergeburtstag page that share a single source of truth. Easy to compare, easy to switch, easy to A/B test.

## URLs

| URL | What it shows |
|---|---|
| `/kindergeburtstag.html` | **v1** — the current emotional-but-feature-led page. |
| `/kindergeburtstag.html?v=2` | **v2** — same URL, but the v2 overlay activates via query param. |
| `/kindergeburtstag-v2.html` | **v2** — clean URL that loads v1 source and applies v2 overlay. Address bar stays at `/kindergeburtstag-v2.html`. |

All three serve the same page underneath. The difference between v1 and v2 is purely the overlay (`assets/v2-overlay.js`).

The v2 page shows a small gold **"A/B · v2"** badge in the bottom-right corner so you can always tell which variant you're looking at.

## What v2 changes

Eight emotional-selling changes, applied by `assets/v2-overlay.js`:

1. **Hero headline** — "Der Tag, an den sich Ihr Kind in zehn Jahren noch erinnert."
2. **Hero CTAs** — primary becomes "Mein Wunschtag konfigurieren"; secondary becomes "Datum reservieren — 48h kostenlos".
3. **New section "Häufige Sorgen"** — pre-handles the top 7 parent objections.
4. **New section "Was Sie sich zurückholen"** — dark forest section about what the parent gets back.
5. **3 emotional discovery questions** added inside the inquiry form (what your child loves, the perfect day, past stresses).
6. **1–10 excitement slider** added at the top of the form as a trial close.
7. **Premium frame** above the configurator ("we only take on a limited number of families per month…").
8. **Diamond walk-through** — minute-by-minute timeline of a Diamond party day.

All v2 strings exist in DE + EN, with CS / FR falling back to DE.

## How to choose which version is active

### Option A — Manual switch (simplest)

In `index.html`, find the link that points to `kindergeburtstag.html` and change it to `kindergeburtstag-v2.html` (or vice versa). The home-page CTAs near the package cards already exist there.

That's it. All visitors go to whichever you chose.

### Option B — 50/50 random split (real A/B test)

Replace the link's `href` with a random redirect. Paste this small script into `index.html` near the bottom of `<body>` (before the closing `</body>`):

```html
<script>
  // 50/50 A/B split: redirect "Pakete entdecken" clicks
  document.querySelectorAll('a[href^="kindergeburtstag"]').forEach(a => {
    a.addEventListener('click', e => {
      if (Math.random() < 0.5) {
        e.preventDefault();
        const url = new URL(a.href);
        url.pathname = url.pathname.replace('kindergeburtstag.html', 'kindergeburtstag-v2.html');
        location.href = url.toString();
      }
    });
  });
</script>
```

Half of clicks go to v1, half to v2. Add a `data-layer.push({event:'variant', value:'v2'})` call inside the `if` if you're using GTM, so each variant is logged.

### Option C — Cloudflare Worker / GitHub Pages with sticky session

For a proper A/B test where the same visitor sees the same variant on repeat visits, hash the user's cookie or IP and route accordingly. Best done at the CDN layer once you're past the lightweight Option B.

## How to measure

Recommended setup:

1. Sign up for [Plausible Analytics](https://plausible.io) (privacy-friendly) or any analytics tool of your choice.
2. Track these two **goals** as conversions:
   - **Inquiry sent** — fire when the form is successfully submitted.
   - **Reserve clicked** — fire when the "Datum reservieren — 48h kostenlos" button is clicked.
3. Compare conversion rates between `/kindergeburtstag.html` and `/kindergeburtstag-v2.html` over a 2–4 week window.
4. Decide based on data. If v2 wins, **make v2 the default**: copy the v2 overlay logic into the source HTML, retire `kindergeburtstag-v2.html`, and clean up.

## Rolling back v2

If something looks wrong on v2 and you want it gone immediately:

- **Quick disable**: delete or rename `assets/v2-overlay.js`. The script will 404 and `kindergeburtstag-v2.html` will load v1 content unchanged (no badge, no extra sections).
- **Hard disable**: delete `kindergeburtstag-v2.html` and remove the `<script src="assets/v2-overlay.js"></script>` line from `kindergeburtstag.html`. v1 is fully restored.

## Files touched

```
assets/v2-overlay.js          ← all v2 logic, CSS, and i18n strings
kindergeburtstag-v2.html      ← public URL for v2 (loads v1 source + activates overlay)
kindergeburtstag.html         ← +1 line: <script src="assets/v2-overlay.js"></script>
docs/AB_TESTING.md            ← this file
```

`assets/i18n.js` is **not modified** — the v2 strings live inside the overlay and are merged into `window.VB_I18N` at runtime.
