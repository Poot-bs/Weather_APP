const apiKey = "83f4794e9c37d53de0b329a32c3de826";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorMessage = document.getElementById("errorMessage");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        } else {
            const data = await response.json();

            temperature.innerHTML = `${Math.round(data.main.temp)} <span>°C</span>`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${data.wind.speed} Km/h`;

            const weatherCondition = data.weather[0].main;
            console.log(`Weather Condition: ${weatherCondition}`);

            switch (weatherCondition) {
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                case "Drizzle":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Mist":
                case "Haze":
                case "Fog":
                    weatherIcon.src = "images/mist.png";
                    break;
                case "Snow":
                    weatherIcon.src = "images/snow.png";
                    break;
                case "Clouds":
                    weatherIcon.src = "images/cloud.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
            }

            weatherBox.style.display = "block";
            weatherDetails.style.display = "flex";
            errorMessage.style.display = "none";
        }
    } catch (error) {
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent = error.message;
    }
}

searchButton.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
