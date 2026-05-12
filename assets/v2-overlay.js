/* ──────────────────────────────────────────────────────────────────
   Atelier Glanz — A/B v2 Overlay
   Activates when URL has ?v=2 or the path contains "-v2.html".
   Applies the 8 emotional-selling changes described in
   docs/Atelier_Glanz_Website_Code_Changes.md without duplicating
   the page source. v1 stays the source of truth; this file patches
   the live DOM and registers v2-specific i18n strings on the fly.
   ────────────────────────────────────────────────────────────────── */
(function () {
  const url = new URL(location.href);
  const isV2 =
    url.searchParams.get('v') === '2' ||
    /-v2\.html?$/i.test(location.pathname) ||
    window.__VB_V2__ === true;
  if (!isV2) return;

  document.documentElement.dataset.version = 'v2';

  /* ──────── v2-specific i18n keys (merged into existing dict) ─── */
  const V2_I18N = {
    de: {
      // Change 1 — emotion-led hero
      'hero.title.html': 'Der Tag, an den sich Ihr Kind<br /><em>in zehn Jahren noch erinnert.</em>',
      'hero.sub': 'Sie geniessen. Ihr Kind erinnert sich für immer.',
      // Change 3 — secondary CTA
      'hero.cta.calc': 'Mein Wunschtag konfigurieren',
      'hero.cta.reserve': 'Datum reservieren — 48h kostenlos',
      // Change 7 — premium frame
      'cf.frame': 'Wir nehmen pro Monat nur eine begrenzte Anzahl Familien an — damit jedes Kind den ganzen Fokus verdient.',
      // Change 2 — Häufige Sorgen
      'sorgen.label': 'Häufige Sorgen',
      'sorgen.h2.html': 'Was sich Eltern<br /><em>oft fragen</em>',
      'sorgen.p': 'Ehrliche Antworten auf die Fragen, die Sie wahrscheinlich gerade im Kopf haben.',
      'sorgen.q1': 'Ist das nicht teuer für einen Kindergeburtstag?',
      'sorgen.a1': 'Die meisten Familien geben für ein selbst organisiertes Fest schnell CHF 400–700 aus – Essen, Deko, Kostüm. Bei Atelier Glanz bekommen Sie einen Tag, den Ihr Kind in zehn Jahren noch erinnert – und Ihr Wochenende zurück. Der Preis ist der kleinste Teil dieser Entscheidung.',
      'sorgen.q2': 'Was, wenn mein Kind das Thema doch nicht mag?',
      'sorgen.a2': 'Das Thema wird erst 14 Tage vor dem Fest endgültig festgelegt. Nach der Buchung bekommt Ihr Kind eine kleine „Entdeckungs-Box" mit drei Themen zur Auswahl – gewählt wird gemeinsam mit Ihnen. So entscheidet das Geburtstagskind selbst.',
      'sorgen.q3': 'Könnte ich das nicht selbst organisieren?',
      'sorgen.a3': 'Natürlich. Die Frage ist nicht „können", sondern „möchten Sie Ihr Wochenende dafür tauschen?". Wir machen das jedes Wochenende – mit erprobten Abläufen, geprüften Materialien und Lieferanten, die uns kennen. Sie bekommen ein Erlebnis, das in Eigenregie kaum machbar ist – und vor allem: Sie sind selbst dabei.',
      'sorgen.q4': 'Was, wenn das Wunschdatum knapp wird?',
      'sorgen.a4': 'Samstage werden in der Regel 6–8 Wochen im Voraus gebucht. Wenn Sie noch zwischen zwei Daten schwanken, reservieren wir Ihren Wunschtag unverbindlich für 48 Stunden – damit Sie in Ruhe entscheiden können.',
      'sorgen.q5': 'Müssen wir uns sofort entscheiden?',
      'sorgen.a5': 'Nein. Die Anfrage ist unverbindlich. Wir telefonieren, treffen uns wenn Sie möchten, und Sie entscheiden in Ruhe. Unser Ziel ist Klarheit – nicht Druck.',
      'sorgen.q6': 'Wie viel ist während der Feier wirklich „erledigt"?',
      'sorgen.a6': 'Beim Diamond-Paket: alles. Aufbau, Begleitung, Spielstationen, Kuchenmoment, Goodie Bags und Basis-Aufräumen. Beim Gold-Paket sind wir vor Ort und führen die Spiele – einige Punkte (z.B. Catering, vollständiges Aufräumen) sind dabei optional. Welches Paket zu Ihnen passt, klären wir gemeinsam.',
      'sorgen.q7': 'Was passiert, wenn etwas nicht klappt?',
      'sorgen.a7': 'Bei jeder Feier sind wir oder eine geprüfte Assistentin persönlich vor Ort. Bei kurzfristiger Erkrankung übernimmt eine erfahrene Vertretung – ohne Mehrkosten für Sie. Was zählt: Ihr Kind merkt nie etwas davon.',
      // Change 4 — Was Sie sich zurückholen
      'zurueck.label': 'Was Sie sich zurückholen',
      'zurueck.h2.html': 'Sie hosten nicht.<br /><em>Sie sind dabei.</em>',
      'zurueck.p': 'Atelier Glanz ist kein Stunden-Service. Es ist die Zeit, die Sie sich an einem der wichtigsten Tage Ihres Kindes zurückgeben.',
      'zurueck.i1.h': 'Ihren Samstagmorgen',
      'zurueck.i1.p': 'Keine Migros-Runde, keine Pinterest-Recherche, kein Ballonaufblasen vor dem Frühstück.',
      'zurueck.i2.h': 'Den Kuchen-Moment',
      'zurueck.i2.p': 'Sie filmen. Sie singen. Sie sind im Bild. Nicht in der Küche.',
      'zurueck.i3.h': 'Ihren Abend',
      'zurueck.i3.p': 'Wenn die Gäste gehen, ist die Wohnung schon wieder fast wie vorher.',
      'zurueck.i4.h': 'Die Erinnerung Ihres Kindes',
      'zurueck.i4.p': 'In zehn Jahren wird Ihr Kind erzählen, wie schön dieser Tag war – und nicht, wie gestresst Mama war.',
      // Change 5 — emotional discovery questions
      'form.loves': 'Was liebt Ihr Kind im Moment am meisten?',
      'form.loves.ph': 'Drei Dinge reichen — es hilft uns, den Tag persönlich zu gestalten.',
      'form.perfect': 'Wenn der Tag perfekt verläuft, was sehen Sie vor sich?',
      'form.perfect.ph': 'Ein Bild, eine Stimmung, ein Moment — alles ist hilfreich.',
      'form.stress': 'Was war Ihr grösster Stress bei vergangenen Kindergeburtstagen?',
      'form.stress.ph': 'Damit wir genau das vermeiden.',
      // Change 6 — excitement trial close
      'form.excitement.label': 'Auf einer Skala von 1 bis 10 — wie sehr freuen Sie sich auf diesen Tag, so wie Sie ihn gerade zusammengestellt haben?',
      'form.excitement.helper': 'Bei 8 oder höher: reservieren wir Ihr Wunschdatum unverbindlich für 48 Stunden. Wir buchen Samstage in der Regel 6–8 Wochen im Voraus.',
      // Change 8 — Diamond walk-through
      'diamond.label': 'So sieht ein Diamond-Tag aus',
      'diamond.h2.html': 'Ihr Tag,<br /><em>Minute für Minute</em>',
      'diamond.p': 'Nicht als Liste — als Geschichte. So erlebt Ihre Familie einen Diamond-Geburtstag bei Atelier Glanz.',
      'diamond.t1': 'Wir klingeln an Ihrer Tür — mit Assistentin und allem, was wir für den Tag brauchen. Sie sind in Jeans, nicht in Kochschürze.',
      'diamond.t2': 'Wir verwandeln Ihr Wohnzimmer in zwanzig Minuten in eine Themenwelt. Das Geburtstagskind staunt — und Sie auch.',
      'diamond.t3': 'Erste Gäste klingeln. Wir begrüssen sie an der Tür. Sie übergeben jedes Kind an uns und gehen sich einen Kaffee holen.',
      'diamond.t4': 'Drei Aktivitätsstationen, Bastelstation, Schatzsuche im Garten, Kuchen-Moment mit Lied und Kerzen um 16:30 — wir koordinieren, Sie filmen.',
      'diamond.t5': 'Goodie Bags stehen an der Tür bereit. Eltern holen ab. Kinder gehen glücklich.',
      'diamond.t6': 'Wir räumen auf. Ihre Wohnung sieht sauberer aus als am Morgen. Sie und Ihr Kind sitzen auf dem Sofa. Es sagt: „Mama, das war der schönste Tag meines Lebens."',
      'diamond.cta': 'Diamond konfigurieren →',
    },
    en: {
      'hero.title.html': 'The day your child<br /><em>will remember in ten years.</em>',
      'hero.sub': "You relax. Your child remembers forever.",
      'hero.cta.calc': 'Configure my dream day',
      'hero.cta.reserve': 'Reserve a date — 48h free',
      'cf.frame': 'We only take on a limited number of families per month — so every child gets our full focus.',
      'sorgen.label': 'Common Concerns',
      'sorgen.h2.html': 'What parents<br /><em>often ask</em>',
      'sorgen.p': "Honest answers to the questions you're probably asking yourself right now.",
      'sorgen.q1': "Isn't this expensive for a children's birthday?",
      'sorgen.a1': "Most families end up spending CHF 400–700 on a self-organised party — food, decorations, costume. With Atelier Glanz you get a day your child will remember in ten years — plus your weekend back. The price is the smallest part of this decision.",
      'sorgen.q2': "What if my child doesn't like the chosen theme?",
      'sorgen.a2': 'The theme is only finalised 14 days before the party. After booking, your child receives a small "Discovery Box" with three themes to choose from — together with you. The birthday child decides.',
      'sorgen.q3': "Couldn't I just organise this myself?",
      'sorgen.a3': 'Of course you could. The real question is not "can I", but "do I want to trade my weekend for this?". We do this every weekend — with proven processes, vetted materials, and suppliers who know us. You get an experience that is very hard to replicate alone — and most importantly: you get to be there yourself.',
      'sorgen.q4': 'What if my preferred date is getting close?',
      'sorgen.a4': "Saturdays are usually booked 6–8 weeks in advance. If you're still deciding between two dates, we'll hold your preferred day for 48 hours so you can decide calmly.",
      'sorgen.q5': 'Do we have to decide immediately?',
      'sorgen.a5': "No. The inquiry is non-binding. We talk, meet if you'd like, and you decide calmly. Our goal is clarity — not pressure.",
      'sorgen.q6': 'How much is actually "handled" during the party?',
      'sorgen.a6': 'With the Diamond package: everything. Setup, hosting, activity stations, cake moment, goodie bags, and basic clean-up. With the Gold package we are on-site and run the games — some items (e.g. catering, full clean-up) are optional add-ons. We figure out together which package fits you.',
      'sorgen.q7': "What happens if something doesn't go to plan?",
      'sorgen.a7': 'At every party we or one of our vetted assistants is personally on-site. In case of short-notice illness an experienced backup takes over — at no extra cost to you. What matters: your child will never notice.',
      'zurueck.label': 'What you reclaim',
      'zurueck.h2.html': "You don't host.<br /><em>You're a guest.</em>",
      'zurueck.p': "Atelier Glanz is not an hourly service. It is the time you give yourself back on one of the most important days of your child's life.",
      'zurueck.i1.h': 'Your Saturday morning',
      'zurueck.i1.p': 'No supermarket run, no Pinterest research, no blowing up balloons before breakfast.',
      'zurueck.i2.h': 'The cake moment',
      'zurueck.i2.p': "You film. You sing. You're in the picture — not in the kitchen.",
      'zurueck.i3.h': 'Your evening',
      'zurueck.i3.p': 'When the guests leave, your home is already nearly back to normal.',
      'zurueck.i4.h': "Your child's memory",
      'zurueck.i4.p': "In ten years your child will tell the story of how magical the day was — not how stressed mama looked.",
      'form.loves': 'What does your child love most right now?',
      'form.loves.ph': 'Three things will do — it helps us tailor the day personally.',
      'form.perfect': 'When the day goes perfectly, what do you see?',
      'form.perfect.ph': 'An image, a feeling, a moment — anything helps.',
      'form.stress': "What's been your biggest stress at past birthdays?",
      'form.stress.ph': 'So we can avoid exactly that.',
      'form.excitement.label': "On a scale of 1 to 10 — how excited are you about the day you've just put together?",
      'form.excitement.helper': 'At 8 or higher: we hold your preferred date for 48 hours, no commitment. Saturdays are usually booked 6–8 weeks in advance.',
      'diamond.label': 'A Diamond day, narrated',
      'diamond.h2.html': 'Your day,<br /><em>minute by minute</em>',
      'diamond.p': 'Not as a list — as a story. This is how your family experiences a Diamond birthday at Atelier Glanz.',
      'diamond.t1': "We ring your doorbell — with my assistant and everything we need for the day. You're in jeans, not a chef's apron.",
      'diamond.t2': 'We transform your living room into a themed world in twenty minutes. The birthday child gasps — and so do you.',
      'diamond.t3': 'First guests arrive. We greet them at the door. You hand each child off to us and go pour yourself a coffee.',
      'diamond.t4': 'Three activity stations, craft station, garden treasure hunt, cake moment with song and candles at 4:30pm — we coordinate, you film.',
      'diamond.t5': 'Goodie bags are ready at the door. Parents pick up. Children leave happy.',
      'diamond.t6': "We tidy up. Your home looks cleaner than it did this morning. You and your child sit on the sofa. They say: 'Mama, that was the best day of my life.'",
      'diamond.cta': 'Configure Diamond →',
    },
  };

  function mergeIntoI18N() {
    if (!window.VB_I18N) return;
    Object.keys(V2_I18N).forEach(lang => {
      if (!window.VB_I18N[lang]) window.VB_I18N[lang] = {};
      Object.assign(window.VB_I18N[lang], V2_I18N[lang]);
    });
    // Czech and French fall back to German for v2-only strings.
    ['cs', 'fr'].forEach(lang => {
      if (!window.VB_I18N[lang]) window.VB_I18N[lang] = {};
      Object.keys(V2_I18N.de).forEach(key => {
        if (window.VB_I18N[lang][key] == null && V2_I18N.de[key] != null) {
          window.VB_I18N[lang][key] = V2_I18N.de[key];
        }
      });
    });
  }

  /* ──────── CSS for the new v2 sections ──────────────────────── */
  const V2_CSS = `
    /* v2 — Häufige Sorgen */
    #sorgen {
      padding: clamp(3.5rem, 7vw, 6rem) 5vw;
      background: var(--cream-deep);
    }
    .sorgen-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 2rem auto 0;
    }
    .sorgen-item {
      background: var(--white);
      border-left: 3px solid var(--gold);
      padding: 1.4rem 1.6rem;
      border-radius: 4px;
    }
    .sorgen-item h4 {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 600;
      font-size: 1.15rem;
      color: var(--forest);
      margin-bottom: 0.6rem;
      line-height: 1.3;
    }
    .sorgen-item p {
      font-size: 0.95rem;
      color: var(--text-main);
      line-height: 1.65;
    }

    /* v2 — Was Sie sich zurückholen */
    #zurueck {
      padding: clamp(3.5rem, 7vw, 6rem) 5vw;
      background: var(--forest);
      color: var(--cream);
    }
    #zurueck .section-label { color: var(--gold-lt); }
    #zurueck h2 { color: var(--cream); }
    #zurueck h2 em { color: var(--gold-lt); font-style: italic; }
    #zurueck .section-head p { color: var(--forest-lt); }
    .zurueck-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      max-width: 1100px;
      margin: 2rem auto 0;
    }
    .zurueck-item { text-align: center; padding: 1.4rem 1rem; }
    .zurueck-icon {
      display: inline-block; font-size: 1.8rem;
      margin-bottom: 0.7rem; color: var(--gold-lt);
    }
    .zurueck-item h4 {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 600; font-size: 1.2rem;
      color: var(--cream); margin-bottom: 0.5rem;
    }
    .zurueck-item p { color: var(--forest-lt); font-size: 0.95rem; line-height: 1.6; }

    /* v2 — premium frame above configurator */
    .premium-frame {
      max-width: 640px;
      margin: 1.2rem auto 0;
      padding: 0.9rem 1.4rem;
      background: var(--cream-deep);
      border-left: 3px solid var(--gold);
      font-style: italic;
      color: var(--charcoal);
      font-size: 0.98rem;
      line-height: 1.55;
    }

    /* v2 — excitement trial close */
    .form-trial-close {
      background: var(--cream-deep);
      border-left: 3px solid var(--gold);
      padding: 1.1rem 1.3rem;
      border-radius: 4px;
      margin: 0 0 1.2rem;
    }
    .form-trial-close label {
      display: block; font-size: 0.92rem;
      font-weight: 500; color: var(--text-main);
      margin-bottom: 0.7rem; line-height: 1.5;
      letter-spacing: 0; text-transform: none;
    }
    .excitement-scale { display: flex; align-items: center; gap: 0.8rem; }
    .excitement-scale input[type="range"] { flex: 1; accent-color: var(--gold-deep); }
    .excitement-scale output {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem; color: var(--gold-deep);
      font-weight: 600; min-width: 2ch; text-align: center;
    }
    .form-trial-helper { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.7rem; line-height: 1.5; }

    /* v2 — Diamond timeline */
    #diamond-day {
      padding: clamp(3.5rem, 7vw, 6rem) 5vw;
      background: var(--cream);
    }
    .diamond-timeline { max-width: 760px; margin: 2rem auto 2.5rem; position: relative; }
    .diamond-timeline::before {
      content: ''; position: absolute;
      left: 90px; top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    }
    .diamond-row {
      display: flex; gap: 1.4rem; align-items: flex-start;
      padding: 0.9rem 0; position: relative;
    }
    .diamond-time {
      flex-shrink: 0; width: 75px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.15rem; font-weight: 600;
      color: var(--gold-deep); text-align: right;
      padding-top: 0.1rem;
    }
    .diamond-row::before {
      content: ''; position: absolute;
      left: 87px; top: 1.3rem;
      width: 7px; height: 7px;
      border-radius: 50%; background: var(--gold);
      border: 2px solid var(--cream);
    }
    .diamond-row p {
      flex: 1; padding-left: 1.4rem;
      color: var(--text-main); line-height: 1.65;
    }
    .diamond-cta { text-align: center; margin-top: 1rem; }
    @media (max-width: 600px) {
      .diamond-timeline::before { left: 55px; }
      .diamond-row::before { left: 52px; }
      .diamond-time { width: 45px; font-size: 0.95rem; }
    }

    /* v2 badge so it's obvious which version is being viewed */
    .v2-badge {
      position: fixed;
      bottom: 1rem; right: 1rem;
      z-index: 999;
      background: var(--gold);
      color: var(--charcoal);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 0.5rem 0.9rem;
      border-radius: 100px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.15);
      opacity: 0.85;
    }
  `;

  function injectCSS() {
    const style = document.createElement('style');
    style.id = 'v2-overlay-styles';
    style.textContent = V2_CSS;
    document.head.appendChild(style);
  }

  /* ──────── DOM patches for each change ──────────────────────── */

  // CHANGE 3 — replace second CTA + change first CTA text/key.
  function patchHeroCTAs() {
    const calcCta = document.querySelector('a[data-i18n="hero.cta.calc"]');
    if (calcCta) {
      // key stays; we just override the text via the i18n re-apply
    }
    const contactCta = document.querySelector('a[data-i18n="hero.cta.contact"]');
    if (contactCta) {
      contactCta.setAttribute('data-i18n', 'hero.cta.reserve');
    }
  }

  // CHANGE 2 — insert "Häufige Sorgen" section before #calculator-form
  function insertSorgen() {
    if (document.getElementById('sorgen')) return;
    const target = document.getElementById('calculator-form');
    if (!target) return;
    const html = `
      <section id="sorgen">
        <div class="section-head">
          <span class="section-label" data-i18n="sorgen.label">Häufige Sorgen</span>
          <h2 data-i18n-html="sorgen.h2.html">Was sich Eltern<br /><em>oft fragen</em></h2>
          <p data-i18n="sorgen.p">Ehrliche Antworten auf die Fragen, die Sie wahrscheinlich gerade im Kopf haben.</p>
        </div>
        <div class="sorgen-grid">
          ${[1,2,3,4,5,6,7].map(i => `
            <div class="sorgen-item">
              <h4 data-i18n="sorgen.q${i}"></h4>
              <p data-i18n="sorgen.a${i}"></p>
            </div>`).join('')}
        </div>
      </section>`;
    target.insertAdjacentHTML('beforebegin', html);
  }

  // CHANGE 4 — insert "Was Sie sich zurückholen" after #benefits
  function insertZurueck() {
    if (document.getElementById('zurueck')) return;
    const target = document.getElementById('benefits');
    if (!target) return;
    const html = `
      <section id="zurueck">
        <div class="section-head">
          <span class="section-label" data-i18n="zurueck.label">Was Sie sich zurückholen</span>
          <h2 data-i18n-html="zurueck.h2.html">Sie hosten nicht.<br /><em>Sie sind dabei.</em></h2>
          <p data-i18n="zurueck.p"></p>
        </div>
        <div class="zurueck-grid">
          <div class="zurueck-item"><span class="zurueck-icon">☕</span><h4 data-i18n="zurueck.i1.h"></h4><p data-i18n="zurueck.i1.p"></p></div>
          <div class="zurueck-item"><span class="zurueck-icon">📸</span><h4 data-i18n="zurueck.i2.h"></h4><p data-i18n="zurueck.i2.p"></p></div>
          <div class="zurueck-item"><span class="zurueck-icon">🛋</span><h4 data-i18n="zurueck.i3.h"></h4><p data-i18n="zurueck.i3.p"></p></div>
          <div class="zurueck-item"><span class="zurueck-icon">❤</span><h4 data-i18n="zurueck.i4.h"></h4><p data-i18n="zurueck.i4.p"></p></div>
        </div>
      </section>`;
    target.insertAdjacentHTML('afterend', html);
  }

  // CHANGE 7 — premium frame line in configurator section-head
  function insertPremiumFrame() {
    const cf = document.getElementById('calculator-form');
    if (!cf) return;
    const head = cf.querySelector('.section-head');
    if (!head || head.querySelector('.premium-frame')) return;
    const p = document.createElement('p');
    p.className = 'premium-frame';
    p.setAttribute('data-i18n', 'cf.frame');
    head.appendChild(p);
  }

  // CHANGE 5 — three emotional discovery textareas in the form
  function insertDiscoveryQuestions() {
    if (document.getElementById('f-loves')) return;
    const interests = document.getElementById('f-interests');
    if (!interests) return;
    const block = document.createElement('div');
    block.innerHTML = `
      <div class="form-field">
        <label for="f-loves" data-i18n="form.loves">Was liebt Ihr Kind im Moment am meisten?</label>
        <textarea id="f-loves" name="child_loves" rows="2" data-i18n-attr="placeholder:form.loves.ph"></textarea>
      </div>
      <div class="form-field">
        <label for="f-perfect" data-i18n="form.perfect">Wenn der Tag perfekt verläuft, was sehen Sie vor sich?</label>
        <textarea id="f-perfect" name="perfect_day" rows="2" data-i18n-attr="placeholder:form.perfect.ph"></textarea>
      </div>
      <div class="form-field">
        <label for="f-stress" data-i18n="form.stress">Was war Ihr grösster Stress bei vergangenen Kindergeburtstagen?</label>
        <textarea id="f-stress" name="past_stress" rows="2" data-i18n-attr="placeholder:form.stress.ph"></textarea>
      </div>`;
    const interestsField = interests.closest('.form-field');
    if (interestsField && interestsField.parentNode) {
      // insert all three fields immediately after the interests field
      Array.from(block.children).reverse().forEach(child => {
        interestsField.insertAdjacentElement('afterend', child);
      });
    }
  }

  // CHANGE 6 — excitement trial close (range slider)
  function insertExcitementClose() {
    if (document.getElementById('f-excitement')) return;
    const callout = document.querySelector('.form-config-callout');
    if (!callout) return;
    const html = `
      <div class="form-trial-close">
        <label for="f-excitement" data-i18n="form.excitement.label"></label>
        <div class="excitement-scale">
          <input type="range" id="f-excitement" name="excitement_score" min="1" max="10" value="8" />
          <output for="f-excitement" id="excitement-value">8</output>
        </div>
        <p class="form-trial-helper" data-i18n="form.excitement.helper"></p>
      </div>`;
    callout.insertAdjacentHTML('afterend', html);
    const range = document.getElementById('f-excitement');
    const output = document.getElementById('excitement-value');
    if (range && output) {
      range.addEventListener('input', () => { output.value = range.value; });
    }
  }

  // CHANGE 8 — Diamond walk-through after #themen
  function insertDiamondTimeline() {
    if (document.getElementById('diamond-day')) return;
    const target = document.getElementById('themen');
    if (!target) return;
    const rows = [
      ['13:50', 'diamond.t1'],
      ['14:00', 'diamond.t2'],
      ['14:30', 'diamond.t3'],
      ['14:45–17:45', 'diamond.t4'],
      ['17:45', 'diamond.t5'],
      ['18:00', 'diamond.t6'],
    ];
    const html = `
      <section id="diamond-day">
        <div class="section-head">
          <span class="section-label" data-i18n="diamond.label">So sieht ein Diamond-Tag aus</span>
          <h2 data-i18n-html="diamond.h2.html">Ihr Tag,<br /><em>Minute für Minute</em></h2>
          <p data-i18n="diamond.p"></p>
        </div>
        <div class="diamond-timeline">
          ${rows.map(([t, key]) => `
            <div class="diamond-row">
              <span class="diamond-time">${t}</span>
              <p data-i18n="${key}"></p>
            </div>`).join('')}
        </div>
        <p class="diamond-cta">
          <a class="btn btn-primary" href="#calculator-form" data-i18n="diamond.cta">Diamond konfigurieren →</a>
        </p>
      </section>`;
    target.insertAdjacentHTML('afterend', html);
  }

  // small floating badge bottom-right so it's obvious which version you're seeing
  function addV2Badge() {
    if (document.querySelector('.v2-badge')) return;
    const badge = document.createElement('div');
    badge.className = 'v2-badge';
    badge.textContent = 'A/B · v2';
    badge.title = 'Atelier Glanz — Version 2 (emotional-selling A/B)';
    document.body.appendChild(badge);
  }

  /* ──────── boot ─────────────────────────────────────────────── */
  function apply() {
    mergeIntoI18N();
    injectCSS();
    patchHeroCTAs();
    insertZurueck();
    insertSorgen();
    insertPremiumFrame();
    insertDiscoveryQuestions();
    insertExcitementClose();
    insertDiamondTimeline();
    addV2Badge();
    // re-apply translations now that new data-i18n elements exist
    if (typeof window.applyLang === 'function') {
      window.applyLang(window.VB_LANG || 'de');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
