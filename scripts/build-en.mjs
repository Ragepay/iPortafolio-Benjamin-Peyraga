// Genera la versión en inglés (en/index.html) a partir de index.html.
// Uso: node scripts/build-en.mjs
// Si cambiás un texto en index.html, agregá o corregí su traducción acá y volvé a correrlo:
// al final lista los textos que quedaron sin traducir.
import fs from 'node:fs';

const SITE = 'https://benjaminpeyraga.vercel.app';

// Textos visibles (coinciden con el contenido completo de un nodo de texto, sin espacios de los bordes).
const T = {
  'Saltar al contenido': 'Skip to content',
  'Sobre mí': 'About',
  'Emprendimiento': 'Venture',
  'Experiencia': 'Experience',
  'Formación': 'Education',
  'Contacto': 'Contact',
  'Analista Programador en Euroamerica &middot; Fundador de peycode.dev': 'Programmer Analyst at Grupo Euroamerica &middot; Founder of peycode.dev',
  'Construyo productos digitales que generan resultados.': 'I build digital products that deliver results.',
  'Full Stack Developer. Código limpio, resultados reales.': 'Full Stack Developer. Clean code, real results.',
  'Descargar CV': 'Download CV',
  'Ver peycode.dev': 'Visit peycode.dev',
  'Contactame': 'Contact me',
  'Proyectos': 'Projects',
  'Años dev': 'Years coding',
  'Soy': "I'm",
  ', desarrollador Full Stack con base en Argentina. Construyo productos digitales completos: interfaces en React, APIs robustas, bases de datos SQL y NoSQL, y despliegue en la nube con':
    ', a Full Stack developer based in Argentina. I build complete digital products: React interfaces, robust APIs, SQL and NoSQL databases, and cloud deployment on',
  'Me interesa el código limpio, las buenas prácticas y la automatización de procesos. Disfruto resolver problemas reales con soluciones bien pensadas, desde la lógica de negocio hasta la infraestructura.':
    'I care about clean code, good practices and process automation. I enjoy solving real problems with well-thought-out solutions, from business logic to infrastructure.',
  'Hoy trabajo como': 'I currently work as a',
  'Analista Programador en Euroamerica': 'Programmer Analyst at Grupo Euroamerica',
  'y, en paralelo, llevo adelante': 'and, in parallel, I run',
  ', mi emprendimiento de desarrollo de software, donde construyo webs, tiendas online, sistemas a medida y aplicaciones móviles para clientes reales.':
    ', my software development venture, where I build websites, online stores, custom systems and mobile apps for real clients.',
  'Trabajo a diario con inteligencia artificial: la que más uso es': 'I work with AI every day; the one I use the most is',
  ', para programar, revisar código y automatizar tareas, siempre con criterio propio sobre lo que se entrega. Y conecto los sistemas con lo que el negocio ya usa:':
    ', for coding, reviewing code and automating tasks, always applying my own judgment to what gets delivered. I also connect systems with what the business already uses:',
  'WhatsApp, IA dentro de las apps, ARCA, Google Sheets, mails automáticos': 'WhatsApp, AI inside apps, ARCA (Argentine tax agency), Google Sheets, automated emails',
  'y servicios de terceros.': 'and third-party services.',
  'Automatizaciones con n8n y Make': 'Automations with n8n and Make',
  'Integraciones: WhatsApp, IA y ARCA': 'Integrations: WhatsApp, AI and ARCA',
  'Orientado a resultados': 'Results-oriented',
  'Trabajo en equipo': 'Teamwork',
  'Herramientas': 'Tools',
  'Integraciones': 'Integrations',
  'IA en sistemas': 'AI in systems',
  'IA / Vibecoding': 'AI / Vibecoding',
  'Principal': 'Main',
  'Activo': 'Active',
  'Convertimos tu idea en software que genera clientes.': 'We turn your idea into software that brings in customers.',
  'Mi emprendimiento de desarrollo de software. Trabajo directo con cada cliente, de la primera charla al lanzamiento:':
    'My software development venture. I work directly with each client, from the first conversation to launch:',
  'sitios web, tiendas online, sistemas de gestión a medida, aplicaciones móviles, integraciones y automatizaciones':
    'websites, online stores, custom management systems, mobile apps, integrations and automations',
  '. Uso IA para entregar más rápido y a mejor precio, sin resignar código mantenible.':
    '. I use AI to deliver faster and at a better price, without giving up maintainable code.',
  '🧩 Portafolios': '🧩 Portfolios',
  '🌐 Sitios web': '🌐 Websites',
  '🛒 Tiendas online': '🛒 Online stores',
  '⚙️ Web apps y PWA': '⚙️ Web apps & PWA',
  '📱 Apps móviles': '📱 Mobile apps',
  '🤖 IA aplicada': '🤖 Applied AI',
  '⚡ Automatizaciones': '⚡ Automations',
  '🔌 Integraciones': '🔌 Integrations',
  'Visitar peycode.dev': 'Visit peycode.dev',
  'Consultar un proyecto': 'Ask about a project',
  'Cómo trabajo': 'How I work',
  'Relevamiento': 'Discovery',
  'Entiendo el negocio y qué tiene que resolver.': 'I understand the business and what it needs to solve.',
  'Propuesta': 'Proposal',
  'Alcance, precio y plazos claros desde el inicio.': 'Clear scope, price and timeline from day one.',
  'Desarrollo por etapas': 'Development in stages',
  'Entregas parciales para ver avances reales.': 'Partial deliveries to show real progress.',
  'Lanzamiento y soporte': 'Launch and support',
  'Publicación, capacitación y mejoras continuas.': 'Go-live, training and continuous improvements.',
  'Proyectos de clientes': 'Client projects',
  'Demos en vivo': 'Live demos',
  'Servicios': 'Services',
  'Trabajo reciente': 'Recent work',
  'Ver todo en peycode.dev': 'See everything on peycode.dev',
  '● En uso': '● In use',
  'Sitio web · Contable': 'Website · Accounting',
  'Sitio institucional de un estudio contable con más de 50 años en Zárate.': 'Corporate website for an accounting firm with over 50 years in Zárate.',
  'Sistema a medida': 'Custom system',
  'Gestión Contable — Estudio Tuculet': 'Accounting management — Estudio Tuculet',
  '+60 pantallas y 9 servicios integrados: ARCA, cobranzas, WhatsApp e IA.': '60+ screens and 9 integrated services: ARCA (tax agency), collections, WhatsApp and AI.',
  'Web app · Construcción': 'Web app · Construction',
  'Gestión de Obras — Zukowski': 'Construction management — Zukowski',
  'Gastos, IVA y rentabilidad por obra; funciona sin señal y lee facturas con IA.': 'Expenses, VAT and profitability per project; works offline and reads invoices with AI.',
  'Sitio web · Industria': 'Website · Industrial',
  'Sitio web · Streaming': 'Website · Streaming',
  'Conectado a su sistema: 13 obras y 73 fotos publicadas desde la app.': 'Connected to their system: 13 projects and 73 photos published from the app.',
  'Landing · Perfumería': 'Landing page · Perfumes',
  'Catálogo de más de 250 fragancias con pedidos directos por WhatsApp.': 'Catalog of over 250 fragrances with orders placed directly via WhatsApp.',
  'Se actualiza solo: 13 episodios (~28 h) resumidos con IA en 104 capítulos.': 'Updates itself: 13 episodes (~28 h) summarized with AI into 104 chapters.',
  'También:': 'Also:',
  'Axel Peyraga — portafolio': 'Axel Peyraga — portfolio',
  'Sep 2026 — Actualidad': 'Sep 2026 — Present',
  'Analista Programador': 'Programmer Analyst',
  'Formo parte del equipo de sistemas del grupo: analizo, mejoro y hago evolucionar los sistemas internos, desarrollo nuevas funcionalidades y diseño soluciones a medida para las necesidades del negocio. Acompaño cada mejora desde el relevamiento con los usuarios hasta su puesta en producción, optimizando procesos y automatizando tareas del día a día.':
    "I'm part of the group's systems team: I analyze, improve and evolve internal systems, build new features and design custom solutions for business needs. I follow each improvement from requirements gathering with users to production, optimizing processes and automating day-to-day tasks.",
  'Análisis funcional': 'Functional analysis',
  'Desarrollo de sistemas': 'Systems development',
  'Mejora continua': 'Continuous improvement',
  'Soluciones a medida': 'Custom solutions',
  'Automatización': 'Automation',
  '2026 — Actualidad': '2026 — Present',
  'Fundador &amp; Full Stack Developer': 'Founder &amp; Full Stack Developer',
  'Emprendimiento propio de desarrollo de software. Llevo los proyectos de punta a punta: relevamiento con el cliente, propuesta, diseño, desarrollo por etapas, despliegue y soporte. Construyo sitios web, tiendas online, web apps de gestión a medida, automatizaciones y productos SaaS propios.':
    'My own software development venture. I take projects end to end: requirements with the client, proposal, design, staged development, deployment and support. I build websites, online stores, custom management web apps, automations and my own SaaS products.',
  'IA aplicada': 'Applied AI',
  'Trato con clientes': 'Client relations',
  'Jun 2026 — Sep 2026 &nbsp;·&nbsp; 3 meses': 'Jun 2026 — Sep 2026 &nbsp;·&nbsp; 3 months',
  'Desarrollador / IT': 'Developer / IT',
  'Desarrollé desde cero el sistema de gestión del estudio, aprendiendo contabilidad y los procesos del negocio para traducir las necesidades reales en funcionalidades y automatizaciones del trabajo diario. Hoy el estudio es cliente de peycode y sigo sumando mejoras al sistema.':
    "I built the firm's management system from scratch, learning accounting and the firm's processes to turn real needs into features and automations for daily work. The firm is now a peycode client and I keep improving the system.",
  'Contabilidad': 'Accounting',
  'Procesos del negocio': 'Business processes',
  'Oct 2025 — Abr 2026 &nbsp;·&nbsp; 6 meses': 'Oct 2025 — Apr 2026 &nbsp;·&nbsp; 6 months',
  'Desarrollo y mantenimiento del ecosistema digital de Salutte2, implementando nuevas features en el ciclo completo de desarrollo, integrando módulos y servicios, y evolucionando el código existente para adaptarlo a las necesidades del negocio.':
    'Development and maintenance of the Salutte2 digital ecosystem: shipping new features across the full development cycle, integrating modules and services, and evolving existing code to fit business needs.',
  'Ago 2024 — Dic 2024 &nbsp;·&nbsp; 5 meses': 'Aug 2024 — Dec 2024 &nbsp;·&nbsp; 5 months',
  'Participé en 3 simulaciones laborales desarrollando el backend de aplicaciones reales en equipos multidisciplinarios con metodología ágil (Scrum).':
    'Took part in 3 job simulations building the backend of real applications in cross-functional teams using Agile (Scrum).',
  'Ago 2021 — May 2024 &nbsp;·&nbsp; 2 años 9 meses': 'Aug 2021 — May 2024 &nbsp;·&nbsp; 2 years 9 months',
  'Industria': 'Industry',
  'Operario Team Member · Sector Pintura': 'Production Team Member · Paint Shop',
  '3 años en línea de producción aplicando metodología Kaizen, control de calidad y mejora continua. Esta experiencia formó mi disciplina y orientación a resultados que hoy aplico en cada línea de código.':
    'Nearly 3 years on a production line applying Kaizen, quality control and continuous improvement. This experience shaped the discipline and results focus I bring to every line of code.',
  'Control de calidad': 'Quality control',
  'Tecnicatura Universitaria en Programación': 'Associate Degree in Programming',
  'Universidad Tecnológica Nacional (UTN)': 'National Technological University (UTN)',
  'Título Universitario': 'University degree',
  '2021 – 2023 &nbsp;·&nbsp; 5 cuatrimestres': '2021 – 2023 &nbsp;·&nbsp; 5 terms',
  'Carrera de 2 años (1980 hs). Materias: Programación I, II y III, Sistemas de Procesamiento de Datos, Arquitectura y Sistemas Operativos, Diseño y Administración de Bases de Datos, Metodología de Sistemas, Laboratorios de Computación I–IV, Estadística, Inglés I y II, y Práctica Profesional Supervisada.':
    '2-year program (1,980 hours). Courses: Programming I, II and III, Data Processing Systems, Architecture and Operating Systems, Database Design and Administration, Systems Methodology, Computer Labs I–IV, Statistics, English I and II, and a Supervised Professional Internship.',
  'Descargar Analítico': 'Download transcript (Spanish)',
  'Carrera de Desarrollo Full Stack': 'Full Stack Development Program',
  '6 Certificaciones': '6 certifications',
  '2024 – 2025 &nbsp;·&nbsp; 2 semestres (53 semanas)': '2024 – 2025 &nbsp;·&nbsp; 2 semesters (53 weeks)',
  'Desarrollo Web': 'Web Development',
  'Backend I: Desarrollo Avanzado': 'Backend I: Advanced Development',
  'Backend II: Diseño y Arquitectura': 'Backend II: Design and Architecture',
  'Backend III: Testing y Escalabilidad Backend': 'Backend III: Backend Testing and Scalability',
  'Ver certificado de carrera': 'View program certificate',
  'Diplomatura en Desarrollo de Backend': 'University Diploma in Backend Development',
  'Universidad Nacional de Tres de Febrero (UNTREF)': 'National University of Tres de Febrero (UNTREF)',
  'Título obtenido': 'Completed',
  '2025 – 2026 &nbsp;·&nbsp; 2 cuatrimestres': '2025 – 2026 &nbsp;·&nbsp; 2 terms',
  'Diplomatura universitaria con foco en arquitectura de APIs, bases de datos relacionales y no relacionales, seguridad y despliegue de aplicaciones backend.':
    'University diploma focused on API architecture, relational and non-relational databases, security and backend deployment.',
  'Ver diploma': 'View diploma',
  'Diplomatura en IA Aplicada al Trabajo': 'University Diploma in AI Applied to Work',
  'Finalizada · título en trámite': 'Completed · diploma being issued',
  '2026 &nbsp;·&nbsp; 1 cuatrimestre': '2026 &nbsp;·&nbsp; 1 term',
  'Formación práctica en inteligencia artificial aplicada a flujos de trabajo reales: automatización, herramientas de IA generativa, prompting avanzado e integración en proyectos de desarrollo.':
    'Hands-on training in AI applied to real workflows: automation, generative AI tools, advanced prompting and integration into development projects.',
  'Carrera de Data Analytics': 'Data Analytics Program',
  'En curso · 1 de 3 cursos aprobado': 'In progress · 1 of 3 courses passed',
  '2026 &nbsp;·&nbsp; 26 semanas': '2026 &nbsp;·&nbsp; 26 weeks',
  'Carrera orientada a convertir datos en decisiones: modelado y análisis en Excel, visualización y dashboards en Tableau, y consultas SQL para trabajar con bases de datos reales.':
    'A program about turning data into decisions: modeling and analysis in Excel, visualization and dashboards in Tableau, and SQL queries against real databases.',
  'Excel · ver certificado': 'Excel · view certificate',
  'Aprobado': 'Passed',
  'Cursando': 'In progress',
  'Data Analytics con SQL': 'Data Analytics with SQL',
  'Próximo': 'Next',
  'Tramo de Formación Pedagógica': 'Teacher Training Program',
  'UTN — Facultad Regional Avellaneda': 'UTN — Avellaneda Regional School',
  'En curso': 'In progress',
  'Formación docente que habilita para ejercer como profesor de materias técnicas en instituciones educativas de la Provincia de Buenos Aires, complementando mi perfil técnico con herramientas pedagógicas.':
    'Teacher training that qualifies me to teach technical subjects in schools in the Province of Buenos Aires, adding teaching skills to my technical profile.',
  '¿Tenés un proyecto o necesitás un Full Stack Developer?': 'Have a project or need a Full Stack Developer?',
  'Me encanta resolver problemas reales con código limpio. Desde startups hasta empresas establecidas, ayudo a llevar ideas a producción. Si buscás contratar un desarrollo, también podés hacerlo a través de':
    'I love solving real problems with clean code. From startups to established companies, I help take ideas to production. If you want to hire a project, you can also do it through',
  'Teléfono': 'Phone',
  'Escribime': 'Email me',
  'Conectemos': "Let's connect",
  'Ver código': 'See code',
  'Analítico UTN': 'UTN transcript',
  'Diseñado y desarrollado por Benjamín Peyraga &middot; 2026': 'Designed and built by Benjamín Peyraga &middot; 2026',
  'EN': 'ES',
};

// Atributos (alt, title, aria-label, content): valor completo.
const A = {
  'Benjamín Peyraga, Analista Programador en Grupo Euroamerica, Full Stack Developer y fundador de peycode.dev. React, Node.js, SQL e integraciones con IA y WhatsApp. Mirá mi experiencia, formación y emprendimiento.':
    'Benjamín Peyraga, Programmer Analyst at Grupo Euroamerica, Full Stack Developer and founder of peycode.dev. React, Node.js, SQL, and AI and WhatsApp integrations. See my experience, education and venture.',
  'Benjamín Peyraga — Analista Programador y Full Stack Developer': 'Benjamín Peyraga — Programmer Analyst & Full Stack Developer',
  'Analista Programador en Grupo Euroamerica y fundador de peycode.dev. React, Node.js, SQL e integraciones con IA y WhatsApp.':
    'Programmer Analyst at Grupo Euroamerica and founder of peycode.dev. React, Node.js, SQL, and AI and WhatsApp integrations.',
  'Benjamín Peyraga — Analista Programador en Grupo Euroamerica y fundador de peycode.dev': 'Benjamín Peyraga — Programmer Analyst at Grupo Euroamerica and founder of peycode.dev',
  'es_AR': 'en_US',
  'Navegación principal': 'Main navigation',
  'Cambiar tema': 'Toggle theme',
  'Abrir menú': 'Open menu',
  'Por ejemplo, lectura automática de facturas con IA': 'For example, automatic invoice reading with AI',
  'Automatización de trámites y consultas en ARCA': 'Automated filings and queries with ARCA (tax agency)',
  'La IA que más uso': 'The AI I use the most',
  'Servicios': 'Services',
  'Gestión Contable — Estudio Tuculet': 'Accounting management — Estudio Tuculet',
  'Gestión de Obras — Zukowski': 'Construction management — Zukowski',
  'Ver certificado (14/10/2026)': 'View certificate (Oct 14, 2026)',
  'Cerrar': 'Close',
  'Anterior': 'Previous',
  'Siguiente': 'Next',
  'Ver la versión en español': 'View the Spanish version',
  'View the English version': 'View the English version',
};

let s = fs.readFileSync('index.html', 'utf8');
const nl = s.includes('\r\n') ? '\r\n' : '\n';
s = s.replace(/\r\n/g, '\n');

// 1) Idioma, canonical, hreflang, sin JSON-LD (la ficha estructurada queda en la versión en español) y sin el redirect de GitHub Pages.
s = s.replace('<html lang="es">', '<html lang="en">');
s = s.replace(/  <script>if \(location\.hostname === 'ragepay\.github\.io'\)[^\n]*\n/, '');
s = s.replace(/  <!-- Datos estructurados[\s\S]*?<\/script>\n/, '');
s = s.split(`href="${SITE}/"`).join(`href="${SITE}/en/"`);
s = s.split(`content="${SITE}/"`).join(`content="${SITE}/en/"`);

// 2) Rutas relativas: la página vive en /en/.
s = s.replace(/(src|href)="(img|css|js|docs)\//g, '$1="../$2/');
s = s.replace("url('img/", "url('../img/");

// 3) Selector de idioma: en inglés apunta a la versión en español.
s = s.replace('<a href="en/" class="lang-switch" hreflang="en" lang="en" aria-label="View the English version">EN</a>',
  '<a href="../" class="lang-switch" hreflang="es" lang="es" aria-label="Ver la versión en español">ES</a>');

// 4) CV y certificado: el CV en inglés.
s = s.split('../docs/CV-BenjaminPeyraga-2026.pdf').join('../docs/CV-BenjaminPeyraga-2026-EN.pdf');

// 5) Textos y atributos.
const missing = new Set();
s = s.replace(/>([^<>]+)</g, (m, raw) => {
  const t = raw.trim();
  if (!t || !/[A-Za-zÁÉÍÓÚáéíóúñ]/.test(t)) return m;
  if (t in T) return '>' + raw.replace(t, T[t]) + '<';
  return m;
});
s = s.replace(/\b(alt|title|aria-label|content)="([^"]+)"/g, (m, attr, v) => (v in A ? `${attr}="${A[v]}"` : m));

// Revisión: textos que siguen en castellano (acentos, ñ, ¿, palabras frecuentes).
const body = s.slice(s.indexOf('<body'));
for (const m of body.matchAll(/>([^<>]+)</g)) {
  const t = m[1].trim();
  if (/[áéíóúñ¿]|\b(de|con|para|los|las|del|que|una|por|mis?)\b/i.test(t) && !/^(Benjamín|Pachulí|ICE San Martín|Benjamín Peyraga|Estudio Tuculet|Servicios Industriales Zukowski|Grupo Euroamerica|Estudio Contable Tuculet|Somos Esto|Toyota|No Country|Universidad|Coderhouse|Alephoo)/.test(t)) missing.add(t);
}
for (const m of s.matchAll(/\b(?:alt|title|aria-label|content)="([^"]*[áéíóúñ][^"]*)"/g)) if (!/Benjamín|Pachulí|Martín/.test(m[1]) || /\b(de|con|en|y)\b/.test(m[1])) missing.add('@' + m[1]);

fs.mkdirSync('en', { recursive: true });
fs.writeFileSync('en/index.html', nl === '\r\n' ? s.replace(/\n/g, '\r\n') : s);
console.log('en/index.html listo.');
if (missing.size) console.log('Revisar (posible castellano):\n- ' + [...missing].join('\n- '));
