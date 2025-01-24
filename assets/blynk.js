const BLYNK_AUTH_TOKEN = "INPUT_YOUR_TOKEN_HERE"; //change blynk auth token with your own

/**
 * Fetch data from Blynk API
 * @param {string} pin - Pin virtual di Blynk (contoh: V0, V1, V4)
 * @returns {Promise<string>} - Data dari Blynk
 */
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
