# Portafolio de Benjamín Peyraga

Sitio personal: **https://benjaminpeyraga.vercel.app** (inglés en /en/)

Analista Programador en Euroamerica y fundador de [peycode.dev](https://peycode.dev).
Los proyectos de clientes están en el [portafolio de peycode](https://peycode.dev/portafolio).

## Secciones

1. Sobre mí: perfil y tecnologías.
2. Emprendimiento: peycode, servicios y trabajos recientes.
3. Experiencia.
4. Formación: UTN, UNTREF y Coderhouse, con certificados y analítico.
5. Contacto.

## Técnico

- HTML, CSS y JavaScript sin dependencias ni build (`index.html`, `css/`, `js/`, `img/`, `docs/`).
- Publicado en Vercel desde la rama `main`.
- La dirección vieja (`ragepay.github.io/iPortafolio-Benjamin-Peyraga`) redirige a la nueva.
- Para verlo localmente: `python -m http.server` y abrir http://localhost:8000.

## Versión en inglés y CV

- `en/index.html` se genera con `node scripts/build-en.mjs` a partir de `index.html`. Si cambiás un texto,
  agregá su traducción en ese script y volvé a correrlo: al final lista lo que quedó sin traducir.
- Los CV salen de `docs/cv/cv.html` (español) y `docs/cv/cv-en.html` (inglés): abrir en Chrome, Imprimir,
  Guardar como PDF, A4, márgenes "Ninguno" y "Gráficos de fondo". Se guardan como
  `docs/CV-BenjaminPeyraga-2026.pdf` y `docs/CV-BenjaminPeyraga-2026-EN.pdf`.
