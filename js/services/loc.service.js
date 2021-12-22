import { storageService } from './localStorage.service.js';
export const locService = {
<<<<<<< HEAD
    getLocs,
=======
  getLocs,
  saveLocsToStorage,
>>>>>>> 20398dc9a5611e27b0ce90e440d2891db0399c6b
};

import { storageService } from './localStorage.service.js';
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

<<<<<<< HEAD
function saveLocsToStorage() {
    storageService.save(STORAGE_KEY, locs);
=======
function saveLocsToStorage(locName, newPos) {
    console.log('newPos', newPos);
    console.log('newPos.lng', newPos.lng);
  locs.push({
    id: makeId(),
    name: locName,
    latlng: newPos,
    createAt: Date.now(),
  });
  storageService.save(STORAGE_KEY, locs);
>>>>>>> 20398dc9a5611e27b0ce90e440d2891db0399c6b
}

function makeId(length = 6) {
<<<<<<< HEAD
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
=======
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var txt = "";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}


>>>>>>> 20398dc9a5611e27b0ce90e440d2891db0399c6b
