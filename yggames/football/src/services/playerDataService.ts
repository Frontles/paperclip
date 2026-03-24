/**
 * Player data service — loads pre-built JSON (converted from CSV at build time)
 * and exposes typed in-memory indexes for leagues, teams, and players.
 *
 * Run `node scripts/csv-to-json.mjs` to regenerate src/data/players.json.
 */

import type { Player, Team, League } from '@/types/index';
import { POSITION_MAP, LEAGUE_DISPLAY_NAMES } from '@/types/index';
import rawPlayers from '@/data/players.json';
import teamMetaData from '@/constants/teamMeta.json';

// ─── Types for raw JSON shape ─────────────────────────────────

interface RawPlayer {
  id: number;
  name: string;
  team: string;
  league: string;
  position: string;
  nation: string;
  age: number;
  stats: {
    overall: number;
    finishing: number;
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  cardImageUrl: string;
}

// ─── Build typed player list ──────────────────────────────────

const allPlayers: Player[] = (rawPlayers as RawPlayer[]).map((raw) => ({
  ...raw,
  positionGroup: POSITION_MAP[raw.position] ?? 'MID',
}));

// ─── In-memory indexes ────────────────────────────────────────

/** Map from CSV league name → League object */
export const leagueMap = new Map<string, League>();

/** Map from team name → Team object */
export const teamMap = new Map<string, Team>();

/** Map from team name → Player[] */
export const playersByTeam = new Map<string, Player[]>();

// Populate leagueMap
for (const csvLeague of Object.keys(LEAGUE_DISPLAY_NAMES)) {
  leagueMap.set(csvLeague, {
    name: csvLeague,
    displayName: LEAGUE_DISPLAY_NAMES[csvLeague],
  });
}

// Populate playersByTeam and teamMap
for (const player of allPlayers) {
  const existing = playersByTeam.get(player.team);
  if (existing) {
    existing.push(player);
  } else {
    playersByTeam.set(player.team, [player]);
  }
}

const teamMeta = teamMetaData as Record<string, {
  teamShort: string | null;
  colour1: string | null;
  colour2: string | null;
  badge: string | null;
}>;

for (const [teamName, players] of playersByTeam) {
  const league = players[0].league;
  const meta = teamMeta[teamName];
  teamMap.set(teamName, {
    name: teamName,
    league,
    players,
    primaryColor: meta?.colour1 ?? '#FFFFFF',
    secondaryColor: meta?.colour2 ?? '#000000',
    badge: meta?.badge ?? null,
    teamShort: meta?.teamShort ?? null,
  });
}

// ─── Public API ───────────────────────────────────────────────

/** All teams grouped by league (display name) */
export const getTeamsByLeague = (displayName: string): Team[] => {
  const results: Team[] = [];
  for (const [, team] of teamMap) {
    const leagueDisplay = LEAGUE_DISPLAY_NAMES[team.league] ?? team.league;
    if (leagueDisplay === displayName) {
      results.push(team);
    }
  }
  return results.sort((a, b) => a.name.localeCompare(b.name));
};

/** All teams across MVP leagues, sorted by league then name */
export const getAllTeams = (): Team[] => {
  return Array.from(teamMap.values()).sort((a, b) =>
    a.league === b.league ? a.name.localeCompare(b.name) : a.league.localeCompare(b.league),
  );
};

/** All MVP leagues */
export const getAllLeagues = (): League[] => Array.from(leagueMap.values());

/** Get a team by exact name */
export const getTeam = (name: string): Team | undefined => teamMap.get(name);

// ─── Player-Goal Assignment Algorithm (GDD 4.9) ───────────────

const POSITION_WEIGHT: Record<Player['positionGroup'], number> = {
  FWD: 3.0,
  MID: 1.5,
  DEF: 0.5,
  GK: 0.05,
};

/**
 * Pick a goal scorer from a team's players.
 * Weight = positionWeight × (finishing / 100).
 * Falls back to first player if team has no players.
 */
export const pickGoalScorer = (players: Player[]): Player => {
  if (players.length === 0) throw new Error('Cannot pick scorer from empty squad');

  const weights = players.map((p) => {
    const posWeight = POSITION_WEIGHT[p.positionGroup];
    const finishingFactor = p.stats.finishing > 0 ? p.stats.finishing / 100 : 0.1;
    return posWeight * finishingFactor;
  });

  const total = weights.reduce((sum, w) => sum + w, 0);
  let rand = Math.random() * total;

  for (let i = 0; i < players.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return players[i];
  }

  return players[players.length - 1];
};

/**
 * Pick Man of the Match — highest overall player from goal scorers,
 * or highest overall overall if no goals scored.
 */
export const pickManOfTheMatch = (
  teamPlayers: Player[],
  goalScorerIds: number[],
): Player => {
  if (teamPlayers.length === 0) throw new Error('Cannot pick MOTM from empty squad');

  const scorers = teamPlayers.filter((p) => goalScorerIds.includes(p.id));
  const pool = scorers.length > 0 ? scorers : teamPlayers;

  return pool.reduce((best, p) =>
    p.stats.overall > best.stats.overall ? p : best,
  );
};
