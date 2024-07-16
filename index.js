// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch weather data
  function fetchWeatherData(cityInput) {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=f5f6d87a59c54dfdb88175120241607&q=${cityInput}&aqi=no`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => displayResults(res))
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        alert(
          'Please check for spelling mistakes or enter a correct city name.'
        );
      });
  }

  // Function to set initial city and fetch data
  function setInitialCityAndFetch(cityInput) {
    fetchWeatherData(cityInput);
  }

  // Event listener for input field
  let searchQuery = document.querySelector('.cityInput');
  searchQuery.addEventListener('keypress', setQuery);

  // Function to handle input field query
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
});