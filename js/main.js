document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal--active");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // Parallax on hero background
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
        window.addEventListener("scroll", () => {
            const rate = window.pageYOffset * -0.4;
            heroBg.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }
});
