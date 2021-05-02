//loading in the map

//Global variables to use
let form = document.querySelector(".form");
let latitude;
let longitude;
let date;
let map = L.map("map");
let coords = [latitude, longitude];
let api_answer;
let zoomLevel;
let clickedLongitude;
let clickedLatitude;

//Data for displaying when eveyrthing is submitted
let answer_latitude = document.querySelector(".latitude");
let answer_longitude = document.querySelector(".longitude");

// Fetch sunrise, sunset and day length data from external URL.
// For the url we need longitude, latitude. (date is optional but we will include it, so we could fetch data based on given data)
/*$(document).ready(function () {
  let url = `https://api.sunrise-sunset.org/json?lat=${58.35833}&lng=${26.71326}&date=${today}`;
});*/

function loadAPI(latitude, longitude, date) {
  let url;
  if (!date) {
    url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today&formatted=1`;
  } else {
    date = date.toString();
    url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=1`;
  }

  //Ajax request from the api
  let api_vastus = $.ajax({
    url: url,
    contentType: "application/json",
    dataType: "jsonp",
    success: function (data) {
      api_answer = data;
      //console.log(api_answer);
    },
  });

  return api_vastus;
}

//event listener for form submitting

form.addEventListener("submit", function (e) {
  e.preventDefault();

  latitude = document.getElementById("lat").value;
  longitude = document.getElementById("long").value;
  date = document.getElementById("date").value;
  loadAPI(latitude, longitude, date);
  loadPosition(latitude, longitude);
  /*  function isLatitude(latitude) {
    return isFinite(latitude) && Math.abs(latitude) <= 90;
  }

  latitude = isLatitude(latitude);

  function isLongitude(longitude) {
    return isFinite(longitude) && Math.abs(longitude) <= 180;
  }

  longitude = isLongitude(longitude);
 */
});

// SIIA TEHA TINGIMUS, MIS LISAB MARKEREID JA ANDMEID MAPILE VASTAVALT SELLELE, KAS ON PANNAKSE LÄBI VORMI ANDMED VÕI VAJUTATAKSE KAARDILE.
//form.addEventListener("submit", loadAPI(latitude, longitude, date));

//Function for loading the map
function loadMap(latitude, longitude, zoomLevel) {
  map.setView([latitude, longitude], zoomLevel);

  //Changed the titleLayer so it would look a bit different in style
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

//Function for loading the position
function loadPosition(lat, long, date) {
  // Copied from the leafletjs original documentation page
  // Reference: https://leafletjs.com/index.html
  L.marker([lat, long])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidht: 700,
        maxHeight: 200,
        className: "leaflet-popup",
        autoPan: true,
      })
    )
    .setPopupContent(
      `
     Latitude:<h3>${latitude}</h3>Longitude:<h3>${longitude}</h3>Timezone:<h3 class="coord_span">UTC</h3>
     <span class="day_length">Day Length: ${api_answer.results.day_length}</span><br>
     <span class="api_result">Sunrise:</span> ${api_answer.results.sunrise}<br>
     <span class="api_result">Sunset:</span> ${api_answer.results.sunset}`
    )
    .openPopup();

  //binds the view straight to the given location
  map.setView([latitude, longitude], zoomLevel);
}

//Display marker and the location data on click
function clickMap() {
  map.on("click", function (e) {
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;

    loadAPI(latitude, longitude);
    loadPosition(latitude, longitude);

    console.log(map);
    //For displaying the data to the client on the sidebar
    answer_latitude.innerHTML = e.latlng.lat;
    answer_longitude.innerHTML = e.latlng.lng;
  });
}
clickMap();

//Map initial load.
loadMap(58.7523778, 25.3319078, 7);

//Chart data from chart.js
const labels = ["Katse1", "Katse2", "Katse3", "Katse5"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "TEST LABEL",
      backgroundColor: "black",
      borderColor: "white",
      data: [1, 40, 35, 21, 20],
    },
  ],
};

const config = {
  type: "line",
  data,
  options: {},
};

var Day_Length_Chart = new Chart(document.getElementById("myChart"), config);
