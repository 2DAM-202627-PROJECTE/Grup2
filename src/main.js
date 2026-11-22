import './styles.css'
import { initNewsletter, newsletterState } from './newsletter.js'

/* =====================================================
   EDITA AQUÍ ELS TEUS 7 VINILS
   img  → ruta de la foto (quadrada va millor)
   name → nom de l'artista / vinil
   album → nom de l'àlbum
   ===================================================== */
import nextGenImg from './assets/NextGen.png'
import hihiImg from './assets/hihi.png'
import rrImg from './assets/rr.png'
import gutsImg from './assets/guts.png'
import estopaImg from './assets/estopa.png'
import feelSpecialImg from './assets/feelSpecial.png'
import californicationImg from './assets/Californication.png'

const VINYLS = [
  { img: nextGenImg, name: 'Bring Me The Horizon', album: 'Next Gen' },
  { img: hihiImg, name: 'Michael Jackson', album: 'Thriller' },
  { img: rrImg, name: 'Rammstein', album: 'Sehnsucht' },
  { img: gutsImg, name: 'Olivia Rodrigo', album: 'GUTS' },
  { img: estopaImg, name: 'Estopa', album: 'Estopa' },
  { img: feelSpecialImg, name: 'Twice', album: 'Feel Special' },
  { img: californicationImg, name: 'Red Hot Chili Peppers', album: 'Californication' },
]

window.siteUI = () => ({
  menuOpen: false,
  openFaq: null,
  formDone: false,
  ...newsletterState(),
  toggleFaq(id) { this.openFaq = this.openFaq === id ? null : id },
})

initNewsletter()

/* ---------- Carrusel de vinils (només s'executa si existeix #phone a la pàgina) ---------- */
const SLIDE_MS = 650;   // temps mínim entre un vinil i el següent
const SWIPE_PX = 40;    // quant cal arrossegar el dit per canviar

const phone = document.getElementById('phone');
const viewport = document.getElementById('viewport');
const strip = document.getElementById('strip');
const dotsBox = document.getElementById('dots');
const hudCount = document.getElementById('hud-count');
const hint = document.getElementById('hint');
const hudName = document.getElementById('hud-name');
const hudAlbum = document.getElementById('hud-album');
const hudBar = document.getElementById('hud-bar');

if (phone && viewport && strip && dotsBox && hudCount && hint && hudName && hudAlbum && hudBar) {
  const N = VINYLS.length;
  const pad = n => String(n).padStart(2, '0');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const slides = VINYLS.map((v, i) => {
    const s = document.createElement('div');
    s.className = 'slide flex h-full w-full shrink-0 items-center justify-center px-6 pb-36 pt-16';
    s.innerHTML = `
      <div class="content flex w-full flex-col items-center">
        <div class="vinyl-wrap mx-auto w-[180px]">
          <div class="disc">
            <img src="${v.img}" alt="${v.album}" onerror="this.style.display='none'">
            <div class="grooves"></div><div class="shine"></div>
            <div class="label"></div><div class="hole"></div>
          </div>
        </div>
      </div>`;
    strip.appendChild(s);

    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('aria-label', v.album);
    d.addEventListener('click', () => go(i));
    dotsBox.appendChild(d);
    return s;
  });
  const dots = [...dotsBox.children];

  let index = 0, lockUntil = 0;
  function go(i) {
    index = clamp(i, 0, N - 1);
    strip.style.transform = `translateY(-${index * 100}%)`;
    lockUntil = performance.now() + SLIDE_MS;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === index));
    dots.forEach((d, k) => {
      d.classList.toggle('on', k === index);
      if (k === index) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    hudCount.textContent = `${pad(index + 1)} / ${pad(N)}`;
    hudName.textContent = VINYLS[index].name;
    hudAlbum.textContent = VINYLS[index].album;
    hudBar.style.width = `${((index + 1) / N) * 100}%`;
    hint.style.opacity = index === N - 1 ? 0 : 1;
  }

  phone.addEventListener('wheel', e => {
    const dy = e.deltaY;
    if (!dy) return;
    const now = performance.now();

    if (now < lockUntil) {
      e.preventDefault();
      lockUntil = Math.max(lockUntil, now + 140);
      return;
    }
    const next = index + Math.sign(dy);
    if (next < 0 || next >= N) return;
    e.preventDefault();
    go(next);
  }, { passive: false });

  let y0 = null, done = false;
  phone.addEventListener('touchstart', e => { y0 = e.touches[0].clientY; done = false; }, { passive: true });
  phone.addEventListener('touchmove', e => {
    const dy = y0 - e.touches[0].clientY;
    if (Math.abs(dy) < 8) return;
    const next = index + Math.sign(dy);
    const edge = next < 0 || next >= N;
    if (edge && !done) return;
    e.preventDefault();
    if (!done && Math.abs(dy) > SWIPE_PX && performance.now() >= lockUntil) {
      done = true;
      go(next);
    }
  }, { passive: false });

  phone.tabIndex = 0;
  phone.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); go(index - 1); }
  });

  go(0);
}

const alpine = document.createElement('script')
alpine.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js'
document.head.append(alpine)
