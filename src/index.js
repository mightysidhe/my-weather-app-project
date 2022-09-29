let now = new Date();

let time = document.querySelector(".time");

let day = document.querySelector(".day");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

day.innerHTML = `${currentDay}`;
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sun"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `

    <div class="col">
      <div class="weekday">${formatDay(forecastDay.dt)}</div>
      <i class="${convertWeatherIcons(forecastDay.weather[0].icon)}"></i>
      <div class="temp">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>

`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertWeatherIcons(iconCode) {
  if (iconCode === "01d" || iconCode === "01n") {
    return "fa-solid fa-sun";
  } else if (iconCode === "02d" || iconCode === "02n") {
    return "fa-solid fa-cloud-sun";
  } else if (iconCode === "04d" || iconCode === "04n") {
    return "fa-solid fa-cloud";
  } else if (iconCode === "09d" || iconCode === "09n") {
    return "fa-solid fa-cloud-showers-heavy";
  } else if (iconCode === "10d" || iconCode === "10n") {
    return "fa-solid fa-cloud-sun-rain";
  } else if (iconCode === "11d" || iconCode === "11n") {
    return "fa-solid fa-cloud-bolt";
  } else if (iconCode === "13d" || iconCode === "13n") {
    return "fa-solid fa-snowflake";
  } else if (iconCode === "50d" || iconCode === "50n")
    return "fa-duotone fa-cloud-fog";
}

function getForecast(coordinates) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperatureRounded = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let descriptionElement = document.querySelector(".sky");
  let humidityElement = document.querySelector(".humidity-percent");
  let windElement = document.querySelector(".wind-speed");
  let cityElement = document.querySelector(".city");

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${temperatureRounded}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  let weatherElement = response.data.weather[0].icon;
  iconElement.setAttribute("class", convertWeatherIcons(weatherElement));

  getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  search(searchInput);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Kyiv");
