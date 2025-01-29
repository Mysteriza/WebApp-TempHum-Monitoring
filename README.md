# IoT Monitoring - Temperature & Humidity
![GitHub last commit](https://img.shields.io/github/last-commit/Mysteriza/WebApp-TempHum-Monitoring)

A simple real-time web-based monitoring system for temperature and humidity, collected from an ESP8266 with a DHT22 sensor and integrated with Blynk.

## [Arduino Code | ESP8266 + DHT22 + Blynk](https://github.com/Mysteriza/DHT22-Blynk-Monitoring)

---

## Features
- Dynamic Colors 🎨: Background color changes based on temperature and humidity levels.
- Dark Mode Support 🌙: Toggle between light and dark themes for better readability.
- Responsive Design 📱: Works seamlessly on desktop, tablet, and mobile.
- Last Updated Timestamp ⏱: Displays the exact last refresh time (including seconds).
- Manual Refresh Button 🔄: Instantly fetch new data with a single click.
- Smooth UI Animations ✨: Uses CSS transitions for a better user experience.


---

## Screenshots
### Light Mode
<img src="https://github.com/user-attachments/assets/81620df0-86e8-45f7-8c1c-de49a2c07bc3" alt="Light Mode" width="710" />
<img src="https://github.com/user-attachments/assets/020ca4b7-f67e-4d07-a0de-2bbc0c26058b" alt="Mobile Light Mode" width="200" />

### Dark Mode
<img src="https://github.com/user-attachments/assets/4743a873-6854-4987-8ccc-ac2beb382b34" alt="Dark Mode" width="710" />
<img src="https://github.com/user-attachments/assets/051e7a70-b8ce-43a0-97b3-7471c5c5ee49" alt="Mobile Dark Mode" width="200" />

---

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- IoT Integration: Blynk API
- Backend Deployment: Vercel
- Responsive Design: CSS Media Queries

---

## How to Use (locally)

1. **Clone the Repository**:
   ```
   git clone https://github.com/Mysteriza/WebApp-TempHum-Monitoring.git
   ```
   ```
   cd WebApp-TempHum-Monitoring
   ```
2. Install Vercel CLI (if not installed)
   ```
   npm install -g vercel
   ```
3. Create a .env.local File in the Root Directory.
   ```
   BLYNK_AUTH_TOKEN=your_blynk_token
   ```
   🔒 Your token is private and should NOT be shared or pushed to GitHub.
4. DONE! Now run it with:
   ```
   vercel dev
   ```
   Your local development server will be available at: http://localhost:3000/

## How to deploy to Vercel
1. In your terminal, type:
   ```
   vercel login
   ```
   Follow the instructions in the terminal to authenticate.
2. Set Up Environment Variables in Vercel
   - Navigate to Settings → Environment Variables.
   - Add the following:
      - Key: BLYNK_AUTH_TOKEN
      - Value: your_blynk_token_here
      - Environment: Production & Development
   - Save!
3. Deploy to Vercel
   ```
   vercel
   ```
4. Your app will be deployed to a Vercel-generated URL, which you can access immediately. 🎉

## Contact & Support
If you have any issues or suggestions, feel free to reach out!
- 📧 Email: mysteriza@proton.me
- 🐙 Telegram: [Mysteriza](https://t.me/mysteriza)
