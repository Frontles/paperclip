import { create } from 'zustand';
import type { Team, MatchEvent } from '@/types/index';
import type { CompetitionType } from '@/constants/competitionMeta';

interface MatchStore {
  // Teams
  homeTeam: Team | null;
  awayTeam: Team | null;
  setHomeTeam: (team: Team | null) => void;
  setAwayTeam: (team: Team | null) => void;
  clearTeams: () => void;

  // Game Mode
  selectedMode: 'plinko' | 'arena' | 'keeper-clash' | null;
  setSelectedMode: (mode: 'plinko' | 'arena' | 'keeper-clash') => void;

  // Competition
  competitionType: CompetitionType;
  setCompetitionType: (type: CompetitionType) => void;

  // Score
  homeScore: number;
  awayScore: number;
  addGoal: (teamName: string) => void;

  // Events
  events: MatchEvent[];
  addEvent: (event: MatchEvent) => void;

  // Timer
  currentMinute: number;
  isExtraTime: boolean;
  extraTimeAmount: number;
  setCurrentMinute: (minute: number) => void;
  setExtraTime: (isExtra: boolean, amount: number) => void;

  // Aggregate
  aggregateEnabled: boolean;
  homeAggregate: number;
  awayAggregate: number;
  setAggregateEnabled: (enabled: boolean) => void;
  setHomeAggregate: (score: number) => void;
  setAwayAggregate: (score: number) => void;

  // Reset
  clearMatch: () => void;
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  // Teams
  homeTeam: null,
  awayTeam: null,
  setHomeTeam: (team) => set({ homeTeam: team }),
  setAwayTeam: (team) => set({ awayTeam: team }),
  clearTeams: () => set({ homeTeam: null, awayTeam: null }),

  // Game Mode
  selectedMode: null,
  setSelectedMode: (mode) => set({ selectedMode: mode }),

  // Competition
  competitionType: 'friendly',
  setCompetitionType: (type) => set({ competitionType: type }),

  // Score
  homeScore: 0,
  awayScore: 0,
  addGoal: (teamName) => {
    const { homeTeam, awayTeam } = get();
    if (homeTeam && teamName === homeTeam.name) {
      set((s) => ({ homeScore: s.homeScore + 1 }));
    } else if (awayTeam && teamName === awayTeam.name) {
      set((s) => ({ awayScore: s.awayScore + 1 }));
    }
  },

  // Events
  events: [],
  addEvent: (event) => set((s) => ({ events: [...s.events, event] })),

  // Timer
  currentMinute: 0,
  isExtraTime: false,
  extraTimeAmount: 0,
  setCurrentMinute: (minute) => set({ currentMinute: minute }),
  setExtraTime: (isExtra, amount) => set({ isExtraTime: isExtra, extraTimeAmount: amount }),

  // Aggregate
  aggregateEnabled: false,
  homeAggregate: 0,
  awayAggregate: 0,
  setAggregateEnabled: (enabled) => set({ aggregateEnabled: enabled }),
  setHomeAggregate: (score) => set({ homeAggregate: score }),
  setAwayAggregate: (score) => set({ awayAggregate: score }),

  // Reset
  clearMatch: () =>
    set({
      homeScore: 0,
      awayScore: 0,
      events: [],
      currentMinute: 0,
      isExtraTime: false,
      extraTimeAmount: 0,
      selectedMode: null,
      aggregateEnabled: false,
      homeAggregate: 0,
      awayAggregate: 0,
    }),
}));
