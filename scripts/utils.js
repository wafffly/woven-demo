// DOM UTILS

const domSelect = id => document.getElementById(id);

const hideDomElement = id => {
    domSelect(id).classList.remove('show');
}

const showDomElement = id => {
    domSelect(id).classList.add('show');
}

const showFadeDomElement = id => {
    showDomElement(id);
    setTimeout(() => {
        domSelect(id).classList.add('animated');
    }, 50);
}

const hideFadeDomElement = id => {
    domSelect('side-page-container').classList.remove('animated');
    setTimeout(() => {
        hideDomElement('side-page-container');
    }, 300);
}

export {
    domSelect,
    hideDomElement,
    showDomElement,
    showFadeDomElement,
    hideFadeDomElement
};