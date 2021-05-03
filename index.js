//Global variables to use
const chart_beginning = document.getElementById("chart_beginning");
const chartDates = document.querySelector(".chart_dates");
const chart_ending = document.getElementById("chart_ending");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
let form = document.querySelector(".form");
let latitude;
let longitude;
let date;
let map = L.map("map");
let map_html = document.getElementById("map");
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
  let api = $.ajax({
    url: url,
    contentType: "application/json",
    dataType: "jsonp",
    success: function (data) {
      api_answer = data.results;
    },
  });
  //API answer object and then add the lat, longitude and date for returning

  api_answer.lat = latitude;
  api_answer.long = longitude;
  api_answer.date = date;
  return api_answer;
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
     <span class="day_length">Day Length: ${api_answer.day_length}</span><br>
     <span class="api_result">Sunrise:</span> ${api_answer.sunrise}<br>
     <span class="api_result">Sunset:</span> ${api_answer.sunset}`
    )
    .openPopup();

  //binds the view straight to the given location
  map.setView([latitude, longitude], zoomLevel);

  let coordinates = [latitude, longitude, date];

  return coordinates;
}

//Map initial load.
loadMap(58.7523778, 25.3319078, 7);

//Display marker and the location data on click
function clickMap() {
  map.on("click", function (e) {
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;

    loadAPI(latitude, longitude);
    loadPosition(latitude, longitude);
  });
}
clickMap();

function LoadChart(date1, date2) {
  //We get the data from given date inputs
  date1 = chart_beginning.value;
  date2 = chart_ending.value;

  //Chart data for x-axis
  const labels = ["Katse1", "Katse2", "Katse3", "Katse5"];

  const data = {
    labels: labels, //Data for x-axis
    datasets: [
      {
        label: "TEST LABEL",
        backgroundColor: "black", //The dots color
        borderColor: "red", //Color for the line
        data: [1, 40, 35, 21, 20], //Data to display on y-axis
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {},
  };

  //Display the chart
  const Day_Length_Chart = new Chart(
    document.getElementById("myChart"),
    config
  );

  return Day_Length_Chart;
}

//Chart modal window popup content
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  map_html.classList.add("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  map_html.classList.remove("hidden");
};
// For displaying the chart and its data
btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal); //You can click on the gray area to exit the chart area

// You can exit the chart by clicking on the overlay (gray) area
overlay.addEventListener("click", closeModal());

//Prevent submit default behaviour
chartDates.addEventListener("submit", function (e) {
  e.preventDefault();
  //let chart_API = loadAPI();

  LoadChart();
});

/*--------------CHART ENDS HERE---------------*/

// Returns an array of dates between the two dates. Kuupäevade funktsiooni leidsin siit:https://gist.github.com/miguelmota/7905510
/*var getDates = function (startDate, endDate) {
  var dates = [],
    currentDate = startDate,
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

// Usage
var dates = getDates(new Date(2013, 10, 22), new Date(2013, 11, 25));
dates.forEach(function (date) {});*/
