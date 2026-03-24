import { useCallback, useEffect, useRef, useState } from 'react';
import { GameConfig } from '@/constants/gameConfig';
import type { Player } from '@/types/index';

// ─── Constants ────────────────────────────────────────────────

const TICK_MS = 16;
const KEEPER_HITBOX_HALF = 45; // 90px / 2
const BALL_RADIUS = 12;
const COUNTER_ATTACK_INTERVAL_MS = 10_000;
const COUNTER_ATTACK_RESOLVE_MS = 1_500;
const COUNTER_ATTACK_HIDE_MS = 2_000;
const COUNTER_ATTACK_BASE_RATE = 0.4;
const TRAIL_LENGTH = 6;

const SHOT_INTERVALS: Record<DifficultyPhase, number> = {
  firstHalf: 4000,
  secondHalfStart: 3000,
  secondHalfMid: 2500,
  finalMinutes: 2000,
  extraTime: 1500,
};

const SHOT_DURATIONS: Record<string, number> = {
  slow: 2000,   // SHO 60–69
  medium: 1500, // SHO 70–79
  fast: 1200,   // SHO 80–89
  elite: 1000,  // SHO 90–99
};

// ─── Types ────────────────────────────────────────────────────

export type DifficultyPhase =
  | 'firstHalf'
  | 'secondHalfStart'
  | 'secondHalfMid'
  | 'finalMinutes'
  | 'extraTime';

export type CounterAttackStatus = 'idle' | 'active' | 'goal' | 'saved';

export interface ShotRenderData {
  id: string;
  x: number;
  y: number;
  trail: Array<{ x: number; y: number }>;
}

export interface UseKeeperClashEngineOptions {
  canvasWidth: number;
  canvasHeight: number;
  goalLineY: number;
  keeperXRef: React.MutableRefObject<number>;
  isRunning: boolean;
  matchMinute: number;
  isExtraTime: boolean;
  awayAvgShooting: number;
  homeAvgFinishing: number;
  homeTeamName: string;
  awayTeamName: string;
  homePlayers: Player[];
  onGoalConceded: (minute: number) => void;
  onCounterAttackGoal: (minute: number) => void;
  onSave: () => void;
  onCounterAttackStateChange: (status: CounterAttackStatus, isGoal: boolean) => void;
}

export interface KeeperClashEngineResult {
  shots: ShotRenderData[];
  difficultyPhase: DifficultyPhase;
}

// ─── Helpers ──────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function getDifficultyPhase(minute: number, isExtraTime: boolean): DifficultyPhase {
  if (isExtraTime) return 'extraTime';
  if (minute >= 75) return 'finalMinutes';
  if (minute >= 60) return 'secondHalfMid';
  if (minute >= 45) return 'secondHalfStart';
  return 'firstHalf';
}

function getShotDuration(avgShooting: number): number {
  if (avgShooting >= 90) return SHOT_DURATIONS.elite ?? 1000;
  if (avgShooting >= 80) return SHOT_DURATIONS.fast ?? 1200;
  if (avgShooting >= 70) return SHOT_DURATIONS.medium ?? 1500;
  return SHOT_DURATIONS.slow ?? 2000;
}

type TrajectoryType = 'straight' | 'arcLeft' | 'arcRight';

function pickTrajectory(): TrajectoryType {
  const r = Math.random();
  if (r < 0.6) return 'straight';
  if (r < 0.8) return 'arcLeft';
  return 'arcRight';
}

interface Vec2 { x: number; y: number }

function quadBezier(t: number, p0: Vec2, p1: Vec2, p2: Vec2): Vec2 {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

// ─── Internal Shot ────────────────────────────────────────────

interface ShotPhysics {
  id: string;
  p0: Vec2;
  p1: Vec2; // bezier control point
  p2: Vec2;
  t: number;
  duration: number;
  resolved: boolean;
  trail: Vec2[];
}

// ─── Hook ─────────────────────────────────────────────────────

export function useKeeperClashEngine({
  canvasWidth,
  canvasHeight,
  goalLineY,
  keeperXRef,
  isRunning,
  matchMinute,
  isExtraTime,
  awayAvgShooting,
  homeAvgFinishing,
  homeTeamName: _homeTeamName,
  awayTeamName: _awayTeamName,
  homePlayers: _homePlayers,
  onGoalConceded,
  onCounterAttackGoal,
  onSave,
  onCounterAttackStateChange,
}: UseKeeperClashEngineOptions): KeeperClashEngineResult {
  const shotsRef = useRef<ShotPhysics[]>([]);
  const nextShotRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counterAttackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counterAttackActiveRef = useRef(false);

  // Volatile refs (avoid stale closures in timers/intervals)
  const matchMinuteRef = useRef(matchMinute);
  matchMinuteRef.current = matchMinute;

  const isExtraTimeRef = useRef(isExtraTime);
  isExtraTimeRef.current = isExtraTime;

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  const canvasWidthRef = useRef(canvasWidth);
  canvasWidthRef.current = canvasWidth;

  const canvasHeightRef = useRef(canvasHeight);
  canvasHeightRef.current = canvasHeight;

  const goalLineYRef = useRef(goalLineY);
  goalLineYRef.current = goalLineY;

  const awayAvgShootingRef = useRef(awayAvgShooting);
  awayAvgShootingRef.current = awayAvgShooting;

  const homeAvgFinishingRef = useRef(homeAvgFinishing);
  homeAvgFinishingRef.current = homeAvgFinishing;

  const onGoalConcededRef = useRef(onGoalConceded);
  onGoalConcededRef.current = onGoalConceded;

  const onCounterAttackGoalRef = useRef(onCounterAttackGoal);
  onCounterAttackGoalRef.current = onCounterAttackGoal;

  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  const onCounterAttackStateChangeRef = useRef(onCounterAttackStateChange);
  onCounterAttackStateChangeRef.current = onCounterAttackStateChange;

  const [shots, setShots] = useState<ShotRenderData[]>([]);
  const [difficultyPhase, setDifficultyPhase] = useState<DifficultyPhase>('firstHalf');

  // ─── Spawn shot ─────────────────────────────────────────────

  const spawnShot = useCallback(() => {
    const w = canvasWidthRef.current;
    const targetY = goalLineYRef.current;
    if (w <= 0 || targetY <= 0) return;

    const frameLeft = w * 0.075;
    const frameRight = w * 0.925;
    const frameW = frameRight - frameLeft;

    const spawnX = w * (0.1 + Math.random() * 0.8);
    const spawnY = -BALL_RADIUS;
    const endX = frameLeft + frameW * (0.1 + Math.random() * 0.8);
    const endY = targetY;

    const traj = pickTrajectory();
    let cx = (spawnX + endX) / 2;
    const cy = (spawnY + endY) / 2;
    if (traj === 'arcLeft') cx -= frameW * 0.3;
    else if (traj === 'arcRight') cx += frameW * 0.3;

    const shot: ShotPhysics = {
      id: uid(),
      p0: { x: spawnX, y: spawnY },
      p1: { x: cx, y: cy },
      p2: { x: endX, y: endY },
      t: 0,
      duration: getShotDuration(awayAvgShootingRef.current),
      resolved: false,
      trail: [],
    };
    shotsRef.current.push(shot);

    // Schedule next shot
    if (isRunningRef.current && !counterAttackActiveRef.current) {
      const phase = getDifficultyPhase(matchMinuteRef.current, isExtraTimeRef.current);
      nextShotRef.current = setTimeout(spawnShot, SHOT_INTERVALS[phase]);
    }
  }, []);

  // ─── Counter-attack ─────────────────────────────────────────

  const scheduleNextCounterAttack = useCallback(() => {
    counterAttackRef.current = setTimeout(() => {
      triggerCounterAttack();
    }, COUNTER_ATTACK_INTERVAL_MS);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerCounterAttack = useCallback(() => {
    if (!isRunningRef.current) return;
    counterAttackActiveRef.current = true;

    // Pause shot spawner
    if (nextShotRef.current) {
      clearTimeout(nextShotRef.current);
      nextShotRef.current = null;
    }

    onCounterAttackStateChangeRef.current('active', false);

    setTimeout(() => {
      const avgFinishing = homeAvgFinishingRef.current;
      const bonus = (avgFinishing - 70) / 100;
      const rate = Math.max(0.1, Math.min(0.9, COUNTER_ATTACK_BASE_RATE + bonus));
      const isGoal = Math.random() < rate;

      if (isGoal) {
        onCounterAttackGoalRef.current(matchMinuteRef.current);
      }

      onCounterAttackStateChangeRef.current(isGoal ? 'goal' : 'saved', isGoal);

      setTimeout(() => {
        counterAttackActiveRef.current = false;
        onCounterAttackStateChangeRef.current('idle', false);

        // Resume shots
        if (isRunningRef.current) {
          const phase = getDifficultyPhase(matchMinuteRef.current, isExtraTimeRef.current);
          nextShotRef.current = setTimeout(spawnShot, SHOT_INTERVALS[phase]);
        }

        scheduleNextCounterAttack();
      }, COUNTER_ATTACK_HIDE_MS);
    }, COUNTER_ATTACK_RESOLVE_MS);
  }, [spawnShot, scheduleNextCounterAttack]);

  // ─── Tick (physics) ─────────────────────────────────────────

  const step = useCallback(() => {
    const shots = shotsRef.current;
    const keeperX = keeperXRef.current;

    const phase = getDifficultyPhase(matchMinuteRef.current, isExtraTimeRef.current);

    const resolvedIds: string[] = [];

    for (const shot of shots) {
      if (shot.resolved) continue;

      shot.t = Math.min(shot.t + TICK_MS / shot.duration, 1.0);
      const pos = quadBezier(shot.t, shot.p0, shot.p1, shot.p2);

      shot.trail.push({ x: pos.x, y: pos.y });
      if (shot.trail.length > TRAIL_LENGTH) shot.trail.shift();

      if (shot.t >= 1.0) {
        shot.resolved = true;
        resolvedIds.push(shot.id);

        const keeperCenter = keeperX + 30; // 30 = half of KEEPER_WIDTH 60
        const dist = Math.abs(pos.x - keeperCenter);

        if (dist <= KEEPER_HITBOX_HALF) {
          onSaveRef.current();
        } else {
          onGoalConcededRef.current(matchMinuteRef.current);
        }
      }
    }

    // Remove resolved shots after brief visual pause
    if (resolvedIds.length > 0) {
      setTimeout(() => {
        shotsRef.current = shotsRef.current.filter((s) => !resolvedIds.includes(s.id));
      }, 300);
    }

    setShots(
      shots
        .filter((s) => !s.resolved)
        .map((s) => {
          const pos = quadBezier(s.t, s.p0, s.p1, s.p2);
          return {
            id: s.id,
            x: pos.x,
            y: pos.y,
            trail: [...s.trail],
          };
        }),
    );

    setDifficultyPhase(phase);
  }, [keeperXRef]);

  // ─── Start / Stop ────────────────────────────────────────────

  useEffect(() => {
    if (!isRunning || canvasWidth <= 0 || canvasHeight <= 0 || goalLineY <= 0) return;

    shotsRef.current = [];
    const phase = getDifficultyPhase(matchMinute, isExtraTime);
    nextShotRef.current = setTimeout(spawnShot, SHOT_INTERVALS[phase]);
    counterAttackRef.current = setTimeout(triggerCounterAttack, COUNTER_ATTACK_INTERVAL_MS);

    return () => {
      if (nextShotRef.current) clearTimeout(nextShotRef.current);
      if (counterAttackRef.current) clearTimeout(counterAttackRef.current);
    };
  }, [isRunning, canvasWidth, canvasHeight, goalLineY]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isRunning || canvasWidth <= 0 || canvasHeight <= 0) return;
    const id = setInterval(step, TICK_MS);
    return () => clearInterval(id);
  }, [isRunning, canvasWidth, canvasHeight, step]);

  // Stop everything when not running
  useEffect(() => {
    if (!isRunning) {
      if (nextShotRef.current) clearTimeout(nextShotRef.current);
      if (counterAttackRef.current) clearTimeout(counterAttackRef.current);
    }
  }, [isRunning]);

  return { shots, difficultyPhase };
}
