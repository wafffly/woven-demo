import { domSelect } from '/scripts/utils.js';
import { loadViewClothesView } from './scripts/view-clothes.js';
import { hideFadeDomElement, showFadeDomElement } from './scripts/utils.js';

const switchViewButton = domSelect('switch-main-view');
let currentView = 'view-clothes-container.html';

/*
HANDLE PAGE LOADS AND REMOVES
*/

function loadViewClothingSummaryView() {
    $('#main-page-container').load('pages/clothing-summary-container.html');
    closeSidePageContainer();
}

window.openSidePageContainer = () => {
    showFadeDomElement('side-page-container');
}

window.closeSidePageContainer = () => {
    domSelect('side-page-container').innerHTML = '';
    hideFadeDomElement('side-page-container');
}

/*
EVENT HANDLERS
*/

window.handleUploadClothingImage = () => {
    const imageUploadInputValue = domSelect('clothing-photo').value;
    const fileNameElement = domSelect('clothing-photo-file-name');

    fileNameElement.innerText = `You uploaded: ${imageUploadInputValue.replace(/^.*[\\\/]/, '')}`;
}

window.handleClickCloseSidePageContainer = () => {
    closeSidePageContainer();
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

// INIT
$(document).ready(function() {
    loadViewClothesView();
})

// Global event listeners
switchViewButton.addEventListener('click', handleSwitchMainPageContainer);