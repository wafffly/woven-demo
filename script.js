let viewClothesContainerElement = document.getElementById('view-clothes-container');
let clothesContainerElement = document.getElementById('clothes-container');
let addClothingButton = document.getElementById('add-clothing');

function loadViewClothesView() {
    document.getElementById('main-page-container').classList.add('show');
    setTimeout(() => {
        document.getElementById('main-page-container').classList.add('animated');
    }, 50);

    $('#main-page-container').load('pages/view-clothes-container.html', () => {
        // DOM elements
        viewClothesContainerElement = document.getElementById('view-clothes-container');
        clothesContainerElement = document.getElementById('clothes-container');
        addClothingButton = document.getElementById('add-clothing');

        // Event handlers
        addClothingButton.addEventListener('click', loadAddClothingView);

        // Initialize main page by populating clothes
        populateClothes();
    });
}

function loadAddClothingView() {
    $('#side-page-container').load('pages/add-clothing-container.html', () => {
        document.getElementById('side-page-container').classList.add('show');
        setTimeout(() => {
            document.getElementById('side-page-container').classList.add('animated');
        }, 50);

        // DOM elements
        closeAddClothingContainerButton = document.getElementById('close-add-clothing-container');

        // Event handlers
        closeAddClothingContainerButton.addEventListener('click', closeAddClothingView);
    });
}

function closeAddClothingView() {
    const sidePageContainerElement = document.getElementById('side-page-container');
    sidePageContainerElement.innerHTML = '';
    sidePageContainerElement.classList.remove('animated');
    setTimeout(() => {
        document.getElementById('side-page-container').classList.remove('show');
    }, 300);
}

// fetch the JSON clothes and display to DOM
function populateClothes() {
    fetch('data/clothing.json')
        .then(res => res.json())
        .then(data => {
            data.forEach((clothing) => {
                // create clothing element
                const clothingElement = createClothingElement(clothing);
                clothesContainerElement.appendChild(clothingElement);
            });
        });
}

function createClothingElement(clothing) {
    const { id, brand, title, color, price } = clothing;
    const clothingElement = document.createElement('div');
    clothingElement.innerHTML = `
        <div class="clothing" id="${id}">
            <img src="../images/${id}.jpeg" alt="${id}">
            <div class="clothing-title">
                <span class="brand">${brand} </span>
                ${title}
            </div>
            <div class="clothing-info">
                <span class="color">color: ${color}</span>
                <br/>
                <span class="price">price: $${price}</span>
            </div>
        </div>
    `;
    return clothingElement;
}

// Dynamically load content to page container
$(document).ready(function() {
    loadViewClothesView();
})