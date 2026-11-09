# Landing page — Vite + Tailwind CSS + Alpine.js

Projecte convertit a JavaScript sense React ni TypeScript.

## Requisits
- Node.js 20.19+ o 22.12+
- npm

## Instal·lació i execució
```bash
npm install
npm run dev
```

## Compilar per a producció
```bash
npm run build
npm run preview
```

## Estructura
- `index.html`: landing principal.
- `about.html`, `faq.html`, `guia-estil.html`, `login.html`, `register.html`: pàgines addicionals.
- `src/main.js`: inicialització d'Alpine.js i comportaments interactius.
- `src/styles.css`: Tailwind CSS v4 i estils globals.
- `vite.config.js`: configuració de Vite i Tailwind.
- `public/wave.jpg`: recurs gràfic de la plantilla.

Els formularis són demostratius: mostren un missatge de confirmació, però no envien dades a cap servidor.
