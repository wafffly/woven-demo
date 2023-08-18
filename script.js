let viewClothesContainerElement = document.getElementById('view-clothes-container');
let clothesContainerElement = document.getElementById('clothes-container');
let addClothingButton = document.getElementById('add-clothing');
let nextId = 1;

/*
HANDLE PAGE LOADS AND REMOVES
*/
function loadViewClothesView() {
    document.getElementById('main-page-container').classList.add('show');
    setTimeout(() => {
        document.getElementById('main-page-container').classList.add('animated');
    }, 50);

    $('#main-page-container').load('pages/view-clothes-container.html', () => {
        // DOM elements
        viewClothesContainerElement = document.getElementById('view-clothes-container');
        clothesContainerElement = document.getElementById('clothes-container');
        addClothingButton = document.getElementById('add-clothing');

        // Event handlers
        addClothingButton.addEventListener('click', handleClickAddClothingView);

        // Initialize main page by populating clothes
        populateClothes();
    });
}

function loadAddClothingView() {
    $('#side-page-container').load('pages/add-clothing-container.html', () => {
        document.getElementById('side-page-container').classList.add('show');
        setTimeout(() => {
            document.getElementById('side-page-container').classList.add('animated');
        }, 50);

        // DOM elements
        closeAddClothingContainerButton = document.getElementById('close-add-clothing-container');
        uploadClothingImageInput = document.getElementById('clothing-photo');
        saveClothingButton = document.getElementById('save-clothing');

        // Event handlers
        closeAddClothingContainerButton.addEventListener('click', handleClickCloseAddClothingView);
        saveClothingButton.addEventListener('click', handleClickSaveClothing);
        uploadClothingImageInput.addEventListener('change', handleUploadClothingImage);
    });
}

function closeAddClothingView() {
    const sidePageContainerElement = document.getElementById('side-page-container');
    sidePageContainerElement.innerHTML = '';
    sidePageContainerElement.classList.remove('animated');
    setTimeout(() => {
        document.getElementById('side-page-container').classList.remove('show');
    }, 300);
}

/*
EVENT HANDLERS
*/
function handleClickSaveClothing() {
    // get the values
    const imageUploadInput = document.getElementById('clothing-photo');
    const titleInput = document.getElementById('clothing-title');
    const brandInput = document.getElementById('clothing-brand');
    const categorySelect = document.getElementById('clothing-category');
    const priceInput = document.getElementById('clothing-price');
    const colorInput = document.getElementById('clothing-color');

    const isValid = validateSaveClothing([
        imageUploadInput, 
        titleInput, 
        brandInput,
        categorySelect, 
        priceInput, 
        colorInput
    ]);

    if (!isValid) return;

    saveClothing(
        imageUploadInput.value, 
        titleInput.value, 
        brandInput.value,
        categorySelect.value, 
        priceInput.value, 
        colorInput.value
    );
}

function handleUploadClothingImage() {
    const imageUploadInputValue = document.getElementById('clothing-photo').value;
    const fileNameElement = document.getElementById('clothing-photo-file-name');

    fileNameElement.innerText = `You uploaded: ${imageUploadInputValue.replace(/^.*[\\\/]/, '')}`;
}

function handleClickCloseAddClothingView() {
    closeAddClothingView();
}

function handleClickAddClothingView() {
    loadAddClothingView();
}

/*
FETCH DATA / SAVE DATA
*/
function populateClothes() {
    nextId = 1;
    fetch('data/clothing.json')
        .then(res => res.json())
        .then(data => {
            data.forEach((clothing) => {
                // increment nextId
                nextId++;

                // create clothing element
                const clothingElement = createClothingElement(clothing);
                clothesContainerElement.appendChild(clothingElement);
            });
        });
}

function saveClothing(imageFile, title, brand, category, price, color) {
    // implement
    console.log(getNextClothingId());
}


/*
GENERAL HELPERS/VALIDATORS
*/
function validateSaveClothing(inputs) {
    let isValid = true;

    inputs.forEach(input => {
        const smallText = document.getElementById(`${input.id}-small`);

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

function getNextClothingId() {
    return `clothing-${nextId++}`;
}

/*
DOM ELEMENT CREATION HELPERS
*/
function createClothingElement(clothing) {
    const { id, brand, title, color, price } = clothing;
    const clothingElement = document.createElement('div');
    clothingElement.innerHTML = `
        <div class="clothing" id="${id}">
            <img src="../images/${id}.jpeg" alt="${id}">
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