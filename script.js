import { fetchBlynkData } from "./assets/blynk.js";

// DOM Elements
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const gasRawElement = document.getElementById("gas-raw");
const gasCompensatedElement = document.getElementById("gas-compensated");
const airQualityStatusElement = document.getElementById("air-quality-status");
const lastUpdatedElement = document.getElementById("last-updated");
const refreshButton = document.getElementById("refresh-button");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const darkModeSwitch = document.getElementById("dark-mode-switch");

// Modal Elements
const infoButton = document.getElementById("info-button");
const infoModal = document.getElementById("info-modal");
const closeModal = document.querySelector(".close");

let messageElement = null;
let previousTemperature = null;
let previousHumidity = null;
let previousRawGas = null;
let previousCompensatedGas = null;

// Function to show a temporary message
function showMessage(message, isError = false) {
  if (!messageElement) {
    messageElement = document.createElement("div");
    messageElement.style.position = "fixed";
    messageElement.style.bottom = "20px";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translateX(-50%)";
    messageElement.style.padding = "10px 20px";
    messageElement.style.color = "#fff";
    messageElement.style.borderRadius = "5px";
    messageElement.style.zIndex = "1000";
    document.body.appendChild(messageElement);
  }
  messageElement.textContent = message;
  messageElement.style.backgroundColor = isError ? "#dc3545" : "#007bff";
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 3000);
}

// Function to update last updated time
function updateLastUpdated() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  lastUpdatedElement.textContent = `Last Updated: ${hours}:${minutes}:${seconds}`;
}

// Function to update temperature color
function updateTemperatureColor(temperature) {
  const temperatureBox = temperatureElement.parentElement;
  temperatureBox.classList.remove(
    "temperature-cold",
    "temperature-cool",
    "temperature-warm",
    "temperature-hot",
    "temperature-error"
  );
  if (temperature < 20) {
    temperatureBox.classList.add("temperature-cold");
  } else if (temperature >= 20 && temperature < 27) {
    temperatureBox.classList.add("temperature-cool");
  } else if (temperature >= 27 && temperature < 30) {
    temperatureBox.classList.add("temperature-warm");
  } else {
    temperatureBox.classList.add("temperature-hot");
  }
}

// Function to update humidity color
function updateHumidityColor(humidity) {
  const humidityBox = humidityElement.parentElement;
  humidityBox.classList.remove(
    "humidity-dry",
    "humidity-moderate",
    "humidity-optimal",
    "humidity-humid",
    "humidity-very-humid",
    "humidity-error"
  );
  if (humidity < 30) {
    humidityBox.classList.add("humidity-dry");
  } else if (humidity >= 30 && humidity < 40) {
    humidityBox.classList.add("humidity-moderate");
  } else if (humidity >= 40 && humidity < 60) {
    humidityBox.classList.add("humidity-optimal");
  } else if (humidity >= 60 && humidity < 70) {
    humidityBox.classList.add("humidity-humid");
  } else {
    humidityBox.classList.add("humidity-very-humid");
  }
}

// Function to update Gas (RAW) color
function updateGasRawColor(rawValue) {
  const gasRawBox = gasRawElement.parentElement;
  gasRawBox.classList.remove("gas-raw-low", "gas-raw-medium", "gas-raw-high");
  if (rawValue <= 200) {
    gasRawBox.classList.add("gas-raw-low");
  } else if (rawValue <= 400) {
    gasRawBox.classList.add("gas-raw-medium");
  } else {
    gasRawBox.classList.add("gas-raw-high");
  }
}

// Function to update Gas (Compensated) color
function updateGasCompensatedColor(compensatedValue) {
  const gasCompensatedBox = gasCompensatedElement.parentElement;
  gasCompensatedBox.classList.remove(
    "gas-compensated-good",
    "gas-compensated-fair",
    "gas-compensated-poor"
  );
  if (compensatedValue <= 200) {
    gasCompensatedBox.classList.add("gas-compensated-good");
  } else if (compensatedValue <= 400) {
    gasCompensatedBox.classList.add("gas-compensated-fair");
  } else {
    gasCompensatedBox.classList.add("gas-compensated-poor");
  }
}

// Function to determine air quality status
function getAirQualityStatus(compensatedGas) {
  if (compensatedGas <= 200) {
    return "Very Good";
  } else if (compensatedGas <= 400) {
    return "Good";
  } else if (compensatedGas <= 600) {
    return "Fair";
  } else if (compensatedGas <= 800) {
    return "Poor";
  } else {
    return "Very Poor";
  }
}

// Function to update Air Quality color
function updateAirQualityColor(compensatedGas) {
  const airQualityBox = airQualityStatusElement.parentElement;
  airQualityBox.classList.remove(
    "air-quality-very-good",
    "air-quality-good",
    "air-quality-fair",
    "air-quality-poor",
    "air-quality-very-poor"
  );
  if (compensatedGas <= 200) {
    airQualityBox.classList.add("air-quality-very-good");
  } else if (compensatedGas <= 400) {
    airQualityBox.classList.add("air-quality-good");
  } else if (compensatedGas <= 600) {
    airQualityBox.classList.add("air-quality-fair");
  } else if (compensatedGas <= 800) {
    airQualityBox.classList.add("air-quality-poor");
  } else {
    airQualityBox.classList.add("air-quality-very-poor");
  }
}

// Function to fetch sensor data
async function getSensorData() {
  try {
    const temperature = parseFloat(await fetchBlynkData("V0"));
    const humidity = parseFloat(await fetchBlynkData("V1"));
    const rawGas = parseInt(await fetchBlynkData("V5"));
    const compensatedGas = parseFloat(await fetchBlynkData("V6"));

    if (
      isNaN(temperature) ||
      isNaN(humidity) ||
      isNaN(rawGas) ||
      isNaN(compensatedGas)
    ) {
      throw new Error("Invalid data received from ESP8266!");
    }

    return { temperature, humidity, rawGas, compensatedGas };
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
}

// Function to update UI with sensor data
function updateUI(temperature, humidity, rawGas, compensatedGas) {
  const airQualityStatus = getAirQualityStatus(compensatedGas);

  temperatureElement.textContent = `${temperature.toFixed(1)} °C`;
  humidityElement.textContent = `${humidity.toFixed(1)} %`;
  gasRawElement.textContent = rawGas;
  gasCompensatedElement.textContent = `${compensatedGas.toFixed(1)} ppm`;
  airQualityStatusElement.textContent = airQualityStatus;

  updateLastUpdated(); // Update "Last Updated" time
  updateTemperatureColor(temperature);
  updateHumidityColor(humidity);
  updateGasRawColor(rawGas);
  updateGasCompensatedColor(compensatedGas);
  updateAirQualityColor(compensatedGas);
}

// Function to handle errors
function handleError() {
  temperatureElement.textContent = "NaN °C";
  humidityElement.textContent = "NaN %";
  gasRawElement.textContent = "NaN";
  gasCompensatedElement.textContent = "NaN ppm";
  airQualityStatusElement.textContent = "--";
  showMessage("ESP8266 is offline. Unable to fetch data.", true);

  const temperatureBox = temperatureElement.parentElement;
  const humidityBox = humidityElement.parentElement;
  temperatureBox.classList.add("temperature-error");
  humidityBox.classList.add("humidity-error");
}

// Function to fetch and update data
async function fetchData() {
  try {
    const { temperature, humidity, rawGas, compensatedGas } =
      await getSensorData();

    if (
      temperature === previousTemperature &&
      humidity === previousHumidity &&
      rawGas === previousRawGas &&
      compensatedGas === previousCompensatedGas
    ) {
      showMessage("No updates available!", true);
      return;
    }

    updateUI(temperature, humidity, rawGas, compensatedGas);

    previousTemperature = temperature;
    previousHumidity = humidity;
    previousRawGas = rawGas;
    previousCompensatedGas = compensatedGas;

    showMessage("Data Updated!");
  } catch (error) {
    handleError();
  }
}

// Initial fetch
fetchData();

// Auto-refresh every 30 seconds (30000 milliseconds)
setInterval(fetchData, 30000);

// Event Listener for Refresh Button
refreshButton.addEventListener("click", fetchData);

// Function to update real-time clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;
  const day = now.getDate();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const date = `${day} ${month} ${year}`;

  timeElement.textContent = time;
  dateElement.textContent = date;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();

// Function to toggle dark mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// Check dark mode preference on page load
function checkDarkModePreference() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
  }
}

// Event Listener for Dark Mode Switch
darkModeSwitch.addEventListener("change", toggleDarkMode);

checkDarkModePreference();

// Modal Logic
infoButton.addEventListener("click", () => {
  infoModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  infoModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === infoModal) {
    infoModal.style.display = "none";
  }
});
