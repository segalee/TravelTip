export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    gMap,
};
import { storageService } from './localStorage.service.js';
// var gMap;
var infoWindow;
const STORAGE_KEY = 'gMapDB';
var gMap = storageService.load(STORAGE_KEY) || {};
window.gMap = gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    // if (Object.keys(gMap).length !== 0) {
    //     log
    //     console.log('retrieving from Cache');
    //     return Promise.resolve(gMap);
    // }
    return _connectGoogleApi().then(() => {
        infoWindow = new google.maps.InfoWindow();
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        });
        panCurrLocation();
        console.log('gMap.data.map:', gMap.data.map);
        // storageService.save(STORAGE_KEY, gMap.data.map);
        console.log('gMap.data.map:', gMap.data.map);

        return gMap;
    });
}

function panCurrLocation() {
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement('button');
    locationButton.innerHTML = `<i class="far fa-compass"></i>`;
    locationButton.classList.add('custom-map-control-button');
    gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(gMap);
                    console.log('gMap:', gMap);
                    console.log(' infoWindow.open(gMap):', infoWindow.open(gMap));
                    gMap.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, gMap.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, gMap.getCenter());
        }
    });
    gMap.addListener('click', (mapsMouseEvent) => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        var newPos =
            (' latlang', JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));

        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(gMap);
        // openModal(newPos);
    });
}

function getMap() {
    console.log('line11 gMap', gMap);
    return gMap;
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);

    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyBT1I0vf81TipqrRQ6ZrCfBKK20g1iG5ms'; //DONE: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
}