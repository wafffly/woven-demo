import {
    domSelect
} from './utils.js';

const loadViewClothingView = clothing => {
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

export {
    loadViewClothingView
};