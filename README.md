# thecamerononeill.com

Personal website for Cameron O'Neill — a fast, **no-build-step** static site
(plain HTML/CSS/JS) with a dark "observatory" theme, a slide-out drawer menu,
and data-driven sections for the blog, projects, books, and papers.

Everything is edited by changing files in this repo and pushing. There is **no
public submission form**, so only you (with repo access) can add content.

---

## Contents

- [How to publish (deploy)](#how-to-publish-deploy)
- [File map](#file-map)
- [How to update each page](#how-to-update-each-page)
- [Adding a blog post / project / book / paper](#adding-a-blog-post--project--book--paper)
- [Adding images at specific positions](#adding-images-at-specific-positions)
- [Preview locally](#preview-locally)

---

## How to publish (deploy)

1. Commit and push your change to a branch and merge it into **`main`** (via a
   pull request).
2. In Hostinger: **hPanel → Websites → Manage → Advanced → GIT → Deploy**.
   *(There is no auto-deploy on this plan, so you click Deploy each time.)*
3. **Purge the cache**: hPanel → *Cache Manager / LiteSpeed* → **Purge All**,
   then hard-refresh the site (Ctrl/Cmd + Shift + R).

> **If you change `css/styles.css` or a `js/*.js` file**, bump the version
> number in every page's `?v=` (e.g. `styles.css?v=3` → `?v=4`). That forces
> browsers/caches to load the new file. Content and `data/*.js` edits don't
> strictly need it, but purging + hard-refresh always helps. (Ask me and I'll
> bump it for you.)

---

## File map

```
.
├── index.html        Home (hero + "Start here")
├── about.html        About Me
├── blog.html         Blog listing        (reads data/posts.js)
├── projects.html     Projects listing    (reads data/projects.js)
├── reading.html      Books + Papers       (reads data/books.js, data/papers.js)
├── media.html        Podcasting & Video
├── contact.html      Contact Me
├── posts/            One HTML page per blog post   (+ _template.html)
├── projects/         One HTML page per project     (+ _template.html)
├── books/            One HTML page per book         (+ _template.html)
├── papers/           One HTML page per paper        (+ _template.html)
├── data/
│   ├── posts.js      Blog list
│   ├── projects.js   Projects list
│   ├── books.js      Books list
│   └── papers.js     Papers list
├── css/styles.css    All styling (design tokens at the top, in :root)
├── js/
│   ├── main.js       Drawer menu, footer year, particle background
│   └── content.js    Renders the lists above into cards
└── assets/           logo.png, hero.jpg, images (put post images here)
```

---

## How to update each page

| Page | What to edit |
|------|--------------|
| **Home** (`index.html`) | The hero text is in `.hero-copy` (eyebrow, `<h1>`, `.hero-lead`). The "Start here" tiles are the cards further down. |
| **About** (`about.html`) | Plain HTML — edit the paragraphs and the *Currently / Education / Beyond engineering* sections directly. |
| **Blog** (`blog.html`) | Don't edit the listing markup — add posts via `data/posts.js` (see below). |
| **Projects** (`projects.html`) | Add projects via `data/projects.js`. |
| **Reading** (`reading.html`) | Add books/papers via `data/books.js` and `data/papers.js`. |
| **Media** (`media.html`) | Plain HTML — edit the cards, or embed players later. |
| **Contact** (`contact.html`) | Replace the `[ ... ]` placeholders in the list (email, GitHub, etc.). |

To change the **site name, colours, or particle background**, edit the
variables at the top of `css/styles.css` (`:root { --accent: … }`) and the
`count()` / speed values in `js/main.js`.

---

## Adding a blog post / project / book / paper

They all follow the **same two-step pattern**:

**Step 1 — add a card** by editing the matching `data/*.js` file (each file has
a commented example at the top showing every field).

- Blog → `data/posts.js`
- Projects → `data/projects.js`
- Books → `data/books.js`
- Papers → `data/papers.js`

**Step 2 — (optional) give it its own page.** If the entry has a `url`, the
whole card opens that page. To create the page, copy the `_template.html` in
the matching folder and write your content:

- Blog → copy `posts/_template.html` → `posts/your-slug.html`
- Projects → copy `projects/_template.html` → `projects/your-slug.html`
- Books → copy `books/_template.html` → `books/your-slug.html`
- Papers → copy `papers/_template.html` → `papers/your-slug.html`

Then point the entry's `url` at that file (e.g. `"projects/your-slug.html"`).
If you leave `url` empty, the card still shows — it just isn't clickable.

**Example — add a project** in `data/projects.js`:

```js
{
  title: "My new project",
  meta: ["2026", "Prototype"],
  excerpt: "One-line summary shown on the card.",
  url: "projects/my-new-project.html"   // optional detail page
}
```

Books and papers also accept a `link` (external URL / DOI) that you show inside
the detail page.

---

## Adding images at specific positions

Put image files in `assets/` (e.g. `assets/projects/hand.jpg`) and reference
them from a detail page with a `../` path. Inside any post/detail page, wrap an
image in a `<figure>` and add a class to control its position:

```html
<!-- Full width (default) -->
<figure>
  <img src="../assets/projects/hand.jpg" alt="Describe the image">
  <figcaption>Optional caption.</figcaption>
</figure>

<!-- Centered, natural size -->
<figure class="center"> … </figure>

<!-- Small, centered (max 340px) -->
<figure class="small"> … </figure>

<!-- Float right, text wraps around it -->
<figure class="right"> … </figure>

<!-- Float left, text wraps around it -->
<figure class="left"> … </figure>

<!-- Two images side by side -->
<div class="img-row">
  <figure><img src="../assets/a.jpg" alt=""></figure>
  <figure><img src="../assets/b.jpg" alt=""></figure>
</div>
```

Tips:
- After a `left`/`right` float, if the next section overlaps, add
  `<p class="clear"></p>`.
- Each `_template.html` already contains these snippets as comments to copy.
- Large photos load slowly — resize to ~2000px wide before adding (ask me and
  I'll optimise one for you).

---

## Preview locally

No tooling required — either open a file in your browser, or serve the folder
so paths resolve cleanly:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```
