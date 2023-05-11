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

updateTime();
setInterval(updateTime, 1000);
