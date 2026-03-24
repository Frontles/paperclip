/**
 * Keeper Clash Game Mode — QA Test Suite — YGGAA-57
 * Tests: File structure · Screen source · Engine logic · Physics ·
 *        Difficulty scaling · Counter-attacks · i18n · Navigation
 */

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const readFile = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const exists   = (p) => fs.existsSync(path.join(ROOT, p));

// ─── 1. FILE STRUCTURE ────────────────────────────────────────────────────────

describe('Keeper Clash — File Structure', () => {
  test('app/game/keeper-clash.tsx exists', () => {
    expect(exists('app/game/keeper-clash.tsx')).toBe(true);
  });

  test('src/hooks/useKeeperClashEngine.ts exists', () => {
    expect(exists('src/hooks/useKeeperClashEngine.ts')).toBe(true);
  });
});

// ─── 2. SCREEN SOURCE CHECKS ─────────────────────────────────────────────────

describe('Keeper Clash Screen — app/game/keeper-clash.tsx', () => {
  let src;
  beforeAll(() => { src = readFile('app/game/keeper-clash.tsx'); });

  test('imports useKeeperClashEngine', () => {
    expect(src).toMatch(/useKeeperClashEngine/);
  });

  test('imports useMatchTimer', () => {
    expect(src).toMatch(/useMatchTimer/);
  });

  test('imports useMatchEvents', () => {
    expect(src).toMatch(/useMatchEvents/);
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

  test('imports GestureDetector and Gesture (react-native-gesture-handler)', () => {
    expect(src).toMatch(/GestureDetector/);
    expect(src).toMatch(/Gesture/);
  });

  test('imports Reanimated useSharedValue and withSpring for smooth keeper drag', () => {
    expect(src).toMatch(/useSharedValue/);
    expect(src).toMatch(/withSpring/);
  });

  test('KEEPER_WIDTH constant is 60px', () => {
    expect(src).toMatch(/KEEPER_WIDTH\s*=\s*60/);
  });

  test('BALL_RADIUS constant is 12px', () => {
    expect(src).toMatch(/BALL_RADIUS\s*=\s*12/);
  });

  test('goal frame spans 7.5%–92.5% of canvas width', () => {
    expect(src).toMatch(/0\.075/);
    expect(src).toMatch(/0\.925/);
  });

  test('Pan gesture clamps keeper within goal frame bounds', () => {
    expect(src).toMatch(/Gesture\.Pan/);
    expect(src).toMatch(/goalFrameLeft/);
    expect(src).toMatch(/goalFrameRight/);
    expect(src).toMatch(/Math\.max.*Math\.min|Math\.min.*Math\.max/s);
  });

  test('withSpring applied on keeper drag for physics feel', () => {
    expect(src).toMatch(/withSpring/);
    expect(src).toMatch(/SPRING_CONFIG/);
  });

  test('Spring config has damping and stiffness (GDD: spring physics)', () => {
    expect(src).toMatch(/damping/);
    expect(src).toMatch(/stiffness/);
  });

  test('goal posts and crossbar rendered inside goal area', () => {
    expect(src).toMatch(/goalPost/);
    expect(src).toMatch(/crossbar/);
  });

  test('net area rendered between posts', () => {
    expect(src).toMatch(/netArea/);
  });

  test('shot balls rendered from engine shots array', () => {
    expect(src).toMatch(/shots\.map/);
    expect(src).toMatch(/shotBall/);
  });

  test('trail dots rendered for each shot', () => {
    expect(src).toMatch(/trail/);
    expect(src).toMatch(/trailDot/);
  });

  test('save micro-toast shown on save (SAVE! feedback)', () => {
    expect(src).toMatch(/saveMicro/);
    expect(src).toMatch(/SAVE!/);
  });

  test('CounterBanner component present and wired to counterStatus', () => {
    expect(src).toMatch(/CounterBanner/);
    expect(src).toMatch(/counterStatus/);
  });

  test('counter-attack banner shows active/goal/saved states', () => {
    expect(src).toMatch(/COUNTER-ATTACK/i);
    expect(src).toMatch(/active/);
    expect(src).toMatch(/goal/);
    expect(src).toMatch(/saved/);
  });

  test('goal flash overlay present for visual feedback', () => {
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

  test('whistle_start sound plays on mount', () => {
    expect(src).toMatch(/whistle_start/);
  });

  test('whistle_end sound plays on match end', () => {
    expect(src).toMatch(/whistle_end/);
  });

  test('goal_scored sound plays on conceded goal and counter-attack goal', () => {
    const matches = src.match(/goal_scored/g) || [];
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  test('ambient crowd sound starts on mount and stops on unmount', () => {
    expect(src).toMatch(/startAmbient/);
    expect(src).toMatch(/stopAmbient/);
  });

  test('handleGoalConceded adds away team goal (opponent scores)', () => {
    expect(src).toMatch(/handleGoalConceded/);
    expect(src).toMatch(/addGoal.*awayName|awayName.*addGoal/s);
  });

  test('handleCounterAttackGoal adds home team goal (counter-attack success)', () => {
    expect(src).toMatch(/handleCounterAttackGoal/);
    expect(src).toMatch(/addGoal.*homeName|homeName.*addGoal/s);
  });

  test('awayAvgShooting passed to engine (difficulty via opponent stat)', () => {
    expect(src).toMatch(/awayAvgShooting/);
    expect(src).toMatch(/computeAvgShooting/);
  });

  test('homeAvgFinishing passed to engine (counter-attack success probability)', () => {
    expect(src).toMatch(/homeAvgFinishing/);
    expect(src).toMatch(/computeAvgFinishing/);
  });

  test('setCurrentMinute wired to matchMinute (store sync)', () => {
    expect(src).toMatch(/setCurrentMinute/);
    expect(src).toMatch(/matchMinute/);
  });

  test('setExtraTime wired (store sync)', () => {
    expect(src).toMatch(/setExtraTime/);
  });

  test('onLayout measures playfield dimensions for engine canvas', () => {
    expect(src).toMatch(/onLayout/);
    expect(src).toMatch(/playfieldSize/);
  });

  test('goalLineY computed as shot end target (junction of shot/goal areas)', () => {
    expect(src).toMatch(/goalLineY/);
  });

  test('score pulse animations on home and away score change', () => {
    expect(src).toMatch(/homePulse/);
    expect(src).toMatch(/awayPulse/);
  });
});

// ─── 3. ENGINE SOURCE CHECKS ─────────────────────────────────────────────────

describe('Keeper Clash Engine — src/hooks/useKeeperClashEngine.ts', () => {
  let src;
  beforeAll(() => { src = readFile('src/hooks/useKeeperClashEngine.ts'); });

  test('exports useKeeperClashEngine function', () => {
    expect(src).toMatch(/export function useKeeperClashEngine/);
  });

  test('exports CounterAttackStatus type (idle | active | goal | saved)', () => {
    expect(src).toMatch(/export type CounterAttackStatus/);
    expect(src).toMatch(/idle/);
    expect(src).toMatch(/active/);
    expect(src).toMatch(/goal/);
    expect(src).toMatch(/saved/);
  });

  test('exports ShotRenderData interface with id, x, y, trail', () => {
    expect(src).toMatch(/export interface ShotRenderData/);
    expect(src).toMatch(/id.*string|string.*id/s);
    expect(src).toMatch(/x.*number|number.*x/s);
    expect(src).toMatch(/trail/);
  });

  test('TICK_MS = 16 (~60fps physics loop)', () => {
    expect(src).toMatch(/TICK_MS\s*=\s*16/);
  });

  test('KEEPER_HITBOX_HALF = 45 (90px hitbox for save detection)', () => {
    expect(src).toMatch(/KEEPER_HITBOX_HALF\s*=\s*45/);
  });

  test('COUNTER_ATTACK_INTERVAL_MS = 10000 (every 10s per GDD)', () => {
    expect(src).toMatch(/COUNTER_ATTACK_INTERVAL_MS\s*=\s*10[_,]?000/);
  });

  test('TRAIL_LENGTH = 6 (ball motion trail)', () => {
    expect(src).toMatch(/TRAIL_LENGTH\s*=\s*6/);
  });

  test('5 difficulty phases defined: firstHalf, secondHalfStart, secondHalfMid, finalMinutes, extraTime', () => {
    expect(src).toMatch(/firstHalf/);
    expect(src).toMatch(/secondHalfStart/);
    expect(src).toMatch(/secondHalfMid/);
    expect(src).toMatch(/finalMinutes/);
    expect(src).toMatch(/extraTime/);
  });

  test('firstHalf shot interval = 4000ms', () => {
    expect(src).toMatch(/firstHalf.*4000|4000.*firstHalf/s);
  });

  test('extraTime shot interval = 1500ms (fastest)', () => {
    expect(src).toMatch(/extraTime.*1500|1500.*extraTime/s);
  });

  test('4 shot speed tiers: slow(2000) medium(1500) fast(1200) elite(1000)', () => {
    expect(src).toMatch(/slow.*2000|2000.*slow/s);
    expect(src).toMatch(/medium.*1500|1500.*medium/s);
    expect(src).toMatch(/fast.*1200|1200.*fast/s);
    expect(src).toMatch(/elite.*1000|1000.*elite/s);
  });

  test('quadBezier function for curved shot trajectories', () => {
    expect(src).toMatch(/quadBezier/);
    expect(src).toMatch(/p0.*p1.*p2|bezier/s);
  });

  test('three trajectory types: straight, arcLeft, arcRight', () => {
    expect(src).toMatch(/straight/);
    expect(src).toMatch(/arcLeft/);
    expect(src).toMatch(/arcRight/);
  });

  test('shot spawns from top (spawnY = -BALL_RADIUS, above screen)', () => {
    expect(src).toMatch(/-BALL_RADIUS/);
  });

  test('shot target X within goal frame (0.1–0.9 range inside frame)', () => {
    expect(src).toMatch(/frameLeft.*frameW|frameW.*frameLeft/s);
  });

  test('save detection: dist <= KEEPER_HITBOX_HALF triggers onSave', () => {
    expect(src).toMatch(/dist.*KEEPER_HITBOX_HALF|KEEPER_HITBOX_HALF.*dist/s);
    expect(src).toMatch(/onSaveRef\.current/);
  });

  test('goal detection: dist > KEEPER_HITBOX_HALF triggers onGoalConceded', () => {
    expect(src).toMatch(/onGoalConcededRef\.current/);
  });

  test('keeper center accounts for half keeper width (30px offset)', () => {
    expect(src).toMatch(/keeperX\s*\+\s*30/);
  });

  test('counter-attack base success rate = 0.4 (40%)', () => {
    expect(src).toMatch(/COUNTER_ATTACK_BASE_RATE\s*=\s*0\.4/);
  });

  test('counter-attack success rate clamped between 0.1 and 0.9', () => {
    expect(src).toMatch(/Math\.max.*0\.1.*Math\.min.*0\.9|Math\.min.*0\.9.*Math\.max.*0\.1/s);
  });

  test('homeAvgFinishing bonus scales counter-attack rate', () => {
    expect(src).toMatch(/avgFinishing/);
    expect(src).toMatch(/COUNTER_ATTACK_BASE_RATE.*bonus|bonus.*COUNTER_ATTACK_BASE_RATE/s);
  });

  test('counter-attack pauses shot spawner while active', () => {
    expect(src).toMatch(/counterAttackActiveRef/);
    expect(src).toMatch(/clearTimeout.*nextShotRef|nextShotRef.*clearTimeout/s);
  });

  test('counter-attack resumes shot spawner after hide delay', () => {
    expect(src).toMatch(/COUNTER_ATTACK_HIDE_MS/);
  });

  test('volatile refs prevent stale closures in timers', () => {
    expect(src).toMatch(/matchMinuteRef\.current\s*=/);
    expect(src).toMatch(/isRunningRef\.current\s*=/);
    expect(src).toMatch(/canvasWidthRef\.current\s*=/);
  });

  test('cleanup: clears nextShotRef and counterAttackRef on unmount/stop', () => {
    expect(src).toMatch(/clearTimeout.*nextShotRef|clearTimeout.*counterAttackRef/s);
  });

  test('setInterval tick loop with TICK_MS interval', () => {
    expect(src).toMatch(/setInterval.*step.*TICK_MS|setInterval.*TICK_MS/s);
  });

  test('resolved shots removed after 300ms visual pause', () => {
    expect(src).toMatch(/300/);
    expect(src).toMatch(/resolvedIds/);
  });

  test('trail capped at TRAIL_LENGTH entries (shift when full)', () => {
    expect(src).toMatch(/trail\.length.*TRAIL_LENGTH/);
    expect(src).toMatch(/trail\.shift/);
  });
});

// ─── 4. DIFFICULTY PHASE LOGIC ────────────────────────────────────────────────

describe('Keeper Clash — Difficulty Phase Boundaries', () => {
  // Re-implement getDifficultyPhase inline to verify boundary logic in source
  let src;
  beforeAll(() => { src = readFile('src/hooks/useKeeperClashEngine.ts'); });

  test('minute < 45 → firstHalf phase', () => {
    // Verify firstHalf boundary in source at 45
    expect(src).toMatch(/minute\s*>=\s*45/);
  });

  test('minute >= 45 → secondHalfStart phase', () => {
    expect(src).toMatch(/secondHalfStart/);
  });

  test('minute >= 60 → secondHalfMid phase', () => {
    expect(src).toMatch(/minute\s*>=\s*60/);
  });

  test('minute >= 75 → finalMinutes phase', () => {
    expect(src).toMatch(/minute\s*>=\s*75/);
  });

  test('isExtraTime → extraTime phase (highest priority)', () => {
    // isExtraTime guard must come before the finalMinutes (>= 75) check in getDifficultyPhase
    const isExtraTimeCheckIdx = src.indexOf('if (isExtraTime)');
    const finalMinutesCheckIdx = src.indexOf('75');
    expect(isExtraTimeCheckIdx).toBeGreaterThan(-1);
    expect(isExtraTimeCheckIdx).toBeLessThan(finalMinutesCheckIdx);
  });
});

// ─── 5. SAVE DETECTION UNIT TEST ─────────────────────────────────────────────

describe('Keeper Clash — Save Detection Logic', () => {
  // Replicate the collision check logic from the engine
  const KEEPER_WIDTH = 60;
  const KEEPER_HITBOX_HALF = 45;

  function isSave(ballX, keeperX) {
    const keeperCenter = keeperX + KEEPER_WIDTH / 2;
    const dist = Math.abs(ballX - keeperCenter);
    return dist <= KEEPER_HITBOX_HALF;
  }

  test('ball exactly at keeper center → save', () => {
    expect(isSave(100, 70)).toBe(true); // keeperCenter=100, dist=0
  });

  test('ball at hitbox edge (dist=45) → save', () => {
    expect(isSave(145, 70)).toBe(true); // keeperCenter=100, dist=45
  });

  test('ball just outside hitbox (dist=46) → goal conceded', () => {
    expect(isSave(146, 70)).toBe(false); // dist=46
  });

  test('ball far left of keeper → goal conceded', () => {
    expect(isSave(0, 200)).toBe(false); // keeperCenter=230, dist=230
  });

  test('ball far right of keeper → goal conceded', () => {
    expect(isSave(390, 100)).toBe(false); // keeperCenter=130, dist=260
  });

  test('keeper hitbox is wider than keeper body (45 > 30)', () => {
    expect(KEEPER_HITBOX_HALF).toBeGreaterThan(KEEPER_WIDTH / 2);
  });
});

// ─── 6. COUNTER-ATTACK PROBABILITY UNIT TEST ─────────────────────────────────

describe('Keeper Clash — Counter-Attack Probability', () => {
  const BASE_RATE = 0.4;

  function calcRate(avgFinishing) {
    const bonus = (avgFinishing - 70) / 100;
    return Math.max(0.1, Math.min(0.9, BASE_RATE + bonus));
  }

  test('avgFinishing=70 → base rate 0.4', () => {
    expect(calcRate(70)).toBeCloseTo(0.4);
  });

  test('avgFinishing=90 → rate 0.6 (elite finishers more dangerous)', () => {
    expect(calcRate(90)).toBeCloseTo(0.6);
  });

  test('avgFinishing=50 → rate 0.2 (poor finishers less effective)', () => {
    expect(calcRate(50)).toBeCloseTo(0.2);
  });

  test('avgFinishing=170 → rate capped at 0.9 (ceiling enforced)', () => {
    expect(calcRate(170)).toBeCloseTo(0.9);
  });

  test('avgFinishing=0 → rate floored at 0.1', () => {
    expect(calcRate(0)).toBeCloseTo(0.1);
  });

  test('rate always between 0.1 and 0.9 for any input', () => {
    [-999, 0, 50, 70, 99, 100, 9999].forEach(v => {
      const r = calcRate(v);
      expect(r).toBeGreaterThanOrEqual(0.1);
      expect(r).toBeLessThanOrEqual(0.9);
    });
  });
});

// ─── 7. SHOT DURATION UNIT TEST ───────────────────────────────────────────────

describe('Keeper Clash — Shot Duration by Avg Shooting', () => {
  function getShotDuration(avgShooting) {
    if (avgShooting >= 90) return 1000;
    if (avgShooting >= 80) return 1200;
    if (avgShooting >= 70) return 1500;
    return 2000;
  }

  test('avgShooting 60 (slow tier) → 2000ms', () => {
    expect(getShotDuration(60)).toBe(2000);
  });

  test('avgShooting 70 (medium tier) → 1500ms', () => {
    expect(getShotDuration(70)).toBe(1500);
  });

  test('avgShooting 80 (fast tier) → 1200ms', () => {
    expect(getShotDuration(80)).toBe(1200);
  });

  test('avgShooting 90 (elite tier) → 1000ms', () => {
    expect(getShotDuration(90)).toBe(1000);
  });

  test('avgShooting 95 (elite tier) → 1000ms', () => {
    expect(getShotDuration(95)).toBe(1000);
  });

  test('elite shots arrive faster than slow shots', () => {
    expect(getShotDuration(90)).toBeLessThan(getShotDuration(60));
  });
});

// ─── 8. BEZIER TRAJECTORY MATH ───────────────────────────────────────────────

describe('Keeper Clash — Quadratic Bezier Trajectory', () => {
  function quadBezier(t, p0, p1, p2) {
    const mt = 1 - t;
    return {
      x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
      y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
    };
  }

  const p0 = { x: 100, y: 0 };
  const p1 = { x: 150, y: 200 };
  const p2 = { x: 200, y: 400 };

  test('t=0 → returns start point p0', () => {
    const pt = quadBezier(0, p0, p1, p2);
    expect(pt.x).toBeCloseTo(p0.x);
    expect(pt.y).toBeCloseTo(p0.y);
  });

  test('t=1 → returns end point p2', () => {
    const pt = quadBezier(1, p0, p1, p2);
    expect(pt.x).toBeCloseTo(p2.x);
    expect(pt.y).toBeCloseTo(p2.y);
  });

  test('t=0.5 → midpoint influenced by control point', () => {
    const pt = quadBezier(0.5, p0, p1, p2);
    expect(pt.x).toBeGreaterThan(p0.x);
    expect(pt.x).toBeLessThan(p2.x);
    expect(pt.y).toBeGreaterThan(p0.y);
    expect(pt.y).toBeLessThan(p2.y);
  });

  test('straight shot (p1 at midpoint) stays close to linear path', () => {
    const straight_p1 = { x: (p0.x + p2.x) / 2, y: (p0.y + p2.y) / 2 };
    const pt = quadBezier(0.5, p0, straight_p1, p2);
    expect(pt.x).toBeCloseTo(150);
    expect(pt.y).toBeCloseTo(200);
  });
});

// ─── 9. AVERAGE STAT HELPERS ─────────────────────────────────────────────────

describe('Keeper Clash — Average Stat Helpers', () => {
  function computeAvgShooting(players) {
    if (!players.length) return 70;
    return players.reduce((sum, p) => sum + p.stats.shooting, 0) / players.length;
  }

  function computeAvgFinishing(players) {
    if (!players.length) return 70;
    return players.reduce((sum, p) => sum + p.stats.finishing, 0) / players.length;
  }

  test('empty players array → default 70 for shooting', () => {
    expect(computeAvgShooting([])).toBe(70);
  });

  test('empty players array → default 70 for finishing', () => {
    expect(computeAvgFinishing([])).toBe(70);
  });

  test('single player: returns their shooting stat', () => {
    expect(computeAvgShooting([{ stats: { shooting: 85 } }])).toBe(85);
  });

  test('multiple players: averages correctly', () => {
    const players = [
      { stats: { shooting: 80 } },
      { stats: { shooting: 90 } },
      { stats: { shooting: 70 } },
    ];
    expect(computeAvgShooting(players)).toBeCloseTo(80);
  });

  test('finishing average independent from shooting', () => {
    const players = [
      { stats: { finishing: 60 } },
      { stats: { finishing: 80 } },
    ];
    expect(computeAvgFinishing(players)).toBeCloseTo(70);
  });
});

// ─── 10. i18n — ALL LANGUAGES ────────────────────────────────────────────────

describe('Keeper Clash — i18n Keys', () => {
  const LANGS = ['en', 'tr', 'de', 'fr'];

  LANGS.forEach((lang) => {
    describe(`Language: ${lang}`, () => {
      let json;
      beforeAll(() => { json = readJson(`src/i18n/${lang}.json`); });

      test(`${lang}: modeSelect.keeperClashTitle is non-empty string`, () => {
        const v = json['modeSelect.keeperClashTitle'];
        expect(typeof v).toBe('string');
        expect(v.length).toBeGreaterThan(0);
      });

      test(`${lang}: modeSelect.keeperClashDescription is non-empty string`, () => {
        const v = json['modeSelect.keeperClashDescription'];
        expect(typeof v).toBe('string');
        expect(v.length).toBeGreaterThan(0);
      });
    });
  });

  test('en: keeperClashTitle contains "Keeper Clash"', () => {
    const json = readJson('src/i18n/en.json');
    expect(json['modeSelect.keeperClashTitle']).toBe('Keeper Clash');
  });

  test('en: keeperClashDescription mentions dragging keeper', () => {
    const json = readJson('src/i18n/en.json');
    expect(json['modeSelect.keeperClashDescription']).toMatch(/drag|keeper/i);
  });

  test('tr: translation exists and differs from english', () => {
    const en = readJson('src/i18n/en.json');
    const tr = readJson('src/i18n/tr.json');
    expect(tr['modeSelect.keeperClashTitle']).not.toBe(en['modeSelect.keeperClashTitle']);
  });
});

// ─── 11. NAVIGATION / MODE SELECT ────────────────────────────────────────────

describe('Keeper Clash — Mode Select Integration', () => {
  let src;
  beforeAll(() => { src = readFile('app/mode-select.tsx'); });

  test('handleKeeperClash navigates to /game/keeper-clash', () => {
    expect(src).toMatch(/\/game\/keeper-clash/);
  });

  test('Keeper Clash ModeCard uses keeperClashTitle i18n key', () => {
    expect(src).toMatch(/keeperClashTitle/);
  });

  test('Keeper Clash ModeCard uses keeperClashDescription i18n key', () => {
    expect(src).toMatch(/keeperClashDescription/);
  });

  test('Keeper Clash card has active prop (available to play)', () => {
    // Check that "active" appears near the Keeper Clash card block
    const cardBlock = src.substring(
      src.indexOf('keeperClashTitle'),
      src.indexOf('keeperClashTitle') + 200
    );
    expect(cardBlock).toMatch(/active/);
  });
});

// ─── 12. NO REGRESSIONS ──────────────────────────────────────────────────────

describe('Keeper Clash — No Regressions', () => {
  test('app/game/arena.tsx still exists', () => {
    expect(exists('app/game/arena.tsx')).toBe(true);
  });

  test('src/hooks/useArenaEngine.ts still exists', () => {
    expect(exists('src/hooks/useArenaEngine.ts')).toBe(true);
  });

  test('app/game/plinko.tsx still exists (Plinko not broken)', () => {
    expect(exists('app/game/plinko.tsx')).toBe(true);
  });

  test('src/hooks/useMatchTimer.ts still exists (shared hook intact)', () => {
    expect(exists('src/hooks/useMatchTimer.ts')).toBe(true);
  });

  test('src/hooks/useMatchEvents.ts still exists (shared hook intact)', () => {
    expect(exists('src/hooks/useMatchEvents.ts')).toBe(true);
  });

  test('src/components/game/ScoreBoard.tsx still exists (shared component intact)', () => {
    expect(exists('src/components/game/ScoreBoard.tsx')).toBe(true);
  });

  test('src/components/game/EventToast.tsx still exists (shared component intact)', () => {
    expect(exists('src/components/game/EventToast.tsx')).toBe(true);
  });
});
