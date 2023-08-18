let viewClothesContainerElement = document.getElementById('view-clothes-container');
let clothesContainerElement = document.getElementById('clothes-container');
let addClothingButton = document.getElementById('add-clothing');

let imageUploadInput = document.getElementById('clothing-photo');
let titleInput = document.getElementById('clothing-title');
let brandInput = document.getElementById('clothing-brand');
let categorySelect = document.getElementById('clothing-category');
let priceInput = document.getElementById('clothing-price');
let colorInput = document.getElementById('clothing-color');

let nextId = 1;
let clothingList = [];

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

        imageUploadInput = document.getElementById('clothing-photo');
        titleInput = document.getElementById('clothing-title');
        brandInput = document.getElementById('clothing-brand');
        categorySelect = document.getElementById('clothing-category');
        priceInput = document.getElementById('clothing-price');
        colorInput = document.getElementById('clothing-color');

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
        imageUploadInput, 
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
async function populateClothes() {
    nextId = 1;
    clothingList = [];
    // first check the local storage for clothes
    if (localStorage.getItem('clothing') != null) {
        clothingList = JSON.parse(localStorage.getItem('clothing'));
    } else {
        clothingList = await fetch('data/clothing.json')
            .then(res => res.json());
        saveClothingLocalStorage();
    }

    clothingList.forEach(clothing => {
        nextId++;
        const clothingElement = createClothingElement(clothing);
        clothesContainerElement.insertBefore(clothingElement, clothesContainerElement.firstChild);
    })
}

function saveClothingLocalStorage() {
    if (clothingList !== []) {
        localStorage.setItem('clothing', JSON.stringify(clothingList));
    }
}

function saveClothing(imageFile, title, brand, category, price, color) {
    const imageFileURL = URL.createObjectURL(imageFile.files[0]);
    const clothing = {
        id: getNextClothingId(),
        imageFile: imageFileURL,
        brand,
        title,
        color,
        price,
        category
    };

    clothingList.push(clothing);
    saveClothingLocalStorage();

    displayAddClothingSuccess();

    const newClothingElement = createClothingElement(clothing);
    clothesContainerElement.insertBefore(newClothingElement, clothesContainerElement.firstChild);
}


/*
GENERAL HELPERS/VALIDATORS
*/
function displayAddClothingSuccess() {
    // make all the inputs disabled
    imageUploadInput.disabled = true;
    titleInput.disabled = true;
    brandInput.disabled = true;
    categorySelect.disabled = true;
    priceInput.disabled = true;

    const addClothingFormElement = document.getElementById('add-clothing-form');
    addClothingFormElement.classList.add('disabled');
    console.log("disabled");
}

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
    const { id, imageFile, brand, title, color, price } = clothing;
    const clothingElement = document.createElement('div');
    clothingElement.innerHTML = `
        <div class="clothing" id="${id}">
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