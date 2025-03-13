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


// Flavours section
const flavoursContainer = document.querySelector('.flovours-container');
let flavourData = [];

// Fetch JSON data from an external file
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Render products dynamically
function renderFlavours(data) {
    flavoursContainer.innerHTML = ''; // Clear the container
    data.forEach(item => {
        const flavourBox = `
            <div class="flavour-box ${item.class}" data-category="${item.category}">
                <div class="flavour-image">
                    <a href="#"><img src="${item.image}" alt="${item.name}" title="View Product"></a>
                </div>
                <p class="flavour-name">${item.name}</p>
                <div class="price-cart">
                    <span class="price">${item.price}</span>
                    <button type="button" class="add-to-cart" title="ADD TO CART"><a href="#">Add to cart</a></button>
                </div>
            </div>
        `;
        flavoursContainer.innerHTML += flavourBox;
    });

    // Initialize categories and pagination after rendering
    initializeCategoriesAndPagination();
}

// Initialize categories and pagination
function initializeCategoriesAndPagination() {
    const flavourMenuItems = document.querySelectorAll('.flavour-menu');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Pagination variables
    let itemsPerPage = 4;
    let currentPage = 0;
    let products = [];

    // Define categories
    const flavourCategories = {
        iceCakes: document.querySelectorAll('.f1'),
        iceBars: document.querySelectorAll('.f2'),
        creamCones: document.querySelectorAll('.f3'),
    };

    // Function to show products for a specific category
    function showflavours(category) {
        if (category === 'AllFlavours') {
            products = Array.from(document.querySelectorAll('.flavour-box'));
            products.forEach(item => item.style.display = 'block');
        } else {
            products = Array.from(flavourCategories[category]);
            document.querySelectorAll('.flavour-box').forEach(item => item.style.display = 'none');
            products.forEach(item => item.style.display = 'block');
        }

        // Update active class
        flavourMenuItems.forEach(menu => menu.classList.remove('active-flavour'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active-flavour');

        // Reset pagination
        currentPage = 0;
        updatePagination();
    }

    // Pagination handler
    function updatePagination() {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Hide all products
        products.forEach(item => item.style.display = 'none');

        // Show current page items
        products.slice(startIndex, endIndex).forEach(item => item.style.display = 'block');

        // Update button states
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = endIndex >= products.length;

        // Update button styles
        prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";
        nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";

        prevBtn.title = prevBtn.disabled ? "First page" : "Go back";
        nextBtn.title = nextBtn.disabled ? "Last page" : "Go next";

        // Toggle pagination visibility
        document.querySelector('.pagination').style.display =
            products.length > itemsPerPage ? 'block' : 'none';
    }

    // Event listeners for category menu items
    flavourMenuItems.forEach(menu => {
        menu.addEventListener('click', () => {
            const category = menu.getAttribute('data-category');
            showflavours(category);
        });
    });

    // Event listeners for pagination buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < products.length) {
            currentPage++;
            updatePagination();
        }
    });

    // Initial load
    showflavours('iceCakes');
}

// Fetch and render products on page load
document.addEventListener('DOMContentLoaded', async () => {
    flavourData = await fetchProducts();
    renderFlavours(flavourData);
});


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

