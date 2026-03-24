const fs = require("fs");
const path = require("path");

const OUT_PATH = path.join(__dirname, "..", "src", "constants", "teamMeta.json");
const existing = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));

const MISSING_MAP = {
  "Paris SG": "Paris Saint Germain",
  "FC Bayern München": "Bayern Munich",
  "Atlético de Madrid": "Atletico Madrid",
  "SSC Napoli": "Napoli",
  "AS Roma": "Roma",
  "Athletic Club": "Athletic Bilbao",
  "Villarreal CF": "Villarreal",
  "TSG Hoffenheim": "Hoffenheim",
  "SC Freiburg": "Freiburg",
  "CA Osasuna": "Osasuna",
  "Valencia CF": "Valencia",
  "1. FSV Mainz 05": "Mainz",
  "Getafe CF": "Getafe",
  "RCD Mallorca": "Mallorca",
  "Stade Rennais FC": "Rennes",
  "Girona FC": "Girona",
  "AFC Bournemouth": "Bournemouth",
  "LOSC Lille": "Lille",
  "West Ham": "West Ham United",
  "VfL Wolfsburg": "Wolfsburg",
  "RCD Espanyol": "Espanyol",
  "Toulouse FC": "Toulouse",
  "OL": "Lyon",
  "Strasbourg": "Strasbourg",
  "1. FC Köln": "FC Cologne",
  "Sevilla FC": "Sevilla",
  "FC St. Pauli": "St Pauli",
  "AJ Auxerre": "Auxerre",
  "Çaykur Rizespor": "Rizespor",
  "Gaziantep": "Gaziantep",
  "Hamburger SV": "Hamburg",
  "Havre AC": "Le Havre",
};

const LEAGUE_MAP = {
  "Paris SG": "Ligue 1 McDonald's",
  "FC Bayern München": "Bundesliga",
  "Atlético de Madrid": "LALIGA EA SPORTS",
  "SSC Napoli": "Serie A Enilive",
  "AS Roma": "Serie A Enilive",
  "Athletic Club": "LALIGA EA SPORTS",
  "Villarreal CF": "LALIGA EA SPORTS",
  "TSG Hoffenheim": "Bundesliga",
  "SC Freiburg": "Bundesliga",
  "CA Osasuna": "LALIGA EA SPORTS",
  "Valencia CF": "LALIGA EA SPORTS",
  "1. FSV Mainz 05": "Bundesliga",
  "Getafe CF": "LALIGA EA SPORTS",
  "RCD Mallorca": "LALIGA EA SPORTS",
  "Stade Rennais FC": "Ligue 1 McDonald's",
  "Girona FC": "LALIGA EA SPORTS",
  "AFC Bournemouth": "Premier League",
  "LOSC Lille": "Ligue 1 McDonald's",
  "West Ham": "Premier League",
  "VfL Wolfsburg": "Bundesliga",
  "RCD Espanyol": "LALIGA EA SPORTS",
  "Toulouse FC": "Ligue 1 McDonald's",
  "OL": "Ligue 1 McDonald's",
  "Strasbourg": "Ligue 1 McDonald's",
  "1. FC Köln": "Bundesliga",
  "Sevilla FC": "LALIGA EA SPORTS",
  "FC St. Pauli": "Bundesliga",
  "AJ Auxerre": "Ligue 1 McDonald's",
  "Çaykur Rizespor": "Trendyol Süper Lig",
  "Gaziantep": "Trendyol Süper Lig",
  "Hamburger SV": "Bundesliga",
  "Havre AC": "Ligue 1 McDonald's",
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchTeam(searchName) {
  const url = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(searchName)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.teams) return null;
  return json.teams.find(t => t.strSport === "Soccer") || null;
}

async function main() {
  const entries = Object.entries(MISSING_MAP);
  console.log(`Retrying ${entries.length} missing teams...`);

  let found = 0;
  let stillMissing = [];

  for (let i = 0; i < entries.length; i++) {
    const [csvName, searchName] = entries[i];
    console.log(`[${i+1}/${entries.length}] ${csvName} → ${searchName}`);

    try {
      const data = await fetchTeam(searchName);
      if (data) {
        existing[csvName] = {
          name: csvName,
          league: LEAGUE_MAP[csvName],
          teamShort: data.strTeamShort || null,
          colour1: data.strColour1 || null,
          colour2: data.strColour2 || null,
          colour3: data.strColour3 || null,
          badge: data.strBadge || null,
          sportsDbName: data.strTeam,
        };
        found++;
        console.log(`  ✓ ${data.strTeam} | ${data.strTeamShort || "N/A"} | ${data.strColour1 || "N/A"}`);
      } else {
        stillMissing.push(csvName);
        console.log(`  ✗ STILL NOT FOUND`);
      }
    } catch (err) {
      stillMissing.push(csvName);
      console.log(`  ✗ ERROR: ${err.message}`);
    }

    if (i < entries.length - 1) await sleep(2100);
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2), "utf-8");
  console.log(`\nDone! ${found} more found. Still missing: ${stillMissing.length}`);
  if (stillMissing.length > 0) console.log("Still missing:", stillMissing);
}

main();
