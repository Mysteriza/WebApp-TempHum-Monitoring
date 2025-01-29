export default async function handler(req, res) {
  const { pin } = req.query;
  const BLYNK_AUTH_TOKEN = process.env.BLYNK_AUTH_TOKEN;

  if (!pin) {
    return res.status(400).json({ error: "Pin parameter is required!" });
  }

  if (!BLYNK_AUTH_TOKEN) {
    return res
      .status(500)
      .json({ error: "BLYNK authentication token is missing." });
  }

  try {
    // Coba fetch data dari Blynk API
    const response = await fetch(
      `https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&${pin}`
    );

    if (!response.ok) {
      throw new Error(`Blynk API error: ${response.statusText}`);
    }

    const data = await response.text();
    return res.status(200).json({ value: data });
  } catch (error) {
    // Jika ESP8266 offline, memberikan pesan error khusus
    if (error.message.includes("Failed to fetch")) {
      return res
        .status(500)
        .json({ error: "ESP8266 is offline. Cannot fetch data." });
    }
    return res.status(500).json({ error: error.message });
  }
}
