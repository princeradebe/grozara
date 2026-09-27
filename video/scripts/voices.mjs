// Lists South African-accented English voices in the ElevenLabs Voice Library, with preview links,
// to help pick ELEVENLABS_VOICE_ID. Read-only: it doesn't add anything to your account.
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("ELEVENLABS_API_KEY is not set. Add it to video/.env first.");
  process.exit(1);
}

const params = new URLSearchParams({ accent: "south african", language: "en", page_size: "30", sort: "usage_character_count_7d" });
const res = await fetch(`https://api.elevenlabs.io/v1/shared-voices?${params}`, { headers: { "xi-api-key": KEY } });
if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
const { voices } = await res.json();
for (const v of voices) {
  console.log(`${v.voice_id}  ${v.name} · ${v.gender}, ${v.age} · ${v.use_case ?? ""} · ${v.descriptive ?? ""}`);
  if (v.preview_url) console.log(`    ${v.preview_url}`);
}
