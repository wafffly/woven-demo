import {
    domSelect
} from './utils.js';

const clothingFieldsConfig = {
    brand: { title: 'Brand' },
    title: { title: 'Title' },
    color: { title: 'Color' },
    category: { title: 'Category' },
    price: { title: 'Price' },
    worn: { title: 'Number of Wears' }
};

const loadViewClothingView = clothing => {
    $("#side-page-container").load('pages/view-clothing-container.html', () => {
        openSidePageContainer();

        domSelect('view-clothing-img').src = clothing.imageFile;
        Object.entries(clothingFieldsConfig).forEach(([id, { title }]) => {
            domSelect(`view-clothing-${id}`).innerHTML = `
                <span class='label'>${title}</span>
                <span class='value'>${clothing[id]}</span>
            `;
        });

        // Event handlers
        domSelect('close-view-clothing-container').addEventListener('click', handleClickCloseSidePageContainer);
    })
}

export {
    loadViewClothingView
};