console.log("hello main.js");

//get dynamic URL
function generateWeatherApiUrl(city, apiKey) {
    return `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`;
}

//function to get current weather details from the API
async function getWeatherDetails(url) {
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();

        //extract necessary values from the API response
        const {localtime, name, country} = jsonResponse.location;
        const {temp_c, condition} = jsonResponse.current;
        const {icon, text} = condition;
        const placeHolderValue = "#weather-info-placeholder";

        //innerHTML template to form HTML code and over-write existing div section
        displayWeatherInfo(localtime, name, country, temp_c, icon, text, placeHolderValue);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector("#weather-info-placeholder").innerHTML = 
            "<p>Error loading weather data. Please try again.</p>";
    }
}

//displays a template innerHTMML code
function displayWeatherInfo(localtime, name, country, temp_c, icon, text, placeHolderValue) {
    const placeholder = document.querySelector(placeHolderValue);
    placeholder.innerHTML = `
        <div class="weather-card">
            <p class="datetime">📅 ${localtime}</p>
            <p class="location">📍 ${name}, ${country}</p>
            <div class="weather-main">
                <span class="temperature">${temp_c}°C</span>
                <img src="${icon}" alt="${text}" class="weather-icon"/>
                <span class="condition">${text}</span>
            </div>
        </div>
    `;
}

// API key - using the same one from your code
const apiKey = "2388e3c918c94d5a8e5235357260302";

// Function to handle search button click
function handleSearch() {
    const select = document.getElementById("location-select");
    const selectedCity = select.value;
    
    const url = generateWeatherApiUrl(selectedCity, apiKey);
    getWeatherDetails(url);
}

// Add event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", handleSearch);
    
    // Optional: Load default city (Toronto) on page load
    // handleSearch();
});