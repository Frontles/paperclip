import { useEffect, useRef, useState, useCallback } from 'react';
import { GameConfig } from '@/constants/gameConfig';
import { useSettingsStore } from '@/stores/settingsStore';

// ─── Devre yapısı ──────────────────────────────────────────────
// Normal:     1. Devre (0-45) → Devre Arası → 2. Devre (45-90) → Bitti
// Uzatmalı:   ... → 2. Devre sonu → "Uzatmalar" →
//             Uzatma 1 (90-105) → Devre Arası → Uzatma 2 (105-120) → Bitti

type Phase =
  | 'first_half'      // 0-45
  | 'half_time'       // devre arası
  | 'second_half'     // 45-90
  | 'extra_intro'     // "Uzatmalar" yazısı
  | 'extra_first'     // 90-105
  | 'extra_half_time' // uzatma devre arası
  | 'extra_second'    // 105-120
  | 'ended';

interface PhaseConfig {
  startMinute: number;
  endMinute: number;
  nextPhase: Phase;
}

const PHASE_MAP: Record<string, PhaseConfig> = {
  first_half:   { startMinute: 0,   endMinute: 45,  nextPhase: 'half_time' },
  second_half:  { startMinute: 45,  endMinute: 90,  nextPhase: 'ended' }, // overridden if extra time
  extra_first:  { startMinute: 90,  endMinute: 105, nextPhase: 'extra_half_time' },
  extra_second: { startMinute: 105, endMinute: 120, nextPhase: 'ended' },
};

export interface MatchTimerState {
  matchMinute: number;
  isExtraTime: boolean;
  extraMinute: number;
  timerLabel: string;
  isEnded: boolean;
  phase: Phase;
}

export interface UseMatchTimerOptions {
  isRunning: boolean;
  onRedCardCheck: (minute: number) => void;
  onYellowCardCheck?: (minute: number) => void;
  onMatchEnd: () => void;
  onPhaseChange?: (phase: Phase) => void;
  isDraw?: boolean; // skor berabere mi
}

export function useMatchTimer({
  isRunning,
  onRedCardCheck,
  onYellowCardCheck,
  onMatchEnd,
  onPhaseChange,
  isDraw,
}: UseMatchTimerOptions): MatchTimerState {
  const { matchDuration, extraTimeEnabled } = useSettingsStore();

  // Her devre kaç gerçek saniye sürecek (matchDuration toplam maç süresi, 2 devreye böl)
  const halfDurationMs = (matchDuration / 2) * 1000;
  // 45 oyun dakikası = halfDurationMs gerçek ms → 1 oyun dakikası = halfDurationMs/45 ms
  const msPerMinute = halfDurationMs / 45;

  const [state, setState] = useState<{
    matchMinute: number;
    phase: Phase;
    stoppageExtra: number; // devre sonu uzatma dakikası
    stoppageTarget: number; // hedef uzatma
    isEnded: boolean;
  }>({
    matchMinute: 0,
    phase: 'first_half',
    stoppageExtra: 0,
    stoppageTarget: 0,
    isEnded: false,
  });

  const onRedCardCheckRef = useRef(onRedCardCheck);
  onRedCardCheckRef.current = onRedCardCheck;
  const onYellowCardCheckRef = useRef(onYellowCardCheck);
  onYellowCardCheckRef.current = onYellowCardCheck;
  const onMatchEndRef = useRef(onMatchEnd);
  onMatchEndRef.current = onMatchEnd;
  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;
  const checkedMinutesRef = useRef<Set<number>>(new Set());

  // Rastgele kart check dakikaları — her periyotta (10-15 dk) rastgele bir dakika
  const redCheckMinutes = useRef(
    GameConfig.redCardCheckMinutes.map((base, i, arr) => {
      const next = arr[i + 1] ?? base + 15;
      return base + Math.floor(Math.random() * (next - base));
    })
  ).current;
  const yellowCheckMinutes = useRef(
    GameConfig.yellowCardCheckMinutes.map((base, i, arr) => {
      const next = arr[i + 1] ?? base + 10;
      return base + Math.floor(Math.random() * (next - base));
    })
  ).current;

  // Pause phases (devre arası, uzatma intro) auto-advance after 3 seconds
  useEffect(() => {
    if (state.phase === 'half_time' || state.phase === 'extra_intro' || state.phase === 'extra_half_time') {
      const nextPhase: Phase =
        state.phase === 'half_time' ? 'second_half' :
        state.phase === 'extra_intro' ? 'extra_first' :
        'extra_second';

      const timer = setTimeout(() => {
        const nextCfg = PHASE_MAP[nextPhase];
        setState(prev => ({
          ...prev,
          phase: nextPhase,
          matchMinute: nextCfg ? nextCfg.startMinute : prev.matchMinute,
          stoppageExtra: 0,
          stoppageTarget: 0,
        }));
        setTimeout(() => onPhaseChangeRef.current?.(nextPhase), 0);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.phase]);

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.isEnded) return prev;

      const playPhases = ['first_half', 'second_half', 'extra_first', 'extra_second'];
      if (!playPhases.includes(prev.phase)) return prev;

      const cfg = PHASE_MAP[prev.phase];
      if (!cfg) return prev;

      const minute = prev.matchMinute + 1;

      // Red card check (rastgele dakikalarda)
      if (
        redCheckMinutes.includes(minute) &&
        !checkedMinutesRef.current.has(minute)
      ) {
        checkedMinutesRef.current.add(minute);
        setTimeout(() => onRedCardCheckRef.current(minute), 0);
      }

      // Yellow card check (rastgele dakikalarda)
      if (
        yellowCheckMinutes.includes(minute) &&
        !checkedMinutesRef.current.has(minute + 1000)
      ) {
        checkedMinutesRef.current.add(minute + 1000);
        setTimeout(() => onYellowCardCheckRef.current?.(minute), 0);
      }

      // Devre sonuna ulaştık mı?
      if (minute >= cfg.endMinute) {
        // Uzatma dakikası belirle (ilk kez)
        let stoppageTarget = prev.stoppageTarget;
        if (stoppageTarget === 0) {
          stoppageTarget = GameConfig.extraTimeMinSeconds +
            Math.floor(Math.random() * (GameConfig.extraTimeMaxSeconds - GameConfig.extraTimeMinSeconds + 1));
        }

        const stoppageExtra = prev.stoppageExtra + 1;

        if (stoppageExtra >= stoppageTarget) {
          // Uzatma bitti, sonraki faza geç
          let nextPhase = cfg.nextPhase;

          // 2. devre sonu + uzatmalar açık + berabere → extra_intro
          if (prev.phase === 'second_half' && extraTimeEnabled && (isDraw ?? false)) {
            nextPhase = 'extra_intro';
          }

          if (nextPhase === 'ended') {
            setTimeout(() => onMatchEndRef.current(), 0);
            return { ...prev, matchMinute: minute, isEnded: true, phase: 'ended', stoppageExtra, stoppageTarget };
          }

          const nextCfg = PHASE_MAP[nextPhase];
          setTimeout(() => onPhaseChangeRef.current?.(nextPhase), 0);
          return {
            ...prev,
            matchMinute: nextCfg ? nextCfg.startMinute : minute,
            phase: nextPhase,
            stoppageExtra: 0,
            stoppageTarget: 0,
          };
        }

        return { ...prev, matchMinute: minute, stoppageExtra, stoppageTarget };
      }

      return { ...prev, matchMinute: minute };
    });
  }, [extraTimeEnabled, isDraw]);

  useEffect(() => {
    const playPhases = ['first_half', 'second_half', 'extra_first', 'extra_second'];
    if (!isRunning || state.isEnded || !playPhases.includes(state.phase)) return;
    const id = setInterval(tick, msPerMinute);
    return () => clearInterval(id);
  }, [isRunning, state.isEnded, state.phase, tick, msPerMinute]);

  // Timer label
  const { matchMinute, phase, stoppageExtra } = state;
  let timerLabel: string;
  const cfg = PHASE_MAP[phase];

  if (phase === 'half_time') {
    timerLabel = 'Devre Arası';
  } else if (phase === 'extra_intro') {
    timerLabel = 'Uzatmalar';
  } else if (phase === 'extra_half_time') {
    timerLabel = 'Devre Arası';
  } else if (phase === 'ended') {
    timerLabel = 'Maç Bitti';
  } else if (cfg && matchMinute >= cfg.endMinute && stoppageExtra > 0) {
    timerLabel = `${cfg.endMinute}+${stoppageExtra}'`;
  } else {
    timerLabel = `${matchMinute}'`;
  }

  const isExtraTime = phase === 'extra_first' || phase === 'extra_second';

  return {
    matchMinute,
    isExtraTime,
    extraMinute: stoppageExtra,
    timerLabel,
    isEnded: state.isEnded,
    phase,
  };
}
