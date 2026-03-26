export type CompetitionType =
  | "champions-league"
  | "europa-league"
  | "conference-league"
  | "world-cup"
  | "friendly";

export const COMPETITIONS: CompetitionType[] = [
  "friendly",
  "champions-league",
  "europa-league",
  "conference-league",
  "world-cup",
];

export interface CompetitionColors {
  gradientColors: [string, string, string];
  background: string;
  surface: string;
  surfaceLight: string;
  accent: string;
  accentDark: string;
  textSecondary: string;
}

// Mevcut yeşil tema (Gösteri Maçı + Konferans Ligi)
const GREEN_COLORS: CompetitionColors = {
  gradientColors: ["#081a10", "#0f2a1a", "#0a1f14"],
  background: "#1a5c2e",
  surface: "#1a472a",
  surfaceLight: "#2d6a4f",
  accent: "#7dcea0",
  accentDark: "#52b788",
  textSecondary: "#A8DABC",
};

interface CompetitionEntry {
  nameKey: string;
  badge: string | null;
  colors: CompetitionColors;
}

export const COMPETITION_META: Record<CompetitionType, CompetitionEntry> = {
  "champions-league": {
    nameKey: "competition.championsLeague",
    badge:
      "https://r2.thesportsdb.com/images/media/league/badge/facv1u1742998896.png",
    colors: {
      gradientColors: ["#0a0a1a", "#141432", "#0d0d28"],
      background: "#10102e",
      surface: "#1a1a3e",
      surfaceLight: "#2a2a5e",
      accent: "#c0c0e0",
      accentDark: "#8888bb",
      textSecondary: "#B0B0D0",
    },
  },
  "europa-league": {
    nameKey: "competition.europaLeague",
    badge:
      "https://r2.thesportsdb.com/images/media/league/badge/mlsr7d1718774547.png",
    colors: {
      gradientColors: ["#1a1005", "#2e1a08", "#241308"],
      background: "#2a1a0a",
      surface: "#3a2510",
      surfaceLight: "#5a3d1a",
      accent: "#ff6b00",
      accentDark: "#cc5500",
      textSecondary: "#FFAA66",
    },
  },
  "conference-league": {
    nameKey: "competition.conferenceLeague",
    badge:
      "https://r2.thesportsdb.com/images/media/league/badge/ymfo5j1718775759.png",
    colors: {
      gradientColors: ["#051a12", "#0a2e1e", "#072418"],
      background: "#0e3522",
      surface: "#14402a",
      surfaceLight: "#1e5c3c",
      accent: "#4ade80",
      accentDark: "#22c55e",
      textSecondary: "#86efac",
    },
  },
  "world-cup": {
    nameKey: "competition.worldCup",
    badge: "https://ii.upla.com.tr/2026/03/26/iJSSs.png",
    colors: {
      gradientColors: ["#1a0520", "#2e0a35", "#1a0825"],
      background: "#220a2e",
      surface: "#301240",
      surfaceLight: "#4a1e60",
      accent: "#e0115f",
      accentDark: "#b00d4c",
      textSecondary: "#e8a0c0",
    },
  },
  friendly: {
    nameKey: "competition.friendly",
    badge: null,
    colors: GREEN_COLORS,
  },
};

export function getCompetitionColors(type: CompetitionType): CompetitionColors {
  return COMPETITION_META[type].colors;
}
