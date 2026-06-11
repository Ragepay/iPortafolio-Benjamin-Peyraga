document.addEventListener("DOMContentLoaded", function () {
  // Terminal typewriter
  const terminalBody = document.getElementById("terminalBody");
  if (terminalBody) {
    const lines = [
      { type: "cmd",  text: "whoami" },
      { type: "out",  html: "Benjamín Peyraga &mdash; Full Stack Developer" },
      { type: "cmd",  text: "cat skills.json" },
      { type: "out",  html: '{ <span class="t-key">"stack"</span>: [<span class="t-str">"React"</span>, <span class="t-str">"Vue"</span>, <span class="t-str">"Node"</span>, <span class="t-str">"GCP"</span>],' },
      { type: "out",  html: '&nbsp;&nbsp;<span class="t-key">"passion"</span>: <span class="t-str">"clean code &amp; automation"</span> }' },
    ];

    let lineIdx = 0;

    const cursor = document.createElement("p");
    cursor.className = "terminal-line";
    cursor.innerHTML = '<span class="t-prompt">$</span> <span class="t-cursor">▋</span>';

    function typeLine(lineData, done) {
      const p = document.createElement("p");
      if (lineData.type === "out") {
        p.className = "terminal-line t-out";
        p.innerHTML = lineData.html;
        terminalBody.insertBefore(p, cursor);
        setTimeout(done, 120);
      } else {
        p.className = "terminal-line";
        p.innerHTML = '<span class="t-prompt">$</span> ';
        terminalBody.insertBefore(p, cursor);
        const span = document.createElement("span");
        span.className = "t-cmd";
        p.appendChild(span);
        let i = 0;
        const interval = setInterval(() => {
          span.textContent += lineData.text[i++];
          if (i >= lineData.text.length) { clearInterval(interval); setTimeout(done, 400); }
        }, 55);
      }
    }

    terminalBody.appendChild(cursor);

    function nextLine() {
      if (lineIdx >= lines.length) return;
      typeLine(lines[lineIdx++], nextLine);
    }

    setTimeout(nextLine, 600);
  }


  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    });
  }

  // Mobile menu
  const navToggle = document.getElementById("navToggle");
  const navLinks  = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("active")));
    document.addEventListener("click", e => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target))
        navLinks.classList.remove("active");
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("reveal--active"); });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Hero parallax
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      heroBg.style.transform = `translateY(${window.pageYOffset * -0.4}px)`;
    }, { passive: true });
  }

  // Lightbox
  const lightbox        = document.getElementById("lightbox");
  const lightboxImg     = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let lbGallery = [];
  let lbIdx = 0;

  const lbShow = () => {
    const img = lbGallery[lbIdx];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCounter.textContent = lbGallery.length > 1 ? `${lbIdx + 1} / ${lbGallery.length}` : "";
  };
  const lbOpen = (gallery, start) => {
    lbGallery = gallery;
    lbIdx = start;
    lbShow();
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const lbClose = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  const lbGo = n => { lbIdx = (n + lbGallery.length) % lbGallery.length; lbShow(); };

  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", lbClose);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", e => { e.stopPropagation(); lbGo(lbIdx - 1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", e => { e.stopPropagation(); lbGo(lbIdx + 1); });
    lightbox.addEventListener("click", e => { if (e.target === lightbox) lbClose(); });
    document.addEventListener("keydown", e => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") lbClose();
      else if (e.key === "ArrowLeft") lbGo(lbIdx - 1);
      else if (e.key === "ArrowRight") lbGo(lbIdx + 1);
    });
  }

  // Custom sliders
  document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const imgs  = Array.from(track.querySelectorAll("img"));

    // Click en una imagen abre el lightbox con la galería de ese slider
    imgs.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => lbOpen(imgs, i));
    });

    if (imgs.length < 2) return;
    let idx = 0;
    const go = n => {
      idx = (n + imgs.length) % imgs.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
    };
    slider.querySelector(".slider-prev").addEventListener("click", () => go(idx - 1));
    slider.querySelector(".slider-next").addEventListener("click", () => go(idx + 1));
  });
});
