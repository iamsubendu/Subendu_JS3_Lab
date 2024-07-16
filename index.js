let date = document.querySelector('#date');
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

date.innerText = new Date().toLocaleDateString('en-GB', options);

let searchQuery = document.querySelector('.cityInput');

searchQuery.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    // for enter -> value is 13
    // https://www.toptal.com/developers/keycode
    getDataFromWeatherApi(searchQuery.value);
  }
}

function getDataFromWeatherApi(cityInput) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=f5f6d87a59c54dfdb88175120241607&q=${cityInput}&aqi=no`
  )
    .then((res) => res.json())
    .then((res) => displayResults(res));
}

getDataFromWeatherApi('Hyderabad');

function displayResults(weatherData) {
  let city = document.querySelector('#cityName');
  city.innerText = `${weatherData.location.name} ,${weatherData.location.country}`;
  let temp = document.querySelector('#temp');
  temp.innerText = `${weatherData.current.temp_c}°C`;
  let weatherDesc = document.querySelector('#weatherDesc');
  weatherDesc.innerText = `${weatherData.current.condition.text}`;
  let tempRange = document.querySelector('#tempRange');
  const minTemp = weatherData.current.temp_c - 4;
  const maxTemp = weatherData.current.temp_c + 4;
  tempRange.innerText = `${minTemp}°C / ${maxTemp}°C`;
}
