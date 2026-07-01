// thecamerononeill.com — no dependencies, no build step.
(function () {
  "use strict";

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Drifting light-blue particles (constellation) ---------- */
  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.createElement("canvas");
  canvas.id = "starfield";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext("2d");

  var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var LINK_DIST = 130;       // px within which particles connect
  var ACCENT = "109, 184, 255"; // matches --accent

  function count() {
    // density scaled to viewport, capped for performance
    return Math.min(110, Math.round((w * h) / 16000));
  }

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.6,
      a: Math.random() * 0.5 + 0.35
    };
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = [];
    var n = count();
    for (var i = 0; i < n; i++) particles.push(makeParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // faint connecting lines
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = dx * dx + dy * dy;
        if (d < LINK_DIST * LINK_DIST) {
          var o = (1 - Math.sqrt(d) / LINK_DIST) * 0.18;
          ctx.strokeStyle = "rgba(" + ACCENT + "," + o + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    // particles
    for (var k = 0; k < particles.length; k++) {
      var s = particles[k];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + ACCENT + "," + s.a + ")";
      ctx.fill();
    }
  }

  function step() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
    }
    draw();
    raf = requestAnimationFrame(step);
  }

  var raf = null;
  resize();
  if (reduce) {
    draw(); // static field, no motion
  } else {
    step();
  }

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 150);
  });
})();
