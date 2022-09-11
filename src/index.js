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

function showTemperature(response) {
  let temperatureRounded = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let descriptionElement = document.querySelector(".sky");
  let humidityElement = document.querySelector(".humidity-percent");
  let windElement = document.querySelector(".wind-speed");
  currentTemperature.innerHTML = `${temperatureRounded}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
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

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);
