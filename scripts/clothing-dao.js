let clothingList = [];

const loadClothingList = async () => {
    clothingList = [];
    // first check the local storage for clothes
    if (localStorage.getItem('clothing') != null) {
        clothingList = JSON.parse(localStorage.getItem('clothing'));
    } else {
        clothingList = await fetch('data/clothing.json')
            .then(res => res.json());
        saveClothingList();
    }
}

const saveClothingList = () => {
    if (clothingList.length !== 0) {
        localStorage.setItem('clothing', JSON.stringify(clothingList));
    }
}

const addToClothingList = (clothing) => {
    clothingList.push(clothing);
    saveClothingList();
}

const getClothingList = () => clothingList;

export {
    addToClothingList,
    loadClothingList,
    saveClothingList,
    getClothingList
}