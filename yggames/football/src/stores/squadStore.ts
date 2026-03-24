import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Player } from '@/types/index';

// ─── Formations ──────────────────────────────────────────────

export type Formation = '4-4-2' | '4-3-3' | '4-2-3-1' | '3-5-2' | '3-4-3' | '5-3-2' | '5-4-1';

export const FORMATIONS: Formation[] = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '3-4-3', '5-3-2', '5-4-1'];

/** How many DEF-MID-FWD each formation needs */
export const FORMATION_SLOTS: Record<Formation, { DEF: number; MID: number; FWD: number }> = {
  '4-4-2': { DEF: 4, MID: 4, FWD: 2 },
  '4-3-3': { DEF: 4, MID: 3, FWD: 3 },
  '4-2-3-1': { DEF: 4, MID: 5, FWD: 1 },
  '3-5-2': { DEF: 3, MID: 5, FWD: 2 },
  '3-4-3': { DEF: 3, MID: 4, FWD: 3 },
  '5-3-2': { DEF: 5, MID: 3, FWD: 2 },
  '5-4-1': { DEF: 5, MID: 4, FWD: 1 },
};

/** Visual pitch positions (percentage based, 0,0 = top-left) for each formation */
export const FORMATION_POSITIONS: Record<Formation, Array<{ x: number; y: number; group: 'GK' | 'DEF' | 'MID' | 'FWD' }>> = {
  '4-4-2': [
    { x: 50, y: 90, group: 'GK' },
    { x: 15, y: 72, group: 'DEF' }, { x: 38, y: 75, group: 'DEF' }, { x: 62, y: 75, group: 'DEF' }, { x: 85, y: 72, group: 'DEF' },
    { x: 15, y: 50, group: 'MID' }, { x: 38, y: 52, group: 'MID' }, { x: 62, y: 52, group: 'MID' }, { x: 85, y: 50, group: 'MID' },
    { x: 35, y: 28, group: 'FWD' }, { x: 65, y: 28, group: 'FWD' },
  ],
  '4-3-3': [
    { x: 50, y: 90, group: 'GK' },
    { x: 15, y: 72, group: 'DEF' }, { x: 38, y: 75, group: 'DEF' }, { x: 62, y: 75, group: 'DEF' }, { x: 85, y: 72, group: 'DEF' },
    { x: 25, y: 52, group: 'MID' }, { x: 50, y: 50, group: 'MID' }, { x: 75, y: 52, group: 'MID' },
    { x: 20, y: 28, group: 'FWD' }, { x: 50, y: 25, group: 'FWD' }, { x: 80, y: 28, group: 'FWD' },
  ],
  '4-2-3-1': [
    { x: 50, y: 90, group: 'GK' },
    { x: 15, y: 72, group: 'DEF' }, { x: 38, y: 75, group: 'DEF' }, { x: 62, y: 75, group: 'DEF' }, { x: 85, y: 72, group: 'DEF' },
    { x: 35, y: 58, group: 'MID' }, { x: 65, y: 58, group: 'MID' },
    { x: 20, y: 42, group: 'MID' }, { x: 50, y: 40, group: 'MID' }, { x: 80, y: 42, group: 'MID' },
    { x: 50, y: 25, group: 'FWD' },
  ],
  '3-5-2': [
    { x: 50, y: 90, group: 'GK' },
    { x: 25, y: 75, group: 'DEF' }, { x: 50, y: 77, group: 'DEF' }, { x: 75, y: 75, group: 'DEF' },
    { x: 10, y: 52, group: 'MID' }, { x: 30, y: 55, group: 'MID' }, { x: 50, y: 50, group: 'MID' }, { x: 70, y: 55, group: 'MID' }, { x: 90, y: 52, group: 'MID' },
    { x: 35, y: 28, group: 'FWD' }, { x: 65, y: 28, group: 'FWD' },
  ],
  '3-4-3': [
    { x: 50, y: 90, group: 'GK' },
    { x: 25, y: 75, group: 'DEF' }, { x: 50, y: 77, group: 'DEF' }, { x: 75, y: 75, group: 'DEF' },
    { x: 15, y: 52, group: 'MID' }, { x: 38, y: 54, group: 'MID' }, { x: 62, y: 54, group: 'MID' }, { x: 85, y: 52, group: 'MID' },
    { x: 20, y: 28, group: 'FWD' }, { x: 50, y: 25, group: 'FWD' }, { x: 80, y: 28, group: 'FWD' },
  ],
  '5-3-2': [
    { x: 50, y: 90, group: 'GK' },
    { x: 10, y: 72, group: 'DEF' }, { x: 30, y: 75, group: 'DEF' }, { x: 50, y: 77, group: 'DEF' }, { x: 70, y: 75, group: 'DEF' }, { x: 90, y: 72, group: 'DEF' },
    { x: 25, y: 52, group: 'MID' }, { x: 50, y: 50, group: 'MID' }, { x: 75, y: 52, group: 'MID' },
    { x: 35, y: 28, group: 'FWD' }, { x: 65, y: 28, group: 'FWD' },
  ],
  '5-4-1': [
    { x: 50, y: 90, group: 'GK' },
    { x: 10, y: 72, group: 'DEF' }, { x: 30, y: 75, group: 'DEF' }, { x: 50, y: 77, group: 'DEF' }, { x: 70, y: 75, group: 'DEF' }, { x: 90, y: 72, group: 'DEF' },
    { x: 15, y: 50, group: 'MID' }, { x: 38, y: 52, group: 'MID' }, { x: 62, y: 52, group: 'MID' }, { x: 85, y: 50, group: 'MID' },
    { x: 50, y: 25, group: 'FWD' },
  ],
};

// ─── Auto-pick best 11 ──────────────────────────────────────

export function autoPick11(players: Player[], formation: Formation): Player[] {
  const slots = FORMATION_SLOTS[formation];
  const gks = players.filter(p => p.positionGroup === 'GK').sort((a, b) => b.stats.overall - a.stats.overall);
  const defs = players.filter(p => p.positionGroup === 'DEF').sort((a, b) => b.stats.overall - a.stats.overall);
  const mids = players.filter(p => p.positionGroup === 'MID').sort((a, b) => b.stats.overall - a.stats.overall);
  const fwds = players.filter(p => p.positionGroup === 'FWD').sort((a, b) => b.stats.overall - a.stats.overall);

  const picked: Player[] = [];
  const usedIds = new Set<number>();

  // Pick GK
  if (gks.length > 0) { picked.push(gks[0]); usedIds.add(gks[0].id); }

  // Pick position groups
  const pickFromGroup = (group: Player[], count: number) => {
    let added = 0;
    for (const p of group) {
      if (added >= count) break;
      if (!usedIds.has(p.id)) { picked.push(p); usedIds.add(p.id); added++; }
    }
    return added;
  };

  const defNeeded = pickFromGroup(defs, slots.DEF);
  const midNeeded = pickFromGroup(mids, slots.MID);
  const fwdNeeded = pickFromGroup(fwds, slots.FWD);

  // Fill remaining slots with best available
  while (picked.length < 11) {
    const remaining = players.filter(p => !usedIds.has(p.id)).sort((a, b) => b.stats.overall - a.stats.overall);
    if (remaining.length === 0) break;
    picked.push(remaining[0]);
    usedIds.add(remaining[0].id);
  }

  return picked;
}

// ─── Store ───────────────────────────────────────────────────

interface SavedSquad {
  formation: Formation;
  starterIds: number[];
}

interface SquadStore {
  squads: Record<string, SavedSquad>; // keyed by team name
  saveSquad: (teamName: string, formation: Formation, starterIds: number[]) => void;
  getSquad: (teamName: string) => SavedSquad | null;
  clearSquad: (teamName: string) => void;
}

export const useSquadStore = create<SquadStore>()(
  persist(
    (set, get) => ({
      squads: {},
      saveSquad: (teamName, formation, starterIds) =>
        set((s) => ({
          squads: { ...s.squads, [teamName]: { formation, starterIds } },
        })),
      getSquad: (teamName) => get().squads[teamName] ?? null,
      clearSquad: (teamName) =>
        set((s) => {
          const { [teamName]: _, ...rest } = s.squads;
          return { squads: rest };
        }),
    }),
    {
      name: 'yg-football-squads',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
