import { addToClothingList } from './clothing-dao.js';
import {
    domSelect,
    getNextClothingId
} from './utils.js';

const loadAddClothingView = () => {
    $('#side-page-container').load('pages/add-clothing-container.html', () => {
        openSidePageContainer();

        // Event handlers
        domSelect('close-add-clothing-container').addEventListener('click', handleClickCloseSidePageContainer);
        domSelect('save-clothing').addEventListener('click', handleClickSaveClothing);
        domSelect('clothing-photo').addEventListener('change', handleUploadClothingImage);
    });
}

const validateSaveClothing = inputs => {
    let isValid = true;

    inputs.forEach(input => {
        const smallText = domSelect(`${input.id}-small`);

        // clear the errors first
        smallText.classList.remove('show');
        smallText.innerText = '';
        
        if (input.value.trim() === '') {
            isValid = false;
            smallText.innerText = `${input.name} is required.`;
            smallText.classList.add('show');
        }
    });

    return isValid;
}

// HANDLERS

const handleClickSaveClothing = () => {
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

const handleUploadClothingImage = () => {
    const imageUploadInputValue = domSelect('clothing-photo').value;
    const fileNameElement = domSelect('clothing-photo-file-name');

    fileNameElement.innerText = `You uploaded: ${imageUploadInputValue.replace(/^.*[\\\/]/, '')}`;
}

// HELPERS

const saveClothing = (imageFile, title, brand, category, price, color) => {
    const imageFileURL = URL.createObjectURL(imageFile.files[0]);
    const clothing = {
        id: getNextClothingId(),
        imageFile: imageFileURL,
        brand,
        title,
        color,
        price,
        category,
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
    domSelect('clothing-photo').disabled = true;
    domSelect('clothing-title').disabled = true;
    domSelect('clothing-brand').disabled = true;
    domSelect('clothing-category').disabled = true;
    domSelect('clothing-price').disabled = true;
    domSelect('clothing-color').disabled = true;

    domSelect('add-clothing-form').classList.add('disabled');

    // show alert that clothing was successfully saved
    domSelect('clothing-saved-alert').classList.add('show');

    // turn the save clothing button to reset the form
    domSelect('save-clothing').innerText = 'Add another piece';
    // change the event listener to reset the form
    domSelect('save-clothing').removeEventListener('click', handleClickSaveClothing);
    domSelect('save-clothing').addEventListener('click', loadAddClothingView);
}

export {
    loadAddClothingView
};