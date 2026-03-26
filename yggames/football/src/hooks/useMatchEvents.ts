import { useCallback, useRef, useState } from 'react';
import { GameConfig } from '@/constants/gameConfig';
import { pickGoalScorer } from '@/services/playerDataService';
import type { MatchEvent, Player } from '@/types/index';

// ─── Types ────────────────────────────────────────────────────

export interface ToastData {
  id: string;
  type: 'goal' | 'red_card' | 'yellow_card';
  label: string;
}

export interface UseMatchEventsOptions {
  homeTeamName: string;
  awayTeamName: string;
  homePlayers: Player[];
  awayPlayers: Player[];
  onEventRecorded: (event: MatchEvent) => void;
  onRedCard?: () => void;
  onYellowCard?: () => void;
  onRedCardWithTeam?: (isHome: boolean) => void;
}

export interface UseMatchEventsResult {
  toasts: ToastData[];
  redCardedPlayerIds: number[];
  yellowCardedPlayerIds: number[];
  handleGoal: (teamName: string, minute: number) => void;
  handleRedCardCheck: (minute: number) => void;
  handleYellowCardCheck: (minute: number) => void;
}

// ─── Helpers ──────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Ağırlıklı rastgele oyuncu seç */
function weightedPickPlayer(
  eligible: Player[],
  yellowIds: Set<number>,
): Player {
  const weights = eligible.map(p =>
    yellowIds.has(p.id) ? GameConfig.yellowCardRepeatWeight : 1.0,
  );
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < eligible.length; i++) {
    r -= weights[i];
    if (r <= 0) return eligible[i];
  }
  return eligible[eligible.length - 1];
}

// ─── Hook ─────────────────────────────────────────────────────

export function useMatchEvents({
  homeTeamName,
  awayTeamName,
  homePlayers,
  awayPlayers,
  onEventRecorded,
  onRedCard,
  onYellowCard,
  onRedCardWithTeam,
}: UseMatchEventsOptions): UseMatchEventsResult {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [redCardedPlayerIds, setRedCardedPlayerIds] = useState<number[]>([]);
  const [yellowCardedPlayerIds, setYellowCardedPlayerIds] = useState<number[]>([]);

  const onEventRecordedRef = useRef(onEventRecorded);
  onEventRecordedRef.current = onEventRecorded;

  const onRedCardRef = useRef(onRedCard);
  onRedCardRef.current = onRedCard;

  const onYellowCardRef = useRef(onYellowCard);
  onYellowCardRef.current = onYellowCard;

  const onRedCardWithTeamRef = useRef(onRedCardWithTeam);
  onRedCardWithTeamRef.current = onRedCardWithTeam;

  const redCardedIdsRef = useRef<number[]>([]);
  redCardedIdsRef.current = redCardedPlayerIds;

  const yellowCardedIdsRef = useRef<Set<number>>(new Set());
  // Sync set with state
  yellowCardedIdsRef.current = new Set(yellowCardedPlayerIds);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: ToastData) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => dismissToast(toast.id), GameConfig.toastDurationMs);
    },
    [dismissToast],
  );

  // ─── Gol ───────────────────────────────────────────────────

  const handleGoal = useCallback(
    (teamName: string, minute: number) => {
      const isHome = teamName === homeTeamName;
      const roster = isHome ? homePlayers : awayPlayers;
      const active = roster.filter((p) => !redCardedIdsRef.current.includes(p.id));
      const pool = active.length > 0 ? active : roster;

      const scorer = pickGoalScorer(pool);

      const event: MatchEvent = {
        id: generateId(),
        type: 'goal',
        minute,
        teamName,
        playerId: scorer.id,
        playerName: scorer.name,
      };

      onEventRecordedRef.current(event);

      pushToast({
        id: generateId(),
        type: 'goal',
        label: `⚽ ${minute}' ${scorer.name}`,
      });
    },
    [homeTeamName, homePlayers, awayPlayers, pushToast],
  );

  // ─── Kırmızı Kart ─────────────────────────────────────────

  const handleRedCardCheck = useCallback(
    (minute: number) => {
      if (Math.random() > GameConfig.redCardProbability) return;

      const isHome = Math.random() < 0.5;
      const teamName = isHome ? homeTeamName : awayTeamName;
      const roster = isHome ? homePlayers : awayPlayers;

      const eligible = roster.filter((p) => !redCardedIdsRef.current.includes(p.id));
      if (eligible.length === 0) return;

      const player = eligible[Math.floor(Math.random() * eligible.length)];

      setRedCardedPlayerIds((prev) => [...prev, player.id]);

      const event: MatchEvent = {
        id: generateId(),
        type: 'red_card',
        minute,
        teamName,
        playerId: player.id,
        playerName: player.name,
      };

      onEventRecordedRef.current(event);
      onRedCardRef.current?.();
      onRedCardWithTeamRef.current?.(isHome);

      pushToast({
        id: generateId(),
        type: 'red_card',
        label: `🟥 ${minute}' ${player.name}`,
      });
    },
    [homeTeamName, awayTeamName, homePlayers, awayPlayers, pushToast],
  );

  // ─── Sarı Kart ─────────────────────────────────────────────

  const handleYellowCardCheck = useCallback(
    (minute: number) => {
      if (Math.random() > GameConfig.yellowCardProbability) return;

      const isHome = Math.random() < 0.5;
      const teamName = isHome ? homeTeamName : awayTeamName;
      const roster = isHome ? homePlayers : awayPlayers;

      // Kırmızı kartlı oyuncular hariç
      const eligible = roster.filter((p) => !redCardedIdsRef.current.includes(p.id));
      if (eligible.length === 0) return;

      // Ağırlıklı seçim — sarı kartlı oyuncu %50 daha az seçilir
      const player = weightedPickPlayer(eligible, yellowCardedIdsRef.current);

      // Zaten sarı kartlıysa → 2. sarı = kırmızı kart
      if (yellowCardedIdsRef.current.has(player.id)) {
        // 2. sarı → kırmızı
        setRedCardedPlayerIds((prev) => [...prev, player.id]);

        // Sarı kart event'i
        onEventRecordedRef.current({
          id: generateId(),
          type: 'yellow_card',
          minute,
          teamName,
          playerId: player.id,
          playerName: player.name,
        });

        // Kırmızı kart event'i
        const redEvent: MatchEvent = {
          id: generateId(),
          type: 'red_card',
          minute,
          teamName,
          playerId: player.id,
          playerName: player.name,
        };
        onEventRecordedRef.current(redEvent);
        onRedCardRef.current?.();
        onRedCardWithTeamRef.current?.(isHome);

        pushToast({
          id: generateId(),
          type: 'red_card',
          label: `🟨🟥 ${minute}' ${player.name}`,
        });
      } else {
        // 1. sarı kart
        setYellowCardedPlayerIds((prev) => [...prev, player.id]);

        const event: MatchEvent = {
          id: generateId(),
          type: 'yellow_card',
          minute,
          teamName,
          playerId: player.id,
          playerName: player.name,
        };

        onEventRecordedRef.current(event);
        onYellowCardRef.current?.();

        pushToast({
          id: generateId(),
          type: 'yellow_card',
          label: `🟨 ${minute}' ${player.name}`,
        });
      }
    },
    [homeTeamName, awayTeamName, homePlayers, awayPlayers, pushToast],
  );

  return {
    toasts,
    redCardedPlayerIds,
    yellowCardedPlayerIds,
    handleGoal,
    handleRedCardCheck,
    handleYellowCardCheck,
  };
}
