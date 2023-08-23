let nextId = 1;

const domSelect = id => document.getElementById(id);

const getNextClothingId = () => {
    return `clothing-${nextId++}`;
}

export {
    domSelect,
    getNextClothingId
};