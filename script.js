import {
    domSelect,
    getNextClothingId
} from '/scripts/utils.js';
import {
    loadAddClothingView
} from '/scripts/add-clothing.js';
import {
    loadViewClothingView
} from '/scripts/view-clothing.js';
import {
    loadLogOutfitView
} from '/scripts/log-outfit.js';
import { 
    loadClothingList,
    getClothingList,
} from './scripts/clothing-dao.js';

const switchViewButton = domSelect('switch-main-view');
let currentView = 'view-clothes-container.html';

/*
HANDLE PAGE LOADS AND REMOVES
*/
function loadViewClothesView() {
    domSelect('main-page-container').classList.add('show');
    setTimeout(() => {
        domSelect('main-page-container').classList.add('animated');
    }, 50);

    $('#main-page-container').load('pages/view-clothes-container.html', () => {
        // Event handlers
        domSelect('add-clothing').addEventListener('click', handleClickAddClothingView);
        domSelect('log-outfit').addEventListener('click', handleClickLogOutfitView);

        // Initialize main page by populating clothes
        populateClothes();
    });
    closeSidePageContainer();
}

function loadViewClothingSummaryView() {
    openSidePageContainer();

    $('#main-page-container').load('pages/clothing-summary-container.html');
    closeSidePageContainer();
}

window.openSidePageContainer = () => {
    domSelect('side-page-container').classList.add('show');
    setTimeout(() => {
        domSelect('side-page-container').classList.add('animated');
    }, 50);
}

window.closeSidePageContainer = () => {
    const sidePageContainerElement = domSelect('side-page-container');
    sidePageContainerElement.innerHTML = '';
    sidePageContainerElement.classList.remove('animated');
    setTimeout(() => {
        domSelect('side-page-container').classList.remove('show');
    }, 300);
}

/*
EVENT HANDLERS
*/

window.handleClothingElementClick = id => {
    const displayClothing = getClothingList().find(clothing => clothing.id === id);
    loadViewClothingView(displayClothing);
}

window.handleUploadClothingImage = () => {
    const imageUploadInputValue = domSelect('clothing-photo').value;
    const fileNameElement = domSelect('clothing-photo-file-name');

    fileNameElement.innerText = `You uploaded: ${imageUploadInputValue.replace(/^.*[\\\/]/, '')}`;
}

window.handleClickCloseSidePageContainer = () => {
    closeSidePageContainer();
}

function handleClickAddClothingView() {
    loadAddClothingView();
}

function handleClickLogOutfitView() {
    loadLogOutfitView();
}

function handleSwitchMainPageContainer() {
    const buttonText = title => `Switch to ${title}`;
    if (currentView === 'view-clothes-container.html') {
        currentView = 'clothing-summary-container.html';
        switchViewButton.innerText = buttonText('View Clothes');
        loadViewClothingSummaryView();
    } else {
        currentView = 'view-clothes-container.html';
        switchViewButton.innerText = buttonText('Clothing Summary');
        loadViewClothesView();
    }
}

/*
FETCH DATA / SAVE DATA
*/
async function populateClothes() {
    loadClothingList();

    getClothingList().forEach(clothing => {
        getNextClothingId();
        const clothingElement = createClothingElement(clothing);
        domSelect('clothes-container').insertBefore(clothingElement, domSelect('clothes-container').firstChild);
    })
}

/*
DOM ELEMENT CREATION HELPERS
*/
window.createClothingElement = clothing => {
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
    return clothingElement;
}

// INIT
$(document).ready(function() {
    loadViewClothesView();
})

// Global event listeners
switchViewButton.addEventListener('click', handleSwitchMainPageContainer);