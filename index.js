import WEATHER_API_KEY from './apiKey.js';

function fetchWeatherData(cityInput) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${WEATHER_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((res) => displayResults(res))
    .catch(() => {
      alert('Please check for spelling mistakes or enter a correct city name.');
    });
}

function setInitialCityAndFetch(cityInput) {
  fetchWeatherData(cityInput);
}

let searchQuery = document.querySelector('.cityInput');
searchQuery.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getDataFromWeatherApi(searchQuery.value);
  }
}

// Function to fetch data from API based on input
function getDataFromWeatherApi(cityInput) {
  fetchWeatherData(cityInput);
}

// Function to display weather results
function displayResults(weatherData) {
  let city = document.querySelector('#cityName');
  city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

  let temp = document.querySelector('#temp');
  temp.innerText = `${weatherData.main.temp}°C`;

  let weatherDesc = document.querySelector('#weatherDesc');
  weatherDesc.innerText = `${weatherData.weather[0].main}`;

  let tempRange = document.querySelector('#tempRange');
  tempRange.innerText = `${Math.round(
    weatherData.main.temp_min
  )}°c / ${Math.round(weatherData.main.temp_max)}°c`;
}

// Set up date display
let dateElement = document.querySelector('#date');
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
dateElement.innerText = new Date().toLocaleDateString('en-GB', options);

// Set initial city and fetch data for Hyderabad
setInitialCityAndFetch('Hyderabad');
