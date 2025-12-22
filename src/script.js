function refreshWeather(response) {
  let cityTemp = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityName = document.querySelector("#city-name");

  let cityConditions = document.querySelector("#conditions");
  let conditions = response.data.condition.description;

  let cityHumidity = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;

  let cityWindspeed = document.querySelector("#windspeed");
  let windspeed = response.data.wind.speed;

  let cityTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconImage = document.querySelector("#icon");

  cityName.innerHTML = response.data.city;
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  cityTemp.innerHTML = Math.round(temperature);
  cityTime.innerHTML = formatDate(date);
  cityConditions.innerHTML = conditions;
  cityHumidity.innerHTML = `${humidity}%`;
  cityWindspeed.innerHTML = `${windspeed} km/hr`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-column">
            <div class="forecast-day">${formatDay(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="forecast-icon" />
            </div>
            <div class="forecast-temps">
              <span class="forecast-high">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="forecast-low">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>
`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kelowna");
