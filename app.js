// function for fetching data from the api.
function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        document.getElementById('weatherInfo').innerHTML = "";
        return;
    }
    // api key and url link.
    const apiKey = 'ddbcd4f4eaa58fdc6236000e53ff1db3'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=metric`; 

    // Fetching data from the api
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
            document.getElementById('weatherInfo').innerHTML = `<h1 style="color: red;">No City Found !</h1>`;
        });
}

// Displaying data dynamically.
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <br>
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Visibility: ${data.visibility} meters</p>
        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        <br>
    `;
}
