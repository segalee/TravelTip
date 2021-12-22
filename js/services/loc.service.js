import { storageService } from './localStorage.service.js';
export const locService = {
    getLocs,
};
const KEY_STORAGE = 'locsDB';
const locs = [{
        id: makeRandId(),
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        createdAt: Date.now(),
    },
    {
        id: makeRandId(),
        name: 'Neveragain',
        lat: 32.047201,
        lng: 34.832581,
        createdAt: Date.now(),
    },
];

function saveLocsToStorage() {
    storageService.save(KEY_STORAGE, locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}

function makeRandId(length = 6) {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}