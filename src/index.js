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
time.innerHTML = `${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let city = document.querySelector(".city");
  city.innerHTML = `${searchInput.value}`;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);
