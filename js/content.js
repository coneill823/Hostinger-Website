// Renders blog posts, projects, books, and papers from the data/*.js files.
// Content is added by editing those files (and, for detail pages, copying a
// template in the matching folder) and pushing — there is no public submission
// path, so only the repository owner can add entries.
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function note(t) { return '<p class="note">' + esc(t) + "</p>"; }

  // A card that becomes a link when `url` (an internal detail page) is set.
  function cardOpen(url, extraClass) {
    var cls = "card" + (extraClass ? " " + extraClass : "");
    return url
      ? '<a class="' + cls + '" href="' + esc(url) + '">'
      : '<article class="' + cls + '">';
  }
  function cardClose(url) { return url ? "</a>" : "</article>"; }

  function metaLine(parts) {
    parts = parts.filter(Boolean).map(esc);
    return parts.length ? '<p class="meta">' + parts.map(function (p) {
      return "<span>" + p + "</span>";
    }).join("") + "</p>" : "";
  }
  function readMore(url, label) {
    return url ? '<p class="readmore">' + esc(label || "Read") + " →</p>" : "";
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
      var url = p.url || "";
      var cover = p.cover
        ? '<span class="post-cover"><img src="' + esc(p.cover) + '" alt="" loading="lazy"></span>'
        : "";
      var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
      return cardOpen(url, "post-card") + cover +
        '<span class="post-body">' +
          '<p class="meta"><span>' + esc(p.date || "") + "</span>" + tags + "</p>" +
          "<h3>" + esc(p.title || "Untitled") + "</h3>" +
          "<p>" + esc(p.excerpt || "") + "</p>" +
          readMore(url) +
        "</span>" + cardClose(url);
    }).join("");
  }

  /* ---------- Personal projects ---------- */
  function renderProjects() {
    var el = document.getElementById("projects-list");
    if (!el) return;
    var items = window.PROJECTS || [];
    if (!items.length) { el.innerHTML = note("No projects listed yet."); return; }
    el.innerHTML = items.map(function (p) {
      var url = p.url || "";
      var cover = p.cover
        ? '<span class="post-cover"><img src="' + esc(p.cover) + '" alt="" loading="lazy"></span>'
        : "";
      return cardOpen(url, p.cover ? "post-card" : "") +
        (p.cover ? cover + '<span class="post-body">' : "") +
        metaLine(p.meta || []) +
        "<h3>" + esc(p.title || "Untitled") + "</h3>" +
        (p.excerpt ? "<p>" + esc(p.excerpt) + "</p>" : "") +
        readMore(url, "View project") +
        (p.cover ? "</span>" : "") +
      cardClose(url);
    }).join("");
  }

  /* ---------- Books & papers (shared) ---------- */
  function renderRefs(elId, list, metaKeys) {
    var el = document.getElementById(elId);
    if (!el) return;
    if (!list || !list.length) { el.innerHTML = note("Nothing listed yet."); return; }
    el.innerHTML = list.map(function (r) {
      var url = r.url || "";
      var meta = metaLine(metaKeys.map(function (k) { return r[k]; }));
      return cardOpen(url) +
        meta +
        "<h3>" + esc(r.title || "Untitled") + "</h3>" +
        (r.note ? "<p>" + esc(r.note) + "</p>" : "") +
        readMore(url, "Read more") +
      cardClose(url);
    }).join("");
  }

  function run() {
    renderPosts();
    renderProjects();
    renderRefs("books-list", window.BOOKS, ["author", "year"]);
    renderRefs("papers-list", window.PAPERS, ["authors", "venue"]);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else { run(); }
})();
