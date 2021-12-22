export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    gMap,
};

import { storageService } from "./localStorage.service.js";
import { locService } from "./loc.service.js";
window.submitModal = submitModal;
window.onRemoveLocation = onRemoveLocation;
window.onPanLocation = onPanLocation;
window.addMarker = addMarker;
window.addMarkerInput = addMarkerInput;

// var gMap;
var infoWindow;
const STORAGE_KEY = "gMapDB";
var gMap = storageService.load(STORAGE_KEY) || {};
window.gMap = gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    document.querySelector(".modal").style.display = "none";
  return _connectGoogleApi().then(() => {
    infoWindow = new google.maps.InfoWindow();
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    });
    panCurrLocation();
    console.log("gMap.data.map:", gMap.data.map);
    // storageService.save(STORAGE_KEY, gMap.data.map);
    console.log("gMap.data.map:", gMap.data.map);

    return gMap;
  });
}

function panCurrLocation() {
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.innerHTML = `<i class="far fa-compass"></i>`;
  locationButton.classList.add("custom-map-control-button");
  gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(gMap);
          console.log("gMap:", gMap);
          console.log(" infoWindow.open(gMap):", infoWindow.open(gMap));
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
  gMap.addListener("click", (mapsMouseEvent) => {
    infoWindow.close();
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,

      lat: mapsMouseEvent.latLng.lat(),
      lng: mapsMouseEvent.latLng.lng(),
    });

    var newPos =
      (" latlang", JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));

    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(gMap);

    openModal(infoWindow.lat, infoWindow.lng);
  });
}

function renderSearchValues() {
  const locs = storageService.load("locsDB");
  console.log("locs", locs);
  var str = locs.map((loc) => {
    return ` <option value="${loc.name}"></option>`;
  });
  document.querySelector("datalist").innerHTML += str;
}

function getMap() {
  console.log("line11 gMap", gMap);
  return gMap;
}

function addMarker(lat, lng) {
  //console.log("loc", loc);
  var marker = new google.maps.Marker({
    position: { lat, lng },
    map: gMap,
    title: "Hello World!",
  });
  //   console.log('position', position);
  infoWindow.setPosition({ lat, lng });
  console.log("marker", marker);
  return marker;
}

function addMarkerInput(ev, elForm) {
  ev.preventDefault();
  var name = elForm.querySelector("input").value;
  const locs = storageService.load("locsDB");
  var currLoc = locs.find((loc) => {
    return loc.name === name;
  });
  var latlng = new google.maps.LatLng({ lat: +currLoc.lat, lng: +currLoc.lng });
  var marker = new google.maps.Marker({
    map: gMap,
    title: "Hello World!",
  });
  marker.setPosition(latlng);
  infoWindow.setPosition(latlng);
  console.log("marker", marker);
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);

  gMap.panTo(laLatLng);
}
//comment
function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = "AIzaSyBT1I0vf81TipqrRQ6ZrCfBKK20g1iG5ms"; //DONE: Enter your API Key
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}
//test
function openModal(lat, lng) {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modal .lat").innerHTML = lng;
  document.querySelector(".modal .lng").innerHTML = lat;
}

function submitModal(elForm, ev) {
  console.log("elForm", elForm);
  ev.preventDefault();
  const name = elForm.querySelector("[name=location-name]").value;
  const lng = elForm.querySelector(".modal .lat").innerText;
  const lat = elForm.querySelector(".modal .lng ").innerText;
  onSaveLocation(name, lat, lng);
  //   renderLocationInfo();
  elForm.querySelector("[name=location-name]").value = "";
  document.querySelector(".modal").style.display = "none";
  renderSearchValues();
}

function onSaveLocation(name, lat, lng) {
  locService.saveLocsToStorage(name, lat, lng);
  renderLocationInfo();
}

function renderLocationInfo() {
  const locInfo = storageService.load("locsDB");
  console.log("locInfo", locInfo);

  var htmlStr = ``;
  var locations = locInfo.map((location) => {
    htmlStr = `<tr>
    <td>${location.name}</td>
    <td>'${location.lat}'</td>
    <td>'${location.lng}'</td>
    <td>${location.createAt}</td>
    <td class = "remove" onclick="onRemoveLocation('${location.id}')"><i class="fas fa-trash"></i></td>
    <td><button onclick="addMarker(${location.lat}, ${location.lng})">Go!</button></td>

    </tr>`;

    return htmlStr;
  });
  const tBody = document.querySelector(".loc-body");
  tBody.innerHTML = locations.join("");
}

function onPanLocation() {
  console.log("hi");
}

function onRemoveLocation(locationId) {
  console.log("locationId", locationId);
  // storageService.remove(locationId);
  locService.removeLocation();
  renderLocationInfo();
}
