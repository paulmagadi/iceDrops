toggleNavbar  = document.querySelector('.toggle-menu ');
navBar = document.querySelector('.mobile-navbar');
navLinks = document.querySelectorAll('.mobile-navbar .menu')

// Toggle Navbar 
toggleNavbar.addEventListener('click', function() {
    navBar.classList.toggle('open-nav');
    if (navBar.classList.contains('open-nav')) {
        toggleNavbar.innerHTML = ('<i class="ri-close-fill"></i>');
    } else {
        toggleNavbar.innerHTML = ('<i class="ri-menu-fill"></i>');
    }
    toggleNavbar.classList.add('toggler-icon', 'scale');
    setTimeout(() => toggleNavbar.classList.remove('scale'), 300);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navBar.classList.toggle('open-nav');
        toggleNavbar.innerHTML = navBar.classList.contains('open-nav')
            ? '<i class="ri-close-fill"></i>'
            : '<i class="ri-menu-fill"></i>';
        toggleNavbar.classList.add('toggler-icon', 'scale');
        setTimeout(() => toggleNavbar.classList.remove('scale'), 300);
    });
});


const header = document.querySelector(".header");

const activeHeader = function () {
  window.scrollY > 50 ? header.classList.add("header-active")
    : header.classList.remove("header-active");
}

window.addEventListener("scroll", activeHeader);


// Active Navigation
const navBtns = document.querySelectorAll('.menu');
const sections = document.querySelectorAll('section');

// Show different page sections on clicking the navigation
function showSection(section) {
    Object.values(navBtns).forEach(btn => btn.classList.remove('active-nav'));
    navBtns[section].classList.add('active-nav');
}

Object.keys(navBtns).forEach(section => {
    navBtns[section].addEventListener('click', () => showSection(section));
});

// Activate active class on the navbar links when scrolling the sections
window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        let sectionTop = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;

        if (sectionTop >= offset && sectionTop < offset + height) {
            currentSection = section.getAttribute('id');
        }
    });

    navBtns.forEach(menu => {
        menu.classList.remove('active-nav');
        if (menu.querySelector(`a[href="#${currentSection}"]`)) {
            menu.classList.add('active-nav');
        }
    });
});


// Handdle Hero Slides 
let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("hero-image");

    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if(slideIndex > slides.length) {slideIndex = 1}

    slides[slideIndex-1].style.display = "flex";
    setTimeout(showSlides, 6000); 
}
showSlides();


// Testimonials Slider
document.addEventListener("DOMContentLoaded", function () {
    const testimonialsContainer = document.querySelector(".testimonials-container");
    const scrollLeft = document.querySelector(".scroll-left");
    const scrollRight = document.querySelector(".scroll-right");
  
    // Scroll left
    scrollLeft.addEventListener("click", () => {
      testimonialsContainer.scrollBy({ left: -300, behavior: "smooth" });
    });
  
    // Scroll right
    scrollRight.addEventListener("click", () => {
      testimonialsContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
  
    // Keyboard arrow key scrolling
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        testimonialsContainer.scrollBy({ left: -300, behavior: "smooth" });
      } else if (event.key === "ArrowRight") {
        testimonialsContainer.scrollBy({ left: 300, behavior: "smooth" });
      }
    });
});

