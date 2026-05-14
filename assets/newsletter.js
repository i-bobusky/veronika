/* ─── Newsletter signup handler ─────────────────────────────────
   Submits each .nl-form on the page.

   DEFAULT BEHAVIOUR
   -----------------
   - Posts to Web3Forms (the same endpoint as the inquiry form).
   - On success: hides the form, shows the .nl-success message.
   - Veronika receives an e-mail at events@atelier-glanz.ch and
     manually moves the subscriber into her newsletter tool.

   FALLBACK
   --------
   - If the access_key is still the placeholder, opens a mailto:
     draft instead so testing works pre-deployment.

   MIGRATION TO MAILERLITE / BREVO / CONVERTKIT
   --------------------------------------------
   See docs/NEWSLETTER.md for full instructions.
   Short version: swap the form's `action` URL to the one from the
   chosen provider and rename inputs to match what they expect.
   This script keeps working for any provider that returns 2xx.
   ───────────────────────────────────────────────────────────── */
(function () {
  function bind(form) {
    if (form.dataset.nlBound === '1') return;
    form.dataset.nlBound = '1';
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.botcheck && form.botcheck.checked) return;
      const button = form.querySelector('button[type="submit"]');
      const accessKeyInput = form.querySelector('input[name="access_key"]');
      // success element lives next to the form (sibling under .nl-inner)
      const inner = form.closest('.nl-inner') || form.parentElement;
      const successEl = inner ? inner.querySelector('.nl-success') : null;
      const accessKey = accessKeyInput ? accessKeyInput.value : '';
      const isPlaceholder = accessKey === 'WEB3FORMS_ACCESS_KEY_HERE' || !accessKey;

      // Mailto fallback when Web3Forms isn't configured yet
      if (isPlaceholder && /web3forms/.test(form.action)) {
        const email = form.querySelector('input[name="email"]')?.value || '';
        const firstname = form.querySelector('input[name="firstname"]')?.value || '';
        const subject = 'Newsletter-Anmeldung — Atelier Glanz';
        const body = 'Bitte zur Newsletter-Liste hinzufügen:\n\nE-Mail: ' + email +
                     (firstname ? '\nName: ' + firstname : '');
        window.location.href = 'mailto:events@atelier-glanz.ch?subject=' +
                                encodeURIComponent(subject) +
                                '&body=' + encodeURIComponent(body);
        return;
      }

      if (button) button.disabled = true;
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
        let ok = res.ok;
        // Some providers return JSON, some don't. Treat any 2xx as success.
        try {
          const data = await res.clone().json();
          if (data && data.success === false) ok = false;
        } catch (_) {}
        if (ok) {
          form.style.display = 'none';
          if (successEl) successEl.hidden = false;
        } else {
          if (button) button.disabled = false;
          const msg = (window.t ? window.t('nl.error') : null) ||
                      'Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an events@atelier-glanz.ch.';
          alert(msg);
        }
      } catch (err) {
        if (button) button.disabled = false;
        const msg = (window.t ? window.t('nl.error') : null) ||
                    'Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an events@atelier-glanz.ch.';
        alert(msg);
      }
    });
  }

  function init() {
    document.querySelectorAll('.nl-form').forEach(bind);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
