import WEATHER_API_KEY from './apiKey.js';

console.log(WEATHER_API_KEY);
function fetchWeatherData(cityInput) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${cityInput}&aqi=no`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((res) => displayResults(res))
    .catch((error) => {
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
  city.innerText = `${weatherData.location.name}, ${weatherData.location.country}`;

  let temp = document.querySelector('#temp');
  temp.innerText = `${weatherData.current.temp_c}°C`;

  let weatherDesc = document.querySelector('#weatherDesc');
  weatherDesc.innerText = `${weatherData.current.condition.text}`;

  let tempRange = document.querySelector('#tempRange');
  const minTemp = Math.floor(weatherData.current.temp_c) - 4;
  const maxTemp = Math.floor(weatherData.current.temp_c) + 4;
  tempRange.innerText = `${minTemp}°C / ${maxTemp}°C`;
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
