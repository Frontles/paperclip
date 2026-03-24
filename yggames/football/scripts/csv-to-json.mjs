/**
 * Pre-build script: converts docs/eafc26-men.csv to src/data/players.json
 * Only keeps the 6 MVP leagues and columns needed by the app.
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

const csvPath = join(ROOT, 'docs', 'eafc26-men.csv');
const raw = readFileSync(csvPath, 'utf-8');
const lines = raw.split('\n');

// Skip header row
const players = [];
let skipped = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const cols = parseLine(line);
  const league = cols[COL.LEAGUE];

  if (!MVP_LEAGUES.has(league)) {
    skipped++;
    continue;
  }

  const id = parseInt(cols[COL.ID], 10);
  if (isNaN(id)) continue;

  players.push({
    id,
    name: cols[COL.NAME],
    team: cols[COL.TEAM],
    league,
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
  });
}

const outPath = join(ROOT, 'src', 'data', 'players.json');
writeFileSync(outPath, JSON.stringify(players));

console.log(`✓ Wrote ${players.length} players to src/data/players.json`);
console.log(`  Skipped ${skipped} players from non-MVP leagues`);
