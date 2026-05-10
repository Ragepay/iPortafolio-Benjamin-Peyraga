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

  // Custom sliders
  document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const imgs  = track.querySelectorAll("img");
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
