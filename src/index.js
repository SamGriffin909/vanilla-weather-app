//Local Variables
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

  let dayIndex = date.getDay();
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

  return `Last Updated at ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  return days[day];

}

//dynamic HTML using Javascript

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement=document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) { if(index<6){
  forecastHTML = 
     forecastHTML + 
             `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temperature">
                <span id="low-temp">${Math.round(forecastDay.temp.min)}</span>°|
                <span id="high-temp">${Math.round(forecastDay.temp.max)}</span>°
              </div>
              </div>
            `;
      }

  });
forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML= forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apikey = "5efeb759a9a2d75776085db8550371e8";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
let temperatureElement = document.querySelector("#city-temperature");
let cityElement = document.querySelector("#city-name");
let descriptionElement = document.querySelector("#city-description")
let humidityElement = document.querySelector("#city-humidity");
let windElement = document.querySelector("#city-windspeed");
//let precipitationElement = document.querySelector("#city-precipitation");
let dateElement = document.querySelector("#city-date");
let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
//precipitationElement.innerHTML = response.data.rain[`1h`];
dateElement.innerHTML = formatDate(response.data.dt*1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",`http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);

getForecast(response.data.coord);
}

function search(city){

let apikey = "5efeb759a9a2d75776085db8550371e8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then (displayTemperature);
  
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);

}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temperature");
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temperature");
   //remove the active class from the fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


//global variables, available inside all functions

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("New York");