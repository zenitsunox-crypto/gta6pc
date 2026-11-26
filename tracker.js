export default async function handler(req, res) {
  try {
    const r = await fetch("https://portwatch-vi.xyz/tracker.json", {
      headers: { "User-Agent": "VI-PortWatch/1.0" },
      cache: "no-store"
    });
    if (!r.ok) return res.status(r.status).json({error:"Upstream tracker unavailable",status:r.status});
    const data = await r.json();
    res.setHeader("Cache-Control","s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({error:"Could not fetch upstream tracker"});
  }
}