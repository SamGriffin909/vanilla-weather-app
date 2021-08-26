//Display Current Date
function formatDate() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#city-date");
dateElement.innerHTML = formatDate();

function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city-name");
let descriptionElement = document.querySelector("#city-description")
let humidityElement = document.querySelector("#city-humidity");
let windElement = document.querySelector("#city-windspeed");
let dateElement = document.querySelector("#city-date");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.dat.weather[0].description;
humnidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed)
;
dateElement.innerHTML = "Test Date"}

let apikey = "5efeb759a9a2d75776085db8550371e8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);