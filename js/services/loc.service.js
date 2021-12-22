export const locService = {
  getLocs,
  saveLocsToStorage,
};

import { storageService } from "./localStorage.service.js";
const STORAGE_KEY = "locsDB";
const locs = [
  {
    id: makeId(),
    name: "Greatplace",
    lat: 32.047104,
    lng: 34.832384,
    createAt: Date.now(),
  },
  {
    id: makeId(),
    name: "Neveragain",
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
}
function makeId(length = 6) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var txt = "";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}


