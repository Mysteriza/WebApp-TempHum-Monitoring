# IoT Monitoring - Temperature & Humidity
![GitHub last commit](https://img.shields.io/github/last-commit/Mysteriza/WebApp-TempHum-Monitoring)

A simple real-time web-based monitoring system for temperature and humidity data collected from an ESP8266 with a DHT22 sensor, integrated with Blynk.

## [Arduino Code | ESP8266 + DHT22 + Blynk](https://github.com/Mysteriza/DHT22-Blynk-Monitoring)

---

## Features

- **Real-time Data**: Display temperature and humidity data in real-time.
- **Dynamic Colors**: Background colors change based on temperature and humidity levels.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Last Updated**: Shows the last time data was refreshed, including seconds.
- **Refresh Button**: Manually refresh data from the ESP8266.

---

## Screenshots
### Light Mode
<img src="https://github.com/user-attachments/assets/e5364565-b8b8-4395-ae56-a258c7ece672" alt="Light Mode" width="710" />
<img src="https://github.com/user-attachments/assets/11930f31-dc9b-41ec-a68b-cd11c7394d9e" alt="Mobile Light Mode" width="200" />

### Dark Mode
<img src="https://github.com/user-attachments/assets/5f63c5aa-f846-4453-ba16-7f7aec29fdd8" alt="Dark Mode" width="710" />
<img src="https://github.com/user-attachments/assets/91d0d3be-702a-44dd-b731-d0b368217d5e" alt="Mobile Dark Mode" width="200" />

### Note : Blynk Auth Token is not implemented in the code, so the screenshot does not display any data.
---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **IoT Integration**: Blynk API
- **Responsive Design**: Media Queries

---

## How to Use

1. **Clone the Repository**:
   ```
   git clone https://github.com/Mysteriza/WebApp-TempHum-Monitoring.git
   ```
   ```
   cd WebApp-TempHum-Monitoring
   ```
2. Then replace the Blynk token in assets/blynk.js with your own token.
