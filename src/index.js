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

function convertWeatherIcons(iconCode) {
  if (iconCode === "01d") {
    return "fa-solid fa-sun";
  } else if (iconCode === "01n") {
    return "fa-solid fa-moon";
  } else if (iconCode === "02d") {
    return "fa-solid fa-clouds-sun";
  } else if (iconCode === "02n") {
    return "fa-solid fa-clouds-moon";
  } else if (iconCode === "03d" || iconCode === "03n") {
    return "fa-solid fa-clouds-moon";
  } else if (iconCode === "04d" || iconCode === "04n") {
    return "fa-solid fa-cloud";
  } else if (iconCode === "09d" || iconCode === "09n") {
    return "fa-solid fa-cloud-showers-heavy";
  } else if (iconCode === "10d") {
    return "fa-solid fa-cloud-sun-rain";
  } else if (iconCode === "10n") {
    return "fa-solid fa-cloud-moon-rain";
  } else if (iconCode === "11d" || iconCode === "11n") {
    return "fa-solid fa-cloud-bolt";
  } else if (iconCode === "13d" || iconCode === "13n") {
    return "fa-solid fa-snowflake";
  } else if (iconCode === "50d" || iconCode === "50n")
    return "fa-duotone fa-cloud-fog";
}

function showTemperature(response) {
  let temperatureRounded = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let descriptionElement = document.querySelector(".sky");
  let humidityElement = document.querySelector(".humidity-percent");
  let windElement = document.querySelector(".wind-speed");
  let iconElement = document.querySelector("#icon");
  let weatherElement = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${temperatureRounded}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;

  iconElement.setAttribute("class", convertWeatherIcons(weatherElement));
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
