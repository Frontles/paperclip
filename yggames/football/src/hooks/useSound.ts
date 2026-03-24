import { useCallback, useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import { soundService, SoundKey } from '@/services/soundService';

export function useSound() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const play = useCallback(
    (key: SoundKey) => {
      soundService.play(key, soundEnabled);
    },
    [soundEnabled],
  );

  return { play };
}

export function useSoundPreloader() {
  useEffect(() => {
    soundService.preload();
    return () => {
      soundService.unload();
    };
  }, []);
}
