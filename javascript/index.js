function showElement(id, value) {
  document.querySelector(id).innerHTML = value;
}

function updateTime() {
  locations.forEach((location) => {
    let loactionElement = moment().tz(location.timeZone);
    let date = loactionElement.format("MMMM Do YYYY");
    showElement(location.dateElement, date);
    let time = loactionElement.format("h:mm:ss [<small>]A[</small>]");
    showElement(location.timeElement, time);
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  showElement(
    "#cities",
    `<div class="col-6 mb-2 pe-0">
       <div class="city-name">${cityName}</div>
       <div class="date">${cityTime.format(
         "MMMM Do YYYY"
       )}</div> <!-- Removed extra quotation mark -->
         </div>
         <div class="col-6 mb-2 time text-end">
         ${cityTime.format("h:mm:ss [<small>]A[</small>]")}
         </div>`
  );
}

let locations = [
  {
    name: "Los Angeles",
    timeZone: "America/Los_Angeles",
    dateElement: "#los-angeles-date",
    timeElement: "#los-angeles-time",
  },
  {
    name: "Sydney",
    timeZone: "Australia/Sydney",
    dateElement: "#sydney-date",
    timeElement: "#sydney-time",
  },
  {
    name: "Shanghai",
    timeZone: "Asia/Shanghai",
    dateElement: "#shanghai-date",
    timeElement: "#shanghai-time",
  },
  {
    name: "Milan",
    timeZone: "Europe/Rome",
    dateElement: "#milan-date",
    timeElement: "#milan-time",
  },
];

let citySelectElement = document.querySelector("#city");
citySelectElement.addEventListener("change", updateCity);

updateTime();
setInterval(updateTime, 1000);
