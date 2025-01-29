/**
 * @param {string} pin
 * @returns {Promise<string>}
 */
async function fetchBlynkData(pin) {
  try {
    const response = await fetch(`/api/blynk?pin=${pin}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error(`Error fetching data from backend:`, error);
    return null;
  }
}

export { fetchBlynkData };
