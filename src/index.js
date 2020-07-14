import  from 'src/css/style.css';
// SELECT ELEMENTS


const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');


// Application data

const weather = {};


weather.temperature = {
  unit: 'celsius',
};


const KELVIN = 273;
// API KEY
const key = 'ab73f345f6f7f96fecd1554c0df21d58';


// CHECKING IF BROWSER SUPPORTS GEOLOCATION

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition);
}

// SET USER'S POSITION

function setPosition(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;

  getWeather(latitude, longitude);
}


// GET WEATHER API FROM API PROVIDER

function getWeather(latitude, longitude) {
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  console.log(api);

  fetch(api).then((response) => {
    const data = response.json();
    return data;
  })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeather();
    });
}


// DISPLAY WEATHER

function displayWeather() {
  iconElement.innerHTML = `<img src="./src/icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Change Celsius to Fahrenheit

function celsiusToFahrenheit(temperature) {
  return (temperature * 9 / 5) + 32;
}

// when the user  clicks on the temperature it changes
tempElement.addEventListener('click', () => {
  if (weather.temperature.unit == 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});
