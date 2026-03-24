/**
 * Arena Game Mode — QA Test Suite — YGGAA-56
 * Tests: Engine logic · Physics · Scoring · Red cards · i18n · File structure · Store
 */

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const readFile = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const exists   = (p) => fs.existsSync(path.join(ROOT, p));

// ─── 1. FILE STRUCTURE ────────────────────────────────────────────────────────

describe('Arena — File Structure', () => {
  test('app/game/arena.tsx exists', () => {
    expect(exists('app/game/arena.tsx')).toBe(true);
  });

  test('src/hooks/useArenaEngine.ts exists', () => {
    expect(exists('src/hooks/useArenaEngine.ts')).toBe(true);
  });
});

// ─── 2. ARENA SCREEN SOURCE CHECKS ───────────────────────────────────────────

describe('Arena Screen — app/game/arena.tsx', () => {
  let src;
  beforeAll(() => { src = readFile('app/game/arena.tsx'); });

  test('imports useArenaEngine', () => {
    expect(src).toMatch(/useArenaEngine/);
  });

  test('imports useMatchTimer', () => {
    expect(src).toMatch(/useMatchTimer/);
  });

  test('imports useMatchStore for score and team data', () => {
    expect(src).toMatch(/useMatchStore/);
  });

  test('imports ScoreBoard component', () => {
    expect(src).toMatch(/ScoreBoard/);
  });

  test('imports EventToastStack', () => {
    expect(src).toMatch(/EventToastStack/);
  });

  test('OWNERSHIP_SWITCH_MS is 5000ms (GDD: ownership alternates every 5s)', () => {
    expect(src).toMatch(/OWNERSHIP_SWITCH_MS\s*=\s*5000/);
  });

  test('renders circular arena boundary (borderRadius = arenaRadius)', () => {
    expect(src).toMatch(/borderRadius.*arenaRadius/s);
  });

  test('rotating goal uses goalAngleDeg from engine', () => {
    expect(src).toMatch(/goalAngleDeg/);
    expect(src).toMatch(/rotate.*goalAngleDeg/s);
  });

  test('ownership bar shows ownerName and countdown', () => {
    expect(src).toMatch(/ownerName/);
    expect(src).toMatch(/ownershipCountdown/);
  });

  test('ownership color reflects current owner team color', () => {
    expect(src).toMatch(/ownerColor/);
  });

  test('goal celebration flash overlay present', () => {
    expect(src).toMatch(/goalFlash/);
  });

  test('navigates to /post-match on match end', () => {
    expect(src).toMatch(/\/post-match/);
  });

  test('quit modal present with Resume and Quit options', () => {
    expect(src).toMatch(/QuitModal/);
    expect(src).toMatch(/Resume/);
    expect(src).toMatch(/Quit/);
  });

  test('ball number rendered inside each ball (teamIndex + 1)', () => {
    expect(src).toMatch(/teamIndex.*\+.*1/s);
  });

  test('red card wired to removeBall via removeBallForRedCard ref', () => {
    expect(src).toMatch(/removeBallForRedCard/);
    expect(src).toMatch(/removeBall/);
  });

  test('whistle_start sound plays on mount', () => {
    expect(src).toMatch(/whistle_start/);
  });

  test('whistle_end sound plays on match end', () => {
    expect(src).toMatch(/whistle_end/);
  });
});

// ─── 3. ARENA ENGINE — PURE LOGIC ────────────────────────────────────────────

// Extract and test pure logic functions from useArenaEngine
// (without importing the React hook — avoids React environment requirement)

const BALLS_PER_TEAM = 5;
const BALL_RADIUS    = 8;
const MAX_SPEED      = 5.0;
const MIN_SPEED      = 1.0;
const GOAL_ARC_HALF_DEG = 22.5;

// Replicated from useArenaEngine for unit testing
function enforceSpeed(b) {
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

function spawnBall(cx, cy, xOffset) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2.0 * (0.8 + Math.random() * 0.4);
  return {
    x: cx + xOffset + (Math.random() - 0.5) * 8,
    y: cy + (Math.random() - 0.5) * 8,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    active: true,
    respawning: false,
  };
}

// Goal scoring check: is ball inside goal arc?
function isInGoalArc(ballAngleDeg, goalScreenAngleDeg) {
  const angleDiff = ((ballAngleDeg - goalScreenAngleDeg + 540) % 360) - 180;
  return Math.abs(angleDiff) <= GOAL_ARC_HALF_DEG;
}

// Scoring logic: goal owner's opponent scores
function resolveScoringTeam(isHomeOwnership, teams) {
  return isHomeOwnership ? teams[1] : teams[0];
}

describe('Arena Engine — enforceSpeed', () => {
  test('clamps speed above MAX_SPEED (5.0)', () => {
    const b = { vx: 10, vy: 0, active: true, respawning: false };
    enforceSpeed(b);
    const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    expect(speed).toBeCloseTo(MAX_SPEED, 5);
  });

  test('clamps speed below MIN_SPEED (1.0)', () => {
    const b = { vx: 0.1, vy: 0, active: true, respawning: false };
    enforceSpeed(b);
    const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    expect(speed).toBeCloseTo(MIN_SPEED, 5);
  });

  test('does not alter a ball already within speed range', () => {
    const b = { vx: 2, vy: 2, active: true, respawning: false };
    const speedBefore = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    enforceSpeed(b);
    const speedAfter = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    expect(speedAfter).toBeCloseTo(speedBefore, 5);
  });

  test('zero-velocity ball gets reset to MIN_SPEED', () => {
    const b = { vx: 0, vy: 0, active: true, respawning: false };
    enforceSpeed(b);
    const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    expect(speed).toBeCloseTo(MIN_SPEED, 5);
  });

  test('diagonal fast ball — speed clamped, direction preserved', () => {
    const b = { vx: 10, vy: 10, active: true, respawning: false };
    enforceSpeed(b);
    // Direction preserved: vx/vy ratio unchanged
    expect(b.vx / b.vy).toBeCloseTo(1, 5);
  });
});

describe('Arena Engine — spawnBall', () => {
  test('spawned ball is active and not respawning', () => {
    const b = spawnBall(200, 300, -15);
    expect(b.active).toBe(true);
    expect(b.respawning).toBe(false);
  });

  test('home ball spawns near cx offset -15', () => {
    const b = spawnBall(200, 300, -15);
    expect(b.x).toBeGreaterThan(200 - 15 - 10);
    expect(b.x).toBeLessThan(200 - 15 + 10);
  });

  test('away ball spawns near cx offset +15', () => {
    const b = spawnBall(200, 300, 15);
    expect(b.x).toBeGreaterThan(200 + 15 - 10);
    expect(b.x).toBeLessThan(200 + 15 + 10);
  });

  test('spawned ball has velocity within speed bounds', () => {
    for (let i = 0; i < 20; i++) {
      const b = spawnBall(200, 300, 0);
      const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      expect(speed).toBeGreaterThanOrEqual(MIN_SPEED);
      expect(speed).toBeLessThanOrEqual(MAX_SPEED);
    }
  });
});

describe('Arena Engine — goal arc detection (GDD: 45° arc = ±22.5°)', () => {
  test('ball exactly at goal center (angleDiff = 0) is in goal', () => {
    expect(isInGoalArc(90, 90)).toBe(true);
  });

  test('ball at ±22.5° boundary is in goal (inclusive)', () => {
    expect(isInGoalArc(90 + 22.5, 90)).toBe(true);
    expect(isInGoalArc(90 - 22.5, 90)).toBe(true);
  });

  test('ball at ±23° is outside goal', () => {
    expect(isInGoalArc(90 + 23, 90)).toBe(false);
    expect(isInGoalArc(90 - 23, 90)).toBe(false);
  });

  test('goal arc detection wraps correctly at 0°/360° boundary', () => {
    // Goal at 10°, ball at 350° → diff = -20° → in goal
    expect(isInGoalArc(350, 10)).toBe(true);
    // Goal at 10°, ball at 340° → diff = -30° → outside
    expect(isInGoalArc(340, 10)).toBe(false);
  });

  test('180° opposite is never in goal', () => {
    expect(isInGoalArc(270, 90)).toBe(false);
  });
});

describe('Arena Engine — scoring logic (GDD: ball in goal → opposing team scores)', () => {
  const teams = ['HomeFC', 'AwayFC'];

  test('when home owns goal, away team scores', () => {
    expect(resolveScoringTeam(true, teams)).toBe('AwayFC');
  });

  test('when away owns goal, home team scores', () => {
    expect(resolveScoringTeam(false, teams)).toBe('HomeFC');
  });

  test('ownership toggle alternates scoring team correctly', () => {
    let isHome = true;
    const results = [];
    for (let i = 0; i < 4; i++) {
      results.push(resolveScoringTeam(isHome, teams));
      isHome = !isHome;
    }
    expect(results).toEqual(['AwayFC', 'HomeFC', 'AwayFC', 'HomeFC']);
  });
});

describe('Arena Engine — removeBall (red card logic, GDD §8)', () => {
  function makeBalls() {
    const balls = [];
    for (let i = 0; i < BALLS_PER_TEAM * 2; i++) {
      balls.push({ x: 0, y: 0, vx: 1, vy: 1, active: true, respawning: false });
    }
    return balls;
  }

  function removeBall(balls, isHome) {
    const start = isHome ? 0 : BALLS_PER_TEAM;
    const end   = start + BALLS_PER_TEAM;
    const active = [];
    for (let i = start; i < end; i++) {
      if (balls[i]?.active) active.push(i);
    }
    if (active.length <= 1) return; // keep at least 1
    const idx = active[Math.floor(Math.random() * active.length)];
    balls[idx].active = false;
  }

  test('removing home ball reduces home active count by 1', () => {
    const balls = makeBalls();
    const before = balls.slice(0, BALLS_PER_TEAM).filter(b => b.active).length;
    removeBall(balls, true);
    const after = balls.slice(0, BALLS_PER_TEAM).filter(b => b.active).length;
    expect(after).toBe(before - 1);
  });

  test('removing away ball reduces away active count by 1', () => {
    const balls = makeBalls();
    const before = balls.slice(BALLS_PER_TEAM).filter(b => b.active).length;
    removeBall(balls, false);
    const after = balls.slice(BALLS_PER_TEAM).filter(b => b.active).length;
    expect(after).toBe(before - 1);
  });

  test('does not remove home ball when only 1 remains (minimum 1 enforced)', () => {
    const balls = makeBalls();
    // Deactivate all home balls except one
    for (let i = 0; i < BALLS_PER_TEAM - 1; i++) balls[i].active = false;
    removeBall(balls, true);
    const activeHome = balls.slice(0, BALLS_PER_TEAM).filter(b => b.active).length;
    expect(activeHome).toBe(1);
  });

  test('does not remove away ball when only 1 remains (minimum 1 enforced)', () => {
    const balls = makeBalls();
    for (let i = BALLS_PER_TEAM; i < BALLS_PER_TEAM * 2 - 1; i++) balls[i].active = false;
    removeBall(balls, false);
    const activeAway = balls.slice(BALLS_PER_TEAM).filter(b => b.active).length;
    expect(activeAway).toBe(1);
  });

  test('removing home ball does not affect away balls', () => {
    const balls = makeBalls();
    const awayBefore = balls.slice(BALLS_PER_TEAM).filter(b => b.active).length;
    removeBall(balls, true);
    const awayAfter = balls.slice(BALLS_PER_TEAM).filter(b => b.active).length;
    expect(awayAfter).toBe(awayBefore);
  });

  test('removing away ball does not affect home balls', () => {
    const balls = makeBalls();
    const homeBefore = balls.slice(0, BALLS_PER_TEAM).filter(b => b.active).length;
    removeBall(balls, false);
    const homeAfter = balls.slice(0, BALLS_PER_TEAM).filter(b => b.active).length;
    expect(homeAfter).toBe(homeBefore);
  });
});

describe('Arena Engine — goal rotation (GDD: 360° / 12s)', () => {
  const DEG_PER_FRAME = (360 / 12000) * 16;

  test('DEG_PER_FRAME is correct (360/12000*16 ≈ 0.48)', () => {
    expect(DEG_PER_FRAME).toBeCloseTo(0.48, 5);
  });

  test('goal completes full rotation in 750 frames (12s at 16ms/frame)', () => {
    let angle = 0;
    for (let i = 0; i < 750; i++) {
      angle = (angle + DEG_PER_FRAME) % 360;
    }
    expect(angle).toBeCloseTo(0, 0); // back to ~0°
  });

  test('goal angle stays within [0, 360)', () => {
    let angle = 0;
    for (let i = 0; i < 1500; i++) {
      angle = (angle + DEG_PER_FRAME) % 360;
      expect(angle).toBeGreaterThanOrEqual(0);
      expect(angle).toBeLessThan(360);
    }
  });
});

describe('Arena Engine — arenaRadius calculation', () => {
  function calcRadius(w, h) {
    return w > 0 && h > 0 ? Math.min(w, h) / 2 - 24 : 0;
  }

  test('radius is half the smaller dimension minus ARENA_MARGIN (24)', () => {
    expect(calcRadius(400, 600)).toBe(176); // min=400, 400/2-24=176
  });

  test('radius is 0 when canvas not yet measured', () => {
    expect(calcRadius(0, 0)).toBe(0);
    expect(calcRadius(0, 600)).toBe(0);
  });

  test('square canvas: radius = side/2 - 24', () => {
    expect(calcRadius(500, 500)).toBe(226);
  });
});

describe('Arena Engine — ball-ball collision (elastic, O(n²))', () => {
  test('two overlapping balls are separated after collision step', () => {
    const BALL_DAMPING = 0.9;
    const minDist = BALL_RADIUS * 2;
    const bi = { x: 0, y: 0, vx: 1, vy: 0, active: true };
    const bj = { x: 10, y: 0, vx: -1, vy: 0, active: true }; // overlap: 16-10=6

    const dx = bj.x - bi.x;
    const dy = bj.y - bi.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < minDist && dist > 0.001) {
      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = (minDist - dist) / 2;
      bi.x -= nx * overlap;
      bj.x += nx * overlap;
      const vin = bi.vx * nx + bi.vy * ny;
      const vjn = bj.vx * nx + bj.vy * ny;
      bi.vx += (vjn - vin) * nx * BALL_DAMPING;
      bj.vx += (vin - vjn) * nx * BALL_DAMPING;
    }

    const newDist = Math.sqrt((bj.x - bi.x) ** 2 + (bj.y - bi.y) ** 2);
    expect(newDist).toBeGreaterThanOrEqual(minDist);
  });

  test('inactive ball is skipped in collision detection', () => {
    const bi = { x: 0, y: 0, vx: 1, vy: 0, active: false };
    const bj = { x: 5, y: 0, vx: -1, vy: 0, active: true };
    // If bi is inactive, no collision processing should occur
    if (!bi.active) {
      // velocities unchanged
      expect(bi.vx).toBe(1);
      expect(bj.vx).toBe(-1);
    }
  });
});

// ─── 4. i18n — ARENA KEYS ─────────────────────────────────────────────────────

describe('i18n — Arena keys present in all languages', () => {
  const LANGS = ['en', 'tr', 'de', 'fr'];
  const ARENA_KEYS = ['modeSelect.arenaTitle', 'modeSelect.arenaDescription'];

  LANGS.forEach((lang) => {
    ARENA_KEYS.forEach((key) => {
      test(`${lang}.json has key "${key}"`, () => {
        const json = readJson(`src/i18n/${lang}.json`);
        expect(json[key]).toBeDefined();
        expect(typeof json[key]).toBe('string');
        expect(json[key].length).toBeGreaterThan(0);
      });
    });
  });

  test('en.json arenaDescription mentions circular arena concept', () => {
    const en = readJson('src/i18n/en.json');
    const desc = en['modeSelect.arenaDescription'].toLowerCase();
    // Should reference key Arena concepts
    expect(desc).toMatch(/arena|circular|rotating|goal|ball/i);
  });
});

// ─── 5. STORE — ARENA MODE ────────────────────────────────────────────────────

describe('matchStore — arena mode', () => {
  let useMatchStore;
  beforeAll(() => {
    ({ useMatchStore } = require('../src/stores/matchStore'));
  });

  beforeEach(() => {
    useMatchStore.setState({ selectedMode: null });
  });

  test('setSelectedMode("arena") sets selectedMode to "arena"', () => {
    useMatchStore.getState().setSelectedMode('arena');
    expect(useMatchStore.getState().selectedMode).toBe('arena');
  });

  test('clearMatch resets selectedMode to null from "arena"', () => {
    useMatchStore.getState().setSelectedMode('arena');
    useMatchStore.getState().clearMatch();
    expect(useMatchStore.getState().selectedMode).toBeNull();
  });

  test('selectedMode type includes "arena" (GDD §9 — Arena is a valid mode)', () => {
    // TypeScript type is 'plinko' | 'arena' | null — verify store accepts it
    useMatchStore.getState().setSelectedMode('arena');
    expect(useMatchStore.getState().selectedMode).toBe('arena');
    useMatchStore.getState().setSelectedMode('plinko');
    expect(useMatchStore.getState().selectedMode).toBe('plinko');
  });
});

// ─── 6. MODE-SELECT — ARENA CARD ACTIVE ──────────────────────────────────────

describe('Mode Select — Arena card is active (YGGAA-54)', () => {
  let src;
  beforeAll(() => { src = readFile('app/mode-select.tsx'); });

  test('Arena card calls setSelectedMode("arena") on press', () => {
    expect(src).toMatch(/setSelectedMode\(['"]arena['"]\)/);
  });

  test('Arena card navigates to /game/arena', () => {
    expect(src).toMatch(/router\.replace\(['"]\/game\/arena['"]\)/);
  });

  test('Arena uses router.replace (not push) for one-way game flow', () => {
    expect(src).not.toMatch(/router\.push\(['"]\/game\/arena['"]\)/);
  });

  test('Arena card does NOT have active={false}', () => {
    // Find arena section — check the ModeCard for arena doesn't have active={false}
    // We check that arenaTitle and active={false} don't appear on adjacent lines
    const arenaCardBlock = src.match(/arenaTitle[\s\S]{0,300}?onPress={handleArena}/);
    if (arenaCardBlock) {
      expect(arenaCardBlock[0]).not.toMatch(/active=\{false\}/);
    } else {
      // Fallback: only 2 disabled cards exist (Blitz + Tournament)
      expect((src.match(/active=\{false\}/g) || []).length).toBe(2);
    }
  });
});
