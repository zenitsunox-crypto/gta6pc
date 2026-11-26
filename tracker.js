export default async function handler(req, res) {
  const urls = [
    "https://portwatch-vi.xyz/data/tracker.json",
    "https://portwatch-vi.xyz/tracker.json"
  ];

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": "VI-PortWatch/1.0" },
        cache: "no-store"
      });

      if (r.ok) {
        const data = await r.json();
        res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
        return res.status(200).json(data);
      }
    } catch (_) {}
  }

  return res.status(502).json({ error: "Upstream tracker unavailable" });
}
