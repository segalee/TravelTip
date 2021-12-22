import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
// import { storageService } from './services/localStorage.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;


function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// function onPanMyLocation() {
//     var map = mapService.initMap().then((res) => {
//         console.log(' res.data.map', res.data.map);
//         return res.data.map;
//     });
//     const gMap = map.then((map) => {
//         console.log('map', map);
//         map.addListener('click', (mapsMouseEvent) => {
//             // var locName = gName;
//             // var locName = prompt('Enter Location Name');
//             // Close the current InfoWindow.
//             infoWindow.close();
//             // Create a new InfoWindow.
//             infoWindow = new google.maps.InfoWindow({
//                 position: mapsMouseEvent.latLng,
//             });
//             var newPos =
//                 (' latlang', JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));

//             infoWindow.setContent(
//                 JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
//             );
//             infoWindow.open(map);
//             openModal(newPos);
//         });
//         return map;
//     });

//     //   const map = mapService.getMap();
// }

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        console.log('Locations:', locs);
        document.querySelector('.locs').innerText = JSON.stringify(locs);
    });
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords);
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
        })
        .catch((err) => {
            console.log('err!!!', err);
        });
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

