import { fetchBlynkData } from "./assets/blynk.js";

// DOM Elements
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const lastUpdatedElement = document.getElementById("last-updated");
const refreshButton = document.getElementById("refresh-button");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const darkModeSwitch = document.getElementById("dark-mode-switch");

function showMessage(message, isError = false) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.style.position = "fixed";
  messageElement.style.bottom = "20px";
  messageElement.style.left = "50%";
  messageElement.style.transform = "translateX(-50%)";
  messageElement.style.padding = "10px 20px";
  messageElement.style.backgroundColor = isError ? "#dc3545" : "#007bff";
  messageElement.style.color = "#fff";
  messageElement.style.borderRadius = "5px";
  messageElement.style.zIndex = "1000";
  document.body.appendChild(messageElement);

  // Hapus pesan setelah 3 detik
  setTimeout(() => {
    document.body.removeChild(messageElement);
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
  } else if (temperature >= 20 && temperature < 25) {
    temperatureBox.classList.add("temperature-cool");
  } else if (temperature >= 25 && temperature < 30) {
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

let previousTemperature = null;
let previousHumidity = null;
// Function to fetch and update data
async function fetchData() {
  try {
    const temperature = parseFloat(await fetchBlynkData("V0"));
    const humidity = parseFloat(await fetchBlynkData("V1"));

    // Cek jika data yang diterima null (ESP8266 offline)
    if (temperature === null || humidity === null) {
      throw new Error("ESP8266 is offline or invalid data"); // Tangkap jika data null
    }

    // Jika data tidak berubah, beri tahu pengguna bahwa tidak ada data baru
    if (temperature === previousTemperature && humidity === previousHumidity) {
      showMessage("No updates available!", true); // Tampilkan pesan jika data tidak berubah
      return; // Tidak perlu update UI
    }

    // Update DOM jika data valid dan berbeda
    temperatureElement.textContent = `${temperature.toFixed(1)} °C`;
    humidityElement.textContent = `${humidity.toFixed(1)} %`;
    updateLastUpdated();

    // Update Colors
    updateTemperatureColor(temperature);
    updateHumidityColor(humidity);

    // Update previous values
    previousTemperature = temperature;
    previousHumidity = humidity;

    // Show success message
    showMessage("Data Updated!");
  } catch (error) {
    console.error("Error fetching data:", error);

    // Jika ESP8266 offline atau data invalid, tampilkan pesan error dan ubah data menjadi NaN
    temperatureElement.textContent = "NaN °C";
    humidityElement.textContent = "NaN %";
    showMessage("ESP8266 is offline. Unable to fetch data.", true); // Pesan error untuk offline

    // Ubah warna menjadi abu-abu atau warna khusus untuk menunjukkan kesalahan
    const temperatureBox = temperatureElement.parentElement;
    const humidityBox = humidityElement.parentElement;
    temperatureBox.classList.add("temperature-error"); // Tambahkan class error
    humidityBox.classList.add("humidity-error"); // Tambahkan class error
  }
}

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

// Function to toggle dark mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode); // Simpan preferensi dark mode
}

// Check dark mode preference on page load
function checkDarkModePreference() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
  }
}

// Event Listener for Refresh Button
refreshButton.addEventListener("click", fetchData);

// Event Listener for Dark Mode Switch
darkModeSwitch.addEventListener("change", toggleDarkMode);

// Update clock every second
setInterval(updateClock, 1000);

// Initial fetch
fetchData();
updateClock();
checkDarkModePreference();

// Update footer year
document.getElementById("current-year").textContent = new Date().getFullYear();
