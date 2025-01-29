import config from "../config.js";

const BLYNK_AUTH_TOKEN = config.BLYNK_AUTH_TOKEN;

async function fetchBlynkData(pin) {
  try {
    const response = await fetch(
      `https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&${pin}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from pin ${pin}: ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching data from pin ${pin}:`, error);
    return null;
  }
}

export { fetchBlynkData };
