import {
    domSelect,
    getNextClothingId
} from '/scripts/utils.js';
import {
    loadAddClothingView,
} from '/scripts/add-clothing.js';
import { 
    loadClothingList,
    getClothingList,
    saveClothingList
} from './scripts/clothing-dao.js';

const switchViewButton = domSelect('switch-main-view');
let currentView = 'view-clothes-container.html';

let selectedClothingForOutfitList = [];

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

function loadLogOutfitView() {
    $('#side-page-container').load('pages/log-outfit-container.html', () => {
        openSidePageContainer();

        selectedClothingForOutfitList = [];

        // Initialize data
        loadLogOutfitSelect();
        
        // Event handlers
        domSelect('close-log-outfit-container').addEventListener('click', handleClickCloseSidePageContainer);
        domSelect('add-clothing-for-outfit').addEventListener('change', handleLogOutfitSelect);
        domSelect('save-outfit').addEventListener('click', handleClickSaveOutfit);
    });
}

function loadViewClothingView(clothing) {
    $("#side-page-container").load('pages/view-clothing-container.html', () => {
        openSidePageContainer();

        domSelect('view-clothing-img').src = clothing.imageFile;
        domSelect('view-clothing-brand').innerHTML = `
            <span class='label'>Brand</span>
            <span class='value'>${clothing.brand}</span>
        `;
        domSelect('view-clothing-title').innerHTML = `
            <span class='label'>Title</span>
            <span class='value'>${clothing.title}</span>
        `;
        domSelect('view-clothing-color').innerHTML = `
            <span class='label'>Color</span>
            <span class='value'>${clothing.color}</span>
        `;
        domSelect('view-clothing-category').innerHTML = `
            <span class='label'>Category</span>
            <span class='value'>${clothing.category}</span>
        `;
        domSelect('view-clothing-price').innerHTML = `
            <span class='label'>Price</span>
            <span class='value'>${clothing.price}</span>
        `;
        domSelect('view-clothing-worn').innerHTML = `
            <span class='label'>Number of Wears</span>
            <span class='value'>${clothing.worn}</span>
        `;

        // Event handlers
        domSelect('close-view-clothing-container').addEventListener('click', handleClickCloseSidePageContainer);
    })
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
window.handleClickSaveClothing = () => {
    const isValid = validateSaveClothing([
        domSelect('clothing-photo'), 
        domSelect('clothing-title'), 
        domSelect('clothing-brand'),
        domSelect('clothing-category'), 
        domSelect('clothing-price'), 
        domSelect('clothing-color')
    ]);

    if (!isValid) return;

    saveClothing(
        domSelect('clothing-photo'), 
        domSelect('clothing-title').value, 
        domSelect('clothing-brand').value,
        domSelect('clothing-category').value, 
        domSelect('clothing-price').value, 
        domSelect('clothing-color').value
    );
}

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

function handleLogOutfitSelect(e) {
    if (e.target.value === "none") return;
    // add the selected item into the selected list
    selectedClothingForOutfitList.push(e.target.value);
    loadSelectedPiecesList();
    loadLogOutfitSelect();
}

function handleClickSaveOutfit() {
    const outfitSavedAlert = domSelect('outfit-saved-alert');
    outfitSavedAlert.classList.remove('show');

    // validate if the outfit is empty (no clothes)
    const outfitEmptyErrorElement = domSelect('outfit-empty-error');
    outfitEmptyErrorElement.classList.remove('show');

    if (selectedClothingForOutfitList.length === 0) {
        outfitEmptyErrorElement.classList.add('show');
        return;
    }
    saveLogOutfit();
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

function loadLogOutfitSelect() {
    domSelect('add-clothing-for-outfit').innerHTML = '';

    const defaultElement = document.createElement('option');
    defaultElement.value = 'none';
    defaultElement.innerText = 'Select clothing';
    domSelect('add-clothing-for-outfit').appendChild(defaultElement);

    getClothingList()
        .filter(clothing => !selectedClothingForOutfitList.includes(clothing.id))
        .forEach(clothing => {
        const clothingSelectionElement = document.createElement('option');
        clothingSelectionElement.value = clothing.id;
        clothingSelectionElement.innerText = `${clothing.brand} ${clothing.title}`;

        domSelect('add-clothing-for-outfit').appendChild(clothingSelectionElement);
    })
}

/*
GENERAL HELPERS/VALIDATORS
*/

function loadSelectedPiecesList() {
    // load the selected pieces of an outfit
    const selectedPiecesList = domSelect('selected-pieces-list');
    selectedPiecesList.innerHTML = '';
    selectedClothingForOutfitList.forEach(clothingId => {
        const clothing = getClothingList().find(item => item.id === clothingId);

        const selectedClothingElement = document.createElement('li');
        selectedClothingElement.innerText = `${clothing.brand} ${clothing.title}`
        selectedPiecesList.insertBefore(selectedClothingElement, selectedPiecesList.firstChild);
    })
}

function saveLogOutfit() {
    selectedClothingForOutfitList.forEach(selectedClothingId => {
        const clothingIndex = getClothingList().findIndex(clothing => selectedClothingId === clothing.id);
        getClothingList()[clothingIndex].worn++;
    })

    // save the clothing list to local storage
    saveClothingList();

    // display successfully saved alert
    domSelect('outfit-saved-alert').classList.add('show');
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