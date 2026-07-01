# thecamerononeill.com

Personal website for Cameron O'Neill. A fast, no-build-step static site
(plain HTML/CSS/JS) with a minimalist-corporate × engineer/scientist look:
monospace labels, hairline grids, boxed navigation, and a single restrained
technical-blue accent.

## Pages

| File            | Nav label                     |
|-----------------|-------------------------------|
| `index.html`    | Home (hero: logo + image)     |
| `about.html`    | About Me                      |
| `blog.html`     | Blog                          |
| `projects.html` | Personal Projects             |
| `reading.html`  | Reading Recommendations       |
| `media.html`    | Podcasting and Video Content  |
| `contact.html`  | Contact Me                    |

## Structure

```
.
├── *.html            # one file per page (shared header/footer markup)
├── css/styles.css    # all styling; design tokens live at the top (:root)
├── js/main.js        # mobile nav toggle + footer year
└── assets/
    ├── logo.svg            # placeholder logo — replace with yours
    ├── hero.jpg            # your hero photo (add this file)
    └── hero-placeholder.svg # shown until hero.jpg exists
```

## Add your logo and hero image

The template ships with placeholders so nothing looks broken:

- **Logo:** replace `assets/logo.svg` with your own logo (keep the filename
  `logo.svg`, or if yours is a PNG, update the `src` in the HTML `<head>` and
  header/hero to `assets/logo.png`).
- **Hero photo:** drop your image in at `assets/hero.jpg`. It appears
  automatically; the blueprint placeholder shows only until then.

## Edit your content

Placeholders are marked in the HTML with `[ ... ]` and `EDIT ME` /
`TEMPLATE` comments:

- **Headline:** `index.html` → `.hero-lead` (and `.hero-title` if you want
  more than your name).
- **Colors/spacing:** `css/styles.css` → the `:root` variables (`--accent`
  changes the blue used throughout).
- **Pages:** each page's `<section>` blocks; duplicate the card/list templates
  to add posts, projects, books, or episodes.

## Preview locally

No tooling required — open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Deploy to Hostinger

The repo files *are* the site (no build). Publish via **hPanel → Websites →
Manage → Advanced → GIT**: connect this repository and branch, set the deploy
path to your domain's `public_html`, and each push updates the live site.
(Alternatively, upload the repo contents into `public_html` via File Manager
or FTP.) Point the deploy path at the repository **root**, not a subfolder.
