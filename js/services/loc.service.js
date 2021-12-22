import { storageService } from './localStorage.service.js';
export const locService = {
    getLocs,
    saveLocsToStorage,
    removeLocation,
};

const STORAGE_KEY = 'locsDB';
const locs = [{
        id: makeId(),
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        createAt: Date.now(),
    },
    {
        id: makeId(),
        name: 'Neveragain',
        lat: 32.047201,
        lng: 34.832581,
        createAt: Date.now(),
    },
];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}

function saveLocsToStorage(name, lat, lng) {
    locs.push({
        id: makeId(),
        name,
        lat,
        lng,
        createAt: Date.now(),
    });
    storageService.save(STORAGE_KEY, locs);
}

function makeId(length = 6) {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function removeLocation(locationId) {
    var removeIdx = locs.findIndex((location) => {
        return locationId === location.id;
    });
    locs.splice(removeIdx, 1);
    storageService.save(STORAGE_KEY, locs);
}