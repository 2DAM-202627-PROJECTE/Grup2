// cookies.js — Bàner de cookies (Alpine.js + Tailwind)
// Cal carregar-lo ABANS d'Alpine i amb "defer".

const GA_ID = 'G-XXXXXXXXXX'; // <-- canvia-ho pel teu ID de Google Analytics
const POLICY_URL = 'politica_cookies.html';

document.addEventListener('alpine:init', () => {
  Alpine.data('cookieBanner', () => ({
    show: false,

    init() {
    const isPolicyPage = location.pathname.includes('politica_cookies');
    try {
      const c = localStorage.getItem('cookie-consent');
      if (c === 'accepted') this.loadAnalytics();
      else if (!c && !isPolicyPage) this.show = true;
    } catch (e) {
      if (!isPolicyPage) this.show = true;
    }
    // Permet reobrir el bàner des del peu de pàgina o des de la política
    window.addEventListener('open-cookies', () => (this.show = true));
  },

    set(value) {
      try { localStorage.setItem('cookie-consent', value); } catch (e) {}
      this.show = false;
      if (value === 'accepted') this.loadAnalytics();
    },

    loadAnalytics() {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', GA_ID);
    },
  }));
});

// Injecta el bàner a qualsevol pàgina que carregui aquest fitxer
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '[x-cloak]{display:none !important}';
  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div x-data="cookieBanner" x-show="show" x-cloak x-transition
         class="fixed inset-x-0 bottom-0 z-50 bg-gray-900 p-4 text-white shadow-lg">
      <div class="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm">
          Fem servir cookies pròpies i de tercers per analitzar l'ús del web.
          Més informació a la
          <a href="${POLICY_URL}" target="_blank" rel="noopener" class="text-sky-300 underline">política de cookies</a>
        </p>
        <div class="flex gap-2">
          <button @click="set('rejected')"
                  class="rounded border border-white px-4 py-2 text-sm hover:bg-white/10">
            Rebutjar
          </button>
          <button @click="set('accepted')"
                  class="rounded border border-white bg-white px-4 py-2 text-sm text-gray-900 hover:bg-gray-200">
            Acceptar
          </button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(wrapper.firstElementChild);
});
// Qualsevol element amb data-open-cookies reobre el bàner
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-cookies]')) {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookies'));
  }
});