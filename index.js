//loading in the map

//Global variables to use
let latitude = document.getElementById("lat").value;
let longitude = document.getElementById("long").value;
let date = document.getElementById("date").value;
const zoomLevel = 13;
let map = L.map("map");
let coords = [latitude, longitude];

// Fetch sunrise, sunset and day length data from external URL.
// For the url we need longitude, latitude. (date is optional but we will include it, so we could fetch data based on given data)
/*$(document).ready(function () {
  let url = `https://api.sunrise-sunset.org/json?lat=${58.35833}&lng=${26.71326}&date=${today}`;
});*/

$.ajax({
  url: `https://api.sunrise-sunset.org/json?lat=${58.35833}&lng=${26.71326}&date=${"today"}`,
  contentType: "application/json",
  dataType: "jsonp",
  success: function (data) {
    console.log(data);
  },
});

//Function for loading the map
function loadMap() {
  map.setView([51.505, -0.09], 13);

  //Changed the titleLayer so it would look a bit different in style
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

//Function for loading the position
function loadPosition() {
  // Copied from the leafletjs original documentation page
  // Reference: https://leafletjs.com/index.html
  L.marker([58.35833, 26.71326])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidht: 250,
        maxHeight: 150,
        className: "leaflet-popup",
      })
    )
    .setPopupContent(
      `
     Day Length: ${"wdwdwdwd"}<br>
     Sunrise: ${1313113}<br>
     Sunset: ${2323232}`
    )
    .openPopup();
}

loadMap();
loadPosition();
