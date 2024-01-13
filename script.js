const
  apiKey = "ba63e60dded6955f9a71ecaf07f12d95",

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?` +
    `units=metric&appid=${apiKey}`,

  searchInput = document.querySelector('.search-input'),
  searchBtn = document.querySelector('.search-btn'),
  weatherBox = document.querySelector('.weather-box'),
  weatherIcon = document.querySelector('.weather-icon'),
  errorBox = document.querySelector('.error-box'),

  locationEle = document.querySelector('.location'),
  temp = document.querySelector('.temperature'),
  humidity = document.querySelector('.humidity > .text > span'),
  wind = document.querySelector('.wind > .text > span');

async function checkWeather(locationVal) {
  const res = await fetch(apiUrl + '&q=' + locationVal);

  if (res.status == 404){
    weatherBox.style.display = 'none';
    errorBox.style.display = 'block';
  } else {
    const data = await res.json();

    locationEle.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + '°c';
    humidity.innerHTML = data.main.humidity + '%';
    wind.innerHTML = data.wind.speed + ' km/h';


    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
    }

    errorBox.style.display = 'none';
    weatherBox.style.display = 'block';

  }
  
  searchInput.value = "";

}

function search() {
  const val = searchInput.value.trim();

  if (val === '') {
    return;
  }

  checkWeather(val);
}

searchBtn.addEventListener("click", () => {
  search();
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
    search();
  }
});
