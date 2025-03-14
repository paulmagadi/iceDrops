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
    flavoursContainer.innerHTML = ''; 
    data.forEach(item => {
        const flavourBox = `
            <div class="flavour-box ${item.class}" data-category="${item.category}">
                <div class="flavour-image">
                    <a href="#."><img src="${item.image}" alt="${item.name}" title="View Product"></a>
                </div>
                <p class="flavour-name">${item.name}</p>
                <div class="price-cart">
                    <span class="price">${item.price}</span>
                    <button type="button" class="add-to-cart add-to-cart-text" title="ADD TO CART"><a href="#.">Add to cart</a></button>
                    <button type="button" class="add-to-cart add-to-cart-icon" title="ADD TO CART"><a href="#."><i class="ri-shopping-cart-fill"></i></a></button>
                </div>
            </div>
        `;
        flavoursContainer.innerHTML += flavourBox;
    });

    // Initialize categories and "View More/Less" functionality after rendering
    initializeCategoriesAndViewMoreLess();
}


function initializeCategoriesAndViewMoreLess() {
    const flavourMenuItems = document.querySelectorAll('.flavour-menu');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const viewLessBtn = document.getElementById('viewLessBtn');

    // Variables for "View More/Less" functionality
    let itemsPerLoad = 4;
    let visibleItems = itemsPerLoad;
    let products = [];
    let currentCategory = 'iceCakes'; // Track current category

    const flavourCategories = {
        iceCakes: document.querySelectorAll('.f1'),
        iceBars: document.querySelectorAll('.f2'),
        creamCones: document.querySelectorAll('.f3'),
    };

    function showflavours(category) {
        currentCategory = category;
        if (category === 'AllFlavours') {
            products = Array.from(document.querySelectorAll('.flavour-box'));
        } else {
            products = Array.from(flavourCategories[category]);
        }

        // Reset visible items when changing category
        visibleItems = itemsPerLoad;
        
        // Hide all items first
        document.querySelectorAll('.flavour-box').forEach(item => item.style.display = 'none');
        
        // Show initial items
        products.slice(0, visibleItems).forEach(item => item.style.display = 'block');

        // Update UI
        flavourMenuItems.forEach(menu => menu.classList.remove('active-flavour'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active-flavour');
        updateButtonStates();
    }

    function loadMoreItems() {
        visibleItems = Math.min(products.length, visibleItems + itemsPerLoad);
        products.slice(0, visibleItems).forEach(item => item.style.display = 'block');
        updateButtonStates();
    }

    function loadLessItems() {
        // Ensure we don't go below initial load count
        visibleItems = Math.max(itemsPerLoad, visibleItems - itemsPerLoad);
        
        // Hide extra items
        products.forEach((item, index) => {
            item.style.display = index < visibleItems ? 'block' : 'none';
        });
        
        updateButtonStates();
    }

    // Function to update button states
    function updateButtonStates() {
        // Disable "View More" button if all items are visible
        viewMoreBtn.disabled = visibleItems >= products.length;
        viewMoreBtn.style.cursor = viewMoreBtn.disabled ? "not-allowed" : "pointer";
        viewMoreBtn.title = viewMoreBtn.disabled ? "No more items" : "Load more products";

        // Disable "View Less" button if only the initial set of items is visible
        viewLessBtn.disabled = visibleItems <= itemsPerLoad;
        viewLessBtn.style.cursor = viewLessBtn.disabled ? "not-allowed" : "pointer";
        viewLessBtn.title = viewLessBtn.disabled ? "No items to hide" : "View less products";

        // Show/hide buttons based on the number of items [alternative]
        // viewMoreBtn.style.display = visibleItems >= products.length ? 'none' : 'block';
        // viewLessBtn.style.display = visibleItems > itemsPerLoad ? 'block' : 'none';
    }

    // Event listeners
    flavourMenuItems.forEach(menu => {
        menu.addEventListener('click', () => {
            const category = menu.getAttribute('data-category');
            showflavours(category);
        });
    });

    viewMoreBtn.addEventListener('click', loadMoreItems);
    viewLessBtn.addEventListener('click', loadLessItems);

    // Initial load
    showflavours('iceCakes');
}

// Fetch and render products on page load
document.addEventListener('DOMContentLoaded', async () => {
    flavourData = await fetchProducts();
    renderFlavours(flavourData);
});