# Hostinger Website

A clean, minimalist static website — the starting point for a site hosted on
Hostinger. Built with plain HTML, CSS, and a touch of JavaScript so it loads
fast and deploys anywhere with no build step.

## Structure

```
.
├── index.html      # Page markup (hero, about, services, contact)
├── css/
│   └── styles.css  # All styling; design tokens live at the top (:root)
├── js/
│   └── main.js     # Mobile nav toggle + footer year
└── README.md
```

## Preview locally

No build tools required. Either open `index.html` directly in a browser, or
serve it from the project root for cleaner paths:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Hostinger

Because there's no build step, the repository files *are* the site. Two common
ways to publish:

1. **Git integration (recommended).** In hPanel go to
   **Websites → Manage → Advanced → GIT**, connect this repository and branch,
   and set the deploy path to your domain's `public_html`. Each push then
   updates the live site (auto-deploy or a one-click "Deploy" button).
2. **File Manager / FTP.** Upload the contents of this repo into
   `public_html`.

> Note: the site's files live at the repository root, so point Hostinger's
> deploy path at the root (not a `dist/` or `public/` subfolder).

## Customizing

- **Colors & spacing:** edit the CSS variables under `:root` in `css/styles.css`.
- **Content:** edit the sections in `index.html`.
- **Site name:** replace "Your Site" in `index.html` (brand, title, footer).

This is an intentionally small starting point — we'll build it out from here.
