function showElement(id, value) {
  document.getElementById(id).innerHTML = value;
}

function updateTime() {
  for (const locationId in locations) {
    if (document.getElementById(`${locationId}-date`)) {
      let loactionElement = moment().tz(locations[locationId].timeZone);
      let date = loactionElement.format("MMMM Do YYYY");
      showElement(`${locationId}-date`, date);
      let time = loactionElement.format("h:mm:ss [<small>]A[</small>]");
      showElement(`${locationId}-time`, time);
    }
  }
}

function showCurrentCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();

    let cityName = cityTimeZone.split("/")[1];
    let cityTime = moment().tz(cityTimeZone);
    document.querySelector(".city-name").innerHTML = cityName;

    showElement("current-date", `${cityTime.format("MMMM Do YYYY")}`);
    showElement(
      "current-time",
      `${cityTime.format("h:mm:ss [<small>]A[</small>]")}`
    );
  }

  let clearButton = document.getElementById("clear-current");
  clearButton.addEventListener("click", hideCity);
}

function updateCurrentCityTime() {
  let cityTimeElement = document.getElementById("current-time");
  if (cityTimeElement) {
    let cityTime = moment().tz(moment.tz.guess());
    cityTimeElement.innerHTML = `${cityTime.format(
      "h:mm:ss"
    )} <small>${cityTime.format("A")}</small>`;
  }
}

function displayCity() {
  cityDiv = document.getElementById(document.getElementById("city").value);
  if (cityDiv) cityDiv.classList.remove("d-none");
}

function removeFromSelect() {
  let citySelector = document.getElementById("city");
  for (let i = 0; i < citySelector.length; i++)
    if (citySelector.options[i].value == document.getElementById("city").value)
      return citySelector.remove(i);
}

function getCityNameFromId(id) {
  if (id === "current") {
    return "My location 📍";
  }

  let words = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  let transformedName = words.join(" ");

  return transformedName;
}

function hideCity(event) {
  let locationId = event.target.id.split("-").slice(1).join("-");
  document.getElementById(locationId).classList.add("d-none");

  let citySelector = document.getElementById("city");
  let option = document.createElement("option");
  option.value = locationId;
  option.text = getCityNameFromId(locationId);
  citySelector.add(option, null);
}

const locations = {
  "los-angeles": {
    timeZone: "America/Los_Angeles",
  },
  sydney: {
    timeZone: "Australia/Sydney",
  },
  shanghai: {
    timeZone: "Asia/Shanghai",
  },
  milan: {
    timeZone: "Europe/Rome",
  },
  bucharest: {
    timeZone: "Europe/Bucharest",
  },
  toronto: {
    timeZone: "America/Toronto",
  },
  kamchatka: {
    timeZone: "Asia/Kamchatka",
  },
  galapagos: {
    timeZone: "Pacific/Galapagos",
  },
};

let citySelectElement = document.getElementById("city");
citySelectElement.addEventListener("change", displayCity);
citySelectElement.addEventListener("change", showCurrentCity);
citySelectElement.addEventListener("change", removeFromSelect);

document.querySelectorAll(".clear-button").forEach((clearButton) => {
  clearButton.addEventListener("click", hideCity);
});

updateTime();
setInterval(updateTime, 1000);
setInterval(updateCurrentCityTime, 1000);
