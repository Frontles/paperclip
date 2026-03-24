/**
 * TheSportsDB'den tüm MVP lig takımlarının meta bilgilerini çeker.
 * Kullanım: node scripts/fetchTeamMeta.js
 * Çıktı: src/constants/teamMeta.json
 */
const fs = require("fs");
const path = require("path");

const CSV_PATH = path.join(__dirname, "..", "docs", "EAFC26-Men.csv");
const OUT_PATH = path.join(__dirname, "..", "src", "constants", "teamMeta.json");

const MVP_LEAGUES = [
  "Premier League",
  "LALIGA EA SPORTS",
  "Serie A Enilive",
  "Bundesliga",
  "Trendyol Süper Lig",
  "Ligue 1 McDonald's",
];

// EA FC isimleri TheSportsDB'de farklı olabilir — mapping
const NAME_MAP = {
  // Premier League
  "Man Utd": "Manchester United",
  "Spurs": "Tottenham Hotspur",
  "Newcastle Utd": "Newcastle United",
  "Nott'm Forest": "Nottingham Forest",
  "Brighton": "Brighton and Hove Albion",
  "Wolves": "Wolverhampton Wanderers",
  "AFC Bournemouth": "AFC Bournemouth",
  "Sunderland": "Sunderland",
  // La Liga
  "Celta": "Celta de Vigo",
  "D. Alavés": "Deportivo Alaves",
  "R. Oviedo": "Real Oviedo",
  // Serie A
  "Bergamo Calcio": "Atalanta",
  "Latium": "Lazio",
  "Milano FC": "Inter Milan",
  "Lombardia FC": "AC Milan",
  "Como": "Como 1907",
  // Bundesliga
  "Frankfurt": "Eintracht Frankfurt",
  "Leverkusen": "Bayer Leverkusen",
  "M'gladbach": "Borussia Monchengladbach",
  "Heidenheim": "FC Heidenheim",
  // Ligue 1
  "OL": "Olympique Lyonnais",
  "OM": "Olympique de Marseille",
  "Paris SG": "Paris Saint-Germain",
  "Strasbourg": "RC Strasbourg",
  // Süper Lig
  "Başakşehir": "Istanbul Basaksehir",
  "Karagümrük SK": "Fatih Karagumruk",
  "Gaziantep": "Gaziantep FK",
  "Gençlerbirliği": "Genclerbirligi",
  "Çaykur Rizespor": "Caykur Rizespor",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseCSV(text) {
  const lines = text.split("\n").filter((l) => l.trim());
  const header = lines[0].split(",");
  const leagueIdx = header.indexOf("League");
  const teamIdx = header.indexOf("Team");
  const teams = new Set();
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    // Simple CSV parse (handles most cases)
    const cols = lines[i].split(",");
    const league = cols[leagueIdx];
    const team = cols[teamIdx];
    if (MVP_LEAGUES.includes(league) && !league.includes("Bundesliga 2") && !teams.has(team)) {
      teams.add(team);
      result.push({ csvName: team, league });
    }
  }
  return result;
}

async function fetchTeam(searchName) {
  const url = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(searchName)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.teams) return null;
  // Find soccer team
  const match = json.teams.find((t) => t.strSport === "Soccer");
  return match || null;
}

async function main() {
  const csv = fs.readFileSync(CSV_PATH, "utf-8");
  const teams = parseCSV(csv);

  console.log(`Found ${teams.length} teams in MVP leagues.`);

  const results = {};
  let found = 0;
  let notFound = [];

  for (let i = 0; i < teams.length; i++) {
    const { csvName, league } = teams[i];
    const searchName = NAME_MAP[csvName] || csvName;

    console.log(`[${i + 1}/${teams.length}] Fetching: ${csvName} (search: ${searchName})`);

    try {
      const data = await fetchTeam(searchName);
      if (data) {
        results[csvName] = {
          name: csvName,
          league,
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
        notFound.push(csvName);
        console.log(`  ✗ NOT FOUND`);
      }
    } catch (err) {
      notFound.push(csvName);
      console.log(`  ✗ ERROR: ${err.message}`);
    }

    // Rate limit: 30 req/min = 1 req per 2s
    if (i < teams.length - 1) {
      await sleep(2100);
    }
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nDone! ${found} found, ${notFound.length} not found.`);
  if (notFound.length > 0) {
    console.log("Not found:", notFound);
  }
  console.log(`Output: ${OUT_PATH}`);
}

main();
