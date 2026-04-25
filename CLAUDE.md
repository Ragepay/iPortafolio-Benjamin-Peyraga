# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build

This is a static portfolio site with no build tooling configured. SCSS must be compiled manually:

```bash
sass scss/main.scss css/styles.css --watch
```

The compiled `css/styles.css` and `css/styles.css.map` are committed alongside the source SCSS.

## Architecture

Single-page portfolio for Benjamín Peyraga (Full Stack Developer). All content lives in `index.html`; no framework or bundler.

**SCSS structure** (`scss/`):
- `main.scss` — entry point, imports everything in order: variables → components → sections → mediaquerys → animations
- `utilities/_variables.scss` — design tokens: dark-mode color palette (names are inverted, e.g. `$gris-claro` is the dark background `#0f172a`), gradient definitions, and the three font families (Outfit, Syne, Space Mono)
- `components/` — nav, header, footer
- `sections/` — one file per section (sobreMi, proyectos, projects-enhanced, experiencia, formacion, contacto)

**JS** (`js/main.js`): vanilla JS only — mobile nav toggle, IntersectionObserver scroll-reveal (`.reveal` → `.reveal--active`), hero parallax on scroll.

**Design system**: dark theme with blue/purple/green accent palette. Bootstrap 5.3 is loaded via CDN for grid/utilities only; most styling is custom SCSS.

## Key conventions

- Section anchors: `#sobre-mi`, `#proyectos`, `#experiencia`, `#formacion`, `#contacto`
- Scroll-reveal: add class `reveal` to any element to animate it in on scroll
- Variable names in `_variables.scss` use inverted semantic names (dark theme) — check comments before assuming what a variable looks like
