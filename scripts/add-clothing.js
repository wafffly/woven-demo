import { addToClothingList } from './clothing-dao.js';
import {
    domSelect,
    getNextClothingId,
    hideDomElement,
    showDomElement
} from './utils.js';

const getFields = () => {
    return {
        clothingPhoto: domSelect('clothing-photo'), 
        clothingTitle: domSelect('clothing-title'), 
        clothingBrand: domSelect('clothing-brand'),
        clothingCategory: domSelect('clothing-category'), 
        clothingPrice: domSelect('clothing-price'), 
        clothingColor: domSelect('clothing-color')
    };
}

const loadAddClothingView = () => {
    $('#side-page-container').load('pages/add-clothing-container.html', () => {
        openSidePageContainer();

        // Event handlers
        domSelect('close-add-clothing-container').addEventListener('click', handleClickCloseSidePageContainer);
        domSelect('save-clothing').addEventListener('click', handleClickSaveClothing);
        domSelect('clothing-photo').addEventListener('change', handleUploadClothingImage);
    });
}

const validateSaveClothing = () => {
    let isValid = true;

    Object.values(getFields()).forEach(input => {
        const smallTextId = `${input.id}-small`;

        // clear the errors first
        hideDomElement(smallTextId);
        domSelect(smallTextId).innerText = '';
        
        if (input.value.trim() === '') {
            isValid = false;
            domSelect(smallTextId).innerText = `${input.name} is required.`;
            showDomElement(smallTextId);
        }
    });

    return isValid;
}

// HANDLERS

const handleClickSaveClothing = () => {
    const isValid = validateSaveClothing();
    if (!isValid) return;
    saveClothing();
}

const handleUploadClothingImage = () => {
    const imageUploadInputValue = domSelect('clothing-photo').value;
    const fileNameElement = domSelect('clothing-photo-file-name');

    fileNameElement.innerText = `You uploaded: ${imageUploadInputValue.replace(/^.*[\\\/]/, '')}`;
}

// HELPERS

const saveClothing = () => {
    const fields = getFields();
    const imageFileURL = URL.createObjectURL(fields.clothingPhoto.files[0]);
    const clothing = {
        id: getNextClothingId(),
        imageFile: imageFileURL,
        brand: fields.clothingBrand.value,
        title: fields.clothingTitle.value,
        color: fields.clothingColor.value,
        price: fields.clothingPrice.value,
        category: fields.clothingCategory.value,
        worn: 0
    };

    addToClothingList(clothing);
    displayAddClothingSuccess();

    const newClothingElement = createClothingElement(clothing);
    domSelect('clothes-container').insertBefore(newClothingElement, domSelect('clothes-container').firstChild);
}

// DOM HELPERS

const displayAddClothingSuccess = () => {
    // make all the inputs disabled
    Object.values(getFields()).forEach(field => field.disabled = true);

    domSelect('add-clothing-form').classList.add('disabled');

    // show alert that clothing was successfully saved
    showDomElement('clothing-saved-alert');

    // turn the save clothing button to reset the form
    domSelect('save-clothing').innerText = 'Add another piece';
    // change the event listener to reset the form
    domSelect('save-clothing').removeEventListener('click', handleClickSaveClothing);
    domSelect('save-clothing').addEventListener('click', loadAddClothingView);
}

export {
    loadAddClothingView
};