export default async function handler(req, res) {
  const { pin } = req.query;
  const BLYNK_AUTH_TOKEN = process.env.BLYNK_AUTH_TOKEN;

  if (!pin) {
    return res.status(400).json({ error: "Pin parameter is required!" });
  }

  try {
    const response = await fetch(
      `https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&${pin}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.text();
    return res.status(200).json({ value: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
