export interface PlayerStats {
  overall: number;
  finishing: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface Player {
  id: number;
  name: string;
  team: string;
  league: string;
  position: string;
  positionGroup: 'GK' | 'DEF' | 'MID' | 'FWD';
  nation: string;
  age: number;
  stats: PlayerStats;
  cardImageUrl: string;
}

export interface Team {
  name: string;
  league: string;
  players: Player[];
  primaryColor: string;
  secondaryColor: string;
  badge: string | null;
  teamShort: string | null;
}

export interface League {
  name: string;
  displayName: string;
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'red_card';
  minute: number;
  teamName: string;
  playerId: number;
  playerName: string;
}

export type PositionGroup = 'GK' | 'DEF' | 'MID' | 'FWD';

export const POSITION_MAP: Record<string, PositionGroup> = {
  GK: 'GK',
  CB: 'DEF',
  LB: 'DEF',
  RB: 'DEF',
  LWB: 'DEF',
  RWB: 'DEF',
  CM: 'MID',
  CDM: 'MID',
  CAM: 'MID',
  LM: 'MID',
  RM: 'MID',
  ST: 'FWD',
  CF: 'FWD',
  LW: 'FWD',
  RW: 'FWD',
  LF: 'FWD',
  RF: 'FWD',
};

export const TEAM_DISPLAY = {
  homeColor: '#FFC72C',
  awayColor: '#E63946',
  getInitials: (teamName: string) => teamName.substring(0, 3).toUpperCase(),
} as const;

export const LEAGUE_DISPLAY_NAMES: Record<string, string> = {
  'Premier League': 'Premier League',
  'LALIGA EA SPORTS': 'La Liga',
  'Serie A Enilive': 'Serie A',
  Bundesliga: 'Bundesliga',
  'Trendyol Süper Lig': 'Süper Lig',
  "Ligue 1 McDonald's": 'Ligue 1',
};
