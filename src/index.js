//Display Current Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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

//let dateElement = document.querySelector("#city-date");
//dateElement.innerHTML = formatDate();

function displayTemperature(response){
let temperatureElement = document.querySelector("#city-temperature");
let cityElement = document.querySelector("#city-name");
let descriptionElement = document.querySelector("#city-description")
let humidityElement = document.querySelector("#city-humidity");
let windElement = document.querySelector("#city-windspeed");
let dateElement = document.querySelector("#city-date");
let iconElement = document.querySelector("#icon");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
windElement.innerHTML = `WindSpeend: ${Math.round(response.data.wind.speed)}`;
dateElement.innerHTML = formateDate(response.data.dt*1000);
iconElement.setAttribute("src,"`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt,"`http://openweathermap.org/img/wn/${response.dat.weather[0].description}@2x.png`);
}

let city = "New York"
let apikey = "5efeb759a9a2d75776085db8550371e8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;


axios.get(apiUrl).then (displayTemperature);