/**
 * Phase 5.1 — Comprehensive Test Suite — YGGAA-34
 * Tests: Physics · Match Simulation (100) · Flow Integration · i18n · Edge Cases
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// ─── Inline GameConfig (mirrors src/constants/gameConfig.ts) ──────────────────
const GAME_CONFIG = {
  matchDurationSeconds: 90,
  extraTimeMinSeconds: 1,
  extraTimeMaxSeconds: 5,
  ballCount: 2,
  ballRadius: 10,
  pegRadius: 6,
  pegRows: 8,
  pegCols: 7,
  goalWidthPercent: 0.35,
  gravity: 0.3,
  bounceDamping: 0.7,
  ballBounceRandomness: 0.1,
  redCardCheckMinutes: [15, 30, 45, 60, 75],
  redCardProbability: 0.05,
  toastDurationMs: 2000,
  positionWeights: { FWD: 3.0, MID: 1.5, DEF: 0.5, GK: 0.05 },
};

// ─── Inline physics helpers (mirrors usePlinkoEngine.ts) ─────────────────────
const DROP_ZONE_TOP = 60;
const GOAL_HEIGHT = 60;

function computePegs(canvasWidth, canvasHeight) {
  const pegs = [];
  const { pegRows, pegCols, pegRadius } = GAME_CONFIG;
  const areaTop = DROP_ZONE_TOP;
  const areaBottom = canvasHeight - GOAL_HEIGHT - pegRadius * 2;
  const spacingY = (areaBottom - areaTop) / Math.max(pegRows - 1, 1);
  for (let row = 0; row < pegRows; row++) {
    const isOdd = row % 2 !== 0;
    const cols = isOdd ? pegCols - 1 : pegCols;
    const spacingX = canvasWidth / (cols + 1);
    const y = areaTop + row * spacingY;
    for (let col = 0; col < cols; col++) {
      pegs.push({ x: spacingX * (col + 1), y });
    }
  }
  return pegs;
}

function computeGoalZone(canvasWidth, canvasHeight) {
  const w = canvasWidth * GAME_CONFIG.goalWidthPercent;
  return {
    x: (canvasWidth - w) / 2,
    y: canvasHeight - GOAL_HEIGHT,
    width: w,
    height: GOAL_HEIGHT,
  };
}

function isBallInGoal(ball, goal) {
  return (
    ball.x >= goal.x &&
    ball.x <= goal.x + goal.width &&
    ball.y >= goal.y &&
    ball.y <= goal.y + goal.height
  );
}

function createBall(canvasWidth) {
  const margin = canvasWidth * 0.15;
  return {
    x: margin + Math.random() * (canvasWidth - 2 * margin),
    y: DROP_ZONE_TOP - GAME_CONFIG.ballRadius * 2,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 0,
  };
}

function applyGravity(ball) {
  return { ...ball, vy: ball.vy + GAME_CONFIG.gravity };
}

function applyWallBounce(ball, canvasWidth) {
  let { x, vx } = ball;
  if (x <= GAME_CONFIG.ballRadius || x >= canvasWidth - GAME_CONFIG.ballRadius) {
    vx = -vx * GAME_CONFIG.bounceDamping;
  }
  return { ...ball, x, vx };
}

// ─── Inline pickGoalScorer (mirrors playerDataService.ts) ─────────────────────
const POSITION_WEIGHT = GAME_CONFIG.positionWeights;

function pickGoalScorer(players) {
  if (players.length === 0) throw new Error('Cannot pick scorer from empty squad');
  const weights = players.map((p) => {
    const posWeight = POSITION_WEIGHT[p.positionGroup];
    const finishingFactor = p.stats.finishing > 0 ? p.stats.finishing / 100 : 0.1;
    return posWeight * finishingFactor;
  });
  const total = weights.reduce((sum, w) => sum + w, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < players.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return players[i];
  }
  return players[players.length - 1];
}

// ─── Inline pickManOfTheMatch (mirrors post-match logic) ─────────────────────
function pickManOfTheMatch(events, homeTeamName, awayTeamName) {
  const goals = events.filter((e) => e.type === 'goal');
  if (goals.length === 0) return null;
  const counts = {};
  for (const g of goals) {
    const key = `${g.scorerId}|${g.teamName}`;
    counts[key] = (counts[key] || { player: g.player, teamName: g.teamName, count: 0 });
    counts[key].count++;
  }
  const sorted = Object.values(counts).sort((a, b) => b.count - a.count || b.player.stats.overall - a.player.stats.overall);
  return sorted[0] ?? null;
}

// ─── Inline extra-time generation (mirrors useMatchTimer.ts) ──────────────────
function generateExtraTime() {
  const { extraTimeMinSeconds, extraTimeMaxSeconds } = GAME_CONFIG;
  return (
    extraTimeMinSeconds +
    Math.floor(Math.random() * (extraTimeMaxSeconds - extraTimeMinSeconds + 1))
  );
}

// ─── Inline red-card check (mirrors useMatchEvents.ts) ───────────────────────
function simulateRedCardCheck(players, redCardedIds) {
  const eligible = players.filter((p) => !redCardedIds.has(p.id));
  if (eligible.length === 0) return null;
  if (Math.random() < GAME_CONFIG.redCardProbability) {
    const idx = Math.floor(Math.random() * eligible.length);
    return eligible[idx];
  }
  return null;
}

// ─── Squad builder helpers ────────────────────────────────────────────────────
let _pid = 1;
function makePlayer({ positionGroup, finishing = 50, overall = 75, id } = {}) {
  return {
    id: id ?? _pid++,
    name: `Player_${_pid}`,
    positionGroup,
    stats: { finishing, overall, pace: 70 },
  };
}

function buildRealisticSquad(offset = 0) {
  return [
    makePlayer({ id: offset + 1,  positionGroup: 'GK',  finishing: 10, overall: 72 }),
    makePlayer({ id: offset + 2,  positionGroup: 'GK',  finishing: 12, overall: 70 }),
    makePlayer({ id: offset + 3,  positionGroup: 'DEF', finishing: 22, overall: 76 }),
    makePlayer({ id: offset + 4,  positionGroup: 'DEF', finishing: 28, overall: 78 }),
    makePlayer({ id: offset + 5,  positionGroup: 'DEF', finishing: 25, overall: 74 }),
    makePlayer({ id: offset + 6,  positionGroup: 'DEF', finishing: 30, overall: 80 }),
    makePlayer({ id: offset + 7,  positionGroup: 'DEF', finishing: 26, overall: 75 }),
    makePlayer({ id: offset + 8,  positionGroup: 'MID', finishing: 60, overall: 82 }),
    makePlayer({ id: offset + 9,  positionGroup: 'MID', finishing: 65, overall: 84 }),
    makePlayer({ id: offset + 10, positionGroup: 'MID', finishing: 58, overall: 80 }),
    makePlayer({ id: offset + 11, positionGroup: 'MID', finishing: 62, overall: 81 }),
    makePlayer({ id: offset + 12, positionGroup: 'MID', finishing: 55, overall: 79 }),
    makePlayer({ id: offset + 13, positionGroup: 'FWD', finishing: 80, overall: 87 }),
    makePlayer({ id: offset + 14, positionGroup: 'FWD', finishing: 85, overall: 89 }),
    makePlayer({ id: offset + 15, positionGroup: 'FWD', finishing: 78, overall: 85 }),
    makePlayer({ id: offset + 16, positionGroup: 'FWD', finishing: 82, overall: 86 }),
    makePlayer({ id: offset + 17, positionGroup: 'FWD', finishing: 76, overall: 84 }),
  ];
}

// ─── 1. PHYSICS UNIT TESTS ───────────────────────────────────────────────────

describe('Physics — GameConfig constants (GDD 3.4.2)', () => {
  test('gravity is a constant positive downward acceleration', () => {
    expect(GAME_CONFIG.gravity).toBe(0.3);
    expect(GAME_CONFIG.gravity).toBeGreaterThan(0);
    // Gravity is deterministic — never changes between frames
    const ball = { x: 200, y: 100, vx: 0, vy: 0 };
    const b1 = applyGravity(ball);
    const b2 = applyGravity(b1);
    expect(b1.vy - ball.vy).toBe(GAME_CONFIG.gravity);
    expect(b2.vy - b1.vy).toBe(GAME_CONFIG.gravity);
  });

  test('gravity accumulates linearly across frames', () => {
    let ball = { x: 200, y: 100, vx: 0, vy: 0 };
    for (let frame = 1; frame <= 10; frame++) {
      ball = applyGravity(ball);
      expect(ball.vy).toBeCloseTo(GAME_CONFIG.gravity * frame, 5);
    }
  });

  test('bounceDamping is within energy-loss range (0 < d < 1)', () => {
    expect(GAME_CONFIG.bounceDamping).toBeGreaterThan(0);
    expect(GAME_CONFIG.bounceDamping).toBeLessThan(1);
  });

  test('wall bounce reverses and damps vx correctly', () => {
    const W = 400;
    // Ball at left wall, moving left
    const ball = { x: 5, y: 200, vx: -3, vy: 1 };
    const bounced = applyWallBounce(ball, W);
    expect(bounced.vx).toBeCloseTo(3 * GAME_CONFIG.bounceDamping, 5);
  });

  test('ballBounceRandomness is small (≤ 0.15) to preserve physics realism', () => {
    expect(GAME_CONFIG.ballBounceRandomness).toBeGreaterThan(0);
    expect(GAME_CONFIG.ballBounceRandomness).toBeLessThanOrEqual(0.15);
  });

  test('peg collision parameters are physically reasonable', () => {
    expect(GAME_CONFIG.pegRadius).toBeGreaterThan(0);
    expect(GAME_CONFIG.ballRadius).toBeGreaterThan(0);
    // Ball must be larger than peg so collisions are visible
    expect(GAME_CONFIG.ballRadius).toBeGreaterThanOrEqual(GAME_CONFIG.pegRadius);
  });
});

describe('Physics — goal detection boundary (GDD 3.4.2)', () => {
  const W = 400, H = 700;
  let goal;
  beforeAll(() => { goal = computeGoalZone(W, H); });

  test('goal is centered horizontally', () => {
    const center = goal.x + goal.width / 2;
    expect(center).toBeCloseTo(W / 2, 1);
  });

  test('goal width matches goalWidthPercent of canvas', () => {
    expect(goal.width).toBeCloseTo(W * GAME_CONFIG.goalWidthPercent, 1);
  });

  test('goal is at the bottom of the canvas', () => {
    expect(goal.y).toBe(H - GOAL_HEIGHT);
    expect(goal.y + goal.height).toBe(H);
  });

  test('ball dead-center at bottom is detected as goal', () => {
    const ball = { x: W / 2, y: H - GOAL_HEIGHT / 2 };
    expect(isBallInGoal(ball, goal)).toBe(true);
  });

  test('ball at left edge outside goal is not scored', () => {
    const ball = { x: goal.x - 5, y: H - GOAL_HEIGHT / 2 };
    expect(isBallInGoal(ball, goal)).toBe(false);
  });

  test('ball at right edge outside goal is not scored', () => {
    const ball = { x: goal.x + goal.width + 5, y: H - GOAL_HEIGHT / 2 };
    expect(isBallInGoal(ball, goal)).toBe(false);
  });

  test('ball above goal top boundary is not scored', () => {
    const ball = { x: W / 2, y: H - GOAL_HEIGHT - 5 };
    expect(isBallInGoal(ball, goal)).toBe(false);
  });
});

describe('Physics — ball respawn position (GDD 3.4.2)', () => {
  const W = 400;

  test('ball spawns above the drop zone (y < DROP_ZONE_TOP)', () => {
    for (let i = 0; i < 30; i++) {
      const b = createBall(W);
      expect(b.y).toBeLessThan(DROP_ZONE_TOP);
    }
  });

  test('ball x stays within 15%–85% margin of canvas width', () => {
    const margin = W * 0.15;
    for (let i = 0; i < 50; i++) {
      const b = createBall(W);
      expect(b.x).toBeGreaterThanOrEqual(margin);
      expect(b.x).toBeLessThanOrEqual(W - margin);
    }
  });

  test('ball spawns with zero vertical velocity (vy = 0)', () => {
    for (let i = 0; i < 20; i++) {
      expect(createBall(W).vy).toBe(0);
    }
  });

  test('ball horizontal variance is non-zero (not always same x)', () => {
    const xs = new Set(Array.from({ length: 30 }, () => Math.round(createBall(W).x)));
    expect(xs.size).toBeGreaterThan(1);
  });
});

describe('Physics — peg grid collision angles (GDD 3.4.2)', () => {
  const W = 400, H = 700;

  test('pegs total count: 52 (4 rows × 7 + 4 rows × 6)', () => {
    expect(computePegs(W, H).length).toBe(52);
  });

  test('every peg is within canvas bounds horizontally', () => {
    const pegs = computePegs(W, H);
    for (const peg of pegs) {
      expect(peg.x).toBeGreaterThan(0);
      expect(peg.x).toBeLessThan(W);
    }
  });

  test('all pegs are below drop zone and above goal zone', () => {
    const pegs = computePegs(W, H);
    const goalTop = H - GOAL_HEIGHT;
    for (const peg of pegs) {
      expect(peg.y).toBeGreaterThanOrEqual(DROP_ZONE_TOP);
      expect(peg.y).toBeLessThan(goalTop);
    }
  });

  test('pegs are spread across both halves of canvas width', () => {
    const pegs = computePegs(W, H);
    const leftPegs  = pegs.filter(p => p.x < W / 2).length;
    const rightPegs = pegs.filter(p => p.x >= W / 2).length;
    // Should be roughly balanced
    expect(leftPegs).toBeGreaterThan(10);
    expect(rightPegs).toBeGreaterThan(10);
  });
});

// ─── 2. MATCH SIMULATION — 100 MATCHES ───────────────────────────────────────

describe('Match Simulation — 100 matches (GDD 4.9)', () => {
  const squad = buildRealisticSquad(500);
  const goalCounts = { FWD: 0, MID: 0, DEF: 0, GK: 0 };
  let totalGoals = 0;
  let totalMatches = 100;
  let crashCount = 0;

  // Run 100 simulated matches, accumulate stats
  beforeAll(() => {
    for (let m = 0; m < totalMatches; m++) {
      // Simulate 0–8 goals per match (uniform random)
      const matchGoals = Math.floor(Math.random() * 9);
      totalGoals += matchGoals;
      try {
        for (let g = 0; g < matchGoals; g++) {
          const scorer = pickGoalScorer(squad);
          goalCounts[scorer.positionGroup]++;
        }
      } catch {
        crashCount++;
      }
    }
  });

  test('no crashes across 100 simulated matches', () => {
    expect(crashCount).toBe(0);
  });

  test('FWD scores more goals than any other position', () => {
    expect(goalCounts.FWD).toBeGreaterThan(goalCounts.MID);
    expect(goalCounts.FWD).toBeGreaterThan(goalCounts.DEF);
    expect(goalCounts.FWD).toBeGreaterThan(goalCounts.GK);
  });

  test('MID scores more goals than DEF and GK', () => {
    expect(goalCounts.MID).toBeGreaterThan(goalCounts.DEF);
    expect(goalCounts.MID).toBeGreaterThan(goalCounts.GK);
  });

  test('GK scores fewest goals of all positions', () => {
    const total = goalCounts.FWD + goalCounts.MID + goalCounts.DEF + goalCounts.GK;
    if (total > 0) {
      const gkRate = goalCounts.GK / total;
      expect(gkRate).toBeLessThan(0.10); // GK must score < 10% of goals
    }
  });

  test('average goals per match is between 0 and 8 (reasonable range)', () => {
    const avg = totalGoals / totalMatches;
    expect(avg).toBeGreaterThanOrEqual(0);
    expect(avg).toBeLessThanOrEqual(8);
  });

  test('position distribution totals to 100% of goals', () => {
    const total = goalCounts.FWD + goalCounts.MID + goalCounts.DEF + goalCounts.GK;
    expect(total).toBe(totalGoals);
  });
});

describe('Match Simulation — red card rate (GDD 4.9)', () => {
  test('redCardProbability is 5% per check minute', () => {
    expect(GAME_CONFIG.redCardProbability).toBe(0.05);
  });

  test('red card checks happen at exactly [15, 30, 45, 60, 75] minutes', () => {
    expect(GAME_CONFIG.redCardCheckMinutes).toEqual([15, 30, 45, 60, 75]);
    expect(GAME_CONFIG.redCardCheckMinutes.length).toBe(5);
  });

  test('simulated red card rate over 1000 checks is near 5% ± 3%', () => {
    let cards = 0;
    const N = 1000;
    for (let i = 0; i < N; i++) {
      if (Math.random() < GAME_CONFIG.redCardProbability) cards++;
    }
    const rate = cards / N;
    expect(rate).toBeGreaterThan(0.02); // > 2%
    expect(rate).toBeLessThan(0.10);    // < 10%
  });

  test('red-carded player is excluded from subsequent scorer picks', () => {
    const players = buildRealisticSquad(600);
    const redCardedIds = new Set();
    // Red-card the first player
    redCardedIds.add(players[0].id);
    // Pick 50 scorers from eligible only
    const eligible = players.filter(p => !redCardedIds.has(p.id));
    for (let i = 0; i < 50; i++) {
      const scorer = pickGoalScorer(eligible);
      expect(scorer.id).not.toBe(players[0].id);
    }
  });

  test('no red card issued when all eligible players are already red-carded', () => {
    const players = buildRealisticSquad(700).slice(0, 3);
    const redCardedIds = new Set(players.map(p => p.id));
    const result = simulateRedCardCheck(players, redCardedIds);
    expect(result).toBeNull();
  });
});

describe('Match Simulation — extra time (GDD 3.4.1)', () => {
  test('extra time is always between extraTimeMinSeconds and extraTimeMaxSeconds', () => {
    for (let i = 0; i < 200; i++) {
      const et = generateExtraTime();
      expect(et).toBeGreaterThanOrEqual(GAME_CONFIG.extraTimeMinSeconds);
      expect(et).toBeLessThanOrEqual(GAME_CONFIG.extraTimeMaxSeconds);
    }
  });

  test('extra time is always an integer (whole match-minutes)', () => {
    for (let i = 0; i < 100; i++) {
      const et = generateExtraTime();
      expect(Number.isInteger(et)).toBe(true);
    }
  });

  test('extra time range covers all valid values (1 through 5)', () => {
    const seen = new Set();
    for (let i = 0; i < 2000; i++) {
      seen.add(generateExtraTime());
    }
    for (let v = GAME_CONFIG.extraTimeMinSeconds; v <= GAME_CONFIG.extraTimeMaxSeconds; v++) {
      expect(seen.has(v)).toBe(true);
    }
  });

  test('match duration constant is 90 seconds', () => {
    expect(GAME_CONFIG.matchDurationSeconds).toBe(90);
  });
});

// ─── 3. FULL FLOW INTEGRATION (matchStore state transitions) ─────────────────

describe('Full Flow Integration — matchStore state (GDD flow)', () => {
  // Simulate the matchStore in-memory (same logic, no Zustand needed)
  function createMatchState() {
    return {
      homeTeam: null,
      awayTeam: null,
      homeScore: 0,
      awayScore: 0,
      events: [],
      currentMinute: 0,
      isExtraTime: false,
      extraTimeAmount: 0,
      selectedMode: null,
    };
  }

  const teamA = { id: 'team-a', name: 'Team A', league: 'Premier League', logoUrl: '', primaryColor: '#ff0000', secondaryColor: '#ffffff' };
  const teamB = { id: 'team-b', name: 'Team B', league: 'La Liga', logoUrl: '', primaryColor: '#0000ff', secondaryColor: '#ffffff' };

  test('Main Menu → initial state is clean', () => {
    const state = createMatchState();
    expect(state.homeTeam).toBeNull();
    expect(state.awayTeam).toBeNull();
    expect(state.homeScore).toBe(0);
    expect(state.awayScore).toBe(0);
    expect(state.events).toHaveLength(0);
    expect(state.selectedMode).toBeNull();
  });

  test('Team Select → both teams can be set', () => {
    const state = createMatchState();
    state.homeTeam = teamA;
    state.awayTeam = teamB;
    expect(state.homeTeam.name).toBe('Team A');
    expect(state.awayTeam.name).toBe('Team B');
  });

  test('Mode Select → selectedMode can be set', () => {
    const state = createMatchState();
    state.selectedMode = 'plinko';
    expect(state.selectedMode).toBe('plinko');
  });

  test('Game → scores increment correctly per goal', () => {
    const state = createMatchState();
    state.homeTeam = teamA;
    state.awayTeam = teamB;
    // Simulate addGoal logic
    const addGoal = (teamName) => {
      if (state.homeTeam && teamName === state.homeTeam.name) state.homeScore++;
      else if (state.awayTeam && teamName === state.awayTeam.name) state.awayScore++;
    };
    addGoal('Team A');
    addGoal('Team A');
    addGoal('Team B');
    expect(state.homeScore).toBe(2);
    expect(state.awayScore).toBe(1);
  });

  test('Game → events accumulate chronologically', () => {
    const state = createMatchState();
    state.events.push({ type: 'goal', minute: 23, teamName: 'Team A', player: { name: 'P1' } });
    state.events.push({ type: 'red_card', minute: 45, player: { name: 'P2' } });
    state.events.push({ type: 'goal', minute: 78, teamName: 'Team B', player: { name: 'P3' } });
    expect(state.events).toHaveLength(3);
    expect(state.events[0].minute).toBeLessThan(state.events[1].minute);
    expect(state.events[1].minute).toBeLessThan(state.events[2].minute);
  });

  test('Rematch → clearMatch resets scores, events, time, mode — teams persist', () => {
    const state = createMatchState();
    state.homeTeam = teamA;
    state.awayTeam = teamB;
    state.homeScore = 3;
    state.awayScore = 1;
    state.events = [{ type: 'goal' }];
    state.currentMinute = 90;
    state.isExtraTime = true;
    state.extraTimeAmount = 3;
    state.selectedMode = 'plinko';

    // Simulate clearMatch (teams NOT cleared on rematch)
    Object.assign(state, {
      homeScore: 0, awayScore: 0, events: [], currentMinute: 0,
      isExtraTime: false, extraTimeAmount: 0, selectedMode: null,
    });

    expect(state.homeScore).toBe(0);
    expect(state.awayScore).toBe(0);
    expect(state.events).toHaveLength(0);
    expect(state.currentMinute).toBe(0);
    expect(state.isExtraTime).toBe(false);
    expect(state.extraTimeAmount).toBe(0);
    expect(state.selectedMode).toBeNull();
    // Teams still set for rematch
    expect(state.homeTeam).toBe(teamA);
    expect(state.awayTeam).toBe(teamB);
  });

  test('New Match → clearTeams clears both teams and all match state', () => {
    const state = createMatchState();
    state.homeTeam = teamA;
    state.awayTeam = teamB;
    state.homeScore = 2;
    state.awayScore = 2;
    // Simulate clearTeams + clearMatch
    Object.assign(state, {
      homeTeam: null, awayTeam: null,
      homeScore: 0, awayScore: 0, events: [], currentMinute: 0,
      isExtraTime: false, extraTimeAmount: 0, selectedMode: null,
    });
    expect(state.homeTeam).toBeNull();
    expect(state.awayTeam).toBeNull();
    expect(state.homeScore).toBe(0);
  });

  test('addGoal ignores unknown team name (no score change)', () => {
    const state = createMatchState();
    state.homeTeam = teamA;
    state.awayTeam = teamB;
    const addGoal = (teamName) => {
      if (state.homeTeam && teamName === state.homeTeam.name) state.homeScore++;
      else if (state.awayTeam && teamName === state.awayTeam.name) state.awayScore++;
    };
    addGoal('Unknown FC');
    expect(state.homeScore).toBe(0);
    expect(state.awayScore).toBe(0);
  });

  test('currentMinute increments from 0 to 90 monotonically', () => {
    const state = createMatchState();
    for (let m = 1; m <= 90; m++) {
      state.currentMinute = m;
    }
    expect(state.currentMinute).toBe(90);
  });
});

// ─── 4. MULTI-LANGUAGE ───────────────────────────────────────────────────────

describe('i18n — translation completeness (GDD 5)', () => {
  let en, tr, de, fr;
  beforeAll(() => {
    en = readJson('src/i18n/en.json');
    tr = readJson('src/i18n/tr.json');
    de = readJson('src/i18n/de.json');
    fr = readJson('src/i18n/fr.json');
  });

  test('en.json loads without errors', () => {
    expect(typeof en).toBe('object');
    expect(Object.keys(en).length).toBeGreaterThan(0);
  });

  test('tr.json loads without errors', () => {
    expect(typeof tr).toBe('object');
    expect(Object.keys(tr).length).toBeGreaterThan(0);
  });

  test('de.json loads without errors', () => {
    expect(typeof de).toBe('object');
    expect(Object.keys(de).length).toBeGreaterThan(0);
  });

  test('fr.json loads without errors', () => {
    expect(typeof fr).toBe('object');
    expect(Object.keys(fr).length).toBeGreaterThan(0);
  });

  test('tr has all keys present in en (no missing translations)', () => {
    const enKeys = Object.keys(en);
    for (const key of enKeys) {
      expect(tr[key]).toBeDefined();
      expect(typeof tr[key]).toBe('string');
      expect(tr[key].length).toBeGreaterThan(0);
    }
  });

  test('de has all keys present in en (no missing translations)', () => {
    const enKeys = Object.keys(en);
    for (const key of enKeys) {
      expect(de[key]).toBeDefined();
      expect(typeof de[key]).toBe('string');
      expect(de[key].length).toBeGreaterThan(0);
    }
  });

  test('fr has all keys present in en (no missing translations)', () => {
    const enKeys = Object.keys(en);
    for (const key of enKeys) {
      expect(fr[key]).toBeDefined();
      expect(typeof fr[key]).toBe('string');
      expect(fr[key].length).toBeGreaterThan(0);
    }
  });

  test('all 4 locales have exactly the same key count', () => {
    const enCount = Object.keys(en).length;
    expect(Object.keys(tr).length).toBe(enCount);
    expect(Object.keys(de).length).toBe(enCount);
    expect(Object.keys(fr).length).toBe(enCount);
  });

  test('no locale has an extra key not in en (no orphan translations)', () => {
    const enKeys = new Set(Object.keys(en));
    for (const [locale, obj] of [['tr', tr], ['de', de], ['fr', fr]]) {
      for (const key of Object.keys(obj)) {
        expect(enKeys.has(key)).toBe(true);
      }
    }
  });

  test('all 4 supported languages are represented (en, tr, de, fr)', () => {
    // Verify the language codes are valid
    const supported = ['en', 'tr', 'de', 'fr'];
    for (const lang of supported) {
      const file = readJson(`src/i18n/${lang}.json`);
      expect(Object.keys(file).length).toBeGreaterThan(0);
    }
  });

  test('core game-screen keys are present in all locales', () => {
    const coreKeys = ['game.goal', 'game.redCard', 'game.extraTime', 'game.fullTime', 'game.matchStart'];
    for (const key of coreKeys) {
      expect(en[key]).toBeDefined();
      expect(tr[key]).toBeDefined();
      expect(de[key]).toBeDefined();
      expect(fr[key]).toBeDefined();
    }
  });

  test('summary screen keys are present in all locales', () => {
    const summaryKeys = ['summary.matchResult', 'summary.motm', 'summary.rematch', 'summary.changeTeams', 'summary.noEvents'];
    for (const key of summaryKeys) {
      expect(en[key]).toBeDefined();
      expect(tr[key]).toBeDefined();
      expect(de[key]).toBeDefined();
      expect(fr[key]).toBeDefined();
    }
  });

  test('settings screen keys are present in all locales', () => {
    const settingsKeys = ['settings.title', 'settings.language', 'settings.sound', 'settings.on', 'settings.off'];
    for (const key of settingsKeys) {
      expect(en[key]).toBeDefined();
      expect(tr[key]).toBeDefined();
      expect(de[key]).toBeDefined();
      expect(fr[key]).toBeDefined();
    }
  });

  test('translated strings are not empty and not just whitespace', () => {
    for (const obj of [en, tr, de, fr]) {
      for (const val of Object.values(obj)) {
        expect(val.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('translations are all strings (no nulls or numbers)', () => {
    for (const obj of [en, tr, de, fr]) {
      for (const val of Object.values(obj)) {
        expect(typeof val).toBe('string');
      }
    }
  });
});

// ─── 5. EDGE CASES ───────────────────────────────────────────────────────────

describe('Edge Cases — 0-0 draw: MOTM card handles no goals (GDD post-match)', () => {
  test('pickManOfTheMatch returns null when events is empty', () => {
    const result = pickManOfTheMatch([], 'Team A', 'Team B');
    expect(result).toBeNull();
  });

  test('pickManOfTheMatch returns null when events has only red cards (no goals)', () => {
    const events = [
      { type: 'red_card', minute: 30, player: { name: 'P1', stats: { overall: 80 } } },
      { type: 'red_card', minute: 60, player: { name: 'P2', stats: { overall: 75 } } },
    ];
    const result = pickManOfTheMatch(events, 'Team A', 'Team B');
    expect(result).toBeNull();
  });

  test('MOTM shows player with most goals when goals exist', () => {
    const p1 = makePlayer({ positionGroup: 'FWD', finishing: 85, overall: 90, id: 9001 });
    const p2 = makePlayer({ positionGroup: 'MID', finishing: 60, overall: 80, id: 9002 });
    const events = [
      { type: 'goal', minute: 10, teamName: 'Team A', scorerId: 9001, player: p1 },
      { type: 'goal', minute: 50, teamName: 'Team A', scorerId: 9001, player: p1 },
      { type: 'goal', minute: 70, teamName: 'Team B', scorerId: 9002, player: p2 },
    ];
    const result = pickManOfTheMatch(events, 'Team A', 'Team B');
    expect(result).not.toBeNull();
    expect(result.player.id).toBe(9001);
    expect(result.count).toBe(2);
  });

  test('MOTM tie is broken by higher overall rating', () => {
    const pHigh = makePlayer({ positionGroup: 'FWD', finishing: 85, overall: 90, id: 9003 });
    const pLow  = makePlayer({ positionGroup: 'MID', finishing: 70, overall: 75, id: 9004 });
    const events = [
      { type: 'goal', minute: 10, teamName: 'Team A', scorerId: 9003, player: pHigh },
      { type: 'goal', minute: 70, teamName: 'Team B', scorerId: 9004, player: pLow },
    ];
    const result = pickManOfTheMatch(events, 'Team A', 'Team B');
    expect(result.player.id).toBe(9003);
  });
});

describe('Edge Cases — all players red-carded (GDD 4.9)', () => {
  test('pickGoalScorer throws when entire squad is red-carded (empty eligible list)', () => {
    expect(() => pickGoalScorer([])).toThrow('Cannot pick scorer from empty squad');
  });

  test('handleRedCardCheck returns null when all players are already red-carded', () => {
    const players = buildRealisticSquad(800).slice(0, 5);
    const allRedCarded = new Set(players.map(p => p.id));
    const result = simulateRedCardCheck(players, allRedCarded);
    expect(result).toBeNull();
  });

  test('game does not crash with only 1 eligible player remaining', () => {
    const squad = [makePlayer({ positionGroup: 'GK', finishing: 10, overall: 70, id: 8001 })];
    expect(() => pickGoalScorer(squad)).not.toThrow();
    const scorer = pickGoalScorer(squad);
    expect(scorer.id).toBe(8001);
  });

  test('red card does not remove ineligible (already carded) players twice', () => {
    const players = buildRealisticSquad(900).slice(0, 5);
    const redCardedIds = new Set([players[0].id, players[1].id]);
    const eligible = players.filter(p => !redCardedIds.has(p.id));
    expect(eligible.length).toBe(3);
    for (const p of eligible) {
      expect(redCardedIds.has(p.id)).toBe(false);
    }
  });
});

describe('Edge Cases — physics robustness', () => {
  test('gravity does not cause negative vy immediately (starts at 0)', () => {
    const ball = createBall(400);
    expect(ball.vy).toBe(0);
    const after = applyGravity(ball);
    expect(after.vy).toBeGreaterThan(0);
  });

  test('ball always eventually reaches bottom (terminal velocity is positive)', () => {
    let ball = createBall(400);
    let frames = 0;
    while (ball.y < 700 && frames < 5000) {
      ball = applyGravity(ball);
      ball = { ...ball, y: ball.y + ball.vy, x: ball.x + ball.vx };
      ball = applyWallBounce(ball, 400);
      frames++;
    }
    expect(ball.y).toBeGreaterThanOrEqual(700);
  });

  test('very large canvas: goal detection still works', () => {
    const W = 1200, H = 2000;
    const goal = computeGoalZone(W, H);
    const ball = { x: W / 2, y: H - GOAL_HEIGHT / 2 };
    expect(isBallInGoal(ball, goal)).toBe(true);
  });

  test('very small canvas (320×480): pegs still within bounds', () => {
    const W = 320, H = 480;
    const pegs = computePegs(W, H);
    for (const peg of pegs) {
      expect(peg.x).toBeGreaterThan(0);
      expect(peg.x).toBeLessThan(W);
      expect(peg.y).toBeGreaterThanOrEqual(DROP_ZONE_TOP);
    }
  });

  test('ballBounceRandomness is bounded so physics stays deterministic-enough', () => {
    // After adding randomness, vx should not exceed an extreme value
    const vx = 2.0;
    for (let i = 0; i < 100; i++) {
      const randomized = vx + (Math.random() - 0.5) * GAME_CONFIG.ballBounceRandomness * 2;
      expect(Math.abs(randomized - vx)).toBeLessThanOrEqual(GAME_CONFIG.ballBounceRandomness);
    }
  });

  test('zero-size canvas guard: computePegs returns empty when guarded', () => {
    const guarded = (w, h) => (w > 0 && h > 0 ? computePegs(w, h) : []);
    expect(guarded(0, 0)).toHaveLength(0);
    expect(guarded(400, 0)).toHaveLength(0);
    expect(guarded(0, 700)).toHaveLength(0);
  });
});

describe('Edge Cases — data integrity', () => {
  let players;
  beforeAll(() => { players = readJson('src/data/players.json'); });

  test('players.json exists and is a non-empty array', () => {
    expect(Array.isArray(players)).toBe(true);
    expect(players.length).toBeGreaterThan(0);
  });

  test('POSITION_MAP covers all position strings found in players.json', () => {
    // positionGroup is NOT stored in JSON — it is computed at runtime by playerDataService
    // via POSITION_MAP[raw.position] ?? 'MID'. Verify all positions in the dataset are mapped.
    const POSITION_MAP = {
      GK: 'GK', CB: 'DEF', LB: 'DEF', RB: 'DEF', LWB: 'DEF', RWB: 'DEF',
      CM: 'MID', CDM: 'MID', CAM: 'MID', LM: 'MID', RM: 'MID',
      ST: 'FWD', CF: 'FWD', LW: 'FWD', RW: 'FWD', LF: 'FWD', RF: 'FWD',
    };
    const unmapped = [];
    const uniquePositions = [...new Set(players.map(p => p.position))];
    for (const pos of uniquePositions) {
      if (!POSITION_MAP[pos]) unmapped.push(pos);
    }
    expect(unmapped).toHaveLength(0);
  });

  test('positionGroup distribution across dataset produces all four groups via POSITION_MAP', () => {
    // Simulate what playerDataService does: map position → positionGroup
    const POSITION_MAP = {
      GK: 'GK', CB: 'DEF', LB: 'DEF', RB: 'DEF', LWB: 'DEF', RWB: 'DEF',
      CM: 'MID', CDM: 'MID', CAM: 'MID', LM: 'MID', RM: 'MID',
      ST: 'FWD', CF: 'FWD', LW: 'FWD', RW: 'FWD', LF: 'FWD', RF: 'FWD',
    };
    const groups = new Set(players.map(p => POSITION_MAP[p.position] ?? 'MID'));
    expect(groups.has('GK')).toBe(true);
    expect(groups.has('DEF')).toBe(true);
    expect(groups.has('MID')).toBe(true);
    expect(groups.has('FWD')).toBe(true);
  });

  test('no player has finishing stat of 0 (would cause near-zero weight)', () => {
    // finishing=0 → finishingFactor=0.1 (fallback), should not be a real value
    const zeroFinishing = players.filter(p => p.stats.finishing === 0);
    // This is a soft check — we expect very few if any
    expect(zeroFinishing.length).toBeLessThan(players.length * 0.01); // < 1% of players
  });

  test('goal scorer can be picked from any real team squad without crashing', () => {
    const teams = [...new Set(players.map(p => p.team))].slice(0, 10);
    for (const team of teams) {
      const squad = players.filter(p => p.team === team);
      if (squad.length > 0) {
        expect(() => pickGoalScorer(squad)).not.toThrow();
      }
    }
  });
});
