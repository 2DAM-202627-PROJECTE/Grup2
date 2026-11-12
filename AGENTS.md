# AGENTS.md

Static multi-page marketing site (Catalan, brand "Sonora"): plain HTML + Tailwind CSS v4 + Alpine.js, built with Vite. No React, no TypeScript, no backend.

## Commands

```bash
npm install
npm run dev      # serves at http://localhost:5173/Grup2/ (base path is /Grup2/)
npm run build    # outputs to dist/
npm run preview  # preview production build
```

There are no test, lint, or typecheck scripts. Do not invent or run them; verify changes with `npm run build`.

## Critical gotchas

- **Every page must be listed in `vite.config.js` under `build.rollupOptions.input`** or it is silently excluded from `dist/` and GitHub Pages. `contacte.html` is currently linked from the nav but empty and not listed.
- `base: '/Grup2/'` applies in dev too, so use the `/Grup2/` URL, not the server root. Keep it in sync with the GitHub repo name (`2DAM-202627-PROJECTE/Grup2`).
- Alpine.js is loaded from a pinned CDN `<script>` in each HTML file (`3.14.9`), not from npm. It is not in `package.json`; do not add an npm Alpine import.
- `src/main.js` only imports CSS and defines `window.siteUI()`, referenced as `<body x-data="siteUI">`. Put new shared reactive state/methods in that object; page markup reads it directly.
- Header and footer are shared templates: edit `src/plantilles/header.html` / `footer.html`, not the rendered markup in each page. Pages use `<!-- include:header -->` and `<!-- include:footer -->`; a custom Vite plugin (`htmlPlantilles` in `vite.config.js`) injects them in dev and build.
- Shared assets: `public/*` is served at the base root (use `/wave.jpg`); `src/assets/*` is referenced by relative path in HTML and processed by Vite.
- `contacte.html`, `about.html`, etc. are at the repo root, not under `src/`.
- Forms are demo-only: they show a confirmation message and send nothing.

## Structure

- Root `*.html`: pages (`index`, `about`, `faq`, `login`, `register`, and WIP `contacte`).
- `src/main.js`: Alpine state/behaviors; `src/styles.css`: Tailwind theme tokens (`@theme`), global component classes (`.btn-primary`, `.card-surface`, etc.).
- `src/plantilles/`: shared header/footer HTML injected via the `htmlPlantilles` plugin.
- `vite.config.js`: plugin + multi-page input list.
- `.github/workflows/static.yml`: on push to `main`, runs `npm install && npm run build` and deploys `dist/` to GitHub Pages.

## Conventions

- Fixed stack: Vite + Tailwind CSS v4 + Alpine.js only. Do not add other libraries, frameworks, or tools; if a change seems to need one, ask the user for confirmation first.
- Keep UI copy in Catalan and use the shared header/footer templates instead of copying nav/footer markup into pages.
- Prefer the CSS custom properties/utility classes defined in `src/styles.css` over hard-coded colors.
- Update `README.md` page list when adding pages.
