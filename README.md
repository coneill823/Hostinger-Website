# thecamerononeill.com

Personal website for Cameron O'Neill. A fast, **no-build-step** static site
(plain HTML/CSS/JS) with a dark "observatory" theme — deep navy, drifting
light-blue constellation particles, and luminous accents.

## Pages

| File            | Nav label                     |
|-----------------|-------------------------------|
| `index.html`    | Home (hero: logo + photo)     |
| `about.html`    | About Me                      |
| `blog.html`     | Blog                          |
| `projects.html` | Personal Projects             |
| `reading.html`  | Reading Recommendations (books + papers) |
| `media.html`    | Podcasting and Video Content  |
| `contact.html`  | Contact Me                    |

## Structure

```
.
├── *.html            # one file per page (shared header/footer markup)
├── posts/            # one HTML file per blog post (+ _template.html)
├── data/
│   ├── posts.js      # list of blog posts
│   ├── books.js      # book recommendations
│   └── papers.js     # paper recommendations
├── css/styles.css    # all styling; design tokens live at the top (:root)
├── js/
│   ├── main.js       # nav, footer year, particle animation
│   └── content.js    # renders posts/books/papers from data/*.js
└── assets/
    ├── logo.svg      # site logo (recreated brand mark — replace with yours)
    ├── hero.jpg      # your hero photo (ADD this file)
    ├── hero-placeholder.svg  # shown until hero.jpg exists
    └── blog/         # images used in blog posts
```

## Adding content (only you can do this)

Because the site is static and everything lives in this repository, the **only**
way to add posts, books, or papers is to edit these files and push. There is
deliberately **no public submission form**, so visitors cannot add anything —
only someone with write access to this repo (you) can.

### Add a book or paper
Edit `data/books.js` or `data/papers.js` and add one entry to the list:

```js
{ title: "Book title", author: "Author", year: "2020",
  note: "Why it's worth reading.", link: "" }   // link is optional
```

Commit + push — it appears on the **Reading Recommendations** page automatically.

### Add a blog post (with images)
1. Copy `posts/_template.html` to `posts/your-slug.html` and write the post.
   To include an image, drop it in `assets/blog/` and reference it with a
   `../` path: `<img src="../assets/blog/my-image.jpg" alt="...">`.
2. Add an entry to `data/posts.js`:
   ```js
   { title: "My post", date: "2026-07-15", tags: ["Engineering"],
     cover: "assets/blog/my-image.jpg", excerpt: "One-line summary.",
     url: "posts/your-slug.html" }
   ```
3. Commit + push — the post card appears on the **Blog** page (newest first).

## Add your logo and hero photo

- **Hero photo:** add your image at `assets/hero.jpg` (GitHub → the `assets`
  folder → *Add file → Upload files*). It appears automatically; the blueprint
  placeholder shows only until then.
- **Logo:** `assets/logo.svg` is a recreated version of your brand mark. To use
  your exact file, replace `assets/logo.svg` (keep the name), or upload e.g.
  `assets/logo.png` and update the `src` references in the page `<head>` and
  header/hero.

> Tip: image *files* must be committed to the repo (drag-and-drop upload on
> GitHub, or `git add`). Pasting an image into chat does not create a file.

## Customizing the look

- **Colors / particles:** `css/styles.css` → `:root` variables. `--accent`
  changes the blue used throughout; particle density/speed live in
  `js/main.js` (`count()` and the `vx/vy` values).

## Preview locally

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Deploy to Hostinger

The repo files *are* the site (no build). Publish via **hPanel → Websites →
Manage → Advanced → GIT**: connect this repo and branch, set the deploy path to
your domain's `public_html` (the repository **root**), and each push updates the
live site.
