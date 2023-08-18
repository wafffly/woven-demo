let viewClothesContainerElement = document.getElementById('view-clothes-container');
let clothesContainerElement = document.getElementById('clothes-container');

// fetch the JSON clothes and display to DOM
function loadViewClothesContainer() {
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
    $('#view-clothes-page-container').load('pages/view-clothes-container.html', () => {
        viewClothesContainerElement = document.getElementById('view-clothes-container');
        clothesContainerElement = document.getElementById('clothes-container');
        loadViewClothesContainer();
    });
})
