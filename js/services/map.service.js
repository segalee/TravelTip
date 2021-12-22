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
// var gMap;
var infoWindow;
const STORAGE_KEY = "gMapDB";
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
  locationButton.innerHTML = `pan`;
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
      position: mapsMouseEvent.latLng
    //   lat: mapsMouseEvent.latLng.lat(),
    //   lng: mapsMouseEvent.latLng.lng(),
    });
    var newPos =
      (" latlang", JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
 
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(gMap);
    openModal(newPos);
  });
}

function getMap() {
  console.log("line11 gMap", gMap);
  return gMap;
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: "Hello World!",
  });
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
function openModal(newPos) {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modal .latlng span").innerHTML = newPos;
}

function submitModal(elForm, ev) {
  console.log("elForm", elForm);
  ev.preventDefault();
  const name = elForm.querySelector("[name=location-name]").value;
  const newPos = elForm.querySelector("p span").innerText;
  onSaveLocation(name, newPos);
  renderLocationInfo();
  elForm.querySelector("[name=location-name]").value = "";
  document.querySelector(".modal").style.display = "none";
}

function onSaveLocation(locName, newPos) {
  locService.saveLocsToStorage(locName, newPos);
  renderLocationInfo();
}

function renderLocationInfo() {
  const locInfo = storageService.load("locsDB");
  console.log("locInfo", locInfo);

  var htmlStr = ``;
  var locations = locInfo.map((location) => {
    htmlStr = `<tr>
    <td>${location.name}</td>
    <td>"${location.lat}"</td>
    <td>"${location.lng}"</td>
    <td>${location.createAt}</td>
    <td class = "remove" onclick="onRemove('${location.id}')"><i class="fas fa-trash"></i></td>
    </tr>`;

    return htmlStr;
  });
  const tBody = document.querySelector(".loc-body");
  tBody.innerHTML = locations.join("");
}

function onRemove(locationId) {
  console.log("locationId", locationId);
  remove(locationId);
  renderLocationInfo();
}
