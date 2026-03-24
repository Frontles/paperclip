import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────

const BALLS_PER_TEAM = 5;
const BALL_RADIUS = 8;
const ARENA_MARGIN = 24;
const GOAL_ARC_HALF_DEG = 22.5;
// 360 degrees / 12 000 ms * 16 ms per frame
const DEG_PER_FRAME = (360 / 12000) * 16;
const INITIAL_SPEED = 2.0;
const MAX_SPEED = 5.0;
const MIN_SPEED = 1.0;
const WALL_DAMPING = 0.85;
const BALL_DAMPING = 0.9;
const BOUNCE_RAND = 0.05;
const FRICTION = 0.998;
const RESPAWN_DELAY_MS = 800;

// ─── Types ────────────────────────────────────────────────────

interface BallPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  respawning: boolean;
}

export interface ArenaBallRender {
  x: number;
  y: number;
  color: string;
  teamIndex: number;
  isHome: boolean;
  active: boolean;
}

export interface UseArenaEngineOptions {
  canvasWidth: number;
  canvasHeight: number;
  homeColor: string;
  awayColor: string;
  homeTeamName: string;
  awayTeamName: string;
  onGoal: (scoringTeamName: string) => void;
  isRunning: boolean;
  isHomeOwnership: boolean;
}

export interface ArenaEngineResult {
  balls: ArenaBallRender[];
  arenaRadius: number;
  arenaCx: number;
  arenaCy: number;
  goalAngleDeg: number;
  removeBall: (isHome: boolean) => void;
}

// ─── Helpers ──────────────────────────────────────────────────

function spawnBall(cx: number, cy: number, xOffset: number): BallPhysics {
  const angle = Math.random() * Math.PI * 2;
  const speed = INITIAL_SPEED * (0.8 + Math.random() * 0.4);
  return {
    x: cx + xOffset + (Math.random() - 0.5) * 8,
    y: cy + (Math.random() - 0.5) * 8,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    active: true,
    respawning: false,
  };
}

function enforceSpeed(b: BallPhysics): void {
  const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
  if (speed > MAX_SPEED) {
    const s = MAX_SPEED / speed;
    b.vx *= s;
    b.vy *= s;
  } else if (speed < MIN_SPEED) {
    if (speed > 0.001) {
      const s = MIN_SPEED / speed;
      b.vx *= s;
      b.vy *= s;
    } else {
      const a = Math.random() * Math.PI * 2;
      b.vx = Math.cos(a) * MIN_SPEED;
      b.vy = Math.sin(a) * MIN_SPEED;
    }
  }
}

// ─── Hook ─────────────────────────────────────────────────────

export function useArenaEngine({
  canvasWidth,
  canvasHeight,
  homeColor,
  awayColor,
  homeTeamName,
  awayTeamName,
  onGoal,
  isRunning,
  isHomeOwnership,
}: UseArenaEngineOptions): ArenaEngineResult {
  const arenaRadius = useMemo(
    () =>
      canvasWidth > 0 && canvasHeight > 0
        ? Math.min(canvasWidth, canvasHeight) / 2 - ARENA_MARGIN
        : 0,
    [canvasWidth, canvasHeight],
  );

  const arenaCx = useMemo(() => canvasWidth / 2, [canvasWidth]);
  const arenaCy = useMemo(() => canvasHeight / 2, [canvasHeight]);

  // Physics state in refs — no re-renders during physics updates
  const ballsRef = useRef<BallPhysics[]>([]);
  const goalAngleRef = useRef(0); // 0 = north (12 o'clock), clockwise

  // Volatile refs so step closure doesn't need these as deps
  const onGoalRef = useRef(onGoal);
  onGoalRef.current = onGoal;

  const isHomeOwnershipRef = useRef(isHomeOwnership);
  isHomeOwnershipRef.current = isHomeOwnership;

  const teamsRef = useRef([homeTeamName, awayTeamName]);
  teamsRef.current = [homeTeamName, awayTeamName];

  const colorsRef = useRef([homeColor, awayColor]);
  colorsRef.current = [homeColor, awayColor];

  const arenaCxRef = useRef(arenaCx);
  arenaCxRef.current = arenaCx;

  const arenaCyRef = useRef(arenaCy);
  arenaCyRef.current = arenaCy;

  const arenaRadiusRef = useRef(arenaRadius);
  arenaRadiusRef.current = arenaRadius;

  // Render state — one batch update per frame
  const [renderState, setRenderState] = useState<{
    balls: ArenaBallRender[];
    goalAngleDeg: number;
  }>({ balls: [], goalAngleDeg: 0 });

  // Initialise balls when canvas dimensions become available
  useEffect(() => {
    if (canvasWidth <= 0 || canvasHeight <= 0) return;
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const balls: BallPhysics[] = [];
    for (let i = 0; i < BALLS_PER_TEAM; i++) {
      balls.push(spawnBall(cx, cy, -15));
    }
    for (let i = 0; i < BALLS_PER_TEAM; i++) {
      balls.push(spawnBall(cx, cy, 15));
    }
    ballsRef.current = balls;
    goalAngleRef.current = 0;
  }, [canvasWidth, canvasHeight]);

  const removeBall = useCallback((isHome: boolean) => {
    const start = isHome ? 0 : BALLS_PER_TEAM;
    const end = start + BALLS_PER_TEAM;
    const activeBalls: number[] = [];
    for (let i = start; i < end; i++) {
      if (ballsRef.current[i]?.active) activeBalls.push(i);
    }
    if (activeBalls.length <= 1) return; // keep at least 1 ball
    const idx = activeBalls[Math.floor(Math.random() * activeBalls.length)];
    if (ballsRef.current[idx] !== undefined) {
      (ballsRef.current[idx] as BallPhysics).active = false;
    }
  }, []);

  const step = useCallback(() => {
    const balls = ballsRef.current;
    if (!balls.length) return;

    const cx = arenaCxRef.current;
    const cy = arenaCyRef.current;
    const r = arenaRadiusRef.current;
    if (r <= 0) return;

    // Advance goal angle (0 = north, clockwise)
    goalAngleRef.current = (goalAngleRef.current + DEG_PER_FRAME) % 360;
    const goalAngleDeg = goalAngleRef.current;

    // Convert visual angle (0=north, CW) to atan2 convention (0=east, screen Y-down)
    // Visual north = atan2 -90, so: screenAngle = goalAngleDeg - 90
    const goalScreenAngle = goalAngleDeg - 90;

    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      if (!b || !b.active || b.respawning) continue;

      // Apply friction and move
      b.vx *= FRICTION;
      b.vy *= FRICTION;
      b.x += b.vx;
      b.y += b.vy;

      // Circular boundary check
      const dx = b.x - cx;
      const dy = b.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist + BALL_RADIUS >= r) {
        // Compute ball angle in atan2 convention
        const ballAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const angleDiff = ((ballAngle - goalScreenAngle + 540) % 360) - 180;
        const inGoal = Math.abs(angleDiff) <= GOAL_ARC_HALF_DEG;

        if (inGoal) {
          // Scoring: goal owner's opponent gets the point
          const scoringTeam = isHomeOwnershipRef.current
            ? teamsRef.current[1]
            : teamsRef.current[0];
          onGoalRef.current(scoringTeam ?? '');

          // Deactivate and schedule respawn
          b.active = false;
          b.respawning = true;
          const captured = b;
          const isHome = i < BALLS_PER_TEAM;
          const cxSnap = cx;
          const cySnap = cy;
          setTimeout(() => {
            const fresh = spawnBall(cxSnap, cySnap, isHome ? -15 : 15);
            captured.x = fresh.x;
            captured.y = fresh.y;
            captured.vx = fresh.vx;
            captured.vy = fresh.vy;
            captured.active = true;
            captured.respawning = false;
          }, RESPAWN_DELAY_MS);
          continue;
        }

        // Reflect off circular boundary
        const nx = -dx / dist;
        const ny = -dy / dist;
        const dot = b.vx * nx + b.vy * ny;
        b.vx = (b.vx - 2 * dot * nx) * WALL_DAMPING;
        b.vy = (b.vy - 2 * dot * ny) * WALL_DAMPING;

        // Push inside
        b.x = cx + (r - BALL_RADIUS - 1) * (-nx);
        b.y = cy + (r - BALL_RADIUS - 1) * (-ny);

        // Small random angle variance on bounce
        const randAngle = (Math.random() - 0.5) * BOUNCE_RAND;
        const cos = Math.cos(randAngle);
        const sin = Math.sin(randAngle);
        const nvx = b.vx * cos - b.vy * sin;
        const nvy = b.vx * sin + b.vy * cos;
        b.vx = nvx;
        b.vy = nvy;
      }

      enforceSpeed(b);
    }

    // Ball-ball elastic collisions — O(n²) but n=10 is trivial
    for (let i = 0; i < balls.length - 1; i++) {
      const bi = balls[i];
      if (!bi || !bi.active) continue;
      for (let j = i + 1; j < balls.length; j++) {
        const bj = balls[j];
        if (!bj || !bj.active) continue;
        const dx = bj.x - bi.x;
        const dy = bj.y - bi.y;
        const distSq = dx * dx + dy * dy;
        const minDist = BALL_RADIUS * 2;
        if (distSq < minDist * minDist && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (minDist - dist) / 2;
          bi.x -= nx * overlap;
          bi.y -= ny * overlap;
          bj.x += nx * overlap;
          bj.y += ny * overlap;
          const vin = bi.vx * nx + bi.vy * ny;
          const vjn = bj.vx * nx + bj.vy * ny;
          bi.vx += (vjn - vin) * nx * BALL_DAMPING;
          bi.vy += (vjn - vin) * ny * BALL_DAMPING;
          bj.vx += (vin - vjn) * nx * BALL_DAMPING;
          bj.vy += (vin - vjn) * ny * BALL_DAMPING;
        }
      }
    }

    setRenderState({
      balls: balls.map((b, i) => ({
        x: b.x,
        y: b.y,
        color:
          i < BALLS_PER_TEAM
            ? (colorsRef.current[0] ?? homeColor)
            : (colorsRef.current[1] ?? awayColor),
        teamIndex: i < BALLS_PER_TEAM ? i : i - BALLS_PER_TEAM,
        isHome: i < BALLS_PER_TEAM,
        active: b.active,
      })),
      goalAngleDeg,
    });
  }, []); // All volatile data accessed via refs

  useEffect(() => {
    if (!isRunning || canvasWidth <= 0 || canvasHeight <= 0) return;
    const id = setInterval(step, 16);
    return () => clearInterval(id);
  }, [isRunning, step, canvasWidth, canvasHeight]);

  return {
    balls: renderState.balls,
    arenaRadius,
    arenaCx,
    arenaCy,
    goalAngleDeg: renderState.goalAngleDeg,
    removeBall,
  };
}
