import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'tr' | 'en' | 'de' | 'fr';
type MatchDuration = 30 | 45 | 60 | 75 | 90 | 105 | 120;

interface SettingsStore {
  language: Language;
  soundEnabled: boolean;
  localeDetected: boolean;
  matchDuration: MatchDuration; // gerçek saniye cinsinden maç süresi
  extraTimeEnabled: boolean;
  setLanguage: (lang: Language) => void;
  toggleSound: () => void;
  markLocaleDetected: () => void;
  setMatchDuration: (d: MatchDuration) => void;
  setExtraTimeEnabled: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: 'tr',
      soundEnabled: true,
      localeDetected: false,
      matchDuration: 90,
      extraTimeEnabled: false,
      setLanguage: (lang) => set({ language: lang }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      markLocaleDetected: () => set({ localeDetected: true }),
      setMatchDuration: (d) => set({ matchDuration: d }),
      setExtraTimeEnabled: (v) => set({ extraTimeEnabled: v }),
    }),
    {
      name: 'yg-football-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
