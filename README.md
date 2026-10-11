# Srinivaskumar Bolishetty — Portfolio

A static, single-page portfolio built with **HTML5, CSS3 and vanilla JavaScript** only. No frameworks, npm or build step: open `index.html` and it runs.

## Folder structure

```
portfolio/
├── index.html          # Page structure, all sections, SEO meta, icon sprite
├── style.css           # Design tokens, layout, components, animations, responsive rules
├── script.js           # CONFIG object + rendering + all interactions
├── README.md
└── assets/
    ├── images/         # optional project screenshots
    └── icons/
        └── favicon.svg # "SK" favicon
```

## 1. Update personal details and content

Everything editable lives in the `CONFIG` object at the top of `script.js`:

| What | Where in `CONFIG` |
|---|---|
| Name, title, phone, location | `personal` |
| **Email** (currently empty, so it's hidden) | `personal.email` |
| GitHub / LinkedIn | `social` |
| Typing animation words | `typingRoles` |
| Project label (e.g. "Computer vision") | `projects[].kind` |
| Skill categories & tags | `skills` |
| Project text, tech tags, repo links | `projects` |
| **Trailbliz job title, dates, responsibilities** | `experience[0].role`, `.start`, `.end`, `.responsibilities` |
| Degree details, optional CGPA | `education` (CGPA hidden while empty) |
| Certificate verification links | `certifications[].credentialUrl` (link hidden while empty) |

Empty experience fields appear on the page as dashed, italic "to be added" placeholders so they are easy to spot. Fill them before sharing the site.

The hero and About text are written directly in `index.html`.

## 2. Replace project thumbnails

Each project shows a built-in SVG illustration (labelled "Illustration"). To use a real screenshot:

1. Save it in `assets/images/`, e.g. `quickstay.png` (16:10 ratio looks best, around 1280×800).
2. Set the project's `image` field: `image: 'assets/images/quickstay.png'`.
3. Update `imageAlt` to describe what the screenshot shows.

## 3. Open and test locally

- **Quickest:** double-click `index.html`.
- **Closer to production:** in the `portfolio` folder run
  `python -m http.server 8000` and open http://localhost:8000.

Check: the full-screen menu (resize below 1024px), nav links and active highlighting, both "View on GitHub" buttons, the contact links and the theme toggle.

## 4. Deploy

**GitHub Pages**
1. Create a repository (e.g. `Bolishettykumar.github.io` for a root URL, or any name).
2. Upload the contents of the `portfolio` folder so `index.html` is at the repository root.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `root` → Save.
4. The site is live at `https://bolishettykumar.github.io/` (or `/<repo-name>/`) within a minute or two.

**Netlify**
1. Go to https://app.netlify.com/drop.
2. Drag the `portfolio` folder onto the page. It's live immediately; you can rename the subdomain in Site settings.
