// Renders blog posts, books, and papers from the data/*.js files.
// Content is added by editing those files and pushing — there is no
// public submission path, so only the repository owner can add entries.
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function note(t) { return '<p class="note">' + esc(t) + "</p>"; }
  function linked(title, url) {
    return url ? '<a href="' + esc(url) + '" rel="noopener">' + esc(title) + "</a>" : esc(title);
  }

  /* ---------- Blog posts ---------- */
  function renderPosts() {
    var el = document.getElementById("posts-list");
    if (!el) return;
    var posts = (window.POSTS || []).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    if (!posts.length) { el.innerHTML = note("No posts yet — check back soon."); return; }
    el.innerHTML = posts.map(function (p) {
      var url = p.url || "#";
      var cover = p.cover
        ? '<a class="post-cover" href="' + esc(url) + '"><img src="' + esc(p.cover) + '" alt="" loading="lazy"></a>'
        : "";
      var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
      return '<article class="card post-card">' + cover +
        '<div class="post-body">' +
          '<p class="meta"><span>' + esc(p.date || "") + "</span>" + tags + "</p>" +
          "<h3>" + linked(p.title || "Untitled", url) + "</h3>" +
          "<p>" + esc(p.excerpt || "") + "</p>" +
          (p.url ? '<p class="readmore"><a href="' + esc(url) + '">Read →</a></p>' : "") +
        "</div></article>";
    }).join("");
  }

  /* ---------- Books ---------- */
  function renderBooks() {
    var el = document.getElementById("books-list");
    if (!el) return;
    var books = window.BOOKS || [];
    if (!books.length) { el.innerHTML = note("No books listed yet."); return; }
    el.innerHTML = books.map(function (b) {
      var meta = [b.author, b.year].filter(Boolean).map(esc).join(" · ");
      return '<article class="card">' +
        (meta ? '<p class="meta"><span>' + meta + "</span></p>" : "") +
        "<h3>" + linked(b.title || "Untitled", b.link) + "</h3>" +
        (b.note ? "<p>" + esc(b.note) + "</p>" : "") +
      "</article>";
    }).join("");
  }

  /* ---------- Papers ---------- */
  function renderPapers() {
    var el = document.getElementById("papers-list");
    if (!el) return;
    var papers = window.PAPERS || [];
    if (!papers.length) { el.innerHTML = note("No papers listed yet."); return; }
    el.innerHTML = papers.map(function (p) {
      var meta = [p.authors, p.venue].filter(Boolean).map(esc).join(" · ");
      return '<article class="card">' +
        (meta ? '<p class="meta"><span>' + meta + "</span></p>" : "") +
        "<h3>" + linked(p.title || "Untitled", p.link) + "</h3>" +
        (p.note ? "<p>" + esc(p.note) + "</p>" : "") +
      "</article>";
    }).join("");
  }

  function run() { renderPosts(); renderBooks(); renderPapers(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else { run(); }
})();
