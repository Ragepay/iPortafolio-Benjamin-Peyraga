document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector("#mobile-menu");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
    });
});

let currentIndex = 0;

function changeImage(direction) {
    const slides = document.querySelectorAll('.slide');
    currentIndex += direction;

    // Verifica que no se pase de los límites de las imágenes
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    // Mueve las imágenes
    const offset = -currentIndex * 100;
    document.querySelector('.image-slider').style.transform = `translateX(${offset}%)`;
}

function descargarArchivos() {
    const links = [
        './docs/Benjamin-Peyraga-CV.pdf',
        './docs/Benjamin Peyraga CV.pdf'
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link;
        a.download = link.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
