import {
    domSelect
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

export {
    loadAddClothingView
};