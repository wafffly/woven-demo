import {
    domSelect
} from './utils.js';
import {
    getClothingList,
    saveClothingList
} from './clothing-dao.js';

let selectedClothingForOutfitList = [];

const handleLogOutfitSelect = (e) => {
    if (e.target.value === "none") return;
    // add the selected item into the selected list
    selectedClothingForOutfitList.push(e.target.value);
    loadSelectedPiecesList();
    loadLogOutfitSelect();
}

const handleClickSaveOutfit = () => {
    domSelect('outfit-saved-alert').classList.remove('show');

    // validate if the outfit is empty (no clothes)
    domSelect('outfit-empty-error').classList.remove('show');

    if (selectedClothingForOutfitList.length === 0) {
        domSelect('outfit-empty-error').classList.add('show');
        return;
    }
    saveLogOutfit();
}

const loadSelectedPiecesList = () => {
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

const saveLogOutfit = () => {
    selectedClothingForOutfitList.forEach(selectedClothingId => {
        const clothingIndex = getClothingList().findIndex(clothing => selectedClothingId === clothing.id);
        getClothingList()[clothingIndex].worn++;
    })

    // save the clothing list to local storage
    saveClothingList();

    // display successfully saved alert
    domSelect('outfit-saved-alert').classList.add('show');
}

const loadLogOutfitSelect = () => {
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

const loadLogOutfitView = () => {
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

export {
    loadLogOutfitView
};