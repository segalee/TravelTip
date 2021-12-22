export const storageService = {
    save: saveToStorage,
    load: loadFromStorage,
    remove: removeFromStorage,
    clear: clearStorage,
};

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

function clearStorage() {
    localStorage.clear();
}