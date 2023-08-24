import { loadClothingList } from "./clothing-dao.js";
import { domSelect, showFadeDomElement } from "./utils.js";
import { getClothingList, getNextClothingId } from "./clothing-dao.js";
import { loadAddClothingView } from "./add-clothing.js";
import { loadLogOutfitView } from "./log-outfit.js";
import { loadViewClothingView } from "./view-clothing.js";

const loadViewClothesView = () => {
    showFadeDomElement('main-page-container');

    $('#main-page-container').load('pages/view-clothes-container.html', () => {
        // Event handlers
        domSelect('add-clothing').addEventListener('click', handleClickAddClothingView);
        domSelect('log-outfit').addEventListener('click', handleClickLogOutfitView);

        // Initialize main page by populating clothes
        populateClothes();
    });
    closeSidePageContainer();
}

// HANDLERS
const handleClickAddClothingView = () => {
    loadAddClothingView();
}

const handleClickLogOutfitView = () => {
    loadLogOutfitView();
}

const populateClothes = async () => {
    loadClothingList();

    getClothingList().forEach(clothing => {
        getNextClothingId();
        appendClothingElement(clothing);
    })
}

const appendClothingElement = clothing => {
    const { id, imageFile, brand, title, color, price } = clothing;
    const clothingElement = document.createElement('div');
    clothingElement.innerHTML = `
        <div class="clothing" id="${id}" onclick="handleClothingElementClick('${id}')">
            <img src="${imageFile}" alt="${id}">
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

    domSelect('clothes-container').insertBefore(clothingElement, domSelect('clothes-container').firstChild);
}

window.handleClothingElementClick = id => {
    const displayClothing = getClothingList().find(clothing => clothing.id === id);
    loadViewClothingView(displayClothing);
}

export {
    loadViewClothesView
}
