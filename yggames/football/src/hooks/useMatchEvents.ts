import { useCallback, useRef, useState } from 'react';
import { GameConfig } from '@/constants/gameConfig';
import { pickGoalScorer } from '@/services/playerDataService';
import type { MatchEvent, Player } from '@/types/index';

// ─── Types ────────────────────────────────────────────────────

export interface ToastData {
  id: string;
  type: 'goal' | 'red_card';
  label: string;
}

export interface UseMatchEventsOptions {
  homeTeamName: string;
  awayTeamName: string;
  homePlayers: Player[];
  awayPlayers: Player[];
  onEventRecorded: (event: MatchEvent) => void;
  onRedCard?: () => void;
  onRedCardWithTeam?: (isHome: boolean) => void;
}

export interface UseMatchEventsResult {
  toasts: ToastData[];
  redCardedPlayerIds: number[];
  handleGoal: (teamName: string, minute: number) => void;
  handleRedCardCheck: (minute: number) => void;
}

// ─── Helpers ──────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Hook ─────────────────────────────────────────────────────

export function useMatchEvents({
  homeTeamName,
  awayTeamName,
  homePlayers,
  awayPlayers,
  onEventRecorded,
  onRedCard,
  onRedCardWithTeam,
}: UseMatchEventsOptions): UseMatchEventsResult {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [redCardedPlayerIds, setRedCardedPlayerIds] = useState<number[]>([]);

  const onEventRecordedRef = useRef(onEventRecorded);
  onEventRecordedRef.current = onEventRecorded;

  const onRedCardRef = useRef(onRedCard);
  onRedCardRef.current = onRedCard;

  const onRedCardWithTeamRef = useRef(onRedCardWithTeam);
  onRedCardWithTeamRef.current = onRedCardWithTeam;

  const redCardedIdsRef = useRef<number[]>([]);
  redCardedIdsRef.current = redCardedPlayerIds;

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

  const handleRedCardCheck = useCallback(
    (minute: number) => {
      if (Math.random() > GameConfig.redCardProbability) return;

      // Pick a random team
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

  return { toasts, redCardedPlayerIds, handleGoal, handleRedCardCheck };
}
