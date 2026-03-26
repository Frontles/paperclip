/**
 * Pre-build script: converts docs/eafc26-men.csv to src/data/players.json
 * Pass 1: Club players from 6 MVP leagues
 * Pass 2: National team squads (26 per nation, position-balanced)
 *
 * Run: node scripts/csv-to-json.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const MVP_LEAGUES = new Set([
  'Premier League',
  'LALIGA EA SPORTS',
  'Serie A Enilive',
  'Bundesliga',
  'Trendyol Süper Lig',
  "Ligue 1 McDonald's",
]);

// National team config
const NATIONAL_ID_OFFSET = 1_000_000;
const NATIONAL_SQUAD_SIZE = 26;
// Position-balanced squad: 3 GK, 8 DEF, 8 MID, 7 FWD = 26
const SQUAD_TEMPLATE = { GK: 3, DEF: 8, MID: 8, FWD: 7 };

// Load national team metadata
const nationalMetaPath = join(ROOT, 'src', 'constants', 'nationalTeamMeta.json');
const nationalMeta = JSON.parse(readFileSync(nationalMetaPath, 'utf-8'));

// Position mapping (same as types/index.ts POSITION_MAP)
const POSITION_MAP = {
  GK: 'GK',
  CB: 'DEF', LB: 'DEF', RB: 'DEF', LWB: 'DEF', RWB: 'DEF',
  CM: 'MID', CDM: 'MID', CAM: 'MID', LM: 'MID', RM: 'MID',
  ST: 'FWD', CF: 'FWD', LW: 'FWD', RW: 'FWD', LF: 'FWD', RF: 'FWD',
};

// CSV column indices (0-based)
const COL = {
  ID: 0,
  NAME: 2,
  OVR: 4,
  PAC: 5,
  SHO: 6,
  PAS: 7,
  DRI: 8,
  DEF: 9,
  PHY: 10,
  FINISHING: 14,
  POSITION: 40,
  AGE: 47,
  NATION: 48,
  LEAGUE: 49,
  TEAM: 50,
  CARD: 58,
};

/** Parse a CSV line, handling quoted fields with commas */
function parseLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parsePlayer(cols) {
  const id = parseInt(cols[COL.ID], 10);
  if (isNaN(id)) return null;
  return {
    id,
    name: cols[COL.NAME],
    team: cols[COL.TEAM],
    league: cols[COL.LEAGUE],
    position: cols[COL.POSITION],
    nation: cols[COL.NATION],
    age: parseInt(cols[COL.AGE], 10) || 0,
    stats: {
      overall: parseInt(cols[COL.OVR], 10) || 0,
      finishing: parseInt(cols[COL.FINISHING], 10) || 0,
      pace: parseInt(cols[COL.PAC], 10) || 0,
      shooting: parseInt(cols[COL.SHO], 10) || 0,
      passing: parseInt(cols[COL.PAS], 10) || 0,
      dribbling: parseInt(cols[COL.DRI], 10) || 0,
      defending: parseInt(cols[COL.DEF], 10) || 0,
      physical: parseInt(cols[COL.PHY], 10) || 0,
    },
    cardImageUrl: cols[COL.CARD] || '',
  };
}

const csvPath = join(ROOT, 'docs', 'eafc26-men.csv');
const raw = readFileSync(csvPath, 'utf-8');
const lines = raw.split('\n');

// ─── Pass 1: Club players ────────────────────────────────────
const players = [];
const allParsed = []; // all players for national team selection
let skipped = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const cols = parseLine(line);
  const player = parsePlayer(cols);
  if (!player) continue;

  allParsed.push(player);

  if (MVP_LEAGUES.has(player.league)) {
    players.push(player);
  } else {
    skipped++;
  }
}

console.log(`✓ Pass 1: ${players.length} club players from MVP leagues`);
console.log(`  Skipped ${skipped} players from non-MVP leagues`);

// ─── Pass 2: National teams ──────────────────────────────────

// Group all players by nation
const playersByNation = new Map();
for (const p of allParsed) {
  if (!p.nation) continue;
  const existing = playersByNation.get(p.nation);
  if (existing) existing.push(p);
  else playersByNation.set(p.nation, [p]);
}

let nationalCount = 0;
const nations = Object.keys(nationalMeta);

for (const nation of nations) {
  const meta = nationalMeta[nation];
  const nationPlayers = playersByNation.get(nation);
  if (!nationPlayers || nationPlayers.length < 20) continue;

  // Group by position
  const byGroup = { GK: [], DEF: [], MID: [], FWD: [] };
  for (const p of nationPlayers) {
    const group = POSITION_MAP[p.position] ?? 'MID';
    byGroup[group].push(p);
  }

  // Sort each group by overall desc
  for (const group of Object.keys(byGroup)) {
    byGroup[group].sort((a, b) => b.stats.overall - a.stats.overall);
  }

  // Pick position-balanced squad
  const squad = [];
  const usedIds = new Set();

  for (const [group, count] of Object.entries(SQUAD_TEMPLATE)) {
    const available = byGroup[group];
    let picked = 0;
    for (const p of available) {
      if (picked >= count) break;
      if (usedIds.has(p.id)) continue;
      squad.push(p);
      usedIds.add(p.id);
      picked++;
    }
  }

  // Fill remaining slots with best available (if some positions were short)
  if (squad.length < NATIONAL_SQUAD_SIZE) {
    const remaining = nationPlayers
      .filter(p => !usedIds.has(p.id))
      .sort((a, b) => b.stats.overall - a.stats.overall);
    for (const p of remaining) {
      if (squad.length >= NATIONAL_SQUAD_SIZE) break;
      squad.push(p);
      usedIds.add(p.id);
    }
  }

  // Add to players with offset ID, league = continent, team = nation
  const continent = meta.continent; // "Europe" or "World"
  for (const p of squad) {
    players.push({
      id: p.id + NATIONAL_ID_OFFSET,
      name: p.name,
      team: nation,
      league: continent,
      position: p.position,
      nation: p.nation,
      age: p.age,
      stats: { ...p.stats },
      cardImageUrl: p.cardImageUrl,
    });
    nationalCount++;
  }
}

console.log(`✓ Pass 2: ${nationalCount} national team players (${nations.filter(n => (playersByNation.get(n)?.length ?? 0) >= 20).length} nations)`);

// ─── Write output ────────────────────────────────────────────

const outPath = join(ROOT, 'src', 'data', 'players.json');
writeFileSync(outPath, JSON.stringify(players));

console.log(`✓ Total: ${players.length} players written to src/data/players.json`);
