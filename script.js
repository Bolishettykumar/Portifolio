/* =========================================================
   Srinivaskumar Bolishetty — Portfolio
   Vanilla JavaScript (ES6+) · no frameworks, no build step
   ========================================================= */

'use strict';

/* =========================================================
   1. CENTRAL CONFIGURATION
   ---------------------------------------------------------
   Edit the portfolio content here. Skills, Projects,
   Experience, Education, Certifications and Contact are
   rendered from this object. Empty strings ('') mean
   "not provided" and are hidden (or shown as marked
   placeholders where noted).
   ========================================================= */
const CONFIG = {
  personal: {
    name: 'Srinivaskumar Bolishetty',
    title: 'Software Developer | Java Developer | Full Stack Developer',
    phone: '+91 9390271345',
    location: 'Hyderabad, Telangana, India',
    // TODO: add your email address, e.g. 'name@example.com'.
    // While empty, the email row is hidden from the Contact section.
    email: '',
  },

  social: {
    github: 'https://github.com/Bolishettykumar',
    linkedin: 'https://www.linkedin.com/in/bolishetty-srinivas-kumar-849369263/',
  },

  // Words cycled by the hero typing animation
  typingRoles: ['Software Developer', 'Java Developer', 'Full Stack Developer'],

  skills: [
    { category: 'Programming Languages', icon: 'i-code', items: ['Java', 'Python (Basic)', 'JavaScript'] },
    { category: 'Frontend Development', icon: 'i-layout', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js'] },
    { category: 'Backend Development', icon: 'i-server', items: ['Java', 'Spring Boot', 'Node.js', 'Express.js'] },
    // Add other database technologies here only once verified (e.g. 'MongoDB', 'MySQL').
    { category: 'Database', icon: 'i-database', items: ['SQL'] },
    { category: 'Tools', icon: 'i-wrench', items: ['Git', 'GitHub', 'Visual Studio Code'] },
    { category: 'Core Concepts', icon: 'i-cpu', items: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'REST APIs'] },
  ],

  // Exactly two projects, as specified.
  projects: [
    {
      title: 'QuickStay – Hotel Booking Application',
      kind: 'Full-stack · MERN',
      description:
        'QuickStay is a hotel booking application developed using the MERN stack. The project demonstrates full-stack web development using a React frontend, Node.js and Express backend, and MongoDB database.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      github: 'https://github.com/Bolishettykumar/MERN-STACK---QuickStay-Hotel-Booking-Application',
      thumbnail: 'hotel', // built-in illustration
      // Optional real screenshot, e.g. 'assets/images/quickstay.png'. Overrides the illustration.
      image: '',
      imageAlt: 'Screenshot of the QuickStay hotel booking application',
    },
    {
      title: 'Lane Line Detection for Autonomous Vehicles',
      kind: 'Computer vision',
      description:
        'A computer vision project that detects road lane lines in video frames using image processing techniques. The project explores road-scene processing through Python and OpenCV.',
      tech: ['Python', 'OpenCV', 'Canny Edge Detection', 'Gaussian Smoothing'],
      github: 'https://github.com/Bolishettykumar/LANE-LINE-DETECTION',
      thumbnail: 'lane',
      image: '', // e.g. 'assets/images/lane-detection-output.png'
      imageAlt: 'Output frame from the lane line detection project with detected lanes highlighted',
    },
  ],

  experience: [
    {
      company: 'Trailbliz',
      role: 'Software Developer and Instructor',
      location: 'Hyderabad, Telangana, India',
      start: "Jun '26",
      end: '', // empty = "Present"
      // Key figures shown as stat tiles above the bullet points
      highlights: [
        { value: '25+', label: 'Coding exercises, assignments & mini projects' },
        { value: '100+', label: 'Hours of technical training' },
        { value: '150+', label: 'Undergraduate engineering students' },
      ],
      responsibilities: [
        'Applied core Java, OOP concepts, and Data Structures & Algorithms to design and build 25+ coding exercises, assignments, and mini projects, reinforcing hands-on programming and debugging skills.',
        'Delivered 100+ hours of technical training to 150+ undergraduate engineering students, translating complex programming concepts into practical, code-first learning sessions.',
        "Designed structured lesson plans and problem-solving frameworks that improved students' coding proficiency and placement readiness.",
      ],
      tags: ['Java', 'OOP', 'Data Structures & Algorithms', 'Technical Training', 'Curriculum Design'],
    },
  ],

  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science Engineering',
    specialization: 'Artificial Intelligence',
    university: 'Parul University',
    graduationYear: '2026',
    cgpa: '', // optional — hidden while empty, e.g. '8.5 / 10'
  },

  certifications: [
    // credentialUrl: add a real verification link; left empty, no link is shown.
    { name: 'Database & SQL', issuer: 'Infosys Springboard', icon: 'i-database', credentialUrl: '' },
    { name: 'Computer Networking', issuer: 'NPTEL, IIT Madras', icon: 'i-network', credentialUrl: '' },
    { name: 'Operating Systems', issuer: 'Cisco', icon: 'i-monitor', credentialUrl: '' },
  ],
};

/* =========================================================
   2. Helpers
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Escape text before inserting it into HTML templates. */
const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;
const EXTERNAL = 'target="_blank" rel="noopener noreferrer"';
const pad = (n) => String(n).padStart(2, '0');

/* =========================================================
   3. Bind personal details & social links
   ========================================================= */
function bindPersonal() {
  $$('[data-config]').forEach((el) => {
    const value = CONFIG.personal[el.dataset.config];
    if (value) el.textContent = value;
  });
  $$('[data-link]').forEach((el) => {
    const url = CONFIG.social[el.dataset.link];
    if (url) el.href = url;
  });
}

/* =========================================================
   4. Renderers
   ========================================================= */
function renderMarquee() {
  const track = $('#marqueeTrack');
  if (!track) return;
  // Unique skills, shown twice so the loop is seamless (once if motion is reduced)
  const unique = [...new Set(CONFIG.skills.flatMap((g) => g.items.map((i) => i.replace(/\s*\(.+\)$/, ''))))];
  const row = unique.map((s) => `<span class="marquee-item">${esc(s)}</span>`).join('');
  track.innerHTML = reducedMotion() ? row : row + row;
}

function renderSkills() {
  const list = $('#skillsGrid');
  if (!list) return;
  list.innerHTML = CONFIG.skills
    .map(
      (group, i) => `
      <div class="skill-row reveal">
        <span class="skill-num">${pad(i + 1)}</span>
        <div class="skill-cat">${icon(group.icon)}<h3>${esc(group.category)}</h3></div>
        <ul class="tags" aria-label="${esc(group.category)}">
          ${group.items
            .map((item) => {
              const m = item.match(/^(.*?)\s*(\(.+\))$/); // soften notes like "(Basic)"
              return m
                ? `<li class="tag">${esc(m[1])}<span class="tag-note">${esc(m[2])}</span></li>`
                : `<li class="tag">${esc(item)}</li>`;
            })
            .join('')}
        </ul>
      </div>`
    )
    .join('');
}

/* --- Project thumbnail illustrations (inline SVG, no image assets) --- */
const THUMBNAILS = {
  hotel: () => `
  <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a hotel booking interface">
    <defs>
      <linearGradient id="hb-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#121a2e"/><stop offset="1" stop-color="#1b1433"/></linearGradient>
      <linearGradient id="hb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
      <linearGradient id="hb-btn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#hb-bg)"/>
    <g opacity="0.25" stroke="#ffffff" stroke-opacity="0.12">
      <path d="M0 80H640M0 160H640M0 240H640M0 320H640M128 0V400M256 0V400M384 0V400M512 0V400"/>
    </g>
    <!-- Browser window -->
    <rect x="70" y="52" width="420" height="300" rx="16" fill="#0e1320" stroke="#ffffff" stroke-opacity="0.12"/>
    <circle cx="94" cy="74" r="5" fill="#ff5f57"/><circle cx="110" cy="74" r="5" fill="#febc2e"/><circle cx="126" cy="74" r="5" fill="#28c840"/>
    <rect x="150" y="66" width="190" height="16" rx="8" fill="#ffffff" fill-opacity="0.06"/>
    <!-- Hero image of hotel -->
    <rect x="90" y="98" width="380" height="132" rx="10" fill="url(#hb-sky)" opacity="0.9"/>
    <circle cx="420" cy="128" r="16" fill="#fde68a" opacity="0.85"/>
    <g fill="#0e1320" fill-opacity="0.85">
      <rect x="150" y="140" width="80" height="90"/>
      <rect x="240" y="118" width="96" height="112"/>
      <rect x="346" y="152" width="62" height="78"/>
    </g>
    <g fill="#fde68a" fill-opacity="0.75">
      <rect x="160" y="152" width="12" height="10"/><rect x="182" y="152" width="12" height="10"/><rect x="204" y="152" width="12" height="10"/>
      <rect x="160" y="174" width="12" height="10"/><rect x="204" y="174" width="12" height="10"/>
      <rect x="252" y="130" width="14" height="10"/><rect x="278" y="130" width="14" height="10"/><rect x="304" y="130" width="14" height="10"/>
      <rect x="252" y="152" width="14" height="10"/><rect x="304" y="152" width="14" height="10"/>
      <rect x="278" y="174" width="14" height="10"/><rect x="252" y="196" width="14" height="10"/>
      <rect x="356" y="164" width="12" height="10"/><rect x="384" y="164" width="12" height="10"/><rect x="356" y="186" width="12" height="10"/>
    </g>
    <!-- Room list rows -->
    <g>
      <rect x="90" y="246" width="185" height="88" rx="10" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.08"/>
      <rect x="102" y="258" width="56" height="64" rx="7" fill="#3b82f6" fill-opacity="0.5"/>
      <rect x="168" y="262" width="90" height="9" rx="4.5" fill="#ffffff" fill-opacity="0.55"/>
      <rect x="168" y="280" width="64" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.22"/>
      <rect x="168" y="303" width="44" height="12" rx="6" fill="#8b5cf6" fill-opacity="0.6"/>
      <rect x="285" y="246" width="185" height="88" rx="10" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.08"/>
      <rect x="297" y="258" width="56" height="64" rx="7" fill="#8b5cf6" fill-opacity="0.5"/>
      <rect x="363" y="262" width="90" height="9" rx="4.5" fill="#ffffff" fill-opacity="0.55"/>
      <rect x="363" y="280" width="64" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.22"/>
      <rect x="363" y="303" width="44" height="12" rx="6" fill="#3b82f6" fill-opacity="0.6"/>
    </g>
    <!-- Floating reservation card -->
    <g>
      <rect x="390" y="150" width="196" height="196" rx="16" fill="#151b2b" stroke="#a78bfa" stroke-opacity="0.35"/>
      <rect x="410" y="170" width="80" height="10" rx="5" fill="#ffffff" fill-opacity="0.75"/>
      <rect x="410" y="196" width="72" height="40" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12"/>
      <rect x="494" y="196" width="72" height="40" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12"/>
      <rect x="420" y="206" width="30" height="6" rx="3" fill="#ffffff" fill-opacity="0.3"/>
      <rect x="420" y="220" width="46" height="7" rx="3.5" fill="#60a5fa" fill-opacity="0.8"/>
      <rect x="504" y="206" width="30" height="6" rx="3" fill="#ffffff" fill-opacity="0.3"/>
      <rect x="504" y="220" width="46" height="7" rx="3.5" fill="#a78bfa" fill-opacity="0.8"/>
      <g fill="#ffffff" fill-opacity="0.12">
        <rect x="410" y="248" width="20" height="16" rx="4"/><rect x="434" y="248" width="20" height="16" rx="4"/><rect x="458" y="248" width="20" height="16" rx="4" fill="#3b82f6" fill-opacity="0.7"/>
        <rect x="482" y="248" width="20" height="16" rx="4" fill="#3b82f6" fill-opacity="0.45"/><rect x="506" y="248" width="20" height="16" rx="4" fill="#8b5cf6" fill-opacity="0.7"/><rect x="530" y="248" width="20" height="16" rx="4"/>
        <rect x="410" y="268" width="20" height="16" rx="4"/><rect x="434" y="268" width="20" height="16" rx="4"/><rect x="458" y="268" width="20" height="16" rx="4"/>
        <rect x="482" y="268" width="20" height="16" rx="4"/><rect x="506" y="268" width="20" height="16" rx="4"/><rect x="530" y="268" width="20" height="16" rx="4"/>
      </g>
      <rect x="410" y="300" width="156" height="30" rx="15" fill="url(#hb-btn)"/>
      <rect x="456" y="311" width="64" height="8" rx="4" fill="#ffffff" fill-opacity="0.9"/>
    </g>
  </svg>`,

  lane: () => `
  <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a road with detected lane lines highlighted">
    <defs>
      <linearGradient id="ld-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#334155"/></linearGradient>
      <linearGradient id="ld-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f3a"/><stop offset="1" stop-color="#15181f"/></linearGradient>
      <linearGradient id="ld-lane" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34d399" stop-opacity="0.05"/><stop offset="1" stop-color="#34d399" stop-opacity="0.38"/></linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#ld-sky)"/>
    <!-- distant hills -->
    <path d="M0 196 Q90 150 180 180 T360 172 T520 168 T640 184 V210 H0Z" fill="#0f172a" opacity="0.8"/>
    <rect y="200" width="640" height="200" fill="#1a2a22"/>
    <!-- road -->
    <path d="M296 200 H344 L620 400 H20 Z" fill="url(#ld-road)"/>
    <!-- painted lane markings -->
    <path d="M300 200 L44 400" stroke="#fde047" stroke-width="5" opacity="0.8"/>
    <path d="M340 200 L596 400" stroke="#f8fafc" stroke-width="5" opacity="0.8"/>
    <g stroke="#f8fafc" stroke-opacity="0.55" stroke-linecap="round">
      <path d="M320 206 L320 216" stroke-width="2"/>
      <path d="M320 232 L320 250" stroke-width="3"/>
      <path d="M320 276 L320 306" stroke-width="4"/>
      <path d="M320 340 L320 392" stroke-width="5"/>
    </g>
    <!-- CV overlay: detected lane area + fitted lines -->
    <path d="M304 214 H336 L566 386 H74 Z" fill="url(#ld-lane)"/>
    <path d="M304 214 L74 386" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
    <path d="M336 214 L566 386" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
    <!-- region of interest -->
    <path d="M270 206 H370 L630 396 H10 Z" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7"/>
    <!-- HUD corners -->
    <g stroke="#e2e8f0" stroke-opacity="0.6" stroke-width="2" fill="none">
      <path d="M20 40 V20 H40"/><path d="M600 20 H620 V40"/><path d="M20 360 V380 H40"/><path d="M620 360 V380 H600"/>
    </g>
    <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="13" fill="#e2e8f0">
      <rect x="420" y="36" width="168" height="54" rx="8" fill="#0b0d12" fill-opacity="0.65" stroke="#ffffff" stroke-opacity="0.12"/>
      <text x="434" y="58" fill="#a78bfa">Gaussian smoothing</text>
      <text x="434" y="78" fill="#94a3b8">→ Canny edges</text>
    </g>
  </svg>`,
};

function renderProjects() {
  const wrap = $('#projectsGrid');
  if (!wrap) return;
  wrap.innerHTML = CONFIG.projects
    .map((p, i) => {
      const media = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" loading="lazy" decoding="async" width="640" height="400" />`
        : `${(THUMBNAILS[p.thumbnail] || THUMBNAILS.hotel)()}<span class="media-label">Illustration</span>`;
      return `
      <article class="project spot${i % 2 ? ' is-reversed' : ''} reveal">
        <div class="project-media">${media}</div>
        <div class="project-body">
          <div class="project-top">
            <span class="project-num">${pad(i + 1)}</span>
            <span class="project-kind">${esc(p.kind || '')}</span>
          </div>
          <h3 class="project-title">${esc(p.title)}</h3>
          <p class="project-desc">${esc(p.description)}</p>
          <ul class="tags" aria-label="Technologies used">
            ${p.tech.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}
          </ul>
          <div class="project-actions">
            <a class="btn btn-ghost" href="${esc(p.github)}" ${EXTERNAL}
               aria-label="View ${esc(p.title)} on GitHub (opens in a new tab)">
              ${icon('i-github')}<span>View on GitHub</span>${icon('i-arrow-up-right')}
            </a>
          </div>
        </div>
      </article>`;
    })
    .join('');
}

function renderExperience() {
  const list = $('#timeline');
  if (!list) return;
  const placeholder = (text) => `<span class="placeholder">${esc(text)}</span>`;

  list.innerHTML = CONFIG.experience
    .map((job) => {
      const role = job.role ? esc(job.role) : placeholder('Job title — to be added');
      const dates =
        job.start || job.end ? `${esc(job.start || '—')} – ${esc(job.end || 'Present')}` : placeholder('Dates — to be added');
      // Emphasise figures such as "25+" or "100+" inside each bullet
      const withFigures = (text) => esc(text).replace(/(\d+\+)/g, '<strong class="figure">$1</strong>');
      const points = job.responsibilities?.length
        ? job.responsibilities.map((r) => `<li>${withFigures(r)}</li>`).join('')
        : `<li>${placeholder('Responsibilities — to be added')}</li>`;

      const stats = job.highlights?.length
        ? `<dl class="exp-stats">${job.highlights
            .map((h) => `<div class="exp-stat"><dt>${esc(h.label)}</dt><dd>${esc(h.value)}</dd></div>`)
            .join('')}</dl>`
        : '';

      const tags = job.tags?.length
        ? `<ul class="tags exp-tags" aria-label="Skills used">${job.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>`
        : '';

      const current = (job.start || job.end) && !job.end
        ? `<span class="exp-current"><span class="pulse" aria-hidden="true"></span>Current role</span>`
        : '';

      return `
      <li class="exp reveal">
        <div class="exp-meta">
          <span class="exp-dates">${icon('i-calendar')}${dates}</span>
          <span class="exp-line" aria-hidden="true"></span>
          ${current}
          ${job.location ? `<span class="exp-location">${icon('i-pin')}${esc(job.location)}</span>` : ''}
        </div>
        <article class="tile exp-card spot">
          <div class="exp-head">
            <span class="tile-icon">${icon('i-briefcase')}</span>
            <div>
              <h3 class="exp-company">${role}</h3>
              <p class="exp-role">${esc(job.company)}</p>
            </div>
          </div>
          ${stats}
          <ul class="exp-points">${points}</ul>
          ${tags}
        </article>
      </li>`;
    })
    .join('');
}

function renderEducation() {
  const box = $('#educationCard');
  if (!box) return;
  const e = CONFIG.education;
  box.innerHTML = `
    <article class="tile edu spot reveal">
      <div class="edu-main">
        <span class="tile-icon">${icon('i-grad')}</span>
        <h3 class="edu-degree">${esc(e.degree)}</h3>
        <p class="edu-spec">${esc(e.field)} <em class="serif">(${esc(e.specialization)})</em></p>
        <p class="edu-uni">${icon('i-pin')}${esc(e.university)}</p>
        ${e.cgpa ? `<p class="edu-uni">CGPA: ${esc(e.cgpa)}</p>` : ''}
      </div>
      <div class="edu-year">
        <span class="tile-label">Graduation</span>
        <strong>${esc(e.graduationYear)}</strong>
      </div>
    </article>`;
}

function renderCertifications() {
  const grid = $('#certsGrid');
  if (!grid) return;
  grid.innerHTML = CONFIG.certifications
    .map(
      (c, i) => `
      <article class="tile cert spot reveal" style="--reveal-delay:${i * 100}ms">
        <div class="cert-top">
          <span class="tile-icon">${icon(c.icon || 'i-award')}</span>
          <span class="cert-idx">${pad(i + 1)} / ${pad(CONFIG.certifications.length)}</span>
        </div>
        <h3>${esc(c.name)}</h3>
        <p class="cert-issuer">${esc(c.issuer)}</p>
        ${
          c.credentialUrl
            ? `<a class="cert-link" href="${esc(c.credentialUrl)}" ${EXTERNAL}
                 aria-label="Verify ${esc(c.name)} credential (opens in a new tab)">Verify credential ${icon('i-arrow-up-right')}</a>`
            : ''
        }
      </article>`
    )
    .join('');
}

function renderContact() {
  const list = $('#contactList');
  if (!list) return;
  const { phone, email, location } = CONFIG.personal;
  const { github, linkedin } = CONFIG.social;
  const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  const items = [
    { href: `tel:${phone.replace(/[^\d+]/g, '')}`, icon: 'i-phone', label: 'Phone', value: phone },
    email && { href: `mailto:${email}`, icon: 'i-mail', label: 'Email', value: email },
    { href: linkedin, icon: 'i-linkedin', label: 'LinkedIn', value: 'Srinivaskumar Bolishetty', external: true },
    { href: github, icon: 'i-github', label: 'GitHub', value: pretty(github), external: true },
    { icon: 'i-pin', label: 'Location', value: location },
  ].filter(Boolean);

  list.innerHTML = items
    .map((it) => {
      const inner = `
        <span class="tile-icon">${icon(it.icon)}</span>
        <span class="contact-text"><small>${it.label}</small><span>${esc(it.value)}</span></span>
        ${it.href ? `<span class="contact-arrow">${icon('i-arrow-up-right')}</span>` : ''}`;
      if (!it.href) return `<li><div class="contact-link">${inner}</div></li>`;
      const ext = it.external ? `${EXTERNAL} aria-label="${it.label}: ${esc(it.value)} (opens in a new tab)"` : '';
      return `<li><a class="contact-link" href="${esc(it.href)}" ${ext}>${inner}</a></li>`;
    })
    .join('');
}

/* =========================================================
   5. Navigation: mobile menu + smooth scrolling
   ========================================================= */
function initNavigation() {
  const menu = $('#mobileMenu');
  const burger = $('#hamburger');
  let closeTimer;

  const setMenu = (open) => {
    clearTimeout(closeTimer);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-locked', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open')); // let display apply before fading in
    } else {
      menu.classList.remove('is-open');
      closeTimer = setTimeout(() => { menu.hidden = true; }, reducedMotion() ? 0 : 380);
    }
  };
  const isOpen = () => burger.getAttribute('aria-expanded') === 'true';

  burger.addEventListener('click', () => setMenu(!isOpen()));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));

  // Smooth-scroll in-page links; close the mobile menu first.
  // CSS scroll-padding-top keeps targets clear of the fixed header.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    const target = id.length > 1 && document.getElementById(id.slice(1));
    if (!target) return;

    e.preventDefault();
    if (isOpen()) setMenu(false);
    target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', id === '#home' ? location.pathname + location.search : id);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true }); // keyboard / screen-reader continuity
  });
}

/* Highlight the nav link of the section in view (desktop pill + mobile menu) */
function initActiveLinks() {
  const links = $$('.nav-link');
  const ids = [...new Set(links.map((l) => l.getAttribute('href').slice(1)))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

  const setActive = (id) =>
    links.forEach((l) => {
      const on = l.getAttribute('href') === `#${id}`;
      l.classList.toggle('is-active', on);
      on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current');
    });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
    { rootMargin: '-35% 0px -60% 0px' }
  );
  sections.forEach((s) => observer.observe(s));

  // The last section can be too short to reach the observer band
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      setActive(sections[sections.length - 1].id);
    }
  }, { passive: true });
  setActive('home');
}

/* =========================================================
   6. Scroll-driven UI: progress bar + back-to-top
   ========================================================= */
function initScrollUI() {
  const bar = $('#progressBar');
  const btt = $('#backToTop');
  const header = $('#siteHeader');
  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (bar) bar.style.transform = `scaleX(${ratio})`;
    if (btt) btt.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  btt?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
    $('.logo').focus({ preventScroll: true });
  });
}

/* =========================================================
   7. Hero typing animation
   ========================================================= */
function initTyping() {
  const el = $('#typed');
  const words = CONFIG.typingRoles;
  if (!el || !words.length) return;

  if (reducedMotion()) {
    // Swap whole words, no typing effect
    let i = 0;
    setInterval(() => { i = (i + 1) % words.length; el.textContent = words[i]; }, 3000);
    return;
  }

  let w = 0;
  let c = words[0].length; // starts fully typed, matching the HTML
  let deleting = true;
  const TYPE = 70, DELETE = 38, HOLD = 1900, GAP = 320;

  const tick = () => {
    const word = words[w];
    if (deleting) {
      el.textContent = word.slice(0, --c);
      if (c === 0) { deleting = false; w = (w + 1) % words.length; return setTimeout(tick, GAP); }
      return setTimeout(tick, DELETE);
    }
    el.textContent = word.slice(0, ++c);
    if (c === word.length) { deleting = true; return setTimeout(tick, HOLD); }
    setTimeout(tick, TYPE);
  };
  setTimeout(tick, HOLD + 900);
}

/* =========================================================
   8. Scroll reveal (Intersection Observer)
   ========================================================= */
function initReveal() {
  const items = $$('.reveal');
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        obs.unobserve(en.target);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );
  items.forEach((el) => observer.observe(el));
}

/* =========================================================
   9. Cursor spotlight on tiles (pointer devices only)
   ========================================================= */
function initSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

/* =========================================================
   10. Light / dark theme
   ========================================================= */
function initTheme() {
  const root = document.documentElement;
  const btn = $('#themeToggle');
  if (!btn) return;

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    $('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#08090c' : '#f6f6f3');
  };
  apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('sk-theme', next); } catch (_) { /* storage unavailable */ }
  });
}

/* =========================================================
   11. Boot
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  bindPersonal();
  renderMarquee();
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderContact();

  initTheme();
  initNavigation();
  initActiveLinks();
  initScrollUI();
  initTyping();
  initReveal();
  initSpotlight();

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});
