function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    
    // Convert temperature from Kelvin to Celsius
    const temperature = Math.round(data.main.temp - 273.15);
    
    // Update weather container with fetched data
    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}
