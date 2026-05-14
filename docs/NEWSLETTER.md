# Newsletter — Atelier Glanz

The site has a newsletter sign-up section on every page (above the footer). This document explains how it works today, which tool to use to actually send the newsletter, and how to migrate cleanly.

---

## What's running right now (day 1)

- **Sign-up form**: `#newsletter` section, on every main page + blog index + each blog article.
- **Submit endpoint**: Web3Forms (same access key as the inquiry form).
- **What happens when someone subscribes**: Veronika receives an e-mail at `events@atelier-glanz.ch` with the subject *"Newsletter-Anmeldung — Atelier Glanz"* and the subscriber's address (and optional first name).
- **What the subscriber sees**: a success message saying *"Danke! Bitte bestätigen Sie Ihre Anmeldung in Ihrem Posteingang."*

This works immediately and costs nothing — but Veronika has to manually move each subscriber into a real list. Fine for the first 10–20 sign-ups; not scalable beyond that.

Shared files:

```
assets/newsletter.css     — visual styling (forest-green band)
assets/newsletter.js      — submit handler (with mailto: fallback)
docs/NEWSLETTER.md        — this file
```

The HTML block (`<section id="newsletter">`) is hard-coded on each page. To change copy or layout, update each page once.

---

## What you need: a real newsletter tool

A proper tool gives you:

1. **A subscriber list** with names, sign-up dates, source.
2. **Double opt-in** — the subscriber confirms via e-mail (legally required in Switzerland / DSG and the EU / GDPR).
3. **A campaign editor** — drag/drop layout, your fonts and brand colours.
4. **Automations** — welcome e-mail, drip sequences, birthday reminders.
5. **Unsubscribe links** (also legally required).
6. **Bounce / complaint handling** — automatically removes invalid addresses.

You should not try to do this yourself. The tools below all handle this for free at your current volume.

---

## Recommended tools (ranked)

### 🥇 MailerLite — best fit for Atelier Glanz

- **Free up to 1 000 subscribers**, 12 000 e-mails / month.
- GDPR / DSG compliant. Servers in the EU.
- Beautiful drag-and-drop editor; designs match Atelier Glanz aesthetic well.
- Automations included on the free plan (welcome e-mail, birthday reminders, segmentation).
- Embed forms (HTML) work natively on static sites — no backend.
- TWINT / Swiss bank for paid plans when you outgrow the free tier (~CHF 9 / month for 1k–2.5k subscribers).
- 👉 Sign up: <https://www.mailerlite.com/>

**Why I recommend it**: the free plan is the most generous, the editor is the friendliest, and automations are not paywalled.

### 🥈 Brevo (formerly Sendinblue) — strong alternative

- Free up to **unlimited subscribers**, 300 e-mails / day.
- EU-based, GDPR-friendly.
- Combines transactional + marketing e-mail (useful later for order confirmations on the DIY bundles).
- Automations on free plan.
- 👉 <https://www.brevo.com/>

**Pick this if**: you expect to send fewer than ~9 000 e-mails / month but want a large list.

### 🥉 ConvertKit (now "Kit") — great for creators

- Free up to **10 000 subscribers**, unlimited e-mails.
- Focused on writers and small creators.
- Cleaner, simpler interface than MailerLite.
- Limited free automations (only 1 sequence on free).
- 👉 <https://kit.com/>

### What to skip

- **Mailchimp** — was the default for years, but the free plan is now only 500 subscribers and they removed key automations from it. Pricier than competitors past free tier.
- **Substack** — built for newsletter-only publishing; doesn't fit a service business.

---

## Setting up MailerLite (15-minute setup)

1. **Sign up** at <https://www.mailerlite.com/> with `events@atelier-glanz.ch`. Country: Switzerland.
2. Verify your domain (`atelier-glanz.ch`) so e-mails come *from* your own address rather than a MailerLite shared sender. MailerLite walks you through the three DNS records (SPF, DKIM, DMARC) you need to add at your registrar. Takes ~10 min plus DNS propagation.
3. Create a **Group** called `Atelier Glanz Newsletter`.
4. In *Forms → Embedded form*, create a form bound to that group. Style is irrelevant — we use our own styling on the website; we only need the form's `action` URL and field names.
5. Click *Get the embed code* → switch to *HTML* mode. Copy the `<form>` opening tag — it'll look like:

   ```html
   <form action="https://assets.mailerlite.com/jsonp/123456/forms/abcdef/subscribe" method="post" target="_blank">
   ```

6. Open the website and swap that URL into every `nl-form`. Quick find-and-replace across all HTML files:

   - Search for `action="https://api.web3forms.com/submit"`
   - Replace with the MailerLite URL above

7. **Rename the inputs** to what MailerLite expects:
   - `name="email"` → `name="fields[email]"`
   - `name="firstname"` → `name="fields[name]"`
8. **Remove** the three hidden inputs (`access_key`, `subject`, `from_name`) — MailerLite doesn't need them.
9. (Optional but nice) Disable the `target="_blank"` so the user stays on the page; the JS handler already shows the in-page success message.

That's it. Subscribers now flow straight into MailerLite, with double opt-in handled automatically.

### Files to edit

The `<form>` opening tag appears in these files:

```
index.html
kindergeburtstag.html
kinderprogramm.html
vorlagen.html
blog.html
blog/kindergeburtstag-planen.html
```

Six edits, all identical. If you'd like Claude to do them once you have the MailerLite URL, paste it back and I'll make the swap.

---

## Setting up automations in MailerLite

Once subscribers start flowing in, set up at least these two automations.

### Automation 1 — Welcome e-mail (essential)

- Trigger: *Subscriber joins group "Atelier Glanz Newsletter"*.
- Action: *Send an e-mail* immediately.
- Subject: *"Willkommen bei Atelier Glanz — und ein kleines Geschenk für Sie"*
- Content: introduce Veronika in 3–5 sentences, link to the most popular blog article, attach (or link to) a free PDF — e.g., a 1-page "Geburtstags-Checkliste". This makes the sign-up feel rewarding immediately.

### Automation 2 — Monthly themed digest (recommended)

- Trigger: *On a specific date each month* (e.g., the 1st).
- Action: *Send latest blog post + one tip*.
- Content: 1 paragraph intro, a theme idea, link to a recent article, CTA to the configurator.

Optional next steps when you have more time:
- Birthday-themed sequence (5 e-mails over 6 weeks teaching how to plan an unforgettable birthday).
- Re-engagement campaign for subscribers who haven't opened anything in 6 months.

---

## Privacy & legal (Switzerland)

- **Double opt-in** is required under Swiss DSG (and EU GDPR if you have EU subscribers). MailerLite/Brevo/Kit all do this automatically; Web3Forms does NOT — that's the biggest reason to migrate quickly.
- **Unsubscribe link** is required in every e-mail. The proper tools include it by default; if you're hand-rolling, you must add it.
- **Privacy policy page**: when you formally launch the newsletter, add a short line to your eventual privacy policy: *"Wenn Sie unseren Newsletter abonnieren, speichern wir Ihre E-Mail-Adresse für den Versand des Newsletters bei MailerLite (Server in der EU). Sie können sich jederzeit abmelden."*
- **No SMS spam**, no surprise marketing. Stay clean — your reputation is the long-term asset.

---

## When to send

- **First 3 months**: monthly is plenty. You're learning what subscribers respond to.
- **Best days for parents**: Sunday afternoon (planning the week) or Wednesday morning. Avoid Friday after 16:00.
- **Best length**: short. Two short sections, one image, one clear CTA. Most parents read newsletters from their phone during a 90-second break.

---

## TL;DR

- Sign-up form works **today** via Web3Forms. Everything funnels to `events@atelier-glanz.ch`.
- Open a free **MailerLite** account, get the embed URL, send it back to me, and I'll swap the six form actions in one go.
- Set up the welcome e-mail in MailerLite, then send your first issue.
- Cost: CHF 0 up to 1 000 subscribers. After that, ~CHF 9 / month.
