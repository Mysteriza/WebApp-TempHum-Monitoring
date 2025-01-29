/**
 * Fetch data from Blynk backend.
 * @param {string} pin
 * @returns {Promise<string | null>} The value of the pin if successful, null if failed.
 */
async function fetchBlynkData(pin) {
  try {
    const response = await fetch(`/api/blynk?pin=${pin}`);

    // Cek apakah respons valid
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Coba untuk parsing JSON
    const data = await response.json();

    // Validasi apakah data memiliki properti 'value'
    if (data && data.value !== undefined) {
      return data.value;
    } else {
      throw new Error('Invalid response format: missing "value"');
    }
  } catch (error) {
    console.error(`Error fetching data from backend: ${error.message}`);
    return null;
  }
}

export { fetchBlynkData };
